import React from 'react';
import { HeroSlider } from '../home/HeroSlider';
import { TrustBenefitsStrip } from '../home/TrustBenefitsStrip';
import { ShopByGoalSection } from '../home/ShopByGoalSection';
import { BestSellersSection } from '../home/BestSellersSection';
import { ShopByCategorySection } from '../home/ShopByCategorySection';
import { ShopTopBrandsSection } from '../home/ShopTopBrandsSection';
import { DealsSection } from '../home/DealsSection';
import { FitnessEducationSection } from '../home/FitnessEducationSection';
import { ProductRecommendationSection } from '../home/ProductRecommendationSection';
import { CustomerReviewsSection } from '../home/CustomerReviewsSection';
import { FAQSection } from '../home/FAQSection';
import { SocialGridSection } from '../home/SocialGridSection';
import { NewsletterSection } from '../home/NewsletterSection';

export const HomePage: React.FC = () => {
  return (
    <div className="w-full">
      {/* 1. Cinematic Hero Slider */}
      <HeroSlider />

      {/* 2. Trust / Benefits Strip Immediately Below Hero */}
      <TrustBenefitsStrip />

      {/* 3. Shop By Goal (7 Cards) */}
      <ShopByGoalSection />

      {/* 4. Featured / Best Selling Products */}
      <BestSellersSection />

      {/* 5. Product Categories (8 Categories with Actual Imagery) */}
      <ShopByCategorySection />

      {/* 6. Limited Time Offers & Deals with Countdown */}
      <DealsSection />

      {/* 7. Shop By Brand (Showing Actual Brands from Database) */}
      <ShopTopBrandsSection />

      {/* 8. Science-Backed Athletic Guidance / Fitness Knowledge */}
      <div id="fitness-knowledge">
        <FitnessEducationSection />
      </div>

      {/* 9. Interactive Product Recommendation Advisor */}
      <ProductRecommendationSection />

      {/* 10. Customer Reviews / What Our Customers Say */}
      <CustomerReviewsSection />

      {/* 11. Frequently Asked Questions (Expandable Accordions) */}
      <FAQSection />

      {/* 12. Athlete Instagram / Community Grid */}
      <SocialGridSection />

      {/* 13. VIP Newsletter Discount */}
      <NewsletterSection />
    </div>
  );
};
