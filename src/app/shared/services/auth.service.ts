
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../models/User";
import { environment } from 'src/environments/environment';

const API_URL = environment.apiUrl;

@Injectable()
export class AuthService {
    user: Observable<User>;
    userDetails;
    loggedUser: any;
    dbUser;

    constructor(
        private httpClient: HttpClient
    ) {
        this.dbUser = new User();
    }
    isLoggedIn(): boolean {
        if (localStorage.getItem('isLoggedIn') == 'true')
            return true;
    }
    createUserWithEmailAndPassword(name: string, email: string, password: string) {
        return this.httpClient.post(API_URL + '/register', { name: name, email: email, password: password });
    }
    signInRegular(email: string, password: string) {
        return this.httpClient.post(API_URL + '/login', { email: email, password: password });
    }
    logout() {
        localStorage.setItem('isLoggedIn', "false");
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }
}