"use client"

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Zap, CheckCircle, ArrowRight, Shield, BadgeCheck, Timer } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from 'sonner';

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

type FormValues = z.infer<typeof formSchema>;

const CtaSection = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [spotsLeft, setSpotsLeft] = useState(250);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });
  
  function onSubmit(data: FormValues) {
    setIsSending(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSending(false);
      setIsSubmitted(true);
      setSpotsLeft(prev => prev - 1);
      
      // Show success toast
      toast("Waitlist Registration Successful", {
        description: "You're now in line for early access. Watch your inbox for updates!",
        action: {
          label: "Dismiss",
          onClick: () => {},
        },
      });
      
      // Trigger confetti effect
      triggerConfetti();
    }, 1500);
  }
  
  const triggerConfetti = () => {
    if (typeof window !== "undefined") {
      // This would be replaced with actual confetti implementation
      console.log("Confetti effect triggered!");
    }
  };
  
  return (
    <section id="cta" className="py-24 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-700/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-cyan-700/20 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto bg-background/60 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Content */}
            <div className="p-8 md:p-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 bg-purple-500/10 border border-purple-500/20 rounded-full text-sm text-purple-400">
                <Shield size={14} />
                <span>Limited Early Access</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold font-space-grotesk mb-4">
                Be Among the First to <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-500">Experience NEZZON</span>
              </h2>
              
              <p className="text-muted-foreground mb-6">
                Join our exclusive waitlist to gain early access and help shape the future of digital communication. Early adopters receive lifetime perks and priority support.
              </p>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle size={18} className="text-green-500" />
                  <span>Priority access to all new features</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={18} className="text-green-500" />
                  <span>Founder badge for your profile</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={18} className="text-green-500" />
                  <span>50% discount on premium plan for life</span>
                </li>
              </ul>
              
              {!isSubmitted ? (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground">Email Address</FormLabel>
                          <div className="flex gap-3">
                            <FormControl>
                              <Input 
                                placeholder="you@example.com" 
                                {...field} 
                                className="bg-white/5 border-white/10 focus:border-purple-500 text-foreground"
                              />
                            </FormControl>
                            <Button 
                              type="submit" 
                              disabled={isSending}
                              className={cn(
                                "bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 transition-all duration-300 shadow-glow-purple",
                                isSending && "opacity-80"
                              )}
                            >
                              {isSending ? (
                                <>
                                  <span className="animate-spin mr-2">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24">
                                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                  </span>
                                  Processing
                                </>
                              ) : (
                                <>
                                  Join Waitlist
                                  <ArrowRight className="ml-2 h-4 w-4" />
                                </>
                              )}
                            </Button>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </form>
                </Form>
              ) : (
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                      <CheckCircle size={20} className="text-green-500" />
                    </div>
                  </div>
                  <h4 className="text-lg font-medium mb-1">You're on the list!</h4>
                  <p className="text-sm text-muted-foreground">
                    We'll be in touch soon with your exclusive access details.
                  </p>
                </div>
              )}
            </div>
            
            {/* Stats/Benefits */}
            <div className="bg-gradient-to-br from-purple-900/40 to-cyan-900/40 p-8 md:p-12 flex flex-col">
              <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <div className="text-sm text-muted-foreground">Spots Remaining</div>
                  <div className="text-sm font-medium">{spotsLeft} of 500</div>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"
                    style={{ width: `${(spotsLeft / 500) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <BadgeCheck size={20} className="text-purple-400" />
                  <span>Early Adopter Rewards</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4 flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-3">
                      <Zap size={20} className="text-purple-400" />
                    </div>
                    <h4 className="font-medium mb-1">Founder Badge</h4>
                    <p className="text-sm text-muted-foreground">
                      Exclusive profile identifier
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4 flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center mb-3">
                      <Timer size={20} className="text-cyan-400" />
                    </div>
                    <h4 className="font-medium mb-1">Priority Access</h4>
                    <p className="text-sm text-muted-foreground">
                      Skip the public waitlist
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Testimonial */}
              <div className="mt-auto bg-white/5 border border-white/10 rounded-lg p-4">
                <p className="text-sm italic mb-3">
                  "NEZZON has completely transformed how our team communicates. It's like having superpowers!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center">
                    <span className="text-xs font-bold text-white">M</span>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Michael Patel</div>
                    <div className="text-xs text-muted-foreground">CEO, TechFlow</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;