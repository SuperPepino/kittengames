import React, { useState } from 'react';
import { X, Plus, Trash2, AlertCircle, Loader2 } from 'lucide-react';
import { themes, type Theme } from '../themes';

interface Settings {
  theme: string;
  customThemeUrl?: string;
}

interface SettingsPopupProps {
  isOpen: boolean;
  onClose: () => void;
  settings: Settings;
  onUpdateSettings: (settings: Partial<Settings>) => void;
  loadCustomTheme: (url: string) => Promise<boolean>;
  customThemes: Record<string, Theme>;
  removeCustomTheme: (url: string) => void;
}

export function SettingsPopup({ 
  isOpen, 
  onClose, 
  settings, 
  onUpdateSettings,
  loadCustomTheme,
  customThemes,
  removeCustomTheme
}: SettingsPopupProps) {
  const [customUrl, setCustomUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleAddCustomTheme = async () => {
    if (!customUrl.trim()) return;

    setIsLoading(true);
    setError('');

    try {
      const success = await loadCustomTheme(customUrl);
      if (success) {
        onUpdateSettings({ theme: 'custom', customThemeUrl: customUrl });
        setCustomUrl('');
      } else {
        setError('Invalid theme format');
      }
    } catch (err) {
      setError('Failed to load theme');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveTheme = (url: string) => {
    removeCustomTheme(url);
    if (settings.customThemeUrl === url) {
      onUpdateSettings({ theme: 'dark', customThemeUrl: undefined });
    }
  };

  return (
    <div className="fixed inset-0 popup-overlay flex items-center justify-center z-50">
      <div className="bg-card rounded-lg p-6 w-full max-w-md relative animate-scale-in">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-muted hover:text-foreground 
                   transition-all duration-300 hover:rotate-90"
        >
          <X size={20} />
        </button>
        <h2 className="text-xl font-bold mb-6 animate-slide-up">Theme Settings</h2>
        
        <div className="grid grid-cols-2 gap-3">
          {/* Built-in Themes */}
          {Object.entries(themes).map(([id, theme], index) => (
            <div
              key={id}
              onClick={() => onUpdateSettings({ theme: id, customThemeUrl: undefined })}
              className="relative p-4 rounded-lg border-2 transition-all duration-300 hover-lift group 
                       cursor-pointer"
              style={{
                backgroundColor: theme.colors.card,
                color: theme.colors.foreground,
                borderColor: settings.theme === id ? theme.colors.primary : theme.colors.border,
                transform: `scale(${settings.theme === id ? 1.05 : 1})`,
                animationDelay: `${index * 50}ms`,
              }}
            >
              <div className="flex flex-col gap-2">
                <span className="font-medium">{theme.name}</span>
                <div className="flex gap-1">
                  {Object.values(theme.colors).map((color, i) => (
                    <div
                      key={i}
                      className="w-3 h-3 rounded-full transform transition-transform duration-300 
                               hover:scale-125"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* Custom Themes */}
          {Object.entries(customThemes).map(([url, theme], index) => (
            <div
              key={url}
              onClick={() => onUpdateSettings({ theme: 'custom', customThemeUrl: url })}
              className="relative p-4 rounded-lg border-2 transition-all duration-300 hover-lift group 
                       cursor-pointer"
              style={{
                backgroundColor: theme.colors.card,
                color: theme.colors.foreground,
                borderColor: settings.customThemeUrl === url ? theme.colors.primary : theme.colors.border,
                transform: `scale(${settings.customThemeUrl === url ? 1.05 : 1})`,
                animationDelay: `${(index + Object.keys(themes).length) * 50}ms`,
              }}
            >
              <div className="flex flex-col gap-2">
                <span className="font-medium">{theme.name}</span>
                <div className="flex gap-1">
                  {Object.values(theme.colors).map((color, i) => (
                    <div
                      key={i}
                      className="w-3 h-3 rounded-full transform transition-transform duration-300 
                               hover:scale-125"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveTheme(url);
                }}
                className="absolute -top-2 -right-2 p-1.5 bg-card rounded-full opacity-0 
                         group-hover:opacity-100 transition-opacity duration-300 
                         hover:bg-red-500 hover:text-white"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}

          {/* Add Theme Tile */}
          <div className="relative p-4 rounded-lg border-2 border-dashed border-muted 
                       transition-all duration-300 hover:border-primary">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  value={customUrl}
                  onChange={(e) => {
                    setCustomUrl(e.target.value);
                    setError('');
                  }}
                  placeholder="Enter theme JSON URL"
                  className="w-full bg-transparent border-none focus:outline-none 
                           text-sm placeholder-muted"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleAddCustomTheme();
                    }
                  }}
                />
                {error ? (
                  <div className="flex items-center gap-1 text-red-500 text-xs">
                    <AlertCircle size={12} />
                    {error}
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-muted text-xs">
                    <Plus size={12} />
                    Add custom theme
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}