import { Course } from '../../types';
import { ASSETS } from '../mockData';

export interface PPDHRotationDetail {
  id: string;
  code: string;
  name: string;
  credits: number;
  durationWeeks: number;
  clinicalLocation: string;
  supervisors: string;
  competencies: string[];
  prerequisites: string;
  sourceUrl: string;
  sourceTitle: string;
  verified: boolean;
}

export const PPDH_ROTATION_DETAILS: PPDHRotationDetail[] = [
  {
    id: 'ppdh-bedah-radiologi',
    code: 'PPDH-501',
    name: 'Koasistensi Ilmu Bedah & Radiologi Veteriner',
    credits: 4,
    durationWeeks: 6,
    clinicalLocation: 'Instalasi Bedah & Radiologi RSH Prof. Soeparwi UGM',
    supervisors: 'Staf Departemen Bedah & Radiologi FKH UGM',
    competencies: [
      'Menjadi operator bedah mandiri untuk tindakan bedah minor (kastrasi, ovariohisterektomi, debridemen luka)',
      'Menjadi asisten bedah pertama pada operasi ortopedi, laparatomi eksplorasi, dan torakotomi',
      'Mengoperasikan mesin X-ray, ultrasonografi (USG abdomen/kardio), dan proteksi radiasi',
      'Manajemen anestesi inhalasi isofluran dan pemantauan vital sign intraoperatif'
    ],
    prerequisites: 'Lulus Sarjana Kedokteran Hewan (S.K.H.)',
    sourceUrl: 'https://fkh.ugm.ac.id',
    sourceTitle: 'Buku Panduan PPDH Rotasi Bedah FKH UGM',
    verified: true
  },
  {
    id: 'ppdh-interna-hewan-kecil',
    code: 'PPDH-502',
    name: 'Koasistensi Ilmu Penyakit Dalam Hewan Kecil',
    credits: 4,
    durationWeeks: 6,
    clinicalLocation: 'Poliklinik Rawat Jalan & Rawat Inap RSH Prof. Soeparwi UGM',
    supervisors: 'Staf Dokter Spesialis Penyakit Dalam Hewan Kecil FKH UGM',
    competencies: [
      'Pemeriksaan fisik pasien anjing/kucing dan penetapan diferensial diagnosis berbasis SOAP',
      'Interpretasi panel laboratorium darah, urine, feses, dan sitologi cairan efusi',
      'Penyusunan protokol terapi cairan infus, pemberian obat parenteral, dan diet nutrisi klinis',
      'Komunikasi terapeutik dan edukasi pemilik hewan (client communication)'
    ],
    prerequisites: 'Lulus Sarjana Kedokteran Hewan (S.K.H.)',
    sourceUrl: 'https://fkh.ugm.ac.id',
    sourceTitle: 'Buku Panduan PPDH Rotasi Penyakit Dalam FKH UGM',
    verified: true
  },
  {
    id: 'ppdh-hewan-besar',
    code: 'PPDH-503',
    name: 'Koasistensi Ilmu Penyakit Hewan Besar & Ruminansia',
    credits: 4,
    durationWeeks: 6,
    clinicalLocation: 'RSH Prof. Soeparwi, Balai Ternak Mitra & Koperasi Peternakan Sapi Perah',
    supervisors: 'Staf Bagian Penyakit Ruminansia FKH UGM',
    competencies: [
      'Diagnosis dan terapi penyakit kembung (bloat), displacement abomasum, dan hipokalsemia pada sapi',
      'Penanganan penyakit pernapasan komplek (BRDC) dan mastitis subklinis/klinis',
      'Pemeriksaan kesehatan kawanan ternak (herd health management) dan penanganan kuku (hoof trimming)'
    ],
    prerequisites: 'Lulus Sarjana Kedokteran Hewan (S.K.H.)',
    sourceUrl: 'https://fkh.ugm.ac.id',
    sourceTitle: 'Buku Panduan PPDH Rotasi Hewan Besar FKH UGM',
    verified: true
  },
  {
    id: 'ppdh-reproduksi-kebidanan',
    code: 'PPDH-504',
    name: 'Koasistensi Reproduksi, Kebidanan & Gangguan Reproduksi',
    credits: 4,
    durationWeeks: 6,
    clinicalLocation: 'RSH Prof. Soeparwi & Balai Inseminasi Buatan (BIB)',
    supervisors: 'Staf Departemen Reproduksi dan Kebidanan FKH UGM',
    competencies: [
      'Palpasi rektal akurat untuk penentuan kebuntingan (PKB) dan patologi ovarium/uterus sapi',
      'Penanganan distokia, koreksi letak fetus abnormal, dan operasi caesar ternak',
      'Evaluasi kualitas sperma dan teknik inseminasi buatan (IB)',
      'Penanganan kasus retensio sekundinarum, prolapsus uteri, dan endometritis'
    ],
    prerequisites: 'Lulus Sarjana Kedokteran Hewan (S.K.H.)',
    sourceUrl: 'https://fkh.ugm.ac.id',
    sourceTitle: 'Buku Panduan PPDH Rotasi Reproduksi FKH UGM',
    verified: true
  },
  {
    id: 'ppdh-patologi-klinik',
    code: 'PPDH-505',
    name: 'Koasistensi Patologi Klinik & Diagnosa Laboratorik',
    credits: 3,
    durationWeeks: 4,
    clinicalLocation: 'Laboratorium Diagnostik RSH Prof. Soeparwi & Lab Patologi Klinik FKH UGM',
    supervisors: 'drh. Sitarina Widyarini, M.P., Ph.D.',
    competencies: [
      'Melakukan analisis hematologi otomatis dan diferensiasi sel darah putih mikroskopik manual',
      'Uji biokimia serum darah menggunakan clinical chemistry analyzer',
      'Analisis sedimentasi urin, kristal, BJ urin, dan dipstick kimia',
      'Sitologi jarum halus (Fine Needle Aspiration Cytology/FNAC) untuk penegakan tumor/infeksi'
    ],
    prerequisites: 'Lulus Sarjana Kedokteran Hewan (S.K.H.)',
    sourceUrl: 'https://fkh.ugm.ac.id',
    sourceTitle: 'Buku Panduan PPDH Rotasi Patologi Klinik FKH UGM',
    verified: true
  },
  {
    id: 'ppdh-patologi-nekropsi',
    code: 'PPDH-506',
    name: 'Koasistensi Patologi Anatomi & Nekropsi Diagnostik',
    credits: 3,
    durationWeeks: 4,
    clinicalLocation: 'Ruang Nekropsi Departemen Patologi FKH UGM & BBVet Wates',
    supervisors: 'Staf Departemen Patologi FKH UGM',
    competencies: [
      'Melakukan prosedur nekropsi sistematis pada karkas mamalia, unggas, dan hewan laboratorium',
      'Identifikasi lesi makroskopis dan pengambilan sampel jaringan organ yang tepat untuk histopatologi',
      'Penulisan laporan nekropsi resmi dan kesimpulan sebab kematian (cause of death)'
    ],
    prerequisites: 'Lulus Sarjana Kedokteran Hewan (S.K.H.)',
    sourceUrl: 'https://fkh.ugm.ac.id',
    sourceTitle: 'Buku Panduan PPDH Rotasi Patologi FKH UGM',
    verified: true
  },
  {
    id: 'ppdh-kesmavet-rph',
    code: 'PPDH-507',
    name: 'Koasistensi Kesmavet, Higiene Pangan & Rumah Pemotongan Hewan (RPH)',
    credits: 4,
    durationWeeks: 5,
    clinicalLocation: 'RPH Giwangan Yogyakarta & Laboratorium Kesmavet FKH UGM',
    supervisors: 'Staf Departemen Kesmavet FKH UGM',
    competencies: [
      'Inspeksi ante-mortem dan post-mortem sapi, kambing, dan unggas di RPH',
      'Penilaian karkas halal dan penentuan status kelayakan konsumsi (fit, conditionally fit, condemned)',
      'Pengujian mikrobiologi produk hewani (Total Plate Count, E. coli, Salmonella) dan residu antibiotik',
      'Audit sanitasi dan standar hygiene rantai dingin (cold chain system)'
    ],
    prerequisites: 'Lulus Sarjana Kedokteran Hewan (S.K.H.)',
    sourceUrl: 'https://fkh.ugm.ac.id',
    sourceTitle: 'Buku Panduan PPDH Rotasi Kesmavet FKH UGM',
    verified: true
  },
  {
    id: 'ppdh-dinas-karantina',
    code: 'PPDH-508',
    name: 'Koasistensi Dinas Peternakan, Karantina & Kebijakan Veteriner',
    credits: 3,
    durationWeeks: 4,
    clinicalLocation: 'Balai Karantina Pertanian Yogyakarta (YIA) & Dinas Pertanian DIY',
    supervisors: 'Pejabat Otoritas Veteriner & Dokter Hewan Karantina',
    competencies: [
      'Pemeriksaan kelengkapan dokumen karantina hewan antar area dan ekspor-impor (HACCP, Health Certificate)',
      'Protokol surveilans epidemiologis penyakit menular eksotis (Avian Influenza, ASF, Rabies)',
      'Penerbitan Surat Keterangan Kesehatan Hewan (SKKH) sesuai regulasi perundangan'
    ],
    prerequisites: 'Lulus Sarjana Kedokteran Hewan (S.K.H.)',
    sourceUrl: 'https://fkh.ugm.ac.id',
    sourceTitle: 'Buku Panduan PPDH Rotasi Karantina & Kebijakan FKH UGM',
    verified: true
  },
  {
    id: 'ppdh-unggas-satwa-liar',
    code: 'PPDH-509',
    name: 'Koasistensi Kesehatan Unggas, Satwa Liar & Eksotik',
    credits: 4,
    durationWeeks: 5,
    clinicalLocation: 'Gembira Loka Zoo, Pusat Rehabilitasi Satwa & Farm Unggas Komersial',
    supervisors: 'Dokter Hewan Konservasi & Spesialis Unggas FKH UGM',
    competencies: [
      'Pemeriksaan klinis, nekropsi, dan diagnosis penyakit perunggasan skala industri',
      'Physical restraint dan chemical restraint satwa liar di lembaga konservasi',
      'Pemberian obat dan tindakan medis pada burung, reptil, dan satwa eksotik'
    ],
    prerequisites: 'Lulus Sarjana Kedokteran Hewan (S.K.H.)',
    sourceUrl: 'https://fkh.ugm.ac.id',
    sourceTitle: 'Buku Panduan PPDH Rotasi Unggas & Satwa Liar FKH UGM',
    verified: true
  },
  {
    id: 'ppdh-manajemen-etika-ukmppdh',
    code: 'PPDH-510',
    name: 'Manajemen Klinik, Etika Profesi & Persiapan UKMPPDH',
    credits: 7,
    durationWeeks: 8,
    clinicalLocation: 'RSH Prof. Soeparwi UGM & Pengurus Besar PDHI',
    supervisors: 'Pimpinan Rumah Sakit Hewan & Tim OSCE FKH UGM',
    competencies: [
      'Pengelolaan manajemen administrasi klinik hewan, SIPDRH, dan inventaris obat resep',
      'Penguasaan 10 stasiun Ujian OSCE (Objective Structured Clinical Examination) Nasional',
      'Kelulusan Uji Kompetensi Mahasiswa Pendidikan Profesi Dokter Hewan (UKMPPDH) Computer-Based Test (CBT)',
      'Penyumpahan Dokter Hewan resmi Republik Indonesia oleh Dekan FKH UGM'
    ],
    prerequisites: 'Menyelesaikan seluruh stase rotasi koasistensi PPDH 1-9',
    sourceUrl: 'https://fkh.ugm.ac.id',
    sourceTitle: 'Buku Panduan UKMPPDH & Kode Etik FKH UGM',
    verified: true
  }
];

export const PPDH_COURSES: Course[] = PPDHRotationDetailToCourses();

function PPDHRotationDetailToCourses(): Course[] {
  return PPDH_ROTATION_DETAILS.map((rot) => ({
    id: `course-${rot.id}`,
    courseCode: rot.code,
    courseName: rot.name,
    name: rot.name,
    code: rot.code,
    semester: 'ppdh',
    semesterNumber: 'ppdh',
    semesterId: 'sem-ppdh',
    sks: rot.credits,
    credits: rot.credits,
    category: 'Rotasi Koasistensi PPDH',
    prerequisites: [rot.prerequisites],
    description: `Rotasi klinis ${rot.durationWeeks} minggu di ${rot.clinicalLocation}. Fokus: ${rot.competencies.slice(0, 2).join('; ')}.`,
    learningObjectives: rot.competencies,
    topics: rot.competencies,
    sourceUrl: rot.sourceUrl,
    sourceTitle: rot.sourceTitle,
    sourceDate: '2024/2025',
    verified: true,
    contentCategory: 'officialContent',
    isClinical: true,
    publicMaterialAvailable: true,
    department: 'Program Studi Pendidikan Profesi Dokter Hewan (PPDH)',
    iconImage: ASSETS.iconInternalMed,
    materialsCount: 3,
    topicsCount: rot.competencies.length,
    progress: 0,
    instructor: rot.supervisors
  }));
}
