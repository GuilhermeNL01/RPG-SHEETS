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

  id_usuario: any = null; // Inicializa como null
  loading = true; // Variável para controlar o estado de carregamento

  constructor(private perfilService: PerfilService) { }

  ngOnInit(): void {
    this.perfilService.getProfile().subscribe({
      next: (data) => {
        console.log('Dados do usuário recebidos:', data);
        this.id_usuario = data;
        this.loading = false; // Marca o carregamento como concluído
      },
      error: (error) => {
        console.error('Erro ao obter perfil:', error);
        this.loading = false; // Marca o carregamento como concluído mesmo em caso de erro
        // Tratar o erro de forma apropriada, exibindo uma mensagem de erro ao usuário
      }
    });
  }

}



