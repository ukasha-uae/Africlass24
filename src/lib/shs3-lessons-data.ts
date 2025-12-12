// SHS 3 Comprehensive Lesson Data - NaCCA Standards-Based Curriculum
// This file contains detailed lesson content for SHS 3 subjects aligned with GES/NaCCA curriculum

import type { Lesson, Quiz } from '@/lib/types';

// ============================================
// CORE MATHEMATICS - SHS 3
// ============================================

export const coreMathSHS3Lessons: Lesson[] = [
  // Strand 2: Algebra - Quadratic Equations
  {
    id: 'cm_shs3_alg_1',
    slug: 'shs3-quadratic-equations',
    title: 'Quadratic Equations',
    objectives: [
      'Define quadratic equations and identify their standard forms',
      'Solve quadratic equations by factorization method',
      'Solve quadratic equations using the quadratic formula',
      'Solve quadratic equations by completing the square method',
      'Understand and apply the discriminant to determine nature of roots',
      'Form quadratic equations from given roots',
      'Derive and apply relationships between roots and coefficients (sum and product of roots)',
      'Solve word problems that lead to quadratic equations',
      'Sketch graphs of quadratic functions and identify key features'
    ],
    introduction: `A **quadratic equation** is an equation of the form **ax² + bx + c = 0**, where a, b, and c are constants (with a ≠ 0), and x is the variable.

Quadratic equations are fundamental in mathematics and appear throughout real-world applications:

**Real-Life Applications:**
• **Physics:** Projectile motion (calculating the trajectory of a ball, arrow, or rocket)
• **Business:** Profit maximization and break-even analysis
• **Engineering:** Designing parabolic structures like satellite dishes and bridges
• **Agriculture:** Optimizing field dimensions for maximum crop yield
• **Sports:** Analyzing the path of a ball in football, basketball, or golf

**Why Study Quadratic Equations?**

Quadratic equations extend our problem-solving toolkit beyond linear equations. While linear equations have one solution, quadratics can have:
• **Two distinct real solutions** (equation crosses x-axis twice)
• **One repeated real solution** (equation touches x-axis once)
• **No real solutions** (equation doesn't cross x-axis)

This lesson will equip you with multiple methods to solve quadratic equations and apply them to WASSCE-level problems.`,
    keyConcepts: [
      {
        title: '1. Introduction to Quadratic Equations',
        content: `**Definition:** A quadratic equation is an equation that can be written in the form:

$$ax^2 + bx + c = 0$$

where:
• **a** = coefficient of x² (a ≠ 0)
• **b** = coefficient of x
• **c** = constant term
• **x** = the variable (unknown)

**Why a ≠ 0?**
If a = 0, the equation becomes bx + c = 0, which is linear, not quadratic.

**Examples of Quadratic Equations:**

1. **Standard form:** x² + 5x + 6 = 0
   • a = 1, b = 5, c = 6

2. **Missing b:** 2x² − 8 = 0
   • a = 2, b = 0, c = −8

3. **Missing c:** x² − 4x = 0
   • a = 1, b = −4, c = 0

4. **Not in standard form:** 3x² = 2x + 5
   • Rewrite: 3x² − 2x − 5 = 0
   • a = 3, b = −2, c = −5

**Non-Examples (Not Quadratic):**
• x + 5 = 0 (linear - no x² term)
• x³ + 2x² + 1 = 0 (cubic - highest power is 3)
• 1/x² + 3x = 5 (not polynomial)

**Key Terminology:**
• **Roots/Solutions:** Values of x that satisfy the equation
• **Degree:** The highest power of the variable (degree 2 for quadratic)
• **Quadratic function:** f(x) = ax² + bx + c
• **Parabola:** The U-shaped graph of a quadratic function`
      },
      {
        title: '2. Solving by Factorization Method',
        content: `The factorization method relies on the **Zero Product Property:**

**If AB = 0, then A = 0 or B = 0 (or both)**

---

## 🎯 Interactive Learning: Factorization with Voice Teacher

Watch and listen as I teach you step-by-step:

\`\`\`animation
{
  "type": "factorization-solver",
  "a": 1,
  "b": 7,
  "c": 12
}
\`\`\`

## 🎯 Learning Journey: Solving x² + 7x + 12 = 0

Let me guide you through solving this step by step, just like a teacher would!

### **Step 1: Understanding the Problem** 📋

We have: **x² + 7x + 12 = 0**

**Teacher's Tip:** ✨ This is already in standard form (one side equals 0). That's good! We can now factorize.

**What does factorizing mean?** We want to write this as **(something)(something) = 0**

---

### **Step 2: Finding the Magic Numbers** 🔍

For **x² + 7x + 12**, we need two numbers that:
1. **Multiply** to give us **12** (the last number)
2. **Add** to give us **7** (the middle coefficient)

**Let's think together:**

| Factors of 12 | Multiply | Add | Result |
|--------------|----------|-----|--------|
| 1 and 12 | 1 × 12 = 12 ✓ | 1 + 12 = 13 | ❌ (need 7) |
| 2 and 6 | 2 × 6 = 12 ✓ | 2 + 6 = 8 | ❌ (need 7) |
| **3 and 4** | **3 × 4 = 12 ✓** | **3 + 4 = 7 ✓** | **✅ Perfect!** |

**Visual Pattern:**
\`\`\`
Numbers: 3 and 4
├─ 3 × 4 = 12 ✓ (Multiply to last term)
└─ 3 + 4 = 7  ✓ (Add to middle coefficient)
\`\`\`

---

### **Step 3: Writing the Factors** 📝

Now we write:
$$x^2 + 7x + 12 = (x + 3)(x + 4)$$

**Let's verify by expanding (FOIL method):**

\`\`\`
(x + 3)(x + 4)
├─ First:  x × x = x²
├─ Outer:  x × 4 = 4x
├─ Inner:  3 × x = 3x
└─ Last:   3 × 4 = 12

Combine: x² + 4x + 3x + 12 = x² + 7x + 12 ✓
\`\`\`

So our equation becomes:
$$(x + 3)(x + 4) = 0$$

---

### **Step 4: Apply Zero Product Property** 🎓

**Key Insight:** If two things multiply to give 0, at least one must be 0!

Think about it: If you multiply two numbers and get zero, what does that tell you?
→ At least one of those numbers MUST be zero!

So either:
• **(x + 3) = 0** ← First factor equals zero
• **(x + 4) = 0** ← Second factor equals zero

---

### **Step 5: Solve Each Equation** 🔧

**From x + 3 = 0:**
\`\`\`
x + 3 = 0
Subtract 3 from both sides:
x = -3 ✓
\`\`\`

**From x + 4 = 0:**
\`\`\`
x + 4 = 0
Subtract 4 from both sides:
x = -4 ✓
\`\`\`

**Answer:** x = −3 or x = −4

---

### **Step 6: Verify Our Solutions** ✅

Always check! Substitute back into the original equation:

**Test x = −3:**
\`\`\`
(−3)² + 7(−3) + 12
= 9 − 21 + 12
= 0 ✓ Correct!
\`\`\`

**Test x = −4:**
\`\`\`
(−4)² + 7(−4) + 12
= 16 − 28 + 12
= 0 ✓ Correct!
\`\`\`

Both solutions work! 🎉

---

## 📚 More Examples with Different Types

### **Example 2: Negative Constant** ⚡
**Problem:** x² − 5x − 24 = 0

**Your Turn to Think:** What numbers multiply to **−24** and add to **−5**?

**Hint:** One number must be negative, one positive (since product is negative)

<details>
<summary>Click to reveal solution</summary>

**Solution:**
\`\`\`
Need: ? × ? = −24 and ? + ? = −5

Try: −8 and 3
Check multiply: −8 × 3 = −24 ✓
Check add: −8 + 3 = −5 ✓
Perfect!
\`\`\`

**Factorization:**
$$(x - 8)(x + 3) = 0$$

**Solutions:**
$$x - 8 = 0 \\Rightarrow x = 8$$
$$x + 3 = 0 \\Rightarrow x = -3$$

**Answer:** x = 8 or x = −3

</details>

---

### **Example 3: When a ≠ 1** 🎯
**Problem:** 2x² + 7x + 3 = 0

**This is trickier! Let's use the Product-Sum Method:**

**Visual Guide:**
\`\`\`
Step-by-Step:

Original: 2x² + 7x + 3 = 0

Step 1: Multiply a × c
        2 × 3 = 6

Step 2: Find factors of 6 that add to 7
        6 and 1 ✓ (6 × 1 = 6, 6 + 1 = 7)

Step 3: Split middle term
        2x² + 7x + 3
        ↓
        2x² + 6x + 1x + 3

Step 4: Group terms
        (2x² + 6x) + (1x + 3)

Step 5: Factor each group
        2x(x + 3) + 1(x + 3)
                 ↓
        Notice (x + 3) appears twice!

Step 6: Factor out common term
        (2x + 1)(x + 3) = 0
\`\`\`

**Solve:**
\`\`\`
2x + 1 = 0  →  x = -1/2
x + 3 = 0   →  x = -3
\`\`\`

---

### **Example 4: Difference of Squares** ⚡
**Problem:** x² − 16 = 0

**Special Pattern Alert!** 🎯

Notice: x² − 16 = x² − 4²

**This is a difference of two perfect squares!**

**Pattern:** a² − b² = (a + b)(a − b)

**Solution:**
\`\`\`
x² - 16 = (x + 4)(x - 4) = 0

Therefore:
x + 4 = 0  →  x = -4
x - 4 = 0  →  x = 4
\`\`\`

**Quick Tip:** Whenever you see (something)² − (number)², use this pattern!

More examples:
• x² − 25 = (x + 5)(x − 5)
• x² − 9 = (x + 3)(x − 3)
• x² − 1 = (x + 1)(x − 1)

---

### **Example 5: Common Factor First** ⚠️
**Problem:** 3x² − 12x = 0

**Teacher's Warning:** ⚠️ **NEVER divide by x!** You'll lose a solution!

**Why?** Because x might equal zero!

**Correct Method:**
\`\`\`
Step 1: Factor out the GCF (Greatest Common Factor)
        3x² − 12x = 3x(x - 4) = 0

Step 2: Set each factor to zero
        3x = 0   or   x - 4 = 0

Step 3: Solve
        x = 0    or   x = 4
\`\`\`

**See the difference?**
• If we divided by x: We'd only get x = 4 ❌
• By factoring: We get both x = 0 and x = 4 ✓

---

## 🎯 Your Practice Strategy

**Build Your Skills Gradually:**

**Level 1 - Easy:** 🟢
Start with x² + bx + c = 0 (when a = 1)
• x² + 5x + 6 = 0
• x² + 8x + 15 = 0

**Level 2 - Medium:** 🟡
Try negative constants (when c < 0)
• x² + 2x − 15 = 0
• x² − 3x − 10 = 0

**Level 3 - Challenging:** 🟠
General form ax² + bx + c = 0 (when a ≠ 1)
• 2x² + 5x + 3 = 0
• 3x² − 7x + 2 = 0

**Level 4 - Expert:** 🔴
Special patterns and mixed problems
• x² − 49 = 0 (difference of squares)
• 4x² − 20x = 0 (common factor first)

---

## 💡 Key Reminders

✓ **Always check** your solutions by substituting back
✓ **If you can't find factors**, try the quadratic formula instead
✓ **Look for patterns** (difference of squares, common factors)
✓ **Show your work** in exams for partial credit
✓ **Practice makes perfect** - try 5 problems daily!

**Next:** Once you master factorization, you'll learn the Quadratic Formula - a method that works for ALL quadratic equations!`
      },
      {
        title: '3. The Quadratic Formula',
        content: `The **Quadratic Formula** solves any quadratic equation, even when factorization is difficult or impossible.

**For the equation ax² + bx + c = 0:**

$$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$

**Components:**
• **Numerator:** −b ± √(b² − 4ac)
• **Denominator:** 2a
• **±:** Two solutions (use + for one, − for the other)

**Steps to Use the Formula:**
1. Write equation in standard form: ax² + bx + c = 0
2. Identify values of a, b, and c
3. Substitute into the formula
4. Simplify carefully (especially under the square root)
5. Write both solutions

**Example 1:** Solve x² + 6x + 5 = 0 using the quadratic formula

**Solution:**
Identify: a = 1, b = 6, c = 5

$$x = \\frac{-6 \\pm \\sqrt{6^2 - 4(1)(5)}}{2(1)}$$

$$x = \\frac{-6 \\pm \\sqrt{36 - 20}}{2}$$

$$x = \\frac{-6 \\pm \\sqrt{16}}{2}$$

$$x = \\frac{-6 \\pm 4}{2}$$

**Two solutions:**
$$x = \\frac{-6 + 4}{2} = \\frac{-2}{2} = -1$$

$$x = \\frac{-6 - 4}{2} = \\frac{-10}{2} = -5$$

**Answer:** x = −1 or x = −5

**Example 2:** Solve 2x² − 3x − 5 = 0

**Solution:**
Identify: a = 2, b = −3, c = −5

$$x = \\frac{-(-3) \\pm \\sqrt{(-3)^2 - 4(2)(-5)}}{2(2)}$$

$$x = \\frac{3 \\pm \\sqrt{9 + 40}}{4}$$

$$x = \\frac{3 \\pm \\sqrt{49}}{4}$$

$$x = \\frac{3 \\pm 7}{4}$$

**Two solutions:**
$$x = \\frac{3 + 7}{4} = \\frac{10}{4} = \\frac{5}{2}$$

$$x = \\frac{3 - 7}{4} = \\frac{-4}{4} = -1$$

**Answer:** x = 5/2 or x = −1

**Example 3:** Solve x² + 4x + 1 = 0

**Solution:**
a = 1, b = 4, c = 1

$$x = \\frac{-4 \\pm \\sqrt{16 - 4}}{2}$$

$$x = \\frac{-4 \\pm \\sqrt{12}}{2}$$

$$x = \\frac{-4 \\pm 2\\sqrt{3}}{2}$$

$$x = -2 \\pm \\sqrt{3}$$

**Answer:** x = −2 + √3 or x = −2 − √3

**When to Use the Quadratic Formula:**
• When factorization is difficult
• When the equation doesn't factor nicely
• When you need exact decimal approximations
• In WASSCE exams (always acceptable method)`
      },
      {
        title: '4. Completing the Square Method',
        content: `**Completing the square** transforms a quadratic equation into a perfect square form, making it easy to solve.

**Perfect Square Pattern:**
$$(x + p)^2 = x^2 + 2px + p^2$$

## 🎯 Interactive Learning: Completing the Square with Voice Teacher

Let me guide you through this step-by-step with visual demonstrations:

\`\`\`animation
{
  "type": "completing-the-square",
  "a": 1,
  "b": 6,
  "c": 5
}
\`\`\`

**Method for ax² + bx + c = 0:**

**Step 1:** If a ≠ 1, divide entire equation by a
**Step 2:** Move constant to the right side
**Step 3:** Take half of the x coefficient, square it, add to both sides
**Step 4:** Write left side as perfect square
**Step 5:** Solve by taking square root of both sides

**Example 1:** Solve x² + 6x + 5 = 0 by completing the square

**Solution:**

**Step 1:** Coefficient of x² is already 1
**Step 2:** Move constant: x² + 6x = −5
**Step 3:** Half of 6 is 3, square it: 3² = 9
         Add 9 to both sides:
$$x^2 + 6x + 9 = -5 + 9$$
$$x^2 + 6x + 9 = 4$$

**Step 4:** Left side is perfect square:
$$(x + 3)^2 = 4$$

**Step 5:** Take square root:
$$x + 3 = \\pm 2$$

Solve:
$$x + 3 = 2 \\quad \\text{or} \\quad x + 3 = -2$$
$$x = -1 \\quad \\text{or} \\quad x = -5$$

**Example 2:** Solve x² − 8x + 7 = 0

**Solution:**
Move constant: x² − 8x = −7
Half of −8 is −4, square: (−4)² = 16
Add 16 to both sides:
$$x^2 - 8x + 16 = -7 + 16$$
$$(x - 4)^2 = 9$$
$$x - 4 = \\pm 3$$
$$x = 7 \\quad \\text{or} \\quad x = 1$$

**Example 3:** Solve 2x² + 8x − 10 = 0

**Solution:**
**Step 1:** Divide by 2:
$$x^2 + 4x - 5 = 0$$

**Step 2:** Move constant:
$$x^2 + 4x = 5$$

**Step 3:** Half of 4 is 2, square: 2² = 4
$$x^2 + 4x + 4 = 5 + 4$$
$$(x + 2)^2 = 9$$

**Step 4:** Solve:
$$x + 2 = \\pm 3$$
$$x = 1 \\quad \\text{or} \\quad x = -5$$

**Example 4:** Solve x² + 3x − 1 = 0

**Solution:**
Move constant: x² + 3x = 1
Half of 3 is 3/2, square: (3/2)² = 9/4
$$x^2 + 3x + \\frac{9}{4} = 1 + \\frac{9}{4}$$
$$(x + \\frac{3}{2})^2 = \\frac{13}{4}$$
$$x + \\frac{3}{2} = \\pm \\frac{\\sqrt{13}}{2}$$
$$x = \\frac{-3 \\pm \\sqrt{13}}{2}$$

**Advantages of Completing the Square:**
• Derives the quadratic formula
• Helps convert to vertex form for graphing
• Useful in calculus and advanced mathematics`
      },
      {
        title: '5. The Discriminant and Nature of Roots',
        content: `The **discriminant** (Δ or D) is the expression under the square root in the quadratic formula:

$$\\Delta = b^2 - 4ac$$

The discriminant determines the **nature of the roots** without actually solving the equation.

## 🎯 Interactive Learning: Discriminant Explorer with Voice Teacher

Watch the discriminant come to life with animated parabola visualization:

\`\`\`animation
{
  "type": "discriminant-explorer",
  "a": 2,
  "b": 5,
  "c": 2
}
\`\`\`

**Three Cases:**

**Case 1: Δ > 0 (Positive)**
• **Two distinct real roots**
• Graph crosses x-axis at two points
• Example: x² − 5x + 6 = 0
  • Δ = (−5)² − 4(1)(6) = 25 − 24 = 1 > 0
  • Roots: x = 2, x = 3 (two different values)

**Sub-case:** If Δ is a perfect square, roots are rational (can be factorized)

**Case 2: Δ = 0 (Zero)**
• **One repeated real root (two equal roots)**
• Graph touches x-axis at exactly one point
• Equation is a perfect square
• Example: x² − 6x + 9 = 0
  • Δ = (−6)² − 4(1)(9) = 36 − 36 = 0
  • Root: x = 3 (repeated twice)
  • Factors: (x − 3)² = 0

**Case 3: Δ < 0 (Negative)**
• **No real roots** (two complex/imaginary roots)
• Graph doesn't cross x-axis
• Cannot solve using real numbers
• Example: x² + 2x + 5 = 0
  • Δ = 2² − 4(1)(5) = 4 − 20 = −16 < 0
  • No real solutions

**Summary Table:**

| Discriminant | Nature of Roots | Graph Behavior |
|-------------|-----------------|----------------|
| Δ > 0 (perfect square) | Two distinct rational roots | Crosses x-axis twice |
| Δ > 0 (not perfect square) | Two distinct irrational roots | Crosses x-axis twice |
| Δ = 0 | One repeated real root | Touches x-axis once |
| Δ < 0 | No real roots | Doesn't cross x-axis |

**Example Problems:**

**Example 1:** Determine the nature of roots of 2x² + 5x + 2 = 0

**Solution:**
a = 2, b = 5, c = 2
$$\\Delta = 5^2 - 4(2)(2) = 25 - 16 = 9$$

Since Δ = 9 > 0 and 9 is a perfect square (3²):
**Two distinct rational roots**

(Actual roots: x = −1/2, x = −2)

**Example 2:** For what value of k does kx² + 4x + 1 = 0 have equal roots?

**Solution:**
For equal roots, Δ = 0
$$4^2 - 4(k)(1) = 0$$
$$16 - 4k = 0$$
$$k = 4$$

**Example 3:** Find the range of values of k for which x² + 2x + k = 0 has no real roots

**Solution:**
For no real roots, Δ < 0
$$2^2 - 4(1)(k) < 0$$
$$4 - 4k < 0$$
$$4 < 4k$$
$$k > 1$$

**Answer:** k > 1`
      },
      {
        title: '6. Sum and Product of Roots',
        content: `For the quadratic equation **ax² + bx + c = 0** with roots α (alpha) and β (beta):

\`\`\`animation
{
  "type": "sum-product-roots",
  "a": 1,
  "b": -5,
  "c": 6
}
\`\`\`

**Sum of Roots:**
$$\\alpha + \\beta = -\\frac{b}{a}$$

**Product of Roots:**
$$\\alpha \\beta = \\frac{c}{a}$$

**Why These Formulas Work:**

If the roots are α and β, the equation can be written as:
$$(x - \\alpha)(x - \\beta) = 0$$

Expanding:
$$x^2 - (\\alpha + \\beta)x + \\alpha\\beta = 0$$

Comparing with ax² + bx + c = 0 (dividing by a):
$$x^2 + \\frac{b}{a}x + \\frac{c}{a} = 0$$

Therefore:
• Coefficient of x: −(α + β) = b/a → α + β = −b/a
• Constant term: αβ = c/a

**Example 1:** Find the sum and product of roots of 2x² − 6x + 3 = 0

**Solution:**
a = 2, b = −6, c = 3

$$\\text{Sum} = -\\frac{-6}{2} = 3$$

$$\\text{Product} = \\frac{3}{2}$$

**Example 2:** The roots of x² − 5x + k = 0 are α and β. If α + β = 5 and αβ = 6, find k.

**Solution:**
From the formula: αβ = c/a = k/1 = k
Given: αβ = 6
Therefore: **k = 6**

**Example 3:** Find the equation whose roots are 3 and −2

**Solution:**
Sum of roots: α + β = 3 + (−2) = 1
Product of roots: αβ = 3 × (−2) = −6

Using the relationship:
$$x^2 - (\\text{sum})x + \\text{product} = 0$$
$$x^2 - 1x + (-6) = 0$$
$$x^2 - x - 6 = 0$$

**Or multiply by any constant:**
$$2x^2 - 2x - 12 = 0$$

**Example 4:** The roots of 3x² + 7x − 2 = 0 are α and β. Find:
(a) α + β
(b) αβ
(c) α² + β²

**Solution:**
a = 3, b = 7, c = −2

**(a)** $$\\alpha + \\beta = -\\frac{7}{3}$$

**(b)** $$\\alpha\\beta = \\frac{-2}{3}$$

**(c)** Use identity: α² + β² = (α + β)² − 2αβ
$$\\alpha^2 + \\beta^2 = \\left(-\\frac{7}{3}\\right)^2 - 2\\left(\\frac{-2}{3}\\right)$$
$$= \\frac{49}{9} + \\frac{4}{3}$$
$$= \\frac{49}{9} + \\frac{12}{9}$$
$$= \\frac{61}{9}$$

**Useful Identities:**
• α² + β² = (α + β)² − 2αβ
• (α − β)² = (α + β)² − 4αβ
• α³ + β³ = (α + β)³ − 3αβ(α + β)
• 1/α + 1/β = (α + β)/αβ`
      },
      {
        title: '7. Forming Quadratic Equations from Given Roots',
        content: `**Method 1: Using the Factor Form**

If roots are α and β:
$$(x - \\alpha)(x - \\beta) = 0$$

Expand to get the equation.

**Example 1:** Form the equation with roots 4 and −3

**Solution:**
$$(x - 4)(x - (-3)) = 0$$
$$(x - 4)(x + 3) = 0$$
$$x^2 + 3x - 4x - 12 = 0$$
$$x^2 - x - 12 = 0$$

**Method 2: Using Sum and Product**

$$x^2 - (\\text{sum of roots})x + (\\text{product of roots}) = 0$$

**Example 2:** Form the equation with roots 5 and 2

**Solution:**
Sum = 5 + 2 = 7
Product = 5 × 2 = 10

$$x^2 - 7x + 10 = 0$$

**Example 3:** Form the equation with roots 1/2 and −3

**Solution:**
Sum = 1/2 + (−3) = 1/2 − 3 = −5/2
Product = (1/2)(−3) = −3/2

$$x^2 - \\left(-\\frac{5}{2}\\right)x + \\left(-\\frac{3}{2}\\right) = 0$$
$$x^2 + \\frac{5}{2}x - \\frac{3}{2} = 0$$

Multiply by 2 to clear fractions:
$$2x^2 + 5x - 3 = 0$$

**Example 4:** Form the equation with roots √3 and −√3

**Solution:**
Sum = √3 + (−√3) = 0
Product = √3 × (−√3) = −3

$$x^2 - 0x + (-3) = 0$$
$$x^2 - 3 = 0$$

**Example 5:** The roots of 2x² − 5x + 3 = 0 are α and β. Form the equation whose roots are α + 1 and β + 1.

**Solution:**
First find α + β and αβ from original equation:
$$\\alpha + \\beta = \\frac{5}{2}, \\quad \\alpha\\beta = \\frac{3}{2}$$

New roots: (α + 1) and (β + 1)

New sum = (α + 1) + (β + 1) = α + β + 2 = 5/2 + 2 = 9/2

New product = (α + 1)(β + 1) = αβ + α + β + 1 = 3/2 + 5/2 + 1 = 5

New equation:
$$x^2 - \\frac{9}{2}x + 5 = 0$$

Multiply by 2:
$$2x^2 - 9x + 10 = 0$$

**Example 6:** Form an equation with roots 2 + √5 and 2 − √5

**Solution:**
Sum = (2 + √5) + (2 − √5) = 4
Product = (2 + √5)(2 − √5) = 4 − 5 = −1

$$x^2 - 4x - 1 = 0$$`
      },
      {
        title: '8. Word Problems Leading to Quadratic Equations',
        content: `Many real-world problems lead to quadratic equations. Follow these steps:

\`\`\`animation
{
  "type": "word-problem-solver",
  "perimeter": 28,
  "area": 45
}
\`\`\`

**Problem-Solving Strategy:**
1. Read the problem carefully
2. Define the variable (let x = ...)
3. Translate the problem into an equation
4. Solve the equation
5. Check if solutions are reasonable
6. State the answer with units

**Type 1: Number Problems**

**Example 1:** The sum of a number and its reciprocal is 13/6. Find the number.

**Solution:**
Let the number be x
Reciprocal = 1/x
$$x + \\frac{1}{x} = \\frac{13}{6}$$

Multiply by 6x:
$$6x^2 + 6 = 13x$$
$$6x^2 - 13x + 6 = 0$$

Factor: (2x − 3)(3x − 2) = 0
$$x = \\frac{3}{2} \\quad \\text{or} \\quad x = \\frac{2}{3}$$

Both solutions are valid (they are reciprocals of each other).

**Type 2: Area and Perimeter Problems**

**Example 2:** A rectangular field has length 5 m more than its width. If its area is 84 m², find its dimensions.

**Solution:**
Let width = x m
Then length = (x + 5) m

Area = length × width
$$x(x + 5) = 84$$
$$x^2 + 5x = 84$$
$$x^2 + 5x - 84 = 0$$

Factor: (x + 12)(x − 7) = 0
x = −12 or x = 7

Since width cannot be negative: **x = 7 m**

Width = 7 m, Length = 12 m

**Type 3: Projectile Motion**

**Example 3:** A ball is thrown upward with initial velocity 20 m/s. Its height h (in meters) after t seconds is given by h = 20t − 5t². Find when the ball hits the ground.

**Solution:**
When ball hits ground, h = 0:
$$20t - 5t^2 = 0$$
$$5t(4 - t) = 0$$
$$t = 0 \\quad \\text{or} \\quad t = 4$$

t = 0: initial position (thrown)
t = 4: ball lands

**Answer:** Ball hits ground after **4 seconds**

**Type 4: Work Problems**

**Example 4:** Working alone, Ama takes 3 hours less than Kofi to complete a task. Working together, they complete it in 2 hours. How long does each take alone?

**Solution:**
Let Kofi's time = x hours
Ama's time = (x − 3) hours

Rate of work:
• Kofi: 1/x of task per hour
• Ama: 1/(x−3) of task per hour

Together in 2 hours:
$$2\\left(\\frac{1}{x} + \\frac{1}{x-3}\\right) = 1$$

$$\\frac{2}{x} + \\frac{2}{x-3} = 1$$

Multiply by x(x−3):
$$2(x-3) + 2x = x(x-3)$$
$$2x - 6 + 2x = x^2 - 3x$$
$$4x - 6 = x^2 - 3x$$
$$x^2 - 7x + 6 = 0$$

Factor: (x − 6)(x − 1) = 0
x = 6 or x = 1

If x = 1, then Ama's time = 1 − 3 = −2 (invalid)
If x = 6, then Ama's time = 6 − 3 = 3 (valid)

**Answer:** Kofi takes 6 hours, Ama takes 3 hours

**Type 5: Profit/Revenue Problems**

**Example 5:** A company sells x items per day. Their daily profit P (in GH₵) is given by P = −2x² + 80x − 200. How many items should they sell to break even (profit = 0)?

**Solution:**
$$-2x^2 + 80x - 200 = 0$$

Divide by −2:
$$x^2 - 40x + 100 = 0$$

Using quadratic formula:
$$x = \\frac{40 \\pm \\sqrt{1600 - 400}}{2}$$
$$x = \\frac{40 \\pm \\sqrt{1200}}{2}$$
$$x = \\frac{40 \\pm 20\\sqrt{3}}{2}$$
$$x = 20 \\pm 10\\sqrt{3}$$

x ≈ 20 + 17.32 = 37.32 or x ≈ 20 − 17.32 = 2.68

**Answer:** Break even at approximately **3 items** or **37 items**`
      },
      {
        title: '9. Graphs of Quadratic Functions',
        content: `A quadratic function **f(x) = ax² + bx + c** has a parabola as its graph.

**Key Features:**

**1. Shape and Direction**
• If **a > 0**: Parabola opens **upward** (U-shape) - has minimum point
• If **a < 0**: Parabola opens **downward** (∩-shape) - has maximum point

**2. Vertex (Turning Point)**
The vertex is the highest or lowest point on the parabola.

**Vertex coordinates:**
$$x = -\\frac{b}{2a}$$
$$y = f\\left(-\\frac{b}{2a}\\right)$$

**3. Axis of Symmetry**
Vertical line through the vertex: x = −b/(2a)

**4. Y-intercept**
Where graph crosses y-axis: (0, c)

**5. X-intercepts (Roots)**
Where graph crosses x-axis: solve ax² + bx + c = 0
• Two x-intercepts if Δ > 0
• One x-intercept if Δ = 0
• No x-intercepts if Δ < 0

**Example 1:** Sketch y = x² − 4x + 3

**Solution:**

**Step 1:** Identify a, b, c
a = 1 (positive → opens upward)
b = −4, c = 3

**Step 2:** Find vertex
$$x = -\\frac{-4}{2(1)} = 2$$
$$y = 2^2 - 4(2) + 3 = 4 - 8 + 3 = -1$$
Vertex: (2, −1)

**Step 3:** Y-intercept
When x = 0: y = 3
Point: (0, 3)

**Step 4:** X-intercepts (roots)
$$x^2 - 4x + 3 = 0$$
$$(x - 1)(x - 3) = 0$$
x = 1 or x = 3
Points: (1, 0) and (3, 0)

**Step 5:** Sketch
• Opens upward (U-shape)
• Vertex at (2, −1) is minimum point
• Crosses x-axis at x = 1 and x = 3
• Crosses y-axis at y = 3
• Symmetric about line x = 2

**Example 2:** Sketch y = −x² + 2x + 3

**Solution:**
a = −1 (negative → opens downward)

Vertex:
$$x = -\\frac{2}{2(-1)} = 1$$
$$y = -(1)^2 + 2(1) + 3 = 4$$
Vertex: (1, 4) - maximum point

Y-intercept: (0, 3)

X-intercepts:
$$-x^2 + 2x + 3 = 0$$
$$x^2 - 2x - 3 = 0$$
$$(x - 3)(x + 1) = 0$$
x = 3 or x = −1

Graph opens downward, vertex at (1, 4), crosses x-axis at −1 and 3.

**Vertex Form:**
$$f(x) = a(x - h)^2 + k$$

where (h, k) is the vertex.

**Converting to Vertex Form:** Use completing the square

**Example 3:** Convert y = x² + 6x + 5 to vertex form

**Solution:**
$$y = x^2 + 6x + 5$$
$$y = (x^2 + 6x + 9) - 9 + 5$$
$$y = (x + 3)^2 - 4$$

Vertex: (−3, −4)`
      },
      {
        title: '10. WASSCE-Style Problem Solving',
        content: `**Strategy for WASSCE Success:**
1. Show all working clearly
2. Use standard methods (factorization, formula, completing square)
3. Check your discriminant for nature of roots
4. Verify solutions by substitution
5. State answers clearly with units where applicable

**Example 1 (Typical WASSCE):** Solve the equation 3x² − 7x + 2 = 0, giving your answers correct to 2 decimal places.

**Solution:**
Using quadratic formula:
a = 3, b = −7, c = 2

$$x = \\frac{-(-7) \\pm \\sqrt{(-7)^2 - 4(3)(2)}}{2(3)}$$
$$x = \\frac{7 \\pm \\sqrt{49 - 24}}{6}$$
$$x = \\frac{7 \\pm \\sqrt{25}}{6}$$
$$x = \\frac{7 \\pm 5}{6}$$

$$x = \\frac{12}{6} = 2 \\quad \\text{or} \\quad x = \\frac{2}{6} = \\frac{1}{3}$$

**Answer:** x = 2.00 or x = 0.33

**Example 2:** The equation x² + (k−2)x + 4 = 0 has equal roots. Find the possible values of k.

**Solution:**
For equal roots, discriminant = 0
$$b^2 - 4ac = 0$$
$$(k-2)^2 - 4(1)(4) = 0$$
$$k^2 - 4k + 4 - 16 = 0$$
$$k^2 - 4k - 12 = 0$$
$$(k - 6)(k + 2) = 0$$

**Answer:** k = 6 or k = −2

**Example 3:** The roots of the equation 2x² − 5x + 1 = 0 are α and β. Without solving the equation, find:
(a) α + β
(b) αβ
(c) α² + β²
(d) 1/α + 1/β

**Solution:**
a = 2, b = −5, c = 1

**(a)** $$\\alpha + \\beta = -\\frac{-5}{2} = \\frac{5}{2}$$

**(b)** $$\\alpha\\beta = \\frac{1}{2}$$

**(c)** $$\\alpha^2 + \\beta^2 = (\\alpha + \\beta)^2 - 2\\alpha\\beta$$
$$= \\left(\\frac{5}{2}\\right)^2 - 2\\left(\\frac{1}{2}\\right)$$
$$= \\frac{25}{4} - 1 = \\frac{21}{4}$$

**(d)** $$\\frac{1}{\\alpha} + \\frac{1}{\\beta} = \\frac{\\alpha + \\beta}{\\alpha\\beta}$$
$$= \\frac{5/2}{1/2} = 5$$

**Example 4:** A piece of wire 40 cm long is bent to form a rectangle. If the area enclosed is 96 cm², find the dimensions of the rectangle.

**Solution:**
Let length = x cm
Perimeter = 40 cm, so: 2(length + width) = 40
Therefore: length + width = 20
Width = (20 − x) cm

Area = length × width:
$$x(20 - x) = 96$$
$$20x - x^2 = 96$$
$$x^2 - 20x + 96 = 0$$
$$(x - 12)(x - 8) = 0$$
$$x = 12 \\text{ or } x = 8$$

**Answer:** Dimensions are **12 cm × 8 cm** (both solutions give same rectangle)`
      }
    ],
    activities: {
      type: 'exercises',
      exercises: [
        {
          type: 'mcq',
          question: 'Which of the following is a quadratic equation?',
          options: ['2x + 3 = 0', 'x² + 5x + 6 = 0', 'x³ + 2x = 7', '1/x + 3 = 0'],
          answer: 'x² + 5x + 6 = 0',
          explanation: 'A quadratic equation has the highest power of x as 2.'
        },
        {
          type: 'mcq',
          question: 'Solve x² + 8x + 15 = 0 by factorization.',
          options: ['x = -3 or x = -5', 'x = 3 or x = 5', 'x = -3 or x = 5', 'x = 3 or x = -5'],
          answer: 'x = -3 or x = -5',
          explanation: 'Factors: (x + 3)(x + 5) = 0, so x = -3 or x = -5.'
        },
        {
          type: 'mcq',
          question: 'What is the discriminant of 2x² + 3x - 5 = 0?',
          options: ['49', '29', '19', '39'],
          answer: '49',
          explanation: 'Δ = b² - 4ac = 3² - 4(2)(-5) = 9 + 40 = 49.'
        }
      ]
    },
    pastQuestions: [
      {
        question: '**WASSCE 2022:** Solve the equation 2x² − 5x − 3 = 0',
        solution: `**Solution:**

**Method 1: Factorization**
Factor using product-sum method:
ac = 2 × (−3) = −6
Need numbers that multiply to −6 and add to −5: −6 and 1

Rewrite:
$$2x^2 - 6x + x - 3 = 0$$
$$2x(x - 3) + 1(x - 3) = 0$$
$$(2x + 1)(x - 3) = 0$$

$$2x + 1 = 0 \\quad \\text{or} \\quad x - 3 = 0$$
$$x = -\\frac{1}{2} \\quad \\text{or} \\quad x = 3$$

**Method 2: Quadratic Formula**
$$x = \\frac{5 \\pm \\sqrt{25 + 24}}{4} = \\frac{5 \\pm 7}{4}$$

**Answer:** x = −1/2 or x = 3`
      },
      {
        question: '**WASSCE 2021:** The equation kx² + 3x + (k−2) = 0 has equal roots. Find the value(s) of k.',
        solution: `**Solution:**

For equal roots, discriminant = 0:
$$b^2 - 4ac = 0$$
$$3^2 - 4(k)(k-2) = 0$$
$$9 - 4k^2 + 8k = 0$$
$$-4k^2 + 8k + 9 = 0$$

Multiply by −1:
$$4k^2 - 8k - 9 = 0$$

Using quadratic formula:
$$k = \\frac{8 \\pm \\sqrt{64 + 144}}{8}$$
$$k = \\frac{8 \\pm \\sqrt{208}}{8}$$
$$k = \\frac{8 \\pm 4\\sqrt{13}}{8}$$
$$k = \\frac{2 \\pm \\sqrt{13}}{2}$$

**Answer:** k = (2 + √13)/2 or k = (2 − √13)/2`
      },
      {
        question: '**WASSCE 2020:** The roots of x² − 6x + k = 0 are α and β. If α² + β² = 24, find the value of k.',
        solution: `**Solution:**

From the equation:
$$\\alpha + \\beta = 6$$
$$\\alpha\\beta = k$$

Given: α² + β² = 24

Use identity:
$$\\alpha^2 + \\beta^2 = (\\alpha + \\beta)^2 - 2\\alpha\\beta$$
$$24 = 6^2 - 2k$$
$$24 = 36 - 2k$$
$$2k = 12$$
$$k = 6$$

**Answer:** k = 6`
      },
      {
        question: '**WASSCE 2019:** A rectangular garden has length (x+3) m and width x m. If the area is 40 m², find the dimensions of the garden.',
        solution: `**Solution:**

Area = length × width
$$x(x + 3) = 40$$
$$x^2 + 3x = 40$$
$$x^2 + 3x - 40 = 0$$

Factor:
$$(x + 8)(x - 5) = 0$$
$$x = -8 \\text{ or } x = 5$$

Since width cannot be negative: x = 5

Width = 5 m
Length = 5 + 3 = 8 m

**Answer:** Dimensions are 5 m × 8 m`
      },
      {
        question: '**WASSCE 2023:** Without solving the equation 3x² + 7x − 2 = 0, find the value of (α − β)² where α and β are the roots.',
        solution: `**Solution:**

From the equation:
$$\\alpha + \\beta = -\\frac{7}{3}$$
$$\\alpha\\beta = -\\frac{2}{3}$$

Use identity:
$$(\\alpha - \\beta)^2 = (\\alpha + \\beta)^2 - 4\\alpha\\beta$$

$$= \\left(-\\frac{7}{3}\\right)^2 - 4\\left(-\\frac{2}{3}\\right)$$

$$= \\frac{49}{9} + \\frac{8}{3}$$

$$= \\frac{49}{9} + \\frac{24}{9}$$

$$= \\frac{73}{9}$$

**Answer:** (α − β)² = 73/9`
      }
    ],
    endOfLessonQuiz: [
      {
        type: 'mcq',
        question: 'Which of the following is a quadratic equation?',
        options: ['2x + 5 = 0', '3x² + 2x − 1 = 0', 'x³ + x² = 0', '1/x² + 3x = 5'],
        answer: '3x² + 2x − 1 = 0',
        explanation: 'A quadratic equation has the form ax² + bx + c = 0 where a ≠ 0. Option B fits this form perfectly.'
      },
      {
        type: 'mcq',
        question: 'Solve: x² − 9 = 0',
        options: ['x = 3 only', 'x = −3 only', 'x = ±3', 'x = ±9'],
        answer: 'x = ±3',
        explanation: 'x² = 9, so x = √9 = ±3. This is also (x−3)(x+3) = 0, giving x = 3 or x = −3.'
      },
      {
        type: 'mcq',
        question: 'The discriminant of 2x² + 3x − 5 = 0 is:',
        options: ['49', '31', '19', '−31'],
        answer: '49',
        explanation: 'Δ = b² − 4ac = 3² − 4(2)(−5) = 9 + 40 = 49'
      },
      {
        type: 'mcq',
        question: 'If the discriminant of a quadratic equation is zero, the equation has:',
        options: ['Two distinct real roots', 'One repeated real root', 'No real roots', 'Three real roots'],
        answer: 'One repeated real root',
        explanation: 'When Δ = 0, the quadratic formula gives only one value (the ± part becomes zero), meaning one repeated root.'
      },
      {
        type: 'mcq',
        question: 'Solve: x² + 5x + 6 = 0',
        options: ['x = 2 or x = 3', 'x = −2 or x = −3', 'x = 1 or x = 6', 'x = −1 or x = −6'],
        answer: 'x = −2 or x = −3',
        explanation: 'Factor: (x+2)(x+3) = 0, so x = −2 or x = −3. Check: (−2)² + 5(−2) + 6 = 4 − 10 + 6 = 0 ✓'
      },
      {
        type: 'mcq',
        question: 'For the equation x² − 7x + 10 = 0, the sum of the roots is:',
        options: ['7', '−7', '10', '−10'],
        answer: '7',
        explanation: 'Sum of roots = −b/a = −(−7)/1 = 7. You can verify by solving: roots are 5 and 2, and 5 + 2 = 7.'
      },
      {
        type: 'mcq',
        question: 'For the equation 2x² + 3x − 5 = 0, the product of the roots is:',
        options: ['3/2', '−3/2', '5/2', '−5/2'],
        answer: '−5/2',
        explanation: 'Product of roots = c/a = −5/2'
      },
      {
        type: 'mcq',
        question: 'The equation with roots 3 and −5 is:',
        options: ['x² + 2x − 15 = 0', 'x² − 2x + 15 = 0', 'x² + 2x + 15 = 0', 'x² − 2x − 15 = 0'],
        answer: 'x² + 2x − 15 = 0',
        explanation: 'Sum = 3 + (−5) = −2, Product = 3 × (−5) = −15. Equation: x² − (sum)x + product = x² − (−2)x + (−15) = x² + 2x − 15 = 0'
      },
      {
        type: 'mcq',
        question: 'Solve using the quadratic formula: x² + 4x + 1 = 0',
        options: ['x = −2 ± √3', 'x = −2 ± √5', 'x = 2 ± √3', 'x = 2 ± √5'],
        answer: 'x = −2 ± √3',
        explanation: 'x = [−4 ± √(16−4)]/2 = [−4 ± √12]/2 = [−4 ± 2√3]/2 = −2 ± √3'
      },
      {
        type: 'mcq',
        question: 'For what value of k does x² + kx + 9 = 0 have equal roots?',
        options: ['k = ±3', 'k = ±6', 'k = ±9', 'k = ±12'],
        answer: 'k = ±6',
        explanation: 'For equal roots, Δ = 0: k² − 4(1)(9) = 0, k² = 36, k = ±6'
      },
      {
        type: 'mcq',
        question: 'The vertex of y = x² − 6x + 5 is at:',
        options: ['(3, −4)', '(−3, −4)', '(3, 4)', '(−3, 4)'],
        answer: '(3, −4)',
        explanation: 'x = −b/2a = 6/2 = 3. y = 3² − 6(3) + 5 = 9 − 18 + 5 = −4. Vertex: (3, −4)'
      },
      {
        type: 'mcq',
        question: 'Which method is ALWAYS guaranteed to work for solving any quadratic equation?',
        options: ['Factorization', 'Quadratic formula', 'Completing the square', 'Both B and C'],
        answer: 'Both B and C',
        explanation: 'The quadratic formula and completing the square work for all quadratic equations. Factorization only works when the equation factors nicely.'
      },
      {
        type: 'mcq',
        question: 'If the parabola y = ax² + bx + c opens downward, then:',
        options: ['a > 0', 'a < 0', 'b > 0', 'c > 0'],
        answer: 'a < 0',
        explanation: 'The sign of coefficient a determines direction: a > 0 opens upward (U), a < 0 opens downward (∩)'
      },
      {
        type: 'mcq',
        question: 'A rectangle has length 2x and width x. If its area is 50 m², find x.',
        options: ['5 m', '10 m', '25 m', '√50 m'],
        answer: '5 m',
        explanation: 'Area = length × width: 2x · x = 50, 2x² = 50, x² = 25, x = 5 (positive value only)'
      },
      {
        type: 'mcq',
        question: 'The roots of x² − 8x + k = 0 are equal. Find k.',
        options: ['4', '8', '16', '64'],
        answer: '16',
        explanation: 'For equal roots, Δ = 0: 64 − 4k = 0, k = 16'
      },
      {
        type: 'truefalse',
        statement: 'Every quadratic equation has exactly two solutions.',
        answer: 'false',
        reason: 'False. A quadratic can have two distinct solutions, one repeated solution, or no real solutions (depending on the discriminant).'
      },
      {
        type: 'truefalse',
        statement: 'If a quadratic equation has a negative discriminant, it has no real roots.',
        answer: 'true',
        reason: 'True. When Δ < 0, the square root in the quadratic formula produces an imaginary number, meaning no real solutions exist.'
      },
      {
        type: 'truefalse',
        statement: 'The sum of roots of 3x² − 6x + 2 = 0 is 2.',
        answer: 'true',
        reason: 'True. Sum = −b/a = −(−6)/3 = 6/3 = 2'
      },
      {
        type: 'truefalse',
        statement: 'Completing the square can only be used when the coefficient of x² is 1.',
        answer: 'false',
        reason: 'False. You can always divide the entire equation by the coefficient of x² first, then complete the square.'
      },
      {
        type: 'truefalse',
        statement: 'The graph of y = −x² + 4x − 3 has a maximum point.',
        answer: 'true',
        reason: 'True. Since a = −1 (negative), the parabola opens downward and has a maximum point at its vertex.'
      }
    ],
    summary: `**Quadratic Equations - Comprehensive Summary**

**Definition:** ax² + bx + c = 0 (where a ≠ 0)

**Three Main Solution Methods:**

1. **Factorization:** Best when equation factors nicely
   • Move all terms to one side
   • Factor completely
   • Apply zero product property
   • Solve each factor

2. **Quadratic Formula:** Works for ALL quadratic equations
   • x = [−b ± √(b² − 4ac)] / 2a
   • Always gives exact answers
   • Preferred in WASSCE when factoring is difficult

3. **Completing the Square:** Transforms to perfect square form
   • Useful for deriving vertex form
   • Required for some advanced problems
   • Same results as quadratic formula

**The Discriminant (Δ = b² − 4ac):**
• Δ > 0: Two distinct real roots (if perfect square → rational roots)
• Δ = 0: One repeated real root (perfect square equation)
• Δ < 0: No real roots (complex roots)

**Roots and Coefficients:**
• Sum of roots: α + β = −b/a
• Product of roots: αβ = c/a
• Equation from roots: x² − (sum)x + product = 0

**Graphing Quadratic Functions:**
• Shape: a > 0 (opens up), a < 0 (opens down)
• Vertex: x = −b/2a, then find y-coordinate
• Axis of symmetry: x = −b/2a
• Y-intercept: (0, c)
• X-intercepts: Solve ax² + bx + c = 0

**Word Problem Strategy:**
1. Define variable clearly
2. Form equation from given information
3. Solve using appropriate method
4. Check if solution is reasonable
5. State answer with units

**WASSCE Tips:**
• Show ALL working steps clearly
• Use quadratic formula if unsure about factoring
• Check discriminant when asked about nature of roots
• Always verify solutions by substitution when time permits
• State final answers clearly
• Master sum and product of roots formulas

Quadratic equations are essential for WASSCE success and form the foundation for higher mathematics, physics, and engineering. Practice different types of problems to build confidence and speed!`
  }
];

// Export function to get lessons (matching pattern from other files)
export function getCoreMathSHS3Lessons(): Lesson[] {
  return coreMathSHS3Lessons;
}
