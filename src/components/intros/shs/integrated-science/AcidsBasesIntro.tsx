'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Play, Pause, SkipForward, Volume2, VolumeX, ChevronRight } from 'lucide-react';

interface AcidsBasesIntroProps {
  onComplete?: () => void;
  className?: string;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  type: 'acid' | 'base' | 'salt' | 'water' | 'h+' | 'oh-';
  color: string;
  size: number;
  label: string;
}

const particleColors = {
  acid: '#ef4444',     // Red
  base: '#3b82f6',     // Blue
  salt: '#a855f7',     // Purple
  water: '#06b6d4',    // Cyan
  'h+': '#f97316',     // Orange
  'oh-': '#22c55e',    // Green
};

const scenes = [
  {
    id: 1,
    title: "Chemistry in Your Kitchen!",
    narration: "Have you ever wondered why lemons taste sour? Or why soap feels slippery? The answer lies in acids and bases - two of the most important types of chemicals in chemistry! From the citric acid in your sobolo to the sodium hydroxide used to make traditional soap, acids and bases are everywhere in Ghana and around the world!",
    bgGradient: "from-red-500 via-purple-500 to-blue-500",
    emoji: "🧪",
  },
  {
    id: 2,
    title: "Acids - The Sour Side",
    narration: "Acids are substances that release hydrogen ions when dissolved in water. They taste sour - think of lemons, oranges, and tamarind! Acids turn blue litmus paper red and react with metals to produce hydrogen gas. In your stomach, hydrochloric acid helps digest your fufu and soup! Strong acids like sulfuric acid are used in car batteries.",
    bgGradient: "from-red-400 via-orange-500 to-yellow-500",
    emoji: "🍋",
  },
  {
    id: 3,
    title: "Bases - The Slippery Side",
    narration: "Bases produce hydroxide ions in water. They taste bitter and feel slippery - like soap! Bases turn red litmus paper blue. In Ghana, our grandmothers used wood ash water, which is a base called potash, to make traditional black soap. Calcium hydroxide, or slaked lime, is used in construction. Bases are the chemical opposite of acids!",
    bgGradient: "from-blue-400 via-indigo-500 to-purple-500",
    emoji: "🧼",
  },
  {
    id: 4,
    title: "The pH Scale - Measuring Power",
    narration: "The pH scale runs from zero to fourteen and tells us how acidic or basic something is. Seven is neutral - like pure water. Numbers below seven are acidic - the lower, the stronger the acid. Numbers above seven are basic. Your blood stays at exactly seven point four. Battery acid has pH of zero, while bleach has pH of thirteen. Each number represents a ten times difference!",
    bgGradient: "from-red-500 via-yellow-500 to-green-500",
    emoji: "📊",
  },
  {
    id: 5,
    title: "Neutralization - When Opposites Meet",
    narration: "What happens when an acid meets a base? They neutralize each other! Acid plus base gives salt plus water. When you take Andrews Liver Salt for stomach acid, you're doing a neutralization reaction! If a bee stings you with acid, apply baking soda. If a wasp stings you with base, apply vinegar. Neutralization is chemistry helping us every day!",
    bgGradient: "from-purple-400 via-pink-500 to-rose-500",
    emoji: "⚗️",
  },
  {
    id: 6,
    title: "Ready to Explore pH?",
    narration: "Now you understand the amazing world of acids, bases, and salts! From the acid in your stomach to the base in your soap, from the salt in your food to the neutralization reactions that save the day - chemistry is everywhere! Get ready to learn about pH scales, indicators, and chemical reactions that will make you a master of acids and bases!",
    bgGradient: "from-emerald-400 via-teal-500 to-cyan-500",
    emoji: "🎓",
  },
];

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
}

export default function AcidsBasesIntro({ onComplete, className }: AcidsBasesIntroProps) {
  const [currentScene, setCurrentScene] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const currentSceneRef = useRef(currentScene);

  // Keep ref in sync
  useEffect(() => {
    currentSceneRef.current = currentScene;
  }, [currentScene]);

  // Initialize particles
  useEffect(() => {
    const newParticles: Particle[] = [];
    const types: Particle['type'][] = ['acid', 'base', 'salt', 'water', 'h+', 'oh-'];
    const labels = ['H⁺', 'OH⁻', 'NaCl', 'H₂O', 'H⁺', 'OH⁻'];
    
    for (let i = 0; i < 18; i++) {
      const type = types[i % types.length];
      newParticles.push({
        id: i,
        x: Math.random() * 350 + 25,
        y: Math.random() * 250 + 25,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        type,
        color: particleColors[type],
        size: type === 'h+' || type === 'oh-' ? 6 + Math.random() * 4 : 10 + Math.random() * 8,
        label: labels[i % labels.length],
      });
    }
    setParticles(newParticles);
  }, []);

  // Animate particles on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      setParticles(prevParticles => {
        return prevParticles.map(particle => {
          let newX = particle.x + particle.vx;
          let newY = particle.y + particle.vy;
          let newVx = particle.vx;
          let newVy = particle.vy;

          // Bounce off walls
          if (newX < particle.size || newX > canvas.width - particle.size) {
            newVx = -newVx;
            newX = Math.max(particle.size, Math.min(canvas.width - particle.size, newX));
          }
          if (newY < particle.size || newY > canvas.height - particle.size) {
            newVy = -newVy;
            newY = Math.max(particle.size, Math.min(canvas.height - particle.size, newY));
          }

          // Draw particle with glow
          ctx.beginPath();
          const gradient = ctx.createRadialGradient(newX, newY, 0, newX, newY, particle.size);
          gradient.addColorStop(0, particle.color);
          gradient.addColorStop(0.6, particle.color + '99');
          gradient.addColorStop(1, particle.color + '00');
          ctx.fillStyle = gradient;
          ctx.arc(newX, newY, particle.size, 0, Math.PI * 2);
          ctx.fill();

          // Draw label for ions
          if (particle.type === 'h+' || particle.type === 'oh-') {
            ctx.font = 'bold 8px Arial';
            ctx.fillStyle = '#fff';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(particle.label, newX, newY);
          }

          return { ...particle, x: newX, y: newY, vx: newVx, vy: newVy };
        });
      });

      // Draw pH scale in corner
      const scaleWidth = 120;
      const scaleHeight = 12;
      const scaleX = canvas.width - scaleWidth - 10;
      const scaleY = 10;
      
      const scaleGradient = ctx.createLinearGradient(scaleX, scaleY, scaleX + scaleWidth, scaleY);
      scaleGradient.addColorStop(0, '#ef4444');
      scaleGradient.addColorStop(0.5, '#22c55e');
      scaleGradient.addColorStop(1, '#3b82f6');
      
      ctx.fillStyle = scaleGradient;
      ctx.fillRect(scaleX, scaleY, scaleWidth, scaleHeight);
      
      ctx.font = '8px Arial';
      ctx.fillStyle = '#fff';
      ctx.textAlign = 'center';
      ctx.fillText('0', scaleX, scaleY + scaleHeight + 10);
      ctx.fillText('7', scaleX + scaleWidth/2, scaleY + scaleHeight + 10);
      ctx.fillText('14', scaleX + scaleWidth, scaleY + scaleHeight + 10);
      ctx.fillText('pH Scale', scaleX + scaleWidth/2, scaleY + scaleHeight + 22);

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  // Speak function - core TTS logic with teacher-quality voice
  const speakScene = useCallback((sceneIndex: number) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    
    // Cancel any ongoing speech first
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    
    if (isMuted || !isPlaying) return;

    const scene = scenes[sceneIndex];
    const fullText = `${scene.title}. ${scene.narration}`;
    
    const performSpeak = () => {
      if (!window.speechSynthesis) {
        console.warn('Speech synthesis not available');
        setTimeout(() => {
          if (currentSceneRef.current === sceneIndex && sceneIndex < scenes.length - 1) {
            setCurrentScene(sceneIndex + 1);
          }
        }, 8000);
        return;
      }

      const utterance = new SpeechSynthesisUtterance(fullText);
      // Teacher-quality voice settings
      utterance.rate = 0.88;
      utterance.pitch = 1.0;
      utterance.volume = 1;
      
      // Voice selection priority
      const voices = window.speechSynthesis.getVoices();
      const englishVoice = voices.find(v => v.lang.startsWith('en-') && v.name.toLowerCase().includes('female'))
        || voices.find(v => v.lang.startsWith('en-GB'))
        || voices.find(v => v.lang.startsWith('en-US'))
        || voices.find(v => v.lang.startsWith('en'))
        || voices[0];
      
      if (englishVoice) {
        utterance.voice = englishVoice;
      }
      
      utterance.onstart = () => {
        setIsSpeaking(true);
      };
      
      utterance.onend = () => {
        setIsSpeaking(false);
        // Auto-advance after speech ends
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

    // Ensure voices are loaded
    const voices = window.speechSynthesis.getVoices();
    if (voices.length === 0) {
      const handleVoicesChanged = () => {
        window.speechSynthesis.onvoiceschanged = null;
        setTimeout(performSpeak, 100);
      };
      window.speechSynthesis.onvoiceschanged = handleVoicesChanged;
    } else {
      setTimeout(performSpeak, 150);
    }
  }, [isMuted, isPlaying]);

  // Trigger speech when scene changes or play state changes
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

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      window.speechSynthesis?.cancel();
    };
  }, []);

  // Handle play/pause toggle
  const togglePlay = () => {
    if (isPlaying) {
      window.speechSynthesis?.cancel();
      setIsSpeaking(false);
    }
    setIsPlaying(!isPlaying);
  };

  // Handle mute toggle
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

      {/* Particle animation canvas */}
      <canvas
        ref={canvasRef}
        width={400}
        height={300}
        className="absolute top-0 right-0 w-full h-full opacity-30 pointer-events-none"
      />

      {/* Floating chemistry icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {['🧪', '⚗️', '🔬', '💧', '🧂', '🍋'].map((emoji, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl sm:text-4xl opacity-20"
            initial={{ x: `${Math.random() * 80 + 10}%`, y: '100%' }}
            animate={{ 
              y: '-20%',
              x: [
                `${Math.random() * 80 + 10}%`,
                `${Math.random() * 80 + 10}%`,
                `${Math.random() * 80 + 10}%`
              ]
            }}
            transition={{ 
              duration: 8 + i * 2, 
              repeat: Infinity, 
              ease: 'linear',
              delay: i * 1.5 
            }}
          >
            {emoji}
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
                scale: [1, 1.2, 1],
                rotate: [0, 5, -5, 0]
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
