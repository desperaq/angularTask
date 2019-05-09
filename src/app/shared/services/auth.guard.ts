import { Router, CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable()

export class AuthGuard implements CanActivate {
    constructor(private router: Router, private userService: UserService) { }
    canActivate() {
        if (!this.userService.isAuthenticated()) {
            this.router.navigate(['login']);
            localStorage.setItem('isLoggedIn', "false");
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            return false;
        }
        return true;
    }

    public isLoggedIn(): boolean {
        let status = false;
        if (localStorage.getItem('isLoggedIn') == "true") {
            status = true;
        }
        else {
            status = false;
        }
        return status;
    }
}