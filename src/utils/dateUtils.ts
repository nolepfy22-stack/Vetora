/**
 * Consistent Date and Time Formatting Utilities for VETORA
 * Timezone: Asia/Jakarta (WIB)
 */

/**
 * Returns current Date object calibrated to Asia/Jakarta (WIB)
 */
export const getWIBDate = (): Date => {
  const now = new Date();
  const wibString = now.toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
  return new Date(wibString);
};

/**
 * Returns YYYY-MM-DD string in WIB
 */
export const getCurrentWIBDateString = (): string => {
  const d = getWIBDate();
  const year = d.getFullYear();
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const day = d.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Returns HH:MM string in WIB
 */
export const getCurrentWIBTimeString = (): string => {
  const d = getWIBDate();
  const hours = d.getHours().toString().padStart(2, '0');
  const minutes = d.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

/**
 * Generates personalized greeting strictly based on Asia/Jakarta (WIB) hour:
 * 05:00–10:59: "Selamat pagi, Bulan 🌸"
 * 11:00–14:59: "Selamat siang, Bulan 🌸"
 * 15:00–17:59: "Selamat sore, Bulan 🌸"
 * 18:00–23:59: "Selamat malam, Bulan 🌙"
 * 00:00–04:59: "Selamat malam, Bulan 🌙"
 */
export const getWIBGreeting = (name: string = 'Bulan'): { greeting: string; icon: string; fullGreeting: string } => {
  const wibDate = getWIBDate();
  const hour = wibDate.getHours();

  let greeting = 'Selamat pagi';
  let icon = '🌸';

  if (hour >= 5 && hour < 11) {
    greeting = 'Selamat pagi';
    icon = '🌸';
  } else if (hour >= 11 && hour < 15) {
    greeting = 'Selamat siang';
    icon = '🌸';
  } else if (hour >= 15 && hour < 18) {
    greeting = 'Selamat sore';
    icon = '🌸';
  } else {
    greeting = 'Selamat malam';
    icon = '🌙';
  }

  return {
    greeting,
    icon,
    fullGreeting: `${greeting}, ${name} ${icon}`
  };
};

export const formatDate = (
  dateString: string | Date,
  format: 'relative' | 'short' | 'full' | 'academic' = 'short'
): string => {
  if (!dateString) return '';
  const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
  if (isNaN(date.getTime())) return String(dateString);

  const today = getWIBDate();
  const isToday =
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const isTomorrow =
    date.getDate() === tomorrow.getDate() &&
    date.getMonth() === tomorrow.getMonth() &&
    date.getFullYear() === tomorrow.getFullYear();

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const isYesterday =
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear();

  if (format === 'relative') {
    if (isToday) return 'Hari ini';
    if (isTomorrow) return 'Besok';
    if (isYesterday) return 'Kemarin';
  }

  const monthsIndo = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  const shortMonthsIndo = [
    'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
    'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'
  ];

  const day = date.getDate();
  const month = shortMonthsIndo[date.getMonth()];
  const fullMonth = monthsIndo[date.getMonth()];
  const year = date.getFullYear();

  if (format === 'short') {
    if (isToday) return 'Hari ini';
    if (isTomorrow) return 'Besok';
    return `${day} ${month} ${year}`;
  }

  if (format === 'academic') {
    return `${day} ${fullMonth} ${year}`;
  }

  const daysIndo = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const dayName = daysIndo[date.getDay()];
  return `${dayName}, ${day} ${fullMonth} ${year}`;
};

export const formatTime = (timeOrDate: string | Date): string => {
  if (!timeOrDate) return '';
  if (typeof timeOrDate === 'string' && timeOrDate.includes(':') && !timeOrDate.includes('T')) {
    return timeOrDate;
  }
  const date = typeof timeOrDate === 'string' ? new Date(timeOrDate) : timeOrDate;
  if (isNaN(date.getTime())) return String(timeOrDate);

  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

export const getRelativeTime = (timestamp: string | Date): string => {
  if (!timestamp) return '';
  const now = getWIBDate();
  const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp;
  if (isNaN(date.getTime())) return String(timestamp);

  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 60) return 'Baru saja';
  if (diffMin < 60) return `${diffMin} menit yang lalu`;
  if (diffHour < 24) return `${diffHour} jam yang lalu`;
  if (diffDay === 1) return 'Kemarin';
  if (diffDay < 7) return `${diffDay} hari yang lalu`;
  return formatDate(date, 'short');
};

/**
 * Intelligent schedule status evaluator:
 * - If user explicitly marked as Completed or Cancelled, keep it.
 * - If current WIB time is within startTime and endTime on schedule date: 'In Progress'.
 * - If date is in future, or today before start: 'Upcoming'.
 * - If date is in the past: keep as 'Upcoming' (or pending) so user can explicitly verify and complete it.
 */
export const calculateScheduleStatus = (
  scheduleDate: string,
  startTime: string,
  endTime: string,
  savedStatus: string = 'Upcoming'
): 'Upcoming' | 'In Progress' | 'Completed' | 'Cancelled' => {
  if (savedStatus === 'Completed' || savedStatus === 'Cancelled') {
    return savedStatus as 'Completed' | 'Cancelled';
  }

  const todayStr = getCurrentWIBDateString();
  const currentHM = getCurrentWIBTimeString();

  if (scheduleDate === todayStr) {
    if (currentHM >= startTime && currentHM <= endTime) {
      return 'In Progress';
    }
  }

  return 'Upcoming';
};
