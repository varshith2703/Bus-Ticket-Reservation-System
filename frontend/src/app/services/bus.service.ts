// bus.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  searchBuses(fromStation: string, toStation: string, departureDate: string): Observable<any> {
    const url = `${this.apiUrl}/busDetails/search`;

    // Create payload with search criteria
    const payload = {
      fromStation,
      toStation,
      departureDate
    };

    // Make POST request to backend with payload
    return this.http.post(url, payload);
  }
  // Method to fetch a bus by its ID
  getBusById(busId: string): Observable<any> {
    const url = `${this.apiUrl}/${busId}`;
    return this.http.get<any>(url)
      .pipe(
        catchError(error => {
          console.error('Error fetching bus:', error);
          throw error; // Rethrow the error for the caller to handle
        })
      );
  }
}
