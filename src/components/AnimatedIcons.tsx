"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Calculator, Atom, FlaskConical, Globe, Book, Brain,
  Music, Palette, Users, Languages, Ear, Eye, Hand,
  Heart, Lightbulb, Zap, Target, Star, Award, CheckCircle2
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface AnimatedIconProps {
  icon: string;
  label?: string;
  color?: string;
  delay?: number;
  onClick?: () => void;
}

const iconMap = {
  calculator: Calculator,
  atom: Atom,
  flask: FlaskConical,
  globe: Globe,
  book: Book,
  brain: Brain,
  music: Music,
  palette: Palette,
  users: Users,
  languages: Languages,
  ear: Ear,
  eye: Eye,
  hand: Hand,
  heart: Heart,
  lightbulb: Lightbulb,
  zap: Zap,
  target: Target,
  star: Star,
  award: Award,
  check: CheckCircle2,
};

export function AnimatedIcon({ icon, label, color = 'text-primary', delay = 0, onClick }: AnimatedIconProps) {
  const IconComponent = iconMap[icon as keyof typeof iconMap];
  
  if (!IconComponent) return null;

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: delay,
      }}
      whileHover={{ 
        scale: 1.2, 
        rotate: [0, -10, 10, -10, 0],
        transition: { duration: 0.3 }
      }}
      whileTap={{ scale: 0.9 }}
      className={cn(
        "flex flex-col items-center gap-2 p-4 rounded-lg cursor-pointer",
        "hover:bg-accent/50 transition-colors",
        onClick && "cursor-pointer"
      )}
      onClick={onClick}
    >
      <IconComponent className={cn("h-8 w-8", color)} />
      {label && <span className="text-sm font-medium text-center">{label}</span>}
    </motion.div>
  );
}

interface IconGridProps {
  icons: Array<{ icon: string; label?: string; color?: string; onClick?: () => void }>;
  columns?: number;
}

export function IconGrid({ icons, columns = 4 }: IconGridProps) {
  return (
    <div 
      className="grid gap-4 mb-6"
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
    >
      {icons.map((iconProps, index) => (
        <AnimatedIcon
          key={index}
          delay={index * 0.1}
          {...iconProps}
        />
      ))}
    </div>
  );
}

interface FloatingIconProps {
  icon: string;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  position?: 'tl' | 'tr' | 'bl' | 'br';
  animate?: boolean;
}

export function FloatingIcon({ 
  icon, 
  color = 'text-primary/20', 
  size = 'md',
  position = 'tr',
  animate = true 
}: FloatingIconProps) {
  const IconComponent = iconMap[icon as keyof typeof iconMap];
  
  if (!IconComponent) return null;

  const sizeClasses = {
    sm: 'h-12 w-12',
    md: 'h-20 w-20',
    lg: 'h-32 w-32',
  };

  const positionClasses = {
    tl: 'top-4 left-4',
    tr: 'top-4 right-4',
    bl: 'bottom-4 left-4',
    br: 'bottom-4 right-4',
  };

  return (
    <motion.div
      className={cn(
        "absolute pointer-events-none z-0",
        positionClasses[position]
      )}
      animate={animate ? {
        y: [0, -20, 0],
        rotate: [0, 5, 0, -5, 0],
        opacity: [0.3, 0.5, 0.3],
      } : {}}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <IconComponent className={cn(sizeClasses[size], color)} />
    </motion.div>
  );
}

interface PulsingIconProps {
  icon: string;
  color?: string;
  label?: string;
}

export function PulsingIcon({ icon, color = 'text-primary', label }: PulsingIconProps) {
  const IconComponent = iconMap[icon as keyof typeof iconMap];
  
  if (!IconComponent) return null;

  return (
    <div className="flex flex-col items-center gap-2">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [1, 0.8, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={cn("p-3 rounded-full bg-accent/20", color)}
      >
        <IconComponent className="h-6 w-6" />
      </motion.div>
      {label && <span className="text-xs text-muted-foreground">{label}</span>}
    </div>
  );
}
