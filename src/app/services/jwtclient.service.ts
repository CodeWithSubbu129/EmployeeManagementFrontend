import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JwtclientService {
  constructor(private http: HttpClient) {}

  getJwtToken(authRequest: any): Observable<any> {
    return this.http.post('http://localhost:8080/authenticate', authRequest, {
      responseType: 'json',
    });
  }
}
