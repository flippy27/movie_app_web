import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/user.interface';
import { GlobalService } from '../../services/global.service';
import { getLocaleDateFormat } from '@angular/common';
import { JwtHelperService } from '@auth0/angular-jwt';
import { forkJoin } from 'rxjs';
import { OmdbService } from 'src/app/services/omdb.service';
import { Movie } from '../../interfaces/movie.interface';
import { environment } from '../../../environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { MovieDetailsDialogComponent } from '../dialogs/movie-details-dialog/movie-details-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  userData:User;

  tempMovie:Movie;
  posterPath:string;
  movieDataShow:boolean;
  constructor(
    private global:GlobalService,
    private jwtHelper:JwtHelperService,
    private omdbService:OmdbService,
    private dialog:MatDialog,
  ) { }

  ngOnInit(): void {
    this.posterPath = environment.posterPath;
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
    this.omdbService.getMovieData({id:'550'}).subscribe((res:Movie)=>{
      console.log('res',res);
      this.tempMovie = res;
    },err=>{
      console.error(err);

    })
  }
  showMovieData(movieDataModal){
    let dialogRef = this.dialog.open(MovieDetailsDialogComponent, {
      height: '400px',
      width: '600px',
      data:{
        movie:this.tempMovie,
      }
    });



    this.movieDataShow = true;
  }
}
