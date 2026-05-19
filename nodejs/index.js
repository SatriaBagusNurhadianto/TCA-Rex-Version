#!/usr/bin/env node

const yargs = require('yargs');
const XSSDetector = require('./src/xss_detector');
const SQLiDetector = require('./src/sqli_detector');
const WebCrawler = require('./src/crawler');
const WAFBypass = require('./src/waf_bypass');
const Vulnerability = require('./src/vulnerability');

require('dotenv').config();

const argv = yargs
  .command('scan', 'Full vulnerability scan', (yargs) => {
    yargs.option('target', {
      describe: 'Target URL',
      type: 'string',
      demandOption: true
    });
  }, async (argv) => {
    console.log('🔍 Starting full vulnerability scan...');
    const scanner = new Vulnerability(argv.target);
    await scanner.scan();
  })
  .command('detect:xss', 'Detect XSS vulnerabilities', (yargs) => {
    yargs.option('target', {
      describe: 'Target URL',
      type: 'string',
      demandOption: true
    });
  }, async (argv) => {
    console.log('🔴 Starting XSS detection...');
    const detector = new XSSDetector(argv.target);
    await detector.detect();
  })
  .command('detect:sqli', 'Detect SQL Injection vulnerabilities', (yargs) => {
    yargs.option('target', {
      describe: 'Target URL',
      type: 'string',
      demandOption: true
    });
  }, async (argv) => {
    console.log('🟢 Starting SQL Injection detection...');
    const detector = new SQLiDetector(argv.target);
    await detector.detect();
  })
  .command('crawl', 'Web crawling and parameter discovery', (yargs) => {
    yargs.option('target', {
      describe: 'Target URL',
      type: 'string',
      demandOption: true
    }).option('depth', {
      describe: 'Crawl depth',
      type: 'number',
      default: 3
    });
  }, async (argv) => {
    console.log('🌐 Starting web crawling...');
    const crawler = new WebCrawler(argv.target);
    await crawler.crawl(argv.depth);
  })
  .command('waf:detect', 'Detect WAF', (yargs) => {
    yargs.option('target', {
      describe: 'Target URL',
      type: 'string',
      demandOption: true
    });
  }, async (argv) => {
    console.log('🛡️  Detecting WAF...');
    const waf = new WAFBypass(argv.target);
    await waf.detectWAF();
  })
  .command('waf:bypass', 'Attempt WAF bypass', (yargs) => {
    yargs.option('target', {
      describe: 'Target URL',
      type: 'string',
      demandOption: true
    }).option('technique', {
      describe: 'Bypass technique',
      type: 'string',
      default: 'encoding'
    });
  }, async (argv) => {
    console.log('⚡ Attempting WAF bypass...');
    const waf = new WAFBypass(argv.target);
    await waf.bypass(argv.technique);
  })
  .demandCommand()
  .help()
  .argv;
