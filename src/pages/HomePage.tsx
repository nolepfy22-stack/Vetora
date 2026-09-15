import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ASSETS } from '../data/mockData';
import { ScheduleItem } from '../types';
import {
  BookOpen,
  ArrowRight,
  School,
  Heart,
  Calendar,
  Layers,
  HelpCircle,
  Stethoscope,
  Grid,
  Search,
  Clock,
  FileText,
  Sparkles,
  MapPin,
  Plus,
  CheckCircle,
  Circle,
  Trash2,
  X
} from 'lucide-react';
import { ProgressRing, Card, Button } from '../components/common/UI';
import { getRelativeTime, getWIBGreeting, getCurrentWIBDateString } from '../utils/dateUtils';
import { getCourseActionLabel } from '../utils/progressUtils';

export const HomePage: React.FC = () => {
  const {
    user,
    courses,
    topics,
    materials,
    overallProgress,
    stats,
    studySessions,
    recommendations,
    schedule,
    addScheduleItem,
    deleteScheduleItem,
    toggleCompleteScheduleItem,
    showToast,
    navigate
  } = useApp();

  const [atlasSearchTerm, setAtlasSearchTerm] = useState('');
  const [isAddScheduleOpen, setIsAddScheduleOpen] = useState(false);

  // New Schedule Item Form State
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState<ScheduleItem['type']>('Praktikum');
  const [newDate, setNewDate] = useState(getCurrentWIBDateString());
  const [newStartTime, setNewStartTime] = useState('08:00');
  const [newEndTime, setNewEndTime] = useState('10:00');
  const [newLocation, setNewLocation] = useState('Lab Anatomi FKH UGM');
  const [newCourseName, setNewCourseName] = useState('');

  // Authoritative current semester from user profile
  const currentSemesterNumber = user?.currentSemester || 3;
  const currentSemesterCourses = courses.filter((c) => c.semesterNumber === currentSemesterNumber);

  // Dynamic WIB Greeting
  const { greeting, icon } = getWIBGreeting(user?.nickname || user?.name || 'Bulan');

  // Active course for "Continue Learning"
  const activeCourse = courses.find((c) => c.id === 'course-anatomi-vet') || courses[0];
  const activeCourseMaterialsCount = materials.filter((m) => m.courseId === activeCourse?.id).length || activeCourse?.materialsCount || 0;
  const activeCourseTopicsCount = topics.filter((t) => t.courseId === activeCourse?.id).length || activeCourse?.topicsCount || 0;
  const isCourseCompleted = (activeCourse?.progress ?? 0) >= 100;
  const continueActionText = getCourseActionLabel(activeCourse?.progress ?? 0);

  const handleAtlasSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (atlasSearchTerm.trim()) {
      navigate(`/atlas?search=${encodeURIComponent(atlasSearchTerm.trim())}`);
    } else {
      navigate('/atlas');
    }
  };

  const handleCreateSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      showToast('Judul jadwal wajib diisi', 'warning');
      return;
    }

    addScheduleItem({
      title: newTitle.trim(),
      type: newType,
      date: newDate,
      startTime: newStartTime,
      endTime: newEndTime,
      location: newLocation.trim(),
      courseName: newCourseName.trim() || undefined,
      isCompleted: false
    });

    showToast('Jadwal baru berhasil ditambahkan! 📅', 'success');
    setIsAddScheduleOpen(false);
    setNewTitle('');
    setNewCourseName('');
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* 2-Column Responsive Dashboard Grid: Primary 70% | Secondary 30% */}
      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_340px] gap-6 w-full items-start">
        
        {/* ================= PRIMARY CONTENT COLUMN (~70%) ================= */}
        <div className="flex flex-col gap-6 min-w-0 w-full">
          
          {/* HERO GREETING BANNER */}
          <div className="rounded-3xl bg-white dark:bg-[#1E1A1C] border border-[#F3E8E8] dark:border-[#382F32] shadow-[0_2px_14px_-2px_rgba(45,41,38,0.04)] flex flex-col md:flex-row items-stretch overflow-hidden transition-colors">
            {/* Text & Stats side */}
            <div className="flex-1 p-6 md:p-7 flex flex-col justify-between min-w-0 z-10">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="font-serif-display text-2xl sm:text-3xl text-[#1E1B18] dark:text-[#FFF5F6] tracking-tight font-bold">
                    {greeting}, {user?.nickname || user?.name || 'Bulan'}
                  </h1>
                  <span className="text-xl select-none animate-pulse">{icon}</span>
                </div>
                <p className="text-xs sm:text-sm font-medium text-[#5B3F43] dark:text-[#D1B8BC]">
                  Keep going, you've got this! Semangat belajar untuk kedokteran hewan hari ini.
                </p>
                <p className="font-serif-display italic text-sm sm:text-base text-[#5B3F43]/90 dark:text-[#BAA0A5] mt-2 leading-relaxed">
                  “Langkah kecil setiap hari, akan membawamu ke dokter hewan hebat yang kamu impikan. ♡”
                </p>
              </div>

              {/* Status Chips */}
              <div className="flex flex-wrap items-center gap-2 pt-5 mt-2">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F5ECE7] dark:bg-[#2A2225] text-[#1E1B18] dark:text-[#E8D5D8] text-xs font-semibold">
                  <School className="w-3.5 h-3.5 text-[#B80049] dark:text-[#FFAEC0]" />
                  <span>Semester {currentSemesterNumber}</span>
                </div>

                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FAF7F5] dark:bg-[#241E20] border border-[#F3E8E8] dark:border-[#382F32] text-xs text-[#5B3F43] dark:text-[#D1B8BC]">
                  <span>
                    <strong className="text-[#B80049] dark:text-[#FFAEC0] font-bold">{overallProgress}%</strong> selesai
                  </span>
                  <div className="w-16 sm:w-20 h-2 rounded-full bg-[#FFD9DE] dark:bg-[#4A2630] overflow-hidden">
                    <div
                      className="h-full bg-[#B80049] dark:bg-[#E2165F] rounded-full transition-all duration-500"
                      style={{ width: `${overallProgress}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFF0F5] dark:bg-[#3D1A25] border border-[#FFD9DE] dark:border-[#5C2334] text-[#B80049] dark:text-[#FFAEC0] text-xs font-bold">
                  <Heart className="w-3.5 h-3.5 fill-[#B80049] dark:fill-[#FFAEC0]" />
                  <span>FKH UGM</span>
                </div>
              </div>
            </div>

            {/* Companion Illustration / Photo */}
            <div className="relative w-full md:w-60 lg:w-72 flex-shrink-0 min-h-[180px] bg-[#FAF7F5] dark:bg-[#282124] flex items-center justify-center overflow-hidden border-t md:border-t-0 md:border-l border-[#F3E8E8] dark:border-[#382F32]">
              <img
                src={ASSETS.catHero}
                alt="Gentle feline companion with cherry blossoms"
                className="w-full h-full object-cover object-center max-h-56 md:max-h-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-white/30 dark:from-black/30 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          {/* CONTINUE LEARNING SECTION */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#B80049] dark:text-[#FFAEC0]" />
                <h2 className="font-serif-display text-lg sm:text-xl font-bold text-[#1E1B18] dark:text-white">
                  Continue Learning
                </h2>
              </div>
              <button
                onClick={() => navigate('/materials')}
                className="text-xs font-semibold text-[#B80049] dark:text-[#FFAEC0] hover:text-[#E2165F] transition-colors flex items-center gap-1 cursor-pointer"
              >
                Lihat semua materi <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <Card padding="md" className="flex flex-col md:flex-row gap-5 items-start md:items-center justify-between">
              {/* Course Info */}
              <div
                onClick={() => navigate(`/courses/${activeCourse?.id || 'course-anatomi-vet'}`)}
                className="flex items-center gap-4 flex-1 min-w-0 cursor-pointer group"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#FFF0F5] dark:bg-[#3D1A25] p-2 flex-shrink-0 flex items-center justify-center overflow-hidden border border-[#FFD9DE] dark:border-[#522935]">
                  <img
                    src={ASSETS.heartDiagram}
                    alt="Mammal heart illustration"
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#456460] dark:text-[#67A39B]">
                    Cardiovascular System · Topik Aktif
                  </span>
                  <h3 className="font-serif-display text-base sm:text-lg font-bold text-[#1E1B18] dark:text-white truncate group-hover:text-[#B80049] dark:group-hover:text-[#FFAEC0] transition-colors">
                    {activeCourse?.name || 'Anatomi Veteriner II'}
                  </h3>
                  <div className="flex items-center gap-2 mt-1.5 max-w-xs">
                    <div className="flex-1 h-2 rounded-full bg-[#FFD9DE] dark:bg-[#4A2630] overflow-hidden">
                      <div
                        className="h-full bg-[#B80049] dark:bg-[#E2165F] rounded-full transition-all duration-500"
                        style={{ width: `${activeCourse?.progress ?? 0}%` }}
                      />
                    </div>
                    <span className="text-xs font-bold text-[#B80049] dark:text-[#FFAEC0]">
                      {activeCourse?.progress ?? 0}%
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-1.5 text-[#5B3F43] dark:text-[#D1B8BC] text-xs">
                    <span className="flex items-center gap-1 truncate">
                      <FileText className="w-3 h-3 text-[#B80049] dark:text-[#FFAEC0]" /> {activeCourseMaterialsCount} materi
                    </span>
                    <span className="flex items-center gap-1 truncate">
                      <Layers className="w-3 h-3 text-[#B80049] dark:text-[#FFAEC0]" /> {activeCourseTopicsCount} topik
                    </span>
                    <span className="text-[#8F6F73] dark:text-[#A89095] hidden sm:inline truncate">
                      · Terakhir dipelajari hari ini
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button & Atlas Quick Plates */}
              <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-3 md:pt-0 border-[#F3E8E8] dark:border-[#382F32]">
                <div className="hidden sm:flex items-center gap-2">
                  <div
                    onClick={() => navigate('/atlas/Dog/Cardiovascular/atlas-cor-canis')}
                    className="flex flex-col items-center gap-1 cursor-pointer group"
                    title="Atlas: Cor Canis"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#FAF7F5] dark:bg-[#282124] p-1 border border-[#F3E8E8] dark:border-[#382F32] overflow-hidden group-hover:scale-105 transition-transform">
                      <img
                        src={ASSETS.heartExterior}
                        alt="Heart Anatomy"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <span className="text-[10px] text-[#5B3F43] dark:text-[#D1B8BC] group-hover:text-[#B80049] truncate max-w-[60px]">
                      Cor Canis
                    </span>
                  </div>

                  <div
                    onClick={() => navigate('/atlas/Dog/Cardiovascular/atlas-valva-mitralis')}
                    className="flex flex-col items-center gap-1 cursor-pointer group"
                    title="Atlas: Valva Mitralis"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#FAF7F5] dark:bg-[#282124] p-1 border border-[#F3E8E8] dark:border-[#382F32] overflow-hidden group-hover:scale-105 transition-transform">
                      <img
                        src={ASSETS.crossSection}
                        alt="Cross Section"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <span className="text-[10px] text-[#5B3F43] dark:text-[#D1B8BC] group-hover:text-[#B80049] truncate max-w-[60px]">
                      Mitralis
                    </span>
                  </div>
                </div>

                <Button
                  variant="primary"
                  icon={ArrowRight}
                  iconPosition="right"
                  onClick={() =>
                    isCourseCompleted
                      ? navigate(`/courses/${activeCourse?.id || 'course-anatomi-vet'}`)
                      : navigate('/materials/mat-cardio-1/read')
                  }
                  className="shadow-xs"
                >
                  {continueActionText}
                </Button>
              </div>
            </Card>
          </div>

          {/* YOUR COURSES (3-col desktop, 2-col tablet, 1-col mobile) */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 flex-wrap">
                <BookOpen className="w-4 h-4 text-[#B80049] dark:text-[#FFAEC0]" />
                <h2 className="font-serif-display text-lg sm:text-xl font-bold text-[#1E1B18] dark:text-white">
                  Mata Kuliah Semester Ini
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-[#C5E7E1] dark:bg-[#1E433E] text-[#2E4C48] dark:text-[#88D9CB] text-xs font-bold">
                  Semester {currentSemesterNumber}
                </span>
              </div>
              <button
                onClick={() => navigate('/courses')}
                className="text-xs font-semibold text-[#B80049] dark:text-[#FFAEC0] hover:underline cursor-pointer"
              >
                Lihat Semua Kurikulum →
              </button>
            </div>

            {/* Responsive grid: 1 col on mobile, 2 on tablet, 3 on desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentSemesterCourses.map((course) => (
                <div
                  key={course.id}
                  onClick={() => navigate(`/courses/${course.id}`)}
                  className="rounded-2xl bg-white dark:bg-[#1E1A1C] p-4 border border-[#F3E8E8] dark:border-[#382F32] shadow-[0_2px_12px_-1px_rgba(45,41,38,0.03)] hover:shadow-[0_8px_24px_-2px_rgba(226,22,95,0.08)] hover:-translate-y-0.5 transition-all duration-200 group flex flex-col justify-between cursor-pointer min-w-0 h-full"
                >
                  <div className="flex flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div className="w-10 h-10 rounded-xl bg-[#FFF0F5] dark:bg-[#3D1A25] border border-[#FFD9DE] dark:border-[#522935] flex items-center justify-center p-1.5 flex-shrink-0">
                        <img
                          src={course.iconImage}
                          alt={course.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="w-7 h-7 rounded-full bg-[#FAF7F5] dark:bg-[#282124] text-[#5B3F43] dark:text-[#D1B8BC] group-hover:bg-[#B80049] group-hover:text-white flex items-center justify-center transition-colors flex-shrink-0">
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                    <h4 className="font-serif-display font-bold text-sm sm:text-base text-[#1E1B18] dark:text-white mt-3 line-clamp-2 min-h-[2.5rem] group-hover:text-[#B80049] dark:group-hover:text-[#FFAEC0] transition-colors leading-snug">
                      {course.name}
                    </h4>
                    <div className="flex items-center justify-between text-xs text-[#5B3F43] dark:text-[#BAA0A5] mt-2">
                      <span>{course.materialsCount} materi</span>
                      <span>{course.topicsCount} topik</span>
                    </div>
                  </div>

                  <div className="pt-3 mt-3 border-t border-[#FAF7F5] dark:border-[#282124]">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-[#5B3F43] dark:text-[#BAA0A5]">Progress</span>
                      <span className="text-[#B80049] dark:text-[#FFAEC0] font-bold">
                        {course.progress}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-[#FFD9DE] dark:bg-[#4A2630] overflow-hidden">
                      <div
                        className="h-full bg-[#B80049] dark:bg-[#E2165F] rounded-full transition-all duration-500"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* VETERINARY ATLAS SEARCH BANNER & COMPANION CARD */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
            {/* Atlas Search Banner (2 cols) */}
            <div className="md:col-span-2 rounded-2xl bg-white dark:bg-[#1E1A1C] border border-[#F3E8E8] dark:border-[#382F32] p-5 shadow-[0_2px_12px_-1px_rgba(45,41,38,0.03)] relative overflow-hidden flex flex-col justify-between">
              <div className="relative z-10 max-w-sm">
                <div className="flex items-center gap-2 text-[#B80049] dark:text-[#FFAEC0] mb-1">
                  <Grid className="w-4 h-4" />
                  <h3 className="font-serif-display text-base sm:text-lg font-bold text-[#1E1B18] dark:text-white">
                    Veterinary Atlas
                  </h3>
                </div>
                <p className="text-xs text-[#5B3F43] dark:text-[#D1B8BC]">
                  Eksplorasi preparat anatomi, variasi spesies hewan domestik, dan plat radiografi.
                </p>
              </div>

              <form
                onSubmit={handleAtlasSearch}
                className="relative z-10 mt-4 flex items-center gap-2"
              >
                <div className="relative flex-1 min-w-0">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#8F6F73]" />
                  <input
                    type="text"
                    value={atlasSearchTerm}
                    onChange={(e) => setAtlasSearchTerm(e.target.value)}
                    placeholder="Cari struktur, organ, canis, felina..."
                    className="w-full pl-8 pr-3 py-2 text-xs rounded-full bg-[#FAF7F5] dark:bg-[#282124] border border-[#EEDCDC] dark:border-[#382F32] text-[#1E1B18] dark:text-white placeholder:text-[#8F6F73] focus:outline-none focus:bg-white dark:focus:bg-[#1E1A1C] focus:border-[#B80049]"
                  />
                </div>
                <Button
                  type="submit"
                  size="sm"
                  variant="primary"
                  icon={ArrowRight}
                  iconPosition="right"
                  className="flex-shrink-0"
                >
                  Buka
                </Button>
              </form>

              {/* Background Art */}
              <div className="absolute right-0 bottom-0 top-0 w-40 pointer-events-none opacity-30 md:opacity-75 flex items-center justify-end overflow-hidden">
                <img
                  src={ASSETS.atlasLithograph}
                  alt="Veterinary atlas lithograph"
                  className="h-full object-cover object-left"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-white dark:from-[#1E1A1C] via-white/50 dark:via-[#1E1A1C]/50 to-transparent" />
              </div>
            </div>

            {/* Supportive Quote Card (1 col) */}
            <div className="rounded-2xl bg-[#FFF0F5] dark:bg-[#2D1B22] border border-[#FFD9DE] dark:border-[#522935] p-5 flex flex-col justify-between shadow-2xs">
              <div className="w-10 h-10 rounded-full bg-white dark:bg-[#1E1A1C] p-2 flex items-center justify-center text-[#B80049] dark:text-[#FFAEC0] shadow-2xs">
                <span className="text-xl">🐾</span>
              </div>
              <div className="mt-3">
                <p className="font-serif-display text-xs sm:text-sm italic text-[#1E1B18] dark:text-white leading-relaxed">
                  “Ilmu hari ini, adalah langkah menuju hewan-hewan yang lebih sehat di masa depan.”
                </p>
                <span className="text-[11px] text-[#B80049] dark:text-[#FFAEC0] font-bold mt-1.5 block">
                  — Bulan ♡ 🐾
                </span>
              </div>
            </div>
          </div>

          {/* SMART RECOMMENDATIONS */}
          {recommendations.length > 0 && (
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#B80049] dark:text-[#FFAEC0]" />
                <h3 className="font-serif-display font-bold text-base sm:text-lg text-[#1E1B18] dark:text-white">
                  Rekomendasi Belajar
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {recommendations.slice(0, 2).map((rec) => (
                  <div
                    key={rec.id}
                    onClick={() => navigate(rec.link)}
                    className="p-4 rounded-2xl bg-white dark:bg-[#1E1A1C] border border-[#F3E8E8] dark:border-[#382F32] shadow-2xs hover:border-[#FFD9DE] hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FFF0F5] dark:bg-[#3D1A25] text-[#B80049] dark:text-[#FFAEC0] border border-[#FFD9DE] dark:border-[#522935]">
                          {rec.badge}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#8F6F73]" />
                      </div>
                      <h4 className="font-bold text-xs sm:text-sm text-[#1E1B18] dark:text-white mb-1">
                        {rec.title}
                      </h4>
                      <p className="text-xs text-[#5B3F43] dark:text-[#D1B8BC] line-clamp-2">
                        {rec.description}
                      </p>
                    </div>
                    <div className="mt-3 pt-2 border-t border-[#FAF7F5] dark:border-[#282124] flex items-center justify-between text-xs">
                      <span className="font-semibold text-[#B80049] dark:text-[#FFAEC0]">
                        {rec.actionText} →
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ================= SECONDARY COLUMN (~30% / 340px) ================= */}
        <div className="flex flex-col gap-6 min-w-0 w-full">
          
          {/* 1. UPCOMING SCHEDULE (Fully interactive with state persistence) */}
          <Card padding="md" className="flex flex-col gap-3">
            <div className="flex items-center justify-between pb-2.5 border-b border-[#F3E8E8] dark:border-[#382F32]">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#B80049] dark:text-[#FFAEC0]" />
                <h3 className="font-serif-display font-bold text-base text-[#1E1B18] dark:text-white">
                  Jadwal & Agenda
                </h3>
              </div>
              <button
                onClick={() => setIsAddScheduleOpen(true)}
                className="text-xs font-semibold text-[#B80049] dark:text-[#FFAEC0] hover:text-[#E2165F] flex items-center gap-1 cursor-pointer"
                title="Tambah Jadwal Baru"
              >
                <Plus className="w-3.5 h-3.5" /> Tambah
              </button>
            </div>

            {/* Schedule List */}
            {schedule.length === 0 ? (
              <div className="py-6 px-3 text-center flex flex-col items-center gap-2 rounded-2xl bg-[#FAF7F5] dark:bg-[#282124] border border-dashed border-[#EEDCDC] dark:border-[#382F32]">
                <Calendar className="w-7 h-7 text-[#8F6F73] opacity-60" />
                <p className="text-xs text-[#5B3F43] dark:text-[#D1B8BC] font-medium">
                  Belum ada agenda belajar aktif.
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  icon={Plus}
                  onClick={() => setIsAddScheduleOpen(true)}
                >
                  Tambah Jadwal
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {schedule
                  .filter((item): item is ScheduleItem => Boolean(item && typeof item === 'object'))
                  .slice(0, 4)
                  .map((item) => {
                    const isItemDone = Boolean(item.isCompleted || item.status === 'Completed');
                    return (
                      <div
                        key={item.id}
                        className={`flex items-start justify-between p-2.5 rounded-xl border transition-all ${
                          isItemDone
                            ? 'bg-[#FAF7F5] dark:bg-[#241E20] border-transparent opacity-65'
                            : 'bg-white dark:bg-[#1E1A1C] border-[#F3E8E8] dark:border-[#382F32] hover:border-[#FFD9DE]'
                        }`}
                      >
                        <div className="flex items-start gap-2.5 min-w-0 flex-1">
                          {/* Completion check toggle button */}
                          <button
                            onClick={() => toggleCompleteScheduleItem(item.id)}
                            className="mt-0.5 text-[#B80049] dark:text-[#FFAEC0] hover:scale-110 transition-transform cursor-pointer flex-shrink-0"
                            title={isItemDone ? 'Tandai belum selesai' : 'Tandai selesai'}
                          >
                            {isItemDone ? (
                              <CheckCircle className="w-4 h-4 fill-[#B80049] dark:fill-[#FFAEC0] text-white" />
                            ) : (
                              <Circle className="w-4 h-4 text-[#8F6F73] hover:text-[#B80049]" />
                            )}
                          </button>

                          <div className="flex flex-col min-w-0 flex-1">
                            <span
                              className={`text-xs font-bold text-[#1E1B18] dark:text-white truncate leading-tight ${
                                isItemDone ? 'line-through opacity-70' : ''
                              }`}
                            >
                              {item.title}
                            </span>
                            <span className="text-[11px] text-[#5B3F43] dark:text-[#D1B8BC] truncate mt-0.5">
                              {item.date} · {item.startTime} – {item.endTime}
                            </span>
                            {item.location && (
                              <span className="text-[10px] text-[#8F6F73] dark:text-[#A89095] flex items-center gap-1 mt-0.5 truncate">
                                <MapPin className="w-2.5 h-2.5 text-[#B80049] dark:text-[#FFAEC0] flex-shrink-0" />
                                <span className="truncate">{item.location}</span>
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 flex-shrink-0 ml-2">
                          <span className="px-2 py-0.5 rounded-full bg-[#FFF0F5] dark:bg-[#3D1A25] text-[#B80049] dark:text-[#FFAEC0] text-[10px] font-bold">
                            {item.type}
                          </span>
                          <button
                            onClick={() => deleteScheduleItem(item.id)}
                            className="p-1 rounded-lg text-[#8F6F73] hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                            title="Hapus jadwal"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    );
                  })}

                {schedule.length > 4 && (
                  <div className="text-center pt-1">
                    <span className="text-[11px] text-[#8F6F73] dark:text-[#BAA0A5]">
                      +{schedule.length - 4} jadwal lainnya
                    </span>
                  </div>
                )}
              </div>
            )}
          </Card>

          {/* 2. STUDY PROGRESS */}
          <Card padding="md" className="flex flex-col gap-4">
            <div className="flex items-center justify-between pb-2.5 border-b border-[#F3E8E8] dark:border-[#382F32]">
              <div className="flex items-center gap-2">
                <h3 className="font-serif-display font-bold text-base text-[#1E1B18] dark:text-white">
                  Study Progress
                </h3>
              </div>
              <button
                onClick={() => navigate('/progress')}
                className="text-xs font-semibold text-[#B80049] dark:text-[#FFAEC0] hover:underline cursor-pointer"
              >
                Detail →
              </button>
            </div>

            {/* Centered Large Circular Progress Visualization */}
            <div className="flex flex-col items-center justify-center pt-2 pb-1">
              <ProgressRing
                percentage={overallProgress}
                size={88}
                strokeWidth={8}
                label={`${overallProgress}%`}
                sublabel="Overall"
              />
            </div>

            {/* Breakdown: Materials, Flashcards, Quiz, Cases */}
            <div className="flex flex-col gap-2.5 pt-2 border-t border-[#FAF7F5] dark:border-[#282124]">
              {/* Materials */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between text-xs text-[#5B3F43] dark:text-[#D1B8BC]">
                  <span>Materials</span>
                  <span className="font-bold text-[#1E1B18] dark:text-white">
                    {stats.materialsCompleted} / {stats.totalMaterials}
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[#F5ECE7] dark:bg-[#282124] overflow-hidden">
                  <div
                    className="h-full bg-[#B80049] dark:bg-[#FFAEC0] rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.round(
                        (stats.materialsCompleted / Math.max(1, stats.totalMaterials)) * 100
                      )}%`
                    }}
                  />
                </div>
              </div>

              {/* Flashcards */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between text-xs text-[#5B3F43] dark:text-[#D1B8BC]">
                  <span>Flashcards</span>
                  <span className="font-bold text-[#1E1B18] dark:text-white">
                    {stats.flashcardsMastered} / {stats.totalFlashcards}
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[#F5ECE7] dark:bg-[#282124] overflow-hidden">
                  <div
                    className="h-full bg-[#B80049] dark:bg-[#FFAEC0] rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.round(
                        (stats.flashcardsMastered / Math.max(1, stats.totalFlashcards)) * 100
                      )}%`
                    }}
                  />
                </div>
              </div>

              {/* Quiz */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between text-xs text-[#5B3F43] dark:text-[#D1B8BC]">
                  <span>Quiz</span>
                  <span className="font-bold text-[#1E1B18] dark:text-white">
                    {stats.quizzesCompleted} / {stats.totalQuizzes}
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[#F5ECE7] dark:bg-[#282124] overflow-hidden">
                  <div
                    className="h-full bg-[#B80049] dark:bg-[#FFAEC0] rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.round(
                        (stats.quizzesCompleted / Math.max(1, stats.totalQuizzes)) * 100
                      )}%`
                    }}
                  />
                </div>
              </div>

              {/* Cases */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between text-xs text-[#5B3F43] dark:text-[#D1B8BC]">
                  <span>Cases</span>
                  <span className="font-bold text-[#1E1B18] dark:text-white">
                    {stats.casesCompleted} / {stats.totalCases}
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[#F5ECE7] dark:bg-[#282124] overflow-hidden">
                  <div
                    className="h-full bg-[#B80049] dark:bg-[#FFAEC0] rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.round(
                        (stats.casesCompleted / Math.max(1, stats.totalCases)) * 100
                      )}%`
                    }}
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* 3. RECENT ACTIVITY */}
          <Card padding="md" className="flex flex-col gap-3">
            <div className="flex items-center justify-between pb-2.5 border-b border-[#F3E8E8] dark:border-[#382F32]">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#B80049] dark:text-[#FFAEC0]" />
                <h3 className="font-serif-display font-bold text-base text-[#1E1B18] dark:text-white">
                  Recent Activity
                </h3>
              </div>
              <button
                onClick={() => navigate('/progress')}
                className="text-xs font-semibold text-[#B80049] dark:text-[#FFAEC0] hover:underline cursor-pointer"
              >
                Semua
              </button>
            </div>

            <div className="flex flex-col gap-2.5">
              {studySessions.slice(0, 3).map((session) => (
                <div
                  key={session.id}
                  className="flex items-start justify-between gap-2 text-xs"
                >
                  <div className="flex items-start gap-2.5 min-w-0">
                    <div className="w-7 h-7 rounded-full bg-[#FFF0F5] dark:bg-[#3D1A25] text-[#B80049] dark:text-[#FFAEC0] flex items-center justify-center flex-shrink-0 mt-0.5">
                      {session.type === 'quiz' && <HelpCircle className="w-3.5 h-3.5" />}
                      {session.type === 'material' && <FileText className="w-3.5 h-3.5" />}
                      {session.type === 'flashcard' && <Layers className="w-3.5 h-3.5" />}
                      {session.type === 'case' && <Stethoscope className="w-3.5 h-3.5" />}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="font-bold text-[#1E1B18] dark:text-white truncate leading-tight">
                        {session.title}
                      </span>
                      <span className="text-[11px] text-[#5B3F43] dark:text-[#D1B8BC] truncate">
                        {session.details}
                      </span>
                      <span className="text-[10px] text-[#8F6F73] dark:text-[#BAA0A5] mt-0.5">
                        {getRelativeTime(session.timestamp)}
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] text-[#8F6F73] dark:text-[#BAA0A5] flex-shrink-0 font-medium px-2 py-0.5 rounded-full bg-[#FAF7F5] dark:bg-[#282124]">
                    {session.durationMinutes}m
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* 4. QUICK ACCESS GRID */}
          <Card padding="md" className="flex flex-col gap-3">
            <h3 className="font-serif-display font-bold text-base text-[#1E1B18] dark:text-white">
              Akses Cepat
            </h3>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => navigate('/materials')}
                className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-[#FAF7F5] dark:bg-[#282124] hover:bg-[#FFF0F5] dark:hover:bg-[#38232B] border border-[#F3E8E8] dark:border-[#382F32] transition-all group text-center cursor-pointer"
              >
                <FileText className="w-4 h-4 text-[#B80049] dark:text-[#FFAEC0] mb-1 group-hover:scale-110 transition-transform" />
                <span className="text-[11px] font-bold text-[#1E1B18] dark:text-[#E8D5D8] truncate w-full">Materi</span>
              </button>

              <button
                onClick={() => navigate('/flashcards')}
                className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-[#FAF7F5] dark:bg-[#282124] hover:bg-[#FFF0F5] dark:hover:bg-[#38232B] border border-[#F3E8E8] dark:border-[#382F32] transition-all group text-center cursor-pointer"
              >
                <Layers className="w-4 h-4 text-[#B80049] dark:text-[#FFAEC0] mb-1 group-hover:scale-110 transition-transform" />
                <span className="text-[11px] font-bold text-[#1E1B18] dark:text-[#E8D5D8] truncate w-full">Kartu</span>
              </button>

              <button
                onClick={() => navigate('/quiz')}
                className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-[#FAF7F5] dark:bg-[#282124] hover:bg-[#FFF0F5] dark:hover:bg-[#38232B] border border-[#F3E8E8] dark:border-[#382F32] transition-all group text-center cursor-pointer"
              >
                <HelpCircle className="w-4 h-4 text-[#B80049] dark:text-[#FFAEC0] mb-1 group-hover:scale-110 transition-transform" />
                <span className="text-[11px] font-bold text-[#1E1B18] dark:text-[#E8D5D8] truncate w-full">Kuis</span>
              </button>

              <button
                onClick={() => navigate('/cases')}
                className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-[#FAF7F5] dark:bg-[#282124] hover:bg-[#FFF0F5] dark:hover:bg-[#38232B] border border-[#F3E8E8] dark:border-[#382F32] transition-all group text-center cursor-pointer"
              >
                <Stethoscope className="w-4 h-4 text-[#B80049] dark:text-[#FFAEC0] mb-1 group-hover:scale-110 transition-transform" />
                <span className="text-[11px] font-bold text-[#1E1B18] dark:text-[#E8D5D8] truncate w-full">Kasus</span>
              </button>

              <button
                onClick={() => navigate('/atlas')}
                className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-[#FAF7F5] dark:bg-[#282124] hover:bg-[#FFF0F5] dark:hover:bg-[#38232B] border border-[#F3E8E8] dark:border-[#382F32] transition-all group text-center cursor-pointer"
              >
                <Grid className="w-4 h-4 text-[#B80049] dark:text-[#FFAEC0] mb-1 group-hover:scale-110 transition-transform" />
                <span className="text-[11px] font-bold text-[#1E1B18] dark:text-[#E8D5D8] truncate w-full">Atlas</span>
              </button>

              <button
                onClick={() => navigate('/courses/ppdh')}
                className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-[#FAF7F5] dark:bg-[#282124] hover:bg-[#FFF0F5] dark:hover:bg-[#38232B] border border-[#F3E8E8] dark:border-[#382F32] transition-all group text-center cursor-pointer"
              >
                <School className="w-4 h-4 text-[#B80049] dark:text-[#FFAEC0] mb-1 group-hover:scale-110 transition-transform" />
                <span className="text-[11px] font-bold text-[#1E1B18] dark:text-[#E8D5D8] truncate w-full">PPDH</span>
              </button>
            </div>
          </Card>
        </div>

      </div>

      {/* ================= MODAL: TAMBAH JADWAL BARU ================= */}
      {isAddScheduleOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white dark:bg-[#1E1A1C] rounded-3xl p-6 sm:p-7 border border-[#FFD9DE] dark:border-[#4A3D42] shadow-xl w-full max-w-lg flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-[#F3E8E8] dark:border-[#382F32]">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#B80049] dark:text-[#FFAEC0]" />
                <h3 className="font-serif-display font-bold text-lg text-[#1E1B18] dark:text-white">
                  Tambah Agenda Belajar
                </h3>
              </div>
              <button
                onClick={() => setIsAddScheduleOpen(false)}
                className="p-1 rounded-lg text-[#8F6F73] hover:bg-[#FAF7F5] dark:hover:bg-[#282124]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSchedule} className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-bold text-[#1E1B18] dark:text-[#E8D5D8] block mb-1">
                  Nama Kegiatan / Ujian / Topik
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Praktikum Bedah Jaringan atau Belajar Mandiri Anatomi"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full text-xs p-2.5 bg-[#FAF7F5] dark:bg-[#282124] border border-[#EEDCDC] dark:border-[#382F32] rounded-xl text-[#1E1B18] dark:text-white focus:outline-none focus:border-[#B80049]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-[#1E1B18] dark:text-[#E8D5D8] block mb-1">
                    Kategori
                  </label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                    className="w-full text-xs p-2.5 bg-[#FAF7F5] dark:bg-[#282124] border border-[#EEDCDC] dark:border-[#382F32] rounded-xl text-[#1E1B18] dark:text-white focus:outline-none focus:border-[#B80049]"
                  >
                    <option value="Praktikum">Praktikum</option>
                    <option value="Kuliah">Kuliah</option>
                    <option value="Belajar">Belajar Mandiri</option>
                    <option value="Ujian">Ujian / Responsi</option>
                    <option value="PPDH">Rotasi Klinis PPDH</option>
                    <option value="Event">Event / Seminar</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#1E1B18] dark:text-[#E8D5D8] block mb-1">
                    Tanggal
                  </label>
                  <input
                    type="date"
                    required
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full text-xs p-2.5 bg-[#FAF7F5] dark:bg-[#282124] border border-[#EEDCDC] dark:border-[#382F32] rounded-xl text-[#1E1B18] dark:text-white focus:outline-none focus:border-[#B80049]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-[#1E1B18] dark:text-[#E8D5D8] block mb-1">
                    Waktu Mulai
                  </label>
                  <input
                    type="time"
                    value={newStartTime}
                    onChange={(e) => setNewStartTime(e.target.value)}
                    className="w-full text-xs p-2.5 bg-[#FAF7F5] dark:bg-[#282124] border border-[#EEDCDC] dark:border-[#382F32] rounded-xl text-[#1E1B18] dark:text-white focus:outline-none focus:border-[#B80049]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#1E1B18] dark:text-[#E8D5D8] block mb-1">
                    Waktu Selesai
                  </label>
                  <input
                    type="time"
                    value={newEndTime}
                    onChange={(e) => setNewEndTime(e.target.value)}
                    className="w-full text-xs p-2.5 bg-[#FAF7F5] dark:bg-[#282124] border border-[#EEDCDC] dark:border-[#382F32] rounded-xl text-[#1E1B18] dark:text-white focus:outline-none focus:border-[#B80049]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#1E1B18] dark:text-[#E8D5D8] block mb-1">
                  Lokasi / Ruang Kuliah
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Lab Anatomi FKH UGM / R. Kuliah 102"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  className="w-full text-xs p-2.5 bg-[#FAF7F5] dark:bg-[#282124] border border-[#EEDCDC] dark:border-[#382F32] rounded-xl text-[#1E1B18] dark:text-white focus:outline-none focus:border-[#B80049]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#F3E8E8] dark:border-[#382F32]">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setIsAddScheduleOpen(false)}
                >
                  Batal
                </Button>
                <Button type="submit" variant="primary" icon={Plus}>
                  Simpan Jadwal
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

