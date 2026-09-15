import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { ASSETS } from '../data/mockData';
import {
  Award,
  Clock,
  BookOpen,
  Flame,
  Save,
  Camera,
  Edit3,
  CheckCircle,
  X,
  Target,
  Sparkles,
  School,
  IdCard,
  User as UserIcon,
  RefreshCw
} from 'lucide-react';
import { Badge, Button, Card } from '../components/common/UI';

const AVATAR_PRESETS = [
  { label: 'Bulan (Default)', url: ASSETS.avatar },
  { label: 'Veterinary Cat', url: ASSETS.catHero },
  { label: 'Cor Plate', url: ASSETS.heartExterior },
  { label: 'Anatomy Litho', url: ASSETS.atlasLithograph }
];

export const ProfilePage: React.FC = () => {
  const { user, updateUser, stats, courses, achievements, showToast, resetProgress } = useApp();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);

  // Form states
  const [fullName, setFullName] = useState(user?.fullName || user?.name || 'Lovelita Najwa Bulan Dayanara');
  const [nickname, setNickname] = useState(user?.nickname || user?.name || 'Bulan');
  const [institution, setInstitution] = useState(user?.institution || 'Universitas Gadjah Mada');
  const [faculty, setFaculty] = useState(user?.faculty || 'Fakultas Kedokteran Hewan (FKH UGM)');
  const [studyProgram, setStudyProgram] = useState(user?.studyProgram || 'Kedokteran Hewan (S.KH)');
  const [studentId, setStudentId] = useState(user?.studentId || '23/514982/KH/11024');
  const [semester, setSemester] = useState(user?.currentSemester || 3);
  const [dailyGoalMinutes, setDailyGoalMinutes] = useState(user?.dailyGoalMinutes || 45);
  const [preferredStudyGoal, setPreferredStudyGoal] = useState(
    user?.preferredStudyGoal || 'Kuasai Anatomi Veteriner & Mikrobiologi Klinis'
  );
  const [bio, setBio] = useState(user?.bio || 'Mahasiswi Kedokteran Hewan FKH UGM angkatan 2023. Minat pada kardiologi hewan kecil dan ilmu bedah.');
  const [avatarPreview, setAvatarPreview] = useState(user?.avatarUrl || ASSETS.avatar);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) {
        showToast('Ukuran foto maksimal 4MB', 'warning');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setAvatarPreview(result);
        updateUser({ avatarUrl: result });
        showToast('Foto profil berhasil diperbarui! 🐾', 'success');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectPreset = (url: string) => {
    setAvatarPreview(url);
    updateUser({ avatarUrl: url });
    setShowAvatarPicker(false);
    showToast('Foto profil avatar dipilih!', 'success');
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({
      name: nickname || fullName.split(' ')[0] || 'Bulan',
      fullName,
      nickname,
      institution,
      faculty,
      studyProgram,
      studentId,
      currentSemester: semester as any,
      semesterLabel: `Semester ${semester}`,
      dailyGoalMinutes,
      preferredStudyGoal,
      bio,
      avatarUrl: avatarPreview
    });
    setIsEditing(false);
  };

  return (
    <div className="w-full flex flex-col gap-6 max-w-5xl mx-auto">
      {/* Hidden file input for photo upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handlePhotoUpload}
        accept="image/*"
        className="hidden"
      />

      {/* ================= 1. RESPONSIVE PROFILE CARD (Fixed Anti-Gepeng) ================= */}
      <div className="bg-white dark:bg-[#1E1A1C] rounded-3xl p-5 sm:p-7 md:p-8 border border-[#F3E8E8] dark:border-[#382F32] shadow-[0_2px_14px_-2px_rgba(45,41,38,0.04)] flex flex-col md:flex-row md:items-center justify-between gap-6 transition-colors">
        
        {/* Left side: Avatar + User Info (stack cleanly without crushing) */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start md:items-center gap-5 sm:gap-6 text-center sm:text-left min-w-0">
          
          {/* Avatar container with fixed aspect ratio, flex-shrink-0, and camera overlay */}
          <div className="relative flex-shrink-0 group">
            <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-[#FFD9DE] dark:border-[#522935] shadow-md bg-[#FAF7F5] dark:bg-[#282124] relative">
              <img
                src={user?.avatarUrl || avatarPreview || ASSETS.avatar}
                alt={user?.fullName || user?.name || 'Mahasiswa'}
                className="w-full h-full object-cover object-center aspect-square"
              />
            </div>

            {/* Quick change photo button overlay */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-[11px] font-semibold cursor-pointer"
              title="Upload foto profil baru"
            >
              <Camera className="w-5 h-5 mb-0.5" />
              <span>Ganti Foto</span>
            </button>

            {/* Corner Badge */}
            <button
              onClick={() => setShowAvatarPicker(true)}
              className="absolute -bottom-1 -right-1 bg-white dark:bg-[#282124] p-1.5 rounded-full shadow-md border border-[#F3E8E8] dark:border-[#4A3D42] hover:scale-110 transition-transform cursor-pointer"
              title="Pilih Avatar Cepat"
            >
              <span className="text-base select-none leading-none">🐾</span>
            </button>
          </div>

          {/* User Details */}
          <div className="flex flex-col min-w-0 flex-1">
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-1.5 flex-wrap">
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#FFF0F5] dark:bg-[#3D1A25] text-[#B80049] dark:text-[#FFAEC0] border border-[#FFD9DE] dark:border-[#5C2334]">
                Kedokteran Hewan
              </span>
              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#FAF7F5] dark:bg-[#282124] text-[#5B3F43] dark:text-[#E8D5D8] border border-[#EEDCDC] dark:border-[#382F32]">
                Semester {user?.currentSemester || 3}
              </span>
            </div>

            <h1 className="font-serif-display font-bold text-2xl sm:text-3xl text-[#1E1B18] dark:text-[#FFF5F6] tracking-tight truncate">
              {user?.fullName || user?.name || 'Bulan'}
            </h1>

            <p className="text-xs sm:text-sm text-[#5B3F43] dark:text-[#D1B8BC] mt-0.5 font-medium flex items-center justify-center sm:justify-start gap-1 flex-wrap">
              <span>{user?.institution || 'Universitas Gadjah Mada'}</span>
              <span className="opacity-40">·</span>
              <span className="text-[#8F6F73] dark:text-[#A89095]">NIM: {user?.studentId || '23/514982/KH/11024'}</span>
            </p>

            {user?.preferredStudyGoal && (
              <div className="mt-2 flex items-center justify-center sm:justify-start gap-1.5 text-xs text-[#B80049] dark:text-[#FFAEC0] font-semibold">
                <Target className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="truncate">Fokus: {user.preferredStudyGoal}</span>
              </div>
            )}

            {user?.bio && (
              <p className="text-xs text-[#8F6F73] dark:text-[#BAA0A5] mt-2 italic leading-relaxed max-w-xl">
                “{user.bio}”
              </p>
            )}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex sm:flex-row md:flex-col items-center justify-center gap-2 flex-shrink-0">
          <Button
            variant={isEditing ? 'outline' : 'primary'}
            icon={isEditing ? X : Edit3}
            onClick={() => setIsEditing(!isEditing)}
            className="w-full sm:w-auto"
          >
            {isEditing ? 'Tutup Form' : 'Ubah Profil'}
          </Button>

          <Button
            variant="ghost"
            icon={Camera}
            onClick={() => fileInputRef.current?.click()}
            className="w-full sm:w-auto text-xs"
          >
            Upload Foto
          </Button>
        </div>
      </div>

      {/* ================= AVATAR PRESET PICKER MODAL ================= */}
      {showAvatarPicker && (
        <div className="p-4 sm:p-5 rounded-2xl bg-[#FFF0F5] dark:bg-[#282124] border border-[#FFD9DE] dark:border-[#4A3D42] flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#B80049]" />
              <h4 className="font-bold text-sm text-[#1E1B18] dark:text-white">
                Pilih Avatar Kurasi VETORA
              </h4>
            </div>
            <button
              onClick={() => setShowAvatarPicker(false)}
              className="text-xs text-[#8F6F73] hover:text-[#B80049]"
            >
              Tutup ✕
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {AVATAR_PRESETS.map((p, idx) => (
              <div
                key={idx}
                onClick={() => handleSelectPreset(p.url)}
                className="flex items-center gap-2.5 p-2 rounded-xl bg-white dark:bg-[#1E1A1C] border border-[#F3E8E8] dark:border-[#382F32] hover:border-[#B80049] cursor-pointer transition-all"
              >
                <img
                  src={p.url}
                  alt={p.label}
                  className="w-10 h-10 rounded-full object-cover border border-[#FFD9DE] flex-shrink-0"
                />
                <span className="text-xs font-semibold text-[#1E1B18] dark:text-[#E8D5D8] truncate">
                  {p.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= 2. PROFILE EDIT FORM ================= */}
      {isEditing && (
        <form
          onSubmit={handleSave}
          className="bg-white dark:bg-[#1E1A1C] rounded-3xl p-6 sm:p-8 border border-[#FFD9DE] dark:border-[#4A3D42] shadow-sm flex flex-col gap-5 transition-colors"
        >
          <div className="flex items-center justify-between pb-3 border-b border-[#F3E8E8] dark:border-[#382F32]">
            <div>
              <h3 className="font-serif-display font-bold text-lg sm:text-xl text-[#1E1B18] dark:text-[#FFF5F6]">
                Perbarui Informasi Mahasiswa
              </h3>
              <p className="text-xs text-[#5B3F43] dark:text-[#BAA0A5] mt-0.5">
                Sesuaikan identitas, semester aktif, dan target belajar harianmu di FKH UGM.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="p-1 rounded-lg text-[#8F6F73] hover:bg-[#FAF7F5] dark:hover:bg-[#282124]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-[#1E1B18] dark:text-[#E8D5D8] block mb-1">
                Nama Lengkap
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Contoh: Lovelita Najwa Bulan Dayanara"
                className="w-full text-xs p-2.5 bg-[#FAF7F5] dark:bg-[#282124] border border-[#EEDCDC] dark:border-[#382F32] rounded-xl text-[#1E1B18] dark:text-white focus:outline-none focus:border-[#B80049]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#1E1B18] dark:text-[#E8D5D8] block mb-1">
                Nama Panggilan
              </label>
              <input
                type="text"
                required
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="Contoh: Bulan"
                className="w-full text-xs p-2.5 bg-[#FAF7F5] dark:bg-[#282124] border border-[#EEDCDC] dark:border-[#382F32] rounded-xl text-[#1E1B18] dark:text-white focus:outline-none focus:border-[#B80049]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#1E1B18] dark:text-[#E8D5D8] block mb-1">
                Nomor Induk Mahasiswa (NIM)
              </label>
              <input
                type="text"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                placeholder="23/514982/KH/11024"
                className="w-full text-xs p-2.5 bg-[#FAF7F5] dark:bg-[#282124] border border-[#EEDCDC] dark:border-[#382F32] rounded-xl text-[#1E1B18] dark:text-white focus:outline-none focus:border-[#B80049]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#1E1B18] dark:text-[#E8D5D8] block mb-1">
                Universitas & Fakultas
              </label>
              <input
                type="text"
                required
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                className="w-full text-xs p-2.5 bg-[#FAF7F5] dark:bg-[#282124] border border-[#EEDCDC] dark:border-[#382F32] rounded-xl text-[#1E1B18] dark:text-white focus:outline-none focus:border-[#B80049]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#1E1B18] dark:text-[#E8D5D8] block mb-1">
                Semester Berjalan
              </label>
              <select
                value={semester}
                onChange={(e) => setSemester(Number(e.target.value))}
                className="w-full text-xs p-2.5 bg-[#FAF7F5] dark:bg-[#282124] border border-[#EEDCDC] dark:border-[#382F32] rounded-xl text-[#1E1B18] dark:text-white focus:outline-none focus:border-[#B80049]"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                  <option key={sem} value={sem}>
                    Semester {sem} (Sarjana Kedokteran Hewan)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-[#1E1B18] dark:text-[#E8D5D8] block mb-1">
                Target Belajar Harian (Menit)
              </label>
              <input
                type="number"
                min={15}
                max={360}
                value={dailyGoalMinutes}
                onChange={(e) => setDailyGoalMinutes(Number(e.target.value))}
                className="w-full text-xs p-2.5 bg-[#FAF7F5] dark:bg-[#282124] border border-[#EEDCDC] dark:border-[#382F32] rounded-xl text-[#1E1B18] dark:text-white focus:outline-none focus:border-[#B80049]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-[#1E1B18] dark:text-[#E8D5D8] block mb-1">
              Target Utama / Minat Spesialisasi
            </label>
            <input
              type="text"
              value={preferredStudyGoal}
              onChange={(e) => setPreferredStudyGoal(e.target.value)}
              placeholder="Contoh: Kardiologi Hewan Kecil & Bedah Jaringan Lunak"
              className="w-full text-xs p-2.5 bg-[#FAF7F5] dark:bg-[#282124] border border-[#EEDCDC] dark:border-[#382F32] rounded-xl text-[#1E1B18] dark:text-white focus:outline-none focus:border-[#B80049]"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-[#1E1B18] dark:text-[#E8D5D8] block mb-1">
              Bio Pribadi & Catatan Semangat
            </label>
            <textarea
              rows={2}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tuliskan motto atau pengingat belajar..."
              className="w-full text-xs p-2.5 bg-[#FAF7F5] dark:bg-[#282124] border border-[#EEDCDC] dark:border-[#382F32] rounded-xl text-[#1E1B18] dark:text-white focus:outline-none focus:border-[#B80049]"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-[#F3E8E8] dark:border-[#382F32]">
            <Button variant="ghost" onClick={() => setIsEditing(false)}>
              Batal
            </Button>
            <Button type="submit" variant="primary" icon={Save}>
              Simpan Perubahan
            </Button>
          </div>
        </form>
      )}

      {/* ================= 3. ACADEMIC METRICS & STATS ================= */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white dark:bg-[#1E1A1C] rounded-2xl p-4 sm:p-5 border border-[#F3E8E8] dark:border-[#382F32] shadow-xs flex flex-col transition-colors">
          <div className="flex items-center gap-2 text-amber-500 mb-2">
            <Flame className="w-5 h-5 fill-current" />
            <span className="text-xs font-bold text-[#5B3F43] dark:text-[#D1B8BC]">Streak Belajar</span>
          </div>
          <span className="font-serif-display font-bold text-2xl sm:text-3xl text-[#1E1B18] dark:text-white">
            {stats.studyStreak || user?.studyStreakDays || 0} Hari
          </span>
          <span className="text-[11px] text-[#8F6F73] dark:text-[#BAA0A5] mt-1">Konsistensi harian</span>
        </div>

        <div className="bg-white dark:bg-[#1E1A1C] rounded-2xl p-4 sm:p-5 border border-[#F3E8E8] dark:border-[#382F32] shadow-xs flex flex-col transition-colors">
          <div className="flex items-center gap-2 text-[#B80049] mb-2">
            <Clock className="w-5 h-5" />
            <span className="text-xs font-bold text-[#5B3F43] dark:text-[#D1B8BC]">Total Belajar</span>
          </div>
          <span className="font-serif-display font-bold text-2xl sm:text-3xl text-[#1E1B18] dark:text-white">
            {stats.totalStudyHours} Jam
          </span>
          <span className="text-[11px] text-[#8F6F73] dark:text-[#BAA0A5] mt-1">Akumulasi belajar</span>
        </div>

        <div className="bg-white dark:bg-[#1E1A1C] rounded-2xl p-4 sm:p-5 border border-[#F3E8E8] dark:border-[#382F32] shadow-xs flex flex-col transition-colors">
          <div className="flex items-center gap-2 text-[#456460] dark:text-[#67A39B] mb-2">
            <BookOpen className="w-5 h-5" />
            <span className="text-xs font-bold text-[#5B3F43] dark:text-[#D1B8BC]">Materi Selesai</span>
          </div>
          <span className="font-serif-display font-bold text-2xl sm:text-3xl text-[#1E1B18] dark:text-white">
            {stats.materialsCompleted} <span className="text-sm font-normal text-[#8F6F73]">/ {stats.totalMaterials}</span>
          </span>
          <span className="text-[11px] text-[#8F6F73] dark:text-[#BAA0A5] mt-1">Modul & bab tuntas</span>
        </div>

        <div className="bg-white dark:bg-[#1E1A1C] rounded-2xl p-4 sm:p-5 border border-[#F3E8E8] dark:border-[#382F32] shadow-xs flex flex-col transition-colors">
          <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 mb-2">
            <Award className="w-5 h-5" />
            <span className="text-xs font-bold text-[#5B3F43] dark:text-[#D1B8BC]">Kasus & Kuis</span>
          </div>
          <span className="font-serif-display font-bold text-2xl sm:text-3xl text-[#1E1B18] dark:text-white">
            {stats.casesCompleted + stats.quizzesCompleted}
          </span>
          <span className="text-[11px] text-[#8F6F73] dark:text-[#BAA0A5] mt-1">Evaluasi mandiri</span>
        </div>
      </div>

      {/* ================= 4. ACADEMIC ACHIEVEMENTS & MILESTONES ================= */}
      <div className="bg-white dark:bg-[#1E1A1C] rounded-3xl p-6 sm:p-8 border border-[#F3E8E8] dark:border-[#382F32] shadow-xs flex flex-col gap-5 transition-colors">
        <div className="flex items-center justify-between pb-3 border-b border-[#F3E8E8] dark:border-[#382F32]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#FFF0F5] dark:bg-[#3D1A25] text-[#B80049] flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif-display font-bold text-lg sm:text-xl text-[#1E1B18] dark:text-white">
                Pencapaian Belajar FKH UGM
              </h3>
              <p className="text-xs text-[#5B3F43] dark:text-[#BAA0A5]">
                Lencana keaktifan akademik dan progres kemahiran klinis veteriner.
              </p>
            </div>
          </div>
          <span className="text-xs font-bold text-[#B80049] dark:text-[#FFAEC0] bg-[#FFF0F5] dark:bg-[#3D1A25] px-3 py-1 rounded-full border border-[#FFD9DE] dark:border-[#5C2334]">
            {achievements.filter((a) => a.isUnlocked).length} / {achievements.length} Terbuka
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
          {achievements.map((ach) => (
            <div
              key={ach.id}
              className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                ach.isUnlocked
                  ? 'bg-[#FFF0F5] dark:bg-[#2A1D22] border-[#FFD9DE] dark:border-[#522935] shadow-2xs'
                  : 'bg-[#FAF7F5] dark:bg-[#241E20] border-[#F3E8E8] dark:border-[#382F32] opacity-85'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{ach.icon}</span>
                  {ach.isUnlocked ? (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E8F8F5] text-[#1E7B6C] flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> Terbuka
                    </span>
                  ) : (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/10 text-[#8F6F73] dark:text-[#BAA0A5]">
                      Terkunci
                    </span>
                  )}
                </div>
                <h4 className="font-bold text-sm text-[#1E1B18] dark:text-white mb-1">
                  {ach.title}
                </h4>
                <p className="text-xs text-[#5B3F43] dark:text-[#D1B8BC] leading-relaxed">
                  {ach.description}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-[#F3E8E8] dark:border-[#382F32]">
                <div className="flex items-center justify-between text-[11px] mb-1 text-[#8F6F73] dark:text-[#BAA0A5]">
                  <span>Syarat: {ach.requirementText}</span>
                  <span className="font-bold text-[#B80049] dark:text-[#FFAEC0]">
                    {ach.currentCount}/{ach.targetCount}
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-white dark:bg-[#1E1A1C] overflow-hidden">
                  <div
                    className="h-full bg-[#B80049] rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.min(100, Math.round((ach.currentCount / Math.max(1, ach.targetCount)) * 100))}%`
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

