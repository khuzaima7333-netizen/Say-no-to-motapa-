/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShoppingBag, Sparkles } from 'lucide-react';

export type NavTab = 'visualizer' | 'scanner' | 'majaz' | 'tracker' | 'blueprint' | 'store';

interface NavbarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  cartCount: number;
  onOpenCart: () => void;
  weddingModeActive: boolean;
  onToggleWeddingMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  cartCount,
  onOpenCart,
  weddingModeActive,
  onToggleWeddingMode
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAFAF9]/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Say No to Motapa) */}
        <button
          onClick={() => onSelectTab('visualizer')}
          className="text-lg md:text-xl font-display font-bold tracking-tight text-stone-900 whitespace-nowrap shrink-0 hover:text-amber-800 transition-colors"
        >
          Say No to Motapa
        </button>

        {/* Zone 2: Single-line clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-stone-600">
          <button
            onClick={() => onSelectTab('scanner')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'scanner'
                ? 'text-stone-900 font-semibold border-b-2 border-amber-600'
                : 'hover:text-stone-900'
            }`}
          >
            Plate Scanner
          </button>
          <button
            onClick={() => onSelectTab('majaz')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 flex items-center gap-1.5 ${
              activeTab === 'majaz'
                ? 'text-stone-900 font-semibold border-b-2 border-amber-600'
                : 'hover:text-stone-900'
            }`}
          >
            <img
              src="/coach_majaz.jpg"
              alt="Coach Majaz"
              className="w-5 h-5 rounded-full object-cover border border-amber-500 shrink-0"
            />
            <span>Coach Majaz</span>
          </button>
          <button
            onClick={() => onSelectTab('visualizer')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'visualizer'
                ? 'text-stone-900 font-semibold border-b-2 border-amber-600'
                : 'hover:text-stone-900'
            }`}
          >
            3D Studio
          </button>
          <button
            onClick={() => onSelectTab('tracker')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'tracker'
                ? 'text-stone-900 font-semibold border-b-2 border-amber-600'
                : 'hover:text-stone-900'
            }`}
          >
            Food Log
          </button>
          <button
            onClick={() => onSelectTab('blueprint')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'blueprint'
                ? 'text-stone-900 font-semibold border-b-2 border-amber-600'
                : 'hover:text-stone-900'
            }`}
          >
            Blueprint
          </button>
          <button
            onClick={() => onSelectTab('store')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'store'
                ? 'text-stone-900 font-semibold border-b-2 border-amber-600'
                : 'hover:text-stone-900'
            }`}
          >
            Recipe Cooking Kits
          </button>
        </nav>

        {/* Zone 3: Cart & Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenCart}
            className="relative p-2 text-stone-700 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors"
            aria-label="Open Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center font-mono">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={onToggleWeddingMode}
            className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
              weddingModeActive
                ? 'bg-amber-600 text-white shadow-sm hover:bg-amber-700'
                : 'bg-stone-900 text-white hover:bg-stone-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{weddingModeActive ? 'Shaadi Mode ON' : 'Wedding Mode'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
