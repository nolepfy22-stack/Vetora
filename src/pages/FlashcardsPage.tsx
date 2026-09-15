import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Layers,
  Plus,
  Play,
  Bookmark,
  BookmarkCheck,
  CheckCircle,
  Clock,
  Trash2,
  Edit2,
  BookOpen,
  Sparkles
} from 'lucide-react';
import { Badge, Button, ProgressBar, Modal } from '../components/common/UI';

export const FlashcardsPage: React.FC = () => {
  const {
    flashcardDecks,
    courses,
    topics,
    createDeck,
    deleteDeck,
    toggleSaveDeck,
    navigate
  } = useApp();

  const [filterTab, setFilterTab] = useState<'all' | 'saved' | 'mastered'>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // New deck form state
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newCourseId, setNewCourseId] = useState(courses[0]?.id || 'course-anatomi-vet');
  const [newCards, setNewCards] = useState<Array<{ question: string; answer: string; hint?: string }>>([
    { question: '', answer: '', hint: '' },
    { question: '', answer: '', hint: '' }
  ]);

  const handleAddCardRow = () => {
    setNewCards((prev) => [...prev, { question: '', answer: '', hint: '' }]);
  };

  const handleRemoveCardRow = (index: number) => {
    if (newCards.length > 1) {
      setNewCards((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const validCards = newCards.filter((c) => c.question.trim() && c.answer.trim());
    if (validCards.length === 0) return;

    const targetCourse = courses.find((c) => c.id === newCourseId);

    const createdId = createDeck({
      title: newTitle.trim(),
      description: newDesc.trim() || 'Kumpulan kartu belajar mandiri mahasiswa FKH UGM.',
      courseId: newCourseId,
      topicId: 'topic-cardio',
      cards: validCards.map((c, idx) => ({
        id: `c-${Date.now()}-${idx}`,
        question: c.question.trim(),
        answer: c.answer.trim(),
        hint: c.hint?.trim(),
        masteryLevel: 0
      }))
    });

    setShowCreateModal(false);
    setNewTitle('');
    setNewDesc('');
    navigate(`/flashcards/${createdId}/study`);
  };

  const filteredDecks = flashcardDecks.filter((d) => {
    if (filterTab === 'saved') return d.isSaved;
    if (filterTab === 'mastered') return d.masteredCount >= d.cardsCount;
    return true;
  });

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#F3E8E8]">
        <div>
          <div className="flex items-center gap-2 text-[#B80049] mb-1">
            <Layers className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">
              Active Recall & Spaced Repetition
            </span>
          </div>
          <h1 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#1E1B18]">
            Flashcard Decks
          </h1>
          <p className="text-sm text-[#5B3F43] mt-0.5">
            Latih daya ingat terminologi latin, obat-obatan klinis, dan struktur anatomi dengan metode kartu pintar.
          </p>
        </div>

        <Button
          variant="primary"
          icon={Plus}
          onClick={() => setShowCreateModal(true)}
        >
          Buat Deck Baru
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setFilterTab('all')}
          className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
            filterTab === 'all'
              ? 'bg-[#B80049] text-white'
              : 'bg-white border border-[#EEDCDC] text-[#5B3F43] hover:bg-[#FAF7F5]'
          }`}
        >
          Semua Deck ({flashcardDecks.length})
        </button>

        <button
          onClick={() => setFilterTab('saved')}
          className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
            filterTab === 'saved'
              ? 'bg-[#B80049] text-white'
              : 'bg-white border border-[#EEDCDC] text-[#5B3F43] hover:bg-[#FAF7F5]'
          }`}
        >
          Tersimpan
        </button>

        <button
          onClick={() => setFilterTab('mastered')}
          className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
            filterTab === 'mastered'
              ? 'bg-[#B80049] text-white'
              : 'bg-white border border-[#EEDCDC] text-[#5B3F43] hover:bg-[#FAF7F5]'
          }`}
        >
          Sudah Dikuasai
        </button>
      </div>

      {/* Decks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredDecks.map((deck) => {
          const course = courses.find((c) => c.id === deck.courseId);
          const percent = Math.round((deck.masteredCount / Math.max(1, deck.cardsCount)) * 100);

          return (
            <div
              key={deck.id}
              className="bg-white rounded-2xl p-5 border border-[#F3E8E8] shadow-[0_2px_12px_-1px_rgba(45,41,38,0.03)] hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <Badge variant="primary">{course?.name || 'Veteriner'}</Badge>
                  <button
                    onClick={() => toggleSaveDeck(deck.id)}
                    className="p-1 text-[#8F6F73] hover:text-[#B80049] transition-colors cursor-pointer"
                  >
                    {deck.isSaved ? (
                      <BookmarkCheck className="w-4 h-4 text-[#B80049] fill-current" />
                    ) : (
                      <Bookmark className="w-4 h-4" />
                    )}
                  </button>
                </div>

                <h3
                  onClick={() => navigate(`/flashcards/${deck.id}/study`)}
                  className="font-serif-display font-bold text-lg text-[#1E1B18] mt-3 hover:text-[#B80049] transition-colors cursor-pointer"
                >
                  {deck.title}
                </h3>

                <p className="text-xs text-[#5B3F43] mt-1 line-clamp-2 leading-relaxed">
                  {deck.description}
                </p>

                <div className="flex items-center justify-between text-xs text-[#5B3F43] mt-4 pt-3 border-t border-[#FAF7F5]">
                  <span>{deck.cardsCount} Kartu Belajar</span>
                  <span className="font-bold text-[#B80049]">
                    {deck.masteredCount} / {deck.cardsCount} Dikuasai
                  </span>
                </div>
              </div>

              <div className="mt-3">
                <ProgressBar value={deck.masteredCount} max={deck.cardsCount || 1} />

                <div className="flex items-center justify-between gap-2 mt-4">
                  <button
                    onClick={() => deleteDeck(deck.id)}
                    className="p-2 rounded-full text-[#8F6F73] hover:text-red-600 hover:bg-red-50 transition-colors"
                    title="Hapus Deck"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <Button
                    size="sm"
                    variant="primary"
                    icon={Play}
                    onClick={() => navigate(`/flashcards/${deck.id}/study`)}
                  >
                    Belajar Sekarang
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Deck Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Buat Flashcard Deck Baru 🐾"
        maxWidth="lg"
      >
        <form onSubmit={handleCreateSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-bold text-[#1E1B18] block mb-1">
              Judul Deck Flashcard *
            </label>
            <input
              type="text"
              required
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Contoh: Otot Ekstremitas Cranial Anjing"
              className="w-full text-sm px-3.5 py-2 bg-[#FAF7F5] border border-[#EEDCDC] rounded-xl text-[#1E1B18] focus:outline-none focus:bg-white focus:border-[#B80049]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-[#1E1B18] block mb-1">
                Mata Kuliah Terkait
              </label>
              <select
                value={newCourseId}
                onChange={(e) => setNewCourseId(e.target.value)}
                className="w-full text-xs px-3 py-2 bg-[#FAF7F5] border border-[#EEDCDC] rounded-xl text-[#1E1B18] focus:outline-none focus:bg-white focus:border-[#B80049]"
              >
                {courses.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-[#1E1B18] block mb-1">
                Deskripsi Singkat
              </label>
              <input
                type="text"
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                placeholder="Catatan tujuan menghafal kartu ini"
                className="w-full text-sm px-3.5 py-2 bg-[#FAF7F5] border border-[#EEDCDC] rounded-xl text-[#1E1B18] focus:outline-none focus:bg-white focus:border-[#B80049]"
              />
            </div>
          </div>

          <div className="border-t border-[#F3E8E8] pt-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-[#1E1B18]">
                Daftar Pertanyaan & Jawaban ({newCards.length} Kartu)
              </span>
              <button
                type="button"
                onClick={handleAddCardRow}
                className="text-xs font-bold text-[#B80049] hover:underline flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Tambah Baris
              </button>
            </div>

            <div className="flex flex-col gap-3 max-h-64 overflow-y-auto pr-1">
              {newCards.map((card, idx) => (
                <div
                  key={idx}
                  className="bg-[#FAF7F5] p-3 rounded-xl border border-[#F3E8E8] flex flex-col gap-2 relative"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#8F6F73] uppercase">
                      Kartu #{idx + 1}
                    </span>
                    {newCards.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveCardRow(idx)}
                        className="text-[10px] text-red-500 hover:underline"
                      >
                        Hapus
                      </button>
                    )}
                  </div>
                  <input
                    type="text"
                    required
                    value={card.question}
                    onChange={(e) => {
                      const updated = [...newCards];
                      updated[idx].question = e.target.value;
                      setNewCards(updated);
                    }}
                    placeholder="Pertanyaan / Istilah Latin"
                    className="w-full text-xs px-3 py-1.5 bg-white border border-[#EEDCDC] rounded-lg"
                  />
                  <input
                    type="text"
                    required
                    value={card.answer}
                    onChange={(e) => {
                      const updated = [...newCards];
                      updated[idx].answer = e.target.value;
                      setNewCards(updated);
                    }}
                    placeholder="Jawaban / Arti / Fungsi"
                    className="w-full text-xs px-3 py-1.5 bg-white border border-[#EEDCDC] rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-[#F3E8E8]">
            <Button variant="ghost" onClick={() => setShowCreateModal(false)}>
              Batal
            </Button>
            <Button type="submit" variant="primary">
              Simpan & Mulai Belajar
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
