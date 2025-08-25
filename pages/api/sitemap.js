// pages/api/sitemap.js
const generateSitemap = require('../../scripts/generate-sitemap');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await generateSitemap();
    res.status(200).json({ 
      message: 'Sitemap regenerated successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Sitemap generation error:', error);
    res.status(500).json({ 
      message: 'Failed to generate sitemap',
      error: error.message 
    });
  }
}