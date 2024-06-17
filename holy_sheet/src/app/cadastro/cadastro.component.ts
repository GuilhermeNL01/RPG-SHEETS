import { Component } from '@angular/core';
import { DataService } from '../data/data.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [FormsModule],
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
      nome: this.nome_usuario,
      senha: this.senha_usuario,
      email: this.email_usuario,
    };

    this.datasService.addData(dados).subscribe(
      {next:response => console.log('Dados enviados com sucesso', response),
      error:error => console.error('Erro ao enviar dados', error)
      }
    );
  }
}
