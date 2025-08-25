// components/Layout.js - Fixed version
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ThemeChanger from './ThemeChanger';
import Footer from './Footer';
import { AdBanner, AdSidebar } from './AdUnit';
import AdBlockDetector from './AdBlockDetector';

const Layout = ({ 
  children, 
  title = "PixThumb - Free YouTube Thumbnail Downloader",
  description = "Download YouTube thumbnails in HD quality for free with bulk ZIP download",
  pageType = "default" // homepage, blog, blog-post, static
}) => {
  const router = useRouter();

  const getAdConfig = (pageType) => {
    const configs = {
      homepage: {
        showTopBanner: true,
        showSidebar: false,
        showInContent: true,
        showBottomBanner: true,
        adFrequency: 'high'
      },
      blog: {
        showTopBanner: true,
        showSidebar: true,
        showInContent: true,
        showBottomBanner: true,
        adFrequency: 'high'
      },
      'blog-post': {
        showTopBanner: true,
        showSidebar: true,
        showInContent: true,
        showBottomBanner: true,
        adFrequency: 'high'
      },
      static: {
        showTopBanner: true,
        showSidebar: false,
        showInContent: false,
        showBottomBanner: true,
        adFrequency: 'low'
      }
    };
    return configs[pageType] || configs.default;
  };

  const adConfig = getAdConfig(pageType);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        <meta name="robots" content="index, follow" />
        <meta name="monetization" content="$ilp.uphold.com/your-payment-pointer" />
        
        {pageType === 'blog-post' && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Article",
                "headline": title,
                "description": description,
                "author": {
                  "@type": "Organization",
                  "name": "PixThumb"
                }
              })
            }}
          />
        )}
      </Head>

      {/* Navigation with Logo */}
      <nav className="w-full py-3 bg-white shadow-sm sticky top-0 z-50 dark:bg-gray-800 dark:border-b dark:border-gray-700">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
          <Link href="/" legacyBehavior>
            <a className="flex items-center space-x-3 group">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform shadow-lg">
                <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <span className="text-xl md:text-2xl font-bold text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors">
                PixThumb
              </span>
            </a>
          </Link>
          
          <div className="flex items-center gap-8">
            <div className="hidden md:flex space-x-8 font-semibold text-gray-700 dark:text-gray-200">
              <Link href="/" legacyBehavior>
                <a className={`hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors ${
                  router.pathname === '/' ? 'text-indigo-600 dark:text-indigo-400' : ''
                }`}>
                  Home
                </a>
              </Link>
              <Link href="/blog" legacyBehavior>
                <a className={`hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors ${
                  router.pathname.startsWith('/blog') ? 'text-indigo-600 dark:text-indigo-400' : ''
                }`}>
                  Blog
                </a>
              </Link>
              <Link href="/about" legacyBehavior>
                <a className={`hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors ${
                  router.pathname === '/about' ? 'text-indigo-600 dark:text-indigo-400' : ''
                }`}>
                  About
                </a>
              </Link>
            </div>
            
            <div className="md:hidden">
              <MobileMenu />
            </div>
            
            <ThemeChanger />
          </div>
        </div>
      </nav>

      <AdBlockDetector>
        {adConfig.showTopBanner && (
          <div className="w-full max-w-7xl mx-auto px-4 py-4">
            <AdBanner className="text-center" />
          </div>
        )}

        <div className={`flex-1 w-full max-w-7xl mx-auto px-4 py-8 ${
          adConfig.showSidebar ? 'grid grid-cols-1 lg:grid-cols-4 gap-8' : ''
        }`}>
          
          <main className={adConfig.showSidebar ? 'lg:col-span-3' : 'w-full'}>
            {children}
          </main>

          {adConfig.showSidebar && (
            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-8">
                <AdSidebar />
                <SidebarContent pageType={pageType} />
              </div>
            </aside>
          )}
        </div>

        {adConfig.showBottomBanner && (
          <div className="w-full max-w-7xl mx-auto px-4 py-8">
            <AdBanner />
          </div>
        )}
      </AdBlockDetector>

      <Footer />
    </div>
  );
};

// Mobile Menu Component
const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border dark:border-gray-700 py-2">
          <Link href="/" legacyBehavior>
            <a className={`block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 ${
              router.pathname === '/' ? 'text-indigo-600 dark:text-indigo-400' : ''
            }`}>
              Home
            </a>
          </Link>
          <Link href="/blog" legacyBehavior>
            <a className={`block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 ${
              router.pathname.startsWith('/blog') ? 'text-indigo-600 dark:text-indigo-400' : ''
            }`}>
              Blog
            </a>
          </Link>
          <Link href="/about" legacyBehavior>
            <a className={`block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 ${
              router.pathname === '/about' ? 'text-indigo-600 dark:text-indigo-400' : ''
            }`}>
              About
            </a>
          </Link>
        </div>
      )}
    </div>
  );
};

// Fixed Sidebar Content with proper Link components
const SidebarContent = ({ pageType }) => {
  switch (pageType) {
    case 'blog':
    case 'blog-post':
      return (
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Popular Posts
            </h3>
            <div className="space-y-3">
              <Link href="/blog/ultimate-guide" legacyBehavior>
                <a className="block text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                  Ultimate Guide to YouTube Thumbnails
                </a>
              </Link>
              <Link href="/blog/best-practices" legacyBehavior>
                <a className="block text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                  Thumbnail Design Best Practices
                </a>
              </Link>
              <Link href="/blog/tools-review" legacyBehavior>
                <a className="block text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                  Best Tools for YouTube Creators
                </a>
              </Link>
            </div>
          </div>

          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 text-white">
            <h3 className="text-lg font-bold mb-2">Stay Updated!</h3>
            <p className="text-indigo-100 text-sm mb-4">
              Get the latest YouTube tips and thumbnail strategies.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email..."
                className="flex-1 px-3 py-2 rounded-lg text-gray-900 text-sm"
              />
              <button className="px-4 py-2 bg-white text-indigo-600 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      );
    
    default:
      return (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Quick Links
          </h3>
          <div className="space-y-3">
            <Link href="/" legacyBehavior>
              <a className="block text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                Thumbnail Downloader
              </a>
            </Link>
            <Link href="/blog" legacyBehavior>
              <a className="block text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                Creator Tips & Guides
              </a>
            </Link>
            <Link href="/about" legacyBehavior>
              <a className="block text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                About PixThumb
              </a>
            </Link>
          </div>
        </div>
      );
  }
};

export default Layout;