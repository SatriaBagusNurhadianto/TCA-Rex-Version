# TCA-Rex-Version Features

## Core Features

### 1. Vulnerability Detection

#### XSS Detection
- DOM-based XSS
- Reflected XSS
- Stored XSS
- Advanced payload obfuscation
- Event handler fuzzing
- 500+ payload variants

#### SQL Injection Detection
- Time-based blind SQLi
- Boolean-based SQLi
- Union-based SQLi
- Error-based SQLi
- Stacked queries
- 300+ payload variants

#### Parameter Tampering
- Type coercion attacks
- Integer overflow
- Path traversal
- Logic bypass

### 2. Reconnaissance & Scanning

#### Port Scanning (Go-based)
- SYN scanning
- Service detection
- Banner grabbing
- Version identification
- High concurrency (50+ simultaneous scans)

#### Web Crawling (Hybrid)
- Automatic site mapping
- Parameter discovery
- Form identification
- Hidden parameter detection
- JavaScript rendering
- Authentication handling

### 3. WAF Detection & Bypass

#### WAF Detection
- Automatic identification of common WAFs
- CloudFlare detection
- ModSecurity detection
- AWS WAF detection
- Imperva WAF detection

#### WAF Bypass Techniques
- **Encoding Methods**:
  - Hexadecimal encoding
  - Unicode escaping
  - Base64 encoding
  - URL encoding
  - Double encoding
  - HTML entity encoding

- **Header Manipulation**:
  - X-Forwarded-For spoofing
  - X-Original-IP modification
  - User-Agent rotation
  - Referer spoofing
  - Custom header injection

- **Payload Mutation**:
  - Case variation
  - Whitespace injection
  - Comment insertion
  - Null byte injection
  - String concatenation
  - Buffer overflow patterns

- **Behavioral Evasion**:
  - Request rate limiting
  - Randomized delays (50-5000ms)
  - IP rotation
  - Session rotation
  - Mixed encoding combinations

### 4. Undetectable Operation

- Randomized user agents (30+ variants)
- Dynamic request timing
- Legitimate referrer headers
- Cookie handling
- Session management
- Browser-like behavior patterns

### 5. Advanced Features

#### Human Error Detection
- Default credentials scanning
- Configuration file discovery
- Debug information leakage
- Comment analysis
- Path traversal opportunities

#### Payload Generation
- Custom payload creation
- Automatic encoding
- Context-aware payloads
- Polymorphic payloads
- Obfuscation techniques

#### Reporting
- HTML reports
- JSON output
- SARIF format
- CSV export
- Severity ratings
- Remediation suggestions

## Performance

- Concurrent requests: Up to 50 simultaneous
- Port scanning speed: 1000+ ports/minute
- Web crawling: 100+ URLs/minute
- Memory efficient: <500MB for large scans
- Go backend ensures maximum performance

## Security & Stealth

- Zero logging on target servers
- Legitimate user agents
- Real browser behavior patterns
- Rate limiting awareness
- Proxy chain support
- IP rotation capability

## Payload Database

- 500+ XSS payloads
- 300+ SQL Injection payloads
- WAF bypass techniques
- Common parameter wordlist
- Directory/path wordlist
- HTTP header wordlist

## Extensibility

- Modular architecture
- Custom payload support
- Plugin system ready
- API hooks
- Integration ready

## Compliance & Legal

- Requires explicit authorization
- Safe mode for authorized testing
- Audit logging capability
- Report generation
- Timeline tracking

---

For detailed usage, see [USAGE.md](./USAGE.md)
