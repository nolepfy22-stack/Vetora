import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LucideIcon, X, AlertTriangle, CheckCircle, Info, RefreshCw } from 'lucide-react';

/* BUTTON */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive' | 'soft' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  loading = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none focus:outline-none focus:ring-2 focus:ring-[#B80049]/30';

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-6 py-2.5 text-base gap-2.5'
  }[size];

  const variantClasses = {
    primary:
      'bg-[#B80049] hover:bg-[#E2165F] text-white shadow-xs active:scale-[0.98]',
    secondary:
      'bg-[#FFF0F5] hover:bg-[#FFD9DE] dark:bg-[#3D1A26] dark:hover:bg-[#4E2130] text-[#B80049] dark:text-[#FF7FA3] border border-[#F3E8E8] dark:border-[#522938] active:scale-[0.98]',
    soft: 'bg-[#F5ECE7] hover:bg-[#EFE6E2] dark:bg-[#2A2325] dark:hover:bg-[#352C2F] text-[#1E1B18] dark:text-[#F4ECEE] active:scale-[0.98]',
    outline:
      'bg-white hover:bg-[#FAF7F5] dark:bg-[#201B1D] dark:hover:bg-[#2A2426] text-[#1E1B18] dark:text-[#F4ECEE] border border-[#EEDCDC] dark:border-[#3E3236] shadow-2xs active:scale-[0.98]',
    ghost:
      'bg-transparent hover:bg-[#F5ECE7] dark:hover:bg-[#2A2325] text-[#5B3F43] dark:text-[#D4BCC0] hover:text-[#1E1B18] dark:hover:text-[#F4ECEE]',
    destructive:
      'bg-[#BA1A1A] hover:bg-[#93000A] text-white shadow-xs active:scale-[0.98]'
  }[variant];

  return (
    <button
      className={`${baseClasses} ${sizeClasses} ${variantClasses} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        <>
          {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 flex-shrink-0" />}
          {children}
          {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 flex-shrink-0" />}
        </>
      )}
    </button>
  );
};

/* CARD */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
  children,
  hoverEffect = false,
  padding = 'md',
  className = '',
  ...props
}) => {
  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-5',
    lg: 'p-6 md:p-8'
  }[padding];

  const hoverClasses = hoverEffect
    ? 'hover:shadow-[0_8px_24px_-2px_rgba(226,22,95,0.08)] hover:-translate-y-0.5 transition-all duration-200'
    : '';

  return (
    <div
      className={`bg-white dark:bg-[#1E1A1C] text-[#1E1B18] dark:text-[#F4ECEE] rounded-2xl border border-[#F3E8E8] dark:border-[#2D2427] shadow-[0_2px_12px_-1px_rgba(45,41,38,0.03)] ${paddingClasses} ${hoverClasses} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

/* PAGE CONTAINER */
export const PageContainer: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  return (
    <div className={`w-full max-w-7xl mx-auto flex flex-col gap-6 ${className}`}>
      {children}
    </div>
  );
};

/* SECTION HEADER */
export const SectionHeader: React.FC<{
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  badge?: string;
  action?: React.ReactNode;
}> = ({ title, subtitle, icon: Icon, badge, action }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1">
      <div className="flex items-center gap-2.5 min-w-0">
        {Icon && (
          <div className="w-8 h-8 rounded-xl bg-[#FFF0F5] dark:bg-[#3D1A26] text-[#B80049] dark:text-[#FF7FA3] flex items-center justify-center flex-shrink-0">
            <Icon className="w-4 h-4" />
          </div>
        )}
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="font-serif-display text-lg sm:text-xl font-bold text-[#1E1B18] dark:text-[#F4ECEE] tracking-tight truncate">
              {title}
            </h2>
            {badge && (
              <span className="px-2 py-0.5 rounded-full bg-[#FFD9DE] dark:bg-[#4E2130] text-[#B80049] dark:text-[#FF7FA3] text-xs font-bold flex-shrink-0">
                {badge}
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-xs text-[#5B3F43] dark:text-[#D4BCC0] truncate mt-0.5">{subtitle}</p>
          )}
        </div>
      </div>
      {action && <div className="flex items-center gap-2 flex-shrink-0">{action}</div>}
    </div>
  );
};

/* BADGE */
export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'sage' | 'neutral' | 'warning' | 'success';
  size?: 'sm' | 'md';
  icon?: LucideIcon;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  size = 'sm',
  icon: Icon,
  className = ''
}) => {
  const sizeClasses = size === 'sm' ? 'px-2.5 py-0.5 text-xs' : 'px-3 py-1 text-sm';

  const variantClasses = {
    primary: 'bg-[#FFD9DE] dark:bg-[#4E2130] text-[#B80049] dark:text-[#FF7FA3] font-semibold',
    secondary: 'bg-[#FFF0F5] dark:bg-[#3D1A26] text-[#93405F] dark:text-[#FF99B6]',
    sage: 'bg-[#C5E7E1] dark:bg-[#203D37] text-[#2E4C48] dark:text-[#8EE0D2] font-semibold',
    neutral: 'bg-[#F5ECE7] dark:bg-[#2A2325] text-[#5B3F43] dark:text-[#D4BCC0]',
    warning: 'bg-[#FFDAD6] dark:bg-[#4E1F1F] text-[#93000A] dark:text-[#FF9999] font-semibold',
    success: 'bg-[#D1E7DD] dark:bg-[#1E3B2F] text-[#0F5132] dark:text-[#8EE6B8] font-semibold'
  }[variant];

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full ${sizeClasses} ${variantClasses} ${className}`}
    >
      {Icon && <Icon className="w-3 h-3 flex-shrink-0" />}
      {children}
    </span>
  );
};

/* PROGRESS BAR */
export const ProgressBar: React.FC<{
  value: number;
  max?: number;
  className?: string;
  color?: string;
}> = ({ value, max = 100, className = '', color = 'bg-[#B80049]' }) => {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));
  return (
    <div className={`w-full h-2 rounded-full bg-[#FFD9DE] dark:bg-[#3D252C] overflow-hidden ${className}`}>
      <motion.div
        className={`h-full rounded-full ${color}`}
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      />
    </div>
  );
};

/* PROGRESS RING */
export const ProgressRing: React.FC<{
  percentage: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  sublabel?: string;
  showText?: boolean;
}> = ({
  percentage,
  size = 96,
  strokeWidth = 8,
  label,
  sublabel = 'Overall',
  showText = size >= 48
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (Math.min(100, Math.max(0, percentage)) / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center flex-shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className="stroke-[#F5ECE7] dark:stroke-[#352A2E]"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#B80049"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          strokeLinecap="round"
        />
      </svg>
      {showText && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none pointer-events-none p-1">
          <span
            className={`font-serif-display font-bold text-[#1E1B18] dark:text-[#F4ECEE] leading-none ${
              size >= 90 ? 'text-2xl' : size >= 64 ? 'text-lg' : 'text-xs'
            }`}
          >
            {label ?? `${percentage}%`}
          </span>
          {sublabel && size >= 64 && (
            <span className="text-[10px] text-[#5B3F43] dark:text-[#D4BCC0] mt-1 font-medium">{sublabel}</span>
          )}
        </div>
      )}
    </div>
  );
};

/* MODAL */
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = 'md'
}) => {
  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  }[maxWidth];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className={`relative bg-white dark:bg-[#1E1A1C] text-[#1E1B18] dark:text-[#F4ECEE] w-full ${maxWidthClasses} rounded-2xl p-5 sm:p-6 shadow-2xl z-10 border border-[#F3E8E8] dark:border-[#2D2427] max-h-[90vh] overflow-y-auto`}
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
          >
            <div className="flex items-center justify-between pb-3.5 border-b border-[#F3E8E8] dark:border-[#2D2427] mb-4">
              <h3 className="font-serif-display text-lg sm:text-xl font-bold text-[#1E1B18] dark:text-[#F4ECEE] truncate pr-2">
                {title}
              </h3>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-[#FAF7F5] dark:bg-[#2A2325] hover:bg-[#F5ECE7] dark:hover:bg-[#352C2F] text-[#5B3F43] dark:text-[#D4BCC0] flex items-center justify-center transition-colors flex-shrink-0 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

/* CONFIRM DIALOG */
export interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  isDestructive?: boolean;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Konfirmasi',
  isDestructive = false
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth="sm">
      <div className="flex flex-col gap-4">
        <div className="flex items-start gap-3 text-sm text-[#5B3F43] dark:text-[#D4BCC0]">
          {isDestructive ? (
            <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          ) : (
            <Info className="w-5 h-5 text-[#B80049] dark:text-[#FF7FA3] flex-shrink-0 mt-0.5" />
          )}
          <p>{message}</p>
        </div>
        <div className="flex justify-end gap-2 pt-3 border-t border-[#F3E8E8] dark:border-[#2D2427]">
          <Button variant="ghost" onClick={onClose}>
            Batal
          </Button>
          <Button
            variant={isDestructive ? 'destructive' : 'primary'}
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

/* EMPTY STATE */
export const EmptyState: React.FC<{
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  icon?: LucideIcon;
}> = ({ title, description, actionText, onAction, icon: Icon }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center bg-white dark:bg-[#1E1A1C] rounded-2xl border border-dashed border-[#EEDCDC] dark:border-[#3D3236] my-4 w-full">
      <div className="w-12 h-12 rounded-full bg-[#FFF0F5] dark:bg-[#3D1A26] text-[#B80049] dark:text-[#FF7FA3] flex items-center justify-center mb-3">
        {Icon ? <Icon className="w-6 h-6" /> : <Info className="w-6 h-6" />}
      </div>
      <h4 className="font-serif-display text-base sm:text-lg font-bold text-[#1E1B18] dark:text-[#F4ECEE] mb-1">
        {title}
      </h4>
      <p className="text-xs sm:text-sm text-[#5B3F43] dark:text-[#D4BCC0] max-w-md mb-4">{description}</p>
      {actionText && onAction && (
        <Button variant="secondary" size="sm" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  );
};

/* LOADING STATE */
export const LoadingState: React.FC<{ message?: string }> = ({
  message = 'Memuat konten...'
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center w-full">
      <RefreshCw className="w-6 h-6 text-[#B80049] animate-spin mb-3" />
      <p className="text-xs text-[#5B3F43] font-medium">{message}</p>
    </div>
  );
};

/* ERROR STATE */
export const ErrorState: React.FC<{
  title?: string;
  message?: string;
  onRetry?: () => void;
}> = ({
  title = 'Terjadi Kesalahan',
  message = 'Gagal memuat data. Silakan coba beberapa saat lagi.',
  onRetry
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center bg-[#FFF0F0] rounded-2xl border border-[#FFD9DE] my-4 w-full">
      <AlertTriangle className="w-8 h-8 text-[#BA1A1A] mb-2" />
      <h4 className="font-serif-display text-base font-bold text-[#1E1B18] mb-1">{title}</h4>
      <p className="text-xs text-[#5B3F43] max-w-sm mb-4">{message}</p>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry}>
          Coba Lagi
        </Button>
      )}
    </div>
  );
};

/* BREADCRUMB */
export const Breadcrumb: React.FC<{
  items: { label: string; onClick?: () => void }[];
}> = ({ items }) => {
  return (
    <nav className="flex items-center gap-1.5 text-xs text-[#5B3F43] mb-4 flex-wrap">
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <React.Fragment key={idx}>
            {idx > 0 && <span className="text-[#8F6F73]">/</span>}
            {item.onClick && !isLast ? (
              <button
                onClick={item.onClick}
                className="hover:text-[#B80049] hover:underline transition-colors font-medium cursor-pointer"
              >
                {item.label}
              </button>
            ) : (
              <span className={isLast ? 'font-semibold text-[#1E1B18]' : ''}>
                {item.label}
              </span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
