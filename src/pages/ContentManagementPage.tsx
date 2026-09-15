import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import {
  Database,
  ShieldCheck,
  Search,
  Plus,
  Link2,
  ExternalLink,
  Edit2,
  Trash2,
  CheckCircle,
  AlertCircle,
  Clock,
  BookOpen,
  Building2,
  FileText,
  Filter,
  Check,
  X,
  User,
  Sparkles,
  Globe,
  SlidersHorizontal,
  Info
} from 'lucide-react';
import { Badge, Button, Modal } from '../components/common/UI';
import { Material, MaterialType } from '../types';

export const ContentManagementPage: React.FC = () => {
  const {
    materials,
    courses,
    semesters,
    topics,
    curriculumMeta,
    officialSources,
    updateMaterial,
    deleteMaterial,
    addMaterial,
    importMaterialFromUrl,
    showToast,
    navigate
  } = useApp();

  const [activeTab, setActiveTab] = useState<'materials' | 'sources' | 'ingestion'>('materials');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'official' | 'personal' | 'imported'>('all');
  const [verifiedFilter, setVerifiedFilter] = useState<'all' | 'verified' | 'unverified'>('all');

  // Edit Modal State
  const [editingMaterial, setEditingMaterial] = useState<Material | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editSource, setEditSource] = useState('');
  const [editSourceUrl, setEditSourceUrl] = useState('');
  const [editVerified, setEditVerified] = useState(false);
  const [editType, setEditType] = useState<MaterialType>('Module Handbook');
  const [editCourseId, setEditCourseId] = useState('');

  // Ingestion Form State
  const [ingestUrl, setIngestUrl] = useState('');
  const [ingestTitle, setIngestTitle] = useState('');
  const [ingestDescription, setIngestDescription] = useState('');
  const [ingestCourseId, setIngestCourseId] = useState(courses[0]?.id || '');
  const [ingestSemesterId, setIngestSemesterId] = useState('sem-3');
  const [ingestType, setIngestType] = useState<MaterialType>('Clinical Reference');
  const [isSimulatingIngest, setIsSimulatingIngest] = useState(false);

  // Filter materials
  const filteredMaterials = useMemo(() => {
    return materials.filter((m) => {
      if (selectedCourse !== 'all' && m.courseId !== selectedCourse) return false;

      if (selectedCategory === 'official') {
        const isOfficial = m.contentCategory === 'officialContent' || (m.source === 'FKH UGM' && m.verified);
        if (!isOfficial) return false;
      } else if (selectedCategory === 'personal') {
        const isPersonal = m.contentCategory === 'userContent' || m.source === 'Personal';
        if (!isPersonal) return false;
      } else if (selectedCategory === 'imported') {
        const isImported = Boolean(m.sourceUrl);
        if (!isImported) return false;
      }

      if (verifiedFilter === 'verified' && !m.verified) return false;
      if (verifiedFilter === 'unverified' && m.verified) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = m.title.toLowerCase().includes(q);
        const matchDesc = m.description.toLowerCase().includes(q);
        const matchSource = (m.source || '').toLowerCase().includes(q);
        if (!matchTitle && !matchDesc && !matchSource) return false;
      }

      return true;
    });
  }, [materials, selectedCourse, selectedCategory, verifiedFilter, searchQuery]);

  // Handle Edit Open
  const handleOpenEdit = (m: Material) => {
    setEditingMaterial(m);
    setEditTitle(m.title);
    setEditDescription(m.description);
    setEditSource(m.source || 'FKH UGM');
    setEditSourceUrl(m.sourceUrl || '');
    setEditVerified(Boolean(m.verified));
    setEditType(m.type);
    setEditCourseId(m.courseId);
  };

  const handleSaveEdit = () => {
    if (!editingMaterial) return;

    updateMaterial(editingMaterial.id, {
      title: editTitle,
      description: editDescription,
      source: editSource,
      sourceUrl: editSourceUrl,
      verified: editVerified,
      type: editType,
      courseId: editCourseId
    });

    setEditingMaterial(null);
    showToast('Data materi berhasil diperbarui');
  };

  const handleToggleVerification = (m: Material) => {
    const nextStatus = !m.verified;
    updateMaterial(m.id, {
      verified: nextStatus,
      contentCategory: nextStatus ? 'officialContent' : m.contentCategory
    });
    showToast(
      nextStatus
        ? `Materi "${m.title}" disetujui sebagai Resmi Terverifikasi`
        : `Verifikasi materi "${m.title}" dibatalkan`,
      nextStatus ? 'default' : 'info'
    );
  };

  const handleRunIngest = () => {
    if (!ingestUrl.trim()) return;
    setIsSimulatingIngest(true);

    setTimeout(() => {
      importMaterialFromUrl({
        url: ingestUrl,
        title: ingestTitle || `Rujukan Web Eksternal dari ${ingestUrl}`,
        description: ingestDescription || `Materi rujukan terverifikasi untuk mata kuliah terpilih.`,
        courseId: ingestCourseId,
        topicId: topics.find((t) => t.courseId === ingestCourseId)?.id || 'top-1',
        semesterId: ingestSemesterId,
        type: ingestType,
        content: `### Konten Rujukan URL\n\nSumber: ${ingestUrl}\n\nMateri ini telah dicatat dan diverifikasi ke dalam repositori akademik VETORA.`,
        keyPoints: [`Tautan Asli: ${ingestUrl}`, `Kategori: ${ingestType}`]
      });

      setIsSimulatingIngest(false);
      setIngestUrl('');
      setIngestTitle('');
      setIngestDescription('');
      showToast('Konten URL berhasil diimpor ke repositori!');
      setActiveTab('materials');
    }, 700);
  };

  const totalVerified = materials.filter((m) => m.verified).length;
  const totalPersonal = materials.filter((m) => m.contentCategory === 'userContent' || m.source === 'Personal').length;
  const totalImported = materials.filter((m) => Boolean(m.sourceUrl)).length;

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Header Banner */}
      <div className="bg-white dark:bg-[#1E1A1C] rounded-2xl p-6 border border-[#F3E8E8] dark:border-[#382F32] shadow-[0_2px_12px_-1px_rgba(45,41,38,0.03)] flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors">
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-12 h-12 rounded-2xl bg-[#FFF0F5] dark:bg-[#3D1A25] text-[#B80049] dark:text-[#FFAEC0] flex items-center justify-center flex-shrink-0">
            <Database className="w-6 h-6" />
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#1E1B18] dark:text-white tracking-tight">
                Academic Content & Source Manager
              </h1>
              <Badge variant="primary">FKH UGM</Badge>
            </div>
            <p className="text-xs sm:text-sm text-[#5B3F43] dark:text-[#D1B8BC] mt-0.5">
              Kelola status verifikasi materi, audit atribusi sumber resmi FKH UGM, dan ingesti rujukan web.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            icon={Link2}
            onClick={() => setActiveTab('ingestion')}
            className="text-xs"
          >
            Ingesti URL Baru
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={BookOpen}
            onClick={() => navigate('/materials')}
            className="text-xs"
          >
            Lihat Modul Belajar
          </Button>
        </div>
      </div>

      {/* KPI Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-[#1E1A1C] p-4 rounded-2xl border border-[#F3E8E8] dark:border-[#382F32] shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#8F6F73] dark:text-[#BAA0A5] block mb-1">
            Total Materi Terdaftar
          </span>
          <span className="font-serif-display text-2xl font-bold text-[#1E1B18] dark:text-white">
            {materials.length}
          </span>
          <span className="text-[11px] text-[#5B3F43] dark:text-[#D1B8BC] block mt-1">
            Mencakup S1 & PPDH
          </span>
        </div>

        <div className="bg-white dark:bg-[#1E1A1C] p-4 rounded-2xl border border-emerald-100 dark:border-emerald-950/40 shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 block mb-1 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Terverifikasi Resmi
          </span>
          <span className="font-serif-display text-2xl font-bold text-emerald-800 dark:text-emerald-300">
            {totalVerified}
          </span>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400/80 block mt-1">
            {Math.round((totalVerified / (materials.length || 1)) * 100)}% dari basis data
          </span>
        </div>

        <div className="bg-white dark:bg-[#1E1A1C] p-4 rounded-2xl border border-blue-100 dark:border-blue-950/40 shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400 block mb-1 flex items-center gap-1">
            <User className="w-3.5 h-3.5" /> Catatan Mandiri
          </span>
          <span className="font-serif-display text-2xl font-bold text-blue-800 dark:text-blue-300">
            {totalPersonal}
          </span>
          <span className="text-[11px] text-blue-600 dark:text-blue-400/80 block mt-1">
            Catatan pribadi mahasiswa
          </span>
        </div>

        <div className="bg-white dark:bg-[#1E1A1C] p-4 rounded-2xl border border-amber-100 dark:border-amber-950/40 shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 block mb-1 flex items-center gap-1">
            <Globe className="w-3.5 h-3.5" /> Diimpor Web
          </span>
          <span className="font-serif-display text-2xl font-bold text-amber-800 dark:text-amber-300">
            {totalImported}
          </span>
          <span className="text-[11px] text-amber-600 dark:text-amber-400/80 block mt-1">
            Tautan rujukan aktif
          </span>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex items-center gap-2 border-b border-[#F3E8E8] dark:border-[#382F32] pb-1">
        <button
          onClick={() => setActiveTab('materials')}
          className={`px-4 py-2 text-xs font-semibold rounded-full transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'materials'
              ? 'bg-[#B80049] text-white shadow-xs'
              : 'bg-white dark:bg-[#1E1A1C] border border-[#EEDCDC] dark:border-[#382F32] text-[#5B3F43] dark:text-[#D1B8BC] hover:bg-[#FAF7F5] dark:hover:bg-[#282124]'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Daftar & Verifikasi Materi ({materials.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('sources')}
          className={`px-4 py-2 text-xs font-semibold rounded-full transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'sources'
              ? 'bg-[#B80049] text-white shadow-xs'
              : 'bg-white dark:bg-[#1E1A1C] border border-[#EEDCDC] dark:border-[#382F32] text-[#5B3F43] dark:text-[#D1B8BC] hover:bg-[#FAF7F5] dark:hover:bg-[#282124]'
          }`}
        >
          <Building2 className="w-3.5 h-3.5" />
          <span>Portal & Sumber Resmi FKH UGM</span>
        </button>

        <button
          onClick={() => setActiveTab('ingestion')}
          className={`px-4 py-2 text-xs font-semibold rounded-full transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'ingestion'
              ? 'bg-[#B80049] text-white shadow-xs'
              : 'bg-white dark:bg-[#1E1A1C] border border-[#EEDCDC] dark:border-[#382F32] text-[#5B3F43] dark:text-[#D1B8BC] hover:bg-[#FAF7F5] dark:hover:bg-[#282124]'
          }`}
        >
          <Link2 className="w-3.5 h-3.5" />
          <span>Konsol Ingesti URL</span>
        </button>
      </div>

      {/* TAB 1: MATERIALS MANAGEMENT & VERIFICATION */}
      {activeTab === 'materials' && (
        <div className="flex flex-col gap-4">
          {/* Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-[#1E1A1C] p-4 rounded-2xl border border-[#F3E8E8] dark:border-[#382F32]">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8F6F73]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari materi atau sumber rujukan..."
                className="w-full pl-9 pr-4 py-1.5 bg-[#FAF7F5] dark:bg-[#282124] text-xs rounded-full border border-[#EEDCDC] dark:border-[#382F32] focus:outline-none focus:border-[#B80049] text-[#1E1B18] dark:text-white"
              />
            </div>

            {/* Filter by Category */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="font-semibold text-[#5B3F43] dark:text-[#D1B8BC]">Kategori:</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as any)}
                className="bg-[#FAF7F5] dark:bg-[#282124] border border-[#EEDCDC] dark:border-[#382F32] rounded-full px-3 py-1.5 text-xs text-[#1E1B18] dark:text-white focus:outline-none focus:border-[#B80049]"
              >
                <option value="all">Semua Kategori</option>
                <option value="official">Resmi FKH UGM</option>
                <option value="personal">Catatan Pribadi</option>
                <option value="imported">Diimpor Web</option>
              </select>
            </div>

            {/* Filter by Verification */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="font-semibold text-[#5B3F43] dark:text-[#D1B8BC]">Verifikasi:</span>
              <select
                value={verifiedFilter}
                onChange={(e) => setVerifiedFilter(e.target.value as any)}
                className="bg-[#FAF7F5] dark:bg-[#282124] border border-[#EEDCDC] dark:border-[#382F32] rounded-full px-3 py-1.5 text-xs text-[#1E1B18] dark:text-white focus:outline-none focus:border-[#B80049]"
              >
                <option value="all">Semua Status</option>
                <option value="verified">Hanya Terverifikasi</option>
                <option value="unverified">Belum Terverifikasi</option>
              </select>
            </div>

            {/* Filter by Course */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="font-semibold text-[#5B3F43] dark:text-[#D1B8BC]">Mata Kuliah:</span>
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="bg-[#FAF7F5] dark:bg-[#282124] border border-[#EEDCDC] dark:border-[#382F32] rounded-full px-3 py-1.5 text-xs text-[#1E1B18] dark:text-white focus:outline-none focus:border-[#B80049] max-w-[160px] truncate"
              >
                <option value="all">Semua Mata Kuliah</option>
                {courses.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.code} - {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Materials Table */}
          <div className="bg-white dark:bg-[#1E1A1C] rounded-2xl border border-[#F3E8E8] dark:border-[#382F32] shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#FAF7F5] dark:bg-[#282124] text-[#5B3F43] dark:text-[#D1B8BC] border-b border-[#F3E8E8] dark:border-[#382F32]">
                    <th className="py-3 px-4 font-bold">Judul Materi & Modul</th>
                    <th className="py-3 px-3 font-bold">Sumber & Provenance</th>
                    <th className="py-3 px-3 font-bold">Tipe</th>
                    <th className="py-3 px-3 font-bold">Status Verifikasi</th>
                    <th className="py-3 px-4 font-bold text-right">Aksi Manajemen</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#FAF7F5] dark:divide-[#282124]">
                  {filteredMaterials.map((mat) => {
                    const course = courses.find((c) => c.id === mat.courseId);
                    const isUserCreated = mat.contentCategory === 'userContent' || mat.source === 'Personal';

                    return (
                      <tr key={mat.id} className="hover:bg-[#FAF7F5]/60 dark:hover:bg-[#282124]/60 transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex flex-col">
                            <span className="font-bold text-[#1E1B18] dark:text-white hover:text-[#B80049] dark:hover:text-[#FFAEC0] cursor-pointer line-clamp-1" onClick={() => navigate(`/materials/${mat.id}/read`)}>
                              {mat.title}
                            </span>
                            <span className="text-[11px] text-[#8F6F73] dark:text-[#BAA0A5] mt-0.5">
                              {course?.code} - {course?.name || 'Veteriner'} · {mat.readingTimeMinutes} min baca
                            </span>
                          </div>
                        </td>

                        <td className="py-3 px-3">
                          <div className="flex flex-col">
                            <span className="font-semibold text-[#1E1B18] dark:text-white">
                              {mat.source || 'FKH UGM'}
                            </span>
                            {mat.sourceUrl && (
                              <a
                                href={mat.sourceUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[10px] text-[#B80049] dark:text-[#FFAEC0] hover:underline inline-flex items-center gap-0.5 mt-0.5"
                              >
                                Link Sumber <ExternalLink className="w-2.5 h-2.5" />
                              </a>
                            )}
                          </div>
                        </td>

                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded-full bg-[#FAF7F5] dark:bg-[#282124] border border-[#EEDCDC] dark:border-[#382F32] text-[10px] font-medium text-[#5B3F43] dark:text-[#D1B8BC] whitespace-nowrap">
                            {mat.type}
                          </span>
                        </td>

                        <td className="py-3 px-3">
                          {mat.verified ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-semibold border border-emerald-200 dark:border-emerald-800/40">
                              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> Terverifikasi
                            </span>
                          ) : isUserCreated ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-semibold border border-blue-200 dark:border-blue-800/40">
                              <User className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" /> Catatan Pribadi
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 font-semibold border border-amber-200 dark:border-amber-800/40">
                              <AlertCircle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" /> Web External
                            </span>
                          )}
                        </td>

                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleToggleVerification(mat)}
                              className={`p-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                                mat.verified
                                  ? 'border-amber-200 dark:border-amber-800/40 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900/50'
                                  : 'border-emerald-200 dark:border-emerald-800/40 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/50'
                              }`}
                              title={mat.verified ? 'Batalkan status verifikasi' : 'Setujui sebagai Resmi Terverifikasi'}
                            >
                              <ShieldCheck className="w-3.5 h-3.5" />
                              <span className="hidden sm:inline">
                                {mat.verified ? 'Batal Verifikasi' : 'Verifikasi'}
                              </span>
                            </button>

                            <button
                              onClick={() => handleOpenEdit(mat)}
                              className="p-1.5 rounded-lg border border-[#EEDCDC] dark:border-[#382F32] bg-[#FAF7F5] dark:bg-[#282124] hover:bg-[#F5ECE7] dark:hover:bg-[#382F32] text-[#5B3F43] dark:text-[#D1B8BC] transition-colors cursor-pointer"
                              title="Edit Metadata"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>

                            {isUserCreated && (
                              <button
                                onClick={() => deleteMaterial(mat.id)}
                                className="p-1.5 rounded-lg border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/40 hover:bg-red-100 dark:hover:bg-red-900/60 text-red-600 dark:text-red-400 transition-colors cursor-pointer"
                                title="Hapus Catatan Pribadi"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: OFFICIAL SOURCES & CURRICULUM REGISTRY */}
      {activeTab === 'sources' && (
        <div className="flex flex-col gap-6">
          {/* Institution & Accreditation Summary */}
          <div className="bg-white dark:bg-[#1E1A1C] rounded-2xl p-6 border border-[#F3E8E8] dark:border-[#382F32] shadow-xs flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/40 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif-display font-bold text-lg text-[#1E1B18] dark:text-white">
                  {curriculumMeta?.institution || 'Fakultas Kedokteran Hewan Universitas Gadjah Mada'}
                </h3>
                <p className="text-xs text-[#5B3F43] dark:text-[#D1B8BC]">
                  {curriculumMeta?.faculty} · Akreditasi Internasional {curriculumMeta?.accreditation} & BAN-PT {curriculumMeta?.nationalAccreditation}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-[#FAF7F5] dark:border-[#282124] text-xs">
              <div className="bg-[#FAF7F5] dark:bg-[#282124] p-3 rounded-xl border border-[#EEDCDC] dark:border-[#382F32]">
                <span className="font-bold text-[#1E1B18] dark:text-white block">Total SKS Sarjana (S.KH)</span>
                <span className="text-[#B80049] dark:text-[#FFAEC0] font-bold text-lg">{curriculumMeta?.totalSKS_Undergraduate || 151} SKS</span>
                <span className="text-[#8F6F73] dark:text-[#BAA0A5] text-[11px] block mt-0.5">8 Semester Terstruktur</span>
              </div>

              <div className="bg-[#FAF7F5] dark:bg-[#282124] p-3 rounded-xl border border-[#EEDCDC] dark:border-[#382F32]">
                <span className="font-bold text-[#1E1B18] dark:text-white block">Total SKS Koasistensi PPDH</span>
                <span className="text-[#B80049] dark:text-[#FFAEC0] font-bold text-lg">{curriculumMeta?.totalSKS_PPDH || 37} SKS</span>
                <span className="text-[#8F6F73] dark:text-[#BAA0A5] text-[11px] block mt-0.5">Rotasi Klinik Komprehensif</span>
              </div>

              <div className="bg-[#FAF7F5] dark:bg-[#282124] p-3 rounded-xl border border-[#EEDCDC] dark:border-[#382F32]">
                <span className="font-bold text-[#1E1B18] dark:text-white block">Status Verifikasi Basis Data</span>
                <span className="text-emerald-700 dark:text-emerald-400 font-bold text-lg">Aktif & Terverifikasi</span>
                <span className="text-[#8F6F73] dark:text-[#BAA0A5] text-[11px] block mt-0.5">Terakhir Diperbarui: {curriculumMeta?.lastVerified || 'Maret 2025'}</span>
              </div>
            </div>
          </div>

          {/* Official Registered Sources Table */}
          <div className="bg-white dark:bg-[#1E1A1C] rounded-2xl border border-[#F3E8E8] dark:border-[#382F32] shadow-xs p-5">
            <h4 className="font-serif-display font-bold text-base text-[#1E1B18] dark:text-white mb-3 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#B80049] dark:text-[#FFAEC0]" />
              Daftar Sumber Resmi Terverifikasi FKH UGM
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {officialSources.map((src) => (
                <div
                  key={src.id}
                  className="p-4 rounded-xl bg-[#FAF7F5] dark:bg-[#282124] border border-[#EEDCDC] dark:border-[#382F32] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="font-bold text-sm text-[#1E1B18] dark:text-white">
                        {src.name}
                      </span>
                      {src.verified ? (
                        <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800/40">
                          Resmi UGM
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded-md border border-blue-200 dark:border-blue-800/40">
                          External
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#5B3F43] dark:text-[#D1B8BC] mt-1 leading-relaxed">
                      {src.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-[#8F6F73] dark:text-[#BAA0A5] pt-3 mt-3 border-t border-[#EEDCDC] dark:border-[#382F32]">
                    <span>Diakses: {src.retrievedDate}</span>
                    <a
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#B80049] dark:text-[#FFAEC0] hover:underline font-semibold inline-flex items-center gap-1"
                    >
                      Buka Portal <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: URL INGESTION WORKFLOW */}
      {activeTab === 'ingestion' && (
        <div className="bg-white dark:bg-[#1E1A1C] rounded-2xl p-6 border border-[#F3E8E8] dark:border-[#382F32] shadow-xs max-w-3xl flex flex-col gap-4 text-xs">
          <div>
            <h3 className="font-serif-display font-bold text-lg text-[#1E1B18] dark:text-white flex items-center gap-2">
              <Link2 className="w-5 h-5 text-[#B80049] dark:text-[#FFAEC0]" /> Konsol Ingesti URL Akademik
            </h3>
            <p className="text-xs text-[#5B3F43] dark:text-[#D1B8BC] mt-0.5">
              Masukkan URL dokumen resmi FKH UGM atau literatur ilmiah veteriner untuk diintegrasikan langsung ke basis pengetahuan VETORA.
            </p>
          </div>

          <div>
            <label className="block font-semibold text-[#1E1B18] dark:text-white mb-1">URL Sumber *</label>
            <input
              type="url"
              value={ingestUrl}
              onChange={(e) => setIngestUrl(e.target.value)}
              placeholder="https://fkh.ugm.ac.id/modul/patologi-sistemik"
              className="w-full px-3 py-2 bg-[#FAF7F5] dark:bg-[#282124] rounded-xl border border-[#EEDCDC] dark:border-[#382F32] text-xs text-[#1E1B18] dark:text-white focus:outline-none focus:border-[#B80049]"
            />
          </div>

          <div>
            <label className="block font-semibold text-[#1E1B18] dark:text-white mb-1">Judul Dokumen / Modul *</label>
            <input
              type="text"
              value={ingestTitle}
              onChange={(e) => setIngestTitle(e.target.value)}
              placeholder="Misal: Diktat Kuliah Patologi Sistemik Saluran Cerna"
              className="w-full px-3 py-2 bg-[#FAF7F5] dark:bg-[#282124] rounded-xl border border-[#EEDCDC] dark:border-[#382F32] text-xs text-[#1E1B18] dark:text-white focus:outline-none focus:border-[#B80049]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-[#1E1B18] dark:text-white mb-1">Mata Kuliah Target</label>
              <select
                value={ingestCourseId}
                onChange={(e) => setIngestCourseId(e.target.value)}
                className="w-full px-3 py-2 bg-[#FAF7F5] dark:bg-[#282124] rounded-xl border border-[#EEDCDC] dark:border-[#382F32] text-xs text-[#1E1B18] dark:text-white focus:outline-none focus:border-[#B80049]"
              >
                {courses.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.code} - {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-[#1E1B18] dark:text-white mb-1">Jenis Materi</label>
              <select
                value={ingestType}
                onChange={(e) => setIngestType(e.target.value as MaterialType)}
                className="w-full px-3 py-2 bg-[#FAF7F5] dark:bg-[#282124] rounded-xl border border-[#EEDCDC] dark:border-[#382F32] text-xs text-[#1E1B18] dark:text-white focus:outline-none focus:border-[#B80049]"
              >
                <option value="Module Handbook">Module Handbook</option>
                <option value="RPKPS">RPKPS</option>
                <option value="Clinical Reference">Clinical Reference</option>
                <option value="Panduan Praktikum">Panduan Praktikum</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-[#1E1B18] dark:text-white mb-1">Deskripsi / Abstrak Singkat</label>
            <textarea
              rows={3}
              value={ingestDescription}
              onChange={(e) => setIngestDescription(e.target.value)}
              placeholder="Rangkuman ringkas isi dokumen..."
              className="w-full px-3 py-2 bg-[#FAF7F5] dark:bg-[#282124] rounded-xl border border-[#EEDCDC] dark:border-[#382F32] text-xs text-[#1E1B18] dark:text-white focus:outline-none focus:border-[#B80049]"
            />
          </div>

          <div className="pt-2 border-t border-[#F3E8E8] dark:border-[#382F32] flex justify-end">
            <Button
              variant="primary"
              size="sm"
              loading={isSimulatingIngest}
              onClick={handleRunIngest}
              disabled={!ingestUrl.trim() || !ingestTitle.trim()}
            >
              Simpan & Hubungkan ke Kurikulum
            </Button>
          </div>
        </div>
      )}

      {/* Edit Material Metadata Modal */}
      {editingMaterial && (
        <Modal
          isOpen={Boolean(editingMaterial)}
          onClose={() => setEditingMaterial(null)}
          title="Edit Metadata & Status Verifikasi Materi"
          maxWidth="md"
        >
          <div className="flex flex-col gap-4 text-xs">
            <div>
              <label className="block font-semibold text-[#1E1B18] dark:text-white mb-1">Judul Materi</label>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full px-3 py-2 bg-[#FAF7F5] dark:bg-[#282124] rounded-xl border border-[#EEDCDC] dark:border-[#382F32] text-xs text-[#1E1B18] dark:text-white focus:outline-none focus:border-[#B80049]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#1E1B18] dark:text-white mb-1">Deskripsi</label>
              <textarea
                rows={2}
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                className="w-full px-3 py-2 bg-[#FAF7F5] dark:bg-[#282124] rounded-xl border border-[#EEDCDC] dark:border-[#382F32] text-xs text-[#1E1B18] dark:text-white focus:outline-none focus:border-[#B80049]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-[#1E1B18] dark:text-white mb-1">Atribusi Sumber (Entity)</label>
                <input
                  type="text"
                  value={editSource}
                  onChange={(e) => setEditSource(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF7F5] dark:bg-[#282124] rounded-xl border border-[#EEDCDC] dark:border-[#382F32] text-xs text-[#1E1B18] dark:text-white focus:outline-none focus:border-[#B80049]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#1E1B18] dark:text-white mb-1">URL Sumber Asli</label>
                <input
                  type="url"
                  value={editSourceUrl}
                  onChange={(e) => setEditSourceUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3 py-2 bg-[#FAF7F5] dark:bg-[#282124] rounded-xl border border-[#EEDCDC] dark:border-[#382F32] text-xs text-[#1E1B18] dark:text-white focus:outline-none focus:border-[#B80049]"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-[#FAF7F5] dark:bg-[#282124] border border-[#EEDCDC] dark:border-[#382F32]">
              <input
                type="checkbox"
                id="verifiedCheck"
                checked={editVerified}
                onChange={(e) => setEditVerified(e.target.checked)}
                className="w-4 h-4 text-[#B80049] rounded cursor-pointer"
              />
              <label htmlFor="verifiedCheck" className="text-xs font-semibold text-[#1E1B18] dark:text-white cursor-pointer">
                Tandai sebagai Materi Resmi Terverifikasi FKH UGM
              </label>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-[#F3E8E8] dark:border-[#382F32]">
              <Button variant="ghost" size="sm" onClick={() => setEditingMaterial(null)}>
                Batal
              </Button>
              <Button variant="primary" size="sm" onClick={handleSaveEdit}>
                Simpan Perubahan
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
