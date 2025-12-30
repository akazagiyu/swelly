'use client';

import { useState, useEffect, useCallback } from 'react';
import type { BotPermission } from '@/app/invite/page';

interface PermissionsExplainedModalProps {
  isOpen: boolean;
  botName: string;
  permissions: BotPermission[];
  onClose: () => void;
}

const categoryColors: Record<BotPermission['category'], { bg: string; border: string; badge: string }> = {
  audio: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', badge: 'bg-blue-500/20 text-blue-300' },
  moderation: { bg: 'bg-red-500/10', border: 'border-red-500/30', badge: 'bg-red-500/20 text-red-300' },
  utility: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', badge: 'bg-purple-500/20 text-purple-300' },
  data: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', badge: 'bg-amber-500/20 text-amber-300' },
  admin: { bg: 'bg-rose-500/10', border: 'border-rose-500/30', badge: 'bg-rose-500/20 text-rose-300' }
};

export default function PermissionsExplainedModal({
  isOpen,
  botName,
  permissions,
  onClose
}: PermissionsExplainedModalProps) {
  const [mounted, setMounted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<BotPermission['category'] | 'all'>('all');

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }, [onClose]);

  const handleEscapeKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleEscapeKey);
      return () => window.removeEventListener('keydown', handleEscapeKey);
    }
  }, [isOpen, handleEscapeKey]);

  if (!mounted || !isOpen) return null;

  const categories = Array.from(new Set(permissions.map(p => p.category)));
  const filteredPermissions = selectedCategory === 'all' 
    ? permissions 
    : permissions.filter(p => p.category === selectedCategory);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="permissions-modal-title"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" aria-hidden="true" />

      {/* Modal Content */}
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 rounded-2xl border border-white/10 shadow-2xl">
        
        {/* Header */}
        <div className="sticky top-0 z-10 bg-gradient-to-b from-slate-950 via-slate-900 to-transparent pb-6 pt-8 px-8 border-b border-white/5">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div>
              <h2 id="permissions-modal-title" className="text-2xl font-bold text-white">
                {botName} Permissions
              </h2>
              <p className="text-white/60 text-sm mt-1">
                Why {botName} needs these permissions and what they enable
              </p>
            </div>
            <button
              onClick={onClose}
              className="flex-shrink-0 w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              aria-label="Close dialog"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 pt-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                selectedCategory === 'all'
                  ? 'bg-blue-500/30 border border-blue-400 text-blue-300'
                  : 'bg-white/5 border border-white/10 text-white/70 hover:bg-white/10'
              }`}
            >
              All ({permissions.length})
            </button>
            {categories.map((cat) => {
              const count = permissions.filter(p => p.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 capitalize ${
                    selectedCategory === cat
                      ? `${categoryColors[cat].badge} border ${categoryColors[cat].border}`
                      : 'bg-white/5 border border-white/10 text-white/70 hover:bg-white/10'
                  }`}
                >
                  {cat} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Permissions List */}
        <div className="p-8 space-y-4">
          {filteredPermissions.length > 0 ? (
            filteredPermissions.map((permission, idx) => (
              <div
                key={`${permission.name}-${idx}`}
                className={`p-4 rounded-lg border transition-all duration-200 hover:bg-opacity-50 ${
                  categoryColors[permission.category].bg
                } ${categoryColors[permission.category].border}`}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="text-2xl flex-shrink-0 mt-1">
                    {permission.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="text-white font-semibold">
                        {permission.name}
                      </h3>
                      <span className={`px-2 py-1 rounded text-xs font-medium whitespace-nowrap ${
                        categoryColors[permission.category].badge
                      }`}>
                        {permission.category}
                      </span>
                    </div>
                    <p className="text-white/70 text-sm leading-relaxed">
                      {permission.description}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-white/60">No permissions found in this category.</p>
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className="bg-gradient-to-t from-slate-950 to-transparent px-8 py-6 border-t border-white/5">
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
            <p className="text-xs text-blue-300 leading-relaxed">
              <span className="font-semibold block mb-2">💡 Why permissions matter:</span>
              These permissions ensure {botName} can function properly. We only request what&apos;s necessary. You can review our privacy policy at any time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
