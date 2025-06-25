package com.CarRental.Car_Rental.services.customer;

import com.CarRental.Car_Rental.dto.BookCarDto;
import com.CarRental.Car_Rental.dto.CarDto;

import java.util.List;

public interface CustomerService {
    List<CarDto> getAllCars();

    boolean bookCar(BookCarDto bookCarDto);

    CarDto getCarById(Long carID);

    List<BookCarDto> getBookingsByUserId(Long userId);
}
