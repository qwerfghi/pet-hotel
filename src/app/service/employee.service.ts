import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {catchError} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import {Employee} from '../model/Employee';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class EmployeeService {

  private EmployeesUrl = 'http://localhost:3000/employees';  // URL to web api

  constructor(private http: HttpClient) {
  }

  /** GET heroes from the server */
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.EmployeesUrl)
      .pipe(
        catchError(this.handleError('getEmployees', []))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getEmployee(id: number): Observable<Employee> {
    const url = `${this.EmployeesUrl}/${id}`;
    return this.http.get<Employee>(url).pipe(
      catchError(this.handleError<Employee>(`getPersonal id=${id}`))
    );
  }

  //////// Save methods //////////

  /** POST: add a new hero to the server */
  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.EmployeesUrl, employee, httpOptions).pipe(
      catchError(this.handleError<Employee>('addEmployee'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteEmployee(id: number): Observable<Employee> {
    const url = `${this.EmployeesUrl}/${id}`;

    return this.http.delete<Employee>(url, httpOptions).pipe(
      catchError(this.handleError<Employee>('deleteEmployee'))
    );
  }

  /** PUT: update the hero on the server */
  updateEmployee(id: number, employee: Employee): Observable<any> {
    return this.http.put(`${this.EmployeesUrl}/${id}`, employee, httpOptions).pipe(
      catchError(this.handleError<any>('updateEmployee'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
