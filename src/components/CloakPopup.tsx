import React, { useState } from 'react';
import { X } from 'lucide-react';

interface CloakSettings {
  iconUrl: string;
  pageTitle: string;
}

interface CloakPopupProps {
  isOpen: boolean;
  onClose: () => void;
  settings: CloakSettings;
  onUpdateCloak: (settings: Partial<CloakSettings>) => void;
  onRemoveCloak: () => void;
  theme: string;
}

export function CloakPopup({ isOpen, onClose, settings, onUpdateCloak, onRemoveCloak }: CloakPopupProps) {
  const [iconUrl, setIconUrl] = useState(settings.iconUrl);
  const [pageTitle, setPageTitle] = useState(settings.pageTitle);

  if (!isOpen) return null;

  const handleSave = () => {
    onUpdateCloak({ iconUrl, pageTitle });
    onClose();
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
        <h2 className="text-xl font-bold mb-4 animate-slide-up">Cloak Settings</h2>
        
        <div className="space-y-4">
          <div className="flex flex-col gap-2 animate-slide-up" style={{ animationDelay: '100ms' }}>
            <label className="text-sm font-medium">Icon URL</label>
            <input
              type="text"
              className="input"
              value={iconUrl}
              onChange={(e) => setIconUrl(e.target.value)}
              placeholder="Enter website URL or direct icon URL"
            />
          </div>

          <div className="flex flex-col gap-2 animate-slide-up" style={{ animationDelay: '200ms' }}>
            <label className="text-sm font-medium">Page Title</label>
            <input
              type="text"
              className="input"
              value={pageTitle}
              onChange={(e) => setPageTitle(e.target.value)}
              placeholder="Enter page title"
            />
          </div>

          <div className="flex gap-3 mt-6 animate-slide-up" style={{ animationDelay: '300ms' }}>
            <button
              onClick={handleSave}
              className="flex-1 btn-primary hover-transform"
            >
              Save Changes
            </button>
            <button
              onClick={onRemoveCloak}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 
                       rounded-lg transition-all duration-300 hover-transform"
            >
              Remove Cloak
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}