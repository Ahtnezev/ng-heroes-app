import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { environment } from '../../../environments/environments';

@Injectable({providedIn: 'root'})
export class HeroesService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getHeroes():Observable<Hero[]> {
    return this.http.get<Hero[]>(`${ this.baseUrl }/heroes`);
  }

  getHeroById( id: string ): Observable<Hero|undefined> {
    return this.http.get<Hero>(`${ this.baseUrl }/heroes/${ id }`)
      .pipe(
        // of: forma de crear observable basandonos lo que le pasamos ()
        catchError( error => of(undefined) )
      );
  }

  getSuggestions(query:string): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${ this.baseUrl }/heroes?q=${ query }&_limit=6`);
  }

  /**
   * CRUD
  */
  //  🔥
  addHero( hero: Hero ): Observable<Hero> {
    return this.http.post<Hero>(`${ this.baseUrl }/heroes/`, hero);
  }

  //  🔥
  // put: actualiza todo el objeto
  // patch: actualiza de manera parcial el objeto
  updateHero( hero: Hero ): Observable<Hero> {
    if ( !hero.id ) throw Error('Hero id is required');
    return this.http.patch<Hero>(`${ this.baseUrl }/heroes/${ hero.id }`, hero);
  }

  //  🔥
  deleteHeroById( id: string ): Observable<boolean> {
    return this.http.delete<Hero>(`${ this.baseUrl }/heroes/${ id }`)
    .pipe(
      map( resp => true ), // si es exitoso retornamos true
      catchError( err => of(false) ),
    );
  }

}
