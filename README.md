
# TCA-Rex-Version

The Chava Alteration — Red Team Exploitation Framework.

TCA-Rex-Version is a lightweight, educational hybrid framework (Node.js + Go) intended as a learning and reference toolkit for junior penetration testers. It demonstrates basic patterns used in web application reconnaissance, scanning, and simple vulnerability checks (XSS, SQLi, crawling, and WAF detection). This project is for authorized, non-destructive testing and learning only.

Important: run scans only against targets for which you have explicit authorization.

---

## Table of contents

- Project summary
- Features
- Architecture and repository layout
- Prerequisites
- Installation
- Configuration
- Quick start and common commands
- Examples and CLI flags
- Payload files and safe testing
- Development and tests
- Continuous Integration
- Docker usage
- Dependency maintenance
- Security, ethics, and legal
- Contributing
- Troubleshooting
- License

---

## Project summary

TCA-Rex-Version is an educational framework that combines Node.js scripts for high-level HTTP/HTML handling with Go modules for higher-performance tasks. The code prioritizes clarity and pedagogical value over advanced exploitation features. It is intended to help junior testers learn safe discovery techniques, payload management, and how to structure small security tooling projects.

---

## Features

- Web crawling with parameter discovery and form enumeration
- Scaffolding for XSS and SQL Injection testing using payload lists
- Basic WAF detection and bypass stubs (encoding, header manipulation)
- Optional Go-based port scanning and fingerprint modules
- Shared payload and wordlist directories for training
- Simple CI configuration and a minimal test to validate pipeline
- Clear, documented entry points and scripts for beginners

---

## Architecture and repository layout

The important files and folders:

TCA-Rex-Version/
- README.md
- FEATURES.md
- INSTALLATION.md
- USAGE.md
- WAF_BYPASS.md
- LICENSE
- .env.example
- nodejs/
  - package.json
  - index.js
  - src/
    - vulnerability.js
    - xss_detector.js
    - sqli_detector.js
    - waf_bypass.js
    - crawler.js
    - utils.js
- go/
  - go.mod
  - main.go
  - modules/
    - scanner.go
    - crawler.go
    - waf_bypass.go
    - fingerprint.go
- shared/payloads/
  - xss.txt
  - sqli.txt
  - waf_bypass.txt
  - wordlists/
    - params.txt
    - headers.txt
    - paths.txt
- tests/
  - basic.test.js
- Dockerfile (optional)

How it fits together:
- The Node.js CLI (nodejs/index.js) provides high-level workflows (scan, crawl, detect:xss, detect:sqli, waf:detect, waf:bypass) and uses modules under `nodejs/src`.
- The Go modules (under `go/`) are optional components for tasks that benefit from concurrency or lower-level networking (for example, fast port scanning).
- Payloads and wordlists are stored in `shared/payloads` for easy editing and safe reuse.

---

## Prerequisites

- Node.js 18 or newer (recommended)
- npm (comes with Node.js)
- Go 1.20+ (only if you intend to run Go components)
- Git
- (Optional) Docker

---

## Installation

1. Clone the repository
```bash
git clone https://github.com/SatriaBagusNurhadianto/TCA-Rex-Version.git
cd TCA-Rex-Version
```

2. Install Node.js dependencies
```bash
npm ci
```
Use `npm ci` for reproducible installs in CI. Use `npm install` only when you intentionally want to update locks.

3. (Optional) Install Go modules
```bash
cd go
go mod download
cd ..
```

4. Copy environment example and adjust values
```bash
cp .env.example .env
# Edit .env as needed
```

---

## Configuration

- `.env` file is read via dotenv where applicable.
- Typical variables:
  - NODE_ENV=development
  - LOG_LEVEL=info
- Configure any CLI-specific settings or API keys in `.env` (do not commit secrets).

---

## Quick start and common commands

The CLI entrypoint is `nodejs/index.js`. package.json scripts provide shortcuts.

From project root:

- Start (placeholder)
```bash
npm start
```

- Development with auto-reload (nodemon)
```bash
npm run dev
```

- Full vulnerability scan (example)
```bash
npm run scan -- --target https://example.com
```

- Crawl and discover parameters
```bash
npm run crawl -- --target https://example.com --depth 3
```

- XSS detection (uses `shared/payloads/xss.txt`)
```bash
npm run xss -- --target https://example.com
```

- SQLi detection (uses `shared/payloads/sqli.txt`)
```bash
npm run sqli -- --target https://example.com
```

- WAF detection
```bash
npm run waf:detect -- --target https://example.com
```

- WAF bypass attempt (technique examples: encoding, header-manipulation)
```bash
npm run waf:bypass -- --target https://example.com --technique encoding
```

Notes:
- The `--` separator is required when passing flags through npm scripts.
- Commands are non-destructive placeholders by default — review and extend with care.

---

## Examples and CLI flags

Typical options supported by the CLI:
- `--target` (required for scanning commands): the base URL or host to scan.
- `--depth` (for crawling): integer, default commonly 3.
- `--technique` (for waf:bypass): string label for bypass approach.

Examples:
- Crawl with depth 2:
```bash
npm run crawl -- --target https://example.com --depth 2
```
- XSS scan against a search endpoint:
```bash
npm run xss -- --target 'https://example.com/search?q=test'
```
- Run Go port scanner (if included):
```bash
go run go/main.go --scan ports --target example.com
```

---

## Payload files and safe testing

Payloads are stored under `shared/payloads/`. Examples:
- `shared/payloads/xss.txt`
- `shared/payloads/sqli.txt`

Guidelines:
- Only use non-destructive payloads for learning (avoid `DROP`, `DELETE`, or any destructive SQL).
- Keep payload lists trimmed of blank lines; the detectors filter empty entries.
- Add test cases and examples that run without modifying remote data.

---

## Development and tests

A minimal test suite is included to verify CI setups. Run:
```bash
npm test
```

Add unit and integration tests as you expand functionality. Keep tests fast and deterministic.

Coding guidelines:
- Prefer explicit error logging (avoid silent catch blocks).
- Filter input data (payloads, link lists) to avoid crashes.
- Write non-destructive tests; if destructive checks are necessary, gate them behind explicit flags and require safe lab targets.

---

## Continuous Integration

A GitHub Actions workflow `.github/workflows/ci.yml` is included and configured to:
- run on pushes and PRs
- use Node 18
- run `npm ci` and `npm test`

Keep CI lightweight and fast. Expand with linting and additional checks after stabilizing core behavior.

---

## Docker usage

A lightweight Dockerfile is included to run the CLI without local Node setup.

Build:
```bash
docker build -t tca-rex:latest .
```

Run a scan (example):
```bash
docker run --rm tca-rex:latest scan --target https://example.com
```

Adjust volume mounts and environment variables for payload customization or persistent outputs.

---

## Dependency maintenance

To inspect outdated and deprecated packages:
```bash
npm outdated
npm ls deprecated
```

For controlled upgrades:
- Use `npx npm-check-updates` to plan upgrades
- Update `package.json` versions intentionally and run `npm install`
- Re-run tests and CI after any dependency upgrades

If a package is no longer maintained, consider replacing it with a maintained alternative (for example, Playwright instead of Puppeteer if the project needs active browser automation support).

---

## Security, ethics, and legal

This project is for authorized testing and learning only.

- Always obtain explicit permission before scanning or testing any system.
- Do not perform destructive tests on third-party systems.
- Respect applicable laws, organizational policies, and ethical guidelines.
- Remove or redact sensitive results from public commits or issues.

---

## Contributing

Contributions are welcome. Suggested workflow:
1. Fork the repository.
2. Create a descriptive branch name: `feat/<name>` or `fix/<name>`.
3. Run `npm ci` and `npm test` locally before submitting.
4. Open a pull request with an explanation of changes and testing steps.

When contributing detection logic:
- Document the exact change and why it is safe.
- Provide test cases that are non-destructive.

---

## Troubleshooting

Common issues:
- CLI scripts not running: confirm `package.json` has `"main": "nodejs/index.js"` and dependencies are installed (`npm ci`).
- Payloads missing: ensure `shared/payloads/xss.txt` and `shared/payloads/sqli.txt` exist and contain content.
- TLS/SSL errors during crawling: these may be caused by self-signed certs; only bypass TLS for trusted test environments and with consent.

If you encounter permission issues pushing branches or creating PRs, ensure your Git remote and credentials are configured correctly (SSH key or personal access token).

---

## License

This repository is released under the GNU General Public License v3.0 (GPL-3.0). See the LICENSE file for details.

---

## Acknowledgements and next steps

Recommended improvements for progression:
- Implement safe, non-destructive verification routines for vulnerabilities (proof-of-concept rendering rather than server-side changes).
- Expand and document lab environments for learners (docker-compose or VM images).
- Add more tests and examples to demonstrate output parsing and reporting.
