import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { MovieService } from 'src/app/services/movie/movie.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let movieServiceSpy: jasmine.SpyObj<MovieService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const movieServiceMock = jasmine.createSpyObj('MovieService', [
      'getActionMovies',
      'getComedyMovies',
      'getDramaMovies',
      'searchMovies'
    ]);

    const routerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [FormsModule],
      providers: [
        { provide: MovieService, useValue: movieServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    movieServiceSpy = TestBed.inject(MovieService) as jasmine.SpyObj<MovieService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('getMovies', () => {
    it('should fetch action, comedy, and drama movies', () => {
      const dummyAction = { results: ['action1', 'action2'] };
      const dummyComedy = { results: ['comedy1', 'comedy2'] };
      const dummyDrama = { results: ['drama1', 'drama2'] };

      movieServiceSpy.getActionMovies.and.returnValue(of(dummyAction));
      movieServiceSpy.getComedyMovies.and.returnValue(of(dummyComedy));
      movieServiceSpy.getDramaMovies.and.returnValue(of(dummyDrama));

      component.getMovies();

      expect(movieServiceSpy.getActionMovies).toHaveBeenCalled();
      expect(movieServiceSpy.getComedyMovies).toHaveBeenCalled();
      expect(movieServiceSpy.getDramaMovies).toHaveBeenCalled();

      expect(component.actionMovie).toEqual(dummyAction.results);
      expect(component.comedyMovie).toEqual(dummyComedy.results);
      expect(component.dramaMovie).toEqual(dummyDrama.results);
    });

    it('should handle errors when fetching movies', () => {
      const error = new Error('Network error');
      movieServiceSpy.getActionMovies.and.returnValue(throwError(() => error));
      movieServiceSpy.getComedyMovies.and.returnValue(of({ results: [] }));
      movieServiceSpy.getDramaMovies.and.returnValue(of({ results: [] }));

      spyOn(console, 'error');

      component.getMovies();

      expect(console.error).toHaveBeenCalledWith('Error fetching action movies:', error);
    });
  });

  describe('onSearch', () => {
    it('should search movies when searchQuery is non-empty', () => {
      const query = 'test';
      const dummySearchResults = { results: ['movie1', 'movie2'] };
      component.searchQuery = query;

      movieServiceSpy.searchMovies.and.returnValue(of(dummySearchResults));

      component.onSearch();

      expect(movieServiceSpy.searchMovies).toHaveBeenCalledWith(query);
      expect(component.searchResults).toEqual(dummySearchResults.results);
    });

    it('should clear searchResults if searchQuery is empty or whitespace', () => {
      component.searchQuery = '  ';
      component.searchResults = ['some previous result'];

      component.onSearch();

      expect(movieServiceSpy.searchMovies).not.toHaveBeenCalled();
      expect(component.searchResults).toEqual([]);
    });

    it('should handle error when searching movies', () => {
      const query = 'test';
      const error = new Error('Search failed');
      component.searchQuery = query;

      movieServiceSpy.searchMovies.and.returnValue(throwError(() => error));
      spyOn(console, 'error');

      component.onSearch();

      expect(movieServiceSpy.searchMovies).toHaveBeenCalledWith(query);
      expect(console.error).toHaveBeenCalledWith('Error while searching movies:', error);
      expect(component.searchResults).toEqual([]);
    });
  });

  describe('goToDetails', () => {
    it('should navigate to movie-details with query params', () => {
      const movieId = 123;

      component.goToDetails(movieId);

      expect(routerSpy.navigate).toHaveBeenCalledWith(['/home/dashboard/movie-details'], {
        queryParams: { id: movieId }
      });
    });
  });
});
