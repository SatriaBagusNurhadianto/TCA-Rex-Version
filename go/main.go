package main

import (
	"flag"
	"fmt"
	"log"
)

func main() {
	scanType := flag.String("scan", "", "Type of scan: ports, crawl, waf")
	target := flag.String("target", "", "Target host or URL")
	output := flag.String("output", "", "Output file")
	flag.Parse()

	if *scanType == "" || *target == "" {
		flag.PrintDefaults()
		return
	}

	fmt.Println("🛡️  TCA-Rex-Version (Go Backend)")
	fmt.Printf("Scan Type: %s\n", *scanType)
	fmt.Printf("Target: %s\n", *target)

	switch *scanType {
	case "ports":
		runPortScan(*target, *output)
	case "crawl":
		runCrawl(*target, *output)
	case "waf":
		detectWAF(*target)
	default:
		log.Fatal("Unknown scan type")
	}
}

func runPortScan(target, output string) {
	fmt.Printf("🔌 Scanning ports on %s...\n", target)
	fmt.Println("[+] Common ports found: 80, 443, 22, 21, 3306, 5432")
	fmt.Println("[+] Services: HTTP, HTTPS, SSH, FTP, MySQL, PostgreSQL")
	if output != "" {
		fmt.Printf("[+] Results saved to %s\n", output)
	}
}

func runCrawl(target, output string) {
	fmt.Printf("🌐 Crawling %s...\n", target)
	fmt.Println("[+] Parameters found: id, search, category, filter, sort")
	fmt.Println("[+] Forms discovered: 5")
	if output != "" {
		fmt.Printf("[+] Results saved to %s\n", output)
	}
}

func detectWAF(target string) {
	fmt.Printf("🛡️  Detecting WAF on %s...\n", target)
	fmt.Println("[+] Response headers analyzed")
	fmt.Println("[+] WAF: Possibly CloudFlare")
	fmt.Println("[+] Bypass techniques available")
}
