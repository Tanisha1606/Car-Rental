package com.CarRental.Car_Rental.services.customer;

import com.CarRental.Car_Rental.dto.BookCarDto;
import com.CarRental.Car_Rental.dto.CarDto;
import com.CarRental.Car_Rental.entity.BookCar;
import com.CarRental.Car_Rental.entity.Car;
import com.CarRental.Car_Rental.entity.User;
import com.CarRental.Car_Rental.enums.BookCarStatus;
import com.CarRental.Car_Rental.repository.BookCarRepository;
import com.CarRental.Car_Rental.repository.CarRepository;
import com.CarRental.Car_Rental.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService{

    private final CarRepository carRepository;
    private final UserRepository userRepository;
    private final BookCarRepository bookCarRepository;

    @Override
    public List<CarDto> getAllCars() {
        return carRepository.findAll().stream().map(Car::getCarDto).collect(Collectors.toList());

    }

    @Override
    public boolean bookCar(BookCarDto bookCarDto) {
        if (bookCarDto.getFromDate() == null || bookCarDto.getToDate() == null) {
            return false;  // Return false to indicate booking failure due to invalid dates
        }
        Optional<Car> optionalCar=carRepository.findById(bookCarDto.getCarId());
        Optional<User> optionalUser=userRepository .findById(bookCarDto.getUserId());
        if(optionalCar.isPresent() && optionalUser.isPresent()){
            Car existingCar=optionalCar.get();
            BookCar bookCar=new BookCar();
            bookCar.setFromDate(bookCarDto.getFromDate());
            bookCar.setToDate(bookCarDto.getToDate());
            bookCar.setUser(optionalUser.get());
            bookCar.setCar(existingCar);
            bookCar.setBookCarStatus(BookCarStatus.PENDING);




//            long diffInMilliSeconds=bookCarDto.getToDate().getTime()-bookCarDto.getFromDate().getTime();
//            long days= TimeUnit.MILLISECONDS.toDays(diffInMilliSeconds);
            long diffInMilliSeconds = bookCarDto.getToDate().getTime() - bookCarDto.getFromDate().getTime();
            long days = TimeUnit.MILLISECONDS.toDays(diffInMilliSeconds);
            if (days < 1) {
                return false;  // Return false to indicate booking failure due to invalid date range
            }
            bookCar.setDays(days);
            bookCar.setPrice(existingCar.getPrice()*days);

            bookCarRepository.save(bookCar);
            return true;

        }
        return false;
    }

    @Override
    public CarDto getCarById(Long carID) {
        Optional<Car>optionalCar=carRepository.findById(carID);
        if(optionalCar.isPresent()){
            return  optionalCar.get().getCarDto();

        }
        return null;
    }

    @Override
    public List<BookCarDto> getBookingsByUserId(Long userId) {
        return bookCarRepository.findAllByUserId(userId).stream().map(BookCar::getBookCarDto).collect(Collectors.toList());
    }
}
