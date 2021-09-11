import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/user.interface';
import { GlobalService } from '../../services/global.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TmdbService } from 'src/app/services/tmdb.service';
import { Movie } from '../../interfaces/movie.interface';
import { MatDialog } from '@angular/material/dialog';
import { MovieDetailsDialogComponent } from '../dialogs/movie-details-dialog/movie-details-dialog.component';
import { environment } from '../../../environments/environment';
import { Backdrops } from '../../interfaces/backdrops.interface';
import { Serie } from '../../interfaces/serie.interface';
import { AsyncPipe } from '@angular/common';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers:[AsyncPipe]
})
export class DashboardComponent implements OnInit {
  userData:User;

  tempMovie:Movie;
  popularMovies:Movie[] = [];
  popularSeries:Serie[] = [];
  movieImages:string[] = [];
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

    //this.getMovieImages();
    this.getPopularMovies();
    this.getPopularSeries();
  }

  getMovie(){
    this.tmdbService.getMovieData({id:'550'}).subscribe((res:any)=>{
      this.tempMovie = res;
      this.tempMovie.poster_path = environment.posterPath + res.poster_path.replace('/','');
    },err=>{
      console.error(err);
    })
  }
  getPopularMovies(){
    this.tmdbService.getPopularMovies().subscribe((res:Movie[])=>{
      this.popularMovies = res;
      this.popularMovies.forEach(x=>{
        x.poster_path = environment.posterPath + x.poster_path;
      })
    })
  }
  getPopularSeries(){
    this.tmdbService.getPopularSeries().subscribe((res:Serie[])=>{
      this.popularSeries = res;
      this.popularSeries.forEach(x=>{
        x.poster_path = environment.posterPath + x.poster_path;
      })
    })
  }
  showMovieData(movie,isMovie:boolean){
    this.dialog.open(MovieDetailsDialogComponent, {
      height: '800px',
      width: '1000px',
      data:{
        movie,
        backdrops:this.movieImages,
        user:this.userData,
        isMovie:isMovie,
      }
    });
  }

}
