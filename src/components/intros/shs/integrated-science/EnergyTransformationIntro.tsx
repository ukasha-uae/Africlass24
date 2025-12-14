'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Play, Pause, SkipForward, Volume2, VolumeX, ChevronRight } from 'lucide-react';

interface EnergyTransformationIntroProps {
  onComplete?: () => void;
  className?: string;
}

interface EnergyParticle {
  id: number;
  x: number;
  y: number;
  type: 'pe' | 'ke' | 'heat' | 'light' | 'electric';
  targetX: number;
  targetY: number;
  phase: number;
}

const energyColors = {
  pe: '#22c55e',      // Green - Potential
  ke: '#3b82f6',      // Blue - Kinetic
  heat: '#ef4444',    // Red - Heat
  light: '#fbbf24',   // Yellow - Light
  electric: '#a855f7', // Purple - Electrical
};

const scenes = [
  {
    id: 1,
    title: "The Unbreakable Law",
    narration: "What happens when you drop a ball? It falls, speeds up, bounces, and eventually stops. But where does the energy go? Scientists discovered one of nature's most powerful secrets: Energy can NEVER be created or destroyed! It only transforms from one form to another. This is the Law of Conservation of Energy!",
    bgGradient: "from-indigo-600 via-purple-600 to-pink-600",
    emoji: "⚖️",
    animation: 'balance'
  },
  {
    id: 2,
    title: "Energy Transformation Chains",
    narration: "Watch how energy flows! At Akosombo Dam, water stored high up has gravitational potential energy. As it falls, that becomes kinetic energy. The rushing water spins turbines, creating mechanical energy. Finally, generators convert this to electrical energy that powers homes across Ghana! One form transforms into another!",
    bgGradient: "from-blue-500 via-cyan-500 to-teal-500",
    emoji: "⛓️",
    animation: 'chain'
  },
  {
    id: 3,
    title: "The Efficiency Challenge",
    narration: "Here's a shocking truth: No machine is perfect! When a car engine burns fuel, only 25% becomes useful movement. The rest? Lost as heat through the exhaust and radiator! This is efficiency - the percentage of input energy that becomes useful output. That's why your car engine gets hot and your phone gets warm when charging!",
    bgGradient: "from-orange-500 via-red-500 to-rose-500",
    emoji: "📊",
    animation: 'efficiency'
  },
  {
    id: 4,
    title: "The Pendulum's Secret",
    narration: "A swinging pendulum reveals energy's dance! At the top of its swing - maximum potential energy, zero kinetic. At the bottom - zero potential, maximum kinetic! Back and forth, energy constantly transforms. But friction steals a little each time as heat, so it eventually stops. Energy is conserved, just spread out!",
    bgGradient: "from-emerald-500 via-green-500 to-lime-500",
    emoji: "🎢",
    animation: 'pendulum'
  },
  {
    id: 5,
    title: "Your Body - An Energy Machine",
    narration: "You are an amazing energy transformer! The fufu and soup you eat contains chemical energy. Your body breaks it down, releasing energy for movement, thinking, and keeping warm. Your brain alone uses 20% of your daily energy! Every step you take is a transformation from chemical to kinetic energy!",
    bgGradient: "from-pink-500 via-rose-500 to-red-500",
    emoji: "💪",
    animation: 'body'
  },
  {
    id: 6,
    title: "Master Energy Transformation!",
    narration: "Now you understand nature's greatest accounting system! Energy always balances - what goes in must come out in some form. From the Sun's nuclear fusion to the electricity in your home, energy is constantly transforming. Let's dive deeper into calculations and real-world applications!",
    bgGradient: "from-violet-600 via-purple-600 to-indigo-600",
    emoji: "🎓",
    animation: 'mastery'
  },
];

export default function EnergyTransformationIntro({ onComplete, className }: EnergyTransformationIntroProps) {
  const [currentScene, setCurrentScene] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [particles, setParticles] = useState<EnergyParticle[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const currentSceneRef = useRef(currentScene);
  const pendulumAngleRef = useRef(0);
  const pendulumDirectionRef = useRef(1);

  // Keep ref in sync
  useEffect(() => {
    currentSceneRef.current = currentScene;
  }, [currentScene]);

  // Initialize particles
  useEffect(() => {
    const newParticles: EnergyParticle[] = [];
    const types: EnergyParticle['type'][] = ['pe', 'ke', 'heat', 'light', 'electric'];
    
    for (let i = 0; i < 20; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 400,
        y: Math.random() * 300,
        type: types[i % types.length],
        targetX: Math.random() * 400,
        targetY: Math.random() * 300,
        phase: Math.random() * Math.PI * 2,
      });
    }
    setParticles(newParticles);
  }, []);

  // Canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.02;
      
      const scene = scenes[currentSceneRef.current];
      
      // Draw based on current scene animation type
      if (scene.animation === 'pendulum') {
        // Draw pendulum
        pendulumAngleRef.current += 0.03 * pendulumDirectionRef.current;
        if (Math.abs(pendulumAngleRef.current) > 0.8) {
          pendulumDirectionRef.current *= -1;
        }
        
        const pivotX = canvas.width / 2;
        const pivotY = 50;
        const length = 150;
        const bobX = pivotX + Math.sin(pendulumAngleRef.current) * length;
        const bobY = pivotY + Math.cos(pendulumAngleRef.current) * length;
        
        // String
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(255,255,255,0.6)';
        ctx.lineWidth = 2;
        ctx.moveTo(pivotX, pivotY);
        ctx.lineTo(bobX, bobY);
        ctx.stroke();
        
        // Bob with energy color based on position
        const kineticRatio = 1 - Math.abs(pendulumAngleRef.current) / 0.8;
        const gradient = ctx.createRadialGradient(bobX, bobY, 0, bobX, bobY, 25);
        gradient.addColorStop(0, kineticRatio > 0.5 ? energyColors.ke : energyColors.pe);
        gradient.addColorStop(1, 'rgba(255,255,255,0.3)');
        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(bobX, bobY, 20, 0, Math.PI * 2);
        ctx.fill();
        
        // Energy labels
        ctx.fillStyle = 'rgba(255,255,255,0.8)';
        ctx.font = '12px sans-serif';
        ctx.fillText(`PE: ${Math.round((1-kineticRatio)*100)}%`, 20, 30);
        ctx.fillText(`KE: ${Math.round(kineticRatio*100)}%`, 20, 50);
        
      } else if (scene.animation === 'chain') {
        // Energy transformation chain animation
        const stages = ['PE', 'KE', 'Mech', 'Elec'];
        const stageColors = [energyColors.pe, energyColors.ke, energyColors.heat, energyColors.electric];
        
        for (let i = 0; i < stages.length; i++) {
          const x = 50 + i * 90;
          const y = 150;
          const pulse = Math.sin(time * 3 - i * 0.5) * 5;
          
          // Circle
          ctx.beginPath();
          const gradient = ctx.createRadialGradient(x, y, 0, x, y, 30 + pulse);
          gradient.addColorStop(0, stageColors[i]);
          gradient.addColorStop(1, stageColors[i] + '40');
          ctx.fillStyle = gradient;
          ctx.arc(x, y, 25 + pulse, 0, Math.PI * 2);
          ctx.fill();
          
          // Arrow to next
          if (i < stages.length - 1) {
            ctx.beginPath();
            ctx.strokeStyle = 'rgba(255,255,255,0.6)';
            ctx.lineWidth = 2;
            ctx.moveTo(x + 30, y);
            ctx.lineTo(x + 55, y);
            ctx.stroke();
            // Arrow head
            ctx.beginPath();
            ctx.fillStyle = 'rgba(255,255,255,0.6)';
            ctx.moveTo(x + 55, y);
            ctx.lineTo(x + 50, y - 5);
            ctx.lineTo(x + 50, y + 5);
            ctx.fill();
          }
          
          // Label
          ctx.fillStyle = 'white';
          ctx.font = 'bold 10px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(stages[i], x, y + 4);
        }
        ctx.textAlign = 'left';
        
      } else if (scene.animation === 'efficiency') {
        // Efficiency visualization - energy bar splitting
        const inputWidth = 300;
        const usefulWidth = inputWidth * 0.25; // 25% efficiency
        const wastedWidth = inputWidth * 0.75;
        
        const barY = 130;
        const barHeight = 40;
        
        // Input bar
        ctx.fillStyle = energyColors.ke;
        ctx.fillRect(50, barY - 60, inputWidth * (0.5 + Math.sin(time*2) * 0.1), barHeight);
        ctx.fillStyle = 'white';
        ctx.font = 'bold 12px sans-serif';
        ctx.fillText('Input: 100%', 50, barY - 70);
        
        // Arrow down
        ctx.beginPath();
        ctx.fillStyle = 'rgba(255,255,255,0.6)';
        ctx.moveTo(200, barY - 15);
        ctx.lineTo(190, barY + 10);
        ctx.lineTo(210, barY + 10);
        ctx.fill();
        
        // Useful output
        ctx.fillStyle = energyColors.pe;
        ctx.fillRect(50, barY + 30, usefulWidth, barHeight);
        ctx.fillStyle = 'white';
        ctx.fillText('Useful: 25%', 50, barY + 20);
        
        // Wasted
        ctx.fillStyle = energyColors.heat;
        ctx.fillRect(50 + usefulWidth + 10, barY + 30, wastedWidth - 20, barHeight);
        ctx.fillText('Heat: 75%', 140, barY + 20);
        
      } else {
        // Default floating particles
        setParticles(prev => prev.map(p => {
          const newX = p.x + Math.sin(time + p.phase) * 0.5;
          const newY = p.y + Math.cos(time + p.phase) * 0.5;
          
          // Draw particle
          ctx.beginPath();
          const gradient = ctx.createRadialGradient(newX, newY, 0, newX, newY, 12);
          gradient.addColorStop(0, energyColors[p.type]);
          gradient.addColorStop(1, energyColors[p.type] + '00');
          ctx.fillStyle = gradient;
          ctx.arc(newX, newY, 10, 0, Math.PI * 2);
          ctx.fill();
          
          return { ...p, x: newX, y: newY };
        }));
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [currentScene]);

  // Speak function
  const speakScene = useCallback((sceneIndex: number) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    
    if (isMuted || !isPlaying) return;

    const scene = scenes[sceneIndex];
    const fullText = `${scene.title}. ${scene.narration}`;
    
    const performSpeak = () => {
      if (!window.speechSynthesis) {
        setTimeout(() => {
          if (currentSceneRef.current === sceneIndex && sceneIndex < scenes.length - 1) {
            setCurrentScene(sceneIndex + 1);
          }
        }, 8000);
        return;
      }

      const utterance = new SpeechSynthesisUtterance(fullText);
      utterance.rate = 0.88;
      utterance.pitch = 1.0;
      utterance.volume = 1;
      
      const voices = window.speechSynthesis.getVoices();
      const englishVoice = voices.find(v => v.lang.startsWith('en-') && v.name.toLowerCase().includes('female'))
        || voices.find(v => v.lang.startsWith('en-GB'))
        || voices.find(v => v.lang.startsWith('en-US'))
        || voices.find(v => v.lang.startsWith('en'))
        || voices[0];
      
      if (englishVoice) utterance.voice = englishVoice;
      
      utterance.onstart = () => setIsSpeaking(true);
      
      utterance.onend = () => {
        setIsSpeaking(false);
        setTimeout(() => {
          if (currentSceneRef.current === sceneIndex && sceneIndex < scenes.length - 1) {
            setCurrentScene(sceneIndex + 1);
          }
        }, 1500);
      };
      
      utterance.onerror = (e: SpeechSynthesisErrorEvent) => {
        if (e.error === 'interrupted' || e.error === 'canceled') {
          setIsSpeaking(false);
          return;
        }
        console.warn('Speech synthesis issue:', e.error);
        setIsSpeaking(false);
        if (e.error === 'not-allowed' || e.error === 'audio-busy') {
          setTimeout(() => {
            if (currentSceneRef.current === sceneIndex && sceneIndex < scenes.length - 1) {
              setCurrentScene(sceneIndex + 1);
            }
          }, 8000);
        }
      };
      
      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    };

    const voices = window.speechSynthesis.getVoices();
    if (voices.length === 0) {
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.onvoiceschanged = null;
        setTimeout(performSpeak, 100);
      };
    } else {
      setTimeout(performSpeak, 150);
    }
  }, [isMuted, isPlaying]);

  useEffect(() => {
    if (isPlaying && !isMuted) {
      speakScene(currentScene);
    } else {
      window.speechSynthesis?.cancel();
      setIsSpeaking(false);
    }
    
    return () => {
      window.speechSynthesis?.cancel();
    };
  }, [currentScene, isPlaying, isMuted, speakScene]);

  useEffect(() => {
    return () => {
      window.speechSynthesis?.cancel();
    };
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      window.speechSynthesis?.cancel();
      setIsSpeaking(false);
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!isMuted) {
      window.speechSynthesis?.cancel();
      setIsSpeaking(false);
    }
    setIsMuted(!isMuted);
  };

  const handleNext = () => {
    window.speechSynthesis?.cancel();
    setIsSpeaking(false);
    if (currentScene < scenes.length - 1) {
      setCurrentScene(prev => prev + 1);
    } else {
      onComplete?.();
    }
  };

  const handleSkip = () => {
    window.speechSynthesis?.cancel();
    onComplete?.();
  };

  const scene = scenes[currentScene];

  return (
    <div className={`relative w-full min-h-[500px] sm:min-h-[600px] overflow-hidden rounded-xl ${className}`}>
      {/* Animated background */}
      <motion.div
        key={scene.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        className={`absolute inset-0 bg-gradient-to-br ${scene.bgGradient}`}
      />

      {/* Canvas for animations */}
      <canvas
        ref={canvasRef}
        width={400}
        height={300}
        className="absolute top-0 right-0 w-full h-full opacity-40 pointer-events-none"
      />

      {/* Floating transformation arrows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {['→', '⚡', '🔄', '↓', '⟹', '∞'].map((symbol, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl sm:text-3xl opacity-20"
            initial={{ x: `${Math.random() * 80 + 10}%`, y: '110%' }}
            animate={{ 
              y: '-10%',
              rotate: [0, 360],
            }}
            transition={{ 
              duration: 10 + i * 2, 
              repeat: Infinity, 
              ease: 'linear',
              delay: i * 1.2 
            }}
          >
            {symbol}
          </motion.div>
        ))}
      </div>

      {/* Speaking indicator */}
      {isSpeaking && (
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1.5">
          <div className="flex gap-1">
            {[0, 1, 2].map(i => (
              <motion.div
                key={i}
                className="w-1 bg-white rounded-full"
                animate={{ height: [8, 16, 8] }}
                transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.15 }}
              />
            ))}
          </div>
          <span className="text-white text-xs font-medium">Speaking...</span>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[500px] sm:min-h-[600px] p-4 sm:p-8 text-white">
        <AnimatePresence mode="wait">
          <motion.div
            key={scene.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto"
          >
            {/* Emoji */}
            <motion.div
              className="text-6xl sm:text-8xl mb-4 sm:mb-6"
              animate={{ 
                scale: [1, 1.15, 1],
                rotate: scene.animation === 'chain' ? [0, 10, -10, 0] : 0
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {scene.emoji}
            </motion.div>

            {/* Title */}
            <h2 className="text-2xl sm:text-4xl font-bold mb-3 sm:mb-4 drop-shadow-lg">
              {scene.title}
            </h2>

            {/* Narration text */}
            <p className="text-base sm:text-xl leading-relaxed drop-shadow-md px-2">
              {scene.narration}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Progress dots */}
        <div className="flex gap-2 mt-6 sm:mt-8">
          {scenes.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                window.speechSynthesis?.cancel();
                setIsSpeaking(false);
                setCurrentScene(index);
              }}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${
                index === currentScene 
                  ? 'bg-white scale-125' 
                  : index < currentScene 
                  ? 'bg-white/70' 
                  : 'bg-white/40'
              }`}
            />
          ))}
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mt-6 sm:mt-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleMute}
            className="text-white hover:bg-white/20"
          >
            {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={togglePlay}
            className="text-white hover:bg-white/20"
          >
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </Button>

          <Button
            onClick={handleNext}
            className="bg-white/20 hover:bg-white/30 text-white border border-white/30 px-4 sm:px-6"
          >
            {currentScene === scenes.length - 1 ? "Start Learning!" : "Next"}
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleSkip}
            className="text-white/80 hover:text-white hover:bg-white/20"
          >
            <SkipForward className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">Skip Intro</span>
          </Button>
        </div>

        {/* Scene counter */}
        <div className="absolute bottom-4 left-4 text-white/60 text-sm">
          {currentScene + 1} / {scenes.length}
        </div>
      </div>
    </div>
  );
}
