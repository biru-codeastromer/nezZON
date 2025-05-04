"use client"

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, MessageSquare, Users, Camera } from 'lucide-react';

const SocialProofSection = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [counter, setCounter] = useState(7850);
  
  // Auto-cycle through testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Simulate counter increment
  useEffect(() => {
    const interval = setInterval(() => {
      setCounter(prev => prev + Math.floor(Math.random() * 3));
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <section id="testimonials" className="py-20 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute -top-20 right-0 w-72 h-72 bg-purple-700/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-cyan-700/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-space-grotesk mb-4">
            Don't Just Take Our Word For It
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of early adopters already experiencing the future of unified communication.
          </p>
        </div>
        
        {/* Featured logos */}
        <div className="mb-16">
          <p className="text-center text-sm text-muted-foreground uppercase tracking-wider mb-8">Featured in</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            <div className="text-muted-foreground/70 hover:text-muted-foreground transition-colors">
              <LogoTechCrunch className="h-8" />
            </div>
            <div className="text-muted-foreground/70 hover:text-muted-foreground transition-colors">
              <LogoTheVerge className="h-7" />
            </div>
            <div className="text-muted-foreground/70 hover:text-muted-foreground transition-colors">
              <LogoWired className="h-5" />
            </div>
            <div className="text-muted-foreground/70 hover:text-muted-foreground transition-colors">
              <LogoForbes className="h-6" />
            </div>
            <div className="text-muted-foreground/70 hover:text-muted-foreground transition-colors">
              <LogoProductHunt className="h-7" />
            </div>
          </div>
        </div>
        
        {/* Testimonial carousel */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="relative">
            <div className="bg-background/50 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden shadow-xl p-8">
              <div className="relative h-[420px]">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className={cn(
                      "absolute top-0 left-0 w-full transition-all duration-500",
                      activeTestimonial === index
                        ? "opacity-100 translate-x-0"
                        : index < activeTestimonial
                        ? "opacity-0 -translate-x-full"
                        : "opacity-0 translate-x-full"
                    )}
                  >
                    <div className="flex flex-col md:flex-row items-center gap-8">
                      <div className="relative">
                        <div className="w-40 h-40 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 p-1">
                          <div 
                            className="w-full h-full rounded-full bg-background flex items-center justify-center overflow-hidden"
                          >
                            <Avatar3D name={testimonial.name} role={testimonial.role} />
                          </div>
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-chart-1 text-white rounded-full p-1">
                          {testimonial.icon}
                        </div>
                      </div>
                      <div className="flex-1 text-center md:text-left">
                        <svg className="w-10 h-10 text-muted mb-4 mx-auto md:mx-0" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                        </svg>
                        <p className="text-xl mb-6 italic">{testimonial.quote}</p>
                        <div>
                          <h4 className="font-bold text-lg">{testimonial.name}</h4>
                          <p className="text-muted-foreground">{testimonial.role}, {testimonial.company}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Navigation dots */}
              <div className="flex justify-center gap-2 mt-6">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={cn(
                      "w-2.5 h-2.5 rounded-full transition-all",
                      activeTestimonial === index
                        ? "bg-gradient-to-r from-purple-500 to-cyan-500 w-10"
                        : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                    )}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
            
            {/* Prev/Next buttons */}
            <button
              onClick={() => setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
              className="absolute top-1/2 -left-4 -translate-y-1/2 w-10 h-10 bg-background border border-white/10 rounded-full flex items-center justify-center shadow-lg hover:bg-white/5 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setActiveTestimonial((prev) => (prev + 1) % testimonials.length)}
              className="absolute top-1/2 -right-4 -translate-y-1/2 w-10 h-10 bg-background border border-white/10 rounded-full flex items-center justify-center shadow-lg hover:bg-white/5 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-background/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center">
            <div className="font-space-grotesk text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-500">
              {counter.toLocaleString()}+
            </div>
            <p className="text-muted-foreground">Early Access Signups</p>
          </div>
          
          <div className="bg-background/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center">
            <div className="font-space-grotesk text-3xl font-bold mb-2">97%</div>
            <p className="text-muted-foreground">User Satisfaction</p>
          </div>
          
          <div className="bg-background/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center">
            <div className="font-space-grotesk text-3xl font-bold mb-2">3-in-1</div>
            <p className="text-muted-foreground">Platform Replacement</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const testimonials = [
  {
    name: "Alex Rivera",
    role: "Creative Director",
    company: "DesignLabs",
    quote: "NEZZON has transformed how our team communicates. No more switching between apps - everything flows seamlessly in one beautiful interface.",
    icon: <MessageSquare size={16} />,
  },
  {
    name: "Jamie Chen",
    role: "Community Manager",
    company: "GamersUnite",
    quote: "Managing our gaming community used to require juggling multiple platforms. With NEZZON, I can handle all community interactions in one place while keeping work communications separate.",
    icon: <Users size={16} />,
  },
  {
    name: "Taylor Kim",
    role: "Content Creator",
    company: "VisualStory",
    quote: "As someone who needs both professional tools and creative social features, NEZZON is a game-changer. I've deleted three apps and actually have better functionality now!",
    icon: <Camera size={16} />,
  },
];

const Avatar3D = ({ name, role }: { name: string; role: string }) => {
  // This would normally be a 3D avatar, but we'll use a placeholder
  const firstLetter = name.charAt(0);
  
  // Determine background color based on role
  let bgColor = "bg-purple-600";
  if (role.includes("Community")) {
    bgColor = "bg-cyan-600";
  } else if (role.includes("Content")) {
    bgColor = "bg-blue-600";
  }
  
  return (
    <div className={`w-full h-full ${bgColor} flex items-center justify-center`}>
      <span className="text-4xl font-bold text-white">{firstLetter}</span>
    </div>
  );
};

// SVG Logos (simplified for brevity)
const LogoTechCrunch = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 180 30" fill="currentColor">
    <path d="M0 0h12v30H0V0zm16 0h12v30H16V0zm32 8h-12v6h10v8h-10v8h12V8zm3 0v22h12V19h7v11h12V8h-12v10h-7V8H51zm42 0h12v22H93V8z"/>
  </svg>
);

const LogoTheVerge = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 180 30" fill="currentColor">
    <path d="M14.4 8L0 22.4V8h14.4zM0 30l22.4-22.4V30H0zm38.4-22v14.4L24 8h14.4zM24 30h14.4V15.6L24 30zm30-22v22h14.4V8H54zm38.4 0h-14.4L92.4 30h14.4L108.4 8zm7.2 0l14.4 22V8h-14.4zm14.4 22l-14.4-14.4V30h14.4zm6-14v14h14v-14h-14z"/>
  </svg>
);

const LogoWired = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 120 30" fill="currentColor">
    <path d="M0 6h120v6H90v12H30V12H0V6zm36 0v18h48V6H36z"/>
  </svg>
);

const LogoForbes = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 120 30" fill="currentColor">
    <path d="M0 0h30v30H0V0zm40 0h30v6H40V0zm0 12h20v6H40v-6zm0 12h30v6H40v-6zm40-24h10v30H80V0zm20 0h20v6h-20V0zm0 12h15v6h-15v-6zm0 12h20v6h-20v-6z"/>
  </svg>
);

const LogoProductHunt = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 120 30" fill="currentColor">
    <path d="M15 5a10 10 0 100 20 10 10 0 000-20zm0 15a5 5 0 110-10 5 5 0 010 10zm20-7.5h10v-5H35v5zm15-5v15h-5V15H35v5h-5V7.5h20zM65 20h10v-5H65v5zm15-12.5v15h-5V15H65v5h-5V7.5h20zm25 0c5.5 0 10 4.5 10 10s-4.5 10-10 10-10-4.5-10-10 4.5-10 10-10zm0 15a5 5 0 100-10 5 5 0 000 10z"/>
  </svg>
);

export default SocialProofSection;