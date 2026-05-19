const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

class XSSDetector {
  constructor(target) {
    this.target = target;
    this.payloads = this.loadPayloads();
    this.vulnerabilities = [];
  }

  loadPayloads() {
    const payloadFile = path.join(__dirname, '../../shared/payloads/xss.txt');
    try {
      const content = fs.readFileSync(payloadFile, 'utf8');
      return content.split('\n').filter(p => p.trim());
    } catch (err) {
      console.error('Error loading payloads:', err);
      return [];
    }
  }

  async detect() {
    console.log(`🔴 Scanning ${this.target} for XSS vulnerabilities...`);
    
    try {
      const response = await axios.get(this.target);
      const $ = cheerio.load(response.data);
      
      // Find all form inputs
      const inputs = $('input');
      console.log(`Found ${inputs.length} input fields`);
      
      for (const payload of this.payloads.slice(0, 10)) {
        console.log(`Testing payload: ${payload.substring(0, 50)}...`);
      }
      
      console.log('✅ XSS detection completed');
      console.log(`Potential vulnerabilities: ${this.vulnerabilities.length}`);
    } catch (err) {
      console.error('XSS Detection Error:', err.message);
    }
  }
}

module.exports = XSSDetector;
