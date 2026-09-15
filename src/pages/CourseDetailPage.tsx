import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  BookOpen,
  Layers,
  FileText,
  HelpCircle,
  Stethoscope,
  Grid,
  ArrowLeft,
  ArrowRight,
  School,
  CheckCircle2,
  Clock,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Building2
} from 'lucide-react';
import { Breadcrumb, Button, Badge, ProgressBar, ProgressRing } from '../components/common/UI';

export const CourseDetailPage: React.FC<{ courseId: string }> = ({ courseId }) => {
  const {
    courses,
    topics,
    materials,
    flashcardDecks,
    quizzes,
    clinicalCases,
    atlasStructures,
    user,
    navigate
  } = useApp();

  const currentSemesterNumber = user?.currentSemester || 3;

  const [activeTab, setActiveTab] = useState<
    'topics' | 'materials' | 'flashcards' | 'quizzes' | 'cases' | 'atlas'
  >('topics');

  const course = courses.find((c) => c.id === courseId) || courses[0];

  if (!course) {
    return (
      <div className="w-full py-12 text-center flex flex-col items-center gap-4">
        <p className="text-[#5B3F43]">Mata kuliah tidak ditemukan.</p>
        <button
          onClick={() => navigate('/courses')}
          className="px-4 py-2 bg-[#B80049] text-white text-xs font-bold rounded-xl"
        >
          Kembali ke Daftar Kuliah
        </button>
      </div>
    );
  }

  const courseTopics = topics.filter((t) => Boolean(t && t.courseId === course.id));
  const courseMaterials = materials.filter((m) => Boolean(m && m.courseId === course.id));
  const courseDecks = flashcardDecks.filter((d) => Boolean(d && d.courseId === course.id));
  const courseQuizzes = quizzes.filter((q) => Boolean(q && q.courseId === course.id));
  const courseCases = clinicalCases.filter((c) => Boolean(c && c.courseId === course.id));
  const courseAtlas = atlasStructures.filter((a) => Boolean(a && a.courseId === course.id));

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'Home', onClick: () => navigate('/') },
          { label: 'Courses', onClick: () => navigate('/courses') },
          { label: course.name }
        ]}
      />

      {/* Course Hero Banner */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#F3E8E8] shadow-[0_4px_24px_-2px_rgba(226,22,95,0.06)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-start gap-4 sm:gap-6 flex-1">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#FFD9DE]/40 border border-[#FFD9DE] p-3 flex items-center justify-center flex-shrink-0">
            <img
              src={course.iconImage}
              alt={course.name}
              className="w-full h-full object-contain"
            />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#B80049] bg-[#FFF0F5] px-2.5 py-0.5 rounded-full">
                {course.code}
              </span>
              <Badge variant={course.semesterNumber === currentSemesterNumber ? 'primary' : 'neutral'}>
                Semester {course.semesterNumber}
              </Badge>
              <span className="text-xs font-semibold text-[#5B3F43]">
                {course.credits} SKS
              </span>
              {course.verified && (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Kurikulum Resmi FKH UGM
                </span>
              )}
            </div>

            <h1 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#1E1B18]">
              {course.name}
            </h1>

            <p className="text-sm text-[#5B3F43] mt-2 max-w-2xl leading-relaxed">
              {course.description}
            </p>

            <div className="flex items-center gap-4 mt-3 text-xs text-[#8F6F73] flex-wrap">
              <span className="flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-[#B80049]" />
                {course.department || 'Fakultas Kedokteran Hewan UGM'}
              </span>
              <span>·</span>
              <span>Pengampu: {course.instructor || 'Departemen FKH UGM'}</span>
              {course.syllabusUrl && (
                <>
                  <span>·</span>
                  <a
                    href={course.syllabusUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#B80049] hover:underline font-semibold"
                  >
                    Silabus Resmi <ExternalLink className="w-3 h-3" />
                  </a>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Progress Display */}
        <div className="flex items-center gap-4 bg-[#FAF7F5] p-4 rounded-2xl border border-[#F3E8E8] self-stretch md:self-auto justify-between md:justify-center">
          <ProgressRing
            percentage={course.progress}
            size={76}
            strokeWidth={7}
            label={`${course.progress}%`}
            sublabel="Selesai"
          />
          <div className="flex flex-col gap-1 text-xs">
            <span className="font-bold text-[#1E1B18]">Progres Modul</span>
            <span className="text-[#5B3F43]">
              {courseMaterials.filter((m) => Boolean(m?.isCompleted)).length} / {courseMaterials.length} Materi selesai
            </span>
            <span className="text-[#5B3F43]">
              {courseDecks.length} Flashcard Decks
            </span>
            <span className="text-[#5B3F43]">
              {courseQuizzes.length} Kuis Ujian
            </span>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-[#F3E8E8] overflow-x-auto pb-1 scrollbar-thin">
        <button
          onClick={() => setActiveTab('topics')}
          className={`px-4 py-2 text-sm font-semibold whitespace-nowrap border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'topics'
              ? 'border-[#B80049] text-[#B80049]'
              : 'border-transparent text-[#5B3F43] hover:text-[#1E1B18]'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Topik Bahasan ({courseTopics.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('materials')}
          className={`px-4 py-2 text-sm font-semibold whitespace-nowrap border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'materials'
              ? 'border-[#B80049] text-[#B80049]'
              : 'border-transparent text-[#5B3F43] hover:text-[#1E1B18]'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Materi Kuliah ({courseMaterials.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('flashcards')}
          className={`px-4 py-2 text-sm font-semibold whitespace-nowrap border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'flashcards'
              ? 'border-[#B80049] text-[#B80049]'
              : 'border-transparent text-[#5B3F43] hover:text-[#1E1B18]'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Flashcards ({courseDecks.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('quizzes')}
          className={`px-4 py-2 text-sm font-semibold whitespace-nowrap border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'quizzes'
              ? 'border-[#B80049] text-[#B80049]'
              : 'border-transparent text-[#5B3F43] hover:text-[#1E1B18]'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>Kuis & Ujian ({courseQuizzes.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('cases')}
          className={`px-4 py-2 text-sm font-semibold whitespace-nowrap border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'cases'
              ? 'border-[#B80049] text-[#B80049]'
              : 'border-transparent text-[#5B3F43] hover:text-[#1E1B18]'
          }`}
        >
          <Stethoscope className="w-4 h-4" />
          <span>Kasus Klinis ({courseCases.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('atlas')}
          className={`px-4 py-2 text-sm font-semibold whitespace-nowrap border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'atlas'
              ? 'border-[#B80049] text-[#B80049]'
              : 'border-transparent text-[#5B3F43] hover:text-[#1E1B18]'
          }`}
        >
          <Grid className="w-4 h-4" />
          <span>Atlas Anatomi ({courseAtlas.length})</span>
        </button>
      </div>

      {/* TAB CONTENT: TOPICS */}
      {activeTab === 'topics' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {courseTopics.map((topic, index) => {
            const topicMats = materials.filter((m) => m.topicId === topic.id);
            return (
              <div
                key={topic.id}
                onClick={() => navigate(`/courses/${course.id}/topics/${topic.id}`)}
                className="bg-white rounded-2xl p-5 border border-[#F3E8E8] shadow-[0_2px_12px_-1px_rgba(45,41,38,0.03)] hover:shadow-[0_8px_24px_-2px_rgba(226,22,95,0.08)] hover:-translate-y-0.5 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#B80049] bg-[#FFF0F5] px-2.5 py-0.5 rounded-full">
                      Topik #{index + 1}
                    </span>
                    <span className="text-xs font-bold text-[#B80049]">
                      {topic.progress}% Selesai
                    </span>
                  </div>

                  <h3 className="font-serif-display text-lg font-bold text-[#1E1B18] mt-2 group-hover:text-[#B80049] transition-colors">
                    {topic.name}
                  </h3>

                  <p className="text-xs text-[#5B3F43] mt-1.5 leading-relaxed">
                    {topic.description}
                  </p>

                  {/* Learning outcomes preview */}
                  {topic.learningOutcomes && (
                    <div className="mt-3 bg-[#FAF7F5] p-2.5 rounded-xl border border-[#F3E8E8]">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#8F6F73] block mb-1">
                        Capaian Pembelajaran:
                      </span>
                      <ul className="text-xs text-[#5B3F43] list-disc list-inside space-y-0.5">
                        {topic.learningOutcomes.slice(0, 2).map((lo, i) => (
                          <li key={i} className="line-clamp-1">
                            {lo}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="pt-4 mt-3 border-t border-[#FAF7F5]">
                  <div className="flex items-center justify-between text-xs text-[#5B3F43] mb-1.5">
                    <span>{topicMats.length} materi kuliah terdaftar</span>
                    <div className="flex items-center gap-1 font-semibold text-[#B80049] group-hover:underline">
                      <span>Buka Topik</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <ProgressBar value={topic.progress} />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TAB CONTENT: MATERIALS */}
      {activeTab === 'materials' && (
        <div className="flex flex-col gap-3">
          {courseMaterials.map((mat) => (
            <div
              key={mat.id}
              onClick={() => navigate(`/materials/${mat.id}/read`)}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-[#F3E8E8] shadow-[0_2px_12px_-1px_rgba(45,41,38,0.03)] hover:border-[#FFD9DE] transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer group"
            >
              <div className="flex items-start gap-3.5 flex-1">
                <div className="w-10 h-10 rounded-xl bg-[#FFF0F5] text-[#B80049] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#456460]">
                      {mat.type}
                    </span>
                    <span className="text-xs text-[#8F6F73]">· {mat.readingTimeMinutes} min baca</span>
                    {mat.verified && (
                      <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-md border border-emerald-200">
                        <ShieldCheck className="w-2.5 h-2.5 text-emerald-600" /> Terverifikasi
                      </span>
                    )}
                  </div>
                  <h4 className="font-serif-display font-bold text-base text-[#1E1B18] group-hover:text-[#B80049] transition-colors">
                    {mat.title}
                  </h4>
                  <p className="text-xs text-[#5B3F43] line-clamp-1 mt-0.5">
                    {mat.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                <div className="flex flex-col items-end text-xs">
                  <span className="font-semibold text-[#1E1B18]">
                    {mat.isCompleted ? 'Selesai Dibaca ✓' : `${mat.progressPercent}%`}
                  </span>
                  <div className="w-20 h-1.5 rounded-full bg-[#FFD9DE] overflow-hidden mt-1">
                    <div
                      className="h-full bg-[#B80049] rounded-full"
                      style={{ width: `${mat.progressPercent}%` }}
                    />
                  </div>
                </div>

                <Button size="sm" variant="primary" icon={ArrowRight} iconPosition="right">
                  Baca
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB CONTENT: FLASHCARDS */}
      {activeTab === 'flashcards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courseDecks.map((deck) => (
            <div
              key={deck.id}
              className="bg-white rounded-2xl p-5 border border-[#F3E8E8] shadow-[0_2px_12px_-1px_rgba(45,41,38,0.03)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <Badge variant="primary">{deck.cardsCount} Kartu</Badge>
                  <span className="text-xs text-[#5B3F43] font-medium">
                    {deck.masteredCount} dikuasai
                  </span>
                </div>
                <h4 className="font-serif-display font-bold text-lg text-[#1E1B18] mt-3">
                  {deck.title}
                </h4>
                <p className="text-xs text-[#5B3F43] mt-1 line-clamp-2">
                  {deck.description}
                </p>
              </div>

              <div className="pt-4 mt-3 border-t border-[#FAF7F5] flex items-center justify-between">
                <div className="w-24">
                  <ProgressBar
                    value={deck.masteredCount}
                    max={deck.cardsCount || 1}
                  />
                </div>
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => navigate(`/flashcards/${deck.id}/study`)}
                >
                  Belajar Sekarang
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB CONTENT: QUIZZES */}
      {activeTab === 'quizzes' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {courseQuizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="bg-white rounded-2xl p-5 border border-[#F3E8E8] shadow-[0_2px_12px_-1px_rgba(45,41,38,0.03)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <Badge variant="warning">{quiz.difficulty}</Badge>
                  <span className="text-xs text-[#8F6F73] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {quiz.timeLimitMinutes} menit
                  </span>
                </div>
                <h4 className="font-serif-display font-bold text-lg text-[#1E1B18] mt-3">
                  {quiz.title}
                </h4>
                <p className="text-xs text-[#5B3F43] mt-1">{quiz.description}</p>
              </div>

              <div className="pt-4 mt-3 border-t border-[#FAF7F5] flex items-center justify-between">
                <div className="flex flex-col text-xs">
                  <span className="text-[#5B3F43]">{quiz.questions.length} Soal Ujian</span>
                  {quiz.bestScore !== undefined && (
                    <span className="font-bold text-[#B80049]">
                      Skor Terbaik: {quiz.bestScore}%
                    </span>
                  )}
                </div>
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => navigate(`/quiz/${quiz.id}/start`)}
                >
                  Mulai Kuis
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB CONTENT: CLINICAL CASES */}
      {activeTab === 'cases' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {courseCases.map((c) => (
            <div
              key={c.id}
              onClick={() => navigate(`/cases/${c.id}`)}
              className="bg-white rounded-2xl p-5 border border-[#F3E8E8] shadow-[0_2px_12px_-1px_rgba(45,41,38,0.03)] hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <Badge variant={c.status === 'completed' ? 'success' : 'primary'}>
                  {c.status === 'completed' ? 'Selesai Didiskusikan' : 'Belum Dituntaskan'}
                </Badge>
                <span className="text-xs font-semibold text-[#5B3F43]">{c.patientSpecies} · {c.patientBreed}</span>
              </div>
              <h4 className="font-serif-display font-bold text-lg text-[#1E1B18] mt-3 group-hover:text-[#B80049] transition-colors">
                {c.title}
              </h4>
              <p className="text-xs text-[#5B3F43] mt-1 line-clamp-2">{c.chiefComplaint}</p>
              <div className="mt-4 flex items-center justify-between text-xs text-[#B80049] font-bold">
                <span>Periksa Rekam Medis Pasien</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB CONTENT: ATLAS */}
      {activeTab === 'atlas' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {courseAtlas.map((item) => (
            <div
              key={item.id}
              onClick={() => navigate(`/atlas/${item.species}/${item.system}/${item.id}`)}
              className="bg-white rounded-2xl overflow-hidden border border-[#F3E8E8] shadow-[0_2px_12px_-1px_rgba(45,41,38,0.03)] hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="h-36 bg-[#FAF7F5] overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="p-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#B80049]">
                  {item.species} · {item.system}
                </span>
                <h4 className="font-serif-display font-bold text-base text-[#1E1B18] mt-1">
                  {item.name}
                </h4>
                <p className="text-xs italic text-[#8F6F73]">{item.latinName}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
