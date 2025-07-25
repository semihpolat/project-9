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
  isActive: boolean; // whether category exists
}

// Generate two-row layout for Roman numerals I through XII
const generateTwoRowLayout = (): CategoryLayout[] => {
  const layouts: CategoryLayout[] = [];
  const totalPositions = 12; // I through XII
  const activeCategories = ['self-awareness', 'decision-making', 'problem-solving', 'creativity', 'communication'];
  
  for (let i = 0; i < totalPositions; i++) {
    const isActive = i < activeCategories.length;
    const slug = isActive ? activeCategories[i] : `placeholder-${i}`;
    
    // Two rows: I-VI on top row, VII-XII on bottom row
    const isTopRow = i < 6;
    const positionInRow = i % 6;
    
    // Horizontal positioning: 6 numerals per row with good spacing
    const xPercent = 10 + (positionInRow * 13.5); // Start at 10%, each 13.5% apart
    const yPercent = isTopRow ? '40%' : '60%'; // Top row at 40%, bottom at 60%
    
    layouts.push({
      slug,
      x: `${xPercent}%`,
      y: yPercent,
      zIndex: isActive ? 5 + i : 1,
      rotation: isActive ? (i % 2 === 0 ? -6 : 6) : 0, // Slight alternating tilt
      scale: isActive ? 0.8 : 0.6, // Smaller to fit better
      defaultPath: '',
      hoveredPath: '',
      defaultColor: isActive ? '#0B0B0B' : '#D0D0D0',
      hoverColor: isActive ? '#B0121B' : '#A0A0A0',
      isActive
    });
  }
  
  return layouts;
};

export const categoryLayouts: CategoryLayout[] = generateTwoRowLayout();

// Roman numeral representations for positions I through XII
export const romanNumerals = {
  'self-awareness': 'I',
  'decision-making': 'II', 
  'problem-solving': 'III',
  'creativity': 'IV',
  'communication': 'V',
  'placeholder-5': 'VI',
  'placeholder-6': 'VII',
  'placeholder-7': 'VIII',
  'placeholder-8': 'IX',
  'placeholder-9': 'X',
  'placeholder-10': 'XI',
  'placeholder-11': 'XII'
}; 