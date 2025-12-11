// Sample JHS questions for each game type
export const JHSQuestions = [
  {
    type: "multiple_select",
    question: "Select all even numbers below:",
    options: ["1", "2", "3", "4", "5"],
    answers: ["2", "4"]
  },
  {
    type: "ordering",
    question: "Arrange the planets in order from the sun:",
    items: ["Mercury", "Venus", "Earth", "Mars"],
    correctOrder: [0, 1, 2, 3]
  },
  {
    type: "matching",
    question: "Match the country to its capital:",
    pairs: [
      { left: "Ghana", right: "Accra" },
      { left: "Nigeria", right: "Abuja" },
      { left: "Kenya", right: "Nairobi" }
    ]
  },
  {
    type: "mcq",
    question: "What is the largest ocean?",
    options: ["Atlantic", "Indian", "Pacific", "Arctic"],
    answer: "Pacific"
  }
];
