import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FichaService } from '../data/ficha.service';
import { HeaderComponent } from "../header/header.component";
import { Location } from '@angular/common';

@Component({
    selector: 'app-ficha-detail',
    standalone: true,
    templateUrl: './ficha-detail.component.html',
    styleUrls: ['./ficha-detail.component.css'],
    imports: [CommonModule, HeaderComponent]
})
export class FichaDetailComponent implements OnInit {
  ficha: any;

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

  editFicha(): void {
    // Implementar a lógica para navegação para a página de edição, passando o ID da ficha
    // Exemplo de navegação para uma rota de edição:
    // this.router.navigate(['/fichas', this.ficha.id, 'edit']);
  }
}
