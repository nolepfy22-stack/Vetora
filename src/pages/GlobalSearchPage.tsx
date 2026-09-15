import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import {
  Search,
  BookOpen,
  FileText,
  Layers,
  HelpCircle,
  Stethoscope,
  Grid,
  ArrowRight,
  X,
  ShieldCheck,
  User,
  ExternalLink,
  CheckCircle,
  Clock,
  Filter
} from 'lucide-react';
import { Badge, Button, ProgressBar } from '../components/common/UI';

export const GlobalSearchPage: React.FC = () => {
  const {
    courses,
    topics,
    materials,
    flashcardDecks,
    quizzes,
    clinicalCases,
    atlasStructures,
    navigate
  } = useApp();

  // Parse search query from URL if available
  const [query, setQuery] = useState(() => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('q') || '';
  });

  const [activeCategory, setActiveCategory] = useState<
    'all' | 'courses' | 'topics' | 'materials' | 'flashcards' | 'quizzes' | 'cases' | 'atlas'
  >('all');

  const [sourceFilter, setSourceFilter] = useState<'all' | 'official' | 'personal' | 'imported'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'in_progress' | 'unstarted'>('all');

  const q = query.trim().toLowerCase();

  // Matched Courses
  const matchedCourses = useMemo(() => {
    return courses.filter((c) => {
      // Source filter
      if (sourceFilter === 'official' && !c.verified) return false;
      if (sourceFilter === 'personal' || sourceFilter === 'imported') return false; // Courses are curriculum-based

      // Status filter
      if (statusFilter === 'completed' && c.progress < 100) return false;
      if (statusFilter === 'in_progress' && (c.progress === 0 || c.progress === 100)) return false;
      if (statusFilter === 'unstarted' && c.progress > 0) return false;

      if (!q) return false;
      return (
        c.name.toLowerCase().includes(q) ||
        c.code.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        (c.department || '').toLowerCase().includes(q)
      );
    });
  }, [courses, q, sourceFilter, statusFilter]);

  // Matched Topics
  const matchedTopics = useMemo(() => {
    return topics.filter((t) => {
      const parentCourse = courses.find((c) => c.id === t.courseId);

      // Status filter
      if (statusFilter === 'completed' && t.progress < 100) return false;
      if (statusFilter === 'in_progress' && (t.progress === 0 || t.progress === 100)) return false;
      if (statusFilter === 'unstarted' && t.progress > 0) return false;

      if (!q) return false;
      return (
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        (parentCourse?.name || '').toLowerCase().includes(q) ||
        (Array.isArray(t.learningOutcomes) &&
          t.learningOutcomes.some((lo) => lo.toLowerCase().includes(q)))
      );
    });
  }, [topics, courses, q, statusFilter]);

  // Matched Materials
  const matchedMaterials = useMemo(() => {
    return materials.filter((m) => {
      // Source filter
      if (sourceFilter === 'official') {
        const isOfficial = m.contentCategory === 'officialContent' || (m.source === 'FKH UGM' && m.verified);
        if (!isOfficial) return false;
      } else if (sourceFilter === 'personal') {
        const isPersonal = m.contentCategory === 'userContent' || m.source === 'Personal';
        if (!isPersonal) return false;
      } else if (sourceFilter === 'imported') {
        const isImported = Boolean(m.sourceUrl);
        if (!isImported) return false;
      }

      // Status filter
      if (!m) return false;
      const isMatCompleted = Boolean(m.isCompleted);
      const progress = typeof m.progressPercent === 'number' ? m.progressPercent : 0;
      if (statusFilter === 'completed' && !isMatCompleted) return false;
      if (statusFilter === 'in_progress' && (isMatCompleted || progress === 0)) return false;
      if (statusFilter === 'unstarted' && (isMatCompleted || progress > 0)) return false;

      if (!q) return false;
      return (
        (m.title || '').toLowerCase().includes(q) ||
        (m.description || '').toLowerCase().includes(q) ||
        (m.source || '').toLowerCase().includes(q) ||
        (Array.isArray(m.tags) && m.tags.some((t) => t.toLowerCase().includes(q)))
      );
    });
  }, [materials, q, sourceFilter, statusFilter]);

  // Matched Flashcards
  const matchedDecks = useMemo(() => {
    return flashcardDecks.filter((d) => {
      if (!d) return false;
      if (sourceFilter === 'personal' || sourceFilter === 'imported') return false;
      if (!q) return false;
      return (
        (d.title || '').toLowerCase().includes(q) ||
        (d.description || '').toLowerCase().includes(q) ||
        (Array.isArray(d.cards) &&
          d.cards.some(
            (c) =>
              c &&
              ((c.question || '').toLowerCase().includes(q) ||
                (c.answer || '').toLowerCase().includes(q))
          ))
      );
    });
  }, [flashcardDecks, q, sourceFilter]);

  // Matched Quizzes
  const matchedQuizzes = useMemo(() => {
    return quizzes.filter((quiz) => {
      if (!quiz) return false;
      if (sourceFilter === 'personal' || sourceFilter === 'imported') return false;
      const isQuizCompleted = (quiz.attemptsCount || 0) > 0;
      if (statusFilter === 'completed' && !isQuizCompleted) return false;
      if (statusFilter === 'in_progress' && (isQuizCompleted || (!quiz.lastScore && !quiz.bestScore))) return false;
      if (statusFilter === 'unstarted' && (isQuizCompleted || quiz.lastScore !== undefined || quiz.bestScore !== undefined)) return false;

      if (!q) return false;
      return (
        (quiz.title || '').toLowerCase().includes(q) ||
        (quiz.description || '').toLowerCase().includes(q)
      );
    });
  }, [quizzes, q, sourceFilter, statusFilter]);

  // Matched Cases
  const matchedCases = useMemo(() => {
    return clinicalCases.filter((c) => {
      if (!c) return false;
      if (sourceFilter === 'personal' || sourceFilter === 'imported') return false;
      const isCaseCompleted = c.status === 'completed';
      if (statusFilter === 'completed' && !isCaseCompleted) return false;
      if (statusFilter === 'in_progress' && (isCaseCompleted || c.status !== 'in-progress')) return false;
      if (statusFilter === 'unstarted' && (isCaseCompleted || c.status !== 'not-started')) return false;

      if (!q) return false;
      return (
        (c.title || '').toLowerCase().includes(q) ||
        (c.patientName || '').toLowerCase().includes(q) ||
        (c.chiefComplaint || '').toLowerCase().includes(q) ||
        (c.species || '').toLowerCase().includes(q)
      );
    });
  }, [clinicalCases, q, sourceFilter, statusFilter]);

  // Matched Atlas
  const matchedAtlas = useMemo(() => {
    return atlasStructures.filter((a) => {
      if (sourceFilter === 'personal' || sourceFilter === 'imported') return false;
      if (!q) return false;
      return (
        a.name.toLowerCase().includes(q) ||
        a.latinName.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q) ||
        a.system.toLowerCase().includes(q)
      );
    });
  }, [atlasStructures, q, sourceFilter]);

  const totalResults =
    matchedCourses.length +
    matchedTopics.length +
    matchedMaterials.length +
    matchedDecks.length +
    matchedQuizzes.length +
    matchedCases.length +
    matchedAtlas.length;

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Search Bar Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#F3E8E8] shadow-sm flex flex-col gap-4">
        <h1 className="font-serif-display font-bold text-2xl sm:text-3xl text-[#1E1B18]">
          Pencarian Terpadu Akademik VETORA
        </h1>
        <p className="text-sm text-[#5B3F43]">
          Eksplorasi kurikulum FKH UGM: mata kuliah sarjana & PPDH, topik bahasan, materi rujukan, terminologi anatomi latin, kasus klinis, dan flashcards.
        </p>

        {/* Input Bar */}
        <div className="relative w-full mt-2">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[#8F6F73]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ketik kata kunci (misal: Anatomi, Cor, Splanchnologia, Bedah, Zoonosis)..."
            className="w-full pl-12 pr-10 py-3 bg-[#FAF7F5] rounded-full border border-[#EEDCDC] text-base text-[#1E1B18] placeholder:text-[#8F6F73] focus:outline-none focus:bg-white focus:border-[#B80049] shadow-xs"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8F6F73] hover:text-[#1E1B18] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filters Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#FAF7F5]">
          <div className="flex flex-wrap items-center gap-3">
            {/* Source Provenance Filter */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="font-semibold text-[#5B3F43] flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#B80049]" /> Sumber:
              </span>
              <select
                value={sourceFilter}
                onChange={(e) => setSourceFilter(e.target.value as any)}
                className="bg-[#FAF7F5] border border-[#EEDCDC] rounded-full px-3 py-1 text-xs text-[#1E1B18] focus:outline-none focus:border-[#B80049]"
              >
                <option value="all">Semua Sumber</option>
                <option value="official">Resmi FKH UGM</option>
                <option value="personal">Catatan Pribadi</option>
                <option value="imported">Diimpor dari Web</option>
              </select>
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="font-semibold text-[#5B3F43] flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> Status:
              </span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="bg-[#FAF7F5] border border-[#EEDCDC] rounded-full px-3 py-1 text-xs text-[#1E1B18] focus:outline-none focus:border-[#B80049]"
              >
                <option value="all">Semua Status</option>
                <option value="completed">Sudah Selesai</option>
                <option value="in_progress">Sedang Dipelajari</option>
                <option value="unstarted">Belum Dimulai</option>
              </select>
            </div>
          </div>

          <span className="text-xs text-[#8F6F73] font-medium">
            {q ? `${totalResults} hasil ditemukan` : 'Ketik untuk melihat hasil'}
          </span>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 scrollbar-thin">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-[#B80049] text-white'
                : 'bg-[#FAF7F5] text-[#5B3F43] hover:bg-[#F5ECE7]'
            }`}
          >
            Semua Hasil ({q ? totalResults : 0})
          </button>
          <button
            onClick={() => setActiveCategory('courses')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              activeCategory === 'courses'
                ? 'bg-[#B80049] text-white'
                : 'bg-[#FAF7F5] text-[#5B3F43] hover:bg-[#F5ECE7]'
            }`}
          >
            Mata Kuliah ({matchedCourses.length})
          </button>
          <button
            onClick={() => setActiveCategory('topics')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              activeCategory === 'topics'
                ? 'bg-[#B80049] text-white'
                : 'bg-[#FAF7F5] text-[#5B3F43] hover:bg-[#F5ECE7]'
            }`}
          >
            Topik Bahasan ({matchedTopics.length})
          </button>
          <button
            onClick={() => setActiveCategory('materials')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              activeCategory === 'materials'
                ? 'bg-[#B80049] text-white'
                : 'bg-[#FAF7F5] text-[#5B3F43] hover:bg-[#F5ECE7]'
            }`}
          >
            Materi ({matchedMaterials.length})
          </button>
          <button
            onClick={() => setActiveCategory('flashcards')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              activeCategory === 'flashcards'
                ? 'bg-[#B80049] text-white'
                : 'bg-[#FAF7F5] text-[#5B3F43] hover:bg-[#F5ECE7]'
            }`}
          >
            Flashcards ({matchedDecks.length})
          </button>
          <button
            onClick={() => setActiveCategory('quizzes')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              activeCategory === 'quizzes'
                ? 'bg-[#B80049] text-white'
                : 'bg-[#FAF7F5] text-[#5B3F43] hover:bg-[#F5ECE7]'
            }`}
          >
            Kuis ({matchedQuizzes.length})
          </button>
          <button
            onClick={() => setActiveCategory('cases')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              activeCategory === 'cases'
                ? 'bg-[#B80049] text-white'
                : 'bg-[#FAF7F5] text-[#5B3F43] hover:bg-[#F5ECE7]'
            }`}
          >
            Kasus ({matchedCases.length})
          </button>
          <button
            onClick={() => setActiveCategory('atlas')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              activeCategory === 'atlas'
                ? 'bg-[#B80049] text-white'
                : 'bg-[#FAF7F5] text-[#5B3F43] hover:bg-[#F5ECE7]'
            }`}
          >
            Atlas ({matchedAtlas.length})
          </button>
        </div>
      </div>

      {/* Search Results Area */}
      {!q ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-[#EEDCDC]">
          <Search className="w-10 h-10 text-[#8F6F73] mx-auto mb-2" />
          <h3 className="font-serif-display font-bold text-lg text-[#1E1B18]">
            Mulai Mengetik untuk Menjelajahi Kurikulum
          </h3>
          <p className="text-xs text-[#5B3F43] mt-1">
            Gunakan kata kunci bahasa Indonesia atau latin seperti "Anatomi", "Cor", "Valva", "Mastitis", "Bedah", "Zoonosis".
          </p>
        </div>
      ) : totalResults === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-[#EEDCDC]">
          <h3 className="font-serif-display font-bold text-lg text-[#1E1B18]">
            Tidak Ditemukan Hasil untuk "{query}"
          </h3>
          <p className="text-xs text-[#5B3F43] mt-1">
            Coba periksa filter sumber/status atau gunakan sinonim istilah klinis lainnya.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {/* Courses matches */}
          {(activeCategory === 'all' || activeCategory === 'courses') && matchedCourses.length > 0 && (
            <div className="flex flex-col gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8F6F73] flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-[#B80049]" /> Mata Kuliah ({matchedCourses.length})
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {matchedCourses.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => navigate(`/courses/${c.id}`)}
                    className="p-4 rounded-2xl bg-white border border-[#F3E8E8] shadow-xs hover:border-[#FFD9DE] hover:-translate-y-0.5 transition-all cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-bold text-[#B80049] uppercase bg-[#FFF0F5] px-2 py-0.5 rounded-full">
                          {c.code}
                        </span>
                        {c.verified && (
                          <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-md border border-emerald-200">
                            <ShieldCheck className="w-2.5 h-2.5 text-emerald-600" /> Resmi FKH UGM
                          </span>
                        )}
                      </div>
                      <h4 className="font-serif-display font-bold text-base text-[#1E1B18] mt-0.5 line-clamp-1">
                        {c.name}
                      </h4>
                      <p className="text-xs text-[#5B3F43] mt-1 line-clamp-2">{c.description}</p>
                    </div>

                    <div className="pt-3 mt-3 border-t border-[#FAF7F5] flex items-center justify-between text-xs text-[#8F6F73]">
                      <span>{c.credits} SKS</span>
                      <span className="text-[#B80049] font-bold">{c.progress}% selesai</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Topics matches */}
          {(activeCategory === 'all' || activeCategory === 'topics') && matchedTopics.length > 0 && (
            <div className="flex flex-col gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8F6F73] flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-[#B80049]" /> Topik Bahasan ({matchedTopics.length})
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {matchedTopics.map((t) => {
                  const course = courses.find((c) => c.id === t.courseId);
                  return (
                    <div
                      key={t.id}
                      onClick={() => navigate(`/courses/${t.courseId}`)}
                      className="p-4 rounded-2xl bg-white border border-[#F3E8E8] shadow-xs hover:border-[#FFD9DE] hover:-translate-y-0.5 transition-all cursor-pointer flex flex-col justify-between"
                    >
                      <div>
                        <span className="text-[10px] font-bold text-[#456460] bg-[#C5E7E1]/40 px-2 py-0.5 rounded-full uppercase">
                          {course?.code || 'Topik Kuliah'}
                        </span>
                        <h4 className="font-serif-display font-bold text-base text-[#1E1B18] mt-1.5 line-clamp-1">
                          {t.name}
                        </h4>
                        <p className="text-xs text-[#5B3F43] mt-1 line-clamp-2">{t.description}</p>
                      </div>
                      <div className="pt-3 mt-3 border-t border-[#FAF7F5] flex items-center justify-between text-xs text-[#B80049] font-semibold">
                        <span>Lihat Modul Topik</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Materials matches */}
          {(activeCategory === 'all' || activeCategory === 'materials') && matchedMaterials.length > 0 && (
            <div className="flex flex-col gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8F6F73] flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-[#B80049]" /> Materi Pembelajaran & Rujukan ({matchedMaterials.length})
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {matchedMaterials.map((m) => {
                  const course = courses.find((c) => c.id === m.courseId);
                  const isUserCreated = m.contentCategory === 'userContent' || m.source === 'Personal';

                  return (
                    <div
                      key={m.id}
                      onClick={() => navigate(`/materials/${m.id}/read`)}
                      className="p-4 rounded-2xl bg-white border border-[#F3E8E8] shadow-xs hover:border-[#FFD9DE] hover:-translate-y-0.5 transition-all cursor-pointer flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-bold text-[#456460] uppercase bg-[#C5E7E1]/40 px-2 py-0.5 rounded-full">
                              {course?.code || m.type}
                            </span>
                            {m.verified ? (
                              <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-md border border-emerald-200">
                                <ShieldCheck className="w-2.5 h-2.5 text-emerald-600" /> Terverifikasi
                              </span>
                            ) : isUserCreated ? (
                              <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded-md border border-blue-200">
                                <User className="w-2.5 h-2.5 text-blue-600" /> Personal
                              </span>
                            ) : null}
                          </div>

                          <span className="text-[11px] text-[#8F6F73] flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {m.readingTimeMinutes} min
                          </span>
                        </div>

                        <h4 className="font-serif-display font-bold text-base text-[#1E1B18] mt-1 line-clamp-1">
                          {m.title}
                        </h4>
                        <p className="text-xs text-[#5B3F43] line-clamp-2 mt-0.5">{m.description}</p>
                      </div>

                      <div className="pt-3 mt-3 border-t border-[#FAF7F5] flex items-center justify-between text-xs">
                        <span className="text-[#8F6F73]">
                          Sumber: <strong className="text-[#1E1B18]">{m.source || 'FKH UGM'}</strong>
                        </span>
                        <span className="text-[#B80049] font-bold flex items-center gap-1">
                          Buka Materi <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Flashcards matches */}
          {(activeCategory === 'all' || activeCategory === 'flashcards') && matchedDecks.length > 0 && (
            <div className="flex flex-col gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8F6F73] flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-[#B80049]" /> Flashcards ({matchedDecks.length})
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {matchedDecks.map((d) => (
                  <div
                    key={d.id}
                    onClick={() => navigate(`/flashcards/${d.id}/study`)}
                    className="p-4 rounded-2xl bg-white border border-[#F3E8E8] shadow-xs hover:border-[#FFD9DE] hover:-translate-y-0.5 transition-all cursor-pointer"
                  >
                    <span className="text-[10px] font-bold text-[#456460] uppercase">{d.subject}</span>
                    <h4 className="font-serif-display font-bold text-base text-[#1E1B18] mt-0.5">{d.title}</h4>
                    <p className="text-xs text-[#5B3F43] mt-1 line-clamp-2">{d.description}</p>
                    <span className="text-[11px] text-[#8F6F73] block mt-2">{d.cardsCount} kartu hafalan</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quizzes matches */}
          {(activeCategory === 'all' || activeCategory === 'quizzes') && matchedQuizzes.length > 0 && (
            <div className="flex flex-col gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8F6F73] flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-[#B80049]" /> Kuis & Ujian ({matchedQuizzes.length})
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {matchedQuizzes.map((q) => (
                  <div
                    key={q.id}
                    onClick={() => navigate(`/quizzes/${q.id}/take`)}
                    className="p-4 rounded-2xl bg-white border border-[#F3E8E8] shadow-xs hover:border-[#FFD9DE] hover:-translate-y-0.5 transition-all cursor-pointer"
                  >
                    <span className="text-[10px] font-bold text-[#B80049] uppercase">{q.subject}</span>
                    <h4 className="font-serif-display font-bold text-base text-[#1E1B18] mt-0.5">{q.title}</h4>
                    <p className="text-xs text-[#5B3F43] mt-1 line-clamp-2">{q.description}</p>
                    <div className="flex items-center justify-between text-[11px] text-[#8F6F73] mt-3 pt-2 border-t border-[#FAF7F5]">
                      <span>{q.questionsCount} soal</span>
                      <span>{q.timeLimitMinutes} menit</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Clinical Cases matches */}
          {(activeCategory === 'all' || activeCategory === 'cases') && matchedCases.length > 0 && (
            <div className="flex flex-col gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8F6F73] flex items-center gap-1.5">
                <Stethoscope className="w-4 h-4 text-[#B80049]" /> Rekam Medis Kasus Klinis ({matchedCases.length})
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {matchedCases.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => navigate(`/cases/${c.id}`)}
                    className="p-4 rounded-2xl bg-white border border-[#F3E8E8] shadow-xs hover:border-[#FFD9DE] hover:-translate-y-0.5 transition-all cursor-pointer flex items-center justify-between gap-3"
                  >
                    <div>
                      <span className="text-[10px] font-bold text-[#8F6F73] uppercase">{c.species} · {c.patientName}</span>
                      <h4 className="font-serif-display font-bold text-base text-[#1E1B18] mt-0.5">{c.title}</h4>
                      <p className="text-xs text-[#5B3F43] line-clamp-1 mt-0.5">{c.chiefComplaint}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#B80049] flex-shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Atlas Structures matches */}
          {(activeCategory === 'all' || activeCategory === 'atlas') && matchedAtlas.length > 0 && (
            <div className="flex flex-col gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8F6F73] flex items-center gap-1.5">
                <Grid className="w-4 h-4 text-[#B80049]" /> Atlas Struktur Anatomi ({matchedAtlas.length})
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {matchedAtlas.map((a) => (
                  <div
                    key={a.id}
                    onClick={() => navigate('/atlas')}
                    className="p-4 rounded-2xl bg-white border border-[#F3E8E8] shadow-xs hover:border-[#FFD9DE] hover:-translate-y-0.5 transition-all cursor-pointer"
                  >
                    <span className="text-[10px] font-bold text-[#B80049] uppercase">{a.system}</span>
                    <h4 className="font-serif-display font-bold text-base text-[#1E1B18] mt-0.5">{a.name}</h4>
                    <p className="text-xs font-serif italic text-[#8F6F73]">{a.latinName}</p>
                    <p className="text-xs text-[#5B3F43] mt-1 line-clamp-2">{a.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
