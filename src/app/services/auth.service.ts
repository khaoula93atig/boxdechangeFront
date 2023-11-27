import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Token } from '../models/Token';
import {map} from 'rxjs/operators';
import { Router } from '@angular/router';
import { ResetPassword } from '../models/restPassword';

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

  constructor(private http: HttpClient,private router:Router) {
    this.currentUserSubject = new BehaviorSubject<Token>(
      JSON.parse(localStorage.getItem('auth-user'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
   }

  login(credentials): Observable<any>{
    return this.http.post<any>(AUTH_API + 'signin', {
      username: credentials.username,
      password: credentials.password
    }).pipe(
      map((user) => {
        console.log('////////////' + user);
        if (user && user.accessToken) {
          localStorage.setItem('auth-user', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
      })
    );
    /*return this.http.post(AUTH_API + 'signin', {
      username: credentials.username,
      password: credentials.password
    }, httpOptions);*/
  }

  register(user:any, role:string): Observable<any> {
    return this.http.post(AUTH_API + 'signup/'+role,user);
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
  logout() {
    console.log(JSON.parse(localStorage.getItem('auth-user')))
    localStorage.removeItem('auth-user');
    this.router.navigate(['']);
  }


  public resetPassword(resetPassword:ResetPassword): Observable<string>{
    return this.http.post<string>(AUTH_API+`resetPassword`,resetPassword) ;
  }

  resetpassword(email) {

    return this.http.post(AUTH_API+`mpoublier`,email);
  }

}
