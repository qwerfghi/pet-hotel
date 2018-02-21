import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {catchError} from 'rxjs/operators';
import {Visitor} from '../model/visitor';
import {of} from 'rxjs/observable/of';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class VisitorService {

  private visitorsUrl = 'http://localhost:8080/hostel/admin/visitors';  // URL to web api

  constructor(private http: HttpClient) {
  }

  /** GET heroes from the server */
  getVisitors(): Observable<Visitor[]> {
    return this.http.get<Visitor[]>(this.visitorsUrl)
      .pipe(
        catchError(this.handleError('getVisitors', []))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getVisitor(id: number): Observable<Visitor> {
    const url = `${this.visitorsUrl}/${id}`;
    return this.http.get<Visitor>(url).pipe(
      catchError(this.handleError<Visitor>(`getHero id=${id}`))
    );
  }

  /* GET heroes whose name contains search term */
  searchVisitors(term: string): Observable<Visitor[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Visitor[]>(`api/heroes/?name=${term}`).pipe(
      catchError(this.handleError<Visitor[]>('searchVisitors', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new hero to the server */
  addVisitor(visitor: Visitor): Observable<Visitor> {
    return this.http.post<Visitor>(this.visitorsUrl, visitor, httpOptions).pipe(
      catchError(this.handleError<Visitor>('addVisitor'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteVisitor(hero: Visitor | number): Observable<Visitor> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.visitorsUrl}/${id}`;

    return this.http.delete<Visitor>(url, httpOptions).pipe(
      catchError(this.handleError<Visitor>('deleteVisitor'))
    );
  }

  /** PUT: update the hero on the server */
  updateVisitor(hero: Visitor): Observable<any> {
    return this.http.put(this.visitorsUrl, hero, httpOptions).pipe(
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
