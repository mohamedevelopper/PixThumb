// lib/adsense.js - AdSense utilities
export const initializeAdsense = () => {
  if (typeof window !== 'undefined' && !window.adsbygoogle) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}`;
    script.crossOrigin = "anonymous";
    document.head.appendChild(script);
    
    window.adsbygoogle = window.adsbygoogle || [];
  }
};

// Track ad performance with analytics
export const trackAdEvent = (eventName, adSlot) => {
  if (typeof gtag !== 'undefined') {
    gtag('event', eventName, {
      event_category: 'ads',
      event_label: adSlot,
    });
  }
};