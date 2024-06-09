import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { ListaFichasComponent } from "./lista-fichas/lista-fichas.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, HeaderComponent, ListaFichasComponent]
})
export class AppComponent {
  title = 'holy_sheet';
}
