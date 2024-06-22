import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FichaService {
  private apiUrl = 'http://localhost:3000/ficha';

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

  getFichaById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }
}
