import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Poste } from '../shared/poste';

@Injectable({
  providedIn: 'root'
})
export class BureauPosteService {
  private apiUrl = 'http://localhost:8081';

  constructor(private http: HttpClient) { }

  getAllPostes(): Observable<Poste[]> {
    return this.http.get<Poste[]>(`${this.apiUrl}/getPosts`);
  }

  getPosteByCodePostal(code_postal: number): Observable<Poste> {
    return this.http.get<Poste>(`${this.apiUrl}/getPoste/${code_postal}`);
  }

  addPoste(poste: Poste): Observable<Poste> {
    return this.http.post<Poste>(`${this.apiUrl}/addPoste`, poste);
  }

  updatePoste(code_postal: number, poste: Poste): Observable<Poste> {
    return this.http.put<Poste>(`${this.apiUrl}/updatePoste/${code_postal}`, poste);
  }

  deletePoste(code_postal: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deletePoste/${code_postal}`);
  }
  getUniquePoste(): Observable<Poste> {
    return this.http.get<Poste>(`${this.apiUrl}/getUniquePoste`);
  }
}
