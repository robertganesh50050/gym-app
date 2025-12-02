export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER'
}

export enum MemberStatus {
  ACTIVE = 'Active',
  PENDING = 'Pending',
  EXPIRED = 'Expired'
}

export interface Member {
  id: string;
  name: string;
  email: string;
  joinDate: string;
  status: MemberStatus;
  plan: string;
  avatar: string;
  weight: number; // kg
  height: number; // cm
  goal: string;
  attendance: number; // percentage
  medicalConditions?: string;
}

export interface WorkoutDay {
  day: string;
  focus: string;
  exercises: {
    name: string;
    sets: string;
    reps: string;
    rest: string;
    videoUrl?: string; // Placeholder for future video integration
  }[];
}

export interface DietMeal {
  meal: string; // Breakfast, Lunch, etc.
  suggestion: string;
  calories: number;
  protein: string;
  carbs: string;
  fats: string;
}

export interface GeneratedPlan {
  workout?: WorkoutDay[];
  diet?: DietMeal[];
  lastUpdated: number;
}
