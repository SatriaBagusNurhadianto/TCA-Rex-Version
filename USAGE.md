# TCA-Rex-Version Usage Guide

## Quick Start

```bash
node index.js scan --target https://example.com
```

## Available Commands

### 1. Full Vulnerability Scan

```bash
node index.js scan --target https://example.com
```

Performs a complete vulnerability assessment including:
- WAF detection
- Web crawling
- XSS detection
- SQL injection detection

### 2. XSS Detection

```bash
node index.js detect:xss --target https://example.com/search?q=test
```

Scans for Cross-Site Scripting vulnerabilities:

```bash
# With custom payload file
node index.js detect:xss --target https://example.com --payload-file custom-payloads.txt

# With encoding
node index.js detect:xss --target https://example.com --encoding hex
```

### 3. SQL Injection Detection

```bash
node index.js detect:sqli --target https://example.com/product?id=1
```

Scans for SQL Injection vulnerabilities:

```bash
# Specific technique
node index.js detect:sqli --target https://example.com --technique time-based

# Available techniques: time-based, boolean, union, error
```

### 4. Port Scanning

```bash
go run go/main.go --scan ports --target example.com
```

Scans for open ports:

```bash
# With output file
go run go/main.go --scan ports --target example.com --output ports.json

# Specific port range
go run go/main.go --scan ports --target example.com --ports 80,443,8080
```

### 5. Web Crawling

```bash
node index.js crawl --target https://example.com
```

Crawls and discovers parameters:

```bash
# Custom crawl depth
node index.js crawl --target https://example.com --depth 5

# With output
node index.js crawl --target https://example.com --output crawl-results.json
```

### 6. WAF Detection

```bash
node index.js waf:detect --target https://example.com
```

Detects Web Application Firewalls:

```bash
# Detailed analysis
node index.js waf:detect --target https://example.com --verbose
```

### 7. WAF Bypass

```bash
node index.js waf:bypass --target https://example.com --payload xss
```

Attempts to bypass WAF:

```bash
# Specific technique
node index.js waf:bypass --target https://example.com --technique hex

# Available techniques:
# - hex: Hexadecimal encoding
# - unicode: Unicode escaping
# - base64: Base64 encoding
# - url: URL encoding
# - headers: Header manipulation
# - mutation: Payload mutation
```

### 8. Generate Report

```bash
node index.js report --session lastscan --format html
```

Generates assessment reports:

```bash
# JSON format
node index.js report --session lastscan --format json --output report.json

# CSV format
node index.js report --session lastscan --format csv --output report.csv
```

## Complete Workflow Examples

### Example 1: Basic Vulnerability Assessment

```bash
#!/bin/bash
TARGET="https://example.com"

echo "[*] Starting basic assessment..."
echo "[1] Detecting WAF"
node index.js waf:detect --target $TARGET

echo "[2] Crawling website"
node index.js crawl --target $TARGET --depth 2 --output crawl.json

echo "[3] Detecting XSS"
node index.js detect:xss --target $TARGET

echo "[4] Detecting SQL Injection"
node index.js detect:sqli --target $TARGET

echo "[5] Generating report"
node index.js report --session assessment --format html --output report.html

echo "[*] Assessment complete!"
```

### Example 2: Comprehensive Red Team Assessment

```bash
#!/bin/bash
TARGET="example.com"

echo "[*] Starting comprehensive red team assessment..."

# Phase 1: Reconnaissance
echo "[Phase 1] Reconnaissance"
go run go/main.go --scan ports --target $TARGET --output phase1_ports.json

echo "[Phase 2] Web Crawling"
node index.js crawl --target https://$TARGET --depth 3 --output phase2_crawl.json

# Phase 2: WAF Analysis
echo "[Phase 3] WAF Detection"
node index.js waf:detect --target https://$TARGET

# Phase 3: Vulnerability Detection
echo "[Phase 4] XSS Testing"
node index.js detect:xss --target https://$TARGET

echo "[Phase 5] SQL Injection Testing"
node index.js detect:sqli --target https://$TARGET

# Phase 4: WAF Bypass
echo "[Phase 6] WAF Bypass Attempts"
node index.js waf:bypass --target https://$TARGET --technique hex
node index.js waf:bypass --target https://$TARGET --technique unicode
node index.js waf:bypass --target https://$TARGET --technique base64

# Generate Reports
echo "[Phase 7] Generating Reports"
node index.js report --session comprehensive --format html --output assessment_report.html
node index.js report --session comprehensive --format json --output assessment_report.json

echo "[*] Assessment complete! Reports generated."
```

### Example 3: Parameter Fuzzing & Exploitation

```bash
#!/bin/bash
TARGET="https://example.com"

echo "[*] Starting parameter fuzzing..."

# Crawl to find parameters
node index.js crawl --target $TARGET --output params.json

# Test each parameter
echo "[*] Testing discovered parameters..."
node index.js detect:xss --target $TARGET
node index.js detect:sqli --target $TARGET

echo "[*] Parameter fuzzing complete!"
```

## Configuration Options

Edit `.env` file to customize:

```bash
# Timeout for requests (milliseconds)
TARGET_TIMEOUT=10000

# Maximum number of retries
MAX_RETRIES=3

# Number of concurrent requests
CONCURRENT_REQUESTS=10

# Delay between requests (milliseconds)
RATE_LIMIT_DELAY=100

# Randomize delays
RANDOMIZE_DELAY=true

# WAF bypass options
WAF_BYPASS_ENABLED=true
ENCODING_METHODS=hex,url,unicode,base64

# Logging
LOG_LEVEL=info
LOG_FILE=logs/tca-rex.log
```

## Tips & Best Practices

1. **Always get authorization** before testing
2. **Start with WAF detection** to plan your approach
3. **Use appropriate delays** to avoid detection
4. **Test parameters discovered** by the crawler
5. **Combine multiple techniques** for WAF bypass
6. **Save reports** for documentation
7. **Review output carefully** for false positives

## Output Examples

### Successful XSS Detection

```
🔴 Starting XSS detection...
Found 3 input fields
Testing payload: <script>alert('XSS')</script>...
Testing payload: <img src=x onerror="alert('XSS')">
✅ XSS detection completed
Potential vulnerabilities: 2
```

### WAF Detected

```
🛡️  Detecting WAF on https://example.com...
⚠️  WAF detected!
Likely WAF: CloudFlare
Bypass techniques available: 5
```

## Troubleshooting

### Connection Timeout

```bash
# Increase timeout
export TARGET_TIMEOUT=30000
node index.js scan --target https://example.com
```

### High False Positives

```bash
# Reduce concurrent requests
export CONCURRENT_REQUESTS=5
node index.js detect:xss --target https://example.com
```

### Rate Limited

```bash
# Increase delay between requests
export RATE_LIMIT_DELAY=500
node index.js crawl --target https://example.com
```

---

For more information, see [FEATURES.md](./FEATURES.md) and [WAF_BYPASS.md](./WAF_BYPASS.md)
