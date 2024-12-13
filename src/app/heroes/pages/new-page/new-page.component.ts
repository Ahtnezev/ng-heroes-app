import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { filter, switchMap, tap } from 'rxjs';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: ``
})
export class NewPageComponent implements OnInit {

  // formulario reactivo
  public heroForm = new FormGroup({
    id:               new FormControl<string>(''),
    superhero:        new FormControl<string>('', { nonNullable: true } ),
    publisher:        new FormControl<Publisher>(Publisher.DCComics), // haciendo uso de enums
    alter_ego:        new FormControl(''),
    first_appearance: new FormControl(''),
    characters:       new FormControl(''),
    altImg:           new FormControl(''),
  });

  public publishers = [
    { id: 'DC Comics', desc: 'DC - Comics' },
    { id: 'Marvel Comics', desc: 'Marvel - Comics' },
  ];

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
  ) { }

  get currentHero() : Hero {
    const hero = this.heroForm.value as Hero;
    return hero;
  }

  ngOnInit(): void {
    if (! this.router.url.includes('edit') ) return;

    this.activatedRoute.params
      .pipe(
        switchMap( ({id}) => this.heroesService.getHeroById(id) ),
      ).subscribe( hero => {
        if (!hero) return this.router.navigateByUrl('/');

        this.heroForm.reset(hero);
        return;
      });

  }

  onSubmit():void {
    // console.log({
    //   formIsValid: this.heroForm.valid,
    //   value: this.heroForm.value
    // });

    if ( this.heroForm.invalid) return;

    if (this.currentHero.id) {
      this.heroesService.updateHero( this.currentHero )
        .subscribe( hero => {
          // todo: mostrar snackbar
          this.showSnackbar(`${hero.superhero} updated!`);
        });
        return;
    }

    this.heroesService.addHero( this.currentHero )
      .subscribe( hero => {
        // todo: mostrar snackbar y navegar /heroes/edit/ hero.id

        this.router.navigate(['/heroes/edit/', hero.id]);
        this.showSnackbar(`${hero.superhero} created!`);
      })

  } // onSubmit

  onDeleteHero() {
    if (!this.currentHero.id ) throw Error('Hero id is required');

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.heroForm.value
    });

    dialogRef.afterClosed()
    .pipe(
      // si se cumple lo dejamos pasar
      filter( (result: boolean) => result ),
      switchMap( () => this.heroesService.deleteHeroById(this.currentHero.id) ),
      filter( (wasDeleted: boolean)  => wasDeleted ),
      // tap( wasDeleted => console.log({wasDeleted}))
    )
    .subscribe(result => {
      // console.log({result});
      this.router.navigate(['/heroes']);
    })


    // #1
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    //   if (!result) return;

    //   this.heroesService.deleteHeroById(this.currentHero.id)
    //     .subscribe( wasDeleted => {
    //       if (wasDeleted) {
    //         this.router.navigate(['/heroes']);
    //       }
    //     })
    //   console.log('deleted');
    // });

  }

  showSnackbar(message:string) :void {
    this.snackbar.open(message, 'done', {
      duration: 2500,
    })
  }

}
