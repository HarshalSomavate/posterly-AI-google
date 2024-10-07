// pages/myPage.tsx

import React from 'react';
import { SparklesPreview } from './top-ani';
import { GoogleGeminiEffectDemo } from './bottom-ani';
import { PulseBeams } from '@/components/PulseBeam';
import { TextRevealCardPreview } from './end-ani';
import { FloatingDockDemo } from './nav-bar';
//import { PulseBeams } from './poster-but';



const MyPage: React.FC = () => {
  return (
    <div>
      <FloatingDockDemo/>
      <SparklesPreview /> {/* Renders com1 at the top */}
      <PulseBeams/>
      <GoogleGeminiEffectDemo />
      <TextRevealCardPreview/>
    </div>
  );
};

export default MyPage;

