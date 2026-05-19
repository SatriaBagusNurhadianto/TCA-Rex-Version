# 🛡️ TCA-Rex-Version (The Chava Alteration - Red Team Exploitation)

**A comprehensive red team cybersecurity framework for penetration testing, vulnerability detection, and WAF bypass operations.**

---

## 📋 **What is TCA-Rex-Version?**

TCA-Rex-Version is a hybrid red team framework built with **Node.js** and **Go** designed to identify and exploit web vulnerabilities while evading Web Application Firewalls (WAF). It combines the flexibility of Node.js with the performance of Go to deliver:

### **Core Capabilities:**
- 🔍 **Vulnerability Detection**: XSS, SQL Injection, parameter tampering
- 🌐 **Web Crawling**: Automated site reconnaissance and parameter discovery
- 🔌 **Port Scanning**: Fast concurrent network scanning
- 🛡️ **WAF Detection & Bypass**: Identify and evade firewall protections
- 🎯 **Payload Generation**: Intelligent encoding and obfuscation
- 🧠 **Human Error Detection**: Identify misconfigurations
- 📊 **Report Generation**: Detailed vulnerability reports

---

## 🎯 **Key Features**

### **1. XSS Detection Module**
- DOM-based XSS detection
- Reflected XSS scanning
- Stored XSS identification
- Polymorph encoding evasion
- Event handler fuzzing

### **2. SQL Injection Scanner**
- Time-based blind SQLi
- Boolean-based SQLi
- Union-based SQLi
- Error-based SQLi
- WAF-aware payload generation

### **3. Port Scanner (Go)**
- SYN scanning with high concurrency
- Service version detection
- Banner grabbing
- Protocol identification

### **4. Web Crawler (Hybrid)**
- JavaScript rendering (headless browser)
- Form discovery and mapping
- Hidden parameter detection
- Cookie and session tracking
- Human-like behavior patterns

### **5. WAF Bypass Engine**
- Request signature randomization
- HTTP header manipulation
- Payload encoding (Hex, Unicode, Base64, URL)
- Rate limiting evasion
- IP/User-Agent rotation
- Null byte injection

---

## 📦 **Project Structure**

```
TCA-Rex-Version/
├── README.md
├── FEATURES.md
├── INSTALLATION.md
├── USAGE.md
├── WAF_BYPASS.md
├── LICENSE
├── .gitignore
├── .env.example
│
├── go/
│   ├── go.mod
│   ├── main.go
│   ├── config.yaml
│   └── modules/
│       ├── scanner.go
│       ├── crawler.go
│       ├── waf_bypass.go
│       └── fingerprint.go
│
├── nodejs/
│   ├── package.json
│   ├── index.js
│   └── src/
│       ├── vulnerability.js
│       ├── xss_detector.js
│       ├── sqli_detector.js
│       ├── waf_bypass.js
│       ├── crawler.js
│       └── utils.js
│
├── shared/payloads/
│   ├── xss.txt
│   ├── sqli.txt
│   ├── waf_bypass.txt
│   └── wordlists/
│       ├── params.txt
│       ├── headers.txt
│       └── paths.txt
│
and tests/
```

---

## 🚀 **Quick Start**

### **Installation**

```bash
git clone https://github.com/SatriaBagusNurhadianto/TCA-Rex-Version.git
cd TCA-Rex-Version

npm install
cd go && go mod download && cd ..

cp .env.example .env
```

### **Basic Commands**

```bash
# Full vulnerability scan
node index.js scan --target https://example.com

# XSS detection
node index.js detect:xss --target https://example.com/search?q=test

# SQL injection detection
node index.js detect:sqli --target https://example.com/product?id=1

# Port scanning
go run go/main.go --scan ports --target example.com

# Web crawling
node index.js crawl --target https://example.com

# WAF detection and bypass
node index.js waf:detect --target https://example.com
node index.js waf:bypass --target https://example.com
```

---

## ⚠️ **Legal Disclaimer**

**TCA-Rex-Version is designed for authorized security testing only.**
- Only use on systems you own or have explicit written permission to test
- Unauthorized access to computer systems is illegal
- Users are responsible for ensuring they have proper authorization

---

## 📄 **License**

GPL-3.0 License

---

**Made with 🛡️ for red team security professionals.**

*TCA-Rex-Version v1.0.0 | The Chava Alteration*