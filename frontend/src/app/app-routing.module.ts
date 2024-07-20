import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BusDetailsComponent } from './pages/bus-details/bus-details.component';
import { SelectSeatsComponent } from './pages/select-seats/select-seats.component';
import { BillComponent } from './pages/bill/bill.component';
import { BookingComponent } from './pages/bookings/bookings.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'bus-details', component: BusDetailsComponent },
  { path: 'select-seats', component: SelectSeatsComponent},
  { path: 'bill', component: BillComponent},
  { path: 'booking', component: BookingComponent} // Corrected path name
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
