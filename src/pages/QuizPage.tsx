import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  HelpCircle,
  Clock,
  Award,
  CheckCircle,
  Play,
  Filter,
  Search,
  BookOpen
} from 'lucide-react';
import { Badge, Button } from '../components/common/UI';

export const QuizPage: React.FC = () => {
  const { quizzes, courses, navigate } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  const filteredQuizzes = quizzes.filter((q) => {
    if (selectedCourse !== 'all' && q.courseId !== selectedCourse) return false;
    if (selectedDifficulty !== 'all' && q.difficulty !== selectedDifficulty) return false;
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const matchTitle = q.title.toLowerCase().includes(query);
      const matchDesc = q.description.toLowerCase().includes(query);
      if (!matchTitle && !matchDesc) return false;
    }
    return true;
  });

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#F3E8E8]">
        <div>
          <div className="flex items-center gap-2 text-[#B80049] mb-1">
            <HelpCircle className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">
              Self-Assessment & Mock Exam
            </span>
          </div>
          <h1 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#1E1B18]">
            Kuis & Uji Pemahaman
          </h1>
          <p className="text-sm text-[#5B3F43] mt-0.5">
            Latihan soal pilihan ganda, kasus penalaran klinis, dan identifikasi struktur atlas FKH UGM.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8F6F73]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari kuis atau materi..."
            className="w-full pl-10 pr-4 py-2 bg-white text-sm rounded-full border border-[#EEDCDC] focus:outline-none focus:border-[#B80049] text-[#1E1B18]"
          />
        </div>
      </div>

      {/* Filter toolbar */}
      <div className="flex flex-wrap items-center gap-3 bg-white p-4 rounded-2xl border border-[#F3E8E8]">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-[#5B3F43]">Modul:</span>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="text-xs bg-[#FAF7F5] border border-[#EEDCDC] rounded-full px-3 py-1.5 focus:outline-none focus:border-[#B80049]"
          >
            <option value="all">Semua Modul</option>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-[#5B3F43]">Tingkat Kesulitan:</span>
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="text-xs bg-[#FAF7F5] border border-[#EEDCDC] rounded-full px-3 py-1.5 focus:outline-none focus:border-[#B80049]"
          >
            <option value="all">Semua Tingkat</option>
            <option value="easy">Easy (Dasar)</option>
            <option value="medium">Medium (Menengah)</option>
            <option value="hard">Hard (Kasus Klinis)</option>
          </select>
        </div>
      </div>

      {/* Quizzes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredQuizzes.map((quiz) => {
          const course = courses.find((c) => c.id === quiz.courseId);
          return (
            <div
              key={quiz.id}
              className="bg-white rounded-2xl p-5 border border-[#F3E8E8] shadow-[0_2px_12px_-1px_rgba(45,41,38,0.03)] hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <Badge
                    variant={
                      quiz.difficulty === 'hard'
                        ? 'warning'
                        : quiz.difficulty === 'medium'
                        ? 'primary'
                        : 'sage'
                    }
                  >
                    {quiz.difficulty.toUpperCase()}
                  </Badge>

                  <span className="text-xs text-[#8F6F73] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {quiz.timeLimitMinutes} menit
                  </span>
                </div>

                <h3
                  onClick={() => navigate(`/quiz/${quiz.id}/start`)}
                  className="font-serif-display font-bold text-lg text-[#1E1B18] mt-3 hover:text-[#B80049] transition-colors cursor-pointer"
                >
                  {quiz.title}
                </h3>

                <p className="text-xs text-[#5B3F43] mt-1.5 line-clamp-2 leading-relaxed">
                  {quiz.description}
                </p>

                <div className="flex items-center gap-2 mt-3 text-xs text-[#8F6F73]">
                  <span>{quiz.questions.length} Pertanyaan Ujian</span>
                  <span>·</span>
                  <span>{course?.name || 'Mata Kuliah FKH'}</span>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-[#FAF7F5] flex items-center justify-between">
                <div>
                  {quiz.bestScore !== undefined ? (
                    <div className="flex flex-col">
                      <span className="text-[10px] text-[#8F6F73]">Skor Terbaik:</span>
                      <span className="text-sm font-bold text-[#B80049]">
                        {quiz.bestScore}% ({quiz.attemptsCount}x Percobaan)
                      </span>
                    </div>
                  ) : (
                    <span className="text-xs text-[#8F6F73] italic">Belum dicoba</span>
                  )}
                </div>

                <Button
                  size="sm"
                  variant="primary"
                  icon={Play}
                  onClick={() => navigate(`/quiz/${quiz.id}/start`)}
                >
                  Mulai Kuis
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
