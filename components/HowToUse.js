// components/HowToUse.js
export default function HowToUse() {
  return (
    <div className="text-gray-900 dark:text-gray-100">
      <h2 className="text-3xl font-extrabold text-center mb-4">How It Works in 3 Simple Steps</h2>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
        Download any YouTube thumbnail in seconds - no registration required!
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 transition-transform hover:scale-105">
          <div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-2xl mx-auto mb-4 shadow-lg">
            1
          </div>
          <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Copy YouTube URL</h3>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            Find your video on YouTube and copy its URL from the browser's address bar or share button.
          </p>
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 transition-transform hover:scale-105">
          <div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold text-2xl mx-auto mb-4 shadow-lg">
            2
          </div>
          <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Paste & Generate</h3>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            Paste the URL into our tool and click "Get Thumbnails" to instantly generate all available qualities.
          </p>
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 transition-transform hover:scale-105">
          <div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-r from-pink-500 to-red-600 text-white font-bold text-2xl mx-auto mb-4 shadow-lg">
            3
          </div>
          <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Download or Copy</h3>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            Choose your preferred quality and either download directly or copy the image URL to your clipboard.
          </p>
        </div>
      </div>
    </div>
  );
}