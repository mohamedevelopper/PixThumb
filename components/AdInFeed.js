export const AdInFeed = ({ className = "" }) => (
  <AdUnit
    adSlot={process.env.NEXT_PUBLIC_ADSENSE_INFEED_SLOT}
    adFormat="fluid"
    className={`my-6 ${className}`}
    style={{ minHeight: '250px' }}
  />
);