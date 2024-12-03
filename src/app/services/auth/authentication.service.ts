import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', // Available throughout the app
})
export class AuthenticationService {
  private readonly TOKEN_KEY = 'authToken';

  // Get JWT token from localStorage or sessionStorage
  // getToken(): string | null {
  //   return localStorage.getItem(this.TOKEN_KEY);
  // }

  // Save JWT token to localStorage
  // saveToken(token: string): void {
  //   localStorage.setItem(this.TOKEN_KEY, token);
  // }

  // Remove JWT token from localStorage (used during logout)
  // removeToken(): void {
  //   localStorage.removeItem(this.TOKEN_KEY);
  // }

  // Check if the user is authenticated by verifying if a token exists
  // isAuthenticated(): boolean {
  //   return !!this.getToken();
  // }
}
