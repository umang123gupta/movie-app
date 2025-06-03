import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from 'src/app/services/movie/movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  movieId: number = 0;
  movieDetails: any;
  roundedRating: number = 0;

  constructor(private router: Router, private activateRouter: ActivatedRoute, private service: MovieService) {
  }

  ngOnInit(): void {
    this.activateRouter.queryParams.subscribe(params => {
      this.movieId = params['id']
    })

    if (this.movieId) {
      this.getMovieDetails(this.movieId);
    }
  }

  getMovieDetails(id: number) {
    this.service.getMovieDetails(id).subscribe({
      next: (res: any) => {
        this.movieDetails = res;
        this.roundedRating = Math.round((res.vote_average / 2) * 2) / 2;
        this.getBackdropUrl(res.backdrop_path);
      },
      error: (err) => {
        console.error('Error fetching movie details:', err);
      }
    });
  }

  getBackdropUrl(path: string): string {
    return `https://image.tmdb.org/t/p/original${path}`;
  }

  goBack() {
    this.router.navigate(['/home/dashboard'])
  }

}
