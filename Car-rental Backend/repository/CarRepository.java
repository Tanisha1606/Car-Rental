package com.CarRental.Car_Rental.repository;

import com.CarRental.Car_Rental.entity.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CarRepository extends JpaRepository<Car,Long>{
}
