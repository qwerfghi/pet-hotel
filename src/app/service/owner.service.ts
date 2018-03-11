import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {catchError} from 'rxjs/operators';
import {Owner} from '../model/Owner';
import {of} from 'rxjs/observable/of';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class OwnerService {

  private OwnersUrl = 'http://localhost:3000/owners';  // URL to web api

  constructor(private http: HttpClient) {
  }

  /** GET heroes from the server */
  getOwners(): Observable<Owner[]> {
    return this.http.get<Owner[]>(this.OwnersUrl)
      .pipe(
        catchError(this.handleError('getOwners', []))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getOwner(id: number): Observable<Owner> {
    const url = `${this.OwnersUrl}/${id}`;
    return this.http.get<Owner>(url).pipe(
      catchError(this.handleError<Owner>(`getHero id=${id}`))
    );
  }

  //////// Save methods //////////

  /** POST: add a new hero to the server */
  addOwner(visitor: Owner): Observable<Owner> {
    return this.http.post<Owner>(this.OwnersUrl, visitor, httpOptions).pipe(
      catchError(this.handleError<Owner>('addOwner'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteOwner(id: number): Observable<Owner> {
    const url = `${this.OwnersUrl}/${id}`;

    return this.http.delete<Owner>(url, httpOptions).pipe(
      catchError(this.handleError<Owner>('deleteOwner'))
    );
  }

  /** PUT: update the owner on the server */
  updateOwner(id: number, owner: Owner): Observable<any> {
    return this.http.put(`${this.OwnersUrl}/${id}`, owner, httpOptions).pipe(
      catchError(this.handleError<any>('updateOwner'))
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
