// pages/about.js

import Head from 'next/head';
import Link from 'next/link';
import Footer from '../components/Footer'; // Import Footer
import ThemeChanger from '../components/ThemeChanger'; // Import ThemeChanger

export default function About() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <Head>
        <title>About Us | PixThumb.com</title>
      </Head>
      {/* ADDED: Navigation for consistency */}
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
        {/* CORRECTED: Added dark mode classes */}
        <article className="prose lg:prose-xl bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 p-8 rounded-xl shadow-md text-center">
            <h1 className="text-gray-900 dark:text-white">About PixThumb.com</h1>
            <p>As passionate creators, we know how important a great thumbnail is. A clickable thumbnail can be the difference between a video that gets 100 views and a video that gets 100,000 views.</p>
            <p>We built PixThumb because we wanted a simple, fast, and free tool to download high-quality thumbnails for inspiration and analysis, without any fluff.</p>
            <p>Our mission is to provide the best tools and resources for the YouTube creator community. We hope our tool and blog help you grow your channel!</p>
        </article>
      </div>
      <Footer />
    </div>
  );
}