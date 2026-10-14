/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FoodItem, GamificationBadge, MealKitProduct, PushNotificationSpec } from '../types/index.ts';

export const INDIAN_FOOD_DATABASE: FoodItem[] = [
  {
    id: 'food_1',
    name: '2 Phulkas + Tadka Dal + Lauki Sabzi',
    hindiName: 'दो फुल्के, तड़का दाल और लौकी',
    portion: '2 rotis + 1 bowl dal + 1 katori sabzi',
    calories: 385,
    protein: 14,
    carbs: 64,
    fats: 7,
    fiber: 8,
    type: 'ghar_ka_khana',
    roastMicrocopy: 'Wah beta! Mummy would shed a single tear of joy. Clean 385 kcal. You have earned 15 minutes of guilt-free reels scrolling.',
    coachDamageControl: 'Perfect balanced meal. No damage control required! Just ensure you do not drown it in an extra katori of pure desi ghee afterwards.',
    tags: ['Ghar Ka Khaana', 'High Fiber', 'Mother Approved']
  },
  {
    id: 'food_2',
    name: 'Moong Dal Khichdi + Dahi',
    hindiName: 'मूंग दाल खिचड़ी और दही',
    portion: '1 medium plate + 1 katori curd',
    calories: 340,
    protein: 16,
    carbs: 55,
    fats: 6,
    fiber: 7,
    type: 'ghar_ka_khana',
    roastMicrocopy: 'Sick day food or spiritual enlightenment? Either way, your digestive system is sending you a handwritten thank-you letter.',
    coachDamageControl: 'Excellent for gut health and recovery. Add some roasted jeera powder to curd for extra thermogenic goodness.',
    tags: ['Comfort Food', 'High Protein', 'Easy Digest']
  },
  {
    id: 'food_3',
    name: 'Paneer Bhurji + 2 Multigrain Rotis',
    hindiName: 'पनीर भुर्जी और मल्टीग्रेन रोटी',
    portion: '150g paneer + 2 rotis',
    calories: 440,
    protein: 26,
    carbs: 42,
    fats: 18,
    fiber: 6,
    type: 'ghar_ka_khana',
    roastMicrocopy: 'Look at you, hitting 26g protein without crying over a chalky protein shake. Desi gym bros everywhere are nodding in silent approval.',
    coachDamageControl: 'High satiety! If made with low-oil tempering, this is a gold medal dinner. Drink 400ml water before bed.',
    tags: ['High Protein', 'Vegetarian Muscle', 'Clean Fat']
  },
  {
    id: 'food_4',
    name: 'Palak Dal + Brown Rice + Kachumber Salad',
    hindiName: 'पालक दाल, ब्राउन राइस और सलाद',
    portion: '1 cup rice + 1 bowl dal + salad',
    calories: 395,
    protein: 15,
    carbs: 68,
    fats: 5,
    fiber: 9,
    type: 'ghar_ka_khana',
    roastMicrocopy: 'Iron, fiber, and clean carbs. Popeye if he was born in Chandigarh. Your hemoglobin is thriving.',
    coachDamageControl: 'Super clean lunch. Squeeze fresh lemon over the dal for maximum iron bioavailability.',
    tags: ['Micro Nutrient Dense', 'Vegan Friendly', 'Low Oil']
  },
  {
    id: 'food_5',
    name: 'Chole Bhature (2 Bhature + Pindi Chole + Achar)',
    hindiName: 'छोले भटूरे और आचार',
    portion: '2 large fried bhature + spicy chole',
    calories: 890,
    protein: 17,
    carbs: 104,
    fats: 46,
    fiber: 8,
    type: 'cheat_meal',
    roastMicrocopy: 'Emergency alert: Bhatura detected. The oil content could lubricate an entire 1998 Maruti 800. Total: 890 kcal. Do NOT panic, do NOT skip dinner.',
    coachDamageControl: 'Action plan: 1. Take a 25-minute brisk walk. 2. Dinner tonight will be light cucumber raita and boiled eggs or tofu. 3. Forgive yourself, it was Sunday.',
    tags: ['Sunday Indulgence', 'Oil Odyssey', 'Needs Damage Control']
  },
  {
    id: 'food_6',
    name: '2 Crispy Samosas with Meethi Chutney',
    hindiName: 'दो गरमा-गरम समोसे और चटनी',
    portion: '2 deep fried samosas + saunth chutney',
    calories: 530,
    protein: 7,
    carbs: 68,
    fats: 27,
    fiber: 3,
    type: 'street_food',
    roastMicrocopy: 'The classic 4 PM "I was just stepping out for fresh air" samosa ambush. The green tea you drank afterwards has officially submitted its two-week resignation notice.',
    coachDamageControl: 'The math: 530 kcal, mostly refined flour and frying oil. Drink 600ml warm water, avoid afternoon sugary chai, and walk 3,000 steps before dinner.',
    tags: ['Office Trap', '4 PM Trigger', 'High Calorie']
  },
  {
    id: 'food_7',
    name: 'Butter Chicken + 1 Butter Naan',
    hindiName: 'बटर चिकन और बटर नान',
    portion: '300g gravy chicken + 1 tandoori naan',
    calories: 940,
    protein: 42,
    carbs: 76,
    fats: 52,
    fiber: 3,
    type: 'cheat_meal',
    roastMicrocopy: 'The word "Butter" is literally in both items. Did you think they meant almond butter? Your tastebuds are in heaven; your pancreas is calling 112.',
    coachDamageControl: 'Solid 42g protein, but the heavy dairy fat means tomorrow\'s breakfast is plain oats or boiled sprouts. No cheat meals for the next 72 hours.',
    tags: ['Restaurant Classic', 'High Fat', 'Protein Loaded']
  },
  {
    id: 'food_8',
    name: 'Midnight Maggi (Double Cheese & Amul Butter)',
    hindiName: 'आधी रात वाली चीज़ी मैगी',
    portion: '2 blocks noodles + 1 cheese slice + butter',
    calories: 520,
    protein: 9,
    carbs: 66,
    fats: 25,
    fiber: 2,
    type: 'street_food',
    roastMicrocopy: 'It is 12:47 AM. The kettle hasn\'t even finished humming and we can smell the tastemaker across the state border. We know life was stressful today, but this sodium level could preserve a mummy.',
    coachDamageControl: 'Midnight sodium causes water retention. Drink 500ml water before sleep. Tomorrow wake up and do not skip breakfast to "punish" yourself—eat fiber and stay hydrated.',
    tags: ['Midnight Craving', 'Late Night', 'High Sodium']
  },
  {
    id: 'food_9',
    name: '2 Warm Jalebis dipped in Sugar Chashni',
    hindiName: 'दो रसीली जलेबियाँ',
    portion: '100g deep fried spirals in syrup',
    calories: 380,
    protein: 2,
    carbs: 82,
    fats: 7,
    fiber: 0.5,
    type: 'sweet',
    roastMicrocopy: 'The legendary "Diet Didi, I only took one teeny-tiny piece" jalebi vortex. Physics and willpower stop functioning within 10 meters of an Indian sweet shop.',
    coachDamageControl: 'Pure glucose spike! Take 50 bodyweight squats or a 15-minute post-meal walk to shuttle that glycogen directly into muscles rather than fat cells.',
    tags: ['Halwai Trap', 'Sugar Rush', 'Instant Regret']
  },
  {
    id: 'food_10',
    name: 'Chicken Dum Biryani + Burani Raita',
    hindiName: 'चिकन बिरयानी और रायता',
    portion: '1 standard clay pot plate',
    calories: 780,
    protein: 36,
    carbs: 88,
    fats: 31,
    fiber: 4,
    type: 'cheat_meal',
    roastMicrocopy: 'Friendly reminder: the three slices of cucumber floating in the spiced raita do NOT magically convert this into a Mediterranean wellness salad.',
    coachDamageControl: '36g protein is genuinely decent. Limit second servings of salan, avoid the sugary gulab jamun afterwards, and drink green tea (real, not mythical).',
    tags: ['Weekend Feast', 'High Protein', 'Carb Heavy']
  }
];

export const NOTIFICATION_SPECS: PushNotificationSpec[] = [
  {
    id: 'notif_1',
    category: 'Water',
    title: '💧 Emergency Hydration Warning',
    body: 'Your skin is currently drier than yesterday\'s leftover roasted papad. Go drink 350ml water right now before your kidneys file an FIR.',
    scheduledTime: '11:00 AM',
    comedicTrigger: 'When user hasn\'t logged water in 3+ hours'
  },
  {
    id: 'notif_2',
    category: 'Cravings',
    title: '⚠️ 4:00 PM Samosa Radar Active',
    body: 'Step away from the office pantry tea stall. We can hear the samosa fryer crackling in your imagination. Have the roasted makhana instead!',
    scheduledTime: '04:15 PM',
    comedicTrigger: 'The notorious Indian evening chai craving window'
  },
  {
    id: 'notif_3',
    category: 'Family Pressure',
    title: '🛡️ Rishtedaar Defense Shield Activated',
    body: 'Going to Chachi\'s dinner tonight? Rehearsed comeback: "Haan Chachi, I am eating enough, your ghee is just too nutritious." Stay strong on the roti count!',
    scheduledTime: '07:30 PM',
    comedicTrigger: 'Weekend family gathering or social dinner log'
  },
  {
    id: 'notif_4',
    category: 'Late Night',
    title: '🌙 The Midnight Maggi Siren Song',
    body: 'It\'s past midnight. The fridge light looks like the gates of heaven, but that 2-minute noodle packet has 1,100mg sodium. Drink chamomile tea and go to sleep, beta.',
    scheduledTime: '12:30 AM',
    comedicTrigger: 'Screen activity logged after midnight'
  }
];

export const GAMIFICATION_BADGES: GamificationBadge[] = [
  {
    id: 'badge_samosa',
    title: 'Samosa Survivor',
    hindiTitle: 'समोसा सर्वाइवर',
    description: 'Resisted 5 consecutive office evening samosa & kachori ambushes.',
    culturalContext: 'Surviving 4 PM Chai time when the Sharma ji brings a steaming box of Haldiram samosas.',
    icon: 'ShieldCheck',
    unlocked: true,
    progress: 5,
    maxProgress: 5,
    rewardText: 'Unlocked: "The Chutney Deflector" profile title + 50 Karma points'
  },
  {
    id: 'badge_tinda',
    title: 'Tinda Triumph',
    hindiTitle: 'टिंडा ट्रायम्फ',
    description: 'Ate gourd/tinda/lauki sabzi 3 times in a week with zero emotional outbursts.',
    culturalContext: 'Mummy\'s ultimate test of filial devotion and vegetable tolerance.',
    icon: 'Sparkles',
    unlocked: true,
    progress: 3,
    maxProgress: 3,
    rewardText: 'Unlocked: "Mummy\'s Favorite Child" honorary diploma'
  },
  {
    id: 'badge_roti',
    title: 'Roti Ruler',
    hindiTitle: 'रोटी का राजा',
    description: 'Successfully told Mummy "Bas, do hi roti" and held your ground without accepting a third with ghee.',
    culturalContext: 'The greatest battle in Indian household history: escaping the 3rd and 4th emotional roti.',
    icon: 'Award',
    unlocked: false,
    progress: 4,
    maxProgress: 7,
    rewardText: 'Unlocked: Boundary Setting Masterclass certificate'
  },
  {
    id: 'badge_rishtedaar',
    title: 'Rishtedaar Shield',
    hindiTitle: 'रिश्तेदार शील्ड',
    description: 'Attended a full wedding reception without eating sweets while aunties called you "so weak".',
    culturalContext: 'Enduring "Beta, thoda khao, shaadi me kaun diet karta hai?" without breaking character.',
    icon: 'HeartHandshake',
    unlocked: false,
    progress: 1,
    maxProgress: 3,
    rewardText: 'Unlocked: Emotional Fortitude badge'
  },
  {
    id: 'badge_hydration',
    title: 'Papad Reviver',
    hindiTitle: 'पापड़ रिवाइवर',
    description: 'Maintained 3.5 Liters of water daily for 10 consecutive scorching days.',
    culturalContext: 'Keeping skin moisturized without relying on vicco turmeric.',
    icon: 'Droplets',
    unlocked: true,
    progress: 10,
    maxProgress: 10,
    rewardText: 'Unlocked: Glowing Desi Skin aura'
  }
];

export const MEAL_KIT_PRODUCTS: MealKitProduct[] = [
  {
    id: 'prod_1',
    name: 'Sattu & Sprouted Moong Protein Bowl Kit',
    hindiSubtitle: 'देसी सत्तू और अंकुरित मूंग प्रोटीन किट',
    category: 'High-Protein Desi',
    price: 499,
    originalPrice: 699,
    rating: 4.9,
    reviewsCount: 320,
    caloriesPerServing: 360,
    proteinPerServing: 28,
    carbsPerServing: 48,
    fatsPerServing: 4,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    description: 'Traditional Bihari roasted sattu blended with vacuum-dried sprouted moong, Himalayan black salt, roasted cumin seeds, and dehydrated mint.',
    whyDietDidiApproves: '28g pure bio-available plant protein with zero bloating. Cost is 1/4th of imported synthetic whey, and Mummy won\'t question why there is a 2kg black tub in the kitchen.',
    funnyWarning: 'Warning: Will give you unnatural strength to lift gas cylinders and argue with rickshaw wallahs.',
    features: ['28g Plant Protein', 'Zero Preservatives', 'Pre-measured Desi Spice Pods', '5-Minute Prep'],
    servingsCount: 6
  },
  {
    id: 'prod_2',
    name: 'The Wedding Season Sangeet Detox & Damage Control Kit',
    hindiSubtitle: 'वेडिंग सीजन डैमेज कंट्रोल और डिटॉक्स किट',
    category: 'Wedding Prep',
    price: 849,
    originalPrice: 1199,
    rating: 4.8,
    reviewsCount: 194,
    caloriesPerServing: 180,
    proteinPerServing: 14,
    carbsPerServing: 22,
    fatsPerServing: 2,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
    description: 'Clinically formulated post-party recovery kit containing organic Amla-Ginger anti-bloat shots, fiber-dense psyllium seed crackers, and electrolyte-rich pink salt infusions.',
    whyDietDidiApproves: 'Contains high active gingerol and bioactive potassium to flush out sodium puffiness from Butter Naan and Dal Makhani binge sessions.',
    funnyWarning: 'Warning: Does not undo the embarrassment of your Uncle’s Nagin dance, but your waistline will thank you.',
    features: ['Rapid Anti-Bloat Formula', 'Liver Antioxidant Support', 'Electrolyte Restorer', 'Wedding Survival Card'],
    servingsCount: 8
  },
  {
    id: 'prod_3',
    name: 'Ghar Ka Khaana Super-Fiber Macro Upgrade',
    hindiSubtitle: 'घर का खाना सुपर-फाइबर अपग्रेड पैक',
    category: 'Ghar Ka Khaana',
    price: 649,
    originalPrice: 899,
    rating: 4.9,
    reviewsCount: 412,
    caloriesPerServing: 290,
    proteinPerServing: 22,
    carbsPerServing: 38,
    fatsPerServing: 6,
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80',
    description: 'High-protein multigrain flour blend (roasted chana, defatted soy, ragi, and psyllium husk) designed to seamlessly mix with regular household atta without Mummy noticing.',
    whyDietDidiApproves: 'Triples the protein of regular rotis while dropping glycemic spike by 42%. Your rotis stay soft, puffed, and guilt-free.',
    funnyWarning: 'Warning: Mummy will boast to the entire colony that her rotis are now scientifically superior.',
    features: ['Low GI Atta Premix', 'Double Fiber', 'Puffs Like Normal Phulkas', 'Lab Tested'],
    servingsCount: 14
  },
  {
    id: 'prod_4',
    name: 'Cold-Pressed Jamun & Fennel Digestive Elixir',
    hindiSubtitle: 'जामुन और सौंफ पाचक अमृत',
    category: 'Herbal Hydration',
    price: 399,
    originalPrice: 549,
    rating: 4.7,
    reviewsCount: 156,
    caloriesPerServing: 45,
    proteinPerServing: 1,
    carbsPerServing: 9,
    fatsPerServing: 0,
    image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80',
    description: 'Synergistic infusion of wild jamun seed, roasted saunf (fennel), kokum extract, and pure Himalayan mineral drops. Naturally balances blood sugar after carb meals.',
    whyDietDidiApproves: 'Unlike the placebo "Green Tea cancels 4 Samosas" myth, Jamun seed jamboline naturally modulates carbohydrate enzymatic breakdown.',
    funnyWarning: 'Warning: Tastes deliciously tangy. You might actually prefer it over sweet bottled sodas.',
    features: ['Zero Refined Sugar', 'Blood Sugar Modulator', 'Ayurvedic Botanical Synergy', 'Ready to Sip'],
    servingsCount: 10
  },
  {
    id: 'prod_5',
    name: 'Shahi Paneer & Foxnut Makhana Low-Cal DIY Recipe Kit',
    hindiSubtitle: 'शाही पनीर और मखाना लो-कैलोरी कुकिंग किट',
    category: 'Cooking Recipe Kits',
    price: 549,
    originalPrice: 799,
    rating: 4.95,
    reviewsCount: 488,
    caloriesPerServing: 340,
    proteinPerServing: 29,
    carbsPerServing: 18,
    fatsPerServing: 12,
    image: '/shahi_paneer_kit.jpg',
    description: 'Complete diet cooking kit with vacuum-sealed low-fat malai paneer, organic roasted phool makhana, melon-seed & cashew base gravy (zero cream/maida), and whole royal aromatics.',
    whyDietDidiApproves: 'Replaces heavy commercial whipping cream with whipped melon-seed and blended makhana. You get luxurious velvety gravy at only 340 kcal and 29g protein!',
    funnyWarning: 'Warning: Your relatives will swear you ordered it from a 5-star hotel and demand the recipe.',
    features: ['29g Lean Protein', 'Zero Commercial Cream', 'Ready in 20 Mins', 'Pre-portioned Spices'],
    servingsCount: 4,
    cookingTimeMinutes: 20,
    ingredientsIncluded: [
      '250g Vacuum-sealed Low-Fat Malai Paneer',
      '100g Roasted Organic Foxnut (Phool Makhana)',
      'Pre-simmered Melon Seed & Tomato Base Gravy',
      'Royal Whole Spices Pod (Cardamom, Star Anise, Cloves)',
      'Himalayan Pink Salt & Kasuri Methi Sachet'
    ],
    recipeSteps: [
      'Lightly toss low-fat paneer cubes in a non-stick pan with 1/2 tsp olive oil until golden.',
      'Pour the chef-prepared melon seed & tomato base into the pan and simmer on medium heat for 4 minutes.',
      'Fold in roasted makhana balls and paneer cubes; let them absorb the royal gravy for 3 minutes.',
      'Crush Kasuri Methi between your palms, sprinkle on top with ginger juliennes, and serve piping hot with multigrain phulkas.'
    ]
  },
  {
    id: 'prod_6',
    name: 'Aromatic Chicken Dum Biryani & Burani Raita Cooking Kit',
    hindiSubtitle: 'दम चिकन बिरयानी और बुरानी रायता डाइट किट',
    category: 'Cooking Recipe Kits',
    price: 699,
    originalPrice: 949,
    rating: 4.98,
    reviewsCount: 620,
    caloriesPerServing: 480,
    proteinPerServing: 44,
    carbsPerServing: 45,
    fatsPerServing: 8,
    image: '/diet_biryani_kit.jpg',
    description: 'The holy grail of guilt-free biryani. Marinated tender halal chicken breast, premium aged Dehradun brown basmati rice, whole potli spices, saffron saffron-kewra elixir, and roasted onion crunch.',
    whyDietDidiApproves: '44g of pure high-grade protein! Uses roasted dehydrated shallots instead of deep-fried onions in palm oil. Zero bloating, all flavor.',
    funnyWarning: 'Warning: The saffron aroma will bring neighbors knocking on your door pretending to borrow sugar.',
    features: ['44g High-Grade Protein', 'Low Glycemic Aged Basmati', 'Authentic Clay Handi Compatible', 'Saffron-Infused'],
    servingsCount: 4,
    cookingTimeMinutes: 30,
    ingredientsIncluded: [
      '400g Spiced Marinated Lean Chicken Breast Chunks',
      '250g Aged High-Fiber Dehradun Brown Basmati Rice',
      'Nawabi Potli Spices (Black Cumin, Mace, Bay Leaf)',
      'Saffron & Kewra Water Natural Extract',
      'Air-Crisped Golden Onion Garnish',
      'Roasted Garlic Burani Raita Spice Premix'
    ],
    recipeSteps: [
      'Boil the aged brown basmati in salted aromatic water with the potli spices until 70% cooked; drain gently.',
      'In a thick-bottomed pan, sear the marinated chicken chunks for 6 minutes until partially tender.',
      'Layer the fragrant rice over the chicken, drizzle saffron extract and air-crisped onions, and seal tightly with foil for dum.',
      'Cook on low flame (dum) for 15 minutes. Mix the garlic raita spice into fresh cold yogurt and serve hot!'
    ]
  },
  {
    id: 'prod_7',
    name: 'Bihari High-Protein Chana Sattu Paratha & Chokha Kit',
    hindiSubtitle: 'देसी सत्तू पराठा और भुना बैंगन चोखा कुकिंग किट',
    category: 'Cooking Recipe Kits',
    price: 479,
    originalPrice: 649,
    rating: 4.88,
    reviewsCount: 310,
    caloriesPerServing: 380,
    proteinPerServing: 26,
    carbsPerServing: 52,
    fatsPerServing: 7,
    image: '/sattu_paratha_kit.jpg',
    description: 'Traditional rustic strength food. Stone-ground Bihari roasted chana sattu spiced with nigella (kalonji), ajwain, pickled chili masala, paired with smoky fire-roasted eggplant tomato chokha.',
    whyDietDidiApproves: 'Sattu is the original ancient Indian protein isolate. Satiates appetite for 6 hours straight without sugar crashes.',
    funnyWarning: 'Warning: Gives you the stamina of a pehlwan. You might feel like running up the stairs.',
    features: ['26g Desi Plant Protein', 'Zero Refined Flours', 'Fire-Roasted Smoky Flavor', 'High Fiber Gut Shield'],
    servingsCount: 6,
    cookingTimeMinutes: 15,
    ingredientsIncluded: [
      '300g Stone-Ground Roasted Bengal Gram Sattu',
      'Bihari Paratha Spice Blend (Kalonji, Ajwain, Amchur, Green Chili)',
      'Cold-Pressed Kacchi Ghani Mustard Oil Vinaigrette',
      'Fire-Roasted Baingan & Tomato Chokha Mash Pod',
      'Whole Grain Multigrain Atta Premix'
    ],
    recipeSteps: [
      'Mix the roasted sattu with the spice blend, chopped onions, and 1 tsp cold-pressed mustard oil with a splash of water until crumbly.',
      'Roll a golf-ball sized dough into a small disc, stuff generously with sattu filling, and seal carefully.',
      'Roll gently and toast on a hot tawa with a light brush of oil until crispy golden brown on both sides.',
      'Warm the fire-roasted smoky chokha in a bowl and enjoy hot with fresh pickled chili!'
    ]
  },
  {
    id: 'prod_8',
    name: 'Garlic Palak Paneer & Sweet Corn Super-Greens Kit',
    hindiSubtitle: 'लहसुनी पालक पनीर और स्वीट कॉर्न किट',
    category: 'Cooking Recipe Kits',
    price: 529,
    originalPrice: 749,
    rating: 4.92,
    reviewsCount: 275,
    caloriesPerServing: 280,
    proteinPerServing: 24,
    carbsPerServing: 16,
    fatsPerServing: 9,
    image: '/palak_corn_kit.jpg',
    description: 'Vibrant emerald baby spinach purée cooked with burnt garlic tadka, sweet golden tender corn, and pan-seared paneer cubes. High in iron, zinc, magnesium, and bioavailable protein.',
    whyDietDidiApproves: 'Chlorophyll and iron rich. Unlike heavy restaurant gravies, uses zero food colors and retains the live emerald vitamins.',
    funnyWarning: 'Warning: Makes Popeye look like an amateur.',
    features: ['Vibrant Emerald Spinach', 'High Iron & Bio-Protein', 'Burnt Garlic Tadka', 'Ready in 15 Mins'],
    servingsCount: 4,
    cookingTimeMinutes: 15,
    ingredientsIncluded: [
      '350g Fresh Steamed Baby Spinach & Methi Purée',
      '200g Fresh Low-Fat Paneer Cubes',
      '100g Sweet Golden Corn Kernels',
      'Desi Ghee Roasted Burnt Garlic Tadka Pod',
      'Cumin, Green Chili & Clove Seasoning'
    ],
    recipeSteps: [
      'Heat a skillet and gently sear paneer cubes and sweet corn for 2 minutes until lightly golden.',
      'Add the emerald palak purée and stir gently on medium-low heat for 5 minutes.',
      'Pour the aromatic burnt garlic tadka pod on top and hear the sizzle.',
      'Simmer for 2 more minutes, finish with a squeeze of fresh lemon, and serve!'
    ]
  }
];

export const BUSHRA_BIRYANI_CHAT_HISTORY = [
  {
    id: 'msg_1',
    sender: 'user' as const,
    text: 'Logged: Chicken Dum Biryani (Extra spicy + Burani Raita + Mirchi Ka Salan) — 11:30 PM',
    timestamp: '11:30 PM'
  },
  {
    id: 'msg_2',
    sender: 'coach' as const,
    coachName: 'Coach Majaz (Say No to Motapa)',
    text: "Bushra... it is 11:30 PM on a Sunday night. Tomorrow morning was your sacred 'Strict Clean Diet Monday' declaration! The saffron aroma, ghee-soaked basmati rice, and fried golden onions can be smelled across the entire city. Tell me honestly before I inspect the delivery bill: was it a modest single plate or did you conquer the entire clay handi?",
    timestamp: '11:31 PM',
    quickChoices: [
      {
        id: 'c1',
        userText: 'Coach Majaz, just half a plate! I swear on my gym membership and my weighing scale!',
        coachResponse: 'Achaa ji? And the tender potato and fried onions? Did those just vanish by magic into thin air? Listen: 36g protein is great, but 850 calories at 11:30 PM means tomorrow morning you owe me 45 deep squats and 10,000 steps before lunch. Drink 400ml warm water right now. Deal?',
        actionGuidance: 'High-carb night: drink 400ml water to balance sodium. Do not starve tomorrow.'
      },
      {
        id: 'c2',
        userText: 'Full handi... plus two warm gulab jamuns in syrup. Majaz, please don\'t roast me into oblivion.',
        coachResponse: 'Full handi AND gulab jamun?! Bushra, that rice could fuel an entire cricket team for a five-day test match! But listen carefully: guilt and crying burn exactly zero calories. Savor every grain, forgive yourself, do 15 minutes of slow pacing right now, and tomorrow we crush cardio at 7 AM.',
        actionGuidance: 'Immediate damage control: 15-minute gentle pacing. Drink warm lemon water tomorrow.'
      },
      {
        id: 'c3',
        userText: 'Coach Majaz, today was a brutal family gathering with relatives commenting on my life. My soul needed Biryani.',
        coachResponse: 'Arre meri behan, come here. Rishtedaar comments are worse than 500 burpees. If a plate of fragrant biryani saved your mental sanity and protected your peace tonight, you take it. Your fitness isn\'t ruined by one Sunday biryani; it breaks only if you surrender on Monday. Sleep peacefully, tomorrow we conquer!',
        actionGuidance: 'Emotional stress validated. Sleep well. Hydration + high-protein sprouts breakfast scheduled.'
      }
    ]
  }
];

