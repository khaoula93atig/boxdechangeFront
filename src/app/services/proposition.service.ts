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
    console.log(proposition);
    return this.http.post( environment.URL+ "/proposition/add",JSON.stringify( proposition),options)

    
  }

  //get proposition by user and enchere
  public getPropostionByUserAndEnchere(user:number, enchere:string):Observable<any[]>{
    return this.http.get<any[]>(environment.URL+ "/proposition/getByUserAndEnchere/"+user+'/'+enchere)
  }
  
  //get proposition of bank
  public getPropostionofBank(user:number, enchere:string):Observable<any[]>{
    return this.http.get<any[]>(environment.URL+ "/proposition/getOfBank/"+user+'/'+enchere)
  }

  //modifier proposition
  public modifierProposition(proposition:any){
    return this.http.put(environment.URL+ "/proposition/update",proposition)
  }

 
}
