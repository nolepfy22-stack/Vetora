import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Grid,
  Search,
  Heart,
  Bookmark,
  BookmarkCheck,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Layers,
  HelpCircle,
  Stethoscope,
  Maximize2
} from 'lucide-react';
import { Badge, Button, Modal } from '../components/common/UI';
import { AtlasStructure } from '../types';

export const VeterinaryAtlasPage: React.FC<{
  initialSpecies?: string;
  initialSystem?: string;
  initialStructureId?: string;
}> = ({ initialSpecies, initialSystem, initialStructureId }) => {
  const { atlasStructures, toggleFavoriteAtlas, navigate } = useApp();

  const [selectedSpecies, setSelectedSpecies] = useState<string>(initialSpecies || 'all');
  const [selectedSystem, setSelectedSystem] = useState<string>(initialSystem || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [activeStructure, setActiveStructure] = useState<AtlasStructure | null>(null);

  // Auto-open initial structure if provided via URL
  useEffect(() => {
    if (initialStructureId) {
      const found = atlasStructures.find((s) => s.id === initialStructureId);
      if (found) setActiveStructure(found);
    }
  }, [initialStructureId, atlasStructures]);

  const speciesList = ['Dog', 'Cat', 'Horse', 'Cattle'];
  const systemsList = [
    'Cardiovascular',
    'Digestive',
    'Respiratory',
    'Musculoskeletal',
    'Urinary',
    'Nervous'
  ];

  const filteredStructures = atlasStructures.filter((s) => {
    if (favoritesOnly && !s.isFavorite) return false;
    if (selectedSpecies !== 'all' && s.species !== selectedSpecies) return false;
    if (selectedSystem !== 'all' && s.system !== selectedSystem) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = s.name.toLowerCase().includes(q);
      const matchLatin = s.latinName.toLowerCase().includes(q);
      const matchDesc = s.description.toLowerCase().includes(q);
      if (!matchName && !matchLatin && !matchDesc) return false;
    }

    return true;
  });

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#F3E8E8]">
        <div>
          <div className="flex items-center gap-2 text-[#B80049] mb-1">
            <Grid className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">
              Nomina Anatomica Veterinaria
            </span>
          </div>
          <h1 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#1E1B18]">
            Veterinary Anatomy Atlas
          </h1>
          <p className="text-sm text-[#5B3F43] mt-0.5">
            Atlas anatomi komparatif hewan domestik (anjing, kucing, kuda, sapi) berstandar akademis FKH UGM.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8F6F73]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari struktur, nama latin, atau organ..."
            className="w-full pl-10 pr-4 py-2 bg-white text-sm rounded-full border border-[#EEDCDC] focus:outline-none focus:border-[#B80049] text-[#1E1B18]"
          />
        </div>
      </div>

      {/* Filter toolbar */}
      <div className="flex flex-wrap items-center gap-3 bg-white p-4 rounded-2xl border border-[#F3E8E8]">
        {/* Species selector */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          <button
            onClick={() => setSelectedSpecies('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              selectedSpecies === 'all'
                ? 'bg-[#B80049] text-white'
                : 'bg-[#FAF7F5] text-[#5B3F43] hover:bg-[#F5ECE7]'
            }`}
          >
            Semua Spesies
          </button>
          {speciesList.map((sp) => (
            <button
              key={sp}
              onClick={() => setSelectedSpecies(sp)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedSpecies === sp
                  ? 'bg-[#B80049] text-white'
                  : 'bg-[#FAF7F5] text-[#5B3F43] hover:bg-[#F5ECE7]'
              }`}
            >
              {sp === 'Dog' ? 'Anjing 🐕' : sp === 'Cat' ? 'Kucing 🐈' : sp === 'Horse' ? 'Kuda 🐎' : 'Sapi 🐄'}
            </button>
          ))}
        </div>

        <div className="h-6 w-px bg-[#EEDCDC] hidden md:block" />

        {/* System selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-[#5B3F43]">Sistem Organ:</span>
          <select
            value={selectedSystem}
            onChange={(e) => setSelectedSystem(e.target.value)}
            className="text-xs bg-[#FAF7F5] border border-[#EEDCDC] rounded-full px-3 py-1.5 focus:outline-none focus:border-[#B80049]"
          >
            <option value="all">Semua Sistem</option>
            {systemsList.map((sys) => (
              <option key={sys} value={sys}>
                {sys}
              </option>
            ))}
          </select>
        </div>

        {/* Favorite toggle */}
        <button
          onClick={() => setFavoritesOnly(!favoritesOnly)}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ml-auto ${
            favoritesOnly
              ? 'bg-[#FFD9DE] text-[#B80049] font-bold'
              : 'bg-[#FAF7F5] text-[#5B3F43] hover:bg-[#F5ECE7]'
          }`}
        >
          {favoritesOnly ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
          <span>Favorit</span>
        </button>
      </div>

      {/* Atlas Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredStructures.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveStructure(item)}
            className="bg-white rounded-2xl overflow-hidden border border-[#F3E8E8] shadow-[0_2px_12px_-1px_rgba(45,41,38,0.03)] hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="relative h-44 bg-[#FAF7F5] overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavoriteAtlas(item.id);
                  }}
                  className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs text-[#8F6F73] hover:text-[#B80049] flex items-center justify-center transition-colors shadow-xs"
                >
                  {item.isFavorite ? (
                    <BookmarkCheck className="w-4 h-4 text-[#B80049] fill-current" />
                  ) : (
                    <Bookmark className="w-4 h-4" />
                  )}
                </button>
                <div className="absolute bottom-2 left-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-xs text-[#B80049] text-[10px] font-bold shadow-xs">
                    {item.species}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#456460]">
                  {item.system}
                </span>
                <h3 className="font-serif-display font-bold text-base text-[#1E1B18] mt-0.5 group-hover:text-[#B80049] transition-colors leading-snug">
                  {item.name}
                </h3>
                <p className="text-xs italic text-[#8F6F73] mt-0.5">{item.latinName}</p>
                <p className="text-xs text-[#5B3F43] mt-2 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>

            <div className="p-4 pt-0">
              <div className="pt-3 border-t border-[#FAF7F5] flex items-center justify-between text-xs text-[#B80049] font-bold">
                <span>Periksa Anatomi Lengkap</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Structure Detail Inspection Modal */}
      {activeStructure && (
        <Modal
          isOpen={Boolean(activeStructure)}
          onClose={() => setActiveStructure(null)}
          title={activeStructure.name}
          maxWidth="xl"
        >
          <div className="flex flex-col gap-5">
            {/* Modal Header details */}
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <Badge variant="primary">{activeStructure.species}</Badge>
                <Badge variant="sage">{activeStructure.system}</Badge>
                <span className="text-xs italic text-[#8F6F73] font-serif-display">
                  {activeStructure.latinName}
                </span>
              </div>

              <button
                onClick={() => toggleFavoriteAtlas(activeStructure.id)}
                className="flex items-center gap-1 text-xs font-semibold text-[#B80049] hover:underline cursor-pointer"
              >
                {activeStructure.isFavorite ? (
                  <>
                    <BookmarkCheck className="w-4 h-4 fill-current" /> Tersimpan di Favorit
                  </>
                ) : (
                  <>
                    <Bookmark className="w-4 h-4" /> Simpan ke Favorit
                  </>
                )}
              </button>
            </div>

            {/* Large Visual Plate */}
            <div className="w-full h-64 sm:h-80 rounded-2xl overflow-hidden bg-[#FAF7F5] border border-[#F3E8E8] flex items-center justify-center">
              <img
                src={activeStructure.imageUrl}
                alt={activeStructure.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Description & Function */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#FAF7F5] border border-[#F3E8E8]">
                <h4 className="font-serif-display font-bold text-sm text-[#1E1B18] mb-1">
                  Deskripsi & Morfologi Organ:
                </h4>
                <p className="text-xs sm:text-sm text-[#5B3F43] leading-relaxed">
                  {activeStructure.description}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF7F5] border border-[#F3E8E8]">
                <h4 className="font-serif-display font-bold text-sm text-[#1E1B18] mb-1">
                  Fisiologi & Fungsi:
                </h4>
                <p className="text-xs sm:text-sm text-[#5B3F43] leading-relaxed">
                  {activeStructure.function || 'Menjaga aliran darah laminar serta perfusi organ sistemik pada mamalia domestik.'}
                </p>
              </div>
            </div>

            {/* Clinical & Surgical Relevance */}
            {activeStructure.clinicalRelevance && (
              <div className="p-4 rounded-xl bg-[#FFF0F5] border border-[#FFD9DE] text-xs sm:text-sm text-[#1E1B18]">
                <strong className="text-[#B80049] block mb-1 flex items-center gap-1.5 font-bold">
                  <Stethoscope className="w-4 h-4" /> Relevansi Bedah & Klinis Veteriner:
                </strong>
                <p className="leading-relaxed text-[#5B3F43]">
                  {activeStructure.clinicalRelevance}
                </p>
              </div>
            )}

            {/* Species Variation */}
            {activeStructure.speciesDifferences && (
              <div className="p-4 rounded-xl bg-[#FAF7F5] border border-[#F3E8E8] text-xs sm:text-sm text-[#5B3F43]">
                <strong className="text-[#1E1B18] block mb-1">
                  Variasi Anatomi Komparatif (Spesies Lain):
                </strong>
                <p className="leading-relaxed">{activeStructure.speciesDifferences}</p>
              </div>
            )}

            {/* Quick Learning Links */}
            <div className="pt-3 border-t border-[#F3E8E8] flex flex-wrap gap-2 justify-end">
              {activeStructure.relatedMaterialId && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setActiveStructure(null);
                    navigate(`/materials/${activeStructure.relatedMaterialId}/read`);
                  }}
                >
                  Baca Materi Terkait →
                </Button>
              )}
              {activeStructure.relatedQuizId && (
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => {
                    setActiveStructure(null);
                    navigate(`/quiz/${activeStructure.relatedQuizId}/start`);
                  }}
                >
                  Uji Pemahaman di Kuis →
                </Button>
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
