// scripts/generate-sitemap.js

const fs = require('fs');
const path = require('path');
const { globby } = require('globby');
const matter = require('gray-matter');

async function generateSitemap() {
  const siteUrl = 'https://pixthumb.com';

  // 1. Get all your static pages
  const pages = await globby([
    'pages/**/*.js',
    '!pages/_*.js', // Ignore Next.js specific files
    '!pages/api', // Ignore API routes
    '!pages/blog/[slug].js' // Ignore the dynamic blog post template
  ]);

  const staticPagesSitemap = pages.map((file) => {
    const route = file
      .replace('pages', '')
      .replace('.js', '')
      .replace('/index', '');
    return `
      <url>
        <loc>${`${siteUrl}${route}`}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
      </url>
    `;
  }).join('');

  // 2. Get all your blog posts
  const blogPostFiles = fs.readdirSync(path.join('content/blog'));
  const blogPostsSitemap = blogPostFiles.map((filename) => {
      const markdownWithMeta = fs.readFileSync(path.join('content/blog', filename), 'utf-8');
      const { data: frontmatter } = matter(markdownWithMeta);
      const slug = filename.replace('.md', '');

      return `
        <url>
          <loc>${`${siteUrl}/blog/${slug}`}</loc>
          <lastmod>${new Date(frontmatter.date).toISOString()}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.9</priority>
        </url>
      `;
    }).join('');


  // 3. Combine them and create the final sitemap
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticPagesSitemap}
      ${blogPostsSitemap}
    </urlset>
  `;

  // 4. Write the sitemap to the public directory
  fs.writeFileSync('public/sitemap.xml', sitemap);
  console.log('✅ Sitemap generated successfully!');
}

generateSitemap();