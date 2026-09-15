import {
  Semester,
  Course,
  Topic,
  Material,
  FlashcardDeck,
  Quiz,
  ClinicalCase,
  AtlasStructure,
  UserProfile,
  AppSettings,
  NotificationItem,
  PPDHRecord,
  StudySessionLog,
  ScheduleItem,
  Achievement
} from '../types';

// Image assets from curated veterinary plates
export const ASSETS = {
  catHero: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0FQMSZgSR5T7bK5PWeNf8yxTae1QL1CfljMhQeI1PjDkFdmETTX8-sYSYERS02JK8Hyj-i0_09hkYt6PQWwlYHNkY-KZLCU0HqmT0STE70Prx_WNaTUv8qHKDBM3lCpWVU7WuiL6P-kmVjOwSagnzAs0tAJoJqC0oxohOQes4DWF8MyeHQmiP80kc7N7L9NRKGseYt6sROIvnvY4uDObp8PSPpDSCSXpNTgq_pgvdyQExfzaIWiJ6pw',
  heartDiagram: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMLCDcdG-gSWaU8ZRUHQZ7L7W5bj5H1y1mtBOGw0_DHbhAR6YOAOqAFg3S0CkYWRzlmIFEjJEnr5pudLMKGE2wjtMLMI7KLaRhGxvyHfes-6_yX-_dqDREwkpVFXK5EhRPGJdACFS5lTIKKpYCwvrP1zGHfT6pVyobGeAawiz1cln4gEYF-XOE31a7qPZPCNr4rA-l-iQGvYbt5IiIwXGUPRHKrZHG-2Ps-FIktlHqvNj_7OJrL2WBog',
  heartExterior: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwOCjEbR1bxyHbpPzb0N4oUWZP7Z6itNdKWGi2pQ06Seodz3eNstZS2p3dCqilcHifzWQfcQevS36iwwe9-QVdu7Pz7N-cA9t3D3t2_1TnzGwKODP_2lqZqsXVvWUOfqPwKO-KhKL7lX1ciI-5Bj4I3gcf5bVNZSzm9R3zvBDw_V2EpbRa_Zl6qGRrVDu0rh8PB26trKPxikeQ_QMY8U09Kz871lLZ2jDliNKO_dvZEOSbuewmkSChYQ',
  crossSection: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCXog30N4PV2selm3IUgiXKIFC790pEhpsZtnCIl0IwWp7ge0LVuZ4qcI485L_bqZW5_y206Qu_uiErjsxy8GS4LaLeQbnTu7_xEtHd4IiYuHAGulUMNKrN2z7JjEbj1bfy94hYEPH4aElwCW3X4jrJ5_RmJs73sdLsTxPe7PEhkAnzW_do2IC2-oCKnsKnqzg1Y_qZebIlllzYUJ9TmdZ5G64BckYIWMsXVLVnZA_3p7nLRqUMfalbxQ',
  bloodVessels: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZuq9qnVoCQSR-BWAe0BBq4AIr8yHneyuQMyLpoI7zpGzdT0MWPnNnikRGqrsmBwxNO7eD68A38WvzZCG09K2Jg_57SO5pSlacCATwINMKmEDpMtYmcq0N14wOoN0jHdYRittXiLZ5G1nNyWNiUysSbRGY3jgMCvmJgLNw2jg5rOfe6TOGln2FrAWLrufBnbm_hLITjj3yFZFGm5jLaKokhHD_iNU4OQXcPihy4z-xeNO1YR_IYXgHng',
  iconAnatomy: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDqXavGhhy3oZLlMTRQgjuX2b4GUUpPT4LGaNyasvHGnN37Fpp9ElELQZ-lAEefM6EY5FnEJ9uCgp-zrCrLA7PwUi_8waEJzz1-K6OxsRFT7CgBi5-04CfQaKY46N4rcX17lLdxz7HN8XxB8dozC0sdfkcWDEsWdJzYKDPApapTS-1MF7n0c4DfaxMkHaGBb7QYluZiRZ9wOiBA8Wq39d0NssUP_f_cs9l7J48eGA18uH5ThkNeEz0O7w',
  iconMicrobiology: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDwAnuqYS-CHbeasYPX9-QfUK9EZxOMQf_mjOEJW-FngeEu5yMZUIfib6meqsJ9R1rrFKKCz136HAuQhEbJji_R4oODVuoI6w6zmGq0eul7tDBmAxeQTeoVaK85kbDBi5e9Kn6siKAT5wF9SGR8qlz6GFofIoDhabssLwiKeH02eHJGAhTDhPSUYLHVvVZOINrXPrIyCRrci7x1n8t7kkxWEUzzeq1KMsZ3jmjPs33RL7qce7Q59-0mMA',
  iconHistology: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAe8udQeXwxE-C4-k6Q-c7WgBcd9r2uAMKVE0q00UmSGIAr55CtM0T8nH_kTnEIwX_IKfu4H9uot0wrUJgms_xBovsX9PV1JKpTwwUzeTeRunsr2d9uy4ZlGNSRJ5RKKgYgd19qMVgluWx6g9oPRVtlIxa3C125idW2lQz_W8VIS3XZFKD-FjyahwiTXJHoQMB3XqlXhKVXDslB5lbyudhr4f_43AlbhUJqmpJy3twV3cHWKA6Nx_Uqzw',
  iconPharmacology: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCEMwEXOrdsf_F3hObwNDmAccyxJmZvwup0tEQvtfp1bPqVAXMlFXjdxZe8-cCwNR-5BPNmm4aiepJ6s9PYxqCqdXVssZ3UvMdxcs6YnSK6X9xxXkDTm3XqMTQun0sPiC4Q1PsbkrcBvqXzY2GE0l2pQRZbS46xzl0R6I0mHy_YIunLM3GkXQ6ofzrs_p_PoTmh27aD8uEanFWJJaeYBlfI7PEVQMC23eCgguzuGmPYZAPskRfelslJRA',
  iconPathology: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBroVKeEHeI0Km9mJsl0rNqT_3B_6ZOtaSJzVVCFQwgJ1DikERHO--E3tPWSRgg1LopT1V5NOCoProvO_-IOJKk9jyaD669VSaSalewgRC2utv9ZXpZ_Eko3EBBaBlorFGR1RuS5ssOj5Diw-ngPLMJY8FsCyTJrzmTF0eP5aq_gQpMzr-Ok0-TwVWglGMnEstaNVbM59BHhN-UWR2tzsx8R_Ay8RQmU-gLI6-kzQKq7Ea-4fL-KYK7ew',
  iconClinPath: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0cQVqVaLUxM1ucEUOMG55JWwLsTxXnFqPtDlvg0kq3slZvrLI5bBeTyWelQtXyST79Ke8HBfx4PFd_Xq9j9-3U9SZCSAp-P8zk9JingloMMEwOAv6bp-kmeClsu119Q2rYUqGCB9SdsAZxiWMsqny8n-P8GIhcB6FaLvEEThEdeToc71wBG2iL_723FSDhDwfSXepUCGTQZa0kCve1RNvrTtVcnz7l_pMwhjOEKoPZB4pQcLvFkNHhA',
  iconInternalMed: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDsIrrRZPzQFG6m9fGx82Zv7KUtM7x2TpsxeUtDpwCxiRpxKAqhKZ6hlRh7xTo7QSLvKsxsjM89eKbr33FlhSlTC5BzBPJrfM39K5AVosJJxaqTF41D9ERx51IwmDNZZALfPQRFn7G6M7PfGmweqtiBx28maxslKHQek_A9GrWPSocvgD3IjTie-gXRhlNT0FQnUEP4mpNdEq6CoKvKZ6N4x0AC5uxVgGfdX08zNlR2Li2pQlAsRcLehA',
  iconKesmavet: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxUyDWkEfSc5QYvCk6LdhYYgcJTSY8iUKRqFtfEd2FwUoRwDm2fFwc5Kdl-PL85jxIEhNH1sQNG7PrvU8U8LiJ1lw3EN4AX9nEaeISvWmfDcDHC7rXE-PJm6gz9JOtlkwP02sssLur571leQP9lLvtYL1zFG6SISr7-GRjyF0m95zutKNjYLHh34EuGbVihXKfsaDxucEMfQs0i64WMHTdIPszy0vUbKLFk34W8VrSrc2MbgOASGtclw',
  atlasLithograph: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCUxbXer1BqlemkF-QUU3cTqQ4oIpT_ARIxqN79kGlFAsCboK8BVWcn5XuzjqUFrrZXoBoAkpsWWyypf5LmZJH7tOX7FXOiYPXcOyWer4Ltwb9ypBqmts0tI7f5HHTVzVsCg3A70vuZ5-ocOid6wKo5M82vggRKBDI0ibVKDaBDWiZxWz3FIlQn2vMKvLuiRXpB7QL_jM8svS9OHinOXmZEnGaOxh2LkGP_AK8cxsUZQo5jC2c607KA5A',
  avatar: 'https://lh3.googleusercontent.com/aida/AEtjO1XkOqKp5BxzefVFcguh_3A4tfSKe8txdQqBqukCVXoLWgxod2PRtt8WVwfWQlTkqWdOLAz3zrDx2iSZSxOixTOkd3PdaRRy-TSjjoaQ90Fxl9egIyOhwLn7P7__KxcS5gM9b-t679aK1eOlbTKUR6qMy2DhdBf-InIwqHtkz_UtgXsWZMlVYRIfyZxoZG1JewyQIucWCirdI-dpYOLmg2Ii2Yw-nm-a5ZtD3JTTT3Rj7Gb8W9UTydtrIV9dc8L_Yt8Tjw711b9R8A',
};

export const INITIAL_USER: UserProfile = {
  name: 'Bulan',
  fullName: 'Lovelita Najwa Bulan Dayanara',
  nickname: 'Bulan',
  email: 'bulan.vet@mail.ugm.ac.id',
  institution: 'Universitas Gadjah Mada',
  faculty: 'Fakultas Kedokteran Hewan (FKH UGM)',
  studyProgram: 'Kedokteran Hewan (S.KH)',
  studentId: '23/514982/KH/11024',
  currentSemester: 3,
  semesterLabel: 'Semester 3 (Sedang Berjalan)',
  avatarUrl: ASSETS.avatar,
  bio: 'Mahasiswi Kedokteran Hewan FKH UGM. Minat mendalam pada feline internal medicine, bedah hewan kecil, dan patologi komparatif.',
  dailyGoalMinutes: 45,
  studyStreakDays: 0,
  totalStudyMinutes: 0,
  preferredStudyGoal: 'Klinisi Hewan Kecil & Feline Medicine'
};

export const INITIAL_SETTINGS: AppSettings = {
  theme: 'light',
  dailyStudyGoalMinutes: 45,
  defaultQuizDifficulty: 'Intermediate',
  flashcardPreference: 'spaced',
  studyReminders: true,
  quizReminders: true,
  flashcardReminders: true
};

export const INITIAL_SEMESTERS: Semester[] = [
  {
    id: 'sem-1',
    number: 1,
    title: 'Semester 1',
    academicYear: 'Tingkat Sarjana (Gasal)',
    description: 'Fondasi Biologi Veteriner, Kimia Hayati, Embriologi, dan Pengantar Profesi Kedokteran Hewan.',
    totalCourses: 6,
    completedCourses: 0,
    progress: 0
  },
  {
    id: 'sem-2',
    number: 2,
    title: 'Semester 2',
    academicYear: 'Tingkat Sarjana (Genap)',
    description: 'Anatomi Veteriner I (Osteologi & Miologi), Fisiologi Veteriner Dasar, dan Biokimia Veteriner.',
    totalCourses: 6,
    completedCourses: 0,
    progress: 0
  },
  {
    id: 'sem-3',
    number: 3,
    title: 'Semester 3',
    academicYear: 'Tingkat Sarjana (Gasal)',
    description: 'Anatomi Sistem Organ (Splanchnologia), Mikrobiologi, Histologi Organ, dan Farmakologi Dasar.',
    totalCourses: 8,
    completedCourses: 0,
    progress: 0
  },
  {
    id: 'sem-4',
    number: 4,
    title: 'Semester 4',
    academicYear: 'Tingkat Sarjana (Genap)',
    description: 'Parasitologi Veteriner, Imunologi, Fisiologi Lanjut, dan Patologi Umum.',
    totalCourses: 7,
    completedCourses: 0,
    progress: 0
  },
  {
    id: 'sem-5',
    number: 5,
    title: 'Semester 5',
    academicYear: 'Tingkat Sarjana (Gasal)',
    description: 'Diagnostik Fisik, Farmakoterapi Veteriner, Epidemiologi, dan Patologi Sistemik.',
    totalCourses: 7,
    completedCourses: 0,
    progress: 0
  },
  {
    id: 'sem-6',
    number: 6,
    title: 'Semester 6',
    academicYear: 'Tingkat Sarjana (Genap)',
    description: 'Bedah Umum Veteriner, Radiologi Veteriner, dan Ilmu Penyakit Hewan Besar.',
    totalCourses: 6,
    completedCourses: 0,
    progress: 0
  },
  {
    id: 'sem-7',
    number: 7,
    title: 'Semester 7',
    academicYear: 'Tingkat Sarjana (Gasal)',
    description: 'Ilmu Kebidanan & Reproduksi Hewan, Bedah Khusus, dan Toksikologi Veteriner.',
    totalCourses: 6,
    completedCourses: 0,
    progress: 0
  },
  {
    id: 'sem-8',
    number: 8,
    title: 'Semester 8',
    academicYear: 'Tingkat Sarjana (Genap)',
    description: 'Etika Kedokteran Hewan, Manajemen Rumah Sakit Hewan, Seminar Proposal, dan Skripsi Sarjana.',
    totalCourses: 4,
    completedCourses: 0,
    progress: 0
  },
  {
    id: 'sem-ppdh',
    number: 'ppdh',
    title: 'PPDH (Pendidikan Profesi Dokter Hewan)',
    academicYear: 'Klinik Rotasi',
    description: 'Rotasi Klinik Hewan Kecil, Hewan Besar, Patologi Diagnostik, Kesmavet, dan Laboratorium RSH UGM.',
    totalCourses: 6,
    completedCourses: 0,
    progress: 0
  }
];

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach-klinisi-pemula',
    title: 'Klinisi Pemula',
    description: 'Selesaikan 3 simulasi kasus klinis pasien hewan secara mandiri.',
    icon: '🩺',
    category: 'clinical',
    targetCount: 3,
    currentCount: 0,
    progressPercent: 0,
    isUnlocked: false,
    requirementText: 'Selesaikan 3 kasus klinis'
  },
  {
    id: 'ach-rajin-ugm',
    title: 'Rajin UGM',
    description: 'Pertahankan konsistensi belajar aktif selama 3 hari berturut-turut.',
    icon: '🔥',
    category: 'streak',
    targetCount: 3,
    currentCount: 0,
    progressPercent: 0,
    isUnlocked: false,
    requirementText: 'Pertahankan streak belajar 3 hari'
  },
  {
    id: 'ach-master-anatomi',
    title: 'Master Anatomi',
    description: 'Pelajari dan selesaikan 5 materi atau topik anatomi veteriner komparatif.',
    icon: '🦴',
    category: 'anatomy',
    targetCount: 5,
    currentCount: 0,
    progressPercent: 0,
    isUnlocked: false,
    requirementText: 'Pelajari 5 materi anatomi veteriner'
  },
  {
    id: 'ach-sahabat-bulan',
    title: 'Sahabat Bulan',
    description: 'Kumpulkan total waktu belajar aktif selama minimal 60 menit di VETORA.',
    icon: '🐾',
    category: 'milestone',
    targetCount: 60,
    currentCount: 0,
    progressPercent: 0,
    isUnlocked: false,
    requirementText: 'Capai total 60 menit waktu belajar'
  }
];

export const INITIAL_SCHEDULE: ScheduleItem[] = [
  {
    id: 'sched-1',
    title: 'Praktikum Anatomi Veteriner II (Sistem Kardiovaskular)',
    date: '2026-09-15',
    startTime: '08:00',
    endTime: '11:00',
    course: 'Anatomi Veteriner II',
    courseId: 'course-anatomi-vet',
    location: 'Lab Anatomi FKH UGM',
    type: 'Praktikum',
    notes: 'Bawa jas lab putih, dissecting kit, dan atlas anatomi kardio canis/felis.',
    status: 'Upcoming',
    isCompleted: false,
    createdAt: '2026-09-10'
  },
  {
    id: 'sched-2',
    title: 'Kuliah Mikrobiologi Veteriner: Bakteriologi Klinis',
    date: '2026-09-16',
    startTime: '10:00',
    endTime: '12:00',
    course: 'Mikrobiologi Veteriner',
    courseId: 'course-mikrobiologi',
    location: 'R. Kuliah 102 Gedung V3 FKH UGM',
    type: 'Kuliah',
    notes: 'Materi pengantar pewarnaan Gram dan diferensiasi Staphylococcus vs Streptococcus.',
    status: 'Upcoming',
    isCompleted: false,
    createdAt: '2026-09-10'
  },
  {
    id: 'sched-3',
    title: 'Review Mandiri Flashcard Kardiovaskular & EKG',
    date: '2026-09-16',
    startTime: '19:30',
    endTime: '21:00',
    course: 'Anatomi Veteriner II',
    courseId: 'course-anatomi-vet',
    location: 'Perpustakaan FKH / Kamar Belajar',
    type: 'Belajar',
    notes: 'Fokus pada valva mitralis, tricuspidalis, dan cabang truncus brachiocephalicus.',
    status: 'Upcoming',
    isCompleted: false,
    createdAt: '2026-09-10'
  }
];

export const INITIAL_COURSES: Course[] = [
  // Semester 3 Courses (Primary active semester)
  {
    id: 'course-anatomi-vet',
    name: 'Anatomi Veteriner',
    code: 'FKH-2101',
    semesterId: 'sem-3',
    semesterNumber: 3,
    description: 'Studi komparatif struktur makroskopis organ viseral (splanchnologia) mamalia domestik (karnivora, ruminansia, equin).',
    iconImage: ASSETS.iconAnatomy,
    materialsCount: 24,
    topicsCount: 8,
    progress: 0,
    category: 'Biomedik',
    credits: 3,
    instructor: 'Prof. Dr. drh. Teguh Budipitojo, M.P.'
  },
  {
    id: 'course-mikrobiologi',
    name: 'Mikrobiologi',
    code: 'FKH-2102',
    semesterId: 'sem-3',
    semesterNumber: 3,
    description: 'Bakteriologi dan mikologi veteriner, patogenesis patogen zoonotik, identifikasi biokimiawi, dan sensitivitas antimikroba.',
    iconImage: ASSETS.iconMicrobiology,
    materialsCount: 18,
    topicsCount: 6,
    progress: 0,
    category: 'Paraklinik',
    credits: 3,
    instructor: 'Dr. drh. Widagdo Sri Nugroho, M.P.'
  },
  {
    id: 'course-histologi',
    name: 'Histologi',
    code: 'FKH-2103',
    semesterId: 'sem-3',
    semesterNumber: 3,
    description: 'Mikroanatomi dan arsitektur sitologi organ mamalia domestik, pewarnaan HE, organ limfoid, dan sistem endokrin.',
    iconImage: ASSETS.iconHistology,
    materialsCount: 21,
    topicsCount: 7,
    progress: 0,
    category: 'Biomedik',
    credits: 3,
    instructor: 'drh. Tri Wahyu Pangestiningsih, Ph.D.'
  },
  {
    id: 'course-farmakologi',
    name: 'Farmakologi',
    code: 'FKH-2104',
    semesterId: 'sem-3',
    semesterNumber: 3,
    description: 'Farmakodinamik, farmakokinetik, kalkulasi dosis per spesies, antibiotik beta-laktam, analgesik NSAID, dan anastetika.',
    iconImage: ASSETS.iconPharmacology,
    materialsCount: 16,
    topicsCount: 5,
    progress: 0,
    category: 'Klinik',
    credits: 3,
    instructor: 'Dr. drh. Agustina Dwi Wijayanti, M.P.'
  },
  {
    id: 'course-patologi-vet',
    name: 'Patologi Veteriner',
    code: 'FKH-2105',
    semesterId: 'sem-3',
    semesterNumber: 3,
    description: 'Patologi umum: degenerasi seluler, nekrosis, gangguan sirkulasi (edema, hiperemia, trombus), dan respon radang.',
    iconImage: ASSETS.iconPathology,
    materialsCount: 14,
    topicsCount: 5,
    progress: 0,
    category: 'Paraklinik',
    credits: 3,
    instructor: 'Dr. drh. Kurniasih, M.V.Sc.'
  },
  {
    id: 'course-patologi-klinik',
    name: 'Patologi Klinik',
    code: 'FKH-2106',
    semesterId: 'sem-3',
    semesterNumber: 3,
    description: 'Interpretasi hematologi, panel biokimia darah (enzim hepar, fungsi renal BUN/Kreatinin), urinalisis, dan sitologi cairan tubuh.',
    iconImage: ASSETS.iconClinPath,
    materialsCount: 10,
    topicsCount: 4,
    progress: 0,
    category: 'Klinik',
    credits: 2,
    instructor: 'drh. Sitarina Widyarini, M.P., Ph.D.'
  },
  {
    id: 'course-ilmu-penyakit-dalam',
    name: 'Ilmu Penyakit Dalam',
    code: 'FKH-2107',
    semesterId: 'sem-3',
    semesterNumber: 3,
    description: 'Patofisiologi, manifestasi klinis, dan penalaran diagnostik penyakit organ viseral dan sistemik hewan kesayangan.',
    iconImage: ASSETS.iconInternalMed,
    materialsCount: 8,
    topicsCount: 3,
    progress: 0,
    category: 'Klinik',
    credits: 3,
    instructor: 'Prof. Dr. drh. Ida Tjahajati, M.P.'
  },
  {
    id: 'course-kesmavet',
    name: 'Kesmavet',
    code: 'FKH-2108',
    semesterId: 'sem-3',
    semesterNumber: 3,
    description: 'Kesehatan Masyarakat Veteriner, higene sanitasi daging dan susu ASUH, zoonosis foodborne, dan One Health framework.',
    iconImage: ASSETS.iconKesmavet,
    materialsCount: 12,
    topicsCount: 4,
    progress: 0,
    category: 'Kesmavet',
    credits: 2,
    instructor: 'Dr. drh. Doddi Yudhabuntara, M.P.'
  },

  // Sample courses for Semester 1, 2, 4 and PPDH
  {
    id: 'course-bio-sel',
    name: 'Biologi Sel & Embriologi',
    code: 'FKH-1101',
    semesterId: 'sem-1',
    semesterNumber: 1,
    description: 'Biologi sel molekuler, gametogenesis, fertilisasi, dan pembentukan lapisan germinal embrionik.',
    iconImage: ASSETS.iconHistology,
    materialsCount: 15,
    topicsCount: 5,
    progress: 0,
    category: 'Biomedik',
    credits: 3,
    instructor: 'Dosen Pengampu FKH UGM'
  },
  {
    id: 'course-osteologi',
    name: 'Anatomi I (Osteologi & Artrologi)',
    code: 'FKH-1201',
    semesterId: 'sem-2',
    semesterNumber: 2,
    description: 'Skeleton axiale dan appendiculare komparatif anjing, kucing, kuda, sapi, dan babi.',
    iconImage: ASSETS.iconAnatomy,
    materialsCount: 20,
    topicsCount: 6,
    progress: 0,
    category: 'Biomedik',
    credits: 3,
    instructor: 'Dosen Pengampu FKH UGM'
  },
  {
    id: 'course-parasitologi',
    name: 'Parasitologi Veteriner',
    code: 'FKH-2201',
    semesterId: 'sem-4',
    semesterNumber: 4,
    description: 'Helmintologi, protozoologi, dan entomologi veteriner serta siklus transmisi vektor.',
    iconImage: ASSETS.iconMicrobiology,
    materialsCount: 14,
    topicsCount: 5,
    progress: 0,
    category: 'Paraklinik',
    credits: 3,
    instructor: 'Dosen Pengampu FKH UGM'
  },
  {
    id: 'course-ppdh-interna',
    name: 'Rotasi Penyakit Dalam Hewan Kecil',
    code: 'PPDH-501',
    semesterId: 'sem-ppdh',
    semesterNumber: 'ppdh',
    description: 'Penanganan pasien klinis di Rumah Sakit Hewan Prof. Soeparwi UGM.',
    iconImage: ASSETS.iconInternalMed,
    materialsCount: 10,
    topicsCount: 5,
    progress: 0,
    category: 'Klinik Profesi',
    credits: 4,
    instructor: 'drh. Spesialis RSH UGM'
  }
];

export const INITIAL_TOPICS: Topic[] = [
  // Topics for Anatomi Veteriner (FKH-2101)
  {
    id: 'topic-cardiovascular',
    courseId: 'course-anatomi-vet',
    title: 'Cardiovascular System (Cor & Vasa Sanguinea)',
    description: 'Topografi cor canis & felis, cavitates cordis, valvae, systema conducens cordis, dan vasa coronaria.',
    order: 1,
    progress: 0,
    materialsCount: 5,
    quizCount: 2,
    flashcardDeckId: 'deck-cardio'
  },
  {
    id: 'topic-respiratory',
    courseId: 'course-anatomi-vet',
    title: 'Respiratory System (Apparatus Respiratorius)',
    description: 'Cavum nasi, larynx, trachea, pulmo lobation per species, dan pleura parietalis-visceralis.',
    order: 2,
    progress: 0,
    materialsCount: 4,
    quizCount: 1,
    flashcardDeckId: 'deck-respi'
  },
  {
    id: 'topic-digestive',
    courseId: 'course-anatomi-vet',
    title: 'Digestive System (Apparatus Digestorius)',
    description: 'Komparasi gaster simplex (karnivora) dan ventriculus ruminansia (rumen, reticulum, omasum, abomasum).',
    order: 3,
    progress: 0,
    materialsCount: 4,
    quizCount: 1,
    flashcardDeckId: 'deck-digestive'
  },
  {
    id: 'topic-urinary',
    courseId: 'course-anatomi-vet',
    title: 'Urinary System (Systema Urinarium)',
    description: 'Morfologi ren unipapillaris (felis/canis) vs ren multipapillaris lobatus (bovis), ureter, vesica urinaria.',
    order: 4,
    progress: 0,
    materialsCount: 3,
    quizCount: 1
  },
  {
    id: 'topic-nervous',
    courseId: 'course-anatomi-vet',
    title: 'Nervous System (Systema Nervosum)',
    description: 'Encephalon, medulla spinalis, plexus brachialis & lumbosacralis, dan nervi craniales I-XII.',
    order: 5,
    progress: 0,
    materialsCount: 3,
    quizCount: 1
  },
  {
    id: 'topic-reproductive',
    courseId: 'course-anatomi-vet',
    title: 'Reproductive System (Apparatus Urogenitalis)',
    description: 'Uterus bicornis, ovarium, struktur ovarium, penis fibroelastic vs musculocavernous, os penis.',
    order: 6,
    progress: 0,
    materialsCount: 3,
    quizCount: 1
  },
  {
    id: 'topic-musculoskeletal',
    courseId: 'course-anatomi-vet',
    title: 'Musculoskeletal System',
    description: 'Musculi thoracici, musculi abdominis, dan aparatus penopang pergerakan mamalia quadrupedal.',
    order: 7,
    progress: 0,
    materialsCount: 2,
    quizCount: 1
  },

  // Topics for other courses
  {
    id: 'topic-bakteriologi',
    courseId: 'course-mikrobiologi',
    title: 'Bakteri Patogen Gram Positif & Negatif',
    description: 'Staphylococcus aureus, Streptococcus equi, Escherichia coli, Salmonella enterica, dan resistensi beta-laktam.',
    order: 1,
    progress: 0,
    materialsCount: 4,
    quizCount: 1,
    flashcardDeckId: 'deck-mikro'
  },
  {
    id: 'topic-histologi-organ',
    courseId: 'course-histologi',
    title: 'Mikroanatomi Hepar & Pulmo',
    description: 'Lobulus hepatis heksagonal, trias porta, sinusoid hepar, sel Kupffer, dan alveoli pulmonalis.',
    order: 1,
    progress: 0,
    materialsCount: 3,
    quizCount: 1
  },
  {
    id: 'topic-antibiotika',
    courseId: 'course-farmakologi',
    title: 'Antibiotika Veteriner & Mekanisme Kerja',
    description: 'Beta-laktam, Aminoglikosida, Fluoroquinolon, Tetrasiklin: spektrum aktivitas dan efek samping per spesies.',
    order: 1,
    progress: 0,
    materialsCount: 3,
    quizCount: 1
  }
];

export const INITIAL_MATERIALS: Material[] = [
  {
    id: 'mat-cardio-1',
    title: 'Anatomi Jantung Komparatif & Vaskularisasi Koroner',
    description: 'Kajian mendalam topografi, cavitates cordis, valvae atrioventriculares, serta sirkulasi fungsional dan nutrisional cor mamalia domestik.',
    type: 'Lecture Notes',
    courseId: 'course-anatomi-vet',
    topicId: 'topic-cardiovascular',
    semesterId: 'sem-3',
    readTimeMinutes: 18,
    isSaved: false,
    isCompleted: false,
    progressPercent: 0,
    updatedAt: '2025-09-12',
    sections: [
      {
        id: 'sec-1',
        title: '1. Topografi dan Situs Cordis pada Karnivora',
        readingTimeMinutes: 5,
        content: `### Topografi Cor Canis & Felis

Jantung (cor) anjing dan kucing terletak di dalam **cavum thoracis** pada ruang **mediastinum medium**. Secara topografis:

- **Basis Cordis**: Mengarah ke craniadorsal, setinggi costa ke-3.
- **Apex Cordis**: Mengarah ke caudoventral di sisi sinister, berada setinggi intercostalis ke-5 hingga ke-6 dekat sternum.
- **Axis longitudinal**: Pada anjing, aksis membentuk sudut sekitar 45 derajat terhadap sternum. Pada kucing (terutama kucing geriatri), axis jantung berbaring lebih mendatar (*horizontal orientation*), sejajar dengan lantai sternum.

\`\`\`
Perikardium (lapisan pelindung):
1. Pericardium fibrosum (lapisan luar liat, berikatan dengan sternum melalui lig. sternopericardiacum)
2. Pericardium serosum (lamina parietalis & lamina visceralis / epicardium)
3. Cavum pericardii (berisi 1-3 ml liquor pericardii untuk lubrikasi gerak systole-diastole)
\`\`\`

> **Catatan Klinis FKH**: *Efusi perikardial atau tamponade jantung terjadi saat akumulasi cairan di cavum pericardii menekan ventrikel kanan berdinding tipis, menghambat venous return (preload) dan memicu Trias Beck.*`
      },
      {
        id: 'sec-2',
        title: '2. Arsitektur Internal: Atrium & Ventrikel',
        readingTimeMinutes: 6,
        content: `### Ruang Jantung & Katup (Valvae)

Jantung mamalia memiliki 4 cavitates dengan pemisahan sempurna:

#### Atrium Dextrum
- Menerima darah deoksigenasi dari **v. cava cranialis**, **v. cava caudalis**, dan **sinus coronarius**.
- Dinding auricula dextra diperkuat oleh **mm. pectinati**.
- **Fossa ovalis**: Depresi sisa foramen ovale embrional pada septum interatriale.

#### Ventriculus Dexter
- Berdinding lebih tipis (rasio tebal ventrikel sinistra : dextra ≈ 3:1).
- Menerima darah melalui **valva atrioventricularis dextra (valva tricuspidalis)**.
- **Trabeculae carneae** memperkuat dinding miokardium.
- **Mm. papillares** berhubungan dengan cuspis valva melalui pita fibrosa halus: **chordae tendineae**.
- Menyalurkan darah ke **truncus pulmonalis** melewati **valva trunci pulmonalis (valva semilunaris)**.

#### Atrium Sinistrum
- Menerima darah teroksigenasi dari 4-6 **vv. pulmonales**.
- Endokardium licin dengan auricula sinistra berotot pectinate.

#### Ventriculus Sinister
- Dinding tebal dengan tekanan sistolik tinggi (100–140 mmHg).
- Pintu masuk: **valva atrioventricularis sinistra (valva bicuspidalis / valva mitralis)**. Memiliki dua cuspis utama (cuspis septalis & cuspis parietalis).
- Pintu keluar: **ostium aortae** yang dijaga oleh **valva aortae** (tiga valvulae semilunares: dextra, sinistra, septalis).`
      },
      {
        id: 'sec-3',
        title: '3. Sistem Konduksi Jantung & Inervasi Otonom',
        readingTimeMinutes: 4,
        content: `### Systema Conducens Cordis

Sel-sel miokardium termodifikasi yang menghasilkan dan mendistribusikan impuls depolarisasi ritmis:

1. **Nodus Sinuatrialis (SA Node)**: Pacemaker alami, terletak di sulcus terminalis dekat muara v. cava cranialis.
2. **Nodus Atrioventricularis (AV Node)**: Terletak di septum interatriale bagian ventrocaudal. Menyebabkan *AV delay* (0.05-0.1 s) untuk memberi waktu atrium mengosongkan darah ke ventrikel.
3. **Fasciculus Atrioventricularis (His Bundle)**: Berjalan menembus trigonum fibrosum cordis menuju septum interventriculare.
4. **Crus Dextrum & Crus Sinistrum**: Mencapai apex cordis melalui trabecula septomarginalis (moderator band).
5. **Rami Subendocardiales (Purkinje Fibers)**: Memicu kontraksi ventrikel dari apex menuju basis cordis.

**Inervasi**:
- *Parasimpatis*: Melalui **N. Vagus (CN X)**, melepaskan asetilkolin (reseptor M2), menurunkan heart rate (kronotropik negatif).
- *Simpatis*: Melalui ganglion cervicale caudale dan ganglion stellatum (reseptor Beta-1 adrenergik), meningkatkan kontraksi dan denyut jantung.`
      },
      {
        id: 'sec-4',
        title: '4. Vaskularisasi Koroner & Aplikasi Klinis',
        readingTimeMinutes: 3,
        content: `### Vasa Sanguinea Cordis

Nutrisi miokardium disuplai secara eksklusif oleh arteri koroner yang keluar langsung dari **sinus aortae** tepat di atas valva semilunaris:

- **Arteria coronaria sinistra**: Sangat dominan pada anjing dan kucing (*left-dominant coronary circulation*). Bercabang menjadi:
  - *Ramus interventricularis paraconalis*: Berjalan di sulcus interventricularis paraconalis menuju apex.
  - *Ramus circumflexus sinister*: Melingkar di sulcus coronarius ke facies auricularis.
- **Arteria coronaria dextra**: Menyuplai atrium dextrum dan dinding ventrikel kanan kranial.

**Venous Drainage**:
Sebagian besar darah vena miokardial dikumpulkan oleh **v. cordis magna** yang bermuara ke **sinus coronarius**, lalu langsung masuk ke atrium dextrum.

#### Mutiara Klinis (Clinical Pearls):
- **PDA (Patent Ductus Arteriosus)**: Kegagalan penutupan ductus arteriosus pasca lahir, menghasilkan murmur kontinu (*washing machine murmur*) di ruang interkostal 3-4 kiri.
- **Kardiomiopati Hipertrofi (HCM)** pada Felis: Penebalan konsentris dinding ventrikel kiri yang menyebabkan pembesaran atrium kiri, risiko tromboembolisme aorta (*saddle thrombus*).`
      }
    ]
  },
  {
    id: 'mat-cardio-2',
    title: 'Topografi Vasa Sanguinea & Pembuluh Darah Leher',
    description: 'Identifikasi anatomis Arteri Karotis Komunis, Vena Jugularis Externa, Arcus Aortae, dan titik akses venipunctur.',
    type: 'Module',
    courseId: 'course-anatomi-vet',
    topicId: 'topic-cardiovascular',
    semesterId: 'sem-3',
    readTimeMinutes: 14,
    isSaved: false,
    isCompleted: false,
    progressPercent: 0,
    updatedAt: '2025-09-10',
    sections: [
      {
        id: 'sec-v-1',
        title: '1. Sulcus Jugularis dan Venipunctur',
        readingTimeMinutes: 4,
        content: `Vena jugularis externa terletak di dalam **sulcus jugularis**, dibatasi secara ventral oleh m. sternocephalicus dan dorsal oleh m. brachiocephalicus. Merupakan lokasi utama pengambilan sampel darah besar pada anjing, kucing, dan ruminansia.`
      },
      {
        id: 'sec-v-2',
        title: '2. Arcus Aortae dan Percabangannya',
        readingTimeMinutes: 5,
        content: `Komparasi percabangan arcus aorta:
- **Karnivora (Anjing & Kucing)**: Memiliki 2 cabang utama: **Truncus Brachiocephalicus** (menghasilkan a. carotis communis sinistra, a. carotis communis dextra, a. subclavia dextra) dan **Arteria Subclavia Sinistra**.
- **Kuda & Sapi**: Memiliki hanya 1 cabang langsung: **Truncus Brachiocephalicus** yang kemudian mempercabangkan seluruh pembuluh ekstremitas kranial dan kepala.`
      }
    ]
  },
  {
    id: 'mat-respi-1',
    title: 'Anatomi Saluran Pernafasan Atas & Komparasi Concha Nasalis',
    description: 'Struktur cartilago nasi, diverticulum nasi equin, larynx, dan inervasi N. Laryngeus Recurrens.',
    type: 'Handbook',
    courseId: 'course-anatomi-vet',
    topicId: 'topic-respiratory',
    semesterId: 'sem-3',
    readTimeMinutes: 12,
    isSaved: false,
    isCompleted: false,
    progressPercent: 0,
    updatedAt: '2025-09-08',
    sections: [
      {
        id: 'sec-r-1',
        title: '1. Cavum Nasi dan Conchae',
        readingTimeMinutes: 6,
        content: `Kavum nasi dilapisi mukosa respiratorius bertingkat silindris bersilia. Concha nasalis dorsalis dan ventralis membagi rongga menjadi meatus nasi dorsalis, medius, ventralis, dan communis.`
      }
    ]
  },
  {
    id: 'mat-mikro-1',
    title: 'Morfologi, Pewarnaan Gram & Uji Katalase/Koagulase',
    description: 'Prinsip diferensiasi kokus Gram positif: Staphylococcus vs Streptococcus, hemolisis pada Blood Agar.',
    type: 'Module',
    courseId: 'course-mikrobiologi',
    topicId: 'topic-bakteriologi',
    semesterId: 'sem-3',
    readTimeMinutes: 15,
    isSaved: false,
    isCompleted: false,
    progressPercent: 0,
    updatedAt: '2025-09-14',
    sections: [
      {
        id: 'sec-m-1',
        title: '1. Prinsip Pewarnaan Gram',
        readingTimeMinutes: 5,
        content: `Dinding sel Gram positif memiliki lapisan peptidoglikan tebal (20-80 nm) yang menahan kompleks Crystal Violet - Iodine setelah dekolorisasi alkohol.`
      }
    ]
  },
  {
    id: 'mat-farma-1',
    title: 'Farmakologi Antibiotik Golongan Beta-Laktam & Toksisitas Spesies',
    description: 'Mekanisme penghambatan transpeptidase PBP, resistensi beta-laktamase, serta kontraindikasi ampisilin pada hewan eksotik (rodensia/lagomorpha).',
    type: 'Journal',
    courseId: 'course-farmakologi',
    topicId: 'topic-antibiotika',
    semesterId: 'sem-3',
    readTimeMinutes: 16,
    isSaved: false,
    isCompleted: false,
    progressPercent: 0,
    updatedAt: '2025-09-11',
    sections: [
      {
        id: 'sec-f-1',
        title: '1. Mekanisme Kerja Beta-Laktam',
        readingTimeMinutes: 6,
        content: `Antibiotik beta-laktam mengikat enzim Penicillin-Binding Proteins (PBPs) yang mengkatalisis cross-linking rantai peptidoglikan pada dinding sel bakteri.`
      }
    ]
  }
];

export const INITIAL_FLASHCARDS: FlashcardDeck[] = [
  {
    id: 'deck-cardio',
    title: 'Anatomi Kardiovaskular Mamalia Domestik',
    description: 'Nomenklatur anatomi cor, katup semilunaris dan atrioventrikularis, pembuluh koroner, serta vaskularisasi sistemik.',
    courseId: 'course-anatomi-vet',
    topicId: 'topic-cardiovascular',
    cardsCount: 6,
    masteredCount: 0,
    isSaved: false,
    createdAt: '2025-09-05',
    cards: [
      {
        id: 'c-1',
        deckId: 'deck-cardio',
        question: 'Di sulcus manakah Ramus Interventricularis Paraconalis berjalan pada jantung anjing?',
        answer: 'Berjalan di **Sulcus Interventricularis Paraconalis** (pada facies auricularis cordis), membentang dari basis menuju apex cordis di sisi sinistra.',
        explanation: 'Merupakan cabang utama dari Arteria Coronaria Sinistra yang menyuplai dinding depan kedua ventrikel.',
        difficulty: 'new',
        masteryLevel: 0
      },
      {
        id: 'c-2',
        deckId: 'deck-cardio',
        question: 'Berapa jumlah cuspis pada Valva Atrioventricularis Sinistra (Valva Mitralis) dan apa fungsinya?',
        answer: 'Memiliki **2 Cuspis** (Cuspis Septalis dan Cuspis Parietalis). Fungsinya mencegah regurgitasi darah dari ventrikel kiri kembali ke atrium kiri selama fase sistol ventrikel.',
        explanation: 'Chordae tendineae menahan katup agar tidak mengalami prolaps ke atrium kiri saat tekanan sistolik melonjak hingga 120 mmHg.',
        difficulty: 'new',
        masteryLevel: 0
      },
      {
        id: 'c-3',
        deckId: 'deck-cardio',
        question: 'Apakah nama struktur serabut fibromuskular di Ventriculus Dexter yang menyalurkan impuls Purkinje langsung melintasi rongga menuju dinding lateral?',
        answer: '**Trabecula Septomarginalis** (sering disebut *Moderator Band*).',
        explanation: 'Mengandung serabut Purkinje dari crus dextrum fasciculi atrioventriculares, mempercepat konduksi ke m. papillaris magnus.',
        difficulty: 'new',
        masteryLevel: 0
      },
      {
        id: 'c-4',
        deckId: 'deck-cardio',
        question: 'Sebutkan perbedaan percabangan Arcus Aortae antara Anjing (Canis) dan Kuda (Equus)!',
        answer: '- **Anjing**: 2 cabang (Truncus Brachiocephalicus dan A. Subclavia Sinistra).\\n- **Kuda**: 1 cabang tunggal (hanya Truncus Brachiocephalicus; kedua a. subclavia berasal darinya).',
        explanation: 'Perbedaan filogenetik ini penting saat melakukan torakotomi dan interpretasi angiografi kontras.',
        difficulty: 'new',
        masteryLevel: 0
      },
      {
        id: 'c-5',
        deckId: 'deck-cardio',
        question: 'Di manakah muara Vena Cava Caudalis pada jantung mamalia?',
        answer: 'Bermuara ke **Atrium Dextrum** bagian kaudodorsal, tepat di sebelah kranial muara Sinus Coronarius.',
        explanation: 'Vena cava caudalis mengalirkan darah balik dari abdomen dan extremitas pelvina.',
        difficulty: 'new',
        masteryLevel: 0
      },
      {
        id: 'c-6',
        deckId: 'deck-cardio',
        question: 'Apa fungsi Foramen Ovale pada sirkulasi fetus dan menjadi struktur apakah setelah lahir?',
        answer: 'Mengalirkan darah beroksigen langsung dari atrium dextrum ke atrium sinistrum mem-bypass paru-paru fetus yang belum mengembang. Pasca lahir menutup menjadi **Fossa Ovalis**.',
        explanation: 'Penutupan terjadi karena peningkatan tekanan atrium kiri pasca inspirasi pertama fetus.',
        difficulty: 'new',
        masteryLevel: 0
      }
    ]
  },
  {
    id: 'deck-respi',
    title: 'Sistem Respirasi & Komparasi Lobus Paru',
    description: 'Lobasi pulmo mamalia, kartilago laringeus, dan inervasi saraf kranial pernafasan.',
    courseId: 'course-anatomi-vet',
    topicId: 'topic-respiratory',
    cardsCount: 4,
    masteredCount: 0,
    isSaved: false,
    createdAt: '2025-09-08',
    cards: [
      {
        id: 'c-r-1',
        deckId: 'deck-respi',
        question: 'Sebutkan 4 kartilago laringeus utama pada mamalia!',
        answer: 'Cartilago Epiglottica, Cartilago Thyroidea, Cartilago Cricoidea, dan sepasang Cartilago Arytenoidea.',
        explanation: 'Cartilago Arytenoidea berpasangan dan berperan langsung dalam adduksi-abduksi plica vocalis.',
        difficulty: 'new',
        masteryLevel: 0
      },
      {
        id: 'c-r-2',
        deckId: 'deck-respi',
        question: 'Berapa lobus pulmo sinistra pada anjing?',
        answer: '2 bagian: **Lobus Cranialis** (terbagi pars cranialis dan pars caudalis) serta **Lobus Caudalis**.',
        explanation: 'Secara fungsional sering dihitung sebagai 2 lobus anatomis.',
        difficulty: 'new',
        masteryLevel: 0
      }
    ]
  },
  {
    id: 'deck-mikro',
    title: 'Bakteriologi Klinis & Uji Diagnostik',
    description: 'Pewarnaan Gram, diferensiasi Staphylococcus vs Streptococcus, dan uji biokimiawi.',
    courseId: 'course-mikrobiologi',
    topicId: 'topic-bakteriologi',
    cardsCount: 4,
    masteredCount: 0,
    isSaved: false,
    createdAt: '2025-09-02',
    cards: [
      {
        id: 'c-m-1',
        deckId: 'deck-mikro',
        question: 'Uji apakah yang membedakan genus Staphylococcus dari Streptococcus?',
        answer: '**Uji Katalase**. Staphylococcus menghasilkan enzim katalase (Katalase Positif: gelembung O2 dengan H2O2 3%), sedangkan Streptococcus Katalase Negatif.',
        difficulty: 'new',
        masteryLevel: 0
      }
    ]
  }
];

export const INITIAL_QUIZZES: Quiz[] = [
  {
    id: 'quiz-cardio-1',
    title: 'Evaluasi Komprehensif Anatomi Kardiovaskular',
    description: 'Uji penalaran struktur ruang jantung, katup semilunaris, sulkus koroner, dan fisiologi konduksi.',
    courseId: 'course-anatomi-vet',
    topicId: 'topic-cardiovascular',
    semesterId: 'sem-3',
    difficulty: 'Intermediate',
    timeLimitMinutes: 10,
    questionsCount: 5,
    bestScore: undefined,
    attemptsCount: 0,
    questions: [
      {
        id: 'q-1',
        type: 'multiple-choice',
        question: 'Manakah dari struktur berikut yang TIDAK bermuara langsung ke dalam Atrium Dextrum pada jantung anjing normal?',
        options: [
          'Vena Cava Cranialis',
          'Vena Cava Caudalis',
          'Venae Pulmonales',
          'Sinus Coronarius'
        ],
        correctAnswerIndex: 2,
        explanation: 'Venae Pulmonales (4-6 pembuluh) membawa darah beroksigen tinggi dari pulmo dan bermuara ke dalam Atrium Sinistrum, bukan Atrium Dextrum.'
      },
      {
        id: 'q-2',
        type: 'multiple-choice',
        question: 'Pada auskultasi toraks anjing, lokasi puncta maxima untuk mendengarkan Valva Mitralis (bicuspidalis) berada pada:',
        options: [
          'Intercostalis ke-4 kanan setinggi costochondral junction',
          'Intercostalis ke-5 kiri setinggi costochondral junction',
          'Intercostalis ke-3 kiri dekat sternum',
          'Intercostalis ke-2 kanan di basis leher'
        ],
        correctAnswerIndex: 1,
        explanation: 'Valva mitralis diauskultasi paling jelas di hemithorax sinistra ruang interkostal ke-5 (IC 5) tepat di atas sambungan kostokondral (area apex cordis).'
      },
      {
        id: 'q-3',
        type: 'true-false',
        question: 'Pada kucing, Arteria Coronaria Sinistra mendominasi suplai darah miokardium dan mempercabangkan Ramus Interventricularis Subsinuosus.',
        options: [
          'True (Benar)',
          'False (Salah)'
        ],
        correctAnswerIndex: 0,
        explanation: 'Benar. Anjing dan kucing memiliki sirkulasi koroner dominan kiri (left-dominant coronary circulation), di mana a. coronaria sinistra menyuplai kedua sulkus interventrikularis.'
      },
      {
        id: 'q-4',
        type: 'image-identification',
        imageUrl: ASSETS.heartDiagram,
        question: 'Perhatikan preparat jantung mamalia ini. Struktur pita serabut fibrosa yang menahan cuspis valva atrioventricularis agar tidak terbalik saat ventrikel berkontraksi disebut:',
        options: [
          'Trabeculae Carneae',
          'Chordae Tendineae',
          'Plica Venae Cavae',
          'Anulus Fibrosus'
        ],
        correctAnswerIndex: 1,
        explanation: 'Chordae Tendineae adalah serabut mirip senar fibrosa kuat yang menghubungkan ujung mm. papillares ke tepi bebas cuspis valvae atrioventriculares.'
      },
      {
        id: 'q-5',
        type: 'multiple-choice',
        question: 'Nodus Sinuatrialis (SA Node) sebagai pacemaker intrinsik utama jantung terletak anatomis di:',
        options: [
          'Septum interventriculare bagian membranasea',
          'Dinding atrium dextrum dekat muara Vena Cava Cranialis',
          'Apex cordis dekat perlekatan ligamentum sternopericardiacum',
          'Basis conus arteriosus'
        ],
        correctAnswerIndex: 1,
        explanation: 'Nodus SA terletak di subepikardium crista terminalis dinding atrium kanan dekat sudut pertemuan dengan vena cava kranialis.'
      }
    ]
  },
  {
    id: 'quiz-mikro-1',
    title: 'Kuis Cepat: Mikrobiologi & Sistem Imun',
    description: 'Evaluasi pengenalan bakteri kokus, endotoksin Gram negatif, dan respon antibodi.',
    courseId: 'course-mikrobiologi',
    topicId: 'topic-bakteriologi',
    semesterId: 'sem-3',
    difficulty: 'Basic',
    timeLimitMinutes: 8,
    questionsCount: 3,
    bestScore: undefined,
    attemptsCount: 0,
    questions: [
      {
        id: 'qm-1',
        type: 'multiple-choice',
        question: 'Komponen dinding sel bakteri Gram negatif yang bertanggung jawab atas aktivitas endotoksin syok septik adalah:',
        options: [
          'Asam Teikoat',
          'Lipopolisakarida (LPS / Lipid A)',
          'Peptidoglikan tebal',
          'Porin protein'
        ],
        correctAnswerIndex: 1,
        explanation: 'Lipopolisakarida (LPS), khususnya fraksi Lipid A, merupakan endotoksin patogenik yang memicu pelepasan masif TNF-alfa dan IL-1 sitokin pro-inflamasi.'
      },
      {
        id: 'qm-2',
        type: 'true-false',
        question: 'Uji koagulase positif pada Staphylococcus mengindikasikan strain patogen seperti Staphylococcus aureus atau Staphylococcus pseudintermedius.',
        options: [
          'True (Benar)',
          'False (Salah)'
        ],
        correctAnswerIndex: 0,
        explanation: 'Benar. Enzim koagulase menggumpalkan plasma darah dan merupakan penanda virulensi primer pada S. aureus dan S. pseudintermedius.'
      },
      {
        id: 'qm-3',
        type: 'multiple-choice',
        question: 'Imunoglobulin predominan yang disekresikan dalam kolostrum induk sapi untuk transfer kekebalan pasif fetus adalah:',
        options: [
          'IgE',
          'IgG1',
          'IgM',
          'IgD'
        ],
        correctAnswerIndex: 1,
        explanation: 'IgG1 merupakan isotype antibodi paling dominan dalam kolostrum ruminansia, diserap melalui usus halus neonatus dalam 24 jam pertama kehidupan.'
      }
    ]
  }
];

export const INITIAL_CLINICAL_CASES: ClinicalCase[] = [
  {
    id: 'case-feline-dyspnea',
    title: 'Kucing Domestik — Dispnea Akut dan Letargi Progresif',
    species: 'Feline',
    difficulty: 'Moderate',
    topicId: 'topic-cardiovascular',
    courseId: 'course-anatomi-vet',
    status: 'not-started',
    patient: {
      name: 'Mochi',
      breed: 'Domestic Shorthair (Felis catus)',
      age: '3 tahun 6 bulan',
      sex: 'Jantan Kastrasi',
      weight: '4.2 kg'
    },
    history: 'Pemilik melaporkan kucing mulai bernafas cepat sejak 2 hari terakhir, tidak mau makan, bersembunyi di bawah tempat tidur dengan posisi sternal recumbency dan leher terulur.',
    chiefComplaint: 'Nafas terengah-engah (open-mouth breathing saat stres) dan intoleransi aktivitas fisik.',
    physicalExam: [
      'Suhu rektal: 38.2°C (Normal)',
      'Frekuensi nafas (RR): 68x/menit (Takipnea berat dengan tipe pernafasan costo-abdominal)',
      'Frekuensi denyut jantung (HR): 220x/menit (Takikardia)',
      'CRT: 2.5 detik, mukosa oral agak pucat sianotik kebiruan',
      'Auskultasi toraks: Suara jantung teredam pada ventral thorax, terdapat gallop rhythm (S3/S4) terdengar samar'
    ],
    labFindings: [
      { test: 'NT-proBNP (Feline Cardiopet)', result: '1450 pmol/L', normalRange: '< 100 pmol/L', status: 'high' },
      { test: 'Troponin I (cTnI)', result: '0.85 ng/mL', normalRange: '< 0.16 ng/mL', status: 'high' },
      { test: 'PCV / Hematokrit', result: '38 %', normalRange: '24 - 45 %', status: 'normal' },
      { test: 'Kreatinin Serum', result: '1.4 mg/dL', normalRange: '0.8 - 2.1 mg/dL', status: 'normal' }
    ],
    imaging: [
      {
        type: 'Torakoskopi / TFAST & X-Ray',
        description: 'T-FAST menunjukkan bilateral B-lines konfluens (pulmonary edema) dan bayangan cairan anechoic di rongga pleura (pleural effusion). Siluet cor tampak Valentine-heart shaped pada proyeksi dorsoventral.'
      }
    ],
    clinicalSigns: [
      'Tachypnea & Dyspnea',
      'Gallop heart rhythm',
      'Muffled heart sounds',
      'Orthopneic posture (siku abduksi, leher ekstensi)'
    ],
    differentialDiagnosis: [
      'Hypertrophic Cardiomyopathy (HCM) dengan Gagal Jantung Kongestif Kiri (L-CHF)',
      'Feline Infectious Peritonitis (FIP) tipe effusif pleura',
      'Feline Asthma / Penyakit Saluran Nafas Bronkial Bawah',
      'Piotoraks / Trauma Toraks'
    ],
    question: 'Berdasarkan temuan klinis, peningkatan drastis NT-proBNP, gallop rhythm, dan siluet Valentine heart pada kucing muda ini, diagnosis kerja paling tepat dan tindakan darurat pertama adalah:',
    options: [
      'FIP tipe basah; segera lakukan parasentesis peritoneum dan antibiotik enrofloksasin',
      'HCM dengan Dekompensasi Kordis (Congestive Heart Failure); oksigenasi flow-by, torakosentesis jika efusi masif, dan furosemid injeksi',
      'Asma felin akut; berikan nebulisasi salbutamol dan deksametason dosis imunosupresif tinggi',
      'Bronkopneumonia bakterial; berikan nebulizer ampisilin dan hidrasi agresif NaCl 0.9%'
    ],
    correctOptionIndex: 1,
    explanation: 'Pada kucing dengan dispnea kardogenik akibat HCM dekompensata, penanganan pertama adalah stabilisasi minimal-stress: terapi oksigen flow-by, diuretik loop (furosemid 1-2 mg/kg IV/IM) untuk mereduksi preload dan edema pulmonal, serta torakosentesis terapeutik jika terdapat efusi pleura. Terapi cairan agresif dikontraindikasikan keras karena akan memperparah edema pulmonal!',
    keyLearningPoints: [
      'Kucing jarang batuk saat gagal jantung; gejala klinis utama adalah takipnea/dispnea mendadak.',
      'Gallop rhythm pada kucing merupakan indikator kuat disfungsi diastolik miokardium.',
      'Stress handling berlebih dapat memicu sudden cardiac arrest pada pasien kardiomiopati felin.'
    ]
  },
  {
    id: 'case-canine-parvo',
    title: 'Anak Anjing Pomeranian — Muntah Akut & Diare Berdarah',
    species: 'Canine',
    difficulty: 'Easy',
    topicId: 'topic-bakteriologi',
    courseId: 'course-mikrobiologi',
    status: 'not-started',
    patient: {
      name: 'Bella',
      breed: 'Pomeranian',
      age: '3 bulan',
      sex: 'Betina',
      weight: '1.5 kg'
    },
    history: 'Anak anjing baru dibeli dari pet shop 5 hari lalu. Belum pernah divaksinasi. Mengalami muntah busa putih 6 kali hari ini dan feses cair berbau amis busuk bercampur darah.',
    chiefComplaint: 'Depresi berat, muntah profus, dan hematochezia.',
    physicalExam: [
      'Suhu rektal: 39.8°C (Febris)',
      'Turgor kulit melambat > 4 detik (Dehidrasi terestimasi 8-10%)',
      'CRT: 3 detik, denyut nadi femoralis cepat dan lemah (thready pulse)',
      'Palpasi abdomen: Tegang dan nyeri pada regio epigastrium/mesogastrium'
    ],
    labFindings: [
      { test: 'Total Leukosit (WBC)', result: '1.8 x10^3 /uL', normalRange: '6.0 - 17.0 x10^3', status: 'low' },
      { test: 'Blood Glucose', result: '58 mg/dL', normalRange: '70 - 120 mg/dL', status: 'low' },
      { test: 'CPV Antigen Rapid Test', result: 'Positif Kuat', normalRange: 'Negatif', status: 'high' }
    ],
    imaging: [],
    clinicalSigns: ['Leukopenia berat (panleukopenia)', 'Vomitus', 'Hematochezia', 'Dehidrasi berat'],
    differentialDiagnosis: ['Canine Parvovirus Enteritis', 'Canine Coronavirus', 'Giardiasis masif', 'Intususepsi usus'],
    question: 'Faktor patogenik utama yang menyebabkan leukopenia berat dan kerentanan bakterial translokasi sekunder pada parvovirus adalah:',
    options: [
      'Penghancuran langsung sel eritrosit di lien',
      'Nekrosis epitel kripta Lieberkühn usus dan supresi sel induk hematopoietik sumsum tulang',
      'Produksi eksotoksin neurotoksik oleh virus',
      'Peningkatan absorpsi albumin di colon'
    ],
    correctOptionIndex: 1,
    explanation: 'Parvovirus memiliki afinitas tinggi pada sel-sel dengan tingkat mitosis cepat, yaitu sel germinal kripta usus halus (menyebabkan villous blunting dan perdarahan) serta sel progenitor di sumsum tulang dan jaringan limfoid (menyebabkan panleukopenia drastis).',
    keyLearningPoints: [
      'Deteksi dini panleukopenia adalah kunci prognosis.',
      'Restorasi cairan infus kristaloid dengan suplementasi dekstrosa dan antibiotik broad-spectrum intravena mencegah sepsis sekunder.'
    ]
  },
  {
    id: 'case-equine-colic',
    title: 'Kuda Pacu Warmblood — Gelisah & Nyeri Kolik Abdomen Akut',
    species: 'Equine',
    difficulty: 'Challenging',
    topicId: 'topic-digestive',
    courseId: 'course-anatomi-vet',
    status: 'not-started',
    patient: {
      name: 'Thunderbolt',
      breed: 'Thoroughbred Equine',
      age: '6 tahun',
      sex: 'Jantan',
      weight: '480 kg'
    },
    history: 'Kuda menolak makan pakan konsentrat sejak pagi, berulang kali menoleh ke arah flank abdomen, menendang-nendang perut, dan sering berguling di kandang.',
    chiefComplaint: 'Gejala kolik akut dan penurunan motilitas intestinal.',
    physicalExam: [
      'HR: 64x/menit (Takikardia nyeri)',
      'RR: 24x/menit',
      'Auskultasi abdomen 4 kuadran: Borborygmi ileocecal dan colonic menghilang (hipomotil berat)',
      'Palpasi rektal: Teraba massa kencang liat di flexura pelvina colon majus'
    ],
    labFindings: [
      { test: 'Laktat Darah', result: '2.1 mmol/L', normalRange: '< 1.5 mmol/L', status: 'high' },
      { test: 'Refluks Nasogastrik', result: '1.5 Liter (spontan sedikit)', normalRange: '< 2 L', status: 'normal' }
    ],
    imaging: [],
    clinicalSigns: ['Flank watching', 'Fleeting roll attempts', 'Absent gut sounds', 'Pelvic flexure impaction'],
    differentialDiagnosis: ['Impaction Colic Flexura Pelvina', 'Torsio Colon / Strangulated Volvulus', 'Spasmodic Colic', 'Peritonitis'],
    question: 'Berdasarkan palpasi rektal yang menemukan massa impaksi pada Flexura Pelvina Colon Ascendens, alasan anatomis utama lokasi ini sangat rentan mengalami impaksi adalah:',
    options: [
      'Adanya diverticulum yang memutar 360 derajat di caecum',
      'Penyempitan lumen mendadak dari Colon Ventrale Sinistrum berdiameter besar ke Colon Dorsale Sinistrum berdiameter kecil serta putaran 180 derajat',
      'Kurangnya inervasi pleksus mienterikus Auerbach di ileum',
      'Terdapatnya katup sfingter muscularis yang tebal di anus'
    ],
    correctOptionIndex: 1,
    explanation: 'Flexura pelvina merupakan titik transisi di mana colon ventrale sinistra berdiameter besar (~25 cm) menyempit drastis menjadi colon dorsale sinistra berdiameter sekitar 8-10 cm dengan tikungan tajam 180 derajat, menjadikannya bottle-neck fisiologis bagi bolus serat kasar pakan kuda.',
    keyLearningPoints: [
      'Pemeriksaan nasogastric tube wajib dilakukan sebelum pemberian obat analgesik oral pada kuda kolik.',
      'Rehidrasi enteral melalui NGT dengan cairan isotonik dan minyak mineral membantu melunakkan impaksi flexura pelvina.'
    ]
  }
];

export const INITIAL_ATLAS_STRUCTURES: AtlasStructure[] = [
  {
    id: 'atlas-cor-canis',
    name: 'Jantung (Cor)',
    latinName: 'Cor canis et felis',
    species: ['Dog', 'Cat'],
    system: 'Cardiovascular',
    organ: 'Jantung',
    description: 'Organ muskular berongga berbentuk kerucut tumpul yang berfungsi memompa darah ke sirkulasi pulmonalis (tekanan rendah) dan sirkulasi sistemik (tekanan tinggi). Terdiri dari epicardium, myocardium, dan endocardium.',
    function: 'Menghasilkan tekanan hidrostatik ritmis untuk sirkulasi darah, transpor gas O2/CO2, nutrisi, hormon, dan regulasi hemodinamik melalui peptida natriuretik atrial (ANP).',
    clinicalRelevance: 'Penyakit katup mitral miksomatosa (MMVD) sering menyerang anjing ras kecil; HCM prevalen pada kucing ras Persia, Maine Coon, dan DSH. Infiltrasi parasit Dirofilaria immitis (heartworm) berpredileksi di arteri pulmonalis dan ventrikel kanan.',
    imageUrl: ASSETS.heartExterior,
    relatedMaterialIds: ['mat-cardio-1', 'mat-cardio-2'],
    relatedQuizId: 'quiz-cardio-1',
    relatedCaseId: 'case-feline-dyspnea',
    isFavorite: true
  },
  {
    id: 'atlas-valva-mitralis',
    name: 'Katup Mitral (Valva Bicuspidalis)',
    latinName: 'Valva atrioventricularis sinistra',
    species: ['Dog', 'Cat', 'Horse', 'Cattle'],
    system: 'Cardiovascular',
    organ: 'Katup Jantung',
    description: 'Katup atrioventrikular berdaun dua yang membatasi atrium sinistrum dan ventriculus sinister. Diperkuat oleh anulus fibrosus cordis dan chordae tendineae yang menempel pada mm. papillares.',
    function: 'Menutup rapat selama ejeksi sistol ventrikel untuk mencegah regurgitasi darah ke sirkulasi vena pulmonalis.',
    clinicalRelevance: 'Endokardiosis mitral menyebabkan murmur sistolik regurgitan derajat I-VI di apeks kiri, memicu kardiomegali eksentrik kiri dan edema pulmo.',
    imageUrl: ASSETS.crossSection,
    relatedMaterialIds: ['mat-cardio-1'],
    relatedQuizId: 'quiz-cardio-1',
    relatedCaseId: 'case-feline-dyspnea',
    isFavorite: false
  },
  {
    id: 'atlas-aorta-arcus',
    name: 'Arcus Aortae & Vasa Coronaria',
    latinName: 'Arcus aortae et aa. coronariae',
    species: ['Dog', 'Cat', 'Horse', 'Cattle'],
    system: 'Cardiovascular',
    organ: 'Pembuluh Darah Besar',
    description: 'Lengkung arteri elastis utama yang keluar dari ventrikel kiri. Mempercabangkan a. coronaria di sinus aortae, truncus brachiocephalicus, dan a. subclavia sinistra (pada karnivora).',
    function: 'Konduksi darah oksigenasi tekanan tinggi ke seluruh tubuh serta menyediakan efek Windkessel untuk meratakan pulsasi aliran darah kapiler.',
    clinicalRelevance: 'Persistent Right Aortic Arch (PRAA) merupakan anomali vaskular cincin kongenital yang menjepit esofagus setinggi basis cordis, memicu regurgitasi dan megaesofagus pada anak anjing.',
    imageUrl: ASSETS.bloodVessels,
    relatedMaterialIds: ['mat-cardio-1', 'mat-cardio-2'],
    relatedQuizId: 'quiz-cardio-1',
    isFavorite: true
  },
  {
    id: 'atlas-pulmo',
    name: 'Paru-paru (Pulmo)',
    latinName: 'Pulmo dexter et sinister',
    species: ['Dog', 'Cat', 'Horse', 'Cattle'],
    system: 'Respiratory',
    organ: 'Paru',
    description: 'Organ respirasi spons elastis bilateral yang menempati cavum thoracis. Memiliki facies costalis, facies mediastinalis, dan facies diaphragmatica dengan pembagian lobus spesifik per spesies.',
    function: 'Pertukaran gas hematosis (difusi oksigen dari alveolus ke kapiler darah dan eliminasi karbon dioksida), termoregulasi panting pada karnivora, serta pemeliharaan pH darah.',
    clinicalRelevance: 'Pneumonia aspirasi pasca megaesofagus atau sedasi; edema pulmonal kardiogenik; kontusio paru pasca trauma kecelakaan kendaraan.',
    imageUrl: ASSETS.atlasLithograph,
    relatedMaterialIds: ['mat-respi-1'],
    relatedCaseId: 'case-feline-dyspnea',
    isFavorite: false
  },
  {
    id: 'atlas-rumen',
    name: 'Rumen & Kompleks Lambung Ruminansia',
    latinName: 'Rumen, Reticulum, Omasum, Abomasum',
    species: ['Cattle'],
    system: 'Digestive',
    organ: 'Lambung Depan',
    description: 'Organ fermentasi anaerobik raksasa berkapasitas 100-200 liter pada sapi dewasa. Dilapisi mukosa berpapila pipih tanpa kelenjar (proventriculus), menampung miliaran bakteri selulolitik dan protozoa.',
    function: 'Fermentasi serat kasar selulosa dan hemiselulosa menjadi Volatile Fatty Acids (asetat, propionat, butirat) sebagai sumber energi utama ruminansia.',
    clinicalRelevance: 'Asidosis rumen laktat akut akibat kelebihan konsentrat karbohidrat cepat fermentasi; Timpani rumen (bloat/kembung busa); Retikuloperitonitis traumatika (Hardware disease).',
    imageUrl: ASSETS.atlasLithograph,
    relatedMaterialIds: [],
    isFavorite: false
  },
  {
    id: 'atlas-ren',
    name: 'Ginjal (Ren)',
    latinName: 'Ren canis, felis, bovis, equi',
    species: ['Dog', 'Cat', 'Horse', 'Cattle'],
    system: 'Urinary',
    organ: 'Ginjal',
    description: 'Organ retroperitoneal berpasangan pembentuk urin. Bentuk: bean-shaped unipapillar (anjing/kucing), lobulated multipapillar (sapi), heart-shaped unilateral kanan (kuda).',
    function: 'Filtrasi glomerulus, reabsorpsi tubulus, sekresi zat sisa metabolik (urea, kreatinin), eritropoietin, aktivasi vitamin D, dan regulasi tekanan darah renin-angiotensin.',
    clinicalRelevance: 'Chronic Kidney Disease (CKD) dengan azotemia dan proteinuria pada kucing geriatri; nefrolitiasis kalsium oksalat atau struvit.',
    imageUrl: ASSETS.crossSection,
    relatedMaterialIds: [],
    relatedCaseId: 'case-feline-dyspnea',
    isFavorite: true
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-welcome',
    title: 'Selamat Datang di VETORA 🌸',
    message: 'Ruang belajar personal kedokteran hewan FKH UGM untuk Bulan. Mulai jelajahi materi Semester 3, atur jadwal praktikum, dan uji pemahamanmu!',
    type: 'system',
    timestamp: 'Hari ini',
    isRead: false,
    link: '/courses'
  }
];

export const INITIAL_PPDH_RECORDS: PPDHRecord[] = [];

export const INITIAL_STUDY_SESSIONS: StudySessionLog[] = [];

