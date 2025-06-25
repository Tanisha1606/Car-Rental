import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from '../../../auth/services/storage/storage.service';




const BASIC_URL="http://localhost:8080";
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  

  constructor(private http:HttpClient,
    private storageService:StorageService
  ) { }
  // postCar(carDto:any):Observable<any>{
  //   return this.http.post(BASIC_URL+"/api/admin/car",carDto,{
  //  headers: this.createAuthorizationHeader() 
  //   });

  // 
  postCar(CarDto: any): Observable<any> {
    return this.http.post(`${BASIC_URL}/api/admin/car`, CarDto,{
      headers:this.createAuthorizationHeader()
    }); // Don't set Content-Type manually
  }
  
  getAllCars():Observable<any>{
     return this.http.get(BASIC_URL+"/api/admin/cars",{
      headers:this.createAuthorizationHeader()
    })
  }

deleteCar(id:number):Observable<any>{
  return this.http.delete(BASIC_URL+ "/api/admin/car/"+id,{
    headers:this.createAuthorizationHeader()
  });
}

getCarByID(id:number):Observable<any>{
  return this.http.get(BASIC_URL+"/api/admin/car/"+id,{
    headers:this.createAuthorizationHeader()
  });

}

updateCar(carId:number,carDto:any):Observable<any>{
  return this.http.put(`${BASIC_URL}/api/admin/car/` + carId ,carDto,{
    headers:this.createAuthorizationHeader()

  });

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

getCarBookings():Observable<any>{
  return this.http.get(BASIC_URL+"/api/admin/car/bookings",{
   headers:this.createAuthorizationHeader()
 })
}

changeBookingStatus(bookingId:number,status:string):Observable<any>{
  return this.http.get(BASIC_URL+`/api/admin/car/booking/${bookingId}/${status}`,{
   headers:this.createAuthorizationHeader()
 })
}


}
