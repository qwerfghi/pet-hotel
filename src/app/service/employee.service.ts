import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {catchError} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import {Employee} from '../model/employee';

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

  /* GET heroes whose name contains search term */
  searchEmployees(term: string): Observable<Employee[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Employee[]>(`api/heroes/?name=${term}`).pipe(
      catchError(this.handleError<Employee[]>('searchEmployees', []))
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
  deleteEmployee(employee: Employee | number): Observable<Employee> {
    console.log(employee);
    const id = typeof employee === 'number' ? employee : employee.id;
    const url = `${this.EmployeesUrl}/${id}`;

    return this.http.delete<Employee>(url, httpOptions).pipe(
      catchError(this.handleError<Employee>('deleteEmployee'))
    );
  }

  /** PUT: update the hero on the server */
  updateEmployee(personal: Employee): Observable<any> {
    return this.http.put(this.EmployeesUrl, personal, httpOptions).pipe(
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
