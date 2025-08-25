// pages/index.js - Complete implementation with AdBlockDetector

import Head from 'next/head';
import Link from 'next/link';
import ThumbnailDownloader from '../components/ThumbnailDownloader';
import Faq from '../components/Faq';
import HowToUse from '../components/HowToUse';
import Footer from '../components/Footer';
import ThemeChanger from '../components/ThemeChanger';
// Import ad components
import { AdBanner, AdInFeed } from '../components/AdUnit';
import AdBlockDetector from '../components/AdBlockDetector';

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "PixThumb - Free YouTube Thumbnail Downloader & Grabber",
    "description": "Instantly download any YouTube thumbnail in full HD with the PixThumb thumbnail grabber. Paste a URL to get your thumbnail from YouTube in seconds.",
    "url": "https://pixthumb.com",
    "applicationCategory": "MultimediaApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-300">
      <Head>
        <title>PixThumb | Free YouTube Thumbnail Downloader & Grabber</title>
        <meta name="description" content="Instantly download any YouTube thumbnail in full HD with the PixThumb thumbnail grabber. Paste a URL to get your thumbnail from YouTube in seconds. Free and easy!" />
        
        <meta name="keywords" content="youtube thumbnail downloader, download thumbnail, get youtube thumbnail, thumbnail grabber, youtube thumbnail, thumbnail maker, free thumbnail downloader" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://pixthumb.com" />
        
        <meta property="og:title" content="PixThumb - Free YouTube Thumbnail Downloader & Grabber" />
        <meta property="og:description" content="The easiest way to get the thumbnail from any YouTube video. Just paste the URL and download in HD." />
        <meta property="og:url" content="https://pixthumb.com" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://pixthumb.com/og-image.png" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="PixThumb - Free YouTube Thumbnail Downloader & Grabber" />
        <meta name="twitter:description" content="The easiest way to get the thumbnail from any YouTube video. Just paste the URL and download in HD." />
        <meta name="twitter:image" content="https://pixthumb.com/twitter-image.png" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <nav className="w-full py-3 bg-white shadow-sm sticky top-0 z-10 dark:bg-gray-800 dark:border-b dark:border-gray-700">
        <div className="max-w-5xl mx-auto flex justify-between items-center px-4">
          <Link href="/" legacyBehavior>
            <a className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">PixThumb</a>
          </Link>
          <div className="flex items-center gap-8">
            <div className="space-x-8 font-semibold text-gray-700 dark:text-gray-200">
              <Link href="/blog" legacyBehavior>
                <a className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Blog</a>
              </Link>
            </div>
            <ThemeChanger />
          </div>
        </div>
      </nav>

      {/* Wrap all ad content with AdBlockDetector */}
      <AdBlockDetector>
        {/* Top Banner Ad - High visibility */}
        <div className="w-full max-w-6xl px-4 py-4">
          <AdBanner className="my-8" />
        </div>

        <main className="w-full flex flex-col items-center justify-center pt-16 px-4 text-center">
          <div className="max-w-4xl w-full mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Free YouTube Thumbnail Downloader
            </h1>

            <p className="mt-6 max-w-3xl mx-auto text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              The easiest way to **download a YouTube thumbnail**. Paste any video URL to instantly **get the thumbnail from YouTube** in full HD quality.
            </p>
            
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <span className="inline-flex items-center px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-sm font-medium rounded-full">✓ 100% Free</span>
              <span className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm font-medium rounded-full">⚡ Instant Download</span>
              <span className="inline-flex items-center px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 text-sm font-medium rounded-full">🎯 HD Quality</span>
              <span className="inline-flex items-center px-4 py-2 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 text-sm font-medium rounded-full">🚫 No Registration</span>
            </div>
          </div>
          
          <ThumbnailDownloader />
        </main>

        {/* Strategic Ad - After main tool (users are satisfied) */}
        <div className="w-full max-w-6xl px-4 py-8">
          <AdInFeed className="my-12" />
        </div>

        <section id="how-it-works" className="w-full py-16 sm:py-24 bg-white mt-16 border-t border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <div className="max-w-4xl mx-auto px-4">
            <HowToUse />
          </div>
        </section>

        {/* Pre-FAQ Ad */}
        <div className="w-full max-w-6xl px-4 py-8">
          <AdBanner className="my-8" />
        </div>
        
        <section id="faq" className="w-full py-16 sm:py-24 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-4xl mx-auto px-4">
             <Faq />
          </div>
        </section>

        {/* Bottom Ad - Before footer */}
        <div className="w-full max-w-6xl px-4 py-8">
          <AdBanner className="my-8" />
        </div>
      </AdBlockDetector>

      <Footer />
    </div>
  );
}