import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {catchError} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import {Pet} from '../model/pet';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class PetService {

  private petsUrl = 'http://localhost:3000/pets';  // URL to web api

  constructor(private http: HttpClient) {
  }

  /** GET heroes from the server */
  getPets(): Observable<Pet[]> {
    return this.http.get<Pet[]>(this.petsUrl)
      .pipe(
        catchError(this.handleError('getPets', []))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getPet(id: number): Observable<Pet> {
    const url = `${this.petsUrl}/${id}`;
    return this.http.get<Pet>(url).pipe(
      catchError(this.handleError<Pet>(`getHero id=${id}`))
    );
  }

  /* GET heroes whose name contains search term */
  searchPets(term: string): Observable<Pet[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Pet[]>(`api/heroes/?name=${term}`).pipe(
      catchError(this.handleError<Pet[]>('searchPets', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new hero to the server */
  addVisitor(visitor: Pet): Observable<Pet> {
    return this.http.post<Pet>(this.petsUrl, visitor, httpOptions).pipe(
      catchError(this.handleError<Pet>('addVisitor'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteVisitor(pet: Pet | number): Observable<Pet> {
    const id = typeof pet === 'number' ? pet : pet.idanimal;
    const url = `${this.petsUrl}/${id}`;

    return this.http.delete<Pet>(url, httpOptions).pipe(
      catchError(this.handleError<Pet>('deleteVisitor'))
    );
  }

  /** PUT: update the hero on the server */
  updateVisitor(hero: Pet): Observable<any> {
    return this.http.put(this.petsUrl, hero, httpOptions).pipe(
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
