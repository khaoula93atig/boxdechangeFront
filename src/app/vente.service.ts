import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vente } from '../app/models/Vente';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VenteService {

  private apiUrl = environment.URL+ '/getALLVente';
  private apiUrlMAX =  environment.URL+  '/getVenteMAX';
  private apiUrlMIN =  environment.URL+ '/getVenteMIN';

  constructor(private http: HttpClient) { }

  getAllVentes(): Observable<Vente[]> {
    return this.http.get<Vente[]>(this.apiUrl);
  }


  getMAX(currency: string): Observable<Vente> {
    return this.http.get<Vente>(this.apiUrlMAX + "/" + currency);
  }

  getMIN(currency: string): Observable<Vente> {
    return this.http.get<Vente>(this.apiUrlMIN + "/" + currency);
  }

  getMAXDATE(currency: string, date: string): Observable<Vente> {
    return this.http.get<Vente>(this.apiUrlMAX + "/" + currency + "/" + date);
  }

  getMINDATE(currency: string, date: string): Observable<Vente> {
    return this.http.get<Vente>(this.apiUrlMIN + "/" + currency + "/" + date);
  }
}
