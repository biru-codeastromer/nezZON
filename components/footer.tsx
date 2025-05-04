import React from 'react';
import Link from 'next/link';
import { Zap, Twitter, Instagram, Linkedin, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border/50 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-cyan-400">
                <Zap size={16} className="text-white" />
              </div>
              <span className="font-space-grotesk text-lg font-bold tracking-tight">
                NEZZON
              </span>
            </Link>
            <p className="text-muted-foreground max-w-md">
              The first all-in-one communication platform merging Slack, Discord and Instagram into one revolutionary productivity-social hybrid.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition">
                <Twitter size={18} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition">
                <Instagram size={18} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition">
                <Linkedin size={18} />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition">
                <Github size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-foreground mb-4">Product</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#features" className="text-muted-foreground hover:text-foreground text-sm transition">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="text-muted-foreground hover:text-foreground text-sm transition">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#roadmap" className="text-muted-foreground hover:text-foreground text-sm transition">
                  Roadmap
                </Link>
              </li>
              <li>
                <Link href="#beta" className="text-muted-foreground hover:text-foreground text-sm transition">
                  Beta Program
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-foreground mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground text-sm transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-foreground text-sm transition">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-muted-foreground hover:text-foreground text-sm transition">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground text-sm transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-foreground mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground text-sm transition">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground text-sm transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-muted-foreground hover:text-foreground text-sm transition">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/gdpr" className="text-muted-foreground hover:text-foreground text-sm transition">
                  GDPR
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border/50 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            © 2025 NEZZON. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition">
              Privacy
            </Link>
            <Link href="/cookies" className="text-sm text-muted-foreground hover:text-foreground transition">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;