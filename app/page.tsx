import HeroSection from '@/components/sections/hero-section';
import FeaturesSection from '@/components/sections/features-section';
import SocialProofSection from '@/components/sections/social-proof-section';
import CtaSection from '@/components/sections/cta-section';
import { WebGLBackground } from '@/components/webgl-background';

export default function Home() {
  return (
    <div className="relative w-full overflow-hidden">
      <WebGLBackground />
      <div className="relative z-10">
        <HeroSection />
        <FeaturesSection />
        <SocialProofSection />
        <CtaSection />
      </div>
    </div>
  );
}