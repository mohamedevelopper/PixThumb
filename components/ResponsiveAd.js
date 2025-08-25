// components/ResponsiveAd.js - Mobile-optimized ad component
import { useState, useEffect } from 'react';
import AdUnit from './AdUnit';

const ResponsiveAd = ({ desktopSlot, mobileSlot, className = "" }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <AdUnit
      adSlot={isMobile ? mobileSlot : desktopSlot}
      adFormat="auto"
      className={className}
      style={{ 
        minHeight: isMobile ? '250px' : '280px',
        width: '100%'
      }}
    />
  );
};

export default ResponsiveAd;