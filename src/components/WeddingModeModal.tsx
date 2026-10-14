/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Sparkles, Check, PartyPopper, Music, Shield } from 'lucide-react';
import confetti from 'canvas-confetti';

interface WeddingModeModalProps {
  isOpen: boolean;
  onClose: () => void;
  active: boolean;
  onToggleActive: () => void;
}

export const WeddingModeModal: React.FC<WeddingModeModalProps> = ({
  isOpen,
  onClose,
  active,
  onToggleActive
}) => {
  const [gulabJamunCount, setGulabJamunCount] = useState<number>(1);
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({
    step1: true,
    step2: false,
    step3: false,
    step4: false
  });

  if (!isOpen) return null;

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#F59E0B', '#D97706', '#EC4899', '#CA8A04']
    });
  };

  const handleToggleMode = () => {
    onToggleActive();
    if (!active) {
      triggerConfetti();
    }
  };

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl border border-stone-200 shadow-2xl max-w-xl w-full p-6 md:p-8 space-y-6 relative overflow-hidden">
        {/* Festive Ambient Background Glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-amber-200/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-pink-200/40 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 text-stone-400 hover:text-stone-900 rounded-full hover:bg-stone-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono text-amber-700 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Shaadi Protocol v2.4</span>
          </div>
          <h2 className="text-2xl font-display font-bold text-stone-900">
            Wedding Season Cheat Mode
          </h2>
          <p className="text-xs text-stone-600 leading-relaxed">
            The Sangeet buffet is an emotional obstacle course of Dal Makhani, Paneer Pasanda, and aunties offering sweets. We don't forbid indulgence; we execute tactical damage control.
          </p>
        </div>

        {/* Mode Toggle Button */}
        <div className="p-4 bg-stone-50 border border-stone-200 rounded-2xl flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold text-stone-900">
              {active ? '🎉 Shaadi Mode is ON' : 'Shaadi Mode is Standby'}
            </div>
            <div className="text-xs text-stone-500 font-mono">
              {active ? 'Daily budget adjusted to 2,600 kcal' : 'Standard budget: 2,000 kcal'}
            </div>
          </div>

          <button
            onClick={handleToggleMode}
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all shadow-sm ${
              active
                ? 'bg-amber-600 text-white hover:bg-amber-700'
                : 'bg-stone-900 text-white hover:bg-stone-800'
            }`}
          >
            {active ? 'Deactivate' : 'Activate Mode'}
          </button>
        </div>

        {/* Gulab Jamun Meter */}
        <div className="bg-amber-50/70 border border-amber-200/80 p-4 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-xs font-medium text-amber-900">
            <span>Gulab Jamun Meter (Strict 1-Piece Cap)</span>
            <span className="font-mono tabular-nums">{gulabJamunCount} / 1 Eaten</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setGulabJamunCount(Math.max(0, gulabJamunCount - 1))}
              className="px-3 py-1 bg-white border border-amber-300 rounded-lg text-xs font-bold text-amber-900"
            >
              -
            </button>
            <span className="font-mono text-base font-bold text-amber-950 px-2">{gulabJamunCount}</span>
            <button
              onClick={() => {
                setGulabJamunCount(gulabJamunCount + 1);
                if (gulabJamunCount >= 1) {
                  alert("⚠️ Diet Didi Alert: That second gulab jamun will require 25 minutes of continuous Bhangra to neutralize!");
                }
              }}
              className="px-3 py-1 bg-white border border-amber-300 rounded-lg text-xs font-bold text-amber-900"
            >
              +
            </button>
            <span className="text-xs text-stone-600 italic ml-2">
              {gulabJamunCount <= 1
                ? 'Approved by Diet Didi. Savor every drop.'
                : 'Over the limit! Begin emergency Baraat dancing.'}
            </span>
          </div>
        </div>

        {/* Damage Control Checklist */}
        <div className="space-y-3">
          <h4 className="text-xs font-mono uppercase text-stone-500 tracking-wider">
            Buffet Damage Control Checklist
          </h4>
          <div className="space-y-2 text-xs">
            <label
              onClick={() => toggleCheck('step1')}
              className="flex items-center gap-3 p-3 bg-stone-50 border border-stone-200 rounded-xl cursor-pointer hover:bg-stone-100 transition-colors"
            >
              <input
                type="checkbox"
                checked={checkedItems['step1'] || false}
                readOnly
                className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500"
              />
              <span className="text-stone-800">
                <strong>Plate 1 is Protein:</strong> Filled 50% plate with Paneer Tikka & Chicken Skewers before touching naan.
              </span>
            </label>

            <label
              onClick={() => toggleCheck('step2')}
              className="flex items-center gap-3 p-3 bg-stone-50 border border-stone-200 rounded-xl cursor-pointer hover:bg-stone-100 transition-colors"
            >
              <input
                type="checkbox"
                checked={checkedItems['step2'] || false}
                readOnly
                className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500"
              />
              <span className="text-stone-800">
                <strong>Naan Rationing:</strong> Split 1 butter naan with cousins instead of eating a whole one solo.
              </span>
            </label>

            <label
              onClick={() => toggleCheck('step3')}
              className="flex items-center gap-3 p-3 bg-stone-50 border border-stone-200 rounded-xl cursor-pointer hover:bg-stone-100 transition-colors"
            >
              <input
                type="checkbox"
                checked={checkedItems['step3'] || false}
                readOnly
                className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500"
              />
              <span className="text-stone-800">
                <strong>Baraat Cardio:</strong> Completed at least 25 minutes of non-stop dance near the Dhol.
              </span>
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 flex items-center justify-between">
          <button
            onClick={triggerConfetti}
            className="flex items-center gap-1.5 text-xs text-amber-800 font-semibold hover:text-amber-900"
          >
            <PartyPopper className="w-4 h-4" />
            <span>Celebrate Survival</span>
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-stone-900 text-white text-xs font-semibold rounded-xl hover:bg-stone-800"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
