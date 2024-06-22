import { Component, OnInit } from '@angular/core';
import { PerfilService } from '../data/perfil.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../header/header.component";

@Component({
    selector: 'app-perfil',
    templateUrl: './perfil.component.html',
    styleUrl: './perfil.component.css',
    standalone: true,
    imports: [CommonModule, HeaderComponent]
})
export class PerfilComponent implements OnInit {

  user: any = null; // Inicializa como null

  constructor(private perfilService: PerfilService) { }

  ngOnInit(): void {
    this.perfilService.getProfile().subscribe({
      next: (data) => {
        if (data) {
          console.log('Dados do usuário recebidos:', data);
          this.user = data;
        } else {
          console.error('Dados de usuário recebidos do servidor são nulos ou vazios.');
        }
      },
      error: (error) => {
        console.error('Erro ao obter perfil:', error);
        // Tratar o erro de forma apropriada, exibindo uma mensagem de erro ao usuário, por exemplo
      }
    });
  }



}



