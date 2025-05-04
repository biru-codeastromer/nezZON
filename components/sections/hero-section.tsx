"use client"

import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, MessageSquare, Users, Camera, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MorphingText } from '@/components/ui/morphing-text';

const HeroSection = () => {
  const [activeView, setActiveView] = useState<'work' | 'community' | 'social'>('work');
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Cycle through the tabs automatically every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveView(current => {
        if (current === 'work') return 'community';
        if (current === 'community') return 'social';
        return 'work';
      });
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  // Parallax effect for floating elements
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const { clientX, clientY } = e;
      const { width, height, left, top } = containerRef.current.getBoundingClientRect();
      
      // Calculate mouse position relative to the container
      const x = (clientX - left) / width - 0.5;
      const y = (clientY - top) / height - 0.5;
      
      // Apply parallax effect to floating elements
      const floatingElements = containerRef.current.querySelectorAll('.floating-element');
      floatingElements.forEach((el, i) => {
        const depth = 1 + i * 0.5; // Increasing depth for each element
        const translateX = x * depth * 20; // Adjust multiplier for effect strength
        const translateY = y * depth * 20;
        
        (el as HTMLElement).style.transform = `translate(${translateX}px, ${translateY}px)`;
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return (
    <section
      ref={containerRef}
      className="relative min-h-screen pt-24 pb-16 flex flex-col justify-center overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-purple-700/20 rounded-full blur-3xl floating-element"></div>
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-cyan-700/20 rounded-full blur-3xl floating-element"></div>
      <div className="absolute -bottom-20 left-1/4 w-72 h-72 bg-blue-700/20 rounded-full blur-3xl floating-element"></div>
      
      <div className="container mx-auto px-4 flex flex-col justify-center items-center text-center z-10">
        {/* Headline */}
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold font-space-grotesk mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-cyan-500 to-blue-500">
          The Future of <br className="md:hidden"/> Communication <span className="inline-block animate-pulse">✨</span>
        </h1>
        
        {/* Animated subtitle */}
        <div className="flex items-center justify-center mb-6 h-12">
          <MorphingText 
            phrases={[
              "Slack's productivity",
              "Discord's community",
              "Instagram's creativity",
              "UNIFIED"
            ]}
            className="text-xl md:text-2xl font-medium"
          />
        </div>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10">
          The first all-in-one platform that ends app switching forever. 
          <span className="font-medium text-white block mt-2">Work. Chat. Share. All in one place.</span>
        </p>
        
        {/* CTA buttons */}
        <div className="flex flex-col md:flex-row gap-4 mb-16">
          <Button size="lg" className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 transition-all duration-300 shadow-glow-purple">
            Join the Waitlist
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button size="lg" variant="outline" className="group border-muted hover:border-foreground/50 transition-all duration-300">
            Watch Demo
            <span className="ml-2 w-5 h-5 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-all">
              <span className="w-0 h-0 border-t-4 border-t-transparent border-l-8 border-l-current border-b-4 border-b-transparent ml-0.5"></span>
            </span>
          </Button>
        </div>
        
        {/* Platform demo */}
        <div className="w-full max-w-5xl">
          <div className="bg-background/40 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden shadow-2xl">
            {/* Tabs */}
            <div className="flex border-b border-white/10">
              <button 
                className={cn(
                  "flex items-center gap-2 px-4 py-3 font-medium transition-all",
                  activeView === 'work' 
                    ? "text-foreground border-b-2 border-purple-500" 
                    : "text-muted-foreground hover:text-foreground/80"
                )}
                onClick={() => setActiveView('work')}
              >
                <MessageSquare size={18} />
                <span>Workspace</span>
              </button>
              <button 
                className={cn(
                  "flex items-center gap-2 px-4 py-3 font-medium transition-all",
                  activeView === 'community' 
                    ? "text-foreground border-b-2 border-cyan-500" 
                    : "text-muted-foreground hover:text-foreground/80"
                )}
                onClick={() => setActiveView('community')}
              >
                <Users size={18} />
                <span>Community</span>
              </button>
              <button 
                className={cn(
                  "flex items-center gap-2 px-4 py-3 font-medium transition-all",
                  activeView === 'social' 
                    ? "text-foreground border-b-2 border-blue-400" 
                    : "text-muted-foreground hover:text-foreground/80"
                )}
                onClick={() => setActiveView('social')}
              >
                <Camera size={18} />
                <span>Social</span>
              </button>
            </div>
            
            {/* Content */}
            <div className="p-6 h-[420px] max-h-[70vh]">
              <div className={cn(
                "transition-opacity duration-500",
                activeView === 'work' ? "opacity-100" : "opacity-0 hidden"
              )}>
                <WorkspaceView />
              </div>
              <div className={cn(
                "transition-opacity duration-500",
                activeView === 'community' ? "opacity-100" : "opacity-0 hidden"
              )}>
                <CommunityView />
              </div>
              <div className={cn(
                "transition-opacity duration-500",
                activeView === 'social' ? "opacity-100" : "opacity-0 hidden"
              )}>
                <SocialView />
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce">
          <span className="text-sm text-muted-foreground">Scroll to Explore</span>
          <svg className="w-5 h-5 mt-1 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
};

const WorkspaceView = () => (
  <div className="flex h-full">
    {/* Sidebar */}
    <div className="w-1/4 border-r border-white/10 pr-4">
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Channels</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2 p-2 bg-white/5 rounded">
            <MessageSquare size={16} />
            <span>general</span>
          </div>
          <div className="flex items-center gap-2 p-2 text-muted-foreground hover:text-foreground">
            <MessageSquare size={16} />
            <span>marketing</span>
          </div>
          <div className="flex items-center gap-2 p-2 text-muted-foreground hover:text-foreground">
            <MessageSquare size={16} />
            <span>design</span>
          </div>
          <div className="flex items-center gap-2 p-2 text-muted-foreground hover:text-foreground">
            <MessageSquare size={16} />
            <span>development</span>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-2">Direct Messages</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2 p-2 text-muted-foreground hover:text-foreground">
            <div className="w-5 h-5 rounded-full bg-purple-500"></div>
            <span>Alex Smith</span>
          </div>
          <div className="flex items-center gap-2 p-2 text-muted-foreground hover:text-foreground">
            <div className="w-5 h-5 rounded-full bg-cyan-500"></div>
            <span>Jamie Chen</span>
          </div>
          <div className="flex items-center gap-2 p-2 text-muted-foreground hover:text-foreground">
            <div className="w-5 h-5 rounded-full bg-blue-500"></div>
            <span>Taylor Kim</span>
          </div>
        </div>
      </div>
    </div>
    
    {/* Main content */}
    <div className="w-3/4 pl-4">
      <div className="border-b border-white/10 pb-3 mb-4">
        <h2 className="text-xl font-medium">general</h2>
      </div>
      
      {/* Messages */}
      <div className="space-y-4">
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center">A</div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium">Alex Smith</span>
              <span className="text-xs text-muted-foreground">10:32 AM</span>
            </div>
            <p className="text-sm">Hey team, I've just pushed the new design system updates!</p>
          </div>
        </div>
        
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center">J</div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium">Jamie Chen</span>
              <span className="text-xs text-muted-foreground">10:45 AM</span>
            </div>
            <p className="text-sm">Awesome! Let me check it out. I'll integrate it with the marketing site.</p>
          </div>
        </div>
        
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">T</div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium">Taylor Kim</span>
              <span className="text-xs text-muted-foreground">10:51 AM</span>
            </div>
            <p className="text-sm">
              Just a reminder that we have the client presentation at 2 PM today.
              <span className="inline-block ml-2 px-2 py-0.5 bg-purple-500/20 text-purple-300 rounded text-xs">@channel</span>
            </p>
          </div>
        </div>
        
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center">A</div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium">Alex Smith</span>
              <span className="text-xs text-muted-foreground">10:55 AM</span>
            </div>
            <p className="text-sm">Thanks for the reminder! I've prepared all the slides.</p>
          </div>
        </div>
      </div>
      
      {/* Input */}
      <div className="absolute bottom-6 left-0 right-0 px-10">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Message #general" 
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <button className="text-muted-foreground hover:text-foreground">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
            <button className="text-muted-foreground hover:text-foreground">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const CommunityView = () => (
  <div className="flex h-full">
    {/* Sidebar */}
    <div className="w-1/4 border-r border-white/10 pr-4">
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Gaming Hub</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2 p-2 bg-white/5 rounded">
            <MessageSquare size={16} />
            <span>announcements</span>
          </div>
          <div className="flex items-center gap-2 p-2 text-muted-foreground hover:text-foreground">
            <MessageSquare size={16} />
            <span>game-chat</span>
          </div>
          <div className="flex items-center gap-2 p-2 text-muted-foreground hover:text-foreground">
            <MessageSquare size={16} />
            <span>memes</span>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Voice Channels</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-2 text-muted-foreground hover:text-foreground">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
              <span>Game Lobby</span>
            </div>
            <span className="text-xs bg-green-500/20 text-green-300 px-1.5 py-0.5 rounded">5</span>
          </div>
          <div className="flex items-center justify-between p-2 text-muted-foreground hover:text-foreground">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
              <span>Strategy</span>
            </div>
            <span className="text-xs bg-green-500/20 text-green-300 px-1.5 py-0.5 rounded">2</span>
          </div>
          <div className="flex items-center justify-between p-2 text-muted-foreground hover:text-foreground">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
              <span>AFK</span>
            </div>
            <span className="text-xs bg-green-500/20 text-green-300 px-1.5 py-0.5 rounded">1</span>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-2">Online</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2 p-2 text-muted-foreground">
            <div className="w-5 h-5 rounded-full bg-cyan-500 relative">
              <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full"></span>
            </div>
            <span>CyberWarrior</span>
          </div>
          <div className="flex items-center gap-2 p-2 text-muted-foreground">
            <div className="w-5 h-5 rounded-full bg-purple-500 relative">
              <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full"></span>
            </div>
            <span>PixelNinja</span>
          </div>
          <div className="flex items-center gap-2 p-2 text-muted-foreground">
            <div className="w-5 h-5 rounded-full bg-blue-500 relative">
              <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full"></span>
            </div>
            <span>GalacticGamer</span>
          </div>
        </div>
      </div>
    </div>
    
    {/* Main content */}
    <div className="w-3/4 pl-4">
      <div className="flex border-b border-white/10 pb-3 mb-4 items-center justify-between">
        <h2 className="text-xl font-medium">Game Lobby</h2>
        <div className="flex items-center gap-2">
          <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded flex items-center gap-1">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            5 Online
          </span>
          <button className="bg-white/5 p-1.5 rounded hover:bg-white/10">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.465a5 5 0 001.897.707m2.722-9.607A9 9 0 003.765 4.522" />
            </svg>
          </button>
          <button className="bg-white/5 p-1.5 rounded hover:bg-white/10">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="flex items-center gap-4 mb-4 bg-white/5 rounded-lg p-3">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center">C</div>
          <div>
            <div className="font-medium">CyberWarrior</div>
            <div className="text-xs text-green-400">Playing Valorant</div>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-end gap-2">
          <button className="bg-white/10 p-2 rounded-full hover:bg-white/20">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          </button>
          <button className="bg-white/10 p-2 rounded-full hover:bg-white/20">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </button>
          <button className="bg-white/10 p-2 rounded-full hover:bg-white/20">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Chat */}
      <div className="space-y-4">
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center">C</div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium">CyberWarrior</span>
              <span className="text-xs text-muted-foreground">Today at 8:05 PM</span>
            </div>
            <p className="text-sm">Anyone up for a game? I'm online for the next hour</p>
          </div>
        </div>
        
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center">P</div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium">PixelNinja</span>
              <span className="text-xs text-muted-foreground">Today at 8:08 PM</span>
            </div>
            <p className="text-sm">Count me in! Let me finish this match first</p>
          </div>
        </div>
        
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">G</div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium">GalacticGamer</span>
              <span className="text-xs text-muted-foreground">Today at 8:12 PM</span>
            </div>
            <div className="p-3 bg-white/5 rounded-md text-sm">
              <p>Just got a new high score! 🎮🔥</p>
              <div className="mt-2 rounded overflow-hidden">
                <div className="bg-purple-900/50 p-3 text-center">
                  <div className="text-lg font-bold">1,337 pts</div>
                  <div className="text-xs text-purple-300">New personal best!</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Input */}
      <div className="absolute bottom-6 left-0 right-0 px-10">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Message Game Lobby" 
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <button className="text-muted-foreground hover:text-foreground">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
            <button className="text-muted-foreground hover:text-foreground">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const SocialView = () => (
  <div className="flex h-full">
    {/* Main content */}
    <div className="w-full">
      <div className="border-b border-white/10 pb-3 mb-4 flex justify-between items-center">
        <h2 className="text-xl font-medium">My Feed</h2>
        <div className="flex items-center gap-2">
          <button className="bg-white/5 p-1.5 rounded hover:bg-white/10">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
          <button className="bg-white/5 p-1.5 rounded hover:bg-white/10">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Stories */}
      <div className="mb-6">
        <div className="flex gap-4 overflow-x-auto pb-2">
          {/* Add story */}
          <div className="flex flex-col items-center shrink-0">
            <div className="w-16 h-16 rounded-full border-2 border-dashed border-muted-foreground flex items-center justify-center mb-1">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <span className="text-xs">Add Story</span>
          </div>
          
          {/* User stories */}
          <div className="flex flex-col items-center shrink-0">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-0.5">
              <div className="w-full h-full rounded-full bg-cyan-500 flex items-center justify-center">
                <span className="text-white font-bold">C</span>
              </div>
            </div>
            <span className="text-xs mt-1">Cyan</span>
          </div>
          
          <div className="flex flex-col items-center shrink-0">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-0.5">
              <div className="w-full h-full rounded-full bg-purple-500 flex items-center justify-center">
                <span className="text-white font-bold">A</span>
              </div>
            </div>
            <span className="text-xs mt-1">Alex</span>
          </div>
          
          <div className="flex flex-col items-center shrink-0">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-0.5">
              <div className="w-full h-full rounded-full bg-blue-500 flex items-center justify-center">
                <span className="text-white font-bold">J</span>
              </div>
            </div>
            <span className="text-xs mt-1">Jamie</span>
          </div>
          
          <div className="flex flex-col items-center shrink-0">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-500 to-gray-700 p-0.5">
              <div className="w-full h-full rounded-full bg-gray-500 flex items-center justify-center">
                <span className="text-white font-bold">T</span>
              </div>
            </div>
            <span className="text-xs mt-1">Taylor</span>
          </div>
        </div>
      </div>
      
      {/* Posts */}
      <div className="space-y-6">
        {/* Post 1 */}
        <div className="bg-white/5 rounded-lg overflow-hidden">
          <div className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center">
              <span className="text-white font-bold">C</span>
            </div>
            <div>
              <div className="font-medium">CyanDesigner</div>
              <div className="text-xs text-muted-foreground">3 hours ago</div>
            </div>
          </div>
          
          <div className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-purple-900 to-blue-900 flex items-center justify-center">
            <div className="text-center p-4">
              <div className="text-2xl font-bold font-space-grotesk mb-2">New UI Design Concept</div>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                Just finished this futuristic interface design for a client. What do you think?
              </p>
            </div>
          </div>
          
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span>123 likes</span>
                </button>
                <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span>24 comments</span>
                </button>
              </div>
              <button className="text-muted-foreground hover:text-foreground">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </button>
            </div>
            
            <div className="border-t border-white/10 pt-4">
              <div className="flex gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center">
                  <span className="text-white font-bold">A</span>
                </div>
                <div className="bg-white/5 rounded-lg p-2 flex-1">
                  <div className="font-medium text-sm">AlexCreative</div>
                  <p className="text-sm">This is absolutely stunning! Love the color palette.</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                  <span className="text-white font-bold">J</span>
                </div>
                <div className="flex-1">
                  <input 
                    type="text" 
                    placeholder="Add a comment..." 
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500/50"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Post 2 (smaller, partial) */}
        <div className="bg-white/5 rounded-lg overflow-hidden">
          <div className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
              <span className="text-white font-bold">J</span>
            </div>
            <div>
              <div className="font-medium">JamiePhotos</div>
              <div className="text-xs text-muted-foreground">5 hours ago</div>
            </div>
          </div>
          
          <div className="p-4 pb-0">
            <p className="text-sm">Just launched my photography portfolio! Check it out and let me know what you think. #photography #portfolio #creative</p>
          </div>
          
          <div className="p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span>87 likes</span>
                </button>
                <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span>12 comments</span>
                </button>
              </div>
              <button className="text-muted-foreground hover:text-foreground">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default HeroSection;