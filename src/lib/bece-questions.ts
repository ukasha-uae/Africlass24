import { v4 as uuidv4 } from 'uuid';

export type QuestionDifficulty = 'easy' | 'medium' | 'hard';
export type QuestionSubject = 'Mathematics' | 'English Language' | 'Integrated Science' | 'Social Studies' | 'ICT' | 'RME';

export interface BeceQuestion {
  id: string;
  subject: QuestionSubject;
  year?: number;
  topic?: string;
  difficulty: QuestionDifficulty;
  question: string;
  options: string[];
  correctAnswer: number; // index of the correct option (0-3)
  explanation?: string;
}

// Helper to create questions easily
const createQuestion = (
  subject: QuestionSubject,
  difficulty: QuestionDifficulty,
  question: string,
  options: string[],
  correctAnswer: number,
  explanation?: string,
  year?: number,
  topic?: string
): BeceQuestion => ({
  id: uuidv4(),
  subject,
  difficulty,
  question,
  options,
  correctAnswer,
  explanation,
  year,
  topic
});

export const beceQuestions: BeceQuestion[] = [
  // MATHEMATICS - Easy
  createQuestion('Mathematics', 'easy', 'If set A = {1, 2, 3, 4, 5} and set B = {2, 4, 6, 8}, find A ∩ B.', ['{1, 3, 5}', '{2, 4}', '{1, 2, 3, 4, 5, 6, 8}', '{6, 8}'], 1, 'Intersection (∩) contains elements present in both sets. 2 and 4 are in both A and B.', 2020, 'Sets'),
  createQuestion('Mathematics', 'easy', 'Simplify 3x + 4y - x + 2y', ['2x + 6y', '4x + 6y', '2x + 2y', '3x + 6y'], 0, 'Group like terms: (3x - x) + (4y + 2y) = 2x + 6y', 2019, 'Algebra'),
  createQuestion('Mathematics', 'easy', 'Convert 0.75 to a fraction in its lowest term.', ['3/4', '1/2', '2/3', '4/5'], 0, '0.75 = 75/100. Divide both by 25 to get 3/4.', 2018, 'Numbers'),
  createQuestion('Mathematics', 'easy', 'Find the LCM of 4, 6 and 8.', ['12', '16', '24', '48'], 2, 'Multiples of 8: 8, 16, 24... 24 is divisible by 4 and 6.', 2021, 'Numbers'),
  createQuestion('Mathematics', 'easy', 'What is the value of 7 in the number 87,532?', ['700', '7,000', '70', '7'], 1, 'The 7 is in the thousands place.', 2017, 'Numbers'),
  createQuestion('Mathematics', 'easy', 'Evaluate 2³ × 3²', ['72', '54', '36', '12'], 0, '2³ = 8, 3² = 9. 8 × 9 = 72.', 2022, 'Numbers'),
  createQuestion('Mathematics', 'easy', 'Solve for x if x + 5 = 12', ['5', '6', '7', '17'], 2, 'Subtract 5 from both sides: x = 12 - 5 = 7', 2015, 'Algebra'),
  createQuestion('Mathematics', 'easy', 'Which of the following is a prime number?', ['9', '15', '19', '21'], 2, '19 has only two factors: 1 and itself.', 2016, 'Numbers'),
  createQuestion('Mathematics', 'easy', 'Calculate the area of a rectangle with length 8cm and width 5cm.', ['13cm²', '26cm²', '40cm²', '80cm²'], 2, 'Area = length × width = 8 × 5 = 40cm²', 2018, 'Mensuration'),
  createQuestion('Mathematics', 'easy', 'Express 45% as a fraction in its lowest term.', ['9/20', '4/5', '9/10', '1/2'], 0, '45/100 = 9/20 (dividing by 5)', 2019, 'Numbers'),

  // MATHEMATICS - Medium
  createQuestion('Mathematics', 'medium', 'Solve the inequality: 2x - 5 > 3', ['x > 4', 'x < 4', 'x > -4', 'x < -4'], 0, '2x > 8, so x > 4', 2020, 'Algebra'),
  createQuestion('Mathematics', 'medium', 'The ratio of boys to girls in a class is 3:2. If there are 12 girls, how many boys are there?', ['12', '15', '18', '20'], 2, 'Ratio 3:2. Girls part is 2 units = 12 students. 1 unit = 6. Boys = 3 units = 3 × 6 = 18.', 2021, 'Ratios'),
  createQuestion('Mathematics', 'medium', 'Find the simple interest on GH₵ 5,000.00 for 3 years at 10% per annum.', ['GH₵ 150.00', 'GH₵ 500.00', 'GH₵ 1,500.00', 'GH₵ 1,000.00'], 2, 'I = (P × R × T) / 100 = (5000 × 10 × 3) / 100 = 1500', 2019, 'Business Math'),
  createQuestion('Mathematics', 'medium', 'If a = 3 and b = -2, evaluate 2a - b.', ['4', '8', '5', '7'], 1, '2(3) - (-2) = 6 + 2 = 8', 2018, 'Algebra'),
  createQuestion('Mathematics', 'medium', 'The sum of angles in a triangle is...', ['90°', '180°', '270°', '360°'], 1, 'The interior angles of a triangle always sum to 180°.', 2017, 'Geometry'),
  createQuestion('Mathematics', 'medium', 'Find the circumference of a circle with radius 7cm (Take π = 22/7).', ['22cm', '44cm', '154cm', '14cm'], 1, 'C = 2πr = 2 × (22/7) × 7 = 44cm', 2022, 'Mensuration'),
  createQuestion('Mathematics', 'medium', 'Factorize completely: 3x² - 12x', ['3x(x - 4)', '3(x² - 4x)', 'x(3x - 12)', '3x(x + 4)'], 0, 'Common factor is 3x. 3x(x - 4)', 2016, 'Algebra'),
  createQuestion('Mathematics', 'medium', 'A car travels 180km in 3 hours. What is its average speed?', ['50 km/h', '60 km/h', '70 km/h', '80 km/h'], 1, 'Speed = Distance / Time = 180 / 3 = 60 km/h', 2020, 'Rates'),
  createQuestion('Mathematics', 'medium', 'Find the median of the numbers: 4, 1, 7, 3, 8, 2, 9', ['3', '4', '7', '8'], 1, 'Order: 1, 2, 3, 4, 7, 8, 9. Middle number is 4.', 2015, 'Statistics'),
  createQuestion('Mathematics', 'medium', 'Solve for y: 3(y + 2) = 2(y + 5)', ['2', '3', '4', '5'], 2, '3y + 6 = 2y + 10 => y = 4', 2021, 'Algebra'),

  // MATHEMATICS - Hard
  createQuestion('Mathematics', 'hard', 'The interior angle of a regular polygon is 144°. How many sides does it have?', ['8', '9', '10', '12'], 2, 'Exterior angle = 180 - 144 = 36°. Number of sides = 360 / 36 = 10.', 2019, 'Geometry'),
  createQuestion('Mathematics', 'hard', 'Make u the subject of the relation v = u + at', ['u = v - at', 'u = v + at', 'u = (v/a) - t', 'u = v/t - a'], 0, 'Subtract at from both sides: v - at = u', 2018, 'Algebra'),
  createQuestion('Mathematics', 'hard', 'A cylinder has a volume of 1540 cm³ and a height of 10 cm. Find its radius. (Take π = 22/7)', ['5 cm', '7 cm', '10 cm', '14 cm'], 1, 'V = πr²h. 1540 = (22/7)r²(10). 154 = (22/7)r². r² = 154 × 7 / 22 = 49. r = 7.', 2020, 'Mensuration'),
  createQuestion('Mathematics', 'hard', 'If 2^x = 32, find x.', ['3', '4', '5', '6'], 2, '2 × 2 × 2 × 2 × 2 = 32. So x = 5.', 2017, 'Indices'),
  createQuestion('Mathematics', 'hard', 'In a class of 40 students, 25 play football, 20 play hockey and 10 play both. How many play neither?', ['5', '10', '15', '0'], 0, 'n(F∪H) = n(F) + n(H) - n(F∩H) = 25 + 20 - 10 = 35. Neither = 40 - 35 = 5.', 2021, 'Sets'),
  createQuestion('Mathematics', 'hard', 'Find the gradient of the line joining points A(2, 3) and B(6, 11).', ['1', '2', '3', '4'], 1, 'Gradient = (y2 - y1) / (x2 - x1) = (11 - 3) / (6 - 2) = 8 / 4 = 2', 2022, 'Coordinate Geometry'),
  createQuestion('Mathematics', 'hard', 'Simplify: (2√3 + √2)(2√3 - √2)', ['8', '10', '12', '14'], 1, 'Difference of two squares: (2√3)² - (√2)² = (4×3) - 2 = 12 - 2 = 10', 2016, 'Surds'),
  createQuestion('Mathematics', 'hard', 'The probability of passing an exam is 0.8. If 50 students took the exam, how many are expected to fail?', ['5', '10', '20', '40'], 1, 'Prob(Fail) = 1 - 0.8 = 0.2. Expected fail = 0.2 × 50 = 10.', 2019, 'Probability'),
  createQuestion('Mathematics', 'hard', 'Solve the simultaneous equations: 2x + y = 7 and x - y = 2', ['x=3, y=1', 'x=2, y=3', 'x=4, y=-1', 'x=3, y=2'], 0, 'Add equations: 3x = 9 => x = 3. Substitute x: 3 - y = 2 => y = 1.', 2015, 'Algebra'),
  createQuestion('Mathematics', 'hard', 'Calculate the total surface area of a closed cylinder with radius 7cm and height 10cm. (π = 22/7)', ['748 cm²', '374 cm²', '528 cm²', '440 cm²'], 0, 'TSA = 2πr(r + h) = 2 × (22/7) × 7 × (7 + 10) = 44 × 17 = 748 cm²', 2018, 'Mensuration'),

  // ENGLISH LANGUAGE - Easy
  createQuestion('English Language', 'easy', 'Choose the word that best completes the sentence: The boy _____ to school yesterday.', ['go', 'goes', 'went', 'gone'], 2, 'Past tense of go is went.', 2020, 'Grammar'),
  createQuestion('English Language', 'easy', 'Which of the following is a noun?', ['Run', 'Beautiful', 'Accra', 'Quickly'], 2, 'Accra is a proper noun (name of a place).', 2019, 'Grammar'),
  createQuestion('English Language', 'easy', 'The plural of "child" is...', ['childs', 'children', 'childrens', 'childes'], 1, 'Irregular plural.', 2018, 'Grammar'),
  createQuestion('English Language', 'easy', 'Choose the correct spelling.', ['Recieve', 'Receive', 'Riceive', 'Receve'], 1, 'I before E except after C.', 2021, 'Spelling'),
  createQuestion('English Language', 'easy', 'The opposite of "ancient" is...', ['old', 'modern', 'antique', 'past'], 1, 'Ancient means very old; modern means new/current.', 2017, 'Antonyms'),
  createQuestion('English Language', 'easy', 'Identify the verb in the sentence: "She sings beautifully."', ['She', 'sings', 'beautifully', 'none'], 1, 'Sings is the action word.', 2022, 'Grammar'),
  createQuestion('English Language', 'easy', 'A person who writes poems is called a...', ['Poet', 'Author', 'Writer', 'Novelist'], 0, 'Specific term for poetry writer.', 2016, 'Vocabulary'),
  createQuestion('English Language', 'easy', 'Choose the correct preposition: He jumped _____ the pool.', ['on', 'at', 'into', 'in'], 2, 'Into indicates movement towards the inside.', 2015, 'Grammar'),
  createQuestion('English Language', 'easy', 'The past participle of "eat" is...', ['ate', 'eaten', 'eating', 'eats'], 1, 'Eat, ate, eaten.', 2020, 'Grammar'),
  createQuestion('English Language', 'easy', 'Which sentence is correct?', ['He don\'t know.', 'He doesn\'t know.', 'He didn\'t knew.', 'He not know.'], 1, 'Third person singular requires "doesn\'t".', 2019, 'Grammar'),

  // ENGLISH LANGUAGE - Medium
  createQuestion('English Language', 'medium', 'Choose the word nearest in meaning to "ABANDON".', ['Keep', 'Leave', 'Join', 'Build'], 1, 'Abandon means to leave or forsake.', 2018, 'Synonyms'),
  createQuestion('English Language', 'medium', 'The idiom "to let the cat out of the bag" means...', ['to release a pet', 'to reveal a secret', 'to make a mistake', 'to be careless'], 1, 'It means to disclose a secret.', 2021, 'Idioms'),
  createQuestion('English Language', 'medium', 'From the alternatives, choose the one that best completes the sentence: Neither the teacher nor the students _____ present.', ['is', 'are', 'was', 'has'], 1, 'When using neither/nor, the verb agrees with the noun closest to it (students -> are).', 2017, 'Grammar'),
  createQuestion('English Language', 'medium', 'Identify the figure of speech: "The wind whispered through the trees."', ['Simile', 'Metaphor', 'Personification', 'Hyperbole'], 2, 'Giving human qualities (whispering) to inanimate objects (wind).', 2022, 'Literature'),
  createQuestion('English Language', 'medium', 'Choose the correctly punctuated sentence.', ['Its a nice day.', 'It\'s a nice day.', 'Its\' a nice day.', 'It a nice day.'], 1, 'It\'s is the contraction for It is.', 2016, 'Punctuation'),
  createQuestion('English Language', 'medium', 'The word "quickly" in the sentence "He ran quickly" is an...', ['Adjective', 'Adverb', 'Noun', 'Verb'], 1, 'It modifies the verb "ran".', 2019, 'Grammar'),
  createQuestion('English Language', 'medium', 'Choose the correct question tag: You are coming, _____?', ['aren\'t you', 'isn\'t it', 'don\'t you', 'won\'t you'], 0, 'Positive statement takes negative tag.', 2015, 'Grammar'),
  createQuestion('English Language', 'medium', 'The prefix "un-" in "unhappy" means...', ['very', 'not', 'always', 'too'], 1, 'It negates the meaning.', 2020, 'Vocabulary'),
  createQuestion('English Language', 'medium', 'Which of these is a collective noun?', ['Soldiers', 'Army', 'Man', 'Gun'], 1, 'Army represents a group of soldiers.', 2018, 'Grammar'),
  createQuestion('English Language', 'medium', 'Complete: If I _____ you, I would study harder.', ['am', 'was', 'were', 'be'], 2, 'Subjunctive mood requires "were".', 2021, 'Grammar'),

  // ENGLISH LANGUAGE - Hard
  createQuestion('English Language', 'hard', 'Choose the word opposite in meaning to "DILIGENT".', ['Hardworking', 'Lazy', 'Smart', 'Careful'], 1, 'Diligent means hardworking; lazy is the opposite.', 2017, 'Antonyms'),
  createQuestion('English Language', 'hard', 'The expression "a white elephant" refers to something that is...', ['rare and valuable', 'useless and expensive', 'large and strong', 'sacred'], 1, 'An expensive item that is useless to the owner.', 2022, 'Idioms'),
  createQuestion('English Language', 'hard', 'Identify the clause in: "The man who stole the car has been arrested."', ['Adverbial clause', 'Noun clause', 'Adjectival clause', 'Prepositional phrase'], 2, '"who stole the car" describes "The man".', 2016, 'Grammar'),
  createQuestion('English Language', 'hard', 'Change to passive voice: "The hunter killed the lion."', ['The lion is killed by the hunter.', 'The lion was killed by the hunter.', 'The lion has been killed.', 'The hunter was killed by the lion.'], 1, 'Past tense active becomes past tense passive.', 2019, 'Grammar'),
  createQuestion('English Language', 'hard', 'Choose the correct order of adjectives: She bought a _____ bag.', ['leather black new', 'new black leather', 'black new leather', 'leather new black'], 1, 'Order: Age, Color, Material.', 2015, 'Grammar'),
  createQuestion('English Language', 'hard', 'The climax of a story is...', ['the beginning', 'the turning point', 'the conclusion', 'the setting'], 1, 'The point of highest tension.', 2020, 'Literature'),
  createQuestion('English Language', 'hard', 'Which literary device is used in "He is a lion in battle"?', ['Simile', 'Metaphor', 'Irony', 'Alliteration'], 1, 'Direct comparison without using "like" or "as".', 2018, 'Literature'),
  createQuestion('English Language', 'hard', 'Choose the correct word: The committee gave _____ approval.', ['its', 'it\'s', 'their', 'theirs'], 0, 'Committee is singular here, so "its".', 2021, 'Grammar'),
  createQuestion('English Language', 'hard', 'What is the rhyme scheme of a sonnet?', ['AABB', 'ABAB', 'Depends on the type', 'ABCD'], 2, 'Shakespearean is ABAB CDCD EFEF GG.', 2017, 'Literature'),
  createQuestion('English Language', 'hard', 'The word "magnanimous" means...', ['Huge', 'Generous', 'Powerful', 'Rich'], 1, 'Generous or forgiving.', 2022, 'Vocabulary'),

  // INTEGRATED SCIENCE - Easy
  createQuestion('Integrated Science', 'easy', 'Which of the following is a living thing?', ['Stone', 'Water', 'Plant', 'Air'], 2, 'Plants show characteristics of life.', 2020, 'Biology'),
  createQuestion('Integrated Science', 'easy', 'The basic unit of life is the...', ['Cell', 'Tissue', 'Organ', 'System'], 0, 'All living things are made of cells.', 2019, 'Biology'),
  createQuestion('Integrated Science', 'easy', 'Water freezes at...', ['100°C', '0°C', '37°C', '50°C'], 1, 'Freezing point of water.', 2018, 'Physics'),
  createQuestion('Integrated Science', 'easy', 'Which planet is known as the Red Planet?', ['Venus', 'Mars', 'Jupiter', 'Saturn'], 1, 'Mars appears red due to iron oxide.', 2021, 'Astronomy'),
  createQuestion('Integrated Science', 'easy', 'The organ for pumping blood in the human body is the...', ['Lung', 'Liver', 'Heart', 'Kidney'], 2, 'The heart pumps blood.', 2017, 'Biology'),
  createQuestion('Integrated Science', 'easy', 'Which gas is needed for respiration?', ['Carbon dioxide', 'Oxygen', 'Nitrogen', 'Hydrogen'], 1, 'Living things need oxygen to release energy.', 2022, 'Biology'),
  createQuestion('Integrated Science', 'easy', 'A mixture of salt and water can be separated by...', ['Filtration', 'Evaporation', 'Decantation', 'Sieving'], 1, 'Water evaporates leaving salt behind.', 2016, 'Chemistry'),
  createQuestion('Integrated Science', 'easy', 'The sun rises in the...', ['West', 'North', 'East', 'South'], 2, 'Due to Earth\'s rotation.', 2015, 'Astronomy'),
  createQuestion('Integrated Science', 'easy', 'Which of these is a metal?', ['Sulfur', 'Carbon', 'Iron', 'Oxygen'], 2, 'Iron is a metal.', 2020, 'Chemistry'),
  createQuestion('Integrated Science', 'easy', 'The process by which plants make their own food is...', ['Respiration', 'Digestion', 'Photosynthesis', 'Excretion'], 2, 'Using sunlight, CO2 and water.', 2019, 'Biology'),

  // INTEGRATED SCIENCE - Medium
  createQuestion('Integrated Science', 'medium', 'Which of the following is a chemical change?', ['Melting ice', 'Burning wood', 'Boiling water', 'Breaking glass'], 1, 'Burning wood forms new substances (ash, smoke).', 2018, 'Chemistry'),
  createQuestion('Integrated Science', 'medium', 'The chemical symbol for Gold is...', ['Ag', 'Au', 'Fe', 'Pb'], 1, 'Au comes from Aurum.', 2021, 'Chemistry'),
  createQuestion('Integrated Science', 'medium', 'Which part of the flower produces pollen grains?', ['Stigma', 'Style', 'Anther', 'Ovary'], 2, 'The anther is part of the stamen.', 2017, 'Biology'),
  createQuestion('Integrated Science', 'medium', 'Force is measured in...', ['Joules', 'Watts', 'Newtons', 'Meters'], 2, 'Unit of force is Newton (N).', 2022, 'Physics'),
  createQuestion('Integrated Science', 'medium', 'An example of a lever of the first class is...', ['Wheelbarrow', 'Scissors', 'Nutcracker', 'Sugar tongs'], 1, 'Fulcrum is between load and effort.', 2016, 'Physics'),
  createQuestion('Integrated Science', 'medium', 'Which vitamin prevents scurvy?', ['Vitamin A', 'Vitamin B', 'Vitamin C', 'Vitamin D'], 2, 'Vitamin C deficiency causes scurvy.', 2019, 'Biology'),
  createQuestion('Integrated Science', 'medium', 'The pH of pure water is...', ['0', '7', '14', '1'], 1, '7 is neutral.', 2015, 'Chemistry'),
  createQuestion('Integrated Science', 'medium', 'Which blood cells fight infections?', ['Red blood cells', 'White blood cells', 'Platelets', 'Plasma'], 1, 'WBCs are part of the immune system.', 2020, 'Biology'),
  createQuestion('Integrated Science', 'medium', 'The transfer of heat through a solid is called...', ['Conduction', 'Convection', 'Radiation', 'Emission'], 0, 'Heat travels through solids by conduction.', 2018, 'Physics'),
  createQuestion('Integrated Science', 'medium', 'Which of these is a renewable source of energy?', ['Coal', 'Petroleum', 'Solar energy', 'Natural gas'], 2, 'Solar energy is replenished naturally.', 2021, 'Physics'),

  // INTEGRATED SCIENCE - Hard
  createQuestion('Integrated Science', 'hard', 'The atomic number of an element is equal to the number of...', ['Neutrons', 'Protons', 'Electrons + Protons', 'Neutrons + Protons'], 1, 'Atomic number = number of protons.', 2017, 'Chemistry'),
  createQuestion('Integrated Science', 'hard', 'Which law states that "Energy can neither be created nor destroyed"?', ['Newton\'s Law', 'Ohm\'s Law', 'Law of Conservation of Energy', 'Hooke\'s Law'], 2, 'First law of thermodynamics.', 2022, 'Physics'),
  createQuestion('Integrated Science', 'hard', 'The digestion of protein begins in the...', ['Mouth', 'Stomach', 'Small intestine', 'Large intestine'], 1, 'Pepsin in the stomach starts protein digestion.', 2016, 'Biology'),
  createQuestion('Integrated Science', 'hard', 'Calculate the work done when a force of 10N moves a body through 5m.', ['2 J', '15 J', '50 J', '0.5 J'], 2, 'Work = Force × Distance = 10 × 5 = 50 Joules.', 2019, 'Physics'),
  createQuestion('Integrated Science', 'hard', 'Which of the following is an alloy?', ['Copper', 'Zinc', 'Brass', 'Aluminum'], 2, 'Brass is an alloy of copper and zinc.', 2015, 'Chemistry'),
  createQuestion('Integrated Science', 'hard', 'The hormone responsible for the development of male secondary sexual characteristics is...', ['Estrogen', 'Progesterone', 'Testosterone', 'Insulin'], 2, 'Testosterone is the male sex hormone.', 2020, 'Biology'),
  createQuestion('Integrated Science', 'hard', 'In an electric circuit, the ammeter is connected in...', ['Series', 'Parallel', 'Both', 'None'], 0, 'Ammeter measures current and must be in series.', 2018, 'Physics'),
  createQuestion('Integrated Science', 'hard', 'The chemical formula for Table Salt is...', ['H2O', 'CO2', 'NaCl', 'HCl'], 2, 'Sodium Chloride.', 2021, 'Chemistry'),
  createQuestion('Integrated Science', 'hard', 'Which part of the brain controls balance and posture?', ['Cerebrum', 'Cerebellum', 'Medulla oblongata', 'Hypothalamus'], 1, 'Cerebellum coordinates movement.', 2017, 'Biology'),
  createQuestion('Integrated Science', 'hard', 'What is the valency of Carbon?', ['2', '3', '4', '5'], 2, 'Carbon is in Group 4 and has 4 valence electrons.', 2022, 'Chemistry'),

  // SOCIAL STUDIES - Easy
  createQuestion('Social Studies', 'easy', 'The capital city of Ghana is...', ['Kumasi', 'Accra', 'Tamale', 'Cape Coast'], 1, 'Accra is the capital.', 2020, 'Geography'),
  createQuestion('Social Studies', 'easy', 'Which of these is a primary product?', ['Cocoa', 'Chocolate', 'Cloth', 'Furniture'], 0, 'Cocoa is a raw material.', 2019, 'Economics'),
  createQuestion('Social Studies', 'easy', 'The head of the family is the...', ['Mother', 'Father', 'Uncle', 'Grandfather'], 1, 'Traditionally, the father heads the nuclear family.', 2018, 'Citizenship'),
  createQuestion('Social Studies', 'easy', 'Ghana became independent in...', ['1957', '1960', '1966', '1992'], 0, 'March 6, 1957.', 2021, 'History'),
  createQuestion('Social Studies', 'easy', 'The highest mountain in Ghana is...', ['Mt. Everest', 'Mt. Afadja', 'Mt. Kilimanjaro', 'Mt. Sinai'], 1, 'Mount Afadja (Afadjato).', 2017, 'Geography'),

  // SOCIAL STUDIES - Medium
  createQuestion('Social Studies', 'medium', 'Which of the following is a function of the police?', ['Making laws', 'Interpreting laws', 'Maintaining law and order', 'Judging criminals'], 2, 'Police enforce laws.', 2022, 'Government'),
  createQuestion('Social Studies', 'medium', 'The constitution of Ghana is the...', ['Supreme law', 'Ordinary law', 'Customary law', 'Decree'], 0, 'It is the highest law of the land.', 2016, 'Government'),
  createQuestion('Social Studies', 'medium', 'Adolescence is the period between...', ['Childhood and adulthood', 'Birth and childhood', 'Adulthood and old age', 'Infancy and childhood'], 0, 'Transition period.', 2019, 'Citizenship'),
  createQuestion('Social Studies', 'medium', 'Which of these is an environmental problem?', ['Afforestation', 'Pollution', 'Recycling', 'Conservation'], 1, 'Pollution harms the environment.', 2015, 'Environment'),
  createQuestion('Social Studies', 'medium', 'The main cash crop of Ghana is...', ['Maize', 'Cocoa', 'Yam', 'Cassava'], 1, 'Cocoa is the major export crop.', 2020, 'Economics'),

  // SOCIAL STUDIES - Hard
  createQuestion('Social Studies', 'hard', 'The first President of Ghana was...', ['J.B. Danquah', 'Kwame Nkrumah', 'K.A. Busia', 'J.J. Rawlings'], 1, 'Dr. Kwame Nkrumah.', 2018, 'History'),
  createQuestion('Social Studies', 'hard', 'Separation of powers prevents...', ['Democracy', 'Dictatorship', 'Development', 'Voting'], 1, 'It prevents one arm of government from becoming too powerful.', 2021, 'Government'),
  createQuestion('Social Studies', 'hard', 'Productivity is defined as...', ['Output per unit input', 'Total production', 'Cost of production', 'Profit made'], 0, 'Efficiency of production.', 2017, 'Economics'),
  createQuestion('Social Studies', 'hard', 'Which of these is a feature of a good map?', ['Title', 'Color', 'Size', 'Shape'], 0, 'A map must have a title, scale, key, etc.', 2022, 'Geography'),
  createQuestion('Social Studies', 'hard', 'Globalization has made the world a...', ['Big continent', 'Global village', 'Small country', 'Large market'], 1, 'Interconnectedness of the world.', 2016, 'Global Issues'),
];

// Helper functions to interact with the question bank

export const getQuestionsBySubject = (subject: QuestionSubject): BeceQuestion[] => {
  return beceQuestions.filter(q => q.subject === subject);
};

export const getQuestionsByDifficulty = (difficulty: QuestionDifficulty): BeceQuestion[] => {
  return beceQuestions.filter(q => q.difficulty === difficulty);
};

export const getRandomQuestions = (
  count: number, 
  subject?: QuestionSubject, 
  difficulty?: QuestionDifficulty
): BeceQuestion[] => {
  let filtered = beceQuestions;
  
  if (subject) {
    filtered = filtered.filter(q => q.subject === subject);
  }
  
  if (difficulty) {
    filtered = filtered.filter(q => q.difficulty === difficulty);
  }
  
  // Shuffle and slice
  const shuffled = [...filtered].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const getQuestionById = (id: string): BeceQuestion | undefined => {
  return beceQuestions.find(q => q.id === id);
};
