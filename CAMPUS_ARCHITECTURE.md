# 🏫 Campus Architecture - Scalability Guide

## Overview
This document explains the scalable campus architecture for SmartJHS/SHS and future campus additions.

## Architecture Summary

### ✅ **What We've Built**
A unified, config-driven campus system that allows adding new campuses (JHS, SHS, University, etc.) without touching routing or core application code.

### 🎯 **Key Features**
- **Single Dynamic Route**: `/campus/[campusType]/*` handles all campuses
- **Centralized Configuration**: All campus settings in one file
- **Feature Flags**: Enable/disable features per campus
- **Type-Safe**: Full TypeScript support
- **Scalable**: Add new campuses in minutes, not hours

---

## Directory Structure

```
src/
├── app/
│   ├── campus/
│   │   ├── page.tsx                    # Campus selector (landing page)
│   │   └── [campusType]/               # Dynamic campus routes
│   │       ├── register/
│   │       │   └── page.tsx            # Campus registration
│   │       └── game/
│   │           └── page.tsx            # Campus game
│   │
│   ├── shs-campus/                     # ⚠️ DEPRECATED - Remove after migration
│   │   ├── page.tsx
│   │   ├── register/
│   │   └── game/
│   │
│   └── challenge-arena/                # Existing feature (port 9002)
│       └── ...
│
└── lib/
    ├── campus-config.ts                # ⭐ CENTRAL CONFIG - Add campuses here
    ├── jhs-data.ts                     # JHS curriculum data (8201 lines)
    ├── jhs-questions.ts                # JHS quiz questions
    ├── shs-schools.ts                  # SHS schools list
    └── shs-questions.ts                # SHS quiz questions (needs expansion)
```

---

## 📋 How It Works

### 1. **Campus Configuration** (`src/lib/campus-config.ts`)

All campus metadata is defined in a single configuration file:

```typescript
export const CAMPUSES: Record<string, CampusConfig> = {
  jhs: {
    id: 'jhs',
    name: 'jhs',
    displayName: 'Junior High School',
    description: 'Complete BECE preparation...',
    schools: ['Accra Academy JHS', 'Wesley Grammar', ...],
    levels: ['JHS 1', 'JHS 2', 'JHS 3'],
    features: {
      hasSubjects: true,
      hasLessons: true,
      hasQuiz: true,
      hasGame: true,
      hasLeaderboard: true,
      hasChallengeArena: true,
    },
    questionBank: 'jhs-questions',
    dataSource: 'jhs-data',
    active: true,
  },
  shs: { ... },
  // Add more campuses here
};
```

### 2. **Dynamic Routing**

**Pattern**: `/campus/[campusType]/[feature]`

**Examples**:
- `/campus/jhs/register` → JHS registration
- `/campus/shs/game` → SHS game
- `/campus/university/register` → Future: University registration

Each page validates the `campusType` parameter and loads the appropriate config.

### 3. **Campus Selector** (`/campus`)

A landing page that displays all active campuses with:
- Campus description
- Available features
- Year levels
- Direct links to register or quick play

---

## 🚀 Adding a New Campus (Step-by-Step)

### Step 1: Create Question Bank

Create a new file: `src/lib/[campus]-questions.ts`

```typescript
// src/lib/university-questions.ts
export const UniversityQuestions = [
  {
    type: "mcq",
    question: "What is the capital of Ghana?",
    options: ["Accra", "Kumasi", "Takoradi", "Tamale"],
    answer: "Accra"
  },
  // Add more questions...
];
```

### Step 2: Add Campus Config

Open `src/lib/campus-config.ts` and add:

```typescript
import { UniversityQuestions } from './university-questions';

export const CAMPUSES: Record<string, CampusConfig> = {
  jhs: { ... },
  shs: { ... },
  
  // NEW CAMPUS
  university: {
    id: 'university',
    name: 'university',
    displayName: 'University Prep',
    description: 'University entrance exam preparation and career guidance.',
    icon: Building2, // Import from lucide-react
    color: 'green',
    schools: ['University of Ghana', 'KNUST', 'UCC', 'Others'],
    levels: ['Year 1', 'Year 2', 'Year 3', 'Year 4'],
    features: {
      hasSubjects: true,
      hasLessons: true,
      hasQuiz: true,
      hasGame: true,
      hasLeaderboard: true,
      hasChallengeArena: false,
    },
    questionBank: 'university-questions',
    dataSource: 'university-data', // Create if needed
    active: true, // Set to false to hide campus
  },
};
```

### Step 3: Update Question Bank Mapping

In `src/app/campus/[campusType]/game/page.tsx`:

```typescript
import { UniversityQuestions } from '../../../../lib/university-questions';

const campusQuestions: Record<string, any[]> = {
  jhs: JHSQuestions,
  shs: SHSQuestions,
  university: UniversityQuestions, // ADD THIS LINE
};
```

### Step 4: Test

1. Navigate to `http://localhost:3000/campus`
2. You should see the new campus card
3. Click "Get Started" to test registration
4. Click "Quick Play" to test the game

**That's it!** No routing changes, no new directories, no complex configuration.

---

## 🎨 Customization Options

### Campus Colors

Available colors in config: `blue`, `purple`, `green`

To add more colors, edit `getCampusColorClasses()` in `campus-config.ts`:

```typescript
const colorMap: Record<string, any> = {
  blue: { bg: 'bg-blue-500', ... },
  purple: { bg: 'bg-purple-500', ... },
  green: { bg: 'bg-green-500', ... },
  orange: { bg: 'bg-orange-500', text: 'text-orange-700', ... }, // NEW
};
```

### Feature Flags

Control which features appear for each campus:

```typescript
features: {
  hasSubjects: true,      // Subject browsing
  hasLessons: true,       // Lesson content
  hasQuiz: true,          // Quizzes
  hasGame: true,          // Game mode
  hasLeaderboard: true,   // Leaderboard
  hasChallengeArena: true,// Challenge arena
  hasVirtualLab: true,    // Virtual lab (future)
}
```

Features marked `false` won't appear in the campus card.

---

## 🔄 Migration Guide

### Current Issues

1. **Duplicate Routes**: `/shs-campus/*` and `/campus/shs/*` both exist
2. **Challenge Arena**: Running on separate port (9002) at `/challenge-arena`
3. **Navigation**: No clear entry point for campus selection

### Recommended Actions

#### Immediate (High Priority)

1. **Deprecate Old SHS Routes**
   - Add redirect from `/shs-campus/*` to `/campus/shs/*`
   - Remove `src/app/shs-campus/` directory after migration

2. **Update Challenge Arena Integration**
   - Update links to use `/campus/[campusType]/challenge-arena`
   - Or keep separate but add campus context

3. **User Communication**
   - Add banner: "We've improved campus navigation! Check out our new campus selector."

#### Future Enhancements

1. **Expand SHS Content**
   - Create `shs-data.ts` with full curriculum (like `jhs-data.ts`)
   - Add more SHS questions (currently only 4 sample questions)
   - Implement virtual lab feature

2. **Database Integration**
   - Move question banks to Firestore for dynamic updates
   - Store campus config in database for runtime changes

3. **Analytics**
   - Track campus usage
   - Monitor which features are most popular per campus

---

## 📊 Current Status

### JHS Campus
- ✅ Full curriculum data (8201 lines)
- ✅ Sample questions
- ✅ Registration flow
- ✅ Game mode
- ⚠️ Needs more quiz questions

### SHS Campus
- ✅ Schools list
- ✅ Sample questions (4)
- ✅ Registration flow
- ✅ Game mode
- ❌ No curriculum data yet
- ❌ Virtual lab not implemented
- ⚠️ Needs significant question expansion

### Future Campuses
- ❌ University: Not started
- ❌ Vocational: Not started
- ❌ Professional Certs: Not started

---

## 🛠️ Helper Functions

### Validation
```typescript
import { isValidCampus } from '@/lib/campus-config';

if (!isValidCampus('xyz')) {
  // Invalid campus, show error
}
```

### Get Campus Config
```typescript
import { getCampusConfig } from '@/lib/campus-config';

const campus = getCampusConfig('jhs');
// Returns: CampusConfig | null
```

### Get All Active Campuses
```typescript
import { getActiveCampuses } from '@/lib/campus-config';

const campuses = getActiveCampuses();
// Returns: CampusConfig[]
```

### Get Color Classes
```typescript
import { getCampusColorClasses } from '@/lib/campus-config';

const colors = getCampusColorClasses('shs');
// Returns: { bg: '...', text: '...', border: '...', gradient: '...' }
```

---

## 🔒 Best Practices

### DO ✅
- Add all campus config to `campus-config.ts`
- Use feature flags to control availability
- Validate campus type on every dynamic page
- Keep question banks in separate files
- Use TypeScript types for type safety

### DON'T ❌
- Create new routes for each campus
- Hardcode campus names in components
- Skip validation of campus types
- Mix question banks in a single file
- Forget to update question mapping when adding campuses

---

## 📈 Performance Considerations

### Current Approach
- Config loaded on demand (client-side)
- Question banks imported statically
- No database queries for campus metadata

### Future Optimizations
1. **Server Components**: Move campus validation to server
2. **Database**: Store questions in Firestore for dynamic loading
3. **Caching**: Cache campus configs with React Query
4. **Code Splitting**: Lazy load question banks per campus

---

## 🐛 Troubleshooting

### Campus Not Showing
- Check `active: true` in config
- Verify icon import from lucide-react
- Check console for errors

### Questions Not Loading
- Verify question file exists
- Check import path in `game/page.tsx`
- Ensure question structure matches types

### Routes Not Working
- Clear Next.js cache: `npm run dev` (restart)
- Check dynamic param name: `[campusType]`
- Verify no conflicting static routes

---

## 📞 Support

For questions or issues:
1. Check this documentation first
2. Review `campus-config.ts` for examples
3. Inspect existing campus implementations (JHS/SHS)
4. Check console/terminal for error messages

---

## 🎯 Next Steps

1. ✅ Test campus selector at `/campus`
2. ✅ Test JHS registration and game
3. ✅ Test SHS registration and game
4. ⚠️ Expand SHS question bank
5. ⚠️ Create SHS curriculum data
6. ⚠️ Remove deprecated `/shs-campus` routes
7. ⚠️ Integrate challenge arena with campus context

---

**Last Updated**: December 9, 2025
**Version**: 1.0
**Status**: Production Ready
