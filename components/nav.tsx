"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MessageSquare, Zap, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Nav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300 backdrop-blur-lg',
        isScrolled ? 
          'bg-background/80 border-b border-border/50 py-4' : 
          'bg-transparent py-6'
      )}
    >
      <div className="container px-4 mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-cyan-400">
            <Zap size={24} className="text-white" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-600/30 to-cyan-400/30 blur-md -z-10"></div>
          </div>
          <span className="font-space-grotesk text-xl font-bold tracking-tight">
            NEZZON
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-sm font-medium text-foreground/80 hover:text-foreground transition">
            Features
          </Link>
          <Link href="#compare" className="text-sm font-medium text-foreground/80 hover:text-foreground transition">
            Compare
          </Link>
          <Link href="#testimonials" className="text-sm font-medium text-foreground/80 hover:text-foreground transition">
            Testimonials
          </Link>
          <Link href="#pricing" className="text-sm font-medium text-foreground/80 hover:text-foreground transition">
            Pricing
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Button variant="outline" size="sm">
            Log In
          </Button>
          <Button size="sm" className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 transition-all duration-300">
            Join Waitlist
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border/50 py-4 px-4">
          <nav className="flex flex-col space-y-4 py-4">
            <Link 
              href="#features" 
              className="text-foreground/80 hover:text-foreground py-2"
              onClick={() => setIsOpen(false)}
            >
              Features
            </Link>
            <Link 
              href="#compare" 
              className="text-foreground/80 hover:text-foreground py-2"
              onClick={() => setIsOpen(false)}
            >
              Compare
            </Link>
            <Link 
              href="#testimonials" 
              className="text-foreground/80 hover:text-foreground py-2"
              onClick={() => setIsOpen(false)}
            >
              Testimonials
            </Link>
            <Link 
              href="#pricing" 
              className="text-foreground/80 hover:text-foreground py-2"
              onClick={() => setIsOpen(false)}
            >
              Pricing
            </Link>
            <div className="flex flex-col gap-3 pt-2">
              <Button variant="outline" size="sm">
                Log In
              </Button>
              <Button size="sm" className="bg-gradient-to-r from-purple-600 to-cyan-500">
                Join Waitlist
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Nav;