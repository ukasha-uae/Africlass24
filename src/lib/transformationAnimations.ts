import type { TransformationStep, AnimationFrame } from '../components/EnhancedAnimationPlayer';

// Translation Animation: Triangle A(1,2), B(3,2), C(2,4) translated by vector (4,-3)
export const translationSteps: TransformationStep[] = [
  {
    id: 1,
    title: "Original Position",
    description: "Here is triangle ABC with vertices at A(1,2), B(3,2), and C(2,4) on the coordinate grid.",
    highlights: [
      "Point A is at coordinates (1, 2)",
      "Point B is at coordinates (3, 2)",
      "Point C is at coordinates (2, 4)"
    ],
    duration: 3000,
    hint: "Notice the position of each vertex on the grid. You'll see how they move together!",
    funFact: "Translations are used in video games to move characters smoothly across the screen!"
  },
  {
    id: 2,
    title: "Translation Vector",
    description: "We will translate this triangle using the vector (4, -3). This means moving 4 units right and 3 units down.",
    formula: "Translation vector = (4, -3)",
    highlights: [
      "Horizontal component: +4 (move right)",
      "Vertical component: -3 (move down)"
    ],
    duration: 3000,
    hint: "Think of the vector as instructions: go 4 steps right, then 3 steps down!",
    funFact: "GPS navigation uses translation vectors to show how to get from one place to another!"
  },
  {
    id: 3,
    title: "Moving Point A",
    description: "First, let's translate point A. We add the vector to A's coordinates:",
    formula: "A(1,2) + (4,-3) = A'(1+4, 2-3) = A'(5,-1)",
    highlights: [
      "x-coordinate: 1 + 4 = 5",
      "y-coordinate: 2 + (-3) = -1",
      "New position: A'(5, -1)"
    ],
    duration: 3500,
    hint: "Add the vector components to the original coordinates. It's just simple addition!",
    funFact: "Architects use translations to position building elements in their designs!"
  },
  {
    id: 4,
    title: "Moving Point B",
    description: "Next, translate point B using the same vector:",
    formula: "B(3,2) + (4,-3) = B'(3+4, 2-3) = B'(7,-1)",
    highlights: [
      "x-coordinate: 3 + 4 = 7",
      "y-coordinate: 2 + (-3) = -1",
      "New position: B'(7, -1)"
    ],
    duration: 3500
  },
  {
    id: 5,
    title: "Moving Point C",
    description: "Finally, translate point C:",
    formula: "C(2,4) + (4,-3) = C'(2+4, 4-3) = C'(6,1)",
    highlights: [
      "x-coordinate: 2 + 4 = 6",
      "y-coordinate: 4 + (-3) = 1",
      "New position: C'(6, 1)"
    ],
    duration: 3500
  },
  {
    id: 6,
    title: "Complete Translation",
    description: "Translation complete! Triangle A'B'C' is congruent to ABC. The shape, size, and orientation are unchanged.",
    highlights: [
      "Original: A(1,2), B(3,2), C(2,4)",
      "Image: A'(5,-1), B'(7,-1), C'(6,1)",
      "Properties preserved: shape, size, orientation"
    ],
    duration: 4000,
    hint: "Notice the triangle looks exactly the same, just in a different position!",
    funFact: "Animation studios use millions of translations per second to create smooth motion in movies!"
  }
];

export const translationFrames: AnimationFrame[] = [
  // Frame 1: Original triangle
  {
    shapes: [
      {
        type: 'polygon',
        points: [[260, 140], [300, 140], [280, 100]],
        color: '#3b82f6',
        fillColor: '#3b82f6',
        strokeWidth: 2
      }
    ],
    annotations: [
      { text: 'A', x: 255, y: 155, color: '#1e40af' },
      { text: 'B', x: 305, y: 155, color: '#1e40af' },
      { text: 'C', x: 275, y: 90, color: '#1e40af' },
      { text: 'A(1,2)', x: 245, y: 145, color: '#1e40af' },
      { text: 'B(3,2)', x: 305, y: 145, color: '#1e40af' },
      { text: 'C(2,4)', x: 265, y: 95, color: '#1e40af' }
    ]
  },
  // Frame 2: Show vector
  {
    shapes: [
      {
        type: 'polygon',
        points: [[260, 140], [300, 140], [280, 100]],
        color: '#3b82f6',
        fillColor: '#3b82f6',
        strokeWidth: 2
      },
      {
        type: 'line',
        x1: 280,
        y1: 120,
        x2: 360,
        y2: 180,
        color: '#ef4444',
        strokeWidth: 3,
        dashed: true
      }
    ],
    annotations: [
      { text: 'A', x: 255, y: 155, color: '#1e40af' },
      { text: 'B', x: 305, y: 155, color: '#1e40af' },
      { text: 'C', x: 275, y: 90, color: '#1e40af' },
      { text: 'Vector (4,-3)', x: 305, y: 145, color: '#ef4444' }
    ]
  },
  // Frame 3: Move point A
  {
    shapes: [
      {
        type: 'polygon',
        points: [[260, 140], [300, 140], [280, 100]],
        color: '#9ca3af',
        fillColor: '#9ca3af',
        strokeWidth: 1
      },
      {
        type: 'polygon',
        points: [[340, 200], [300, 140], [280, 100]],
        color: '#10b981',
        fillColor: '#10b981',
        strokeWidth: 2
      }
    ],
    annotations: [
      { text: 'A', x: 255, y: 155, color: '#9ca3af' },
      { text: "A'", x: 335, y: 215, color: '#059669' },
      { text: "A'(5,-1)", x: 320, y: 205, color: '#059669' },
      { text: '→', x: 295, y: 175, color: '#ef4444' }
    ]
  },
  // Frame 4: Move point B
  {
    shapes: [
      {
        type: 'polygon',
        points: [[260, 140], [300, 140], [280, 100]],
        color: '#9ca3af',
        fillColor: '#9ca3af',
        strokeWidth: 1
      },
      {
        type: 'polygon',
        points: [[340, 200], [380, 200], [280, 100]],
        color: '#10b981',
        fillColor: '#10b981',
        strokeWidth: 2
      }
    ],
    annotations: [
      { text: 'B', x: 305, y: 155, color: '#9ca3af' },
      { text: "B'", x: 385, y: 215, color: '#059669' },
      { text: "B'(7,-1)", x: 385, y: 205, color: '#059669' },
      { text: "A'", x: 335, y: 215, color: '#059669' }
    ]
  },
  // Frame 5: Move point C
  {
    shapes: [
      {
        type: 'polygon',
        points: [[260, 140], [300, 140], [280, 100]],
        color: '#9ca3af',
        fillColor: '#9ca3af',
        strokeWidth: 1
      },
      {
        type: 'polygon',
        points: [[340, 200], [380, 200], [360, 160]],
        color: '#10b981',
        fillColor: '#10b981',
        strokeWidth: 2
      }
    ],
    annotations: [
      { text: 'C', x: 275, y: 90, color: '#9ca3af' },
      { text: "C'", x: 355, y: 150, color: '#059669' },
      { text: "C'(6,1)", x: 345, y: 155, color: '#059669' },
      { text: "A'", x: 335, y: 215, color: '#059669' },
      { text: "B'", x: 385, y: 215, color: '#059669' }
    ]
  },
  // Frame 6: Final position with both triangles
  {
    shapes: [
      {
        type: 'polygon',
        points: [[260, 140], [300, 140], [280, 100]],
        color: '#3b82f6',
        fillColor: '#3b82f6',
        strokeWidth: 2
      },
      {
        type: 'polygon',
        points: [[340, 200], [380, 200], [360, 160]],
        color: '#10b981',
        fillColor: '#10b981',
        strokeWidth: 2
      }
    ],
    annotations: [
      { text: 'A(1,2)', x: 245, y: 145, color: '#1e40af' },
      { text: 'B(3,2)', x: 305, y: 145, color: '#1e40af' },
      { text: 'C(2,4)', x: 265, y: 95, color: '#1e40af' },
      { text: "A'(5,-1)", x: 320, y: 205, color: '#059669' },
      { text: "B'(7,-1)", x: 385, y: 205, color: '#059669' },
      { text: "C'(6,1)", x: 345, y: 155, color: '#059669' }
    ]
  }
];

// Reflection Animation: Triangle P(2,2), Q(4,2), R(3,4) reflected in y-axis
export const reflectionSteps: TransformationStep[] = [
  {
    id: 1,
    title: "Original Triangle",
    description: "Triangle PQR with vertices at P(2,2), Q(4,2), and R(3,4) positioned on the right side of the y-axis.",
    highlights: [
      "P is at (2, 2) - 2 units right of y-axis",
      "Q is at (4, 2) - 4 units right of y-axis",
      "R is at (3, 4) - 3 units right of y-axis"
    ],
    duration: 3000,
    hint: "Imagine the y-axis is a mirror - where would the triangle appear on the other side?",
    funFact: "Your face in a mirror is a reflection! Symmetry in nature uses the same principle."
  },
  {
    id: 2,
    title: "Mirror Line",
    description: "The y-axis acts as our mirror line. Each point will reflect to the opposite side at equal distance.",
    formula: "Reflection in y-axis: (x, y) → (-x, y)",
    highlights: [
      "Mirror line: x = 0 (the y-axis)",
      "x-coordinate changes sign",
      "y-coordinate stays the same"
    ],
    duration: 3000
  },
  {
    id: 3,
    title: "Reflecting Point P",
    description: "Point P is 2 units to the right of the y-axis, so P' will be 2 units to the left:",
    formula: "P(2, 2) → P'(-2, 2)",
    highlights: [
      "Distance from y-axis: 2 units",
      "Reflected position: 2 units on opposite side",
      "P'(-2, 2)"
    ],
    duration: 3500
  },
  {
    id: 4,
    title: "Reflecting Point Q",
    description: "Point Q is 4 units to the right, so Q' will be 4 units to the left:",
    formula: "Q(4, 2) → Q'(-4, 2)",
    highlights: [
      "Distance from y-axis: 4 units",
      "Reflected position: 4 units on opposite side",
      "Q'(-4, 2)"
    ],
    duration: 3500
  },
  {
    id: 5,
    title: "Reflecting Point R",
    description: "Point R is 3 units to the right, so R' will be 3 units to the left:",
    formula: "R(3, 4) → R'(-3, 4)",
    highlights: [
      "Distance from y-axis: 3 units",
      "Reflected position: 3 units on opposite side",
      "R'(-3, 4)"
    ],
    duration: 3500
  },
  {
    id: 6,
    title: "Complete Reflection",
    description: "Reflection complete! Triangle P'Q'R' is congruent to PQR but with reversed orientation (mirror image).",
    highlights: [
      "Original: P(2,2), Q(4,2), R(3,4)",
      "Image: P'(-2,2), Q'(-4,2), R'(-3,4)",
      "Shape and size preserved, orientation reversed"
    ],
    duration: 4000
  }
];

export const reflectionFrames: AnimationFrame[] = [
  // Frame 1: Original triangle
  {
    shapes: [
      {
        type: 'polygon',
        points: [[280, 140], [320, 140], [300, 100]],
        color: '#3b82f6',
        fillColor: '#3b82f6',
        strokeWidth: 2
      }
    ],
    annotations: [
      { text: 'P', x: 275, y: 155, color: '#1e40af' },
      { text: 'Q', x: 325, y: 155, color: '#1e40af' },
      { text: 'R', x: 295, y: 90, color: '#1e40af' },
      { text: 'P(2,2)', x: 265, y: 145, color: '#1e40af' },
      { text: 'Q(4,2)', x: 325, y: 145, color: '#1e40af' },
      { text: 'R(3,4)', x: 285, y: 90, color: '#1e40af' }
    ]
  },
  // Frame 2: Show mirror line
  {
    shapes: [
      {
        type: 'polygon',
        points: [[280, 140], [320, 140], [300, 100]],
        color: '#3b82f6',
        fillColor: '#3b82f6',
        strokeWidth: 2
      },
      {
        type: 'line',
        x1: 240,
        y1: 50,
        x2: 240,
        y2: 310,
        color: '#9333ea',
        strokeWidth: 3,
        dashed: true
      }
    ],
    annotations: [
      { text: 'P(2,2)', x: 265, y: 145, color: '#1e40af' },
      { text: 'Q(4,2)', x: 325, y: 145, color: '#1e40af' },
      { text: 'R(3,4)', x: 285, y: 90, color: '#1e40af' },
      { text: 'y-axis', x: 210, y: 70, color: '#9333ea' },
      { text: '(Mirror)', x: 205, y: 90, color: '#9333ea' }
    ]
  },
  // Frame 3: Reflect P
  {
    shapes: [
      {
        type: 'polygon',
        points: [[280, 140], [320, 140], [300, 100]],
        color: '#9ca3af',
        fillColor: '#9ca3af',
        strokeWidth: 1
      },
      {
        type: 'line',
        x1: 240,
        y1: 50,
        x2: 240,
        y2: 310,
        color: '#9333ea',
        strokeWidth: 3,
        dashed: true
      },
      {
        type: 'polygon',
        points: [[200, 140], [320, 140], [300, 100]],
        color: '#10b981',
        fillColor: '#10b981',
        strokeWidth: 2
      }
    ],
    annotations: [
      { text: 'P', x: 275, y: 155, color: '#9ca3af' },
      { text: "P'", x: 195, y: 155, color: '#059669' },
      { text: "P'(-2,2)", x: 130, y: 145, color: '#059669' }
    ]
  },
  // Frame 4: Reflect Q
  {
    shapes: [
      {
        type: 'polygon',
        points: [[280, 140], [320, 140], [300, 100]],
        color: '#9ca3af',
        fillColor: '#9ca3af',
        strokeWidth: 1
      },
      {
        type: 'line',
        x1: 240,
        y1: 50,
        x2: 240,
        y2: 310,
        color: '#9333ea',
        strokeWidth: 3,
        dashed: true
      },
      {
        type: 'polygon',
        points: [[200, 140], [160, 140], [300, 100]],
        color: '#10b981',
        fillColor: '#10b981',
        strokeWidth: 2
      }
    ],
    annotations: [
      { text: 'Q', x: 325, y: 155, color: '#9ca3af' },
      { text: "Q'", x: 145, y: 155, color: '#059669' },
      { text: "Q'(-4,2)", x: 90, y: 145, color: '#059669' },
      { text: "P'", x: 195, y: 155, color: '#059669' }
    ]
  },
  // Frame 5: Reflect R
  {
    shapes: [
      {
        type: 'polygon',
        points: [[280, 140], [320, 140], [300, 100]],
        color: '#9ca3af',
        fillColor: '#9ca3af',
        strokeWidth: 1
      },
      {
        type: 'line',
        x1: 240,
        y1: 50,
        x2: 240,
        y2: 310,
        color: '#9333ea',
        strokeWidth: 3,
        dashed: true
      },
      {
        type: 'polygon',
        points: [[200, 140], [160, 140], [180, 100]],
        color: '#10b981',
        fillColor: '#10b981',
        strokeWidth: 2
      }
    ],
    annotations: [
      { text: 'R', x: 295, y: 90, color: '#9ca3af' },
      { text: "R'", x: 175, y: 90, color: '#059669' },
      { text: "R'(-3,4)", x: 110, y: 90, color: '#059669' },
      { text: "P'", x: 195, y: 155, color: '#059669' },
      { text: "Q'", x: 145, y: 155, color: '#059669' }
    ]
  },
  // Frame 6: Both triangles
  {
    shapes: [
      {
        type: 'polygon',
        points: [[280, 140], [320, 140], [300, 100]],
        color: '#3b82f6',
        fillColor: '#3b82f6',
        strokeWidth: 2
      },
      {
        type: 'line',
        x1: 240,
        y1: 50,
        x2: 240,
        y2: 310,
        color: '#9333ea',
        strokeWidth: 3,
        dashed: true
      },
      {
        type: 'polygon',
        points: [[200, 140], [160, 140], [180, 100]],
        color: '#10b981',
        fillColor: '#10b981',
        strokeWidth: 2
      }
    ],
    annotations: [
      { text: 'P(2,2)', x: 265, y: 145, color: '#1e40af' },
      { text: 'Q(4,2)', x: 325, y: 145, color: '#1e40af' },
      { text: 'R(3,4)', x: 285, y: 90, color: '#1e40af' },
      { text: "P'(-2,2)", x: 130, y: 145, color: '#059669' },
      { text: "Q'(-4,2)", x: 90, y: 145, color: '#059669' },
      { text: "R'(-3,4)", x: 110, y: 90, color: '#059669' }
    ]
  }
];

// Rotation Animation: Triangle A(1,2), B(3,2), C(2,4) rotated 90° CCW about origin
export const rotationSteps: TransformationStep[] = [
  {
    id: 1,
    title: "Original Triangle",
    description: "Triangle ABC with vertices at A(1,2), B(3,2), and C(2,4). We'll rotate it 90° counterclockwise about the origin.",
    highlights: [
      "Center of rotation: Origin O(0,0)",
      "Angle: 90° counterclockwise",
      "All points rotate around O"
    ],
    duration: 3000,
    hint: "Imagine turning the whole grid 90° to the left - that's counterclockwise!",
    funFact: "Wheels, gears, and fans all use rotation! Even the Earth rotates around its axis!"
  },
  {
    id: 2,
    title: "Rotation Rule",
    description: "For 90° counterclockwise rotation about the origin, we use the rule: (x, y) → (-y, x)",
    formula: "90° CCW: (x, y) → (-y, x)",
    highlights: [
      "x-coordinate becomes negative of y",
      "y-coordinate becomes x",
      "Distance from origin stays the same"
    ],
    duration: 3000
  },
  {
    id: 3,
    title: "Rotating Point A",
    description: "Apply the rotation rule to point A:",
    formula: "A(1, 2) → A'(-2, 1)",
    highlights: [
      "Original: x=1, y=2",
      "New x = -y = -2",
      "New y = x = 1",
      "Result: A'(-2, 1)"
    ],
    duration: 3500
  },
  {
    id: 4,
    title: "Rotating Point B",
    description: "Apply the rotation rule to point B:",
    formula: "B(3, 2) → B'(-2, 3)",
    highlights: [
      "Original: x=3, y=2",
      "New x = -y = -2",
      "New y = x = 3",
      "Result: B'(-2, 3)"
    ],
    duration: 3500
  },
  {
    id: 5,
    title: "Rotating Point C",
    description: "Apply the rotation rule to point C:",
    formula: "C(2, 4) → C'(-4, 2)",
    highlights: [
      "Original: x=2, y=4",
      "New x = -y = -4",
      "New y = x = 2",
      "Result: C'(-4, 2)"
    ],
    duration: 3500
  },
  {
    id: 6,
    title: "Complete Rotation",
    description: "Rotation complete! Triangle A'B'C' is congruent to ABC. The shape and size are preserved, but orientation has changed.",
    highlights: [
      "Original: A(1,2), B(3,2), C(2,4)",
      "Image: A'(-2,1), B'(-2,3), C'(-4,2)",
      "Distance from origin preserved for all points"
    ],
    duration: 4000
  }
];

export const rotationFrames: AnimationFrame[] = [
  // Frame 1: Original triangle
  {
    shapes: [
      {
        type: 'circle',
        cx: 240,
        cy: 200,
        r: 5,
        color: '#ef4444',
        fillColor: '#ef4444'
      },
      {
        type: 'polygon',
        points: [[260, 140], [300, 140], [280, 100]],
        color: '#3b82f6',
        fillColor: '#3b82f6',
        strokeWidth: 2
      }
    ],
    annotations: [
      { text: 'O', x: 245, y: 215, color: '#ef4444' },
      { text: 'A', x: 255, y: 155, color: '#1e40af' },
      { text: 'B', x: 305, y: 155, color: '#1e40af' },
      { text: 'C', x: 275, y: 90, color: '#1e40af' },
      { text: 'A(1,2)', x: 245, y: 145, color: '#1e40af' },
      { text: 'B(3,2)', x: 305, y: 145, color: '#1e40af' },
      { text: 'C(2,4)', x: 265, y: 95, color: '#1e40af' }
    ]
  },
  // Frame 2: Show center and rotation arc
  {
    shapes: [
      {
        type: 'circle',
        cx: 240,
        cy: 200,
        r: 5,
        color: '#ef4444',
        fillColor: '#ef4444'
      },
      {
        type: 'polygon',
        points: [[260, 140], [300, 140], [280, 100]],
        color: '#3b82f6',
        fillColor: '#3b82f6',
        strokeWidth: 2
      }
    ],
    annotations: [
      { text: 'O(0,0)', x: 245, y: 215, color: '#ef4444' },
      { text: 'Center', x: 215, y: 205, color: '#ef4444' },
      { text: '90° ↺', x: 200, y: 100, color: '#f59e0b' },
      { text: 'A(1,2)', x: 245, y: 145, color: '#1e40af' },
      { text: 'B(3,2)', x: 305, y: 145, color: '#1e40af' },
      { text: 'C(2,4)', x: 265, y: 95, color: '#1e40af' }
    ]
  },
  // Frame 3: Rotate A
  {
    shapes: [
      {
        type: 'circle',
        cx: 240,
        cy: 200,
        r: 5,
        color: '#ef4444',
        fillColor: '#ef4444'
      },
      {
        type: 'polygon',
        points: [[260, 140], [300, 140], [280, 100]],
        color: '#9ca3af',
        fillColor: '#9ca3af',
        strokeWidth: 1
      },
      {
        type: 'polygon',
        points: [[160, 180], [300, 140], [280, 100]],
        color: '#10b981',
        fillColor: '#10b981',
        strokeWidth: 2
      }
    ],
    annotations: [
      { text: 'A', x: 255, y: 155, color: '#9ca3af' },
      { text: "A'", x: 145, y: 180, color: '#059669' },
      { text: "A'(-2,1)", x: 90, y: 185, color: '#059669' }
    ]
  },
  // Frame 4: Rotate B
  {
    shapes: [
      {
        type: 'circle',
        cx: 240,
        cy: 200,
        r: 5,
        color: '#ef4444',
        fillColor: '#ef4444'
      },
      {
        type: 'polygon',
        points: [[260, 140], [300, 140], [280, 100]],
        color: '#9ca3af',
        fillColor: '#9ca3af',
        strokeWidth: 1
      },
      {
        type: 'polygon',
        points: [[160, 180], [160, 140], [280, 100]],
        color: '#10b981',
        fillColor: '#10b981',
        strokeWidth: 2
      }
    ],
    annotations: [
      { text: 'B', x: 305, y: 155, color: '#9ca3af' },
      { text: "B'", x: 145, y: 140, color: '#059669' },
      { text: "B'(-2,3)", x: 90, y: 135, color: '#059669' },
      { text: "A'", x: 145, y: 180, color: '#059669' }
    ]
  },
  // Frame 5: Rotate C
  {
    shapes: [
      {
        type: 'circle',
        cx: 240,
        cy: 200,
        r: 5,
        color: '#ef4444',
        fillColor: '#ef4444'
      },
      {
        type: 'polygon',
        points: [[260, 140], [300, 140], [280, 100]],
        color: '#9ca3af',
        fillColor: '#9ca3af',
        strokeWidth: 1
      },
      {
        type: 'polygon',
        points: [[160, 180], [160, 140], [120, 160]],
        color: '#10b981',
        fillColor: '#10b981',
        strokeWidth: 2
      }
    ],
    annotations: [
      { text: 'C', x: 275, y: 90, color: '#9ca3af' },
      { text: "C'", x: 105, y: 160, color: '#059669' },
      { text: "C'(-4,2)", x: 60, y: 155, color: '#059669' },
      { text: "A'", x: 145, y: 180, color: '#059669' },
      { text: "B'", x: 145, y: 140, color: '#059669' }
    ]
  },
  // Frame 6: Both triangles
  {
    shapes: [
      {
        type: 'circle',
        cx: 240,
        cy: 200,
        r: 5,
        color: '#ef4444',
        fillColor: '#ef4444'
      },
      {
        type: 'polygon',
        points: [[260, 140], [300, 140], [280, 100]],
        color: '#3b82f6',
        fillColor: '#3b82f6',
        strokeWidth: 2
      },
      {
        type: 'polygon',
        points: [[160, 180], [160, 140], [120, 160]],
        color: '#10b981',
        fillColor: '#10b981',
        strokeWidth: 2
      }
    ],
    annotations: [
      { text: 'A(1,2)', x: 245, y: 145, color: '#1e40af' },
      { text: 'B(3,2)', x: 305, y: 145, color: '#1e40af' },
      { text: 'C(2,4)', x: 265, y: 95, color: '#1e40af' },
      { text: "A'(-2,1)", x: 90, y: 185, color: '#059669' },
      { text: "B'(-2,3)", x: 90, y: 135, color: '#059669' },
      { text: "C'(-4,2)", x: 60, y: 155, color: '#059669' },
      { text: 'O(0,0)', x: 245, y: 215, color: '#ef4444' }
    ]
  }
];
