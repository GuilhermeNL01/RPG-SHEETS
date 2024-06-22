import { Component, OnInit } from '@angular/core';
import { PerfilService } from '../data/perfil.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
  standalone: true,
  imports: [CommonModule, HeaderComponent, FormsModule]
})
export class PerfilComponent implements OnInit {
  user: any = {}; // Dados do usuário
  editedUser: any = {}; // Dados editados do usuário
  errorMessage: string | null = null;
  editMode = false; // Estado de edição

  constructor(private perfilService: PerfilService) {}

  ngOnInit() {
    this.perfilService.getData().subscribe({
      next: data => {
        this.user = data;
        this.editedUser = { ...this.user }; // Inicializa os dados editados com os dados originais
        this.errorMessage = null; // Limpa mensagens de erro anteriores
      },
      error: error => {
        console.error('Erro ao buscar dados do usuário', error);
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

  toggleEditMode() {
    this.editMode = !this.editMode;
    // Se o modo de edição for desativado, resete os dados editados
    if (!this.editMode) {
      this.editedUser = { ...this.user };
    }
  }

  saveChanges() {
    this.perfilService.updateData(this.editedUser).subscribe({
      next: updatedData => {
        this.user = updatedData; // Atualiza os dados exibidos com os dados retornados após a atualização
        this.editMode = false; // Sai do modo de edição após a atualização bem-sucedida
      },
      error: error => {
        console.error('Erro ao atualizar dados do usuário', error);
        // Trate o erro como necessário
      }
    });
  }

}





