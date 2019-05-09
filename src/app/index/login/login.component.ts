import { AuthService } from './../../shared/services/auth.service';
import { UserService } from './../../shared/services/user.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'src/app/shared/services/toastr.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/shared/models/User';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user = {
    name: "",
    emailId: "",
    loginPassword: ""
  };

  errorInUserCreate = false;
  errorMessage: any;
  createUser;
  loggedUser: any;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private toastService: ToastrService,
    private router: Router
  ) {
    this.createUser = new User();
  }

  ngOnInit() {
  }

  addUser(userForm: NgForm) {
    this.authService.createUserWithEmailAndPassword(
      userForm.value["name"],
      userForm.value["emailId"],
      userForm.value["password"],
    )
      .subscribe(
        success => {
          console.log("Registration successful");
          this.router.navigate(['/login']);
          if (success['success'] === true) {
            this.toastService.success("Registering", "User Registration");
            location.reload();
          }
          else {
            this.toastService.error("Registering", "Provide correct information");
          }
        }
      );
  }

  signInWithEmail(userForm: NgForm) {
    this.authService.signInRegular(userForm.value["emailId"], userForm.value["loginPassword"]).subscribe(
      success => {
        this.user.emailId = userForm.value["emailId"];
        localStorage.setItem('token', success['data'].token);
        localStorage.setItem('isLoggedIn', "true");
        this.userService.createUser(this.user.emailId).subscribe(
          response => {
            this.loggedUser = response;
            localStorage.setItem('user', JSON.stringify(this.loggedUser));
          });
        if (success['success'] === true) {
          this.toastService.success("Authentication Success", "Logging in please wait");
          this.router.navigate(['/tvShow']);
        }
        else {
          this.toastService.error("Authentication Failed", "Provide correct information");
          this.router.navigate(['/login']);
        }
      }
    )
  }

}
