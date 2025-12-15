'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, ChevronRight, X } from 'lucide-react';

interface SoilFertilityIntroProps {
  onComplete?: () => void;
  className?: string;
}

const scenes = [
  {
    id: 1,
    title: "Soil: Ghana's Hidden Treasure!",
    narration: "Welcome to the world beneath our feet! Soil is the foundation of all agriculture - without healthy soil, crops cannot grow, and food security is threatened. Across Ghana and Africa, soil degradation is a growing challenge that affects farmers every day. Today, you'll discover the secrets of soil fertility and how to protect this precious resource for future generations.",
    bgGradient: "from-amber-700 via-orange-600 to-yellow-600",
    emoji: "🌍",
    visual: 'intro',
  },
  {
    id: 2,
    title: "What Makes Soil Fertile?",
    narration: "Fertile soil is a perfect recipe! It contains forty-five percent mineral matter for structure, twenty-five percent water to dissolve nutrients, twenty-five percent air for roots to breathe, and just five percent organic matter - but this small amount is crucial! Plants need three primary nutrients: Nitrogen for green leaves, Phosphorus for strong roots, and Potassium for disease resistance.",
    bgGradient: "from-amber-600 via-yellow-600 to-lime-600",
    emoji: "🧪",
    visual: 'composition',
  },
  {
    id: 3,
    title: "Maintaining Soil Fertility",
    narration: "How do we keep soil healthy? Crop rotation prevents nutrient depletion by growing different crops each season. Adding organic matter like compost and manure feeds the soil. Mulching protects the surface and conserves moisture. Green manure - growing legumes and ploughing them in - adds nitrogen naturally. These practices have been used by Ghanaian farmers for generations!",
    bgGradient: "from-green-600 via-emerald-500 to-teal-500",
    emoji: "🌱",
    visual: 'maintain',
  },
  {
    id: 4,
    title: "The Danger of Soil Erosion",
    narration: "Soil erosion is Ghana's silent crisis! Water erosion starts with splash erosion from raindrops, becomes sheet erosion removing thin layers, forms rills or small channels, and finally creates gullies - deep trenches that destroy farmland. Wind erosion in Northern Ghana during the dry season carries away precious topsoil. Once soil is gone, it takes hundreds of years to form again!",
    bgGradient: "from-red-600 via-orange-600 to-amber-600",
    emoji: "🌊",
    visual: 'erosion',
  },
  {
    id: 5,
    title: "Conservation Methods",
    narration: "We can fight back against erosion! Contour farming - ploughing across slopes - slows water runoff. Terracing creates step-like platforms on hillsides. Afforestation plants trees whose roots hold soil firmly. Cover crops protect bare ground. In Northern Ghana, farmers use stone bunds and zai pits. In cocoa regions, agroforestry combines trees with crops. Every method helps save our soil!",
    bgGradient: "from-teal-600 via-cyan-500 to-blue-500",
    emoji: "🛡️",
    visual: 'conservation',
  },
  {
    id: 6,
    title: "Ready to Protect Ghana's Soil!",
    narration: "Now you understand why soil conservation matters! You'll learn about soil composition and nutrients, factors affecting fertility, methods to maintain and improve soil, causes of erosion and degradation, and conservation techniques used across Ghana. Remember: one centimeter of topsoil takes two hundred to one thousand years to form - let's protect this treasure! Let's begin!",
    bgGradient: "from-purple-600 via-indigo-500 to-blue-600",
    emoji: "🎓",
    visual: 'ready',
  },
];

// Soil composition data
const soilComposition = [
  { name: 'Mineral Matter', percent: 45, color: '#d97706', emoji: '🪨' },
  { name: 'Water', percent: 25, color: '#0ea5e9', emoji: '💧' },
  { name: 'Air', percent: 25, color: '#a3e635', emoji: '💨' },
  { name: 'Organic Matter', percent: 5, color: '#7c3aed', emoji: '🍂' },
];

// NPK nutrients
const nutrients = [
  { name: 'Nitrogen (N)', role: 'Leaves & Growth', color: '#22c55e', emoji: '🌿' },
  { name: 'Phosphorus (P)', role: 'Roots & Flowers', color: '#f97316', emoji: '🌸' },
  { name: 'Potassium (K)', role: 'Disease Resistance', color: '#3b82f6', emoji: '🛡️' },
];

// Maintenance methods
const maintenanceMethods = [
  { name: 'Crop Rotation', emoji: '🔄', desc: 'Alternate crops' },
  { name: 'Composting', emoji: '♻️', desc: 'Add organic matter' },
  { name: 'Mulching', emoji: '🍃', desc: 'Protect surface' },
  { name: 'Green Manure', emoji: '🌱', desc: 'Plough in legumes' },
];

// Erosion types
const erosionTypes = [
  { name: 'Splash', severity: 1, desc: 'Raindrops dislodge soil', emoji: '💦' },
  { name: 'Sheet', severity: 2, desc: 'Thin layer removed', emoji: '📄' },
  { name: 'Rill', severity: 3, desc: 'Small channels form', emoji: '〰️' },
  { name: 'Gully', severity: 4, desc: 'Deep trenches cut', emoji: '🕳️' },
];

// Conservation methods
const conservationMethods = [
  { name: 'Contour Farming', emoji: '🌾', desc: 'Plough across slopes' },
  { name: 'Terracing', emoji: '🏔️', desc: 'Step-like platforms' },
  { name: 'Afforestation', emoji: '🌳', desc: 'Plant trees' },
  { name: 'Cover Crops', emoji: '🥬', desc: 'Protect bare soil' },
];

export default function SoilFertilityIntro({ onComplete, className }: SoilFertilityIntroProps) {
  const [currentScene, setCurrentScene] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [animatedIndex, setAnimatedIndex] = useState(0);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const currentSceneRef = useRef(currentScene);

  // Keep ref in sync
  useEffect(() => {
    currentSceneRef.current = currentScene;
  }, [currentScene]);

  // Animate items cycling
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedIndex(prev => (prev + 1) % 4);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  const speakText = useCallback((text: string) => {
    if (typeof window === 'undefined' || !window.speechSynthesis || isMuted) return;
    
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;
    
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(voice => 
      voice.name.includes('Google') || 
      voice.name.includes('Natural') ||
      voice.lang.startsWith('en')
    );
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }
    
    utteranceRef.current = utterance;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      if (isPlaying && currentSceneRef.current < scenes.length - 1) {
        setTimeout(() => {
          setCurrentScene(prev => prev + 1);
        }, 1500);
      }
    };
    utterance.onerror = () => setIsSpeaking(false);
    
    window.speechSynthesis.speak(utterance);
  }, [isMuted, isPlaying]);

  // Load voices
  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }
  }, []);

  // Speak when scene changes
  useEffect(() => {
    if (isPlaying) {
      speakText(scenes[currentScene].narration);
    }
    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [currentScene, isPlaying, speakText]);

  const handleNext = () => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    if (currentScene < scenes.length - 1) {
      setCurrentScene(prev => prev + 1);
    } else {
      onComplete?.();
    }
  };

  const handlePrev = () => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    if (currentScene > 0) {
      setCurrentScene(prev => prev - 1);
    }
  };

  const handleSkipIntro = () => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    onComplete?.();
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!isMuted && typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsMuted(!isMuted);
  };

  const scene = scenes[currentScene];

  return (
    <div className={`relative w-full min-h-[500px] md:min-h-[600px] rounded-2xl overflow-hidden ${className}`}>
      {/* Background */}
      <motion.div
        key={scene.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={`absolute inset-0 bg-gradient-to-br ${scene.bgGradient}`}
      />

      {/* Floating soil/nature elements background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {['🌍', '🌱', '🪨', '💧', '🌾', '🌳', '🍂', '🐛'].map((emoji, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl md:text-3xl opacity-20"
            initial={{ x: Math.random() * 100 + '%', y: '100%' }}
            animate={{ 
              y: '-10%',
              x: `${Math.random() * 100}%`,
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              delay: i * 2,
              ease: 'linear'
            }}
          >
            {emoji}
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={scene.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="text-center max-w-4xl w-full"
          >
            {/* Emoji */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", bounce: 0.5 }}
              className="text-6xl md:text-8xl mb-4"
            >
              {scene.emoji}
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl md:text-4xl font-bold text-white mb-4 drop-shadow-lg px-4"
            >
              {scene.title}
            </motion.h2>

            {/* VISUAL: Intro (scene 1) */}
            {scene.visual === 'intro' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mb-6 px-4"
              >
                <div className="bg-white/20 backdrop-blur-md rounded-xl p-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: 'spring' }}
                    className="text-5xl md:text-7xl mb-3"
                  >
                    🇬🇭
                  </motion.div>
                  <div className="flex justify-center gap-4 text-4xl mb-3">
                    {['🌾', '🌍', '🪨', '💧', '🌱'].map((emoji, i) => (
                      <motion.span
                        key={emoji}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 + i * 0.1 }}
                      >
                        {emoji}
                      </motion.span>
                    ))}
                  </div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.1 }}
                    className="bg-amber-500/40 text-white font-bold py-2 px-4 rounded-full inline-block"
                  >
                    🌱 Protecting soil = Protecting Ghana's future!
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* VISUAL: Soil Composition (scene 2) */}
            {scene.visual === 'composition' && (
              <motion.div
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{ opacity: 1, scaleY: 1 }}
                transition={{ delay: 0.3 }}
                className="mb-6 px-4"
              >
                <div className="bg-white/20 backdrop-blur-md rounded-xl p-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                    {soilComposition.map((item, i) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ 
                          opacity: 1, 
                          y: 0,
                          scale: animatedIndex === i ? 1.05 : 1,
                        }}
                        transition={{ delay: 0.4 + i * 0.1 }}
                        className="bg-white/20 rounded-lg p-3 text-center"
                        style={{ borderBottom: `3px solid ${item.color}` }}
                      >
                        <div className="text-3xl mb-1">{item.emoji}</div>
                        <div className="text-white font-bold text-2xl">{item.percent}%</div>
                        <div className="text-white/70 text-xs">{item.name}</div>
                      </motion.div>
                    ))}
                  </div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="bg-green-500/30 rounded-lg p-3"
                  >
                    <div className="text-white font-bold mb-2">🧪 NPK - Primary Nutrients</div>
                    <div className="flex flex-wrap justify-center gap-2">
                      {nutrients.map((n, i) => (
                        <motion.span
                          key={n.name}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 1 + i * 0.15 }}
                          className="bg-white/30 text-white text-xs px-3 py-1 rounded-full"
                        >
                          {n.emoji} {n.name}: {n.role}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* VISUAL: Maintenance Methods (scene 3) */}
            {scene.visual === 'maintain' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mb-6 px-4"
              >
                <div className="bg-white/20 backdrop-blur-md rounded-xl p-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {maintenanceMethods.map((method, i) => (
                      <motion.div
                        key={method.name}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ 
                          opacity: 1, 
                          x: 0,
                          scale: animatedIndex === i ? 1.08 : 1,
                        }}
                        transition={{ delay: 0.4 + i * 0.15 }}
                        className="bg-white/20 rounded-lg p-3 text-center"
                      >
                        <div className="text-4xl mb-2">{method.emoji}</div>
                        <div className="text-white font-bold text-sm">{method.name}</div>
                        <div className="text-white/70 text-xs">{method.desc}</div>
                      </motion.div>
                    ))}
                  </div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-3 text-center"
                  >
                    <span className="bg-green-500/40 text-white px-3 py-1 rounded-full text-sm">
                      ✅ Used by Ghanaian farmers for generations!
                    </span>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* VISUAL: Erosion Types (scene 4) */}
            {scene.visual === 'erosion' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mb-6 px-4"
              >
                <div className="bg-white/20 backdrop-blur-md rounded-xl p-4">
                  <div className="text-white font-bold mb-2">Water Erosion Progression:</div>
                  <div className="flex flex-col md:flex-row gap-2 mb-3">
                    {erosionTypes.map((type, i) => (
                      <motion.div
                        key={type.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ 
                          opacity: 1, 
                          y: 0,
                          scale: animatedIndex === i ? 1.08 : 1,
                        }}
                        transition={{ delay: 0.4 + i * 0.15 }}
                        className="flex-1 bg-white/20 rounded-lg p-3 text-center relative"
                      >
                        <div className="text-3xl mb-1">{type.emoji}</div>
                        <div className="text-white font-bold text-sm">{type.name}</div>
                        <div className="text-white/70 text-xs">{type.desc}</div>
                        <div className="mt-1">
                          <div className="flex justify-center gap-0.5">
                            {[...Array(type.severity)].map((_, j) => (
                              <span key={j} className="text-red-400 text-xs">⚠️</span>
                            ))}
                          </div>
                        </div>
                        {i < erosionTypes.length - 1 && (
                          <div className="hidden md:block absolute -right-3 top-1/2 transform -translate-y-1/2 text-white text-xl">→</div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="bg-amber-500/30 rounded-lg p-2 flex items-center justify-center gap-2"
                  >
                    <span className="text-2xl">💨</span>
                    <span className="text-white text-sm">Wind erosion in Northern Ghana during dry season</span>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* VISUAL: Conservation Methods (scene 5) */}
            {scene.visual === 'conservation' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mb-6 px-4"
              >
                <div className="bg-white/20 backdrop-blur-md rounded-xl p-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                    {conservationMethods.map((method, i) => (
                      <motion.div
                        key={method.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ 
                          opacity: 1, 
                          scale: animatedIndex === i ? 1.08 : 1,
                        }}
                        transition={{ delay: 0.4 + i * 0.15 }}
                        className="bg-white/20 rounded-lg p-3 text-center"
                      >
                        <div className="text-3xl mb-1">{method.emoji}</div>
                        <div className="text-white font-bold text-sm">{method.name}</div>
                        <div className="text-white/70 text-xs">{method.desc}</div>
                      </motion.div>
                    ))}
                  </div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="grid grid-cols-2 gap-2"
                  >
                    <div className="bg-yellow-500/30 rounded-lg p-2 text-center">
                      <span className="text-white text-xs">🏜️ Northern Ghana: Stone bunds, Zai pits</span>
                    </div>
                    <div className="bg-green-500/30 rounded-lg p-2 text-center">
                      <span className="text-white text-xs">🍫 Cocoa zones: Agroforestry</span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* VISUAL: Ready (scene 6) */}
            {scene.visual === 'ready' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mb-6 px-4"
              >
                <div className="bg-white/20 backdrop-blur-md rounded-xl p-4">
                  <div className="text-white font-bold mb-3">📚 What You'll Master:</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {[
                      '✅ Soil composition & nutrients',
                      '✅ Factors affecting fertility',
                      '✅ Maintenance methods',
                      '✅ Types of erosion',
                      '✅ Conservation techniques',
                      '✅ Ghana-specific practices',
                    ].map((item, i) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + i * 0.1 }}
                        className="bg-white/20 rounded-lg p-2 text-white text-sm text-left"
                      >
                        {item}
                      </motion.div>
                    ))}
                  </div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-3 bg-amber-500/40 rounded-lg p-2"
                  >
                    <span className="text-white text-sm">⏰ Remember: 1 cm of soil = 200-1000 years to form!</span>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* Narration text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-white/90 text-sm md:text-lg px-4 max-w-2xl mx-auto leading-relaxed"
            >
              {scene.narration}
            </motion.p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress bar */}
      <div className="absolute top-4 left-4 right-16 flex gap-1 pointer-events-none">
        {scenes.map((_, index) => (
          <div
            key={index}
            className={`h-1 flex-1 rounded-full transition-all duration-300 ${
              index <= currentScene ? 'bg-white' : 'bg-white/30'
            }`}
          />
        ))}
      </div>

      {/* Skip Intro Button - Top Right */}
      <Button
        onClick={(e) => { e.stopPropagation(); handleSkipIntro(); }}
        variant="ghost"
        className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 active:bg-white/40 text-white rounded-full px-3 py-1 text-sm z-50 touch-manipulation select-none"
      >
        Skip Intro <X className="ml-1 h-4 w-4" />
      </Button>

      {/* Controls */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-50">
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => { e.stopPropagation(); togglePlayPause(); }}
            className="bg-white/20 hover:bg-white/30 active:bg-white/40 text-white rounded-full touch-manipulation select-none"
          >
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => { e.stopPropagation(); toggleMute(); }}
            className="bg-white/20 hover:bg-white/30 active:bg-white/40 text-white rounded-full touch-manipulation select-none"
          >
            {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </Button>
        </div>

        <div className="flex items-center gap-2">
          {/* Prev Button */}
          <Button
            onClick={(e) => { e.stopPropagation(); handlePrev(); }}
            disabled={currentScene === 0}
            className="bg-white/20 hover:bg-white/30 active:bg-white/40 text-white rounded-full px-3 disabled:opacity-40 disabled:cursor-not-allowed touch-manipulation select-none"
          >
            <SkipBack className="mr-1 h-4 w-4" /> Prev
          </Button>
          
          <span className="text-white/80 text-sm min-w-[50px] text-center select-none">
            {currentScene + 1} / {scenes.length}
          </span>
          
          {/* Next Button */}
          <Button
            onClick={(e) => { e.stopPropagation(); handleNext(); }}
            className="bg-white/20 hover:bg-white/30 active:bg-white/40 text-white rounded-full px-3 touch-manipulation select-none"
          >
            {currentScene < scenes.length - 1 ? (
              <>
                Next <SkipForward className="ml-1 h-4 w-4" />
              </>
            ) : (
              <>
                Start Learning <ChevronRight className="ml-1 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Speaking indicator */}
      {isSpeaking && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute top-12 right-4 flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 pointer-events-none"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
            className="w-2 h-2 bg-green-400 rounded-full"
          />
          <span className="text-white text-xs">Speaking...</span>
        </motion.div>
      )}
    </div>
  );
}
