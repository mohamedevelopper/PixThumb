// components/AdUnit.js - Complete clean version (replace your entire file)

import { useEffect } from 'react';

const AdUnit = ({ 
  adSlot, 
  adFormat = "auto", 
  fullWidthResponsive = true, 
  style = {},
  className = "",
  adTest = true // Set to false in production with real AdSense
}) => {
  useEffect(() => {
    try {
      // Only push ads if window.adsbygoogle exists and not in test mode
      if (typeof window !== 'undefined' && window.adsbygoogle && !adTest) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      console.log('AdSense error:', err);
    }
  }, [adTest]);

  return (
    <div className={`ad-container ${className}`} style={style}>
      {/* Development placeholder */}
      {adTest && (
        <div className="bg-gray-200 dark:bg-gray-700 border-2 border-dashed border-gray-400 dark:border-gray-500 p-8 text-center text-gray-600 dark:text-gray-400 rounded-lg">
          <div className="text-sm font-medium mb-2">Ad Placeholder</div>
          <div className="text-xs opacity-75">Slot: {adSlot}</div>
          <div className="text-xs opacity-50 mt-1">AdSense will appear here when activated</div>
        </div>
      )}
      
      {/* Actual AdSense unit */}
      {!adTest && (
        <ins
          className="adsbygoogle"
          style={{ display: 'block', ...style }}
          data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}
          data-ad-slot={adSlot}
          data-ad-format={adFormat}
          data-full-width-responsive={fullWidthResponsive.toString()}
        />
      )}
    </div>
  );
};

// Pre-configured ad components for easy use
export const AdBanner = ({ className = "" }) => (
  <AdUnit
    adSlot="1234567890"
    adFormat="horizontal"
    className={`my-8 ${className}`}
    style={{ minHeight: '90px' }}
    adTest={true} // Shows placeholder in development
  />
);

export const AdInFeed = ({ className = "" }) => (
  <AdUnit
    adSlot="1234567891"
    adFormat="fluid"
    className={`my-6 ${className}`}
    style={{ minHeight: '250px' }}
    adTest={true} // Shows placeholder in development
  />
);

export const AdSidebar = ({ className = "" }) => (
  <AdUnit
    adSlot="1234567892"
    adFormat="vertical"
    className={`${className}`}
    style={{ minHeight: '600px', width: '300px' }}
    adTest={true} // Shows placeholder in development
  />
);

// Alternative: Live ads (for when you have real AdSense approval)
export const AdBannerLive = ({ className = "" }) => (
  <AdUnit
    adSlot={process.env.NEXT_PUBLIC_ADSENSE_BANNER_SLOT || "1234567890"}
    adFormat="horizontal"
    className={`my-8 ${className}`}
    style={{ minHeight: '90px' }}
    adTest={false} // Shows real AdSense ads
  />
);

export const AdInFeedLive = ({ className = "" }) => (
  <AdUnit
    adSlot={process.env.NEXT_PUBLIC_ADSENSE_INFEED_SLOT || "1234567891"}
    adFormat="fluid"
    className={`my-6 ${className}`}
    style={{ minHeight: '250px' }}
    adTest={false} // Shows real AdSense ads
  />
);

export default AdUnit;