'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, ChevronRight, X } from 'lucide-react';

interface CropAnimalProductionIntroProps {
  onComplete?: () => void;
  className?: string;
}

const scenes = [
  {
    id: 1,
    title: "Agriculture: The Backbone of Ghana!",
    narration: "Welcome to the world of agriculture! Did you know that over fifty percent of Ghanaians work in farming? From the cocoa that makes Ghana world-famous to the maize that becomes your banku, agriculture feeds our nation and earns foreign exchange. Today, you'll discover how crops and animals are produced - knowledge that could change your future!",
    bgGradient: "from-green-600 via-emerald-500 to-teal-500",
    emoji: "🌾",
    visual: 'intro',
  },
  {
    id: 2,
    title: "Types of Crops We Grow",
    narration: "Crops are classified by their uses! Cereals like maize, rice, and millet give us energy. Legumes like groundnuts and cowpea provide protein and fix nitrogen in the soil. Root crops like cassava and yam store carbohydrates underground. Cash crops like cocoa earn billions in exports - Ghana is the world's second-largest cocoa producer! Each crop has its role in feeding Ghana.",
    bgGradient: "from-yellow-500 via-amber-500 to-orange-500",
    emoji: "🌱",
    visual: 'crops',
  },
  {
    id: 3,
    title: "Farming Systems in Ghana",
    narration: "How do we farm? Subsistence farmers grow food for their families on small plots using cutlass and hoe. Commercial farmers use tractors and machines on large plantations for profit - think of Ghana's cocoa and pineapple estates! Mixed farming combines crops and animals - the animals eat crop waste and their manure fertilizes the crops. Smart farming!",
    bgGradient: "from-lime-500 via-green-500 to-emerald-500",
    emoji: "🚜",
    visual: 'systems',
  },
  {
    id: 4,
    title: "Our Farm Animals",
    narration: "Farm animals are grouped by their stomachs! Ruminants like cattle, goats, and sheep have FOUR stomach compartments. They chew cud and can digest grass and hay. Non-ruminants like pigs and chickens have simple stomachs like us. Animals give us meat, milk, eggs, hides for leather, and manure for fertilizer. Even their bones become animal feed!",
    bgGradient: "from-amber-500 via-orange-500 to-red-400",
    emoji: "🐄",
    visual: 'animals',
  },
  {
    id: 5,
    title: "Success Factors & Sustainability",
    narration: "What makes farming successful? Climate and rainfall must be right. Soil needs proper nutrients and pH. Pests and diseases must be controlled. Farmers need capital, market access, and government support. Sustainable agriculture protects our future through crop rotation, composting, and agroforestry - growing trees with crops. We must farm wisely for generations to come!",
    bgGradient: "from-teal-500 via-cyan-500 to-blue-500",
    emoji: "♻️",
    visual: 'factors',
  },
  {
    id: 6,
    title: "Ready to Become an Agriculture Expert!",
    narration: "Now you understand why agriculture matters to Ghana! You'll learn to classify crops and animals, compare farming systems, master cultural practices from planting to harvesting, and appreciate sustainable farming. Whether you become a farmer, scientist, or entrepreneur - this knowledge will serve you. Let's explore the amazing world of crop and animal production!",
    bgGradient: "from-purple-500 via-indigo-500 to-blue-600",
    emoji: "🎓",
    visual: 'ready',
  },
];

// Crop data for visualization
const cropTypes = [
  { category: 'Cereals', emoji: '🌾', examples: ['Maize', 'Rice', 'Millet'], color: '#eab308' },
  { category: 'Legumes', emoji: '🫘', examples: ['Groundnuts', 'Cowpea', 'Soybeans'], color: '#84cc16' },
  { category: 'Root/Tubers', emoji: '🥔', examples: ['Cassava', 'Yam', 'Cocoyam'], color: '#f97316' },
  { category: 'Cash Crops', emoji: '🍫', examples: ['Cocoa', 'Coffee', 'Oil Palm'], color: '#a855f7' },
];

// Animal data for visualization
const animalTypes = [
  { category: 'Ruminants', emoji: '🐄', examples: ['Cattle', 'Goats', 'Sheep'], stomachs: 4, color: '#f59e0b' },
  { category: 'Non-Ruminants', emoji: '🐷', examples: ['Pigs', 'Rabbits'], stomachs: 1, color: '#ec4899' },
  { category: 'Poultry', emoji: '🐔', examples: ['Chickens', 'Ducks', 'Guinea fowl'], stomachs: 1, color: '#ef4444' },
  { category: 'Aquatic', emoji: '🐟', examples: ['Tilapia', 'Catfish'], stomachs: 1, color: '#06b6d4' },
];

// Farming systems data
const farmingSystems = [
  { name: 'Subsistence', emoji: '🏠', desc: 'Family food', tools: 'Cutlass, hoe', color: '#22c55e' },
  { name: 'Commercial', emoji: '🏭', desc: 'Profit-oriented', tools: 'Tractors, machines', color: '#3b82f6' },
  { name: 'Mixed', emoji: '🔄', desc: 'Crops + Animals', tools: 'Both methods', color: '#a855f7' },
];

export default function CropAnimalProductionIntro({ onComplete, className }: CropAnimalProductionIntroProps) {
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

      {/* Floating farm elements background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {['🌾', '🌽', '🥕', '🍅', '🐄', '🐔', '🌻', '🥬'].map((emoji, i) => (
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

            {/* VISUAL: Crop Types (scene 2) */}
            {scene.visual === 'crops' && (
              <motion.div
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{ opacity: 1, scaleY: 1 }}
                transition={{ delay: 0.3 }}
                className="mb-6 px-4"
              >
                <div className="bg-white/20 backdrop-blur-md rounded-xl p-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {cropTypes.map((crop, i) => (
                      <motion.div
                        key={crop.category}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ 
                          opacity: 1, 
                          y: 0,
                          scale: animatedIndex === i ? 1.05 : 1,
                        }}
                        transition={{ delay: 0.4 + i * 0.1 }}
                        className="bg-white/20 rounded-lg p-3 text-center"
                        style={{ borderBottom: `3px solid ${crop.color}` }}
                      >
                        <div className="text-3xl mb-1">{crop.emoji}</div>
                        <div className="text-white font-bold text-sm">{crop.category}</div>
                        <div className="text-white/70 text-xs">{crop.examples.join(', ')}</div>
                      </motion.div>
                    ))}
                  </div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-3 text-center"
                  >
                    <span className="bg-yellow-500/30 text-white px-3 py-1 rounded-full text-sm">
                      🏆 Ghana = World's #2 Cocoa Producer!
                    </span>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* VISUAL: Farming Systems (scene 3) */}
            {scene.visual === 'systems' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mb-6 px-4"
              >
                <div className="bg-white/20 backdrop-blur-md rounded-xl p-4">
                  <div className="flex flex-col md:flex-row gap-3 justify-center">
                    {farmingSystems.map((system, i) => (
                      <motion.div
                        key={system.name}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ 
                          opacity: 1, 
                          x: 0,
                          scale: animatedIndex % 3 === i ? 1.05 : 1,
                        }}
                        transition={{ delay: 0.4 + i * 0.2 }}
                        className="bg-white/20 rounded-lg p-4 flex-1 text-center"
                        style={{ borderLeft: `4px solid ${system.color}` }}
                      >
                        <div className="text-4xl mb-2">{system.emoji}</div>
                        <div className="text-white font-bold">{system.name}</div>
                        <div className="text-white/70 text-sm">{system.desc}</div>
                        <div className="text-white/50 text-xs mt-1">🔧 {system.tools}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* VISUAL: Farm Animals (scene 4) */}
            {scene.visual === 'animals' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mb-6 px-4"
              >
                <div className="bg-white/20 backdrop-blur-md rounded-xl p-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {animalTypes.map((animal, i) => (
                      <motion.div
                        key={animal.category}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ 
                          opacity: 1, 
                          scale: animatedIndex === i ? 1.08 : 1,
                        }}
                        transition={{ delay: 0.4 + i * 0.15 }}
                        className="bg-white/20 rounded-lg p-3 text-center"
                        style={{ borderTop: `3px solid ${animal.color}` }}
                      >
                        <div className="text-3xl mb-1">{animal.emoji}</div>
                        <div className="text-white font-bold text-sm">{animal.category}</div>
                        <div className="text-white/70 text-xs">{animal.examples.join(', ')}</div>
                        <div className="mt-1">
                          <span className="bg-white/30 text-white text-xs px-2 py-0.5 rounded-full">
                            {animal.stomachs === 4 ? '4 stomachs 🔄' : '1 stomach'}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-3 grid grid-cols-4 gap-2 text-center"
                  >
                    {['🥩 Meat', '🥛 Milk', '🥚 Eggs', '👜 Hides'].map((product, i) => (
                      <motion.span
                        key={product}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.1 + i * 0.1 }}
                        className="bg-white/20 text-white text-xs py-1 rounded"
                      >
                        {product}
                      </motion.span>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* VISUAL: Success Factors (scene 5) */}
            {scene.visual === 'factors' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mb-6 px-4"
              >
                <div className="bg-white/20 backdrop-blur-md rounded-xl p-4">
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    {[
                      { icon: '🌧️', label: 'Climate & Rainfall' },
                      { icon: '🌍', label: 'Soil Fertility' },
                      { icon: '🐛', label: 'Pest Control' },
                      { icon: '💰', label: 'Capital & Markets' },
                    ].map((factor, i) => (
                      <motion.div
                        key={factor.label}
                        initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + i * 0.1 }}
                        className="bg-white/20 rounded-lg p-2 flex items-center gap-2"
                      >
                        <span className="text-2xl">{factor.icon}</span>
                        <span className="text-white text-sm">{factor.label}</span>
                      </motion.div>
                    ))}
                  </div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="bg-green-500/30 rounded-lg p-3"
                  >
                    <div className="text-white font-bold mb-1">♻️ Sustainable Practices</div>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {['Crop Rotation', 'Composting', 'Agroforestry', 'IPM'].map((practice, i) => (
                        <motion.span
                          key={practice}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1 + i * 0.1 }}
                          className="bg-white/30 text-white text-xs px-2 py-1 rounded"
                        >
                          {practice}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}

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
                    {['🌽', '🥬', '🐄', '🐔', '🍫'].map((emoji, i) => (
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
                    className="bg-green-500/40 text-white font-bold py-2 px-4 rounded-full inline-block"
                  >
                    50%+ of Ghana works in Agriculture!
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
                      '✅ Classify crops by use & life cycle',
                      '✅ Compare farming systems',
                      '✅ Explain cultural practices',
                      '✅ Describe animal husbandry',
                      '✅ Understand sustainability',
                      '✅ Apply to real Ghana farming',
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
