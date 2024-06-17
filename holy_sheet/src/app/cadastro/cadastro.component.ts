import { Component } from '@angular/core';
import { DataService } from '../data/data.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {

  nome_usuario: string = '';
  senha_usuario: string = '';
  email_usuario: string = '';

  constructor(private datasService: DataService) { }

  onSubmit() {
    const dados = {
      nome_usuario: this.nome_usuario,
      senha_usuario: this.senha_usuario,
      email_usuario: this.email_usuario,
    };

    this.datasService.addData(dados).subscribe(
      {next:response => console.log('Dados enviados com sucesso', response),
      error:error => console.error('Erro ao enviar dados', error)
      }
    );
  }
}
