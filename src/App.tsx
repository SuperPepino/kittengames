import React, { useEffect, useState } from 'react';
import { Palette, Loader2, EyeOff, Dices } from 'lucide-react';
import { GameCard } from './components/GameCard';
import { GameView } from './components/GameView';
import { SearchBar } from './components/SearchBar';
import { SettingsPopup } from './components/SettingsPopup';
import { CloakPopup } from './components/CloakPopup';
import { useSettings } from './hooks/useSettings';
import { useCloaking } from './hooks/useCloaking';
import { Logo } from './components/Logo';

interface Game {
  name: string;
  image: string;
  url: string;
  type: string;
}

function App() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isCloakOpen, setIsCloakOpen] = useState(false);
  const { settings, updateSettings, loadCustomTheme, removeCustomTheme, customThemes } = useSettings();
  const { cloakSettings, updateCloak, removeCloak } = useCloaking();
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/CodingKitten-YT/KittenGames-gamelibrary/main/games.json')
      .then(res => res.json())
      .then(data => {
        setGames(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading games:', err);
        setLoading(false);
      });
  }, []);

  const openRandomGame = () => {
    if (games.length > 0) {
      const randomIndex = Math.floor(Math.random() * games.length);
      setSelectedGame(games[randomIndex]);
    }
  };

  const handleBack = () => {
    setIsExiting(true);
    setTimeout(() => {
      setSelectedGame(null);
      setIsExiting(false);
    }, 300);
  };

  const filteredGames = games.filter(game =>
    game.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (selectedGame) {
    return (
      <GameView
        name={selectedGame.name}
        url={selectedGame.url}
        onBack={handleBack}
      />
    );
  }

  return (
    <div className={`min-h-screen bg-background text-foreground ${isExiting ? 'animate-slide-left' : 'animate-slide-right'}`}>
      <header className="sticky top-0 bg-card p-4 shadow-lg z-10">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <Logo />
              </div>
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={openRandomGame}
                className="p-2 hover:bg-card-hover rounded-lg transition-all duration-300 
                         hover:scale-110 hover:shadow-lg group"
                aria-label="Random Game"
              >
                <Dices className="text-muted group-hover:text-primary transition-colors duration-300" 
                       size={20} />
              </button>
              <button
                onClick={() => setIsCloakOpen(true)}
                className="p-2 hover:bg-card-hover rounded-lg transition-all duration-300 
                         hover:scale-110 hover:shadow-lg group"
                aria-label="Cloak Settings"
              >
                <EyeOff className="text-muted group-hover:text-primary transition-colors duration-300" 
                        size={20} />
              </button>
              <button
                onClick={() => setIsSettingsOpen(true)}
                className="p-2 hover:bg-card-hover rounded-lg transition-all duration-300 
                         hover:scale-110 hover:shadow-lg group"
                aria-label="Theme Settings"
              >
                <Palette className="text-muted group-hover:text-primary transition-colors duration-300" 
                         size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-6">
        {loading ? (
          <div className="flex items-center justify-center h-[60vh]">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 
                         gap-4 game-grid">
              {filteredGames.map((game) => (
                <GameCard
                  key={game.name}
                  name={game.name}
                  image={game.image}
                  type={game.type}
                  onClick={() => setSelectedGame(game)}
                />
              ))}
            </div>
            {filteredGames.length === 0 && (
              <div className="text-center text-muted mt-12 animate-fade-in">
                <p className="text-lg">No games found matching "{searchQuery}"</p>
              </div>
            )}
          </>
        )}
      </main>

      <SettingsPopup 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onUpdateSettings={updateSettings}
        loadCustomTheme={loadCustomTheme}
        removeCustomTheme={removeCustomTheme}
        customThemes={customThemes}
      />

      <CloakPopup
        isOpen={isCloakOpen}
        onClose={() => setIsCloakOpen(false)}
        settings={cloakSettings}
        onUpdateCloak={updateCloak}
        onRemoveCloak={removeCloak}
        theme={settings.theme}
      />
    </div>
  );
}

export default App;