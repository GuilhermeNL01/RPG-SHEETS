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
}
