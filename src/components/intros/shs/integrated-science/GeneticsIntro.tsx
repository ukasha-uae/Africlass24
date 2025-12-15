'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronLeft, Volume2, VolumeX, SkipForward } from 'lucide-react';

interface GeneticsIntroProps {
  onComplete?: () => void;
}

export default function GeneticsIntro({ onComplete }: GeneticsIntroProps) {
  const [currentScene, setCurrentScene] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const currentSceneRef = useRef(currentScene);

  // Keep ref in sync with state
  useEffect(() => {
    currentSceneRef.current = currentScene;
  }, [currentScene]);

  const scenes = [
    {
      title: "The Science of You 👨‍👩‍👧‍👦",
      narration: "Look at yourself in the mirror. Why do you have your father's nose or your mother's smile? Why do some families have twins while others don't? Why is sickle cell disease so common in Ghana? The answers lie in genetics - the science of inheritance!",
      gradient: "from-violet-600 via-purple-600 to-indigo-700",
      animation: "family"
    },
    {
      title: "DNA: The Molecule of Life 🧬",
      narration: "Deep inside every cell is DNA - deoxyribonucleic acid. DNA is shaped like a twisted ladder called a double helix. The rungs are base pairs: Adenine always pairs with Thymine, and Guanine always pairs with Cytosine. Remember: A-T and G-C!",
      gradient: "from-blue-600 via-cyan-600 to-teal-600",
      animation: "dna"
    },
    {
      title: "Genes and Chromosomes 📚",
      narration: "DNA is packaged into chromosomes. Think of chromosomes as books and genes as chapters. Humans have 46 chromosomes in 23 pairs - you got 23 from your mother and 23 from your father. Each chromosome contains thousands of genes!",
      gradient: "from-emerald-600 via-green-600 to-teal-600",
      animation: "chromosomes"
    },
    {
      title: "Genotype vs Phenotype 🎭",
      narration: "Genotype is your genetic code - written as letters like AA, Aa, or aa. Phenotype is what you look like - the trait you can see. Dominant alleles shown with capital letters are always expressed. Recessive alleles need two copies to show!",
      gradient: "from-amber-600 via-orange-600 to-red-600",
      animation: "genotype"
    },
    {
      title: "The Punnett Square 📊",
      narration: "We predict inheritance using a Punnett Square! When two heterozygous parents Aa cross, we get 1 AA, 2 Aa, and 1 aa offspring. That's a 3 to 1 ratio of dominant to recessive phenotypes. Gregor Mendel discovered this with pea plants!",
      gradient: "from-pink-600 via-rose-600 to-red-600",
      animation: "punnett"
    },
    {
      title: "Genetics in Ghana 🇬🇭",
      narration: "Genetics is vital in Ghana! About 2 percent have sickle cell disease, and 25 percent are carriers. Carriers are resistant to malaria - this is called heterozygote advantage! Scientists at CSIR use genetics to create better crops. Let's master this science!",
      gradient: "from-green-600 via-yellow-500 to-red-500",
      animation: "ghana"
    }
  ];

  const speakScene = useCallback((index: number) => {
    if (typeof window === 'undefined' || !window.speechSynthesis || isMuted) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(scenes[index].narration);
    utterance.rate = 0.92;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => 
      v.name.includes('Google') || v.name.includes('Microsoft') || v.name.includes('Female')
    );
    if (preferredVoice) utterance.voice = preferredVoice;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      // Auto-advance after TTS completes
      setTimeout(() => {
        if (currentSceneRef.current < scenes.length - 1) {
          setCurrentScene(prev => prev + 1);
        }
      }, 1500);
    };
    utterance.onerror = (event) => {
      const errorEvent = event as SpeechSynthesisErrorEvent;
      if (errorEvent.error === 'interrupted' || errorEvent.error === 'canceled') {
        return;
      }
      console.error('Speech error:', errorEvent.error);
      setIsSpeaking(false);
    };

    setTimeout(() => window.speechSynthesis.speak(utterance), 300);
  }, [scenes.length, isMuted]);

  useEffect(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.getVoices();
    }
    if (!isMuted) {
      speakScene(0);
    }
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  useEffect(() => {
    if (currentScene > 0 && !isMuted) {
      speakScene(currentScene);
    }
  }, [currentScene, speakScene, isMuted]);

  // Helper function to draw X-shaped chromosome
  const drawChromosome = (ctx: CanvasRenderingContext2D, x: number, y: number, armWidth: number, armLength: number) => {
    ctx.beginPath();
    ctx.ellipse(x - armWidth/2, y - armLength/2, armWidth/2, armLength/2, -Math.PI/6, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(x + armWidth/2, y - armLength/2, armWidth/2, armLength/2, Math.PI/6, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(x - armWidth/2, y + armLength/2, armWidth/2, armLength/2, Math.PI/6, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(x + armWidth/2, y + armLength/2, armWidth/2, armLength/2, -Math.PI/6, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x, y, armWidth * 0.6, 0, Math.PI * 2);
    ctx.fill();
  };

  // Canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const scene = scenes[currentScene];
    let time = 0;

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      ctx.clearRect(0, 0, w, h);
      time += 0.02;

      if (scene.animation === 'family') {
        ctx.font = `bold ${Math.min(14, w * 0.035)}px sans-serif`;
        ctx.textAlign = 'center';
        
        // Parents
        ctx.fillStyle = '#60a5fa';
        ctx.beginPath();
        ctx.arc(w * 0.3, h * 0.25, Math.min(30, w * 0.08), 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = 'white';
        ctx.fillText('👨 Dad', w * 0.3, h * 0.25 + 5);

        ctx.fillStyle = '#f472b6';
        ctx.beginPath();
        ctx.arc(w * 0.7, h * 0.25, Math.min(30, w * 0.08), 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = 'white';
        ctx.fillText('👩 Mom', w * 0.7, h * 0.25 + 5);

        // Connecting lines
        ctx.strokeStyle = 'rgba(255,255,255,0.5)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(w * 0.3, h * 0.35);
        ctx.lineTo(w * 0.5, h * 0.5);
        ctx.moveTo(w * 0.7, h * 0.35);
        ctx.lineTo(w * 0.5, h * 0.5);
        ctx.stroke();

        // Child with animated bounce
        const bounce = Math.sin(time * 2) * 5;
        ctx.fillStyle = '#a78bfa';
        ctx.beginPath();
        ctx.arc(w * 0.5, h * 0.65 + bounce, Math.min(35, w * 0.09), 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = 'white';
        ctx.fillText('👶 You', w * 0.5, h * 0.65 + bounce + 5);

        // Trait labels
        ctx.font = `${Math.min(12, w * 0.03)}px sans-serif`;
        ctx.fillStyle = '#fcd34d';
        ctx.fillText("Dad's nose 👃", w * 0.2, h * 0.5);
        ctx.fillStyle = '#fb7185';
        ctx.fillText("Mom's smile 😊", w * 0.8, h * 0.5);

        // DNA strands flowing down
        for (let i = 0; i < 3; i++) {
          const alpha = 0.3 + Math.sin(time + i) * 0.2;
          ctx.strokeStyle = `rgba(167, 139, 250, ${alpha})`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          for (let y = 0; y < h; y += 5) {
            const x = w * 0.5 + Math.sin(y * 0.05 + time + i * 2) * 20;
            if (y === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }

      } else if (scene.animation === 'dna') {
        const centerX = w * 0.5;
        const helixHeight = h * 0.85;
        const startY = h * 0.08;
        const helixWidth = Math.min(60, w * 0.15);
        
        for (let i = 0; i < 60; i++) {
          const y = startY + (i / 60) * helixHeight;
          const angle = (i * 0.2) + time * 2;
          const x1 = centerX + Math.sin(angle) * helixWidth;
          const x2 = centerX + Math.sin(angle + Math.PI) * helixWidth;
          
          ctx.strokeStyle = '#3b82f6';
          ctx.lineWidth = 4;
          if (i > 0) {
            const prevY = startY + ((i - 1) / 60) * helixHeight;
            const prevAngle = ((i - 1) * 0.2) + time * 2;
            const prevX1 = centerX + Math.sin(prevAngle) * helixWidth;
            const prevX2 = centerX + Math.sin(prevAngle + Math.PI) * helixWidth;
            
            ctx.beginPath();
            ctx.moveTo(prevX1, prevY);
            ctx.lineTo(x1, y);
            ctx.stroke();
            
            ctx.strokeStyle = '#ec4899';
            ctx.beginPath();
            ctx.moveTo(prevX2, prevY);
            ctx.lineTo(x2, y);
            ctx.stroke();
          }
          
          if (i % 4 === 0) {
            const bases = ['A-T', 'T-A', 'G-C', 'C-G'];
            const basePair = bases[Math.floor(i / 4) % 4];
            
            ctx.strokeStyle = basePair.includes('A') ? '#fcd34d' : '#22c55e';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(x1, y);
            ctx.lineTo(x2, y);
            ctx.stroke();
            
            ctx.font = `bold ${Math.min(10, w * 0.025)}px sans-serif`;
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            ctx.fillText(basePair, (x1 + x2) / 2, y + 4);
          }
        }

        ctx.font = `bold ${Math.min(12, w * 0.03)}px sans-serif`;
        ctx.fillStyle = '#fcd34d';
        ctx.textAlign = 'left';
        ctx.fillText('A = T', 10, 25);
        ctx.fillStyle = '#22c55e';
        ctx.fillText('G ≡ C', 10, 45);

      } else if (scene.animation === 'chromosomes') {
        ctx.font = `bold ${Math.min(12, w * 0.03)}px sans-serif`;
        ctx.textAlign = 'center';
        
        ctx.strokeStyle = 'rgba(255,255,255,0.3)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.ellipse(w * 0.5, h * 0.5, w * 0.4, h * 0.4, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = 'white';
        ctx.fillText('Cell Nucleus', w * 0.5, h * 0.08);

        const pairs = [
          { x: w * 0.25, y: h * 0.3 },
          { x: w * 0.5, y: h * 0.25 },
          { x: w * 0.75, y: h * 0.3 },
          { x: w * 0.3, y: h * 0.55 },
          { x: w * 0.5, y: h * 0.5 },
          { x: w * 0.7, y: h * 0.55 },
          { x: w * 0.4, y: h * 0.75 },
          { x: w * 0.6, y: h * 0.75 },
        ];

        const armWidth = Math.min(10, w * 0.025);
        const armLength = Math.min(25, w * 0.06);

        pairs.forEach((pair, idx) => {
          const wobble = Math.sin(time * 2 + idx) * 3;
          
          ctx.fillStyle = '#f472b6';
          drawChromosome(ctx, pair.x - 15 + wobble, pair.y, armWidth, armLength);
          
          ctx.fillStyle = '#60a5fa';
          drawChromosome(ctx, pair.x + 15 - wobble, pair.y, armWidth, armLength);
        });

        ctx.font = `${Math.min(11, w * 0.028)}px sans-serif`;
        ctx.fillStyle = '#60a5fa';
        ctx.fillText('From Dad (23)', w * 0.2, h * 0.95);
        ctx.fillStyle = '#f472b6';
        ctx.fillText('From Mom (23)', w * 0.8, h * 0.95);
        ctx.fillStyle = 'white';
        ctx.fillText('= 46 Total', w * 0.5, h * 0.95);

      } else if (scene.animation === 'genotype') {
        const centerX = w * 0.5;
        
        ctx.font = `bold ${Math.min(14, w * 0.035)}px sans-serif`;
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.fillText('GENOTYPE', w * 0.25, 25);
        ctx.fillText('PHENOTYPE', w * 0.75, 25);
        ctx.font = `${Math.min(11, w * 0.028)}px sans-serif`;
        ctx.fillText('(Genetic Code)', w * 0.25, 43);
        ctx.fillText('(What You See)', w * 0.75, 43);

        ctx.strokeStyle = 'rgba(255,255,255,0.3)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(centerX, 20);
        ctx.lineTo(centerX, h - 20);
        ctx.stroke();

        const examples = [
          { genotype: 'TT', phenotype: 'Tall 🌿', color: '#22c55e', y: h * 0.32 },
          { genotype: 'Tt', phenotype: 'Tall 🌿', color: '#22c55e', y: h * 0.52 },
          { genotype: 'tt', phenotype: 'Short 🌱', color: '#fbbf24', y: h * 0.72 },
        ];

        examples.forEach((ex, idx) => {
          const pulse = 1 + Math.sin(time * 3 + idx) * 0.1;
          const boxW = w * 0.3;
          const boxH = 40;
          
          ctx.fillStyle = 'rgba(255,255,255,0.15)';
          ctx.fillRect(w * 0.1, ex.y - 20, boxW, boxH);
          ctx.strokeStyle = ex.color;
          ctx.lineWidth = 2;
          ctx.strokeRect(w * 0.1, ex.y - 20, boxW, boxH);
          
          ctx.font = `bold ${18 * pulse}px monospace`;
          ctx.fillStyle = 'white';
          ctx.textAlign = 'center';
          ctx.fillText(ex.genotype, w * 0.25, ex.y + 7);

          ctx.font = `bold ${Math.min(16, w * 0.04)}px sans-serif`;
          ctx.fillStyle = ex.color;
          ctx.fillText(ex.phenotype, w * 0.75, ex.y + 7);

          ctx.strokeStyle = 'rgba(255,255,255,0.5)';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(w * 0.42, ex.y);
          ctx.lineTo(w * 0.58, ex.y);
          ctx.lineTo(w * 0.55, ex.y - 5);
          ctx.moveTo(w * 0.58, ex.y);
          ctx.lineTo(w * 0.55, ex.y + 5);
          ctx.stroke();
        });

        ctx.font = `${Math.min(10, w * 0.025)}px sans-serif`;
        ctx.fillStyle = '#22c55e';
        ctx.textAlign = 'left';
        ctx.fillText('T = Tall (Dominant)', 10, h - 30);
        ctx.fillStyle = '#fbbf24';
        ctx.fillText('t = short (recessive)', 10, h - 15);

      } else if (scene.animation === 'punnett') {
        const boxSize = Math.min(w, h) * 0.2;
        const startX = (w - boxSize * 2.5) / 2;
        const startY = h * 0.22;

        ctx.font = `bold ${Math.min(14, w * 0.035)}px sans-serif`;
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.fillText('Aa × Aa Cross', w * 0.5, 22);

        ctx.font = `bold ${Math.min(16, w * 0.04)}px sans-serif`;
        ctx.fillStyle = '#60a5fa';
        ctx.fillText('A', startX + boxSize * 0.75, startY - 12);
        ctx.fillText('a', startX + boxSize * 1.75, startY - 12);
        
        ctx.fillStyle = '#f472b6';
        ctx.save();
        ctx.translate(startX - 12, startY + boxSize * 0.75);
        ctx.fillText('A', 0, 0);
        ctx.restore();
        ctx.save();
        ctx.translate(startX - 12, startY + boxSize * 1.75);
        ctx.fillText('a', 0, 0);
        ctx.restore();

        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        
        const gridContent = [['AA', 'Aa'], ['Aa', 'aa']];
        const colors = [['#22c55e', '#22c55e'], ['#22c55e', '#fbbf24']];

        for (let row = 0; row < 2; row++) {
          for (let col = 0; col < 2; col++) {
            const x = startX + col * boxSize + boxSize * 0.5;
            const y = startY + row * boxSize;
            
            const isHighlighted = Math.floor(time * 2) % 4 === row * 2 + col;
            ctx.fillStyle = isHighlighted ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)';
            ctx.fillRect(x, y, boxSize, boxSize);
            ctx.strokeRect(x, y, boxSize, boxSize);
            
            ctx.font = `bold ${isHighlighted ? Math.min(20, w * 0.05) : Math.min(16, w * 0.04)}px monospace`;
            ctx.fillStyle = colors[row][col];
            ctx.textAlign = 'center';
            ctx.fillText(gridContent[row][col], x + boxSize/2, y + boxSize/2 + 6);
          }
        }

        ctx.font = `bold ${Math.min(12, w * 0.03)}px sans-serif`;
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        const resultY = startY + boxSize * 2.2;
        ctx.fillText('Results: 1 AA : 2 Aa : 1 aa', w * 0.5, resultY);
        ctx.font = `${Math.min(12, w * 0.03)}px sans-serif`;
        ctx.fillText('Phenotype: 3 Tall : 1 Short', w * 0.5, resultY + 18);
        
        ctx.font = `bold ${Math.min(14, w * 0.035)}px sans-serif`;
        ctx.fillStyle = '#fcd34d';
        ctx.fillText('3:1 Ratio!', w * 0.5, resultY + 40);

      } else if (scene.animation === 'ghana') {
        const flagY = h * 0.08;
        ctx.fillStyle = '#ce1126';
        ctx.fillRect(0, flagY, w, 8);
        ctx.fillStyle = '#fcd116';
        ctx.fillRect(0, flagY + 8, w, 8);
        ctx.fillStyle = '#006b3f';
        ctx.fillRect(0, flagY + 16, w, 8);

        ctx.font = `bold ${Math.min(14, w * 0.035)}px sans-serif`;
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.fillText('Sickle Cell in Ghana', w * 0.5, flagY - 8);

        const peopleRows = 4;
        const peopleCols = 10;
        const personSize = Math.min(w / (peopleCols + 2), (h * 0.45) / peopleRows);
        const gridStartX = (w - peopleCols * personSize) / 2;
        const gridStartY = h * 0.38;

        ctx.font = `${personSize * 0.55}px sans-serif`;
        ctx.textAlign = 'center';

        let personIndex = 0;
        for (let row = 0; row < peopleRows; row++) {
          for (let col = 0; col < peopleCols; col++) {
            const x = gridStartX + col * personSize + personSize / 2;
            const y = gridStartY + row * personSize + personSize / 2;
            
            let color = '#22c55e';
            let emoji = '🧑';
            
            if (personIndex < 1) {
              color = '#ef4444';
              emoji = '🩸';
            } else if (personIndex < 10) {
              color = '#fbbf24';
              emoji = '🛡️';
            }

            const pulse = color === '#fbbf24' ? Math.sin(time * 3 + personIndex) * 0.2 + 1 : 1;
            
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(x, y, personSize * 0.28 * pulse, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.fillText(emoji, x, y + personSize * 0.12);
            personIndex++;
          }
        }

        ctx.font = `bold ${Math.min(11, w * 0.028)}px sans-serif`;
        ctx.textAlign = 'left';
        const legendY = h * 0.85;
        
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(15, legendY, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = 'white';
        ctx.fillText('2% Affected', 28, legendY + 4);

        ctx.fillStyle = '#fbbf24';
        ctx.beginPath();
        ctx.arc(w * 0.38, legendY, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = 'white';
        ctx.fillText('25% Carriers (Malaria Resistant!)', w * 0.38 + 13, legendY + 4);

        ctx.font = `${Math.min(11, w * 0.028)}px sans-serif`;
        ctx.fillStyle = '#a78bfa';
        ctx.textAlign = 'center';
        ctx.fillText('🌽 CSIR Ghana: Better crops through genetics!', w * 0.5, h - 10);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [currentScene, scenes]);

  const handleNext = () => {
    window.speechSynthesis?.cancel();
    setIsSpeaking(false);
    setCurrentScene(prev => {
      if (prev < scenes.length - 1) {
        return prev + 1;
      } else {
        onComplete?.();
        return prev;
      }
    });
  };

  const handlePrevious = () => {
    window.speechSynthesis?.cancel();
    setIsSpeaking(false);
    setCurrentScene(prev => Math.max(0, prev - 1));
  };

  const handleSkip = () => {
    window.speechSynthesis?.cancel();
    onComplete?.();
  };

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      speakScene(currentScene);
    } else {
      setIsMuted(true);
      window.speechSynthesis?.cancel();
      setIsSpeaking(false);
    }
  };

  const scene = scenes[currentScene];

  return (
    <div className={`relative min-h-screen bg-gradient-to-br ${scene.gradient} transition-all duration-700`}>
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-10"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: 'white',
              animation: `pulse ${2 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Main layout - responsive grid on desktop */}
      <div className="relative z-10 min-h-screen flex flex-col xl:grid xl:grid-cols-5 2xl:grid-cols-3">
        
        {/* Left/Top - Animation canvas (takes 3/5 on xl, 2/3 on 2xl) */}
        <div className="flex-1 xl:col-span-3 2xl:col-span-2 flex flex-col justify-center p-4 md:p-6 lg:p-8 xl:p-12">
          {/* Progress dots */}
          <div className="flex justify-center gap-2 md:gap-3 mb-4 md:mb-6">
            {scenes.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  window.speechSynthesis?.cancel();
                  setIsSpeaking(false);
                  setCurrentScene(index);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${
                  index === currentScene
                    ? 'bg-white scale-125 shadow-lg'
                    : index < currentScene
                    ? 'bg-white/70 hover:bg-white/90'
                    : 'bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to scene ${index + 1}`}
              />
            ))}
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white text-center mb-4 md:mb-6 lg:mb-8 drop-shadow-lg">
            {scene.title}
          </h1>

          {/* Canvas - larger on desktop */}
          <div className="relative bg-black/20 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden mx-auto w-full max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-none">
            <canvas
              ref={canvasRef}
              className="w-full aspect-[4/3] md:aspect-[16/10] lg:aspect-video xl:aspect-[2/1]"
              style={{ background: 'rgba(0,0,0,0.2)' }}
            />
          </div>
        </div>

        {/* Right/Bottom - Text and controls (takes 2/5 on xl, 1/3 on 2xl) */}
        <div className="xl:col-span-2 2xl:col-span-1 flex flex-col justify-center p-4 md:p-6 lg:p-8 xl:p-10 xl:bg-black/20 xl:backdrop-blur-md">
          
          {/* Narration text */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 md:p-5 lg:p-6 mb-4 md:mb-5 lg:mb-6 shadow-xl">
            <div className="flex items-start gap-3">
              {isSpeaking && !isMuted && (
                <Volume2 className="w-5 h-5 md:w-6 md:h-6 text-white animate-pulse flex-shrink-0 mt-1" />
              )}
              <p className="text-white text-base md:text-lg lg:text-xl xl:text-lg leading-relaxed">
                {scene.narration}
              </p>
            </div>
          </div>

          {/* Scene indicator */}
          <p className="text-white/60 text-sm md:text-base text-center mb-4 md:mb-5">
            Scene {currentScene + 1} of {scenes.length}
          </p>

          {/* Controls */}
          <div className="flex flex-col gap-3 md:gap-4">
            {/* Main navigation */}
            <div className="flex gap-2 md:gap-3 justify-center relative z-50">
              <Button
                onClick={handlePrevious}
                disabled={currentScene === 0}
                variant="ghost"
                className="text-white hover:bg-white/20 active:bg-white/30 disabled:opacity-30 h-12 md:h-14 px-4 md:px-6 text-base md:text-lg touch-manipulation select-none"
              >
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 mr-1" />
                Back
              </Button>

              <Button
                onClick={handleNext}
                className="bg-white text-gray-800 hover:bg-white/90 active:bg-white/80 px-6 md:px-10 h-12 md:h-14 rounded-full font-semibold shadow-lg flex items-center gap-2 flex-1 max-w-xs md:max-w-sm justify-center text-base md:text-lg touch-manipulation select-none"
              >
                {currentScene === scenes.length - 1 ? "Start Lesson!" : "Next"}
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
              </Button>
            </div>

            {/* Secondary controls */}
            <div className="flex gap-2 md:gap-3 justify-center flex-wrap relative z-50">
              <Button
                onClick={toggleMute}
                variant="ghost"
                className="text-white/80 hover:text-white hover:bg-white/20 active:bg-white/30 h-10 md:h-12 text-sm md:text-base touch-manipulation select-none min-h-[44px]"
              >
                {isMuted ? (
                  <>
                    <VolumeX className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                    Unmute
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                    {isSpeaking ? 'Speaking...' : 'Audio On'}
                  </>
                )}
              </Button>

              <Button
                variant="ghost"
                onClick={handleSkip}
                className="text-white/80 hover:text-white hover:bg-white/20 active:bg-white/30 h-10 md:h-12 text-sm md:text-base touch-manipulation select-none min-h-[44px]"
              >
                <SkipForward className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                Skip Intro
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
