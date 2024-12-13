import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

//! aqui es la entrada de la aplicacion
//! cualquier ruta va a pasar por aqui primero
export class AppComponent {
  title = 'heroesApp';
}
