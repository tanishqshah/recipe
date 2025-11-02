package com.example.recipies.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;
import jakarta.persistence.*;
import java.util.*;
import com.fasterxml.jackson.annotation.JsonCreator;

@Entity
@Table(name = "meal_type")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MealType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String mealType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "recipe_id", nullable = false)
    @JsonBackReference
    private Recipe recipe;

    // --- Getters and Setters ---

    @JsonCreator
    public MealType(String name) {
        this.mealType = name;
    }
}
