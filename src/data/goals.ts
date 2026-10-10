
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
    description:
      'Discover whey protein, creatine and amino acid products that complement your muscle-building routine.',
    heroImage:
      'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1200&q=80',
    recommendedCategories: [
      'Whey Protein',
      'Whey Isolate',
      'Creatine',
      'BCAA & EAA',
    ],
    tips: [
      'Consume adequate daily protein to support muscle growth.',
      'Combine resistance training with consistent nutrition.',
      'Maintain progressive overload and sufficient recovery.',
    ],
  },
  {
    id: 'gain-weight',
    slug: 'gain-weight',
    title: 'GAIN WEIGHT',
    subtitle: 'Caloric Surplus & Muscle Volume',
    description:
      'Explore mass gainers and nutrition products that complement a calorie-surplus diet and muscle-building routine.',
    heroImage:
      'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=1200&q=80',
    recommendedCategories: [
      'Mass Gainer',
      'Carbohydrates & Recovery',
      'Whey Protein',
      'Creatine',
    ],
    tips: [
      'Aim for a sustainable calorie surplus.',
      'Use convenient nutrition products to complement balanced meals.',
      'Combine strength training with adequate rest.',
    ],
  },
  {
    id: 'lose-fat',
    slug: 'lose-fat',
    title: 'LOSE FAT',
    subtitle: 'Metabolic Support & Lean Muscle Retention',
    description:
      'Explore protein and other nutrition products that complement a calorie-controlled diet and help support lean muscle retention.',
    heroImage:
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80',
      
    recommendedCategories: [
    'Fat Burner',
    'Whey Isolate',
    'BCAA & EAA',
    'Fish Oil',
    ],
    tips: [
      'Prioritize adequate protein while managing calorie intake.',
      'Combine balanced nutrition with regular physical activity.',
      'Maintain consistent training, hydration and recovery.',
    ],
  },
  {
    id: 'increase-strength',
    slug: 'increase-strength',
    title: 'INCREASE STRENGTH',
    subtitle: 'Peak Power Output & Heavy Compound Lifts',
    description:
      'Explore creatine, pre-workout and protein products that complement strength training.',
    heroImage:
      'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=1200&q=80',
    recommendedCategories: [
      'Creatine',
      'Pre Workout',
      'Whey Protein',
      'BCAA & EAA',
    ],
    tips: [
      'Follow a progressive strength-training program.',
      'Choose supplements that complement your nutrition and training.',
      'Allow adequate recovery between demanding sessions.',
    ],
  },
  {
    id: 'boost-energy',
    slug: 'boost-energy',
    title: 'BOOST ENERGY',
    subtitle: 'Alert Focus & Explosive Training Stamina',
    description:
      'Discover pre-workout and training nutrition products for your workout routine.',
    heroImage:
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
    recommendedCategories: [
      'Pre Workout',
      'BCAA & EAA',
      'Carbohydrates & Recovery',
    ],
    tips: [
      'Maintain adequate sleep and hydration.',
      'Review caffeine content before using stimulant-based products.',
      'Match workout nutrition to your training routine.',
    ],
  },
  {
    id: 'recovery',
    slug: 'recovery',
    title: 'RECOVERY',
    subtitle: 'Tissue Repair & Reduced Soreness',
    description:
      'Explore protein, amino acid and recovery nutrition products that complement post-workout recovery.',
    heroImage:
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80',
    recommendedCategories: [
      'BCAA & EAA',
      'Glutamine & Aminos',
      'Whey Protein',
      'Fish Oil',
      'Carbohydrates & Recovery',
    ],
    tips: [
      'Include sufficient protein in your daily diet.',
      'Prioritize sleep, hydration and rest days.',
      'Choose recovery nutrition that complements your dietary needs.',
    ],
  },
  {
    id: 'health-wellness',
    slug: 'health-wellness',
    title: 'HEALTH & WELLNESS',
    subtitle: 'Daily Micronutrients, Joints & Longevity',
    description:
      'Explore multivitamins, omega-3 and wellness products for an active lifestyle.',
    heroImage:
      'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&w=1200&q=80',
    recommendedCategories: [
      'Multivitamins',
      'Fish Oil',
      'Health & Wellness',
    ],
    tips: [
      'Build your routine around a balanced and varied diet.',
      'Review product ingredients and serving instructions.',
      'Choose wellness products according to your individual needs.',
    ],
  },
];