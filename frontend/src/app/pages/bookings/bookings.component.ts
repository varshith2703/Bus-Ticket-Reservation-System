import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { Booking } from '../../models/booking.model';
import { BusDataService } from '../../shared/bus-data.service';

@Component({
  selector: 'app-booking',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingComponent implements OnInit {
  bookings: Booking[] = [];
  name: string = '';
  fromStation: string = '';
  toStation: string = '';
  departureTime: string = '';
  arrivalTime: string = '';
  noBookings: boolean = false; // Flag to indicate if there are no bookings

  constructor(private bookingService: BookingService, private busDataService: BusDataService) { }

  ngOnInit(): void {
    this.fetchBookings();
  }

  fetchBookings(): void {
    this.bookingService.getBookings().subscribe(
      (bookings: Booking[]) => {
        this.bookings = bookings;
        if (this.bookings.length === 0) {
          this.noBookings = true; // Set flag to true if there are no bookings
        } else {
          this.fetchBusDetailsForBookings();
        }
      },
      error => {
        console.error('Error fetching bookings:', error);
      }
    );
  }

  fetchBusDetailsForBookings(): void {
    this.bookings.forEach(async (booking) => {
      try {
        const busDetails = await this.busDataService.getBusById(booking.busId);
        this.name = busDetails.name;
        this.fromStation = busDetails.fromStation;
        this.toStation = busDetails.toStation;
        this.departureTime = busDetails.departureTime;
        this.arrivalTime = busDetails.arrivalTime;
      } catch (error) {
        console.error('Error fetching bus details:', error);
      }
    });
  }
}
