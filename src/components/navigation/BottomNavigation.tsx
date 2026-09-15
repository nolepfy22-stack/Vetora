import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Home,
  BookOpen,
  Sparkles,
  Search,
  User,
  Layers,
  HelpCircle,
  Stethoscope,
  Grid,
  FileText,
  LineChart,
  Settings,
  Bell,
  X,
  Database
} from 'lucide-react';
import { Modal } from '../common/UI';

interface BottomNavigationProps {
  onOpenMore?: () => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({ onOpenMore }) => {
  const { currentRoute, navigate } = useApp();
  const [studyMenuOpen, setStudyMenuOpen] = useState(false);

  const isRouteActive = (route: string) => {
    if (route === '/' && currentRoute === '/') return true;
    if (route !== '/' && currentRoute.startsWith(route)) return true;
    return false;
  };

  const navItemClass = (active: boolean) =>
    `flex flex-col items-center justify-center flex-1 py-1.5 transition-colors ${
      active
        ? 'text-[#B80049] dark:text-[#FF7FA3] font-bold'
        : 'text-[#8F6F73] dark:text-[#A89094] hover:text-[#1E1B18] dark:hover:text-[#F4ECEE]'
    }`;

  const openStudyItem = (route: string) => {
    setStudyMenuOpen(false);
    navigate(route);
  };

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#1C1819]/95 backdrop-blur-md border-t border-[#F3E8E8] dark:border-[#2D2427] shadow-[0_-2px_12px_rgba(0,0,0,0.05)] lg:hidden flex items-center justify-around px-2 py-1">
        <button
          onClick={() => navigate('/')}
          className={navItemClass(isRouteActive('/'))}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Home</span>
        </button>

        <button
          onClick={() => navigate('/courses')}
          className={navItemClass(isRouteActive('/courses'))}
        >
          <BookOpen className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Courses</span>
        </button>

        {/* Central Study Launcher */}
        <button
          onClick={() => setStudyMenuOpen(true)}
          className="flex flex-col items-center justify-center -mt-4 cursor-pointer"
        >
          <div className="w-12 h-12 rounded-full bg-[#B80049] text-white shadow-[0_4px_16px_rgba(184,0,73,0.35)] flex items-center justify-center hover:scale-105 active:scale-95 transition-transform">
            <Sparkles className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-bold text-[#B80049] dark:text-[#FF7FA3] mt-0.5">Study</span>
        </button>

        <button
          onClick={() => navigate('/search')}
          className={navItemClass(isRouteActive('/search'))}
        >
          <Search className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Search</span>
        </button>

        <button
          onClick={() => navigate('/profile')}
          className={navItemClass(isRouteActive('/profile'))}
        >
          <User className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Profile</span>
        </button>
      </nav>

      {/* Quick Study Modal for Mobile */}
      <Modal
        isOpen={studyMenuOpen}
        onClose={() => setStudyMenuOpen(false)}
        title="VETORA Study Hub 🐾"
      >
        <div className="grid grid-cols-3 gap-3 pt-1">
          <button
            onClick={() => openStudyItem('/materials')}
            className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#FAF7F5] dark:bg-[#252022] hover:bg-[#FFF0F5] dark:hover:bg-[#3D1A26] text-center transition-colors border border-[#F3E8E8] dark:border-[#3D3236] cursor-pointer"
          >
            <FileText className="w-6 h-6 text-[#B80049] dark:text-[#FF7FA3] mb-1.5" />
            <span className="text-xs font-bold text-[#1E1B18] dark:text-[#F4ECEE]">Materials</span>
            <span className="text-[10px] text-[#8F6F73] dark:text-[#A89094]">Modul & Notes</span>
          </button>

          <button
            onClick={() => openStudyItem('/flashcards')}
            className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#FAF7F5] dark:bg-[#252022] hover:bg-[#FFF0F5] dark:hover:bg-[#3D1A26] text-center transition-colors border border-[#F3E8E8] dark:border-[#3D3236] cursor-pointer"
          >
            <Layers className="w-6 h-6 text-[#B80049] dark:text-[#FF7FA3] mb-1.5" />
            <span className="text-xs font-bold text-[#1E1B18] dark:text-[#F4ECEE]">Flashcards</span>
            <span className="text-[10px] text-[#8F6F73] dark:text-[#A89094]">Hafalan Cepat</span>
          </button>

          <button
            onClick={() => openStudyItem('/quiz')}
            className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#FAF7F5] dark:bg-[#252022] hover:bg-[#FFF0F5] dark:hover:bg-[#3D1A26] text-center transition-colors border border-[#F3E8E8] dark:border-[#3D3236] cursor-pointer"
          >
            <HelpCircle className="w-6 h-6 text-[#B80049] dark:text-[#FF7FA3] mb-1.5" />
            <span className="text-xs font-bold text-[#1E1B18] dark:text-[#F4ECEE]">Quiz</span>
            <span className="text-[10px] text-[#8F6F73] dark:text-[#A89094]">Uji Mandiri</span>
          </button>

          <button
            onClick={() => openStudyItem('/cases')}
            className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#FAF7F5] dark:bg-[#252022] hover:bg-[#FFF0F5] dark:hover:bg-[#3D1A26] text-center transition-colors border border-[#F3E8E8] dark:border-[#3D3236] cursor-pointer"
          >
            <Stethoscope className="w-6 h-6 text-[#B80049] dark:text-[#FF7FA3] mb-1.5" />
            <span className="text-xs font-bold text-[#1E1B18] dark:text-[#F4ECEE]">Cases</span>
            <span className="text-[10px] text-[#8F6F73] dark:text-[#A89094]">Kasus Klinis</span>
          </button>

          <button
            onClick={() => openStudyItem('/atlas')}
            className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#FAF7F5] dark:bg-[#252022] hover:bg-[#FFF0F5] dark:hover:bg-[#3D1A26] text-center transition-colors border border-[#F3E8E8] dark:border-[#3D3236] cursor-pointer"
          >
            <Grid className="w-6 h-6 text-[#B80049] dark:text-[#FF7FA3] mb-1.5" />
            <span className="text-xs font-bold text-[#1E1B18] dark:text-[#F4ECEE]">Atlas</span>
            <span className="text-[10px] text-[#8F6F73] dark:text-[#A89094]">Anatomi Organ</span>
          </button>

          <button
            onClick={() => openStudyItem('/courses/ppdh')}
            className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#FAF7F5] dark:bg-[#252022] hover:bg-[#FFF0F5] dark:hover:bg-[#3D1A26] text-center transition-colors border border-[#F3E8E8] dark:border-[#3D3236] cursor-pointer"
          >
            <BookOpen className="w-6 h-6 text-[#B80049] dark:text-[#FF7FA3] mb-1.5" />
            <span className="text-xs font-bold text-[#1E1B18] dark:text-[#F4ECEE]">PPDH</span>
            <span className="text-[10px] text-[#8F6F73] dark:text-[#A89094]">Rotasi Profesi</span>
          </button>

          <button
            onClick={() => openStudyItem('/progress')}
            className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#FAF7F5] dark:bg-[#252022] hover:bg-[#FFF0F5] dark:hover:bg-[#3D1A26] text-center transition-colors border border-[#F3E8E8] dark:border-[#3D3236] cursor-pointer"
          >
            <LineChart className="w-6 h-6 text-[#B80049] dark:text-[#FF7FA3] mb-1.5" />
            <span className="text-xs font-bold text-[#1E1B18] dark:text-[#F4ECEE]">Progress</span>
            <span className="text-[10px] text-[#8F6F73] dark:text-[#A89094]">Statistik Belajar</span>
          </button>

          <button
            onClick={() => openStudyItem('/notifications')}
            className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#FAF7F5] dark:bg-[#252022] hover:bg-[#FFF0F5] dark:hover:bg-[#3D1A26] text-center transition-colors border border-[#F3E8E8] dark:border-[#3D3236] cursor-pointer"
          >
            <Bell className="w-6 h-6 text-[#B80049] dark:text-[#FF7FA3] mb-1.5" />
            <span className="text-xs font-bold text-[#1E1B18] dark:text-[#F4ECEE]">Notifikasi</span>
            <span className="text-[10px] text-[#8F6F73] dark:text-[#A89094]">Pemberitahuan</span>
          </button>

          <button
            onClick={() => openStudyItem('/settings')}
            className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#FAF7F5] dark:bg-[#252022] hover:bg-[#FFF0F5] dark:hover:bg-[#3D1A26] text-center transition-colors border border-[#F3E8E8] dark:border-[#3D3236] cursor-pointer"
          >
            <Settings className="w-6 h-6 text-[#B80049] dark:text-[#FF7FA3] mb-1.5" />
            <span className="text-xs font-bold text-[#1E1B18] dark:text-[#F4ECEE]">Settings</span>
            <span className="text-[10px] text-[#8F6F73] dark:text-[#A89094]">Preferensi</span>
          </button>

          <button
            onClick={() => openStudyItem('/content-management')}
            className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#FAF7F5] dark:bg-[#252022] hover:bg-[#FFF0F5] dark:hover:bg-[#3D1A26] text-center transition-colors border border-[#F3E8E8] dark:border-[#3D3236] cursor-pointer"
          >
            <Database className="w-6 h-6 text-[#B80049] dark:text-[#FF7FA3] mb-1.5" />
            <span className="text-xs font-bold text-[#1E1B18] dark:text-[#F4ECEE]">Content Mgr</span>
            <span className="text-[10px] text-[#8F6F73] dark:text-[#A89094]">Repositori</span>
          </button>
        </div>
      </Modal>
    </>
  );
};
