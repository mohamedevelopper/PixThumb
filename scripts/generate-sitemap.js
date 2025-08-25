// scripts/generate-sitemap.js
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

async function generateSitemap() {
  const siteUrl = 'https://pixthumb.com';
  
  try {
    // Import globby dynamically (ES module)
    const { globby } = await import('globby');
    
    console.log('🔍 Scanning for pages...');

    // 1. Get all static pages
    const pages = await globby([
      'pages/**/*.js',
      '!pages/_*.js',
      '!pages/api/**',
      '!pages/blog/[slug].js',
      '!pages/404.js',
      '!pages/500.js'
    ]);

    // 2. Generate static pages sitemap
    const staticPagesSitemap = pages.map((file) => {
      const route = file
        .replace('pages', '')
        .replace('.js', '')
        .replace('/index', '');
      
      // Determine priority and change frequency based on page
      let priority = '0.7';
      let changefreq = 'monthly';
      
      if (route === '' || route === '/') {
        priority = '1.0';
        changefreq = 'weekly';
      } else if (route === '/blog') {
        priority = '0.9';
        changefreq = 'weekly';
      }

      return `  <url>
    <loc>${siteUrl}${route}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
    }).join('\n');

    console.log(`📄 Found ${pages.length} static pages`);

    // 3. Get blog posts (if content/blog directory exists)
    let blogPostsSitemap = '';
    const blogDir = path.join(process.cwd(), 'content/blog');
    
    if (fs.existsSync(blogDir)) {
      const blogPostFiles = fs.readdirSync(blogDir).filter(file => file.endsWith('.md'));
      
      blogPostsSitemap = blogPostFiles.map((filename) => {
        try {
          const markdownWithMeta = fs.readFileSync(path.join(blogDir, filename), 'utf-8');
          const { data: frontmatter } = matter(markdownWithMeta);
          const slug = filename.replace('.md', '');

          // Use frontmatter date or current date
          const lastmod = frontmatter.date 
            ? new Date(frontmatter.date).toISOString()
            : new Date().toISOString();

          return `  <url>
    <loc>${siteUrl}/blog/${slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
        } catch (error) {
          console.warn(`⚠️  Warning: Could not process ${filename}:`, error.message);
          return '';
        }
      }).filter(Boolean).join('\n');

      console.log(`📝 Found ${blogPostFiles.length} blog posts`);
    } else {
      console.log('📝 No blog directory found, skipping blog posts');
    }

    // 4. Create the complete sitemap
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPagesSitemap}
${blogPostsSitemap}
</urlset>`;

    // 5. Write sitemap to public directory
    const publicDir = path.join(process.cwd(), 'public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
    
    console.log('✅ Sitemap generated successfully at public/sitemap.xml');
    console.log(`🔗 Total URLs: ${pages.length + (blogPostsSitemap ? blogPostsSitemap.split('<url>').length - 1 : 0)}`);
    
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    process.exit(1);
  }
}

// Run the generator
if (require.main === module) {
  generateSitemap();
}

module.exports = generateSitemap;