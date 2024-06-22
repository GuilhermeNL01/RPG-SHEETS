import { Component, OnInit } from '@angular/core';
import { FichaService } from '../data/ficha.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../header/header.component";
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-lista-fichas',
    standalone: true,
    templateUrl: './lista-fichas.component.html',
    styleUrls: ['./lista-fichas.component.css'],
    imports: [CommonModule, HeaderComponent, RouterLink]
})
export class ListaFichasComponent implements OnInit {
  fichas: any[] = [];

  constructor(private fichaService: FichaService) { }

  ngOnInit() {
    this.fichaService.getData().subscribe({
      next: data => {
        this.fichas = data;
      },
      error: error => {
        console.error('Erro ao buscar fichas', error);
      }
    });
  }
}
