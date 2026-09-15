import { Topic } from '../../types';

export const OFFICIAL_TOPICS: Topic[] = [
  // Anatomi Veteriner I (Semester 1)
  {
    id: 'topic-anatomi-osteologi',
    courseId: 'course-anatomi-vet-1',
    title: 'Osteologia Komparatif Mamalia Domestik',
    description: 'Studi komparasi os skeleton axiale dan appendiculare pada anjing, kucing, sapi, dan kuda.',
    order: 1,
    progress: 0,
    materialsCount: 2,
    quizCount: 2,
    flashcardDeckId: 'deck-osteologi-s1',
    subtopics: ['Skeleton Axiale (Vertebrae, Costae, Sternum)', 'Skeleton Appendiculare', 'Tanda-tanda Khusus Tulang'],
    sourceUrl: 'https://fkh.ugm.ac.id',
    verified: true
  },
  {
    id: 'topic-anatomi-artrologi',
    courseId: 'course-anatomi-vet-1',
    title: 'Artrologia & Persendian Hewan',
    description: 'Klasifikasi persendian synarthrosis, amphiarthrosis, dan diarthrosis (synovial joint).',
    order: 2,
    progress: 0,
    materialsCount: 1,
    quizCount: 1,
    subtopics: ['Struktur Kapsul Sendi & Cairan Sinovial', 'Ligamen Penopang Sendi', 'Mekanika Gerak Sendi'],
    sourceUrl: 'https://fkh.ugm.ac.id',
    verified: true
  },
  {
    id: 'topic-anatomi-miologi',
    courseId: 'course-anatomi-vet-1',
    title: 'Miologia Truncus & Extremitas',
    description: 'Origo, insertio, inervasi, dan fungsi kelompok muskulus pada tubuh hewan.',
    order: 3,
    progress: 0,
    materialsCount: 1,
    quizCount: 1,
    subtopics: ['Musculi Thoracis & Abdominis', 'Musculi Extremitatis Thoracicae', 'Musculi Extremitatis Pelvinae'],
    sourceUrl: 'https://fkh.ugm.ac.id',
    verified: true
  },

  // Fisiologi Veteriner II (Semester 3)
  {
    id: 'top-1',
    courseId: 'course-fisiologi-vet-2',
    title: 'Fisiologi Sistem Kardiovaskular & Hemodinamika',
    description: 'Siklus kardiak, regulasi tekanan darah, elektrofisiologi sel miokardium, dan reflek baroreseptor.',
    order: 1,
    progress: 0,
    materialsCount: 2,
    quizCount: 1,
    flashcardDeckId: 'deck-1',
    subtopics: ['Fase Siklus Kardiak', 'Refleks Baroreseptor', 'Persamaan Hagen-Poiseuille'],
    sourceUrl: 'https://fkh.ugm.ac.id',
    verified: true
  },
  {
    id: 'top-2',
    courseId: 'course-fisiologi-vet-2',
    title: 'Fisiologi Digesti Ruminansia & Mikrobiom Rumen',
    description: 'Fermentasi anaerob di retikulorumen, motilitas siklus primer/sekunder, dan biosintesis VFA (asetat, propionat, butirat).',
    order: 2,
    progress: 0,
    materialsCount: 2,
    quizCount: 1,
    flashcardDeckId: 'deck-2',
    subtopics: ['Siklus Kontraksi Retikulorumen', 'Sintesis Asam Lemak Terbang (VFA)', 'Metabolisme Urea & Protein Rumen'],
    sourceUrl: 'https://fkh.ugm.ac.id',
    verified: true
  },
  {
    id: 'top-3',
    courseId: 'course-fisiologi-vet-2',
    title: 'Fisiologi Renal, Filtrasi Glomerulus & Keseimbangan Elektrolit',
    description: 'Glomerular Filtration Rate (GFR), reabsorpsi tubulus, sistem renin-angiotensin-aldosteron (RAAS), dan mekanisme countercurrent.',
    order: 3,
    progress: 0,
    materialsCount: 1,
    quizCount: 1,
    subtopics: ['Dinamika Filtrasi Glomerulus', 'Aksis RAAS', 'Gradien Meduler & ADH'],
    sourceUrl: 'https://fkh.ugm.ac.id',
    verified: true
  },

  // Histologi Veteriner II (Semester 3)
  {
    id: 'top-4',
    courseId: 'course-histologi-vet-2',
    title: 'Mikroarsitektur Organ Limfoid & Pertahanan Imun',
    description: 'Struktur histologis nodus limfatikus, pulpa merah dan pulpa putih limpa, timus, dan tonsil.',
    order: 1,
    progress: 0,
    materialsCount: 2,
    quizCount: 1,
    flashcardDeckId: 'deck-3',
    subtopics: ['Arsitektur Nodus Limfatikus', 'Pulpa Putih & Splenosit', 'Involusi Timus'],
    sourceUrl: 'https://fkh.ugm.ac.id',
    verified: true
  },
  {
    id: 'top-5',
    courseId: 'course-histologi-vet-2',
    title: 'Mikroskopis Sistem Pencernaan & Kelenjar Aksesori',
    description: 'Histologi dinding traktus gastrointestinal (mukosa, submukosa, muskularis, serosa) dan lobulus hepar (triad porta).',
    order: 2,
    progress: 0,
    materialsCount: 2,
    quizCount: 1,
    subtopics: ['Vili Usus & Kriptus Lieberkuhn', 'Triad Porta & Asinus Rapapport', 'Asinus Pankreas Eksokrin'],
    sourceUrl: 'https://fkh.ugm.ac.id',
    verified: true
  },

  // Mikrobiologi Medis I (Semester 3)
  {
    id: 'top-6',
    courseId: 'course-mikrobiologi-1',
    title: 'Bakteriologi Medis: Kokus & Batang Gram Positif',
    description: 'Karakteristik biologis dan uji patogenisitas Staphylococcus, Streptococcus, Bacillus anthracis, dan Clostridium.',
    order: 1,
    progress: 0,
    materialsCount: 2,
    quizCount: 1,
    flashcardDeckId: 'deck-4',
    subtopics: ['Uji Katalase & Koagulase Stafilokokus', 'Pola Hemolisis Streptokokus', 'Spora Bacillus & Clostridium'],
    sourceUrl: 'https://fkh.ugm.ac.id',
    verified: true
  },
  {
    id: 'top-7',
    courseId: 'course-mikrobiologi-1',
    title: 'Bakteri Gram Negatif & Enterobacteriaceae Veteriner',
    description: 'Patogenesis Escherichia coli patogen (ETEC, EHEC), Salmonella enterica, dan Pasteurella multocida.',
    order: 2,
    progress: 0,
    materialsCount: 2,
    quizCount: 1,
    subtopics: ['Antigen Somatik O, Flagelar H, Kapsul K', 'Uji Biokimia IMViC', 'Mekanisme Endotoksin LPS'],
    sourceUrl: 'https://fkh.ugm.ac.id',
    verified: true
  },

  // Farmakologi Umum (Semester 3)
  {
    id: 'top-8',
    courseId: 'course-farmakologi-umum',
    title: 'Farmakokinetika Klinis: Absorpsi, Distribusi, Metabolisme, Ekskresi',
    description: 'Model kompartemen farmakokinetik, bioavailabilitas (F), volume distribusi (Vd), klirens, dan waktu paruh eliminasi (t1/2).',
    order: 1,
    progress: 0,
    materialsCount: 2,
    quizCount: 1,
    flashcardDeckId: 'deck-5',
    subtopics: ['Parameter ADME Hewan', 'Metabolisme Fase I & II di Hepar', 'Konstanta Kecepatan Eliminasi'],
    sourceUrl: 'https://fkh.ugm.ac.id',
    verified: true
  },
  {
    id: 'top-9',
    courseId: 'course-farmakologi-umum',
    title: 'Farmakodinamika & Farmakologi Sistem Saraf Otonom',
    description: 'Aktivasi reseptor adrenergik (alfa-1, alfa-2, beta-1, beta-2) dan kolinergik (muskarinik, nikotinik) pada hewan.',
    order: 2,
    progress: 0,
    materialsCount: 2,
    quizCount: 1,
    subtopics: ['Reseptor Kolinergik M & N', 'Agonis Alfa-2 Adrenergik (Xylazine)', 'Antikolinergik Atropin Sulfat'],
    sourceUrl: 'https://fkh.ugm.ac.id',
    verified: true
  },

  // Patologi Umum (Semester 4)
  {
    id: 'top-10',
    courseId: 'course-patologi-umum',
    title: 'Jejas Seluler, Degenerasi, & Nekrosis',
    description: 'Morfologi nekrosis koagulativa, kaseosa, likuefaktif, gangrenosa, dan penimbunan intraseluler.',
    order: 1,
    progress: 0,
    materialsCount: 2,
    quizCount: 1,
    subtopics: ['Nekrosis Koagulativa vs Kaseosa', 'Degenerasi Hidropik & Perlemakan', 'Kalsifikasi Distrofik'],
    sourceUrl: 'https://fkh.ugm.ac.id',
    verified: true
  },
  {
    id: 'top-11',
    courseId: 'course-patologi-umum',
    title: 'Gangguan Sirkulasi, Hemostasis, & Trombosis',
    description: 'Patogenesis hiperemia, kongesti, perdarahan, edema fovea, triad Virchow trombosis, dan infark.',
    order: 2,
    progress: 0,
    materialsCount: 2,
    quizCount: 1,
    subtopics: ['Triad Virchow Trombosis', 'Mekanisme Transudat vs Eksudat', 'Emboli & Infark Jaringan'],
    sourceUrl: 'https://fkh.ugm.ac.id',
    verified: true
  },

  // Bedah Umum & Radiologi (Semester 6)
  {
    id: 'top-12',
    courseId: 'course-bedah-umum',
    title: 'Asepsis Bedah, Instrumen, & Pola Penjahitan',
    description: 'Prinsip Halsted asepsis bedah, penanganan instrumen scalpel, pinset, hemostat, dan pola jahitan Mayo/Lambert/Cushing.',
    order: 1,
    progress: 0,
    materialsCount: 2,
    quizCount: 1,
    subtopics: ['Prinsip Halsted Bedah', 'Pola Jahitan Inverting (Lembert, Connell)', 'Karakteristik Benang Vicryl vs Monocryl'],
    sourceUrl: 'https://fkh.ugm.ac.id',
    verified: true
  },

  // Patologi Klinik (Semester 6)
  {
    id: 'top-13',
    courseId: 'course-patologi-klinik',
    title: 'Interpretasi Leukogram & Respon Inflamasi Sistemik',
    description: 'Leukositosis neutrofilik, left shift degeneratif/regeneratif, stress leukogram glukokortikoid, dan eosinofilia.',
    order: 1,
    progress: 0,
    materialsCount: 2,
    quizCount: 1,
    subtopics: ['Left Shift Regeneratif vs Degeneratif', 'Stress Leukogram Anjing', 'Neutropenia Toksik'],
    sourceUrl: 'https://fkh.ugm.ac.id',
    verified: true
  },

  // PPDH Bedah & Radiologi
  {
    id: 'top-ppdh-bedah',
    courseId: 'course-ppdh-bedah-radiologi',
    title: 'Teknik Bedah Laparotomi Eksplorasi & Enterotomi',
    description: 'Prosedur pembedahan rongga abdomen, isolasi usus berongga, penanganan benda asing linier pada anjing/kucing.',
    order: 1,
    progress: 0,
    materialsCount: 2,
    quizCount: 1,
    subtopics: ['Insisi Linea Alba Steril', 'Teknik Enterotomi Anti-Mesenterika', 'Uji Kebocoran Usus Saline Bubble'],
    sourceUrl: 'https://fkh.ugm.ac.id',
    verified: true
  },

  // PPDH Penyakit Dalam Hewan Kecil
  {
    id: 'top-ppdh-interna',
    courseId: 'course-ppdh-interna-hewan-kecil',
    title: 'Protokol Terapi Cairan Kritis & Gangguan Ginjal Akut',
    description: 'Kalkulasi rehidrasi defisit cairan, maintenance harian, ongoing losses, dan pemantauan laju produksi urine.',
    order: 1,
    progress: 0,
    materialsCount: 2,
    quizCount: 1,
    subtopics: ['Estimasi % Dehidrasi Fisik', 'Formula Total Cairan 24 Jam', 'Pilihan Kristaloid Ringer Laktat vs NaCl'],
    sourceUrl: 'https://fkh.ugm.ac.id',
    verified: true
  }
];
