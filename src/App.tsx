import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { AppLayout } from './components/layout/AppLayout';

// Page Imports
import { HomePage } from './pages/HomePage';
import { CoursesPage } from './pages/CoursesPage';
import { CourseDetailPage } from './pages/CourseDetailPage';
import { TopicDetailPage } from './pages/TopicDetailPage';
import { MaterialsPage } from './pages/MaterialsPage';
import { MaterialReaderPage } from './pages/MaterialReaderPage';
import { FlashcardsPage } from './pages/FlashcardsPage';
import { FlashcardStudyPage } from './pages/FlashcardStudyPage';
import { QuizPage } from './pages/QuizPage';
import { QuizSessionPage } from './pages/QuizSessionPage';
import { ClinicalCasesPage } from './pages/ClinicalCasesPage';
import { ClinicalCaseDetailPage } from './pages/ClinicalCaseDetailPage';
import { VeterinaryAtlasPage } from './pages/VeterinaryAtlasPage';
import { PPDHPage } from './pages/PPDHPage';
import { ProgressPage } from './pages/ProgressPage';
import { GlobalSearchPage } from './pages/GlobalSearchPage';
import { ProfilePage } from './pages/ProfilePage';
import { SettingsPage } from './pages/SettingsPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { ContentManagementPage } from './pages/ContentManagementPage';

const AppRouter: React.FC = () => {
  const { currentRoute } = useApp();

  // Route matching logic
  const renderCurrentPage = () => {
    // 1. Home
    if (currentRoute === '/' || currentRoute === '') {
      return <HomePage />;
    }

    // 2. Courses
    if (currentRoute === '/courses') {
      return <CoursesPage />;
    }

    const semesterMatch = currentRoute.match(/^\/courses\/semester-([1-8]|ppdh)$/);
    if (semesterMatch) {
      const sem = semesterMatch[1] === 'ppdh' ? 'ppdh' : parseInt(semesterMatch[1], 10);
      return <CoursesPage initialSemester={sem as any} />;
    }

    if (currentRoute === '/courses/ppdh') {
      return <PPDHPage />;
    }

    const courseMatch = currentRoute.match(/^\/courses\/([^/]+)$/);
    if (courseMatch) {
      return <CourseDetailPage courseId={courseMatch[1]} />;
    }

    // 3. Topics
    const topicMatch = currentRoute.match(/^\/topics\/([^/]+)$/);
    if (topicMatch) {
      return <TopicDetailPage topicId={topicMatch[1]} />;
    }

    // 4. Materials
    if (currentRoute === '/materials') {
      return <MaterialsPage />;
    }

    const materialReadMatch = currentRoute.match(/^\/materials\/([^/]+)\/read$/);
    if (materialReadMatch) {
      return <MaterialReaderPage materialId={materialReadMatch[1]} />;
    }

    // 5. Flashcards
    if (currentRoute === '/flashcards') {
      return <FlashcardsPage />;
    }

    const flashcardStudyMatch = currentRoute.match(/^\/flashcards\/([^/]+)\/study$/);
    if (flashcardStudyMatch) {
      return <FlashcardStudyPage deckId={flashcardStudyMatch[1]} />;
    }

    // 6. Quizzes
    if (currentRoute === '/quiz') {
      return <QuizPage />;
    }

    const quizStartMatch = currentRoute.match(/^\/quiz\/([^/]+)\/start$/);
    if (quizStartMatch) {
      return <QuizSessionPage quizId={quizStartMatch[1]} />;
    }

    // 7. Clinical Cases
    if (currentRoute === '/cases') {
      return <ClinicalCasesPage />;
    }

    const caseDetailMatch = currentRoute.match(/^\/cases\/([^/]+)$/);
    if (caseDetailMatch) {
      return <ClinicalCaseDetailPage caseId={caseDetailMatch[1]} />;
    }

    // 8. Atlas
    if (currentRoute === '/atlas') {
      return <VeterinaryAtlasPage />;
    }

    const atlasMatch = currentRoute.match(/^\/atlas\/([^/]+)\/([^/]+)\/([^/]+)$/);
    if (atlasMatch) {
      return (
        <VeterinaryAtlasPage
          initialSpecies={atlasMatch[1]}
          initialSystem={atlasMatch[2]}
          initialStructureId={atlasMatch[3]}
        />
      );
    }

    // 9. Progress & Analytics
    if (currentRoute === '/progress') {
      return <ProgressPage />;
    }

    // 10. Search
    if (currentRoute.startsWith('/search')) {
      return <GlobalSearchPage />;
    }

    // 11. Profile, Settings, Notifications
    if (currentRoute === '/profile') {
      return <ProfilePage />;
    }

    if (currentRoute === '/settings') {
      return <SettingsPage />;
    }

    if (currentRoute === '/notifications') {
      return <NotificationsPage />;
    }

    // 12. Content Management & Curriculum Registry
    if (currentRoute === '/content-management' || currentRoute === '/curriculum-registry') {
      return <ContentManagementPage />;
    }

    // Fallback to Home
    return <HomePage />;
  };

  // Full-screen immersion mode for distraction-free reading/exam
  const isImmersiveMode =
    currentRoute.includes('/read') ||
    currentRoute.includes('/study') ||
    currentRoute.includes('/start');

  return (
    <AppLayout isImmersive={isImmersiveMode}>
      {renderCurrentPage()}
    </AppLayout>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}
