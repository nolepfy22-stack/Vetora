import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Home,
  BookOpen,
  ChevronDown,
  ChevronRight,
  FileText,
  Layers,
  HelpCircle,
  Stethoscope,
  Grid,
  Search,
  LineChart,
  User,
  Settings,
  X,
  Database
} from 'lucide-react';

interface SidebarProps {
  mobileMenuOpen?: boolean;
  onCloseMobileMenu?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  mobileMenuOpen = false,
  onCloseMobileMenu
}) => {
  const { currentRoute, navigate, user } = useApp();
  const [coursesExpanded, setCoursesExpanded] = useState<boolean>(false);
  const activeSem = user?.currentSemester || 3;

  const isRouteActive = (route: string) => {
    if (route === '/' && currentRoute === '/') return true;
    if (route !== '/' && currentRoute.startsWith(route)) return true;
    return false;
  };

  const handleNav = (route: string) => {
    navigate(route);
    if (onCloseMobileMenu) {
      onCloseMobileMenu();
    }
  };

  const navItemClass = (isActive: boolean) =>
    `w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 text-left cursor-pointer min-w-0 ${
      isActive
        ? 'bg-[#B80049] text-white font-semibold shadow-xs'
        : 'text-[#5B3F43] dark:text-[#D4BCC0] hover:bg-[#F3E8E8] dark:hover:bg-[#2A2325] hover:text-[#1E1B18] dark:hover:text-[#F4ECEE]'
    }`;

  const subNavItemClass = (isActive: boolean) =>
    `w-full px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between text-left cursor-pointer min-w-0 truncate ${
      isActive
        ? 'bg-[#FFD9DE] dark:bg-[#3D1A26] text-[#B80049] dark:text-[#FF7FA3] font-bold'
        : 'text-[#5B3F43] dark:text-[#D4BCC0] hover:bg-[#F5ECE7] dark:hover:bg-[#2A2325] hover:text-[#1E1B18] dark:hover:text-[#F4ECEE]'
    }`;

  const sidebarContent = (
    <div className="flex flex-col h-full justify-between overflow-y-auto overflow-x-hidden p-3 w-full">
      {/* Top Header & Nav Items */}
      <div className="flex flex-col w-full min-w-0">
        {/* LOGO & BRAND */}
        <div className="flex items-center justify-between px-2 pt-2 pb-4">
          <div
            onClick={() => handleNav('/')}
            className="flex items-center gap-3 cursor-pointer group select-none min-w-0"
          >
            <div className="w-10 h-10 rounded-xl bg-[#FFD9DE] dark:bg-[#3D1A26] flex items-center justify-center text-[#B80049] dark:text-[#FF7FA3] shadow-xs group-hover:scale-105 transition-transform flex-shrink-0">
              <span className="text-xl">🐾</span>
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1">
                <span className="font-serif-display text-xl tracking-tight text-[#B80049] dark:text-[#FF7FA3] font-bold truncate">
                  VETORA
                </span>
                <span className="text-xs flex-shrink-0">🐾</span>
              </div>
              <span className="text-[10px] text-[#8F6F73] dark:text-[#A89094] font-semibold tracking-wider uppercase truncate">
                VETERINARY LEARNING
              </span>
            </div>
          </div>

          {/* Close button for mobile drawer */}
          {onCloseMobileMenu && (
            <button
              onClick={onCloseMobileMenu}
              className="lg:hidden p-1.5 rounded-lg text-[#5B3F43] dark:text-[#D4BCC0] hover:bg-[#F3E8E8] dark:hover:bg-[#2A2325] transition-colors"
              aria-label="Close navigation"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* PRIMARY NAVIGATION */}
        <nav className="flex flex-col gap-1 mt-1 w-full min-w-0">
          {/* 1. Home */}
          <button
            onClick={() => handleNav('/')}
            className={navItemClass(isRouteActive('/'))}
          >
            <Home className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">Home</span>
          </button>

          {/* 2. My Courses */}
          <div className="flex flex-col w-full min-w-0">
            <div
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 cursor-pointer min-w-0 ${
                isRouteActive('/courses') && currentRoute === '/courses'
                  ? 'bg-[#B80049] text-white font-semibold shadow-xs'
                  : 'text-[#5B3F43] dark:text-[#D4BCC0] hover:bg-[#F3E8E8] dark:hover:bg-[#2A2325] hover:text-[#1E1B18] dark:hover:text-[#F4ECEE]'
              }`}
            >
              <button
                onClick={() => handleNav('/courses')}
                className="flex items-center gap-3 flex-1 text-left min-w-0 truncate"
              >
                <BookOpen className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">My Courses</span>
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setCoursesExpanded(!coursesExpanded);
                }}
                className="p-1 hover:bg-black/10 dark:hover:bg-white/10 rounded-md ml-1 flex-shrink-0 transition-colors"
                aria-label="Toggle courses submenu"
              >
                {coursesExpanded ? (
                  <ChevronDown className="w-3.5 h-3.5" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5" />
                )}
              </button>
            </div>

            {/* Semester Sub-navigation */}
            {coursesExpanded && (
              <div className="pl-6 pr-1 py-1 flex flex-col gap-0.5 border-l-2 border-[#FFD9DE] dark:border-[#4E2130] ml-4 my-1">
                <button
                  onClick={() => handleNav('/courses')}
                  className={subNavItemClass(currentRoute === '/courses')}
                >
                  <span className="truncate">Semua Semester</span>
                </button>
                <button
                  onClick={() => handleNav(`/courses/semester-${activeSem}`)}
                  className={subNavItemClass(currentRoute === `/courses/semester-${activeSem}`)}
                >
                  <span className="truncate">Semester {activeSem}</span>
                  <span className="text-[10px] text-[#B80049] dark:text-[#FF7FA3] bg-[#FFD9DE] dark:bg-[#3D1A26] px-1.5 py-0.2 rounded-full font-bold ml-1 flex-shrink-0">
                    Aktif
                  </span>
                </button>
                <button
                  onClick={() => handleNav('/courses/ppdh')}
                  className={subNavItemClass(currentRoute === '/courses/ppdh')}
                >
                  <span className="truncate">PPDH Rotasi</span>
                </button>
              </div>
            )}
          </div>

          {/* 3. Materials */}
          <button
            onClick={() => handleNav('/materials')}
            className={navItemClass(isRouteActive('/materials'))}
          >
            <FileText className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">Materials</span>
          </button>

          {/* 4. Flashcards */}
          <button
            onClick={() => handleNav('/flashcards')}
            className={navItemClass(isRouteActive('/flashcards'))}
          >
            <Layers className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">Flashcards</span>
          </button>

          {/* 5. Quiz */}
          <button
            onClick={() => handleNav('/quiz')}
            className={navItemClass(isRouteActive('/quiz'))}
          >
            <HelpCircle className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">Quiz</span>
          </button>

          {/* 6. Clinical Cases */}
          <button
            onClick={() => handleNav('/cases')}
            className={navItemClass(isRouteActive('/cases'))}
          >
            <Stethoscope className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">Clinical Cases</span>
          </button>

          {/* 7. Veterinary Atlas */}
          <button
            onClick={() => handleNav('/atlas')}
            className={navItemClass(isRouteActive('/atlas'))}
          >
            <Grid className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">Veterinary Atlas</span>
          </button>

          {/* 8. Search */}
          <button
            onClick={() => handleNav('/search')}
            className={navItemClass(isRouteActive('/search'))}
          >
            <Search className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">Search</span>
          </button>

          {/* 9. Progress */}
          <button
            onClick={() => handleNav('/progress')}
            className={navItemClass(isRouteActive('/progress'))}
          >
            <LineChart className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">Progress</span>
          </button>

          {/* 10. Content & Provenance Manager */}
          <button
            onClick={() => handleNav('/content-management')}
            className={navItemClass(isRouteActive('/content-management'))}
          >
            <Database className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">Content Manager</span>
          </button>
        </nav>
      </div>

      {/* BOTTOM SECTION: Profile & Settings */}
      <div className="pt-3 mt-4 border-t border-[#F3E8E8] dark:border-[#2D2427] flex flex-col gap-1 w-full min-w-0">
        <button
          onClick={() => handleNav('/profile')}
          className={navItemClass(isRouteActive('/profile'))}
        >
          <User className="w-4 h-4 flex-shrink-0" />
          <span className="truncate">Profile</span>
        </button>

        <button
          onClick={() => handleNav('/settings')}
          className={navItemClass(isRouteActive('/settings'))}
        >
          <Settings className="w-4 h-4 flex-shrink-0" />
          <span className="truncate">Settings</span>
        </button>

        <div className="px-2 py-2 text-center select-none">
          <p className="text-[11px] text-[#8F6F73] dark:text-[#A89094] italic truncate">
            Made with love by Raffy for Bulan 🐾
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* DESKTOP SIDEBAR: Fixed width 260px, flex child, NOT floating */}
      <aside
        id="desktop-sidebar"
        className="w-[260px] max-w-[260px] min-w-[260px] flex-shrink-0 h-full bg-[#FAF7F5] dark:bg-[#1A1617] border-r border-[#F3E8E8] dark:border-[#2D2427] hidden lg:flex flex-col justify-between overflow-hidden"
      >
        {sidebarContent}
      </aside>

      {/* MOBILE / TABLET SLIDE-OVER DRAWER */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Dark Backdrop */}
          <div
            onClick={onCloseMobileMenu}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            aria-hidden="true"
          />

          {/* Slide Drawer */}
          <div className="relative w-[270px] max-w-[80vw] h-full bg-[#FAF7F5] dark:bg-[#1A1617] shadow-2xl z-50 flex flex-col animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
