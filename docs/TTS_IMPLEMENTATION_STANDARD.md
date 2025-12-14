# 🎙️ SmartClass24 Text-to-Speech Implementation Standard

**Last Updated:** December 14, 2025  
**Status:** ACTIVE STANDARD

---

## 🏆 RECOMMENDED: Teacher-Quality Voice Pattern

**For the most natural, teacher-like voice narration, use this pattern from `FormsOfEnergyIntro.tsx` and `HeatEnergyIntro.tsx`:**

### Reference Implementation
Location: `src/components/intros/shs/integrated-science/FormsOfEnergyIntro.tsx`

```typescript
// Speak function - core TTS logic for teacher-quality voice
const speakScene = useCallback((sceneIndex: number) => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  
  // Cancel any ongoing speech first
  window.speechSynthesis.cancel();
  setIsSpeaking(false);
  
  if (isMuted || !isPlaying) return;

  const scene = scenes[sceneIndex];
  const fullText = `${scene.title}. ${scene.narration}`;
  
  const performSpeak = () => {
    if (!window.speechSynthesis) {
      console.warn('Speech synthesis not available');
      // Fall back to timed auto-advance
      setTimeout(() => {
        if (currentSceneRef.current === sceneIndex && sceneIndex < scenes.length - 1) {
          setCurrentScene(sceneIndex + 1);
        }
      }, 8000);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(fullText);
    
    // ⭐ KEY SETTINGS FOR TEACHER-QUALITY VOICE
    utterance.rate = 0.88;    // Slightly slower - more natural
    utterance.pitch = 1.0;    // Normal pitch
    utterance.volume = 1;     // Full volume
    
    // ⭐ VOICE SELECTION PRIORITY (for best quality)
    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(v => v.lang.startsWith('en-') && v.name.toLowerCase().includes('female'))
      || voices.find(v => v.lang.startsWith('en-GB'))
      || voices.find(v => v.lang.startsWith('en-US'))
      || voices.find(v => v.lang.startsWith('en'))
      || voices[0];
    
    if (englishVoice) {
      utterance.voice = englishVoice;
    }
    
    utterance.onstart = () => setIsSpeaking(true);
    
    utterance.onend = () => {
      setIsSpeaking(false);
      // Auto-advance after speech ends (with delay for reading)
      setTimeout(() => {
        if (currentSceneRef.current === sceneIndex && sceneIndex < scenes.length - 1) {
          setCurrentScene(sceneIndex + 1);
        }
      }, 1500);  // 1.5 second pause for comprehension
    };
    
    utterance.onerror = (e: SpeechSynthesisErrorEvent) => {
      // 'interrupted' and 'canceled' are normal when navigating
      if (e.error === 'interrupted' || e.error === 'canceled') {
        setIsSpeaking(false);
        return;
      }
      console.warn('Speech synthesis issue:', e.error);
      setIsSpeaking(false);
    };
    
    window.speechSynthesis.speak(utterance);
  };

  // Ensure voices are loaded before speaking
  const voices = window.speechSynthesis.getVoices();
  if (voices.length === 0) {
    window.speechSynthesis.onvoiceschanged = () => {
      window.speechSynthesis.onvoiceschanged = null;
      setTimeout(performSpeak, 100);
    };
  } else {
    setTimeout(performSpeak, 150);
  }
}, [isMuted, isPlaying]);
```

### ⭐ Critical Settings Summary

| Setting | Value | Why |
|---------|-------|-----|
| `rate` | **0.88** | Natural teacher pace, not rushed |
| `pitch` | **1.0** | Normal, clear tone |
| `volume` | **1.0** | Full clarity |
| Voice Priority | Female EN → en-GB → en-US → any EN | Most pleasant teaching voice |
| Auto-advance delay | **1500ms** | Time for comprehension |
| Fallback timeout | **8000ms** | If TTS fails, still advances |

### ⭐ Critical Implementation Details

1. **Use `useRef` to avoid stale closures:**
```typescript
const currentSceneRef = useRef(currentScene);

useEffect(() => {
  currentSceneRef.current = currentScene;
}, [currentScene]);

// In onend callback, use currentSceneRef.current, NOT currentScene
```

2. **Cancel speech before any navigation:**
```typescript
const handleNext = () => {
  window.speechSynthesis?.cancel();
  setIsSpeaking(false);
  // then navigate
};
```

3. **Wait for voices to load:**
```typescript
const voices = window.speechSynthesis.getVoices();
if (voices.length === 0) {
  window.speechSynthesis.onvoiceschanged = () => performSpeak();
}
```

---

## 📜 Policy: Intelligent Teacher Voice Only

**All new features and lessons MUST use intelligent, curated narration.**

### ❌ NEVER DO THIS:
```typescript
// BAD: Reading raw text literally
<TextToSpeech textToSpeak={lessonContent} />
// Result: "Asterisk asterisk bold text asterisk asterisk, dash item one, dash item two"
```

### ✅ ALWAYS DO THIS:
```typescript
// GOOD: Curated teaching narration
const narration = [
  "Let's calculate the mean of these values",
  "First, we add all numbers together. 12 plus 15 plus 18 equals 45",
  "Next, count how many values we have. There are 3 numbers",
  "Finally, divide 45 by 3 to get 15"
];

const { speak, stop, isSpeaking } = useSpeechSynthesis({
  text: narration[currentStep],
  autoPlay: true,
  rate: 0.9
});
```

---

## 🏗️ Implementation Guide

### 1. **For Animations** (Recommended Pattern)
```typescript
import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis';

export function MyAnimation({ data }: Props) {
  const [step, setStep] = useState(0);
  
  // Write narration as if you're a patient teacher
  const narrationText = [
    `Welcome! Today we'll learn about ${concept}`,
    `Step 1: Notice how ${observation}`,
    `Step 2: Now let's ${action}`,
    `Great! The result is ${result}. This means ${explanation}`
  ];

  const { speak, stop, isSpeaking, isSupported } = useSpeechSynthesis({
    text: narrationText[step],
    autoPlay: true, // Auto-narrate on step change
    rate: 0.9, // Slightly slower for clarity
  });

  return (
    <Card>
      {/* Speaker button for manual replay */}
      {isSupported && (
        <Button onClick={isSpeaking ? stop : speak}>
          {isSpeaking ? <VolumeX /> : <Volume2 />}
        </Button>
      )}
      
      {/* Your animation content */}
    </Card>
  );
}
```

### 2. **For Quiz Feedback**
```typescript
// Wrong answer narration
const wrongAnswerNarration = `Not quite right. Let's think about this together. 
  Remember that ${hint}. The correct answer is ${correctAnswer} because ${explanation}`;

// Correct answer narration
const correctAnswerNarration = `Excellent work! You correctly identified ${answer}. 
  This shows you understand ${concept}`;
```

### 3. **For Step-by-Step Procedures**
```typescript
// Lab/Experiment narration
const procedureNarration = [
  "Safety first: Make sure you're wearing goggles",
  "Step 1: Pour 50 milliliters of water into the beaker",
  "Step 2: Carefully add the sodium chloride and observe",
  "Notice how the salt dissolves? This is called dissolution"
];
```

---

## ✍️ Writing Effective Narration

### The 4 T's of Teaching Voice:

1. **Tell** - State what you're doing
   > "Let's find the median of these numbers"

2. **Teach** - Explain the process
   > "First, we arrange the values from smallest to largest"

3. **Think Aloud** - Model reasoning
   > "Since we have 5 numbers, the middle one is at position 3"

4. **Tie Together** - Connect to meaning
   > "The median of 18 means half the values are below 18 and half are above"

### Ghana Context Integration:
```typescript
// Instead of generic examples
"Calculate the mean of: 10, 20, 30"

// Use relatable Ghanaian contexts
"A trotro in Accra charges 3 cedis, 4 cedis, and 5 cedis. 
 Let's find the average fare"
```

---

## 🚫 What NOT to Narrate

### Skip These:
- Page titles (user can read)
- Button labels (visual UI elements)
- Raw markdown syntax
- Code blocks verbatim
- Long paragraphs (summarize instead)

### Example:
```typescript
// ❌ DON'T: Read everything on screen
const bad = `# Mean Calculator
Click the button below to calculate mean.
The formula is: **mean = sum / count**`;

// ✅ DO: Teach the concept
const good = `Let's calculate the mean using the formula: 
sum divided by count`;
```

---

## 🎯 Quality Checklist

Before implementing TTS, ask:

- [ ] Does this sound like a **patient teacher** explaining?
- [ ] Would a student **understand** just by listening?
- [ ] Are Ghana-specific examples used where possible?
- [ ] Is the pace appropriate (0.9 rate)?
- [ ] Can students **replay** specific steps?
- [ ] Does it explain **why**, not just **what**?

---

## 📊 Migration Status

### ⭐ Gold Standard (Pattern B - Custom TTS):
- `FormsOfEnergyIntro.tsx` - **Reference implementation**
- `HeatEnergyIntro.tsx` - Full canvas animations + teacher voice

### ✅ Using IntelligentLessonIntro (Pattern A):
- `NutritionBalancedDietIntro.tsx`
- `DigestionIntro.tsx`
- `RespirationIntro.tsx`
- `PhotosynthesisIntro.tsx`
- Most other lesson intros

### ✅ Using Intelligent TTS:
- Statistics Animations (4 components)
- [Add new implementations here]

### 🔄 Legacy (Old TTS with Sanitization):
- Virtual Labs (10+ components) - Will migrate as we touch them
- Some lesson readers - Will upgrade gradually

### 🎯 Next Priorities:
1. Transformation animations (geometry)
2. Quiz feedback system
3. Past question explanations
4. [Your additions here]

---

## 🛠️ Hook Reference

### `useSpeechSynthesis` Parameters:

```typescript
interface UseSpeechSynthesisProps {
  text: string;           // The narration text
  autoPlay?: boolean;     // Auto-play on text change (default: false)
  rate?: number;          // Speed: 0.5-2 (default: 1)
  pitch?: number;         // Pitch: 0-2 (default: 1)
  volume?: number;        // Volume: 0-1 (default: 1)
}
```

### Returns:
```typescript
{
  speak: () => void;      // Manually trigger speech
  stop: () => void;       // Stop current speech
  isSpeaking: boolean;    // Is currently speaking?
  isSupported: boolean;   // Browser supports TTS?
}
```

---

## 🌍 Multilingual Roadmap

Current: English (`en-GB`)

Planned:
- Twi (`tw`)
- Ga (`gaa`)
- Ewe (`ee`)

To add language support, update hook:
```typescript
utterance.lang = 'tw'; // For Twi
```

---

## 📝 Notes for Developers

1. **Test on Mobile** - Most users on phones
2. **Keep Narration Concise** - 1-2 sentences per step
3. **Use Natural Language** - "Let's" not "We will"
4. **Avoid Jargon** - Define technical terms
5. **Celebrate Progress** - "Great job!", "Excellent!"

---

## 🆘 Support

Questions? Check:
- `/src/hooks/useSpeechSynthesis.ts` - Main hook
- `/src/components/StatisticsAnimations.tsx` - Reference implementation
- This document - Updated with each new pattern

**Remember:** We're building **virtual teachers**, not **text readers**.
