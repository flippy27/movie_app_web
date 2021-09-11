import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Movie } from 'src/app/interfaces/movie.interface';
import { environment } from '../../../../environments/environment';
import { UserDataService } from '../../../services/user-data.service';
import { GlobalService } from '../../../services/global.service';
import { ReturnFormat } from 'src/app/components/enums/returnFormat.enum';
import { ThisReceiver } from '@angular/compiler';
import { TmdbService } from '../../../services/tmdb.service';
import { RESOURCE_CACHE_PROVIDER } from '@angular/platform-browser-dynamic';
import { MovieVideo } from '../../../interfaces/movieVideo.interface';
import { DomSanitizer} from '@angular/platform-browser';
import { SafePipe } from '../../../pipes/safe-pipe.pipe';
import { ShortNumberPipe } from '../../../pipes/short-number.pipe';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-movie-details-dialog',
  templateUrl: './movie-details-dialog.component.html',
  styleUrls: ['./movie-details-dialog.component.scss'],
  providers:[SafePipe,ShortNumberPipe]
})
export class MovieDetailsDialogComponent implements OnInit {
  movie:Movie;
  movieBackdrops = [];
  posterPath:string;
  userHasData:boolean;
  loading:boolean;
  trailerVideo:string = 'Video not found';
  ratingValues = ['Select','(1) Apalling','(2) Horrible', '(3) Very bad' , '(4) Bad', '(5) Average', '(6) Fine', '(7) Good', '(8) Very good' , '(9) Great', '(10) Masterpiece',]
  selectedValue = 0;
  finished:boolean;

  addMovieForm:FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    private userDataService:UserDataService,
    private tmdbService:TmdbService,
    private global:GlobalService,
    private dialogRef: MatDialogRef<MovieDetailsDialogComponent>
  ) { }

  ngOnInit(): void {
    this.addMovieForm = new FormGroup({
      finished: new FormControl(false),
      rating:new FormControl('',Validators.required),
    })
    this.userHasData = false;
    this.posterPath = environment.posterPath;
    this.movie = this.data.movie;
    this.movieBackdrops = this.data.backdrops

    this.loading = true;

    this.getMovieDetails();
  }
  getMovieDetails(){
    this.tmdbService.getMovieData({id_movie:this.movie.id}).subscribe((res:Movie)=>{
      this.movie = res;

    })
    this.getUserMovieData();
  }
  getUserMovieData(){
    let sendData = {
      id_movie:this.movie.id,
      id_user:this.data.user.user_id,
    }
    this.userDataService.getUserMovie(sendData).subscribe(res=>{

      if(res.length > 0){
        this.userHasData = true;
      }
      this.getMovieVideos();

    })
  }
  getMovieVideos(){
    this.tmdbService.getMovieVideos({id_movie:this.movie.id}).subscribe((res:MovieVideo[])=>{
      for (let i = 0; i < res.length; i++) {
        const element = res[i];
        if(element.name.includes('Trailer')){
          this.trailerVideo = environment.youtubeUri + element.key;
          break;
        }
      }
      if(this.trailerVideo == '' || this.trailerVideo == null){
        this.trailerVideo = 'Video not found';
      }
      this.loading = false;
    })
  }
  handleMovie(isAdding:boolean){
    if(isAdding){
      let sendData = {
        id_movie:this.movie.id,
        id_user:this.data.user.user_id,
        created_at:this.global.formatearFecha(new Date().toString(),ReturnFormat.yyyyMMdd_HHmmss),
        finished:this.addMovieForm.get('finished').value?1:0,
        rating:this.addMovieForm.get('rating').value,
      }
      this.userDataService.AddUserMovie(sendData).subscribe(res=>{
        console.log('adding data' , res);
      })
    }else{

    }
  }
}
