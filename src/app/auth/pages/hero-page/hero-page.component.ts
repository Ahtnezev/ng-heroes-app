import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { HeroesService } from '../../../heroes/services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap } from 'rxjs';
import { Hero } from '../../../heroes/interfaces/hero.interface';

@Component({
  selector: 'app-heroes-page',
  templateUrl: './hero-page.component.html',
  styles: ``,
  // no se muestra el heroe idk why xd
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroesPageComponent implements OnInit {

  public hero?: Hero;

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute, // leer cual es el url, ocupamos un servicio que ya viene en el router
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        delay(750),
        switchMap( ({ id }) => this.heroesService.getHeroById( id ) ),
      ).subscribe( hero => {
          if (!hero) return this.router.navigate(['/heroes/list']);

          this.hero = hero;
          console.log({ hero });
          // console.log(hero);
          return;
        }
      )
  }

  goBack():void {
    this.router.navigateByUrl('heroes/list')
  }

}
