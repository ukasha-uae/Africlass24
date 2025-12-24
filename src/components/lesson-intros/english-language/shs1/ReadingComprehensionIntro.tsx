'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Volume2, VolumeX, Play, Pause, BookOpen, Eye, Brain, Lightbulb,
  ChevronLeft, ChevronRight, Award, Target, Zap, Search
} from 'lucide-react';

interface LessonIntroProps {
  onComplete?: () => void;
}

const ReadingComprehensionIntro: React.FC<LessonIntroProps> = ({ onComplete }) => {
  const [stage, setStage] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [highlightedWord, setHighlightedWord] = useState<number>(-1);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const wordsRef = useRef<string[]>([]);

  const scenes = useMemo(() => [
    {
      title: "Reading is More Than Words",
      content: "Comprehension means understanding and interpreting what you read",
      narration: "Welcome to Reading Comprehension! Reading isn't just recognizing words on a page - it's about understanding ideas, making connections, and thinking critically about information. Strong reading comprehension is the foundation of academic success across all subjects. When you comprehend well, you can analyze science textbooks, interpret literature, evaluate historical sources, and solve mathematical word problems. This lesson will transform you from a passive reader into an active, strategic thinker who extracts meaning and insight from every text.",
      icon: BookOpen,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: "Three Levels of Reading",
      content: "Surface reading, deep reading, and critical reading serve different purposes",
      narration: "There are three levels of reading comprehension. First, literal comprehension - understanding what the text directly states. This answers questions like 'what happened' or 'who did what.' Second, inferential comprehension - reading between the lines to understand implied meanings and make logical conclusions. This requires you to connect clues in the text with your background knowledge. Third, evaluative comprehension - judging the quality, accuracy, and value of what you read. This is critical thinking: questioning the author's purpose, identifying bias, and evaluating evidence. Strong readers move fluidly between all three levels.",
      icon: Eye,
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: "Active Reading Strategies",
      content: "Preview, question, read, reflect, review - the foundation of comprehension",
      narration: "Active reading means engaging with text before, during, and after reading. Before you read: preview the title, headings, images, and first paragraph to predict what it's about. Activate your prior knowledge - what do you already know about this topic? During reading: ask questions, make predictions, visualize what's happening, and connect ideas to your life. Mark confusing parts to revisit. After reading: summarize the main ideas in your own words, reflect on what you learned, and review key concepts. This systematic approach dramatically improves retention and understanding.",
      icon: Target,
      color: 'from-yellow-500 to-orange-500'
    },
    {
      title: "Understanding Text Structure",
      content: "Recognizing how information is organized helps you comprehend faster",
      narration: "Authors organize information in predictable patterns called text structures. Narrative structure tells a story with characters, setting, plot, conflict, and resolution. Descriptive structure paints a picture with sensory details. Compare and contrast shows similarities and differences between two things. Cause and effect explains why something happened and its results. Problem and solution presents a challenge and proposes fixes. Sequence or chronological order shows steps or events in time order. When you recognize these patterns, you can predict what's coming next and remember information better.",
      icon: Search,
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: "Vocabulary in Context",
      content: "Use clues around unfamiliar words to figure out their meaning",
      narration: "You'll encounter unfamiliar words while reading - that's normal and healthy! Don't panic or immediately grab a dictionary. First, use context clues: look at the words and sentences around the unknown word. Definition clues directly explain the word. Example clues show how the word is used. Contrast clues show what the word is NOT. Synonym clues use similar words nearby. Inference clues require you to piece together multiple hints. Root words, prefixes, and suffixes also reveal meaning. Practice decoding words from context, and your vocabulary will grow naturally while you read.",
      icon: Lightbulb,
      color: 'from-red-500 to-rose-500'
    },
    {
      title: "Making Inferences",
      content: "Great readers draw conclusions from clues rather than waiting to be told everything",
      narration: "Authors don't spell out every detail - they expect you to infer meaning from clues. An inference is an educated guess based on evidence in the text plus your own knowledge and experience. For example, if a character slams a door and refuses to speak, you can infer they're angry even if the author never says so directly. Look for clues in dialogue, actions, descriptive language, and what's NOT said. Ask yourself: What can I conclude from this evidence? What does this suggest about the character, situation, or theme? Strong inferential skills separate good readers from great ones.",
      icon: Brain,
      color: 'from-indigo-500 to-blue-500'
    },
    {
      title: "Your Reading Goals",
      content: "Build stamina, expand vocabulary, think critically, and enjoy the journey",
      narration: "Your goals as a reader are clear: First, build reading stamina by reading regularly and gradually increasing text difficulty. Second, expand your vocabulary by reading diverse genres and using context clues. Third, develop critical thinking by questioning what you read, evaluating arguments, and forming your own opinions. Fourth, improve reading speed without sacrificing comprehension. And finally, discover the joy of reading by finding topics and genres you genuinely enjoy. Remember: every expert reader was once a beginner. With practice and the right strategies, you can master any text!",
      icon: Award,
      color: 'from-teal-500 to-cyan-500'
    }
  ], []);

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

      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      let wordIndex = 0;
      utterance.onboundary = (event) => {
        if (event.name === 'word') {
          setHighlightedWord(wordIndex);
          wordIndex++;
        }
      };

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => {
        setIsSpeaking(false);
        setHighlightedWord(-1);
      };
      utterance.onerror = () => {
        setIsSpeaking(false);
        setHighlightedWord(-1);
      };

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

  useEffect(() => {
    if (stage >= 0 && stage < scenes.length && !isMuted) {
      const timer = setTimeout(() => {
        speak(scenes[stage].narration);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [stage, scenes, speak, isMuted]);

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleNext = () => {
    stopSpeaking();
    if (stage < scenes.length - 1) {
      setStage(stage + 1);
    }
  };

  const handlePrev = () => {
    stopSpeaking();
    if (stage > 0) {
      setStage(stage - 1);
    }
  };

  const toggleMute = () => {
    if (isSpeaking) {
      stopSpeaking();
    }
    setIsMuted(!isMuted);
  };

  const renderNarrationWithHighlight = (text: string) => {
    const words = text.split(' ');
    return (
      <div className="leading-relaxed">
        {words.map((word, index) => (
          <span
            key={index}
            className={`inline-block transition-all duration-200 ${
              index === highlightedWord
                ? 'bg-yellow-300 dark:bg-yellow-600 scale-105 font-semibold px-1 rounded'
                : ''
            }`}
          >
            {word}{' '}
          </span>
        ))}
      </div>
    );
  };

  const currentScene = scenes[stage];
  const Icon = currentScene.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
            Reading Comprehension
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Master the Art of Active Reading
          </p>
        </motion.div>

        {/* Progress Dots */}
        <div className="flex justify-center gap-2 mb-8">
          {scenes.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                stopSpeaking();
                setStage(index);
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === stage
                  ? 'w-8 bg-blue-600'
                  : index < stage
                  ? 'w-2 bg-blue-400'
                  : 'w-2 bg-gray-300 dark:bg-gray-600'
              }`}
              aria-label={`Go to scene ${index + 1}`}
            />
          ))}
        </div>

        {/* Main Content Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={stage}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className={`bg-gradient-to-br ${currentScene.color} p-1 rounded-3xl shadow-2xl`}
          >
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-10">
              {/* Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="flex justify-center mb-6"
              >
                <div className={`p-4 rounded-full bg-gradient-to-br ${currentScene.color}`}>
                  <Icon className="w-12 h-12 md:w-16 md:h-16 text-white" />
                </div>
              </motion.div>

              {/* Title */}
              <h2 className="text-2xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-4">
                {currentScene.title}
              </h2>

              {/* Content */}
              <p className="text-lg md:text-xl text-center text-gray-700 dark:text-gray-300 mb-8">
                {currentScene.content}
              </p>

              {/* Narration with Highlight */}
              <div className="bg-gray-50 dark:bg-slate-700 rounded-2xl p-6 mb-8 min-h-[200px]">
                <div className="flex items-start gap-3 mb-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${currentScene.color}`}>
                    {isSpeaking ? (
                      <Volume2 className="w-5 h-5 text-white animate-pulse" />
                    ) : (
                      <BookOpen className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
                      {isSpeaking ? 'Speaking...' : 'Narration'}
                    </p>
                    <div className="text-gray-800 dark:text-gray-200 text-base md:text-lg">
                      {renderNarrationWithHighlight(currentScene.narration)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between gap-4">
                {/* Previous Button */}
                <button
                  onClick={handlePrev}
                  disabled={stage === 0}
                  className="flex items-center gap-2 px-6 py-3 bg-gray-200 dark:bg-slate-700 text-gray-900 dark:text-white rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-slate-600 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                  <span className="hidden sm:inline">Previous</span>
                </button>

                {/* Audio Control */}
                <button
                  onClick={toggleMute}
                  className="p-3 bg-gray-200 dark:bg-slate-700 text-gray-900 dark:text-white rounded-xl hover:bg-gray-300 dark:hover:bg-slate-600 transition-colors"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>

                {/* Next/Start Button */}
                {stage < scenes.length - 1 ? (
                  <button
                    onClick={handleNext}
                    className={`flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${currentScene.color} text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all`}
                  >
                    <span className="hidden sm:inline">Next</span>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                ) : (
                  <button
                    onClick={onComplete}
                    className={`flex items-center gap-2 px-8 py-3 bg-gradient-to-r ${currentScene.color} text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all`}
                  >
                    <span>Start Lesson</span>
                    <Play className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Scene Counter */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mt-6 text-gray-600 dark:text-gray-400"
        >
          Scene {stage + 1} of {scenes.length}
        </motion.p>
      </div>
    </div>
  );
};

export default ReadingComprehensionIntro;
