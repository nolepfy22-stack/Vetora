export type SemesterNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 'ppdh';

export type ContentCategory = 'officialContent' | 'userContent' | 'aiGeneratedContent' | 'demoContent';

export interface CurriculumMetadata {
  id: string;
  name: string;
  version: string;
  effectiveYear: string;
  totalSks: number;
  undergraduateSks: number;
  electiveSks: number;
  ppdhSks: number;
  institution: string;
  faculty: string;
  philosophy: string;
  description: string;
  sourceUrl: string;
  sourceTitle: string;
  verified: boolean;
}

export interface OfficialSource {
  id: string;
  title: string;
  category: 'curriculum' | 'handbook' | 'rpkps' | 'ppdh' | 'department' | 'clinical';
  sourceName: string;
  url: string;
  date: string;
  verified: boolean;
  description: string;
  author: string;
  retrievedAt: string;
  department?: string;
}

export interface Semester {
  id: string;
  number: SemesterNumber;
  title: string;
  academicYear: string;
  description: string;
  totalCourses: number;
  completedCourses: number;
  progress: number;
  totalCredits?: number;
  sourceUrl?: string;
  verified?: boolean;
}

export interface Course {
  id: string;
  name: string;
  code: string;
  semesterId: string;
  semesterNumber: SemesterNumber;
  description: string;
  iconImage: string;
  materialsCount: number;
  topicsCount: number;
  progress: number;
  category: string;
  credits: number;
  instructor: string;
  // Provenance & Curriculum extensions
  courseCode?: string;
  courseName?: string;
  semester?: SemesterNumber;
  sks?: number;
  prerequisites?: string[];
  learningObjectives?: string[];
  sourceUrl?: string;
  sourceTitle?: string;
  sourceDate?: string;
  verified?: boolean;
  contentCategory?: ContentCategory;
  isClinical?: boolean;
  department?: string;
  publicMaterialAvailable?: boolean;
  isPPDH?: boolean;
  topics?: any[];
}

export interface Topic {
  id: string;
  courseId: string;
  title: string;
  description: string;
  order: number;
  progress: number;
  materialsCount: number;
  quizCount: number;
  flashcardDeckId?: string;
  subtopics?: string[];
  sourceUrl?: string;
  verified?: boolean;
  needsReview?: boolean;
}

export type MaterialType =
  | 'Module Handbook'
  | 'RPKPS'
  | 'Lecture Material'
  | 'Academic Guide'
  | 'Journal'
  | 'Reference'
  | 'Clinical Reference'
  | 'Lecture Notes'
  | 'Module'
  | 'Handbook'
  | 'User Notes';

export interface MaterialSection {
  id: string;
  title: string;
  content: string; // rich text or markdown-style text
  readingTimeMinutes: number;
  keyPoints?: string[];
  clinicalPearl?: string;
}

export interface Material {
  id: string;
  title: string;
  description: string;
  type: MaterialType;
  courseId: string;
  topicId: string;
  semesterId: string;
  readTimeMinutes: number;
  readingTimeMinutes?: number;
  isSaved: boolean;
  isCompleted: boolean;
  progressPercent: number;
  sections: MaterialSection[];
  tags?: string[];
  notes?: string;
  bookmarks?: string[]; // section IDs
  highlights?: { id: string; text: string; sectionId: string; color: string }[];
  updatedAt: string;
  // Provenance & Source Metadata
  source?: string; // 'FKH UGM' | 'Personal' | 'AI-generated study aid'
  sourceUrl?: string;
  sourceType?: string; // 'Official Module Handbook' | 'RPKPS' | 'Academic Guide' | 'User Added' | 'Imported Web Resource'
  sourceDate?: string;
  retrievedAt?: string;
  verified?: boolean;
  contentCategory?: ContentCategory;
  status?: 'published' | 'draft' | 'archived' | 'needs_review';
}

export type CardDifficulty = 'again' | 'hard' | 'good' | 'easy' | 'new';

export interface Flashcard {
  id: string;
  deckId: string;
  question: string;
  answer: string;
  explanation?: string;
  difficulty: CardDifficulty;
  masteryLevel: number; // 0 to 100
  lastReviewed?: string;
}

export interface FlashcardDeck {
  id: string;
  title: string;
  description: string;
  courseId: string;
  topicId?: string;
  cardsCount: number;
  masteredCount: number;
  isSaved: boolean;
  createdAt: string;
  cards: Flashcard[];
}

export type QuestionType = 'multiple-choice' | 'true-false' | 'image-identification';

export interface QuizQuestion {
  id: string;
  type: QuestionType;
  question: string;
  imageUrl?: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  date: string;
  score: number;
  accuracy: number;
  totalQuestions: number;
  correctAnswers: number;
  timeSpentSeconds: number;
  userAnswers: { questionId: string; selectedIndex: number; isCorrect: boolean }[];
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  courseId: string;
  topicId?: string;
  semesterId: string;
  difficulty: 'Basic' | 'Intermediate' | 'Advanced';
  timeLimitMinutes: number;
  questionsCount: number;
  questions: QuizQuestion[];
  bestScore?: number;
  attemptsCount: number;
  lastAttempt?: QuizAttempt;
}

export type CaseSpecies = 'Canine' | 'Feline' | 'Equine' | 'Bovine' | 'Avian' | 'Exotic';

export interface ClinicalCase {
  id: string;
  title: string;
  species: CaseSpecies;
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
  topicId: string;
  courseId: string;
  status: 'completed' | 'in-progress' | 'not-started';
  patient: {
    name: string;
    breed: string;
    age: string;
    sex: string;
    weight: string;
  };
  history: string;
  chiefComplaint: string;
  physicalExam: string[];
  labFindings: {
    test: string;
    result: string;
    normalRange: string;
    status: 'normal' | 'high' | 'low';
  }[];
  imaging: {
    type: string;
    description: string;
    imageUrl?: string;
  }[];
  clinicalSigns: string[];
  differentialDiagnosis: string[];
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
  keyLearningPoints: string[];
  userSelectedOption?: number;
  completedAt?: string;
}

export type AtlasSpecies = 'Dog' | 'Cat' | 'Horse' | 'Cattle' | 'Other';
export type AtlasSystemType =
  | 'Cardiovascular'
  | 'Respiratory'
  | 'Digestive'
  | 'Urinary'
  | 'Nervous'
  | 'Reproductive'
  | 'Musculoskeletal';

export interface AtlasStructure {
  id: string;
  name: string;
  latinName: string;
  species: AtlasSpecies[];
  system: AtlasSystemType;
  organ: string;
  description: string;
  function: string;
  clinicalRelevance: string;
  imageUrl: string;
  relatedMaterialIds: string[];
  relatedQuizId?: string;
  relatedCaseId?: string;
  isFavorite?: boolean;
}

export interface UserProfile {
  name: string;
  fullName: string;
  nickname?: string;
  email: string;
  institution: string;
  faculty: string;
  studyProgram?: string;
  studentId: string;
  currentSemester: SemesterNumber;
  semesterLabel: string;
  avatarUrl: string;
  bio: string;
  dailyGoalMinutes: number;
  studyStreakDays: number;
  preferredStudyGoal?: string;
  totalStudyMinutes?: number;
}

export type ScheduleType = 'Kuliah' | 'Praktikum' | 'Ujian' | 'Belajar' | 'PPDH' | 'Personal' | 'Other';
export type ScheduleStatus = 'Upcoming' | 'In Progress' | 'Completed' | 'Cancelled';

export interface ScheduleItem {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  course?: string;
  courseId?: string;
  location?: string;
  type: ScheduleType;
  notes?: string;
  status: ScheduleStatus;
  isCompleted?: boolean;
  createdAt: string;
  completedAt?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'clinical' | 'streak' | 'anatomy' | 'milestone' | 'quiz';
  targetCount: number;
  currentCount: number;
  progressPercent: number;
  isUnlocked: boolean;
  unlockedAt?: string;
  requirementText: string;
}

export interface AppSettings {
  theme: 'light' | 'dark' | 'system';
  dailyStudyGoalMinutes: number;
  defaultQuizDifficulty: 'Basic' | 'Intermediate' | 'Advanced';
  flashcardPreference: 'standard' | 'spaced';
  studyReminders: boolean;
  quizReminders: boolean;
  flashcardReminders: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'study' | 'quiz' | 'flashcard' | 'case' | 'system';
  timestamp: string;
  isRead: boolean;
  link: string;
}

export type PPDHRecordType = 'patient' | 'procedure' | 'clinical-note' | 'case-report';

export interface PPDHRecord {
  id: string;
  type: PPDHRecordType;
  title: string;
  rotation: string;
  week: number;
  date: string;
  species: string;
  patientName?: string;
  supervisor: string;
  notes: string;
  status: 'draft' | 'submitted' | 'approved';
}

export interface StudySessionLog {
  id: string;
  date: string;
  type: 'material' | 'flashcard' | 'quiz' | 'case';
  title: string;
  details: string;
  durationMinutes: number;
  timestamp: string;
}

export interface GlobalSearchItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'Course' | 'Material' | 'Flashcard' | 'Quiz' | 'Case' | 'Atlas';
  route: string;
  meta?: string;
}
