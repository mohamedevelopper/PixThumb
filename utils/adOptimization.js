// utils/adOptimization.js - A/B testing for ad placements
export const adOptimization = {
  // Get user's ad variant for A/B testing
  getAdVariant: () => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('ad_variant');
      if (stored) return stored;
      
      const variants = ['control', 'more_ads', 'fewer_ads', 'different_positions'];
      const variant = variants[Math.floor(Math.random() * variants.length)];
      localStorage.setItem('ad_variant', variant);
      return variant;
    }
    return 'control';
  },

  // Check if ads should be shown based on user behavior
  shouldShowAd: (position, userActions = 0) => {
    // Don't show too many ads to new users
    if (userActions < 2 && position > 2) return false;
    
    // Show more ads to engaged users
    if (userActions > 5) return true;
    
    return true;
  },

  // Optimize ad frequency
  getAdFrequency: (pageViews, downloads) => {
    if (downloads > 10) return 'high'; // Engaged users see more ads
    if (downloads > 3) return 'medium';
    return 'low'; // New users see fewer ads
  }
};