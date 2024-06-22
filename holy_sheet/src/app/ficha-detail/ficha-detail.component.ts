import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FichaService } from '../data/ficha.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-ficha-detail',
  templateUrl: './ficha-detail.component.html',
  styleUrls: ['./ficha-detail.component.css']
})
export class FichaDetailComponent implements OnInit {
  ficha: any;
  editMode = false;
  originalFicha: any; // Para armazenar a ficha original antes da edição

  constructor(
    private route: ActivatedRoute,
    private fichaService: FichaService,
    private location: Location
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id_ficha');
    if (id) {
      this.fichaService.getFichaById(id).subscribe({
        next: data => {
          this.ficha = data;
          // Faz uma cópia da ficha original para poder cancelar a edição se necessário
          this.originalFicha = { ...this.ficha };
        },
        error: error => {
          console.error('Erro ao buscar ficha', error);
        }
      });
    } else {
      console.error('ID da ficha não encontrado na rota');
    }
  }

  deleteFicha(): void {
    if (confirm('Tem certeza que deseja deletar esta ficha?')) {
      const id = this.ficha.id_ficha; // Supondo que o ID esteja disponível na ficha
      this.fichaService.deleteData(id).subscribe({
        next: () => {
          console.log('Ficha deletada com sucesso');
          // Você pode redirecionar ou tomar outra ação após a deleção
          this.location.back(); // Volta para a página anterior após a deleção
        },
        error: error => {
          console.error('Erro ao deletar ficha', error);
        }
      });
    }
  }

  toggleEditMode(): void {
    this.editMode = true;
  }

  saveFicha(): void {
    // Chama o serviço para atualizar a ficha no backend
    this.fichaService.updateFicha(this.ficha).subscribe({
      next: () => {
        console.log('Ficha atualizada com sucesso');
        this.editMode = false; // Sai do modo de edição após salvar
      },
      error: (error: any) => {
        console.error('Erro ao salvar ficha', error);
      }
    });
  }

  cancelEdit(): void {
    // Cancela a edição e restaura a ficha original
    this.ficha = { ...this.originalFicha };
    this.editMode = false;
  }
}
