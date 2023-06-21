import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnchereService {

  constructor(private http:HttpClient) { }
 
public GetAllByUser(idUser : string){
  
  return this.http.get( environment.URL+ "/enchere/getUser/"+idUser)}

public GetEncherByUser(idUser : number):Observable<any[]>{
  return this.http.get<any[]>(environment.URL+"/enchere/getbyUser/"+idUser)
}

  public ajouter(enchere:any):Observable<any>{
    /*const header = new HttpHeaders({ 
    "Authorization":"Bearer "+sessionStorage.getItem("auth-token") 
    ,"Content-Type": "application/json; charset = utf-8;",'Access-Control-Allow-Origin':'*',
    'Access-Control-Allow-Headers':'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'  ,"Accept": "application/json"  
  });
    var options = { headers: header };
    console.log(enchere);*/
    return this.http.post(environment.URL+"/enchere/" +"save", enchere)
  

    
  }




  public GetEnchere():Observable<any[]>{
    return this.http.get<any[]>(environment.URL+"/enchere")
  }
  public GetEnchereNull():Observable<any[]>{
    const header = new HttpHeaders({ 
      "Authorization":"Bearer "+sessionStorage.getItem("auth-token") });
      var options = { headers: header };
    return this.http.get<any[]>(environment.URL+"/enchere/"+"null",options)
  }
  public GetEnchereNotNull():Observable<any[]>{
    return this.http.get<any[]>(environment.URL+"/enchere/"+"notnull")
  }
}
