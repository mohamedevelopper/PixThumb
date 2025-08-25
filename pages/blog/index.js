// pages/blog/index.js

import Head from 'next/head';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { useState } from 'react';
import ThemeChanger from '../../components/ThemeChanger';
import Image from 'next/image'; // --- CHANGE 1: Import the Image component ---

export default function BlogIndex({ posts, categories }) {
  const [filter, setFilter] = useState('All');
  const filteredPosts = filter === 'All' 
    ? posts 
    : posts.filter(post => post.frontmatter.category === filter);

  // --- CHANGE 2: Add the helper function to get the image path ---
  const getCategoryImage = (category) => {
    const categorySlug = category.toLowerCase().replace(' ', '-');
    // Ensure you have images named design.jpg, how-to.jpg, etc., in your public/images/blog folder
    return `/images/blog/${categorySlug}.jpg`; 
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen p-8 text-gray-800 dark:text-gray-300">
      <Head>
        <title>The PixThumb Blog | Tips for YouTube Creators</title>
        <meta name="description" content="Expert insights, case studies, and best practices for creating amazing YouTube thumbnails." />
      </Head>
      
      <nav className="w-full py-4 mb-8">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" legacyBehavior>
            <a className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors font-semibold">
              ← Back to PixThumb Home
            </a>
          </Link>
          <ThemeChanger />
        </div>
      </nav>
      
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            The PixThumb Blog
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Expert insights, case studies, and best practices for creating amazing YouTube thumbnails that get more clicks.
          </p>
        </div>
        
        <div className="flex justify-center flex-wrap gap-3 mb-12">
          <button 
            onClick={() => setFilter('All')}
            className={`py-2 px-6 rounded-full text-sm font-semibold transition-all duration-300 ${
              filter === 'All' 
                ? 'bg-indigo-600 text-white shadow-lg' 
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
            }`}
          >
            All Posts ({posts.length})
          </button>
          {categories.map(category => {
            const categoryCount = posts.filter(post => post.frontmatter.category === category).length;
            return (
              <button 
                key={category}
                onClick={() => setFilter(category)}
                className={`py-2 px-6 rounded-full text-sm font-semibold transition-all duration-300 ${
                  filter === category 
                    ? 'bg-indigo-600 text-white shadow-lg' 
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                }`}
              >
                {category} ({categoryCount})
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} legacyBehavior>
              <a className="group block bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-gray-200 dark:border-gray-700 flex flex-col h-full">
                
                {/* --- THIS WHOLE DIV IS REPLACED with the optimized Image component --- */}
                <div className="relative h-48 w-full">
                    <Image
                      src={getCategoryImage(post.frontmatter.category)}
                      alt={`Blog post image for the ${post.frontmatter.category} category`}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <span className="absolute top-4 left-4 py-1.5 px-3 bg-black/50 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
                      {post.frontmatter.category}
                    </span>
                    <span className="absolute top-4 right-4 py-1.5 px-3 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                      {post.frontmatter.readTime}
                    </span>
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex-grow">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.frontmatter.tags?.slice(0, 3).map(tag => (
                        <span 
                          key={tag} 
                          className="text-xs py-1 px-2.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                      {post.frontmatter.title}
                    </h2>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 leading-relaxed">
                      {post.frontmatter.excerpt}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
                    <span className="font-medium">By {post.frontmatter.author}</span>
                    <span>{post.frontmatter.date}</span>
                  </div>
                </div>
              </a>
            </Link>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No posts found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try selecting a different category or check back later for new content.
            </p>
          </div>
        )}

        <div className="mt-16 text-center bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Download Some Thumbnails?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
            Put what you've learned into practice! Use our free thumbnail downloader to analyze successful thumbnails and get inspiration for your own content.
          </p>
          <Link href="/" legacyBehavior>
            <a className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Try the Thumbnail Downloader
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}

// This part at the bottom remains the same
export async function getStaticProps() {
  const files = fs.readdirSync(path.join('content/blog'));
  const posts = files.map((filename) => {
    const slug = filename.replace('.md', '');
    const markdownWithMeta = fs.readFileSync(path.join('content/blog', filename), 'utf-8');
    const { data: frontmatter } = matter(markdownWithMeta);
    return { slug, frontmatter };
  });
  const sortedPosts = posts.sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date));
  const categories = [...new Set(posts.map(post => post.frontmatter.category))];
  return {
    props: {
      posts: sortedPosts,
      categories: categories,
    },
  };
}