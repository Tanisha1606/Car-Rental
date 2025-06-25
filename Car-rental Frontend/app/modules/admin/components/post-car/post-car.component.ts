import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-car',
  templateUrl: './post-car.component.html',
  styleUrls: ['./post-car.component.scss']
})
export class PostCarComponent {
  postCarForm!:FormGroup;
  isSpinning:boolean=false; 
  selectedFile:File | null=null;
  imagePreview:string  |ArrayBuffer | null=null;
  listOfOption:Array<{label:string;value:string}>=[];
  listOfBrands=["BMW","AUDI","FERARI","TESLA","VOLVO","TOYOTA","HONDA","FORD","NISSAN","HYUNDAI","LEXUS","KIA","MAHINDRA","MERCEDES"];
  listOfType=["Petrol","Hybrid","Diesel","Electric","CNG"];
  listOfColor=["Red","White","Blue","Black","Orange","Grey","Silver"];
  listOfTransmission=["Manual","Automatic"];

  constructor(private fb:FormBuilder,
    private adminService:AdminService,
    private message:NzMessageService,
    private router:Router
  ){}
    ngOnInit(){
      this.postCarForm=this.fb.group({
        name:[null,Validators.required],
        brand:[null,Validators.required],
        type:[null,Validators.required],
        color:[null,Validators.required],
        transmission:[null,Validators.required],
        price:[null,Validators.required],
        description:[null,Validators.required],
        year:[null,Validators.required],
      })

    }


// postCar (){
// console.log(this.postCarForm.value);
// this.isSpinning=true;
// const formData: FormData = new FormData();
// if(this.selectedFile){
// formData.append('img', this.selectedFile);
// }
// formData.append('brand', this.postCarForm.get("brand")!.value);
// formData.append('name', this.postCarForm.get('name')!.value);
// formData.append('type', this.postCarForm.get('type')!.value);
// formData.append('color', this.postCarForm.get('color')!.value);
// formData.append('year', this.postCarForm.get('year')!.value);
// formData.append('transmission', this.postCarForm.get('transmission')!.value);
// formData.append('description', this.postCarForm.get('description')!.value);
// formData.append('price', this.postCarForm.get('price')!.value);

// console.log(formData);
// this.adminService.postCar(formData).subscribe((res)=>{
//   this.isSpinning=false;
// this.message.success("Car posted successfully", {nzDuration:5000});
// this.router.navigateByUrl("/admin/dashboard");
// console.log(res);
// },error=>{
// this.message.error("Error while posting car",{nzDuration:5000});

//     })

// }




// postCar() {
//   if (this.postCarForm.invalid) {
//     this.message.error('Please fill all required fields');
//     return;
//   }

  // Prepare JSON object from form values
//   const carData = {
//     brand: this.postCarForm.get('brand')!.value,
//     name: this.postCarForm.get('name')!.value,
//     type: this.postCarForm.get('type')!.value,
//     color: this.postCarForm.get('color')!.value,
//     year: this.postCarForm.get('year')!.value,  // ensure this is a valid date string, e.g. '2025-04-20'
//     transmission: this.postCarForm.get('transmission')!.value,
//     description: this.postCarForm.get('description')!.value,
//     price: Number(this.postCarForm.get('price')!.value) 
//   };

//   this.isSpinning = true;

//   this.adminService.postCar(carData).subscribe({
//     next: (res) => {
//       this.isSpinning = false;
//       this.message.success('Car posted successfully', { nzDuration: 5000 });
//       this.router.navigateByUrl('/admin/dashboard');
//     },
//     error: (err) => {
//       this.isSpinning = false;
//       this.message.error('Error while posting car', { nzDuration: 5000 });
//       console.error(err);
//     }
//   });
// }

  //  onFileSelected(event: any){

  //    this.selectedFile=new event.target.files[0];
  //    this.previewImage();
  //  }



  postCar() {
    if (this.postCarForm.invalid) {
      this.message.error('Please fill all required fields');
      return;
    }
  
    const formData = new FormData();
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);  // name must match 'image' field in CarDto
    }
  
    formData.append('brand', this.postCarForm.get('brand')!.value);
    formData.append('name', this.postCarForm.get('name')!.value);
    formData.append('type', this.postCarForm.get('type')!.value);
    formData.append('color', this.postCarForm.get('color')!.value);
    formData.append('year', this.postCarForm.get('year')!.value); // if Date, convert to string
    formData.append('transmission', this.postCarForm.get('transmission')!.value);
    formData.append('description', this.postCarForm.get('description')!.value);
    formData.append('price', this.postCarForm.get('price')!.value);
  
    this.isSpinning = true;
  
    this.adminService.postCar(formData).subscribe({
      next: (res) => {
        this.isSpinning = false;
        this.message.success('Car posted successfully', { nzDuration: 5000 });
        this.router.navigateByUrl('/admin/dashboard');
      },
      error: (err) => {
        this.isSpinning = false;
        this.message.error('Error while posting car', { nzDuration: 5000 });
        console.error(err);
      }
    });
  }



   onFileSelected(event: Event) {
     const input = event.target as HTMLInputElement;
     if (input.files && input.files.length > 0) {
       this.selectedFile = input.files[0];
       this.previewImage();
     }
   }
  

  previewImage(){

    if (!this.selectedFile) return;
    const reader=new FileReader();
    reader.onload=()=>{
      this.imagePreview=reader.result;
    }
    reader.readAsDataURL(this.selectedFile);
  }

}
