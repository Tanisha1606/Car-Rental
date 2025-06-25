import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from '../../../auth/services/storage/storage.service';


const BASIC_URL="http://localhost:8080";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:HttpClient) {}
    getAllCars():Observable<any>{
         return this.http.get(BASIC_URL+"/api/customer/cars",{
          headers:this.createAuthorizationHeader()
        })
      }

      getCarById(carId:number):Observable<any>{
        return this.http.get(BASIC_URL+"/api/customer/car/"+carId,{
         headers:this.createAuthorizationHeader()
       })
     }
     bookCar(bookCarDto:any):Observable<any>{
      return this.http.post(BASIC_URL+"/api/customer/car/book",bookCarDto,{
       headers:this.createAuthorizationHeader()
     })
   }

   getBookingsByUserId():Observable<any>{
    return this.http.get(BASIC_URL+"/api/customer/car/bookings/"+ StorageService.getUserId(),{
     headers:this.createAuthorizationHeader()
   })
 }

      createAuthorizationHeader(): HttpHeaders {
        const token = StorageService.getToken(); // assuming it's a static method
        console.log("Token used in request: ", token); 
        let headers = new HttpHeaders();
      
        if (token) {
          headers = headers.set('Authorization', 'Bearer ' + token);
        }
      
        return headers;
      }
   
}
