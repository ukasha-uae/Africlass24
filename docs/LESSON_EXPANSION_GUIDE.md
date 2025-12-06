# Lesson Expansion Guide

## Standard Lesson Structure for BECE Readiness

### Required Components (All lessons must have):

1. **objectives** (8-10 items)
2. **introduction** (300-500 words)
3. **keyConcepts** (7-10 sections)
4. **activities** (7 exercises)
5. **pastQuestions** (15 BECE-style questions)
6. **endOfLessonQuiz** (17 questions)
7. **summary** (comprehensive recap)

---

## 1. OBJECTIVES (8-10 learning outcomes)

**Format:** Array of strings
**Guidelines:**
- Start with action verbs (Define, Identify, Apply, Analyze, etc.)
- Be specific and measurable
- Include BECE exam reference
- Cover all major concepts in the lesson

**Example:**
```typescript
objectives: [
  'Define [concept] and explain its importance in English language',
  'Identify and classify [types] with 90% accuracy',
  'Apply [rules] in sentence construction',
  'Analyze [errors] and provide corrections',
  'Answer BECE-style examination questions on [topic]'
]
```

---

## 2. INTRODUCTION (300-500 words)

**Format:** Single string
**Must include:**
- Ghana cultural context
- WAEC BECE relevance
- Real-world application
- What students will learn
- Why it matters

**Template:**
```
[Topic] is [definition/importance]. In Ghana, [cultural context]. 
This lesson is essential for the WAEC BECE examinations where students 
are tested on [specific skills]. 

You will learn:
- [Key skill 1]
- [Key skill 2]
- [Key skill 3]

These skills will help you [real-world benefit].
```

---

## 3. KEY CONCEPTS (7-10 detailed sections)

**Format:** Array of objects with `title` and `content`
**Guidelines:**
- Each section should be 100-200 words
- Include examples with Ghanaian names/contexts
- Use numbered lists for clarity
- Include "Common Mistake" warnings where relevant

**Structure:**
```typescript
keyConcepts: [
  { 
    title: '1. [Main Concept]', 
    content: 'Definition and explanation.\n\nExamples:\n- Example 1\n- Example 2\n\nNote: [Important point]' 
  },
  { 
    title: '2. [Sub-concept]', 
    content: 'Detailed explanation with examples...' 
  }
]
```

---

## 4. ACTIVITIES (7 exercises)

**Format:** Object with `type: 'exercises'` and `questions` array
**Types to include:**
1. Fill in the blanks
2. Match columns
3. Error correction
4. Dialogue/Paragraph writing
5. Oral practice/Role-play
6. Classification (Formal vs Informal, etc.)
7. Creative writing

**Structure:**
```typescript
activities: { 
  type: 'exercises', 
  questions: [
    { 
      type: 'fill_in_blanks', 
      question: '**Exercise 1: [Title]**\n[Instructions]\n\n1. [Question]\n2. [Question]\n\n**Answers:** [Solutions]' 
    }
  ] 
}
```

---

## 5. PAST QUESTIONS (15 BECE-style)

**Format:** Array of objects with `question` and `solution`
**Guidelines:**
- Cover all key concepts
- Mix question types (MCQ, short answer, comprehension)
- Reference years 2016-2023
- Include full explanations

**Structure:**
```typescript
pastQuestions: [
  { 
    question: '[Question text with options if MCQ]', 
    solution: '[Answer] → [Full explanation with rule/reason]' 
  }
]
```

---

## 6. END-OF-LESSON QUIZ (17 questions)

**CRITICAL: Use exact type names and structures**

### Question Type Reference:

#### A. Multiple Choice (10 questions)
```typescript
{
  type: 'mcq',  // NOT 'multiple_choice'
  question: 'Question text?',
  options: ['Option A', 'Option B', 'Option C', 'Option D'],
  answer: 'Option B',  // NOT 'correctAnswer'
  explanation: 'Explanation text'
}
```

#### B. True/False (2 questions)
```typescript
{
  type: 'truefalse',  // NOT 'true_false'
  statement: 'Statement text.',  // NOT 'question'
  answer: 'true',  // lowercase, NOT 'True'
  reason: 'Explanation text'  // NOT 'explanation'
}
```

#### C. Fill in the Blank (1 question)
```typescript
{
  type: 'fillblank',  // NOT 'fill_in_blank'
  sentence: 'The capital of Ghana is ___.',  // NOT 'question'
  answer: 'Accra',
  alternatives: ['accra', 'ACCRA'],  // Optional
  explanation: 'Explanation text'
}
```

#### D. Multiple Select (2 questions)
```typescript
{
  type: 'multiple_select',  // or 'multiselect'
  question: 'Which of the following...? (Select all)',
  options: ['Option A', 'Option B', 'Option C', 'Option D'],
  correctAnswers: ['Option A', 'Option C']  // Array, NOT 'correctAnswer'
}
```

#### E. Matching (1 question)
```typescript
{
  type: 'matching',
  question: 'Match the items:',  // Optional
  pairs: [
    { left: 'Item 1', right: 'Match 1' },
    { left: 'Item 2', right: 'Match 2' },
    { left: 'Item 3', right: 'Match 3' }
  ],
  explanation: 'Explanation text'
}
```

#### F. Short Answer (1 question)
```typescript
{
  type: 'shortanswer',  // NOT 'short_answer'
  question: 'Question text?',
  answer: 'Expected answer',
  alternatives: ['Alternative 1', 'Alternative 2'],  // Optional
  explanation: 'Explanation text'
}
```

### Quiz Distribution:
- 10 MCQ (covering all major concepts)
- 2 True/False
- 1 Fill in the Blank
- 2 Multiple Select
- 1 Matching
- 1 Short Answer
**Total: 17 questions**

---

## 7. SUMMARY (300-400 words)

**Format:** Single string
**Must include:**
- Title: "Lesson Summary: [Topic Name]"
- Key Points Recap (numbered list)
- Common Mistakes to Avoid
- BECE Exam Tips
- Study Advice

---

## CRITICAL RULES TO AVOID ERRORS

### 1. String Formatting
✅ **DO:**
```typescript
'It\'s a sunny day'  // Escape apostrophes inside single quotes
"It's a sunny day"   // Or use double quotes
```

❌ **DON'T:**
```typescript
'It's a sunny day'   // Unescaped apostrophe = parsing error
'Text here.\'        // Backslash at end = unterminated string
'Text here.\'}       // Backslash before closing = error
```

### 2. Smart Quotes (NEVER USE)
❌ Avoid: ' ' " " – — (Unicode quotes/dashes)
✅ Use: ' ' " " - - (ASCII apostrophes/quotes/hyphens)

### 3. Quiz Type Names (EXACT)
- `mcq` not `multiple_choice`
- `truefalse` not `true_false`
- `fillblank` not `fill_in_blank`
- `shortanswer` not `short_answer`
- `multiple_select` or `multiselect`

### 4. Property Names
- MCQ: `answer` (not `correctAnswer`)
- True/False: `statement` (not `question`), `reason` (not `explanation`)
- Fill Blank: `sentence` (not `question`)
- Multiple Select: `correctAnswers` (not `correctAnswer`)

### 5. Boolean Values
✅ `'true'` and `'false'` (lowercase strings)
❌ `'True'`, `'False'`, `true`, `false` (wrong format)

---

## EXPANSION WORKFLOW

### Step 1: Research
- Review WAEC BECE past questions (2016-2023)
- Check Ghana Education Service curriculum
- Identify common student errors

### Step 2: Draft Content
- Write all 7 sections in order
- Use Ghanaian names: Kofi, Ama, Kwame, Akua, Yaw, Abena
- Use Ghanaian contexts: Accra, Kumasi, Cape Coast, tro-tro, fufu, etc.

### Step 3: Validate Before Committing
```bash
node validate-lesson.js "lesson-slug"
```

### Step 4: Test
- Check for build errors
- View lesson in browser
- Test all quiz questions
- Verify activities display correctly

---

## QUALITY CHECKLIST

Before marking a lesson as complete, verify:

- [ ] 8-10 objectives present
- [ ] Introduction 300-500 words
- [ ] 7-10 key concepts with examples
- [ ] 7 varied activities
- [ ] 15 past questions with full solutions
- [ ] 17 quiz questions (correct distribution)
- [ ] All quiz types use correct property names
- [ ] No unescaped apostrophes in strings
- [ ] No smart quotes or Unicode characters
- [ ] Summary includes BECE tips
- [ ] All examples use Ghanaian context
- [ ] Grammar and spelling checked
- [ ] Build passes without errors

---

## QUICK REFERENCE: Common Ghana Contexts

**Names:** Kofi, Ama, Kwame, Akua, Yaw, Abena, Kojo, Efua, Mensah
**Cities:** Accra, Kumasi, Tamale, Cape Coast, Takoradi, Sunyani
**Schools:** Achimota School, Wesley Girls, Mfantsipim, Prempeh College
**Cultural:** tro-tro, fufu, waakye, kente, highlife music, Independence Day
**Geography:** Volta River, Lake Volta, Kakum National Park, Mole National Park

---

## Support Scripts Available

1. `validate-lesson.js` - Check for common errors
2. `generate-quiz.js` - Create properly formatted quiz questions
3. `fix-apostrophes.js` - Fix escaping issues
4. `check-lesson-completeness.js` - Verify all sections present

Run any script: `node [script-name].js`
