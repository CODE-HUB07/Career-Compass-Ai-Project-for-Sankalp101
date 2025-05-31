
export type FormStep = 'welcome' | 'personal' | 'education' | 'interests' | 'skills' | 'preferences' | 'results';

export interface UserData {
  name: string;
  age: string;
  location: string;
  education: string;
  subjects: string[];
  interests: string[];
  skills: {
    technical: string[];
    soft: string[];
  };
  preferences: {
    environment: 'indoor' | 'outdoor' | 'both';
    workStyle: 'solo' | 'team' | 'both';
    pace: 'fast' | 'steady' | 'both';
  };
}

export interface Career {
  id: number;
  title: string;
  description: string;
  match: string;
  resources: Resource[];
  icon: string;
  color: 'blue' | 'purple' | 'teal' | 'pink' | 'orange';
  opportunities?: Opportunity[];
  matchScore?: number; // Added for AI scoring
  requiredSkills?: string[]; // Added for skill gap analyzer
  salaryRange?: string; // Added for career comparison
  growthProspects?: string; // Added for career comparison
  educationRequirements?: string; // Added for career comparison
}

export interface Resource {
  name: string;
  url: string;
  type: 'course' | 'tool' | 'book' | 'website';
}

export interface Opportunity {
  title: string;
  organization: string;
  location: string;
  url: string;
  type: 'job' | 'study';
  deadline?: string;
}

export interface PersonalityTestResult {
  type: string;
  description: string;
  strengths: string[];
  weaknesses: string[];
  suitableCareers: string[];
}

export interface SkillGapResult {
  missingSkills: string[];
  learningResources: Resource[];
}

export interface CareerComparisonData {
  careers: Career[];
}

