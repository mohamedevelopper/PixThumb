// lib/adOptimization.js - Enhanced Ad Optimization

export const adOptimization = {
  // Determine optimal ad frequency based on user behavior
  getAdFrequency: (pageViews, downloads, timeSpent) => {
    const engagementScore = (downloads * 10) + (pageViews * 2) + (timeSpent / 60);
    
    if (engagementScore > 50) return 'high'; // Engaged users - show more ads
    if (engagementScore > 20) return 'medium'; // Moderate users - balanced approach
    return 'low'; // New users - fewer ads for better experience
  },

  // A/B test ad positions
  getAdVariant: () => {
    if (typeof window === 'undefined') return 'control';
    
    let variant = localStorage.getItem('ad_variant');
    if (!variant) {
      const variants = ['control', 'more_top', 'more_content', 'sidebar_focus'];
      variant = variants[Math.floor(Math.random() * variants.length)];
      localStorage.setItem('ad_variant', variant);
    }
    return variant;
  },

  // Track ad performance
  trackAdPerformance: async (eventType, adSlot, additionalData = {}) => {
    try {
      await fetch('/api/ad-analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventType,
          adSlot,
          position: additionalData.position,
          timestamp: new Date().toISOString(),
          ...additionalData
        })
      });
    } catch (error) {
      console.log('Failed to track ad performance:', error);
    }
  },

  // Optimize ad loading based on connection speed
  shouldDelayAdLoad: () => {
    if (typeof navigator === 'undefined') return false;
    
    // Check for slow connection
    if ('connection' in navigator) {
      const connection = navigator.connection;
      return connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g';
    }
    return false;
  },

  // Check if user is likely to engage with ads
  getUserAdTolerance: () => {
    const visits = parseInt(localStorage.getItem('visit_count') || '0');
    const lastVisit = localStorage.getItem('last_visit');
    const now = new Date().toISOString();
    
    // Update visit tracking
    localStorage.setItem('visit_count', (visits + 1).toString());
    localStorage.setItem('last_visit', now);
    
    // Return users are more tolerant of ads
    if (visits > 5) return 'high';
    if (visits > 2) return 'medium';
    return 'low';
  }
};