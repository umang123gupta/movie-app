import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie/movie.service';

// import { MovieService } from '../../services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  actionMovie:any
  comedyMovie:any
  dramaMovie:any

  constructor(private movieService: MovieService) {

  }

  ngOnInit(): void {
   this.getMovies();
   
  }

  getMovies(){
    this.movieService.getActionMovies().subscribe((res:any)=>{
      this.actionMovie = res.results;
    })
    this.movieService.getComedyMovies().subscribe((res:any)=>{
      this.comedyMovie = res.results;
    })
    this.movieService.getDramaMovies().subscribe((res:any)=>{
      this.dramaMovie = res.results;
    })
  }
}
