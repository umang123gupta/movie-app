import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from 'src/app/services/movie/movie.service';

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
    this.movieService.getActionMovies().subscribe({
      next: (res: any) => {
        this.actionMovie = res.results;
      },
      error: (err) => {
        console.error('Error fetching action movies:', err);
      }
    });

    this.movieService.getComedyMovies().subscribe({
      next: (res: any) => {
        this.comedyMovie = res.results;
      },
      error: (err) => {
        console.error('Error fetching comedy movies:', err);
      }
    });

    this.movieService.getDramaMovies().subscribe({
      next: (res: any) => {
        this.dramaMovie = res.results;
      },
      error: (err) => {
        console.error('Error fetching drama movies:', err);
      }
    });
  }

  onSearch(): void {
    const query = this.searchQuery.trim();
    if (query) {
      this.movieService.searchMovies(query).subscribe({
        next: (res: any) => {
          this.searchResults = res.results;
        },
        error: (err) => {
          console.error('Error while searching movies:', err);
          this.searchResults = [];
        }
      });
    } else {
      this.searchResults = [];
    }
  }


  goToDetails(id: number) {
    this.router.navigate(['/home/dashboard/movie-details'], { queryParams: { 'id': id } })
  }
}
