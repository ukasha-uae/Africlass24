import { useCallback, useRef, useEffect, useState } from 'react';

type SoundType = 'correct' | 'wrong' | 'click' | 'complete' | 'tick';

export const useSoundEffects = () => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    // Initialize AudioContext on user interaction if possible, or lazily
    const AudioContextClass = (window.AudioContext || (window as any).webkitAudioContext);
    if (AudioContextClass) {
      audioContextRef.current = new AudioContextClass();
    }
    
    // Load mute preference
    const savedMute = localStorage.getItem('soundMuted');
    if (savedMute) {
      setIsMuted(JSON.parse(savedMute));
    }

    return () => {
      if (audioContextRef.current?.state !== 'closed') {
        audioContextRef.current?.close();
      }
    };
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => {
      const newValue = !prev;
      localStorage.setItem('soundMuted', JSON.stringify(newValue));
      return newValue;
    });
  }, []);

  const playSound = useCallback((type: SoundType) => {
    if (isMuted || !audioContextRef.current) return;

    // Resume context if suspended (browser policy)
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }

    const ctx = audioContextRef.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    const now = ctx.currentTime;

    switch (type) {
      case 'correct':
        // High pitched pleasant chime (C5 -> E5)
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(523.25, now); // C5
        oscillator.frequency.exponentialRampToValueAtTime(659.25, now + 0.1); // E5
        gainNode.gain.setValueAtTime(0.1, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        oscillator.start(now);
        oscillator.stop(now + 0.3);
        break;

      case 'wrong':
        // Low pitched buzz (A2 -> G2)
        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(110.00, now); // A2
        oscillator.frequency.linearRampToValueAtTime(98.00, now + 0.2); // G2
        gainNode.gain.setValueAtTime(0.1, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        oscillator.start(now);
        oscillator.stop(now + 0.3);
        break;

      case 'click':
        // Short high blip
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(800, now);
        gainNode.gain.setValueAtTime(0.05, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
        oscillator.start(now);
        oscillator.stop(now + 0.05);
        break;

      case 'complete':
        // Victory fanfare (C4 - E4 - G4 - C5)
        const notes = [261.63, 329.63, 392.00, 523.25];
        notes.forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gn = ctx.createGain();
          osc.connect(gn);
          gn.connect(ctx.destination);
          
          osc.type = 'triangle';
          osc.frequency.value = freq;
          
          const startTime = now + (i * 0.1);
          gn.gain.setValueAtTime(0.1, startTime);
          gn.gain.exponentialRampToValueAtTime(0.01, startTime + 0.4);
          
          osc.start(startTime);
          osc.stop(startTime + 0.4);
        });
        break;
        
      case 'tick':
        // Woodblock tick
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(1200, now);
        gainNode.gain.setValueAtTime(0.05, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
        oscillator.start(now);
        oscillator.stop(now + 0.03);
        break;
    }
  }, [isMuted]);

  return { playSound, isMuted, toggleMute };
};
