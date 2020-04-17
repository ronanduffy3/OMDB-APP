import { Omdbresponse } from './../omdbresponse';
import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, fromEventPattern} from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})

export class OmdbApiService {

  private _siteURL = 'http://www.omdbapi.com/';
  private _key = '?apikey=9bc48a70&t=';

  constructor(private _http: HttpClient) { }

  getMovieData(movieName): Observable<Omdbresponse> {
    return this._http.get<Omdbresponse>(this._siteURL + this._key + movieName)
    .pipe(
      tap(data => console.log('Moviedata/error' + JSON.stringify(data))
      ),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    console.log('OMDB Api Service Error: ' + err.message);
    return Observable.throw(err.message);
  }
}
