const crypto = require('crypto');

class Utils {
  static encodePayload(payload, method = 'hex') {
    switch (method) {
      case 'hex':
        return payload.split('').map(c => '0x' + c.charCodeAt(0).toString(16)).join('');
      case 'unicode':
        return payload.split('').map(c => '\\u' + ('0000' + c.charCodeAt(0).toString(16)).slice(-4)).join('');
      case 'base64':
        return Buffer.from(payload).toString('base64');
      case 'url':
        return encodeURIComponent(payload);
      default:
        return payload;
    }
  }

  static randomDelay(min = 100, max = 1000) {
    return new Promise(resolve => {
      setTimeout(resolve, Math.random() * (max - min) + min);
    });
  }

  static generateRandomUserAgent() {
    const agents = [
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36',
      'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X)'
    ];
    return agents[Math.floor(Math.random() * agents.length)];
  }

  static generateRandomReferer() {
    const referers = ['https://google.com', 'https://bing.com', 'https://duckduckgo.com'];
    return referers[Math.floor(Math.random() * referers.length)];
  }
}

module.exports = Utils;
