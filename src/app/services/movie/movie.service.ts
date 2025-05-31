import { Injectable } from '@angular/core';
import { CommonHttpService } from '../common-http/common-http.service';
import { environment } from '../../../environments/environment';

const apiKey = `${environment.apiKey}`;
const baseUrl = `${environment.BASE_URL}`;

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http:CommonHttpService) { }

  getAllMovies(){
    return this.http.get(`/trending/movie/week?api_key=${apiKey}`);
  }

  getActionMovies() {
    return this.http.get(`/discover/movie?api_key=${apiKey}&with_genres=28&sort_by=popularity.desc`);
  }

  
getComedyMovies() {
  return this.http.get(`/discover/movie?api_key=${apiKey}&with_genres=35&sort_by=popularity.desc`);
}

getDramaMovies() {
  return this.http.get(`/discover/movie?api_key=${apiKey}&with_genres=18&sort_by=popularity.desc`);
}
}
