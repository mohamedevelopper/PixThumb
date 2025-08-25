// pages/blog/[slug].js

import Head from 'next/head';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import ThemeChanger from '../../components/ThemeChanger';

export default function BlogPost({ frontmatter, content, relatedPosts }) {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">
      <Head>
        <title>{frontmatter.title} | PixThumb Blog</title>
        <meta name="description" content={frontmatter.excerpt} />
        <meta name="keywords" content={frontmatter.tags?.join(', ')} />
        
        {/* Open Graph */}
        <meta property="og:title" content={frontmatter.title} />
        <meta property="og:description" content={frontmatter.excerpt} />
        <meta property="og:type" content="article" />
        
        {/* Article specific meta */}
        <meta property="article:published_time" content={frontmatter.date} />
        <meta property="article:author" content={frontmatter.author} />
        <meta property="article:section" content={frontmatter.category} />
        {frontmatter.tags?.map(tag => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}
      </Head>

      {/* Navigation */}
      <nav className="w-full py-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10 backdrop-blur-sm bg-white/90 dark:bg-gray-800/90">
        <div className="max-w-4xl mx-auto flex justify-between items-center px-6">
          <Link href="/blog" legacyBehavior>
            <a className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors font-semibold flex items-center gap-2">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to All Posts
            </a>
          </Link>
          <ThemeChanger />
        </div>
      </nav>

      {/* Article Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-6 py-12">
          {/* Category Badge */}
          <div className="mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300">
              {frontmatter.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            {frontmatter.title}
          </h1>

          {/* Excerpt */}
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
            {frontmatter.excerpt}
          </p>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                {frontmatter.author?.charAt(0) || 'P'}
              </div>
              <span>By <span className="font-medium text-gray-700 dark:text-gray-300">{frontmatter.author}</span></span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{frontmatter.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{frontmatter.readTime}</span>
            </div>
          </div>

          {/* Tags */}
          {frontmatter.tags && frontmatter.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6">
              {frontmatter.tags.map(tag => (
                <span 
                  key={tag}
                  className="px-3 py-1 text-sm rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Article Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <article 
          className="prose prose-lg dark:prose-invert prose-indigo max-w-none
                     prose-headings:text-gray-900 dark:prose-headings:text-white
                     prose-p:text-gray-700 dark:prose-p:text-gray-300
                     prose-a:text-indigo-600 dark:prose-a:text-indigo-400
                     prose-strong:text-gray-900 dark:prose-strong:text-white
                     prose-code:text-indigo-600 dark:prose-code:text-indigo-400
                     prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800
                     prose-blockquote:border-indigo-500 dark:prose-blockquote:border-indigo-400
                     prose-blockquote:text-gray-700 dark:prose-blockquote:text-gray-300"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </main>

      {/* Call to Action */}
      <section className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Put This Into Practice?</h3>
            <p className="text-indigo-100 mb-6 max-w-2xl mx-auto">
              Use our free YouTube thumbnail downloader to analyze successful thumbnails and get inspiration for your own content.
            </p>
            <Link href="/" legacyBehavior>
              <a className="inline-flex items-center gap-2 px-6 py-3 bg-white text-indigo-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors shadow-lg">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Try PixThumb Now - Free!
              </a>
            </Link>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts && relatedPosts.length > 0 && (
        <section className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          <div className="max-w-4xl mx-auto px-6 py-12">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Related Articles
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.slice(0, 2).map(post => (
                <Link key={post.slug} href={`/blog/${post.slug}`} legacyBehavior>
                  <a className="group block bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex-shrink-0"></div>
                      <div className="flex-grow">
                        <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-2">
                          {post.frontmatter.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                          {post.frontmatter.excerpt}
                        </p>
                        <div className="flex items-center gap-4 mt-3 text-xs text-gray-500 dark:text-gray-400">
                          <span>{post.frontmatter.category}</span>
                          <span>{post.frontmatter.readTime}</span>
                        </div>
                      </div>
                    </div>
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer CTA */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-6 py-8 text-center">
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600 dark:text-gray-400">
            <Link href="/blog" legacyBehavior>
              <a className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">All Posts</a>
            </Link>
            <Link href="/" legacyBehavior>
              <a className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Thumbnail Downloader</a>
            </Link>
            <Link href="/about" legacyBehavior>
              <a className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">About</a>
            </Link>
            <Link href="/contact" legacyBehavior>
              <a className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Contact</a>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('content/blog'));
  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace('.md', ''),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const markdownWithMeta = fs.readFileSync(
    path.join('content/blog', params.slug + '.md'),
    'utf-8'
  );

  const { data: frontmatter, content: markdownContent } = matter(markdownWithMeta);
  
  const processedContent = await remark().use(html).process(markdownContent);
  const content = processedContent.toString();

  // Get related posts (same category, excluding current post)
  const allFiles = fs.readdirSync(path.join('content/blog'));
  const allPosts = allFiles.map((filename) => {
    const slug = filename.replace('.md', '');
    if (slug === params.slug) return null;
    
    const fileContent = fs.readFileSync(path.join('content/blog', filename), 'utf-8');
    const { data } = matter(fileContent);
    return { slug, frontmatter: data };
  }).filter(Boolean);

  const relatedPosts = allPosts
    .filter(post => post.frontmatter.category === frontmatter.category)
    .slice(0, 2);

  return {
    props: {
      frontmatter,
      content,
      relatedPosts,
    },
  };
}