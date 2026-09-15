import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { CardDifficulty } from '../types';
import {
  ArrowLeft,
  RotateCw,
  Sparkles,
  CheckCircle,
  Clock,
  HelpCircle,
  Lightbulb,
  Award,
  BookOpen
} from 'lucide-react';
import { Button, ProgressBar, Badge } from '../components/common/UI';

export const FlashcardStudyPage: React.FC<{ deckId: string }> = ({ deckId }) => {
  const {
    flashcardDecks,
    updateCardDifficulty,
    logStudySession,
    navigate
  } = useApp();

  const deck = flashcardDecks.find((d) => d.id === deckId) || flashcardDecks[0];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [sessionStartTime] = useState(Date.now());
  const [isComplete, setIsComplete] = useState(false);
  const [difficultCardIds, setDifficultCardIds] = useState<string[]>([]);

  const totalCards = deck.cards.length;
  const currentCard = deck.cards[currentIndex];

  // Keyboard shortcut listener: Space to flip, 1-4 to rate
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isComplete) return;

      if (e.code === 'Space') {
        e.preventDefault();
        setIsFlipped((prev) => !prev);
      } else if (isFlipped) {
        if (e.key === '1') handleRate('again');
        else if (e.key === '2') handleRate('hard');
        else if (e.key === '3') handleRate('good');
        else if (e.key === '4') handleRate('easy');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFlipped, isComplete, currentIndex]);

  const handleRate = (difficulty: CardDifficulty) => {
    if (!currentCard) return;

    // Track difficulty
    updateCardDifficulty(deck.id, currentCard.id, difficulty);
    if (difficulty === 'again' || difficulty === 'hard') {
      setDifficultCardIds((prev) => [...prev, currentCard.id]);
    }

    // Move next or finish
    if (currentIndex < totalCards - 1) {
      setIsFlipped(false);
      setCurrentIndex((prev) => prev + 1);
    } else {
      const minutesSpent = Math.max(1, Math.round((Date.now() - sessionStartTime) / 60000));
      logStudySession(
        'flashcard',
        `Sesi Flashcard: ${deck.title}`,
        `${totalCards} kartu direview, selesai dalam ${minutesSpent} menit`,
        minutesSpent
      );
      setIsComplete(true);
    }
  };

  const handleRestartAll = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setIsComplete(false);
    setDifficultCardIds([]);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F5] pb-16 flex flex-col items-center">
      {/* Pinned Top Bar */}
      <div className="w-full bg-white border-b border-[#F3E8E8] px-4 sm:px-8 py-3 flex items-center justify-between">
        <button
          onClick={() => navigate('/flashcards')}
          className="flex items-center gap-2 text-xs font-semibold text-[#5B3F43] hover:text-[#1E1B18]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Flashcards</span>
        </button>

        <div className="flex flex-col items-center">
          <span className="font-serif-display font-bold text-sm text-[#1E1B18]">
            {deck.title}
          </span>
          <span className="text-[11px] text-[#8F6F73]">
            {isComplete ? 'Selesai' : `Kartu ${currentIndex + 1} dari ${totalCards}`}
          </span>
        </div>

        <div className="w-20" />
      </div>

      {/* Top progress bar */}
      <div className="w-full h-1.5 bg-[#FFD9DE]">
        <div
          className="h-full bg-[#B80049] transition-all duration-300"
          style={{
            width: `${isComplete ? 100 : Math.round(((currentIndex) / totalCards) * 100)}%`
          }}
        />
      </div>

      {/* Main Flashcard View */}
      <div className="w-full max-w-2xl px-4 sm:px-6 pt-10 flex flex-col items-center">
        {!isComplete ? (
          <div className="w-full flex flex-col items-center gap-6">
            {/* The Flashcard */}
            <div
              onClick={() => setIsFlipped(!isFlipped)}
              className="w-full min-h-[340px] sm:min-h-[380px] bg-white rounded-3xl p-8 sm:p-10 border border-[#F3E8E8] shadow-[0_8px_32px_-4px_rgba(226,22,95,0.08),0_2px_8px_rgba(45,41,38,0.04)] hover:shadow-xl transition-all duration-200 cursor-pointer flex flex-col justify-between select-none relative group"
            >
              {/* Card top tag */}
              <div className="flex items-center justify-between">
                <Badge variant={isFlipped ? 'sage' : 'primary'}>
                  {isFlipped ? 'Kunci Jawaban' : 'Pertanyaan / Istilah'}
                </Badge>
                <span className="text-xs text-[#8F6F73] flex items-center gap-1 group-hover:text-[#B80049] transition-colors">
                  <RotateCw className="w-3.5 h-3.5" /> Klik kartu atau tekan Spasi
                </span>
              </div>

              {/* Card Body */}
              <div className="py-8 text-center flex flex-col items-center justify-center my-auto">
                {!isFlipped ? (
                  <>
                    <h2 className="font-serif-display font-bold text-2xl sm:text-3xl text-[#1E1B18] leading-snug">
                      {currentCard.question}
                    </h2>
                    {currentCard.hint && (
                      <div className="mt-4 inline-flex items-center gap-1.5 text-xs text-[#8F6F73] bg-[#FAF7F5] px-3 py-1.5 rounded-full border border-[#EEDCDC]">
                        <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                        <span>Petunjuk: {currentCard.hint}</span>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <h2 className="font-serif-display font-bold text-2xl sm:text-3xl text-[#B80049] leading-snug">
                      {currentCard.answer}
                    </h2>
                    {currentCard.explanation && (
                      <p className="text-sm text-[#5B3F43] mt-4 max-w-lg leading-relaxed">
                        {currentCard.explanation}
                      </p>
                    )}
                    {currentCard.mnemonic && (
                      <div className="mt-4 bg-[#FFF0F5] px-4 py-2 rounded-xl text-xs font-semibold text-[#B80049] border border-[#FFD9DE]">
                        💡 Jembatan Keledai: "{currentCard.mnemonic}"
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Card Bottom status */}
              <div className="flex items-center justify-between pt-4 border-t border-[#FAF7F5] text-xs text-[#8F6F73]">
                <span>Tingkat Penguasaan: {currentCard.masteryLevel}%</span>
                <span>Spasi: Balik Kartu</span>
              </div>
            </div>

            {/* Response Rating Bar */}
            {isFlipped ? (
              <div className="w-full flex flex-col items-center gap-3">
                <span className="text-xs font-bold text-[#5B3F43]">
                  Seberapa lancar kamu mengingat jawaban ini?
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full">
                  <button
                    onClick={() => handleRate('again')}
                    className="flex flex-col items-center justify-center p-3 rounded-2xl bg-[#FFDAD6] hover:bg-[#FFB4AB] text-[#93000A] font-bold transition-transform active:scale-95 cursor-pointer shadow-xs"
                  >
                    <span className="text-sm">Ulangi (1)</span>
                    <span className="text-[10px] font-normal">&lt; 1 Menit</span>
                  </button>

                  <button
                    onClick={() => handleRate('hard')}
                    className="flex flex-col items-center justify-center p-3 rounded-2xl bg-[#FFE2A9] hover:bg-[#FFD480] text-[#7A5900] font-bold transition-transform active:scale-95 cursor-pointer shadow-xs"
                  >
                    <span className="text-sm">Sulit (2)</span>
                    <span className="text-[10px] font-normal">10 Menit</span>
                  </button>

                  <button
                    onClick={() => handleRate('good')}
                    className="flex flex-col items-center justify-center p-3 rounded-2xl bg-[#C5E7E1] hover:bg-[#A3D9D1] text-[#2E4C48] font-bold transition-transform active:scale-95 cursor-pointer shadow-xs"
                  >
                    <span className="text-sm">Baik (3)</span>
                    <span className="text-[10px] font-normal">1 Hari</span>
                  </button>

                  <button
                    onClick={() => handleRate('easy')}
                    className="flex flex-col items-center justify-center p-3 rounded-2xl bg-[#D1E7DD] hover:bg-[#B5DEC9] text-[#0F5132] font-bold transition-transform active:scale-95 cursor-pointer shadow-xs"
                  >
                    <span className="text-sm">Mudah (4)</span>
                    <span className="text-[10px] font-normal">4 Hari</span>
                  </button>
                </div>
              </div>
            ) : (
              <Button
                variant="primary"
                size="lg"
                onClick={() => setIsFlipped(true)}
                className="w-full sm:w-auto px-8"
              >
                Lihat Kunci Jawaban
              </Button>
            )}
          </div>
        ) : (
          /* Deck Complete View */
          <div className="w-full bg-white rounded-3xl p-8 sm:p-12 border border-[#F3E8E8] shadow-xl text-center flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-[#FFF0F5] text-[#B80049] flex items-center justify-center text-3xl mb-4 shadow-xs">
              🎉
            </div>

            <h2 className="font-serif-display font-bold text-3xl text-[#1E1B18]">
              Deck Selesai Dipelajari!
            </h2>
            <p className="text-sm text-[#5B3F43] mt-2 max-w-md">
              Hebat sekali, Bulan! Kamu telah mereview seluruh {totalCards} kartu pada modul "{deck.title}".
            </p>

            <div className="grid grid-cols-2 gap-4 my-6 w-full max-w-sm">
              <div className="bg-[#FAF7F5] p-4 rounded-2xl border border-[#F3E8E8]">
                <span className="text-2xl font-bold text-[#1E1B18] font-serif-display">
                  {totalCards}
                </span>
                <span className="text-xs text-[#8F6F73] block mt-0.5">Total Kartu</span>
              </div>
              <div className="bg-[#FAF7F5] p-4 rounded-2xl border border-[#F3E8E8]">
                <span className="text-2xl font-bold text-[#B80049] font-serif-display">
                  {deck.masteredCount}
                </span>
                <span className="text-xs text-[#8F6F73] block mt-0.5">Telah Dikuasai</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
              <Button
                variant="outline"
                className="flex-1"
                onClick={handleRestartAll}
              >
                Ulangi Deck
              </Button>
              <Button
                variant="primary"
                className="flex-1"
                onClick={() => navigate('/flashcards')}
              >
                Selesai
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
