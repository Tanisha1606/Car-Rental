package com.CarRental.Car_Rental.services.admin;


import com.CarRental.Car_Rental.dto.BookCarDto;
import com.CarRental.Car_Rental.dto.CarDto;
import com.CarRental.Car_Rental.dto.CarDtoListDto;

import java.io.IOException;
import java.util.List;

public interface AdminService {

    boolean postCar(CarDto carDto) throws IOException;

    List<CarDto> getAllCars();

    void deleteCar(Long id);
    CarDto getCarById(Long id);

    boolean updateCar(Long carId,CarDto carDto) throws IOException;

    List<BookCarDto> getBookings();
    boolean changeBookingStatus(Long bookingId,String status);
   CarDtoListDto 

}