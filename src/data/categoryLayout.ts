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
  spiralAngle: number; // angle in spiral
  spiralRadius: number; // distance from center
  isActive: boolean; // whether category exists
}

// Generate spiral layout for Roman numerals I through XII
const generateSpiralLayout = (): CategoryLayout[] => {
  const layouts: CategoryLayout[] = [];
  const totalPositions = 12; // I through XII
  const activeCategories = ['self-awareness', 'decision-making', 'problem-solving', 'creativity', 'communication'];
  
  for (let i = 0; i < totalPositions; i++) {
    const numeral = i + 1;
    
    // True spiral: angle increases more gradually, radius grows smoothly
    const spiralTurns = 2.5; // How many full turns the spiral makes
    const maxRadius = 35; // Maximum distance from center
    const angleIncrement = (spiralTurns * 360) / totalPositions; // Degrees per step
    const angle = i * angleIncrement - 90; // Start from top (12 o'clock)
    const spiralRadius = (i / (totalPositions - 1)) * maxRadius; // Gradual radius increase
    
    // Convert polar to cartesian coordinates
    const radians = (angle * Math.PI) / 180;
    const x = 50 + (spiralRadius * Math.cos(radians));
    const y = 50 + (spiralRadius * Math.sin(radians));
    
    const isActive = i < activeCategories.length;
    const slug = isActive ? activeCategories[i] : `placeholder-${i}`;
    
    layouts.push({
      slug,
      x: `${Math.max(5, Math.min(95, x))}%`,
      y: `${Math.max(5, Math.min(95, y))}%`,
      zIndex: isActive ? 10 - i : 1, // Inner elements have higher z-index
      rotation: angle + 90 + (isActive ? (i % 2 === 0 ? -10 : 10) : 0), // Follow spiral direction
      scale: isActive ? 1.2 - (i * 0.1) : 0.5, // Larger at center, smaller outward
      defaultPath: '',
      hoveredPath: '',
      defaultColor: isActive ? '#0B0B0B' : '#D0D0D0',
      hoverColor: isActive ? '#B0121B' : '#A0A0A0',
      spiralAngle: angle,
      spiralRadius: spiralRadius,
      isActive
    });
  }
  
  return layouts;
};

export const categoryLayouts: CategoryLayout[] = generateSpiralLayout();

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