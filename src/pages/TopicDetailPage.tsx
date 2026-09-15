import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Layers,
  FileText,
  HelpCircle,
  Stethoscope,
  Grid,
  ArrowRight,
  CheckCircle2,
  BookOpen,
  ArrowLeft
} from 'lucide-react';
import { Breadcrumb, Button, Badge, ProgressBar } from '../components/common/UI';

export const TopicDetailPage: React.FC<{ courseId: string; topicId: string }> = ({
  courseId,
  topicId
}) => {
  const { courses, topics, materials, flashcardDecks, quizzes, clinicalCases, atlasStructures, navigate } = useApp();

  const course = courses.find((c) => c.id === courseId) || courses[0];
  const topic = topics.find((t) => t.id === topicId) || topics[0];

  if (!course || !topic) {
    return (
      <div className="w-full py-12 text-center flex flex-col items-center gap-4">
        <p className="text-[#5B3F43]">Topik atau mata kuliah tidak ditemukan.</p>
        <button
          onClick={() => navigate('/courses')}
          className="px-4 py-2 bg-[#B80049] text-white text-xs font-bold rounded-xl"
        >
          Kembali ke Daftar Kuliah
        </button>
      </div>
    );
  }

  const topicMaterials = materials.filter((m) => Boolean(m && m.topicId === topic.id));
  const topicDecks = flashcardDecks.filter((d) => Boolean(d && d.topicId === topic.id));
  const topicQuizzes = quizzes.filter((q) => Boolean(q && q.topicId === topic.id));
  const topicCases = clinicalCases.filter((c) => Boolean(c && c.topicId === topic.id));
  const topicAtlas = atlasStructures.filter((a) => Boolean(a && a.topicId === topic.id));

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'Home', onClick: () => navigate('/') },
          { label: 'Courses', onClick: () => navigate('/courses') },
          { label: course.name, onClick: () => navigate(`/courses/${course.id}`) },
          { label: topic.name }
        ]}
      />

      {/* Topic Header Card */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#F3E8E8] shadow-[0_4px_24px_-2px_rgba(226,22,95,0.06)] flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#B80049] bg-[#FFF0F5] px-2.5 py-0.5 rounded-full">
                {course.name}
              </span>
              <Badge variant="sage">Topik Pembelajaran</Badge>
            </div>
            <h1 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#1E1B18]">
              {topic.name}
            </h1>
          </div>

          <div className="flex flex-col items-end text-xs">
            <span className="font-bold text-[#B80049] text-sm">{topic.progress}% Selesai</span>
            <div className="w-32 h-2 rounded-full bg-[#FFD9DE] overflow-hidden mt-1">
              <div
                className="h-full bg-[#B80049] rounded-full"
                style={{ width: `${topic.progress}%` }}
              />
            </div>
          </div>
        </div>

        <p className="text-sm text-[#5B3F43] leading-relaxed max-w-3xl">
          {topic.description}
        </p>

        {topic.learningOutcomes && (
          <div className="bg-[#FAF7F5] rounded-xl p-4 border border-[#F3E8E8]">
            <span className="text-xs font-bold uppercase tracking-wider text-[#456460] block mb-2">
              Target Kompetensi & Capaian Belajar:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {topic.learningOutcomes.map((lo, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-[#5B3F43]">
                  <CheckCircle2 className="w-4 h-4 text-[#B80049] flex-shrink-0 mt-0.5" />
                  <span>{lo}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Materials Section */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#B80049]" />
            <h2 className="font-serif-display text-xl font-bold text-[#1E1B18]">
              Materi Kuliah ({topicMaterials.length})
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {topicMaterials.map((mat) => (
            <div
              key={mat.id}
              onClick={() => navigate(`/materials/${mat.id}/read`)}
              className="bg-white rounded-2xl p-5 border border-[#F3E8E8] shadow-[0_2px_12px_-1px_rgba(45,41,38,0.03)] hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#456460]">
                    {mat.type}
                  </span>
                  <span className="text-xs text-[#8F6F73]">{mat.readingTimeMinutes} min baca</span>
                </div>
                <h4 className="font-serif-display font-bold text-lg text-[#1E1B18] mt-2 group-hover:text-[#B80049] transition-colors">
                  {mat.title}
                </h4>
                <p className="text-xs text-[#5B3F43] mt-1 line-clamp-2">{mat.description}</p>
              </div>

              <div className="pt-4 mt-3 border-t border-[#FAF7F5] flex items-center justify-between">
                <span className="text-xs font-semibold text-[#1E1B18]">
                  {mat.isCompleted ? '✓ Selesai' : `${mat.progressPercent}%`}
                </span>
                <Button size="sm" variant="primary" icon={ArrowRight} iconPosition="right">
                  Buka Bacaan
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Flashcards & Quiz Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Flashcards */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#B80049]" />
            <h2 className="font-serif-display text-xl font-bold text-[#1E1B18]">
              Flashcards
            </h2>
          </div>
          {topicDecks.length === 0 ? (
            <div className="bg-white rounded-2xl p-6 text-center border border-[#F3E8E8]">
              <p className="text-xs text-[#8F6F73]">Belum ada deck untuk topik ini.</p>
            </div>
          ) : (
            topicDecks.map((deck) => (
              <div
                key={deck.id}
                className="bg-white rounded-2xl p-5 border border-[#F3E8E8] shadow-[0_2px_12px_-1px_rgba(45,41,38,0.03)] flex items-center justify-between gap-4"
              >
                <div>
                  <h4 className="font-serif-display font-bold text-base text-[#1E1B18]">
                    {deck.title}
                  </h4>
                  <p className="text-xs text-[#5B3F43] mt-0.5">
                    {deck.cardsCount} kartu · {deck.masteredCount} dikuasai
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => navigate(`/flashcards/${deck.id}/study`)}
                >
                  Hafalkan
                </Button>
              </div>
            ))
          )}
        </div>

        {/* Quizzes */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-[#B80049]" />
            <h2 className="font-serif-display text-xl font-bold text-[#1E1B18]">
              Kuis Topik
            </h2>
          </div>
          {topicQuizzes.length === 0 ? (
            <div className="bg-white rounded-2xl p-6 text-center border border-[#F3E8E8]">
              <p className="text-xs text-[#8F6F73]">Belum ada kuis untuk topik ini.</p>
            </div>
          ) : (
            topicQuizzes.map((quiz) => (
              <div
                key={quiz.id}
                className="bg-white rounded-2xl p-5 border border-[#F3E8E8] shadow-[0_2px_12px_-1px_rgba(45,41,38,0.03)] flex items-center justify-between gap-4"
              >
                <div>
                  <h4 className="font-serif-display font-bold text-base text-[#1E1B18]">
                    {quiz.title}
                  </h4>
                  <p className="text-xs text-[#5B3F43] mt-0.5">
                    {quiz.questions.length} Soal · {quiz.timeLimitMinutes} min · Skor: {quiz.bestScore ?? '-'}%
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => navigate(`/quiz/${quiz.id}/start`)}
                >
                  Mulai
                </Button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
