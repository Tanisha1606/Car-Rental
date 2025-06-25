package com.CarRental.Car_Rental.entity;

import com.CarRental.Car_Rental.dto.BookCarDto;
import com.CarRental.Car_Rental.enums.BookCarStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.Date;

@Entity
@Data
public class BookCar {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Date fromDate;
    private Date toDate;
    private  Long days;
    private   Long price;
    private BookCarStatus bookCarStatus;

//    @ManyToOne(fetch = FetchType.LAZY,optional = false)
//    @JoinColumn(name = "car_id",nullable = false)
//    @OnDelete(action = OnDeleteAction.CASCADE)
//   @JsonIgnore
//
//    private  User user;
//    private Car car;



    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "car_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Car car;


    public BookCarDto getBookCarDto(){
        BookCarDto bookCarDto=new BookCarDto();
        bookCarDto.setId(id);
        bookCarDto.setDays(days);
        bookCarDto.setBookCarStatus(bookCarStatus);
        bookCarDto.setPrice(price);
        bookCarDto.setToDate(toDate);
        bookCarDto.setFromDate(fromDate);
        bookCarDto.setEmail(user.getEmail());
        bookCarDto.setUsername(user.getName());
        bookCarDto.setUserId(user.getId());
        bookCarDto.setCarId(car.getId());
        return bookCarDto;

    }

}
