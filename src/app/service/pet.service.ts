import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {catchError} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import {Pet} from '../model/Pet';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class PetService {

  private PetsUrl = 'http://localhost:3000/pets';  // URL to web api

  constructor(private http: HttpClient) {
  }

  /** GET heroes from the server */
  getPets(): Observable<Pet[]> {
    return this.http.get<Pet[]>(this.PetsUrl)
      .pipe(
        catchError(this.handleError('getPets', []))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getPet(id: number): Observable<Pet> {
    const url = `${this.PetsUrl}/${id}`;
    return this.http.get<Pet>(url).pipe(
      catchError(this.handleError<Pet>(`getHero id=${id}`))
    );
  }

  //////// Save methods //////////

  /** POST: add a new hero to the server */
  addPet(visitor: Pet): Observable<Pet> {
    return this.http.post<Pet>(this.PetsUrl, visitor, httpOptions).pipe(
      catchError(this.handleError<Pet>('addVisitor'))
    );
  }

  /** DELETE: delete the hero from the server */
  deletePet(id: number): Observable<Pet> {
    const url = `${this.PetsUrl}/${id}`;

    return this.http.delete<Pet>(url, httpOptions).pipe(
      catchError(this.handleError<Pet>('deleteVisitor'))
    );
  }

  /** PUT: update the hero on the server */
  updatePet(id: number, hero: Pet): Observable<any> {
    return this.http.put(`${this.PetsUrl}/${id}`, hero, httpOptions).pipe(
      catchError(this.handleError<any>('updateVisitor'))
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
