package com.example.recipies.controller;

import com.example.recipies.model.User;
import com.example.recipies.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

    @RestController
    @RequestMapping("/auth")
    @RequiredArgsConstructor
    public class UserController {

        private final UserService userService;

        // Signup endpoint
        @PostMapping("/signup")
        public ResponseEntity<Map<String,String>> signup(@RequestBody User request) {
            String result = userService.signup(request.getEmail(), request.getFullName(), request.getPassword());
            Map<String, String> response = new HashMap<>();
            response.put("message", result);
            return ResponseEntity.ok(response);
        }

        // Login endpoint
        @PostMapping("/login")
        public ResponseEntity<Map<String,String>> login(@RequestBody User request) {
            String result = userService.login(request.getEmail(), request.getPassword());
            Map<String, String> response = new HashMap<>();
            response.put("message", result);
            return ResponseEntity.ok(response);
        }
    }
