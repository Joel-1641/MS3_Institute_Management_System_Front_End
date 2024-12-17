import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode'; 


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:5256/api/Admin';
  private tokenKey = 'authToken';

  constructor(private http: HttpClient, private router: Router) {}

  // Authenticate the user (student or lecturer)
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  // Save the JWT token in localStorage
  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  // Retrieve the JWT token from localStorage
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Decode the JWT token and extract the userId
  decodeToken(): any {
    const token = this.getToken();
    if (token) {
      try {
        return jwt_decode(token);  // Decode the token using jwt-decode
      } catch (error) {
        console.error('Error decoding token', error);
        return null;
      }
    }
    return null;
  }

  // Get the userId from the decoded token
  getUserId(): number | null {
    const decodedToken = this.decodeToken();
    // If the token is successfully decoded and contains a UserId
  if (decodedToken && decodedToken.UserId !== undefined) {
    // Save the UserId to localStorage
    localStorage.setItem('UserId', decodedToken.UserId.toString());
    return decodedToken.UserId;
  }

    return decodedToken ? decodedToken.UserId : null;
    
  }

  // Log out the user by removing the token from localStorage
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem('UserId');
    this.router.navigate(['/logout']);
  }
}
