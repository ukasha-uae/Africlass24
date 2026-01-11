# Auto-Promotion System Analysis

## Overview
The system automatically promotes students to higher class levels (e.g., Primary 1 → Primary 2) when they demonstrate mastery through high performance scores.

## How It Works

### 1. **Promotion Logic** (`getEffectivePrimaryClassLevel`)

Located in: `src/lib/challenge.ts` (lines 387-432)

**Promotion Criteria:**
- ✅ At least **5 challenges** completed at the current class level
- ✅ At least **80% accuracy** (totalCorrect / totalQuestions)
- ✅ Promotion is **upward only** (1 → 2 → 3 → 4 → 5 → 6)
- ✅ Promotion is **subject-specific** (mastery tracked per subject)

**Example:**
- Student selects "Primary 1" for Science
- After 5 challenges with ≥80% accuracy in Primary 1 Science
- System automatically uses "Primary 2" questions when student selects "Primary 1"

### 2. **Mastery Tracking** (`updateSubjectMasteryFromResult`)

Located in: `src/lib/challenge.ts` (lines 245-295)

**What Gets Tracked:**
- `totalQuestions`: Total questions answered
- `totalCorrect`: Total correct answers
- `challengesPlayed`: Number of challenges completed
- Stored per: `userId + level + subject + classLevel`

**Storage:**
- ✅ Stored in **localStorage** (client-side only)
- ✅ Key: `subject-mastery-{userId}`
- ✅ Only tracks real students (excludes AI bosses)

### 3. **Question Generation Integration**

Located in: `src/lib/challenge.ts` (lines 1479-1480)

**Flow:**
1. Student requests questions for "Primary 1"
2. System calls `getEffectivePrimaryClassLevel(userId, subject, "Primary 1")`
3. Function checks mastery stats
4. If criteria met, returns "Primary 2" (or higher)
5. Questions generated using the **effective** class level

## Current State Assessment

### ✅ **Strengths**

1. **Simple, Clear Logic**
   - Easy to understand promotion criteria
   - 5 challenges + 80% accuracy is a reasonable threshold
   - Upward-only prevents confusion

2. **Subject-Specific**
   - Promotions are per-subject (a student can be Primary 2 in Math but Primary 1 in English)
   - This is educationally sound

3. **No Data Loss Risk**
   - Uses localStorage (persists across sessions)
   - Automatically saves after each challenge

4. **Well-Integrated**
   - Seamlessly integrated into question generation flow
   - No breaking changes to existing functionality

### ⚠️ **Issues & Concerns**

1. **No User Visibility**
   - ❌ Students don't know they've been promoted
   - ❌ No notification or UI indicator
   - ❌ Students might be confused when seeing harder questions

2. **No Demotion Logic**
   - ❌ If a student struggles at higher level, they can't go back down
   - ❌ Could lead to frustration if promoted too early

3. **Storage Limitations**
   - ⚠️ localStorage only (client-side)
   - ❌ Data lost if student clears browser data
   - ❌ Data doesn't sync across devices

4. **No Gradual Transition**
   - ❌ Abrupt jump from Primary 1 to Primary 2 questions
   - ⚠️ No mixing or gradual introduction

5. **Hardcoded Thresholds**
   - ⚠️ Fixed at 5 challenges and 80% accuracy
   - ⚠️ No customization or adjustment based on subject difficulty

6. **Potential Edge Cases**
   - ⚠️ What happens if student has 5 challenges at 79%? (No promotion)
   - ⚠️ What if student plays 4 challenges at 100%, then 1 at 0%? (May not promote)
   - ⚠️ Cumulative accuracy might mask recent performance issues

7. **Testing/Validation**
   - ❌ No obvious way to reset mastery stats for testing
   - ❌ No admin tools to view/override promotions

## Recommendations

### 🔴 **Critical (Should Fix)**

1. **Add User Feedback**
   ```typescript
   // Show notification when promoted
   if (effectiveLevel !== requestedLevel) {
     showPromotionNotification({
       from: requestedLevel,
       to: effectiveLevel,
       subject: subject
     });
   }
   ```

2. **Add Demotion Logic**
   - If accuracy drops below 60% at higher level for 3 challenges
   - Allow manual override option

3. **Add Server-Side Sync** (Future)
   - Store mastery stats in database
   - Sync across devices

### 🟡 **Important (Should Consider)**

4. **Add Gradual Mixing**
   - Instead of 100% Primary 2, mix 80% Primary 2 + 20% Primary 1
   - Gradually increase ratio over time

5. **Add Reset Option**
   - Allow students to reset mastery for a subject
   - Useful for review or if promoted incorrectly

6. **Add Progress Indicator**
   - Show progress toward next promotion
   - "You need 2 more challenges at 80% to unlock Primary 2"

### 🟢 **Nice to Have (Optional)**

7. **Dynamic Thresholds**
   - Adjust thresholds based on subject difficulty
   - Math might need 85%, while English might need 75%

8. **Recent Performance Weight**
   - Weight recent challenges more heavily
   - Prevent promotion if recent performance is declining

## Code Quality

### ✅ **Good Practices**
- Clear function names
- Good comments
- Type safety with TypeScript
- Separation of concerns

### ⚠️ **Minor Issues**
- Functions are not exported (internal only - fine)
- No error handling for localStorage failures
- No validation of localStorage data structure

## Testing Status

**Unknown** - Need to verify:
- [ ] Does it work correctly in practice?
- [ ] Are promotions happening as expected?
- [ ] Any edge cases causing bugs?
- [ ] Performance impact of localStorage reads/writes?

## Overall Assessment

**Status: ⚠️ FUNCTIONAL BUT NEEDS IMPROVEMENT**

The system works as designed and is well-integrated, but lacks:
- User feedback/transparency
- Ability to demote or adjust
- Server-side persistence
- Gradual transitions

**Recommendation:** Add user visibility and feedback before making this a prominent feature. Currently, students may be confused when they see harder questions without understanding why.
