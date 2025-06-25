package com.CarRental.Car_Rental.repository;

import com.CarRental.Car_Rental.dto.BookCarDto;
import com.CarRental.Car_Rental.entity.BookCar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookCarRepository extends JpaRepository<BookCar,Long> {
    List<BookCar> findAllByUserId(Long userId);
}
