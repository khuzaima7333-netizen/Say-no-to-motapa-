/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Send, Sparkles, MessageCircle, RefreshCw, Heart, User, CheckCircle2 } from 'lucide-react';
import { ChatMessage } from '../types/index.ts';
import { BUSHRA_BIRYANI_CHAT_HISTORY } from '../data/mockData.ts';

interface CoachChatViewProps {
  initialFoodPrompt?: string | null;
}

export const CoachChatView: React.FC<CoachChatViewProps> = ({ initialFoodPrompt }) => {
  const [coachPersona, setCoachPersona] = useState<'didi' | 'sharma'>('didi');
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    return [
      {
        id: 'msg_1',
        sender: 'user',
        text: 'Logged: Chicken Dum Biryani (Extra spicy + Burani Raita + Mirchi Ka Salan) — 11:30 PM',
        timestamp: '11:30 PM'
      },
      {
        id: 'msg_2',
        sender: 'coach',
        coachName: 'Coach Majaz (Say No to Motapa)',
        text: "Bushra... it is 11:30 PM on a Sunday night. Tomorrow morning was your sacred 'Strict Clean Diet Monday' declaration! The saffron aroma, ghee-soaked basmati rice, and fried golden onions can be smelled across the entire city. Tell me honestly before I inspect the delivery bill: was it a modest single plate or did you conquer the entire clay handi?",
        timestamp: '11:31 PM',
        quickChoices: [
          {
            id: 'c1',
            userText: 'Coach Majaz, just half a plate! I swear on my gym membership and my weighing scale!',
            coachResponse: "Achaa ji? And the tender potato and fried onions? Did those just vanish by magic into thin air? Listen: 36g protein is great, but 850 calories at 11:30 PM means tomorrow morning you owe me 45 deep squats and 10,000 steps before lunch. Drink 400ml warm water right now. Deal?",
            actionGuidance: 'High-carb night: drink 400ml water to balance sodium. Do not starve tomorrow.'
          },
          {
            id: 'c2',
            userText: 'Full handi... plus two warm gulab jamuns in syrup. Majaz, please don\'t roast me into oblivion.',
            coachResponse: "Full handi AND gulab jamun?! Bushra, that rice could fuel an entire cricket team for a five-day test match! But listen carefully: guilt and crying burn exactly zero calories. Savor every grain, forgive yourself, do 15 minutes of slow pacing right now, and tomorrow we crush cardio at 7 AM.",
            actionGuidance: 'Immediate damage control: 15-minute gentle pacing. Drink warm lemon water tomorrow.'
          },
          {
            id: 'c3',
            userText: 'Coach Majaz, today was a brutal family gathering with relatives commenting on my life. My soul needed Biryani.',
            coachResponse: "Arre meri behan, come here. Rishtedaar comments are worse than 500 burpees. If a plate of fragrant biryani saved your mental sanity and protected your peace tonight, you take it. Your fitness isn't ruined by one Sunday biryani; it breaks only if you surrender on Monday. Sleep peacefully, tomorrow we conquer!",
            actionGuidance: 'Emotional stress validated. Sleep well. Hydration + high-protein sprouts breakfast scheduled.'
          }
        ]
      }
    ];
  });

  const [inputMessage, setInputMessage] = useState<string>(initialFoodPrompt ? `I just ate ${initialFoodPrompt}. How bad is it?` : '');

  const handleSelectChoice = (choice: any) => {
    const userMsg: ChatMessage = {
      id: `user_${Date.now()}`,
      sender: 'user',
      text: choice.userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const coachMsg: ChatMessage = {
      id: `coach_${Date.now() + 1}`,
      sender: 'coach',
      coachName: coachPersona === 'didi' ? 'Diet Didi' : 'Calorie Sharma',
      text: choice.coachResponse,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg, coachMsg]);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userText = inputMessage.trim();
    const userMsg: ChatMessage = {
      id: `user_${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Generate witty culturally authentic coach reply
    let reply = '';
    const lower = userText.toLowerCase();

    if (lower.includes('roti') || lower.includes('mummy') || lower.includes('mom')) {
      reply = coachPersona === 'didi'
        ? "Mummy is offering a 3rd roti with ghee? Listen beta: tell her 'Mummy, your food is so powerful that 2 rotis already gave me energy for 3 days.' Praise her cooking, touch her feet, and subtly pass the roti to your younger sibling."
        : "Hold the line! A 3rd roti with a tablespoon of desi ghee adds an extra 240 calories of pure carbs and saturated fats. Say no politely. Your biceps don't care about emotional blackmail.";
    } else if (lower.includes('samosa') || lower.includes('chai')) {
      reply = coachPersona === 'didi'
        ? "The 4 PM office samosa... classic trap! The green tea you drink afterwards doesn't have a vacuum cleaner attached to it. Drink 500ml water and eat a light dinner with cucumber raita."
        : "530 kcal of deep-fried refined maida. That requires 55 minutes on the stairmaster to burn off. Don't skip meals in panic, just double your water intake and walk 4,000 steps tonight.";
    } else if (lower.includes('shaadi') || lower.includes('wedding') || lower.includes('buffet')) {
      reply = coachPersona === 'didi'
        ? "Wedding season rule #1: Fill half your plate with paneer tikka or tandoori chicken skewers first. Enjoy exactly ONE hot gulab jamun, and dance for 30 minutes in the Baraat to burn it off!"
        : "Wedding protocol: Hit the protein stations hard. Avoid the butter naan blanket. If someone insists you drink sweet rooh afza, pretend you have a Zoom call.";
    } else {
      reply = coachPersona === 'didi'
        ? `I hear you, beta. Here is Diet Didi's verdict: do not stress over perfection. Indian food is about balance, not starvation. Drink 2 glasses of water, keep moving, and let's make the next meal clean and colorful!`
        : `Calorie Sharma speaking: Consistency beats perfection every single day. Don't overthink it, hit your protein goals, and stop looking at the pastry showcase.`;
    }

    const coachMsg: ChatMessage = {
      id: `coach_${Date.now() + 1}`,
      sender: 'coach',
      coachName: coachPersona === 'didi' ? 'Diet Didi' : 'Calorie Sharma',
      text: reply,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg, coachMsg]);
    setInputMessage('');
  };

  const handleResetToBushraScript = () => {
    setMessages([
      {
        id: 'msg_1',
        sender: 'user',
        text: 'Logged: Chicken Dum Biryani (Extra spicy + Burani Raita + Mirchi Ka Salan) — 11:30 PM',
        timestamp: '11:30 PM'
      },
      {
        id: 'msg_2',
        sender: 'coach',
        coachName: 'Coach Majaz (Say No to Motapa)',
        text: "Bushra... it is 11:30 PM on a Sunday night. Tomorrow morning was your sacred 'Strict Clean Diet Monday' declaration! The saffron aroma, ghee-soaked basmati rice, and fried golden onions can be smelled across the entire city. Tell me honestly before I inspect the delivery bill: was it a modest single plate or did you conquer the entire clay handi?",
        timestamp: '11:31 PM',
        quickChoices: [
          {
            id: 'c1',
            userText: 'Coach Majaz, just half a plate! I swear on my gym membership and my weighing scale!',
            coachResponse: "Achaa ji? And the tender potato and fried onions? Did those just vanish by magic into thin air? Listen: 36g protein is great, but 850 calories at 11:30 PM means tomorrow morning you owe me 45 deep squats and 10,000 steps before lunch. Drink 400ml warm water right now. Deal?",
            actionGuidance: 'High-carb night: drink 400ml water to balance sodium.'
          },
          {
            id: 'c2',
            userText: 'Full handi... plus two warm gulab jamuns in syrup. Majaz, please don\'t roast me into oblivion.',
            coachResponse: "Full handi AND gulab jamun?! Bushra, that rice could fuel an entire cricket team for a five-day test match! But listen carefully: guilt and crying burn exactly zero calories. Savor every grain, forgive yourself, do 15 minutes of slow pacing right now, and tomorrow we crush cardio at 7 AM.",
            actionGuidance: 'Immediate damage control: 15-minute gentle pacing. Drink warm lemon water tomorrow.'
          },
          {
            id: 'c3',
            userText: 'Coach Majaz, today was a brutal family gathering with relatives commenting on my life. My soul needed Biryani.',
            coachResponse: "Arre meri behan, come here. Rishtedaar comments are worse than 500 burpees. If a plate of fragrant biryani saved your mental sanity and protected your peace tonight, you take it. Your fitness isn't ruined by one Sunday biryani; it breaks only if you surrender on Monday. Sleep peacefully, tomorrow we conquer!",
            actionGuidance: 'Emotional stress validated. Sleep well. Hydration + high-protein sprouts breakfast scheduled.'
          }
        ]
      }
    ]);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-6">
      {/* Top Header & Persona Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-5">
        <div>
          <h2 className="text-2xl font-display font-bold text-stone-900">
            Interactive AI Coach Simulator
          </h2>
          <p className="text-xs text-stone-500">
            Experience sharp, witty Indian diet coaching without demotivation or calorie guilt.
          </p>
        </div>

        {/* Coach Persona Switcher */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-xl text-xs">
            <button
              onClick={() => setCoachPersona('didi')}
              className={`px-3 py-1.5 font-medium rounded-lg transition-colors ${
                coachPersona === 'didi'
                  ? 'bg-white text-stone-900 shadow-sm font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Diet Didi (Loving Desi Mom)
            </button>
            <button
              onClick={() => setCoachPersona('sharma')}
              className={`px-3 py-1.5 font-medium rounded-lg transition-colors ${
                coachPersona === 'sharma'
                  ? 'bg-white text-stone-900 shadow-sm font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Calorie Sharma (Sarcastic Trainer)
            </button>
          </div>

          <button
            onClick={handleResetToBushraScript}
            className="p-2 text-stone-500 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors"
            title="Reset to Bushra's Late-Night Biryani script"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Preset Scenario Quick-Links */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="text-stone-500 font-mono">Test Scenarios:</span>
        <button
          onClick={handleResetToBushraScript}
          className="px-2.5 py-1 bg-amber-50 text-amber-900 border border-amber-200/70 rounded-lg hover:bg-amber-100 transition-colors"
        >
          🍗 Bushra's Late-Night Biryani (11:30 PM)
        </button>
        <button
          onClick={() => setInputMessage("Mummy is forcing a 3rd roti with a big spoon of ghee. What do I say?")}
          className="px-2.5 py-1 bg-stone-100 text-stone-800 rounded-lg hover:bg-stone-200 transition-colors"
        >
          🫓 Mummy's 3rd Roti Pressure
        </button>
        <button
          onClick={() => setInputMessage("I ate 2 samosas at 4 PM office meeting. Is my entire week ruined?")}
          className="px-2.5 py-1 bg-stone-100 text-stone-800 rounded-lg hover:bg-stone-200 transition-colors"
        >
          🥟 4 PM Office Samosa Guilt
        </button>
        <button
          onClick={() => setInputMessage("How do I survive the Sangeet wedding buffet tomorrow without gaining 2kg?")}
          className="px-2.5 py-1 bg-stone-100 text-stone-800 rounded-lg hover:bg-stone-200 transition-colors"
        >
          🎉 Sangeet Wedding Buffet Strategy
        </button>
      </div>

      {/* Chat Thread */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm flex flex-col h-[520px]">
        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div key={msg.id} className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1.5`}>
                <div className="flex items-center gap-2 text-[11px] text-stone-400 font-mono">
                  <span>{isUser ? 'Bushra (User)' : (msg.coachName || 'Coach Majaz')}</span>
                  <span>·</span>
                  <span>{msg.timestamp}</span>
                </div>

                <div
                  className={`max-w-xl p-4 rounded-2xl text-sm leading-relaxed ${
                    isUser
                      ? 'bg-stone-900 text-white rounded-tr-none'
                      : 'bg-stone-50 border border-stone-200/80 text-stone-900 rounded-tl-none font-sans'
                  }`}
                >
                  <p>{msg.text}</p>
                </div>

                {/* Interactive Quick Choices (if present on coach message) */}
                {msg.quickChoices && (
                  <div className="pt-2 flex flex-col gap-2 w-full max-w-xl">
                    <span className="text-[11px] font-mono text-stone-500 uppercase tracking-wider">
                      Select Bushra's Response:
                    </span>
                    {msg.quickChoices.map((choice) => (
                      <button
                        key={choice.id}
                        onClick={() => handleSelectChoice(choice)}
                        className="text-left text-xs bg-amber-50 hover:bg-amber-100/80 border border-amber-200/70 p-3 rounded-xl text-stone-800 transition-colors flex items-center justify-between group"
                      >
                        <span className="font-medium italic">"{choice.userText}"</span>
                        <span className="text-amber-800 font-bold group-hover:translate-x-1 transition-transform">
                          →
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSendMessage} className="p-4 border-t border-stone-100 flex items-center gap-3">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Confess what you ate or ask for Desi damage control..."
            className="flex-1 px-4 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <button
            type="submit"
            className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors"
          >
            <span>Ask Didi</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
