package com.example.recipies.controller;

import com.example.recipies.model.Recipe;
import com.example.recipies.service.RecipeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import lombok.RequiredArgsConstructor;

import java.util.List;

@RestController
@RequestMapping("/recipe")
@RequiredArgsConstructor
public class RecipeController {
    private static final Logger logger = LoggerFactory.getLogger(RecipeController.class);
    private final RecipeService recipeService;

    @PostMapping("/load")
    public ResponseEntity<String> loadData() {
        logger.info("Received request to load recipes from external dataset.");
        String result = recipeService.loadRecipesToDB();
        logger.info("Recipe load completed: {}", result);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Recipe>> searchRecipes(@RequestParam String query) {
        logger.info("Received search request for query: {}", query);
        List<Recipe> recipes = recipeService.searchRecipes(query);
        logger.info("Search returned {} results for query '{}'", recipes.size(), query);
        return ResponseEntity.ok(recipes);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Recipe>> allRecipes() {
        List<Recipe> recipes = recipeService.allRecipes();
        logger.info("Returned all {} results", recipes.size());
        return ResponseEntity.ok(recipes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Recipe> getRecipeById(@PathVariable Long id) {
        logger.info("Received request to fetch recipe by id: {}", id);
        Recipe recipe = recipeService.getRecipeById(id)
                .orElseThrow(() -> new RuntimeException("Recipe not found with id " + id));
        logger.info("Returning recipe details for id: {}", id);
        return ResponseEntity.ok(recipe);
    }

}
