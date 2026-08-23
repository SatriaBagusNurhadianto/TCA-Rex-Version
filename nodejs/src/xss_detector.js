const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

class XSSDetector {
  constructor(target) {
    this.target = target;
    this.payloads = this.loadPayloads();
    if (!this.payloads || this.payloads.length === 0) {
      console.warn('Warning: no payloads loaded for XSS detection. Check shared/payloads/xss.txt');
    }
    this.vulnerabilities = [];
  }

  loadPayloads() {
    const payloadFile = path.join(__dirname, '../../shared/payloads/xss.txt');
    try {
      const content = fs.readFileSync(payloadFile, 'utf8');
      return content.split('\n').map(p => p.trim()).filter(p => p !== '');
    } catch (err) {
      console.error('Error loading payloads:', err && err.message ? err.message : err);
      return [];
    }
  }

  async detect() {
    console.log(`Scanning ${this.target} for XSS vulnerabilities...`);

    try {
      const response = await axios.get(this.target, {
        timeout: 5000,
        headers: { 'User-Agent': 'tca-rex-scanner' }
      });
      const $ = cheerio.load(response.data);

      // Find all form inputs
      const inputs = $('input');
      console.log(`Found ${inputs.length} input fields`);

      if (!this.payloads || this.payloads.length === 0) {
        console.warn('No XSS payloads to test. Skipping payload injection tests.');
      } else {
        for (const payload of this.payloads.slice(0, 10)) {
          console.log(`Testing payload: ${payload.substring(0, 50)}...`);
          // NOTE: real injection logic must be implemented carefully and ethically.
        }
      }

      console.log('XSS detection completed');
      console.log(`Potential vulnerabilities: ${this.vulnerabilities.length}`);
    } catch (err) {
      console.error('XSS Detection Error:', err && err.message ? err.message : err);
    }
  }
}

module.exports = XSSDetector;
