package com.CarRental.Car_Rental.services;

import com.CarRental.Car_Rental.dto.SignupRequest;
import com.CarRental.Car_Rental.dto.UserDto;

public interface AuthService {
    UserDto createCustomer(SignupRequest signupRequest);
    boolean hasCustomerwithEmail(String email);
}
