// pages/privacy-policy.js

import Head from 'next/head';
import Link from 'next/link';
import Footer from '../components/Footer';
import ThemeChanger from '../components/ThemeChanger';

export default function PrivacyPolicy() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <Head>
        <title>Privacy Policy | PixThumb.com</title>
      </Head>
      <nav className="w-full py-3 bg-white shadow-sm sticky top-0 z-10 dark:bg-gray-800 dark:border-b dark:border-gray-700">
        <div className="max-w-3xl mx-auto flex justify-between items-center px-4">
          <Link href="/" legacyBehavior>
            <a className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors font-semibold">
              ← Back to Home
            </a>
          </Link>
          <ThemeChanger />
        </div>
      </nav>
      <div className="max-w-3xl mx-auto py-16 px-4">
        <article className="prose lg:prose-xl bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 p-8 rounded-xl shadow-md">
          <h1 className="text-gray-900 dark:text-white">Privacy Policy for PixThumb.com</h1>
          
          {/* --- FIXED: Added dark mode text color to the <strong> tag --- */}
          <p><strong className="text-gray-700 dark:text-gray-200">Last Updated: August 25, 2025</strong></p>
          
          <p>At PixThumb.com, we respect your privacy. This policy outlines the types of information we may collect and how it is used.</p>
          <h2 className="text-gray-900 dark:text-white">Information We Collect</h2>
          <p>We do not require you to create an account or provide any personal information to use our thumbnail downloader tool. We may use analytics tools to collect anonymous data about our website traffic to improve our service.</p>
          <h2 className="text-gray-900 dark:text-white">Use of YouTube URLs</h2>
          <p>When you paste a YouTube URL into our tool, we use it solely to retrieve the publicly available thumbnail images associated with that video. We do not store or share these URLs.</p>
        </article>
      </div>
      <Footer />
    </div>
  );
}