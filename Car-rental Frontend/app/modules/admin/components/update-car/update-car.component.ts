import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-update-car',
  templateUrl: './update-car.component.html',
  styleUrl: './update-car.component.scss'
})
export class UpdateCarComponent {
  isSpinning:boolean=false;
    carId:number=this.activatedRoute.snapshot.params["id"];
    imgChanged:boolean=false;
     selectedFile:any;
     imagePreview:string |ArrayBuffer | null=null;

  existingImage:string | null=null;
  updateForm!:FormGroup;
  listOfOption:Array<{label:string;value:string}>=[];
  listOfBrands=["BMW","AUDI","FERARI","TESLA","VOLVO","TOYOTA","HONDA","FORD","NISSAN","HYUNDAI","LEXUS","KIA"];
  listOfType=["Petrol","Hybrid","Diesel","Electric","CNG"];
  listOfColor=["Red","White","Blue","Black","Orange","Grey","Silver"];
  listOfTransmission=["Manual","Automatic"];
  constructor(private adminService:AdminService,private activatedRoute:ActivatedRoute,private fb:FormBuilder,
    private message:NzMessageService,private router:Router
  ){}
    ngOnInit(){
      this.updateForm=this.fb.group({
        name:[null,Validators.required],
                brand:[null,Validators.required],
                type:[null,Validators.required],
                color:[null,Validators.required],
                transmission:[null,Validators.required],
                price:[null,Validators.required],
                description:[null,Validators.required],
                year:[null,Validators.required],

      });
      this.getCarById();
      

    }
    getCarById(){
      this.isSpinning=true;
      this.adminService.getCarByID(this.carId).subscribe((res)=>{
        //console.log(res);
        this.isSpinning=false;
        const carDto=res;
        this.existingImage='data:image/jpeg;base64,' +res.returnedImage;
        console.log(carDto);
        console.log(this.existingImage);
        this.updateForm.patchValue(carDto);

      })
    }

    updateCar(){
      this.isSpinning=true;
  
      const formData = new FormData();
      console.log("Form Values: ", this.updateForm.value);  // Add this line
  
      if (this.imgChanged && this.selectedFile) {
        formData.append('image', this.selectedFile);  // name must match 'image' field in CarDto
      }
      // formData.append('brand', this.updateForm.get('brand')!.value);
      // formData.append('name', this.updateForm.get('name')!.value);
      // formData.append('type', this.updateForm.get('type')!.value);
      // formData.append('color', this.updateForm.get('color')!.value);


      // formData.append('year', this.updateForm.get('year')!.value); // if Date, convert to string

      
      // formData.append('transmission', this.updateForm.get('transmission')!.value);
      // formData.append('description', this.updateForm.get('description')!.value);
      // formData.append('price', this.updateForm.get('price')!.value);
    
      // this.isSpinning = true;
    
      // this.adminService.updateCar(this.carId,formData).subscribe((res)=>{
        
      //     this.isSpinning = false;
      //     this.message.success('Car updated successfully', { nzDuration: 5000 });
      //     this.router.navigateByUrl('/admin/dashboard');
      //   },
      //   error => {
      //     this.isSpinning = false;
      //     this.message.error('Error while updating car', { nzDuration: 5000 });
          
      //   })
      
    
    formData.append('brand', this.updateForm.get('brand')!.value);
    formData.append('name', this.updateForm.get('name')!.value);
    formData.append('type', this.updateForm.get('type')!.value);
    formData.append('color', this.updateForm.get('color')!.value);

    const yearValue = this.updateForm.get('year')!.value;
    const yearString = yearValue instanceof Date ? yearValue.getFullYear().toString() : yearValue.toString();
    formData.append('year', yearString);
    formData.append('transmission', this.updateForm.get('transmission')!.value);
    formData.append('description', this.updateForm.get('description')!.value);
    formData.append('price', this.updateForm.get('price')!.value);
  
    this.isSpinning = true;
  
    this.adminService.updateCar(this.carId,formData).subscribe({
      next: (res) => {
        this.isSpinning = false;
        this.message.success('Car updated successfully', { nzDuration: 5000 });
        this.router.navigateByUrl('/admin/dashboard');
      },
      error: (err) => {
        this.isSpinning = false;
        this.message.error('Error while posting car', { nzDuration: 5000 });
        console.error(err);
      }
    });

    }
    onFileSelected(event:any){
      this.selectedFile=event.target.files[0];
      this.imgChanged=true;
      this.existingImage=null;
      this.previewImage();
    }
previewImage(){
  const reader=new FileReader();
  reader.onload=()=>{
    this.imagePreview=reader.result;
  }
  reader.readAsDataURL(this.selectedFile);
}
}
