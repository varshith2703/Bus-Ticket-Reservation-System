import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BusDataService } from '../../shared/bus-data.service';
import { Passenger } from '../../models/passenger.model';
import { BookingService } from '../../services/booking.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {
  busId: string = '';
  passengerDetails: Passenger[] = [];
  busName: string | undefined;
  fromStation: string | undefined;
  toStation: string | undefined;
  totalPrice: number = 0;
  finalAmount: number = 0;
  passengerPrices: number[] = [];
  gst: number = 0;
  showDetails: boolean[] = []; // Array to store visibility status for each passenger
  bprice: number = 0;
  pgage: number[] = [];
  showPaymentDetails: { [key: string]: boolean } = {
    upi: false,
    credit: false,
    debit: false
  };

  constructor(
    private route: ActivatedRoute,
    private busDataService: BusDataService,
    private bookingService: BookingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get the busId and passengerDetails from the route query parameters
    const state = history.state;
    if (state) {
      this.passengerDetails = state.passengers;
      this.busId = state.busId;
  
      // Fetch bus details using the busId
      const bus = this.busDataService.getBusById(this.busId);
      if (bus) {
        this.busName = bus.name;
        this.fromStation = bus.fromStation;
        this.toStation = bus.toStation;
        this.bprice = bus.price;

        // Calculate price for each passenger
        this.passengerDetails.forEach(passenger => {
          let price = bus.price;

          // Reduce price based on passenger age if age is available
          if (passenger.age !== null && passenger.age !== undefined) {
            this.pgage.push(passenger.age);
            if (passenger.age < 10) {
              price *= 0.75; // Reduce by 25%
            } else if (passenger.age > 65) {
              price *= 0.85; // Reduce by 15%
            }
          }

          // Add extra charge for specific seat numbers
          if (passenger.seatNo.includes('A') || passenger.seatNo.includes('C')) {
            price += 200;
          }

          this.passengerPrices.push(price)
          this.showDetails.push(false); // Initialize visibility status for each passenger to false

          // Add price to total price
          this.totalPrice += price;
        });

        // Calculate GST
        this.gst = Math.round((this.totalPrice * 0.18) * 100) / 100;
        
        // Calculate final amount
        this.finalAmount = Math.round((this.totalPrice * 1.18) * 100) / 100;
      } else {
        console.error('Bus not found with ID:', this.busId);
      }
      console.log('Passenger Details:', this.passengerDetails); // Check if passenger details are received
    }
  }

  toggleDetails(index: number): void {
    this.showDetails[index] = !this.showDetails[index]; // Toggle visibility status
  }


  togglePaymentDetails(option: string): void {
    // Toggle visibility of payment details
    for (const key in this.showPaymentDetails) {
      if (Object.prototype.hasOwnProperty.call(this.showPaymentDetails, key)) {
        this.showPaymentDetails[key] = key === option ? !this.showPaymentDetails[key] : false;
      }
    }
  }

  confirmPayment(paymentOption: string): void {
    let taxRate: number;
    
    // Determine the tax rate based on the payment option
    switch(paymentOption) {
      case 'upi':
        taxRate = 0.03; // UPI tax rate
        break;
      case 'credit':
        taxRate = 0.01; // Credit card tax rate
        break;
      case 'debit':
        taxRate = 0.02; // Debit card tax rate
        break;
      default:
        taxRate = 0; // Default tax rate
    }
    
    // Calculate the payable amount including tax
    const payableAmount = this.finalAmount * (1 + taxRate);
    
    const bookingData = {
      busId: this.busId,
      passengers: this.passengerDetails,
      payableAmount: payableAmount
    };
  
    this.bookingService.createBooking(bookingData).subscribe(
      response => {
        // Call function to update seatNos after successful booking
        this.bookingService.updateSeatNos(this.busId, this.passengerDetails.map(passenger => passenger.seatNo)).subscribe(
          () => {
            // Display success message and navigate to bookings page
            alert('Booking successfully');
            // Navigate to bookings page
            this.router.navigate(['/booking']);
          },
          error => {
            console.error('Error updating seatNos:', error);
            alert('Error updating seat numbers');
          }
        );
      },
      error => {
        console.error('Error creating booking:', error);
        alert('Error creating booking');
      }
    );
  }
}
