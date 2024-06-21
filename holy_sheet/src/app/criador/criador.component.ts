import { FichaService } from './../data/ficha.service';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from "../header/header.component";

@Component({
    selector: 'app-criador',
    standalone: true,
    templateUrl: './criador.component.html',
    styleUrls: ['./criador.component.css'],
    imports: [FormsModule, HeaderComponent]
})
export class CriadorComponent {
  ficha_nome: string = '';
  ficha_raca: string = '';
  ficha_classe: string = '';
  ficha_nivel: number | undefined;

  ficha_str: number | undefined;
  ficha_dex: number | undefined;
  ficha_con: number | undefined;
  ficha_int: number | undefined;
  ficha_sab: number | undefined;
  ficha_cha: number | undefined;

  constructor(private fichaService: FichaService) { }

  onSubmit() {
    const dados = {
  ficha_nome: this.ficha_nome,
  ficha_raca: this.ficha_raca,
  ficha_classe: this.ficha_classe,
  ficha_nivel: this.ficha_nivel,
  ficha_str: this.ficha_str,
  ficha_dex: this.ficha_dex,
  ficha_con: this.ficha_con,
  ficha_int: this.ficha_int,
  ficha_sab: this.ficha_sab,
  ficha_cha: this.ficha_cha
    };

    this.fichaService.addData(dados).subscribe(
      {next:response => console.log('Dados enviados com sucesso', response),
      error:error => console.error('Erro ao enviar dados', error)
      }
    );
  }
}
