# Interactive Visual Elements Guide

This guide shows how to add engaging, interactive visual elements to lessons.

## 1. Lesson Visual Cards

### Basic Usage
```tsx
import LessonVisual from '@/components/LessonVisual';

<LessonVisual type="concept" title="Key Concept" icon="brain">
  Your content here
</LessonVisual>
```

### Available Types
- `concept` - Purple, for key concepts (brain icon)
- `tip` - Yellow, for helpful tips (lightbulb icon)
- `example` - Blue, for examples (book icon)
- `warning` - Red, for important warnings (alert icon)
- `success` - Green, for key takeaways (checkmark icon)
- `info` - Cyan, for general information (info icon)
- `objective` - Orange, for learning objectives (target icon)
- `summary` - Indigo, for summaries (document icon)
- `practice` - Pink, for practice exercises (pen icon)

### Quick Variants
```tsx
import { ConceptCard, TipCard, ExampleCard, WarningCard, SuccessCard, PracticeCard } from '@/components/LessonVisual';

<ConceptCard title="Photosynthesis">
  Plants convert sunlight into energy...
</ConceptCard>

<TipCard title="Study Tip">
  Use mnemonics to remember...
</TipCard>

<ExampleCard title="Example 1">
  Calculate: 2 + 2 × 3 = ?
</ExampleCard>

<WarningCard title="Common Mistake">
  Don't forget to...
</WarningCard>
```

### Interactive Cards
Add `interactive` prop to make cards expandable:
```tsx
<LessonVisual type="concept" title="Click to Learn More" interactive>
  This content is hidden until clicked!
</LessonVisual>
```

## 2. Animated Icons

### Icon Grid
Display a grid of clickable icons:
```tsx
import { IconGrid } from '@/components/AnimatedIcons';

<IconGrid 
  columns={4}
  icons={[
    { icon: 'calculator', label: 'Math', color: 'text-blue-600' },
    { icon: 'flask', label: 'Science', color: 'text-green-600' },
    { icon: 'globe', label: 'Geography', color: 'text-purple-600' },
    { icon: 'book', label: 'Reading', color: 'text-orange-600' },
  ]} 
/>
```

### Floating Background Icons
Add decorative floating icons:
```tsx
import { FloatingIcon } from '@/components/AnimatedIcons';

<div className="relative">
  <FloatingIcon icon="lightbulb" position="tr" size="lg" />
  <FloatingIcon icon="brain" position="bl" size="md" />
  {/* Your content */}
</div>
```

Positions: `tl` (top-left), `tr` (top-right), `bl` (bottom-left), `br` (bottom-right)
Sizes: `sm`, `md`, `lg`

### Pulsing Icons
```tsx
import { PulsingIcon } from '@/components/AnimatedIcons';

<PulsingIcon icon="heart" label="Important" color="text-red-600" />
```

## 3. Interactive Diagrams

### Process Diagram (Step-by-Step)
```tsx
import { ProcessDiagram } from '@/components/InteractiveDiagrams';

<ProcessDiagram
  title="Photosynthesis Process"
  orientation="horizontal"
  steps={[
    {
      id: '1',
      title: 'Light Absorption',
      description: 'Chlorophyll absorbs sunlight',
    },
    {
      id: '2',
      title: 'Water Splitting',
      description: 'Water molecules are broken down',
    },
    {
      id: '3',
      title: 'Glucose Production',
      description: 'Glucose is created and oxygen released',
    },
  ]}
/>
```

### Comparison Card
```tsx
import { ComparisonCard } from '@/components/InteractiveDiagrams';

<ComparisonCard
  title="Metaphor vs Simile"
  left={{
    title: 'Metaphor',
    items: [
      'Direct comparison',
      'No "like" or "as"',
      'Example: "Time is money"',
    ],
    color: 'border-blue-500/50 bg-blue-500/5'
  }}
  right={{
    title: 'Simile',
    items: [
      'Uses "like" or "as"',
      'Indirect comparison',
      'Example: "Brave as a lion"',
    ],
    color: 'border-green-500/50 bg-green-500/5'
  }}
/>
```

### Flip Card
```tsx
import { FlipCard } from '@/components/InteractiveDiagrams';

<FlipCard
  title="Vocabulary"
  front={
    <div>
      <h3 className="text-2xl font-bold">Photosynthesis</h3>
      <p className="text-muted-foreground mt-2">Click to see definition</p>
    </div>
  }
  back={
    <div>
      <p className="text-lg">
        The process by which plants use sunlight, water, and carbon dioxide 
        to create oxygen and energy in the form of sugar.
      </p>
    </div>
  }
/>
```

## 4. Available Icons

### Learning Icons
`lightbulb`, `book`, `brain`, `target`, `sparkles`, `zap`, `award`, `star`, `bookOpen`

### Communication Icons
`penTool`, `messageCircle`, `users`, `languages`, `volume`, `ear`, `eye`, `hand`

### Science Icons
`calculator`, `atom`, `microscope`, `flask`, `beaker`, `globe`

### Creative Icons
`music`, `palette`, `drama`

### Status Icons
`checkCircle`, `alertCircle`, `info`, `heart`

## 5. Example Lesson Section

Here's a complete example showing all elements together:

```tsx
export default function LessonPage() {
  return (
    <div className="space-y-6">
      {/* Floating background icons */}
      <div className="relative">
        <FloatingIcon icon="lightbulb" position="tr" />
        <h1>Listening Comprehension</h1>
      </div>

      {/* Objectives */}
      <LessonVisual type="objective" title="Learning Objectives" icon="target">
        <ul>
          <li>Understand the main idea</li>
          <li>Identify key details</li>
        </ul>
      </LessonVisual>

      {/* Icon grid for categories */}
      <IconGrid 
        icons={[
          { icon: 'ear', label: 'Listen' },
          { icon: 'brain', label: 'Think' },
          { icon: 'penTool', label: 'Note' },
          { icon: 'checkCircle', label: 'Review' },
        ]} 
      />

      {/* Concepts */}
      <ConceptCard title="What is Listening?" interactive>
        Listening means paying attention to sounds and understanding them.
      </ConceptCard>

      {/* Process diagram */}
      <ProcessDiagram
        title="Listening Process"
        steps={[
          { id: '1', title: 'Hear', description: 'Sound reaches your ears' },
          { id: '2', title: 'Process', description: 'Brain interprets the sound' },
          { id: '3', title: 'Understand', description: 'You grasp the meaning' },
        ]}
      />

      {/* Tip */}
      <TipCard>
        Take notes while listening to remember key points!
      </TipCard>

      {/* Example */}
      <ExampleCard title="Practice">
        Listen to the audio and answer: What is the main idea?
      </ExampleCard>
    </div>
  );
}
```

## Tips for Best Use

1. **Don't Overuse** - Use 2-3 visual elements per section, not on every paragraph
2. **Match Icons to Content** - Science lessons use science icons, language lessons use communication icons
3. **Color Coding** - Use consistent colors for similar concepts
4. **Interactive for Details** - Use `interactive` prop for extra information students can explore
5. **Mobile Friendly** - All components are responsive and touch-friendly

## Performance Note

All animations use Framer Motion and are optimized for performance. They only animate when visible on screen.
