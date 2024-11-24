import React from 'react';
import { Hexagon, Swords, Footprints, Crosshair, Puzzle, Gamepad2, Clock, Car } from 'lucide-react';

interface GameCardProps {
  name: string;
  image: string;
  type: string;
  onClick: () => void;
}

const typeIcons = {
  other: Hexagon,
  battle: Swords,
  platformer: Footprints,
  shooter: Crosshair,
  puzzle: Puzzle,
  skill: Gamepad2,
  idle: Clock,
  racing: Car,
} as const;

export function GameCard({ name, image, type, onClick }: GameCardProps) {
  const IconComponent = typeIcons[type as keyof typeof typeIcons] || Gamepad2;

  return (
    <button
      onClick={onClick}
      className="group relative bg-card rounded-lg overflow-hidden hover-lift
                 hover:ring-2 ring-primary w-full max-w-[240px] mx-auto"
    >
      <div className="aspect-square w-full">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transform transition-transform duration-500 
                     group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent 
                      opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <IconComponent 
              className="text-white transform translate-y-4 group-hover:translate-y-0 
                         transition-all duration-500 ease-out" 
              size={32} 
            />
            <h2 className="text-lg font-bold text-white px-3 text-center transform 
                         translate-y-4 group-hover:translate-y-0 transition-all duration-500 
                         ease-out opacity-0 group-hover:opacity-100">
              {name}
            </h2>
          </div>
        </div>
      </div>
    </button>
  );
}