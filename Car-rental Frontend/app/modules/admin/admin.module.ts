import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { PostCarComponent } from './components/post-car/post-car.component';
import { NgZorroImportsModule } from '../../NgZorroImportsModule';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { UpdateCarComponent } from './components/update-car/update-car.component';
import { GetBookingsComponent } from './components/get-bookings/get-bookings.component';


@NgModule({
  declarations: [
    AdminDashboardComponent,
    PostCarComponent,
    UpdateCarComponent,
    GetBookingsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgZorroImportsModule,
    NzSpinModule,
    ReactiveFormsModule,
    FormsModule

  ]
})
export class AdminModule { }
