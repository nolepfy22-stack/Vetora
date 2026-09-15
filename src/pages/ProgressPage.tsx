import React from 'react';
import { useApp } from '../context/AppContext';
import {
  LineChart,
  Flame,
  BookOpen,
  FileText,
  Layers,
  HelpCircle,
  Stethoscope,
  Clock,
  Award,
  Calendar,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { Card, SectionHeader, ProgressRing, Button, Badge } from '../components/common/UI';
import { getRelativeTime } from '../utils/dateUtils';
import { OFFICIAL_SEMESTERS } from '../data/curriculum/semesters';

export const ProgressPage: React.FC = () => {
  const { user, stats, overallProgress, studySessions, courses, achievements, navigate } = useApp();
  const currentSemesterNumber = user?.currentSemester || 3;

  // Dynamically calculate progress per semester from actual courses state
  const semesterBreakdown = OFFICIAL_SEMESTERS.map((sem) => {
    const semCourses = courses.filter((c) => c.semesterNumber === sem.number);
    const total = semCourses.length;
    const completed = semCourses.filter((c) => (c.progress || 0) >= 100).length;
    const progress =
      total > 0 ? Math.round(semCourses.reduce((sum, c) => sum + (c.progress || 0), 0) / total) : 0;
    return {
      sem: sem.number,
      title: sem.title,
      completed,
      total,
      progress
    };
  });

  // Calculate PPDH rotation progress
  const ppdhCourses = courses.filter((c) => c.isPPDH || c.id.startsWith('course-ppdh'));
  const ppdhTotal = ppdhCourses.length || 5;
  const ppdhCompleted = ppdhCourses.filter((c) => (c.progress || 0) >= 100).length;
  const ppdhProgress =
    ppdhTotal > 0
      ? Math.round(ppdhCourses.reduce((sum, c) => sum + (c.progress || 0), 0) / ppdhTotal)
      : 0;

  const allBreakdown = [
    ...semesterBreakdown,
    {
      sem: 'PPDH',
      title: 'Koasistensi Rumah Sakit',
      completed: ppdhCompleted,
      total: ppdhTotal,
      progress: ppdhProgress
    }
  ];

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-6 border border-[#F3E8E8] shadow-[0_2px_12px_-1px_rgba(45,41,38,0.03)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-14 h-14 rounded-2xl bg-[#FFF0F5] text-[#B80049] flex items-center justify-center flex-shrink-0 shadow-2xs">
            <LineChart className="w-7 h-7" />
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#1E1B18] tracking-tight">
                Study Progress & Analytics
              </h1>
              <Badge variant="primary">Semester {currentSemesterNumber}</Badge>
            </div>
            <p className="text-xs sm:text-sm text-[#5B3F43] mt-0.5">
              Pantau kemajuan kurikulum, retensi hafalan, dan log waktu belajar mandirimu di FKH UGM.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-[#FAF7F5] px-4 py-3 rounded-xl border border-[#F3E8E8] flex-shrink-0">
          <ProgressRing
            percentage={overallProgress}
            size={68}
            strokeWidth={6}
            label={`${overallProgress}%`}
          />
          <div className="flex flex-col">
            <span className="text-xs font-bold text-[#1E1B18]">Kurikulum Aktif</span>
            <span className="text-[11px] text-[#5B3F43]">
              {stats.materialsCompleted} dari {stats.totalMaterials} materi tuntas
            </span>
            <span className="text-[10px] text-[#B80049] font-bold mt-1">
              {overallProgress === 0
                ? '🌱 Siap memulai perjalanan belajarmu!'
                : overallProgress < 50
                ? '✨ Kemajuan yang baik, lanjutkan!'
                : '🏆 Pencapaian luar biasa!'}
            </span>
          </div>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Streak */}
        <Card padding="md" className="flex flex-col justify-between gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#5B3F43]">Study Streak</span>
            <div className="w-8 h-8 rounded-xl bg-[#FFF0F5] text-[#B80049] flex items-center justify-center">
              <Flame className="w-4 h-4 fill-[#B80049]" />
            </div>
          </div>
          <div>
            <span className="font-serif-display text-3xl font-bold text-[#1E1B18]">
              {user?.studyStreakDays || 0} <span className="text-sm font-sans font-medium text-[#5B3F43]">hari</span>
            </span>
            <p className="text-[11px] text-[#5B3F43] mt-0.5">Konsistensi belajar harian</p>
          </div>
        </Card>

        {/* Flashcards Mastered */}
        <Card padding="md" className="flex flex-col justify-between gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#5B3F43]">Flashcards Dikuasai</span>
            <div className="w-8 h-8 rounded-xl bg-[#FFF0F5] text-[#B80049] flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="font-serif-display text-3xl font-bold text-[#1E1B18]">
              {stats.flashcardsMastered} <span className="text-sm font-sans font-medium text-[#5B3F43]">/ {stats.totalFlashcards}</span>
            </span>
            <p className="text-[11px] text-[#5B3F43] mt-0.5">Spaced repetition interval</p>
          </div>
        </Card>

        {/* Quiz Accuracy */}
        <Card padding="md" className="flex flex-col justify-between gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#5B3F43]">Akurasi Kuis</span>
            <div className="w-8 h-8 rounded-xl bg-[#C5E7E1] text-[#2E4C48] flex items-center justify-center">
              <HelpCircle className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="font-serif-display text-3xl font-bold text-[#1E1B18]">
              {stats.avgQuizAccuracy || 0}<span className="text-sm font-sans font-medium text-[#5B3F43]">%</span>
            </span>
            <p className="text-[11px] text-[#5B3F43] mt-0.5">Dari {stats.quizzesCompleted} kuis selesai</p>
          </div>
        </Card>

        {/* Study Hours */}
        <Card padding="md" className="flex flex-col justify-between gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#5B3F43]">Total Waktu Belajar</span>
            <div className="w-8 h-8 rounded-xl bg-[#F5ECE7] text-[#5B3F43] flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="font-serif-display text-3xl font-bold text-[#1E1B18]">
              {Math.round((user?.totalStudyMinutes || 0) / 60)} <span className="text-sm font-sans font-medium text-[#5B3F43]">jam</span>
            </span>
            <p className="text-[11px] text-[#5B3F43] mt-0.5">Tercatat di platform VETORA</p>
          </div>
        </Card>
      </div>

      {/* Main Grid: 70% Curricular Roadmap, 30% Recent Activity & Badges */}
      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_340px] gap-6 w-full">
        {/* Left: Semester Completion Overview */}
        <div className="flex flex-col gap-4">
          <SectionHeader
            title="Progres per Semester"
            subtitle="Perjalanan akademik dari Preklinis hingga Koasistensi PPDH"
            icon={BookOpen}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {allBreakdown.map((item, idx) => (
              <Card
                key={idx}
                padding="md"
                className={`flex flex-col justify-between gap-3 ${
                  item.sem === currentSemesterNumber ? 'ring-2 ring-[#B80049]/20 bg-[#FFF0F5]/20' : ''
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-serif-display font-bold text-sm text-[#1E1B18]">
                        Semester {item.sem}
                      </span>
                      {item.sem === currentSemesterNumber && (
                        <span className="px-1.5 py-0.2 rounded-full bg-[#B80049] text-white text-[10px] font-bold">
                          Sedang Berjalan
                        </span>
                      )}
                      {item.progress === 100 && (
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                      )}
                    </div>
                    <p className="text-xs text-[#5B3F43] mt-0.5">{item.title}</p>
                  </div>
                  <span className="text-xs font-bold text-[#B80049]">
                    {item.progress}%
                  </span>
                </div>

                <div>
                  <div className="w-full h-1.5 rounded-full bg-[#F5ECE7] overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        item.progress === 100 ? 'bg-emerald-600' : 'bg-[#B80049]'
                      }`}
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-[#8F6F73] mt-1.5">
                    <span>{item.completed} dari {item.total} mata kuliah selesai</span>
                    <button
                      onClick={() => navigate('/courses')}
                      className="text-[#B80049] font-medium hover:underline flex items-center gap-0.5"
                    >
                      Buka <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Right: Study Log & Badges */}
        <div className="flex flex-col gap-6">
          {/* Recent Sessions */}
          <Card padding="md" className="flex flex-col gap-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#F3E8E8]">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#B80049]" />
                <h3 className="font-serif-display font-bold text-base text-[#1E1B18]">
                  Sesi Belajar Terbaru
                </h3>
              </div>
            </div>

            {studySessions.length === 0 ? (
              <div className="py-6 px-3 text-center flex flex-col items-center justify-center text-[#8F6F73] gap-2">
                <div className="w-10 h-10 rounded-full bg-[#FAF7F5] flex items-center justify-center text-[#8F6F73]">
                  <Clock className="w-5 h-5 opacity-60" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-bold text-[#1E1B18]">Belum ada aktivitas belajar</span>
                  <span className="text-[11px] text-[#5B3F43] max-w-[200px] leading-relaxed">
                    Sesi belajar materi, flashcard, dan kuis akan otomatis tercatat di sini.
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-2.5">
                {studySessions.slice(0, 5).map((session) => (
                  <div
                    key={session.id}
                    className="flex items-start justify-between gap-2 p-2.5 rounded-xl bg-[#FAF7F5] border border-[#F3E8E8]"
                  >
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-bold text-[#1E1B18] truncate">
                        {session.title}
                      </span>
                      <span className="text-[11px] text-[#5B3F43] truncate">
                        {session.details}
                      </span>
                      <span className="text-[10px] text-[#8F6F73] mt-0.5">
                        {getRelativeTime(session.timestamp)}
                      </span>
                    </div>
                    <span className="text-[10px] text-[#8F6F73] font-semibold whitespace-nowrap">
                      {session.durationMinutes} menit
                    </span>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Academic Achievements */}
          <Card padding="md" className="flex flex-col gap-3">
            <div className="flex items-center gap-2 pb-2 border-b border-[#F3E8E8]">
              <Award className="w-4 h-4 text-[#B80049]" />
              <h3 className="font-serif-display font-bold text-base text-[#1E1B18]">
                Lencana Prestasi
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {achievements.map((ach) => (
                <div
                  key={ach.id}
                  className={`p-3 rounded-xl border flex flex-col items-center text-center gap-1 transition-all ${
                    ach.isUnlocked
                      ? 'bg-[#FFF0F5] border-[#FFD9DE]'
                      : 'bg-[#FAF7F5] border-[#F3E8E8] opacity-75'
                  }`}
                >
                  <span className="text-xl">{ach.icon}</span>
                  <span className="text-xs font-bold text-[#1E1B18]">{ach.title}</span>
                  <span className="text-[10px] text-[#5B3F43]">
                    {ach.isUnlocked
                      ? 'Tercapai 🏆'
                      : `${ach.currentCount}/${ach.targetCount} (${ach.progressPercent}%)`}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

