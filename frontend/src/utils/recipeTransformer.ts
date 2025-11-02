import { Recipe } from '@/types/recipe';

/**
 * Transforms a recipe from the API format to the app's expected format.
 * Handles both object-based arrays (with id, ingredient/step/tag/mealType) and string arrays.
 */
export const transformRecipe = (recipe: any): Recipe => {
  return {
    ...recipe,
    // Transform ingredients from [{id, ingredient}] to [ingredient]
    ingredients: Array.isArray(recipe.ingredients)
      ? recipe.ingredients.map((ing: any) => 
          typeof ing === 'string' ? ing : ing.ingredient || ing
        )
      : [],
    // Transform instructions from [{id, step}] to [step]
    instructions: Array.isArray(recipe.instructions)
      ? recipe.instructions.map((inst: any) => 
          typeof inst === 'string' ? inst : inst.step || inst
        )
      : [],
    // Transform tags from [{id, tag}] to [tag]
    tags: Array.isArray(recipe.tags)
      ? recipe.tags.map((tag: any) => 
          typeof tag === 'string' ? tag : tag.tag || tag
        )
      : [],
    // Transform mealType from [{id, mealType}] to [mealType]
    mealType: Array.isArray(recipe.mealType)
      ? recipe.mealType.map((mt: any) => 
          typeof mt === 'string' ? mt : mt.mealType || mt
        )
      : [],
  };
};

