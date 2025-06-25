import { Component } from '@angular/core';
import { CustomerService } from '../../service/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from '../../../../auth/services/storage/storage.service';
import { NzMessageService, NzMNService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-book-car',
  templateUrl: './book-car.component.html',
  styleUrl: './book-car.component.scss'
})
export class BookCarComponent {
  carId:number=this.activatedRoute.snapshot.params["id"];
  car:any;
  processedImg:any;
  isSpinning=false;
  dateFormat="dd-MM-yyyy";

  validateForm!:FormGroup;
  constructor(private service:CustomerService,private activatedRoute:ActivatedRoute,private fb:FormBuilder,private message:NzMessageService,
    private router:Router
  ){}


  ngOnInit(){
    this.validateForm=this.fb.group({
      toDate:[null,Validators.required],
      fromDate:[null,Validators.required],
    })
this.getCarById();
  }

  getCarById(){
    this.service.getCarById(this.carId).subscribe((res)=>{
      console.log(res);
      this.processedImg='data:image/jpeg;base64,'+res.returnedImage;
      this.car=res;
    })
  }
    bookCar(data:any){
      console.log(data);
      if (!data.fromDate || !data.toDate) {
        this.message.error("Please select both start and end dates", { nzDuration: 5000 });
        return;
      }
      
      this.isSpinning=true;

      
      let bookCarDto={
        toDate:data.toDate,
        fromDate:data.fromDate,
        userId:StorageService.getUserId(),
        carId:this.carId 
      }
      this.service.bookCar(bookCarDto).subscribe((res)=>{
        console.log(res);
        this.message.success("Booking request submitted successfully",{nzDuration:5000});
        this.router.navigateByUrl("/customer/dashboard");
      },error=>{
        this.message.error("Something went wrong",{nzDuration:5000});
      })


    }

  
}
