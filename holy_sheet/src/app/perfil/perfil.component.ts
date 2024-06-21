import { Component, OnInit } from '@angular/core';
import { PerfilService } from '../data/perfil.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  user: any;

  constructor(private perfilService: PerfilService) { }

  ngOnInit(): void {
    this.perfilService.getProfile().subscribe({

      next:(data) => {
        this.user = data;
      },
      error:error => {
        console.error('Erro ao obter perfil:', error);
        // Tratar o erro de forma apropriada
      }
  });
  }
}



