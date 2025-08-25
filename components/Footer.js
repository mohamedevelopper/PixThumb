// components/Footer.js
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="w-full p-8 text-center bg-gray-100 border-t dark:bg-gray-800 dark:border-gray-700">
            <div className="flex flex-wrap justify-center gap-6 mb-4">
                <Link href="/about" legacyBehavior>
                    <a className="text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors">About</a>
                </Link>
                <Link href="/blog" legacyBehavior>
                    <a className="text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors">Blog</a>
                </Link>
                <Link href="/contact" legacyBehavior>
                    <a className="text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors">Contact</a>
                </Link>
                <Link href="/privacy-policy" legacyBehavior>
                    <a className="text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors">Privacy Policy</a>
                </Link>
                <Link href="/terms-of-use" legacyBehavior>
                    <a className="text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors">Terms of Use</a>
                </Link>
            </div>
            <p className="text-gray-500 dark:text-gray-400">
                © 2025 PixThumb.com. All Rights Reserved.
            </p>
        </footer>
    );
}