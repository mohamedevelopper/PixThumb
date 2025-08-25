// lib/gtag.js - Complete analytics integration
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

// Check if we're in production and have a tracking ID
const isProduction = process.env.NODE_ENV === 'production';
const hasTrackingId = GA_TRACKING_ID && GA_TRACKING_ID !== 'G-XXXXXXXXXX';

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url) => {
  if (!isProduction || !hasTrackingId) return;
  
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }) => {
  if (!isProduction || !hasTrackingId) return;
  
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

// Custom events for your thumbnail downloader
export const trackThumbnailDownload = (videoId, quality) => {
  event({
    action: 'download_thumbnail',
    category: 'engagement',
    label: `${videoId}_${quality}`,
  });
  
  // Also track as conversion
  event({
    action: 'conversion',
    category: 'goal',
    label: 'thumbnail_download',
  });
  
  console.log(`📊 Analytics: Thumbnail downloaded - ${quality} quality for video ${videoId}`);
};

export const trackUrlSubmission = (videoId) => {
  event({
    action: 'submit_url',
    category: 'engagement',
    label: videoId,
  });
  
  console.log(`📊 Analytics: URL submitted for video ${videoId}`);
};

export const trackCopyUrl = (quality) => {
  event({
    action: 'copy_url',
    category: 'engagement',
    label: quality,
  });
  
  console.log(`📊 Analytics: URL copied - ${quality} quality`);
};

export const trackError = (errorType, errorMessage) => {
  event({
    action: 'error',
    category: 'error',
    label: `${errorType}: ${errorMessage}`,
  });
  
  console.log(`📊 Analytics: Error tracked - ${errorType}: ${errorMessage}`);
};

export const trackPageLoad = (pageName) => {
  event({
    action: 'page_load',
    category: 'navigation',
    label: pageName,
  });
};

export const trackFeatureUsage = (feature) => {
  event({
    action: 'feature_use',
    category: 'engagement',
    label: feature,
  });
};

// Track theme changes
export const trackThemeChange = (theme) => {
  event({
    action: 'theme_change',
    category: 'ui',
    label: theme,
  });
};

// Track social shares
export const trackSocialShare = (platform) => {
  event({
    action: 'social_share',
    category: 'engagement',
    label: platform,
  });
};