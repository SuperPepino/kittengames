import { useState, useEffect } from 'react';

interface CloakSettings {
  iconUrl: string;
  pageTitle: string;
}

const DEFAULT_SETTINGS: CloakSettings = {
  iconUrl: '',
  pageTitle: ''
};

export function useCloaking() {
  const [cloakSettings, setCloakSettings] = useState<CloakSettings>(() => {
    const stored = localStorage.getItem('kittengames-cloak');
    return stored ? JSON.parse(stored) : DEFAULT_SETTINGS;
  });

  const addHttpsIfMissing = (url: string) => {
    if (!/^https?:\/\//i.test(url)) {
      return `https://${url}`;
    }
    return url;
  };

  const getFaviconUrl = (url: string) => {
    try {
      const domain = new URL(url).hostname;
      return `https://icons.duckduckgo.com/ip3/${domain}.ico`;
    } catch (e) {
      console.error("Invalid URL format", e);
      return url;
    }
  };

  const updateCloak = (settings: Partial<CloakSettings>) => {
    setCloakSettings(prev => {
      const newSettings = { ...prev, ...settings };
      localStorage.setItem('kittengames-cloak', JSON.stringify(newSettings));
      return newSettings;
    });
  };

  const removeCloak = () => {
    localStorage.removeItem('kittengames-cloak');
    setCloakSettings(DEFAULT_SETTINGS);
    window.location.reload();
  };

  useEffect(() => {
    if (cloakSettings.iconUrl) {
      const iconLink = document.querySelector("link[rel*='icon']") || document.createElement('link');
      iconLink.type = 'image/x-icon';
      iconLink.rel = 'shortcut icon';
      const fullUrl = addHttpsIfMissing(cloakSettings.iconUrl);
      iconLink.href = /\.(ico|png|svg)$/i.test(fullUrl) ? fullUrl : getFaviconUrl(fullUrl);
      document.getElementsByTagName('head')[0].appendChild(iconLink);
    }
    
    if (cloakSettings.pageTitle) {
      document.title = cloakSettings.pageTitle;
    }
  }, [cloakSettings]);

  return { cloakSettings, updateCloak, removeCloak };
}