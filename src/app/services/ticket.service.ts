import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ticket } from '../shared/ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private apiUrl = 'http://localhost:8081';

  constructor(private http: HttpClient) { }

  getAllTickets(): Observable<Ticket[]> {
    console.log('Fetching all tickets');
    return this.http.get<Ticket[]>(`${this.apiUrl}/getTickets`);
  }

  getTicketById(numTicket: number): Observable<Ticket> {
    console.log(`Fetching ticket by ID: ${numTicket}`);
    return this.http.get<Ticket>(`${this.apiUrl}/getTicket/${numTicket}`);
  }

  addTicket(ticket: Ticket): Observable<Ticket> {
    console.log('Adding ticket:', ticket);
    return this.http.post<Ticket>(`${this.apiUrl}/addTicket`, ticket);
  }

  updateTicket(numTicket: number, ticket: Ticket): Observable<Ticket> {
    console.log(`Updating ticket ID: ${numTicket}`, ticket);
    return this.http.put<Ticket>(`${this.apiUrl}/updateTicket/${numTicket}`, ticket);
  }

  deleteTicket(numTicket: number): Observable<void> {
    console.log(`Deleting ticket ID: ${numTicket}`);
    return this.http.delete<void>(`${this.apiUrl}/deleteTicket/${numTicket}`);
  }

  getMaxTicketNumber(): Observable<number> {
    console.log('Fetching max ticket number');
    return this.http.get<number>(`${this.apiUrl}/maxTicketNumber`);
  }

  getNextTicket(status: string, service: string): Observable<Ticket> {
    const params = new HttpParams()
      .set('status', status)
      .set('service', service);
    return this.http.get<Ticket>(`${this.apiUrl}/nextTicket`, { params });
  }
  
}
