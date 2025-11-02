import { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  value?: string;
}

export const SearchBar = ({ onSearch, placeholder = "Search recipes by name or cuisine...", value }: SearchBarProps) => {
  const [query, setQuery] = useState(value || '');
  const prevValueRef = useRef(value);
  const isTypingRef = useRef(false);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  // Update internal state when external value changes (e.g., when clearing filters)
  // Only update if the value actually changed from outside, not during typing
  useEffect(() => {
    if (value !== undefined && value !== prevValueRef.current && !isTypingRef.current) {
      setQuery(value);
      prevValueRef.current = value;
    }
  }, [value]);

  // Clear debounce timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  const handleSearch = (searchQuery: string) => {
    isTypingRef.current = false;
    onSearch(searchQuery.trim());
    prevValueRef.current = searchQuery.trim();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    isTypingRef.current = true;
    setQuery(newValue);

    // Clear previous timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Debounce the search to avoid too many updates while typing
    debounceTimerRef.current = setTimeout(() => {
      handleSearch(newValue);
    }, 300); // 300ms debounce delay
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      // Clear debounce and search immediately
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      handleSearch(query);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="relative flex items-center gap-2">
        <div className="relative flex-1">
          <Input
            type="text"
            value={query}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            className="pr-4 h-12 text-base"
          />
        </div>
        <Button 
          onClick={() => {
            if (debounceTimerRef.current) {
              clearTimeout(debounceTimerRef.current);
            }
            handleSearch(query);
          }}
          size="lg"
          className="h-12 px-6"
        >
          <Search className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};
