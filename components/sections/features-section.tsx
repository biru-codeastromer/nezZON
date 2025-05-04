"use client"

import React from 'react';
import { 
  CheckCircle, 
  XCircle, 
  ArrowRight, 
  MessageSquare, 
  Users, 
  Camera, 
  Share2, 
  Calendar, 
  FileText, 
  LayoutGrid, 
  Zap
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// Mock React component for Framer Motion to prevent errors
const MotionDiv = ({ children, ...props }: any) => (
  <div {...props}>{children}</div>
);

// Use this line in actual implementation with Framer Motion
// const MotionDiv = motion.div;

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/3 -left-20 w-64 h-64 bg-purple-700/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 -right-32 w-80 h-80 bg-cyan-700/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-space-grotesk mb-4">
            One Platform, <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-500">Infinite Possibilities</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            NEZZON merges the best of productivity tools, community platforms, and social media into a single, unified experience.
          </p>
        </div>

        {/* Feature tabs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-background/50 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden shadow-xl"
          >
            <div className="p-6">
              <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
                <MessageSquare className="w-6 h-6 text-purple-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Professional Workspace</h3>
              <p className="text-muted-foreground mb-4">
                A dedicated space for productive team collaboration with all the tools you need to get work done efficiently.
              </p>
              <ul className="space-y-3">
                <FeatureItem text="Organized channels for every team and project" />
                <FeatureItem text="Rich document collaboration and editing" />
                <FeatureItem text="Task management and project tracking" />
                <FeatureItem text="Integrated calendar and scheduling" />
              </ul>
            </div>
          </MotionDiv>
          
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-background/50 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden shadow-xl"
          >
            <div className="p-6">
              <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-cyan-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Community Platform</h3>
              <p className="text-muted-foreground mb-4">
                Build and engage with communities of like-minded individuals through rich interactive features.
              </p>
              <ul className="space-y-3">
                <FeatureItem text="Voice channels with high-quality audio" />
                <FeatureItem text="Community events and scheduling" />
                <FeatureItem text="Advanced moderation and membership tools" />
                <FeatureItem text="Custom roles and permissions" />
              </ul>
            </div>
          </MotionDiv>
          
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-background/50 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden shadow-xl"
          >
            <div className="p-6">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
                <Camera className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Social Experience</h3>
              <p className="text-muted-foreground mb-4">
                Share moments, stories, and updates with your network through a familiar social experience.
              </p>
              <ul className="space-y-3">
                <FeatureItem text="Stories and photo sharing" />
                <FeatureItem text="Rich feed with smart content recommendations" />
                <FeatureItem text="Direct messaging and group chats" />
                <FeatureItem text="Profile customization and visibility controls" />
              </ul>
            </div>
          </MotionDiv>
          
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-background/50 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden shadow-xl"
          >
            <div className="p-6">
              <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
                <Share2 className="w-6 h-6 text-purple-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Seamless Integration</h3>
              <p className="text-muted-foreground mb-4">
                NEZZON connects with all your existing tools and platforms for a truly unified experience.
              </p>
              <ul className="space-y-3">
                <FeatureItem text="Import data from Slack, Discord, and Instagram" />
                <FeatureItem text="Connect calendars, files, and task managers" />
                <FeatureItem text="API access for custom integrations" />
                <FeatureItem text="Cross-platform synchronization" />
              </ul>
            </div>
          </MotionDiv>
        </div>
        
        {/* Feature comparison */}
        <div id="compare" className="pt-10">
          <h2 className="text-3xl md:text-4xl font-bold font-space-grotesk text-center mb-16">
            Why Switch to <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-500">NEZZON</span>?
          </h2>
          
          <MotionDiv
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="bg-background/50 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10">
                <div className="p-6 md:p-8">
                  <h3 className="text-xl font-medium mb-6 text-muted-foreground">Current Limitations</h3>
                  
                  <div className="space-y-6">
                    <LimitationItem 
                      icon={<XCircle className="w-5 h-5 text-destructive" />}
                      title="App Switching Fatigue"
                      description="Constantly toggling between Slack, Discord, and Instagram disrupts workflow and focus."
                    />
                    
                    <LimitationItem 
                      icon={<XCircle className="w-5 h-5 text-destructive" />}
                      title="Fragmented Notifications"
                      description="Missing important messages and updates across multiple platforms."
                    />
                    
                    <LimitationItem 
                      icon={<XCircle className="w-5 h-5 text-destructive" />}
                      title="Identity Management"
                      description="Maintaining different profiles and personas across platforms."
                    />
                    
                    <LimitationItem 
                      icon={<XCircle className="w-5 h-5 text-destructive" />}
                      title="Content Silos"
                      description="Documents, images, and conversations trapped in separate apps."
                    />
                    
                    <LimitationItem 
                      icon={<XCircle className="w-5 h-5 text-destructive" />}
                      title="Multiple Subscriptions"
                      description="Paying for separate premium tiers across different platforms."
                    />
                  </div>
                </div>
                
                <div className="p-6 md:p-8 relative">
                  <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/2 hidden md:block">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center">
                      <ArrowRight className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-medium mb-6 text-white">NEZZON Solution</h3>
                  
                  <div className="space-y-6">
                    <SolutionItem
                      icon={<Zap className="w-5 h-5 text-chart-1" />}
                      title="Single Interface"
                      description="One unified platform with workspace toggle for seamless transitions."
                    />
                    
                    <SolutionItem
                      icon={<CheckCircle className="w-5 h-5 text-green-500" />}
                      title="Unified Notifications"
                      description="Smart, prioritized notifications from all communication channels."
                    />
                    
                    <SolutionItem
                      icon={<CheckCircle className="w-5 h-5 text-green-500" />}
                      title="One Digital Identity"
                      description="Single profile with context-aware visibility settings."
                    />
                    
                    <SolutionItem
                      icon={<CheckCircle className="w-5 h-5 text-green-500" />}
                      title="Universal Search"
                      description="Find any message, document, or media across all contexts."
                    />
                    
                    <SolutionItem
                      icon={<CheckCircle className="w-5 h-5 text-green-500" />}
                      title="Single Subscription"
                      description="One affordable plan for complete access to all features."
                    />
                  </div>
                </div>
              </div>
            </div>
          </MotionDiv>
        </div>
      </div>
    </section>
  );
};

const FeatureItem = ({ text }: { text: string }) => (
  <li className="flex items-start gap-2">
    <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
    <span>{text}</span>
  </li>
);

const LimitationItem = ({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
}) => (
  <div className="flex gap-4">
    <div className="shrink-0 mt-1">{icon}</div>
    <div>
      <h4 className="font-medium mb-1">{title}</h4>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  </div>
);

const SolutionItem = ({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
}) => (
  <div className="flex gap-4">
    <div className="shrink-0 mt-1">{icon}</div>
    <div>
      <h4 className="font-medium mb-1">{title}</h4>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  </div>
);

export default FeaturesSection;