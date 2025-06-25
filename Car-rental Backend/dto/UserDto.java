package com.CarRental.Car_Rental.dto;

import com.CarRental.Car_Rental.enums.UserRole;
import jakarta.persistence.Id;
import lombok.Data;

@Data
public class UserDto {

  private long Id;
    private String name;
    private String email;

    private UserRole userRole;

}
