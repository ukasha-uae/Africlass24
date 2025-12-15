'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, ChevronRight, X } from 'lucide-react';

interface SoilCompositionIntroProps {
  onComplete?: () => void;
  className?: string;
}

const scenes = [
  {
    id: 1,
    title: "What's Beneath Our Feet?",
    narration: "Look down at the ground - soil isn't just dirt! It's a complex mixture that took thousands of years to form. Every handful contains billions of organisms and the key to growing food for Ghana's thirty million people. Today, you'll discover what soil is really made of and why it's so important!",
    bgGradient: "from-amber-700 via-yellow-600 to-orange-600",
    emoji: "🌍",
    visual: 'intro',
  },
  {
    id: 2,
    title: "The Four Ingredients of Soil",
    narration: "Soil has four main components - think of it as a recipe! Mineral matter from broken down rocks makes up forty-five percent. Water fills twenty-five percent of the spaces. Air takes another twenty-five percent. And the magic ingredient - organic matter - is just five percent but makes all the difference for fertility!",
    bgGradient: "from-amber-600 via-orange-500 to-red-500",
    emoji: "🧪",
    visual: 'composition',
  },
  {
    id: 3,
    title: "Sand, Silt, and Clay",
    narration: "The mineral part of soil comes in three sizes. Sand grains are the largest - you can see them! Silt particles are smaller and feel smooth. Clay is so tiny you need a microscope! The perfect mix is called loam - the best soil for farming. Ghana's forest zones have excellent loamy soils for crops like cocoa and maize.",
    bgGradient: "from-yellow-600 via-amber-500 to-orange-500",
    emoji: "🪨",
    visual: 'particles',
  },
  {
    id: 4,
    title: "The Living Soil",
    narration: "Soil is ALIVE! In one teaspoon of healthy soil, there are more microorganisms than people on Earth! Bacteria break down dead material. Fungi help plant roots absorb nutrients. Earthworms mix and aerate the soil. These tiny workers are essential for keeping soil fertile and healthy.",
    bgGradient: "from-green-600 via-emerald-500 to-teal-500",
    emoji: "🐛",
    visual: 'organisms',
  },
  {
    id: 5,
    title: "Soil Layers: The Profile",
    narration: "If you dig deep, you'll see soil forms layers called horizons. The topsoil or A horizon is dark and rich - most roots grow here. Below is the subsoil or B horizon. Deeper still is the C horizon of weathered rock, then solid bedrock. The topsoil took hundreds of years to form - we must protect it!",
    bgGradient: "from-stone-600 via-amber-600 to-yellow-600",
    emoji: "🏔️",
    visual: 'profile',
  },
  {
    id: 6,
    title: "Ready to Explore Soil Science!",
    narration: "Now you understand that soil is much more than dirt! You'll learn about the components that make soil fertile, how different soil types affect farming, the amazing creatures living underground, and why protecting topsoil is critical for Ghana's agriculture. Let's dig into soil science!",
    bgGradient: "from-purple-600 via-indigo-500 to-blue-600",
    emoji: "🎓",
    visual: 'ready',
  },
];

const soilComponents = [
  { name: 'Mineral Matter', percent: 45, color: '#d97706', emoji: '🪨' },
  { name: 'Water', percent: 25, color: '#0ea5e9', emoji: '💧' },
  { name: 'Air', percent: 25, color: '#a3e635', emoji: '💨' },
  { name: 'Organic Matter', percent: 5, color: '#7c3aed', emoji: '🍂' },
];

const particles = [
  { name: 'Sand', size: 'Large', feel: 'Gritty', color: '#fbbf24' },
  { name: 'Silt', size: 'Medium', feel: 'Smooth', color: '#a78bfa' },
  { name: 'Clay', size: 'Tiny', feel: 'Sticky', color: '#f87171' },
];

const organisms = [
  { name: 'Bacteria', emoji: '🦠', role: 'Decompose matter' },
  { name: 'Fungi', emoji: '🍄', role: 'Help roots absorb' },
  { name: 'Earthworms', emoji: '🪱', role: 'Mix & aerate' },
  { name: 'Insects', emoji: '🐜', role: 'Break down debris' },
];

export default function SoilCompositionIntro({ onComplete, className }: SoilCompositionIntroProps) {
  const [currentScene, setCurrentScene] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [animatedIndex, setAnimatedIndex] = useState(0);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const currentSceneRef = useRef(currentScene);

  useEffect(() => {
    currentSceneRef.current = currentScene;
  }, [currentScene]);

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
      voice.name.includes('Google') || voice.name.includes('Natural') || voice.lang.startsWith('en')
    );
    if (preferredVoice) utterance.voice = preferredVoice;
    utteranceRef.current = utterance;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      if (isPlaying && currentSceneRef.current < scenes.length - 1) {
        setTimeout(() => setCurrentScene(prev => prev + 1), 1500);
      }
    };
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  }, [isMuted, isPlaying]);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
    }
  }, []);

  useEffect(() => {
    if (isPlaying) speakText(scenes[currentScene].narration);
    return () => { if (typeof window !== 'undefined' && window.speechSynthesis) window.speechSynthesis.cancel(); };
  }, [currentScene, isPlaying, speakText]);

  const handleNext = () => {
    if (typeof window !== 'undefined' && window.speechSynthesis) window.speechSynthesis.cancel();
    if (currentScene < scenes.length - 1) setCurrentScene(prev => prev + 1);
    else onComplete?.();
  };

  const handlePrev = () => {
    if (typeof window !== 'undefined' && window.speechSynthesis) window.speechSynthesis.cancel();
    if (currentScene > 0) setCurrentScene(prev => prev - 1);
  };

  const handleSkipIntro = () => {
    if (typeof window !== 'undefined' && window.speechSynthesis) window.speechSynthesis.cancel();
    onComplete?.();
  };

  const togglePlayPause = () => {
    if (isPlaying && typeof window !== 'undefined' && window.speechSynthesis) window.speechSynthesis.cancel();
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!isMuted && typeof window !== 'undefined' && window.speechSynthesis) window.speechSynthesis.cancel();
    setIsMuted(!isMuted);
  };

  const scene = scenes[currentScene];

  return (
    <div className={`relative w-full min-h-[500px] md:min-h-[600px] rounded-2xl overflow-hidden ${className}`}>
      <motion.div key={scene.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`absolute inset-0 bg-gradient-to-br ${scene.bgGradient}`} />
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {['🪨', '🌱', '💧', '🐛', '🍂', '🌍', '🦠', '🪱'].map((emoji, i) => (
          <motion.div key={i} className="absolute text-2xl md:text-3xl opacity-20"
            initial={{ x: Math.random() * 100 + '%', y: '100%' }}
            animate={{ y: '-10%', x: `${Math.random() * 100}%` }}
            transition={{ duration: 15 + Math.random() * 10, repeat: Infinity, delay: i * 2, ease: 'linear' }}>
            {emoji}
          </motion.div>
        ))}
      </div>

      <div className="absolute inset-0 flex items-center justify-center p-4">
        <AnimatePresence mode="wait">
          <motion.div key={scene.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} className="text-center max-w-4xl w-full">
            <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", bounce: 0.5 }} className="text-6xl md:text-8xl mb-4">{scene.emoji}</motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-2xl md:text-4xl font-bold text-white mb-4 drop-shadow-lg px-4">{scene.title}</motion.h2>

            {scene.visual === 'intro' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mb-6 px-4">
                <div className="bg-white/20 backdrop-blur-md rounded-xl p-4">
                  <div className="flex justify-center gap-4 text-4xl mb-3">
                    {['🌍', '🪨', '💧', '💨', '🍂'].map((emoji, i) => (
                      <motion.span key={emoji} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.1 }}>{emoji}</motion.span>
                    ))}
                  </div>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="bg-amber-500/40 text-white font-bold py-2 px-4 rounded-full inline-block">
                    🌱 Soil = Foundation of Agriculture!
                  </motion.div>
                </div>
              </motion.div>
            )}

            {scene.visual === 'composition' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mb-6 px-4">
                <div className="bg-white/20 backdrop-blur-md rounded-xl p-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {soilComponents.map((item, i) => (
                      <motion.div key={item.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, scale: animatedIndex === i ? 1.05 : 1 }} transition={{ delay: 0.4 + i * 0.1 }}
                        className="bg-white/20 rounded-lg p-3 text-center" style={{ borderBottom: `3px solid ${item.color}` }}>
                        <div className="text-3xl mb-1">{item.emoji}</div>
                        <div className="text-white font-bold text-2xl">{item.percent}%</div>
                        <div className="text-white/70 text-xs">{item.name}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {scene.visual === 'particles' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mb-6 px-4">
                <div className="bg-white/20 backdrop-blur-md rounded-xl p-4">
                  <div className="flex flex-col md:flex-row gap-3 justify-center">
                    {particles.map((p, i) => (
                      <motion.div key={p.name} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0, scale: animatedIndex % 3 === i ? 1.05 : 1 }} transition={{ delay: 0.4 + i * 0.15 }}
                        className="bg-white/20 rounded-lg p-4 flex-1 text-center" style={{ borderTop: `4px solid ${p.color}` }}>
                        <div className="text-white font-bold text-lg">{p.name}</div>
                        <div className="text-white/70 text-sm">Size: {p.size}</div>
                        <div className="text-white/70 text-sm">Feel: {p.feel}</div>
                      </motion.div>
                    ))}
                  </div>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="mt-3 text-center">
                    <span className="bg-green-500/40 text-white px-3 py-1 rounded-full text-sm">🌾 Best Mix = LOAM (for most crops)</span>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {scene.visual === 'organisms' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mb-6 px-4">
                <div className="bg-white/20 backdrop-blur-md rounded-xl p-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {organisms.map((org, i) => (
                      <motion.div key={org.name} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: animatedIndex === i ? 1.08 : 1 }} transition={{ delay: 0.4 + i * 0.15 }}
                        className="bg-white/20 rounded-lg p-3 text-center">
                        <div className="text-4xl mb-2">{org.emoji}</div>
                        <div className="text-white font-bold text-sm">{org.name}</div>
                        <div className="text-white/70 text-xs">{org.role}</div>
                      </motion.div>
                    ))}
                  </div>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="mt-3 bg-teal-500/30 rounded-lg p-2">
                    <span className="text-white text-sm">🦠 1 teaspoon of soil = billions of organisms!</span>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {scene.visual === 'profile' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mb-6 px-4">
                <div className="bg-white/20 backdrop-blur-md rounded-xl p-4">
                  <div className="flex flex-col gap-2">
                    {[
                      { layer: 'O - Organic', desc: 'Leaves & debris', color: '#15803d' },
                      { layer: 'A - Topsoil', desc: 'Dark, rich, roots grow here', color: '#78350f' },
                      { layer: 'B - Subsoil', desc: 'Leached minerals', color: '#b45309' },
                      { layer: 'C - Parent Material', desc: 'Weathered rock', color: '#a8a29e' },
                    ].map((h, i) => (
                      <motion.div key={h.layer} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.15 }}
                        className="flex items-center gap-3 p-2 rounded-lg" style={{ backgroundColor: h.color + '60' }}>
                        <div className="w-8 h-8 rounded" style={{ backgroundColor: h.color }}></div>
                        <div className="text-left">
                          <div className="text-white font-bold text-sm">{h.layer}</div>
                          <div className="text-white/70 text-xs">{h.desc}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {scene.visual === 'ready' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mb-6 px-4">
                <div className="bg-white/20 backdrop-blur-md rounded-xl p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {['✅ Soil components & functions', '✅ Sand, silt, clay differences', '✅ Soil organisms & their roles', '✅ Soil profile & horizons', '✅ Importance for agriculture', '✅ Ghana\'s soil types'].map((item, i) => (
                      <motion.div key={item} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.1 }}
                        className="bg-white/20 rounded-lg p-2 text-white text-sm text-left">{item}</motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-white/90 text-sm md:text-lg px-4 max-w-2xl mx-auto leading-relaxed">{scene.narration}</motion.p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute top-4 left-4 right-16 flex gap-1 pointer-events-none">
        {scenes.map((_, index) => (<div key={index} className={`h-1 flex-1 rounded-full transition-all duration-300 ${index <= currentScene ? 'bg-white' : 'bg-white/30'}`} />))}
      </div>

      <Button onClick={(e) => { e.stopPropagation(); handleSkipIntro(); }} variant="ghost" className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white rounded-full px-3 py-1 text-sm z-50">Skip Intro <X className="ml-1 h-4 w-4" /></Button>

      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-50">
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); togglePlayPause(); }} className="bg-white/20 hover:bg-white/30 text-white rounded-full">{isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}</Button>
          <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); toggleMute(); }} className="bg-white/20 hover:bg-white/30 text-white rounded-full">{isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}</Button>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={(e) => { e.stopPropagation(); handlePrev(); }} disabled={currentScene === 0} className="bg-white/20 hover:bg-white/30 text-white rounded-full px-3 disabled:opacity-40"><SkipBack className="mr-1 h-4 w-4" /> Prev</Button>
          <span className="text-white/80 text-sm min-w-[50px] text-center">{currentScene + 1} / {scenes.length}</span>
          <Button onClick={(e) => { e.stopPropagation(); handleNext(); }} className="bg-white/20 hover:bg-white/30 text-white rounded-full px-3">
            {currentScene < scenes.length - 1 ? (<>Next <SkipForward className="ml-1 h-4 w-4" /></>) : (<>Start Learning <ChevronRight className="ml-1 h-4 w-4" /></>)}
          </Button>
        </div>
      </div>

      {isSpeaking && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute top-12 right-4 flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 pointer-events-none">
          <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="w-2 h-2 bg-green-400 rounded-full" />
          <span className="text-white text-xs">Speaking...</span>
        </motion.div>
      )}
    </div>
  );
}
