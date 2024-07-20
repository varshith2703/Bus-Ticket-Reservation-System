// shared/bus-data.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BusDataService {
  private busesSource = new BehaviorSubject<any[]>([]);
  currentBuses = this.busesSource.asObservable();

  constructor() {}

  updateBuses(buses: any[]) {
    this.busesSource.next(buses);
  }
  getBusById(busId: string): any {
    const buses = this.busesSource.getValue();
    return buses.find(bus => bus._id === busId);
  }
}
