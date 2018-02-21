import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {catchError} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import {Personal} from '../model/Personal';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class PersonalService {

  private PersonalsUrl = 'http://localhost:8080/hostel/admin/staff';  // URL to web api

  constructor(private http: HttpClient) {
  }

  /** GET heroes from the server */
  getPersonals(): Observable<Personal[]> {
    return this.http.get<Personal[]>(this.PersonalsUrl)
      .pipe(
        catchError(this.handleError('getPersonals', []))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getPersonal(id: number): Observable<Personal> {
    const url = `${this.PersonalsUrl}/${id}`;
    return this.http.get<Personal>(url).pipe(
      catchError(this.handleError<Personal>(`getPersonal id=${id}`))
    );
  }

  /* GET heroes whose name contains search term */
  searchPersonals(term: string): Observable<Personal[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Personal[]>(`api/heroes/?name=${term}`).pipe(
      catchError(this.handleError<Personal[]>('searchPersonals', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new hero to the server */
  addVisitor(visitor: Personal): Observable<Personal> {
    return this.http.post<Personal>(this.PersonalsUrl, visitor, httpOptions).pipe(
      catchError(this.handleError<Personal>('addPersonal'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteVisitor(personal: Personal | number): Observable<Personal> {
    const id = typeof personal === 'number' ? personal : personal.idstaff;
    const url = `${this.PersonalsUrl}/${id}`;

    return this.http.delete<Personal>(url, httpOptions).pipe(
      catchError(this.handleError<Personal>('deletePersonal'))
    );
  }

  /** PUT: update the hero on the server */
  updateVisitor(personal: Personal): Observable<any> {
    return this.http.put(this.PersonalsUrl, personal, httpOptions).pipe(
      catchError(this.handleError<any>('updatePersonal'))
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
