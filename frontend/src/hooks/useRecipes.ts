import { useState, useEffect } from 'react';
import { Recipe, RecipesResponse } from '@/types/recipe';

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
      const skipValue = customSkip !== undefined ? customSkip : skip;
      const response = await fetch(`https://dummyjson.com/recipes?limit=${limit}&skip=${skipValue}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch recipes');
      }
      
      const data: RecipesResponse = await response.json();
      setRecipes(data.recipes);
      setTotal(data.total);
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
