/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  Dumbbell,
  Utensils,
  Flame,
  Sparkles,
  Send,
  RefreshCw,
  CheckCircle2,
  ChevronRight,
  ShieldAlert,
  Award,
  MessageSquare,
  Bot,
  User,
  Zap,
  Info,
  Check,
  Camera,
  Image as ImageIcon
} from 'lucide-react';

interface WhatToEatSpec {
  breakfast: string;
  lunch: string;
  eveningSnack: string;
  dinner: string;
  dailyProteinTargetGrams: number;
  desiNutritionRule: string;
}

interface ExerciseRoutineItem {
  exercise: string;
  setsReps: string;
  targetMuscle: string;
  coachingCue: string;
}

interface WhatExerciseSpec {
  todayWorkoutTitle: string;
  routine: ExerciseRoutineItem[];
  cardioSteps: string;
  majazFormTip: string;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'majaz';
  text: string;
  time: string;
  quickTips?: string[];
  suggestedFollowUps?: string[];
}

export const CoachMajazView: React.FC = () => {
  // Coach Photo selection (both uploaded user photos)
  const [selectedPhoto, setSelectedPhoto] = useState<'kurta' | 'bearded'>('kurta');
  const coachPhotoMap = {
    kurta: {
      url: '/coach_majaz_kurta.jpg',
      label: 'White Kurta (Clean Shaven)'
    },
    bearded: {
      url: '/coach_majaz_bearded.jpg',
      label: 'Orange Tee (Bearded Beast Mode)'
    }
  };

  const currentCoachPhoto = coachPhotoMap[selectedPhoto].url;

  // Active User Configuration
  const [selectedGoal, setSelectedGoal] = useState<'fat_loss' | 'muscle_gain' | 'wedding_recomp' | 'sedentary_reset'>('fat_loss');
  const [weightInput, setWeightInput] = useState<string>('76');
  const [dietPref, setDietPref] = useState<'Halal / High-Protein' | 'Vegetarian' | 'Non-Vegetarian' | 'Eggetarian'>('Halal / High-Protein');
  const [activeTab, setActiveTab] = useState<'chat' | 'diet_plan' | 'workout_plan'>('chat');

  // Chatbox State
  const [inputMessage, setInputMessage] = useState<string>('');
  const [isSending, setIsSending] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'majaz',
      text: "Salaam! I am Coach Majaz. Head of Say No to Motapa! Ask me literally ANYTHING about your diet, workouts, calories, or how to avoid the family ghee trap. No excuses here — let's build your dream physique.",
      time: 'Just now',
      quickTips: [
        'Aim for 1.5g protein per kg of bodyweight',
        'Drink 3.5 liters of clean water daily',
        'Never skip morning movement'
      ],
      suggestedFollowUps: [
        'Can I eat Biryani after a workout?',
        'Give me a 15-min home workout with no weights'
      ]
    }
  ]);

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Sound effects generator
  const playSound = (type: 'send' | 'receive' | 'click') => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'send') {
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(700, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
        osc.start();
        osc.stop(ctx.currentTime + 0.08);
      } else if (type === 'receive') {
        osc.frequency.setValueAtTime(550, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);
        osc.start();
        osc.stop(ctx.currentTime + 0.12);
      } else {
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
        osc.start();
        osc.stop(ctx.currentTime + 0.04);
      }
    } catch {
      // Audio fallback
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isSending]);

  // Handle Send Chat
  const handleSendMessage = async (customPrompt?: string) => {
    const textToSend = customPrompt || inputMessage;
    if (!textToSend.trim() || isSending) return;

    playSound('send');
    const userMsg: ChatMessage = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text: textToSend,
      time: 'Just now'
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsSending(true);

    try {
      const response = await fetch('/api/majaz/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          userGoal: selectedGoal,
          currentWeight: `${weightInput}kg`,
          dietPreference: dietPref
        })
      });

      const res = await response.json();
      if (res.success && res.data) {
        playSound('receive');
        const coachMsg: ChatMessage = {
          id: `mjz_${Date.now()}`,
          sender: 'majaz',
          text: res.data.reply,
          time: 'Just now',
          quickTips: res.data.quickTips,
          suggestedFollowUps: res.data.suggestedFollowUps
        };
        setMessages((prev) => [...prev, coachMsg]);
      } else {
        throw new Error('API returned unsuccessful');
      }
    } catch (err) {
      playSound('receive');
      const fallbackMsg: ChatMessage = {
        id: `mjz_${Date.now()}`,
        sender: 'majaz',
        text: `Salaam! Coach Majaz here. Regarding "${textToSend}": Remember, consistency is king. Drink 400ml water right now, hit your protein target today, and owe me 30 deep squats and a 20-minute brisk walk. Say No to Motapa!`,
        time: 'Just now',
        quickTips: [
          'Prioritize 25g+ protein at your next meal',
          'Avoid sweet beverages and late-night snacking',
          'Get 8,000 brisk steps before sunset'
        ],
        suggestedFollowUps: [
          'What should I eat for dinner tonight?',
          'How to stop cravings after 10 PM?'
        ]
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsSending(false);
    }
  };

  // Structured Diet & Workout Protocol States
  const [dietPlan, setDietPlan] = useState<WhatToEatSpec>({
    breakfast: '3 Egg Whites + 1 Whole Egg Bhurji OR 120g fresh Paneer tossed with cumin & green chilies, 1 multigrain toast, 1 glass warm lemon water (26g Protein)',
    lunch: '2 Whole Wheat Phulkas (dry, zero ghee pool), 1 large bowl Tadka Dal (sprouted moong/arhar), 1 katori Lauki/Tinda sabzi, 1 katori chilled curd (24g Protein)',
    eveningSnack: '1 big bowl dry-roasted Makhana with black salt & roasted jeera. If colleagues offer samosas, look them dead in the eye and say "Coach Majaz is watching".',
    dinner: '150g Grilled Chicken Breast or Sautéed Paneer/Tofu with capsicum & broccoli, accompanied by fresh cucumber salad (28g Protein)',
    dailyProteinTargetGrams: 85,
    desiNutritionRule: 'Never skip protein at breakfast. A high-carb breakfast triggers blood sugar spikes, making you crave sweet chai and fried snacks by 11:30 AM.'
  });

  const [exercisePlan, setExercisePlan] = useState<WhatExerciseSpec>({
    todayWorkoutTitle: "Coach Majaz's Anti-Motapa Strength & Calisthenics Routine",
    routine: [
      {
        exercise: 'Deep Bodyweight Squats (Baithaks)',
        setsReps: '4 sets x 25 reps',
        targetMuscle: 'Quads, Glutes & Core',
        coachingCue: 'Breathe in on the way down, explode upward. Heels stay planted like a banyan tree.'
      },
      {
        exercise: 'Push-Ups (Floor or Elevated)',
        setsReps: '3 sets x 15 reps',
        targetMuscle: 'Chest, Triceps & Anterior Deltoids',
        coachingCue: 'Elbows tucked in at 45 degrees. Do not allow your lower back to sag like an old hammock.'
      },
      {
        exercise: 'Dynamic Full-Body Mobility Flow',
        setsReps: '6 continuous rounds',
        targetMuscle: 'Full Body Mobility, Heart Rate & Core',
        coachingCue: 'Synchronize breath with each dynamic posture. High stamina, endurance and core stability.'
      },
      {
        exercise: 'Plank Hold with Knee Tucks',
        setsReps: '3 sets x 45-60 seconds',
        targetMuscle: 'Deep Core & Postural Abdominals',
        coachingCue: 'Squeeze glutes and keep your spine straight and tight.'
      }
    ],
    cardioSteps: '10,000 steps daily. Walk during business phone calls. Take stairs, not the lift.',
    majazFormTip: 'Form over ego. If your lower back arches, reduce speed and reset your core.'
  });

  const [isUpdatingProtocol, setIsUpdatingProtocol] = useState<boolean>(false);

  const handleUpdateProtocol = async () => {
    setIsUpdatingProtocol(true);
    playSound('click');
    try {
      const response = await fetch('/api/majaz/advice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userGoal: selectedGoal,
          currentWeight: `${weightInput}kg`,
          dietaryPreference: dietPref
        })
      });
      const res = await response.json();
      if (res.success && res.data) {
        if (res.data.whatToEat) setDietPlan(res.data.whatToEat);
        if (res.data.whatExerciseToDo) setExercisePlan(res.data.whatExerciseToDo);
      }
    } catch {
      // Keep verified plan
    } finally {
      setIsUpdatingProtocol(false);
    }
  };

  const quickQuestions = [
    '🔥 Can I eat Biryani after gym workout?',
    '🍗 Give me a high-protein Halal meal plan for today',
    '⏰ Midnight cravings strike! How to handle it?',
    '💪 15-minute home workout with zero equipment',
    '💧 How to reduce water retention & face bloat?',
    '☕ Can I drink Cutting Chai while on fat loss?'
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-6">
      {/* COACH MAJAZ PROFILE HERO CARD */}
      <div className="bg-stone-900 text-white rounded-3xl p-6 md:p-8 shadow-2xl border border-stone-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8 relative z-10">
          {/* Coach Majaz Real Photo Frame */}
          <div className="relative group shrink-0">
            <div className="w-36 h-36 md:w-44 md:h-44 rounded-3xl overflow-hidden border-2 border-amber-500 shadow-2xl ring-4 ring-amber-500/20 bg-stone-950">
              <img
                src={currentCoachPhoto}
                alt="Coach Majaz"
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Online Status Badge */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-stone-950/90 backdrop-blur-md border border-amber-500/40 px-3 py-1 rounded-full flex items-center gap-1.5 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold whitespace-nowrap">
                Coach Majaz · Active
              </span>
            </div>
          </div>

          {/* Coach Details & Bio */}
          <div className="space-y-3 text-center md:text-left flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono">
              <Award className="w-3.5 h-3.5" />
              <span>Head Fitness & Nutrition Coach · Say No to Motapa</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight">
              Coach Majaz
            </h1>

            <p className="text-stone-300 text-sm md:text-base leading-relaxed max-w-2xl italic font-sans">
              "Beta, scrolling fitness reels while eating biscuits burns exactly zero calories. Ask me anything about your food or workout right below, and let's get serious."
            </p>

            {/* Photo Selector Switcher */}
            <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-2">
              <span className="text-[11px] font-mono text-stone-400 uppercase tracking-wider">
                Coach Photo:
              </span>
              <button
                onClick={() => setSelectedPhoto('kurta')}
                className={`px-3 py-1 rounded-lg text-xs font-medium border transition-all flex items-center gap-1.5 ${
                  selectedPhoto === 'kurta'
                    ? 'bg-amber-600 border-amber-500 text-white shadow-md'
                    : 'bg-stone-800 border-stone-700 text-stone-300 hover:bg-stone-700'
                }`}
              >
                <span>⚪ White Kurta Look</span>
              </button>
              <button
                onClick={() => setSelectedPhoto('bearded')}
                className={`px-3 py-1 rounded-lg text-xs font-medium border transition-all flex items-center gap-1.5 ${
                  selectedPhoto === 'bearded'
                    ? 'bg-amber-600 border-amber-500 text-white shadow-md'
                    : 'bg-stone-800 border-stone-700 text-stone-300 hover:bg-stone-700'
                }`}
              >
                <span>🧔 Bearded Beast Mode</span>
              </button>
            </div>
          </div>

          {/* Quick Target Settings */}
          <div className="bg-stone-950/70 border border-stone-800 p-4 rounded-2xl space-y-3 w-full md:w-64 shrink-0 text-xs font-mono">
            <div className="text-stone-400 uppercase tracking-wider font-semibold border-b border-stone-800 pb-2 flex items-center justify-between">
              <span>Your Settings:</span>
              <span className="text-amber-400">Targeting Motapa</span>
            </div>

            <div className="space-y-1.5">
              <label className="text-stone-400 block text-[11px]">Your Current Weight (kg):</label>
              <input
                type="number"
                value={weightInput}
                onChange={(e) => setWeightInput(e.target.value)}
                className="w-full bg-stone-900 border border-stone-700 rounded-lg px-2.5 py-1.5 text-white font-bold focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-stone-400 block text-[11px]">Dietary Preference:</label>
              <select
                value={dietPref}
                onChange={(e) => setDietPref(e.target.value as any)}
                className="w-full bg-stone-900 border border-stone-700 rounded-lg px-2.5 py-1.5 text-white text-xs focus:border-amber-500 focus:outline-none"
              >
                <option value="Halal / High-Protein">Halal / High-Protein</option>
                <option value="Vegetarian">Vegetarian (Pure Desi)</option>
                <option value="Eggetarian">Eggetarian</option>
                <option value="Non-Vegetarian">Non-Vegetarian</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* NAVIGATION TABS FOR COACH MAJAZ */}
      <div className="flex border-b border-stone-200 gap-4 text-sm font-medium">
        <button
          onClick={() => setActiveTab('chat')}
          className={`pb-3 px-1 border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'chat'
              ? 'border-amber-600 text-amber-800 font-bold'
              : 'border-transparent text-stone-500 hover:text-stone-900'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Ask Coach Majaz (Chatbox)</span>
        </button>

        <button
          onClick={() => setActiveTab('diet_plan')}
          className={`pb-3 px-1 border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'diet_plan'
              ? 'border-amber-600 text-amber-800 font-bold'
              : 'border-transparent text-stone-500 hover:text-stone-900'
          }`}
        >
          <Utensils className="w-4 h-4" />
          <span>What to Eat Today ({dietPlan.dailyProteinTargetGrams}g Protein)</span>
        </button>

        <button
          onClick={() => setActiveTab('workout_plan')}
          className={`pb-3 px-1 border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'workout_plan'
              ? 'border-amber-600 text-amber-800 font-bold'
              : 'border-transparent text-stone-500 hover:text-stone-900'
          }`}
        >
          <Dumbbell className="w-4 h-4" />
          <span>What Exercise to Do (No Equipment)</span>
        </button>
      </div>

      {/* TAB 1: UNIVERSAL CHATBOX WITH COACH MAJAZ */}
      {activeTab === 'chat' && (
        <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden flex flex-col h-[650px]">
          {/* Chat Header */}
          <div className="p-4 bg-stone-50 border-b border-stone-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={currentCoachPhoto}
                alt="Coach Majaz"
                className="w-10 h-10 rounded-full object-cover border border-amber-500"
              />
              <div>
                <div className="font-bold text-stone-900 text-sm flex items-center gap-1.5">
                  <span>Coach Majaz Live</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                </div>
                <div className="text-[11px] font-mono text-stone-500">
                  Ask anything about workouts, diet, macros & cheat meal fixes
                </div>
              </div>
            </div>

            <div className="text-xs font-mono text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full hidden sm:block">
              Say No to Motapa
            </div>
          </div>

          {/* Quick Questions Carousel */}
          <div className="p-3 bg-stone-50/70 border-b border-stone-100 overflow-x-auto flex items-center gap-2 scrollbar-none">
            <span className="text-[11px] font-mono text-stone-400 shrink-0 uppercase tracking-wider pl-1">
              Quick Questions:
            </span>
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q)}
                disabled={isSending}
                className="text-xs whitespace-nowrap bg-white border border-stone-200 hover:border-amber-400 text-stone-700 hover:text-amber-900 px-3 py-1.5 rounded-full transition-all shadow-2xs hover:shadow-sm"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Chat Message Stream */}
          <div className="flex-1 p-4 md:p-6 overflow-y-auto space-y-4">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-3 max-w-2xl ${
                  m.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
                }`}
              >
                {m.sender === 'majaz' ? (
                  <img
                    src={currentCoachPhoto}
                    alt="Coach Majaz"
                    className="w-9 h-9 rounded-full object-cover shrink-0 border border-amber-500 self-end shadow-sm"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-stone-800 text-white flex items-center justify-center shrink-0 self-end text-xs font-bold font-mono">
                    ME
                  </div>
                )}

                <div className="space-y-2">
                  <div
                    className={`p-4 rounded-2xl text-sm leading-relaxed shadow-2xs ${
                      m.sender === 'user'
                        ? 'bg-amber-600 text-white rounded-br-none'
                        : 'bg-stone-50 text-stone-900 border border-stone-200/80 rounded-bl-none'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{m.text}</p>
                  </div>

                  {/* Actionable Coach Takeaways if present */}
                  {m.quickTips && m.quickTips.length > 0 && (
                    <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-3 text-xs space-y-1 text-stone-800">
                      <div className="font-bold text-amber-900 font-mono text-[11px] uppercase flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 text-amber-600" />
                        <span>Majaz Actionable Protocol:</span>
                      </div>
                      <ul className="list-disc list-inside space-y-0.5 text-stone-700">
                        {m.quickTips.map((tip, i) => (
                          <li key={i}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Follow Up Suggestions */}
                  {m.suggestedFollowUps && m.suggestedFollowUps.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {m.suggestedFollowUps.map((fu, fi) => (
                        <button
                          key={fi}
                          onClick={() => handleSendMessage(fu)}
                          className="text-[11px] font-sans bg-stone-100 hover:bg-stone-200 text-stone-700 px-2.5 py-1 rounded-md transition-colors"
                        >
                          → {fu}
                        </button>
                      ))}
                    </div>
                  )}

                  <div className={`text-[10px] font-mono text-stone-400 ${m.sender === 'user' ? 'text-right' : 'text-left'}`}>
                    {m.time}
                  </div>
                </div>
              </div>
            ))}

            {isSending && (
              <div className="flex gap-3 max-w-xl mr-auto items-end">
                <img
                  src={currentCoachPhoto}
                  alt="Coach Majaz"
                  className="w-9 h-9 rounded-full object-cover border border-amber-500 shadow-sm"
                />
                <div className="p-4 bg-stone-50 border border-stone-200 rounded-2xl rounded-bl-none flex items-center gap-2 text-xs font-mono text-stone-500">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-600" />
                  <span>Coach Majaz is reviewing your query & formulating instructions...</span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Chat Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 md:p-4 bg-stone-50 border-t border-stone-200 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask Coach Majaz anything (e.g. 'Can I eat biryani today?', 'Suggest a workout for belly fat')..."
              className="flex-1 bg-white border border-stone-300 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-amber-600 text-stone-900 placeholder-stone-400 shadow-2xs"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isSending}
              className="px-5 py-3 bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white font-bold text-xs rounded-2xl flex items-center gap-2 transition-all shadow-md shadow-amber-600/20 shrink-0"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Ask Coach</span>
            </button>
          </form>
        </div>
      )}

      {/* TAB 2: WHAT TO EAT PROTOCOL */}
      {activeTab === 'diet_plan' && (
        <div className="bg-white rounded-3xl border border-stone-200 p-6 md:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-5">
            <div>
              <div className="text-xs font-mono text-amber-800 uppercase tracking-widest font-semibold">
                Nutritional Blueprint
              </div>
              <h3 className="text-2xl font-display font-bold text-stone-900 mt-0.5">
                What to Eat Today ({dietPlan.dailyProteinTargetGrams}g Protein Target)
              </h3>
            </div>

            <button
              onClick={handleUpdateProtocol}
              disabled={isUpdatingProtocol}
              className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-mono rounded-xl flex items-center gap-2 transition-all"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isUpdatingProtocol ? 'animate-spin' : ''}`} />
              <span>Regenerate Meal Protocol</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200/80 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-stone-800">
                <span>01. BREAKFAST (08:30 AM)</span>
                <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  High Satiety
                </span>
              </div>
              <p className="text-xs text-stone-700 leading-relaxed font-sans">{dietPlan.breakfast}</p>
            </div>

            <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200/80 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-stone-800">
                <span>02. LUNCH (01:30 PM)</span>
                <span className="text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  Controlled Carbs
                </span>
              </div>
              <p className="text-xs text-stone-700 leading-relaxed font-sans">{dietPlan.lunch}</p>
            </div>

            <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200/80 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-stone-800">
                <span>03. 4:00 PM CRAVING SHIELD</span>
                <span className="text-orange-700 bg-orange-50 px-2 py-0.5 rounded border border-orange-200">
                  Anti-Samosa
                </span>
              </div>
              <p className="text-xs text-stone-700 leading-relaxed font-sans">{dietPlan.eveningSnack}</p>
            </div>

            <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200/80 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-stone-800">
                <span>04. DINNER (08:00 PM)</span>
                <span className="text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  Lean Recovery
                </span>
              </div>
              <p className="text-xs text-stone-700 leading-relaxed font-sans">{dietPlan.dinner}</p>
            </div>
          </div>

          <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 text-xs space-y-1.5">
            <div className="font-semibold text-amber-900 flex items-center gap-1.5 font-mono uppercase">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-700" />
              <span>Coach Majaz's Golden Law:</span>
            </div>
            <p className="text-stone-800 leading-relaxed italic">"{dietPlan.desiNutritionRule}"</p>
          </div>
        </div>
      )}

      {/* TAB 3: WHAT EXERCISE TO DO PROTOCOL */}
      {activeTab === 'workout_plan' && (
        <div className="bg-white rounded-3xl border border-stone-200 p-6 md:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-5">
            <div>
              <div className="text-xs font-mono text-amber-800 uppercase tracking-widest font-semibold">
                Physical Labor Assignment
              </div>
              <h3 className="text-2xl font-display font-bold text-stone-900 mt-0.5">
                {exercisePlan.todayWorkoutTitle}
              </h3>
            </div>

            <div className="text-xs font-mono text-stone-500 bg-stone-100 px-3 py-1.5 rounded-xl">
              Daily Target: 10,000 Steps
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {exercisePlan.routine.map((ex, idx) => (
              <div key={idx} className="p-5 bg-stone-50 rounded-2xl border border-stone-200/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-stone-900 text-sm">{ex.exercise}</span>
                  <span className="text-xs font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    {ex.setsReps}
                  </span>
                </div>
                <div className="text-xs font-mono text-stone-500">
                  Target: <strong className="text-stone-700">{ex.targetMuscle}</strong>
                </div>
                <p className="text-xs text-stone-600 italic bg-white p-2.5 rounded-xl border border-stone-100">
                  "{ex.coachingCue}"
                </p>
              </div>
            ))}
          </div>

          <div className="bg-stone-900 text-white rounded-2xl p-5 space-y-2 shadow-md">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-wider">
              <Dumbbell className="w-3.5 h-3.5 text-amber-400" />
              <span>Coach Majaz's Form Rule:</span>
            </div>
            <p className="text-xs text-stone-300 leading-relaxed italic">
              "{exercisePlan.majazFormTip}"
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
