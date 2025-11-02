package com.example.recipies.service;

import com.example.recipies.model.User;
import com.example.recipies.repository.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Optional;

import io.jsonwebtoken.Jwts;
import java.util.Date;
import java.util.function.Function;

@Service
public class UserService {

    // Secret key for signing JWT tokens
//    private static final String SECRET_KEY = "mySuperSecretKeyThatIsAtLeast32CharactersLong!";
//    private final Key secretKey = Keys.hmacShaKeyFor(SECRET_KEY.getBytes(StandardCharsets.UTF_8));

    @Autowired
    private JwtService jwtService;

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // Signup method
    public String signup(String email, String fullName, String password) {
        if (userRepository.findByEmail(email).isPresent()) {
            return "Email already exists!";
        }
        User user = new User();
        user.setEmail(email);
        user.setFullName(fullName);
        user.setPassword(passwordEncoder.encode(password));
        userRepository.save(user);
        return "User registered successfully!";
    }

    // Login method
    public String login(String email, String password) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isEmpty()) {
            return "Invalid email or password!";
        }
        User user = optionalUser.get();
        if (passwordEncoder.matches(password, user.getPassword())) {
            // Generate JWT token
            String token = Jwts.builder()
                    .setSubject(user.getEmail())
                    .claim("fullName", user.getFullName())
                    .claim("userId", user.getId())
                    .setIssuedAt(new Date())
                    .setExpiration(new Date(System.currentTimeMillis() + 86400000)) // 1 day expiry
                    .signWith(jwtService.getSigningKey())
                    .compact();

            return token;
        } else {
            return "Invalid email or password!";
        }
    }
}
