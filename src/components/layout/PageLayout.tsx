import React from 'react';
import { BottomNav } from './BottomNav';

interface PageLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen noise-texture bg-wms-bg flex flex-col">
      <main className="flex-1 p-4 md:p-8 pb-24">
        <div className="max-w-2xl mx-auto">
          {/* Page Header */}
          <div className="mb-8 animate-fade-in">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-2 text-balance">
              {title}
            </h1>
            {subtitle && (
              <p className="text-gray-400 font-mono text-xs md:text-sm">{subtitle}</p>
            )}
          </div>

          {/* Page Content */}
          <div className="animate-fade-in" style={{ animationDelay: '100ms' }}>
            {children}
          </div>
        </div>
      </main>
      <BottomNav />
    </div>
  );
};
