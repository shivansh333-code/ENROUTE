export type RouteId = 'upper-shimla' | 'kullu-manali' | 'great-himachal-loop';

export type SeasonalStatus = 'OPEN' | 'SEASONAL' | 'WINTER_ROUTE' | 'CHECKING_ROAD';

export interface RouteStop {
  id: string;
  name: string;
  elevation: string;
  tagline: string;
  description: string;
  isOptionalBranch?: boolean;
  highlight: string;
}

export interface ItineraryStyle {
  duration: string;
  title: string;
  subtitle: string;
  bestFor: string;
  stopsSummary: string[];
  focus: string[];
  isSignature?: boolean;
}

export interface EnrouteSecret {
  id: string;
  category: 'Take This Turn' | 'Eat Here' | 'Best Hour' | 'Secret View' | 'Don\'t Rush This' | 'Skip The Crowd' | 'Ask For This' | 'Stay Here Tonight' | 'Worth The Detour';
  location: string;
  teaserTitle: string;
  teaserQuote: string;
  revealedInsight: string;
  pahadiNote: string;
  coordinatesHint: string;
}

export interface StaySpot {
  id: string;
  name: string;
  category: 'Inside The Orchard' | 'Beside The River' | 'Old Himachali Home' | 'Forest Hideaway' | 'Mountain Luxury' | 'Nothing Around For Miles';
  valley: string;
  atmosphere: string;
  elevation: string;
  image: string;
  notes: string;
}

export interface FoodSpot {
  id: string;
  dishName: string;
  setting: string;
  route: string;
  description: string;
  bestTime: string;
  pahadiTip: string;
}

export interface MountainPassStatus {
  name: string;
  altitude: string;
  status: SeasonalStatus;
  seasonWindow: string;
  operationalNote: string;
  lastUpdated: string;
}

export interface RouteData {
  id: RouteId;
  number: string;
  name: string;
  tagline: string;
  span: string;
  summary: string;
  landscapeEvolution: string[];
  heroImage: string;
  itineraries: ItineraryStyle[];
  stops: RouteStop[];
  passes: MountainPassStatus[];
  secretStops: EnrouteSecret[];
  stays: StaySpot[];
  foods: FoodSpot[];
  pahadiDialogue: {
    situation: string;
    quote: string;
  };
}

export type PaceMode = 'wander' | 'flow' | 'disappear';

export type ActivePage = 
  | 'home' 
  | 'routes' 
  | 'route-upper-shimla' 
  | 'route-kullu-manali' 
  | 'route-great-himachal-loop'
  | 'experiences'
  | 'secrets'
  | 'stories'
  | 'films'
  | 'about'
  | 'responsible-travel'
  | 'plan'
  | 'contact';
