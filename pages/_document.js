// pages/_document.js - Fixed to prevent FOUC
import { Html, Head, Main, NextScript } from 'next/document';
import { GA_TRACKING_ID } from '../lib/gtag';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Critical CSS to prevent FOUC */}
        <style dangerouslySetInnerHTML={{
          __html: `
            html, body {
              margin: 0;
              padding: 0;
              font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            }
            .min-h-screen {
              min-height: 100vh;
            }
            .flex {
              display: flex;
            }
            .flex-col {
              flex-direction: column;
            }
            .flex-1 {
              flex: 1;
            }
            .bg-gray-50 {
              background-color: #f9fafb;
            }
            .text-gray-900 {
              color: #111827;
            }
            @media (prefers-color-scheme: dark) {
              .dark\\:bg-gray-900 {
                background-color: #111827;
              }
              .dark\\:text-gray-100 {
                color: #f3f4f6;
              }
            }
            /* Loading state */
            .loading-container {
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: #f9fafb;
              z-index: 9999;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .loading-spinner {
              width: 40px;
              height: 40px;
              border: 4px solid #e5e7eb;
              border-top: 4px solid #6366f1;
              border-radius: 50%;
              animation: spin 1s linear infinite;
            }
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `
        }} />

        {/* Favicon Implementation */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-96x96.png" type="image/png" sizes="96x96" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#dc4444" />

        {/* Preload critical resources */}
        <link rel="preload" href="/_next/static/css/app.css" as="style" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />

        {/* AdSense Implementation */}
        {process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID && (
          <>
            <script
              async
              src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID}`}
              crossOrigin="anonymous"
            />
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
          </>
        )}
        
        {/* Google Analytics Implementation */}
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

        {/* Performance Optimizations */}
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        <link rel="preconnect" href="https://googleads.g.doubleclick.net" />
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