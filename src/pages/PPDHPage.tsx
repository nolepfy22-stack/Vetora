import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  School,
  Stethoscope,
  Plus,
  Trash2,
  Edit,
  Search,
  CheckCircle,
  Clock,
  FileText,
  Building,
  Award,
  Calendar
} from 'lucide-react';
import { Button, Badge, Modal, ProgressBar } from '../components/common/UI';
import { PPDHRecord } from '../types';

export const PPDHPage: React.FC = () => {
  const { ppdhRecords, addPPDHRecord, updatePPDHRecord, deletePPDHRecord, navigate } = useApp();

  const [selectedRotation, setSelectedRotation] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form states
  const [formRotation, setFormRotation] = useState('Rotasi Ilmu Bedah & Radiologi');
  const [formDate, setFormDate] = useState(new Date().toISOString().split('T')[0]);
  const [formTitle, setFormTitle] = useState('');
  const [formPatientName, setFormPatientName] = useState('');
  const [formSpecies, setFormSpecies] = useState('Canine (Anjing)');
  const [formDiagnosis, setFormDiagnosis] = useState('');
  const [formProcedure, setFormProcedure] = useState('');
  const [formSupervisor, setFormSupervisor] = useState('drh. Dosen Pembimbing, M.Sc.');
  const [formNotes, setFormNotes] = useState('');

  const rotations = [
    'Rotasi Ilmu Bedah & Radiologi',
    'Rotasi Penyakit Dalam Hewan Kecil',
    'Rotasi Reproduksi & Kebidanan',
    'Rotasi Kesmavet & RPH Giwangan',
    'Rotasi Patologi & Nekropsi Diagnostik'
  ];

  const handleCreateRecord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formPatientName.trim() || !formDiagnosis.trim()) return;

    addPPDHRecord({
      date: formDate,
      rotation: formRotation,
      title: formTitle.trim(),
      patientName: formPatientName.trim(),
      species: formSpecies,
      diagnosis: formDiagnosis.trim(),
      procedure: formProcedure.trim() || 'Pemeriksaan Fisik & Penanganan Terapi',
      supervisor: formSupervisor.trim(),
      status: 'approved',
      notes: formNotes.trim()
    });

    setShowAddModal(false);
    setFormTitle('');
    setFormPatientName('');
    setFormDiagnosis('');
    setFormProcedure('');
    setFormNotes('');
  };

  const filteredRecords = ppdhRecords.filter((rec) => {
    if (selectedRotation !== 'all' && rec.rotation !== selectedRotation) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = rec.title.toLowerCase().includes(q);
      const matchPatient = rec.patientName.toLowerCase().includes(q);
      const matchDiag = rec.diagnosis.toLowerCase().includes(q);
      if (!matchTitle && !matchPatient && !matchDiag) return false;
    }
    return true;
  });

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#F3E8E8]">
        <div>
          <div className="flex items-center gap-2 text-[#B80049] mb-1">
            <School className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">
              Pendidikan Profesi Dokter Hewan (PPDH) FKH UGM
            </span>
          </div>
          <h1 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#1E1B18]">
            Logbook Rotasi Klinik & Koasistensi
          </h1>
          <p className="text-sm text-[#5B3F43] mt-0.5">
            Pencatatan kasus klinis, asistensi tindakan bedah, dan supervisi rekam medis di Rumah Sakit Hewan Prof. Soeparwi UGM.
          </p>
        </div>

        <Button
          variant="primary"
          icon={Plus}
          onClick={() => setShowAddModal(true)}
        >
          Catat Kasus PPDH Baru
        </Button>
      </div>

      {/* Rotation Stats Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-[#F3E8E8] shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFF0F5] text-[#B80049] flex items-center justify-center">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-[#8F6F73]">Stase Aktif</span>
              <h4 className="font-serif-display font-bold text-sm text-[#1E1B18]">
                Bedah & Radiologi RSH
              </h4>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#F3E8E8] shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#C5E7E1] text-[#2E4C48] flex items-center justify-center">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-[#8F6F73]">Kasus Terverifikasi</span>
              <h4 className="font-serif-display font-bold text-base text-[#1E1B18]">
                {ppdhRecords.length} Pasien
              </h4>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#F3E8E8] shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFD9DE] text-[#B80049] flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-[#8F6F73]">Minggu Rotasi</span>
              <h4 className="font-serif-display font-bold text-base text-[#1E1B18]">
                Minggu ke-4 dari 8
              </h4>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#F3E8E8] shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-[#8F6F73]">Target Selesai</span>
              <h4 className="font-serif-display font-bold text-base text-[#1E1B18]">
                100% Tercapai
              </h4>
            </div>
          </div>
        </div>
      </div>

      {/* Toolbar filter */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-[#F3E8E8]">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-[#5B3F43]">Rotasi Stase:</span>
          <select
            value={selectedRotation}
            onChange={(e) => setSelectedRotation(e.target.value)}
            className="text-xs bg-[#FAF7F5] border border-[#EEDCDC] rounded-full px-3 py-1.5 focus:outline-none focus:border-[#B80049]"
          >
            <option value="all">Semua Stase Rotasi</option>
            {rotations.map((r, i) => (
              <option key={i} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8F6F73]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari pasien / diagnosa..."
            className="w-full pl-9 pr-3 py-1.5 bg-[#FAF7F5] text-xs rounded-full border border-[#EEDCDC] focus:outline-none focus:bg-white focus:border-[#B80049]"
          />
        </div>
      </div>

      {/* Records Table */}
      <div className="bg-white rounded-2xl border border-[#F3E8E8] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#FAF7F5] border-b border-[#F3E8E8] text-[#5B3F43]">
                <th className="p-3.5 font-bold">Tanggal</th>
                <th className="p-3.5 font-bold">Pasien & Spesies</th>
                <th className="p-3.5 font-bold">Rotasi Klinik</th>
                <th className="p-3.5 font-bold">Diagnosa Klinis</th>
                <th className="p-3.5 font-bold">Tindakan / Prosedur</th>
                <th className="p-3.5 font-bold">Supervisor</th>
                <th className="p-3.5 font-bold">Status</th>
                <th className="p-3.5 font-bold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F3E8E8]">
              {filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-[#8F6F73]">
                    Belum ada rekam medis di stase ini. Klik "Catat Kasus PPDH Baru" untuk menambahkan.
                  </td>
                </tr>
              ) : (
                filteredRecords.map((rec) => (
                  <tr key={rec.id} className="hover:bg-[#FAF7F5]/50 transition-colors">
                    <td className="p-3.5 font-medium text-[#5B3F43] whitespace-nowrap">
                      {rec.date}
                    </td>
                    <td className="p-3.5">
                      <span className="font-bold text-[#1E1B18] block">{rec.patientName}</span>
                      <span className="text-[10px] text-[#8F6F73]">{rec.species}</span>
                    </td>
                    <td className="p-3.5 font-medium text-[#1E1B18]">{rec.rotation}</td>
                    <td className="p-3.5 font-bold text-[#B80049]">{rec.diagnosis}</td>
                    <td className="p-3.5 text-[#5B3F43]">{rec.procedure}</td>
                    <td className="p-3.5 text-[#5B3F43]">{rec.supervisor}</td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                        {rec.status === 'approved' ? 'Terverifikasi ✓' : 'Menunggu Review'}
                      </span>
                    </td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => deletePPDHRecord(rec.id)}
                        className="p-1.5 text-[#8F6F73] hover:text-red-600 rounded-lg transition-colors cursor-pointer"
                        title="Hapus Rekam"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Record Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Catat Rekam Medis Pasien PPDH 🩺"
        maxWidth="lg"
      >
        <form onSubmit={handleCreateRecord} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-[#1E1B18] block mb-1">
                Stase Rotasi Klinik
              </label>
              <select
                value={formRotation}
                onChange={(e) => setFormRotation(e.target.value)}
                className="w-full text-xs p-2 bg-[#FAF7F5] border border-[#EEDCDC] rounded-xl text-[#1E1B18]"
              >
                {rotations.map((r, i) => (
                  <option key={i} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-[#1E1B18] block mb-1">
                Tanggal Penanganan
              </label>
              <input
                type="date"
                required
                value={formDate}
                onChange={(e) => setFormDate(e.target.value)}
                className="w-full text-xs p-2 bg-[#FAF7F5] border border-[#EEDCDC] rounded-xl text-[#1E1B18]"
              >
              </input>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-bold text-[#1E1B18] block mb-1">
                Judul Kasus / Tindakan *
              </label>
              <input
                type="text"
                required
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                placeholder="Contoh: Penanganan Fraktur Femur"
                className="w-full text-xs p-2 bg-[#FAF7F5] border border-[#EEDCDC] rounded-xl text-[#1E1B18]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#1E1B18] block mb-1">
                Nama Pasien *
              </label>
              <input
                type="text"
                required
                value={formPatientName}
                onChange={(e) => setFormPatientName(e.target.value)}
                placeholder="Contoh: Choco"
                className="w-full text-xs p-2 bg-[#FAF7F5] border border-[#EEDCDC] rounded-xl text-[#1E1B18]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#1E1B18] block mb-1">
                Spesies Pasien
              </label>
              <select
                value={formSpecies}
                onChange={(e) => setFormSpecies(e.target.value)}
                className="w-full text-xs p-2 bg-[#FAF7F5] border border-[#EEDCDC] rounded-xl text-[#1E1B18]"
              >
                <option value="Canine (Anjing)">Canine (Anjing)</option>
                <option value="Feline (Kucing)">Feline (Kucing)</option>
                <option value="Bovine (Sapi)">Bovine (Sapi)</option>
                <option value="Equine (Kuda)">Equine (Kuda)</option>
                <option value="Avian (Unggas)">Avian (Unggas)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-[#1E1B18] block mb-1">
                Diagnosa Definitif *
              </label>
              <input
                type="text"
                required
                value={formDiagnosis}
                onChange={(e) => setFormDiagnosis(e.target.value)}
                placeholder="Contoh: Fraktur Oblique Os Femur Sinistra"
                className="w-full text-xs p-2 bg-[#FAF7F5] border border-[#EEDCDC] rounded-xl text-[#1E1B18]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#1E1B18] block mb-1">
                Tindakan Medis / Bedah
              </label>
              <input
                type="text"
                value={formProcedure}
                onChange={(e) => setFormProcedure(e.target.value)}
                placeholder="Contoh: Osteosintesis Plate and Screw"
                className="w-full text-xs p-2 bg-[#FAF7F5] border border-[#EEDCDC] rounded-xl text-[#1E1B18]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-[#1E1B18] block mb-1">
              Dokter Hewan Supervisor / Pembimbing
            </label>
            <input
              type="text"
              value={formSupervisor}
              onChange={(e) => setFormSupervisor(e.target.value)}
              className="w-full text-xs p-2 bg-[#FAF7F5] border border-[#EEDCDC] rounded-xl text-[#1E1B18]"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-[#1E1B18] block mb-1">
              Catatan Klinis & Evaluasi Pasca Operasi
            </label>
            <textarea
              rows={3}
              value={formNotes}
              onChange={(e) => setFormNotes(e.target.value)}
              placeholder="Kondisi pemulihan pasca sedasi, pemberian analgesik, dan rawat inap..."
              className="w-full text-xs p-2 bg-[#FAF7F5] border border-[#EEDCDC] rounded-xl text-[#1E1B18]"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-[#F3E8E8]">
            <Button variant="ghost" onClick={() => setShowAddModal(false)}>
              Batal
            </Button>
            <Button type="submit" variant="primary">
              Simpan Rekam Medis
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
