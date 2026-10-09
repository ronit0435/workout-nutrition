import { GoalType } from '../types';

export interface GoalItem {
  id: GoalType;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  heroImage: string;
  recommendedCategories: string[];
  tips: string[];
}

export const GOALS: GoalItem[] = [
  {
    id: 'build-muscle',
    slug: 'build-muscle',
    title: 'BUILD MUSCLE',
    subtitle: 'Hypertrophy & Lean Mass Acceleration',
    description: 'Designed to support muscle protein synthesis and lean tissue development with fast-acting whey peptides and essential aminos.',
    heroImage: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1200&q=80',
    recommendedCategories: ['Whey Protein', 'Whey Isolate', 'Creatine'],
    tips: [
      'Target 1.6g–2.2g of protein per kg of bodyweight daily.',
      'Consume 25g–30g fast-acting whey within 45 minutes of training.',
      'Maintain progressive overload in the 6–12 hypertrophy rep range.',
    ],
  },
  {
    id: 'gain-weight',
    slug: 'gain-weight',
    title: 'GAIN WEIGHT',
    subtitle: 'Caloric Surplus & Muscle Volume',
    description: 'Formulated for hardgainers looking to pack on quality size with nutrient-dense complex carbs and multi-stage proteins.',
    heroImage: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=1200&q=80',
    recommendedCategories: ['Mass Gainer', 'Carbohydrates & Recovery', 'Creatine'],
    tips: [
      'Aim for a 300–500 daily calorie surplus beyond maintenance.',
      'Use high-calorie mass gainers between main meals to avoid fullness during lunch/dinner.',
      'Pair heavy compound lifting with adequate nighttime rest.',
    ],
  },
  {
    id: 'lose-fat',
    slug: 'lose-fat',
    title: 'LOSE FAT',
    subtitle: 'Metabolic Support & Lean Muscle Retention',
    description: 'Engineered to support metabolic rate and preserve lean muscle while operating in a caloric deficit with zero carb isolates and L-Carnitine.',
    heroImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80',
    recommendedCategories: ['Whey Isolate', 'Fat Burner', 'BCAA & EAA', 'Fish Oil'],
    tips: [
      'Prioritize ultra-pure Whey Isolate with < 1g carb per serving to keep macros tight.',
      'Supplement with Omega-3 to support insulin sensitivity and metabolic health.',
      'Ensure high protein intake to prevent catabolic muscle loss while cutting.',
    ],
  },
  {
    id: 'increase-strength',
    slug: 'increase-strength',
    title: 'INCREASE STRENGTH',
    subtitle: 'Peak Power Output & Heavy Compound Lifts',
    description: 'Supports intracellular phosphocreatine resynthesis and high-intensity power output on squats, bench presses, and deadlifts.',
    heroImage: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=1200&q=80',
    recommendedCategories: ['Creatine', 'Pre Workout', 'Whey Protein'],
    tips: [
      'Consume 3g–5g micronized creatine daily without fail to sustain saturation.',
      'Utilize clinically dosed Beta-Alanine to buffer muscular lactic acid.',
      'Hydrate with at least 3.5 liters of clean water daily.',
    ],
  },
  {
    id: 'boost-energy',
    slug: 'boost-energy',
    title: 'BOOST ENERGY',
    subtitle: 'Alert Focus & Explosive Training Stamina',
    description: 'Formulated with clean caffeine, L-Citrulline, and nootropic compounds to elevate mental focus and training drive without the crash.',
    heroImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
    recommendedCategories: ['Pre Workout', 'BCAA & EAA'],
    tips: [
      'Take pre-workouts 20–30 minutes prior to heavy training sessions.',
      'Avoid high-stimulant formulas within 4–5 hours of bedtime.',
      'Cycle pre-workouts every 6–8 weeks to reset tolerance.',
    ],
  },
  {
    id: 'recovery',
    slug: 'recovery',
    title: 'RECOVERY',
    subtitle: 'Tissue Repair & Reduced Soreness',
    description: 'Supplies essential amino acids, branched-chain aminos, and glutamine to accelerate post-exercise repair and combat soreness.',
    heroImage: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80',
    recommendedCategories: ['BCAA & EAA', 'Glutamine & Aminos', 'Whey Protein', 'Fish Oil'],
    tips: [
      'Sip intra-workout aminos with electrolytes during exhausting sessions.',
      'Combine post-workout protein with 5g L-Glutamine.',
      'Incorporate quality deep sleep to facilitate endocrine recovery.',
    ],
  },
  {
    id: 'health-wellness',
    slug: 'health-wellness',
    title: 'HEALTH & WELLNESS',
    subtitle: 'Daily Micronutrients, Joints & Longevity',
    description: 'Foundational micronutrient formulas, triple-strength omega-3s, and joint support complexes designed for the rigorous lifestyle of active lifters.',
    heroImage: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&w=1200&q=80',
    recommendedCategories: ['Multivitamins', 'Fish Oil', 'Health & Wellness'],
    tips: [
      'Take athlete multivitamins and fish oils with healthy dietary fats.',
      'Supplement joint glucosamine/collagen to support ligament resilience under load.',
      'Focus on regular electrolyte balance throughout the day.',
    ],
  },
];
