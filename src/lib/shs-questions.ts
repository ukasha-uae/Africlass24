// Sample SHS questions for each game type
export const SHSQuestions = [
  {
    type: "multiple_select",
    id: "ms1",
    question: "Select all prime numbers below:",
    options: ["2", "3", "4", "5", "6"],
    answers: ["2", "3", "5"]
  },
  {
    type: "ordering",
    id: "ord1",
    question: "Arrange the steps of the scientific method in order:",
    items: ["Form a hypothesis", "Make observations", "Conduct experiment", "Analyze results", "Draw conclusion"],
    correctOrder: [1, 0, 2, 3, 4]
  },
  {
    type: "matching",
    id: "match1",
    question: "Match the SHS subject to its field:",
    pairs: [
      { left: "Biology", right: "Life Sciences" },
      { left: "Physics", right: "Physical Sciences" },
      { left: "Economics", right: "Social Sciences" }
    ]
  },
  {
    type: "mcq",
    id: "mcq1",
    question: "What is the chemical formula for water?",
    options: ["H2O", "CO2", "O2", "NaCl"],
    answer: "H2O"
  }
];
