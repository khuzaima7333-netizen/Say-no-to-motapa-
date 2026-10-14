/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  ShoppingBag,
  Star,
  Info,
  ShieldCheck,
  X,
  Check,
  Flame,
  Sparkles,
  ChefHat,
  Clock,
  BookOpen,
  Utensils,
  Plus
} from 'lucide-react';
import { MealKitProduct } from '../types/index.ts';
import { MEAL_KIT_PRODUCTS } from '../data/mockData.ts';

interface MealKitsStoreViewProps {
  onAddToCart: (product: MealKitProduct) => void;
}

export const MealKitsStoreView: React.FC<MealKitsStoreViewProps> = ({ onAddToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Cooking Recipe Kits');
  const [previewProduct, setPreviewProduct] = useState<MealKitProduct | null>(null);
  const [recipeModalProduct, setRecipeModalProduct] = useState<MealKitProduct | null>(null);
  const [addedProductId, setAddedProductId] = useState<string | null>(null);

  const categories = [
    'Cooking Recipe Kits',
    'All Kits',
    'High-Protein Desi',
    'Wedding Prep',
    'Ghar Ka Khaana',
    'Herbal Hydration'
  ];

  const filteredProducts = MEAL_KIT_PRODUCTS.filter((prod) => {
    if (selectedCategory === 'All Kits') return true;
    return prod.category === selectedCategory;
  });

  const handleQuickAdd = (product: MealKitProduct, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    onAddToCart(product);
    setAddedProductId(product.id);
    setTimeout(() => setAddedProductId(null), 1500);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 py-6">
      {/* Editorial Store Header */}
      <div className="border-b border-stone-200 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-amber-700 font-mono uppercase tracking-wider mb-2">
            <ChefHat className="w-4 h-4 text-amber-600" />
            <span>Say No to Motapa Diet Kitchen</span>
            <span aria-hidden="true">·</span>
            <span>Coach Majaz Certified</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-stone-900 tracking-tight">
            Diet Food Cooking Recipe Kits
          </h2>
          <p className="mt-2 text-sm text-stone-600 max-w-2xl leading-relaxed">
            Everything you need to cook mouthwatering, high-protein Indian diet meals at home. Pre-portioned whole spices, vacuum-sealed lean proteins, low-calorie gourmet gravies, and step-by-step masterchef recipe cards.
          </p>
        </div>

        {/* Category Segmented Controls */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-100 rounded-2xl">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 text-xs font-medium rounded-xl transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-amber-600 text-white shadow-md font-semibold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
              }`}
            >
              {cat === 'Cooking Recipe Kits' ? '🍲 DIY Cooking Recipe Kits' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Banner for Recipe Kits */}
      {selectedCategory === 'Cooking Recipe Kits' && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-3xl p-5 md:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-md">
              <ChefHat className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold text-stone-900 text-sm">
                Farm-to-Tawa Diet Cooking Kits with Exact Step-by-Step Recipes
              </div>
              <div className="text-xs text-stone-600">
                Click any recipe kit below to view full ingredients, chef steps, prep time, and macros!
              </div>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-amber-900 bg-amber-100 px-3 py-1.5 rounded-xl border border-amber-300 shrink-0">
            ✓ 100% Measured Diet Portions
          </span>
        </div>
      )}

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((prod) => (
          <div
            key={prod.id}
            onClick={() => setPreviewProduct(prod)}
            className="group bg-white rounded-3xl border border-stone-200 overflow-hidden hover:border-amber-400 hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            {/* Image Container with Safe Fallback */}
            <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
              <img
                src={prod.image}
                alt={prod.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-lg text-[11px] font-mono text-white flex items-center gap-1">
                <Utensils className="w-3 h-3 text-amber-400" />
                <span>{prod.servingsCount} Portions</span>
              </div>

              {prod.cookingTimeMinutes && (
                <div className="absolute top-3 right-3 bg-amber-600/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-[11px] font-mono text-white flex items-center gap-1 font-semibold">
                  <Clock className="w-3 h-3" />
                  <span>{prod.cookingTimeMinutes}m Cook</span>
                </div>
              )}

              <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold text-emerald-800 shadow-sm">
                {prod.proteinPerServing}g Protein
              </div>
            </div>

            {/* Product Body */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-1.5">
                <div className="text-[11px] font-mono uppercase tracking-wider text-amber-700 font-semibold">
                  {prod.category}
                </div>
                <h3 className="font-display font-semibold text-stone-900 text-base leading-snug group-hover:text-amber-800 transition-colors">
                  {prod.name}
                </h3>
                <div className="text-xs text-stone-500">{prod.hindiSubtitle}</div>
                <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed pt-1">
                  {prod.description}
                </p>
              </div>

              {/* Nutrition & Recipe Pills */}
              <div className="pt-2 border-t border-stone-100 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-stone-600">
                  <span>
                    <strong className="text-stone-900">{prod.caloriesPerServing}</strong> kcal
                  </span>
                  <span>·</span>
                  <span>
                    <strong className="text-emerald-700">{prod.proteinPerServing}g</strong> protein
                  </span>
                  <span>·</span>
                  <span>
                    <strong className="text-stone-900">{prod.carbsPerServing}g</strong> carbs
                  </span>
                </div>

                {prod.recipeSteps && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setRecipeModalProduct(prod);
                    }}
                    className="w-full py-1.5 px-3 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-medium rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-amber-700" />
                    <span>View Cooking Recipe & Steps</span>
                  </button>
                )}

                {/* Price and Cart Action */}
                <div className="flex items-center justify-between pt-1">
                  <div>
                    <div className="text-xs text-stone-400 line-through">
                      ₹{prod.originalPrice}
                    </div>
                    <div className="text-lg font-bold font-mono text-stone-900">
                      ₹{prod.price}
                    </div>
                  </div>

                  <button
                    onClick={(e) => handleQuickAdd(prod, e)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm ${
                      addedProductId === prod.id
                        ? 'bg-emerald-600 text-white'
                        : 'bg-amber-600 text-white hover:bg-amber-500 active:scale-95'
                    }`}
                  >
                    {addedProductId === prod.id ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Added!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Buy Kit</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* QUICK PREVIEW MODAL */}
      {previewProduct && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in"
          onClick={() => setPreviewProduct(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden border border-stone-200 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setPreviewProduct(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white text-stone-700 flex items-center justify-center shadow-md transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-[16/9] bg-stone-100 overflow-hidden">
              <img
                src={previewProduct.image}
                alt={previewProduct.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-xl text-white font-mono text-xs font-bold">
                {previewProduct.servingsCount} Healthy Portions Included
              </div>
            </div>

            <div className="p-6 md:p-8 space-y-6">
              <div>
                <div className="text-xs font-mono text-amber-700 uppercase font-semibold">
                  {previewProduct.category}
                </div>
                <h3 className="text-2xl font-display font-bold text-stone-900 mt-1">
                  {previewProduct.name}
                </h3>
                <div className="text-sm text-stone-500">{previewProduct.hindiSubtitle}</div>
                <p className="mt-3 text-sm text-stone-600 leading-relaxed">
                  {previewProduct.description}
                </p>
              </div>

              {/* Nutrition Spec Bar */}
              <div className="grid grid-cols-4 gap-2 bg-stone-50 p-3.5 rounded-2xl border border-stone-100 text-center text-xs font-mono">
                <div>
                  <div className="text-stone-400">Calories</div>
                  <div className="font-bold text-stone-900 text-base mt-0.5">
                    {previewProduct.caloriesPerServing}
                  </div>
                </div>
                <div>
                  <div className="text-emerald-700">Protein</div>
                  <div className="font-bold text-emerald-800 text-base mt-0.5">
                    {previewProduct.proteinPerServing}g
                  </div>
                </div>
                <div>
                  <div className="text-stone-400">Carbs</div>
                  <div className="font-bold text-stone-900 text-base mt-0.5">
                    {previewProduct.carbsPerServing}g
                  </div>
                </div>
                <div>
                  <div className="text-stone-400">Fats</div>
                  <div className="font-bold text-stone-900 text-base mt-0.5">
                    {previewProduct.fatsPerServing}g
                  </div>
                </div>
              </div>

              {/* Ingredients Included */}
              {previewProduct.ingredientsIncluded && (
                <div className="space-y-2">
                  <div className="text-xs font-mono uppercase text-stone-500 font-bold">
                    Box Contents & Ingredients Included:
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700">
                    {previewProduct.ingredientsIncluded.map((ing, i) => (
                      <li key={i} className="flex items-center gap-2 bg-stone-50 p-2 rounded-xl">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{ing}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Coach Majaz Endorsement */}
              <div className="bg-stone-900 text-white p-4 rounded-2xl space-y-1 text-xs">
                <div className="flex items-center gap-1.5 text-amber-400 font-mono uppercase tracking-wider font-bold">
                  <ChefHat className="w-3.5 h-3.5" />
                  <span>Coach Majaz Cooking Law:</span>
                </div>
                <p className="text-stone-300 italic">{previewProduct.whyDietDidiApproves}</p>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-2 border-t border-stone-100">
                <div>
                  <div className="text-xs text-stone-400 line-through">
                    ₹{previewProduct.originalPrice}
                  </div>
                  <div className="text-2xl font-bold font-mono text-stone-900">
                    ₹{previewProduct.price}
                  </div>
                </div>

                <div className="flex gap-2">
                  {previewProduct.recipeSteps && (
                    <button
                      onClick={() => {
                        setRecipeModalProduct(previewProduct);
                        setPreviewProduct(null);
                      }}
                      className="px-4 py-3 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold rounded-2xl flex items-center gap-1.5 transition-colors"
                    >
                      <BookOpen className="w-4 h-4 text-amber-700" />
                      <span>View Recipe</span>
                    </button>
                  )}

                  <button
                    onClick={() => {
                      onAddToCart(previewProduct);
                      setPreviewProduct(null);
                    }}
                    className="px-6 py-3 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-2xl flex items-center gap-2 shadow-lg shadow-amber-600/20 transition-all"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add Kit to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DEDICATED COOKING RECIPE & STEPS MODAL */}
      {recipeModalProduct && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in"
          onClick={() => setRecipeModalProduct(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden border border-stone-200 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setRecipeModalProduct(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white text-stone-700 flex items-center justify-center shadow-md transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 md:p-8 space-y-6">
              <div className="flex items-center gap-3">
                <img
                  src={recipeModalProduct.image}
                  alt={recipeModalProduct.name}
                  className="w-20 h-20 rounded-2xl object-cover border border-stone-200 shadow-md shrink-0"
                />
                <div>
                  <div className="text-xs font-mono text-amber-700 uppercase font-semibold">
                    Masterchef Diet Recipe Card
                  </div>
                  <h3 className="text-xl md:text-2xl font-display font-bold text-stone-900 mt-0.5">
                    {recipeModalProduct.name}
                  </h3>
                  <div className="flex items-center gap-3 text-xs font-mono text-stone-500 mt-1">
                    <span>⏱️ {recipeModalProduct.cookingTimeMinutes || 20} Minutes</span>
                    <span>·</span>
                    <span className="text-emerald-700 font-bold">
                      {recipeModalProduct.proteinPerServing}g Protein
                    </span>
                    <span>·</span>
                    <span>{recipeModalProduct.caloriesPerServing} kcal</span>
                  </div>
                </div>
              </div>

              {/* Step by Step Cooking Instructions */}
              <div className="space-y-3">
                <div className="text-xs font-mono uppercase text-stone-500 font-bold tracking-wider">
                  Cooking Instructions:
                </div>
                <div className="space-y-2.5">
                  {recipeModalProduct.recipeSteps?.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200/80 flex items-start gap-3"
                    >
                      <div className="w-6 h-6 rounded-full bg-amber-600 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <p className="text-xs text-stone-700 leading-relaxed font-sans">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ingredients in the Box */}
              {recipeModalProduct.ingredientsIncluded && (
                <div className="space-y-2">
                  <div className="text-xs font-mono uppercase text-stone-500 font-bold tracking-wider">
                    Included in Your Delivery Kit:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {recipeModalProduct.ingredientsIncluded.map((ing, i) => (
                      <span
                        key={i}
                        className="text-xs bg-amber-50 text-amber-900 border border-amber-200 px-3 py-1 rounded-xl"
                      >
                        ✓ {ing}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Modal Footer CTA */}
              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <div className="text-xs text-stone-400">Kit Price for 4 Portions</div>
                  <div className="text-2xl font-bold font-mono text-stone-900">
                    ₹{recipeModalProduct.price}
                  </div>
                </div>

                <button
                  onClick={() => {
                    onAddToCart(recipeModalProduct);
                    setRecipeModalProduct(null);
                  }}
                  className="px-6 py-3 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-2xl flex items-center gap-2 shadow-lg shadow-amber-600/20 transition-all"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Order Recipe Cooking Kit</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
