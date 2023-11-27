import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Box } from '../models/Box';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoxService {

  constructor(private http:HttpClient) { }

  public GetAllBox():Observable<Box[]>{
    return this.http.get<Box[]>(environment.URL+ "/box")
  }

  public AjoutBox(box:Box):Observable<any>{
return this.http.post<any>(environment.URL+ "/box/save",box)
  }

  public ModifierBox(idBox:string,box:Box):Observable<any>{
    return this.http.put<any>(environment.URL+ "/box/update/"+idBox,box)
      }
}
