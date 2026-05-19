# Installation Guide - TCA-Rex-Version

## Prerequisites

- Node.js v14 or higher
- Go 1.18 or higher
- npm or yarn package manager
- git
- Python 3.6+ (optional, for advanced features)

## Step 1: Clone the Repository

```bash
git clone https://github.com/SatriaBagusNurhadianto/TCA-Rex-Version.git
cd TCA-Rex-Version
```

## Step 2: Install Node.js Dependencies

```bash
npm install
```

Or with yarn:

```bash
yarn install
```

## Step 3: Setup Go

```bash
cd go
go mod download
cd ..
```

## Step 4: Environment Configuration

```bash
cp .env.example .env
```

Edit `.env` file with your preferences:

```bash
TARGET_TIMEOUT=10000
MAX_RETRIES=3
CONCURRENT_REQUESTS=10
RATE_LIMIT_DELAY=100
LOG_LEVEL=info
```

## Step 5: Verify Installation

```bash
node index.js --help
```

You should see the CLI help menu.

## Troubleshooting

### Node.js Module Errors

If you get module not found errors:

```bash
rm -rf node_modules package-lock.json
npm install
```

### Go Compilation Errors

Ensure Go is properly installed:

```bash
go version
```

If not installed, download from https://golang.org/dl/

### Permission Denied

Make the index.js executable:

```bash
chmod +x index.js
```

## System Requirements

- **RAM**: Minimum 2GB
- **Disk Space**: 500MB
- **Network**: Active internet connection for target scanning

## Optional: Global Installation

To use TCA-Rex-Version globally:

```bash
npm install -g ./
tca-rex --help
```

## Next Steps

See [USAGE.md](./USAGE.md) for usage examples.
