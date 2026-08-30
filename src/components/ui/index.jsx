import { cn } from '../../utils/helpers';
import { Maximize2, RotateCcw, X, ZoomIn, ZoomOut } from 'lucide-react';
import { useEffect, useState } from 'react';

export function Button({
  children,
  variant = 'primary',
  className = '',
  type = 'button',
  ...props
}) {
  const styles = {
    primary: 'bg-sea text-white hover:bg-sea-dark shadow-sm',
    secondary: 'bg-ink text-white hover:bg-ink-soft',
    outline: 'border border-line bg-white/70 text-ink hover:border-sea hover:text-sea',
    ghost: 'text-ink-soft hover:bg-mist',
    danger: 'bg-accent text-white hover:opacity-90',
  };
  return (
    <button
      type={type}
      className={cn(
        'relative z-10 inline-flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-semibold leading-tight transition disabled:cursor-not-allowed disabled:opacity-50',
        styles[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function Input({ label, error, className = '', id, ...props }) {
  const inputId = id || props.name;
  return (
    <label className={cn('block space-y-1.5', className)}>
      {label && <span className="text-sm font-medium text-ink-soft">{label}</span>}
      <input
        id={inputId}
        className={cn(
          'w-full rounded-md border border-line bg-white px-3 py-2.5 text-sm outline-none transition focus:border-sea focus:ring-2 focus:ring-sea/20',
          error && 'border-accent'
        )}
        {...props}
      />
      {error && <span className="text-xs text-accent">{error}</span>}
    </label>
  );
}

export function Textarea({ label, error, className = '', id, ...props }) {
  const inputId = id || props.name;
  return (
    <label className={cn('block space-y-1.5', className)}>
      {label && <span className="text-sm font-medium text-ink-soft">{label}</span>}
      <textarea
        id={inputId}
        className={cn(
          'w-full rounded-md border border-line bg-white px-3 py-2.5 text-sm outline-none transition focus:border-sea focus:ring-2 focus:ring-sea/20',
          error && 'border-accent'
        )}
        {...props}
      />
      {error && <span className="text-xs text-accent">{error}</span>}
    </label>
  );
}

export function Select({ label, error, className = '', children, id, ...props }) {
  const inputId = id || props.name;
  return (
    <label className={cn('block space-y-1.5', className)}>
      {label && <span className="text-sm font-medium text-ink-soft">{label}</span>}
      <select
        id={inputId}
        className={cn(
          'w-full rounded-md border border-line bg-white px-3 py-2.5 text-sm outline-none transition focus:border-sea focus:ring-2 focus:ring-sea/20',
          error && 'border-accent'
        )}
        {...props}
      >
        {children}
      </select>
      {error && <span className="text-xs text-accent">{error}</span>}
    </label>
  );
}

export function Badge({ children, tone = 'neutral' }) {
  const tones = {
    neutral: 'bg-mist text-ink-soft',
    success: 'bg-emerald-100 text-emerald-800',
    warning: 'bg-amber-100 text-amber-900',
    danger: 'bg-orange-100 text-orange-900',
    info: 'bg-teal-100 text-teal-900',
  };
  return (
    <span className={cn('inline-flex rounded-md px-2 py-0.5 text-xs font-semibold', tones[tone])}>
      {children}
    </span>
  );
}

export function Card({ children, className = '' }) {
  return (
    <div className={cn('rounded-xl border border-line/80 bg-white/80 p-5 shadow-sm backdrop-blur', className)}>
      {children}
    </div>
  );
}

export function PageHeader({ title, subtitle, actions }) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink md:text-3xl">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-ink-soft/80">{subtitle}</p>}
      </div>
      {actions}
    </div>
  );
}

export function EmptyState({ title, description }) {
  return (
    <div className="rounded-xl border border-dashed border-line bg-white/50 px-6 py-12 text-center">
      <p className="font-display text-lg text-ink">{title}</p>
      {description && <p className="mt-2 text-sm text-ink-soft/80">{description}</p>}
    </div>
  );
}

export function Spinner() {
  return (
    <div className="flex items-center justify-center py-16">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-sea border-t-transparent" />
    </div>
  );
}

export function Alert({ children, tone = 'info', className = '' }) {
  const tones = {
    info: 'border-sea/30 bg-sea/5 text-ink-soft',
    error: 'border-accent/40 bg-accent/5 text-accent',
    success: 'border-emerald-300 bg-emerald-50 text-emerald-900',
  };
  return (
    <div className={cn('rounded-md border px-4 py-3 text-sm', tones[tone], className)}>
      {children}
    </div>
  );
}

export function ImageViewer({ src, alt = '', className = '' }) {
  const [failed, setFailed] = useState(false);
  const [open, setOpen] = useState(false);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    setFailed(false);
    setOpen(false);
    setZoom(1);
  }, [src]);

  useEffect(() => {
    if (!open) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [open]);

  const placeholder = <div className={cn('border border-dashed border-line bg-mist/40', className)} aria-label="Emplacement de l'image" />;
  if (!src || failed) return placeholder;

  return (
    <>
      <button
        type="button"
        className={cn('group relative block cursor-zoom-in overflow-hidden', className)}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          setOpen(true);
        }}
        aria-label="Agrandir l'image"
      >
        <img src={src} alt={alt} onError={() => setFailed(true)} className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
        <span className="absolute right-3 top-3 rounded-full bg-ink/75 p-2 text-white opacity-0 transition group-hover:opacity-100">
          <Maximize2 size={16} aria-hidden="true" />
        </span>
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/90 p-4" role="dialog" aria-modal="true" aria-label="Image agrandie" onClick={() => setOpen(false)}>
          <div className="relative flex max-h-full max-w-6xl items-center justify-center" onClick={(event) => event.stopPropagation()}>
            <img src={src} alt={alt} className="max-h-[85vh] max-w-full object-contain" style={{ transform: `scale(${zoom})` }} />
            <div className="absolute right-3 top-3 flex gap-2 rounded-md bg-ink/80 p-2 text-white">
              <button type="button" onClick={() => setZoom((value) => Math.min(value + 0.25, 3))} aria-label="Zoom avant"><ZoomIn size={18} /></button>
              <button type="button" onClick={() => setZoom((value) => Math.max(value - 0.25, 0.5))} aria-label="Zoom arrière"><ZoomOut size={18} /></button>
              <button type="button" onClick={() => setZoom(1)} aria-label="Réinitialiser le zoom"><RotateCcw size={18} /></button>
              <button type="button" onClick={() => setOpen(false)} aria-label="Fermer"><X size={18} /></button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
