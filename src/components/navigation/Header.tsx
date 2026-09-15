import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  Bell,
  CheckCheck,
  Flame,
  Menu,
  X,
  Sun,
  Moon
} from 'lucide-react';

export const Header: React.FC<{ onOpenMobileMenu?: () => void }> = ({ onOpenMobileMenu }) => {
  const {
    user,
    settings,
    updateSettings,
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    navigate
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const isDarkMode = settings.theme === 'dark' || (settings.theme === 'system' && typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  const toggleTheme = () => {
    const nextTheme = isDarkMode ? 'light' : 'dark';
    updateSettings({ theme: nextTheme });
  };

  // Close notifications dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/search');
    }
  };

  return (
    <header className="w-full h-16 flex-shrink-0 bg-[#FAF7F5]/95 dark:bg-[#1C1819]/95 backdrop-blur-md border-b border-[#F3E8E8] dark:border-[#2D2427] px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 z-20 select-none">
      {/* Left Area: Mobile Menu Trigger + Search Bar */}
      <div className="flex items-center gap-3 flex-1 min-w-0 max-w-xl">
        {/* Mobile menu button (hidden on desktop lg) */}
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden w-9 h-9 rounded-xl bg-white dark:bg-[#252022] border border-[#EEDCDC] dark:border-[#3D3236] flex items-center justify-center text-[#5B3F43] dark:text-[#D4BCC0] hover:text-[#1E1B18] dark:hover:text-[#F4ECEE] hover:bg-[#FAF7F5] dark:hover:bg-[#2F292B] flex-shrink-0 cursor-pointer"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Search Bar (Responsive min-w-0) */}
        <form
          onSubmit={handleSearchSubmit}
          className="flex-1 min-w-0 relative"
        >
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8F6F73] dark:text-[#A89094] pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari materi, topik anatomi, kasus klinis..."
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-[#252022] text-xs sm:text-sm text-[#1E1B18] dark:text-[#F4ECEE] placeholder:text-[#8F6F73] dark:placeholder:text-[#A89094] rounded-full border border-[#EEDCDC] dark:border-[#3D3236] focus:outline-none focus:border-[#B80049] dark:focus:border-[#FF7FA3] transition-all shadow-2xs"
          />
        </form>
      </div>

      {/* Right Area: Theme Toggle, Streak, Notifications, Profile */}
      <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="w-9 h-9 rounded-full bg-white dark:bg-[#252022] border border-[#EEDCDC] dark:border-[#3D3236] flex items-center justify-center text-[#5B3F43] dark:text-[#D4BCC0] hover:text-[#B80049] dark:hover:text-[#FF7FA3] hover:bg-[#FFF0F5] dark:hover:bg-[#3D1A26] transition-colors shadow-2xs cursor-pointer"
          title={isDarkMode ? 'Ganti ke Mode Terang' : 'Ganti ke Mode Gelap'}
          aria-label="Toggle theme"
        >
          {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-[#5B3F43]" />}
        </button>

        {/* Streak Pill */}
        <button
          onClick={() => navigate('/progress')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFF0F5] dark:bg-[#3D1A26] border border-[#FFD9DE] dark:border-[#522938] text-xs font-semibold text-[#B80049] dark:text-[#FF7FA3] hover:bg-[#FFD9DE] dark:hover:bg-[#4E2130] transition-colors cursor-pointer"
          title={`Streak belajar: ${user?.studyStreakDays || 0} hari berturut-turut`}
        >
          <Flame className="w-3.5 h-3.5 fill-[#B80049] dark:fill-[#FF7FA3] text-[#B80049] dark:text-[#FF7FA3]" />
          <span className="whitespace-nowrap">{user?.studyStreakDays || 0}d streak</span>
        </button>

        {/* Notifications Dropdown */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative w-9 h-9 rounded-full bg-white dark:bg-[#252022] border border-[#EEDCDC] dark:border-[#3D3236] flex items-center justify-center text-[#5B3F43] dark:text-[#D4BCC0] hover:text-[#B80049] dark:hover:text-[#FF7FA3] hover:bg-[#FFF0F5] dark:hover:bg-[#3D1A26] transition-colors shadow-2xs cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#B80049] text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-[#FAF7F5] dark:ring-[#1C1819]">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-[#1E1A1C] text-[#1E1B18] dark:text-[#F4ECEE] rounded-2xl border border-[#F3E8E8] dark:border-[#2D2427] shadow-xl z-50 p-4 animate-in fade-in duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-[#F3E8E8] dark:border-[#2D2427]">
                <div className="flex items-center gap-1.5">
                  <span className="font-serif-display font-bold text-base text-[#1E1B18] dark:text-[#F4ECEE]">
                    Notifikasi
                  </span>
                  {unreadCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-[#FFD9DE] dark:bg-[#4E2130] text-[#B80049] dark:text-[#FF7FA3] text-[10px] font-bold">
                      {unreadCount} baru
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllNotificationsAsRead}
                    className="text-xs text-[#B80049] dark:text-[#FF7FA3] hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                  >
                    <CheckCheck className="w-3.5 h-3.5" />
                    Tandai dibaca
                  </button>
                )}
              </div>

              <div className="flex flex-col gap-2 mt-3 max-h-72 overflow-y-auto pr-1">
                {notifications.length === 0 ? (
                  <p className="text-center py-6 text-xs text-[#8F6F73] dark:text-[#A89094]">
                    Tidak ada notifikasi baru saat ini.
                  </p>
                ) : (
                  notifications.map((notif) => (
                    <div
                      key={notif.id}
                      onClick={() => {
                        markNotificationAsRead(notif.id);
                        setShowNotifications(false);
                        navigate(notif.link);
                      }}
                      className={`p-2.5 rounded-xl transition-colors cursor-pointer text-left border ${
                        notif.isRead
                          ? 'bg-[#FAF7F5] dark:bg-[#252022] border-transparent opacity-75 hover:opacity-100'
                          : 'bg-[#FFF0F5] dark:bg-[#3D1A26] border-[#FFD9DE] dark:border-[#522938] shadow-2xs'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold text-[#1E1B18] dark:text-[#F4ECEE] line-clamp-1">
                          {notif.title}
                        </span>
                        <span className="text-[10px] text-[#8F6F73] dark:text-[#A89094] whitespace-nowrap">
                          {notif.timestamp}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#5B3F43] dark:text-[#D4BCC0] mt-0.5 line-clamp-2">
                        {notif.message}
                      </p>
                    </div>
                  ))
                )}
              </div>

              <div className="pt-2.5 mt-2 border-t border-[#F3E8E8] dark:border-[#2D2427] text-center">
                <button
                  onClick={() => {
                    setShowNotifications(false);
                    navigate('/notifications');
                  }}
                  className="text-xs font-semibold text-[#B80049] dark:text-[#FF7FA3] hover:underline cursor-pointer"
                >
                  Buka Semua Notifikasi →
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="h-5 w-px bg-[#EEDCDC] dark:bg-[#3D3236] hidden sm:block" />

        {/* User Profile Chip */}
        <button
          onClick={() => navigate('/profile')}
          className="flex items-center gap-2 p-1 pl-1.5 sm:pr-3 rounded-full hover:bg-[#F5ECE7] dark:hover:bg-[#252022] transition-colors cursor-pointer border border-transparent hover:border-[#EEDCDC] dark:hover:border-[#3D3236] max-w-[170px]"
        >
          <img
            src={user?.avatarUrl}
            alt={user?.name || 'Bulan'}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover ring-1.5 ring-[#B80049]/30 dark:ring-[#FF7FA3]/30 flex-shrink-0"
          />
          <div className="hidden sm:flex flex-col text-left leading-tight min-w-0">
            <span className="text-xs font-bold text-[#1E1B18] dark:text-[#F4ECEE] truncate">{user?.nickname || user?.name?.split(' ')[0] || 'Bulan'}</span>
            <span className="text-[10px] text-[#7A9A95] dark:text-[#8EE0D2] font-semibold truncate">
              FKH UGM · S{user?.currentSemester || 3}
            </span>
          </div>
        </button>
      </div>
    </header>
  );
};
