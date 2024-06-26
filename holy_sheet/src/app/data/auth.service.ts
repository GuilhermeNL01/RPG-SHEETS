// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, private router: Router, public jwtHelper: JwtHelperService) {}

  login(nome_usuario: string, senha_usuario: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { nome_usuario, senha_usuario });
  }

  logout(): void {
    localStorage.removeItem('token');
    console.log('usuário deslogado');
    this.router.navigate(['/login']);
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  register(nome_usuario: string, senha_usuario: string, otherDetails: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/cadastros`, { nome_usuario, senha_usuario, ...otherDetails });
  }

  // Método para obter o token do localStorage
  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
