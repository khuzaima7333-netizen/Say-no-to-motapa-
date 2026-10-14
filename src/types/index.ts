/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type FoodType = 'ghar_ka_khana' | 'cheat_meal' | 'street_food' | 'sweet';

export interface FoodItem {
  id: string;
  name: string;
  hindiName: string;
  portion: string;
  calories: number;
  protein: number; // in grams
  carbs: number; // in grams
  fats: number; // in grams
  fiber: number; // in grams
  type: FoodType;
  roastMicrocopy: string;
  coachDamageControl: string;
  tags: string[];
}

export interface MealLogEntry {
  id: string;
  foodItem: FoodItem;
  quantity: number;
  mealTime: 'breakfast' | 'lunch' | 'snack_4pm' | 'dinner' | 'midnight_craving';
  loggedAt: string;
  notes?: string;
}

export interface ChatQuickChoice {
  id: string;
  userText: string;
  coachResponse: string;
  actionGuidance: string;
  macroImpact?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'coach' | 'user';
  text: string;
  timestamp: string;
  coachName?: string;
  quickChoices?: ChatQuickChoice[];
  isRoast?: boolean;
}

export interface GamificationBadge {
  id: string;
  title: string;
  hindiTitle: string;
  description: string;
  culturalContext: string;
  icon: string;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
  rewardText: string;
}

export interface MealKitProduct {
  id: string;
  name: string;
  hindiSubtitle: string;
  category: 'High-Protein Desi' | 'Wedding Prep' | 'Ghar Ka Khaana' | 'Herbal Hydration' | 'Cooking Recipe Kits';
  price: number; // in INR
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  caloriesPerServing: number;
  proteinPerServing: number;
  carbsPerServing: number;
  fatsPerServing: number;
  image: string;
  description: string;
  whyDietDidiApproves: string;
  funnyWarning: string;
  features: string[];
  servingsCount: number;
  recipeSteps?: string[];
  cookingTimeMinutes?: number;
  ingredientsIncluded?: string[];
}

export interface CartItem {
  product: MealKitProduct;
  quantity: number;
}

export interface PushNotificationSpec {
  id: string;
  category: 'Water' | 'Cravings' | 'Family Pressure' | 'Late Night';
  title: string;
  body: string;
  scheduledTime: string;
  comedicTrigger: string;
}
