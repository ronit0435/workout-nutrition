export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  group: 'PROTEIN' | 'PERFORMANCE' | 'MASS & RECOVERY' | 'HEALTH & WELLNESS';
  tagline: string;
  description: string;
  image: string;
  subcategories: string[];
}

export const CATEGORIES: CategoryItem[] = [
  {
    id: 'whey-protein',
    name: 'PROTEIN',
    slug: 'whey-protein',
    group: 'PROTEIN',
    tagline: 'Build & Recover',
    description: 'Gold-standard fast-digesting proteins delivering 24g–27g pure protein per scoop to trigger muscle protein synthesis after strenuous lifting.',
    image: 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?auto=format&fit=crop&w=600&q=80',
    subcategories: ['Whey Concentrate', 'Whey Isolate', 'Hydrolyzed Whey', 'Mass Gainer'],
  },
  {
    id: 'whey-isolate',
    name: 'WHEY ISOLATE',
    slug: 'whey-isolate',
    group: 'PROTEIN',
    tagline: 'Ultra-Pure 90%+ WPI',
    description: 'Micro-filtered and hydrolyzed isolates stripped of lactose, fats, and excess carbs. Ideal for competition prep and fast post-workout amino absorption.',
    image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=600&q=80',
    subcategories: ['Hydrolyzed Isolate', 'Cross-Flow Microfiltered', 'Zero Carb Isolate'],
  },
  {
    id: 'creatine',
    name: 'CREATINE',
    slug: 'creatine',
    group: 'PERFORMANCE',
    tagline: 'Strength & Power',
    description: '100% pure micronized creatine monohydrate and Creapure for rapid phosphocreatine resynthesis, cell volumization, and raw power.',
    image: 'https://images.unsplash.com/photo-1594882645126-14020914d58d?auto=format&fit=crop&w=600&q=80',
    subcategories: ['Creatine Monohydrate', 'Micronized Creatine', 'Creapure', 'Creatine HCL'],
  },
  {
    id: 'pre-workout',
    name: 'PRE-WORKOUT',
    slug: 'pre-workout',
    group: 'PERFORMANCE',
    tagline: 'Energy & Focus',
    description: 'Clinically dosed nitric oxide boosters, caffeine, beta-alanine, and nootropics engineered to amplify skin-tearing pumps and laser focus.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80',
    subcategories: ['High Stimulant', 'Pump & Non-Stim', 'Focus & Nootropic', 'Pre-Workout Shots'],
  },
  {
    id: 'mass-gainer',
    name: 'MASS GAINER',
    slug: 'mass-gainer',
    group: 'MASS & RECOVERY',
    tagline: 'Calorie & Mass Support',
    description: 'High-density complex carbohydrates and multi-phase proteins formulated to help hardgainers pack on dense, muscular body weight without fat spillover.',
    image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=600&q=80',
    subcategories: ['Lean Mass Gainer', 'High Calorie Mass Gainer', 'Carb Blends'],
  },
  {
    id: 'fish-oil',
    name: 'FISH OIL',
    slug: 'fish-oil',
    group: 'HEALTH & WELLNESS',
    tagline: 'Joint & Heart Health',
    description: 'Triple-strength molecularly distilled deep-sea fish oils packed with 1000mg+ EPA and DHA for joint lubrication, cardio health, and anti-inflammation.',
    image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=600&q=80',
    subcategories: ['Triple Strength Omega 3', 'Enteric Coated Softgels', 'Krill Oil'],
  },
  {
    id: 'multivitamins',
    name: 'MULTIVITAMINS',
    slug: 'multivitamins',
    group: 'HEALTH & WELLNESS',
    tagline: 'Vitality & Immunity',
    description: 'High-potency athlete multivitamin complexes with 40+ active ingredients, digestive enzymes, and botanical extracts for everyday metabolic support.',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
    subcategories: ['Men’s Daily Athlete', 'Women’s Fitness Multi', 'Immunity Boosters'],
  },
  {
    id: 'bcaa-eaa',
    name: 'BCAA / EAA',
    slug: 'bcaa-eaa',
    group: 'PERFORMANCE',
    tagline: 'Intra-Workout Hydration',
    description: 'Fermented plant essential amino acids and 2:1:1 BCAAs with added electrolytes to combat muscle breakdown and delay training fatigue.',
    image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=600&q=80',
    subcategories: ['2:1:1 BCAA', 'Full Spectrum 9 EAA', 'Hydration Aminos'],
  },
  {
    id: 'health-wellness',
    name: 'WELLNESS',
    slug: 'health-wellness',
    group: 'HEALTH & WELLNESS',
    tagline: 'Daily Longevity',
    description: 'Joint support glucosamine formulas, marine collagen peptides, Ashwagandha KSM-66, and ZMA for restorative recovery and deep sleep.',
    image: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&w=600&q=80',
    subcategories: ['Joint Support', 'Collagen Peptides', 'ZMA & Sleep', 'Test Boosters'],
  },
];
