import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { GlobalService } from '../../services/global.service';
import { environment } from '../../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user:User;
  constructor(
    private http:HttpClient,
    private global:GlobalService,
    public jwtHelper:JwtHelperService,
  ) { }
  login(data):Observable<any>{
    return this.http.post(environment.uri + '/users/login',data,this.global.options).pipe(map((result:any)=>{
      if(result.token != null){
        localStorage.setItem('token',result.token);
        return true;
      }
      return false;
    }))
  }
  loggedIn():boolean{
    this.user = null;
    const token = localStorage.getItem('token');
    if(this.jwtHelper.isTokenExpired(token)){
      return true;
    }else{
      localStorage.removeItem('token');
      return false;
    }
  }
  logout(){
    localStorage.removeItem('token');
  }
  getUser(){

  }
}
