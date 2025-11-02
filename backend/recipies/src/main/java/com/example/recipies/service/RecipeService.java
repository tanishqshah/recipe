package com.example.recipies.service;

import com.example.recipies.model.*;
import com.example.recipies.repository.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.*;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class RecipeService {

    private static final String EXTERNAL_API_URL = "https://dummyjson.com/recipes";

    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    private RestTemplate restTemplate;

    public void saveRecipesFromApi(ApiResponse apiResponse) {
        List<Recipe> recipes = apiResponse.getRecipes();

        for (Recipe recipe : recipes) {
            if (recipe.getIngredients() != null) {
                for (Ingredient ingredient : recipe.getIngredients()) {
                    ingredient.setRecipe(recipe); // 🔗 set back reference
                }
            }
            if (recipe.getInstructions() != null) {
                for (Instruction instruction : recipe.getInstructions()) {
                    instruction.setRecipe(recipe);
                }
            }
            if (recipe.getTags() != null) {
                for (Tag tag : recipe.getTags()) {
                    tag.setRecipe(recipe);
                }
            }
            if (recipe.getMealType() != null) {
                for (MealType mealType : recipe.getMealType()) {
                    mealType.setRecipe(recipe);
                }
            }

            recipeRepository.save(recipe); // 🧾 Save full tree
        }
    }

    public String loadRecipesToDB() {
        try {
            ResponseEntity<ApiResponse> response = restTemplate.getForEntity(EXTERNAL_API_URL, ApiResponse.class);
            ApiResponse apiResponse = response.getBody();

            if (apiResponse != null && apiResponse.getRecipes() != null) {
//                recipeRepository.saveAll(apiResponse.getRecipes());
                saveRecipesFromApi(apiResponse);
                return "Successfully loaded " + apiResponse.getRecipes().size() + " recipes into the DB.";
            } else {
                return "No data found from API.";
            }

        } catch (Exception e) {
            e.printStackTrace();
            return "Error loading data: " + e.getMessage();
        }
    }

    public List<Recipe> searchRecipes(String query) {
        return recipeRepository.searchByNameOrCuisine(query);
    }

    public List<Recipe> allRecipes() {
        return recipeRepository.findAll();
    }

    public Optional<Recipe> getRecipeById(Long id){
        return recipeRepository.findById(id);
    }

    static class ApiResponse {
        private List<Recipe> recipes;

        public List<Recipe> getRecipes() {
            return recipes;
        }

        public void setRecipes(List<Recipe> recipes) {
            this.recipes = recipes;
        }
    }
}
