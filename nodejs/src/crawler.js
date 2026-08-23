const axios = require('axios');
const cheerio = require('cheerio');

class WebCrawler {
  constructor(target) {
    this.target = target;
    this.visited = new Set();
    this.parameters = new Set();
  }

  async crawl(depth = 3) {
    console.log(`Crawling ${this.target} (depth: ${depth})...`);

    try {
      await this.crawlPage(this.target, depth);

      console.log('Crawling completed');
      console.log(`Visited: ${this.visited.size} pages`);
      console.log(`Found parameters: ${this.parameters.size}`);
      console.log('Parameters:', Array.from(this.parameters).slice(0, 10));
    } catch (err) {
      console.error('Crawling Error:', err && err.message ? err.message : err);
    }
  }

  async crawlPage(url, depth) {
    if (depth === 0 || this.visited.has(url)) return;

    this.visited.add(url);

    try {
      const response = await axios.get(url, {
        timeout: 5000,
        headers: { 'User-Agent': 'tca-rex-crawler' }
      });
      const $ = cheerio.load(response.data);

      // Extract forms and parameters
      $('form input').each((i, el) => {
        const name = $(el).attr('name');
        if (name) this.parameters.add(name);
      });

      // Extract links
      const links = [];
      $('a').each((i, el) => {
        const href = $(el).attr('href');
        try {
          if (!href) return;
          if (href.startsWith('/')) {
            links.push(new URL(href, this.target).href);
          } else if (href.startsWith('http')) {
            links.push(href);
          } // else skip mailto:, tel:, javascript: etc.
        } catch (e) {
          // ignore malformed hrefs
        }
      });

      // Crawl next level (limit to a few links to avoid runaway)
      for (const link of links.slice(0, 3)) {
        await this.crawlPage(link, depth - 1);
      }
    } catch (err) {
      console.error(`Error crawling ${url}:`, err && err.message ? err.message : err);
    }
  }
}

module.exports = WebCrawler;
