import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BusDataService } from '../../shared/bus-data.service';

@Component({
  selector: 'app-bus-details',
  templateUrl: './bus-details.component.html',
  styleUrls: ['./bus-details.component.css']
})
export class BusDetailsComponent implements OnInit {
  buses: any[] = [];
  showNoBusesMessage = false; // Flag to control the display of no buses message

  constructor(private busDataService: BusDataService, private router: Router) {}

  ngOnInit(): void {
    this.busDataService.currentBuses.subscribe(buses => {
      this.buses = buses;
      console.log('Received buses:', this.buses);
      this.showNoBusesMessage = this.buses.length === 0; // Set flag based on whether buses array is empty
    });
  }

  viewSeats(bus: any): void {
    // Navigate to the select-seats view for the selected bus
    this.router.navigate(['/select-seats'], { queryParams: { busId: bus._id } });
  }
}