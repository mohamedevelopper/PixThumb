// components/Faq.js

export default function Faq() {
  const faqs = [
    { q: "Is this tool free to use?", a: "Yes, our YouTube thumbnail downloader is completely free. You can download as many thumbnails as you want." },
    { q: "Are the thumbnails in high resolution?", a: "We provide links to all available qualities, including the highest resolution (HD, 4K) that YouTube makes available for that video." },
    { q: "Is it legal to download YouTube thumbnails?", a: "Thumbnails are generally copyrighted by the video creator. You can download them for personal use, but you should get permission from the creator before using them in your own public projects." }
  ];

  return (
    // --- CORRECT: Added dark mode classes ---
    <div className="text-gray-900 dark:text-gray-100">
      <h2 className="text-3xl font-extrabold text-center">Frequently Asked Questions</h2>
      <div className="mt-8 max-w-2xl mx-auto space-y-4">
        {faqs.map((faq, i) => (
          // --- CORRECT: Added dark mode classes for the cards ---
          <div key={i} className="p-5 bg-white rounded-lg shadow-sm border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            {/* --- CORRECT: Added dark mode classes for the text --- */}
            <h3 className="font-semibold text-lg text-gray-800 dark:text-white">{faq.q}</h3>
            <p className="mt-1 text-gray-600 dark:text-gray-400">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}