import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ArrowLeft,
  Stethoscope,
  Activity,
  FileSpreadsheet,
  Image as ImageIcon,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Heart,
  Thermometer,
  Pill,
  BookOpen
} from 'lucide-react';
import { Button, Badge, Breadcrumb } from '../components/common/UI';

export const ClinicalCaseDetailPage: React.FC<{ caseId: string }> = ({ caseId }) => {
  const { clinicalCases, submitCaseDiagnosis, navigate } = useApp();

  const clinicalCase = clinicalCases.find((c) => c.id === caseId) || clinicalCases[0];

  const [selectedOption, setSelectedOption] = useState<number | null>(
    clinicalCase.userSelectedOption ?? null
  );
  const [isSubmitted, setIsSubmitted] = useState<boolean>(clinicalCase.status === 'completed');

  const handleConfirmDiagnosis = () => {
    if (selectedOption === null) return;
    submitCaseDiagnosis(clinicalCase.id, selectedOption);
    setIsSubmitted(true);
  };

  const isUserCorrect = selectedOption === clinicalCase.correctOptionIndex;

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'Home', onClick: () => navigate('/') },
          { label: 'Clinical Cases', onClick: () => navigate('/cases') },
          { label: clinicalCase.title }
        ]}
      />

      {/* Case Header & Demographics */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#F3E8E8] shadow-sm flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#F3E8E8]">
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <Badge variant={clinicalCase.status === 'completed' ? 'success' : 'primary'}>
                {clinicalCase.status === 'completed' ? 'Kasus Selesai Ditangani' : 'Kasus Pasien Baru'}
              </Badge>
              <Badge variant="neutral">{clinicalCase.difficulty.toUpperCase()}</Badge>
              <span className="text-xs font-semibold text-[#8F6F73]">
                ID: {clinicalCase.id}
              </span>
            </div>
            <h1 className="font-serif-display font-bold text-2xl sm:text-3xl text-[#1E1B18]">
              {clinicalCase.title}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              icon={ArrowLeft}
              onClick={() => navigate('/cases')}
            >
              Daftar Kasus
            </Button>
          </div>
        </div>

        {/* Signalment & Patient Details */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 bg-[#FAF7F5] p-4 rounded-2xl border border-[#F3E8E8]">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold text-[#8F6F73]">Nama Pasien</span>
            <span className="text-sm font-bold text-[#1E1B18]">{clinicalCase.patientName}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold text-[#8F6F73]">Spesies / Ras</span>
            <span className="text-sm font-bold text-[#1E1B18]">{clinicalCase.patientBreed}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold text-[#8F6F73]">Umur</span>
            <span className="text-sm font-bold text-[#1E1B18]">{clinicalCase.patientAge}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold text-[#8F6F73]">Jenis Kelamin</span>
            <span className="text-sm font-bold text-[#1E1B18]">{clinicalCase.patientSex}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold text-[#8F6F73]">Berat Badan</span>
            <span className="text-sm font-bold text-[#1E1B18]">{clinicalCase.patientWeight}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold text-[#8F6F73]">Status Pasien</span>
            <span className="text-sm font-bold text-[#B80049]">{clinicalCase.patientSpecies}</span>
          </div>
        </div>

        {/* Anamnesis / Chief Complaint */}
        <div className="flex flex-col gap-2">
          <h3 className="font-serif-display font-bold text-lg text-[#1E1B18] flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#B80049]" /> Keluhan Utama & Anamnesis
          </h3>
          <div className="p-4 rounded-2xl bg-[#FFF0F5] border border-[#FFD9DE] text-sm text-[#1E1B18] leading-relaxed">
            <p className="font-medium text-[#B80049] mb-1">
              Keluhan: "{clinicalCase.chiefComplaint}"
            </p>
            <p className="text-xs sm:text-sm text-[#5B3F43] mt-2">
              {clinicalCase.history}
            </p>
          </div>
        </div>

        {/* Physical Exam Findings */}
        <div className="flex flex-col gap-2">
          <h3 className="font-serif-display font-bold text-lg text-[#1E1B18] flex items-center gap-2">
            <Stethoscope className="w-5 h-5 text-[#B80049]" /> Temuan Pemeriksaan Fisik
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-3 bg-[#FAF7F5] rounded-xl border border-[#F3E8E8]">
              <span className="text-[10px] font-bold text-[#8F6F73] uppercase">Suhu Tubuh (T)</span>
              <span className="text-base font-bold text-[#1E1B18] block mt-0.5">
                {clinicalCase.physicalExam.temperature}
              </span>
            </div>
            <div className="p-3 bg-[#FAF7F5] rounded-xl border border-[#F3E8E8]">
              <span className="text-[10px] font-bold text-[#8F6F73] uppercase">Detak Jantung (HR)</span>
              <span className="text-base font-bold text-[#1E1B18] block mt-0.5">
                {clinicalCase.physicalExam.heartRate}
              </span>
            </div>
            <div className="p-3 bg-[#FAF7F5] rounded-xl border border-[#F3E8E8]">
              <span className="text-[10px] font-bold text-[#8F6F73] uppercase">Respirasi (RR)</span>
              <span className="text-base font-bold text-[#1E1B18] block mt-0.5">
                {clinicalCase.physicalExam.respiratoryRate}
              </span>
            </div>
            <div className="p-3 bg-[#FAF7F5] rounded-xl border border-[#F3E8E8]">
              <span className="text-[10px] font-bold text-[#8F6F73] uppercase">CRT & Mukosa</span>
              <span className="text-sm font-bold text-[#1E1B18] block mt-0.5">
                {clinicalCase.physicalExam.crt} · {clinicalCase.physicalExam.mucousMembranes}
              </span>
            </div>
          </div>

          <div className="p-4 bg-[#FAF7F5] rounded-2xl border border-[#F3E8E8] text-xs sm:text-sm text-[#5B3F43] mt-2 leading-relaxed">
            <strong className="text-[#1E1B18] block mb-1">Catatan Auskultasi & Palpasi:</strong>
            {clinicalCase.physicalExam.findings}
          </div>
        </div>

        {/* Lab Results Table */}
        {clinicalCase.labResults && clinicalCase.labResults.length > 0 && (
          <div className="flex flex-col gap-2">
            <h3 className="font-serif-display font-bold text-lg text-[#1E1B18] flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5 text-[#B80049]" /> Hasil Laboratorium (CBC & Serum Kimia)
            </h3>
            <div className="overflow-x-auto rounded-2xl border border-[#F3E8E8]">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#FAF7F5] border-b border-[#F3E8E8] text-[#5B3F43]">
                    <th className="p-3 font-bold">Parameter Uji</th>
                    <th className="p-3 font-bold">Hasil Pasien</th>
                    <th className="p-3 font-bold">Rentang Rujukan Normal</th>
                    <th className="p-3 font-bold">Status Interpretasi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F3E8E8]">
                  {clinicalCase.labResults.map((lab, i) => (
                    <tr key={i} className="hover:bg-[#FAF7F5]/50">
                      <td className="p-3 font-semibold text-[#1E1B18]">{lab.parameter}</td>
                      <td className="p-3 font-bold text-[#1E1B18]">
                        {lab.value} {lab.unit}
                      </td>
                      <td className="p-3 text-[#5B3F43]">{lab.referenceRange}</td>
                      <td className="p-3">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            lab.status === 'high'
                              ? 'bg-red-100 text-red-700'
                              : lab.status === 'low'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-emerald-100 text-emerald-700'
                          }`}
                        >
                          {lab.status === 'high' ? 'Tinggi (Abnormal)' : lab.status === 'low' ? 'Rendah (Abnormal)' : 'Normal'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Imaging Plates */}
        {clinicalCase.imagingUrl && (
          <div className="flex flex-col gap-2">
            <h3 className="font-serif-display font-bold text-lg text-[#1E1B18] flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-[#B80049]" /> Radiografi & Pencitraan Diagnostik
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#FAF7F5] p-4 rounded-2xl border border-[#F3E8E8]">
              <div className="rounded-xl overflow-hidden border border-[#EEDCDC] bg-black max-h-64 flex items-center justify-center">
                <img
                  src={clinicalCase.imagingUrl}
                  alt="Radiograph plate"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col justify-center text-xs sm:text-sm text-[#5B3F43] leading-relaxed">
                <span className="text-xs font-bold text-[#1E1B18] uppercase tracking-wider block mb-1">
                  Ekspertise Radiolog FKH UGM:
                </span>
                <p>{clinicalCase.imagingFindings || 'Kardiomegali pada atrium kiri dengan VHS > 10.5 vertebralis.'}</p>
              </div>
            </div>
          </div>
        )}

        {/* INTERACTIVE DIAGNOSTIC CHALLENGE */}
        <div className="mt-4 pt-6 border-t border-[#F3E8E8] flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif-display font-bold text-xl text-[#1E1B18]">
              Tantangan Klinis: Tentukan Diagnosa Definitif
            </h3>
            {isSubmitted && (
              <Badge variant={isUserCorrect ? 'success' : 'warning'}>
                {isUserCorrect ? 'Diagnosa Tepat!' : 'Perlu Evaluasi Ulang'}
              </Badge>
            )}
          </div>

          <p className="text-xs sm:text-sm text-[#5B3F43]">
            Berdasarkan anamnesa, hasil fisik auskultasi murmur, rontgen thoraks, dan profil laboratorium, diagnosa apa yang paling tepat untuk pasien ini?
          </p>

          <div className="flex flex-col gap-3 mt-2">
            {clinicalCase.differentialDiagnoses.map((diff, optIdx) => {
              const isSelected = selectedOption === optIdx;
              const isCorrect = optIdx === clinicalCase.correctOptionIndex;

              let cardStyle = 'bg-[#FAF7F5] border-[#EEDCDC] text-[#1E1B18] hover:border-[#B80049]';
              if (isSubmitted) {
                if (isCorrect) {
                  cardStyle = 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold';
                } else if (isSelected && !isCorrect) {
                  cardStyle = 'bg-red-50 border-red-300 text-red-900 line-through';
                }
              } else if (isSelected) {
                cardStyle = 'bg-[#FFF0F5] border-[#B80049] text-[#B80049] shadow-xs';
              }

              return (
                <div
                  key={optIdx}
                  onClick={() => !isSubmitted && setSelectedOption(optIdx)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${cardStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                        isSelected
                          ? 'bg-[#B80049] text-white'
                          : 'bg-white text-[#5B3F43] border border-[#EEDCDC]'
                      }`}
                    >
                      {String.fromCharCode(65 + optIdx)}
                    </div>
                    <span className="text-sm">{diff}</span>
                  </div>

                  {isSubmitted && isCorrect && (
                    <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Diagnosa Benar
                    </span>
                  )}
                  {isSubmitted && isSelected && !isCorrect && (
                    <span className="text-xs font-bold text-red-600 flex items-center gap-1">
                      <XCircle className="w-4 h-4" /> Diagnosa Kurang Tepat
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {!isSubmitted ? (
            <div className="flex justify-end mt-4">
              <Button
                variant="primary"
                size="lg"
                disabled={selectedOption === null}
                onClick={handleConfirmDiagnosis}
              >
                Kirim Diagnosa Definitif
              </Button>
            </div>
          ) : (
            /* Detailed Clinical Case Discussion */
            <div className="mt-6 p-6 rounded-2xl bg-[#FFF0F5] border border-[#FFD9DE] flex flex-col gap-4">
              <div className="flex items-center gap-2 text-[#B80049]">
                <Pill className="w-5 h-5" />
                <h4 className="font-serif-display font-bold text-lg">
                  Rencana Penanganan & Terapi Standar Emas
                </h4>
              </div>

              <div className="text-xs sm:text-sm text-[#1E1B18] space-y-2 leading-relaxed">
                <p>
                  <strong>Patofisiologi:</strong> {clinicalCase.explanation}
                </p>
                <p>
                  <strong>Protokol Terapi:</strong> {clinicalCase.treatmentPlan}
                </p>
                <p>
                  <strong>Prognosis:</strong> {clinicalCase.prognosis}
                </p>
              </div>

              <div className="pt-3 border-t border-[#FFD9DE] flex justify-end">
                <Button variant="primary" onClick={() => navigate('/cases')}>
                  Selesai & Lanjut Kasus Lainnya
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
