import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Guichet } from '../shared/guichet';  // Assurez-vous que le chemin est correct

@Injectable({
  providedIn: 'root'
})
export class GuichetService {
  private baseUrl = 'http://localhost:8081';  // URL de votre backend

  constructor(private http: HttpClient) {}

  getAllGuichets(): Observable<Guichet[]> {
    return this.http.get<Guichet[]>(`${this.baseUrl}/getGuichets`);
  }

  getGuichetById(num_guichet: number): Observable<Guichet> {
    return this.http.get<Guichet>(`${this.baseUrl}/getGuichet/${num_guichet}`);
  }

  addGuichet(guichet: Guichet): Observable<Guichet> {
    return this.http.post<Guichet>(`${this.baseUrl}/addGuichet`, guichet);
  }

  updateGuichet(num_guichet: number, guichet: Guichet): Observable<Guichet> {
    return this.http.put<Guichet>(`${this.baseUrl}/updateGuichet/${num_guichet}`, guichet);
  }

  deleteGuichet(num_guichet: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteGuichet/${num_guichet}`);
  }

  getGuichetByCin(cinEmploye: number): Observable<Guichet> {
    return this.http.get<Guichet>(`${this.baseUrl}/getGuichetByCinEmploye/${cinEmploye}`);
  }
}
