import React, { useState } from 'react';
import { MotionConfig } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ValueRibbon } from './components/ValueRibbon';
import { TaglineReveal } from './components/TaglineReveal';
import { CollectionGrid } from './components/CollectionGrid';
import { Studio3D } from './components/Studio3D';
import { StorySection } from './components/StorySection';
import { ProcessAndSizing } from './components/ProcessAndSizing';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';

export default function App() {
  const [studioConfig, setStudioConfig] = useState({
    fabricId: 'silk',
    colorId: 'ivory',
    collarId: 'traditional',
    sleeveId: 'long',
    pantsId: 'ivory',
    motifId: 'lotus',
    accessoryId: 'pendant',
    lightingId: 'studio',
    monogram: '',
    sizeMode: 'standard',
    standardSize: 'M',
    height: '',
    weight: '',
    bust: '',
    waist: '',
    hip: '',
  });

  const scrollToStudio = () => {
    const el = document.getElementById('xuong-3d');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLoadPreset = (item) => {
    setStudioConfig((prev) => ({
      ...prev,
      fabricId: item.fabricId,
      colorId: item.colorId,
      collarId: item.collarId,
      sleeveId: item.sleeveId,
      motifId: item.motifId,
    }));
    scrollToStudio();
  };

  return (
    <MotionConfig reducedMotion="user">
      <a href="#main-content" className="skip-link">
        Chuyển đến nội dung chính
      </a>

      <Navbar onOpenStudio={scrollToStudio} />

      <main id="main-content">
        <Hero onOpenStudio={scrollToStudio} />
        <ValueRibbon />
        <TaglineReveal />
        <CollectionGrid onLoadPreset={handleLoadPreset} />
        <Studio3D config={studioConfig} setConfig={setStudioConfig} />
        <StorySection />
        <ProcessAndSizing />
        <FaqSection />
      </main>

      <Footer />
    </MotionConfig>
  );
}
