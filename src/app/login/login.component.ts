import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: User = new User();
  isCreateUser: boolean = false;
  invalidUserName: boolean = false;
  invalidUser: boolean = false;

  constructor(private loginServies: LoginService, private rout: Router) { }

  ngOnInit(): void {
  }

  checkLogin() {
    if (this.user.password && this.user.userName) {
      this.loginServies.checkLogin(this.user.userName, this.user.password).subscribe(
        user => {
          if (user) {
            this.loginServies.user = user;
            this.rout.navigate(['/turns'])
          }
          else
            this.invalidUser = true;
        }
      );
    }

  }
  createUser() {
    if (this.user.password && this.user.userName && this.user.firstName) {
      this.loginServies.createUser(this.user.firstName, this.user.userName, this.user.password).subscribe(
        user => {
          if (user.userId != 0) {
            this.loginServies.user = user;
            this.rout.navigate(['/turns'])
          }
          else {
            this.invalidUserName = true;
          }
        }
      );
    }
  }
}
