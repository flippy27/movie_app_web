import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalService } from './global.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OmdbService {

  constructor(
    private http:HttpClient,
    private global:GlobalService,
    
  ) { }
  
  getMovieData(data):Observable<any>{
    return this.http.post(environment.uri + '/omdb',data,this.global.options);
  }
  
}