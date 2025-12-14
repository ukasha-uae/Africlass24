'use client';

import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight, Volume2, VolumeX, Lightbulb, Trophy, Zap, Star, Award } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import confetti from 'canvas-confetti';

export interface TransformationStep {
  id: number;
  title: string;
  description: string;
  formula?: string;
  highlights?: string[];
  duration?: number;
  hint?: string;
  funFact?: string; // Fun fact about this transformation
}

export interface AnimatedShape {
  type: 'polygon' | 'line' | 'circle';
  points?: Array<[number, number]>;
  color?: string;
  fillColor?: string;
  strokeWidth?: number;
  label?: string;
  dashed?: boolean;
  x1?: number;
  y1?: number;
  x2?: number;
  y2?: number;
  cx?: number;
  cy?: number;
  r?: number;
}

export interface AnimatedAnnotation {
  text: string;
  x: number;
  y: number;
  color?: string;
}

export interface AnimationFrame {
  shapes: AnimatedShape[];
  annotations: AnimatedAnnotation[];
}

interface EnhancedAnimationPlayerProps {
  steps: TransformationStep[];
  frames: AnimationFrame[];
  width?: number;
  height?: number;
  autoPlay?: boolean;
  onComplete?: () => void;
}

export default function EnhancedAnimationPlayer({
  steps,
  frames,
  width = 500,
  height = 400,
  autoPlay = false,
  onComplete
}: EnhancedAnimationPlayerProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [progress, setProgress] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [showCelebration, setShowCelebration] = useState(false);
  const [containerWidth, setContainerWidth] = useState(width);
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Responsive sizing
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const parentWidth = containerRef.current.offsetWidth;
        // Use parent width but cap at original width, min at 280 for very small screens
        setContainerWidth(Math.max(280, Math.min(parentWidth - 32, width)));
      }
    };
    
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [width]);

  const scaleFactor = containerWidth / width;
  const scaledHeight = height * scaleFactor;

  const stepDuration = (steps[currentStep]?.duration || 3000) / playbackSpeed;

  // Play sound effect
  const playSound = (type: 'step' | 'complete' | 'hint') => {
    if (!soundEnabled) return;
    
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    switch (type) {
      case 'step':
        oscillator.frequency.value = 523.25; // C5
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        break;
      case 'complete':
        oscillator.frequency.value = 783.99; // G5
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        break;
      case 'hint':
        oscillator.frequency.value = 659.25; // E5
        gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
        break;
    }
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.3);
  };

  // Text-to-speech narration
  const speak = (text: string) => {
    if (!soundEnabled) return;
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = playbackSpeed;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Trigger confetti celebration
  const celebrate = () => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti(Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      }));
      confetti(Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      }));
    }, 250);

    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 3000);
  };

  // Auto-play logic
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          // Move to next step
          if (currentStep < steps.length - 1) {
            playSound('step');
            setCompletedSteps(prev => new Set([...prev, currentStep]));
            setCurrentStep(currentStep + 1);
            setShowHint(false);
            
            // Speak next step
            const nextStep = steps[currentStep + 1];
            if (nextStep) {
              speak(nextStep.title);
            }
            
            return 0;
          } else {
            // Completed all steps
            setIsPlaying(false);
            playSound('complete');
            celebrate();
            setCompletedSteps(prev => new Set([...prev, currentStep]));
            if (onComplete) onComplete();
            return 100;
          }
        }
        return prev + (100 / (stepDuration / 50));
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isPlaying, currentStep, stepDuration]);

  // Speak on mount
  useEffect(() => {
    if (currentStep === 0 && soundEnabled) {
      speak(steps[0].title);
    }
  }, []);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      playSound('step');
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setProgress(0);
    setIsPlaying(false);
    setCompletedSteps(new Set());
    setShowHint(false);
    playSound('step');
    speak(steps[0].title);
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setProgress(0);
      setShowHint(false);
      playSound('step');
      speak(steps[currentStep - 1].title);
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCompletedSteps(prev => new Set([...prev, currentStep]));
      setCurrentStep(currentStep + 1);
      setProgress(0);
      setShowHint(false);
      playSound('step');
      speak(steps[currentStep + 1].title);
    }
  };

  const handleStepClick = (index: number) => {
    setCurrentStep(index);
    setProgress(0);
    setIsPlaying(false);
    setShowHint(false);
    playSound('step');
    speak(steps[index].title);
  };

  const toggleHint = () => {
    setShowHint(!showHint);
    playSound('hint');
    if (!showHint && steps[currentStep].hint) {
      speak(steps[currentStep].hint!);
    }
  };

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
    if (soundEnabled) {
      window.speechSynthesis.cancel();
    }
  };

  const cycleSpeed = () => {
    const speeds = [0.5, 1, 1.5, 2];
    const currentIndex = speeds.indexOf(playbackSpeed);
    const nextSpeed = speeds[(currentIndex + 1) % speeds.length];
    setPlaybackSpeed(nextSpeed);
    playSound('step');
  };

  // Interpolate between frames
  const getInterpolatedFrame = (): AnimationFrame => {
    const currentFrame = frames[currentStep];
    const nextFrame = frames[Math.min(currentStep + 1, frames.length - 1)];
    
    if (!currentFrame || progress === 0) return currentFrame;
    if (progress === 100 || !nextFrame) return currentFrame;

    const t = progress / 100;
    
    const interpolatedShapes = currentFrame.shapes.map((shape, index) => {
      const nextShape = nextFrame.shapes[index];
      if (!nextShape || shape.type !== nextShape.type) return shape;

      if (shape.type === 'polygon' && shape.points && nextShape.points) {
        const interpolatedPoints = shape.points.map((point, pIndex) => {
          const nextPoint = nextShape.points![pIndex];
          return [
            point[0] + (nextPoint[0] - point[0]) * t,
            point[1] + (nextPoint[1] - point[1]) * t
          ] as [number, number];
        });
        return { ...shape, points: interpolatedPoints };
      }

      return shape;
    });

    return {
      shapes: interpolatedShapes,
      annotations: currentFrame.annotations
    };
  };

  const frame = getInterpolatedFrame();
  const currentStepData = steps[currentStep];
  const allCompleted = completedSteps.size === steps.length;
  const isMobile = containerWidth < 400;

  return (
    <div ref={containerRef} className="w-full max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      {/* Celebration overlay */}
      {showCelebration && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          <div className="bg-yellow-400 dark:bg-yellow-500 text-gray-900 px-8 py-6 rounded-full shadow-2xl animate-bounce">
            <div className="flex items-center gap-3">
              <Trophy className="h-8 w-8" />
              <span className="text-2xl font-bold">Amazing Work!</span>
              <Trophy className="h-8 w-8" />
            </div>
          </div>
        </div>
      )}

      {/* Header with controls */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 sm:p-4 text-white">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-300" />
            <h3 className="text-sm sm:text-lg font-semibold">Interactive Animation</h3>
            {allCompleted && (
              <Badge className="bg-yellow-400 text-gray-900 flex items-center gap-1 text-xs">
                <Award className="h-3 w-3" />
                <span className="hidden sm:inline">Completed!</span>
                <span className="sm:hidden">✓</span>
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={cycleSpeed}
              className="text-white hover:bg-white/20 h-8 w-8 sm:h-9 sm:w-auto px-1 sm:px-2"
            >
              <span className="text-xs font-mono">{playbackSpeed}x</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleSound}
              className="text-white hover:bg-white/20 h-8 w-8 sm:h-9 sm:w-9"
            >
              {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </Button>
            {currentStepData.hint && (
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleHint}
                className={`text-white hover:bg-white/20 h-8 w-8 sm:h-9 sm:w-9 ${showHint ? 'bg-white/20' : ''}`}
              >
                <Lightbulb className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="w-full bg-white/30 rounded-full h-1.5 sm:h-2 overflow-hidden">
          <div
            className="bg-yellow-300 h-full transition-all duration-100 ease-linear"
            style={{ width: `${((currentStep * 100 + progress) / steps.length)}%` }}
          />
        </div>
      </div>

      {/* Main content */}
      <div className="p-3 sm:p-6">
        {/* Step information */}
        <div className="mb-4 sm:mb-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 sm:p-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm sm:text-lg font-semibold text-blue-900 dark:text-blue-100">
              Step {currentStep + 1}: {currentStepData.title}
            </h4>
            <span className="text-xs sm:text-sm font-medium text-blue-700 dark:text-blue-300">
              {Math.round(progress)}%
            </span>
          </div>
          <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-3">{currentStepData.description}</p>
          
          {currentStepData.formula && (
            <div className="bg-white dark:bg-gray-700 rounded p-2 sm:p-3 mb-3 font-mono text-xs sm:text-sm border-l-4 border-blue-500 overflow-x-auto">
              {currentStepData.formula}
            </div>
          )}
          
          {currentStepData.highlights && currentStepData.highlights.length > 0 && (
            <ul className="space-y-1">
              {currentStepData.highlights.map((highlight, index) => (
                <li key={index} className="flex items-start gap-2 text-xs sm:text-sm">
                  <Star className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">{highlight}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Hint display */}
          {showHint && currentStepData.hint && (
            <div className="mt-3 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-2 sm:p-3 rounded">
              <div className="flex items-start gap-2">
                <Lightbulb className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-yellow-800 dark:text-yellow-300 text-xs sm:text-sm mb-1">Hint:</p>
                  <p className="text-yellow-700 dark:text-yellow-400 text-xs sm:text-sm">{currentStepData.hint}</p>
                </div>
              </div>
            </div>
          )}

          {/* Fun fact */}
          {currentStepData.funFact && completedSteps.has(currentStep) && (
            <div className="mt-3 bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-400 p-2 sm:p-3 rounded">
              <div className="flex items-start gap-2">
                <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600 dark:text-purple-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-purple-800 dark:text-purple-300 text-xs sm:text-sm mb-1">Fun Fact:</p>
                  <p className="text-purple-700 dark:text-purple-400 text-xs sm:text-sm">{currentStepData.funFact}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Animation canvas */}
        <div className="flex justify-center mb-4 sm:mb-6">
          <svg 
            width={containerWidth} 
            height={scaledHeight} 
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="xMidYMid meet"
            className="border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900"
          >
            {/* Coordinate grid */}
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="gray" strokeWidth="0.5" opacity="0.3"/>
              </pattern>
            </defs>
            <rect width={width} height={height} fill="url(#grid)" />
            
            {/* Coordinate axes */}
            <line x1={width/2} y1="0" x2={width/2} y2={height} stroke="#666" strokeWidth="2" />
            <line x1="0" y1={height/2} x2={width} y2={height/2} stroke="#666" strokeWidth="2" />
            
            {/* Axis labels */}
            <text x={width - 20} y={height/2 - 10} fill="#666" fontSize="14" fontWeight="bold">x</text>
            <text x={width/2 + 10} y="20" fill="#666" fontSize="14" fontWeight="bold">y</text>
            
            {/* Render shapes with animation */}
            {frame && frame.shapes.map((shape, index) => {
              if (shape.type === 'polygon' && shape.points) {
                const pathData = `M ${shape.points.map(p => p.join(',')).join(' L ')} Z`;
                return (
                  <g key={index}>
                    <path
                      d={pathData}
                      fill={shape.fillColor || 'none'}
                      stroke={shape.color || '#000'}
                      strokeWidth={shape.strokeWidth || 2}
                      strokeDasharray={shape.dashed ? '5,5' : undefined}
                      opacity="0.7"
                      className="transition-all duration-300"
                    />
                    {shape.points.map((point, pIndex) => (
                      <circle
                        key={pIndex}
                        cx={point[0]}
                        cy={point[1]}
                        r="4"
                        fill={shape.color || '#000'}
                        className="transition-all duration-300"
                      />
                    ))}
                  </g>
                );
              }
              
              if (shape.type === 'line') {
                return (
                  <line
                    key={index}
                    x1={shape.x1}
                    y1={shape.y1}
                    x2={shape.x2}
                    y2={shape.y2}
                    stroke={shape.color || '#000'}
                    strokeWidth={shape.strokeWidth || 2}
                    strokeDasharray={shape.dashed ? '5,5' : undefined}
                    className="transition-all duration-300"
                  />
                );
              }
              
              if (shape.type === 'circle') {
                return (
                  <circle
                    key={index}
                    cx={shape.cx}
                    cy={shape.cy}
                    r={shape.r}
                    fill={shape.fillColor || shape.color || '#000'}
                    stroke={shape.color || '#000'}
                    strokeWidth={shape.strokeWidth || 2}
                    className="transition-all duration-300"
                  />
                );
              }
              
              return null;
            })}
            
            {/* Render annotations */}
            {frame && frame.annotations.map((annotation, index) => (
              <text
                key={index}
                x={annotation.x}
                y={annotation.y}
                fill={annotation.color || '#000'}
                fontSize="14"
                fontWeight="bold"
              >
                {annotation.text}
              </text>
            ))}
          </svg>
        </div>

        {/* Playback controls */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-4">
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            className="flex items-center gap-1 sm:gap-2 h-9 sm:h-10 px-2 sm:px-3 text-xs sm:text-sm"
          >
            <RotateCcw className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden xs:inline">Reset</span>
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="flex items-center gap-1 sm:gap-2 h-9 sm:h-10 px-2 sm:px-3 text-xs sm:text-sm"
          >
            <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Previous</span>
          </Button>
          
          <Button
            variant="default"
            size="lg"
            onClick={handlePlayPause}
            className="flex items-center gap-1 sm:gap-2 bg-blue-600 hover:bg-blue-700 h-10 sm:h-12 px-4 sm:px-6 text-sm sm:text-base min-w-[100px]"
          >
            {isPlaying ? (
              <>
                <Pause className="h-4 w-4 sm:h-5 sm:w-5" />
                Pause
              </>
            ) : (
              <>
                <Play className="h-4 w-4 sm:h-5 sm:w-5" />
                Play
              </>
            )}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleNext}
            disabled={currentStep === steps.length - 1}
            className="flex items-center gap-1 sm:gap-2 h-9 sm:h-10 px-2 sm:px-3 text-xs sm:text-sm"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
        </div>

        {/* Step indicators */}
        <div className="flex justify-center gap-1.5 sm:gap-2 flex-wrap">
          {steps.map((step, index) => (
            <button
              key={step.id}
              onClick={() => handleStepClick(index)}
              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold transition-all touch-manipulation ${
                index === currentStep
                  ? 'bg-blue-600 text-white scale-110 shadow-lg'
                  : completedSteps.has(index)
                  ? 'bg-green-500 text-white hover:bg-green-600 active:bg-green-700'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 active:bg-gray-400'
              }`}
            >
              {completedSteps.has(index) ? '✓' : index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
