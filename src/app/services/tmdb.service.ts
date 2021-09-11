import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalService } from './global.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {

  constructor(
    private http:HttpClient,
    private global:GlobalService,

  ) { }

  getMovieData(data):Observable<any>{
    return this.http.post(environment.uri + '/movies/movieByID',data,this.global.options);
  }
  getMovieImages(data):Observable<any>{
    return this.http.post(environment.uri + '/movies/movieImagesByID',data,this.global.options);
  }
  getMovieVideos(data):Observable<any>{
    return this.http.post(environment.uri + '/movies/movieVideos',data,this.global.options);
  }
  getPopularMovies():Observable<any>{
    return this.http.get(environment.uri + '/movies/popularMovies',this.global.options);
  }
  getPopularSeries():Observable<any>{
    return this.http.get(environment.uri + '/series/popularSeries',this.global.options);
  }

}
