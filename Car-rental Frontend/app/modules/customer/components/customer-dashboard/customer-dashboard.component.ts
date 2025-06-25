import { Component, NgModule, ViewEncapsulation } from '@angular/core';
import { CustomerService } from '../../service/customer.service';
import { NzButtonModule } from 'ng-zorro-antd/button';
@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrl: './customer-dashboard.component.scss',
  encapsulation: ViewEncapsulation.None
})


export class CustomerDashboardComponent {
  cars:any=[];
constructor(private service:CustomerService){}


ngOnInit(){
  this.getAllCars();
  }


  getAllCars(){
    this.cars=[];
    this.service.getAllCars().subscribe((res)=>{
      console.log(res);
      res.forEach((element:any)=>{
        element.processedImg='data:image/jpeg;base64,'+ element.returnedImage;
        this.cars.push(element);
      })
    })
  }
}
