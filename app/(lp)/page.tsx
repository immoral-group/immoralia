import { Navbar } from '@/components/Navbar';
import { AutomationHero } from '@/components/AutomationHero';
import { WhyAutomateSection } from '@/components/WhyAutomateSection';
import { WhatIsImmoraliaSection } from '@/components/WhatIsImmoraliaSection';
import { HistorySection } from '@/components/HistorySection';
import { HowWeWorkSection } from '@/components/HowWeWorkSection';
import { AutomationAreasSection } from '@/components/AutomationAreasSection';
import { ModalitiesSection } from '@/components/ModalitiesSection';
import { WhyTrustSection } from '@/components/WhyTrustSection';
import { SuccessSection } from '@/components/SuccessSection';
import { FAQSection } from '@/components/FAQSection';
import { CreativeMotionCTA } from '@/components/CreativeMotionCTA';
import { Footer } from '@/components/Footer';

export default function Page() {
  return (
    <div className="w-full bg-black relative">
      {/* Animated background grid */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#0a0a0a_1px,transparent_1px),linear-gradient(to_bottom,#0a0a0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-20 pointer-events-none" />

      {/* Gradient orbs */}
      <div className="fixed top-0 -left-20 w-96 h-96 bg-[#001156] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse pointer-events-none" />
      <div className="fixed top-1/3 -right-20 w-96 h-96 bg-[#00FFFF] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse pointer-events-none" style={{ animationDelay: '2s' }} />
      <div className="fixed bottom-0 left-1/2 w-96 h-96 bg-[#001156] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse pointer-events-none" style={{ animationDelay: '4s' }} />

      <div className="relative z-10">
        <Navbar />
        <AutomationHero />
        <WhyAutomateSection />
        <WhatIsImmoraliaSection />
        <HistorySection />
        <HowWeWorkSection />
        <AutomationAreasSection />
        <ModalitiesSection />
        <WhyTrustSection />
        <SuccessSection />
        <FAQSection />
        <CreativeMotionCTA />
        <Footer />
      </div>
    </div>
  );
}
