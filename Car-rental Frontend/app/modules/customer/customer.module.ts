import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerDashboardComponent } from './components/customer-dashboard/customer-dashboard.component';
import { BookCarComponent } from './components/book-car/book-car.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NgZorroImportsModule } from '../../NgZorroImportsModule';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyBookingsComponent } from './components/my-bookings/my-bookings.component';


@NgModule({
  declarations: [
    CustomerDashboardComponent,
    BookCarComponent,
    MyBookingsComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    NzButtonModule,
    NgZorroImportsModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class CustomerModule { }
