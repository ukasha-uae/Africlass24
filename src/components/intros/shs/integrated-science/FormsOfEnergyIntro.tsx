'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Play, Pause, SkipForward, Volume2, VolumeX, ChevronRight } from 'lucide-react';

interface FormsOfEnergyIntroProps {
  onComplete?: () => void;
  className?: string;
}

interface EnergyBall {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  type: 'kinetic' | 'potential' | 'thermal' | 'chemical' | 'electrical' | 'light';
  color: string;
  size: number;
}

const energyColors = {
  kinetic: '#3b82f6',
  potential: '#22c55e',
  thermal: '#ef4444',
  chemical: '#f59e0b',
  electrical: '#eab308',
  light: '#fbbf24',
};

const scenes = [
  {
    id: 1,
    title: "Energy Is Everywhere!",
    narration: "Look around you - energy is making everything happen! From the sun warming Ghana to the electricity powering your phone, energy is the ability to do work and cause change. Every action you take, every movement you see, every sound you hear - it all involves energy! Today we'll discover the different forms this amazing force takes.",
    bgGradient: "from-yellow-400 via-orange-500 to-red-500",
    emoji: "⚡",
  },
  {
    id: 2,
    title: "Kinetic Energy - Energy in Motion",
    narration: "A moving trotro in Accra traffic, a running athlete at the National Sports Festival, flowing water in the Volta River - anything that moves has kinetic energy! The faster an object moves, the more kinetic energy it has. And here's something amazing: if you double the speed, the kinetic energy becomes four times greater! That's why car accidents at high speed are so dangerous.",
    bgGradient: "from-blue-400 via-blue-500 to-blue-600",
    emoji: "🏃",
  },
  {
    id: 3,
    title: "Potential Energy - Stored Power",
    narration: "Water stored high in Akosombo Dam, a coconut at the top of a palm tree, a stretched catapult ready to fire - these all have potential energy! It's energy waiting to be released. The higher something is, the more gravitational potential energy it has. When the coconut falls or the water rushes down, that potential energy transforms into kinetic energy!",
    bgGradient: "from-green-400 via-emerald-500 to-teal-500",
    emoji: "🏔️",
  },
  {
    id: 4,
    title: "Thermal Energy - The Heat Within",
    narration: "Feel the warmth of the sun on your skin during harmattan? That's thermal energy! Thermal energy is the total energy of all the moving particles in a substance. The hotter something is, the faster its particles move. When you boil water on a coal pot, you're adding thermal energy. Your body maintains about 37 degrees Celsius to keep you alive!",
    bgGradient: "from-red-400 via-orange-500 to-yellow-400",
    emoji: "🔥",
  },
  {
    id: 5,
    title: "Chemical Energy - Hidden in Bonds",
    narration: "The fufu and groundnut soup you eat, the petrol that powers cars, the battery in your phone - they all contain chemical energy stored in molecular bonds! When you digest food, chemical reactions release energy for your body. When petrol burns in an engine, chemical energy becomes kinetic energy. Even the wood and charcoal used for cooking store chemical energy!",
    bgGradient: "from-amber-400 via-orange-500 to-red-400",
    emoji: "🔋",
  },
  {
    id: 6,
    title: "Energy Transformation - Nothing Is Lost!",
    narration: "Here's the most important law in physics: Energy cannot be created or destroyed - it can only change from one form to another! At Akosombo Dam, potential energy becomes kinetic energy as water falls, then mechanical energy spins the turbines, then electrical energy flows to your home. Energy is always transforming! Ready to master this amazing science?",
    bgGradient: "from-purple-400 via-pink-500 to-rose-500",
    emoji: "🔄",
  },
];

export default function FormsOfEnergyIntro({ onComplete, className }: FormsOfEnergyIntroProps) {
  const [currentScene, setCurrentScene] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [energyBalls, setEnergyBalls] = useState<EnergyBall[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const currentSceneRef = useRef(currentScene);

  // Keep ref in sync
  useEffect(() => {
    currentSceneRef.current = currentScene;
  }, [currentScene]);

  // Initialize energy balls
  useEffect(() => {
    const balls: EnergyBall[] = [];
    const types: EnergyBall['type'][] = ['kinetic', 'potential', 'thermal', 'chemical', 'electrical', 'light'];
    
    for (let i = 0; i < 15; i++) {
      balls.push({
        id: i,
        x: Math.random() * 300,
        y: Math.random() * 200,
        vx: (Math.random() - 0.5) * 3,
        vy: (Math.random() - 0.5) * 3,
        type: types[i % types.length],
        color: energyColors[types[i % types.length]],
        size: 8 + Math.random() * 12,
      });
    }
    setEnergyBalls(balls);
  }, []);

  // Animate energy balls on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      setEnergyBalls(prevBalls => {
        return prevBalls.map(ball => {
          let newX = ball.x + ball.vx;
          let newY = ball.y + ball.vy;
          let newVx = ball.vx;
          let newVy = ball.vy;

          if (newX < ball.size || newX > canvas.width - ball.size) {
            newVx = -newVx;
            newX = Math.max(ball.size, Math.min(canvas.width - ball.size, newX));
          }
          if (newY < ball.size || newY > canvas.height - ball.size) {
            newVy = -newVy;
            newY = Math.max(ball.size, Math.min(canvas.height - ball.size, newY));
          }

          // Draw ball with glow
          ctx.beginPath();
          const gradient = ctx.createRadialGradient(newX, newY, 0, newX, newY, ball.size);
          gradient.addColorStop(0, ball.color);
          gradient.addColorStop(0.5, ball.color + '99');
          gradient.addColorStop(1, ball.color + '00');
          ctx.fillStyle = gradient;
          ctx.arc(newX, newY, ball.size, 0, Math.PI * 2);
          ctx.fill();

          // Draw trail
          ctx.beginPath();
          ctx.strokeStyle = ball.color + '40';
          ctx.lineWidth = 2;
          ctx.moveTo(newX, newY);
          ctx.lineTo(newX - newVx * 5, newY - newVy * 5);
          ctx.stroke();

          return { ...ball, x: newX, y: newY, vx: newVx, vy: newVy };
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  // Speak function - core TTS logic
  const speakScene = useCallback((sceneIndex: number) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    
    // Cancel any ongoing speech first
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    
    if (isMuted || !isPlaying) return;

    const scene = scenes[sceneIndex];
    const fullText = `${scene.title}. ${scene.narration}`;
    
    const performSpeak = () => {
      // Check if synthesis is available
      if (!window.speechSynthesis) {
        console.warn('Speech synthesis not available');
        // Fall back to timed auto-advance
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
      
      // Get voices and select a good one
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
        // Auto-advance after speech ends (with delay)
        // Use ref to get current scene to avoid stale closure
        setTimeout(() => {
          if (currentSceneRef.current === sceneIndex && sceneIndex < scenes.length - 1) {
            setCurrentScene(sceneIndex + 1);
          }
        }, 1500);
      };
      
      utterance.onerror = (e: SpeechSynthesisErrorEvent) => {
        // 'interrupted' and 'canceled' are normal when we cancel speech
        if (e.error === 'interrupted' || e.error === 'canceled') {
          // This is expected when navigating or cancelling - not a real error
          setIsSpeaking(false);
          return;
        }
        console.warn('Speech synthesis issue:', e.error);
        setIsSpeaking(false);
        // Fall back to timed auto-advance on real errors
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
      // Wait for voices to load
      const handleVoicesChanged = () => {
        window.speechSynthesis.onvoiceschanged = null;
        setTimeout(performSpeak, 100);
      };
      window.speechSynthesis.onvoiceschanged = handleVoicesChanged;
    } else {
      // Voices already loaded, speak after small delay
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

      {/* Energy animation canvas */}
      <canvas
        ref={canvasRef}
        width={400}
        height={300}
        className="absolute top-0 right-0 w-full h-full opacity-30 pointer-events-none"
      />

      {/* Floating energy icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {['⚡', '🔥', '💡', '🔋', '☀️', '💨'].map((emoji, i) => (
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
