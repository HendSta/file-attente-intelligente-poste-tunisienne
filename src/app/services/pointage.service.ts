import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pointage } from '../shared/pointage';

@Injectable({
  providedIn: 'root'
})
export class PointageService {
  private apiUrl = 'http://localhost:8081'; 

  constructor(private http: HttpClient) { }

  addPointage(pointage: Pointage): Observable<Pointage> {
    return this.http.post<Pointage>(`${this.apiUrl}/addPointage`, pointage);
  }

  getAllPointages(): Observable<Pointage[]> {
    return this.http.get<Pointage[]>(`${this.apiUrl}/getPointages`);
  }

  getPointageById(id: string): Observable<Pointage> {
    return this.http.get<Pointage>(`${this.apiUrl}/getPointage/${id}`);
  }

  updatePointage(id: string, pointage: Pointage): Observable<Pointage> {
    return this.http.put<Pointage>(`${this.apiUrl}/updatePointage/${id}`, pointage);
  }

  deletePointage(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deletePointage/${id}`);
  }

  getPointageByCINandDate(cinEmploye: number, dateDebut: string): Observable<Pointage> {
    const url = `${this.apiUrl}/pointage?cinEmploye=${cinEmploye}&dateDebut=${dateDebut}`;
    return this.http.get<Pointage>(url);
  }

  searchPointages(term: string): Observable<Pointage[]> {
    return this.http.get<Pointage[]>(`${this.apiUrl}/searchPointages`, { params: { term } });
  }
  
  getEmployeeNameByCIN(cinEmploye: number): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/employeName/${cinEmploye}`); // Remplacer par l'API réelle
  }

}
