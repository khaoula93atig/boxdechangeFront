import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bank } from '../models/Bank';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BankService {

  constructor(private http:HttpClient) { }

  public GetAllBank():Observable<Bank[]>{
    return this.http.get<Bank[]>(environment.URL+ "/bank")
  }

  public AjoutBank(bank:Bank):Observable<any>{
return this.http.post<any>(environment.URL+ "/bank/save",bank)
  }

}
