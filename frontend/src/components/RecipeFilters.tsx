import { Recipe } from '@/types/recipe';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

interface RecipeFiltersProps {
  recipes: Recipe[];
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
  sortBy: 'asc' | 'desc' | null;
  onSortChange: (sort: 'asc' | 'desc' | null) => void;
  selectedDifficulty: string | null;
  onDifficultyChange: (difficulty: string | null) => void;
  selectedCuisine: string | null;
  onCuisineChange: (cuisine: string | null) => void;
  selectedMealType: string | null;
  onMealTypeChange: (mealType: string | null) => void;
}

export const RecipeFilters = ({ 
  recipes, 
  selectedTags, 
  onTagToggle, 
  sortBy, 
  onSortChange,
  selectedDifficulty,
  onDifficultyChange,
  selectedCuisine,
  onCuisineChange,
  selectedMealType,
  onMealTypeChange
}: RecipeFiltersProps) => {
  const allTags = Array.from(new Set(recipes.flatMap(r => r.tags))).sort();
  const allDifficulties = Array.from(new Set(recipes.map(r => r.difficulty))).sort();
  const allCuisines = Array.from(new Set(recipes.map(r => r.cuisine))).sort();
  const allMealTypes = Array.from(new Set(recipes.flatMap(r => r.mealType || []))).sort();

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <div className="w-full sm:w-auto">
          <Select 
            value={sortBy || 'none'} 
            onValueChange={(value) => onSortChange(value === 'none' ? null : value as 'asc' | 'desc')}
          >
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Sort by cook time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">No sorting</SelectItem>
              <SelectItem value="asc">Cook time (Low to High)</SelectItem>
              <SelectItem value="desc">Cook time (High to Low)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="w-full sm:w-auto">
          <Select 
            value={selectedDifficulty || 'all'} 
            onValueChange={(value) => onDifficultyChange(value === 'all' ? null : value)}
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Difficulties</SelectItem>
              {allDifficulties.map(difficulty => (
                <SelectItem key={difficulty} value={difficulty}>
                  {difficulty}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="w-full sm:w-auto">
          <Select 
            value={selectedCuisine || 'all'} 
            onValueChange={(value) => onCuisineChange(value === 'all' ? null : value)}
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Cuisine" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Cuisines</SelectItem>
              {allCuisines.map(cuisine => (
                <SelectItem key={cuisine} value={cuisine}>
                  {cuisine}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="w-full sm:w-auto">
          <Select 
            value={selectedMealType || 'all'} 
            onValueChange={(value) => onMealTypeChange(value === 'all' ? null : value)}
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Meal Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Meal Types</SelectItem>
              {allMealTypes.map(mealType => (
                <SelectItem key={mealType} value={mealType}>
                  {mealType}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {selectedTags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {selectedTags.map(tag => (
              <Badge key={tag} variant="default" className="cursor-pointer">
                {tag}
                <X 
                  className="ml-1 h-3 w-3" 
                  onClick={() => onTagToggle(tag)}
                />
              </Badge>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        <span className="text-sm font-medium text-muted-foreground self-center">Filter by tags:</span>
        {allTags.map(tag => (
          <Badge
            key={tag}
            variant={selectedTags.includes(tag) ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => onTagToggle(tag)}
          >
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
};
