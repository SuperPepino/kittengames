import React, { useState } from 'react';
import { X, Globe, Type, AlertTriangle } from 'lucide-react';

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
    <div className="fixed inset-0 popup-overlay z-50">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md">
        <div className="bg-card rounded-lg p-6 shadow-xl animate-scale-in">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-muted hover:text-foreground 
                     transition-all duration-300 hover:rotate-90"
          >
            <X size={20} />
          </button>
          <h2 className="text-xl font-bold mb-6">Cloak Settings</h2>
          
          <div className="space-y-6">
            {/* Icon URL Input */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Globe size={16} className="text-primary" />
                <label className="text-sm font-medium">Icon URL</label>
              </div>
              <div className="relative group">
                <input
                  type="text"
                  className="w-full bg-card/50 text-foreground px-4 py-3 rounded-lg 
                           border border-border group-hover:border-primary/50
                           focus:outline-none focus:ring-2 focus:ring-primary 
                           transition-all duration-300"
                  value={iconUrl}
                  onChange={(e) => setIconUrl(e.target.value)}
                  placeholder="Enter website URL or direct icon URL"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent 
                             opacity-0 group-hover:opacity-100 transition-opacity duration-300 
                             rounded-lg pointer-events-none" />
              </div>
              <p className="text-xs text-muted mt-1 ml-1">
                Enter a website URL or direct path to an icon file
              </p>
            </div>

            {/* Page Title Input */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Type size={16} className="text-primary" />
                <label className="text-sm font-medium">Page Title</label>
              </div>
              <div className="relative group">
                <input
                  type="text"
                  className="w-full bg-card/50 text-foreground px-4 py-3 rounded-lg 
                           border border-border group-hover:border-primary/50
                           focus:outline-none focus:ring-2 focus:ring-primary 
                           transition-all duration-300"
                  value={pageTitle}
                  onChange={(e) => setPageTitle(e.target.value)}
                  placeholder="Enter page title"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent 
                             opacity-0 group-hover:opacity-100 transition-opacity duration-300 
                             rounded-lg pointer-events-none" />
              </div>
            </div>

            {/* Warning Message */}
            <div className="bg-card/30 border border-border rounded-lg p-4">
              <div className="flex items-center gap-2 text-muted">
                <AlertTriangle size={16} className="text-primary" />
                <p className="text-sm">
                  Changes will take effect immediately and persist across sessions
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleSave}
                className="flex-1 bg-primary hover:bg-primary-hover text-white px-4 py-3 
                         rounded-lg transition-all duration-300 hover:scale-105 
                         hover:shadow-lg hover:shadow-primary/20"
              >
                Save Changes
              </button>
              <button
                onClick={onRemoveCloak}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-3 
                         rounded-lg transition-all duration-300 hover:scale-105 
                         hover:shadow-lg hover:shadow-red-500/20"
              >
                Remove Cloak
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}