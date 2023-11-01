import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000';
  private jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string): Observable<any> {
    const loginPayload = { email, password };
    return this.http.post(`${this.apiUrl}/login`, loginPayload).pipe(
      tap((response: any) => {
        const token = response.token;
        if (token) {
          localStorage.setItem('access_token', token);
          const decodedToken = this.jwtHelper.decodeToken(token);
          if (decodedToken.userType === 'teacher') {
            setTimeout(() => {
              this.router.navigate(['/teacher-dashboard']);
            }, 1000);
          } else {
            setTimeout(() => {
              this.router.navigate(['/student-home']);
            }, 1000);
          }
        }
      })
    );
  }

  getUserInfo(): Observable<any> {
    const token = this.getToken();
    if (token) {
      const headers = { Authorization: `Bearer ${token}` };
      return this.http.get(`${this.apiUrl}/user-info`, { headers });
    } else {
      return of(null);
    }
  }

  getUserType(): string | null {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken.userType || null;
    }
    return null;
  }
  
  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return token ? !this.jwtHelper.isTokenExpired(token) : false;
  }

  logout(): void {
    localStorage.removeItem('access_token');
    this.router.navigate(['/login']);
  }
}