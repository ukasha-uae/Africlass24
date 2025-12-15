'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, ChevronRight, X } from 'lucide-react';

interface ElementsCompoundsIntroProps {
  onComplete?: () => void;
  className?: string;
}

const scenes = [
  {
    id: 1,
    title: "The Building Blocks of Everything!",
    narration: "Look around you - the air you breathe, the water you drink, the gold in jewelry, even your own body! Everything is made of matter. But what is matter made of? Today, you'll discover elements, compounds, and mixtures - the building blocks of our entire universe!",
    bgGradient: "from-indigo-600 via-purple-600 to-pink-600",
    emoji: "⚛️",
    visual: 'intro',
  },
  {
    id: 2,
    title: "Elements: The Simplest Substances",
    narration: "Elements are pure substances made of only ONE type of atom. They cannot be broken down further by chemical means. There are one hundred eighteen known elements! Gold, oxygen, carbon, iron - each has unique properties. Some are metals that conduct electricity, others are gases we breathe!",
    bgGradient: "from-yellow-500 via-amber-500 to-orange-500",
    emoji: "Au",
    visual: 'elements',
  },
  {
    id: 3,
    title: "Compounds: Elements Combined",
    narration: "When elements chemically bond together, they form compounds with completely NEW properties! Water is hydrogen and oxygen combined - two gases become a life-giving liquid! Table salt combines explosive sodium with poisonous chlorine to make something we eat every day. Chemistry is amazing!",
    bgGradient: "from-blue-500 via-cyan-500 to-teal-500",
    emoji: "H₂O",
    visual: 'compounds',
  },
  {
    id: 4,
    title: "Mixtures: Physical Combinations",
    narration: "Mixtures are different - substances are physically combined, not chemically bonded. Air is a mixture of nitrogen, oxygen, and other gases. Salt water is salt dissolved in water. The components keep their properties and can be separated by physical methods like filtering or evaporating!",
    bgGradient: "from-green-500 via-emerald-500 to-teal-500",
    emoji: "🧪",
    visual: 'mixtures',
  },
  {
    id: 5,
    title: "Separating Mixtures",
    narration: "We can separate mixtures using physical methods! Filter sand from water. Evaporate water to get salt crystals. Use a magnet to pull iron from sand. Distill sea water to get pure water. These techniques are used every day - from water treatment plants to gold mining in Ghana!",
    bgGradient: "from-orange-500 via-red-500 to-pink-500",
    emoji: "🔬",
    visual: 'separation',
  },
  {
    id: 6,
    title: "Ready to Classify Matter!",
    narration: "Now you're ready to explore the building blocks of matter! You'll learn to identify elements by their symbols, understand how compounds form, distinguish mixtures from compounds, and master separation techniques. This knowledge is fundamental to all of chemistry. Let's begin!",
    bgGradient: "from-purple-600 via-violet-500 to-indigo-600",
    emoji: "🎓",
    visual: 'ready',
  },
];

const elements = [
  { symbol: 'Au', name: 'Gold', type: 'Metal', color: '#fbbf24' },
  { symbol: 'O', name: 'Oxygen', type: 'Non-metal', color: '#60a5fa' },
  { symbol: 'Fe', name: 'Iron', type: 'Metal', color: '#9ca3af' },
  { symbol: 'C', name: 'Carbon', type: 'Non-metal', color: '#374151' },
];

const compounds = [
  { formula: 'H₂O', name: 'Water', elements: 'H + O', color: '#0ea5e9' },
  { formula: 'NaCl', name: 'Salt', elements: 'Na + Cl', color: '#f9fafb' },
  { formula: 'CO₂', name: 'Carbon Dioxide', elements: 'C + O', color: '#a3e635' },
];

const separationMethods = [
  { method: 'Filtration', emoji: '🧫', use: 'Sand from water' },
  { method: 'Evaporation', emoji: '☀️', use: 'Salt from water' },
  { method: 'Magnetic', emoji: '🧲', use: 'Iron from sand' },
  { method: 'Distillation', emoji: '⚗️', use: 'Pure water' },
];

export default function ElementsCompoundsIntro({ onComplete, className }: ElementsCompoundsIntroProps) {
  const [currentScene, setCurrentScene] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [animatedIndex, setAnimatedIndex] = useState(0);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const currentSceneRef = useRef(currentScene);

  useEffect(() => { currentSceneRef.current = currentScene; }, [currentScene]);
  useEffect(() => { const interval = setInterval(() => setAnimatedIndex(prev => (prev + 1) % 4), 800); return () => clearInterval(interval); }, []);

  const speakText = useCallback((text: string) => {
    if (typeof window === 'undefined' || !window.speechSynthesis || isMuted) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9; utterance.pitch = 1; utterance.volume = 1;
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => v.name.includes('Google') || v.name.includes('Natural') || v.lang.startsWith('en'));
    if (preferredVoice) utterance.voice = preferredVoice;
    utteranceRef.current = utterance;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => { setIsSpeaking(false); if (isPlaying && currentSceneRef.current < scenes.length - 1) setTimeout(() => setCurrentScene(p => p + 1), 1500); };
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  }, [isMuted, isPlaying]);

  useEffect(() => { if (typeof window !== 'undefined' && window.speechSynthesis) { window.speechSynthesis.getVoices(); window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices(); } }, []);
  useEffect(() => { if (isPlaying) speakText(scenes[currentScene].narration); return () => { if (typeof window !== 'undefined' && window.speechSynthesis) window.speechSynthesis.cancel(); }; }, [currentScene, isPlaying, speakText]);

  const handleNext = () => { if (typeof window !== 'undefined' && window.speechSynthesis) window.speechSynthesis.cancel(); if (currentScene < scenes.length - 1) setCurrentScene(p => p + 1); else onComplete?.(); };
  const handlePrev = () => { if (typeof window !== 'undefined' && window.speechSynthesis) window.speechSynthesis.cancel(); if (currentScene > 0) setCurrentScene(p => p - 1); };
  const handleSkipIntro = () => { if (typeof window !== 'undefined' && window.speechSynthesis) window.speechSynthesis.cancel(); onComplete?.(); };
  const togglePlayPause = () => { if (isPlaying && typeof window !== 'undefined' && window.speechSynthesis) window.speechSynthesis.cancel(); setIsPlaying(!isPlaying); };
  const toggleMute = () => { if (!isMuted && typeof window !== 'undefined' && window.speechSynthesis) window.speechSynthesis.cancel(); setIsMuted(!isMuted); };

  const scene = scenes[currentScene];

  return (
    <div className={`relative w-full min-h-[500px] md:min-h-[600px] rounded-2xl overflow-hidden ${className}`}>
      <motion.div key={scene.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`absolute inset-0 bg-gradient-to-br ${scene.bgGradient}`} />
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {['⚛️', '🧪', '💧', 'Au', 'Fe', '🔬', 'O₂', 'H₂'].map((emoji, i) => (
          <motion.div key={i} className="absolute text-2xl md:text-3xl opacity-20" initial={{ x: Math.random() * 100 + '%', y: '100%' }} animate={{ y: '-10%', x: `${Math.random() * 100}%` }} transition={{ duration: 15 + Math.random() * 10, repeat: Infinity, delay: i * 2, ease: 'linear' }}>{emoji}</motion.div>
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
                    {['⚛️', '🧪', '💧', '🔬', '✨'].map((e, i) => (<motion.span key={e} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.1 }}>{e}</motion.span>))}
                  </div>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="bg-purple-500/40 text-white font-bold py-2 px-4 rounded-full inline-block">🌍 Everything is made of matter!</motion.div>
                </div>
              </motion.div>
            )}

            {scene.visual === 'elements' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mb-6 px-4">
                <div className="bg-white/20 backdrop-blur-md rounded-xl p-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {elements.map((el, i) => (
                      <motion.div key={el.symbol} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: animatedIndex === i ? 1.08 : 1 }} transition={{ delay: 0.4 + i * 0.1 }} className="bg-white/20 rounded-lg p-3 text-center" style={{ borderBottom: `3px solid ${el.color}` }}>
                        <div className="text-3xl font-bold text-white">{el.symbol}</div>
                        <div className="text-white text-sm">{el.name}</div>
                        <div className="text-white/70 text-xs">{el.type}</div>
                      </motion.div>
                    ))}
                  </div>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="mt-3 text-center"><span className="bg-yellow-500/40 text-white px-3 py-1 rounded-full text-sm">118 elements known!</span></motion.div>
                </div>
              </motion.div>
            )}

            {scene.visual === 'compounds' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mb-6 px-4">
                <div className="bg-white/20 backdrop-blur-md rounded-xl p-4">
                  <div className="flex flex-col md:flex-row gap-3 justify-center">
                    {compounds.map((c, i) => (
                      <motion.div key={c.formula} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0, scale: animatedIndex % 3 === i ? 1.05 : 1 }} transition={{ delay: 0.4 + i * 0.15 }} className="bg-white/20 rounded-lg p-4 flex-1 text-center" style={{ borderLeft: `4px solid ${c.color}` }}>
                        <div className="text-2xl font-bold text-white">{c.formula}</div>
                        <div className="text-white">{c.name}</div>
                        <div className="text-white/70 text-xs">{c.elements}</div>
                      </motion.div>
                    ))}
                  </div>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="mt-3 bg-blue-500/30 rounded-lg p-2"><span className="text-white text-sm">⚡ New properties different from elements!</span></motion.div>
                </div>
              </motion.div>
            )}

            {scene.visual === 'mixtures' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mb-6 px-4">
                <div className="bg-white/20 backdrop-blur-md rounded-xl p-4">
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="bg-white/20 rounded-lg p-3 text-center">
                      <div className="text-2xl mb-1">🌬️</div>
                      <div className="text-white font-bold">Air</div>
                      <div className="text-white/70 text-xs">N₂ + O₂ + CO₂</div>
                    </motion.div>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="bg-white/20 rounded-lg p-3 text-center">
                      <div className="text-2xl mb-1">🌊</div>
                      <div className="text-white font-bold">Sea Water</div>
                      <div className="text-white/70 text-xs">H₂O + NaCl + minerals</div>
                    </motion.div>
                  </div>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="bg-green-500/30 rounded-lg p-2"><span className="text-white text-sm">✅ Components keep their properties!</span></motion.div>
                </div>
              </motion.div>
            )}

            {scene.visual === 'separation' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mb-6 px-4">
                <div className="bg-white/20 backdrop-blur-md rounded-xl p-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {separationMethods.map((m, i) => (
                      <motion.div key={m.method} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, scale: animatedIndex === i ? 1.08 : 1 }} transition={{ delay: 0.4 + i * 0.1 }} className="bg-white/20 rounded-lg p-3 text-center">
                        <div className="text-3xl mb-1">{m.emoji}</div>
                        <div className="text-white font-bold text-sm">{m.method}</div>
                        <div className="text-white/70 text-xs">{m.use}</div>
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
                    {['✅ Identify elements & symbols', '✅ Understand compounds', '✅ Classify mixtures', '✅ Separation techniques', '✅ Write chemical formulae', '✅ Everyday applications'].map((item, i) => (
                      <motion.div key={item} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.1 }} className="bg-white/20 rounded-lg p-2 text-white text-sm text-left">{item}</motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-white/90 text-sm md:text-lg px-4 max-w-2xl mx-auto leading-relaxed">{scene.narration}</motion.p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute top-4 left-4 right-16 flex gap-1 pointer-events-none">{scenes.map((_, index) => (<div key={index} className={`h-1 flex-1 rounded-full transition-all ${index <= currentScene ? 'bg-white' : 'bg-white/30'}`} />))}</div>
      <Button onClick={(e) => { e.stopPropagation(); handleSkipIntro(); }} variant="ghost" className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white rounded-full px-3 py-1 text-sm z-50">Skip Intro <X className="ml-1 h-4 w-4" /></Button>

      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-50">
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); togglePlayPause(); }} className="bg-white/20 hover:bg-white/30 text-white rounded-full">{isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}</Button>
          <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); toggleMute(); }} className="bg-white/20 hover:bg-white/30 text-white rounded-full">{isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}</Button>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={(e) => { e.stopPropagation(); handlePrev(); }} disabled={currentScene === 0} className="bg-white/20 hover:bg-white/30 text-white rounded-full px-3 disabled:opacity-40"><SkipBack className="mr-1 h-4 w-4" /> Prev</Button>
          <span className="text-white/80 text-sm min-w-[50px] text-center">{currentScene + 1} / {scenes.length}</span>
          <Button onClick={(e) => { e.stopPropagation(); handleNext(); }} className="bg-white/20 hover:bg-white/30 text-white rounded-full px-3">{currentScene < scenes.length - 1 ? (<>Next <SkipForward className="ml-1 h-4 w-4" /></>) : (<>Start Learning <ChevronRight className="ml-1 h-4 w-4" /></>)}</Button>
        </div>
      </div>

      {isSpeaking && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute top-12 right-4 flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 pointer-events-none"><motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="w-2 h-2 bg-green-400 rounded-full" /><span className="text-white text-xs">Speaking...</span></motion.div>)}
    </div>
  );
}
