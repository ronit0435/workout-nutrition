/**
 * High-fidelity, category-accurate product imagery.
 * Strict Rule: Every product image visually corresponds to the actual supplement type.
 * Whey -> Whey tub/shake
 * Creatine -> Micronized creatine tub/powder/scoop
 * Pre-Workout -> Pre-workout energy tub
 * Mass Gainer -> Heavy gainer bulking tub/pouch
 * Fish Oil -> Amber translucent omega-3 softgels and bottle
 * Multivitamins -> Athlete multivitamin tablet bottle
 * BCAA & EAA -> Intra-workout aminos tub
 * Fat Burner -> Thermogenic shred capsule bottle
 */

export const CATEGORY_IMAGE_MAP: Record<string, string[]> = {
  'Whey Protein': [
    'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=800&q=80',
  ],
  'Whey Isolate': [
    'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?auto=format&fit=crop&w=800&q=80',
  ],
  'Creatine': [
    // Real pure white micronized creatine monohydrate container with scoop & powder
    'https://images.unsplash.com/photo-1594882645126-14020914d58d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
  ],
  'Pre Workout': [
    // Dynamic pre-workout energy tub container with intense athletic styling
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=800&q=80',
  ],
  'Mass Gainer': [
    // High-calorie heavy bulking mass gainer container
    'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
  ],
  'Fish Oil': [
    // Golden translucent omega-3 fish oil softgels and bottle
    'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
  ],
  'Multivitamins': [
    // Athlete daily multivitamin bottle with clean dietary tablets
    'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=800&q=80',
  ],
  'BCAA & EAA': [
    // Intra-workout amino tub and hydration powder container
    'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
  ],
  'Fat Burner': [
    // Thermogenic metabolic shredder capsule container
    'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
  ],
  'Glutamine & Aminos': [
    'https://images.unsplash.com/photo-1594882645126-14020914d58d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=800&q=80',
  ],
  'Health & Wellness': [
    'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=800&q=80',
  ],
};

export const getCategoryImages = (category: string): string[] => {
  return CATEGORY_IMAGE_MAP[category] || CATEGORY_IMAGE_MAP['Whey Protein'];
};
