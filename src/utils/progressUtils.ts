import { Course, Topic, Material, FlashcardDeck, Quiz, ClinicalCase } from '../types';

/**
 * Calculates topic progress percentage deterministically based on completed materials.
 */
export const calculateTopicProgress = (
  topicId: string,
  materials: Material[]
): number => {
  if (!Array.isArray(materials)) return 0;
  const topicMaterials = materials.filter((m) => Boolean(m && m.topicId === topicId));
  if (topicMaterials.length === 0) return 0;
  const completed = topicMaterials.filter((m) => Boolean(m?.isCompleted)).length;
  return Math.round((completed / topicMaterials.length) * 100);
};

/**
 * Calculates course progress percentage based on its materials or topics.
 */
export const calculateCourseProgress = (
  courseId: string,
  materials: Material[]
): number => {
  if (!Array.isArray(materials)) return 0;
  const courseMaterials = materials.filter((m) => Boolean(m && m.courseId === courseId));
  if (courseMaterials.length === 0) return 0;
  const completed = courseMaterials.filter((m) => Boolean(m?.isCompleted)).length;
  return Math.round((completed / courseMaterials.length) * 100);
};

/**
 * Calculates semester progress percentage based on courses.
 */
export const calculateSemesterProgress = (
  semesterNumber: number,
  courses: Course[]
): number => {
  if (!Array.isArray(courses)) return 0;
  const semesterCourses = courses.filter((c) => Boolean(c && c.semesterNumber === semesterNumber));
  if (semesterCourses.length === 0) return 0;
  const totalProgress = semesterCourses.reduce((acc, c) => acc + (c?.progress || 0), 0);
  return Math.round(totalProgress / semesterCourses.length);
};

/**
 * Calculates overall academic learning progress across all modules deterministically.
 */
export const calculateOverallProgress = (
  materials: Material[],
  flashcardsMastered: number,
  totalFlashcards: number,
  quizzes: Quiz[],
  clinicalCases: ClinicalCase[]
): number => {
  const safeMaterials = Array.isArray(materials) ? materials.filter(Boolean) : [];
  const totalMaterials = safeMaterials.length;
  const completedMaterials = safeMaterials.filter((m) => Boolean(m?.isCompleted)).length;
  const materialProgress = totalMaterials > 0 ? (completedMaterials / totalMaterials) * 100 : 0;

  const flashcardProgress = totalFlashcards > 0 ? (flashcardsMastered / totalFlashcards) * 100 : 0;

  const safeQuizzes = Array.isArray(quizzes) ? quizzes.filter(Boolean) : [];
  const totalQuizzes = safeQuizzes.length;
  const completedQuizzes = safeQuizzes.filter((q) => (q?.attemptsCount || 0) > 0).length;
  const quizProgress = totalQuizzes > 0 ? (completedQuizzes / totalQuizzes) * 100 : 0;

  const safeCases = Array.isArray(clinicalCases) ? clinicalCases.filter(Boolean) : [];
  const totalCases = safeCases.length;
  const completedCases = safeCases.filter((c) => c?.status === 'completed').length;
  const caseProgress = totalCases > 0 ? (completedCases / totalCases) * 100 : 0;

  // Weighted formula:
  // Materials: 40%, Flashcards: 25%, Quizzes: 20%, Clinical Cases: 15%
  const weighted =
    materialProgress * 0.4 +
    flashcardProgress * 0.25 +
    quizProgress * 0.2 +
    caseProgress * 0.15;

  return Math.round(weighted);
};

export const getCourseActionLabel = (progress: number): string => {
  if (progress >= 100) return 'Review Course';
  if (progress > 0) return 'Continue Learning';
  return 'Start Learning';
};
