'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, ChevronRight, X } from 'lucide-react';

interface PHScaleIntroProps {
  onComplete?: () => void;
  className?: string;
}

const scenes = [
  {
    id: 1,
    title: "Measuring the Power of Acids & Bases",
    narration: "Imagine you have lemon juice and battery acid. Both are acidic, but how do we know which is stronger? How MUCH stronger? The answer is the pH scale! pH tells us exactly how acidic or basic any substance is, using numbers from zero to fourteen. Today, you'll master this powerful tool that chemists, doctors, and farmers use every day!",
    bgGradient: "from-red-500 via-yellow-500 to-blue-500",
    emoji: "🔬",
    phValue: null,
  },
  {
    id: 2,
    title: "What Does pH Mean?",
    narration: "pH stands for 'potential of Hydrogen' or 'power of Hydrogen.' It measures how many hydrogen ions are in a solution. More hydrogen ions means a lower pH and stronger acid. Fewer hydrogen ions means a higher pH and a more basic solution. The formula is pH equals negative log of the hydrogen ion concentration. Don't worry - we'll make it simple!",
    bgGradient: "from-violet-500 via-purple-500 to-indigo-500",
    emoji: "⚗️",
    phValue: null,
  },
  {
    id: 3,
    title: "The Magic Scale: 0 to 14",
    narration: "The pH scale runs from zero to fourteen. Zero to six is acidic - the lower the number, the stronger the acid. Seven is neutral, like pure water. Eight to fourteen is basic or alkaline - the higher the number, the stronger the base. Battery acid is pH zero. Drain cleaner is pH fourteen. Your blood? It must stay at exactly seven point four to keep you alive!",
    bgGradient: "from-red-500 via-green-500 to-blue-500",
    emoji: "📊",
    phValue: 7,
  },
  {
    id: 4,
    title: "The 10× Secret!",
    narration: "Here's the amazing part - the pH scale is logarithmic! Each number is ten times different from the next. So pH three is not just a little more acidic than pH four - it's TEN times more acidic! pH two is one hundred times more acidic than pH four. pH one is a thousand times more acidic! This is why even small changes in pH can have huge effects.",
    bgGradient: "from-orange-500 via-red-500 to-pink-500",
    emoji: "⚡",
    phValue: null,
  },
  {
    id: 5,
    title: "Colors Tell the Story",
    narration: "How do we find pH? With indicators! Litmus paper turns red in acid and blue in base. Universal indicator shows a rainbow - red for strong acids, through orange, yellow, green for neutral, then blue and purple for bases. In Ghana, you can even use hibiscus flowers from sobolo! They turn red in acid and blue-green in base. Chemistry is everywhere!",
    bgGradient: "from-red-400 via-yellow-400 to-blue-400",
    emoji: "🎨",
    phValue: null,
  },
  {
    id: 6,
    title: "Ready to Master pH!",
    narration: "Now you understand the pH scale - from the acid in your sobolo to the base in your soap! You know that each pH unit means a ten times difference. You can use indicators to test any substance. Get ready to learn calculations, explore body pH, and see how Ghanaian farmers use pH to grow better crops. Let's become pH experts together!",
    bgGradient: "from-emerald-400 via-teal-500 to-cyan-500",
    emoji: "🎓",
    phValue: null,
  },
];

// pH scale colors
const phColors = [
  '#ef4444', // 0 - red
  '#f97316', // 1 - orange-red
  '#fb923c', // 2 - orange
  '#fbbf24', // 3 - yellow-orange
  '#facc15', // 4 - yellow
  '#a3e635', // 5 - yellow-green
  '#4ade80', // 6 - light green
  '#22c55e', // 7 - green (neutral)
  '#14b8a6', // 8 - teal
  '#06b6d4', // 9 - cyan
  '#0ea5e9', // 10 - light blue
  '#3b82f6', // 11 - blue
  '#6366f1', // 12 - indigo
  '#8b5cf6', // 13 - violet
  '#a855f7', // 14 - purple
];

const substances = [
  { name: 'Battery acid', ph: 0 },
  { name: 'Stomach acid', ph: 1.5 },
  { name: 'Lemon juice', ph: 2 },
  { name: 'Sobolo', ph: 2.5 },
  { name: 'Vinegar', ph: 3 },
  { name: 'Orange juice', ph: 3.5 },
  { name: 'Coffee', ph: 5 },
  { name: 'Milk', ph: 6.5 },
  { name: 'Pure water', ph: 7 },
  { name: 'Blood', ph: 7.4 },
  { name: 'Seawater', ph: 8 },
  { name: 'Baking soda', ph: 8.5 },
  { name: 'Soap', ph: 10 },
  { name: 'Bleach', ph: 12.5 },
  { name: 'Drain cleaner', ph: 14 },
];

export default function PHScaleIntro({ onComplete, className }: PHScaleIntroProps) {
  const [currentScene, setCurrentScene] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [highlightedPH, setHighlightedPH] = useState<number | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const currentSceneRef = useRef(currentScene);

  // Keep ref in sync
  useEffect(() => {
    currentSceneRef.current = currentScene;
  }, [currentScene]);

  // Animate pH highlighting
  useEffect(() => {
    if (currentScene === 2) { // pH scale scene
      const interval = setInterval(() => {
        setHighlightedPH(prev => {
          if (prev === null) return 0;
          if (prev >= 14) return 0;
          return prev + 1;
        });
      }, 500);
      return () => clearInterval(interval);
    } else {
      setHighlightedPH(null);
    }
  }, [currentScene]);

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

      {/* pH Scale Visualization */}
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
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
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

            {/* pH Scale Visual (only on scale scene) */}
            {currentScene === 2 && (
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="mb-6 px-4"
              >
                <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 md:p-6">
                  {/* pH Scale Bar */}
                  <div className="flex rounded-lg overflow-hidden h-12 md:h-16 mb-2">
                    {phColors.map((color, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0.5 }}
                        animate={{ 
                          opacity: highlightedPH === index ? 1 : 0.7,
                          scale: highlightedPH === index ? 1.1 : 1,
                        }}
                        className="flex-1 flex items-center justify-center text-white font-bold text-sm md:text-lg"
                        style={{ backgroundColor: color }}
                      >
                        {index}
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Labels */}
                  <div className="flex justify-between text-white text-sm md:text-base font-semibold mt-2">
                    <span className="text-red-200">← ACIDIC</span>
                    <span className="text-green-200">NEUTRAL</span>
                    <span className="text-blue-200">BASIC →</span>
                  </div>

                  {/* Substance markers */}
                  <div className="mt-4 flex flex-wrap gap-2 justify-center">
                    {substances.filter((_, i) => i % 3 === 0).map((sub, i) => (
                      <motion.div
                        key={sub.name}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                        className="bg-white/30 backdrop-blur-sm rounded-full px-3 py-1 text-white text-xs md:text-sm"
                      >
                        {sub.name}: pH {sub.ph}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* 10x Visual (only on logarithmic scene) */}
            {currentScene === 3 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mb-6 px-4"
              >
                <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 md:p-6">
                  <div className="space-y-3">
                    {[
                      { from: 'pH 6', to: 'pH 5', times: '10×' },
                      { from: 'pH 6', to: 'pH 4', times: '100×' },
                      { from: 'pH 6', to: 'pH 3', times: '1,000×' },
                      { from: 'pH 6', to: 'pH 2', times: '10,000×' },
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4 + i * 0.2 }}
                        className="flex items-center justify-center gap-4 text-white"
                      >
                        <span className="bg-green-500/50 px-3 py-1 rounded">{item.from}</span>
                        <span className="text-2xl">→</span>
                        <span className="bg-red-500/50 px-3 py-1 rounded">{item.to}</span>
                        <span className="bg-yellow-500/50 px-3 py-1 rounded font-bold">{item.times} more acidic!</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Indicators Visual (only on indicators scene) */}
            {currentScene === 4 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mb-6 px-4"
              >
                <div className="bg-white/20 backdrop-blur-md rounded-xl p-4">
                  <div className="grid grid-cols-3 gap-4">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.4 }}
                      className="text-center"
                    >
                      <div className="text-4xl mb-2">🔴</div>
                      <div className="text-white text-sm">Litmus in ACID</div>
                    </motion.div>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.6 }}
                      className="text-center"
                    >
                      <div className="text-4xl mb-2">🟢</div>
                      <div className="text-white text-sm">Universal at pH 7</div>
                    </motion.div>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.8 }}
                      className="text-center"
                    >
                      <div className="text-4xl mb-2">🔵</div>
                      <div className="text-white text-sm">Litmus in BASE</div>
                    </motion.div>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="mt-4 text-center"
                  >
                    <div className="text-3xl mb-1">🌺</div>
                    <div className="text-white text-sm">Hibiscus (Sobolo) - Natural indicator!</div>
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
