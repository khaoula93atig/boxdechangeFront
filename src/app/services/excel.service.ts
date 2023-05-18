import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor(private http:HttpClient) { }
  getExcelFile() {
    return this.http.get( environment.URL+ "/excel/import")
  }
}
