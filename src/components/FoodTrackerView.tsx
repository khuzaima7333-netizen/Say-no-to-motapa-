/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Plus, Flame, Droplets, Sparkles, AlertCircle, CheckCircle2, ChevronRight, Utensils, MessageSquareQuote } from 'lucide-react';
import { FoodItem, MealLogEntry } from '../types/index.ts';
import { INDIAN_FOOD_DATABASE } from '../data/mockData.ts';

interface FoodTrackerViewProps {
  weddingModeActive: boolean;
  onTriggerWeddingMode: () => void;
  onOpenCoachChatWithFood?: (foodName: string) => void;
}

export const FoodTrackerView: React.FC<FoodTrackerViewProps> = ({
  weddingModeActive,
  onTriggerWeddingMode,
  onOpenCoachChatWithFood
}) => {
  // Current logged items
  const [logs, setLogs] = useState<MealLogEntry[]>([
    {
      id: 'log_initial_1',
      foodItem: INDIAN_FOOD_DATABASE[0], // 2 Phulkas + Dal + Lauki
      quantity: 1,
      mealTime: 'lunch',
      loggedAt: '01:30 PM'
    }
  ]);

  const [activeFilter, setActiveFilter] = useState<'all' | 'ghar_ka_khana' | 'cheat_meal' | 'street_food' | 'sweet'>('all');
  const [latestRoast, setLatestRoast] = useState<{
    foodName: string;
    roast: string;
    damageControl: string;
    type: string;
  } | null>({
    foodName: INDIAN_FOOD_DATABASE[0].name,
    roast: INDIAN_FOOD_DATABASE[0].roastMicrocopy,
    damageControl: INDIAN_FOOD_DATABASE[0].coachDamageControl,
    type: INDIAN_FOOD_DATABASE[0].type
  });

  const [waterMl, setWaterMl] = useState<number>(1400);
  const [waterTarget] = useState<number>(3000);
  const [showCustomModal, setShowCustomModal] = useState<boolean>(false);
  const [customName, setCustomName] = useState<string>('');
  const [customCalories, setCustomCalories] = useState<string>('400');
  const [customType, setCustomType] = useState<'ghar_ka_khana' | 'cheat_meal'>('ghar_ka_khana');

  // Daily totals
  const dailyCalorieBudget = weddingModeActive ? 2600 : 2000;
  const totalCalories = logs.reduce((acc, log) => acc + log.foodItem.calories * log.quantity, 0);
  const totalProtein = logs.reduce((acc, log) => acc + log.foodItem.protein * log.quantity, 0);
  const totalCarbs = logs.reduce((acc, log) => acc + log.foodItem.carbs * log.quantity, 0);
  const totalFats = logs.reduce((acc, log) => acc + log.foodItem.fats * log.quantity, 0);

  const handleAddFood = (item: FoodItem) => {
    const newEntry: MealLogEntry = {
      id: `log_${Date.now()}`,
      foodItem: item,
      quantity: 1,
      mealTime: 'snack_4pm',
      loggedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setLogs([newEntry, ...logs]);
    setLatestRoast({
      foodName: item.name,
      roast: item.roastMicrocopy,
      damageControl: item.coachDamageControl,
      type: item.type
    });
  };

  const handleAddCustomFood = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim()) return;

    const caloriesNum = parseInt(customCalories, 10) || 350;
    const isCheat = customType === 'cheat_meal';

    const customItem: FoodItem = {
      id: `custom_${Date.now()}`,
      name: customName,
      hindiName: 'कस्टम भोजन',
      portion: '1 plate',
      calories: caloriesNum,
      protein: isCheat ? 12 : 20,
      carbs: isCheat ? 65 : 45,
      fats: isCheat ? 28 : 8,
      fiber: isCheat ? 3 : 7,
      type: customType,
      roastMicrocopy: isCheat
        ? `Diet Didi detected "${customName}". Oil content is questionable, but your happiness is noted. Drink 400ml water and take a 20-minute walk.`
        : `Wah! "${customName}" logged. Good discipline, beta. Keep this up and your relatives will have nothing to gossip about.`,
      coachDamageControl: isCheat
        ? 'Balance the day with light cucumber raita and keep moving.'
        : 'Solid clean choice. Mummy would approve.',
      tags: ['Custom Entry']
    };

    handleAddFood(customItem);
    setShowCustomModal(false);
    setCustomName('');
  };

  const filteredFoods = INDIAN_FOOD_DATABASE.filter((food) => {
    if (activeFilter === 'all') return true;
    return food.type === activeFilter;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-10 py-6">
      {/* Wedding Mode Banner if Active */}
      {weddingModeActive && (
        <div className="bg-amber-600 text-white p-4 rounded-2xl flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-amber-200" />
            <div>
              <div className="font-display font-semibold text-base">Shaadi Season Mode Active</div>
              <div className="text-xs text-amber-100">
                Caloric budget expanded to 2,600 kcal. Damage control protocol deployed for the Sangeet buffet.
              </div>
            </div>
          </div>
          <button
            onClick={onTriggerWeddingMode}
            className="px-3 py-1.5 bg-white text-amber-900 rounded-lg text-xs font-semibold hover:bg-amber-50 transition-colors"
          >
            View Buffet Protocol
          </button>
        </div>
      )}

      {/* Top Section: Daily Calorie & Macro Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Calorie Gauge */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-stone-500 uppercase tracking-wider">Today's Calorie Budget</span>
            <span className="text-xs text-stone-500 font-mono tabular-nums">
              {totalCalories} / {dailyCalorieBudget} kcal
            </span>
          </div>

          <div className="my-6">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-display font-bold text-stone-900 tabular-nums">
                {dailyCalorieBudget - totalCalories > 0 ? dailyCalorieBudget - totalCalories : 0}
              </span>
              <span className="text-sm text-stone-500 font-medium">kcal remaining</span>
            </div>
            {totalCalories > dailyCalorieBudget && (
              <div className="text-xs text-orange-700 font-medium mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Over budget by {totalCalories - dailyCalorieBudget} kcal — No panic! Walk 2,500 steps.</span>
              </div>
            )}

            {/* Progress Track */}
            <div className="w-full h-3 bg-stone-100 rounded-full mt-4 overflow-hidden">
              <div
                className={`h-full transition-all duration-500 rounded-full ${
                  totalCalories > dailyCalorieBudget ? 'bg-orange-500' : 'bg-amber-600'
                }`}
                style={{ width: `${Math.min(100, (totalCalories / dailyCalorieBudget) * 100)}%` }}
              />
            </div>
          </div>

          {/* Macro Breakdown Strip */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-stone-100 text-xs">
            <div>
              <div className="text-stone-500">Protein</div>
              <div className="font-semibold text-stone-900 tabular-nums font-mono text-sm mt-0.5">
                {totalProtein}g <span className="text-[10px] text-stone-400 font-normal">/ 90g</span>
              </div>
            </div>
            <div>
              <div className="text-stone-500">Carbs</div>
              <div className="font-semibold text-stone-900 tabular-nums font-mono text-sm mt-0.5">
                {totalCarbs}g <span className="text-[10px] text-stone-400 font-normal">/ 220g</span>
              </div>
            </div>
            <div>
              <div className="text-stone-500">Fats</div>
              <div className="font-semibold text-stone-900 tabular-nums font-mono text-sm mt-0.5">
                {totalFats}g <span className="text-[10px] text-stone-400 font-normal">/ 55g</span>
              </div>
            </div>
          </div>
        </div>

        {/* Latest Roast Reaction Banner & Water Tracker */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Reaction Banner */}
          {latestRoast && (
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex-1 flex flex-col justify-between">
              <div className="flex items-center justify-between text-xs text-stone-500 font-mono">
                <span className="flex items-center gap-1.5 text-amber-800 font-semibold uppercase">
                  <MessageSquareQuote className="w-4 h-4 text-amber-600" />
                  Coach Majaz & Motapa Alert
                </span>
                <span>Logged: {latestRoast.foodName.split('+')[0]}</span>
              </div>

              <div className="my-3 space-y-2">
                <p className="text-stone-900 font-display italic text-base leading-relaxed">
                  "{latestRoast.roast}"
                </p>
                <div className="bg-stone-50 border border-stone-200/80 p-3 rounded-xl text-xs text-stone-700">
                  <strong className="text-stone-900">Damage Control Protocol: </strong>
                  {latestRoast.damageControl}
                </div>
              </div>

              {onOpenCoachChatWithFood && (
                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => onOpenCoachChatWithFood(latestRoast.foodName)}
                    className="text-xs font-semibold text-amber-800 hover:text-amber-900 flex items-center gap-1"
                  >
                    <span>Talk to Coach about this meal</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Water Tracker Strip */}
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <Droplets className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-semibold text-stone-900">Hydration Counter</div>
                <div className="text-xs text-stone-500">
                  {waterMl < 2000
                    ? 'Your skin is drier than leftover papad. Drink up!'
                    : 'Glowing skin achieved! Kidneys are rejoicing.'}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-mono text-sm font-semibold text-stone-900 tabular-nums">
                {waterMl} / {waterTarget} ml
              </span>
              <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-lg">
                <button
                  onClick={() => setWaterMl(Math.max(0, waterMl - 250))}
                  className="px-2.5 py-1 text-xs text-stone-600 hover:text-stone-900 font-medium"
                >
                  -250
                </button>
                <button
                  onClick={() => setWaterMl(waterMl + 250)}
                  className="px-2.5 py-1 text-xs bg-white text-stone-900 font-semibold rounded shadow-sm hover:bg-stone-50"
                >
                  +250 ml
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Section: Quick Add Food Database with Filter Controls */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-xl font-display font-semibold text-stone-900">Quick-Log Indian Foods</h3>
            <p className="text-xs text-stone-500">Click any food to log it and receive Diet Didi's immediate witty reaction.</p>
          </div>

          <div className="flex items-center gap-2">
            {/* Filter buttons */}
            <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-xl text-xs">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-3 py-1.5 font-medium rounded-lg transition-colors ${
                  activeFilter === 'all' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveFilter('ghar_ka_khana')}
                className={`px-3 py-1.5 font-medium rounded-lg transition-colors ${
                  activeFilter === 'ghar_ka_khana' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Ghar Ka Khaana
              </button>
              <button
                onClick={() => setActiveFilter('cheat_meal')}
                className={`px-3 py-1.5 font-medium rounded-lg transition-colors ${
                  activeFilter === 'cheat_meal' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Cheat Meals
              </button>
              <button
                onClick={() => setActiveFilter('street_food')}
                className={`px-3 py-1.5 font-medium rounded-lg transition-colors ${
                  activeFilter === 'street_food' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Street Food
              </button>
            </div>

            <button
              onClick={() => setShowCustomModal(true)}
              className="flex items-center gap-1.5 px-3 py-2 bg-stone-900 text-white text-xs font-semibold rounded-xl hover:bg-stone-800 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Custom Food</span>
            </button>
          </div>
        </div>

        {/* Food Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredFoods.map((food) => (
            <div
              key={food.id}
              onClick={() => handleAddFood(food)}
              className="bg-white p-5 rounded-2xl border border-stone-200 hover:border-amber-400 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-sm font-semibold text-stone-900 group-hover:text-amber-800 transition-colors">
                    {food.name}
                  </h4>
                  <span className="font-mono text-xs font-semibold text-stone-900 tabular-nums shrink-0">
                    {food.calories} kcal
                  </span>
                </div>
                <div className="text-xs text-stone-500 mt-0.5">{food.hindiName}</div>
              </div>

              {/* Unboxed Metadata (Zero Pill Rule) */}
              <div className="flex items-center gap-2 text-xs text-stone-500 font-mono">
                <span>{food.protein}g Protein</span>
                <span aria-hidden="true">·</span>
                <span>{food.carbs}g Carbs</span>
                <span aria-hidden="true">·</span>
                <span>{food.fats}g Fats</span>
              </div>

              <div className="text-[11px] text-stone-600 italic line-clamp-2 bg-stone-50 p-2.5 rounded-lg border border-stone-100">
                "{food.roastMicrocopy}"
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs">
                <span className="text-stone-500">{food.portion}</span>
                <span className="font-semibold text-amber-700 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  + Log Meal
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section: Today's Logged Timeline */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-4">
        <h3 className="text-lg font-display font-semibold text-stone-900">Today's Food Timeline</h3>
        {logs.length === 0 ? (
          <div className="text-center py-8 text-stone-400 text-sm">No meals logged yet today.</div>
        ) : (
          <div className="divide-y divide-stone-100">
            {logs.map((log) => (
              <div key={log.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-stone-900">{log.foodItem.name}</span>
                    <span className="text-xs text-stone-500 font-mono">{log.loggedAt}</span>
                  </div>
                  <div className="text-xs text-stone-600 italic">
                    Diet Didi: "{log.foodItem.roastMicrocopy}"
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono tabular-nums shrink-0">
                  <span className="font-bold text-stone-900">{log.foodItem.calories} kcal</span>
                  <span className="text-stone-500">{log.foodItem.protein}g P · {log.foodItem.carbs}g C · {log.foodItem.fats}g F</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Custom Food Modal */}
      {showCustomModal && (
        <div className="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-stone-200 shadow-2xl max-w-md w-full p-6 space-y-4">
            <h3 className="text-lg font-display font-semibold text-stone-900">Log Custom Indian Dish</h3>
            <form onSubmit={handleAddCustomFood} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Dish Name</label>
                <input
                  type="text"
                  placeholder="e.g. 2 Paneer Parathas with White Butter"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Estimated Calories (kcal)</label>
                <input
                  type="number"
                  value={customCalories}
                  onChange={(e) => setCustomCalories(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Food Category</label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setCustomType('ghar_ka_khana')}
                    className={`py-2 px-3 rounded-lg border text-center transition-colors ${
                      customType === 'ghar_ka_khana'
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-semibold'
                        : 'border-stone-200 text-stone-700'
                    }`}
                  >
                    Ghar Ka Khaana
                  </button>
                  <button
                    type="button"
                    onClick={() => setCustomType('cheat_meal')}
                    className={`py-2 px-3 rounded-lg border text-center transition-colors ${
                      customType === 'cheat_meal'
                        ? 'bg-orange-50 border-orange-300 text-orange-900 font-semibold'
                        : 'border-stone-200 text-stone-700'
                    }`}
                  >
                    Cheat Meal / Street Food
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCustomModal(false)}
                  className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-stone-900 text-white text-xs font-semibold rounded-xl hover:bg-stone-800"
                >
                  Log & Get Roast
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
