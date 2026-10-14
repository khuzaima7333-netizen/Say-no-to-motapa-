/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar, NavTab } from './components/Navbar.tsx';
import { ThreeNutritionVisualizer } from './components/ThreeNutritionVisualizer.tsx';
import { FoodTrackerView } from './components/FoodTrackerView.tsx';
import { CoachChatView } from './components/CoachChatView.tsx';
import { ProductBlueprintView } from './components/ProductBlueprintView.tsx';
import { MealKitsStoreView } from './components/MealKitsStoreView.tsx';
import { CartDrawer } from './components/CartDrawer.tsx';
import { WeddingModeModal } from './components/WeddingModeModal.tsx';
import { PlateScannerView } from './components/PlateScannerView.tsx';
import { CoachMajazView } from './components/CoachMajazView.tsx';
import { CartItem, FoodItem, MealKitProduct } from './types/index.ts';
import { Scan, Dumbbell, Sparkles, ArrowRight, ShieldCheck, Layers, Utensils } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('scanner');
  const [weddingModeActive, setWeddingModeActive] = useState<boolean>(false);
  const [isWeddingModalOpen, setIsWeddingModalOpen] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [chatFoodQuery, setChatFoodQuery] = useState<string | null>(null);

  // Cart Handlers
  const handleAddToCart = (product: MealKitProduct) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
    } else {
      setCartItems((prev) =>
        prev.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleOpenCoachChatWithFood = (foodName: string) => {
    setChatFoodQuery(foodName);
    setActiveTab('majaz');
  };

  const handleLogScannedMeal = (foodItem: FoodItem) => {
    // Switch to tracker so user can see it logged
    setActiveTab('tracker');
  };

  const cartTotalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FAFAF9] text-[#0F172A] flex flex-col font-sans selection:bg-amber-100 selection:text-amber-900 pb-16 md:pb-0">
      {/* Top Bar Contract Compliant Navigation */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        cartCount={cartTotalCount}
        onOpenCart={() => setIsCartOpen(true)}
        weddingModeActive={weddingModeActive}
        onToggleWeddingMode={() => setIsWeddingModalOpen(true)}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Editorial Hero Banner for Say No to Motapa */}
        <div className="border-b border-stone-200 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-xs text-amber-800 font-mono uppercase tracking-wider">
              <span>Say No to Motapa</span>
              <span aria-hidden="true">·</span>
              <span>AI Coach Majaz & Plate Scanner</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-display font-bold text-stone-900 tracking-tight leading-tight">
              Say No to Motapa.
            </h1>
            <p className="text-base text-stone-600 leading-relaxed">
              Western calorie counting fails Indian households. With <strong>Coach Majaz</strong> prescribing exactly what to eat and what exercise to do, and our <strong>AI Plate Scanner</strong> measuring calories & protein in every katori, staying fit is finally honest, doable, and fun.
            </p>
          </div>

          {/* Quick Stats Strip */}
          <div className="flex items-center gap-5 border-t md:border-t-0 md:border-l border-stone-200 pt-4 md:pt-0 md:pl-6 text-xs font-mono">
            <div>
              <div className="text-stone-400">Head Coach</div>
              <div className="font-semibold text-stone-900 text-sm mt-0.5">Coach Majaz</div>
            </div>
            <div className="border-l border-stone-200 pl-4">
              <div className="text-stone-400">Computer Vision</div>
              <div className="font-semibold text-stone-900 text-sm mt-0.5">Plate Scanner</div>
            </div>
            <div className="border-l border-stone-200 pl-4">
              <div className="text-stone-400">Daily Motapa</div>
              <div className="font-semibold text-emerald-700 text-sm mt-0.5">Defeated</div>
            </div>
          </div>
        </div>

        {/* View Switcher based on Active Tab */}
        {activeTab === 'scanner' && (
          <PlateScannerView onLogScannedMeal={handleLogScannedMeal} />
        )}

        {activeTab === 'majaz' && (
          <CoachMajazView />
        )}

        {activeTab === 'visualizer' && (
          <div className="space-y-8">
            <ThreeNutritionVisualizer
              weddingModeActive={weddingModeActive}
              onToggleWeddingMode={() => setIsWeddingModalOpen(true)}
            />

            {/* Feature Highlights adjacent to 3D */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-4">
              <div
                onClick={() => setActiveTab('scanner')}
                className="bg-white p-5 rounded-2xl border border-stone-200 hover:border-amber-400 shadow-sm transition-all cursor-pointer group"
              >
                <div className="text-xs font-mono text-amber-700 uppercase flex items-center gap-1.5">
                  <Scan className="w-3.5 h-3.5" />
                  <span>AI Plate Scanner</span>
                </div>
                <h3 className="text-base font-display font-semibold text-stone-900 mt-1 group-hover:text-amber-800 transition-colors">
                  Scan Any Meal Plate →
                </h3>
                <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                  Automatic detection of calories, protein, and Coach Majaz's exact workout to burn it.
                </p>
              </div>

              <div
                onClick={() => setActiveTab('majaz')}
                className="bg-white p-5 rounded-2xl border border-stone-200 hover:border-amber-400 shadow-sm transition-all cursor-pointer group"
              >
                <div className="text-xs font-mono text-amber-700 uppercase flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Dumbbell className="w-3.5 h-3.5" />
                    <span>Coach Majaz Hub</span>
                  </span>
                  <img
                    src="/coach_majaz.jpg"
                    alt="Coach Majaz"
                    className="w-5 h-5 rounded-full object-cover border border-amber-500"
                  />
                </div>
                <h3 className="text-base font-display font-semibold text-stone-900 mt-1 group-hover:text-amber-800 transition-colors">
                  Ask Coach Anything →
                </h3>
                <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                  Live chatbox with Coach Majaz for instant diet, protein, and home workout answers.
                </p>
              </div>

              <div
                onClick={() => setActiveTab('store')}
                className="bg-white p-5 rounded-2xl border border-stone-200 hover:border-amber-400 shadow-sm transition-all cursor-pointer group"
              >
                <div className="text-xs font-mono text-amber-700 uppercase flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Cooking Recipe Kits</span>
                </div>
                <h3 className="text-base font-display font-semibold text-stone-900 mt-1 group-hover:text-amber-800 transition-colors">
                  Diet Cooking Kits →
                </h3>
                <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                  Buy pre-measured recipe kits with step-by-step instructions and delicious diet food.
                </p>
              </div>

              <div
                onClick={() => setActiveTab('tracker')}
                className="bg-white p-5 rounded-2xl border border-stone-200 hover:border-amber-400 shadow-sm transition-all cursor-pointer group"
              >
                <div className="text-xs font-mono text-amber-700 uppercase flex items-center gap-1.5">
                  <Utensils className="w-3.5 h-3.5" />
                  <span>Indian Food Log</span>
                </div>
                <h3 className="text-base font-display font-semibold text-stone-900 mt-1 group-hover:text-amber-800 transition-colors">
                  Food Roast Tracker →
                </h3>
                <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                  Log Phulkas, Biryani, Chole Bhature with instant roasts and clinical damage control.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tracker' && (
          <FoodTrackerView
            weddingModeActive={weddingModeActive}
            onTriggerWeddingMode={() => setIsWeddingModalOpen(true)}
            onOpenCoachChatWithFood={handleOpenCoachChatWithFood}
          />
        )}

        {activeTab === 'blueprint' && (
          <ProductBlueprintView
            onTestInTracker={() => setActiveTab('tracker')}
            onTestInChat={() => setActiveTab('majaz')}
            onTriggerWeddingMode={() => setIsWeddingModalOpen(true)}
          />
        )}

        {activeTab === 'store' && (
          <MealKitsStoreView onAddToCart={handleAddToCart} />
        )}
      </main>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onClearCart={handleClearCart}
      />

      {/* Wedding Mode Modal */}
      <WeddingModeModal
        isOpen={isWeddingModalOpen}
        onClose={() => setIsWeddingModalOpen(false)}
        active={weddingModeActive}
        onToggleActive={() => setWeddingModeActive(!weddingModeActive)}
      />

      {/* Mobile Sticky Tab Bar */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-stone-200 px-2 py-2 flex items-center justify-around z-30 text-[11px] font-medium text-stone-600">
        <button
          onClick={() => setActiveTab('scanner')}
          className={`flex flex-col items-center gap-0.5 ${activeTab === 'scanner' ? 'text-amber-700 font-bold' : ''}`}
        >
          <Scan className="w-4 h-4" />
          <span>Scanner</span>
        </button>
        <button
          onClick={() => setActiveTab('majaz')}
          className={`flex flex-col items-center gap-0.5 ${activeTab === 'majaz' ? 'text-amber-700 font-bold' : ''}`}
        >
          <Dumbbell className="w-4 h-4" />
          <span>Coach Majaz</span>
        </button>
        <button
          onClick={() => setActiveTab('visualizer')}
          className={`flex flex-col items-center gap-0.5 ${activeTab === 'visualizer' ? 'text-amber-700 font-bold' : ''}`}
        >
          <Layers className="w-4 h-4" />
          <span>3D Studio</span>
        </button>
        <button
          onClick={() => setActiveTab('tracker')}
          className={`flex flex-col items-center gap-0.5 ${activeTab === 'tracker' ? 'text-amber-700 font-bold' : ''}`}
        >
          <Utensils className="w-4 h-4" />
          <span>Food Log</span>
        </button>
        <button
          onClick={() => setActiveTab('store')}
          className={`flex flex-col items-center gap-0.5 ${activeTab === 'store' ? 'text-amber-700 font-bold' : ''}`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Kits</span>
        </button>
      </div>

      {/* Editorial Minimalist Footer */}
      <footer className="border-t border-stone-200 mt-20 py-8 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 font-mono">
          <div>
            Say No to Motapa · Head Coach Majaz · Clinical Macro Science & Desi Humor.
          </div>
          <div className="flex items-center gap-4">
            <span>Motapa Status: 0% Allowed</span>
            <span>·</span>
            <span>Protein First</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
