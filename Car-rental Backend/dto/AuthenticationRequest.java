package com.CarRental.Car_Rental.dto;

import lombok.Data;

@Data
public class AuthenticationRequest {
    private String email;
    private String password;

}
