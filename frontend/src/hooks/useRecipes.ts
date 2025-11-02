import { useState, useEffect } from 'react';
import { Recipe, RecipesResponse } from '@/types/recipe';
import { transformRecipe } from '@/utils/recipeTransformer';

interface UseRecipesOptions {
  limit?: number;
  skip?: number;
}

export const useRecipes = (options: UseRecipesOptions = {}) => {
  const { limit = 50, skip = 0 } = options;
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRecipes = async (customSkip?: number) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('http://192.168.1.2:8080/recipe/all');
      
      if (!response.ok) {
        throw new Error('Failed to fetch recipes');
      }
      
      const data = await response.json();
      
      // Handle different response formats
      let recipesArray: Recipe[] = [];
      
      // If data is an array directly
      if (Array.isArray(data)) {
        recipesArray = data.map(transformRecipe);
      } 
      // If data has a recipes property
      else if (data.recipes && Array.isArray(data.recipes)) {
        recipesArray = data.recipes.map(transformRecipe);
      }
      
      setRecipes(recipesArray);
      setTotal(recipesArray.length);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, [limit, skip]);

  return { recipes, total, loading, error, refetch: fetchRecipes };
};
