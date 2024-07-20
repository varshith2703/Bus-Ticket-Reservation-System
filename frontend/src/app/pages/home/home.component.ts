import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BusService } from '../../services/bus.service';
import { BusDataService } from '../../shared/bus-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  fromStation: string = 'station'; // Define fromStation property
  toStation: string = 'station';   // Define toStation property
  departureDate: string = ''; // Define departureDate property

  constructor(
    private busService: BusService,
    private busDataService: BusDataService,
    private router: Router
  ) {}

  onSubmit(): void {
    if (this.fromStation && this.toStation && this.departureDate) {
      this.busService.searchBuses(this.fromStation, this.toStation, this.departureDate)
        .subscribe(
          (buses) => {
            console.log('Received buses:', buses);
            this.busDataService.updateBuses(buses); // Update buses data
            this.router.navigate(['/bus-details']); // Navigate to bus details page
          },
          (error) => {
            console.error('Error fetching buses:', error);
            // Handle error (e.g., show error message to user)
          }
        );
    } else {
      console.log('Missing input fields');
      // Handle missing input fields (e.g., show error message to user)
    }
  }
}
