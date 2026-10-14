/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Copy, Check, MessageSquare, Shield, Sparkles, BookOpen, Flame, Bell, HeartHandshake } from 'lucide-react';
import { NOTIFICATION_SPECS, GAMIFICATION_BADGES } from '../data/mockData.ts';

interface ProductBlueprintViewProps {
  onTestInTracker?: () => void;
  onTestInChat?: () => void;
  onTriggerWeddingMode?: () => void;
}

export const ProductBlueprintView: React.FC<ProductBlueprintViewProps> = ({
  onTestInTracker,
  onTestInChat,
  onTriggerWeddingMode
}) => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const handleCopy = (sectionId: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionId);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-16 py-8">
      {/* Blueprint Header */}
      <div className="border-b border-stone-200 pb-8">
        <div className="flex items-center gap-2 text-xs text-amber-700 font-mono uppercase tracking-wider mb-2">
          <span>Executive Product Specification</span>
          <span aria-hidden="true">·</span>
          <span>Version 1.0 Ready to Publish</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-display font-bold text-stone-900 tracking-tight">
          Say No to Motapa (Coach Majaz Edition)
        </h1>
        <p className="mt-3 text-lg text-stone-600 leading-relaxed max-w-3xl">
          The comprehensive design and comedy architecture blueprint for an Indian Diet & Nutrition platform that replaces Western diet-shaming with sharp cultural wit, empathetic psychology, and clinical macro precision.
        </p>

        {/* Quick Jump Bar */}
        <div className="mt-6 flex flex-wrap gap-2 text-xs">
          <a href="#tone-of-voice" className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-md transition-colors font-medium">
            1. Tone of Voice & Personality
          </a>
          <a href="#core-features" className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-md transition-colors font-medium">
            2. Feature Specs & UI Copy
          </a>
          <a href="#dialogue-script" className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-md transition-colors font-medium">
            3. Rahul's Maggi Dialogue
          </a>
          <a href="#gamification" className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-md transition-colors font-medium">
            4. Gamification & Visuals
          </a>
        </div>
      </div>

      {/* SECTION 1: Tone of Voice & Personality */}
      <section id="tone-of-voice" className="scroll-mt-24 space-y-8">
        <div className="flex items-center justify-between border-b border-stone-200 pb-3">
          <h2 className="text-2xl font-display font-semibold text-stone-900">
            01. Tone of Voice & Personality Guidelines
          </h2>
          <button
            onClick={() => handleCopy('tone', 'Tone of Voice: 40% Loving Desi Mom, 35% Sarcastic Gym Trainer, 25% Supportive Best Friend...')}
            className="flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-900"
          >
            {copiedSection === 'tone' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>Copy Guidelines</span>
          </button>
        </div>

        {/* The Persona Triad */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-3">
            <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-700 font-bold font-mono text-sm">
              40%
            </div>
            <h3 className="text-lg font-display font-semibold text-stone-900">The Loving Desi Mom</h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              Fiercely protective and deeply concerned about your health. Demands you eat your dal and drink water, but will emotionally corner you if you don't sleep early. Her weapon is caring guilt, never shame.
            </p>
            <div className="text-xs font-mono text-amber-800 bg-amber-50/70 p-2.5 rounded-lg">
              "Khao beta, but eat dal first. The world won't end if you leave half a puri."
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-3">
            <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center text-orange-700 font-bold font-mono text-sm">
              35%
            </div>
            <h3 className="text-lg font-display font-semibold text-stone-900">The Sarcastic Gym Trainer</h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              Calls out pseudo-fitness myths instantly. Smashes the delusion that a cup of warm green tea can magically dissolve 4 paneer kachoris. Keeps you honest with relentless, dry humor.
            </p>
            <div className="text-xs font-mono text-orange-800 bg-orange-50/70 p-2.5 rounded-lg">
              "You walked 12 minutes to the pastry shop. That is a commute, not cardio."
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-700 font-bold font-mono text-sm">
              25%
            </div>
            <h3 className="text-lg font-display font-semibold text-stone-900">The Empathetic Best Friend</h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              Never judges the midnight cheat meal or stress-eating session. Understands heartbreak, brutal workdays, and bad boss reviews. Steps in with immediate damage control math and reassurance.
            </p>
            <div className="text-xs font-mono text-emerald-800 bg-emerald-50/70 p-2.5 rounded-lg">
              "Life was heavy today. Eat the Maggi, sleep well. Tomorrow we reset at 8 AM."
            </div>
          </div>
        </div>

        {/* Cultural Humor Anchors */}
        <div className="bg-stone-100/70 rounded-2xl p-6 border border-stone-200 space-y-4">
          <h4 className="text-base font-semibold text-stone-900">Cultural Humor Anchors & Guardrails</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-stone-700">
            <div className="space-y-1">
              <span className="font-semibold text-stone-900">· Tinda vs. Paneer:</span>
              <p className="text-stone-600">Celebrate the daily culinary compromises of Indian homes without framing vegetable sabzis as torture.</p>
            </div>
            <div className="space-y-1">
              <span className="font-semibold text-stone-900">· The "Just One Bite" Jalebi Vortex:</span>
              <p className="text-stone-600">Acknowledge that Indian sweets defy classical thermodynamics; one piece always triggers three.</p>
            </div>
            <div className="space-y-1">
              <span className="font-semibold text-stone-900">· Rishtedaar Radar:</span>
              <p className="text-stone-600">Equip users with witty comebacks when relatives ask "Beta, why did you become so weak?" or "Are you not getting enough food in Bangalore?".</p>
            </div>
            <div className="space-y-1">
              <span className="font-semibold text-stone-900">· The Green Tea Delusion:</span>
              <p className="text-stone-600">Repeatedly remind users that green tea does not possess legal immunity against 3 butter chole bhature.</p>
            </div>
          </div>
        </div>

        {/* The Balance Formula */}
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-3">
          <h4 className="text-base font-semibold text-stone-900">The Empathy-Data Balance Protocol</h4>
          <p className="text-sm text-stone-600 leading-relaxed">
            When users log healthy meals, celebrate with familial pride. When users overeat or log heavy cheat meals, the app <strong>NEVER</strong> displays red danger warnings or negative score penalties. Instead, it follows a 3-step sequence:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs pt-2">
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
              <span className="font-bold text-stone-900 block mb-1">1. Laugh First</span>
              <p className="text-stone-600">Deliver an instant culturally resonant roast to defuse guilt and self-loathing.</p>
            </div>
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
              <span className="font-bold text-stone-900 block mb-1">2. State Honest Math</span>
              <p className="text-stone-600">Display the accurate calories and macros without distorting facts or lying.</p>
            </div>
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
              <span className="font-bold text-stone-900 block mb-1">3. Immediate Action Plan</span>
              <p className="text-stone-600">Provide 2 realistic, low-friction recovery actions (hydration + balanced next meal).</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Core Feature Specifications & Microcopy */}
      <section id="core-features" className="scroll-mt-24 space-y-8">
        <div className="flex items-center justify-between border-b border-stone-200 pb-3">
          <h2 className="text-2xl font-display font-semibold text-stone-900">
            02. Core Feature Specifications & Humorous UI Microcopy
          </h2>
          <div className="flex items-center gap-3">
            {onTestInTracker && (
              <button
                onClick={onTestInTracker}
                className="text-xs font-semibold text-amber-800 hover:text-amber-900 underline underline-offset-4"
              >
                Test in Live Food Log →
              </button>
            )}
          </div>
        </div>

        {/* Feature 1: Onboarding Screen */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-display font-semibold text-stone-900">
              Feature 1: Honest Onboarding & Weight Intake
            </h3>
            <span className="text-xs font-mono text-stone-500 uppercase">Screen 01 · Intake</span>
          </div>
          <p className="text-sm text-stone-600">
            Acknowledges the gap between user aspiration and digital honesty during initial sign-up.
          </p>
          <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-3 font-mono text-xs">
            <div className="text-stone-500">// Header Title</div>
            <div className="text-stone-900 font-semibold font-sans text-sm">"Enter Your Weight"</div>
            <div className="text-stone-500">// Subtitle Microcopy</div>
            <div className="text-amber-900 font-sans italic bg-amber-50 p-2.5 rounded-lg border border-amber-200/60">
              "Be honest beta. Is this your real weight today, your optimistic Aadhaar card weight, or the weight you told your matrimonial profile biodata?"
            </div>
            <div className="text-stone-500">// Goal Selection Options</div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-sans">
              <div className="p-2.5 bg-white border border-stone-200 rounded-lg text-stone-800 text-xs">
                <strong>1. Lose Weight:</strong> "Fit into my old college jeans without exhaling"
              </div>
              <div className="p-2.5 bg-white border border-stone-200 rounded-lg text-stone-800 text-xs">
                <strong>2. Build Muscle:</strong> "Look like Hrithik without drinking chalky protein shakes"
              </div>
              <div className="p-2.5 bg-white border border-stone-200 rounded-lg text-stone-800 text-xs">
                <strong>3. Wedding Season Defense:</strong> "Survive 5 consecutive buffet receptions without Chachi's commentary"
              </div>
            </div>
          </div>
        </div>

        {/* Feature 2: The Calorie Tracker (Ghar ka Khaana vs Cheat Meals) */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-display font-semibold text-stone-900">
              Feature 2: The Calorie Tracker (Ghar ka Khaana vs Cheat Meals)
            </h3>
            <span className="text-xs font-mono text-stone-500 uppercase">Screen 02 · Reaction Engine</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Ghar Ka Khaana Card */}
            <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40 space-y-2">
              <div className="flex items-center gap-2 text-emerald-800 font-semibold text-xs uppercase font-mono">
                <span>When User Logs Ghar Ka Khaana</span>
              </div>
              <div className="text-xs text-stone-600">Sample: 2 Phulkas + Lauki Sabzi + Dal (385 kcal)</div>
              <div className="bg-white p-3 rounded-lg border border-emerald-100 text-stone-800 text-xs leading-relaxed italic">
                "Wah beta! Mummy would shed a single tear of joy. Clean 385 kcal. You have officially earned 15 minutes of guilt-free Instagram scrolling."
              </div>
            </div>

            {/* Cheat Meal Card */}
            <div className="p-4 rounded-xl border border-orange-200 bg-orange-50/40 space-y-2">
              <div className="flex items-center gap-2 text-orange-800 font-semibold text-xs uppercase font-mono">
                <span>When User Logs Cheat Meal</span>
              </div>
              <div className="text-xs text-stone-600">Sample: Chole Bhature + Lassi (890 kcal)</div>
              <div className="bg-white p-3 rounded-lg border border-orange-100 text-stone-800 text-xs leading-relaxed italic">
                "Emergency alert: Bhatura detected. The oil content could lubricate an entire 1998 Maruti 800. Total: 890 kcal. Do NOT panic, do NOT skip dinner. Take a 25-minute walk and forgive yourself."
              </div>
            </div>
          </div>
        </div>

        {/* Feature 3: Water Reminder Notifications */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-display font-semibold text-stone-900">
              Feature 3: Humorous Push Notifications
            </h3>
            <span className="text-xs font-mono text-stone-500 uppercase">Screen 03 · Push Dispatch</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {NOTIFICATION_SPECS.map((notif) => (
              <div key={notif.id} className="p-4 rounded-xl border border-stone-200 bg-stone-50 space-y-2">
                <div className="flex items-center justify-between text-xs text-stone-500 font-mono">
                  <span>{notif.category}</span>
                  <span>{notif.scheduledTime}</span>
                </div>
                <div className="text-sm font-semibold text-stone-900">{notif.title}</div>
                <p className="text-xs text-stone-700 leading-relaxed">{notif.body}</p>
                <div className="text-[11px] text-stone-500 italic pt-1">
                  Trigger: {notif.comedicTrigger}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feature 4: Cheat Day Mode (Indian Wedding Trigger) */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-display font-semibold text-stone-900">
              Feature 4: Wedding Season Cheat Mode ("Shaadi Survival")
            </h3>
            <button
              onClick={onTriggerWeddingMode}
              className="px-3 py-1 bg-amber-600 text-white text-xs font-medium rounded-lg hover:bg-amber-700 transition-colors"
            >
              Trigger Wedding Mode UI
            </button>
          </div>
          <p className="text-sm text-stone-600">
            A dedicated state switch that overrides standard restriction warnings with realistic party strategy and damage control tactics.
          </p>
          <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-2 text-xs text-stone-700">
            <div className="font-semibold text-stone-900">The 4-Step Sangeet Buffet Protocol:</div>
            <ul className="space-y-1.5 list-disc list-inside text-stone-600">
              <li><strong>Tandoori First:</strong> Fill 50% of your plate with Paneer Tikka or Tandoori Chicken skewers before approaching the carb stalls.</li>
              <li><strong>The 1-Gulab Jamun Cap:</strong> You are allowed exactly 1 hot gulab jamun. If someone offers you a second, blame your horoscope.</li>
              <li><strong>Naan Rationing:</strong> Share 1 butter naan between 3 people. Nobody needs a solitary 400 kcal flour blanket.</li>
              <li><strong>Dance Off The Chaat:</strong> 30 minutes of energetic Baraat dancing burns ~220 kcal. Keep dancing.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 3: Sample User Flow & Dialogue Script */}
      <section id="dialogue-script" className="scroll-mt-24 space-y-8">
        <div className="flex items-center justify-between border-b border-stone-200 pb-3">
          <h2 className="text-2xl font-display font-semibold text-stone-900">
            03. Sample User Flow & Dialogue Script
          </h2>
          <div className="flex items-center gap-3">
            {onTestInChat && (
              <button
                onClick={onTestInChat}
                className="text-xs font-semibold text-amber-800 hover:text-amber-900 underline underline-offset-4"
              >
                Simulate Dialogue Live →
              </button>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-4">
          <div className="text-xs font-mono text-stone-500 uppercase">
            Scenario: Bushra logs a late-night Dum Biryani session at 11:30 PM on Sunday
          </div>

          {/* Script View */}
          <div className="space-y-4 font-sans text-sm">
            <div className="p-3 bg-stone-100 rounded-xl max-w-xl text-stone-700">
              <span className="text-xs font-mono font-bold text-stone-500 block mb-1">BUSHRA [11:30 PM]</span>
              *Searches and logs: Chicken Dum Biryani (with fried onions, Burani raita, and sweet gulab jamun)*
            </div>

            <div className="p-4 bg-amber-50/70 border border-amber-200/70 rounded-xl max-w-xl text-stone-900 ml-auto space-y-2">
              <span className="text-xs font-mono font-bold text-amber-800 block">COACH MAJAZ [11:31 PM]</span>
              <p className="leading-relaxed">
                "Bushra... it is 11:30 PM on a Sunday night. Tomorrow morning was your sacred 'Strict Clean Diet Monday' declaration! The saffron aroma, ghee-soaked basmati rice, and fried golden onions can be smelled across the entire city. Tell me honestly before I inspect the delivery bill: was it a modest single plate or did you conquer the entire clay handi?"
              </p>
            </div>

            <div className="p-3 bg-stone-100 rounded-xl max-w-xl text-stone-700 space-y-1">
              <span className="text-xs font-mono font-bold text-stone-500 block mb-1">BUSHRA (User Choice Selected) [11:32 PM]</span>
              <p>"Coach Majaz, today was a brutal family gathering with relatives commenting on my life. My soul needed Biryani. Don't roast me please."</p>
            </div>

            <div className="p-4 bg-amber-50/70 border border-amber-200/70 rounded-xl max-w-xl text-stone-900 ml-auto space-y-2">
              <span className="text-xs font-mono font-bold text-amber-800 block">COACH MAJAZ [11:32 PM]</span>
              <p className="leading-relaxed">
                "Arre meri behan, come here. Rishtedaar comments are worse than 500 burpees. If a plate of fragrant biryani saved your mental sanity and protected your peace tonight, you take it. Savor every grain without crying."
              </p>
              <p className="leading-relaxed text-amber-950 font-medium">
                "Just promise me you won't surrender tomorrow. Tomorrow at 7:30 AM, you owe me 40 deep squats, a glass of warm lemon water, and a high-protein sprouts breakfast. Deal? Now close your food app and sleep peacefully."
              </p>
              <div className="pt-2 text-xs font-mono text-amber-800">
                ✓ Action: Logged 850 kcal · Guilt neutralized · 40 deep squats scheduled for morning.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: Visual & Gamification Design Ideas */}
      <section id="gamification" className="scroll-mt-24 space-y-8">
        <div className="flex items-center justify-between border-b border-stone-200 pb-3">
          <h2 className="text-2xl font-display font-semibold text-stone-900">
            04. Visual & Gamification Design Architecture
          </h2>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {GAMIFICATION_BADGES.map((badge) => (
            <div key={badge.id} className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-100/80 text-amber-800 flex items-center justify-center shrink-0 font-bold">
                <Sparkles className="w-5 h-5 text-amber-700" />
              </div>
              <div className="space-y-1 flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-semibold text-stone-900">{badge.title}</h4>
                  <span className="text-xs font-mono text-stone-500">{badge.hindiTitle}</span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">{badge.description}</p>
                <div className="text-[11px] text-amber-900 bg-amber-50/60 p-1.5 rounded mt-2 font-mono">
                  {badge.rewardText}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Aesthetic Description */}
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
          <h3 className="text-lg font-display font-semibold text-stone-900">
            Editorial Minimalist Design Language
          </h3>
          <p className="text-sm text-stone-600 leading-relaxed">
            Unlike cartoonish gamification apps with bouncy 3D pastels and noisy badge confetti, Diet Didi employs a <strong>clean, high-end editorial minimalist aesthetic</strong> (Playfair Display serif headlines, Plus Jakarta Sans controls, warm paper backdrops, hairline dividers, and disciplined Indian spice accents).
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-2">
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
              <span className="font-semibold text-stone-900 block mb-1">60% Canvas</span>
              <p className="text-stone-600">Crisp off-white / ivory canvas (`#FAFAF9`) offering quiet elegance.</p>
            </div>
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
              <span className="font-semibold text-stone-900 block mb-1">30% Structure</span>
              <p className="text-stone-600">Charcoal typography (`#0F172A`) and hairline `#E2E8F0` dividers.</p>
            </div>
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
              <span className="font-semibold text-stone-900 block mb-1">10% Spice Accent</span>
              <p className="text-stone-600">Warm saffron `#D97706` reserved strictly for primary user actions.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
