import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class chartService {
  private apiUrl = environment.URL+ '/getAveragevente';

  constructor(private http: HttpClient) { }

  getAllAverages(): Observable<any> {
    return this.http.get<number[]>(this.apiUrl);
  }
}
