package com.example.recipies.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.search.mapper.pojo.mapping.definition.annotation.Indexed;
import org.hibernate.search.mapper.pojo.mapping.definition.annotation.FullTextField;

import java.util.List;

@Entity
@Table(name = "recipe")
@Indexed
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Recipe {

        @Id
        private Long id;

        @FullTextField
        private String name;

        @FullTextField
        private String cuisine;

        private String difficulty;
        private Integer prepTimeMinutes;
        private Integer cookTimeMinutes;
        private Integer servings;
        private Integer caloriesPerServing;
        private String image;
        private Double rating;
        private Integer reviewCount;
        private Integer userId;

        @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true)
        @JsonManagedReference
        private List<Ingredient> ingredients;

        @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true)
        @JsonManagedReference
        private List<Instruction> instructions;

        @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true)
        @JsonManagedReference
        private List<Tag> tags;

        @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true)
        @JsonManagedReference
        private List<MealType> mealType;
}
