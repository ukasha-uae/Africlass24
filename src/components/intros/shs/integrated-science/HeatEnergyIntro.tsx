'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Play, Pause, SkipForward, Volume2, VolumeX, ChevronRight } from 'lucide-react';

interface HeatEnergyIntroProps {
  onComplete?: () => void;
  className?: string;
}

interface HeatParticle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  type: 'hot' | 'cold' | 'conduction' | 'convection' | 'radiation';
  color: string;
  size: number;
  energy: number;
}

const particleColors = {
  hot: '#ef4444',
  cold: '#3b82f6',
  conduction: '#f59e0b',
  convection: '#8b5cf6',
  radiation: '#fbbf24',
};

// Helper function to convert RGB values to hex
const rgbToHex = (r: number, g: number, b: number): string => {
  return '#' + [r, g, b].map(x => {
    const hex = Math.max(0, Math.min(255, Math.floor(x))).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
};

const scenes = [
  {
    id: 1,
    title: "Welcome to Heat Energy!",
    narration: "Have you ever wondered why your hand feels cold when you touch ice? Or why metal feels colder than wood, even when they're at the same temperature? Today, we're going to explore the fascinating world of heat energy! From cooking our food to keeping our bodies warm, heat is one of the most important forms of energy in our daily lives.",
    bgGradient: "from-orange-500 via-red-500 to-yellow-500",
    emoji: "🔥",
  },
  {
    id: 2,
    title: "Heat vs Temperature",
    narration: "Heat and temperature are different! Heat is the total kinetic energy of all particles in a substance, measured in Joules. Temperature is the average kinetic energy of particles, measured in degrees Celsius or Kelvin. Think about it: a bucket of warm water has more heat than a cup of boiling water because it has more particles, but the cup has higher temperature because the particles are moving faster on average!",
    bgGradient: "from-blue-500 via-purple-500 to-red-500",
    emoji: "🌡️",
  },
  {
    id: 3,
    title: "Conduction - Heat Through Contact",
    narration: "Conduction transfers heat through direct contact between particles. When you leave a metal spoon in hot jollof rice, the heat travels from particle to particle until the handle gets hot too! Metals like copper and iron are good conductors because they have free electrons. Wood and plastic are insulators - they block heat transfer. That's why pot handles are often made of wood or plastic!",
    bgGradient: "from-red-600 via-orange-500 to-yellow-400",
    emoji: "🥄",
  },
  {
    id: 4,
    title: "Convection - Heat Through Movement",
    narration: "Convection moves heat through fluids by actual movement of particles. Hot fluid rises because it's less dense, and cool fluid sinks to take its place. This creates convection currents - like the sea breeze that cools Accra on hot afternoons! During the day, land heats faster than sea, hot air rises over land, and cool sea air moves in. At night, the pattern reverses!",
    bgGradient: "from-cyan-500 via-blue-500 to-purple-500",
    emoji: "🌊",
  },
  {
    id: 5,
    title: "Radiation - Heat Without Contact",
    narration: "Radiation transfers heat through electromagnetic waves - no medium needed! This is how the Sun's energy reaches Ghana, traveling 150 million kilometers through empty space. Dark surfaces absorb radiation and get hotter - that's why wearing black clothes in the sun feels warmer. Shiny surfaces reflect radiation - that's why buildings in Northern Ghana are often painted white!",
    bgGradient: "from-yellow-400 via-orange-500 to-red-600",
    emoji: "☀️",
  },
  {
    id: 6,
    title: "Heat Energy in Ghana!",
    narration: "Heat energy shapes our daily lives in Ghana! Traditional fish smoking at Elmina uses all three methods - radiation from flames, convection of hot smoke rising, and conduction into the fish flesh. The Harmattan brings dry air through convection from the Sahara. Clay pots keep water cool through evaporation. Understanding heat helps us cook better, build cooler houses, and stay comfortable! Ready to master this amazing science?",
    bgGradient: "from-emerald-500 via-teal-500 to-cyan-500",
    emoji: "🇬🇭",
  },
];

export default function HeatEnergyIntro({ onComplete, className }: HeatEnergyIntroProps) {
  const [currentScene, setCurrentScene] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [particles, setParticles] = useState<HeatParticle[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const currentSceneRef = useRef(currentScene);

  // Keep ref in sync
  useEffect(() => {
    currentSceneRef.current = currentScene;
  }, [currentScene]);

  // Initialize particles based on current scene
  useEffect(() => {
    const newParticles: HeatParticle[] = [];
    const scene = scenes[currentScene];
    
    // Different particle patterns for different scenes
    if (scene.id === 1 || scene.id === 2) {
      // Hot and cold particles side by side
      for (let i = 0; i < 20; i++) {
        const isHot = i < 10;
        newParticles.push({
          id: i,
          x: isHot ? Math.random() * 150 + 20 : Math.random() * 150 + 230,
          y: Math.random() * 200 + 50,
          vx: isHot ? (Math.random() - 0.5) * 4 : (Math.random() - 0.5) * 1,
          vy: isHot ? (Math.random() - 0.5) * 4 : (Math.random() - 0.5) * 1,
          type: isHot ? 'hot' : 'cold',
          color: isHot ? particleColors.hot : particleColors.cold,
          size: 8 + Math.random() * 8,
          energy: isHot ? 0.8 + Math.random() * 0.2 : 0.2 + Math.random() * 0.2,
        });
      }
    } else if (scene.id === 3) {
      // Conduction - particles in a line
      for (let i = 0; i < 15; i++) {
        const energy = Math.max(0, 1 - i * 0.07);
        newParticles.push({
          id: i,
          x: 40 + i * 25,
          y: 150 + (Math.random() - 0.5) * 20,
          vx: 0,
          vy: 0,
          type: 'conduction',
          color: rgbToHex(255 * energy, 100 - energy * 50, 255 * (1 - energy)),
          size: 12,
          energy: energy,
        });
      }
    } else if (scene.id === 4) {
      // Convection - particles that rise and fall
      for (let i = 0; i < 18; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 200 + 100,
          y: Math.random() * 200 + 50,
          vx: 0,
          vy: 0,
          type: 'convection',
          color: particleColors.convection,
          size: 10 + Math.random() * 6,
          energy: 0.5,
        });
      }
    } else if (scene.id === 5) {
      // Radiation - waves emanating from center
      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2;
        newParticles.push({
          id: i,
          x: 200,
          y: 150,
          vx: Math.cos(angle) * 2,
          vy: Math.sin(angle) * 2,
          type: 'radiation',
          color: particleColors.radiation,
          size: 6 + Math.random() * 4,
          energy: 1,
        });
      }
    } else {
      // Combined - mix of all types
      const types: HeatParticle['type'][] = ['hot', 'cold', 'conduction', 'convection', 'radiation'];
      for (let i = 0; i < 15; i++) {
        const type = types[i % types.length];
        newParticles.push({
          id: i,
          x: Math.random() * 350 + 25,
          y: Math.random() * 250 + 25,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          type: type,
          color: particleColors[type],
          size: 8 + Math.random() * 10,
          energy: 0.5 + Math.random() * 0.5,
        });
      }
    }
    
    setParticles(newParticles);
  }, [currentScene]);

  // Animate particles on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const scene = scenes[currentScene];
    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.02;
      
      setParticles(prevParticles => {
        return prevParticles.map(particle => {
          let newX = particle.x;
          let newY = particle.y;
          let newVx = particle.vx;
          let newVy = particle.vy;

          if (scene.id === 3) {
            // Conduction animation - particles vibrate based on energy
            const vibration = particle.energy * 8;
            newX = particle.x + Math.sin(time * 10 + particle.id) * vibration * 0.3;
            newY = particle.y + Math.cos(time * 10 + particle.id) * vibration * 0.3;
          } else if (scene.id === 4) {
            // Convection animation - circular flow
            const centerX = 200;
            const centerY = 150;
            
            // Heat source at bottom
            if (particle.y > 230) {
              particle.energy = Math.min(1, particle.energy + 0.02);
              newVy = -2 - particle.energy * 2;
            } else if (particle.y < 70) {
              particle.energy = Math.max(0.2, particle.energy - 0.01);
              newVx = particle.x < centerX ? -1.5 : 1.5;
              newVy = 0.5;
            }
            
            if (particle.y > 70 && particle.y < 230) {
              if (particle.x < 110 || particle.x > 290) {
                newVy = 1.5;
                newVx *= 0.95;
              }
            }
            
            if (particle.y > 200) {
              newVx = (centerX - particle.x) * 0.03;
            }

            newX = particle.x + newVx;
            newY = particle.y + newVy;
            
            // Bounds
            newX = Math.max(80, Math.min(320, newX));
            newY = Math.max(50, Math.min(250, newY));
          } else if (scene.id === 5) {
            // Radiation animation - waves expanding outward
            newX = particle.x + particle.vx;
            newY = particle.y + particle.vy;
            
            // Reset when too far
            const dist = Math.sqrt(Math.pow(newX - 200, 2) + Math.pow(newY - 150, 2));
            if (dist > 150) {
              newX = 200;
              newY = 150;
            }
          } else {
            // Default bouncing behavior
            newX = particle.x + particle.vx * particle.energy * 2;
            newY = particle.y + particle.vy * particle.energy * 2;

            if (newX < particle.size || newX > canvas.width - particle.size) {
              newVx = -particle.vx;
              newX = Math.max(particle.size, Math.min(canvas.width - particle.size, newX));
            }
            if (newY < particle.size || newY > canvas.height - particle.size) {
              newVy = -particle.vy;
              newY = Math.max(particle.size, Math.min(canvas.height - particle.size, newY));
            }
          }

          // Draw particle with glow
          ctx.beginPath();
          const gradient = ctx.createRadialGradient(newX, newY, 0, newX, newY, particle.size);
          gradient.addColorStop(0, particle.color);
          gradient.addColorStop(0.5, particle.color + '99');
          gradient.addColorStop(1, particle.color + '00');
          ctx.fillStyle = gradient;
          ctx.arc(newX, newY, particle.size, 0, Math.PI * 2);
          ctx.fill();

          // Draw trail for moving particles
          if (Math.abs(newVx) > 0.1 || Math.abs(newVy) > 0.1) {
            ctx.beginPath();
            ctx.strokeStyle = particle.color + '40';
            ctx.lineWidth = 2;
            ctx.moveTo(newX, newY);
            ctx.lineTo(newX - newVx * 5, newY - newVy * 5);
            ctx.stroke();
          }

          return { ...particle, x: newX, y: newY, vx: newVx, vy: newVy };
        });
      });

      // Scene-specific overlays
      if (scene.id === 3) {
        // Draw heat source indicator for conduction
        ctx.fillStyle = '#ff4444';
        ctx.beginPath();
        ctx.arc(25, 150, 15, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = 'white';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('HOT', 25, 180);
        ctx.fillText('COLD', 375, 180);
      } else if (scene.id === 4) {
        // Draw container and heat source for convection
        ctx.strokeStyle = 'rgba(255,255,255,0.3)';
        ctx.lineWidth = 2;
        ctx.strokeRect(80, 50, 240, 220);
        ctx.fillStyle = '#ff4444';
        ctx.fillRect(140, 270, 120, 20);
        ctx.fillStyle = 'white';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('🔥 Heat Source', 200, 285);
      } else if (scene.id === 5) {
        // Draw sun for radiation
        ctx.beginPath();
        const sunGradient = ctx.createRadialGradient(200, 150, 0, 200, 150, 40);
        sunGradient.addColorStop(0, '#ffff00');
        sunGradient.addColorStop(0.5, '#ff8800');
        sunGradient.addColorStop(1, '#ff4400');
        ctx.fillStyle = sunGradient;
        ctx.arc(200, 150, 30 + Math.sin(time * 3) * 3, 0, Math.PI * 2);
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [currentScene]);

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

      {/* Heat animation canvas */}
      <canvas
        ref={canvasRef}
        width={400}
        height={300}
        className="absolute top-0 right-0 w-full h-full opacity-40 pointer-events-none"
      />

      {/* Floating heat-related icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {['🔥', '❄️', '☀️', '🌡️', '💨', '🧊'].map((emoji, i) => (
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
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mt-6 sm:mt-8 relative z-50">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleMute}
            className="text-white hover:bg-white/20 active:bg-white/30 touch-manipulation select-none min-h-[44px] min-w-[44px]"
          >
            {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={togglePlay}
            className="text-white hover:bg-white/20 active:bg-white/30 touch-manipulation select-none min-h-[44px] min-w-[44px]"
          >
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </Button>

          <Button
            onClick={handleNext}
            className="bg-white/20 hover:bg-white/30 active:bg-white/40 text-white border border-white/30 px-4 sm:px-6 touch-manipulation select-none min-h-[44px]"
          >
            {currentScene === scenes.length - 1 ? "Start Learning!" : "Next"}
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleSkip}
            className="text-white/80 hover:text-white hover:bg-white/20 active:bg-white/30 touch-manipulation select-none min-h-[44px]"
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
