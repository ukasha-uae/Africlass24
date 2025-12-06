"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ChevronRight, Check } from 'lucide-react';

interface Step {
  id: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
}

interface ProcessDiagramProps {
  steps: Step[];
  title?: string;
  orientation?: 'horizontal' | 'vertical';
}

export function ProcessDiagram({ steps, title, orientation = 'horizontal' }: ProcessDiagramProps) {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="space-y-4 p-6 bg-gradient-to-br from-accent/5 to-accent/10 rounded-lg border">
      {title && <h3 className="text-xl font-bold text-center mb-6">{title}</h3>}
      
      <div className={cn(
        "flex gap-4",
        orientation === 'vertical' ? 'flex-col' : 'flex-row items-center'
      )}>
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2 }}
              className={cn(
                "flex-1 p-4 rounded-lg border-2 cursor-pointer transition-all",
                activeStep === index 
                  ? "bg-primary/10 border-primary shadow-lg" 
                  : "bg-card border-border hover:border-primary/50"
              )}
              onClick={() => setActiveStep(index)}
            >
              <div className="flex items-center gap-3">
                <motion.div
                  animate={activeStep === index ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 0.5, repeat: activeStep === index ? Infinity : 0 }}
                  className={cn(
                    "flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold",
                    activeStep === index ? "bg-primary text-primary-foreground" : "bg-muted"
                  )}
                >
                  {activeStep > index ? <Check className="h-4 w-4" /> : index + 1}
                </motion.div>
                <div className="flex-1">
                  <h4 className="font-semibold">{step.title}</h4>
                  <AnimatePresence>
                    {activeStep === index && (
                      <motion.p
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="text-sm text-muted-foreground mt-1"
                      >
                        {step.description}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
            
            {index < steps.length - 1 && (
              <ChevronRight className={cn(
                "flex-shrink-0",
                orientation === 'vertical' && "rotate-90"
              )} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

interface ComparisonCardProps {
  left: {
    title: string;
    items: string[];
    color?: string;
  };
  right: {
    title: string;
    items: string[];
    color?: string;
  };
  title?: string;
}

export function ComparisonCard({ left, right, title }: ComparisonCardProps) {
  return (
    <div className="space-y-4 p-6 bg-gradient-to-br from-accent/5 to-accent/10 rounded-lg border">
      {title && <h3 className="text-xl font-bold text-center mb-6">{title}</h3>}
      
      <div className="grid grid-cols-2 gap-6">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={cn(
            "p-4 rounded-lg border-2",
            left.color || "border-blue-500/50 bg-blue-500/5"
          )}
        >
          <h4 className="font-bold text-lg mb-3">{left.title}</h4>
          <ul className="space-y-2">
            {left.items.map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-2"
              >
                <Check className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm">{item}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
        
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={cn(
            "p-4 rounded-lg border-2",
            right.color || "border-green-500/50 bg-green-500/5"
          )}
        >
          <h4 className="font-bold text-lg mb-3">{right.title}</h4>
          <ul className="space-y-2">
            {right.items.map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-2"
              >
                <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm">{item}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
}

interface InteractiveCardProps {
  front: React.ReactNode;
  back: React.ReactNode;
  title?: string;
}

export function FlipCard({ front, back, title }: InteractiveCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="perspective-1000 h-64">
      <motion.div
        className="relative w-full h-full cursor-pointer"
        onClick={() => setIsFlipped(!isFlipped)}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front */}
        <div
          className={cn(
            "absolute inset-0 backface-hidden p-6 rounded-lg border-2 bg-card",
            "flex flex-col items-center justify-center text-center"
          )}
          style={{ backfaceVisibility: 'hidden' }}
        >
          {title && <h4 className="font-bold text-lg mb-4">{title}</h4>}
          {front}
          <p className="text-xs text-muted-foreground mt-4">Click to flip</p>
        </div>
        
        {/* Back */}
        <div
          className={cn(
            "absolute inset-0 backface-hidden p-6 rounded-lg border-2 bg-primary/10",
            "flex flex-col items-center justify-center text-center"
          )}
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          {back}
          <p className="text-xs text-muted-foreground mt-4">Click to flip back</p>
        </div>
      </motion.div>
    </div>
  );
}
