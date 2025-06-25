package com.CarRental.Car_Rental.controller;

import com.CarRental.Car_Rental.dto.BookCarDto;
import com.CarRental.Car_Rental.dto.CarDto;
import com.CarRental.Car_Rental.services.customer.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customer")
@RequiredArgsConstructor
public class CustomerController {
    private final CustomerService customerService;

    @GetMapping("/cars")
    public ResponseEntity<List<CarDto>> getAllCars(){
       List<CarDto>carDtoList= customerService.getAllCars();
       return  ResponseEntity.ok(carDtoList);
    }


    @PostMapping("/car/book")

    public ResponseEntity<Void> bookCar(@RequestBody BookCarDto bookCarDto){
        boolean success=customerService.bookCar(bookCarDto);
        if(success) return  ResponseEntity.status(HttpStatus.CREATED).build();
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();

    }

    @GetMapping("/car/{carId}")
    public ResponseEntity<CarDto> getCarById(@PathVariable Long carId){

        CarDto carDto=customerService.getCarById(carId);
        if(carDto==null)
            return  ResponseEntity.notFound().build();
        return  ResponseEntity.ok(carDto);

    }
    @GetMapping("/car/bookings/{userId}")
    public ResponseEntity<List<BookCarDto>>getBookingByUserId(@PathVariable Long userId){
        return ResponseEntity.ok(customerService.getBookingsByUserId(userId));
    }
}



