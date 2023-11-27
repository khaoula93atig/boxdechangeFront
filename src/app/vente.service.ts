import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vente } from '../app/models/Vente';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VenteService {

  //api de vente 
  private apiVente = environment.URL+'/vente'
  private apiUrl = environment.URL+ '/getALLVente';
  private apiAverage = environment.URL+'/avgVente'

  constructor(private http: HttpClient) { }

  getAllVentes(): Observable<Vente[]> {
    return this.http.get<Vente[]>(this.apiUrl);
  }

  // get Last vente de jour 
  getLastVentes():Observable<Vente[]>{
    return this.http.get<Vente[]>(this.apiVente+'/LastVentes')
  }

  //get max valeur de vente par devise de ce jour
  getVenteMaxJour(devise : string):Observable<number>{
    return this.http.get<number>(this.apiVente+'/maxVenteJour/'+devise)
  }

  //get min valeur de vente par devise de ce jour
  getVenteMinJour(devise : string):Observable<number>{
    return this.http.get<number>(this.apiVente+'/minVenteJour/'+devise)
  }

  //get max valeur de vente par devise de cette semaine
  getVenteMaxSemaine(devise : string):Observable<any>{
    return this.http.get<any>(this.apiVente+'/maxVenteSemaine/'+devise)
  }

  //get min valeur de vente par devise de cette semaine
  getVenteMinSemaine(devise : string):Observable<any>{
    return this.http.get<any>(this.apiVente+'/minVenteSemaine/'+devise)
  }

  //get max valeur de vente par devise de ce Mois
  getVenteMaxMois(devise : string):Observable<any>{
    return this.http.get<any>(this.apiVente+'/maxVenteMois/'+devise)
  }

  //get min valeur de vente par devise de ce Mois
  getVenteMinMois(devise : string):Observable<any>{
    return this.http.get<any>(this.apiVente+'/minVenteMois/'+devise)
  }
  
  //get max valeur de vente par devise de cet année
  getVenteMaxAns(devise : string):Observable<any>{
    return this.http.get<any>(this.apiVente+'/maxVenteAns/'+devise)
  }

  //get min valeur de vente par devise de cet année
  getVenteMinAns(devise : string):Observable<any>{
    return this.http.get<any>(this.apiVente+'/minVenteAns/'+devise)
  }

  getAverageByDevise(devise:string):Observable<any[]>{
  return this.http.get<any[]>(this.apiAverage+"/getByDevise/"+devise)
  }

  getAverageDaily():Observable<any[]>{
    return this.http.get<any[]>(this.apiAverage+"/getAvgDaily")
    }


  
}
