import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FichaService } from '../data/ficha.service';
import { HeaderComponent } from "../header/header.component";

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
    private fichaService: FichaService
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
    }
  }
}
