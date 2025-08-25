import AdUnit from './AdUnit';

export const AdBanner = ({ className = "" }) => (
  <AdUnit
    adSlot={process.env.NEXT_PUBLIC_ADSENSE_BANNER_SLOT}
    adFormat="horizontal"
    className={`my-8 ${className}`}
    style={{ minHeight: '90px' }}
  />
);