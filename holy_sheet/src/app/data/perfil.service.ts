import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  private apiUrl = 'http://localhost:3000/cadastros';

  constructor(private http: HttpClient) { }

  getProfile(): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      // Trate o caso em que o token não existe no localStorage
      throw new Error('Token não encontrado no localStorage');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(this.apiUrl, { headers });
  }
}


