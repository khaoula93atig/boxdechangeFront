import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  saveUser(data: any) {
    localStorage.setItem(TOKEN_KEY, data.accessToken);
    localStorage.setItem(USER_KEY, JSON.stringify(data));

  }

  handle(data: any) {
    this.saveUser(data);
  }

  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  }

  getUser() {
    return JSON.parse(localStorage.getItem(USER_KEY));
  }

  remove() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }

  decode(payload: any) {
    return JSON.parse(atob(payload));
  }

  payload(token: string) {
    const payload = token.split('.')[1];
    return this.decode(payload);
  }
  getUserName(){
    return this.payload(this.getToken()).name;
  }
  getRegion(){
    return this.payload(this.getToken()).region;
  }

  getExprirationDate(token: string){
    const date = new Date(0);
    date.setUTCSeconds(this.payload(token).exp);
    return date ;
  }
  getUserRole(){
    return this.payload(this.getToken()).role;
  }

  isValid() {
    const token = this.getToken();
    const id = this.getUser();

    if (token) {

      const payload = this.payload(token);
      if (payload) {
        return id === payload.id;
      }
    }
    return false;
  }

  getInfos() {

    const token = this.getToken();

    if (token) {
      const payload = this.payload(token);
      return payload ? payload : null;
    }

    return null;
  }


  loggedIn() {
    return !!this.getUser();
  }

  signOut(): void {
    window.localStorage.clear();
  }

  public saveToken(token: string): void {
    window.localStorage.setItem(TOKEN_KEY, token);
  }
/*
  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    return JSON.parse(sessionStorage.getItem(USER_KEY));
  }
  loggedIn(){
    return !!this.getUser();
  }*/
}
