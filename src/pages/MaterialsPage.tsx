import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import {
  FileText,
  Search,
  Bookmark,
  BookmarkCheck,
  CheckCircle,
  Clock,
  ArrowRight,
  Filter,
  Sparkles,
  Plus,
  Link2,
  ShieldCheck,
  User,
  ExternalLink,
  Trash2,
  Globe,
  AlertCircle,
  BookOpen,
  Info
} from 'lucide-react';
import { Badge, Button, ProgressBar, Modal } from '../components/common/UI';
import { Material, MaterialType } from '../types';

export const MaterialsPage: React.FC = () => {
  const {
    materials,
    courses,
    semesters,
    topics,
    toggleSaveMaterial,
    addMaterial,
    deleteMaterial,
    importMaterialFromUrl,
    navigate
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<string>('all');
  const [selectedSemester, setSelectedSemester] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [sourceCategoryFilter, setSourceCategoryFilter] = useState<'all' | 'official' | 'personal' | 'imported'>('all');
  const [savedOnly, setSavedOnly] = useState<boolean>(false);
  const [completionFilter, setCompletionFilter] = useState<'all' | 'completed' | 'in_progress'>('all');

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  // New Material Form State
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newCourseId, setNewCourseId] = useState(courses[0]?.id || '');
  const [newSemesterId, setNewSemesterId] = useState('sem-3');
  const [newTopicId, setNewTopicId] = useState('');
  const [newType, setNewType] = useState<MaterialType>('Catatan Kuliah');
  const [newReadingTime, setNewReadingTime] = useState(10);
  const [newKeyPoints, setNewKeyPoints] = useState('');
  const [newContent, setNewContent] = useState('');

  // URL Import Form State
  const [importUrl, setImportUrl] = useState('');
  const [importTitle, setImportTitle] = useState('');
  const [importDescription, setImportDescription] = useState('');
  const [importCourseId, setImportCourseId] = useState(courses[0]?.id || '');
  const [importSemesterId, setImportSemesterId] = useState('sem-3');
  const [importType, setImportType] = useState<MaterialType>('Clinical Reference');
  const [isAnalyzingUrl, setIsAnalyzingUrl] = useState(false);
  const [importExtracted, setImportExtracted] = useState(false);

  // Filter materials based on search and selected facets
  const filteredMaterials = useMemo(() => {
    return materials.filter((m) => {
      if (!m) return false;
      if (savedOnly && !m.isSaved) return false;
      if (selectedCourse !== 'all' && m.courseId !== selectedCourse) return false;
      if (selectedSemester !== 'all' && m.semesterId !== selectedSemester) return false;
      if (selectedType !== 'all' && m.type !== selectedType) return false;
      const isMatCompleted = Boolean(m.isCompleted);
      const progress = typeof m.progressPercent === 'number' ? m.progressPercent : 0;
      if (completionFilter === 'completed' && !isMatCompleted) return false;
      if (completionFilter === 'in_progress' && (isMatCompleted || progress === 0)) return false;

      // Source Provenance filter
      if (sourceCategoryFilter === 'official') {
        const isOfficial = m.contentCategory === 'officialContent' || (m.source === 'FKH UGM' && m.verified);
        if (!isOfficial) return false;
      } else if (sourceCategoryFilter === 'personal') {
        const isPersonal = m.contentCategory === 'userContent' || m.source === 'Personal';
        if (!isPersonal) return false;
      } else if (sourceCategoryFilter === 'imported') {
        const isImported = Boolean(m.sourceUrl) || m.tags?.includes('Imported');
        if (!isImported) return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = m.title.toLowerCase().includes(q);
        const matchDesc = m.description.toLowerCase().includes(q);
        const matchSource = (m.source || '').toLowerCase().includes(q);
        const matchTags = Array.isArray(m.tags) ? m.tags.some((t) => t.toLowerCase().includes(q)) : false;
        if (!matchTitle && !matchDesc && !matchSource && !matchTags) return false;
      }

      return true;
    });
  }, [
    materials,
    savedOnly,
    selectedCourse,
    selectedSemester,
    selectedType,
    sourceCategoryFilter,
    completionFilter,
    searchQuery
  ]);

  // Handle URL analyze simulation
  const handleAnalyzeUrl = () => {
    if (!importUrl.trim()) return;
    setIsAnalyzingUrl(true);

    setTimeout(() => {
      let hostname = 'web-source.com';
      try {
        const parsed = new URL(importUrl.startsWith('http') ? importUrl : `https://${importUrl}`);
        hostname = parsed.hostname;
      } catch {
        hostname = 'external-source';
      }

      const isUgm = hostname.includes('ugm.ac.id');
      const urlLower = importUrl.toLowerCase();

      // Smart topic/course prediction
      let matchedCourse = courses[0]?.id || '';
      let matchedSemester = 'sem-3';
      let titleGuess = `Materi Akademik dari ${hostname}`;
      let typeGuess: MaterialType = isUgm ? 'Module Handbook' : 'Clinical Reference';

      if (urlLower.includes('anatomi')) {
        const found = courses.find((c) => c.code.toLowerCase().includes('ant') || c.name.toLowerCase().includes('anatomi'));
        if (found) {
          matchedCourse = found.id;
          matchedSemester = found.semesterId || 'sem-1';
        }
        titleGuess = 'Panduan & Diktat Komparatif Anatomi Veteriner';
      } else if (urlLower.includes('bedah') || urlLower.includes('surgery')) {
        const found = courses.find((c) => c.name.toLowerCase().includes('bedah'));
        if (found) {
          matchedCourse = found.id;
          matchedSemester = found.semesterId || 'sem-6';
        }
        titleGuess = 'Prosedur & Protokol Bedah Veteriner Lapangan';
      } else if (urlLower.includes('fisiologi')) {
        const found = courses.find((c) => c.name.toLowerCase().includes('fisiologi'));
        if (found) {
          matchedCourse = found.id;
          matchedSemester = found.semesterId || 'sem-3';
        }
        titleGuess = 'Kajian Fisiologi Hewan Komparatif';
      } else if (urlLower.includes('ppdh') || urlLower.includes('koas')) {
        const found = courses.find((c) => c.isPPDH);
        if (found) {
          matchedCourse = found.id;
          matchedSemester = 'sem-ppdh';
        }
        titleGuess = 'Standar Operasional Klinis Koasistensi PPDH FKH UGM';
      }

      setImportTitle(titleGuess);
      setImportDescription(
        `Materi rujukan terverifikasi dari ${hostname} mengenai aspek klinis dan dasar kedokteran hewan untuk pembelajaran mandiri mahasiswa.`
      );
      setImportCourseId(matchedCourse);
      setImportSemesterId(matchedSemester);
      setImportType(typeGuess);
      setIsAnalyzingUrl(false);
      setImportExtracted(true);
    }, 650);
  };

  const handleSaveImport = () => {
    if (!importTitle.trim() || !importUrl.trim()) return;

    importMaterialFromUrl({
      url: importUrl,
      title: importTitle,
      description: importDescription,
      courseId: importCourseId,
      topicId: topics.find((t) => t.courseId === importCourseId)?.id || 'top-1',
      semesterId: importSemesterId,
      type: importType,
      content: `### Rujukan Terimpor\n\nSumber Resmi: [${importUrl}](${importUrl})\n\n${importDescription}\n\nMateri ini telah dicatat ke dalam modul belajar pribadi Anda dengan penandaan sumber yang jelas.`,
      keyPoints: [
        `URL Sumber: ${importUrl}`,
        `Kategori: ${importType}`,
        `Status: ${importUrl.includes('ugm.ac.id') ? 'Terverifikasi FKH UGM' : 'Sumber Web Mandiri'}`
      ]
    });

    setIsImportModalOpen(false);
    setImportUrl('');
    setImportTitle('');
    setImportDescription('');
    setImportExtracted(false);
  };

  const handleSaveNewMaterial = () => {
    if (!newTitle.trim()) return;

    const points = newKeyPoints
      .split('\n')
      .map((p) => p.trim())
      .filter(Boolean);

    addMaterial({
      title: newTitle,
      description: newDescription || 'Catatan materi pribadi mahasiswa FKH UGM.',
      type: newType,
      courseId: newCourseId,
      topicId: newTopicId || topics.find((t) => t.courseId === newCourseId)?.id || 'top-1',
      semesterId: newSemesterId,
      readTimeMinutes: Number(newReadingTime) || 10,
      readingTimeMinutes: Number(newReadingTime) || 10,
      tags: ['Catatan Pribadi', newType],
      source: 'Personal',
      sourceType: 'Personal Notes',
      contentCategory: 'userContent',
      verified: false,
      status: 'published',
      sections: [
        {
          id: `sec-user-${Date.now()}-1`,
          title: newTitle,
          readingTimeMinutes: Number(newReadingTime) || 10,
          keyPoints: points.length > 0 ? points : ['Catatan pribadi mahasiswa FKH UGM.'],
          content: newContent || newDescription || 'Belum ada catatan detail.'
        }
      ]
    });

    setIsAddModalOpen(false);
    setNewTitle('');
    setNewDescription('');
    setNewKeyPoints('');
    setNewContent('');
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#F3E8E8]">
        <div>
          <div className="flex items-center gap-2 text-[#B80049] mb-1">
            <FileText className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">
              VETORA Library & Academic Repository
            </span>
          </div>
          <h1 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#1E1B18]">
            Daftar Materi Kuliah & Rujukan
          </h1>
          <p className="text-sm text-[#5B3F43] mt-0.5">
            Diktat resmi FKH UGM, panduan klinis, RPKPS, serta catatan studi mandiri dengan atribusi sumber yang jelas.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            icon={Link2}
            onClick={() => setIsImportModalOpen(true)}
            className="text-xs"
          >
            Impor dari URL
          </Button>

          <Button
            variant="primary"
            size="sm"
            icon={Plus}
            onClick={() => setIsAddModalOpen(true)}
            className="text-xs"
          >
            Tambah Materi Saya
          </Button>
        </div>
      </div>

      {/* Top Search & Category Filter Bar */}
      <div className="flex flex-col gap-4">
        {/* Source Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <button
            onClick={() => setSourceCategoryFilter('all')}
            className={`px-3.5 py-1.5 rounded-full font-semibold transition-all whitespace-nowrap cursor-pointer ${
              sourceCategoryFilter === 'all'
                ? 'bg-[#1E1B18] text-white shadow-xs'
                : 'bg-white border border-[#EEDCDC] text-[#5B3F43] hover:bg-[#FAF7F5]'
            }`}
          >
            Semua Sumber ({materials.length})
          </button>

          <button
            onClick={() => setSourceCategoryFilter('official')}
            className={`px-3.5 py-1.5 rounded-full font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              sourceCategoryFilter === 'official'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-white border border-emerald-200 text-emerald-800 hover:bg-emerald-50'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" /> Resmi FKH UGM (
            {materials.filter((m) => m.verified || m.contentCategory === 'officialContent').length})
          </button>

          <button
            onClick={() => setSourceCategoryFilter('personal')}
            className={`px-3.5 py-1.5 rounded-full font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              sourceCategoryFilter === 'personal'
                ? 'bg-blue-700 text-white shadow-xs'
                : 'bg-white border border-blue-200 text-blue-800 hover:bg-blue-50'
            }`}
          >
            <User className="w-3.5 h-3.5" /> Catatan Pribadi (
            {materials.filter((m) => m.contentCategory === 'userContent' || m.source === 'Personal').length})
          </button>

          <button
            onClick={() => setSourceCategoryFilter('imported')}
            className={`px-3.5 py-1.5 rounded-full font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              sourceCategoryFilter === 'imported'
                ? 'bg-amber-700 text-white shadow-xs'
                : 'bg-white border border-amber-200 text-amber-800 hover:bg-amber-50'
            }`}
          >
            <Globe className="w-3.5 h-3.5" /> Diimpor Web (
            {materials.filter((m) => Boolean(m.sourceUrl)).length})
          </button>
        </div>

        {/* Detailed Filters Toolbar */}
        <div className="flex flex-wrap items-center gap-3 bg-white p-4 rounded-2xl border border-[#F3E8E8]">
          {/* Search bar */}
          <div className="relative flex-1 min-w-[220px]">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8F6F73]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari materi, topik, atau kata kunci..."
              className="w-full pl-9 pr-4 py-1.5 bg-[#FAF7F5] text-xs rounded-full border border-[#EEDCDC] focus:outline-none focus:border-[#B80049] text-[#1E1B18]"
            />
          </div>

          {/* Semester Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold text-[#5B3F43]">Semester:</span>
            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              className="text-xs bg-[#FAF7F5] border border-[#EEDCDC] rounded-full px-3 py-1.5 focus:outline-none focus:border-[#B80049] text-[#1E1B18]"
            >
              <option value="all">Semua Semester</option>
              {semesters.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.title}
                </option>
              ))}
            </select>
          </div>

          {/* Course Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold text-[#5B3F43]">Mata Kuliah:</span>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="text-xs bg-[#FAF7F5] border border-[#EEDCDC] rounded-full px-3 py-1.5 focus:outline-none focus:border-[#B80049] text-[#1E1B18] max-w-[180px] truncate"
            >
              <option value="all">Semua Mata Kuliah</option>
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.code} - {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Type Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold text-[#5B3F43]">Tipe:</span>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="text-xs bg-[#FAF7F5] border border-[#EEDCDC] rounded-full px-3 py-1.5 focus:outline-none focus:border-[#B80049] text-[#1E1B18]"
            >
              <option value="all">Semua Tipe</option>
              <option value="Module Handbook">Module Handbook</option>
              <option value="RPKPS">RPKPS</option>
              <option value="Clinical Reference">Clinical Reference</option>
              <option value="Catatan Kuliah">Catatan Kuliah</option>
              <option value="Ringkasan Diktat">Ringkasan Diktat</option>
              <option value="Panduan Praktikum">Panduan Praktikum</option>
            </select>
          </div>

          {/* Saved Toggle */}
          <button
            onClick={() => setSavedOnly(!savedOnly)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ml-auto ${
              savedOnly
                ? 'bg-[#FFD9DE] text-[#B80049] font-bold'
                : 'bg-[#FAF7F5] text-[#5B3F43] hover:bg-[#F5ECE7]'
            }`}
          >
            {savedOnly ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
            <span>Tersimpan</span>
          </button>
        </div>
      </div>

      {/* Materials List */}
      {filteredMaterials.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-[#EEDCDC] p-12 text-center my-4">
          <FileText className="w-10 h-10 text-[#8F6F73] mx-auto mb-2" />
          <h3 className="font-serif-display text-lg font-bold text-[#1E1B18]">
            Tidak ada materi yang cocok
          </h3>
          <p className="text-xs text-[#5B3F43] mt-1">
            Silakan sesuaikan filter pencarian atau tambahkan catatan materi Anda sendiri.
          </p>
          <div className="flex justify-center gap-3 mt-4">
            <Button size="sm" variant="outline" onClick={() => setIsImportModalOpen(true)}>
              Impor dari URL
            </Button>
            <Button size="sm" variant="primary" onClick={() => setIsAddModalOpen(true)}>
              Tambah Materi Baru
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredMaterials.map((mat) => {
            const course = courses.find((c) => c.id === mat.courseId);
            const isUserCreated = mat.contentCategory === 'userContent' || mat.source === 'Personal';

            return (
              <div
                key={mat.id}
                className="bg-white rounded-2xl p-5 border border-[#F3E8E8] shadow-[0_2px_12px_-1px_rgba(45,41,38,0.03)] hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Category & Provenance Badge Header */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#456460] bg-[#C5E7E1]/40 px-2 py-0.5 rounded-full">
                        {course?.code || 'FKH UGM'}
                      </span>

                      {mat.verified ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                          <ShieldCheck className="w-3 h-3 text-emerald-600" /> Terverifikasi
                        </span>
                      ) : isUserCreated ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                          <User className="w-3 h-3 text-blue-600" /> Personal
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#8F6F73] bg-[#FAF7F5] px-2 py-0.5 rounded-md border border-[#EEDCDC]">
                          Web Reference
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1">
                      {isUserCreated && (
                        <button
                          onClick={() => deleteMaterial(mat.id)}
                          className="p-1 text-[#8F6F73] hover:text-red-600 rounded-full transition-colors cursor-pointer"
                          title="Hapus Catatan Pribadi"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}

                      <button
                        onClick={() => toggleSaveMaterial(mat.id)}
                        className={`p-1 rounded-full transition-colors cursor-pointer ${
                          mat.isSaved
                            ? 'text-[#B80049] bg-[#FFF0F5]'
                            : 'text-[#8F6F73] hover:text-[#B80049]'
                        }`}
                        title={mat.isSaved ? 'Hapus simpan' : 'Simpan materi'}
                      >
                        {mat.isSaved ? (
                          <BookmarkCheck className="w-4 h-4 fill-current" />
                        ) : (
                          <Bookmark className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <h3
                    onClick={() => navigate(`/materials/${mat.id}/read`)}
                    className="font-serif-display font-bold text-base sm:text-lg text-[#1E1B18] hover:text-[#B80049] transition-colors mt-1 cursor-pointer line-clamp-2 min-h-[3rem] leading-snug"
                  >
                    {mat.title}
                  </h3>

                  <p className="text-xs text-[#5B3F43] mt-1 line-clamp-2 leading-relaxed">
                    {mat.description}
                  </p>

                  <div className="flex items-center justify-between text-[11px] text-[#8F6F73] mt-3">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {mat.readingTimeMinutes} min baca
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FAF7F5] border border-[#EEDCDC] font-medium">
                      {mat.type}
                    </span>
                  </div>

                  {/* Provenance source display */}
                  <div className="mt-2 text-[11px] text-[#8F6F73] flex items-center justify-between border-t border-[#FAF7F5] pt-2">
                    <span className="truncate max-w-[170px]">
                      Sumber: <span className="font-semibold text-[#1E1B18]">{mat.source || 'FKH UGM'}</span>
                    </span>
                    {mat.sourceUrl && (
                      <a
                        href={mat.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#B80049] hover:underline inline-flex items-center gap-0.5 text-[10px] font-semibold"
                      >
                        Rujukan <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    )}
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-[#FAF7F5]">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-[#5B3F43]">
                      {mat.isCompleted ? (
                        <span className="text-[#2E4C48] font-bold flex items-center gap-1">
                          <CheckCircle className="w-3.5 h-3.5 text-[#2E4C48]" /> Selesai
                        </span>
                      ) : (
                        `Progres: ${mat.progressPercent}%`
                      )}
                    </span>
                    <Button
                      size="sm"
                      variant="primary"
                      icon={ArrowRight}
                      iconPosition="right"
                      onClick={() => navigate(`/materials/${mat.id}/read`)}
                    >
                      {mat.isCompleted ? 'Baca Ulang' : mat.progressPercent > 0 ? 'Lanjut' : 'Baca'}
                    </Button>
                  </div>
                  <ProgressBar value={mat.progressPercent} />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal: Tambah Materi Baru (User Material Management) */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Tambah Catatan & Materi Kuliah Baru"
        maxWidth="md"
      >
        <div className="flex flex-col gap-4 text-xs">
          <div className="bg-blue-50 p-3 rounded-xl border border-blue-200 text-blue-800 flex items-start gap-2">
            <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <p>
              Materi yang Anda buat akan disimpan di ruang belajar lokal Anda dan secara otomatis
              diberi label <strong>"Catatan Mahasiswa / Personal"</strong> untuk menjaga integritas data resmi FKH UGM.
            </p>
          </div>

          <div>
            <label className="block font-semibold text-[#1E1B18] mb-1">Judul Materi *</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Contoh: Ringkasan Kuliah Anatomi Splanchnologia"
              className="w-full px-3 py-2 bg-[#FAF7F5] rounded-xl border border-[#EEDCDC] text-xs text-[#1E1B18] focus:outline-none focus:border-[#B80049]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-[#1E1B18] mb-1">Mata Kuliah</label>
              <select
                value={newCourseId}
                onChange={(e) => setNewCourseId(e.target.value)}
                className="w-full px-3 py-2 bg-[#FAF7F5] rounded-xl border border-[#EEDCDC] text-xs text-[#1E1B18] focus:outline-none focus:border-[#B80049]"
              >
                {courses.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.code} - {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-[#1E1B18] mb-1">Semester</label>
              <select
                value={newSemesterId}
                onChange={(e) => setNewSemesterId(e.target.value)}
                className="w-full px-3 py-2 bg-[#FAF7F5] rounded-xl border border-[#EEDCDC] text-xs text-[#1E1B18] focus:outline-none focus:border-[#B80049]"
              >
                {semesters.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-[#1E1B18] mb-1">Jenis Materi</label>
              <select
                value={newType}
                onChange={(e) => setNewType(e.target.value as MaterialType)}
                className="w-full px-3 py-2 bg-[#FAF7F5] rounded-xl border border-[#EEDCDC] text-xs text-[#1E1B18] focus:outline-none focus:border-[#B80049]"
              >
                <option value="Catatan Kuliah">Catatan Kuliah</option>
                <option value="Ringkasan Diktat">Ringkasan Diktat</option>
                <option value="Clinical Reference">Clinical Reference</option>
                <option value="Panduan Praktikum">Panduan Praktikum</option>
                <option value="Clinical Pearls">Clinical Pearls</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-[#1E1B18] mb-1">Estimasi Waktu Baca (Menit)</label>
              <input
                type="number"
                min="1"
                max="120"
                value={newReadingTime}
                onChange={(e) => setNewReadingTime(Number(e.target.value))}
                className="w-full px-3 py-2 bg-[#FAF7F5] rounded-xl border border-[#EEDCDC] text-xs text-[#1E1B18] focus:outline-none focus:border-[#B80049]"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-[#1E1B18] mb-1">Ringkasan / Deskripsi Singkat</label>
            <textarea
              rows={2}
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="Deskripsi singkat mengenai topik pembahasan..."
              className="w-full px-3 py-2 bg-[#FAF7F5] rounded-xl border border-[#EEDCDC] text-xs text-[#1E1B18] focus:outline-none focus:border-[#B80049]"
            />
          </div>

          <div>
            <label className="block font-semibold text-[#1E1B18] mb-1">Poin Inti (Pisahkan dengan baris baru)</label>
            <textarea
              rows={3}
              value={newKeyPoints}
              onChange={(e) => setNewKeyPoints(e.target.value)}
              placeholder="Poin penting 1&#10;Poin penting 2&#10;Poin penting 3"
              className="w-full px-3 py-2 bg-[#FAF7F5] rounded-xl border border-[#EEDCDC] text-xs text-[#1E1B18] focus:outline-none focus:border-[#B80049]"
            />
          </div>

          <div>
            <label className="block font-semibold text-[#1E1B18] mb-1">Isi / Catatan Lengkap</label>
            <textarea
              rows={5}
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder="Tuliskan catatan kuliah atau materi rujukan secara mendalam di sini..."
              className="w-full px-3 py-2 bg-[#FAF7F5] rounded-xl border border-[#EEDCDC] text-xs text-[#1E1B18] focus:outline-none focus:border-[#B80049]"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-[#F3E8E8]">
            <Button variant="ghost" size="sm" onClick={() => setIsAddModalOpen(false)}>
              Batal
            </Button>
            <Button variant="primary" size="sm" onClick={handleSaveNewMaterial} disabled={!newTitle.trim()}>
              Simpan Materi Saya
            </Button>
          </div>
        </div>
      </Modal>

      {/* Modal: Impor dari URL (URL Ingestion Workflow) */}
      <Modal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        title="Impor Materi dari URL Akademik"
        maxWidth="md"
      >
        <div className="flex flex-col gap-4 text-xs">
          <div className="bg-[#FAF7F5] p-3 rounded-xl border border-[#EEDCDC] text-[#5B3F43] flex items-start gap-2">
            <Globe className="w-4 h-4 text-[#B80049] flex-shrink-0 mt-0.5" />
            <p>
              Masukkan URL publik (misalnya publikasi FKH UGM, diktat, atau artikel jurnal ilmiah). Sistem
              akan memverifikasi domain, mengekstraksi metadata, dan mengasosiasikannya ke kurikulum Anda.
            </p>
          </div>

          <div>
            <label className="block font-semibold text-[#1E1B18] mb-1">URL Publik Rujukan *</label>
            <div className="flex gap-2">
              <input
                type="url"
                value={importUrl}
                onChange={(e) => setImportUrl(e.target.value)}
                placeholder="https://fkh.ugm.ac.id/modul/anatomi-komparatif"
                className="flex-1 px-3 py-2 bg-[#FAF7F5] rounded-xl border border-[#EEDCDC] text-xs text-[#1E1B18] focus:outline-none focus:border-[#B80049]"
              />
              <Button
                size="sm"
                variant="primary"
                onClick={handleAnalyzeUrl}
                loading={isAnalyzingUrl}
                disabled={!importUrl.trim()}
              >
                Analisa URL
              </Button>
            </div>
          </div>

          {importExtracted && (
            <div className="flex flex-col gap-3 p-4 rounded-xl bg-white border border-[#EEDCDC] animate-fade-in">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#1E1B18] flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-[#B80049]" /> Hasil Ekstraksi & Saran Kurikulum
                </span>
                {importUrl.includes('ugm.ac.id') ? (
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    Domain FKH UGM Teridentifikasi
                  </span>
                ) : (
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                    Sumber Web Eksternal
                  </span>
                )}
              </div>

              <div>
                <label className="block font-semibold text-[#1E1B18] mb-1">Judul Materi Teridentifikasi</label>
                <input
                  type="text"
                  value={importTitle}
                  onChange={(e) => setImportTitle(e.target.value)}
                  className="w-full px-3 py-1.5 bg-[#FAF7F5] rounded-xl border border-[#EEDCDC] text-xs text-[#1E1B18] focus:outline-none focus:border-[#B80049]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#1E1B18] mb-1">Deskripsi Rujukan</label>
                <textarea
                  rows={2}
                  value={importDescription}
                  onChange={(e) => setImportDescription(e.target.value)}
                  className="w-full px-3 py-1.5 bg-[#FAF7F5] rounded-xl border border-[#EEDCDC] text-xs text-[#1E1B18] focus:outline-none focus:border-[#B80049]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#1E1B18] mb-1">Mata Kuliah Rekomendasi</label>
                  <select
                    value={importCourseId}
                    onChange={(e) => setImportCourseId(e.target.value)}
                    className="w-full px-3 py-1.5 bg-[#FAF7F5] rounded-xl border border-[#EEDCDC] text-xs text-[#1E1B18] focus:outline-none focus:border-[#B80049]"
                  >
                    {courses.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.code} - {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-[#1E1B18] mb-1">Tipe Materi</label>
                  <select
                    value={importType}
                    onChange={(e) => setImportType(e.target.value as MaterialType)}
                    className="w-full px-3 py-1.5 bg-[#FAF7F5] rounded-xl border border-[#EEDCDC] text-xs text-[#1E1B18] focus:outline-none focus:border-[#B80049]"
                  >
                    <option value="Module Handbook">Module Handbook</option>
                    <option value="RPKPS">RPKPS</option>
                    <option value="Clinical Reference">Clinical Reference</option>
                    <option value="Panduan Praktikum">Panduan Praktikum</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-2 border-t border-[#F3E8E8]">
            <Button variant="ghost" size="sm" onClick={() => setIsImportModalOpen(false)}>
              Batal
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleSaveImport}
              disabled={!importTitle.trim() || !importUrl.trim()}
            >
              Simpan & Hubungkan ke Modul
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
