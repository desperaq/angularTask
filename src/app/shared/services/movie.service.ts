import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { ApiConfigService } from './api-config.service';
import { map, catchError } from 'rxjs/operators';
import { UserService } from './user.service';
import { Observable, of } from 'rxjs';

const API_URL = environment.apiUrl;

@Injectable()

export class MovieService {

    constructor(private httpClient: HttpClient,
        private apiConfigService: ApiConfigService,
        private userService: UserService) { }

    private getHttpOptions() {
        return {
            headers: new HttpHeaders({
                'Authorization':
                    this.apiConfigService.JWT_AUTH_BEARER_KEYWORD +
                    this.userService.getToken()
            })
        }
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            console.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);

        };
    }

    public extractData(res: Response) {
        let body = res;
        return body || {};
    }

    // ::get

    getMovies() {
        return this.httpClient.get(API_URL + '/movies').pipe(
            map(this.extractData));
    }

    // ::post

    rateIt(rating: any) {
        return this.httpClient.post<any>(API_URL + '/rating', rating, this.getHttpOptions()).pipe(
            catchError(this.handleError<any>('rating'))
        )
    }


}