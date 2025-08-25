Congratulations! Getting your site live at pixthumb.com is a massive achievement. You are absolutely right—the next critical step for your SEO is to create a sitemap.

A sitemap is a file that lists every important page on your website. It acts as a roadmap, helping search engines like Google find, crawl, and index all of your content efficiently.

For a site like yours with a blog, the sitemap needs to be dynamic. It must automatically update every time you add a new blog post. We will create a script that does this for you automatically every time you deploy your site.

Here is the complete, professional way to do it.

Step 1: Install a Helper Library

We'll use a small library called globby to easily find all your page files. It makes the process much cleaner.

In your PowerShell terminal, run this command:

code
Bash
download
content_copy
expand_less

npm install globby
Step 2: Create the Sitemap Generation Script

This is the "brain" of our sitemap generator. It will find all your static pages and all your blog posts and combine them into one file.

In the root directory of your project, create a new folder named scripts.

Inside this new scripts folder, create a new file named generate-sitemap.js.

Copy and paste this entire code block into the new file.

code
JavaScript
download
content_copy
expand_less
IGNORE_WHEN_COPYING_START
IGNORE_WHEN_COPYING_END
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
Step 3: Automate the Script

We need to make sure this script runs automatically every time you build or deploy your site. We'll do this by updating your package.json file.

Open your package.json file.

Find the "scripts" section.

Change your "build" script from this:

code
JSON
download
content_copy
expand_less
IGNORE_WHEN_COPYING_START
IGNORE_WHEN_COPYING_END
"build": "next build"
```    To this:
```json
"build": "node ./scripts/generate-sitemap.js && next build"

What this does: It tells the server, "First, run the generate-sitemap.js script, AND THEN (&&) run the normal next build."

Step 4: Tell Google Where to Find Your Sitemap

Now that the sitemap will be generated, we need to tell search engines that it exists.

A. Using robots.txt (The Standard Way)

In your public folder, create a new file named robots.txt.

Paste the following text into it. This tells all search engine crawlers where to find your sitemap.

code
Code
download
content_copy
expand_less
IGNORE_WHEN_COPYING_START
IGNORE_WHEN_COPYING_END
User-agent: *
Allow: /

Sitemap: https://pixthumb.com/sitemap.xml
B. Using Google Search Console (Highly Recommended)

Go to Google Search Console and sign in.

Add your website as a new "property" using the pixthumb.com domain. You will have to verify that you own the domain.

Once verified, go to the "Sitemaps" section in the left-hand menu.

Under "Add a new sitemap," type sitemap.xml and click "Submit."

Google will now regularly check your sitemap for new pages and updates.

What to Do Now

Commit and push these new files (scripts/generate-sitemap.js, public/robots.txt) and your updated package.json to GitHub.

Vercel will automatically see the new push and start a new deployment.

During this new deployment, your generate-sitemap.js script will run, and the sitemap.xml file will be created.

You can then check if it's live by visiting https://pixthumb.com/sitemap.xml.

Congratulations! You have now implemented a professional, dynamic sitemap that will significantly boost your SEO and ensure Google finds every single piece of content you create.