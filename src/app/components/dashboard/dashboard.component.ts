import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/user.interface';
import { GlobalService } from '../../services/global.service';
import { getLocaleDateFormat } from '@angular/common';
import { JwtHelperService } from '@auth0/angular-jwt';
import { forkJoin } from 'rxjs';
import { OmdbService } from 'src/app/services/omdb.service';
import { Movie } from '../../interfaces/movie.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  userData:User;

  tempMovie:Movie;
  constructor(
    private global:GlobalService,
    private jwtHelper:JwtHelperService,
    private omdbService:OmdbService,
  ) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const tokenInfo = this.jwtHelper.decodeToken(token);
    
    this.userData = {
      user_name:tokenInfo.name,
      user_email:tokenInfo.email,
      user_id:tokenInfo.user_id
    }   
    
    this.getMovie();
  }

  getMovie(){
    this.omdbService.getMovieData({id:'tt3896198'}).subscribe((res:Movie)=>{
      console.log('res',res);
      this.tempMovie = res;      
    })
  }
  

  
  

}
