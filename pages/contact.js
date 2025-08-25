// pages/contact.js

import Head from 'next/head';
import Link from 'next/link';
import Footer from '../components/Footer';
import ThemeChanger from '../components/ThemeChanger';

export default function Contact() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <Head>
        <title>Contact Us | PixThumb.com</title>
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
        <article className="prose lg:prose-xl bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 p-8 rounded-xl shadow-md text-center">
            <h1 className="text-gray-900 dark:text-white">Contact Us</h1>
            <p>Have a question, feedback, or a suggestion? We'd love to hear from you!</p>
            <p>The best way to reach us is by email:</p>
            <p>
              <strong>
                <a 
                  href="mailto:contact@pixthumb.com"
                  className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
                >
                  contact@pixthumb.com
                </a>
              </strong>
            </p>
        </article>
      </div>
      <Footer />
    </div>
  );
}