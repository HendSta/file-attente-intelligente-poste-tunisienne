import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable , BehaviorSubject} from 'rxjs';
import { Employe } from '../shared/employe';
import { Client } from '../shared/client';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8081';
  private userRole: string = '';
  private loggedIn = new BehaviorSubject<boolean>(false); // Utilisation de BehaviorSubject pour gérer l'état de connexion
  private loggedInCin: number = 0;
  public userRoleSubject = new BehaviorSubject<string | null>(null);
  private tokenKey = 'auth_token';
  private userRoleKey = 'user_role';
  private currentUserSubject = new BehaviorSubject<Employe | null>(null);
  public currentUser = this.currentUserSubject.asObservable();
  private userIdKey = 'cin';

  constructor(private http: HttpClient,private router: Router) {}

  // Méthodes pour les employés

  getAllEmployes(): Observable<Employe[]> {
    return this.http.get<Employe[]>(`${this.baseUrl}/employes`);
  }

  getEmployeById(cin: number): Observable<Employe> {
    return this.http.get<Employe>(`${this.baseUrl}/employe/${cin}`);
  }

  saveEmploye(employe: Employe): Observable<Employe> {
    return this.http.post<Employe>(`${this.baseUrl}/addEmploye`, employe);
  }

  updateEmploye(cin: number, employe: Employe): Observable<Employe> {
    return this.http.put<Employe>(`${this.baseUrl}/updateEmploye/${cin}`, employe);
  }

  deleteEmploye(cin: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteEmploye/${cin}`);
  }

  searchEmployes(term: string): Observable<Employe[]> {
    const params = new HttpParams().set('term', term);
    return this.http.get<Employe[]>(`${this.baseUrl}/employes/search`, { params });
  }
  

  // Méthodes pour les clients

  getAllClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.baseUrl}/getClients`);
  }

  getClientById(cin: number): Observable<Client> {
    return this.http.get<Client>(`${this.baseUrl}/getClient/${cin}`);
  }

  saveClient(client: Client): Observable<Client> {
    return this.http.post<Client>(`${this.baseUrl}/addClient`, client);
  }

  updateClient(cin: number, client: Client): Observable<Client> {
    return this.http.put<Client>(`${this.baseUrl}/updateClient/${cin}`, client);
  }

  deleteClient(cin: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteClient/${cin}`);
  }

  // Authentification

  authenticate(email: string, mdp: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth/auth`, { email, mdp });
  }

  setUserRole(role: string): void {
    this.userRole = role;
  }

  getUserRole(): string {
    return this.userRole;
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  setLoggedIn(value: boolean): void {
    this.loggedIn.next(value);
  }

  getLoggedInCin(): number {
    const cin = Number(localStorage.getItem('cin'));
    console.log('CIN retrieved from localStorage:', cin);
    return cin;
  }
  

  setLoggedInCin(cin: number): void {
    this.loggedInCin = cin;
  }

   // Fetch logged-in user data
   fetchLoggedInUser(cin: number): void {
    this.getEmployeById(cin).subscribe(
      (user: Employe) => {
        this.currentUserSubject.next(user);
      },
      (error) => {
        console.error('Error fetching logged-in user:', error);
      }
    );
  }

 


  // Méthode pour se connecter et obtenir le jeton d'authentification
  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth/auth`, credentials).pipe(
      tap((response) => {
        if (response.cin && response.role) {
          this.storeAuthentication(response.token, response.role);
          this.storeUserId(response.cin); // Assurez-vous que cette ligne stocke correctement le CIN
          this.userRoleSubject.next(response.role);
          console.log('Stored CIN:', response.cin);
        } else {
          console.error('Invalid response format from server');
        }
      })
    );
  }
  
  
  
  
  private storeUserId(cin: number): void {
    localStorage.setItem('cin', cin.toString());
    console.log('CIN stored in localStorage:', localStorage.getItem('cin'));
  }

  // Méthode pour stocker le jeton d'authentification et le rôle de l'utilisateur dans le stockage local
  storeAuthentication(token: string, role: string): void {
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.userRoleKey, role);
  }
  
  setCurrentUser(user: Employe): void {
    this.currentUserSubject.next(user);
  }

  logout(): void {
    this.userRole = '';
    this.setLoggedIn(false);
    //localStorage.clear();
    this.router.navigateByUrl('/signin');
  }

  getCurrentUser(): Employe | null {
    return this.currentUserSubject.getValue();
  }
  
}
