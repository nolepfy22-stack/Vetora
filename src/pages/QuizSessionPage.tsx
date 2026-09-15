import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  ArrowLeft,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  RotateCcw,
  Award,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  FileCheck
} from 'lucide-react';
import { Button, Modal, Badge } from '../components/common/UI';

export const QuizSessionPage: React.FC<{ quizId: string }> = ({ quizId }) => {
  const { quizzes, recordQuizAttempt, navigate } = useApp();

  const quiz = quizzes.find((q) => q.id === quizId) || quizzes[0];
  const questions = quiz.questions;
  const totalQuestions = questions.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(quiz.timeLimitMinutes * 60);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);
  const [startTime] = useState(Date.now());

  // Timer effect
  useEffect(() => {
    if (isSubmitted) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isSubmitted]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (optionIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [currentIndex]: optionIndex }));
  };

  const handleSubmitQuiz = () => {
    setShowConfirmSubmit(false);
    setIsSubmitted(true);

    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswerIndex) {
        correctCount += 1;
      }
    });

    const score = Math.round((correctCount / totalQuestions) * 100);
    const timeSpentSeconds = Math.round((Date.now() - startTime) / 1000);

    recordQuizAttempt({
      quizId: quiz.id,
      date: new Date().toISOString().split('T')[0],
      score,
      totalQuestions,
      correctAnswers: correctCount,
      timeSpentSeconds,
      answers: selectedAnswers
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentQ = questions[currentIndex];
  const answeredCount = Object.keys(selectedAnswers).length;

  // Calculate results if submitted
  const correctCount = questions.filter(
    (q, idx) => selectedAnswers[idx] === q.correctAnswerIndex
  ).length;
  const finalScore = Math.round((correctCount / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-[#FAF7F5] pb-16">
      {/* Top Header */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-[#F3E8E8] px-4 sm:px-8 py-3 flex items-center justify-between">
        <button
          onClick={() => navigate('/quiz')}
          className="flex items-center gap-1.5 text-xs font-semibold text-[#5B3F43] hover:text-[#1E1B18]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Keluar Kuis</span>
        </button>

        <div className="flex flex-col items-center">
          <span className="font-serif-display font-bold text-sm text-[#1E1B18]">
            {quiz.title}
          </span>
          <span className="text-[11px] text-[#8F6F73]">
            {isSubmitted
              ? 'Hasil Ujian'
              : `Soal ${currentIndex + 1} dari ${totalQuestions} (${answeredCount} dijawab)`}
          </span>
        </div>

        {!isSubmitted ? (
          <div
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
              timeLeft < 180
                ? 'bg-red-50 text-red-600 border-red-200 animate-pulse'
                : 'bg-[#FAF7F5] text-[#1E1B18] border-[#EEDCDC]'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>{formatTime(timeLeft)}</span>
          </div>
        ) : (
          <div className="w-20" />
        )}
      </div>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 flex flex-col gap-6">
        {/* ============ RESULT VIEW (WHEN SUBMITTED) ============ */}
        {isSubmitted ? (
          <div className="flex flex-col gap-6">
            {/* Score Banner */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#F3E8E8] shadow-xl text-center flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-[#FFF0F5] text-[#B80049] flex items-center justify-center text-3xl mb-3 shadow-xs">
                {finalScore >= 75 ? '🏆' : '📚'}
              </div>

              <span className="text-xs font-bold uppercase tracking-wider text-[#8F6F73]">
                Hasil Evaluasi Kuis
              </span>
              <h2 className="font-serif-display font-bold text-3xl text-[#1E1B18] mt-1">
                {finalScore >= 75 ? 'Luar Biasa, Pemahaman Klinis Mantap!' : 'Tetap Semangat, Mari Evaluasi Jawaban!'}
              </h2>

              <div className="flex items-center justify-center gap-6 my-6">
                <div className="flex flex-col">
                  <span className="font-serif-display font-bold text-4xl text-[#B80049]">
                    {finalScore}%
                  </span>
                  <span className="text-xs text-[#8F6F73]">Skor Akhir</span>
                </div>
                <div className="h-10 w-px bg-[#EEDCDC]" />
                <div className="flex flex-col">
                  <span className="font-serif-display font-bold text-4xl text-[#1E1B18]">
                    {correctCount}/{totalQuestions}
                  </span>
                  <span className="text-xs text-[#8F6F73]">Benar</span>
                </div>
                <div className="h-10 w-px bg-[#EEDCDC]" />
                <div className="flex flex-col">
                  <span className="font-serif-display font-bold text-4xl text-[#456460]">
                    {formatTime(quiz.timeLimitMinutes * 60 - timeLeft)}
                  </span>
                  <span className="text-xs text-[#8F6F73]">Waktu Pengerjaan</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 justify-center">
                <Button
                  variant="outline"
                  icon={RotateCcw}
                  onClick={() => {
                    setSelectedAnswers({});
                    setTimeLeft(quiz.timeLimitMinutes * 60);
                    setIsSubmitted(false);
                    setCurrentIndex(0);
                  }}
                >
                  Coba Ulangi Kuis
                </Button>
                <Button variant="primary" onClick={() => navigate('/quiz')}>
                  Kembali ke Daftar Kuis
                </Button>
              </div>
            </div>

            {/* Questions Review Breakdown */}
            <div className="flex flex-col gap-4">
              <h3 className="font-serif-display font-bold text-xl text-[#1E1B18]">
                Pembahasan Lengkap & Kunci Jawaban
              </h3>

              {questions.map((q, idx) => {
                const userAns = selectedAnswers[idx];
                const isCorrect = userAns === q.correctAnswerIndex;

                return (
                  <div
                    key={q.id}
                    className={`bg-white rounded-2xl p-6 border shadow-xs ${
                      isCorrect ? 'border-[#C5E7E1]' : 'border-[#FFDAD6]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#FAF7F5] text-[#5B3F43]">
                          Soal #{idx + 1}
                        </span>
                        {isCorrect ? (
                          <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                            <CheckCircle2 className="w-4 h-4" /> Jawaban Tepat (+1)
                          </span>
                        ) : (
                          <span className="text-xs font-bold text-red-600 flex items-center gap-1">
                            <XCircle className="w-4 h-4" /> Salah
                          </span>
                        )}
                      </div>
                    </div>

                    <h4 className="font-serif-display font-bold text-base text-[#1E1B18] mb-4">
                      {q.questionText}
                    </h4>

                    {q.imageUrl && (
                      <div className="max-w-xs mb-4 rounded-xl overflow-hidden border border-[#F3E8E8]">
                        <img src={q.imageUrl} alt="Ilustrasi soal" className="w-full h-auto object-cover" />
                      </div>
                    )}

                    {/* Options list */}
                    <div className="flex flex-col gap-2">
                      {q.options.map((opt, optIdx) => {
                        const isSelected = userAns === optIdx;
                        const isTheCorrectOne = optIdx === q.correctAnswerIndex;

                        let optClass = 'bg-[#FAF7F5] border-[#EEDCDC] text-[#5B3F43]';
                        if (isTheCorrectOne) {
                          optClass = 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold';
                        } else if (isSelected && !isTheCorrectOne) {
                          optClass = 'bg-red-50 border-red-300 text-red-900 line-through';
                        }

                        return (
                          <div
                            key={optIdx}
                            className={`p-3 rounded-xl border text-xs flex items-center justify-between ${optClass}`}
                          >
                            <span>
                              {String.fromCharCode(65 + optIdx)}. {opt}
                            </span>
                            {isTheCorrectOne && (
                              <span className="text-[11px] font-bold text-emerald-700">Kunci Jawaban</span>
                            )}
                            {isSelected && !isTheCorrectOne && (
                              <span className="text-[11px] text-red-600">Jawaban Kamu</span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Explanation */}
                    {q.explanation && (
                      <div className="mt-4 p-3.5 rounded-xl bg-[#FAF7F5] border border-[#F3E8E8] text-xs text-[#5B3F43] leading-relaxed">
                        <strong className="text-[#1E1B18] block mb-1">Penjelasan Klinis:</strong>
                        {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* ============ ACTIVE EXAM QUESTION VIEW ============ */
          <div className="flex flex-col gap-6">
            {/* Question navigator pill row */}
            <div className="bg-white rounded-2xl p-4 border border-[#F3E8E8] flex items-center gap-1.5 overflow-x-auto scrollbar-thin">
              {questions.map((q, idx) => {
                const isAnswered = selectedAnswers[idx] !== undefined;
                const isCurrent = idx === currentIndex;

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-8 h-8 rounded-full text-xs font-bold flex-shrink-0 transition-all cursor-pointer ${
                      isCurrent
                        ? 'bg-[#B80049] text-white ring-2 ring-[#B80049]/30'
                        : isAnswered
                        ? 'bg-[#C5E7E1] text-[#2E4C48]'
                        : 'bg-[#FAF7F5] text-[#5B3F43] hover:bg-[#F5ECE7]'
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            {/* Current Question Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#F3E8E8] shadow-xs flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#B80049] bg-[#FFF0F5] px-3 py-1 rounded-full">
                  Pertanyaan {currentIndex + 1} dari {totalQuestions}
                </span>

                <span className="text-xs text-[#8F6F73]">
                  {selectedAnswers[currentIndex] !== undefined ? 'Sudah dijawab' : 'Belum dijawab'}
                </span>
              </div>

              <h3 className="font-serif-display font-bold text-xl sm:text-2xl text-[#1E1B18] leading-relaxed">
                {currentQ.questionText}
              </h3>

              {currentQ.imageUrl && (
                <div className="max-w-sm rounded-2xl overflow-hidden border border-[#F3E8E8] mx-auto">
                  <img src={currentQ.imageUrl} alt="Pertanyaan kuis" className="w-full h-auto object-cover" />
                </div>
              )}

              {/* Options */}
              <div className="flex flex-col gap-3">
                {currentQ.options.map((optionText, optIdx) => {
                  const isSelected = selectedAnswers[currentIndex] === optIdx;
                  return (
                    <div
                      key={optIdx}
                      onClick={() => handleSelectOption(optIdx)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-3.5 select-none ${
                        isSelected
                          ? 'bg-[#FFF0F5] border-[#B80049] text-[#B80049] shadow-xs'
                          : 'bg-[#FAF7F5] border-[#EEDCDC] text-[#1E1B18] hover:bg-white hover:border-[#B80049]/40'
                      }`}
                    >
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-colors ${
                          isSelected
                            ? 'bg-[#B80049] text-white'
                            : 'bg-white text-[#5B3F43] border border-[#EEDCDC]'
                        }`}
                      >
                        {String.fromCharCode(65 + optIdx)}
                      </div>
                      <span className="text-sm font-medium">{optionText}</span>
                    </div>
                  );
                })}
              </div>

              {/* Navigation and Submit */}
              <div className="pt-6 border-t border-[#F3E8E8] flex items-center justify-between gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  icon={ChevronLeft}
                  onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                  disabled={currentIndex === 0}
                >
                  Sebelumnya
                </Button>

                {currentIndex === totalQuestions - 1 ? (
                  <Button
                    variant="primary"
                    size="md"
                    icon={FileCheck}
                    onClick={() => setShowConfirmSubmit(true)}
                  >
                    Kumpulkan Ujian
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    size="sm"
                    icon={ChevronRight}
                    iconPosition="right"
                    onClick={() => setCurrentIndex((prev) => Math.min(totalQuestions - 1, prev + 1))}
                  >
                    Berikutnya
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      <Modal
        isOpen={showConfirmSubmit}
        onClose={() => setShowConfirmSubmit(false)}
        title="Kumpulkan Jawaban Kuis?"
        maxWidth="sm"
      >
        <div className="flex flex-col gap-4">
          <p className="text-sm text-[#5B3F43] leading-relaxed">
            Kamu telah menjawab <strong>{answeredCount}</strong> dari{' '}
            <strong>{totalQuestions}</strong> pertanyaan. Apakah kamu sudah yakin ingin
            mengakhiri kuis ini?
          </p>

          {answeredCount < totalQuestions && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>
                Perhatian: Ada {totalQuestions - answeredCount} soal yang belum dijawab!
              </span>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" onClick={() => setShowConfirmSubmit(false)}>
              Periksa Lagi
            </Button>
            <Button variant="primary" onClick={handleSubmitQuiz}>
              Kumpulkan Sekarang
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
