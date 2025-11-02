import { useState, useMemo } from 'react';
import { SearchBar } from '@/components/SearchBar';
import { RecipeCard } from '@/components/RecipeCard';
import { RecipeFilters } from '@/components/RecipeFilters';
import { Pagination } from '@/components/Pagination';
import { useRecipes } from '@/hooks/useRecipes';
import { Loader2 } from 'lucide-react';

const ITEMS_PER_PAGE = 12;

const Index = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { recipes, total, loading, error, refetch } = useRecipes({ 
    limit: 50,
    skip: 0 
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'asc' | 'desc' | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [selectedCuisine, setSelectedCuisine] = useState<string | null>(null);
  const [selectedMealType, setSelectedMealType] = useState<string | null>(null);

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredRecipes = useMemo(() => {
    let result = recipes;

    // Enhanced free text search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(recipe => 
        recipe.name.toLowerCase().includes(query) ||
        recipe.cuisine.toLowerCase().includes(query) ||
        recipe.ingredients.some(ing => ing.toLowerCase().includes(query)) ||
        recipe.tags.some(tag => tag.toLowerCase().includes(query)) ||
        recipe.difficulty.toLowerCase().includes(query)
      );
    }

    // Filter by tags
    if (selectedTags.length > 0) {
      result = result.filter(recipe =>
        selectedTags.some(tag => recipe.tags.includes(tag))
      );
    }

    // Filter by difficulty
    if (selectedDifficulty) {
      result = result.filter(recipe => recipe.difficulty === selectedDifficulty);
    }

    // Filter by cuisine
    if (selectedCuisine) {
      result = result.filter(recipe => recipe.cuisine === selectedCuisine);
    }

    // Filter by meal type
    if (selectedMealType) {
      result = result.filter(recipe => 
        recipe.mealType && recipe.mealType.includes(selectedMealType)
      );
    }

    // Sort by cook time
    if (sortBy) {
      result = [...result].sort((a, b) => 
        sortBy === 'asc' 
          ? a.cookTimeMinutes - b.cookTimeMinutes
          : b.cookTimeMinutes - a.cookTimeMinutes
      );
    }

    return result;
  }, [recipes, searchQuery, selectedTags, sortBy, selectedDifficulty, selectedCuisine, selectedMealType]);

  const paginatedRecipes = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredRecipes.slice(startIndex, endIndex);
  }, [filteredRecipes, currentPage]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-destructive mb-2">Error</h2>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Recipe Search</h1>
          <p className="text-muted-foreground mb-8">
            Discover delicious recipes from around the world
          </p>
          <SearchBar onSearch={setSearchQuery} />
        </div>

        {recipes.length > 0 && (
          <div className="mb-8">
            <RecipeFilters
              recipes={recipes}
              selectedTags={selectedTags}
              onTagToggle={handleTagToggle}
              sortBy={sortBy}
              onSortChange={setSortBy}
              selectedDifficulty={selectedDifficulty}
              onDifficultyChange={(val) => {
                setSelectedDifficulty(val);
                setCurrentPage(1);
              }}
              selectedCuisine={selectedCuisine}
              onCuisineChange={(val) => {
                setSelectedCuisine(val);
                setCurrentPage(1);
              }}
              selectedMealType={selectedMealType}
              onMealTypeChange={(val) => {
                setSelectedMealType(val);
                setCurrentPage(1);
              }}
            />
          </div>
        )}

        <div className="mb-4">
          <p className="text-sm text-muted-foreground">
            Showing {paginatedRecipes.length} of {filteredRecipes.length} recipes
            {filteredRecipes.length !== recipes.length && ` (${recipes.length} total)`}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {paginatedRecipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>

        {filteredRecipes.length === 0 && searchQuery && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">
              No recipes found for "{searchQuery}"
            </p>
          </div>
        )}

        {filteredRecipes.length > ITEMS_PER_PAGE && (
          <Pagination
            currentPage={currentPage}
            totalItems={filteredRecipes.length}
            itemsPerPage={ITEMS_PER_PAGE}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
