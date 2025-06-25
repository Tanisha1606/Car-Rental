import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';



const BASE_URL="http://localhost:8080";
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  register(signupRequest:any): Observable<any>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    return this.http.post(BASE_URL+"/api/auth/signup",signupRequest);
  }

//   login(loginRequest:any):Observable<any>{
//     const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
//     return this.http.post(BASE_URL+"/api/auth/login",loginRequest)
  
// }



login(loginRequest:any):Observable<any>{
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  return this.http.post(BASE_URL + "/api/auth/login", loginRequest, { headers });
}

}
