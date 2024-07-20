import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Passenger } from '../models/passenger.model';

@Injectable({
  providedIn: 'root'
})
export class PassengerService {
  private apiUrl = 'http://localhost:3000/api/passengers'; // Update URL to match your backend

  constructor(private http: HttpClient) {}

  insertPassengers(payload: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, payload);
  }
}
