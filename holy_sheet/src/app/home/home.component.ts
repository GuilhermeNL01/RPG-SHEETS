import { Component } from '@angular/core';
import { ListaFichasComponent } from "../lista-fichas/lista-fichas.component";
import { HeaderComponent } from "../header/header.component";
import { LoginComponent } from "../login/login.component";
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [ListaFichasComponent, HeaderComponent, LoginComponent, RouterOutlet]
})
export class HomeComponent {

}
