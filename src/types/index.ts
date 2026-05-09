import type { Timestamp, FieldValue } from 'firebase/firestore';

export type RiskTolerance = 'conservative' | 'moderate' | 'aggressive';
export type Language = 'en' | 'fr' | 'ar';

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  points: number;
  level: number;
  badges: string[];
  completedLessons: string[];
  riskTolerance: RiskTolerance;
  preferredLanguage: Language | string;
  createdAt: Timestamp | FieldValue;
  // Optional fields written by the assessment flow.
  investmentLevel?: string;
  levelUpdated?: string;
}

export interface ForumPost {
  id: string;
  authorId: string;
  authorName: string;
  title: string;
  content: string;
  category: string;
  likesCount: number;
  createdAt: Timestamp | FieldValue;
}

export interface ForumComment {
  id: string;
  postId: string;
  authorId: string;
  authorName: string;
  content: string;
  createdAt: Timestamp | FieldValue;
}
