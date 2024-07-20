import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BusDataService } from '../../shared/bus-data.service';
import { Passenger } from '../../models/passenger.model';
import { PassengerService } from '../../services/passenger.service';


@Component({
  selector: 'app-select-seats',
  templateUrl: './select-seats.component.html',
  styleUrls: ['./select-seats.component.css']
})
export class SelectSeatsComponent implements OnInit {
  busId: string = '';
  selectedBus: any;
  passengers: Passenger[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private busDataService: BusDataService,
    private passengerService: PassengerService
  ) {}

  ngOnInit(): void {
    // Get the busId from the query parameters
    this.route.queryParams.subscribe(params => {
      this.busId = params['busId'];
      if (this.busId) {
        // Fetch details of the selected bus from the BusDataService
        this.selectedBus = this.busDataService.getBusById(this.busId);
        console.log('Selected Bus:', this.selectedBus);
      }
    });
  }

  addPassenger(): void {
    // Create a new passenger object and push it to the passengers array
    this.passengers.push({
      name: '',
      age: null,
      gender: '',
      phoneNumber: '',
      seatNo: ''
    });
  }

  removePassenger(): void {
    if (this.passengers.length > 0) {
      this.passengers.pop();
    }
  }

  proceedToNextPage(): void {
    // Construct payload with passengers and busId
    const payload = {
      passengers: this.passengers,
      busId: this.busId
    };
  
    // Call insertPassengers from PassengerService
    this.passengerService.insertPassengers(payload).subscribe(
      (response: any) => {
        console.log('Passenger details inserted successfully:', response);
        // Navigate to the next page with payload as query parameters
        this.router.navigateByUrl('/bill', { state: { passengers: this.passengers, busId: this.busId } });
      },
      (error: any) => {
        console.error('Error inserting passenger details:', error);
      }
    );
  }  
  
  isSeatAvailable(seat: string): boolean {
    // Check if the seat is available (not booked)
    return this.selectedBus.seatNos.includes(seat);
  }
}
