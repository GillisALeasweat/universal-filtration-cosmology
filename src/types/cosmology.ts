export type PerspectiveType = 'physicist' | 'philosopher' | 'scifi';

export interface ArchitectureNode {
  id: string;
  name: string;
  japaneseName: string;
  level: number;
  category: 'source' | 'filter' | 'medium' | 'membrane' | 'valve' | 'matter';
  description: string;
  role: string;
  scientificAnalog: string;
  criticalChallenge: string;
  breakthroughScore: number; // 1-100
}

export interface SimulationState {
  cosmicTimeGyr: number;
  initialDarkMatterPct: number;
  bhConversionRate: number; // rate of DM -> Light Matter via BHs
  jetRefluxRate: number; // high-dimensional reflux back to 3D via jets
  bhAbundanceMultiplier: number;
}

export interface SimulationResultPoint {
  timeGyr: number;
  darkMatter: number;
  lightMatter: number;
  highDimEnergy: number;
  equilibriumDelta: number;
  entropyState: number;
}

export interface CritiquePerspective {
  id: string;
  title: string;
  badge: string;
  verdict: string;
  rating: number; // 0-100
  summary: string;
  strengths: string[];
  vulnerabilities: string[];
  recommendations: string[];
  falsifiablePredictions: string[];
}

export interface ResearchMappingItem {
  id: string;
  realWorldProblem: string;
  field: string;
  currentStalemate: string;
  frameworkSolution: string;
  breakthroughViability: 'High' | 'Medium-High' | 'Moderate' | 'Theoretical Barrier';
  viabilityScore: number; // 0-100
  keyObservationalFacilities: string[];
  hardPhysicalBarriers: string[];
  mathematicalFormalizationPath: string;
}

export interface JetRefluxPoint {
  id: string;
  name: string;
  category: 'supermassive' | 'early_quasar' | 'stellar' | 'intermediate';
  logMass: number; // log10(M / M_sun), e.g. 1 to 10.5
  redshift: number; // z = 0 to 12
  baseRefluxPct: number; // base reflux fraction in % (e.g., 0.005 to 0.08%)
  jetPowerEddington: number; // L_jet / L_edd (e.g., 0.01 to 1.5)
  hostGalaxy: string;
  notes: string;
}


