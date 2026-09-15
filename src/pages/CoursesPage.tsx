import React, { useState, useMemo, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  BookOpen,
  Search,
  School,
  FileText,
  Layers,
  ChevronRight,
  ShieldCheck,
  Building2,
  ExternalLink,
  Info,
  ChevronDown
} from 'lucide-react';
import { Badge, ProgressBar, EmptyState, Button } from '../components/common/UI';

export const CoursesPage: React.FC<{ initialSemester?: number | 'ppdh' }> = ({
  initialSemester
}) => {
  const { courses, user, officialSources, curriculumMeta, navigate } = useApp();
  const currentSemesterNumber = user?.currentSemester || 3;
  const [selectedSemester, setSelectedSemester] = useState<number | 'all' | 'ppdh'>(
    initialSemester ?? 'all'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [showCurriculumInfo, setShowCurriculumInfo] = useState(false);

  useEffect(() => {
    if (initialSemester !== undefined) {
      setSelectedSemester(initialSemester);
    }
  }, [initialSemester]);

  const filteredCourses = useMemo(() => {
    return courses.filter((c) => {
      // Semester filter
      if (selectedSemester !== 'all') {
        if (selectedSemester === 'ppdh') {
          const isPpdh = c.isPPDH || c.semesterId === 'sem-ppdh' || c.semesterNumber === 9 || c.isClinical;
          if (!isPpdh) return false;
        } else if (c.semesterNumber !== selectedSemester) {
          return false;
        }
      }

      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchTitle = c.name.toLowerCase().includes(query);
        const matchCode = c.code.toLowerCase().includes(query);
        const matchDesc = c.description.toLowerCase().includes(query);
        const matchDept = (c.department || '').toLowerCase().includes(query);
        if (!matchTitle && !matchCode && !matchDesc && !matchDept) return false;
      }

      return true;
    });
  }, [courses, selectedSemester, searchQuery]);

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-[#F3E8E8] shadow-[0_2px_12px_-1px_rgba(45,41,38,0.03)] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-12 h-12 rounded-2xl bg-[#FFF0F5] text-[#B80049] flex items-center justify-center flex-shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#1E1B18] tracking-tight">
                My Courses & Curriculum
              </h1>
              <Badge variant="primary">FKH UGM</Badge>
            </div>
            <p className="text-xs sm:text-sm text-[#5B3F43] mt-0.5">
              Struktur akademik resmi Program Sarjana (151 SKS) & Profesi Dokter Hewan PPDH (37 SKS) FKH UGM.
            </p>
          </div>
        </div>

        {/* Action / Search Input */}
        <div className="flex items-center gap-2 flex-wrap md:flex-nowrap">
          <button
            onClick={() => setShowCurriculumInfo(!showCurriculumInfo)}
            className="px-3.5 py-2 rounded-full border border-[#EEDCDC] bg-[#FAF7F5] hover:bg-[#F5ECE7] text-xs font-semibold text-[#5B3F43] flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Info className="w-4 h-4 text-[#B80049]" />
            <span>Info Kurikulum FKH UGM</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showCurriculumInfo ? 'rotate-180' : ''}`} />
          </button>

          <div className="relative w-full md:w-64 flex-shrink-0">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8F6F73]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari mata kuliah atau kode..."
              className="w-full pl-10 pr-4 py-2 bg-[#FAF7F5] text-xs sm:text-sm rounded-full border border-[#EEDCDC] focus:outline-none focus:bg-white focus:border-[#B80049] text-[#1E1B18] transition-all"
            />
          </div>
        </div>
      </div>

      {/* Expandable Official Curriculum Information Panel */}
      {showCurriculumInfo && (
        <div className="bg-white rounded-2xl p-5 border border-[#F3E8E8] shadow-xs animate-fade-in flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-[#F3E8E8] pb-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <h3 className="font-serif-display font-bold text-base text-[#1E1B18]">
                Basis Pengetahuan Akademik Resmi FKH UGM
              </h3>
            </div>
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              Terakreditasi ASIIN & BAN-PT Unggul
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="bg-[#FAF7F5] p-3.5 rounded-xl border border-[#EEDCDC]">
              <span className="font-bold text-[#1E1B18] block mb-1">
                🎓 Program Sarjana (S.KH)
              </span>
              <p className="text-[#5B3F43] leading-relaxed">
                Total 151 SKS terbagi dalam 8 semester mencakup sains dasar veteriner, preklinik, paraklinik, dan klinik terintegrasi.
              </p>
            </div>

            <div className="bg-[#FAF7F5] p-3.5 rounded-xl border border-[#EEDCDC]">
              <span className="font-bold text-[#1E1B18] block mb-1">
                🩺 Program Profesi (PPDH / drh)
              </span>
              <p className="text-[#5B3F43] leading-relaxed">
                Total 37 SKS rotasi koasistensi intensif di RSH Soeparwi, laboratorium patologi, kesehatan masyarakat veteriner, dan unit satwa.
              </p>
            </div>

            <div className="bg-[#FAF7F5] p-3.5 rounded-xl border border-[#EEDCDC]">
              <span className="font-bold text-[#1E1B18] block mb-1">
                🌐 Sumber Data Terverifikasi
              </span>
              <p className="text-[#5B3F43] leading-relaxed">
                Diambil langsung dari portal resmi fkh.ugm.ac.id, RPKPS UGM, dan Buku Panduan Akademik FKH UGM tanpa fabrikasi.
              </p>
            </div>
          </div>

          {officialSources && officialSources.length > 0 && (
            <div className="pt-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#8F6F73] block mb-2">
                Tautan Rujukan Resmi FKH UGM:
              </span>
              <div className="flex flex-wrap gap-2">
                {officialSources.slice(0, 4).map((src) => (
                  <a
                    key={src.id}
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#EEDCDC] hover:border-[#B80049] text-[11px] text-[#5B3F43] hover:text-[#B80049] transition-colors"
                  >
                    <span>{src.name}</span>
                    <ExternalLink className="w-3 h-3 text-[#8F6F73]" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Semester Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none w-full">
        <button
          onClick={() => setSelectedSemester('all')}
          className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex-shrink-0 ${
            selectedSemester === 'all'
              ? 'bg-[#B80049] text-white shadow-xs'
              : 'bg-white border border-[#EEDCDC] text-[#5B3F43] hover:bg-[#FAF7F5]'
          }`}
        >
          Semua Semester
        </button>

        {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
          <button
            key={sem}
            onClick={() => setSelectedSemester(sem)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex-shrink-0 ${
              selectedSemester === sem
                ? 'bg-[#B80049] text-white shadow-xs'
                : 'bg-white border border-[#EEDCDC] text-[#5B3F43] hover:bg-[#FAF7F5]'
            }`}
          >
            Sem {sem} {sem === currentSemesterNumber && '🌸'}
          </button>
        ))}

        <button
          onClick={() => setSelectedSemester('ppdh')}
          className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex-shrink-0 ${
            selectedSemester === 'ppdh'
              ? 'bg-[#B80049] text-white shadow-xs'
              : 'bg-[#C5E7E1]/50 border border-[#7A9A95]/30 text-[#2E4C48] hover:bg-[#C5E7E1]'
          }`}
        >
          PPDH Clinical 🩺
        </button>
      </div>

      {/* Courses Cards Grid */}
      {filteredCourses.length === 0 ? (
        <EmptyState
          title="Tidak ada mata kuliah yang cocok"
          description="Coba ubah kata kunci pencarian atau pilih semester lain."
          actionText="Tampilkan Semua Semester"
          onAction={() => {
            setSelectedSemester('all');
            setSearchQuery('');
          }}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              onClick={() => navigate(`/courses/${course.id}`)}
              className="bg-white rounded-2xl p-5 border border-[#F3E8E8] shadow-[0_2px_12px_-1px_rgba(45,41,38,0.03)] hover:shadow-[0_8px_24px_-2px_rgba(226,22,95,0.08)] hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between cursor-pointer group min-w-0"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#FFF0F5] border border-[#FFD9DE] p-2 flex items-center justify-center flex-shrink-0">
                    <img
                      src={course.iconImage}
                      alt={course.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                    />
                  </div>

                  <div className="flex items-center gap-1.5 flex-wrap justify-end">
                    {course.verified && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        <ShieldCheck className="w-3 h-3 text-emerald-600" /> Resmi
                      </span>
                    )}
                    <Badge variant={course.semesterNumber === currentSemesterNumber ? 'primary' : 'neutral'}>
                      {course.isPPDH ? 'PPDH' : `Sem ${course.semesterNumber}`}
                    </Badge>
                    <span className="px-2 py-0.5 rounded-full bg-[#FAF7F5] border border-[#EEDCDC] text-[10px] font-bold text-[#5B3F43]">
                      {course.credits} SKS
                    </span>
                  </div>
                </div>

                <div className="mt-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#8F6F73]">
                    {course.code}
                  </span>
                  <h3 className="font-serif-display text-base sm:text-lg font-bold text-[#1E1B18] group-hover:text-[#B80049] transition-colors leading-snug line-clamp-2 min-h-[2.75rem]">
                    {course.name}
                  </h3>
                  <p className="text-xs text-[#5B3F43] mt-1 line-clamp-2 leading-relaxed">
                    {course.description}
                  </p>
                  {course.department && (
                    <span className="inline-block mt-2 text-[10px] text-[#8F6F73] font-medium bg-[#FAF7F5] px-2 py-0.5 rounded-md">
                      {course.department}
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-4 mt-3 border-t border-[#FAF7F5]">
                <div className="flex items-center justify-between text-xs text-[#5B3F43] mb-1.5">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5 text-[#B80049]" />{' '}
                      {course.materialsCount} materi
                    </span>
                    <span className="flex items-center gap-1">
                      <Layers className="w-3.5 h-3.5 text-[#B80049]" />{' '}
                      {course.topicsCount} topik
                    </span>
                  </div>
                  <span className="font-bold text-[#B80049]">{course.progress}%</span>
                </div>

                <ProgressBar value={course.progress} />

                <div className="flex items-center justify-between mt-3 text-xs font-semibold text-[#B80049] group-hover:underline">
                  <span>Buka Silabus & Materi</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
