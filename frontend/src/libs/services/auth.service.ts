import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthPayload } from '../types/types';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) {}

  public isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }

  public goToLoginPage() {
    this.router.navigate(['/auth/login']);
  }

  public goToAdminPage() {
    this.router.navigate(['/admin']);
  }

  public saveUserInLocalStorage(payload: AuthPayload) {
    localStorage.setItem('user', JSON.stringify(payload));
  }

  public login(payload: AuthPayload): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, payload);
  }

  public logout() {
    localStorage.removeItem('user');
  }
}
