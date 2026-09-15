import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  UserProfile,
  AppSettings,
  Semester,
  Course,
  Topic,
  Material,
  MaterialType,
  FlashcardDeck,
  Quiz,
  QuizAttempt,
  ClinicalCase,
  AtlasStructure,
  NotificationItem,
  PPDHRecord,
  StudySessionLog,
  CardDifficulty,
  CurriculumMetadata,
  OfficialSource,
  ScheduleItem,
  Achievement
} from '../types';
import {
  INITIAL_USER,
  INITIAL_SETTINGS,
  INITIAL_FLASHCARDS,
  INITIAL_QUIZZES,
  INITIAL_CLINICAL_CASES,
  INITIAL_ATLAS_STRUCTURES,
  INITIAL_NOTIFICATIONS,
  INITIAL_PPDH_RECORDS,
  INITIAL_STUDY_SESSIONS,
  INITIAL_SCHEDULE,
  INITIAL_ACHIEVEMENTS
} from '../data/mockData';
import {
  OFFICIAL_CURRICULUM_META,
  OFFICIAL_SEMESTERS,
  OFFICIAL_SOURCES,
  ALL_COURSES,
  OFFICIAL_TOPICS,
  OFFICIAL_MATERIALS
} from '../data/curriculum';

interface ToastState {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  actionText: string;
  link: string;
  badge: string;
}

interface AppContextType {
  // Navigation
  currentRoute: string;
  navigate: (route: string) => void;
  goBack: () => void;

  // User & Settings
  user: UserProfile;
  updateUser: (profile: Partial<UserProfile>) => void;
  userProfile: UserProfile;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  settings: AppSettings;
  updateSettings: (newSettings: Partial<AppSettings>) => void;

  // Academic Curriculum & Provenance
  curriculumMeta: CurriculumMetadata;
  officialSources: OfficialSource[];

  // Educational Collections
  semesters: Semester[];
  courses: Course[];
  topics: Topic[];
  materials: Material[];
  flashcardDecks: FlashcardDeck[];
  quizzes: Quiz[];
  clinicalCases: ClinicalCase[];
  atlasStructures: AtlasStructure[];
  notifications: NotificationItem[];
  ppdhRecords: PPDHRecord[];
  studySessions: StudySessionLog[];
  schedule: ScheduleItem[];
  achievements: Achievement[];

  // Schedule CRUD
  addScheduleItem: (item: Omit<ScheduleItem, 'id' | 'createdAt'>) => string;
  updateScheduleItem: (item: ScheduleItem) => void;
  deleteScheduleItem: (id: string) => void;
  toggleCompleteScheduleItem: (id: string) => void;

  // Material Management (User & URL Ingestion)
  addMaterial: (material: Omit<Material, 'id' | 'updatedAt'>) => string;
  updateMaterial: (material: Material) => void;
  deleteMaterial: (materialId: string) => void;
  importMaterialFromUrl: (importData: {
    url: string;
    title: string;
    description: string;
    courseId: string;
    topicId: string;
    semesterId: string;
    type: MaterialType;
    content?: string;
    keyPoints?: string[];
  }) => string;

  // Material Interactions
  toggleSaveMaterial: (materialId: string) => void;
  updateMaterialProgress: (materialId: string, progress: number, isCompleted?: boolean) => void;
  updateMaterialNotes: (materialId: string, notes: string) => void;
  toggleMaterialBookmark: (materialId: string, sectionId: string) => void;

  createDeck: (deck: Omit<FlashcardDeck, 'id' | 'cardsCount' | 'masteredCount' | 'createdAt'>) => string;
  updateDeck: (deck: FlashcardDeck) => void;
  deleteDeck: (deckId: string) => void;
  toggleSaveDeck: (deckId: string) => void;
  updateCardDifficulty: (deckId: string, cardId: string, difficulty: CardDifficulty) => void;

  recordQuizAttempt: (attempt: QuizAttempt) => void;

  submitCaseDiagnosis: (caseId: string, selectedOptionIndex: number) => boolean;

  toggleFavoriteAtlas: (id: string) => void;

  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;

  addPPDHRecord: (record: Omit<PPDHRecord, 'id'>) => void;
  updatePPDHRecord: (record: PPDHRecord) => void;
  deletePPDHRecord: (id: string) => void;

  logStudySession: (type: StudySessionLog['type'], title: string, details: string, durationMinutes: number) => void;

  // System actions
  resetProgress: () => void;
  clearAllData: () => void;
  resetAllData: () => void;
  exportDataJson: () => void;

  // Feedback
  toast: ToastState | null;
  showToast: (message: string, type?: ToastState['type']) => void;

  // Calculated Stats & Recommendations
  overallProgress: number;
  stats: {
    materialsCompleted: number;
    totalMaterials: number;
    quizzesCompleted: number;
    totalQuizzes: number;
    avgQuizAccuracy: number;
    flashcardsMastered: number;
    totalFlashcards: number;
    casesCompleted: number;
    totalCases: number;
    studyStreak: number;
    totalStudyHours: number;
  };
  recommendations: Recommendation[];
}

const AppContext = createContext<AppContextType | null>(null);

const STORAGE_KEYS = {
  USER: 'bulan_user_v2',
  SETTINGS: 'bulan_settings_v1',
  COURSES: 'bulan_courses_v3',
  MATERIALS: 'bulan_materials_v3',
  FLASHCARDS: 'bulan_flashcards_v2',
  QUIZZES: 'bulan_quizzes_v2',
  CASES: 'bulan_cases_v2',
  ATLAS: 'bulan_atlas_v1',
  NOTIFICATIONS: 'bulan_notifications_v1',
  PPDH: 'bulan_ppdh_v2',
  SESSIONS: 'bulan_sessions_v2',
  SCHEDULE: 'bulan_schedule_v1',
  ACHIEVEMENTS: 'bulan_achievements_v2',
  CURRENT_ROUTE: 'bulan_current_route_v1'
};

function loadStorage<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    if (!item) return fallback;
    const parsed = JSON.parse(item);
    if (parsed === null || parsed === undefined) return fallback;
    if (Array.isArray(fallback)) {
      if (!Array.isArray(parsed)) return fallback;
      // Strip out any null, undefined, or invalid non-object entries from persisted arrays
      const sanitized = parsed.filter(
        (elem: any) => elem !== null && elem !== undefined && typeof elem === 'object'
      );
      return sanitized as unknown as T;
    }
    if (typeof fallback === 'object' && typeof parsed !== 'object') {
      return fallback;
    }
    return parsed;
  } catch (err) {
    console.error(`Failed to load ${key} from storage:`, err);
    return fallback;
  }
}

function saveStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Failed to save ${key} to storage:`, err);
  }
}

function mergeCoursesWithStored(stored: Course[] | null): Course[] {
  if (!Array.isArray(stored) || stored.length === 0) return ALL_COURSES;
  const storedMap = new Map<string, Course>();
  for (const c of stored) {
    if (c && typeof c === 'object' && typeof c.id === 'string') {
      storedMap.set(c.id, c);
    }
  }
  return ALL_COURSES.map((official) => {
    if (!official) return null;
    const s = storedMap.get(official.id);
    if (s) {
      return {
        ...official,
        progress: typeof s.progress === 'number' ? s.progress : official.progress
      };
    }
    return official;
  }).filter((c): c is Course => Boolean(c && typeof c === 'object' && typeof c.id === 'string'));
}

function mergeMaterialsWithStored(stored: Material[] | null): Material[] {
  if (!Array.isArray(stored) || stored.length === 0) return OFFICIAL_MATERIALS;
  const storedMap = new Map<string, Material>();
  for (const m of stored) {
    if (m && typeof m === 'object' && typeof m.id === 'string') {
      storedMap.set(m.id, m);
    }
  }
  
  const mergedOfficial = OFFICIAL_MATERIALS.map((official) => {
    if (!official) return null;
    const s = storedMap.get(official.id);
    if (s) {
      return {
        ...official,
        isSaved: typeof s.isSaved === 'boolean' ? s.isSaved : official.isSaved,
        isCompleted: typeof s.isCompleted === 'boolean' ? s.isCompleted : official.isCompleted,
        progressPercent: typeof s.progressPercent === 'number' ? s.progressPercent : official.progressPercent,
        notes: s.notes ?? official.notes,
        bookmarks: Array.isArray(s.bookmarks) ? s.bookmarks : official.bookmarks,
        highlights: Array.isArray(s.highlights) ? s.highlights : official.highlights
      };
    }
    return official;
  }).filter((m): m is Material => Boolean(m && typeof m === 'object' && typeof m.id === 'string'));

  const officialIds = new Set(OFFICIAL_MATERIALS.filter((m) => m && typeof m.id === 'string').map((m) => m.id));
  const userAdded = stored.filter(
    (m): m is Material => Boolean(m && typeof m === 'object' && typeof m.id === 'string' && !officialIds.has(m.id))
  ).map((m) => ({
    ...m,
    isCompleted: Boolean(m.isCompleted),
    progressPercent: typeof m.progressPercent === 'number' ? m.progressPercent : 0,
    isSaved: Boolean(m.isSaved)
  }));

  return [...mergedOfficial, ...userAdded];
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation State
  // Navigation State
  // Vite uses "/" in development and "/Vetora/" on GitHub Pages.
  const BASE_PATH = import.meta.env.BASE_URL.replace(/\/$/, '');

  const getAppRoute = () => {
    const path = window.location.pathname || '/';

    // Remove GitHub Pages base path before giving the route to the app.
    if (BASE_PATH && path.startsWith(BASE_PATH)) {
      return path.slice(BASE_PATH.length) || '/';
    }

    return path;
  };

  const getBrowserPath = (route: string) => {
    const cleanRoute = route.startsWith('/') ? route : `/${route}`;

    if (BASE_PATH) {
      return `${BASE_PATH}${cleanRoute}`;
    }

    return cleanRoute;
  };

  const [currentRoute, setCurrentRoute] = useState<string>(() => {
    const path = getAppRoute();

    if (path && path !== '/') {
      return path;
    }

    return loadStorage(STORAGE_KEYS.CURRENT_ROUTE, '/');
  });

  const [historyStack, setHistoryStack] = useState<string[]>([currentRoute]);

  const navigate = (route: string) => {
    const cleanRoute = route.startsWith('/') ? route : `/${route}`;

    setCurrentRoute(cleanRoute);
    setHistoryStack((prev) => [...prev, cleanRoute]);

    window.history.pushState(null, '', getBrowserPath(cleanRoute));

    saveStorage(STORAGE_KEYS.CURRENT_ROUTE, cleanRoute);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBack = () => {
    if (historyStack.length > 1) {
      const newStack = [...historyStack];
      newStack.pop();

      const prevRoute = newStack[newStack.length - 1];

      setHistoryStack(newStack);
      setCurrentRoute(prevRoute);

      window.history.pushState(null, '', getBrowserPath(prevRoute));

      saveStorage(STORAGE_KEYS.CURRENT_ROUTE, prevRoute);
    } else {
      navigate('/');
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      const path = getAppRoute();

      setCurrentRoute(path);
      saveStorage(STORAGE_KEYS.CURRENT_ROUTE, path);
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Persistent States
  const [user, setUserState] = useState<UserProfile>(() => {
    const loaded = loadStorage(STORAGE_KEYS.USER, INITIAL_USER);
    if (loaded && loaded.fullName === 'Bulan Putri Mahadewi') {
      const updated = { ...loaded, fullName: 'Lovelita Najwa Bulan Dayanara' };
      saveStorage(STORAGE_KEYS.USER, updated);
      return updated;
    }
    return loaded;
  });
  const [settings, setSettingsState] = useState<AppSettings>(() => loadStorage(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS));
  const [semesters] = useState<Semester[]>(OFFICIAL_SEMESTERS);
  const [courses, setCoursesState] = useState<Course[]>(() => {
    const raw = loadStorage<Course[]>(STORAGE_KEYS.COURSES, ALL_COURSES);
    return mergeCoursesWithStored(raw);
  });
  const [topics] = useState<Topic[]>(OFFICIAL_TOPICS);
  const [materials, setMaterialsState] = useState<Material[]>(() => {
    const raw = loadStorage<Material[]>(STORAGE_KEYS.MATERIALS, OFFICIAL_MATERIALS);
    return mergeMaterialsWithStored(raw);
  });
  const [flashcardDecks, setFlashcardsState] = useState<FlashcardDeck[]>(() => {
    const raw = loadStorage(STORAGE_KEYS.FLASHCARDS, INITIAL_FLASHCARDS);
    if (!Array.isArray(raw)) return INITIAL_FLASHCARDS;
    return raw.map((d) => ({
      ...d,
      cards: Array.isArray(d.cards) ? d.cards : []
    }));
  });
  const [quizzes, setQuizzesState] = useState<Quiz[]>(() => loadStorage(STORAGE_KEYS.QUIZZES, INITIAL_QUIZZES));
  const [clinicalCases, setCasesState] = useState<ClinicalCase[]>(() => loadStorage(STORAGE_KEYS.CASES, INITIAL_CLINICAL_CASES));
  const [atlasStructures, setAtlasState] = useState<AtlasStructure[]>(() => loadStorage(STORAGE_KEYS.ATLAS, INITIAL_ATLAS_STRUCTURES));
  const [notifications, setNotificationsState] = useState<NotificationItem[]>(() => loadStorage(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS));
  const [ppdhRecords, setPpdhState] = useState<PPDHRecord[]>(() => loadStorage(STORAGE_KEYS.PPDH, INITIAL_PPDH_RECORDS));
  const [studySessions, setSessionsState] = useState<StudySessionLog[]>(() => loadStorage(STORAGE_KEYS.SESSIONS, INITIAL_STUDY_SESSIONS));
  const [schedule, setScheduleState] = useState<ScheduleItem[]>(() => loadStorage(STORAGE_KEYS.SCHEDULE, INITIAL_SCHEDULE));
  const [achievements, setAchievementsState] = useState<Achievement[]>(() => loadStorage(STORAGE_KEYS.ACHIEVEMENTS, INITIAL_ACHIEVEMENTS));

  // Toast
  const [toast, setToast] = useState<ToastState | null>(null);
  const showToast = (message: string, type: ToastState['type'] = 'success') => {
    const id = Date.now().toString();
    setToast({ id, message, type });
    setTimeout(() => {
      setToast((curr) => (curr?.id === id ? null : curr));
    }, 3800);
  };

  // Sync to localStorage
  useEffect(() => saveStorage(STORAGE_KEYS.USER, user), [user]);
  useEffect(() => saveStorage(STORAGE_KEYS.SETTINGS, settings), [settings]);
  useEffect(() => saveStorage(STORAGE_KEYS.COURSES, courses), [courses]);
  useEffect(() => saveStorage(STORAGE_KEYS.MATERIALS, materials), [materials]);
  useEffect(() => saveStorage(STORAGE_KEYS.FLASHCARDS, flashcardDecks), [flashcardDecks]);
  useEffect(() => saveStorage(STORAGE_KEYS.QUIZZES, quizzes), [quizzes]);
  useEffect(() => saveStorage(STORAGE_KEYS.CASES, clinicalCases), [clinicalCases]);
  useEffect(() => saveStorage(STORAGE_KEYS.ATLAS, atlasStructures), [atlasStructures]);
  useEffect(() => saveStorage(STORAGE_KEYS.NOTIFICATIONS, notifications), [notifications]);
  useEffect(() => saveStorage(STORAGE_KEYS.PPDH, ppdhRecords), [ppdhRecords]);
  useEffect(() => saveStorage(STORAGE_KEYS.SESSIONS, studySessions), [studySessions]);
  useEffect(() => saveStorage(STORAGE_KEYS.SCHEDULE, schedule), [schedule]);
  useEffect(() => saveStorage(STORAGE_KEYS.ACHIEVEMENTS, achievements), [achievements]);

  // Handle Dark mode theme effect
  useEffect(() => {
    if (settings.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (settings.theme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [settings.theme]);

  // Actions
  const updateUser = (updates: Partial<UserProfile>) => {
    setUserState((prev) => ({ ...prev, ...updates }));
    showToast('Profil berhasil diperbarui');
  };

  const updateSettings = (updates: Partial<AppSettings>) => {
    setSettingsState((prev) => ({ ...prev, ...updates }));
    showToast('Pengaturan disimpan');
  };

  const logStudySession = (
    type: StudySessionLog['type'],
    title: string,
    details: string,
    durationMinutes: number
  ) => {
    const newSession: StudySessionLog = {
      id: `sess-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      type,
      title,
      details,
      durationMinutes,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setSessionsState((prev) => [newSession, ...prev]);
  };

  const addMaterial = (newMat: Omit<Material, 'id' | 'updatedAt'>): string => {
    const id = `mat-user-${Date.now()}`;
    const material: Material = {
      ...newMat,
      id,
      updatedAt: new Date().toISOString().split('T')[0],
      source: newMat.source || 'Personal',
      sourceType: newMat.sourceType || 'Personal Notes',
      contentCategory: newMat.contentCategory || 'userContent',
      verified: newMat.verified ?? false,
      status: newMat.status || 'published',
      progressPercent: newMat.progressPercent ?? 0,
      isCompleted: newMat.isCompleted ?? false,
      isSaved: newMat.isSaved ?? false,
      readTimeMinutes: newMat.readTimeMinutes || 10,
      readingTimeMinutes: newMat.readingTimeMinutes || newMat.readTimeMinutes || 10,
      tags: Array.isArray(newMat.tags) ? newMat.tags : ['Personal Note'],
      sections:
        newMat.sections && newMat.sections.length > 0
          ? newMat.sections
          : [
              {
                id: `sec-${id}-1`,
                title: 'Konten Materi',
                content: 'Konten materi belum diisi.',
                readingTimeMinutes: 5,
                keyPoints: []
              }
            ]
    };
    setMaterialsState((prev) => [material, ...prev]);
    showToast(`Materi "${material.title}" berhasil ditambahkan!`, 'success');
    logStudySession('material', `Menambah Materi: ${material.title}`, 'Catatan materi pribadi ditambahkan', 10);
    return id;
  };

  const updateMaterial = (updatedMat: Material) => {
    setMaterialsState((prev) =>
      prev.map((m) => (m.id === updatedMat.id ? { ...updatedMat, updatedAt: new Date().toISOString().split('T')[0] } : m))
    );
    showToast('Materi berhasil diperbarui', 'success');
  };

  const deleteMaterial = (materialId: string) => {
    setMaterialsState((prev) => prev.filter((m) => m.id !== materialId));
    showToast('Materi telah dihapus', 'info');
  };

  const importMaterialFromUrl = (importData: {
    url: string;
    title: string;
    description: string;
    courseId: string;
    topicId: string;
    semesterId: string;
    type: MaterialType;
    content?: string;
    keyPoints?: string[];
  }): string => {
    const id = `mat-import-${Date.now()}`;
    let hostname = 'Web Resource';
    try {
      const parsed = new URL(importData.url.startsWith('http') ? importData.url : `https://${importData.url}`);
      hostname = parsed.hostname;
    } catch {
      hostname = 'Web Resource';
    }

    const isUgm = hostname.includes('ugm.ac.id');

    const material: Material = {
      id,
      title: importData.title,
      description: importData.description,
      type: importData.type,
      courseId: importData.courseId,
      topicId: importData.topicId,
      semesterId: importData.semesterId,
      readTimeMinutes: 10,
      readingTimeMinutes: 10,
      isSaved: true,
      isCompleted: false,
      progressPercent: 0,
      tags: ['Imported', isUgm ? 'FKH UGM' : 'External Web', importData.type],
      updatedAt: new Date().toISOString().split('T')[0],
      source: isUgm ? 'FKH UGM' : hostname,
      sourceUrl: importData.url,
      sourceType: isUgm ? 'Official Academic Source' : 'Web Reference',
      sourceDate: new Date().getFullYear().toString(),
      retrievedAt: new Date().toISOString().split('T')[0],
      verified: isUgm,
      contentCategory: isUgm ? 'officialContent' : 'userContent',
      status: 'published',
      sections: [
        {
          id: `sec-${id}-1`,
          title: `Ringkasan Rujukan (${hostname})`,
          readingTimeMinutes: 6,
          keyPoints: importData.keyPoints || [
            `Tautan Rujukan: ${importData.url}`,
            `Status Verifikasi: ${isUgm ? 'Terverifikasi FKH UGM' : 'Sumber Eksternal / Referensi Pengguna'}`
          ],
          content:
            importData.content ||
            `Materi ini diimpor dari URL: ${importData.url}.\n\nDeskripsi Rujukan: ${importData.description}\n\nSumber domain: ${hostname}.\nSilakan kunjungi URL asli untuk menelaah dokumen utuh atau perbarui catatan ini secara mandiri.`
        }
      ]
    };

    setMaterialsState((prev) => [material, ...prev]);
    showToast(`Berhasil mengimpor materi dari ${hostname}!`, 'success');
    logStudySession('material', `Impor URL: ${material.title}`, `Diimpor dari ${hostname}`, 5);
    return id;
  };

  const toggleSaveMaterial = (materialId: string) => {
    setMaterialsState((prev) =>
      prev.map((m) => {
        if (m.id === materialId) {
          const nextSaved = !m.isSaved;
          showToast(nextSaved ? 'Materi ditambahkan ke Tersimpan' : 'Materi dihapus dari Tersimpan', 'info');
          return { ...m, isSaved: nextSaved };
        }
        return m;
      })
    );
  };

  const updateMaterialProgress = (materialId: string, progress: number, isCompleted?: boolean) => {
    setMaterialsState((prev) =>
      prev.map((m) => {
        if (m.id === materialId) {
          const completed = isCompleted !== undefined ? isCompleted : progress >= 100;
          return {
            ...m,
            progressPercent: progress,
            isCompleted: completed,
            updatedAt: new Date().toISOString().split('T')[0]
          };
        }
        return m;
      })
    );

    // Also update Course progress dynamically
    const targetMat = materials.find((m) => m.id === materialId);
    if (targetMat) {
      setTimeout(() => {
        setCoursesState((prevCourses) =>
          prevCourses.map((c) => {
            if (c.id === targetMat.courseId) {
              const allCourseMats = materials.filter((m) => m.courseId === c.id);
              const totalProgress = allCourseMats.reduce(
                (sum, m) => sum + (m.id === materialId ? progress : m.progressPercent),
                0
              );
              const avg = Math.round(totalProgress / Math.max(1, allCourseMats.length));
              return { ...c, progress: Math.min(100, avg) };
            }
            return c;
          })
        );
      }, 50);
    }
  };

  const updateMaterialNotes = (materialId: string, notes: string) => {
    setMaterialsState((prev) =>
      prev.map((m) => (m.id === materialId ? { ...m, notes } : m))
    );
    showToast('Catatan materi tersimpan');
  };

  const toggleMaterialBookmark = (materialId: string, sectionId: string) => {
    setMaterialsState((prev) =>
      prev.map((m) => {
        if (m.id === materialId) {
          const bookmarks = m.bookmarks || [];
          const exists = bookmarks.includes(sectionId);
          const nextBookmarks = exists
            ? bookmarks.filter((id) => id !== sectionId)
            : [...bookmarks, sectionId];
          showToast(exists ? 'Penanda bagian dilepas' : 'Bagian telah ditandai', 'info');
          return { ...m, bookmarks: nextBookmarks };
        }
        return m;
      })
    );
  };

  const createDeck = (newDeckData: Omit<FlashcardDeck, 'id' | 'cardsCount' | 'masteredCount' | 'createdAt'>) => {
    const id = `deck-${Date.now()}`;
    const newDeck: FlashcardDeck = {
      ...newDeckData,
      id,
      cardsCount: newDeckData.cards.length,
      masteredCount: newDeckData.cards.filter((c) => c.difficulty === 'easy' || c.masteryLevel >= 80).length,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setFlashcardsState((prev) => [newDeck, ...prev]);
    showToast(`Deck "${newDeck.title}" berhasil dibuat!`);
    logStudySession('flashcard', `Membuat Deck: ${newDeck.title}`, `${newDeck.cards.length} kartu baru dibuat`, 10);
    return id;
  };

  const updateDeck = (updatedDeck: FlashcardDeck) => {
    setFlashcardsState((prev) =>
      prev.map((d) => (d.id === updatedDeck.id ? updatedDeck : d))
    );
    showToast('Deck berhasil diperbarui');
  };

  const deleteDeck = (deckId: string) => {
    setFlashcardsState((prev) => prev.filter((d) => d.id !== deckId));
    showToast('Deck telah dihapus', 'info');
  };

  const toggleSaveDeck = (deckId: string) => {
    setFlashcardsState((prev) =>
      prev.map((d) => (d.id === deckId ? { ...d, isSaved: !d.isSaved } : d))
    );
  };

  const updateCardDifficulty = (deckId: string, cardId: string, difficulty: CardDifficulty) => {
    setFlashcardsState((prevDecks) =>
      prevDecks.map((deck) => {
        if (deck.id !== deckId) return deck;
        const updatedCards = deck.cards.map((c) => {
          if (c.id !== cardId) return c;
          let masteryLevel = c.masteryLevel;
          if (difficulty === 'easy') masteryLevel = Math.min(100, masteryLevel + 30);
          else if (difficulty === 'good') masteryLevel = Math.min(100, masteryLevel + 15);
          else if (difficulty === 'hard') masteryLevel = Math.max(0, masteryLevel - 10);
          else if (difficulty === 'again') masteryLevel = Math.max(0, masteryLevel - 25);

          return {
            ...c,
            difficulty,
            masteryLevel,
            lastReviewed: new Date().toISOString().split('T')[0]
          };
        });

        const masteredCount = updatedCards.filter((c) => c.masteryLevel >= 80).length;
        return {
          ...deck,
          cards: updatedCards,
          masteredCount
        };
      })
    );
  };

  const recordQuizAttempt = (attempt: QuizAttempt) => {
    setQuizzesState((prev) =>
      prev.map((q) => {
        if (q.id === attempt.quizId) {
          const currentBest = q.bestScore ?? 0;
          const bestScore = Math.max(currentBest, attempt.score);
          return {
            ...q,
            attemptsCount: q.attemptsCount + 1,
            bestScore,
            lastAttempt: attempt
          };
        }
        return q;
      })
    );

    const targetQuiz = quizzes.find((q) => q.id === attempt.quizId);
    logStudySession(
      'quiz',
      `Menyelesaikan ${targetQuiz?.title || 'Kuis'}`,
      `Skor: ${attempt.score} (${attempt.correctAnswers}/${attempt.totalQuestions} Benar)`,
      Math.round(attempt.timeSpentSeconds / 60) || 1
    );

    showToast(`Kuis selesai! Skor kamu: ${attempt.score}%`);
  };

  const submitCaseDiagnosis = (caseId: string, selectedOptionIndex: number): boolean => {
    let isCorrect = false;
    setCasesState((prev) =>
      prev.map((c) => {
        if (c.id === caseId) {
          isCorrect = selectedOptionIndex === c.correctOptionIndex;
          return {
            ...c,
            status: 'completed',
            userSelectedOption: selectedOptionIndex,
            completedAt: new Date().toISOString().split('T')[0]
          };
        }
        return c;
      })
    );

    const targetCase = clinicalCases.find((c) => c.id === caseId);
    logStudySession(
      'case',
      `Menyelesaikan Kasus: ${targetCase?.title || 'Kasus Klinis'}`,
      isCorrect ? 'Diagnosa & terapi tepat' : 'Memerlukan evaluasi ulang',
      15
    );

    showToast(isCorrect ? 'Diagnosa Anda Tepat! Selesai dipelajari.' : 'Diagnosa telah direview.', isCorrect ? 'success' : 'info');
    return isCorrect;
  };

  const toggleFavoriteAtlas = (id: string) => {
    setAtlasState((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          const next = !s.isFavorite;
          showToast(next ? 'Disimpan ke Struktur Favorit' : 'Dihapus dari Favorit', 'info');
          return { ...s, isFavorite: next };
        }
        return s;
      })
    );
  };

  const markNotificationAsRead = (id: string) => {
    setNotificationsState((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotificationsState((prev) => prev.map((n) => ({ ...n, isRead: true })));
    showToast('Semua notifikasi ditandai telah dibaca');
  };

  const addPPDHRecord = (rec: Omit<PPDHRecord, 'id'>) => {
    const newRecord: PPDHRecord = {
      ...rec,
      id: `ppdh-${Date.now()}`
    };
    setPpdhState((prev) => [newRecord, ...prev]);
    showToast(`Rekam medis "${newRecord.title}" tersimpan!`);
    logStudySession('case', `PPDH Log: ${newRecord.title}`, `${newRecord.rotation} - ${newRecord.species}`, 20);
  };

  const updatePPDHRecord = (rec: PPDHRecord) => {
    setPpdhState((prev) => prev.map((r) => (r.id === rec.id ? rec : r)));
    showToast('Catatan rekam medis klinis diperbarui');
  };

  const deletePPDHRecord = (id: string) => {
    setPpdhState((prev) => prev.filter((r) => r.id !== id));
    showToast('Catatan klinis berhasil dihapus', 'info');
  };

  const addScheduleItem = (newItem: Omit<ScheduleItem, 'id' | 'createdAt'>): string => {
    const id = `sched-${Date.now()}`;
    const item: ScheduleItem = {
      ...newItem,
      id,
      status: newItem.status || 'Upcoming',
      isCompleted: newItem.isCompleted ?? false,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setScheduleState((prev) => [item, ...prev]);
    showToast(`Jadwal "${item.title}" ditambahkan`, 'success');
    return id;
  };

  const updateScheduleItem = (updated: ScheduleItem) => {
    setScheduleState((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
    showToast('Jadwal berhasil diperbarui', 'success');
  };

  const deleteScheduleItem = (id: string) => {
    setScheduleState((prev) => prev.filter((item) => item.id !== id));
    showToast('Jadwal dihapus', 'info');
  };

  const toggleCompleteScheduleItem = (id: string) => {
    setScheduleState((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const isComp = item.status === 'Completed' || Boolean(item.isCompleted);
          const nextStatus = isComp ? 'Upcoming' : 'Completed';
          showToast(isComp ? 'Jadwal ditandai belum selesai' : 'Jadwal selesai! 🎉', 'success');
          return {
            ...item,
            status: nextStatus,
            isCompleted: !isComp,
            completedAt: isComp ? undefined : new Date().toISOString()
          };
        }
        return item;
      })
    );
  };

  const resetProgress = () => {
    // 1. Reset official course progress to 0%
    setCoursesState(ALL_COURSES.map((c) => ({ ...c, progress: 0 })));

    // 2. Reset materials completion and progressPercent to 0, retaining user notes/bookmarks/highlights
    setMaterialsState((prev) =>
      prev.map((m) => ({
        ...m,
        isCompleted: false,
        progressPercent: 0
      }))
    );

    // 3. Reset flashcard decks mastery
    setFlashcardsState(INITIAL_FLASHCARDS);

    // 4. Reset quiz attempts and scores
    setQuizzesState(INITIAL_QUIZZES);

    // 5. Reset clinical cases status to not-started
    setCasesState(INITIAL_CLINICAL_CASES);

    // 6. Reset study sessions logs to empty
    setSessionsState([]);

    // 7. Reset achievements to 0
    setAchievementsState(INITIAL_ACHIEVEMENTS);

    // 8. Reset user streak and total study minutes to 0 (preserving personal profile, bio, semester, etc.)
    setUserState((prev) => ({
      ...prev,
      studyStreakDays: 0,
      totalStudyMinutes: 0
    }));

    // 9. Reset PPDH logbook records
    setPpdhState([]);

    // Persist immediately to localStorage
    saveStorage(STORAGE_KEYS.COURSES, ALL_COURSES.map((c) => ({ ...c, progress: 0 })));
    saveStorage(STORAGE_KEYS.FLASHCARDS, INITIAL_FLASHCARDS);
    saveStorage(STORAGE_KEYS.QUIZZES, INITIAL_QUIZZES);
    saveStorage(STORAGE_KEYS.CASES, INITIAL_CLINICAL_CASES);
    saveStorage(STORAGE_KEYS.SESSIONS, []);
    saveStorage(STORAGE_KEYS.ACHIEVEMENTS, INITIAL_ACHIEVEMENTS);
    saveStorage(STORAGE_KEYS.PPDH, []);

    showToast('Semua statistik dan progres belajar berhasil di-reset ke 0%', 'success');
  };

  const clearAllData = () => {
    localStorage.clear();
    setUserState(INITIAL_USER);
    setSettingsState(INITIAL_SETTINGS);
    setCoursesState(ALL_COURSES);
    setMaterialsState(OFFICIAL_MATERIALS);
    setFlashcardsState(INITIAL_FLASHCARDS);
    setQuizzesState(INITIAL_QUIZZES);
    setCasesState(INITIAL_CLINICAL_CASES);
    setAtlasState(INITIAL_ATLAS_STRUCTURES);
    setNotificationsState(INITIAL_NOTIFICATIONS);
    setPpdhState(INITIAL_PPDH_RECORDS);
    setSessionsState(INITIAL_STUDY_SESSIONS);
    setScheduleState(INITIAL_SCHEDULE);
    setAchievementsState(INITIAL_ACHIEVEMENTS);
    showToast('Semua data lokal telah dibersihkan', 'warning');
  };

  const exportDataJson = () => {
    const exportData = {
      user,
      settings,
      courses,
      materials,
      flashcardDecks,
      quizzes,
      clinicalCases,
      atlasStructures,
      notifications,
      ppdhRecords,
      studySessions,
      exportedAt: new Date().toISOString()
    };
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `VETORA_Veterinary_Backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Data berhasil diekspor ke format JSON!');
  };

  // Calculated Real-Time Statistics
  const stats = useMemo(() => {
    const safeMaterials = Array.isArray(materials) ? materials.filter((m): m is Material => Boolean(m && typeof m === 'object')) : [];
    const totalMaterials = safeMaterials.length;
    const materialsCompleted = safeMaterials.filter((m) => Boolean(m.isCompleted)).length;

    const safeQuizzes = Array.isArray(quizzes) ? quizzes.filter((q): q is Quiz => Boolean(q && typeof q === 'object')) : [];
    const totalQuizzes = safeQuizzes.length;
    const completedQuizList = safeQuizzes.filter((q) => (q.attemptsCount || 0) > 0);
    const quizzesCompleted = completedQuizList.length;
    const avgQuizAccuracy = completedQuizList.length > 0
      ? Math.round(
          completedQuizList.reduce((sum, q) => sum + (q.bestScore || 0), 0) / completedQuizList.length
        )
      : 0;

    let totalCards = 0;
    let masteredCards = 0;
    const safeDecks = Array.isArray(flashcardDecks) ? flashcardDecks.filter(Boolean) : [];
    safeDecks.forEach((d) => {
      const cards = Array.isArray(d.cards) ? d.cards.filter(Boolean) : [];
      totalCards += cards.length;
      masteredCards += cards.filter((c) => (c.masteryLevel || 0) >= 80 || c.difficulty === 'easy').length;
    });

    const safeCases = Array.isArray(clinicalCases) ? clinicalCases.filter(Boolean) : [];
    const totalCases = safeCases.length;
    const casesCompleted = safeCases.filter((c) => c.status === 'completed').length;

    const safeSessions = Array.isArray(studySessions) ? studySessions.filter(Boolean) : [];
    const totalStudyHours = Math.round(
      safeSessions.reduce((sum, s) => sum + (s.durationMinutes || 0), 0) / 60
    );

    return {
      materialsCompleted,
      totalMaterials,
      quizzesCompleted,
      totalQuizzes,
      avgQuizAccuracy,
      flashcardsMastered: masteredCards,
      totalFlashcards: totalCards,
      casesCompleted,
      totalCases,
      studyStreak: user?.studyStreakDays || 0,
      totalStudyHours
    };
  }, [materials, quizzes, flashcardDecks, clinicalCases, user?.studyStreakDays, studySessions]);

  // Overall progress percentage
  const overallProgress = useMemo(() => {
    const matWeight = stats.totalMaterials > 0 ? (stats.materialsCompleted / stats.totalMaterials) * 35 : 0;
    const quizWeight = stats.totalQuizzes > 0 ? (stats.quizzesCompleted / stats.totalQuizzes) * 25 : 0;
    const flashWeight = stats.totalFlashcards > 0 ? (stats.flashcardsMastered / stats.totalFlashcards) * 20 : 0;
    const caseWeight = stats.totalCases > 0 ? (stats.casesCompleted / stats.totalCases) * 20 : 0;
    return Math.min(100, Math.round(matWeight + quizWeight + flashWeight + caseWeight));
  }, [stats]);

  // Real-time Rule-Based Recommendations
  const recommendations = useMemo<Recommendation[]>(() => {
    const list: Recommendation[] = [];

    // 1. Check for in-progress materials
    const safeMaterials = Array.isArray(materials) ? materials.filter((m): m is Material => Boolean(m && typeof m === 'object')) : [];
    const unfinishedMat = safeMaterials.find((m) => (m.progressPercent || 0) > 0 && !m.isCompleted);
    if (unfinishedMat) {
      list.push({
        id: 'rec-mat',
        title: 'Lanjutkan Membaca',
        description: `Kamu telah membaca ${unfinishedMat.progressPercent}% dari "${unfinishedMat.title}". Selesaikan sekarang!`,
        actionText: 'Lanjutkan',
        link: `/materials/${unfinishedMat.id}/read`,
        badge: 'Materi'
      });
    }

    // 2. Check for difficult flashcards
    const safeDecks = Array.isArray(flashcardDecks) ? flashcardDecks.filter(Boolean) : [];
    const difficultDeck = safeDecks.find((d) =>
      Array.isArray(d.cards) && d.cards.some((c) => Boolean(c && (c.difficulty === 'again' || c.difficulty === 'hard')))
    );
    if (difficultDeck) {
      list.push({
        id: 'rec-deck',
        title: 'Review Kartu Sulit',
        description: `Terdapat kartu bertanda sulit di deck "${difficultDeck.title}". Ulangi untuk mengunci daya ingat.`,
        actionText: 'Buka Deck',
        link: `/flashcards/${difficultDeck.id}/study`,
        badge: 'Flashcard'
      });
    }

    // 3. Check for unfinished quiz or unattempted quiz
    const unattemptedQuiz = quizzes.find((q) => q.attemptsCount === 0);
    if (unattemptedQuiz) {
      list.push({
        id: 'rec-quiz',
        title: 'Uji Pemahaman Baru',
        description: `Kuis "${unattemptedQuiz.title}" belum pernah dicoba. Coba uji penalaran klinismu!`,
        actionText: 'Mulai Kuis',
        link: `/quiz/${unattemptedQuiz.id}/start`,
        badge: 'Kuis'
      });
    }

    // 4. Clinical Case recommended
    const unstartedCase = clinicalCases.find((c) => c.status !== 'completed');
    if (unstartedCase) {
      list.push({
        id: 'rec-case',
        title: 'Selesaikan Kasus Pasien',
        description: `Kasus "${unstartedCase.title}" sedang menunggu analisa diferensial diagnosa Anda.`,
        actionText: 'Periksa Kasus',
        link: `/cases/${unstartedCase.id}`,
        badge: 'Kasus'
      });
    }

    return list;
  }, [materials, flashcardDecks, quizzes, clinicalCases]);

  return (
    <AppContext.Provider
      value={{
        currentRoute,
        navigate,
        goBack,
        user,
        updateUser,
        userProfile: user,
        updateUserProfile: updateUser,
        settings,
        updateSettings,
        curriculumMeta: OFFICIAL_CURRICULUM_META,
        officialSources: OFFICIAL_SOURCES,
        semesters,
        courses,
        topics,
        materials,
        addMaterial,
        updateMaterial,
        deleteMaterial,
        importMaterialFromUrl,
        flashcardDecks,
        quizzes,
        clinicalCases,
        atlasStructures,
        notifications,
        ppdhRecords,
        studySessions,
        schedule,
        achievements,
        addScheduleItem,
        updateScheduleItem,
        deleteScheduleItem,
        toggleCompleteScheduleItem,
        toggleSaveMaterial,
        updateMaterialProgress,
        updateMaterialNotes,
        toggleMaterialBookmark,
        createDeck,
        updateDeck,
        deleteDeck,
        toggleSaveDeck,
        updateCardDifficulty,
        recordQuizAttempt,
        submitCaseDiagnosis,
        toggleFavoriteAtlas,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        addPPDHRecord,
        updatePPDHRecord,
        deletePPDHRecord,
        logStudySession,
        resetProgress,
        clearAllData,
        resetAllData: clearAllData,
        exportDataJson,
        toast,
        showToast,
        overallProgress,
        stats,
        recommendations
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
