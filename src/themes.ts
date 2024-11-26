export interface Theme {
  name: string;
  colorScheme: 'dark' | 'light';
  colors: {
    background: string;
    foreground: string;
    card: string;
    'card-hover': string;
    primary: string;
    'primary-hover': string;
    secondary: string;
    'secondary-hover': string;
    accent: string;
    muted: string;
    border: string;
  };
}

export const themes: Record<string, Theme> = {
  dark: {
    name: 'Dark',
    colorScheme: 'dark',
    colors: {
      background: '#111827',
      foreground: '#ffffff',
      card: '#1f2937',
      'card-hover': '#374151',
      primary: '#8b5cf6',
      'primary-hover': '#7c3aed',
      secondary: '#4b5563',
      'secondary-hover': '#6b7280',
      accent: '#ec4899',
      muted: '#6b7280',
      border: '#374151',
    },
  },
  nord: {
    name: 'Nord',
    colorScheme: 'dark',
    colors: {
      background: '#2e3440',
      foreground: '#eceff4',
      card: '#3b4252',
      'card-hover': '#434c5e',
      primary: '#88c0d0',
      'primary-hover': '#81a1c1',
      secondary: '#4c566a',
      'secondary-hover': '#5e81ac',
      accent: '#b48ead',
      muted: '#4c566a',
      border: '#434c5e',
    },
  },
  sunset: {
    name: 'Sunset',
    colorScheme: 'dark',
    colors: {
      background: '#1a1625',
      foreground: '#fff6e5',
      card: '#2d1b36',
      'card-hover': '#3d2347',
      primary: '#ff7e5f',
      'primary-hover': '#ff6b5b',
      secondary: '#2d1b36',
      'secondary-hover': '#3d2347',
      accent: '#feb47b',
      muted: '#6f5980',
      border: '#3d2347',
    },
  },

  volcano: {
    name: 'Volcano',
    colorScheme: 'dark',
    colors: {
      background: '#3B0A45',  // Deep volcanic red with dark purple undertones
      foreground: '#FFFFFF',  // White text for readability
      card: '#5C1D6E',        // Charred purple with molten red edges
      'card-hover': '#7A2767', // Darker red when hovered, resembling cooling lava
      primary: '#FF5733',     // Lava orange for primary accents
      'primary-hover': '#FF3C00', // Slightly brighter lava red for hover effect
      secondary: '#FF6F00',   // Fiery amber, like glowing embers
      'secondary-hover': '#FF4500', // Darker orange when hovered
      accent: '#F7A800',      // Molten yellow, reminiscent of lava
      muted: '#9E3B34',       // Ashy dark gray with a reddish hue
      border: '#550A2C'       // Dark volcanic ash border color
    },
  },
  synthwave: {
    name: 'Synthwave',
    colorScheme: 'dark',
    colors: {
      background: '#1a1b2e',
      foreground: '#ff71ce',
      card: '#2d2b55',
      'card-hover': '#34305e',
      primary: '#7795ff',
      'primary-hover': '#6b85e8',
      secondary: '#2d2b55',
      'secondary-hover': '#34305e',
      accent: '#01cdfe',
      muted: '#a599e9',
      border: '#34305e',
    },
  },
  ocean: {
    name: 'Ocean',
    colorScheme: 'dark',
    colors: {
      background: '#0f172a',
      foreground: '#e2e8f0',
      card: '#1e293b',
      'card-hover': '#334155',
      primary: '#38bdf8',
      'primary-hover': '#0ea5e9',
      secondary: '#1e293b',
      'secondary-hover': '#334155',
      accent: '#818cf8',
      muted: '#64748b',
      border: '#334155',
    },
      },
  warmOcean: {
    name: 'Lukewarm Ocean',
    colorScheme: 'dark',
    colors: {
      background: '#002A32',  // Deep ocean blue
      foreground: '#FFFFFF',  // White text for readability
      card: '#013A47',        // Dark teal, akin to the ocean depths
      'card-hover': '#01565C',  // Slightly lighter teal when hovered
      primary: '#00B0B9',     // Bright turquoise, representing ocean waves
      'primary-hover': '#008F96',  // Slightly darker turquoise for hover effect
      secondary: '#006D64',   // Deeper sea green for secondary elements
      'secondary-hover': '#004F4A', // Darker green for hover effect
      accent: '#FF6A00',      // Coral orange for accents, like coral reefs
      muted: '#4B626F',       // Muted, darkened gray-blue for subtle elements
      border: '#015D69'       // Dark teal border, maintaining the deep ocean feel
    },
  },
  abyss: {
    name: 'Abyss',
    colorScheme: 'dark',
    colors: {
      background: '#011627',
      foreground: '#F0F8FF',
      card: '#000000',
      'card-hover': '#003A70',
      primary: '#007BFF',
      'primary-hover': '#0056B3',
      secondary: '#011627',
      'secondary-hover': '#003A70',
      accent: '#003366',
      muted: '#003A70',
      border: '#003A70',
    },
  },
  eclipse: {
    name: 'Eclipse',
    colorScheme: 'dark',
    colors: {
      background: '#000000',
      foreground: '#FFFFFF',
      card: '#121212',
      'card-hover': '#1E1E1E',
      primary: '#BB86FC',
      'primary-hover': '#985EFF',
      secondary: '#03DAC6',
      'secondary-hover': '#018786',
      accent: '#FF0266',
      muted: '#5E5E5E',
      border: '#2A2A2A',
    },
      },
  lightSunset: {
    name: 'Sunrise',
    colorScheme: 'light',
    colors: {
      background: '#FFF5E1',
      foreground: '#2D1A5B',
      card: '#F4D6C1',
      'card-hover': '#FFD4A3',
      primary: '#FF7F50',
      'primary-hover': '#FF6347',
      secondary: '#FFDDC1',
      'secondary-hover': '#FFB8A0',
      accent: '#FF4500',
      muted: '#F4A261',
      border: '#E6AC6B',
    },
  },
  pastelDream: {
    name: 'Pastel Dream',
    colorScheme: 'light',
    colors: {
      background: '#F3E5F5',
      foreground: '#4A148C',
      card: '#F8BBD0',
      'card-hover': '#F48FB1',
      primary: '#CE93D8',
      'primary-hover': '#AB47BC',
      secondary: '#C5E1A5',
      'secondary-hover': '#AED581',
      accent: '#FFEB3B',
      muted: '#E57373',
      border: '#D32F2F',
    },
  },
  lightOcean: {
    name: 'Light Ocean',
    colorScheme: 'light',
    colors: {
      background: '#E0F7FA',
      foreground: '#00796B',
      card: '#B2EBF2',
      'card-hover': '#80DEEA',
      primary: '#00ACC1',
      'primary-hover': '#0097A7',
      secondary: '#26C6DA',
      'secondary-hover': '#00BCD4',
      accent: '#FF7043',
      muted: '#B2DFDB',
      border: '#004D40',
    },
  },
    midday: {
    name: 'Midday',
    colorScheme: 'light',
    colors: {
      background: '#FFFBF1',  // Soft, warm light yellow to represent the midday sun
      foreground: '#333333',   // Dark gray for high contrast text
      card: '#FFFFFF',         // White cards for a clean, bright look
      'card-hover': '#F0F0F0', // Light gray card hover effect
      primary: '#FFA500',      // Bright orange for primary accents, representing sunlight
      'primary-hover': '#FF8C00', // Slightly darker orange when hovered
      secondary: '#FFD700',    // Golden yellow for secondary accents
      'secondary-hover': '#FFCC00', // Slightly darker yellow for hover
      accent: '#FF6347',       // Tomato red for accent color, adding vibrancy
      muted: '#BDB76B',        // Olive green for muted elements, offering contrast
      border: '#D3D3D3',       // Light gray for borders to keep it subtle
    },
  },
};
