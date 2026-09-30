export type Role = "student" | "admin";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: Role;
  created_at?: string;
}

export interface Menu {
  id: number;
  date: string;
  breakfast: string;
  lunch: string;
  dinner: string;
  created_at?: string;
}

export interface MealPreference {
  id: number;
  student_id: string;
  date: string;
  breakfast: boolean;
  lunch: boolean;
  dinner: boolean;
  created_at?: string;
}

export interface Feedback {
  id: number;
  student_id: string;
  rating: number;
  message: string;
  created_at: string;
}