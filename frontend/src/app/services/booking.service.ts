// booking.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = 'http://localhost:3000/api/bookings';

  constructor(private http: HttpClient) { }

  // Function to create a new booking
  createBooking(bookingData: any):Observable<any> {
    return this.http.post<any>(this.apiUrl, bookingData);
  }

  getBookings(): Observable<any> {
    return this.http.get<any[]>(this.apiUrl);
  }

  updateSeatNos(busId: string, seatNosToRemove: string[]): Observable<any> {
    const updateData = {
      busId: busId,
      seatNosToRemove: seatNosToRemove
    };
    return this.http.patch<any>(`${this.apiUrl}/updateSeatNos`, updateData);
  }

}
