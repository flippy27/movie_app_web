import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/user.interface';
import { GlobalService } from '../../services/global.service';
import { getLocaleDateFormat } from '@angular/common';
import { JwtHelperService } from '@auth0/angular-jwt';
import { forkJoin } from 'rxjs';
import { TmdbService } from 'src/app/services/tmdb.service';
import { Movie } from '../../interfaces/movie.interface';
import { MatDialog } from '@angular/material/dialog';
import { MovieDetailsDialogComponent } from '../dialogs/movie-details-dialog/movie-details-dialog.component';
import { environment } from '../../../environments/environment';
import { Backdrops } from '../../interfaces/backdrops.interface';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  userData:User;

  tempMovie:Movie;
  movieImages:string[];
  posterPath:string;

  constructor(
    public global:GlobalService,
    private jwtHelper:JwtHelperService,
    private tmdbService:TmdbService,
    private dialog:MatDialog,
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
    this.getMovieImages();
  }

  getMovie(){
    this.tmdbService.getMovieData({id:'550'}).subscribe((res:any)=>{
      this.tempMovie = res;
      this.tempMovie.poster_path = environment.posterPath + res.poster_path.replace('/','');
    },err=>{
      console.error(err);

    })
  }
  getMovieImages(){
    this.movieImages = [];
    this.tmdbService.getMovieImages({id:'550'}).subscribe((res:Backdrops)=>{
      res.backdrops.forEach(x=>{
        this.movieImages.push(environment.posterPath + x.file_path.replace('/','') );
      })
    })
  }
  showMovieData(){
    this.dialog.open(MovieDetailsDialogComponent, {
      height: '400px',
      width: '600px',
      data:{
        movie:this.tempMovie,
        backdrops:this.movieImages,
      }
    });
  }
}
