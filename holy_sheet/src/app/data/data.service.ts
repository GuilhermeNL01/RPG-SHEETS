import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { data } from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:3000/cadastros';
  private loginUrl = 'http://localhost:3000/cadastros'

  constructor(private http: HttpClient) { }

  getData(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addData(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  updateData(data: any): Observable<any> {
    return this.http.put<any>(this.apiUrl, data);
  }

  deleteData(data: any): Observable<any> {
    return this.http.delete<any>(this.apiUrl, data);
  }

  login(nome_usuario: string, senha_usuario: string): Observable<any> {
    const url = `${this.loginUrl}?nome_usuario=${nome_usuario}&senha_usuario=${senha_usuario}`;
    return this.http.get<any>(url);
  }


}


