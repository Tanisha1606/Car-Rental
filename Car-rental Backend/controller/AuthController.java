package com.CarRental.Car_Rental.controller;

import com.CarRental.Car_Rental.utils.JWTUtil;
import com.CarRental.Car_Rental.dto.AuthenticationRequest;
import com.CarRental.Car_Rental.dto.AuthenticationResponse;
import com.CarRental.Car_Rental.dto.SignupRequest;
import com.CarRental.Car_Rental.dto.UserDto;
import com.CarRental.Car_Rental.repository.UserRepository;
import com.CarRental.Car_Rental.services.AuthService;
import com.CarRental.Car_Rental.services.jwt.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import com.CarRental.Car_Rental.entity.User;


import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {
    private final AuthService authService;
    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final JWTUtil jwtUtil;
    private final UserRepository userRepository ;
    @PostMapping("/signup")
     public ResponseEntity<?> signupCustomer(@RequestBody SignupRequest signupRequest){
        if(authService.hasCustomerwithEmail(signupRequest.getEmail()))
            return new ResponseEntity<>("Customer already exist with this email",HttpStatus.NOT_ACCEPTABLE);
         UserDto createdCustomerDto=authService.createCustomer(signupRequest);
         if(createdCustomerDto == null)
             return new  ResponseEntity<>("Customer not created,Try again later",HttpStatus.BAD_REQUEST);
         return new ResponseEntity<>(createdCustomerDto,HttpStatus.CREATED);
     }

     @PostMapping("/login")
    public AuthenticationResponse createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) throws
             BadCredentialsException,
             DisabledException,
             UsernameNotFoundException{
        try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getEmail(),authenticationRequest.getPassword()));

        }
        catch(BadCredentialsException e){
            throw new BadCredentialsException("Incorrect Username or password");
        }
        final UserDetails userDetails=userService.userDetailsService().loadUserByUsername(authenticationRequest.getEmail());
         Optional<User> optionalUser=userRepository.findFirstByEmail(userDetails.getUsername());
         final String jwt=jwtUtil.generateToken(userDetails);
         AuthenticationResponse authenticationResponse=new AuthenticationResponse();
         if(optionalUser.isPresent()){
             authenticationResponse.setJwt(jwt);
             authenticationResponse.setUserId(optionalUser.get().getId());
             authenticationResponse.setUserRole(optionalUser.get().getUserRole());

         }
         return authenticationResponse;

     }


}
