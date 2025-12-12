# Quick Prompt Reference Card

## 🎯 Copy-Paste Prompt Template

```
Create an interactive self-teaching lesson on [TOPIC NAME] with these features:

VOICE NARRATION:
- Intelligent teaching (NOT reading text)
- Explain WHY and HOW (think-aloud style)
- Rate: 0.9, Language: en-GB
- Auto-play with toggle button

ANIMATIONS:
- [5-7] step carousel (horizontal sliding)
- AnimatePresence mode="wait"
- Each step = one micro-concept
- Progressive disclosure pattern

VISUALS:
- Gradient backgrounds (from-blue-500 to-purple-500)
- No harsh borders (divide-y only)
- Rounded-xl, shadow-lg
- px-6 py-4 padding
- Dark mode compatible
- Icons for concepts (🎯📊📈🧮)

GHANA CONTEXT:
- [List specific examples: trotros, cedis, WASSCE, markets, etc.]

COMPONENTS NEEDED:
1. [ComponentName1] - [What it teaches visually]
2. [ComponentName2] - [What it demonstrates]
3. QuickReferenceTable - [Comparison/summary]

TECHNICAL:
- React + TypeScript ("use client")
- useSpeechSynthesis hook
- Framer Motion transitions
- Tailwind CSS
- Web Speech API (free, browser-native)
- Responsive: Desktop tables → Mobile cards

NARRATION STYLE:
❌ Wrong: "Step 1: Calculate the sum"
✅ Right: "Let's add these numbers together. Watch what happens when we combine 5 and 8. Notice how the total grows to 13. This is important because..."
```

---

## 🔑 Essential Keywords

### Must-Have in Every Prompt:
- **"Intelligent voice narration"** (not "text-to-speech" or "read text")
- **"Teach the concept"** (not "read the steps")
- **"Step-by-step carousel"** (not "animation")
- **"Ghana context examples"** (not "real-world examples")
- **"Progressive disclosure"** (not "show everything")
- **"useSpeechSynthesis hook"** (not "voice API")
- **"Browser-native"** (not "external API")
- **"Responsive design"** (not "mobile-friendly")

### Component Phrases:
- "Create a [N]-step interactive animation"
- "With intelligent voice that explains reasoning"
- "Using Ghana-specific scenarios"
- "Gradient styling, no harsh borders"
- "Desktop table converts to mobile cards"

### Voice Narration Phrases:
- "Explain WHY before HOW"
- "Use conversational teaching style"
- "Think-aloud protocol"
- "Point out patterns and insights"
- "Anticipate what happens next"

---

## 📋 3-Minute Lesson Prompt

For quick lessons, use this shortened version:

```
Create interactive [TOPIC] lesson:

Components:
- [ConceptAnimation] (6 steps, voice explains reasoning)
- [ComparisonTable] (responsive, gradient styled)

Voice: Teach WHY it works, not just WHAT to do
Examples: [Ghana scenario 1], [Ghana scenario 2]
Style: Carousel + gradients + no borders
Tech: React, Framer Motion, Web Speech API (free)
```

---

## 🎤 Voice Narration Quick Rules

### Structure Each Narration:
1. **Context**: "Let's understand..."
2. **Action**: "Watch what happens when..."
3. **Reasoning**: "This works because..."
4. **Connection**: "Notice how this relates to..."

### Power Phrases:
- "Let's explore..."
- "Notice what happens when..."
- "Think about it this way..."
- "This is important because..."
- "Here's the interesting part..."
- "Watch carefully as..."
- "Can you see the pattern?"
- "This makes sense when you realize..."

### Avoid:
- ❌ "Step 1, Step 2, Step 3"
- ❌ "The formula is..."
- ❌ "Next we do..."
- ❌ Reading bullet points

---

## 🎨 Style Quick Reference

```typescript
// Card wrapper
<Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30">

// Header gradient
<div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-4">

// Table (no grid borders!)
<table className="rounded-xl shadow-lg">
  <tbody className="divide-y divide-gray-200"> {/* NOT border-all */}

// Cards on mobile
<div className="md:hidden grid gap-4">
  {items.map(item => (
    <div className="rounded-xl shadow-lg">
      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-4">
        {/* Header */}
      </div>
      <div className="p-4 space-y-3">
        {/* Content */}
      </div>
    </div>
  ))}
</div>
```

---

## 🇬🇭 Ghana Context Examples Bank

### Money:
- "Buying kenkey at GH₵3 per ball"
- "Trotro fare from Kaneshie to Circle"
- "Mobile money charges"
- "Salary calculations in cedis"

### Transport:
- "Trotro delays when it rains"
- "Taxi vs Uber costs"
- "Distance from Accra to Kumasi"

### Markets:
- "Makola market vendor profit"
- "Bulk buying at Kaneshie"
- "Price per kilogram of tomatoes"

### School:
- "WASSCE exam scores"
- "BECE results"
- "Class test averages"
- "School fees payment"

### Food:
- "Selling waakye portions"
- "Mixing ingredients for jollof"
- "Dividing banku into portions"

### Places:
- "Independence Square field"
- "Accra Mall shopping"
- "Cape Coast bridge"

---

## ✅ Quality Checklist

Before submitting lesson to AI:

- [ ] Specified intelligent voice (not reading)
- [ ] Listed Ghana examples
- [ ] Named specific components needed
- [ ] Mentioned useSpeechSynthesis hook
- [ ] Said "browser-native" or "free"
- [ ] Requested responsive design
- [ ] Specified gradient styling
- [ ] Mentioned dark mode
- [ ] Said "carousel" or "step-by-step"
- [ ] Requested "teach reasoning"

---

## 🚀 Example: Complete Mini-Prompt

```
Create 5-step interactive animation teaching FRACTIONS using pizza sharing:

Voice: "Let's share a pizza fairly. If 4 friends split it equally, 
watch what happens to each slice. Notice that 1 divided by 4 gives 
each person one-quarter. This makes sense because 4 quarters make 1 
whole pizza again!"

Components:
- PizzaFractionAnimation (visual pizza slicing)
- FractionComparisonTable (1/2, 1/4, 3/4 with visuals)

Ghana example: Sharing kenkey, dividing waakye portions, splitting trotro fare

Style: Gradient circles for fractions, animated slicing, responsive cards
Tech: useSpeechSynthesis, Framer Motion, free Web Speech API
```

---

## 💡 Remember

**The Golden Rule:**
> "Make the AI feel like a teacher sitting beside the student, 
> explaining WHY things work, not just WHAT to do."

**Core Pattern:**
1. Visual first (show the concept)
2. Voice explains reasoning (teach why)
3. Formula second (formalize it)
4. Practice third (apply it)

**Success Metric:**
If a student can pause the voice and explain the concept to someone else, you've succeeded!

---

**Save this card!** Use it every time you create a new lesson.
