import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  private apiUrl = 'http://localhost:3000/cadastros';

  constructor(private http: HttpClient) { }

  getProfile(): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token não encontrado no localStorage');
    }

    console.log('Token encontrado:', token);

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(this.apiUrl, { headers }).pipe(
      tap({
        next: (data) => {
          console.log('Dados recebidos:', data);
        },
        error: (error) => {
          console.error('Erro na requisição:', error);
        }
      })
    );
  }


}


