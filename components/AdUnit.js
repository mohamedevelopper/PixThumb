// components/AdUnit.js
import { useEffect } from 'react';

// Base AdUnit component
export const AdUnit = ({ 
  adSlot, 
  adFormat = 'auto', 
  fullWidthResponsive = true, 
  className = '',
  style = {},
  adLayoutKey = '',
  adLayout = ''
}) => {
  useEffect(() => {
    // Only load ads if AdSense ID is configured
    if (process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        console.error('AdSense error:', err);
      }
    }
  }, []);

  // Don't render if no AdSense ID configured
  if (!process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID) {
    return null;
  }

  return (
    <div className={className} style={style}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive}
        data-ad-layout-key={adLayoutKey}
        data-ad-layout={adLayout}
      />
    </div>
  );
};

// Banner Ad Component
export const AdBanner = ({ className = '', adSlot = "1234567890" }) => (
  <AdUnit 
    adSlot={adSlot}
    adFormat="auto"
    fullWidthResponsive={true}
    className={`w-full max-w-4xl mx-auto ${className}`}
  />
);

// Sidebar Ad Component
export const AdSidebar = ({ className = '', adSlot = "1234567891" }) => (
  <AdUnit 
    adSlot={adSlot}
    adFormat="auto"
    fullWidthResponsive={true}
    className={`w-full ${className}`}
  />
);

// In-Feed Ad Component
export const AdInFeed = ({ className = '', adSlot = "1234567892" }) => (
  <AdUnit 
    adSlot={adSlot}
    adFormat="fluid"
    adLayoutKey="-6t+ed+2i-1n-4w"
    className={`w-full ${className}`}
  />
);

export default AdUnit;