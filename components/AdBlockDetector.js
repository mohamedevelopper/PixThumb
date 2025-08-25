// components/AdBlockDetector.js - Create this new file

import { useState, useEffect } from 'react';

const AdBlockDetector = ({ children }) => {
  const [isAdBlocked, setIsAdBlocked] = useState(false);
  const [isDetecting, setIsDetecting] = useState(true);

  useEffect(() => {
    const detectAdBlock = async () => {
      try {
        // Create a test element that ad blockers typically hide
        const testAd = document.createElement('div');
        testAd.innerHTML = '&nbsp;';
        testAd.className = 'adsbox ads ad adsbygoogle';
        testAd.style.position = 'absolute';
        testAd.style.left = '-10000px';
        testAd.style.height = '1px';
        testAd.style.width = '1px';
        document.body.appendChild(testAd);
        
        setTimeout(() => {
          try {
            const isBlocked = testAd.offsetHeight === 0 || 
                             testAd.style.display === 'none' || 
                             testAd.style.visibility === 'hidden';
            setIsAdBlocked(isBlocked);
            setIsDetecting(false);
            document.body.removeChild(testAd);
          } catch (e) {
            setIsAdBlocked(false);
            setIsDetecting(false);
            if (document.body.contains(testAd)) {
              document.body.removeChild(testAd);
            }
          }
        }, 100);
      } catch (e) {
        setIsAdBlocked(false);
        setIsDetecting(false);
      }
    };

    detectAdBlock();
  }, []);

  if (isDetecting) {
    return (
      <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-24 rounded-lg mx-auto my-4">
        <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400 text-sm">
          Loading...
        </div>
      </div>
    );
  }

  if (isAdBlocked) {
    return (
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 text-center my-8 mx-4">
        <div className="text-blue-600 dark:text-blue-400 mb-4">
          <svg className="h-12 w-12 mx-auto" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-3">
          ❤️ Support PixThumb
        </h3>
        <p className="text-blue-700 dark:text-blue-300 mb-6 max-w-md mx-auto">
          We noticed you're using an ad blocker. Our free service is supported by ads. 
          Consider whitelisting us to help keep PixThumb free for everyone!
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => window.open('/donate', '_blank')}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
            ❤️ Donate Instead
          </button>
          <button
            onClick={() => window.open('/premium', '_blank')}
            className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium"
          >
            <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            ⭐ Go Ad-Free Premium
          </button>
        </div>
        <div className="mt-4">
          <p className="text-xs text-blue-600 dark:text-blue-400">
            💡 Or simply whitelist pixthumb.com in your ad blocker settings
          </p>
        </div>
      </div>
    );
  }

  return children;
};

export default AdBlockDetector;