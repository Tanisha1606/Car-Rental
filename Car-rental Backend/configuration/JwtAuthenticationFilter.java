package com.CarRental.Car_Rental.configuration;
import com.CarRental.Car_Rental.utils.JWTUtil;
import com.CarRental.Car_Rental.services.jwt.UserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.security.core.context.SecurityContext;


import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final JWTUtil jwtUtil;
    private final UserService userService;

    @Override

    protected  void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response,@NonNull FilterChain
            filterChain) throws ServletException, IOException{
        String path = request.getRequestURI();
        if (path.startsWith("/api/auth")) {
            filterChain.doFilter(request, response);
            return;
        }


        final String authHeader=request.getHeader("Authorization");
        final String jwt;
        final String userEmail;
        if(StringUtils.isEmpty(authHeader)|| !StringUtils.startsWith(authHeader,"Bearer ")){
            filterChain.doFilter(request,response);
            return;
        }
        jwt=authHeader.substring(7);
        userEmail=jwtUtil.extractUsername(jwt);
        if(StringUtils.isNotEmpty(userEmail)
            && SecurityContextHolder.getContext().getAuthentication()==null){
            UserDetails userDetails=userService.userDetailsService().loadUserByUsername(userEmail);
            if(jwtUtil.isTokenValid(jwt,userDetails)){
                System.out.println("Authenticated user: " + userEmail);
                System.out.println("Authorities: " + userDetails.getAuthorities());
                SecurityContext context= SecurityContextHolder.createEmptyContext();
                UsernamePasswordAuthenticationToken authToken=new UsernamePasswordAuthenticationToken(
                        userDetails,null,userDetails.getAuthorities());
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                context.setAuthentication(authToken);
                SecurityContextHolder.setContext(context);
            }
            else{
                System.out.println("Invalid JWT token for user: " + userEmail);
            }


        }
        filterChain.doFilter(request,response);
    }
}

