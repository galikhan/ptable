import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.domain;

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/login', { username, password });
  }

  isAuthenticated() {
    const storedData = localStorage.getItem('access_info')
    try {
      // Parse the JSON data
      // @ts-ignore
      const parsedData = JSON.parse(storedData);
      return !!(parsedData && parsedData.access_token);
      // Continue with your logic using parsedData
    } catch (error) {
      // Handle the error
      console.error('Error parsing JSON from localStorage:', error);

      // Optionally, you can provide a default value or take other actions
      // For example, setting default value:
      const defaultValue = { key: 'default' };
      console.log('Using default value:', defaultValue);
      return false;
    }
  }

  getToken() {
    const storedData = localStorage.getItem('access_info');
    // @ts-ignore
    const parsedData = JSON.parse(storedData);
    if (parsedData) {
      return parsedData.access_token;
    }
  }

  token(): string {
    const jwt = localStorage.getItem('jwt_sart');
    if (jwt) {
      const parsed = JSON.parse(jwt)
      return parsed.access_token;
    }
    return '';
  }
}
