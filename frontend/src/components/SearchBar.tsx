import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export const SearchBar = ({ onSearch, placeholder = "Search recipes by name or cuisine..." }: SearchBarProps) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (query.trim().length >= 3) {
      onSearch(query.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="relative flex items-center gap-2">
        <div className="relative flex-1">
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            className="pr-4 h-12 text-base"
          />
        </div>
        <Button 
          onClick={handleSearch}
          size="lg"
          className="h-12 px-6"
          disabled={query.trim().length < 3}
        >
          <Search className="h-5 w-5" />
        </Button>
      </div>
      {query.trim().length > 0 && query.trim().length < 3 && (
        <p className="text-sm text-muted-foreground mt-2">Enter at least 3 characters to search</p>
      )}
    </div>
  );
};
