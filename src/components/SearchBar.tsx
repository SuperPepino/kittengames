import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative max-w-md w-full group">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search games..."
        className="w-full bg-card text-foreground pl-10 pr-4 py-2 rounded-lg 
                 border border-border focus:outline-none focus:ring-2 
                 focus:ring-primary transition-all duration-300 
                 hover:border-primary/50"
      />
      <Search 
        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted 
                  group-hover:text-primary/70 transition-colors duration-300" 
        size={18} 
      />
    </div>
  );
}