import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Stethoscope,
  Search,
  Filter,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Clock,
  Heart
} from 'lucide-react';
import { Badge, Button } from '../components/common/UI';

export const ClinicalCasesPage: React.FC = () => {
  const { clinicalCases, navigate } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecies, setSelectedSpecies] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredCases = clinicalCases.filter((c) => {
    if (selectedSpecies !== 'all' && c.patientSpecies !== selectedSpecies) return false;
    if (selectedDifficulty !== 'all' && c.difficulty !== selectedDifficulty) return false;
    if (selectedStatus !== 'all' && c.status !== selectedStatus) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = c.title.toLowerCase().includes(q);
      const matchComplaint = c.chiefComplaint.toLowerCase().includes(q);
      const matchPatient = c.patientName.toLowerCase().includes(q);
      if (!matchTitle && !matchComplaint && !matchPatient) return false;
    }

    return true;
  });

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#F3E8E8]">
        <div>
          <div className="flex items-center gap-2 text-[#B80049] mb-1">
            <Stethoscope className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">
              Simulasi Pasien & Penalaran Diagnostik
            </span>
          </div>
          <h1 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#1E1B18]">
            Kasus Klinis & Rekam Medis
          </h1>
          <p className="text-sm text-[#5B3F43] mt-0.5">
            Analisis anamnesa, hasil laboratorium CBC/kimia darah, radiografi, dan tegakkan diagnosa definitif pasien.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8F6F73]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari pasien, gejala, atau keluhan..."
            className="w-full pl-10 pr-4 py-2 bg-white text-sm rounded-full border border-[#EEDCDC] focus:outline-none focus:border-[#B80049] text-[#1E1B18]"
          />
        </div>
      </div>

      {/* Filter toolbar */}
      <div className="flex flex-wrap items-center gap-3 bg-white p-4 rounded-2xl border border-[#F3E8E8]">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-[#5B3F43]">Spesies:</span>
          <select
            value={selectedSpecies}
            onChange={(e) => setSelectedSpecies(e.target.value)}
            className="text-xs bg-[#FAF7F5] border border-[#EEDCDC] rounded-full px-3 py-1.5 focus:outline-none focus:border-[#B80049]"
          >
            <option value="all">Semua Spesies</option>
            <option value="Canine (Anjing)">Anjing (Canine)</option>
            <option value="Feline (Kucing)">Kucing (Feline)</option>
            <option value="Bovine (Sapi)">Sapi (Bovine)</option>
            <option value="Equine (Kuda)">Kuda (Equine)</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-[#5B3F43]">Tingkat Kasus:</span>
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="text-xs bg-[#FAF7F5] border border-[#EEDCDC] rounded-full px-3 py-1.5 focus:outline-none focus:border-[#B80049]"
          >
            <option value="all">Semua Tingkat</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-[#5B3F43]">Status:</span>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="text-xs bg-[#FAF7F5] border border-[#EEDCDC] rounded-full px-3 py-1.5 focus:outline-none focus:border-[#B80049]"
          >
            <option value="all">Semua Status</option>
            <option value="completed">Selesai Dibahas</option>
            <option value="in_progress">Menunggu Diagnosa</option>
          </select>
        </div>
      </div>

      {/* Cases Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCases.map((c) => (
          <div
            key={c.id}
            className="bg-white rounded-2xl p-5 border border-[#F3E8E8] shadow-[0_2px_12px_-1px_rgba(45,41,38,0.03)] hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <Badge
                  variant={
                    c.status === 'completed'
                      ? 'success'
                      : c.difficulty === 'advanced'
                      ? 'warning'
                      : 'primary'
                  }
                >
                  {c.status === 'completed' ? 'Selesai ✓' : c.difficulty.toUpperCase()}
                </Badge>

                <span className="text-xs text-[#8F6F73] font-semibold">
                  {c.patientSpecies}
                </span>
              </div>

              <h3
                onClick={() => navigate(`/cases/${c.id}`)}
                className="font-serif-display font-bold text-lg text-[#1E1B18] mt-3 hover:text-[#B80049] transition-colors cursor-pointer"
              >
                {c.title}
              </h3>

              <div className="mt-2 p-3 bg-[#FAF7F5] rounded-xl border border-[#F3E8E8] text-xs">
                <div className="flex items-center justify-between text-[#1E1B18] font-bold">
                  <span>Pasien: {c.patientName}</span>
                  <span className="text-[#8F6F73] font-normal">{c.patientAge} · {c.patientSex}</span>
                </div>
                <p className="text-[#5B3F43] mt-1 line-clamp-2 italic">
                  "{c.chiefComplaint}"
                </p>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-[#FAF7F5] flex items-center justify-between">
              <span className="text-xs text-[#8F6F73]">
                {c.patientBreed} ({c.patientWeight})
              </span>

              <Button
                size="sm"
                variant="primary"
                icon={ArrowRight}
                iconPosition="right"
                onClick={() => navigate(`/cases/${c.id}`)}
              >
                Buka Kasus
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
