'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, ChevronRight, X } from 'lucide-react';

interface UnitsInstrumentsIntroProps {
  onComplete?: () => void;
  className?: string;
}

const scenes = [
  {
    id: 1,
    title: "Measuring Our World!",
    narration: "How tall are you? How heavy is that bag of rice? How hot is the sun? To answer these questions, we need MEASUREMENTS! Today, you'll discover the language of science - SI units - and the amazing instruments we use to measure everything around us!",
    bgGradient: "from-blue-600 via-indigo-600 to-purple-600",
    emoji: "📏",
    visual: 'intro',
  },
  {
    id: 2,
    title: "The SI System: Universal Language",
    narration: "Scientists worldwide use the International System of Units, or SI. Seven base units form the foundation: the meter for length, kilogram for mass, second for time, ampere for electric current, kelvin for temperature, mole for amount of substance, and candela for light intensity!",
    bgGradient: "from-green-500 via-emerald-500 to-teal-500",
    emoji: "🌍",
    visual: 'siUnits',
  },
  {
    id: 3,
    title: "Prefixes: Making Numbers Manageable",
    narration: "How do we write very large or very small numbers? We use prefixes! Kilo means thousand, so one kilometer equals one thousand meters. Milli means one-thousandth, so one millimeter is one-thousandth of a meter. Centi means one-hundredth - that's why a centimeter is one-hundredth of a meter!",
    bgGradient: "from-orange-500 via-amber-500 to-yellow-500",
    emoji: "🔢",
    visual: 'prefixes',
  },
  {
    id: 4,
    title: "Measuring Length",
    narration: "To measure length, we use different tools for different scales. A ruler measures small objects in centimeters. A measuring tape extends for longer distances. A meter rule is perfect for one-meter measurements. Vernier calipers measure with high precision to zero point zero one centimeters!",
    bgGradient: "from-cyan-500 via-blue-500 to-indigo-500",
    emoji: "📐",
    visual: 'lengthTools',
  },
  {
    id: 5,
    title: "Measuring Mass, Volume & Time",
    narration: "We measure mass using balances - beam balances for comparison, electronic balances for precision. Volume is measured with measuring cylinders, beakers, or pipettes. For time, we use stopwatches that measure to hundredths of a second. Each measurement needs the right instrument!",
    bgGradient: "from-pink-500 via-rose-500 to-red-500",
    emoji: "⚖️",
    visual: 'otherMeasures',
  },
  {
    id: 6,
    title: "Ready to Measure!",
    narration: "You're now equipped to explore the world of measurement! You'll master SI units and their prefixes, learn to choose the right instrument for each measurement, understand how to read scales accurately, and convert between different units. Precise measurement is the foundation of science. Let's begin!",
    bgGradient: "from-violet-600 via-purple-500 to-indigo-600",
    emoji: "🎯",
    visual: 'ready',
  },
];

const siUnits = [
  { quantity: 'Length', unit: 'Meter', symbol: 'm', emoji: '📏' },
  { quantity: 'Mass', unit: 'Kilogram', symbol: 'kg', emoji: '⚖️' },
  { quantity: 'Time', unit: 'Second', symbol: 's', emoji: '⏱️' },
  { quantity: 'Temperature', unit: 'Kelvin', symbol: 'K', emoji: '🌡️' },
];

const prefixes = [
  { prefix: 'kilo', symbol: 'k', value: '1,000', example: 'km' },
  { prefix: 'centi', symbol: 'c', value: '0.01', example: 'cm' },
  { prefix: 'milli', symbol: 'm', value: '0.001', example: 'mm' },
  { prefix: 'micro', symbol: 'μ', value: '0.000001', example: 'μm' },
];

const lengthTools = [
  { name: 'Ruler', precision: '0.1 cm', use: 'Small objects', emoji: '📏' },
  { name: 'Meter Rule', precision: '0.1 cm', use: 'Up to 1m', emoji: '📐' },
  { name: 'Tape Measure', precision: '0.1 cm', use: 'Long distances', emoji: '🎗️' },
  { name: 'Vernier Caliper', precision: '0.01 cm', use: 'High precision', emoji: '🔧' },
];

const otherInstruments = [
  { quantity: 'Mass', instrument: 'Balance', emoji: '⚖️' },
  { quantity: 'Volume', instrument: 'Measuring Cylinder', emoji: '🧪' },
  { quantity: 'Time', instrument: 'Stopwatch', emoji: '⏱️' },
  { quantity: 'Temperature', instrument: 'Thermometer', emoji: '🌡️' },
];

export default function UnitsInstrumentsIntro({ onComplete, className }: UnitsInstrumentsIntroProps) {
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
        {['📏', '⚖️', '⏱️', '🌡️', '🧪', '📐', '🔬', '🎯'].map((emoji, i) => (
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
                    {['📏', '⚖️', '⏱️', '🌡️', '🧪'].map((e, i) => (<motion.span key={e} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.1 }}>{e}</motion.span>))}
                  </div>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="bg-blue-500/40 text-white font-bold py-2 px-4 rounded-full inline-block">🔬 The Language of Science!</motion.div>
                </div>
              </motion.div>
            )}

            {scene.visual === 'siUnits' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mb-6 px-4">
                <div className="bg-white/20 backdrop-blur-md rounded-xl p-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {siUnits.map((unit, i) => (
                      <motion.div key={unit.symbol} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: animatedIndex === i ? 1.08 : 1 }} transition={{ delay: 0.4 + i * 0.1 }} className="bg-white/20 rounded-lg p-3 text-center">
                        <div className="text-2xl mb-1">{unit.emoji}</div>
                        <div className="text-white font-bold">{unit.quantity}</div>
                        <div className="text-white/90 text-sm">{unit.unit}</div>
                        <div className="text-white/70 text-xs bg-white/20 rounded px-2 py-0.5 inline-block mt-1">{unit.symbol}</div>
                      </motion.div>
                    ))}
                  </div>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="mt-3 text-center"><span className="bg-green-500/40 text-white px-3 py-1 rounded-full text-sm">7 base SI units</span></motion.div>
                </div>
              </motion.div>
            )}

            {scene.visual === 'prefixes' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mb-6 px-4">
                <div className="bg-white/20 backdrop-blur-md rounded-xl p-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {prefixes.map((p, i) => (
                      <motion.div key={p.prefix} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, scale: animatedIndex === i ? 1.08 : 1 }} transition={{ delay: 0.4 + i * 0.1 }} className="bg-white/20 rounded-lg p-3 text-center">
                        <div className="text-xl font-bold text-white">{p.prefix}</div>
                        <div className="text-2xl font-bold text-yellow-300">{p.symbol}</div>
                        <div className="text-white/70 text-xs">× {p.value}</div>
                        <div className="text-white/80 text-sm bg-white/20 rounded px-2 py-0.5 mt-1">{p.example}</div>
                      </motion.div>
                    ))}
                  </div>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="mt-3 bg-orange-500/30 rounded-lg p-2"><span className="text-white text-sm">📝 1 km = 1,000 m | 1 cm = 0.01 m</span></motion.div>
                </div>
              </motion.div>
            )}

            {scene.visual === 'lengthTools' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mb-6 px-4">
                <div className="bg-white/20 backdrop-blur-md rounded-xl p-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {lengthTools.map((tool, i) => (
                      <motion.div key={tool.name} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: animatedIndex === i ? 1.08 : 1 }} transition={{ delay: 0.4 + i * 0.1 }} className="bg-white/20 rounded-lg p-3 text-center">
                        <div className="text-2xl mb-1">{tool.emoji}</div>
                        <div className="text-white font-bold text-sm">{tool.name}</div>
                        <div className="text-cyan-200 text-xs">±{tool.precision}</div>
                        <div className="text-white/70 text-xs">{tool.use}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {scene.visual === 'otherMeasures' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mb-6 px-4">
                <div className="bg-white/20 backdrop-blur-md rounded-xl p-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {otherInstruments.map((inst, i) => (
                      <motion.div key={inst.quantity} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, scale: animatedIndex === i ? 1.08 : 1 }} transition={{ delay: 0.4 + i * 0.1 }} className="bg-white/20 rounded-lg p-3 text-center">
                        <div className="text-3xl mb-1">{inst.emoji}</div>
                        <div className="text-white font-bold text-sm">{inst.quantity}</div>
                        <div className="text-white/80 text-xs">{inst.instrument}</div>
                      </motion.div>
                    ))}
                  </div>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="mt-3 bg-pink-500/30 rounded-lg p-2"><span className="text-white text-sm">🎯 Right tool for right measurement!</span></motion.div>
                </div>
              </motion.div>
            )}

            {scene.visual === 'ready' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mb-6 px-4">
                <div className="bg-white/20 backdrop-blur-md rounded-xl p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {['✅ Master SI units & symbols', '✅ Use prefixes correctly', '✅ Choose right instruments', '✅ Read scales accurately', '✅ Convert between units', '✅ Estimate measurements'].map((item, i) => (
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
