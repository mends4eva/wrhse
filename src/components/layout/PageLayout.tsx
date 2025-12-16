import React from 'react';
import { Navigation } from './Navigation';

interface PageLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen noise-texture">
      <Navigation />
      <main className="ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-8 animate-fade-in">
            <h1 className="font-display text-4xl font-bold text-white mb-2">
              {title}
            </h1>
            {subtitle && (
              <p className="text-gray-400 font-mono text-sm">{subtitle}</p>
            )}
          </div>

          {/* Page Content */}
          <div className="animate-fade-in" style={{ animationDelay: '100ms' }}>
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};
