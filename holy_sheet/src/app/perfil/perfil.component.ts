import { Component, OnInit } from '@angular/core';
import { PerfilService } from '../data/perfil.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
  standalone: true,
  imports: [CommonModule, HeaderComponent]
})
export class PerfilComponent implements OnInit {
  user: any = {};
  errorMessage: string | null = null;

  constructor(private perfilService: PerfilService) {}

  ngOnInit() {
    this.perfilService.getData().subscribe({
      next: data => {
        this.user = data;
        this.errorMessage = null; // Clear any previous error messages
      },
      error: error => {
        console.error('Erro ao buscar fichas', error);
        if (error.status === 401) {
          this.errorMessage = 'Erro de autenticação. Por favor, faça login novamente.';
        } else if (error.status === 403) {
          this.errorMessage = 'Acesso negado. Você não tem permissão para acessar esta informação.';
        } else {
          this.errorMessage = 'Erro ao buscar dados do usuário. Por favor, tente novamente mais tarde.';
        }
      }
    });
  }
}





