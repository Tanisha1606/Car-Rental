package com.CarRental.Car_Rental.dto;

import com.CarRental.Car_Rental.enums.BookCarStatus;
import lombok.Data;

import java.util.Date;

@Data
public class BookCarDto {
    private Long Id;
    private Date fromDate;
    private Date toDate;
    private  Long days;
    private   Long price;
    private BookCarStatus bookCarStatus;
    private Long carId;
    private Long userId;
    private String username;
    private  String email;
}
