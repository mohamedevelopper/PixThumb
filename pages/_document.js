// pages/_document.js - Enhanced while preserving your existing setup

import { Html, Head, Main, NextScript } from 'next/document';
import { GA_TRACKING_ID } from '../lib/gtag'; // PRESERVED: Your existing gtag import

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* PRESERVED + ENHANCED: Your AdSense script with improvements */}
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID}`}
          crossOrigin="anonymous"
        />
        
        {/* NEW: AdSense Auto Ads initialization (optional - can improve revenue) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (adsbygoogle = window.adsbygoogle || []).push({
                google_ad_client: "${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID}",
                enable_page_level_ads: true
              });
            `,
          }}
        />
        
        {/* PRESERVED: Your existing Google Analytics script (perfectly fine) */}
        {GA_TRACKING_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_TRACKING_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}

        {/* NEW: Preconnect to ad domains for better performance */}
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        <link rel="preconnect" href="https://googleads.g.doubleclick.net" />
        
        {/* NEW: DNS prefetch for ad performance */}
        <link rel="dns-prefetch" href="//pagead2.googlesyndication.com" />
        <link rel="dns-prefetch" href="//googleads.g.doubleclick.net" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}