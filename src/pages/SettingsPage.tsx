import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Settings,
  Bell,
  Volume2,
  Moon,
  Download,
  Trash2,
  RotateCcw,
  CheckCircle,
  HelpCircle,
  ShieldCheck
} from 'lucide-react';
import { Button, ConfirmDialog } from '../components/common/UI';

export const SettingsPage: React.FC = () => {
  const { user, exportDataJson, resetProgress, clearAllData } = useApp();

  const [soundEnabled, setSoundEnabled] = useState(true);
  const [studyReminder, setStudyReminder] = useState(true);
  const [fontSize, setFontSize] = useState<'normal' | 'large'>('normal');
  const [showResetProgressConfirm, setShowResetProgressConfirm] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleExportData = () => {
    if (exportDataJson) {
      exportDataJson();
      showNotice('Data kemajuan belajar berhasil diekspor ke file JSON!');
    } else {
      const data = {
        profile: user,
        exportDate: new Date().toISOString(),
        platform: 'VETORA — Veterinary Learning FKH UGM',
        signature: 'Made with love by Raffy for Bulan 🐾'
      };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `vetora-veterinary-backup-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
      showNotice('Data kemajuan belajar berhasil diekspor ke file JSON!');
    }
  };

  const showNotice = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(null), 4000);
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Header */}
      <div className="pb-4 border-b border-[#F3E8E8]">
        <div className="flex items-center gap-2 text-[#B80049] mb-1">
          <Settings className="w-5 h-5" />
          <span className="text-xs font-bold uppercase tracking-wider">
            Pengaturan Aplikasi
          </span>
        </div>
        <h1 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#1E1B18]">
          Pengaturan & Preferensi Belajar
        </h1>
        <p className="text-sm text-[#5B3F43] mt-0.5">
          Atur kenyamanan membaca materi, notifikasi jadwal belajar, dan backup data lokal.
        </p>
      </div>

      {successMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs font-semibold text-emerald-800 flex items-center gap-2 animate-fade-in">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Learning Preferences */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#F3E8E8] shadow-xs flex flex-col gap-6">
        <h3 className="font-serif-display font-bold text-lg text-[#1E1B18]">
          Preferensi Belajar & Tampilan
        </h3>

        <div className="flex items-center justify-between py-2 border-b border-[#FAF7F5]">
          <div>
            <span className="text-sm font-bold text-[#1E1B18] block">
              Efek Suara Interaktif
            </span>
            <span className="text-xs text-[#8F6F73]">
              Suara lembut saat membalik kartu flashcard dan kuis berhasil
            </span>
          </div>
          <button
            onClick={() => {
              setSoundEnabled(!soundEnabled);
              showNotice(`Efek suara ${!soundEnabled ? 'diaktifkan' : 'dinonaktifkan'}`);
            }}
            className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
              soundEnabled ? 'bg-[#B80049]' : 'bg-[#EEDCDC]'
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                soundEnabled ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between py-2 border-b border-[#FAF7F5]">
          <div>
            <span className="text-sm font-bold text-[#1E1B18] block">
              Pengingat Target Belajar Harian
            </span>
            <span className="text-xs text-[#8F6F73]">
              Tampilkan notifikasi harian untuk menjaga streak belajar tetap aktif
            </span>
          </div>
          <button
            onClick={() => {
              setStudyReminder(!studyReminder);
              showNotice(`Pengingat harian ${!studyReminder ? 'diaktifkan' : 'dinonaktifkan'}`);
            }}
            className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
              studyReminder ? 'bg-[#B80049]' : 'bg-[#EEDCDC]'
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                studyReminder ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between py-2">
          <div>
            <span className="text-sm font-bold text-[#1E1B18] block">
              Ukuran Huruf Pembaca Materi
            </span>
            <span className="text-xs text-[#8F6F73]">
              Ukuran teks paragraf untuk mode membaca buku kuliah
            </span>
          </div>
          <div className="flex items-center gap-1.5 bg-[#FAF7F5] p-1 rounded-full border border-[#EEDCDC]">
            <button
              onClick={() => setFontSize('normal')}
              className={`px-3 py-1 rounded-full text-xs font-semibold cursor-pointer ${
                fontSize === 'normal' ? 'bg-[#B80049] text-white' : 'text-[#5B3F43]'
              }`}
            >
              Standar
            </button>
            <button
              onClick={() => setFontSize('large')}
              className={`px-3 py-1 rounded-full text-xs font-semibold cursor-pointer ${
                fontSize === 'large' ? 'bg-[#B80049] text-white' : 'text-[#5B3F43]'
              }`}
            >
              Besar
            </button>
          </div>
        </div>
      </div>

      {/* Data Management */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#F3E8E8] shadow-xs flex flex-col gap-6">
        <h3 className="font-serif-display font-bold text-lg text-[#1E1B18]">
          Penyimpanan & Manajemen Data Lokal
        </h3>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#FAF7F5] border border-[#F3E8E8]">
          <div>
            <span className="text-sm font-bold text-[#1E1B18] block">
              Ekspor Data Kemajuan (JSON)
            </span>
            <span className="text-xs text-[#8F6F73]">
              Unduh salinan riwayat belajar, catatan materi, dan logbook PPDH Anda.
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            icon={Download}
            onClick={handleExportData}
          >
            Ekspor Data
          </Button>
        </div>

        {/* Reset Progress Only (Retaining Profile & Settings) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-amber-50/70 border border-amber-200">
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-bold text-amber-950 block">
              Reset Semua Statistik & Progress
            </span>
            <span className="text-xs text-amber-850 leading-relaxed">
              Mereset seluruh progres kurikulum, materi tuntas (0%), flashcard, nilai kuis, kasus klinis, streak (0 hari), dan jam belajar menjadi 0. <strong>Profil Bulan, catatan pribadi, bookmark materi, dan agenda jadwal Anda tetap aman.</strong>
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            icon={RotateCcw}
            className="border-amber-300 text-amber-900 hover:bg-amber-100 flex-shrink-0"
            onClick={() => setShowResetProgressConfirm(true)}
          >
            Reset Statistik & Progress
          </Button>
        </div>

        {/* Clear All Data (Full Factory Reset) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-red-50/60 border border-red-200">
          <div>
            <span className="text-sm font-bold text-red-900 block">
              Reset Total Aplikasi (Hapus Semua Data)
            </span>
            <span className="text-xs text-red-700">
              Menghapus seluruh data lokal termasuk preferensi dan mengembalikan aplikasi ke kondisi instalasi awal.
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            icon={RotateCcw}
            className="text-red-700 hover:bg-red-100 flex-shrink-0"
            onClick={() => setShowResetConfirm(true)}
          >
            Reset Total
          </Button>
        </div>
      </div>

      {/* Reset Statistics & Progress Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showResetProgressConfirm}
        onClose={() => setShowResetProgressConfirm(false)}
        onConfirm={() => {
          resetProgress();
          setShowResetProgressConfirm(false);
          showNotice('Semua statistik dan progres pembelajaran berhasil direset ke 0%. Profil dan catatan Anda tetap aman tersimpan.');
        }}
        title="Reset Semua Statistik & Progress Belajar?"
        message="Tindakan ini akan mengembalikan seluruh progres kurikulum ke 0%, menghapus riwayat kuis, mereset hafalan flashcard, kasus klinis, streak belajar (0 hari), dan total jam belajar ke 0. Profil pengguna Bulan, catatan pribadi, bookmark, dan agenda jadwal Anda TETAP AMAN tersimpan. Apakah Anda yakin ingin mereset progress?"
        confirmText="Ya, Reset Statistik & Progress ke 0%"
        cancelText="Batal"
      />

      {/* Full Factory Reset Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showResetConfirm}
        onClose={() => setShowResetConfirm(false)}
        onConfirm={() => {
          clearAllData();
          setShowResetConfirm(false);
          showNotice('Seluruh data aplikasi berhasil dibersihkan dan direset.');
        }}
        title="Reset Total Seluruh Data Aplikasi?"
        message="Tindakan ini akan menghapus seluruh data termasuk profil, pengaturan, catatan, jadwal, dan progres belajar di peramban ini. Apakah Anda yakin?"
        confirmText="Ya, Reset Total Semua Data"
        cancelText="Batal"
        danger
      />
    </div>
  );
};
