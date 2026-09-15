import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  ArrowLeft,
  Bookmark,
  BookmarkCheck,
  CheckCircle,
  CheckCircle2,
  Clock,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Edit3,
  Save,
  Sparkles,
  Share2,
  List,
  ShieldCheck,
  ExternalLink,
  Building2,
  Calendar,
  User,
  Info
} from 'lucide-react';
import { Button, Badge, ProgressBar } from '../components/common/UI';
import { Material, MaterialSection } from '../types';

export const MaterialReaderPage: React.FC<{ materialId: string }> = ({ materialId }) => {
  const {
    materials,
    courses,
    topics,
    toggleSaveMaterial,
    updateMaterialProgress,
    updateMaterialNotes,
    toggleMaterialBookmark,
    logStudySession,
    navigate
  } = useApp();

  const validMaterials = Array.isArray(materials) ? materials.filter((m): m is Material => Boolean(m && typeof m === 'object')) : [];
  const material = validMaterials.find((m) => m.id === materialId) || validMaterials[0];
  const course = material ? courses.find((c) => c && c.id === material.courseId) : undefined;
  const topic = material ? topics.find((t) => t && t.id === material.topicId) : undefined;

  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'huge'>('normal');
  const [notes, setNotes] = useState(material?.notes || '');
  const [showNotesDrawer, setShowNotesDrawer] = useState(false);
  const [showTocMobile, setShowTocMobile] = useState(false);

  // If no material available, show graceful fallback
  if (!material) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
        <BookOpen className="w-16 h-16 text-[#8F6F73] mb-4 opacity-50" />
        <h2 className="text-xl font-bold text-[#1E1B18] dark:text-white mb-2">Materi Tidak Ditemukan</h2>
        <p className="text-sm text-[#5B3F43] dark:text-[#D1B8BC] mb-6 max-w-md">
          Materi pembelajaran yang Anda cari tidak tersedia atau belum dimuat.
        </p>
        <Button onClick={() => navigate('/materials')} variant="primary">
          Kembali ke Daftar Materi
        </Button>
      </div>
    );
  }

  // Update progress as user navigates through sections
  const sectionsList = Array.isArray(material.sections) ? material.sections : [];
  const totalSections = sectionsList.length || 1;
  const fallbackSection: MaterialSection = {
    id: 'sec-fallback',
    title: material.title,
    content: material.description || '',
    readingTimeMinutes: 5,
    keyPoints: [],
    clinicalPearl: undefined
  };
  const currentSection: MaterialSection = sectionsList[activeSectionIndex] || sectionsList[0] || fallbackSection;

  const handleNextSection = () => {
    if (activeSectionIndex < totalSections - 1) {
      const nextIndex = activeSectionIndex + 1;
      setActiveSectionIndex(nextIndex);
      const calculatedProgress = Math.min(100, Math.round(((nextIndex + 1) / totalSections) * 100));
      updateMaterialProgress(material.id, calculatedProgress, calculatedProgress >= 100);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      handleCompleteMaterial();
    }
  };

  const handlePrevSection = () => {
    if (activeSectionIndex > 0) {
      setActiveSectionIndex(activeSectionIndex - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleCompleteMaterial = () => {
    updateMaterialProgress(material.id, 100, true);
    logStudySession('material', `Membaca: ${material.title}`, `Menyelesaikan seluruh ${totalSections} bab materi`, material.readingTimeMinutes);
  };

  const handleSaveNotes = () => {
    updateMaterialNotes(material.id, notes);
  };

  const isSectionBookmarked = (material.bookmarks || []).includes(currentSection.id);

  return (
    <div className="min-h-screen bg-[#FAF7F5] pb-16">
      {/* Pinned Top Reader Bar */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-[#F3E8E8] shadow-xs px-4 sm:px-8 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(course ? `/courses/${course.id}` : '/materials')}
            className="w-8 h-8 rounded-full bg-[#FAF7F5] hover:bg-[#F5ECE7] text-[#5B3F43] flex items-center justify-center transition-colors cursor-pointer"
            title="Kembali"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div className="flex flex-col max-w-xs sm:max-w-md">
            <span className="text-[10px] text-[#8F6F73] uppercase tracking-wider font-bold truncate">
              {course?.name || 'Mata Kuliah'} · {topic?.name || 'Topik Kuliah'}
            </span>
            <span className="font-serif-display font-bold text-sm text-[#1E1B18] truncate">
              {material.title}
            </span>
          </div>
        </div>

        {/* Reader Controls */}
        <div className="flex items-center gap-2">
          {/* Font Size Toggle */}
          <div className="hidden sm:flex items-center bg-[#FAF7F5] rounded-full p-0.5 border border-[#EEDCDC]">
            <button
              onClick={() => setFontSize('normal')}
              className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                fontSize === 'normal' ? 'bg-[#B80049] text-white' : 'text-[#5B3F43]'
              }`}
            >
              A
            </button>
            <button
              onClick={() => setFontSize('large')}
              className={`px-2 py-0.5 rounded-full text-sm font-semibold ${
                fontSize === 'large' ? 'bg-[#B80049] text-white' : 'text-[#5B3F43]'
              }`}
            >
              A+
            </button>
          </div>

          {/* Table of contents button on mobile */}
          <button
            onClick={() => setShowTocMobile(!showTocMobile)}
            className="lg:hidden p-2 rounded-full bg-[#FAF7F5] border border-[#EEDCDC] text-[#5B3F43]"
            title="Daftar Bab"
          >
            <List className="w-4 h-4" />
          </button>

          {/* Notes Toggle */}
          <button
            onClick={() => setShowNotesDrawer(!showNotesDrawer)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              showNotesDrawer
                ? 'bg-[#B80049] text-white'
                : 'bg-[#FAF7F5] border border-[#EEDCDC] text-[#5B3F43] hover:bg-[#F5ECE7]'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Catatan</span>
          </button>

          {/* Save Material */}
          <button
            onClick={() => toggleSaveMaterial(material.id)}
            className={`p-2 rounded-full border border-[#EEDCDC] transition-colors cursor-pointer ${
              material.isSaved
                ? 'bg-[#FFF0F5] text-[#B80049] border-[#FFD9DE]'
                : 'bg-[#FAF7F5] text-[#5B3F43] hover:text-[#B80049]'
            }`}
            title={material.isSaved ? 'Hapus dari tersimpan' : 'Simpan materi'}
          >
            {material.isSaved ? (
              <BookmarkCheck className="w-4 h-4 fill-current" />
            ) : (
              <Bookmark className="w-4 h-4" />
            )}
          </button>

          {/* Mark Complete */}
          <Button
            size="sm"
            variant={material.isCompleted ? 'secondary' : 'primary'}
            icon={CheckCircle}
            onClick={handleCompleteMaterial}
          >
            {material.isCompleted ? 'Selesai ✓' : 'Tandai Selesai'}
          </Button>
        </div>
      </div>

      {/* Progress Bar Header */}
      <div className="w-full h-1 bg-[#FFD9DE]">
        <div
          className="h-full bg-[#B80049] transition-all duration-300"
          style={{ width: `${material.progressPercent}%` }}
        />
      </div>

      {/* Main Reading Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Table of Contents (Desktop 3 cols) */}
        <div
          className={`lg:col-span-3 ${
            showTocMobile ? 'block fixed inset-0 z-30 bg-black/40 p-4' : 'hidden lg:block'
          }`}
        >
          <div className="bg-white rounded-2xl p-4 border border-[#F3E8E8] shadow-xs sticky top-16">
            <div className="flex items-center justify-between pb-3 border-b border-[#F3E8E8]">
              <span className="font-serif-display font-bold text-sm text-[#1E1B18] flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-[#B80049]" /> Daftar Isi
              </span>
              <span className="text-xs text-[#8F6F73]">
                {activeSectionIndex + 1} dari {totalSections}
              </span>
            </div>

            <div className="flex flex-col gap-1 mt-3 max-h-[60vh] overflow-y-auto pr-1">
              {material.sections.map((sec, idx) => {
                const isActive = idx === activeSectionIndex;
                return (
                  <button
                    key={sec.id}
                    onClick={() => {
                      setActiveSectionIndex(idx);
                      setShowTocMobile(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`text-left px-3 py-2 rounded-xl text-xs transition-all cursor-pointer flex items-center justify-between ${
                      isActive
                        ? 'bg-[#FFD9DE] text-[#B80049] font-bold'
                        : 'text-[#5B3F43] hover:bg-[#FAF7F5]'
                    }`}
                  >
                    <span className="line-clamp-1">
                      {idx + 1}. {sec.title}
                    </span>
                    {idx < activeSectionIndex && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {showTocMobile && (
              <button
                onClick={() => setShowTocMobile(false)}
                className="w-full mt-4 py-2 bg-[#FAF7F5] rounded-full text-xs font-bold text-[#5B3F43]"
              >
                Tutup Menu
              </button>
            )}
          </div>
        </div>

        {/* Center: Material Article Content (Desktop 6-9 cols) */}
        <div className={`flex flex-col gap-6 ${showNotesDrawer ? 'lg:col-span-6' : 'lg:col-span-9'}`}>
          <article className="bg-white rounded-2xl p-6 sm:p-10 border border-[#F3E8E8] shadow-xs">
            {/* Header info */}
            <div className="pb-6 border-b border-[#F3E8E8] mb-6">
              {/* Provenance & Source Attribution Bar */}
              <div className="mb-4 p-3.5 rounded-xl bg-[#FAF7F5] border border-[#F3E8E8] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 flex-wrap">
                  {material.verified ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Terverifikasi FKH UGM
                    </span>
                  ) : material.contentCategory === 'aiGeneratedContent' ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-50 text-amber-700 font-semibold border border-amber-200">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Konten AI (Bantuan Belajar)
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 font-semibold border border-blue-200">
                      <User className="w-3.5 h-3.5 text-blue-600" /> Catatan Mahasiswa / Personal
                    </span>
                  )}

                  <span className="text-[#8F6F73] font-medium flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5" />
                    Sumber: {material.source || 'FKH UGM'}
                  </span>

                  {material.sourceType && (
                    <span className="text-[#8F6F73]">
                      ({material.sourceType})
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3 text-[#8F6F73]">
                  {material.retrievedAt && (
                    <span className="flex items-center gap-1 text-[11px]">
                      <Calendar className="w-3 h-3" /> Diakses: {material.retrievedAt}
                    </span>
                  )}
                  {material.sourceUrl && (
                    <a
                      href={material.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[#B80049] hover:underline font-semibold"
                    >
                      Buka Rujukan Asli <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-[#8F6F73] mb-2 flex-wrap">
                <Badge variant="primary">{material.type}</Badge>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {material.readingTimeMinutes} min estimasi
                </span>
                <span>·</span>
                <span>Bab {activeSectionIndex + 1} dari {totalSections}</span>
              </div>

              <h1 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#1E1B18] leading-tight">
                {currentSection.title}
              </h1>

              <div className="flex items-center justify-between mt-4">
                <button
                  onClick={() => toggleMaterialBookmark(material.id, currentSection.id)}
                  className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full transition-colors cursor-pointer ${
                    isSectionBookmarked
                      ? 'bg-[#FFD9DE] text-[#B80049]'
                      : 'bg-[#FAF7F5] text-[#5B3F43] hover:bg-[#F5ECE7]'
                  }`}
                >
                  <Bookmark className={`w-3.5 h-3.5 ${isSectionBookmarked ? 'fill-current' : ''}`} />
                  <span>{isSectionBookmarked ? 'Bagian Ditandai' : 'Tandai Bagian Ini'}</span>
                </button>
              </div>
            </div>

            {/* Formatted Content */}
            <div
              className={`text-[#1E1B18] leading-relaxed space-y-4 font-sans ${
                fontSize === 'huge' ? 'text-lg leading-loose' : fontSize === 'large' ? 'text-base leading-relaxed' : 'text-sm'
              }`}
            >
              <div className="whitespace-pre-line text-[#2D2926] font-normal">
                {currentSection.content}
              </div>

              {/* Key Points Callout */}
              {currentSection.keyPoints && currentSection.keyPoints.length > 0 && (
                <div className="my-6 bg-[#FAF7F5] p-5 rounded-2xl border border-[#F3E8E8]">
                  <h4 className="font-serif-display font-bold text-base text-[#1E1B18] mb-2 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#B80049]" /> Poin Inti Pembelajaran
                  </h4>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-[#5B3F43]">
                    {currentSection.keyPoints.map((pt, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#B80049] font-bold mt-0.5">•</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Clinical Pearls Highlight */}
              {currentSection.clinicalPearl && (
                <div className="my-6 bg-[#FFF0F5] p-5 rounded-2xl border border-[#FFD9DE] flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#FFD9DE] text-[#B80049] flex items-center justify-center flex-shrink-0 text-base">
                    🐾
                  </div>
                  <div>
                    <h5 className="font-serif-display font-bold text-sm text-[#B80049]">
                      Clinical Pearl FKH UGM:
                    </h5>
                    <p className="text-xs sm:text-sm text-[#1E1B18] mt-1 italic leading-relaxed">
                      "{currentSection.clinicalPearl}"
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Section Navigator */}
            <div className="mt-10 pt-6 border-t border-[#F3E8E8] flex items-center justify-between gap-4">
              <Button
                variant="outline"
                size="sm"
                icon={ChevronLeft}
                onClick={handlePrevSection}
                disabled={activeSectionIndex === 0}
              >
                Sebelumnya
              </Button>

              <span className="text-xs text-[#8F6F73] font-semibold">
                {activeSectionIndex + 1} / {totalSections}
              </span>

              <Button
                variant="primary"
                size="sm"
                icon={ChevronRight}
                iconPosition="right"
                onClick={handleNextSection}
              >
                {activeSectionIndex === totalSections - 1 ? 'Selesai Baca ✓' : 'Berikutnya'}
              </Button>
            </div>
          </article>
        </div>

        {/* Right Side: Interactive Notes Editor (Drawer or 3 cols) */}
        {showNotesDrawer && (
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl p-5 border border-[#F3E8E8] shadow-xs sticky top-36 flex flex-col gap-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#F3E8E8]">
                <span className="font-serif-display font-bold text-sm text-[#1E1B18] flex items-center gap-1.5">
                  <Edit3 className="w-4 h-4 text-[#B80049]" /> Catatan Pribadi
                </span>
                <button
                  onClick={handleSaveNotes}
                  className="text-xs font-bold text-[#B80049] hover:underline flex items-center gap-1"
                >
                  <Save className="w-3.5 h-3.5" /> Simpan
                </button>
              </div>

              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Tulis ringkasan, pertanyaan untuk dosen, atau poin penting..."
                rows={12}
                className="w-full text-xs p-3 rounded-xl bg-[#FAF7F5] border border-[#EEDCDC] text-[#1E1B18] placeholder:text-[#8F6F73] focus:outline-none focus:bg-white focus:border-[#B80049] leading-relaxed resize-none"
              />

              <Button size="sm" variant="primary" onClick={handleSaveNotes}>
                Simpan Catatan
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
