// components/ThumbnailDownloader.js (Final Corrected Version)

import { useState } from 'react';
import {
    ArrowDownTrayIcon,
    ClipboardDocumentIcon,
    LinkIcon,
    CheckIcon,
    ExclamationTriangleIcon,
    SparklesIcon,
    FolderArrowDownIcon, // CORRECTED: This is a real icon name
    CloudArrowDownIcon
} from '@heroicons/react/24/outline';
import JSZip from 'jszip';

// Helper component for the loading spinner
const LoadingSpinner = () => (
    <div className="flex items-center justify-center">
        <svg className="animate-spin h-6 w-6 text-white mr-2" xmlns="http://www.w.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span>Processing...</span>
    </div>
);

// Helper component for the bulk download progress modal
const BulkDownloadProgress = ({ progress, total, currentFile }) => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
            <div className="text-center mb-6">
                <div className="h-16 w-16 mx-auto mb-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                    <CloudArrowDownIcon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Creating ZIP Archive</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{currentFile || 'Preparing downloads...'}</p>
            </div>
            <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                    <span>Progress</span>
                    <span>{progress}/{total}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full transition-all duration-300" style={{ width: `${(progress / total) * 100}%` }}></div>
                </div>
                <div className="text-center text-xs text-gray-500 dark:text-gray-400 mt-2">{Math.round((progress / total) * 100)}% complete</div>
            </div>
        </div>
    </div>
);


export default function ThumbnailDownloader() {
    // All your state hooks are perfect
    const [videoURL, setVideoURL] = useState('');
    const [thumbnails, setThumbnails] = useState(null);
    const [videoID, setVideoID] = useState(null);
    const [videoTitle, setVideoTitle] = useState('');
    const [channelName, setChannelName] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [copiedUrl, setCopiedUrl] = useState(null);
    const [downloadCount, setDownloadCount] = useState(0);
    const [bulkDownloadProgress, setBulkDownloadProgress] = useState(null);

    // All your helper functions are great
    const getYouTubeVideoID = (url) => {
        const patterns = [
            /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/|m\.youtube\.com\/watch\?v=|youtube\.com\/shorts\/|www\.youtube\.com\/shorts\/)([^#\&\?]{11})/,
            /^([a-zA-Z0-9_-]{11})$/
        ];
        for (const pattern of patterns) {
            const match = url.match(pattern);
            if (match && match[1]) return match[1];
        }
        return null;
    };

    const getVideoInfo = async (videoId) => {
        try {
            // Using a more reliable oEmbed provider
            const response = await fetch(`https://noembed.com/embed?url=https://www.youtube.com/watch?v=${videoId}`);
            if (response.ok) {
                const data = await response.json();
                if (data.error) return { title: `YouTube Video`, author: 'Unknown Channel' };
                return { title: data.title, author: data.author_name };
            }
        } catch (err) { console.error('Could not fetch video info:', err); }
        return { title: `YouTube Video`, author: 'Unknown Channel' };
    };

    const handleBulkDownload = async () => {
        if (!thumbnails || thumbnails.length === 0) return;
        setBulkDownloadProgress({ progress: 0, total: thumbnails.length, currentFile: 'Initializing...' });
        const zip = new JSZip();
        const cleanTitle = videoTitle.replace(/[^a-z0-9\s-]/gi, '').replace(/\s+/g, '_').substring(0, 30);
        for (let i = 0; i < thumbnails.length; i++) {
            const thumb = thumbnails[i];
            const filename = `${cleanTitle}_${thumb.name}_${thumb.resolution.replace('×', 'x')}.jpg`;
            setBulkDownloadProgress(prev => ({ ...prev, currentFile: `Fetching ${thumb.name}...`, progress: i }));
            try {
                const response = await fetch(thumb.url);
                if (response.ok) zip.file(filename, await response.blob());
            } catch (err) { console.error(`Failed to fetch ${thumb.name}:`, err); }
        }
        setBulkDownloadProgress(prev => ({ ...prev, currentFile: 'Compressing files...', progress: thumbnails.length }));
        try {
            const content = await zip.generateAsync({ type: "blob" });
            const objectUrl = URL.createObjectURL(content);
            const link = document.createElement('a');
            link.href = objectUrl;
            link.download = `${cleanTitle}_thumbnails.zip`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(objectUrl);
            setBulkDownloadProgress(prev => ({ ...prev, currentFile: `✅ Complete! Enjoy your ZIP file.` }));
        } catch (err) {
            console.error('ZIP generation failed:', err);
            setBulkDownloadProgress(prev => ({ ...prev, currentFile: '❌ ZIP creation failed.' }));
        }
        setTimeout(() => setBulkDownloadProgress(null), 3000);
    };

    const handleSingleDownload = async (url, quality) => {
        setDownloadCount(prev => prev + 1);
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Network response not ok');
            const blob = await response.blob();
            const objectUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = objectUrl;
            const cleanTitle = videoTitle.replace(/[^a-z0-9\s-]/gi, '').replace(/\s+/g, '_').substring(0, 50);
            link.download = `${cleanTitle}_${quality}_thumbnail.jpg`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(objectUrl);
        } catch (err) {
            console.error("Download failed:", err);
            window.open(url, '_blank');
        }
    };
    
    const handleCopyUrl = (url) => {
        navigator.clipboard.writeText(url).then(() => {
            setCopiedUrl(url);
            setTimeout(() => setCopiedUrl(null), 2000);
        });
    };

    const handleGetThumbnails = async (e) => {
        e.preventDefault();
        setError('');
        setThumbnails(null);
        setIsLoading(true);
        const currentVideoID = getYouTubeVideoID(videoURL.trim());
        if (!currentVideoID) {
            setError('Invalid YouTube URL or Video ID. Please check the link and try again.');
            setIsLoading(false);
            return;
        }
        setVideoID(currentVideoID);
        const videoInfo = await getVideoInfo(currentVideoID);
        setVideoTitle(videoInfo.title);
        setChannelName(videoInfo.author);
        const thumbnailQualities = [
            { name: 'HD', resolution: '1280×720', use: 'Perfect for professional use', url: `https://i.ytimg.com/vi/${currentVideoID}/maxresdefault.jpg`, badge: 'BEST'},
            { name: 'Standard', resolution: '640×480', use: 'Perfect for social media', url: `https://i.ytimg.com/vi/${currentVideoID}/sddefault.jpg`},
            { name: 'High', resolution: '480×360', use: 'Perfect for web thumbnails', url: `https://i.ytimg.com/vi/${currentVideoID}/hqdefault.jpg`},
            { name: 'Medium', resolution: '320×180', use: 'Good for mobile previews', url: `https://i.ytimg.com/vi/${currentVideoID}/mqdefault.jpg`},
        ];
        const validThumbnails = [];
        for (const thumb of thumbnailQualities) {
            try {
                const response = await fetch(thumb.url, { method: 'HEAD' });
                if (response.ok) validThumbnails.push(thumb);
            } catch {}
        }
        if (validThumbnails.length === 0) setError('No thumbnails found for this video. It might be private, deleted, or still processing.');
        else setThumbnails(validThumbnails);
        setIsLoading(false);
    };

    const handleClearInput = () => {
        setVideoURL('');
        setThumbnails(null);
        setError('');
    };
    
    return (
        <div className="w-full max-w-6xl mt-12 px-4">
            {bulkDownloadProgress && <BulkDownloadProgress {...bulkDownloadProgress} />}
            
            <div className="relative p-3 bg-white border-2 border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 dark:bg-gray-800 dark:border-gray-600">
                <form onSubmit={handleGetThumbnails} className="flex items-center gap-3">
                    <div className="flex items-center flex-1">
                        <LinkIcon className="h-6 w-6 text-gray-400 dark:text-gray-500 ml-3" />
                        <input
                            type="text"
                            value={videoURL}
                            onChange={(e) => setVideoURL(e.target.value)}
                            placeholder="Paste your YouTube video link here..."
                            className="w-full px-4 py-4 text-lg text-gray-800 dark:text-gray-200 bg-transparent focus:outline-none placeholder-gray-500 dark:placeholder-gray-400"
                            disabled={isLoading}
                        />
                        {videoURL && !isLoading && (
                            <button type="button" onClick={handleClearInput} title="Clear input" className="mr-3 p-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                            </button>
                        )}
                    </div>
                    <button type="submit" disabled={isLoading || !videoURL.trim()} className="flex items-center justify-center px-8 py-4 font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 disabled:from-indigo-400 disabled:to-purple-400 disabled:cursor-not-allowed transition-all shadow-lg min-w-[160px]">
                        {isLoading ? <LoadingSpinner /> : <><SparklesIcon className="h-5 w-5 mr-2" />Get Thumbnails</>}
                    </button>
                </form>
            </div>

            {error && (
                <div className="mt-6 flex items-center gap-3 text-red-700 bg-red-50 dark:bg-red-900/20 dark:text-red-400 p-4 rounded-xl border border-red-200 dark:border-red-800 animate-fade-in">
                    <ExclamationTriangleIcon className="h-5 w-5 flex-shrink-0" />
                    <span>{error}</span>
                </div>
            )}

            {thumbnails && (
                <div className="mt-16 animate-slide-up">
                    <div className="text-center mb-8">
                        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Your Thumbnails are Ready! 🎉</h2>
                        <div className="max-w-3xl mx-auto mb-6">
                            <p className="text-xl text-gray-600 dark:text-gray-400 mb-2"><span className="font-semibold italic">"{videoTitle}"</span></p>
                            {channelName && <p className="text-lg text-gray-500 dark:text-gray-500">by {channelName}</p>}
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                            <button onClick={handleBulkDownload} className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-2xl hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform">
                                <FolderArrowDownIcon className="h-6 w-6" />
                                Download All (.zip)
                                <span className="ml-2 px-2 py-1 bg-white/20 rounded-full text-sm">{thumbnails.length} files</span>
                            </button>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {thumbnails.map(({ name, resolution, use, url, badge }) => (
                            <div key={name} className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden flex flex-col hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-gray-200 dark:border-gray-700">
                                <div className="relative overflow-hidden">
                                    <img src={url} alt={`${videoTitle} - ${name} thumbnail`} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110" loading="lazy" />
                                    {badge && <div className="absolute top-3 right-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">{badge}</div>}
                                </div>
                                <div className="p-6 flex flex-col flex-grow text-center">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{name}</h3>
                                    <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-2">{resolution}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 flex-grow">{use}</p>
                                    <div className="grid grid-cols-1 gap-3">
                                        <button onClick={() => handleCopyUrl(url)} className={`flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-semibold rounded-xl transition-all ${copiedUrl === url ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'}`}>
                                            {copiedUrl === url ? <><CheckIcon className="h-4 w-4" />Copied!</> : <><ClipboardDocumentIcon className="h-4 w-4" />Copy URL</>}
                                        </button>
                                        <button onClick={() => handleSingleDownload(url, name)} className="flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-semibold text-white bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl hover:from-gray-900 hover:to-black transition-all shadow-lg hover:shadow-xl">
                                            <ArrowDownTrayIcon className="h-4 w-4" />
                                            Download
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {!thumbnails && !isLoading && (
                <div className="mt-16 max-w-4xl mx-auto">
                    <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">💡 The Ultimate Thumbnail Tool</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                            <div className="text-3xl mb-3">📁</div>
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">ZIP Bulk Download</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Save time! Get all thumbnail qualities in one organized ZIP file - no multiple downloads!</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                            <div className="text-3xl mb-3">🎯</div>
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Any YouTube URL</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Regular videos, Shorts, mobile links - we support them all for your convenience!</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}