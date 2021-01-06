import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Data } from 'src/data.class';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  user: User = new User();
  loginUrl = new Data().basePath + 'Login/';

  checkLogin(userName: string, password: string): Observable<User> {
    return this.http.get<User>(this.loginUrl + 'CheckLogin?userName=' + userName + '&password=' + password);
  }


  createUser(firstName:string,userName: string, password: string): Observable<User> {
    return this.http.get<User>(this.loginUrl + 'CreateUser?firstName='+firstName+'&userName=' + userName + '&password=' + password);
  }
 

}
