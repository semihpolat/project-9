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
    x: 'calc(50% - 12vw)',
    y: 'calc(50% - 8vh)', 
    zIndex: 5,
    rotation: -25,
    scale: 1.2,
    defaultPath: '',
    hoveredPath: '',
    defaultColor: '#0B0B0B',
    hoverColor: '#B0121B'
  },
  {
    slug: 'decision-making',
    x: 'calc(50% + 8vw)',
    y: 'calc(50% - 15vh)',
    zIndex: 3,
    rotation: 18,
    scale: 0.9,
    defaultPath: '',
    hoveredPath: '',
    defaultColor: '#0B0B0B',
    hoverColor: '#B0121B'
  },
  {
    slug: 'problem-solving',
    x: 'calc(50% + 15vw)',
    y: 'calc(50% + 5vh)',
    zIndex: 4,
    rotation: -12,
    scale: 1.1,
    defaultPath: '',
    hoveredPath: '',
    defaultColor: '#0B0B0B', 
    hoverColor: '#B0121B'
  },
  {
    slug: 'creativity',
    x: 'calc(50% - 18vw)',
    y: 'calc(50% + 12vh)',
    zIndex: 2,
    rotation: 35,
    scale: 1.4,
    defaultPath: '',
    hoveredPath: '',
    defaultColor: '#0B0B0B',
    hoverColor: '#B0121B'
  },
  {
    slug: 'communication',
    x: 'calc(50% + 2vw)',
    y: 'calc(50% + 18vh)',
    zIndex: 6,
    rotation: -22,
    scale: 1.0,
    defaultPath: '',
    hoveredPath: '',
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