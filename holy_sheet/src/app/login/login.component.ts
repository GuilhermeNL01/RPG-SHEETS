import { Component } from '@angular/core';
import { DataService } from '../data/data.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  nome_usuario: string = '';
  senha_usuario: string = '';

  constructor(private datasService: DataService) { }

  onSubmit() {

    const dados = {
      nome_usuario: this.nome_usuario,
      senha_usuario: this.senha_usuario,
    };

    this.datasService.login(this.nome_usuario, this.senha_usuario).subscribe(
      {
      next:response => console.log('Dados enviados com sucesso', response),
      error:error => console.error('Erro ao enviar dados', error)
      }
    );
  }

}
