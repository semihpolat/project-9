export interface CategoryLayout {
  slug: string;
  x: string; // CSS position value (e.g., "15%", "calc(50% - 10vw)")
  y: string; // CSS position value  
  zIndex: number;
  rotation: number; // degrees
  scale: number;
  defaultPath: string; // SVG path for default state
  hoveredPath: string; // SVG path for hover state
  defaultColor: string;
  hoverColor: string;
}

export const categoryLayouts: CategoryLayout[] = [
  {
    slug: 'self-awareness',
    x: '8%',
    y: '12%', 
    zIndex: 5,
    rotation: -12,
    scale: 1.1,
    defaultPath: 'M50 20 C70 20, 80 40, 80 60 C80 80, 60 90, 50 85 C40 90, 20 80, 20 60 C20 40, 30 20, 50 20 Z',
    hoveredPath: 'M50 15 C75 18, 85 35, 82 65 C85 85, 65 95, 50 88 C35 95, 15 85, 18 65 C15 35, 25 18, 50 15 Z',
    defaultColor: '#0B0B0B',
    hoverColor: '#B0121B'
  },
  {
    slug: 'decision-making',
    x: 'calc(50% - 15vw)',
    y: '25%',
    zIndex: 3,
    rotation: 8,
    scale: 0.9,
    defaultPath: 'M30 25 C60 22, 75 35, 70 55 C72 75, 55 85, 40 80 C25 85, 15 70, 18 55 C12 35, 25 28, 30 25 Z',
    hoveredPath: 'M25 20 C65 18, 82 30, 75 60 C78 82, 58 92, 40 85 C20 92, 8 75, 12 60 C5 30, 22 23, 25 20 Z',
    defaultColor: '#0B0B0B',
    hoverColor: '#B0121B'
  },
  {
    slug: 'problem-solving',
    x: '72%',
    y: '8%',
    zIndex: 4,
    rotation: -5,
    scale: 1.0,
    defaultPath: 'M45 30 C65 28, 72 42, 68 58 C70 72, 58 78, 45 75 C32 78, 22 72, 25 58 C20 42, 28 32, 45 30 Z',
    hoveredPath: 'M40 25 C70 23, 78 38, 73 63 C75 77, 63 85, 45 80 C27 85, 17 77, 22 63 C15 38, 25 28, 40 25 Z',
    defaultColor: '#0B0B0B', 
    hoverColor: '#B0121B'
  },
  {
    slug: 'creativity',
    x: '15%',
    y: '62%',
    zIndex: 2,
    rotation: 15,
    scale: 1.2,
    defaultPath: 'M40 35 C58 32, 65 45, 62 60 C64 72, 54 77, 42 74 C30 77, 23 72, 26 60 C22 45, 30 38, 40 35 Z',
    hoveredPath: 'M35 28 C63 25, 72 40, 67 65 C70 78, 58 85, 42 80 C26 85, 16 78, 20 65 C15 40, 27 32, 35 28 Z',
    defaultColor: '#0B0B0B',
    hoverColor: '#B0121B'
  },
  {
    slug: 'communication',
    x: 'calc(50% + 10vw)',
    y: '55%',
    zIndex: 6,
    rotation: -8,
    scale: 0.95,
    defaultPath: 'M48 28 C66 26, 72 38, 68 56 C70 70, 58 75, 46 72 C34 75, 26 70, 29 56 C24 38, 32 30, 48 28 Z',
    hoveredPath: 'M43 22 C71 20, 79 35, 73 61 C76 75, 63 82, 46 78 C29 82, 19 75, 23 61 C17 35, 29 25, 43 22 Z',
    defaultColor: '#0B0B0B',
    hoverColor: '#B0121B'
  }
];

// Roman numeral representations for each category
export const romanNumerals = {
  'self-awareness': 'I',
  'decision-making': 'II', 
  'problem-solving': 'III',
  'creativity': 'IV',
  'communication': 'V'
}; 