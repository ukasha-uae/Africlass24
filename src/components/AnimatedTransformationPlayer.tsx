'use client';

import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';

export interface TransformationStep {
  id: number;
  title: string;
  description: string;
  formula?: string;
  highlights?: string[];
  duration?: number; // in milliseconds
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

interface AnimatedTransformationPlayerProps {
  steps: TransformationStep[];
  frames: AnimationFrame[];
  width?: number;
  height?: number;
  autoPlay?: boolean;
  onComplete?: () => void;
}

export default function AnimatedTransformationPlayer({
  steps,
  frames,
  width = 480,
  height = 400,
  autoPlay = false,
  onComplete
}: AnimatedTransformationPlayerProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [progress, setProgress] = useState(0);

  const centerX = width / 2;
  const centerY = height / 2;
  const gridSize = 20;

  // Handle auto-play and step progression
  useEffect(() => {
    if (!isPlaying) return;

    const stepDuration = steps[currentStep]?.duration || 3000;
    const progressInterval = 50; // Update progress every 50ms

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        const increment = (progressInterval / stepDuration) * 100;
        const newProgress = prev + increment;
        
        if (newProgress >= 100) {
          clearInterval(progressTimer);
          
          // Move to next step after completion
          setTimeout(() => {
            if (currentStep < steps.length - 1) {
              setCurrentStep(currentStep + 1);
              setProgress(0);
            } else {
              setIsPlaying(false);
              onComplete?.();
            }
          }, 500);
          
          return 100;
        }
        
        return newProgress;
      });
    }, progressInterval);

    return () => clearInterval(progressTimer);
  }, [isPlaying, currentStep, steps, onComplete]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setProgress(0);
    setIsPlaying(false);
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setProgress(0);
      setIsPlaying(false);
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setProgress(0);
      setIsPlaying(false);
    }
  };

  const currentFrame = frames[currentStep] || frames[0];
  const currentStepData = steps[currentStep];

  // Interpolate between current and next frame for smooth animation
  const getInterpolatedFrame = (): AnimationFrame => {
    if (currentStep >= frames.length - 1 || progress === 0) {
      return currentFrame;
    }

    const nextFrame = frames[currentStep + 1];
    const t = progress / 100; // Interpolation factor (0 to 1)

    // Interpolate shapes
    const interpolatedShapes = currentFrame.shapes.map((shape, index) => {
      const nextShape = nextFrame.shapes[index];
      if (!nextShape) return shape;

      if (shape.type === 'polygon' && shape.points && nextShape.points) {
        return {
          ...shape,
          points: shape.points.map((point, i) => {
            const nextPoint = nextShape.points![i];
            return [
              point[0] + (nextPoint[0] - point[0]) * t,
              point[1] + (nextPoint[1] - point[1]) * t
            ] as [number, number];
          })
        };
      }

      return shape;
    });

    // Interpolate annotations (fade in/out)
    const interpolatedAnnotations = currentFrame.annotations.map((ann, index) => {
      const nextAnn = nextFrame.annotations[index];
      if (!nextAnn) return ann;

      return {
        ...ann,
        x: ann.x + (nextAnn.x - ann.x) * t,
        y: ann.y + (nextAnn.y - ann.y) * t
      };
    });

    return {
      shapes: interpolatedShapes,
      annotations: interpolatedAnnotations
    };
  };

  const displayFrame = getInterpolatedFrame();

  return (
    <div className="w-full max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
      {/* Step Information */}
      <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-blue-900 dark:text-blue-100">
            Step {currentStep + 1} of {steps.length}: {currentStepData?.title}
          </h3>
          <div className="text-sm text-blue-700 dark:text-blue-300 font-semibold">
            {Math.round(progress)}%
          </div>
        </div>
        <p className="text-gray-700 dark:text-gray-300 mb-2">
          {currentStepData?.description}
        </p>
        {currentStepData?.formula && (
          <div className="mt-2 p-2 bg-white dark:bg-gray-700 rounded border border-blue-200 dark:border-blue-700">
            <p className="text-sm font-mono text-gray-800 dark:text-gray-200">
              {currentStepData.formula}
            </p>
          </div>
        )}
        {currentStepData?.highlights && currentStepData.highlights.length > 0 && (
          <ul className="mt-2 space-y-1">
            {currentStepData.highlights.map((highlight, i) => (
              <li key={i} className="text-sm text-gray-600 dark:text-gray-400 flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                {highlight}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Progress Bar */}
      <div className="mb-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
        <div 
          className="h-full bg-blue-500 transition-all duration-100 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* SVG Canvas with Grid */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-300 dark:border-gray-700 mb-4 overflow-hidden">
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="w-full">
          {/* Grid lines */}
          {Array.from({ length: Math.ceil(width / gridSize) + 1 }).map((_, i) => (
            <line
              key={`grid-v-${i}`}
              x1={i * gridSize}
              y1={0}
              x2={i * gridSize}
              y2={height}
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-gray-300 dark:text-gray-700"
              opacity="0.3"
            />
          ))}
          {Array.from({ length: Math.ceil(height / gridSize) + 1 }).map((_, i) => (
            <line
              key={`grid-h-${i}`}
              x1={0}
              y1={i * gridSize}
              x2={width}
              y2={i * gridSize}
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-gray-300 dark:text-gray-700"
              opacity="0.3"
            />
          ))}

          {/* X-axis */}
          <line
            x1={0}
            y1={centerY}
            x2={width}
            y2={centerY}
            stroke="currentColor"
            strokeWidth="2"
            className="text-gray-700 dark:text-gray-300"
          />
          <polygon
            points={`${width - 5},${centerY - 5} ${width},${centerY} ${width - 5},${centerY + 5}`}
            fill="currentColor"
            className="text-gray-700 dark:text-gray-300"
          />

          {/* Y-axis */}
          <line
            x1={centerX}
            y1={0}
            x2={centerX}
            y2={height}
            stroke="currentColor"
            strokeWidth="2"
            className="text-gray-700 dark:text-gray-300"
          />
          <polygon
            points={`${centerX - 5},5 ${centerX},0 ${centerX + 5},5`}
            fill="currentColor"
            className="text-gray-700 dark:text-gray-300"
          />

          {/* Axis labels */}
          <text x={width - 15} y={centerY - 10} className="fill-current text-sm font-bold">x</text>
          <text x={centerX + 10} y={15} className="fill-current text-sm font-bold">y</text>
          <text x={centerX - 15} y={centerY + 15} className="fill-current text-xs">O</text>

          {/* Render shapes */}
          {displayFrame.shapes.map((shape, index) => {
            if (shape.type === 'polygon' && shape.points) {
              const pointsStr = shape.points.map(([x, y]) => `${x},${y}`).join(' ');
              return (
                <g key={`shape-${index}`}>
                  <polygon
                    points={pointsStr}
                    fill={shape.fillColor || 'none'}
                    stroke={shape.color || 'currentColor'}
                    strokeWidth={shape.strokeWidth || 2}
                    strokeDasharray={shape.dashed ? '5,5' : 'none'}
                    opacity={shape.fillColor ? 0.5 : 1}
                    className="transition-all duration-300"
                  />
                  {shape.points.map((point, pIndex) => (
                    <circle
                      key={`vertex-${index}-${pIndex}`}
                      cx={point[0]}
                      cy={point[1]}
                      r={3}
                      fill={shape.color || 'currentColor'}
                      className="transition-all duration-300"
                    />
                  ))}
                </g>
              );
            }
            if (shape.type === 'line' && shape.x1 !== undefined) {
              return (
                <line
                  key={`shape-${index}`}
                  x1={shape.x1}
                  y1={shape.y1}
                  x2={shape.x2}
                  y2={shape.y2}
                  stroke={shape.color || 'currentColor'}
                  strokeWidth={shape.strokeWidth || 2}
                  strokeDasharray={shape.dashed ? '5,5' : 'none'}
                  className="transition-all duration-300"
                />
              );
            }
            return null;
          })}

          {/* Render annotations */}
          {displayFrame.annotations.map((annotation, index) => (
            <text
              key={`ann-${index}`}
              x={annotation.x}
              y={annotation.y}
              className="fill-current text-sm font-medium transition-all duration-300"
              style={{ fill: annotation.color || 'currentColor' }}
            >
              {annotation.text}
            </text>
          ))}
        </svg>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-2">
        <button
          onClick={handleReset}
          className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          title="Reset"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
        
        <button
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          title="Previous Step"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={handlePlayPause}
          className="p-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors"
          title={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
        </button>

        <button
          onClick={handleNext}
          disabled={currentStep === steps.length - 1}
          className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          title="Next Step"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Step Indicator */}
      <div className="mt-4 flex justify-center gap-2">
        {steps.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentStep(index);
              setProgress(0);
              setIsPlaying(false);
            }}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentStep
                ? 'bg-blue-500'
                : index < currentStep
                ? 'bg-green-500'
                : 'bg-gray-300 dark:bg-gray-600'
            }`}
            title={`Step ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
