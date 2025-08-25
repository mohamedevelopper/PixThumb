export const AdSidebar = ({ className = "" }) => (
  <AdUnit
    adSlot={process.env.NEXT_PUBLIC_ADSENSE_SIDEBAR_SLOT}
    adFormat="vertical"
    className={`${className}`}
    style={{ minHeight: '600px', width: '300px' }}
  />
);