import { Component } from '@angular/core';
import { ListaFichasComponent } from "../lista-fichas/lista-fichas.component";
import { HeaderComponent } from "../header/header.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [ListaFichasComponent, HeaderComponent]
})
export class HomeComponent {

}
