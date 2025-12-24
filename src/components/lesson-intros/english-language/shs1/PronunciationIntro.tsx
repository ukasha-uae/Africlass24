'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Volume2, VolumeX, Play, Pause, Mic, Ear, Zap, Lightbulb,
  ChevronLeft, ChevronRight, Award, MessageCircle, Smile, Music
} from 'lucide-react';
import { useLocalization } from '@/hooks/useLocalization';
import { localizeString } from '@/lib/localization/content-localizer';
import type { CountryConfig } from '@/lib/localization/country-config';

interface LessonIntroProps {
  onComplete?: () => void;
}

const PronunciationIntro: React.FC<LessonIntroProps> = ({ onComplete }) => {
  const { country } = useLocalization();
  const [stage, setStage] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [highlightedWord, setHighlightedWord] = useState<number>(-1);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const wordsRef = useRef<string[]>([]);

  const countryLabel = country ? localizeString('{{country:adjective}}', country as CountryConfig) : 'local';

  const scenes = useMemo(() => [
    {
      title: `Clear Speech Matters in ${countryLabel} English`,
      content: "Pronunciation, stress, and intonation are the foundations of intelligible communication",
      narration: country ? localizeString(
        "Welcome to Pronunciation, Stress, and Intonation! In {{country}}, where English serves as a bridge language across communities, clear pronunciation helps you communicate confidently in classrooms, workplaces, and international contexts. This lesson explores three interconnected elements: how to pronounce individual sounds, which syllables to stress, and how your voice rises and falls to convey meaning. By mastering these skills, you'll dramatically improve how well others understand you.",
        country as CountryConfig
      ) : "Welcome to Pronunciation, Stress, and Intonation! Clear pronunciation helps you communicate confidently in all contexts.",
      icon: Mic,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: "The 44 English Sounds",
      content: "English has 44 phonemes made from just 26 letters - that's why pronunciation matters!",
      narration: "English has 44 distinct sounds called phonemes, but only 26 letters. This mismatch creates spelling challenges! We have 14 vowel sounds - that's way more than the 5 vowels A-E-I-O-U! Examples: the vowel in 'sit' versus 'seat' sounds different even though both use the letter E. Plus 24 consonant sounds, including tricky ones like the TH in 'think' or 'this' - sounds that don't exist in many African languages. Understanding this explains why English pronunciation seems unpredictable but also shows that your challenges are completely normal!",
      icon: Ear,
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: "Word Stress Changes Meaning!",
      content: "The same word sounds different when you stress different syllables",
      narration: "Here's something amazing: changing which syllable you stress changes the meaning completely! The word 'PREsent' with stress on the first syllable means a gift. But 'preSENT' with stress on the second syllable means to give or show something. Same letters, totally different meanings! This happens throughout English: REcord (noun - a file) versus reCORD (verb - to tape something), CONtent (adjective - happy) versus conTENT (noun - what's inside). In English, most nouns stress the first syllable, but most verbs stress the second. Learn these patterns and you'll predict stress correctly!",
      icon: Zap,
      color: 'from-yellow-500 to-orange-500'
    },
    {
      title: "Intonation Conveys Emotion and Meaning",
      content: "How your voice rises and falls tells listeners about your attitude and intention",
      narration: "Your voice isn't flat - it rises and falls constantly. This is intonation, and it carries important meaning! When your pitch FALLS at the end of a sentence, it signals confidence and completion: 'The meeting is tomorrow.' Falling pitch. But when your pitch RISES at the end, it signals a question or uncertainty: 'The meeting is tomorrow?' Rising pitch, different meaning! You can say the exact same words with different intonation and completely change how they're understood. Happy people use higher pitch and more variation. Serious people use lower pitch. Uncertain people use rising pitch at the end. Native speakers use intonation instinctively - learning it consciously makes you sound more natural!",
      icon: Smile,
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: "Common Pronunciation Challenges",
      content: "Certain English sounds are tricky for most learners - but they're learnable!",
      narration: "You might find some English sounds challenging. The TH sounds in 'think' and 'this' don't exist in many languages, so learners often replace them with T or S. The English R sound requires your tongue in a different position than you're used to. Final consonant clusters like 'asks' or 'texts' feel awkward because many languages don't end words with multiple consonants. But here's the good news: these are learned skills! Every English learner faces these challenges - you're not alone. With focused practice using the Listen-Repeat-Record cycle, you can master these sounds. Don't be discouraged - even small improvements make a huge difference in how clearly you're understood!",
      icon: Lightbulb,
      color: 'from-red-500 to-rose-500'
    },
    {
      title: "The Most Common Sound: Schwa",
      content: "The neutral vowel in unstressed syllables - the MOST common English sound!",
      narration: "Here's a secret native speakers use constantly: the schwa sound, which sounds like a quick 'uh'. It's the most common vowel in English! It appears in unstressed syllables. Examples: in 'about', the A at the start is pronounced as schwa. In 'sofa', the A at the end is schwa. In 'system', the E in the middle is schwa. Native speakers pronounce these with a quick, muffled sound, not a clear vowel. Understanding schwa helps you sound more natural and understand native speakers better. It's not cheating - it's how English really works!",
      icon: Music,
      color: 'from-indigo-500 to-blue-500'
    },
    {
      title: "Your Pronunciation Goal",
      content: "Focus on clarity and natural rhythm while keeping your unique identity",
      narration: "Here's the truth: you don't need to sound like a BBC newsreader! Your accent is part of your identity, and there are many legitimate varieties of English worldwide. The real goal is CLARITY - making sure listeners understand you - and NATURAL RHYTHM - sounding fluent and confident. Focus on the sounds that matter most for intelligibility: clear vowel differences, those challenging TH sounds, and natural word stress patterns. Native speakers appreciate your effort and will absolutely understand you. Remember: communication is about connection, not perfection. Aim for clarity and confidence!",
      icon: Award,
      color: 'from-teal-500 to-cyan-500'
    }
  ], [country, countryLabel]);

  const speak = useCallback((text: string) => {
    if ('speechSynthesis' in window && !isMuted) {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utteranceRef.current = utterance;
      wordsRef.current = text.split(' ');

      utterance.rate = 0.85;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(v =>
        v.lang.startsWith('en-') && (v.name.includes('Female') || v.name.includes('Google'))
      ) || voices.find(v => v.lang.startsWith('en-'));

      if (preferredVoice) utterance.voice = preferredVoice;

      utterance.onboundary = (event) => {
        if (event.name === 'word') {
          const charIndex = event.charIndex;
          const wordIndex = text.substring(0, charIndex).split(' ').length - 1;
          setHighlightedWord(wordIndex);
        }
      };

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    }
  }, [isMuted]);

  const stopSpeaking = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setHighlightedWord(-1);
    }
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev);
    if (!isMuted) stopSpeaking();
  }, [isMuted, stopSpeaking]);

  const togglePlayPause = useCallback(() => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      speak(scenes[stage].narration);
    }
  }, [isSpeaking, stage, speak, stopSpeaking, scenes]);

  useEffect(() => {
    if (!isMuted) {
      speak(scenes[stage].narration);
    }
    return () => stopSpeaking();
  }, [stage, speak, stopSpeaking, isMuted, scenes]);

  useEffect(() => {
    if ('speechSynthesis' in window) {
      const loadVoices = () => window.speechSynthesis.getVoices();
      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  const goToStage = (index: number) => {
    stopSpeaking();
    setStage(index);
  };

  const nextStage = () => {
    if (stage < scenes.length - 1) {
      goToStage(stage + 1);
    }
  };

  const prevStage = () => {
    if (stage > 0) {
      goToStage(stage - 1);
    }
  };

  const currentScene = scenes[stage];
  const Icon = currentScene.icon;
  const words = currentScene.narration.split(' ');

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute text-6xl opacity-10"
          animate={{ x: [0, 100, 0], y: [0, 50, 0], rotate: [0, 180, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          style={{ top: '10%', left: '5%' }}
        >
          🎤
        </motion.div>
        <motion.div
          className="absolute text-5xl opacity-10"
          animate={{ x: [0, -80, 0], y: [0, 80, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          style={{ top: '60%', right: '10%' }}
        >
          🗣️
        </motion.div>
        <motion.div
          className="absolute text-7xl opacity-10"
          animate={{ x: [0, 60, 0], y: [0, -60, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          style={{ bottom: '15%', left: '15%' }}
        >
          👂
        </motion.div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 md:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={stage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl w-full"
          >
            {/* Icon and title */}
            <motion.div
              className="flex flex-col items-center mb-6 md:mb-8"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.div
                className={`w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br ${currentScene.color} flex items-center justify-center mb-4 shadow-2xl`}
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(255,255,255,0.3)',
                    '0 0 40px rgba(255,255,255,0.5)',
                    '0 0 20px rgba(255,255,255,0.3)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Icon className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
              </motion.div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent px-4">
                {currentScene.title}
              </h2>
            </motion.div>

            {/* Content with narration */}
            <motion.div
              className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl border border-white/20 mb-6"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <p className="text-base sm:text-lg md:text-xl leading-relaxed text-gray-100 mb-4 italic">
                {currentScene.content}
              </p>
              <p className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-200">
                {words.map((word, index) => (
                  <span
                    key={index}
                    className={`transition-all duration-200 ${
                      index === highlightedWord
                        ? 'bg-yellow-400/40 text-yellow-100 font-semibold px-1 rounded'
                        : ''
                    }`}
                  >
                    {word}{' '}
                  </span>
                ))}
              </p>
            </motion.div>

            {/* Audio controls */}
            <motion.div
              className="flex justify-center items-center gap-3 sm:gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <button
                onClick={togglePlayPause}
                className="p-2 sm:p-3 bg-white/20 hover:bg-white/30 rounded-full transition-colors backdrop-blur-sm"
                aria-label={isSpeaking ? 'Pause' : 'Play'}
              >
                {isSpeaking ? <Pause className="w-5 h-5 sm:w-6 sm:h-6" /> : <Play className="w-5 h-5 sm:w-6 sm:h-6" />}
              </button>
              <button
                onClick={toggleMute}
                className="p-2 sm:p-3 bg-white/20 hover:bg-white/30 rounded-full transition-colors backdrop-blur-sm"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="w-5 h-5 sm:w-6 sm:h-6" /> : <Volume2 className="w-5 h-5 sm:w-6 sm:h-6" />}
              </button>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <motion.div
          className="mt-8 sm:mt-12 w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="max-w-2xl mx-auto space-y-4">
            {/* Progress dots */}
            <div className="flex justify-center gap-2">
              {scenes.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToStage(index)}
                  className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all ${
                    index === stage ? 'bg-white w-6 sm:w-8' : 'bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Go to scene ${index + 1}`}
                />
              ))}
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between gap-4">
              <button
                onClick={prevStage}
                disabled={stage === 0}
                className="flex-1 max-w-[140px] px-4 py-2.5 sm:px-6 sm:py-3 bg-white/20 hover:bg-white/30 disabled:bg-white/5 disabled:cursor-not-allowed rounded-lg transition-colors backdrop-blur-sm font-semibold text-sm sm:text-base"
              >
                <span className="hidden sm:inline">Previous</span>
                <span className="sm:hidden">Prev</span>
              </button>

              <div className="text-white/70 font-medium text-sm sm:text-base">
                {stage + 1} / {scenes.length}
              </div>

              {stage === scenes.length - 1 ? (
                <button
                  onClick={onComplete}
                  className="flex-1 max-w-[140px] px-4 py-2.5 sm:px-6 sm:py-3 bg-green-600 hover:bg-green-500 rounded-lg transition-colors backdrop-blur-sm font-semibold text-sm sm:text-base"
                >
                  <span className="hidden sm:inline">Start Lesson</span>
                  <span className="sm:hidden">Start</span>
                </button>
              ) : (
                <button
                  onClick={nextStage}
                  className="flex-1 max-w-[140px] px-4 py-2.5 sm:px-6 sm:py-3 bg-white/20 hover:bg-white/30 rounded-lg transition-colors backdrop-blur-sm font-semibold text-sm sm:text-base"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PronunciationIntro;
