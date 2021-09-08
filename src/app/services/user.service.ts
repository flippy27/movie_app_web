import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalService } from './global.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http:HttpClient,
    private global:GlobalService,
    
  ) { }
  
  getUserData(data):Observable<any>{
    return this.http.post(environment.uri + '/users',data,this.global.options)
  }
  insertUser(data):Observable<any>{
    return this.http.post(environment.uri + '/users/register',data,this.global.options)
  }
}
