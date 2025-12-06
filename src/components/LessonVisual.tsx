"use client";

import React, { useState } from 'react';
import { 
  Lightbulb, Book, Brain, Target, Sparkles, Zap, 
  Award, CheckCircle2, AlertCircle, Info, Star,
  BookOpen, PenTool, MessageCircle, Users, Globe,
  Calculator, Atom, Microscope, FlaskConical, Beaker,
  Music, Palette, Drama, Newspaper, FileText, Edit3,
  Languages, Volume2, Ear, Eye, Hand, Heart
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface LessonVisualProps {
  type?: 'concept' | 'tip' | 'example' | 'warning' | 'success' | 'info' | 'objective' | 'summary' | 'practice';
  icon?: string;
  title?: string;
  children: React.ReactNode;
  interactive?: boolean;
  color?: 'primary' | 'success' | 'warning' | 'info' | 'accent';
}

const iconMap = {
  // Learning
  lightbulb: Lightbulb,
  book: Book,
  brain: Brain,
  target: Target,
  sparkles: Sparkles,
  zap: Zap,
  award: Award,
  star: Star,
  bookOpen: BookOpen,
  
  // Communication
  penTool: PenTool,
  messageCircle: MessageCircle,
  users: Users,
  languages: Languages,
  volume: Volume2,
  ear: Ear,
  eye: Eye,
  hand: Hand,
  
  // Academic
  calculator: Calculator,
  atom: Atom,
  microscope: Microscope,
  flask: FlaskConical,
  beaker: Beaker,
  globe: Globe,
  
  // Creative
  music: Music,
  palette: Palette,
  drama: Drama,
  
  // Writing
  newspaper: Newspaper,
  fileText: FileText,
  edit: Edit3,
  
  // Status
  checkCircle: CheckCircle2,
  alertCircle: AlertCircle,
  info: Info,
  heart: Heart,
};

const typeConfig = {
  concept: {
    icon: Brain,
    color: 'bg-purple-500/10 border-purple-500/30 text-purple-700 dark:text-purple-300',
    iconColor: 'text-purple-600 dark:text-purple-400',
  },
  tip: {
    icon: Lightbulb,
    color: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-800 dark:text-yellow-200',
    iconColor: 'text-yellow-600 dark:text-yellow-400',
  },
  example: {
    icon: BookOpen,
    color: 'bg-blue-500/10 border-blue-500/30 text-blue-800 dark:text-blue-200',
    iconColor: 'text-blue-600 dark:text-blue-400',
  },
  warning: {
    icon: AlertCircle,
    color: 'bg-red-500/10 border-red-500/30 text-red-800 dark:text-red-200',
    iconColor: 'text-red-600 dark:text-red-400',
  },
  success: {
    icon: CheckCircle2,
    color: 'bg-green-500/10 border-green-500/30 text-green-800 dark:text-green-200',
    iconColor: 'text-green-600 dark:text-green-400',
  },
  info: {
    icon: Info,
    color: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-800 dark:text-cyan-200',
    iconColor: 'text-cyan-600 dark:text-cyan-400',
  },
  objective: {
    icon: Target,
    color: 'bg-orange-500/10 border-orange-500/30 text-orange-800 dark:text-orange-200',
    iconColor: 'text-orange-600 dark:text-orange-400',
  },
  summary: {
    icon: FileText,
    color: 'bg-indigo-500/10 border-indigo-500/30 text-indigo-800 dark:text-indigo-200',
    iconColor: 'text-indigo-600 dark:text-indigo-400',
  },
  practice: {
    icon: PenTool,
    color: 'bg-pink-500/10 border-pink-500/30 text-pink-800 dark:text-pink-200',
    iconColor: 'text-pink-600 dark:text-pink-400',
  },
};

export default function LessonVisual({ 
  type = 'info', 
  icon, 
  title, 
  children, 
  interactive = false,
  color 
}: LessonVisualProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const config = typeConfig[type];
  const IconComponent = icon ? iconMap[icon as keyof typeof iconMap] : config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'relative rounded-lg border-2 p-4 transition-all duration-300',
        config.color,
        interactive && 'cursor-pointer hover:shadow-lg hover:scale-[1.02]'
      )}
      onMouseEnter={() => interactive && setIsHovered(true)}
      onMouseLeave={() => interactive && setIsHovered(false)}
      onClick={() => interactive && setIsExpanded(!isExpanded)}
    >
      <div className="flex gap-3">
        <motion.div
          animate={isHovered ? { rotate: 360, scale: 1.2 } : { rotate: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
          className={cn('flex-shrink-0', config.iconColor)}
        >
          {IconComponent && <IconComponent className="h-6 w-6" />}
        </motion.div>
        
        <div className="flex-1">
          {title && (
            <h4 className="font-semibold text-lg mb-2 flex items-center gap-2">
              {title}
              {interactive && (
                <motion.span
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-sm"
                >
                  ▼
                </motion.span>
              )}
            </h4>
          )}
          
          <motion.div
            initial={false}
            animate={{ 
              height: interactive && !isExpanded ? 0 : 'auto',
              opacity: interactive && !isExpanded ? 0 : 1 
            }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="prose prose-sm dark:prose-invert max-w-none">
              {children}
            </div>
          </motion.div>
          
          {interactive && !isExpanded && (
            <p className="text-sm mt-2 opacity-70">Click to expand...</p>
          )}
        </div>
      </div>
      
      {isHovered && interactive && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-2 -right-2"
        >
          <Sparkles className="h-5 w-5 text-yellow-500" />
        </motion.div>
      )}
    </motion.div>
  );
}

// Pre-configured variants for common use cases
export function ConceptCard({ children, title, icon }: { children: React.ReactNode; title?: string; icon?: string }) {
  return <LessonVisual type="concept" title={title} icon={icon} interactive>{children}</LessonVisual>;
}

export function TipCard({ children, title }: { children: React.ReactNode; title?: string }) {
  return <LessonVisual type="tip" title={title || "💡 Pro Tip"}>{children}</LessonVisual>;
}

export function ExampleCard({ children, title }: { children: React.ReactNode; title?: string }) {
  return <LessonVisual type="example" title={title || "📖 Example"} interactive>{children}</LessonVisual>;
}

export function WarningCard({ children, title }: { children: React.ReactNode; title?: string }) {
  return <LessonVisual type="warning" title={title || "⚠️ Important"}>{children}</LessonVisual>;
}

export function SuccessCard({ children, title }: { children: React.ReactNode; title?: string }) {
  return <LessonVisual type="success" title={title || "✓ Key Point"}>{children}</LessonVisual>;
}

export function PracticeCard({ children, title }: { children: React.ReactNode; title?: string }) {
  return <LessonVisual type="practice" title={title || "✏️ Practice"} interactive>{children}</LessonVisual>;
}
