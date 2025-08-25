// pages/terms-of-use.js

import Head from 'next/head';
import Link from 'next/link';
import Footer from '../components/Footer';
import ThemeChanger from '../components/ThemeChanger';

export default function TermsOfUse() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <Head>
        <title>Terms of Use | PixThumb.com</title>
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
            <h1 className="text-gray-900 dark:text-white">Terms of Use for PixThumb.com</h1>
            <p>By using our website, PixThumb.com, you agree to these terms.</p>
            <h2 className="text-gray-900 dark:text-white">Copyright and Responsibility</h2>
            <p><strong>Important:</strong> The thumbnail images you download are the intellectual property of their respective creators. Your use of these images is your own responsibility. Using them in your own public or commercial projects may constitute copyright infringement unless you have permission from the original creator.</p>
            <h2 className="text-gray-900 dark:text-white">Disclaimer</h2>
            <p>Our service is provided "as is" without any warranties. We are not affiliated with YouTube or Google.</p>
        </article>
      </div>
      <Footer />
    </div>
  );
}