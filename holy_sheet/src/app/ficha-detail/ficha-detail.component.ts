import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FichaService } from '../data/ficha.service';

@Component({
  selector: 'app-ficha-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ficha-detail.component.html',
  styleUrls: ['./ficha-detail.component.css']
})
export class FichaDetailComponent implements OnInit {
  ficha: any;

  constructor(
    private route: ActivatedRoute,
    private fichaService: FichaService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
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
