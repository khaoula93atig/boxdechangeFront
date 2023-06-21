import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Token } from '../models/Token';
import {map} from 'rxjs/operators';

const AUTH_API =  environment.URL+ '/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<Token>;
  public currentUser: Observable<Token>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<Token>(
      JSON.parse(localStorage.getItem('auth-user'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
   }

  login(credentials): Observable<any>{
    return this.http.post(AUTH_API + 'signin', {
      username: credentials.username,
      password: credentials.password
    }, httpOptions);
  }

  register(user): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      username: user.username,
      email: user.email,
      password: user.password
    }, httpOptions);
  }
  decodeToken(){
    return this.http.get(AUTH_API+"decodeToken/"+sessionStorage.getItem("auth-token"))
  }

  getUserDataByUserName(username:string){
    return this.http.get(AUTH_API+"findByUserName/"+username)

  }
  public get currentUserValue(): Token {
    return this.currentUserSubject.value;
  }
}
