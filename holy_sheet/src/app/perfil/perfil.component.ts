import { Component, OnInit } from '@angular/core';
import { PerfilService } from '../data/perfil.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit {

  user: any;

  constructor(private perfilService: PerfilService) { }

  ngOnInit(): void {
    this.perfilService.getProfile().subscribe(data => {
      this.user = data;
    });
  }
}


