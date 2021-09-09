import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Movie } from 'src/app/interfaces/movie.interface';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-movie-details-dialog',
  templateUrl: './movie-details-dialog.component.html',
  styleUrls: ['./movie-details-dialog.component.scss']
})
export class MovieDetailsDialogComponent implements OnInit {
  movie:Movie;
  movieBackdrops = [];
  posterPath:string;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
  ) { }

  ngOnInit(): void {
    this.posterPath = environment.posterPath;
    this.movie = this.data.movie;
    this.movieBackdrops = this.data.backdrops
    console.log('movie backdrops',this.movieBackdrops);

  }

}
