import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from 'src/app/services/movie/movie.service';

// import { MovieService } from '../../services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  actionMovie: any
  comedyMovie: any
  dramaMovie: any
  searchQuery = '';
  searchResults: any[] = [];

  constructor(private movieService: MovieService, private router: Router) {

  }

  ngOnInit(): void {
    this.getMovies();

  }

  getMovies() {
    this.movieService.getActionMovies().subscribe((res: any) => {
      this.actionMovie = res.results;
    })
    this.movieService.getComedyMovies().subscribe((res: any) => {
      this.comedyMovie = res.results;
    })
    this.movieService.getDramaMovies().subscribe((res: any) => {
      this.dramaMovie = res.results;
    })
  }

  onSearch(): void {
    const query = this.searchQuery.trim();
    if (query) {
      this.movieService.searchMovies(query).subscribe((res: any) => {
        this.searchResults = res.results;
      });
    } else {
      this.searchResults = [];
    }
  }

  goToDetails(id: any) {
    this.router.navigate(['/home/dashboard/movie-details'], { queryParams: { 'id': id } })
  }
}
