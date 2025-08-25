// lib/adPerformance.js - Ad performance tracking
export const trackAdPerformance = {
  // Track ad impressions
  trackImpression: (adSlot, position) => {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'ad_impression', {
        event_category: 'ads',
        event_label: adSlot,
        custom_parameter_1: position
      });
    }
  },

  // Track ad clicks
  trackClick: (adSlot, position) => {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'ad_click', {
        event_category: 'ads', 
        event_label: adSlot,
        custom_parameter_1: position
      });
    }
  },

  // Track user engagement with content near ads
  trackEngagement: (contentType, adNearby = false) => {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'content_engagement', {
        event_category: 'engagement',
        event_label: contentType,
        custom_parameter_1: adNearby ? 'ad_nearby' : 'no_ad'
      });
    }
  },

  // Track revenue per user session
  trackSession: () => {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'session_with_ads', {
        event_category: 'monetization'
      });
    }
  }
};