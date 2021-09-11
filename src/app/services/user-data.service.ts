import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(
    private http:HttpClient,
    private global:GlobalService,
  ) { }
  getUserMovie(data):Observable<any>{
    return this.http.post(environment.uri + '/user-data/getMovie',data,this.global.options)
  }
  AddUserMovie(data):Observable<any>{
    return this.http.post(environment.uri + '/user-data/addMovie',data,this.global.options)
  }
  AddRatingMovie(data):Observable<any>{
    return this.http.post(environment.uri + '/user-data/addRatingMovie',data,this.global.options)
  }
}
