import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from "src/environments/environment";
import { User } from '../models/User';
import { ApiConfigService } from './api-config.service';
import { map } from 'rxjs/operators';

const API_URL = environment.apiUrl;
const helper = new JwtHelperService;

@Injectable()

export class UserService {
    selectedUser: User = new User();

    constructor(private httpClient: HttpClient, private apiConfigService: ApiConfigService) { }

    public isAuthenticated(): boolean {
        const token = this.getToken();
        return !helper.isTokenExpired(token);
    }

    public getToken(): string {
        return localStorage.getItem('token');
    }

    public getHttpOptions() {
        return {
            headers: new HttpHeaders({
                'Authorization':
                    this.apiConfigService.JWT_AUTH_BEARER_KEYWORD +
                    this.getToken()
            })
        }
    }

    public extractData(res: Response) {
        let body = res;
        return body || {};
    }

    createUser(email: any) {
        return this.httpClient.get(API_URL + '/user/' + email, this.getHttpOptions()).pipe(map(this.extractData));
    }
}