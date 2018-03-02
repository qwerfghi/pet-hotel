import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {of} from 'rxjs/observable/of';
import {catchError} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';
import {Employee} from '../model/employee';
import {Address} from '../model/address';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class AddressService {

  private AddressesUrl = 'http://localhost:3000/address';  // URL to web api

  constructor(private http: HttpClient) {
  }

  /** GET heroes from the server */
  getAddresses(): Observable<Address[]> {
    return this.http.get<Address[]>(this.AddressesUrl)
      .pipe(
        catchError(this.handleError('getAddresses', []))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getAddress(id: number): Observable<Address> {
    const url = `${this.AddressesUrl}/${id}`;
    return this.http.get<Address>(url).pipe(
      catchError(this.handleError<Address>(`getAddress id=${id}`))
    );
  }

  /* GET heroes whose name contains search term */
  searchAddresses(term: string): Observable<Employee[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Employee[]>(`api/heroes/?name=${term}`).pipe(
      catchError(this.handleError<Employee[]>('searchAddresses', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new hero to the server */
  addAddress(address: Address): Observable<Address> {
    return this.http.post<Address>(this.AddressesUrl, address, httpOptions).pipe(
      catchError(this.handleError<Address>('addAddress'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteAddress(address: Address | number): Observable<Address> {
    const id = typeof address === 'number' ? address : address.idaddress;
    const url = `${this.AddressesUrl}/${id}`;

    return this.http.delete<Address>(url, httpOptions).pipe(
      catchError(this.handleError<Address>('deleteAddress'))
    );
  }

  /** PUT: update the hero on the server */
  updateAddress(address: Address): Observable<any> {
    return this.http.put(this.AddressesUrl, address, httpOptions).pipe(
      catchError(this.handleError<any>('updateAddress'))
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
