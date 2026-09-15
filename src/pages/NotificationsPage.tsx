import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Bell,
  CheckCircle,
  Clock,
  Trash2,
  BookOpen,
  HelpCircle,
  Stethoscope,
  Info,
  Check
} from 'lucide-react';
import { Button, Badge } from '../components/common/UI';

export const NotificationsPage: React.FC = () => {
  const {
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    deleteNotification,
    navigate
  } = useApp();

  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const filtered = notifications.filter((n) => {
    if (filter === 'unread') return !n.isRead;
    return true;
  });

  const getIcon = (type: string) => {
    switch (type) {
      case 'quiz':
        return <HelpCircle className="w-4 h-4 text-purple-600" />;
      case 'case':
        return <Stethoscope className="w-4 h-4 text-[#B80049]" />;
      case 'material':
        return <BookOpen className="w-4 h-4 text-[#456460]" />;
      default:
        return <Bell className="w-4 h-4 text-[#B80049]" />;
    }
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#F3E8E8]">
        <div>
          <div className="flex items-center gap-2 text-[#B80049] mb-1">
            <Bell className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">
              Pusat Notifikasi & Pengingat
            </span>
          </div>
          <h1 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#1E1B18]">
            Notifikasi
          </h1>
          <p className="text-sm text-[#5B3F43] mt-0.5">
            Pengingat jadwal belajar harian, rilis kasus klinis baru, dan evaluasi hasil kuis.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            icon={Check}
            onClick={markAllNotificationsAsRead}
          >
            Tandai Semua Dibaca
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
            filter === 'all'
              ? 'bg-[#B80049] text-white'
              : 'bg-white border border-[#EEDCDC] text-[#5B3F43]'
          }`}
        >
          Semua ({notifications.length})
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
            filter === 'unread'
              ? 'bg-[#B80049] text-white'
              : 'bg-white border border-[#EEDCDC] text-[#5B3F43]'
          }`}
        >
          Belum Dibaca ({notifications.filter((n) => !n.isRead).length})
        </button>
      </div>

      {/* Notifications List */}
      <div className="flex flex-col gap-3">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-[#EEDCDC]">
            <Bell className="w-10 h-10 text-[#8F6F73] mx-auto mb-2 opacity-50" />
            <h3 className="font-serif-display font-bold text-lg text-[#1E1B18]">
              Tidak Ada Notifikasi
            </h3>
            <p className="text-xs text-[#5B3F43] mt-1">
              Semua pemberitahuan akademik Anda sudah diperiksa.
            </p>
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                markNotificationAsRead(item.id);
                if (item.link) navigate(item.link);
              }}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-4 ${
                item.isRead
                  ? 'bg-white border-[#F3E8E8]'
                  : 'bg-[#FFF0F5]/70 border-[#FFD9DE] shadow-xs'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-white border border-[#EEDCDC] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-xs">
                  {getIcon(item.type)}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-serif-display font-bold text-sm text-[#1E1B18]">
                      {item.title}
                    </h4>
                    {!item.isRead && (
                      <span className="w-2 h-2 rounded-full bg-[#B80049]" />
                    )}
                  </div>

                  <p className="text-xs text-[#5B3F43] mt-1 leading-relaxed">
                    {item.message}
                  </p>

                  <span className="text-[10px] text-[#8F6F73] mt-2 block">
                    {item.date}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteNotification(item.id);
                  }}
                  className="p-1.5 text-[#8F6F73] hover:text-red-600 rounded-lg transition-colors cursor-pointer"
                  title="Hapus Notifikasi"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
