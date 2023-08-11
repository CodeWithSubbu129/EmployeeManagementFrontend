import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/Employee.model';
import { JwtclientService } from './jwtclient.service';
import { UserDetails } from '../models/UserDetails.model';

@Injectable({
  providedIn: 'root',
})
export class DataService implements OnInit {
  BASE_URL = 'http://localhost:8080/api';
  userDetails = new UserDetails();
  headers!: HttpHeaders;
  jwtToken!: string;

  constructor(private http: HttpClient, private jwtService: JwtclientService) {
    this.getJwt(this.userDetails.authRequest);
  }
  ngOnInit(): void {}

  saveTrainerDetails(employee: any): Observable<any> {
    return this.http.post<any>(`${this.BASE_URL}/employee`, employee, {
      headers: new HttpHeaders({
        Authorization: this.jwtToken,
      }),
    });
  }

  getTrainerDetails(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.BASE_URL}/employee/list`, {
      headers: new HttpHeaders({
        Authorization: this.jwtToken,
      }),
    });
  }

  getTrainerDetailsById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.BASE_URL}/employee/${id}`, {
      headers: new HttpHeaders({
        Authorization: this.jwtToken,
      }),
    });
  }

  deleteTrainerById(id: number): Observable<Object> {
    return this.http.delete<Object>(`${this.BASE_URL}/employee/${id}`, {
      headers: new HttpHeaders({
        Authorization: this.jwtToken,
      }),
    });
  }

  updateTrainerById(id: number, employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(
      `${this.BASE_URL}/employee/${id}`,
      employee,
      {
        headers: new HttpHeaders({
          Authorization: this.jwtToken,
        }),
      }
    );
  }

  getJwt(authRequest: any) {
    console.log(authRequest);
    this.jwtService.getJwtToken(authRequest).subscribe(
      (token) => {
        console.log(token.jwt);
        // this.setHeader(token.jwt);
        this.jwtToken = 'Bearer ' + token.jwt;
      },
      (error) => {}
    );
  }

  // setHeader(token: string) {
  //   this.jwtToken = 'Bearer ' + token;
  //   console.log('before' + this.jwtToken);
  // }
}
