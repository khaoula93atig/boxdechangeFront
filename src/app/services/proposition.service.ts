import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PropositionService {

  constructor(private http:HttpClient) { }

  public GetAll(){
    return this.http.get( environment.URL+ "/proposition/list", { headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem("auth-token")})
  }); }

  

  public getByEnchereId(enchere:string){
    return this.http.get( environment.URL+ "/proposition/getByEnchereId/"+enchere, { headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem("auth-token")})
  }); }
  public Add(proposition:any)/*:Observable<any>*/{
    const header = new HttpHeaders({ 
    "Authorization":"Bearer "+sessionStorage.getItem("auth-token") 
    ,"Content-Type": "application/json; charset = utf-8;",'Access-Control-Allow-Origin':'*',
    'Access-Control-Allow-Headers':'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'  ,"Accept": "application/json"  
  });
    var options = { headers: header };
   // return this.http.post<any>("http://192.168.1.10:8013/proposition/add",proposition,options)
    console.log(proposition);
    return this.http.post( environment.URL+ "/proposition/add",JSON.stringify( proposition),options)
  
    /*  return this.http.post("http://192.168.1.10:8013/proposition/add",JSON.stringify( {
      "idProposition": 0,
      "enchere": {
          "idEnchere": "f384fa0d495148c298d78854f23060a6"
      },
      "user": {
          "id":3
      },
      "taux_soumission": 69.0
  }),options)*/

    
  }

 
}
