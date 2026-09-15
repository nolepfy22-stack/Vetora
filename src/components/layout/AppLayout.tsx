import React, { useState } from 'react';
import { Sidebar } from '../navigation/Sidebar';
import { Header } from '../navigation/Header';
import { BottomNavigation } from '../navigation/BottomNavigation';

interface AppLayoutProps {
  children: React.ReactNode;
  isImmersive?: boolean;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children, isImmersive = false }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen w-full bg-[#FAF7F5] dark:bg-[#161414] overflow-hidden text-[#1E1B18] dark:text-[#F4ECEE] antialiased">
      {/* 1. Desktop Sidebar (always in document flow, never overlapping) */}
      {!isImmersive && (
        <Sidebar
          mobileMenuOpen={mobileMenuOpen}
          onCloseMobileMenu={() => setMobileMenuOpen(false)}
        />
      )}

      {/* 2. Main Viewport Area (occupies remaining width) */}
      <div className="flex-1 min-w-0 flex flex-col h-full overflow-hidden relative">
        {/* Top Header */}
        {!isImmersive && (
          <Header onOpenMobileMenu={() => setMobileMenuOpen(true)} />
        )}

        {/* Scrollable Page Content Container */}
        <main
          id="main-content"
          tabIndex={-1}
          className={`flex-1 min-w-0 overflow-y-auto overflow-x-hidden ${
            isImmersive
              ? 'p-0'
              : 'px-4 sm:px-6 lg:px-8 py-6 pb-24 lg:pb-10'
          }`}
        >
          <div className="w-full max-w-7xl mx-auto flex flex-col min-h-full justify-between">
            <div className="flex-1">
              {children}
            </div>

            {!isImmersive && (
              <footer className="mt-12 pt-6 pb-4 border-t border-[#F3E8E8] dark:border-[#2D2427] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#8F6F73] dark:text-[#A89094] select-none">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold tracking-wider text-[#B80049] dark:text-[#FF7FA3]">VETORA</span>
                  <span>·</span>
                  <span className="uppercase text-[10px] tracking-wider font-medium">Veterinary Learning</span>
                </div>
                <p className="text-[11px] italic">
                  Made with love by Raffy for Bulan 🐾
                </p>
              </footer>
            )}
          </div>
        </main>

        {/* Mobile Bottom Navigation Bar (Hidden on desktop) */}
        {!isImmersive && <BottomNavigation onOpenMore={() => setMobileMenuOpen(true)} />}
      </div>
    </div>
  );
};
