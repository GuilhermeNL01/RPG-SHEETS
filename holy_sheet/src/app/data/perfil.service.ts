import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  private apiUrl = 'http://localhost:3000/cadastros';

  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<any>(this.apiUrl, { headers }).pipe(
      catchError(error => {
        console.error('Erro ao buscar fichas', error);
        return throwError(error);
      })
    );
  }

  updateData(data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${data.id_usuario}`, data);
  }


  deleteData(data: any): Observable<any> {
    return this.http.delete<any>(this.apiUrl, data);
  }
}




