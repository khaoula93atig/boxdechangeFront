import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Achat } from '../models/Achat';

@Injectable({
  providedIn: 'root'
})
export class AchatService {

  private apiAchat = environment.URL+'/achat'
  private apiAverage = environment.URL+'/avgAchat'

  constructor(private http: HttpClient) { }

  // get Last achat de jour 
  getLastAchats():Observable<Achat[]>{
    return this.http.get<Achat[]>(this.apiAchat+'/LastAchat')
  }

  //get max valeur de Achat par devise de ce jour
  getAchatMaxJour(devise : string):Observable<number>{
    return this.http.get<number>(this.apiAchat+'/maxAchatJour/'+devise)
  }

  //get min valeur de Achat par devise de ce jour
  getAchatMinJour(devise : string):Observable<number>{
    return this.http.get<number>(this.apiAchat+'/minAchatJour/'+devise)
  }

  //get max valeur de Achat par devise de cette semaine
  getAchatMaxSemaine(devise : string):Observable<any>{
    return this.http.get<any>(this.apiAchat+'/maxAchatSemaine/'+devise)
  }

  //get min valeur de Achat par devise de cette semaine
  getAchatMinSemaine(devise : string):Observable<any>{
    return this.http.get<any>(this.apiAchat+'/minAchatSemaine/'+devise)
  }

  //get max valeur de Achat par devise de ce Mois
  getAchatMaxMois(devise : string):Observable<any>{
    return this.http.get<any>(this.apiAchat+'/maxAchatMois/'+devise)
  }

  //get min valeur de Achat par devise de ce Mois
  getAchatMinMois(devise : string):Observable<any>{
    return this.http.get<any>(this.apiAchat+'/minAchatMois/'+devise)
  }
  
  //get max valeur de Achat par devise de cet année
  getAchatMaxAns(devise : string):Observable<any>{
    return this.http.get<any>(this.apiAchat+'/maxAchatAns/'+devise)
  }

  //get min valeur de Achat par devise de cet année
  getAchatMinAns(devise : string):Observable<any>{
    return this.http.get<any>(this.apiAchat+'/minAchatAns/'+devise)
  }
  getAverageByDevise(devise:string):Observable<any[]>{
    return this.http.get<any[]>(this.apiAverage+"/getByDevise/"+devise)
    }
  
    getAverageDaily():Observable<any[]>{
      return this.http.get<any[]>(this.apiAverage+"/getAvgDaily")
      }
}
