import React, { useState } from 'react';
import { X, Plus, AlertCircle, Check } from 'lucide-react';
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
}

export function SettingsPopup({ 
  isOpen, 
  onClose, 
  settings, 
  onUpdateSettings,
  loadCustomTheme,
  customThemes 
}: SettingsPopupProps) {
  const [customUrl, setCustomUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleAddCustomTheme = async () => {
    if (!customUrl.trim()) return;

    setIsLoading(true);
    setError('');
    setSuccess(false);

    try {
      const success = await loadCustomTheme(customUrl);
      if (success) {
        onUpdateSettings({ theme: 'custom', customThemeUrl: customUrl });
        setSuccess(true);
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
        
        <div className="space-y-6">
          {/* Custom Theme Input */}
          <div className="animate-slide-up" style={{ animationDelay: '100ms' }}>
            <label className="text-sm font-medium mb-2 block">Add Custom Theme</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                placeholder="Enter theme JSON URL"
                className="flex-1 input"
              />
              <button
                onClick={handleAddCustomTheme}
                disabled={isLoading}
                className="btn-primary flex items-center gap-2"
              >
                <Plus size={18} />
                Add
              </button>
            </div>
            {error && (
              <div className="flex items-center gap-2 text-red-500 text-sm mt-2">
                <AlertCircle size={14} />
                {error}
              </div>
            )}
            {success && (
              <div className="flex items-center gap-2 text-green-500 text-sm mt-2">
                <Check size={14} />
                Theme added successfully
              </div>
            )}
          </div>

          {/* Theme Grid */}
          <div className="grid grid-cols-2 gap-3">
            {/* Built-in Themes */}
            {Object.entries(themes).map(([id, theme], index) => (
              <button
                key={id}
                onClick={() => onUpdateSettings({ theme: id, customThemeUrl: undefined })}
                className="p-4 rounded-lg border-2 transition-all duration-300 hover-lift"
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
              </button>
            ))}

            {/* Custom Themes */}
            {Object.entries(customThemes).map(([url, theme], index) => (
              <button
                key={url}
                onClick={() => onUpdateSettings({ theme: 'custom', customThemeUrl: url })}
                className="p-4 rounded-lg border-2 transition-all duration-300 hover-lift"
                style={{
                  backgroundColor: theme.colors.card,
                  color: theme.colors.foreground,
                  borderColor: settings.customThemeUrl === url ? theme.colors.primary : theme.colors.border,
                  transform: `scale(${settings.customThemeUrl === url ? 1.05 : 1})`,
                  animationDelay: `${(index + Object.keys(themes).length) * 50}ms`,
                }}
              >
                <div className="flex flex-col gap-2">
                  <span className="font-medium">{theme.name} (Custom)</span>
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
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}