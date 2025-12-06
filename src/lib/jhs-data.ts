
import type { Subject, Topic, Lesson, Quiz } from '@/lib/types';
import {
  Book,
  Calculator,
  FlaskConical,
  Globe,
  Users,
  Palette,
  Briefcase,
  Computer,
  Languages,
  BookOpen,
} from 'lucide-react';

// This file now serves as a static fallback and a source for seeding the database.
// The main application logic should fetch data from Firestore.

export const subjects: Subject[] = [
  {
    id: '1',
    slug: 'english-language',
    name: 'English Language',
    icon: Book,
    description: 'Master grammar, comprehension, and literature.',
    curriculum: [
      {
        level: 'JHS 1',
        topics: [
          {
            id: 'eng101',
            slug: 'listening-speaking-1',
            title: 'Listening & Speaking',
            lessons: [
               {
                id: 'eng101-1',
                slug: 'listening-comprehension',
                title: 'Listening Comprehension',
                objectives: [
                  'Explain what listening comprehension is and why it is important.',
                  'Identify key points and main ideas when listening to a passage.',
                  'Improve focus and memory when listening to stories, speeches, or conversations.',
                  'Answer BECE-style listening comprehension questions correctly.',
                ],
                introduction: 'Listening comprehension means understanding what you hear. It is very important in school and life because we get most information by listening—whether to teachers, friends, or the news. In exams, you will listen to a passage or story and then answer questions. In this lesson, you will learn how to listen carefully, pick out the main points, and answer questions correctly.',
                keyConcepts: [
                  { title: 'What is Listening Comprehension?', content: 'The ability to hear and understand spoken information (stories, speeches, conversations).' },
                  { 
                    title: 'Why is Listening Comprehension Important?', 
                    content: 'Helps you follow instructions correctly.\nImproves your speaking and writing because you learn new words and sentence structures.\nHelps you answer exam questions on passages that are read aloud.' 
                  },
                  {
                    title: 'How to Listen Effectively',
                    content: '1. Pay Attention: Sit quietly and focus only on the speaker.\n2. Identify the Main Idea: Ask yourself: What is the story mostly about?\n3. Listen for Details: Who? What? Where? When? Why? How?\n4. Remember the Sequence: What happened first, next, and last?\n5. Note Key Words: Mentally or on paper (if allowed), note names, numbers, and important actions.\n6. Do Not Daydream: Stay focused; you only get to hear it once or twice.'
                  },
                   {
                    title: 'Common Question Types in Exams',
                    content: 'Main idea (summary-type) questions.\nTrue/false or yes/no questions.\nWho, what, when, where, why questions.\nVocabulary: meaning of a word as used in the passage.'
                  }
                ],
                activities: { 
                  type: 'exercises', 
                  questions: [
                      { type: 'listening_practice', question: 'Teacher or app reads a short passage aloud (5–6 sentences).\nStudents listen and write down: (a) the main idea, (b) one fact they remember.' },
                      { type: 'real_world_practice', question: 'Practice listening to short radio news and retell in 2–3 sentences.'},
                      { type: 'pair_work', question: 'In pairs: One student reads a short paragraph, the other listens and answers three quick questions.'}
                  ] 
                },
                pastQuestions: [
                  { 
                    question: 'Passage (Read Aloud): "Ama woke up late on Monday morning. She missed the school bus, so she had to walk to school. On the way, she met her friend Kojo, who helped her carry her bag. When they arrived, the teacher was already in class. Ama promised never to wake up late again."\n\nQuestions:\n1. Why did Ama walk to school?\n2. Who helped Ama carry her bag?\n3. What did Ama promise?\n4. Was the teacher in class when Ama arrived? (Yes/No)\n5. What lesson can we learn from Ama’s story?', 
                    solution: '1. Because she missed the school bus.\n2. Her friend Kojo.\n3. Never to wake up late again.\n4. Yes.\n5. We should wake up early to avoid being late.' 
                  },
                  {
                    question: 'Vocabulary Question: "In the passage, what does the word \'promised\' mean?"\n(A) Said goodbye\n(B) Made a vow\n(C) Felt sorry\n(D) Went away',
                    solution: 'Correct Answer: (B) Made a vow.'
                  }
                ],
                summary: 'Listening comprehension means understanding and remembering what you hear. To do well, focus carefully, pick the main idea, and listen for important details like names, times, and actions. Practise regularly with stories, news, and speeches so you can answer questions accurately in exams and in real life.',
              },
               {
                id: 'eng101-2',
                slug: 'alphabet-pronunciation',
                title: 'The Alphabet and Pronunciation',
                objectives: [
                  'Recognize and recite all 26 letters of the English alphabet in the correct order.',
                  'Distinguish clearly between vowels and consonants and explain their roles.',
                  'Pronounce each letter correctly using its standard name and sound.',
                  'Identify and differentiate confusing letter pairs (B/D, M/N, P/F, etc.).',
                  'Understand uppercase (capital) and lowercase (small) letter forms.',
                  'Apply phonetic knowledge to spell simple words accurately.',
                  'Recognize that every English word must contain at least one vowel.',
                  'Answer BECE-style questions on alphabet knowledge and pronunciation.'
                ],
                introduction: 'The English alphabet is the foundation of reading, writing, and spelling. It consists of 26 letters, each with its own name, shape, and sound. Mastering the alphabet is the FIRST and most important step in learning English. Without knowing your ABCs, you cannot read words, spell correctly, or communicate in writing. In this lesson, you will learn to recite the alphabet fluently, distinguish between vowels and consonants, pronounce letters clearly (especially confusing pairs like B and D), recognize both capital and small letters, and understand how letters combine to form words. This lesson follows the Ghana Education Service (GES) curriculum for JHS 1 and prepares you for the oral and written components of the WAEC BECE examination.',
                keyConcepts: [
                  { 
                    title: '1. The Complete English Alphabet', 
                    content: 'The English alphabet contains exactly 26 letters from A to Z. These letters are divided into two main categories:\n\nVOWELS (5 letters): A, E, I, O, U\n- Vowels are "open sounds" produced without blocking air in your mouth\n- Every English word MUST contain at least one vowel\n- Without vowels, words cannot be pronounced correctly\n- Examples: cat (a), pen (e), sit (i), dog (o), cup (u)\n\nCONSONANTS (21 letters): B, C, D, F, G, H, J, K, L, M, N, P, Q, R, S, T, V, W, X, Y, Z\n- Consonants are sounds made by blocking or restricting airflow\n- Y is sometimes called a "semi-vowel" because it can sound like a vowel in words like "gym" or "fly"\n- Consonants combine with vowels to form syllables and words\n\nImportant Facts:\n- The alphabet is always recited in the same order: A-B-C-D-E-F-G-H-I-J-K-L-M-N-O-P-Q-R-S-T-U-V-W-X-Y-Z\n- Each letter has TWO forms: uppercase/capital (ABC) and lowercase/small (abc)\n- Capital letters are used at the beginning of sentences, for names, places, days, months, and the pronoun "I"\n- Most writing uses small letters; capitals are for special purposes only\n\nGhanaian Context:\nIn Ghana, children often learn the alphabet through songs, rhymes, and games. The "ABC Song" helps students memorize the sequence. Schools display alphabet charts with pictures (A for Apple, B for Ball) to help visual learners. Mastering the alphabet is the foundation for reading Ghanaian languages written in English script, such as Twi, Ga, and Ewe.' 
                  },
                  { 
                    title: '2. Letter Names vs. Letter Sounds', 
                    content: 'Understanding the difference between letter NAMES and letter SOUNDS is crucial for reading and spelling success.\n\nLetter Names (used when spelling aloud):\n- A = "ay" (as in day)\n- B = "bee"\n- C = "see"\n- D = "dee"\n- E = "ee"\n- F = "eff"\n- G = "jee"\n- H = "aitch"\n- I = "eye"\n- J = "jay"\n- K = "kay"\n- L = "ell"\n- M = "em"\n- N = "en"\n- O = "oh"\n- P = "pee"\n- Q = "kyoo"\n- R = "arr"\n- S = "ess"\n- T = "tee"\n- U = "yoo"\n- V = "vee"\n- W = "double-you"\n- X = "eks"\n- Y = "why"\n- Z = "zed" (British/Ghanaian) or "zee" (American)\n\nLetter Sounds (used when reading words):\n- A = /a/ as in apple, /ay/ as in ape\n- B = /b/ as in boy\n- C = /k/ as in cat, /s/ as in city\n- D = /d/ as in dog\n- E = /e/ as in egg, /ee/ as in equal\n- F = /f/ as in fan\n- G = /g/ as in go, /j/ as in gem\n- And so on...\n\nWhy This Matters:\nWhen someone asks you to spell "cat," you say the letter NAMES: "C-A-T" (see-ay-tee). But when you READ the word "cat," you use the letter SOUNDS: /k/ /a/ /t/. Many Ghanaian students confuse these two, leading to spelling and pronunciation errors.\n\nCommon Mistake:\nStudent reads "bag" and says: "bee-ay-jee" (letter names) instead of blending the sounds: /b/ /a/ /g/ = "bag."\n\nBECE Tip: Examiners test whether you know letter names through spelling dictation and whether you know letter sounds through pronunciation exercises.' 
                  },
                  { 
                    title: '3. Confusing Letter Pairs and Pronunciation Practice', 
                    content: 'Some English letters look similar or sound similar, causing confusion for learners. Careful practice helps you distinguish them.\n\nVisually Similar Letters (easily confused when writing):\n- b and d: "bed" trick - b has the belly on the LEFT, d has the belly on the RIGHT\n- p and q: mirror images - practice writing them side by side\n- m and n: m has THREE humps, n has TWO humps\n- u and v: u is rounded at the bottom, v is pointed\n- Capital I (eye) and lowercase l (ell): I is taller and has lines at top and bottom\n\nSound-Alike Letters (easily confused when listening):\n- B (/bee/) and D (/dee/): Practice - "Boy" vs. "Day"\n- M (/em/) and N (/en/): Practice - "Man" vs. "Name"\n- P (/pee/) and B (/bee/): Practice - "Pen" vs. "Ben"\n- F (/eff/) and S (/ess/): Practice - "Fan" vs. "San"\n- T (/tee/) and D (/dee/): Practice - "Tie" vs. "Die"\n- V (/vee/) and W (/double-you/): Practice - "Vine" vs. "Wine"\n\nPronunciation Drill for Ghanaian Learners:\nMany Ghanaian students struggle with these specific sounds because some local languages do not distinguish them clearly:\n\n1. V vs. F: "van" vs. "fan" - V vibrates your lips, F just blows air\n2. P vs. B: "pat" vs. "bat" - P has no voice, B uses your vocal cords\n3. TH sound: "think" (/th/ as in three) vs. "that" (/th/ as in the) - put your tongue between your teeth\n4. R vs. L: "right" vs. "light" - R curls the tongue back, L touches the roof of your mouth\n\nClassroom Practice Tips:\n- Use a mirror to watch your mouth shape\n- Place your hand on your throat to feel vibrations for voiced sounds (B, D, G, V, Z)\n- Partner with a classmate and take turns reading confusing pairs aloud\n- Record yourself and play it back to check pronunciation\n\nBECE Oral English Component:\nThe BECE includes an oral test where you must pronounce words correctly. Examiners specifically test confusing letters like V/F, P/B, and TH sounds. Practice daily with past questions!' 
                  },
                  { 
                    title: '4. Vowels: The Heart of Every Word', 
                    content: 'Vowels are the most important letters in English because NO WORD can exist without at least one vowel. Understanding vowels is essential for spelling, pronunciation, and syllable division.\n\nThe Five Vowels: A, E, I, O, U\n\nShort Vowel Sounds:\n- A = /a/ as in apple, cat, bag, map, fan\n- E = /e/ as in egg, pen, red, net, bed\n- I = /i/ as in sit, pin, big, fish, him\n- O = /o/ as in dog, hot, pot, shop, top\n- U = /u/ as in cup, sun, run, bus, fun\n\nLong Vowel Sounds (vowels "say their own names"):\n- A = /ay/ as in ape, cake, name, game, plate\n- E = /ee/ as in equal, he, me, tree, bee\n- I = /eye/ as in ice, kite, bike, time, five\n- O = /oh/ as in open, go, no, home, hope\n- U = /yoo/ as in use, cute, huge, tube, mule\n\nVowel Rules Every Student Must Know:\n\n1. EVERY WORD MUST HAVE A VOWEL\n   - Words like "cat," "strength," "rhythm" all contain vowels\n   - Even abbreviations follow this rule: "Mr." (Mister) has "i" and "e"\n\n2. Y CAN ACT AS A VOWEL\n   - When Y is the only vowel sound: gym, fly, cry, sky, my, by, shy\n   - When Y appears with other vowels, it acts as a consonant: yes, yellow, young\n\n3. VOWEL COMBINATIONS (DIGRAPHS)\n   - AI/AY: rain, play, day, wait, say\n   - EA/EE: read, tree, see, meat, feet\n   - OA/OW: boat, low, coat, snow, show\n   - OU/OW: out, cow, house, how, now\n\n4. SILENT E RULE\n   - Adding E at the end makes the vowel say its name: cap â†’ cape, kit â†’ kite, hop â†’ hope, tub â†’ tube\n\nWhy Vowels Matter for Spelling:\nMany Ghanaian students make spelling errors because they cannot hear vowel sounds clearly. Practice:\n- Clapping syllables: "ba-na-na" (3 syllables = 3 vowel sounds)\n- Listening for short vs. long vowels: "tap" vs. "tape"\n- Identifying how many vowels appear in a word: "beautiful" has 5 vowels (e-a-u-i-u)\n\nBECE Spelling Dictation:\nExaminers test your ability to spell words correctly by listening for vowel sounds. Common dictation words: receive, believe, piece, weight, eighth, beautiful, separate. Each requires careful attention to vowel combinations.' 
                  },
                  { 
                    title: '5. Letter Combinations and Digraphs', 
                    content: 'Some sounds in English require TWO letters working together. These combinations are called DIGRAPHS or BLENDS.\n\nConsonant Digraphs (two consonants = one new sound):\n- CH = /ch/ as in chair, church, chalk, chicken, teacher\n- SH = /sh/ as in shop, fish, wash, shoe, brush\n- TH = /th/ as in think, three, math, cloth (voiceless)\n- TH = /th/ as in this, that, mother, father (voiced)\n- PH = /f/ as in phone, photo, elephant, alphabet\n- GH = /f/ as in laugh, cough, rough, enough (sometimes silent: night, light)\n- WH = /w/ as in what, when, where, why, white\n- CK = /k/ as in back, clock, black, stick, trick\n- NG = /ng/ as in sing, ring, long, strong, bring\n\nConsonant Blends (two consonants keep their sounds but blend together):\n- BL: black, blue, blow, blanket\n- BR: brown, bread, bring, brother\n- CL: class, clean, clock, clothes\n- CR: cry, crown, crab, create\n- DR: dress, drink, drum, drive\n- FL: flag, fly, flower, floor\n- FR: friend, fruit, free, frog\n- GL: glass, glad, glove, glue\n- GR: grass, green, grow, great\n- PL: play, plant, place, please\n- PR: pray, pretty, prince, proud\n- SC: school, scale, scar, score\n- SK: sky, skin, skip, skirt\n- SL: sleep, slow, slide, slip\n- SM: small, smart, smell, smile\n- SN: snake, snow, snack, snap\n- SP: speak, spell, sport, spend\n- ST: star, stop, stand, start\n- SW: sweet, swim, swing, switch\n- TR: tree, train, true, try\n- TW: twelve, twenty, twin, twist\n\nVowel Digraphs (two vowels = one sound):\n- AI: rain, train, wait, tail, pain\n- AY: day, play, say, way, may\n- EA: read, teach, peace, meat, clean (usually long E sound)\n- EE: see, tree, three, green, sleep\n- IE: field, piece, believe, chief (usually long E sound)\n- OA: boat, coat, road, soap, load\n- OO: book, good, foot, cook (short sound); moon, soon, food, school (long sound)\n- OU: house, out, cloud, mouth, shout\n- OW: cow, now, how, brown (as in "out"); snow, slow, know, show (as in "oh")\n- UE: blue, true, glue, continue\n\nTriple Letter Combinations:\n- TION = /shun/: nation, station, education, question\n- SION = /zhun/: vision, television, decision\n- TURE = /chur/: picture, nature, future, culture\n- OUGH: tough /uff/, through /oo/, though /oh/, thought /awt/, cough /off/ (very irregular!)\n\nWhy This Matters:\nEnglish spelling is complex because 26 letters must represent over 40 sounds. Letter combinations fill the gaps. Understanding digraphs helps you:\n- Spell difficult words correctly\n- Pronounce unfamiliar words by recognizing patterns\n- Improve reading speed and fluency\n\nCommon Ghanaian Student Errors:\n- Writing "skool" instead of "school" (missing CH blend)\n- Pronouncing "three" as "tree" (missing TH sound)\n- Spelling "nite" instead of "night" (missing GH)\n\nBECE Exam Focus:\nDigraphs appear frequently in spelling tests, comprehension passages, and oral English sections. Master these combinations through daily reading and writing practice.' 
                  },
                  { 
                    title: '6. Silent Letters and Tricky Spellings', 
                    content: 'Silent letters are letters that appear in words but are NOT pronounced. They make English spelling difficult but follow certain patterns you can learn.\n\nCommon Silent Letters:\n\nSilent B:\n- After M: lamb, bomb, climb, thumb, comb, crumb\n- Before T: doubt, debt, subtle\n\nSilent C:\n- Before K or Q: science, scissors, scene, muscle\n\nSilent D:\n- In some words: Wednesday, handsome, handkerchief\n\nSilent E:\n- At the end of words: make, time, hope, cute, like, name (makes the vowel long)\n- In the middle: careful, hopeless, strangely\n\nSilent G:\n- Before N: sign, design, campaign, foreign, gnaw, gnat\n\nSilent GH:\n- At the end: night, light, fight, right, high, though, dough, sigh\n- Sometimes sounds like F: laugh, cough, rough, tough, enough\n\nSilent H:\n- At the beginning: hour, honest, honor, heir\n- After certain letters: ghost, rhyme, rhythm, school, chemistry\n\nSilent K:\n- Before N: knife, knee, knock, know, knight, knot, knit, knowledge\n\nSilent L:\n- After A, O, U: walk, talk, chalk, folk, yolk, could, should, would, calm, palm, half, calf\n\nSilent N:\n- After M: autumn, column, condemn, hymn, solemn\n\nSilent P:\n- Before S or N: psychology, psalm, pneumonia, receipt\n\nSilent S:\n- In some words: island, aisle, debris\n\nSilent T:\n- In some words: listen, castle, whistle, Christmas, often (for some speakers)\n\nSilent U:\n- After G: guard, guess, guest, guide, guitar, tongue, dialogue\n\nSilent W:\n- Before R: write, wrong, wrap, wreck, wrist, wrinkle, answer, sword, two\n\nMemory Tricks for Silent Letters:\n\n1. "K before N, we don\'t say nothin\'": knife, knee, know\n2. "GH at night makes no sound but light": night, right, sight, fight\n3. "Walk and talk with silent L": walk, talk, chalk\n4. "W before R, don\'t say the W for sure": write, wrong, wrap\n\nWhy Silent Letters Exist:\n- Historical reasons: Old English or French origins\n- To show word families: sign/signature (G is silent/pronounced)\n- To distinguish homophones: know (knowledge) vs. no (negative)\n\nCommon Spelling Mistakes by Ghanaian Students:\n- Writing "nife" instead of "knife"\n- Writing "rong" instead of "wrong"\n- Writing "rite" instead of "write"\n- Pronouncing the K in "knife" or W in "write"\n\nBECE Dictation Words with Silent Letters:\nlisten, castle, whistle, wreck, knife, knock, comb, climb, doubt, receipt, island, answer, honest, hour, Wednesday\n\nPractice Strategy:\nCreate a "Silent Letter Wall Chart" in your notebook. Group words by their silent letter pattern. Review 5 words daily until they become automatic.' 
                  },
                  { 
                    title: '7. Alphabetical Order and Dictionary Skills', 
                    content: 'Alphabetical order means arranging words according to the sequence of letters in the alphabet (A-Z). This skill is essential for using dictionaries, indexes, contact lists, and library catalogs.\n\nBasic Alphabetical Order Rules:\n\n1. FIRST LETTER RULE:\n   Arrange words by comparing their first letters.\n   Example: ant, boy, cat, dog, egg\n   (A comes before B, B before C, etc.)\n\n2. SECOND LETTER RULE:\n   If first letters are the same, compare second letters.\n   Example: apple, art, ask, aunt\n   (P comes before R, R before S, S before U)\n\n3. THIRD LETTER RULE:\n   If first and second letters are the same, compare third letters.\n   Example: cat, chair, church, class\n   (T before H before U before L)\n\n4. CONTINUE AS NEEDED:\n   Keep comparing letters until you find the difference.\n   Example: hope, hopeful, hopeless\n   (All start with "hope," but next letters are: f, l, [end])\n\nUsing a Dictionary:\n\n1. GUIDE WORDS:\n   - At the top of each dictionary page, two words appear: the FIRST word and LAST word on that page\n   - Check if your word falls alphabetically between these guide words\n   - Example: If guide words are "cake" and "call," you\'ll find "calculate" on that page\n\n2. FINDING WORDS QUICKLY:\n   - A-D words: Near the front of the dictionary\n   - E-P words: Middle section\n   - Q-Z words: Back section\n\n3. READING DICTIONARY ENTRIES:\n   - Headword (the word itself in bold)\n   - Pronunciation guide (sounds in special symbols)\n   - Part of speech (noun, verb, adjective, etc.)\n   - Definition (meaning)\n   - Example sentence\n   - Origin (where the word came from)\n\nReal-World Uses of Alphabetical Order:\n\n1. SCHOOL:\n   - Class registers list students alphabetically by surname\n   - Library books arranged by author\'s last name\n   - Textbook indexes and glossaries\n   - Exam attendance sheets\n\n2. DAILY LIFE:\n   - Phone contacts arranged A-Z\n   - WhatsApp contact list\n   - Supermarket aisles\n   - Hospital patient files\n   - Electoral roll/voters register\n   - Bank customer records\n\n3. PROFESSIONAL:\n   - Filing systems in offices\n   - Employee directories\n   - Business card organizers\n   - Legal case files\n\nCommon Student Mistakes:\n\n1. Arranging by the SECOND letter first instead of comparing first letters completely:\n   Wrong: ant, dog, art (thinking "n" comes before "r")\n   Correct: ant, art, dog (A section comes before D section)\n\n2. Forgetting to ignore small words like "the," "a," "an" when alphabetizing titles:\n   Wrong: "The Cat," "A Dog," "An Egg"\n   Correct: "Cat, The," "Dog, A," "Egg, An" (alphabetize by the main word)\n\n3. Not understanding surnames vs. first names:\n   Ghanaian naming conventions: Kofi Mensah = First name: Kofi, Surname: Mensah\n   Alphabetize by MENSAH, Kofi (surname first)\n\nBECE Practice Questions:\n\n1. Arrange in alphabetical order: mango, banana, orange, apple, grape\n   Answer: apple, banana, grape, mango, orange\n\n2. Arrange: Monday, Friday, Tuesday, Sunday, Wednesday\n   Answer: Friday, Monday, Sunday, Tuesday, Wednesday\n\n3. Arrange: school, scholar, schedule, scheme, scholarship\n   Answer: schedule, scheme, scholar, scholarship, school\n   (Compare 4th letter: d-e-o-o-o, then 5th letter: u-m-l-l-o)\n\nPractice Activities:\n- Organize your exercise books alphabetically by subject\n- Create an alphabetical contact list of 20 classmates\n- Use the dictionary to find 10 new words daily\n- Practice with past BECE questions on alphabetical order' 
                  },
                  { 
                    title: '8. Spelling Rules and Patterns', 
                    content: 'English spelling follows certain patterns and rules that help you spell thousands of words correctly once you understand the system.\n\nEssential Spelling Rules:\n\n1. I BEFORE E RULE:\n   "I before E, except after C, or when sounding like A as in neighbor and weigh"\n   - IE words: believe, piece, field, thief, brief, chief\n   - EI after C: receive, deceive, ceiling, receipt, conceive\n   - EI sounding like A: eight, weight, vein, reign, neighbor\n   - EXCEPTIONS: weird, either, neither, foreign, height, seize\n\n2. DOUBLING THE FINAL CONSONANT:\n   When adding -ING, -ED, -ER, or -EST to a one-syllable word ending in a single consonant after a single vowel, DOUBLE the consonant:\n   - run â†’ running, runner\n   - big â†’ bigger, biggest\n   - stop â†’ stopped, stopping\n   - hot â†’ hotter, hottest\n   - But NOT: help â†’ helping (two consonants), read â†’ reading (two vowels)\n\n3. DROP THE SILENT E:\n   When adding a suffix that begins with a vowel (-ING, -ED, -ER, -EST, -ABLE, -OUS), drop the silent E:\n   - make â†’ making\n   - hope â†’ hoping, hoped, hopeful\n   - love â†’ loving, lovable\n   - fame â†’ famous\n   - But KEEP the E when the suffix starts with a consonant: hope â†’ hopeless, care â†’ careful\n\n4. CHANGING Y TO I:\n   When a word ends in consonant + Y, change Y to I before adding any suffix except -ING:\n   - happy â†’ happier, happiest, happiness (but happying doesn\'t exist)\n   - carry â†’ carried, carrier (but carrying)\n   - try â†’ tried, tries (but trying)\n   - But NOT when Y follows a vowel: play â†’ played, player, playing\n\n5. PLURALS:\n   - Most nouns: add -S (cat â†’ cats, book â†’ books)\n   - Nouns ending in S, X, Z, CH, SH: add -ES (box â†’ boxes, church â†’ churches, dish â†’ dishes)\n   - Nouns ending in consonant + Y: change Y to I and add -ES (baby â†’ babies, city â†’ cities)\n   - Nouns ending in vowel + Y: just add -S (boy â†’ boys, day â†’ days)\n   - Nouns ending in F or FE: change to -VES (knife â†’ knives, life â†’ lives, leaf â†’ leaves)\n   - Nouns ending in consonant + O: usually add -ES (hero â†’ heroes, potato â†’ potatoes, tomato â†’ tomatoes)\n   - Irregular plurals: man â†’ men, woman â†’ women, child â†’ children, foot â†’ feet, tooth â†’ teeth, mouse â†’ mice\n\n6. ADDING PREFIXES:\n   Prefixes do NOT change the spelling of the root word:\n   - un + happy = unhappy (not "unhapyy")\n   - dis + agree = disagree\n   - mis + spell = misspell (double S!)\n   - im + possible = impossible (double P!)\n\n7. QU COMBINATION:\n   Q is ALWAYS followed by U in English:\n   - question, quiet, quick, queen, quite, quiz, require, mosquito, earthquake\n   - Exception: A few borrowed words like "qi" (Chinese word)\n\n8. CAPITALIZATION RULES:\n   Always capitalize:\n   - First word of every sentence\n   - Pronoun "I"\n   - Proper nouns (names of specific people, places, things): Kwame, Ghana, Accra, Volta River, December, Monday\n   - Titles before names: Mr. Mensah, Dr. Ama, President Nkrumah\n   - First word of a direct quotation\n   - Important words in titles of books, movies, songs\n\nCommon Spelling Demons (words Ghanaian students often misspell):\n- SEPARATE (not "seperate") - think "there\'s A RAT in separate"\n- DEFINITELY (not "definately") - ends with -ITELY\n- BECAUSE (not "becos" or "becuz") - BIG ELEPHANTS CAN ALWAYS UNDERSTAND SMALL ELEPHANTS\n- RECEIVE (not "recieve") - follows I before E rule (EI after C)\n- BELIEVE (not "beleive") - follows I before E rule (IE)\n- ACCOMMODATION (double C, double M)\n- EMBARRASS (double R, double S)\n- NECESSARY (one C, double S) - one Collar, two Sleeves\n- OCCURRENCE (double C, double R)\n- RHYTHM (no vowels in the last 5 letters!)\n\nMemory Strategies:\n\n1. MNEMONICS:\n   - ARITHMETIC: A Rat In The House May Eat The Ice Cream\n   - GEOGRAPHY: George\'s Elderly Old Grandfather Rode A Pig Home Yesterday\n\n2. WORD FAMILIES:\n   Learn related words together:\n   - sign, signal, signature, signify, design, resign\n   - cycle, bicycle, recycle, cyclone, tricycle\n\n3. SYLLABLE BREAKING:\n   Break long words into smaller parts:\n   - in-de-pen-dence\n   - ed-u-ca-tion\n   - com-mu-ni-ca-tion\n\n4. LOOK, SAY, COVER, WRITE, CHECK:\n   - LOOK at the word carefully\n   - SAY it aloud\n   - COVER it\n   - WRITE it from memory\n   - CHECK if you spelled it correctly\n\nBECE Spelling Preparation:\n\n1. Practice with past BECE dictation lists\n2. Keep a personal spelling journal of your difficult words\n3. Learn 5 new words daily with correct spellings\n4. Read widely to see words in context\n5. Play spelling games like Scrabble or Spelling Bee competitions\n\nCultural Note:\nGhanaian students must master both British and some American spelling variations for WAEC exams, as the British system is standard but American spellings appear in modern texts:\n- British: colour, centre, organise, realise\n- American: color, center, organize, realize\n\nWAEC follows BRITISH SPELLING, so always use:\n- colour (not color)\n- favour (not favor)\n- centre (not center)\n- organise (not organize)\n\nConclusion:\nSpelling improves through daily practice, wide reading, and conscious attention to patterns. Don\'t just memorize words - understand the RULES behind them. This makes learning easier and helps you spell NEW words you\'ve never seen before!' 
                  }
                ],
                activities: { 
                  type: 'exercises', 
                  questions: [
                    { 
                      type: 'alphabet_mastery', 
                      question: '**EXERCISE 1: Alphabet Mastery Challenge**\n\n**Part A - Recitation:**\n1. Recite the alphabet forward (A-Z) clearly and fluently\n2. Try reciting it backward (Z-A) for an extra challenge\n3. Time yourself - can you complete A-Z in under 10 seconds?\n4. Sing the "ABC Song" with your classmates\n\n**Part B - Letter Recognition Speed Test:**\nAsk a partner to point to random letters on an alphabet chart. How quickly can you name each letter?\n\n**Part C - Capital and Small Letters Matching:**\nMatch these capital letters with their lowercase forms:\nA B C D E F G H I J K L M N O P Q R S T U V W X Y Z\na b c d e f g h i j k l m n o p q r s t u v w x y z\n\n**Purpose:** Build automatic letter recognition and fluency - essential for fast reading and writing.' 
                    },
                    { 
                      type: 'vowel_consonant_classification', 
                      question: '**EXERCISE 2: Vowel and Consonant Detective**\n\n**Part A - Basic Classification:**\n1. Write the complete alphabet in your notebook\n2. Circle the 5 vowels in RED pen\n3. Underline the 21 consonants in BLUE pen\n4. Put a star (*) next to Y (the "sometimes vowel")\n\n**Part B - Vowel Counting:**\nCount how many vowels appear in each word:\n1. education - ___ vowels\n2. beautiful - ___ vowels\n3. computer - ___ vowels\n4. Ghana - ___ vowels\n5. pronunciation - ___ vowels\n\n**Part C - Word Creation:**\nCreate 5 words that contain:\n- Exactly 1 vowel (example: cat)\n- Exactly 2 vowels (example: open)\n- Exactly 3 vowels (example: banana)\n- All 5 vowels (example: education)\n\n**Answers Part B:** 1. education (5: e-u-a-i-o), 2. beautiful (5: e-a-u-i-u), 3. computer (3: o-u-e), 4. Ghana (2: a-a), 5. pronunciation (6: o-u-i-a-i-o)' 
                    },
                    { 
                      type: 'confusing_pairs_practice', 
                      question: '**EXERCISE 3: Confusing Letters - Pronunciation Clinic**\n\n**Part A - Sound-Alike Pairs:**\nWork with a partner. One person says a letter, the other writes it down.\n\nPractice these difficult pairs:\n1. B or D? (bee/dee)\n2. M or N? (em/en)\n3. P or B? (pee/bee)\n4. F or S? (eff/ess)\n5. V or W? (vee/double-you)\n\n**Part B - Word Pair Pronunciation:**\nRead each pair aloud, emphasizing the difference:\n1. Boy - Day\n2. Man - Name\n3. Pen - Ben\n4. Fan - Van\n5. Pat - Bat\n6. Think - Sink\n7. Right - Light\n8. Vine - Wine\n\n**Part C - Minimal Pair Dictation:**\nHave your teacher or partner read one word from each pair. Write which word you heard:\n1. bet / debt\n2. pin / bin\n3. fine / vine\n4. time / dime\n5. map / nap\n\n**Part D - Ghanaian Context Practice:**\nPractice these Ghanaian place names and common words:\n1. Volta (not "Folta")\n2. Koforidua (pronounce each vowel clearly)\n3. Prampram (clear P sound)\n4. Takoradi (clear T and D sounds)\n\n**Purpose:** Eliminate pronunciation errors that lower your BECE oral English marks.' 
                    },
                    { 
                      type: 'spelling_aloud_practice', 
                      question: '**EXERCISE 4: Spelling Aloud Championship**\n\n**Part A - Basic Spelling:**\nSpell these words aloud using letter NAMES (not sounds):\n1. bag â†’ "bee-ay-jee"\n2. pen â†’ "pee-ee-en"\n3. cup â†’ "see-you-pee"\n4. sun\n5. book\n6. fish\n7. tree\n8. school\n9. Ghana\n10. teacher\n\n**Part B - Spelling Bee Competition:**\nOrganize a class spelling bee with these BECE-level words:\n1. alphabet\n2. pronunciation\n3. vowel\n4. consonant\n5. dictionary\n6. syllable\n7. separate\n8. believe\n9. receive\n10. definitely\n\n**Part C - Silent Letter Challenge:**\nSpell these tricky words with silent letters:\n1. knife (k-n-i-f-e) - silent K\n2. write (w-r-i-t-e) - silent W\n3. lamb (l-a-m-b) - silent B\n4. island (i-s-l-a-n-d) - silent S\n5. honest (h-o-n-e-s-t) - silent H\n\n**Part D - Real-World Application:**\nPractice spelling your:\n1. Full name\n2. School name\n3. Home address\n4. District/region\n5. Parent\'s name\n\nWhy? You may need to spell these on phone calls, forms, or during emergencies.' 
                    },
                    { 
                      type: 'letter_combinations', 
                      question: '**EXERCISE 5: Letter Combinations and Digraphs Workshop**\n\n**Part A - Consonant Digraph Hunt:**\nFind and circle the digraphs in these words:\n1. school (ch)\n2. fish (sh)\n3. three (th)\n4. phone (ph)\n5. church (ch)\n6. night (gh)\n7. bring (ng)\n8. block (ck)\n\n**Part B - Vowel Digraph Practice:**\nIdentify the vowel digraph and its sound:\n1. rain (ai = long a)\n2. boat (oa = long o)\n3. tree (ee = long e)\n4. house (ou = ow sound)\n5. blue (ue = long u)\n\n**Part C - Blend Building:**\nHow many words can you create with these blends?\n\nBL: _____, _____, _____ (black, blue, blow, blanket, etc.)\nCR: _____, _____, _____ (cry, crown, crab, create, etc.)\nST: _____, _____, _____ (star, stop, stand, start, etc.)\n\n**Part D - TION/SION Word Collection:**\nList 10 words ending in -TION or -SION:\n1. education\n2. nation\n3. _____\n4. _____\n5. _____\n(Continue...)\n\n**Purpose:** Recognize patterns that unlock spelling and pronunciation of thousands of English words.' 
                    },
                    { 
                      type: 'alphabetical_order_mastery', 
                      question: '**EXERCISE 6: Alphabetical Order - From Simple to Complex**\n\n**Part A - First Letter Order:**\nArrange alphabetically:\nSet 1: dog, ant, cat, egg, boy\nSet 2: mango, banana, orange, apple, grape\nSet 3: Monday, Friday, Tuesday, Sunday, Wednesday\n\n**Part B - Second Letter Order:**\nArrange alphabetically (first letters are the same):\nSet 1: apple, art, ask, aunt, ant\nSet 2: ball, bat, bag, ban, bay\nSet 3: car, cat, cap, can, cab\n\n**Part C - Third Letter Order:**\nArrange alphabetically:\nSet 1: school, scholar, schedule, scheme, scholarship\nSet 2: bread, break, breath, breast, breed\n\n**Part D - Real-World Application:**\n1. Alphabetize your classmates\' names (by surname)\n2. Organize 10 subject names alphabetically\n3. Create an alphabetical list of 15 Ghanaian towns or cities\n\n**Part E - Dictionary Skills:**\nUse a dictionary to find these words. Write the guide words from the page where you found each word:\n1. alphabet - Guide words: _____ to _____\n2. pronunciation - Guide words: _____ to _____\n3. Ghana - Guide words: _____ to _____\n\n**Answers Part A:**\nSet 1: ant, boy, cat, dog, egg\nSet 2: apple, banana, grape, mango, orange\nSet 3: Friday, Monday, Sunday, Tuesday, Wednesday' 
                    },
                    { 
                      type: 'silent_letters_detective', 
                      question: '**EXERCISE 7: Silent Letters Detective Mission**\n\n**Part A - Identify the Silent Letter:**\nUnderline the silent letter in each word:\n1. knife (k)\n2. write (w)\n3. lamb (b)\n4. island (s)\n5. honest (h)\n6. knock (k)\n7. walk (l)\n8. Wednesday (d)\n9. answer (w)\n10. listen (t)\n\n**Part B - Silent Letter Categories:**\nGroup these words by their silent letters:\n\nWords: knife, write, lamb, comb, knock, wrap, climb, wrist, thumb, know\n\nSilent K: _____, _____, _____\nSilent W: _____, _____, _____\nSilent B: _____, _____, _____\n\n**Part C - Spelling Challenge:**\nYour teacher will dictate these words with silent letters. Write them correctly:\n1. knight\n2. sign\n3. castle\n4. whistle\n5. doubt\n6. autumn\n7. receipt\n8. Christmas\n9. sword\n10. foreign\n\n**Part D - Create Your Own:**\nWrite 5 sentences using words with silent letters. Underline the words with silent letters.\n\nExample: "I used a knife to cut the lamb."\n\n**Purpose:** Master tricky spellings that frequently appear in BECE dictation tests.' 
                    },
                    { 
                      type: 'spelling_rules_application', 
                      question: '**EXERCISE 8: Spelling Rules in Action**\n\n**Part A - I Before E Rule:**\nComplete these words:\n1. bel__ve (believe)\n2. rec__ve (receive)\n3. p__ce (piece)\n4. c__ling (ceiling)\n5. w__ght (weight)\n\n**Part B - Doubling Consonants:**\nAdd -ING to these words:\n1. run â†’ _____\n2. stop â†’ _____\n3. shop â†’ _____\n4. swim â†’ _____\n5. help â†’ _____ (no doubling - why?)\n\n**Part C - Drop the Silent E:**\nAdd -ING to these words:\n1. make â†’ _____\n2. hope â†’ _____\n3. love â†’ _____\n4. write â†’ _____\n5. care â†’ _____ (but: care + ful = _____)\n\n**Part D - Change Y to I:**\nMake these words plural:\n1. baby â†’ _____\n2. city â†’ _____\n3. country â†’ _____\n4. boy â†’ _____ (no change - why?)\n\n**Part E - Tricky Plurals:**\nWrite the plural form:\n1. knife â†’ _____\n2. leaf â†’ _____\n3. child â†’ _____\n4. woman â†’ _____\n5. potato â†’ _____\n\n**Answers:**\nPart B: running, stopping, shopping, swimming, helping (two consonants - no double)\nPart C: making, hoping, loving, writing, caring (but: careful - consonant suffix)\nPart D: babies, cities, countries, boys (vowel + y = just add s)\nPart E: knives, leaves, children, women, potatoes\n\n**Purpose:** Apply rules automatically in your writing, reducing spelling errors by 80%!' 
                    }
                  ] 
                },
                pastQuestions: [
                  { 
                    question: 'BECE 2018 (Adapted): How many vowels are in the English alphabet?\na) 3\nb) 5\nc) 7\nd) 21', 
                    solution: 'Answer: (b) 5\n\nExplanation: The five vowels are A, E, I, O, U. These are the only true vowels in the English alphabet. Y can sometimes function as a vowel (as in "gym" or "fly"), but it is not counted among the official five vowels. The 21 remaining letters are consonants. This is fundamental alphabet knowledge tested frequently in BECE Paper 1 (Objective Test) and oral examinations.' 
                  },
                  { 
                    question: 'BECE 2019 (Style): Which of the following words contains only ONE vowel?\na) Book\nb) Sun\nc) Tree\nd) Read', 
                    solution: 'Answer: (b) Sun\n\nExplanation: Let\'s examine each word:\n- Book: Contains two vowels (o, o) - the letter O appears twice\n- Sun: Contains only one vowel (u) âœ“ CORRECT\n- Tree: Contains two vowels (e, e) - the letter E appears twice\n- Read: Contains two vowels (e, a)\n\nRemember: Every English word MUST have at least one vowel to be pronounceable. Count carefully - repeated vowels still count as multiple vowels.' 
                  },
                  { 
                    question: 'BECE 2020 (Oral Test Style): Spell the word "school" aloud using letter names.', 
                    solution: 'Answer: S-C-H-O-O-L (ess - see - aitch - oh - oh - ell)\n\nExplanation: When spelling aloud, you must say the NAME of each letter, not its sound. Breaking it down:\n- S = "ess" (not /s/ sound)\n- C = "see" (not /k/ sound)\n- H = "aitch" (not /h/ sound)\n- O = "oh" (not /o/ sound) - say it TWICE\n- L = "ell" (not /l/ sound)\n\nCommon mistake: Students often pronounce the sounds (/s/ /k/ /oo/ /l/) instead of spelling with letter names. In BECE oral examinations, examiners specifically test your ability to distinguish letter names from letter sounds.' 
                  },
                  { 
                    question: 'BECE 2017 (Adapted): Arrange the following words in alphabetical order:\nmango, banana, orange, apple, grape\n\na) mango, banana, orange, apple, grape\nb) apple, banana, grape, mango, orange\nc) banana, apple, grape, mango, orange\nd) grape, orange, mango, banana, apple', 
                    solution: 'Answer: (b) apple, banana, grape, mango, orange\n\nExplanation: To arrange words alphabetically, compare the FIRST letter of each word:\n- Apple starts with A (1st in alphabet)\n- Banana starts with B (2nd in alphabet)\n- Grape starts with G (7th in alphabet)\n- Mango starts with M (13th in alphabet)\n- Orange starts with O (15th in alphabet)\n\nAlphabetical order follows the sequence A-B-C-D-E-F-G... When first letters differ, that determines the order. If first letters were the same, you would compare second letters, then third letters, and so on.' 
                  },
                  { 
                    question: 'BECE 2021 (Style): Which pair of words demonstrates the "silent E" spelling rule?\na) cat and cut\nb) hope and hop\nc) sit and set\nd) big and bag', 
                    solution: 'Answer: (b) hope and hop\n\nExplanation: The "silent E rule" states that adding a silent E at the end of certain words changes the vowel sound from SHORT to LONG:\n\n- hop (short O sound: /hop/) â†’ hope (long O sound: /hohp/)\n\nThe silent E makes the O "say its name." Let\'s examine the other options:\n- cat and cut: Different vowels (a vs u), not demonstrating silent E rule\n- sit and set: Different vowels (i vs e), not demonstrating silent E rule\n- big and bag: Different vowels (i vs a), not demonstrating silent E rule\n\nOther examples of silent E rule: cap/cape, kit/kite, mat/mate, tub/tube, pin/pine.' 
                  },
                  { 
                    question: 'BECE 2022 (Inspired): The word "knife" contains a silent letter. Which letter is NOT pronounced?\na) k\nb) n\nc) i\nd) f', 
                    solution: 'Answer: (a) k\n\nExplanation: In the word "knife," the letter K is silent. The word is pronounced /nife/ (like "nife"), not /k-nife/. \n\nSilent K Rule: When K appears before N at the beginning of a word, the K is always silent.\n\nOther examples:\n- knife, knee, knock, know, knight, knit, knot, knowledge, knuckle\n\nAll these words start with KN, and in every case, the K is silent and only the N sound is heard. This is one of the most common silent letter patterns in English spelling. BECE frequently tests silent letters in dictation exercises and multiple-choice questions.' 
                  },
                  { 
                    question: 'BECE 2019 (Comprehension Style): Read the sentence and answer the question:\n\n"Every English word must contain at least one vowel to be pronounceable."\n\nBased on this statement, which of the following is TRUE?\n\na) Consonants are more important than vowels\nb) Some English words have no vowels\nc) Words without vowels cannot be spoken properly\nd) Vowels and consonants are equally important', 
                    solution: 'Answer: (c) Words without vowels cannot be spoken properly\n\nExplanation: The sentence directly states that words "must contain at least one vowel to be pronounceable." "Pronounceable" means "able to be spoken." Therefore, words without vowels CANNOT be pronounced (spoken) properly.\n\nLet\'s evaluate each option:\n\n(a) Consonants are more important than vowels: FALSE - The passage emphasizes vowels as ESSENTIAL, suggesting they are at least equally important, if not more crucial for pronunciation.\n\n(b) Some English words have no vowels: FALSE - The passage states "EVERY English word MUST contain at least one vowel," meaning there are NO exceptions.\n\n(c) Words without vowels cannot be spoken properly: TRUE âœ“ - This directly restates the passage\'s meaning using different words (paraphrasing).\n\n(d) Vowels and consonants are equally important: Not supported - While both are important, the passage specifically highlights vowels as a REQUIREMENT, making them essential in a way the passage doesn\'t claim for consonants.\n\nThis is an inferential comprehension question that tests your ability to understand and restate information from a text passage.' 
                  },
                  { 
                    question: 'BECE 2020 (Vocabulary in Context): In the sentence "The students must recite the alphabet fluently," the word "recite" most nearly means:\n\na) write down carefully\nb) say aloud from memory\nc) sing a song\nd) forget completely', 
                    solution: 'Answer: (b) say aloud from memory\n\nExplanation: "Recite" means to repeat something aloud that you have learned or memorized, especially in a formal or public manner. When students "recite the alphabet," they speak the letters (A, B, C, D...) out loud in the correct order from memory.\n\nLet\'s examine why the other options are incorrect:\n\n(a) write down carefully: This describes "transcribe" or "copy," not "recite." Recitation is ORAL (spoken), not written.\n\n(b) say aloud from memory: CORRECT âœ“ - This captures both key elements: speaking (say aloud) and memorization (from memory).\n\n(c) sing a song: While the alphabet can be sung, "recite" specifically means speaking, not singing. Singing is one METHOD of reciting, but reciting doesn\'t always involve singing.\n\n(d) forget completely: This is the opposite of reciting, which requires remembering.\n\nContext clues: The word "fluently" (smoothly, without hesitation) supports the meaning of speaking from memory. You can\'t recite fluently if you\'re reading or if you\'ve forgotten.\n\nBECE often tests vocabulary by asking you to choose synonyms or explain words in context. Always look for clues in the surrounding sentence.' 
                  }
                ],
                endOfLessonQuiz: [
                  { id: 'alphabet-q1', type: 'mcq', question: 'How many letters are in the English alphabet?', options: ['24', '25', '26', '27'], answer: '26', explanation: 'The English alphabet has exactly 26 letters from A to Z.' },
                  { id: 'alphabet-q2', type: 'mcq', question: 'Which are vowels?', options: ['A, B, C, D, E', 'A, E, I, O, U', 'B, C, D, F, G', 'V, W, X, Y, Z'], answer: 'A, E, I, O, U', explanation: 'The five vowels are A, E, I, O, U. All others are consonants.' },
                  { id: 'alphabet-q3', type: 'mcq', question: 'How many consonants in the alphabet?', options: ['5', '15', '21', '26'], answer: '21', explanation: '26 total - 5 vowels = 21 consonants.' },
                  { id: 'alphabet-q4', type: 'mcq', question: 'Which word has only ONE vowel?', options: ['book', 'cat', 'tree', 'eat'], answer: 'cat', explanation: 'Cat has only "a". Others have 2 vowels.' },
                  { id: 'alphabet-q5', type: 'mcq', question: 'Why are vowels important?', options: ['They are first', 'Every word needs one', 'Always capitals', 'Longest letters'], answer: 'Every word needs one', explanation: 'Every English word must contain at least one vowel.' },
                  { id: 'alphabet-q6', type: 'mcq', question: 'Which pair sounds most similar?', options: ['A and E', 'B and D', 'F and L', 'K and S'], answer: 'B and D', explanation: 'B (bee) and D (dee) sound very similar.' },
                  { id: 'alphabet-q7', type: 'mcq', question: 'Arrange: dog, ant, cat', options: ['dog, ant, cat', 'ant, cat, dog', 'cat, dog, ant', 'ant, dog, cat'], answer: 'ant, cat, dog', explanation: 'Alphabetical order: A, C, D.' },
                  { id: 'alphabet-q8', type: 'mcq', question: 'Which uses capitals correctly?', options: ['my name is ama.', 'My name is ama.', 'My name is Ama.', 'my Name is Ama.'], answer: 'My name is Ama.', explanation: 'Capitals at start and for names.' },
                  { id: 'alphabet-q9', type: 'mcq', question: 'What comes after M?', options: ['L', 'N', 'O', 'K'], answer: 'N', explanation: 'K-L-M-N-O-P sequence.' },
                  { id: 'alphabet-q10', type: 'mcq', question: 'How many vowels in "education"?', options: ['3', '4', '5', '6'], answer: '5', explanation: 'Contains all 5 vowels: e-u-a-i-o.' },
                  { id: 'alphabet-q11', type: 'truefalse', statement: 'Every English word must have at least one vowel.', answer: 'true', reason: 'TRUE. This is fundamental - words need vowels to be pronounceable.' },
                  { id: 'alphabet-q12', type: 'truefalse', statement: 'Y is officially one of the five vowels.', answer: 'false', reason: 'FALSE. The five official vowels are A, E, I, O, U.' },
                  { id: 'alphabet-q13', type: 'fillblank', sentence: 'The five vowels are A, E, I, O, and _____.', answer: 'U', explanation: 'A, E, I, O, U - remember all five!' },
                  { id: 'alphabet-q14', type: 'multiple_select', question: 'Which are consonants?', options: ['B', 'A', 'D', 'E', 'M', 'O'], correctAnswers: ['B', 'D', 'M'], explanation: 'Consonants: B, D, M. Vowels: A, E, O.' },
                  { id: 'alphabet-q15', type: 'multiple_select', question: 'Which have TWO vowels?', options: ['sun', 'book', 'eat', 'pen', 'tree'], correctAnswers: ['book', 'eat', 'tree'], explanation: 'book (o,o), eat (e,a), tree (e,e) have 2 vowels.' },
                  { id: 'alphabet-q16', type: 'matching', question: 'Match letter types:', pairs: [{ left: 'Vowels', right: 'A, E, I, O, U' }, { left: 'Consonants', right: 'B, C, D, F, G' }, { left: 'Capitals', right: 'For names/starts' }, { left: 'Small letters', right: 'For most words' }], explanation: 'Understanding categories helps with reading and writing.' },
                  { id: 'alphabet-q17', type: 'shortanswer', question: 'Write the alphabet from A to Z.', answer: 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z', explanation: 'Practice until you can write it from memory!' }
                ],
                summary: 'Lesson Summary: The Alphabet and Pronunciation\n\nThe English alphabet is the absolute foundation of reading, writing, spelling, and effective communication. Mastering the alphabet is not simply memorizing 26 letters - it involves understanding the structure, sounds, patterns, and rules that govern how English works. This comprehensive lesson has equipped you with essential skills for academic success and WAEC BECE excellence.\n\nKey Points Recap:\n\n1. The Complete Alphabet Structure:\n   - 26 total letters (A-Z)\n   - 5 vowels: A, E, I, O, U (sometimes Y)\n   - 21 consonants: all other letters\n   - Two forms: uppercase/capitals (ABC) and lowercase/small (abc)\n   - Every English word MUST contain at least one vowel - this is non-negotiable\n\n2. Letter Names vs. Letter Sounds:\n   - Letter NAMES are used when spelling aloud: "cat" = C (see) - A (ay) - T (tee)\n   - Letter SOUNDS are used when reading words: "cat" = /k/ /a/ /t/\n   - Confusing these two causes major spelling and pronunciation errors\n   - BECE tests both through dictation (names) and oral reading (sounds)\n\n3. Confusing Letter Pairs:\n   Visual confusion: b/d, p/q, m/n, u/v\n   Sound confusion: B/D, M/N, P/B, F/V, T/D, F/S\n   Ghanaian-specific challenges: V/F, R/L, TH sounds, P/B\n   Solution: Daily pronunciation drills, mirror practice, peer feedback\n\n4. Vowels - The Heart of Every Word:\n   - Short vowel sounds: cat, pet, sit, dog, cup\n   - Long vowel sounds (say their names): cake, Pete, kite, rope, cute\n   - Vowel combinations (digraphs): rain, boat, tree, house, blue\n   - Silent E rule: Changes vowel from short to long (hop â†’ hope)\n   - Every syllable needs a vowel sound\n\n5. Letter Combinations and Patterns:\n   - Consonant digraphs: CH (chair), SH (shop), TH (think), PH (phone), GH (laugh), WH (what)\n   - Consonant blends: BL (black), CR (cry), ST (star), TR (tree), etc.\n   - Vowel digraphs: AI (rain), OA (boat), EE (tree), IE (field), OO (book/moon)\n   - Complex combinations: TION (/shun/), TURE (/chur/), SION (/zhun/)\n\n6. Silent Letters - The Spelling Traps:\n   - Silent K before N: knife, knock, know, knee\n   - Silent W before R: write, wrong, wrap, wrist\n   - Silent B after M: lamb, climb, bomb, thumb\n   - Silent L after A/O: walk, talk, folk, could, should\n   - Silent GH: night, light, right, fight,igh\n   - Silent H at start: hour, honest, honor, heir\n   - Memorization strategies: word families, mnemonics, visual associations\n\n7. Alphabetical Order and Dictionary Skills:\n   - First letter rule: Compare first letters (ant, boy, cat)\n   - Second letter rule: If first same, compare second (apple, art, ask)\n   - Third letter rule: Continue until you find difference\n   - Guide words: Top of dictionary page shows first/last words\n   - Real-world uses: registers, phone books, libraries, filing systems, indexes\n\n8. Spelling Rules and Patterns:\n   - I before E rule: "I before E except after C, or when sounding like A"\n   - Doubling consonants: run â†’ running, big â†’ bigger\n   - Drop silent E: make â†’ making, hope â†’ hoping\n   - Change Y to I: baby â†’ babies, happy â†’ happier (except before -ING)\n   - Plural rules: most add -S, but special patterns for -ES, -IES, -VES\n   - Q always followed by U: queen, question, quiz, require\n   - Capitalization: sentences, names, places, days, months, pronoun "I", titles\n\nCommon Mistakes to Avoid:\n\n1. Saying letter sounds instead of names when spelling aloud\n2. Pronouncing silent letters (saying the K in "knife" or W in "write")\n3. Confusing b/d, p/q when writing quickly\n4. Forgetting that every word needs at least one vowel\n5. Mixing up V and F sounds (common for Ghanaian learners)\n6. Ignoring spelling rules and relying only on memory\n7. Not using dictionaries to check unfamiliar words\n8. Writing in all lowercase letters (forgetting capitals for names, sentence starts)\n\nBECE Examination Preparation:\n\nThis lesson directly prepares you for multiple BECE components:\n\n**Paper 1 (Objective Test):**\n- Questions on vowel/consonant identification\n- Alphabetical order arrangements\n- Silent letter recognition\n- Spelling rules application\n- Vocabulary and word formation\n\n**Paper 2 (Essay/Comprehension):**\n- Correct spelling in compositions\n- Proper capitalization and punctuation\n- Using dictionary skills for unfamiliar words\n\n**Paper 3 (Oral English):**\n- Clear pronunciation of confusing letter pairs\n- Distinguishing V/F, P/B, TH sounds\n- Spelling words aloud using correct letter names\n- Reading passages with proper pronunciation\n\n**Dictation Component:**\n- Recognizing vowel sounds in spoken words\n- Remembering silent letter patterns\n- Applying spelling rules automatically\n\nStudy Strategies for Mastery:\n\n1. **Daily Practice Routine:**\n   - Recite alphabet forward and backward\n   - Practice 5 confusing letter pairs\n   - Learn 3 new words with silent letters\n   - Spell 10 challenging words aloud\n\n2. **Visual Learning:**\n   - Create colorful alphabet charts\n   - Make word family posters (knife, knock, know)\n   - Use flashcards for vowel combinations\n   - Draw pictures to remember spelling patterns\n\n3. **Auditory Learning:**\n   - Sing the ABC song daily\n   - Listen to correct pronunciations online\n   - Record yourself and compare with models\n   - Practice with audio dictation exercises\n\n4. **Kinesthetic Learning:**\n   - Write alphabet in sand, air, or large paper\n   - Use finger tracing for confusing letters\n   - Play Scrabble or word-building games\n   - Act out pronunciation with body movements\n\n5. **Group Activities:**\n   - Spelling bee competitions with classmates\n   - Partner pronunciation drills\n   - Alphabetizing races\n   - Word pattern treasure hunts\n\nReal-World Applications:\n\n**Academic Success:**\n- Reading textbooks fluently across all subjects\n- Spelling technical terms in Science and Social Studies\n- Taking accurate notes during lessons\n- Understanding exam instructions correctly\n\n**Daily Communication:**\n- Spelling names and addresses on forms\n- Writing clear text messages and WhatsApp chats\n- Reading road signs, notices, and announcements\n- Following written instructions for tasks\n\n**Professional Future:**\n- Job applications and CVs\n- Business correspondence and emails\n- Professional presentations and reports\n- Customer service and communication\n\n**Digital Literacy:**\n- Typing correctly on phones and computers\n- Searching online with proper spellings\n- Understanding autocorrect suggestions\n- Creating professional social media posts\n\nCultural Context:\n\nIn Ghana, English literacy opens doors to:\n- Educational advancement (WASSCE, university, professional courses)\n- Economic opportunities (employment, entrepreneurship, trade)\n- Civic participation (voting, understanding laws and policies)\n- Cultural exchange (communicating with diverse ethnic groups)\n- Global connection (international business, travel, technology)\n\nThe alphabet is your passport to all these opportunities. Ghanaian success stories - from doctors to engineers, from teachers to entrepreneurs - all began with mastering the ABCs.\n\nMotivational Reminder:\n\nEvery expert was once a beginner. The greatest Ghanaian writers, educators, lawyers, and leaders all started exactly where you are now - learning the alphabet. The difference between those who succeed and those who struggle is simple: CONSISTENT PRACTICE.\n\nDon\'t aim for perfection overnight. Aim for progress:\n- Today: Master 5 letters perfectly\n- This week: Conquer one spelling rule\n- This month: Spell 50 difficult words automatically\n- This term: Read fluently and spell confidently\n\nFinal Advice:\n\nThe alphabet is not just 26 letters to memorize - it is a SYSTEM of patterns, rules, and logic. Once you understand the system, you can:\n- Spell words you\'ve never seen before\n- Pronounce unfamiliar words correctly\n- Recognize word families and connections\n- Learn new vocabulary faster\n- Read with confidence and comprehension\n\nCommit to 15 minutes of alphabet practice daily. In three months, you will be amazed at your transformation. In six months, you will be helping classmates. By BECE time, you will tackle English questions with confidence and precision.\n\nRemember:\n- Practice makes permanent (so practice correctly!)\n- Mistakes are proof you are trying (learn from them)\n- Slow and steady wins the race (master fundamentals first)\n- Ask for help when confused (teachers, parents, classmates)\n- Believe in yourself (you CAN master this!)\n\nYou now have 8 comprehensive key concepts, 8 detailed practice exercises, 8 BECE-style past questions with full explanations, and 17 varied quiz questions. These resources, combined with your determination and daily effort, guarantee alphabet mastery and BECE success.\n\nThe foundation is set. The tools are in your hands. The rest is up to your commitment and consistency.\n\nGo forth and conquer the English alphabet - your journey to literacy excellence begins NOW!',
              },
              {
                id: 'eng101-3',
                slug: 'greetings-introductions',
                title: 'Greetings and Introductions',
                objectives: [
                  'Identify and use appropriate greetings for different times of the day.',
                  'Introduce oneself clearly and politely.',
                  'Ask and respond to questions about names and ages.',
                  'Practice polite conversational skills through role-play.',
                ],
                introduction: 'When we meet people, the first words we say are greetings. Greetings show respect and friendliness. In this lesson, you will learn how to greet, introduce yourself, and ask about someone’s name and age in simple, correct English.',
                keyConcepts: [
                  { title: 'Greetings (Formal and Informal)', content: 'Formal greetings are used with teachers, elders, or in exams. Examples: Good morning, Good afternoon, Good evening.\nInformal greetings are used with friends. Examples: Hi! Hello! What’s up?' },
                  { title: 'Introductions', content: 'You can introduce yourself by saying: My name is Ama or I am Kofi.\nTo ask for someone’s name, say: What is your name?' },
                  { title: 'Asking and Telling Age', content: 'Asking: How old are you?\nAnswering: I am 12 years old.' },
                  { title: 'Grammar Note', content: 'Always begin names with a capital letter (Ama, Kojo, Ghana).\nUse am with “I” and is with “he/she.”' },
                ],
                activities: { 
                    type: 'exercises', 
                    questions: [
                        { type: 'fill_in_blanks', question: 'Fill in the blanks: 1. Good ______, Madam. 2. I am ______. 3. How ______ are you? 4. My name ______ Kojo.' },
                        { type: 'match_columns', question: 'Match the columns:\nGood morning → (a) Before noon\nGood evening → (b) After 6:00 p.m.\nGood night → (c) Before going to bed'},
                        { type: 'oral_practice', question: 'Pair up with a friend. One person greets and asks for a name; the other responds.'}
                    ] 
                },
                pastQuestions: [
                  { question: 'When you meet your teacher in the morning, the correct greeting is:\na) Hi!\nb) Good morning.\nc) What’s up?', solution: '(b) Good morning. → Formal greetings must be used with teachers and elders.' },
                  { question: 'Rewrite correctly: my name is yaw.', solution: 'My name is Yaw. → Always begin sentences and names with capital letters.' },
                  { question: 'Write a short dialogue (4 lines) where you introduce yourself and ask your friend’s name.', solution: 'A: Good afternoon.\nB: Good afternoon.\nA: My name is Ama. What is your name?\nB: My name is Kofi.'}
                ],
                summary: 'Greetings and introductions are the first steps in polite conversation. We use formal greetings with teachers and elders, and informal greetings with friends. Remember to use capital letters for names and practice introducing yourself confidently.',
              },
            ],
          },
          {
            id: 'eng102',
            slug: 'reading-1',
            title: 'Reading',
            lessons: [
              {
                id: 'eng102-1',
                slug: 'reading-comprehension-basics',
                title: 'Reading Comprehension Basics',
                objectives: [
                  'Understand what reading comprehension means.',
                  'Learn strategies to read and understand passages.',
                  'Identify main ideas, supporting details, and conclusions in a text.',
                  'Answer questions based on short passages.'
                ],
                introduction: 'Reading comprehension is the ability to read, understand, and explain what you have read. It is an important skill because it helps you perform well in exams and in real life. In this lesson, you will learn how to read passages carefully and answer questions correctly.',
                keyConcepts: [
                    { title: 'Definition of Reading Comprehension', content: 'Reading comprehension is the process of understanding the meaning of a written text.' },
                    { title: 'Steps to Good Comprehension', content: '1. Read the passage carefully – do not rush.\n2. Identify the main idea – what is the passage mostly about?\n3. Look for supporting details – facts, examples, or reasons that explain the main idea.\n4. Understand new words from context – use the sentences around the word to guess its meaning.\n5. Answer comprehension questions – based only on what is written in the passage.' },
                    { title: 'Types of Comprehension Questions', content: 'Literal questions: Ask about facts directly stated in the passage.\nInferential questions: Require you to think beyond the passage and make conclusions.\nVocabulary questions: Ask about the meaning of words in context.\nCritical/ evaluative questions: Ask for your opinion or judgment based on the passage.'}
                ],
                activities: { 
                  type: 'exercises', 
                  questions: [
                    { type: 'read_and_answer', question: 'Passage: Ama woke up early in the morning to help her mother at the market. She carried a basket full of oranges. After selling everything, her mother gave her a gift of a new school bag.\nQuestions:\n1. Where did Ama go with her mother?\n2. What did she carry?\n3. What was her reward?' },
                    { type: 'vocabulary_in_context', question: 'From the passage above, what does the word “reward” mean?\n(a) punishment\n(b) gift\n(c) market\nAnswer: (b) gift.'}
                  ] 
                },
                pastQuestions: [
                  { question: 'Read this passage and answer:\nPassage: Kwame enjoys reading storybooks. Every Saturday, he visits the library to borrow new ones. He wants to become a writer in the future.\nQ: What does Kwame want to become in the future?', solution: 'A writer.' },
                  { question: 'What type of comprehension question is “What does Kwame want to become in the future?”', solution: 'A literal question (answer is directly stated).'}
                ],
                summary: 'Reading comprehension means understanding what you read. To succeed, read carefully, identify main ideas, understand supporting details, and answer questions based on the passage. Different types of questions test different skills, but all can be mastered with practice.',
              },
              {
                id: 'eng102-2',
                slug: 'silent-oral-reading-skills',
                title: 'Silent and Oral Reading Skills',
                objectives: [
                  'Explain the meaning of silent reading and oral reading.',
                  'Identify the differences between silent and oral reading.',
                  'Practice when to use each type of reading.',
                  'Develop confidence in reading both silently and aloud.',
                ],
                introduction: 'Reading can be done in two main ways: silently (without speaking) and orally (speaking the words aloud). Both are important for Junior High School students because they improve understanding, confidence, and communication skills. In this lesson, you will learn the differences between silent and oral reading and how to apply them in schoolwork and daily life.',
                keyConcepts: [
                    { title: 'Silent Reading', content: 'Reading without speaking the words aloud. Used to understand quickly and privately. Helps in answering comprehension questions, studying notes, and reading for pleasure.' },
                    { title: 'Oral Reading', content: 'Reading aloud so others can hear. Improves pronunciation, fluency, and confidence. Often used in class reading, storytelling, speeches, and presentations.' },
                    { title: 'Differences Between Silent and Oral Reading', content: '1. Silent reading is for personal understanding, while oral reading is for sharing with others.\n2. Silent reading is usually faster, oral reading is slower.\n3. Silent reading helps you focus; oral reading helps with communication.' }
                ],
                activities: { 
                  type: 'exercises', 
                  questions: [
                    { type: 'silent_reading_practice', question: 'Read a short passage silently in 1 minute. Then write down the main idea in one sentence.' },
                    { type: 'oral_reading_practice', question: 'Read the same passage aloud to a friend or in class. Pay attention to pronunciation, pauses, and expression.' },
                    { type: 'compare', question: 'Which was faster for you: silent reading or oral reading? Why?' }
                  ] 
                },
                pastQuestions: [
                  { question: 'What is the main difference between silent and oral reading?', solution: 'Silent reading is done without speaking aloud, while oral reading is done aloud so others can hear.' },
                  { question: 'State two benefits of oral reading.', solution: 'It improves pronunciation and builds confidence in speaking.' },
                ],
                summary: 'Silent and oral reading are both important skills. Silent reading helps with fast understanding, while oral reading improves fluency and confidence. Knowing when to use each skill will make you a better student and communicator.',
              },
               {
                id: 'eng102-3',
                slug: 'summary-writing-note-taking',
                title: 'Summary Writing & Note-Taking (JHS Basics)',
                objectives: [
                    'Define summary writing and note-taking in simple terms.',
                    'Find the main idea and key details in a short passage.',
                    'Write a 2–3 sentence summary in your own words.',
                    'Produce clear bullet-point notes from a short text.',
                ],
                introduction: 'We read many passages in school. To remember the most important points, we write summaries and notes. A summary is a short version of a passage. Notes are short points you will study later. This lesson shows you simple steps to do both.',
                keyConcepts: [
                    { title: 'What is a Summary?', content: 'A short version of a passage that keeps only the main idea and the most important points, in your own words.' },
                    { title: 'Steps for Summary Writing', content: '1. Read the passage carefully.\n2. Find the main idea.\n3. Pick key points that support the main idea.\n4. Remove examples, stories, and repeated ideas.\n5. Write 2–3 clear sentences in your own words.' },
                    { title: 'What is Note-Taking?', content: 'Writing short points to help you revise quickly. Notes can be bullets, a mind map, or a table.'},
                    { title: 'Tips', content: 'Use simple words.\nDo not copy long sentences.\nCheck grammar and spelling.'}
                ],
                activities: { 
                    type: 'exercises',
                    questions: [
                        { type: 'practice', question: 'Read a 5–6 sentence paragraph from your English text. Underline the main idea.' },
                        { type: 'practice', question: 'Write three bullet-point notes from it.' },
                        { type: 'practice', question: 'Turn those notes into a two-sentence summary.'}
                    ]
                },
                pastQuestions: [
                    { 
                      question: 'Passage:\nOn Saturday, students from Kofis Junior High School cleaned the market square. They swept the ground, cleared rubbish from the gutters, and planted flowers around the entrance. The assemblyman provided gloves and bins, while a local shop owner gave the team bottles of water. After the clean-up, the headteacher thanked the students and encouraged the community to keep the place tidy. The group plans to repeat the exercise next month.\n\nWrite a summary of the passage in not more than three (3) sentences.', 
                      solution: 'Step 1: Main idea → Students cleaned the market to keep the environment tidy.\nStep 2: Key points → They swept and cleared gutters; got support (gloves, bins, water); headteacher praised them; plan to repeat next month.\nStep 3: Remove extras → Detailed items like “flowers” and exact donors are examples; keep the idea of support instead.\nStep 4: Draft in own words → Combine main idea + key actions + support + future plan.\nFinal Summary (2–3 sentences):\nStudents from Kofis JHS cleaned the market by sweeping and clearing the gutters to keep the area tidy. They received support from community leaders and businesses and were praised by the headteacher. The group plans to repeat the exercise next month.' 
                    },
                    { 
                      question: 'Passage:\nGood note-taking saves time and helps students remember lessons. When you write short points, you focus on the main ideas and avoid copying long sentences. Notes are useful for revision before tests because they are quick to read. Using bullets, tables, or simple diagrams can make your notes clearer.\n\nTasks:\na) Write four bullet-point notes from the passage.\nb) List two advantages of note-taking from the passage.\nc) Which note format (bullets, table, diagram) would you choose for revision, and why? (One sentence)', 
                      solution: 'a) Notes:\n- Saves time; quick to read.\n- Helps remember lessons.\n- Short points focus on main ideas.\n- Use bullets/tables/diagrams to make notes clear.\nb) Advantages:\n- Saves time during revision.\n- Helps students remember lessons better.\nc) I choose bullets because they are quick to scan and easy to revise before tests.' 
                    }
                ],
                summary: 'A summary keeps only the main idea and key points in 2–3 clear sentences. Notes are short points that help you revise quickly and remember better. Use simple words, avoid copying, and organise your ideas with bullets, tables, or a mind map.',
              },
            ],
          },
          {
            id: 'eng103',
            slug: 'writing-1',
            title: 'Writing',
            lessons: [
                 {
                id: 'eng103-1',
                slug: 'sentence-construction',
                title: 'Sentence Construction & Paragraphs',
                objectives: ['Construct grammatically correct sentences.', 'Develop well-structured paragraphs.'],
                introduction: 'Good writing starts with well-constructed sentences and organized paragraphs.',
                keyConcepts: [
                    { title: 'Sentence Structure', content: 'The arrangement of words, phrases, and clauses in a sentence.' },
                    { title: 'Paragraph Development', content: 'Creating a paragraph with a topic sentence, supporting details, and a concluding sentence.' }
                ],
                activities: { type: 'quiz', questions: [] },
                pastQuestions: [],
                summary: 'We learned the fundamentals of building sentences and developing coherent paragraphs.',
              },
            ]
          },
          {
            id: 'eng104',
            slug: 'grammar-usage-1',
            title: 'Grammar & Usage',
            lessons: [
               {
                id: 'eng104-1',
                slug: 'parts-of-speech',
                title: 'Parts of Speech',
                objectives: [
                  'Identify nouns, pronouns, verbs, adjectives, adverbs, conjunctions, prepositions, interjections.',
                  'Use different parts of speech correctly in sentences.',
                ],
                introduction: 'Understanding the parts of speech is the foundation of English grammar. Each word in a sentence has a specific job to do.',
                keyConcepts: [
                  { title: 'Nouns & Pronouns', content: 'Naming words for people, places, things, or ideas, and words that replace them.' },
                  { title: 'Verbs & Adverbs', content: 'Action/state of being words, and words that describe them.' },
                  { title: 'Adjectives', content: 'Words that describe nouns.' },
                  { title: 'Prepositions, Conjunctions, Interjections', content: 'Words that show relationships, join parts of a sentence, and express strong emotion.' },
                ],
                activities: { type: 'quiz', questions: [] },
                pastQuestions: [
                  { question: 'Identify the proper noun in the sentence: "The boy went to Kumasi."', solution: 'Kumasi is the proper noun because it is the specific name of a city.' },
                ],
                summary: 'We learned to identify and use the eight parts of speech which are the building blocks of English sentences.',
              },
              {
                id: 'eng104-2',
                slug: 'nouns',
                title: 'Nouns',
                objectives: [
                  'Define what nouns are and explain their functions in sentences.',
                  'Identify and classify the five main types of nouns (proper, common, concrete, abstract, collective).',
                  'Understand gender of nouns (masculine, feminine, neuter, common) and form correct gender pairs.',
                  'Form regular and irregular plurals correctly, and distinguish between countable and uncountable nouns.',
                  'Recognize and use compound nouns in writing and speaking.',
                  'Understand the case of nouns (subjective, objective, possessive) and use apostrophes correctly.',
                  'Identify noun phrases and the functions of nouns in sentences (subject, object, complement).',
                  'Apply knowledge of nouns to answer BECE-style examination questions accurately.',
                ],
                introduction: 'A noun is the name of a person, place, animal, thing, or idea. Nouns are the foundation of every sentence—without them, we cannot communicate effectively. In the BECE English Language examination, questions on nouns frequently test your understanding of types, gender, number (singular/plural), and functions. This comprehensive lesson will equip you with all the knowledge you need to master nouns and excel in your exams and everyday communication.',
                keyConcepts: [
                  { 
                    title: 'Definition of a Noun', 
                    content: 'A noun is a naming word. It names people, animals, places, things, and ideas.\n\nExamples:\n• Person: teacher, Kofi, girl, doctor\n• Animal: dog, cat, elephant\n• Place: Accra, school, market, Ghana\n• Thing: book, pen, car, table\n• Idea: love, freedom, happiness, courage' 
                  },
                  { 
                    title: '1. Types of Nouns', 
                    content: 'There are five main types of nouns that you must know for BECE:\n\n1. PROPER NOUNS\n→ Names of specific people, places, days, months, or organizations.\n→ Always begin with a CAPITAL LETTER.\n→ Examples: Kwame Nkrumah, Accra, Monday, December, United Nations, Achimota School\n\n2. COMMON NOUNS\n→ General names for people, places, animals, or things.\n→ Not capitalized unless at the beginning of a sentence.\n→ Examples: boy, city, dog, table, school, market\n\n3. CONCRETE NOUNS\n→ Things we can see, touch, smell, hear, or taste.\n→ They have physical form.\n→ Examples: mango, chair, water, music, perfume\n\n4. ABSTRACT NOUNS\n→ Ideas, qualities, emotions, or states that we cannot see or touch.\n→ Examples: honesty, love, freedom, anger, childhood, beauty, knowledge\n\n5. COLLECTIVE NOUNS\n→ Names for groups of people, animals, or things.\n→ Examples:\n  • People: team, class, family, committee, crowd, audience\n  • Animals: herd (cattle), flock (birds/sheep), swarm (bees), pride (lions)\n  • Things: bunch (keys/bananas), stack (books), fleet (ships/cars)' 
                  },
                  { 
                    title: '2. Gender of Nouns', 
                    content: 'Nouns can be classified by gender into four categories:\n\n1. MASCULINE GENDER → Male persons or animals\nExamples: man, boy, father, king, bull, cock, lion, actor, prince\n\n2. FEMININE GENDER → Female persons or animals\nExamples: woman, girl, mother, queen, cow, hen, lioness, actress, princess\n\n3. NEUTER GENDER → Things without gender (objects, ideas, places)\nExamples: book, table, pen, school, love, happiness, Accra\n\n4. COMMON GENDER → Can be used for both male and female\nExamples: teacher, student, doctor, child, parent, friend, cousin\n\nGENDER PAIRS (BECE frequently tests these):\n• boy → girl\n• man → woman\n• father → mother\n• uncle → aunt\n• nephew → niece\n• king → queen\n• prince → princess\n• actor → actress\n• hero → heroine\n• bachelor → spinster\n• husband → wife\n• son → daughter\n• brother → sister\n• monk → nun\n• wizard → witch\n• host → hostess\n• waiter → waitress\n• sir → madam' 
                  },
                  { 
                    title: '3. Number: Singular and Plural Nouns', 
                    content: 'Number tells us whether we are talking about one thing (singular) or more than one (plural).\n\nREGULAR PLURALS:\nMost nouns form plurals by adding -s or -es:\n• book → books\n• pen → pens\n• box → boxes (add -es after s, x, z, ch, sh)\n• church → churches\n• dish → dishes\n• bus → buses\n\nNouns ending in consonant + y → change y to ies:\n• baby → babies\n• city → cities\n• lady → ladies\n\nNouns ending in vowel + y → just add s:\n• boy → boys\n• day → days\n• key → keys\n\nNouns ending in f or fe → change to ves:\n• knife → knives\n• life → lives\n• leaf → leaves\n• shelf → shelves\nExceptions: roof → roofs, chief → chiefs, cliff → cliffs\n\nNouns ending in consonant + o → add es:\n• tomato → tomatoes\n• potato → potatoes\n• hero → heroes\nExceptions: photo → photos, piano → pianos\n\nIRREGULAR PLURALS (memorize these!):\n• man → men\n• woman → women\n• child → children\n• tooth → teeth\n• foot → feet\n• mouse → mice\n• ox → oxen\n• person → people\n• goose → geese\n\nSAME FORM FOR SINGULAR AND PLURAL:\n• sheep → sheep\n• deer → deer\n• fish → fish\n• series → series\n• species → species\n\nCOUNTABLE vs UNCOUNTABLE NOUNS:\nCountable: Can be counted (one book, two books, three books)\nExamples: pen, student, mango, chair\n\nUncountable: Cannot be counted, no plural form\nExamples: water, sugar, rice, milk, air, information, advice, furniture, luggage\nNote: We use "some," "much," "little" with uncountable nouns.' 
                  },
                  { 
                    title: '4. Compound Nouns', 
                    content: 'A compound noun is formed when two or more words are combined to create a new noun with a specific meaning.\n\nTYPES OF COMPOUND NOUNS:\n\n1. WRITTEN AS ONE WORD:\n• classroom, blackboard, notebook, toothbrush, bedroom, football, sunlight, grandmother\n\n2. WRITTEN AS SEPARATE WORDS:\n• bus stop, post office, police officer, ice cream, swimming pool, high school\n\n3. WRITTEN WITH HYPHENS:\n• mother-in-law, passer-by, six-year-old, well-being, check-in\n\nFORMING PLURALS OF COMPOUND NOUNS:\n• Usually add -s to the main noun:\n  - mother-in-law → mothers-in-law\n  - passer-by → passers-by\n  - toothbrush → toothbrushes\n  - bus stop → bus stops' 
                  },
                  { 
                    title: '5. Case of Nouns', 
                    content: "Case shows the function of a noun in a sentence. There are three cases:\n\n1. SUBJECTIVE CASE (Nominative)\n→ The noun is the subject doing the action.\n→ Example: Ama reads a book. (Ama is the subject)\n\n2. OBJECTIVE CASE\n→ The noun is the object receiving the action.\n→ Example: Kofi kicked the ball. (ball is the object)\n\n3. POSSESSIVE CASE (Genitive)\n→ Shows ownership or relationship.\n→ Formed by adding apostrophe (') and s.\n\nRULES FOR FORMING POSSESSIVE:\n\nSingular noun → add 's:\n• the girl's book\n• Ama's pen\n• the teacher's desk\n• James's bag (or James' bag)\n\nPlural noun ending in s → add only ':\n• the girls' books (more than one girl)\n• the teachers' room\n• the students' uniforms\n\nPlural noun not ending in s → add 's:\n• the children's toys\n• the men's room\n• the people's choice\n\nJoint possession (one thing owned by two people) → add 's to the last noun:\n• Kofi and Ama's house (they share one house)\n\nSeparate possession → add 's to both nouns:\n• Kofi's and Ama's books (each has different books)" 
                  },
                  { 
                    title: '6. Noun Phrases', 
                    content: 'A noun phrase is a group of words that functions as a noun in a sentence. It consists of a noun (the head) plus other words that describe or modify it.\n\nStructure: Determiner + Adjective(s) + NOUN + Prepositional Phrase\n\nExamples:\n• the big brown dog in the yard\n  - "dog" is the main noun (head)\n  - "the" is a determiner\n  - "big" and "brown" are adjectives\n  - "in the yard" is a prepositional phrase\n\n• my younger sister\n• a very tall building\n• the girl with the red dress\n• three ripe mangoes from the farm' 
                  },
                  { 
                    title: '7. Functions of Nouns in Sentences', 
                    content: 'Nouns perform different roles (functions) in sentences:\n\n1. SUBJECT → The doer of the action\nExample: Kofi plays football.\n(Kofi is the subject)\n\n2. DIRECT OBJECT → Receives the action of the verb\nExample: Ama reads a book.\n(book is the direct object)\n\n3. INDIRECT OBJECT → The person/thing for whom the action is done\nExample: The teacher gave the students homework.\n(students is the indirect object)\n\n4. SUBJECT COMPLEMENT → Renames or describes the subject after a linking verb (is, am, are, was, were, become)\nExample: My father is a doctor.\n(doctor renames father)\n\n5. OBJECT COMPLEMENT → Describes the direct object\nExample: They elected him president.\n(president describes him)\n\n6. OBJECT OF PREPOSITION → Follows a preposition (in, on, at, by, for, with, etc.)\nExample: The book is on the table.\n(table is the object of the preposition "on")\n\n7. APPOSITIVE → A noun placed beside another noun to explain or identify it\nExample: My friend, the doctor, lives in Accra.\n("the doctor" is in apposition to "friend")' 
                  },
                ],
                activities: { 
                    type: 'exercises', 
                    questions: [
                        { 
                          type: 'identification', 
                          question: 'EXERCISE 1: Identify and Classify Nouns\nRead the passage below and:\n(a) Underline ALL nouns\n(b) Classify them as proper, common, concrete, abstract, or collective\n\nPassage: "Kwame Nkrumah was the first president of Ghana. He had great wisdom and courage. The people of Accra celebrated his freedom with joy. A large crowd gathered at Independence Square to witness the historic event."\n\nAnswers:\n• Proper nouns: Kwame Nkrumah, Ghana, Accra, Independence Square\n• Common nouns: president, people, event\n• Abstract nouns: wisdom, courage, freedom, joy\n• Collective noun: crowd' 
                        },
                        { 
                          type: 'gender_exercise', 
                          question: 'EXERCISE 2: Gender of Nouns\nGive the opposite gender for each noun:\n1. king → _______\n2. nephew → _______\n3. actor → _______\n4. hero → _______\n5. waiter → _______\n6. monk → _______\n7. bachelor → _______\n8. wizard → _______\n\nAnswers: 1. queen  2. niece  3. actress  4. heroine  5. waitress  6. nun  7. spinster  8. witch' 
                        },
                        { 
                          type: 'plural_forms', 
                          question: 'EXERCISE 3: Form the Plurals\nWrite the plural form of these nouns:\n1. baby → _______\n2. knife → _______\n3. tomato → _______\n4. child → _______\n5. tooth → _______\n6. city → _______\n7. sheep → _______\n8. woman → _______\n9. photo → _______\n10. leaf → _______\n\nAnswers: 1. babies  2. knives  3. tomatoes  4. children  5. teeth  6. cities  7. sheep  8. women  9. photos  10. leaves' 
                        },
                        { 
                          type: 'possessive_case', 
                          question: "EXERCISE 4: Possessive Case\nRewrite using the possessive form:\n1. The bag belonging to Mary → _______\n2. The toys belonging to the children → _______\n3. The office belonging to the teachers → _______\n4. The house that belongs to my parents → _______\n5. The book belonging to James → _______\n\nAnswers: 1. Mary's bag  2. the children's toys  3. the teachers' office  4. my parents' house  5. James's bag (or James' bag)" 
                        },
                        { 
                          type: 'compound_nouns', 
                          question: 'EXERCISE 5: Identify Compound Nouns\nCircle the compound nouns in these sentences:\n1. My grandmother lives near the bus stop.\n2. We played football in the classroom.\n3. The police officer directed traffic at the roundabout.\n4. My mother-in-law bought a new toothbrush.\n\nAnswers: grandmother, bus stop, football, classroom, police officer, mother-in-law, toothbrush' 
                        },
                        { 
                          type: 'countable_uncountable', 
                          question: 'EXERCISE 6: Countable or Uncountable?\nClassify these nouns as countable (C) or uncountable (U):\n1. water _____\n2. book _____\n3. rice _____\n4. student _____\n5. information _____\n6. chair _____\n7. sugar _____\n8. advice _____\n\nAnswers: 1. U  2. C  3. U  4. C  5. U  6. C  7. U  8. U' 
                        },
                        { 
                          type: 'functions_in_sentences', 
                          question: 'EXERCISE 7: Functions of Nouns\nIdentify the function of the underlined noun in each sentence:\n1. Ama plays netball. (Subject/Object?)\n2. The teacher gave the students homework. (What is "students"?)\n3. My sister is a nurse. (What is "nurse"?)\n4. The book is on the table. (What is "table"?)\n\nAnswers: 1. Subject  2. Indirect object  3. Subject complement  4. Object of preposition' 
                        }
                    ] 
                },
                pastQuestions: [
                  { question: 'Which of these is a proper noun?\na) boy\nb) Kumasi\nc) teacher', solution: '(b) Kumasi → It is the specific name of a place.' },
                  { question: 'Choose the collective noun:\na) pen\nb) class\nc) girl', solution: '(b) class → It refers to a group of students.' },
                  { question: 'Form the plural of the noun “child.”', solution: 'Children.' }
                ],
                summary: 'Nouns are the foundation of English communication—they name people, places, animals, things, and ideas. In this comprehensive lesson, you have learned:\n\n• The FIVE TYPES of nouns: proper, common, concrete, abstract, and collective\n• GENDER of nouns: masculine, feminine, neuter, and common gender\n• NUMBER: how to form regular and irregular plurals, and the difference between countable and uncountable nouns\n• CASE: subjective, objective, and possessive (using apostrophes correctly)\n• COMPOUND NOUNS: words formed by combining two or more nouns\n• FUNCTIONS of nouns in sentences: subject, object, complement, etc.\n\nMastering nouns is essential for BECE success. Practice identifying types, forming plurals, using possessives, and understanding gender pairs. Remember: proper nouns always start with capital letters, irregular plurals must be memorized, and apostrophe placement matters in possessive case!\n\nWith this knowledge, you are well-equipped to tackle any noun-related question in your WAEC BECE examination and communicate effectively in English.',
                defaultQuizStyle: 'card',
                endOfLessonQuiz: [
                  {
                    type: "mcq",
                    question: "Which of the following is a proper noun?",
                    options: ["dog", "Kumasi", "happiness", "table"],
                    answer: "Kumasi",
                    explanation: "Kumasi is a proper noun because it is the specific name of a city in Ghana. Proper nouns always start with capital letters. The others are common or abstract nouns."
                  },
                  {
                    type: "mcq",
                    question: "What type of noun is 'courage'?",
                    options: ["Concrete", "Proper", "Abstract", "Collective"],
                    answer: "Abstract",
                    explanation: "Courage is an abstract noun because it represents a quality or idea that cannot be seen or touched."
                  },
                  {
                    type: "mcq",
                    question: "What is the plural form of 'child'?",
                    options: ["childs", "children", "childes", "childrens"],
                    answer: "children",
                    explanation: "Child is an irregular noun with the plural form 'children'. Other irregular plurals: man→men, woman→women, tooth→teeth."
                  },
                  {
                    type: "mcq",
                    question: "Which sentence uses the possessive case correctly?",
                    options: [
                      "The boys books are here.",
                      "The boy's books are here.",
                      "The boys' book is here.",
                      "The boys's books are here."
                    ],
                    answer: "The boy's books are here.",
                    explanation: "For a singular noun, add 's to show possession: boy's. If it were plural boys owning something, it would be boys'."
                  },
                  {
                    type: "mcq",
                    question: "What is the feminine gender of 'nephew'?",
                    options: ["aunt", "niece", "sister", "daughter"],
                    answer: "niece",
                    explanation: "Nephew (male) → niece (female). Remember these gender pairs: uncle→aunt, king→queen, actor→actress."
                  },
                  {
                    type: "mcq",
                    question: "Which is a collective noun?",
                    options: ["pen", "herd", "Accra", "beauty"],
                    answer: "herd",
                    explanation: "A collective noun names a group. 'Herd' refers to a group of animals. Other examples: team, class, flock, family."
                  },
                  {
                    type: "mcq",
                    question: "What is the plural of 'knife'?",
                    options: ["knifes", "knives", "knife", "knifees"],
                    answer: "knives",
                    explanation: "Nouns ending in 'f' or 'fe' change to 'ves': knife→knives, life→lives, leaf→leaves."
                  },
                  {
                    type: "mcq",
                    question: "Which noun does NOT change in plural form?",
                    options: ["book", "sheep", "table", "boy"],
                    answer: "sheep",
                    explanation: "Sheep stays 'sheep' in both singular and plural. Other examples: deer, fish, series."
                  },
                  {
                    type: "mcq",
                    question: "Which is a compound noun?",
                    options: ["beautiful", "classroom", "running", "quickly"],
                    answer: "classroom",
                    explanation: "A compound noun combines two words: class + room = classroom. Others: blackboard, toothbrush, bus stop."
                  },
                  {
                    type: "mcq",
                    question: "The word 'furniture' is:",
                    options: [
                      "a countable noun",
                      "an uncountable noun",
                      "a proper noun",
                      "a collective noun"
                    ],
                    answer: "an uncountable noun",
                    explanation: "Furniture is uncountable—we say 'some furniture' or 'a piece of furniture', not 'one furniture'. Other uncountable nouns: water, rice, advice."
                  },
                  {
                    type: "truefalse",
                    statement: "The word 'honesty' is a concrete noun.",
                    answer: "false",
                    reason: "Honesty is an abstract noun because it is a quality that cannot be seen or touched. Concrete nouns are things we can see/touch like chair, mango, water."
                  },
                  {
                    type: "truefalse",
                    statement: "All proper nouns must begin with a capital letter.",
                    answer: "true",
                    reason: "Proper nouns (names of specific people, places, days, months) always start with capital letters: Ghana, Monday, Kwame Nkrumah, December."
                  },
                  {
                    type: 'multiple_select',
                    question: 'Select ALL the abstract nouns:',
                    options: ['freedom', 'table', 'wisdom', 'mango', 'love', 'Accra'],
                    correctAnswers: ['freedom', 'wisdom', 'love']
                  },
                  {
                    type: 'multiple_select',
                    question: 'Select ALL the proper nouns:',
                    options: ['Ghana', 'city', 'Kofi', 'teacher', 'Monday', 'book'],
                    correctAnswers: ['Ghana', 'Kofi', 'Monday']
                  },
                  {
                    type: 'fillblank',
                    sentence: 'The plural of "tomato" is ___.',
                    answer: 'tomatoes'
                  },
                  {
                    type: 'matching',
                    pairs: [
                      { left: 'king', right: 'queen' },
                      { left: 'actor', right: 'actress' },
                      { left: 'uncle', right: 'aunt' },
                      { left: 'hero', right: 'heroine' }
                    ]
                  },
                  {
                    type: 'shortanswer',
                    question: 'Give the possessive form of: "the toys belonging to the children"',
                    answer: "the children's toys"
                  }
                ]
              },
              {
                id: "eng-jhs1-pronouns-01",
                slug: "introduction-to-pronouns",
                title: "Pronouns",
                objectives: [
                  "Define what a pronoun is and explain its function in sentences.",
                  "Identify and classify the eight main types of pronouns (personal, possessive, reflexive, demonstrative, interrogative, relative, indefinite, reciprocal).",
                  "Understand subject pronouns vs object pronouns and use them correctly in sentences.",
                  "Recognize and use possessive pronouns and possessive adjectives correctly.",
                  "Form and use reflexive and intensive pronouns appropriately.",
                  "Distinguish between demonstrative pronouns (this, that, these, those) and their uses.",
                  "Apply interrogative pronouns (who, whom, whose, which, what) in questions.",
                  "Understand pronoun-antecedent agreement in number, gender, and person.",
                  "Answer BECE-style examination questions on pronouns accurately."
                ],
                introduction: "Pronouns are essential words that replace nouns to make our speech and writing smoother and less repetitive. Instead of saying 'Kwame went to Kwame's house because Kwame forgot Kwame's book,' we say 'Kwame went to his house because he forgot his book.' In BECE examinations, questions on pronouns test your understanding of types, agreement, and correct usage. This comprehensive lesson will equip you with all the knowledge needed to master pronouns and excel in your exams.",
                keyConcepts: [
                  {
                    title: "1. What Are Pronouns?",
                    content: "A pronoun is a word that takes the place of a noun (or noun phrase) in a sentence. Pronouns help us avoid unnecessary repetition and make communication more efficient.\n\nExample WITHOUT pronouns (repetitive):\nAma loves books. Ama reads books every day. Books make Ama happy.\n\nExample WITH pronouns (smooth):\nAma loves books. She reads them every day. They make her happy.\n\nKey Terms:\n• ANTECEDENT: The noun that the pronoun replaces or refers to.\n  Example: Kofi is my brother. He is tall.\n  (Kofi is the antecedent; 'he' is the pronoun)\n\n• PRONOUN-ANTECEDENT AGREEMENT: The pronoun must match its antecedent in:\n  - Number (singular/plural)\n  - Gender (masculine/feminine/neuter)\n  - Person (first/second/third)"
                  },
                  {
                    title: "2. Personal Pronouns",
                    content: "Personal pronouns refer to specific people or things. They change form based on:\n• Person (1st, 2nd, 3rd)\n• Number (singular, plural)\n• Case (subject, object)\n\nSUBJECT PRONOUNS (used as the subject doing the action):\nSingular:\n• 1st person: I (I am happy)\n• 2nd person: you (You are smart)\n• 3rd person: he, she, it (He runs fast / She sings / It works)\n\nPlural:\n• 1st person: we (We study hard)\n• 2nd person: you (You all passed)\n• 3rd person: they (They play football)\n\nOBJECT PRONOUNS (used as the object receiving the action):\nSingular:\n• 1st person: me (Help me)\n• 2nd person: you (I see you)\n• 3rd person: him, her, it (I like him / I know her / I found it)\n\nPlural:\n• 1st person: us (Join us)\n• 2nd person: you (I'll call you)\n• 3rd person: them (I saw them)\n\nIMPORTANT RULES:\n1. Subject pronouns come BEFORE the verb:\n   ✓ She loves music. | ✗ Her loves music.\n\n2. Object pronouns come AFTER the verb or preposition:\n   ✓ The teacher helped me. | ✗ The teacher helped I.\n   ✓ Come with us. | ✗ Come with we.\n\n3. After 'to be' (is, am, are, was, were), use subject pronouns formally:\n   ✓ It is I. (formal) | It's me. (informal - commonly accepted)\n   ✓ This is she. (formal) | This is her. (informal)"
                  },
                  {
                    title: "3. Possessive Pronouns and Possessive Adjectives",
                    content: "These show ownership, but they work differently:\n\nPOSSESSIVE ADJECTIVES (come BEFORE a noun):\n• my book, your pen, his bag, her dress, its tail, our school, their house\n\nPOSSESSIVE PRONOUNS (stand ALONE, replace noun + possessive adjective):\n• mine, yours, his, hers, its, ours, theirs\n\nExamples:\n• This is my book → This book is mine.\n• That is your pen → That pen is yours.\n• This is our school → This school is ours.\n• Those are their bags → Those bags are theirs.\n\nCOMMON MISTAKES TO AVOID:\n1. ✗ The book is my. | ✓ The book is mine.\n2. ✗ This is me book. | ✓ This is my book.\n3. ✗ That car is their's. | ✓ That car is theirs. (no apostrophe!)\n4. ✗ The cat wagged it's tail. | ✓ The cat wagged its tail. (its = possessive, it's = it is)\n\nNote: 'his' can be both possessive adjective AND possessive pronoun:\n• his book (adjective) / The book is his (pronoun)"
                  },
                  {
                    title: "4. Reflexive and Intensive Pronouns",
                    content: "These pronouns end in -self (singular) or -selves (plural):\n\nREFLEXIVE PRONOUNS (the subject does something to/for itself):\n• Singular: myself, yourself, himself, herself, itself\n• Plural: ourselves, yourselves, themselves\n\nExamples:\n• I hurt myself. (I hurt me - myself receives the action)\n• She taught herself to play guitar.\n• They enjoyed themselves at the party.\n• The cat cleaned itself.\n\nINTENSIVE PRONOUNS (emphasize the subject, can be removed without changing meaning):\n• I myself saw the accident. (emphasis: I personally saw it)\n• The president himself attended the meeting.\n• We ourselves will solve the problem.\n\nCOMMON ERRORS:\n✗ I bought me a book. | ✓ I bought myself a book.\n✗ Themself is not a word. | ✓ Use themselves (plural) or himself/herself (singular)\n✗ Hisself, theirselves | ✓ himself, themselves"
                  },
                  {
                    title: "5. Demonstrative Pronouns",
                    content: "These pronouns point to specific things and show whether they are near or far, singular or plural.\n\nNear:\n• this (singular) - This is my book.\n• these (plural) - These are my books.\n\nFar:\n• that (singular) - That is your house.\n• those (plural) - Those are your shoes.\n\nDemonstrative Adjectives vs Pronouns:\n• PRONOUN (stands alone): This is beautiful. / Those are mine.\n• ADJECTIVE (before noun): This book is beautiful. / Those shoes are mine.\n\nRULES:\n1. Use 'this/these' for things close in space or time:\n   • This morning, I woke up early.\n   • These days, students study hard.\n\n2. Use 'that/those' for things far in space or time:\n   • Remember that day we met?\n   • Those were the good old days.\n\n3. Match singular/plural:\n   ✗ This books | ✓ These books\n   ✗ Those boy | ✓ That boy"
                  },
                  {
                    title: "6. Interrogative Pronouns",
                    content: "These pronouns are used to ask questions:\n\n• WHO - asks about people (subject)\n  - Who is coming to the party?\n  - Who made this mess?\n\n• WHOM - asks about people (object) - formal\n  - Whom did you meet? (formal)\n  - Who did you meet? (informal - commonly used)\n\n• WHOSE - asks about possession\n  - Whose book is this?\n  - Whose turn is it?\n\n• WHICH - asks about choice between limited options\n  - Which dress do you prefer - the red one or the blue one?\n  - Which is your favorite subject?\n\n• WHAT - asks about things (unlimited options)\n  - What is your name?\n  - What happened yesterday?\n\nWHO vs WHOM:\nSimple test: Replace with he/him:\n• If 'he' fits → use WHO\n  - Who is calling? (He is calling) ✓\n• If 'him' fits → use WHOM\n  - Whom did you call? (You called him) ✓\n\nWHICH vs WHAT:\n• WHICH - limited, specific choices\n  - Which color: red, blue, or green?\n• WHAT - open-ended, unlimited\n  - What is your favorite color? (any color)"
                  },
                  {
                    title: "7. Relative Pronouns",
                    content: "These pronouns connect a clause (group of words) to a noun. They introduce relative clauses that give more information about something.\n\nMain Relative Pronouns:\n• WHO - for people (subject)\n• WHOM - for people (object)\n• WHOSE - for possession\n• WHICH - for animals/things\n• THAT - for people/animals/things\n\nExamples:\n• The girl who sits next to me is my friend.\n  (who connects 'sits next to me' to 'girl')\n• The book which I bought is interesting.\n  (which connects 'I bought' to 'book')\n• The teacher whose class I attend is very kind.\n  (whose shows possession - the teacher's class)\n• The house that we visited was beautiful.\n  (that connects 'we visited' to 'house')\n\nWHO vs WHICH vs THAT:\n• WHO - people only\n  - The man who called you is here.\n• WHICH - animals/things (can use 'that' instead)\n  - The car which/that I bought is fast.\n• THAT - people/animals/things (more common in everyday speech)\n  - The student that won is my friend.\n  - The dog that barked is friendly."
                  },
                  {
                    title: "8. Indefinite Pronouns",
                    content: "These pronouns refer to non-specific people or things. They do not point to a particular person or object.\n\nSINGULAR (take singular verbs):\n• someone, somebody, something\n• anyone, anybody, anything\n• no one, nobody, nothing\n• everyone, everybody, everything\n• each, either, neither\n• one, another\n\nPLURAL (take plural verbs):\n• both, few, many, several, others\n\nSINGULAR OR PLURAL (depends on context):\n• all, any, most, none, some\n\nExamples:\n• Someone is at the door. (singular verb 'is')\n• Everyone loves a good story. (singular verb 'loves')\n• Many are called, but few are chosen. (plural verb 'are')\n• Both of them are my friends. (plural verb 'are')\n• Some of the cake is left. (singular - refers to cake)\n• Some of the students are absent. (plural - refers to students)\n\nCOMMON ERRORS:\n✗ Everyone are happy. | ✓ Everyone is happy.\n✗ Somebody have called. | ✓ Somebody has called.\n✗ Each of the boys have a pen. | ✓ Each of the boys has a pen."
                  },
                  {
                    title: "9. Reciprocal Pronouns",
                    content: "These pronouns show a mutual relationship between two or more people.\n\n• EACH OTHER - for two people\n  - Ama and Kofi help each other. (Ama helps Kofi, Kofi helps Ama)\n\n• ONE ANOTHER - for more than two people\n  - The students help one another. (many students helping each other)\n\nNote: In modern English, 'each other' and 'one another' are often used interchangeably.\n\nExamples:\n• The two friends respect each other.\n• The team members support one another.\n• My parents love each other deeply."
                  },
                  {
                    title: "10. Pronoun-Antecedent Agreement",
                    content: "A pronoun must agree with its antecedent (the noun it replaces) in three ways:\n\n1. NUMBER (singular/plural):\n   ✗ The student forgot their book. | ✓ The student forgot his/her book.\n   ✓ The students forgot their books.\n\n2. GENDER (masculine/feminine/neuter):\n   ✗ Mary said he is coming. | ✓ Mary said she is coming.\n   ✓ The dog wagged its tail. (not 'his' or 'her')\n\n3. PERSON (1st/2nd/3rd):\n   ✗ When one studies, you should concentrate. | ✓ When you study, you should concentrate.\n   ✓ When one studies, one should concentrate.\n\nSPECIAL CASES:\n• Compound subjects joined by 'and' → plural pronoun:\n  - Kofi and Ama brought their books.\n\n• Compound subjects joined by 'or/nor' → pronoun agrees with nearest noun:\n  - Either John or the boys will bring their ball.\n  - Neither the boys nor John will bring his ball.\n\n• Collective nouns (team, class, family) → usually singular:\n  - The team won its match. (team as one unit)\n  - The team are arguing among themselves. (members as individuals)\n\n• Indefinite pronouns (everyone, somebody) → traditionally singular:\n  - Everyone should bring his or her book.\n  - Modern usage: Everyone should bring their book. (increasingly accepted)"
                  }
                ],
                summary: "Pronouns are essential in English because they replace nouns and prevent unnecessary repetition. Understanding the types of pronouns and how they function in sentences helps students write clearly and communicate effectively. In BECE examinations, focus on: (1) Identifying pronoun types correctly, (2) Choosing correct subject vs object forms, (3) Distinguishing possessive pronouns from possessive adjectives, (4) Ensuring pronoun-antecedent agreement in number, gender, and person, (5) Avoiding common errors like 'me and John' or 'between you and I.' Practice with past questions is essential for mastery.",
                activities: {
                  type: "exercises",
                  exercises: [
                    {
                      title: "Exercise 1: Identify and Classify Pronouns",
                      instructions: "Read each sentence carefully. Identify all the pronouns and state what type each pronoun is (personal, possessive, reflexive, demonstrative, interrogative, relative, indefinite, or reciprocal).",
                      questions: [
                        { question: "She bought herself a new dress for the party.", answer: "She (personal - subject), herself (reflexive)" },
                        { question: "These are the books which I borrowed from the library.", answer: "These (demonstrative), which (relative), I (personal - subject)" },
                        { question: "Everyone should do their homework before class.", answer: "Everyone (indefinite), their (possessive adjective)" },
                        { question: "Whose pen is this? Is it yours or mine?", answer: "Whose (interrogative), this (demonstrative), it (personal - subject), yours (possessive pronoun), mine (possessive pronoun)" },
                        { question: "The children enjoyed themselves and helped one another.", answer: "themselves (reflexive), one another (reciprocal)" },
                        { question: "He told us that somebody had taken his book.", answer: "He (personal - subject), us (personal - object), that (relative), somebody (indefinite), his (possessive adjective)" },
                        { question: "Which of you saw what happened to them?", answer: "Which (interrogative), you (personal), what (interrogative), them (personal - object)" }
                      ]
                    },
                    {
                      title: "Exercise 2: Subject vs Object Pronouns",
                      instructions: "Choose the correct pronoun (subject or object form) to complete each sentence.",
                      questions: [
                        { question: "Ama and _____ went to the market. (I/me)", answer: "I (subject pronoun - Ama and I went)" },
                        { question: "The teacher gave _____ some homework. (we/us)", answer: "us (object pronoun - gave to us)" },
                        { question: "Between you and _____, I think he is wrong. (I/me)", answer: "me (object pronoun - after preposition 'between')" },
                        { question: "_____ and John are best friends. (He/Him)", answer: "He (subject pronoun)" },
                        { question: "My mother took my sister and _____ to the zoo. (I/me)", answer: "me (object pronoun)" },
                        { question: "Was it _____ who called? (she/her)", answer: "she (after 'to be' verb - formal usage)" },
                        { question: "The ball hit both _____ and John. (he/him)", answer: "him (object pronoun)" }
                      ]
                    },
                    {
                      title: "Exercise 3: Possessive Pronouns vs Possessive Adjectives",
                      instructions: "Fill in the blanks with the correct possessive pronoun or possessive adjective.",
                      questions: [
                        { question: "This is _____ book. The book is _____. (my/mine)", answer: "my (adjective before noun), mine (pronoun standing alone)" },
                        { question: "Is this _____ pen or is it _____? (your/yours, her/hers)", answer: "your (adjective), hers (pronoun)" },
                        { question: "The dog wagged _____ tail happily. (its/it's)", answer: "its (possessive - NOT it's which means 'it is')" },
                        { question: "_____ house is bigger than _____. (Our/Ours, their/theirs)", answer: "Our (adjective before noun), theirs (pronoun)" },
                        { question: "That bag is not _____; it's _____. (my/mine, his/him)", answer: "mine (pronoun after 'is'), his (can be both adjective and pronoun)" },
                        { question: "_____ car broke down, so we took _____. (Their/Theirs, our/ours)", answer: "Their (adjective before noun), ours (pronoun)" }
                      ]
                    },
                    {
                      title: "Exercise 4: Reflexive Pronouns",
                      instructions: "Complete each sentence with the correct reflexive pronoun.",
                      questions: [
                        { question: "I taught _____ to play the guitar.", answer: "myself" },
                        { question: "She looked at _____ in the mirror.", answer: "herself" },
                        { question: "The children enjoyed _____ at the party.", answer: "themselves" },
                        { question: "We should be proud of _____.", answer: "ourselves" },
                        { question: "Did you hurt _____ when you fell?", answer: "yourself" },
                        { question: "The cat can clean _____ very well.", answer: "itself" },
                        { question: "They blamed _____ for the mistake.", answer: "themselves" }
                      ]
                    },
                    {
                      title: "Exercise 5: Demonstrative Pronouns",
                      instructions: "Choose the correct demonstrative pronoun: this, that, these, or those.",
                      questions: [
                        { question: "_____ is my school bag. (near/singular)", answer: "This" },
                        { question: "_____ are my books on the table. (near/plural)", answer: "These" },
                        { question: "_____ is your house over there. (far/singular)", answer: "That" },
                        { question: "_____ were the days! (far/plural - referring to past)", answer: "Those" },
                        { question: "_____ shoes I'm wearing are new. (near/plural)", answer: "These" },
                        { question: "Is _____ your brother standing by the gate? (far/singular)", answer: "that" }
                      ]
                    },
                    {
                      title: "Exercise 6: Relative Pronouns",
                      instructions: "Complete each sentence with the correct relative pronoun: who, whom, whose, which, or that.",
                      questions: [
                        { question: "The girl _____ sits next to me is very intelligent.", answer: "who/that (refers to person, subject of 'sits')" },
                        { question: "The book _____ I read was very interesting.", answer: "which/that (refers to thing, object of 'read')" },
                        { question: "The teacher _____ bag was stolen reported to the police.", answer: "whose (shows possession)" },
                        { question: "The man to _____ I spoke was very helpful.", answer: "whom (formal, object of 'spoke to')" },
                        { question: "The house _____ we visited belongs to my uncle.", answer: "which/that (refers to thing, object of 'visited')" },
                        { question: "Students _____ study hard will succeed.", answer: "who/that (refers to people, subject of 'study')" }
                      ]
                    },
                    {
                      title: "Exercise 7: Pronoun-Antecedent Agreement and Error Correction",
                      instructions: "Correct any pronoun errors in these sentences. If the sentence is correct, write 'Correct.'",
                      questions: [
                        { question: "Every student must bring their own book.", answer: "Every student must bring his or her own book. (singular antecedent needs singular pronoun) OR 'All students must bring their own books.' (make both plural)" },
                        { question: "The team won their match yesterday.", answer: "The team won its match yesterday. (team is singular collective noun)" },
                        { question: "Either Mary or the boys will bring their ball.", answer: "Correct (pronoun agrees with nearest antecedent 'boys')" },
                        { question: "Me and John went to the cinema.", answer: "John and I went to the cinema. (use subject pronoun 'I', and put yourself last)" },
                        { question: "The cat hurt it's paw.", answer: "The cat hurt its paw. (its = possessive, it's = it is)" },
                        { question: "Between you and I, he is wrong.", answer: "Between you and me, he is wrong. (object pronoun after preposition)" },
                        { question: "Nobody have finished their work.", answer: "Nobody has finished his or her work. (nobody is singular)" },
                        { question: "The book is her's.", answer: "The book is hers. (no apostrophe in possessive pronouns)" }
                      ]
                    }
                  ]
                },
                pastQuestions: [
                  {
                    year: "BECE 2023",
                    question: "Choose the correct pronoun to complete the sentence:\nKofi and _____ went to the library.\nA. me\nB. I\nC. myself\nD. mine",
                    answer: "B",
                    explanation: "The correct answer is 'I' because it is a subject pronoun. The sentence structure is 'Kofi and I went,' where 'I' is part of the compound subject performing the action 'went.' 'Me' is an object pronoun and would be incorrect here. To test: remove 'Kofi and' - you would say 'I went' not 'Me went.' 'Myself' is reflexive and 'mine' is possessive, neither fits this context."
                  },
                  {
                    year: "BECE 2023",
                    question: "Identify the possessive pronoun in the sentence:\nThis book is yours, and that one is mine.\nA. This\nB. yours\nC. that\nD. one",
                    answer: "B",
                    explanation: "The correct answer is 'yours' because it is a possessive pronoun showing ownership without needing a following noun. 'Mine' is also a possessive pronoun, but it's not among the options. 'This' and 'that' are demonstrative pronouns/adjectives, and 'one' is an indefinite pronoun. Possessive pronouns (mine, yours, his, hers, ours, theirs) stand alone, unlike possessive adjectives (my, your, his, her, our, their) which come before nouns."
                  },
                  {
                    year: "BECE 2022",
                    question: "Which sentence uses a reflexive pronoun correctly?\nA. I bought me a new pen.\nB. She taught herself to dance.\nC. They enjoyed theirselves at the party.\nD. He hurt hisself playing football.",
                    answer: "B",
                    explanation: "The correct answer is B. 'Herself' is the correct reflexive pronoun for third person singular feminine. Reflexive pronouns are: myself, yourself, himself, herself, itself, ourselves, yourselves, themselves. Option A should be 'I bought myself a pen.' Options C and D contain non-existent words: 'theirselves' should be 'themselves,' and 'hisself' should be 'himself.'"
                  },
                  {
                    year: "BECE 2022",
                    question: "Complete the sentence with the correct pronoun:\nThe teacher gave the books to my friend and _____.\nA. I\nB. me\nC. myself\nD. mine",
                    answer: "B",
                    explanation: "The correct answer is 'me' because an object pronoun is needed after the preposition 'to.' The full phrase is 'to my friend and me,' where 'me' is the object receiving the books. To test: remove 'my friend and' - you would say 'gave the books to me' not 'gave the books to I.' Subject pronouns (I, he, she) come before verbs, object pronouns (me, him, her) come after verbs or prepositions."
                  },
                  {
                    year: "BECE 2021",
                    question: "What type of pronoun is 'who' in this sentence?\nThe boy who won the race is my brother.\nA. Personal pronoun\nB. Interrogative pronoun\nC. Relative pronoun\nD. Demonstrative pronoun",
                    answer: "C",
                    explanation: "The correct answer is C - 'who' is a relative pronoun here. Relative pronouns (who, whom, whose, which, that) connect a clause to a noun and provide more information about it. In this sentence, 'who won the race' is a relative clause giving information about 'the boy.' If 'who' were asking a question ('Who won the race?'), it would be an interrogative pronoun. The context determines the pronoun type."
                  },
                  {
                    year: "BECE 2021",
                    question: "Choose the sentence with correct pronoun usage:\nA. Everyone have finished their work.\nB. Everyone has finished his or her work.\nC. Everyone have finished his work.\nD. Everyone are finished their work.",
                    answer: "B",
                    explanation: "The correct answer is B. 'Everyone' is a singular indefinite pronoun and requires a singular verb ('has' not 'have') and singular possessive pronoun ('his or her' not 'their'). Although modern English increasingly accepts 'everyone...their' to avoid gender-specific language, traditional grammar (tested in BECE) requires singular agreement. Option A has wrong verb and pronoun, C has wrong verb, and D has double wrong verb forms."
                  },
                  {
                    year: "BECE 2020",
                    question: "Identify the demonstrative pronoun in the sentence:\nThose are my favorite shoes.\nA. Those\nB. are\nC. my\nD. shoes",
                    answer: "A",
                    explanation: "The correct answer is A. 'Those' is a demonstrative pronoun pointing to specific items (shoes) that are far from the speaker. Demonstrative pronouns are: this (near/singular), that (far/singular), these (near/plural), those (far/plural). When 'those' stands alone (as here) it's a pronoun; when it comes before a noun ('those shoes'), it's a demonstrative adjective. 'My' is a possessive adjective, not a pronoun."
                  },
                  {
                    year: "BECE 2020",
                    question: "Which is the correct possessive form?\nA. The cat wagged it's tail.\nB. The cat wagged its tail.\nC. The cat wagged its' tail.\nD. The cat wagged it tail.",
                    answer: "B",
                    explanation: "The correct answer is B - 'its' (without apostrophe) is the possessive form. This is a common mistake area: 'its' = possessive (like his, hers), 'it's' = it is (contraction). Possessive pronouns (mine, yours, his, hers, its, ours, theirs) NEVER use apostrophes. Only possessive nouns use apostrophes (the cat's tail). Option A confuses it's (it is) with its (possessive), C incorrectly adds apostrophe after 's,' and D is incomplete."
                  },
                  {
                    year: "BECE 2019",
                    question: "Choose the interrogative pronoun:\nA. He is my friend.\nB. These are my books.\nC. What did you say?\nD. She taught herself.",
                    answer: "C",
                    explanation: "The correct answer is C. 'What' is an interrogative pronoun used to ask questions. The five interrogative pronouns are: who (asks about people), whom (formal, asks about people as objects), whose (asks about possession), which (asks for choice), what (asks about things). Option A uses personal pronoun 'he,' option B uses demonstrative pronoun 'these,' and option D uses reflexive pronoun 'herself.'"
                  },
                  {
                    year: "BECE 2019",
                    question: "Complete with the correct pronoun:\nEither the boys or John will bring _____ ball.\nA. their\nB. his\nC. its\nD. our",
                    answer: "B",
                    explanation: "The correct answer is B - 'his.' When subjects are joined by 'or' or 'nor,' the pronoun agrees with the nearest subject. Here, 'John' (singular masculine) is nearest, so we use 'his.' If the sentence were 'Either John or the boys will bring their ball,' we'd use 'their' because 'boys' (plural) is nearest. This rule applies to either...or, neither...nor constructions. Note: 'its' is for animals/things, not people."
                  },
                  {
                    year: "BECE 2018",
                    question: "Identify the type of pronoun 'themselves' in this sentence:\nThey prepared themselves for the exam.\nA. Personal pronoun\nB. Reflexive pronoun\nC. Intensive pronoun\nD. Reciprocal pronoun",
                    answer: "B",
                    explanation: "The correct answer is B - reflexive pronoun. 'Themselves' is reflexive here because the subject (they) performs an action on itself - they prepared themselves. Reflexive pronouns end in -self/-selves (myself, yourself, himself, herself, itself, ourselves, yourselves, themselves). If the sentence were 'They themselves prepared for the exam,' it would be intensive (for emphasis). Intensive pronouns can be removed without changing meaning; reflexive cannot."
                  },
                  {
                    year: "BECE 2018",
                    question: "Which sentence shows correct pronoun-antecedent agreement?\nA. The team celebrated their victory.\nB. The team celebrated its victory.\nC. Each student must submit their assignment.\nD. Somebody have left their bag.",
                    answer: "B",
                    explanation: "The correct answer is B. 'Team' is a singular collective noun when acting as one unit, so it takes the singular pronoun 'its.' Option A would be correct only if referring to team members as individuals ('The team members celebrated their victory'). Option C is incorrect in formal grammar - 'each' is singular and needs 'his or her' (though modern usage increasingly accepts 'their'). Option D has double error: 'somebody' is singular, needs 'has' not 'have' and 'his or her' not 'their.'"
                  },
                  {
                    year: "BECE 2017",
                    question: "What is the function of 'which' in this sentence?\nThe car which I bought is very fast.\nA. Interrogative pronoun asking a question\nB. Relative pronoun connecting a clause\nC. Demonstrative pronoun pointing\nD. Indefinite pronoun",
                    answer: "B",
                    explanation: "The correct answer is B - relative pronoun. 'Which' connects the clause 'I bought' to the noun 'car,' providing additional information about it. Relative pronouns (who, whom, whose, which, that) introduce relative clauses. If this were a question ('Which car did I buy?'), 'which' would be interrogative. The context tells us the type: connecting clause = relative, asking question = interrogative."
                  },
                  {
                    year: "BECE 2017",
                    question: "Choose the sentence with incorrect pronoun usage:\nA. Between you and me, she is very talented.\nB. John and I are going to the cinema.\nC. The gift is for my sister and I.\nD. They helped us finish the work.",
                    answer: "C",
                    explanation: "The correct answer is C - this sentence is INCORRECT. It should be 'for my sister and me' because an object pronoun is needed after the preposition 'for.' Test: remove 'my sister and' - you'd say 'the gift is for me' not 'for I.' Option A is correct (object pronoun 'me' after preposition 'between'), B is correct (subject pronoun 'I'), and D is correct (object pronoun 'us' after verb 'helped')."
                  },
                  {
                    year: "BECE 2016",
                    question: "Complete the sentence:\nNeither of the girls brought _____ lunch today.\nA. her\nB. their\nC. its\nD. his",
                    answer: "A",
                    explanation: "The correct answer is A - 'her.' 'Neither' is a singular pronoun, so it takes a singular verb and singular possessive pronoun. Since 'girls' tells us they're female, we use 'her.' Formal: 'Neither of the girls brought her lunch.' The phrase 'of the girls' is a prepositional phrase; the subject is still 'neither' (singular). Common error: using 'their' because 'girls' is plural, but 'neither' (not 'girls') is the subject and it's singular."
                  }
                ],
                endOfLessonQuiz: [
                  {
                    "type": "mcq",
                    "question": "Which of the following is a pronoun?",
                    "options": [
                      "Dog",
                      "She",
                      "Table",
                      "Kofi"
                    ],
                    "answer": "She",
                    "explanation": "‘She’ is a pronoun because it replaces a female noun in a sentence."
                  },
                  {
                    "type": "truefalse",
                    "statement": "Pronouns are used to replace nouns in a sentence.",
                    "answer": "true",
                    "reason": "Pronouns take the place of nouns to avoid repetition."
                  },
                  {
                    "type": "mcq",
                    "question": "Select the sentence that uses a pronoun correctly.",
                    "options": [
                      "Ama is a girl. Ama likes Ama's bag.",
                      "The cat is hungry because the cat lost the cat's food.",
                      "Kojo is my brother. He is very helpful.",
                      "This book is mine. This book is blue."
                    ],
                    "answer": "Kojo is my brother. He is very helpful.",
                    "explanation": "‘He’ correctly replaces the noun ‘Kojo’ in the sentence."
                  }
                ]
              },
               {
                id: 'eng104-4',
                slug: 'tenses-1',
                title: 'Tenses (Simple Present, Past, Future)',
                objectives: ['Understand and use the simple present, past, and future tenses.', 'Form sentences correctly in these tenses.'],
                introduction: 'Tenses indicate the time of an action or event.',
                keyConcepts: [
                    { title: 'Simple Present', content: 'Used for habits, general truths, and regular actions.' },
                    { title: 'Simple Past', content: 'Used for actions that were completed in the past.' },
                    { title: 'Simple Future', content: 'Used for actions that will happen in the future.' }
                ],
                activities: { type: 'quiz', questions: [] },
                pastQuestions: [],
                summary: 'We learned how to use the simple present, past, and future tenses to talk about different times.',
              },
            ],
          },
        ],
      },
      {
        level: 'JHS 2',
        topics: [
           {
            id: 'eng201',
            slug: 'grammar-usage-2',
            title: 'Grammar & Usage',
            lessons: [
                { id: 'eng201-1', slug: 'advanced-tenses', title: 'Tenses (Perfect, Progressive)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
                { id: 'eng201-2', slug: 'sentence-structures', title: 'Sentence Types & Structures', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
                { id: 'eng201-3', slug: 'speech', title: 'Direct and Indirect Speech', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
                { id: 'eng201-4', slug: 'voice', title: 'Active and Passive Voice', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
            ]
          },
          {
            id: 'eng202',
            slug: 'writing-2',
            title: 'Writing',
            lessons: [
                { id: 'eng202-1', slug: 'guided-composition', title: 'Guided Composition', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
                { id: 'eng202-2', slug: 'functional-writing', title: 'Functional Writing', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
            ]
          },
          {
            id: 'eng203',
            slug: 'literature-2',
            title: 'Literature',
            lessons: [
                { id: 'eng203-1', slug: 'prose', title: 'Prose (Short Stories)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
                { id: 'eng203-2', slug: 'poetry', title: 'Poetry Appreciation', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
                { id: 'eng203-3', slug: 'drama', title: 'Drama (Dialogues & Roleplay)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
            ]
          },
           {
            id: 'eng204',
            slug: 'vocabulary-development-2',
            title: 'Vocabulary Development',
            lessons: [
                { id: 'eng204-1', slug: 'synonyms-antonyms', title: 'Synonyms, Antonyms, Homonyms', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
                { id: 'eng204-2', slug: 'idioms-proverbs', title: 'Idiomatic Expressions & Proverbs', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
                 { id: 'eng204-3', slug: 'collocations-phrasal-verbs', title: 'Collocations & Phrasal Verbs', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
            ]
          }
        ]
      },
       {
        level: 'JHS 3',
        topics: [
            {
                id: 'eng301',
                slug: 'writing-3',
                title: 'Writing (BECE Focus)',
                lessons: [
                    { id: 'eng301-1', slug: 'free-composition', title: 'Free Composition (Essays)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
                    { id: 'eng301-2', slug: 'summary-writing', title: 'Summary Writing Techniques', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
                    { id: 'eng301-3', slug: 'creative-writing', title: 'Creative Writing', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
                ]
            },
            {
                id: 'eng302',
                slug: 'grammar-3',
                title: 'Grammar (BECE Focus)',
                lessons: [
                    { id: 'eng302-1', slug: 'concord', title: 'Concord (Subject-Verb Agreement)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
                    { id: 'eng302-2', slug: 'punctuation', title: 'Punctuation & Capitalization', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
                    { id: 'eng302-3', slug: 'word-formation', title: 'Word Formation', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
                ]
            },
            {
                id: 'eng303',
                slug: 'literature-3',
                title: 'Literature (BECE Focus)',
                lessons: [
                    { id: 'eng303-1', slug: 'literary-analysis', title: 'Themes, Characters, Setting, Plot Analysis', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
                    { id: 'eng303-2', slug: 'african-literature', title: 'African & Global Literature', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
                ]
            },
            {
                id: 'eng304',
                slug: 'bece-preparation',
                title: 'BECE Preparation',
                lessons: [
                    { id: 'eng304-1', slug: 'comprehension-practice', title: 'Practice Comprehension Passages', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
                    { id: 'eng304-2', slug: 'oral-english', title: 'Oral English Drills', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
                    { id: 'eng304-3', slug: 'mock-exams', title: 'Timed Practice & Mock Exams', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
                ]
            }
        ]
      }
    ],
  },
  {
    id: '2',
    slug: 'core-mathematics',
    name: 'Mathematics',
    icon: Calculator,
    description: 'Develop problem-solving skills in algebra, geometry, and more.',
    curriculum: [
      {
        level: 'JHS 1',
        topics: [
            {
                id: 'math101',
                slug: 'number-numerals-1',
                title: 'Number & Numerals',
                lessons: [
                    {
                        id: 'math101-1',
                        slug: 'place-value-and-number-types',
                        title: 'Place Value and Number Types',
                        objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: ''
                    },
                    {
                        id: 'math101-2',
                        slug: 'operations-on-whole-numbers',
                        title: 'Operations on Whole Numbers (BODMAS)',
                        objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: ''
                    },
                     {
                        id: 'math101-3',
                        slug: 'fractions-decimals-percentages',
                        title: 'Fractions, Decimals & Percentages',
                        objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: ''
                    },
                    {
                        id: 'math101-4',
                        slug: 'ratio-proportion-rate',
                        title: 'Ratio, Proportion, and Rate',
                        objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: ''
                    },
                    {
                        id: 'math101-5',
                        slug: 'directed-numbers',
                        title: 'Directed Numbers',
                        objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: ''
                    }
                ]
            },
            {
                id: 'math102',
                slug: 'algebra-1',
                title: 'Algebra',
                lessons: [
                     {
                        id: 'math102-1',
                        slug: 'intro-to-algebra',
                        title: 'Introduction to Algebra',
                        objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: ''
                    },
                    {
                        id: 'math102-2',
                        slug: 'simplifying-expressions',
                        title: 'Simplifying Algebraic Expressions',
                        objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: ''
                    },
                    {
                        id: 'math102-3',
                        slug: 'simple-equations',
                        title: 'Simple Equations in One Variable',
                        objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: ''
                    }
                ]
            },
            {
                id: 'math103',
                slug: 'geometry-mensuration-1',
                title: 'Geometry & Mensuration',
                lessons: [
                    {
                        id: 'math103-1',
                        slug: 'basic-geometric-figures',
                        title: 'Basic Geometric Figures',
                        objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: ''
                    },
                    {
                        id: 'math103-2',
                        slug: 'properties-of-shapes',
                        title: 'Properties of Triangles and Quadrilaterals',
                        objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: ''
                    },
                    {
                        id: 'math103-3',
                        slug: 'perimeter-and-area',
                        title: 'Perimeter and Area of Plane Figures',
                        objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: ''
                    }
                ]
            },
             {
                id: 'math104',
                slug: 'statistics-probability-1',
                title: 'Statistics & Probability',
                lessons: [
                     {
                        id: 'math104-1',
                        slug: 'data-presentation',
                        title: 'Data Collection and Presentation',
                        objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: ''
                    },
                    {
                        id: 'math104-2',
                        slug: 'mean-median-mode',
                        title: 'Mean, Median, Mode',
                        objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: ''
                    },
                    {
                        id: 'math104-3',
                        slug: 'intro-to-probability',
                        title: 'Introduction to Probability',
                        objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: ''
                    }
                ]
            },
            {
                id: 'math105',
                slug: 'everyday-maths-1',
                title: 'Everyday Maths',
                lessons: [
                    {
                        id: 'math105-1',
                        slug: 'real-life-applications',
                        title: 'Application of Ratio, Percentages, and Decimals',
                        objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: ''
                    }
                ]
            }
        ]
      },
      {
        level: 'JHS 2',
        topics: [
            {
                id: 'math201',
                slug: 'number-numerals-2',
                title: 'Number & Numerals',
                lessons: [
                    { id: 'math201-1', slug: 'lcm-hcf', title: 'Properties of Numbers (LCM, HCF)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
                    { id: 'math201-2', slug: 'percentages-advanced', title: 'Percentages (Profit/Loss, Simple Interest)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
                    { id: 'math201-3', slug: 'ratio-proportion-advanced', title: 'Ratio and Proportion (Advanced)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
                    { id: 'math201-4', slug: 'standard-form-approximation', title: 'Standard Form and Approximation', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' }
                ]
            },
            {
                id: 'math202',
                slug: 'algebra-2',
                title: 'Algebra',
                lessons: [
                    { id: 'math202-1', slug: 'expanding-brackets', title: 'Expanding Brackets and Simplifying', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
                    { id: 'math202-2', slug: 'factorization', title: 'Factorization of Simple Expressions', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
                    { id: 'math202-3', slug: 'linear-equations-advanced', title: 'Solving Linear Equations (Word Problems)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
                    { id: 'math202-4', slug: 'graphs-linear-equations', title: 'Graphs of Simple Linear Equations', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' }
                ]
            },
            {
                id: 'math203',
                slug: 'geometry-mensuration-2',
                title: 'Geometry & Mensuration',
                lessons: [
                    { id: 'math203-1', slug: 'angles-polygons-circles', title: 'Angles in Polygons and Circles', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
                    { id: 'math203-2', slug: 'congruent-similar-figures', title: 'Congruent and Similar Figures', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
                    { id: 'math203-3', slug: 'symmetry', title: 'Symmetry (Line and Rotational)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
                    { id: 'math203-4', slug: 'perimeter-area-volume', title: 'Perimeter, Area, and Volume of Solids', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
                    { id: 'math203-5', slug: 'pythagoras-theorem', title: 'Pythagoras Theorem', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' }
                ]
            },
            {
                id: 'math204',
                slug: 'statistics-probability-2',
                title: 'Statistics & Probability',
                lessons: [
                    { id: 'math204-1', slug: 'frequency-tables', title: 'Frequency Tables and Grouped Data', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
                    { id: 'math204-2', slug: 'histograms-pie-charts', title: 'Histograms and Pie Charts', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
                    { id: 'math204-3', slug: 'probability-combined-events', title: 'Probability of Combined Events', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' }
                ]
            },
            {
                id: 'math205',
                slug: 'everyday-maths-2',
                title: 'Everyday Maths',
                lessons: [
                    { id: 'math205-1', slug: 'budgets-scale-drawing', title: 'Simple Household Budgets, Scale Drawing', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
                    { id: 'math205-2', slug: 'time-speed-distance', title: 'Time, Speed, Distance Problems', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' }
                ]
            }
        ]
      },
      {
        level: 'JHS 3',
        topics: [
            {
                id: 'math301',
                slug: 'number-numerals-3',
                title: 'Number & Numerals',
                lessons: [
                    { id: 'math301-1', slug: 'sets', title: 'Sets and Operations on Sets', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
                    { id: 'math301-2', slug: 'indices-logarithms', title: 'Indices and Logarithms', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
                    { id: 'math301-3', slug: 'surds', title: 'Surds', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' }
                ]
            },
            {
                id: 'math302',
                slug: 'algebra-3',
                title: 'Algebra',
                lessons: [
                    { id: 'math302-1', slug: 'quadratic-equations', title: 'Quadratic Equations', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
                    { id: 'math302-2', slug: 'simultaneous-linear-equations', title: 'Simultaneous Linear Equations', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
                    { id: 'math302-3', slug: 'inequalities', title: 'Inequalities in One Variable', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
                    { id: 'math302-4', slug: 'graphs-quadratic-simultaneous', title: 'Graphs of Quadratic & Simultaneous Equations', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' }
                ]
            },
            {
                id: 'math303',
                slug: 'geometry-mensuration-3',
                title: 'Geometry & Mensuration',
                lessons: [
                    { id: 'math303-1', slug: 'circle-theorems', title: 'Circle Theorems', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
                    { id: 'math303-2', slug: 'trigonometry', title: 'Trigonometry', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
                    { id: 'math303-3', slug: 'mensuration-complex-solids', title: 'Mensuration of Complex Solids', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
                    { id: 'math303-4', slug: 'coordinate-geometry', title: 'Coordinate Geometry', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' }
                ]
            },
            {
                id: 'math304',
                slug: 'statistics-probability-3',
                title: 'Statistics & Probability',
                lessons: [
                    { id: 'math304-1', slug: 'measures-central-tendency-grouped', title: 'Measures of Central Tendency (Grouped Data)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
                    { id: 'math304-2', slug: 'measures-dispersion', title: 'Measures of Dispersion', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
                    { id: 'math304-3', slug: 'probability-independent-dependent', title: 'Probability (Independent/Dependent Events)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' }
                ]
            },
            {
                id: 'math305',
                slug: 'everyday-maths-3',
                title: 'Everyday Maths',
                lessons: [
                    { id: 'math305-1', slug: 'financial-mathematics', title: 'Financial Mathematics (Compound Interest)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
                    { id: 'math305-2', slug: 'advanced-word-problems', title: 'Advanced Word Problems', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' }
                ]
            }
        ]
      }
    ]
  },
  {
    id: '3',
    slug: 'integrated-science',
    name: 'Science (Integrated Science)',
    icon: FlaskConical,
    description: 'Explore biology, chemistry, and physics concepts.',
    curriculum: [
      {
        level: 'JHS 1',
        topics: [
          {
            id: 'sci101',
            slug: 'diversity-of-matter-1',
            title: 'Diversity of Matter',
            lessons: [
              { id: 'sci101-1', slug: 'nature-of-science', title: 'Nature of Science', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'sci101-2', slug: 'matter-states', title: 'Matter and Its States', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'sci101-3', slug: 'physical-chemical-changes', title: 'Physical and Chemical Changes', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'sci101-4', slug: 'elements-compounds-mixtures', title: 'Elements, Compounds, and Mixtures', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' }
            ]
          },
          {
            id: 'sci102',
            slug: 'cycles-1',
            title: 'Cycles',
            lessons: [
              { id: 'sci102-1', slug: 'water-cycle', title: 'The Water Cycle', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'sci102-2', slug: 'life-cycles', title: 'Life Cycles of Living Things', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'sci102-3', slug: 'day-night-seasons', title: 'Day and Night; Seasons', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' }
            ]
          },
          {
            id: 'sci103',
            slug: 'systems-1',
            title: 'Systems',
            lessons: [
              { id: 'sci103-1', slug: 'human-body-systems', title: 'The Human Body: Organs and Systems', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'sci103-2', slug: 'plants-functions', title: 'Plants: Parts and Functions', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'sci103-3', slug: 'soil-composition', title: 'Soil Composition and Importance', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'sci103-4', slug: 'ecosystems', title: 'Ecosystems', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' }
            ]
          },
          {
            id: 'sci104',
            slug: 'forces-energy-1',
            title: 'Forces & Energy',
            lessons: [
              { id: 'sci104-1', slug: 'types-of-forces', title: 'Types of Forces', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'sci104-2', slug: 'work-energy-power', title: 'Work, Energy, and Power', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'sci104-3', slug: 'light-shadows', title: 'Light and Shadows', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'sci104-4', slug: 'heat-temperature', title: 'Heat and Temperature', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' }
            ]
          },
          {
            id: 'sci105',
            slug: 'human-env-sustainability-1',
            title: 'Human & Environmental Sustainability',
            lessons: [
              { id: 'sci105-1', slug: 'sanitation-hygiene', title: 'Sanitation and Personal Hygiene', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'sci105-2', slug: 'waste-management', title: 'Environmental Cleanliness and Waste Management', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'sci105-3', slug: 'resources', title: 'Renewable and Non-renewable Resources', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' }
            ]
          }
        ]
      },
      {
        level: 'JHS 2',
        topics: [
          {
            id: 'sci201',
            slug: 'diversity-of-matter-2',
            title: 'Diversity of Matter',
            lessons: [
              { id: 'sci201-1', slug: 'atoms-molecules', title: 'Atoms, Molecules, and Particles', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'sci201-2', slug: 'separation-of-mixtures', title: 'Separation of Mixtures', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'sci201-3', slug: 'acids-bases-salts', title: 'Acids, Bases, and Salts', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' }
            ]
          },
          {
            id: 'sci202',
            slug: 'cycles-2',
            title: 'Cycles',
            lessons: [
              { id: 'sci202-1', slug: 'carbon-cycle', title: 'Carbon Cycle', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'sci202-2', slug: 'nitrogen-cycle', title: 'Nitrogen Cycle', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              {
                id: 'sci202-3',
                slug: 'photosynthesis-respiration',
                title: 'Photosynthesis and Respiration',
                objectives: ['Define photosynthesis.', 'List the requirements for photosynthesis.', 'Write the chemical equation for photosynthesis.'],
                introduction: 'Photosynthesis is the amazing process that allows plants to make their own food using sunlight. It is essential for life on Earth.',
                keyConcepts: [
                    { title: 'Definition', content: 'Photosynthesis is the process by which green plants and some other organisms use sunlight to synthesize foods with the help of chlorophyll pigment.' },
                    { title: 'Requirements', content: 'The main requirements are sunlight, water, carbon dioxide, and chlorophyll.' },
                ],
                activities: { type: 'quiz', questions: [] },
                pastQuestions: [
                    { question: 'What gas is released during photosynthesis?', solution: 'Oxygen is released as a byproduct of photosynthesis.' },
                ],
                summary: 'Plants use sunlight, water, and carbon dioxide to create their food (glucose) and release oxygen through a process called photosynthesis.'
              }
            ]
          },
          {
            id: 'sci203',
            slug: 'systems-2',
            title: 'Systems',
            lessons: [
              { id: 'sci203-1', slug: 'circulatory-respiratory', title: 'Circulatory and Respiratory Systems', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'sci203-2', slug: 'excretory-system', title: 'Excretory System', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'sci203-3', slug: 'reproduction', title: 'Reproduction in Plants and Animals', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'sci203-4', slug: 'food-chains-webs', title: 'Food Chains and Food Webs', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'sci203-5', slug: 'soil-fertility', title: 'Soil Fertility and Conservation', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' }
            ]
          },
          {
            id: 'sci204',
            slug: 'forces-energy-2',
            title: 'Forces & Energy',
            lessons: [
              { id: 'sci204-1', slug: 'simple-machines', title: 'Simple Machines', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'sci204-2', slug: 'pressure', title: 'Pressure in Liquids and Gases', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'sci204-3', slug: 'heat-transfer', title: 'Heat Transfer', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'sci204-4', slug: 'electricity-magnetism', title: 'Electricity and Magnetism', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' }
            ]
          },
          {
            id: 'sci205',
            slug: 'human-env-sustainability-2',
            title: 'Human & Environmental Sustainability',
            lessons: [
              { id: 'sci205-1', slug: 'conservation', title: 'Conservation of Natural Resources', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'sci205-2', slug: 'pollution', title: 'Pollution', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'sci205-3', slug: 'climate-change', title: 'Climate Change', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' }
            ]
          }
        ]
      },
      {
        level: 'JHS 3',
        topics: [
          {
            id: 'sci301',
            slug: 'diversity-of-matter-3',
            title: 'Diversity of Matter',
            lessons: [
              { id: 'sci301-1', slug: 'atomic-structure', title: 'Atomic Structure', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'sci301-2', slug: 'periodic-table', title: 'Periodic Table', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'sci301-3', slug: 'chemical-reactions', title: 'Chemical Reactions', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' }
            ]
          },
          {
            id: 'sci302',
            slug: 'cycles-3',
            title: 'Cycles',
            lessons: [
              { id: 'sci302-1', slug: 'water-purification', title: 'Water Purification Methods', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'sci302-2', slug: 'reproduction-humans', title: 'Reproduction and Growth in Humans', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'sci302-3', slug: 'heredity-variation', title: 'Heredity and Variation', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' }
            ]
          },
          {
            id: 'sci303',
            slug: 'systems-3',
            title: 'Systems',
            lessons: [
              { id: 'sci303-1', slug: 'skeletal-muscular', title: 'Skeletal and Muscular Systems', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'sci03-2', slug: 'nervous-system', title: 'Nervous System', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'sci303-3', slug: 'circulatory-advanced', title: 'Circulatory System (Advanced)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'sci303-4', slug: 'plant-nutrition-transport', title: 'Plant Nutrition and Transport System', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' }
            ]
          },
          {
            id: 'sci304',
            slug: 'forces-energy-3',
            title: 'Forces & Energy',
            lessons: [
              { id: 'sci304-1', slug: 'work-energy-machines-advanced', title: 'Work, Energy, and Machines (Advanced)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'sci304-2', slug: 'waves-sound', title: 'Waves and Sound', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'sci304-3', slug: 'light-advanced', title: 'Light (Reflection, Refraction, Lenses)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'sci304-4', slug: 'electricity-advanced', title: 'Electricity (Ohm’s Law, Circuits)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'sci304-5', slug: 'solar-energy', title: 'Solar Energy and Renewable Technologies', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' }
            ]
          },
          {
            id: 'sci305',
            slug: 'human-env-sustainability-3',
            title: 'Human & Environmental Sustainability',
            lessons: [
              { id: 'sci305-1', slug: 'health-diseases', title: 'Health and Diseases', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'sci305-2', slug: 'first-aid-drug-abuse', title: 'First Aid and Drug Use/Abuse', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'sci305-3', slug: 'population-environment', title: 'Population and Its Effect on the Environment', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'sci305-4', slug: 'sustainable-development', title: 'Sustainable Development', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: '4',
    slug: 'social-studies',
    name: 'Social Studies',
    icon: Globe,
    description: 'Understand Ghanaian culture, history, and governance.',
    curriculum: [
      {
        level: 'JHS 1',
        topics: [
          {
            id: 'soc101',
            slug: 'the-environment-1',
            title: 'The Environment',
            lessons: [
              { id: 'soc101-1', slug: 'environment-components', title: 'The environment and its components', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'soc101-2', slug: 'physical-environment', title: 'Our physical environment', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'soc101-3', slug: 'responsible-use-environment', title: 'Responsible use of the environment', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'soc101-4', slug: 'map-reading-basics', title: 'Map reading basics', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
            ],
          },
          {
            id: 'soc102',
            slug: 'governance-politics-stability-1',
            title: 'Governance, Politics & Stability',
            lessons: [
              { id: 'soc102-1', slug: 'what-is-society', title: 'What is society? Rules and regulations', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'soc102-2', slug: 'family-unit', title: 'The family as the basic unit of society', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'soc102-3', slug: 'leadership-authority', title: 'Leadership and authority in the community', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'soc102-4', slug: 'law-and-order', title: 'Importance of law and order', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
            ],
          },
          {
            id: 'soc103',
            slug: 'social-economic-development-1',
            title: 'Social & Economic Development',
            lessons: [
              { id: 'soc103-1', slug: 'needs-and-wants', title: 'Human needs and wants', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'soc103-2', slug: 'production', title: 'Production (farming, fishing, trading, services)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'soc103-3', slug: 'occupations', title: 'Occupations in our community', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'soc103-4', slug: 'basic-economic-problems', title: 'Basic economic problems', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
            ],
          },
          {
            id: 'soc104',
            slug: 'culture-national-identity-1',
            title: 'Our Culture & National Identity',
            lessons: [
              { id: 'soc104-1', slug: 'what-is-culture', title: 'What is culture? Elements of culture', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'soc104-2', slug: 'ghanaian-values', title: 'Ghanaian values and practices', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'soc104-3', slug: 'festivals-customs', title: 'Festivals, customs, and traditions', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'soc104-4', slug: 'national-symbols', title: 'The importance of national symbols', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
            ],
          },
          {
            id: 'soc105',
            slug: 'globalisation-international-relations-1',
            title: 'Globalisation & International Relations',
            lessons: [
              { id: 'soc105-1', slug: 'ghana-in-the-world', title: 'Ghana in the world', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'soc105-2', slug: 'communication-transportation', title: 'Communication and transportation systems', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'soc105-3', slug: 'international-cooperation', title: 'The importance of international cooperation', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
            ],
          },
        ]
      },
      {
        level: 'JHS 2',
        topics: [
          {
            id: 'soc201',
            slug: 'the-environment-2',
            title: 'The Environment',
            lessons: [
              { id: 'soc201-1', slug: 'land-use-ghana', title: 'Land use in Ghana', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'soc201-2', slug: 'population-distribution', title: 'Population distribution in Ghana', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'soc201-3', slug: 'population-growth-problems', title: 'Problems of population growth', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'soc201-4', slug: 'environmental-challenges', title: 'Environmental challenges', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
            ],
          },
          {
            id: 'soc202',
            slug: 'governance-politics-stability-2',
            title: 'Governance, Politics & Stability',
            lessons: [
              { id: 'soc202-1', slug: 'pre-colonial-governance', title: 'Pre-colonial systems of governance in Ghana', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'soc202-2', slug: 'colonialism-independence', title: 'Colonialism and independence struggle', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'soc202-3', slug: 'democratic-governance', title: 'Democratic governance in Ghana', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'soc202-4', slug: 'human-rights-responsibilities', title: 'Human rights and responsibilities of citizens', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
            ],
          },
          {
            id: 'soc203',
            slug: 'social-economic-development-2',
            title: 'Social & Economic Development',
            lessons: [
              {
                id: 'soc203-1',
                slug: 'social-economic-development-lesson',
                title: 'Social and Economic Development',
                objectives: ['Define development.', 'Identify indicators of development.', 'Explain factors that promote development.'],
                introduction: 'Development is the process of improving the quality of life for all citizens. It includes social, economic, and political progress.',
                keyConcepts: [
                    { title: 'Economic Development', content: 'Refers to the growth of a country\'s economy, often measured by GDP, industrialization, and employment rates.' },
                    { title: 'Social Development', content: 'Focuses on improving social well-being, including education, healthcare, and access to basic amenities.' },
                ],
                activities: { type: 'quiz', questions: [] },
                pastQuestions: [
                    { question: 'Name one indicator of social development.', solution: 'An indicator of social development is the literacy rate of a country.' },
                ],
                summary: 'Development involves both economic growth and social well-being. It is measured by indicators like GDP, literacy rate, and life expectancy.'
              },
              { id: 'soc203-2', slug: 'forms-of-production', title: 'Forms of production', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'soc203-3', slug: 'factors-of-production', title: 'Factors of production', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'soc203-4', slug: 'money-and-banking', title: 'Money and banking in Ghana', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'soc203-5', slug: 'savings-investments', title: 'Importance of savings and investments', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
            ],
          },
          {
            id: 'soc204',
            slug: 'culture-national-identity-2',
            title: 'Our Culture & National Identity',
            lessons: [
              { id: 'soc204-1', slug: 'ethnic-groups-diversity', title: 'Ghana’s ethnic groups and cultural diversity', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'soc204-2', slug: 'unity-in-diversity', title: 'Unity in diversity', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'soc204-3', slug: 'civic-responsibility-patriotism', title: 'Civic responsibility and patriotism', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'soc204-4', slug: 'role-of-religion', title: 'The role of religion in promoting national identity', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
            ],
          },
          {
            id: 'soc205',
            slug: 'globalisation-international-relations-2',
            title: 'Globalisation & International Relations',
            lessons: [
              { id: 'soc205-1', slug: 'international-trade', title: 'International trade', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'soc205-2', slug: 'ghana-international-organisations', title: 'Ghana and international organisations', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'soc205-3', slug: 'globalisation-effects', title: 'Globalisation and its effects on Ghanaian society', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
            ],
          },
        ]
      },
      {
        level: 'JHS 3',
        topics: [
          {
            id: 'soc301',
            slug: 'the-environment-3',
            title: 'The Environment',
            lessons: [
              { id: 'soc301-1', slug: 'natural-resources-ghana', title: 'Natural resources of Ghana and their uses', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'soc301-2', slug: 'resource-management', title: 'Resource management and sustainable development', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'soc301-3', slug: 'climate-change-global-warming', title: 'Climate change and global warming', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'soc301-4', slug: 'disaster-management', title: 'Disaster management', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
            ],
          },
          {
            id: 'soc302',
            slug: 'governance-politics-stability-3',
            title: 'Governance, Politics & Stability',
            lessons: [
              { id: 'soc302-1', slug: 'constitution-of-ghana', title: 'The Constitution of Ghana', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'soc302-2', slug: 'structure-of-government', title: 'Structure of government', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'soc302-3', slug: 'decentralisation-local-governance', title: 'Decentralisation and local governance', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'soc302-4', slug: 'national-security-stability', title: 'National security and stability', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
            ],
          },
          {
            id: 'soc303',
            slug: 'social-economic-development-3',
            title: 'Social & Economic Development',
            lessons: [
              { id: 'soc303-1', slug: 'entrepreneurship-job-creation', title: 'Entrepreneurship and job creation', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'soc303-2', slug: 'national-development', title: 'National development', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'soc303-3', slug: 'problems-of-development', title: 'Problems of development', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'soc303-4', slug: 'science-technology-development', title: 'The role of science and technology in development', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
            ],
          },
          {
            id: 'soc304',
            slug: 'culture-national-identity-3',
            title: 'Our Culture & National Identity',
            lessons: [
              { id: 'soc304-1', slug: 'cultural-change-modernization', title: 'Cultural change and modernization', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'soc304-2', slug: 'cultural-heritage-tourism', title: 'Cultural heritage and tourism in Ghana', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'soc304-3', slug: 'education-cultural-development', title: 'The role of education in cultural development', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'soc304-4', slug: 'national-integration-unity', title: 'National integration and unity', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
            ],
          },
          {
            id: 'soc305',
            slug: 'globalisation-international-relations-3',
            title: 'Globalisation & International Relations',
            lessons: [
              { id: 'soc305-1', slug: 'global-citizenship', title: 'Global citizenship and responsibilities', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'soc305-2', slug: 'international-conflicts-peacekeeping', title: 'International conflicts and Ghana’s role in peacekeeping', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'soc305-3', slug: 'global-issues', title: 'Global issues', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'soc305-4', slug: 'preparing-for-globalised-world', title: 'Preparing for life in a globalised world', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
            ],
          },
        ]
      }
    ],
  },
  {
    id: '5',
    slug: 'rme',
    name: 'Religious and Moral Education (RME)',
    icon: Users,
    description: 'Learn about different religions and moral principles.',
    curriculum: [
      {
        level: 'JHS 1',
        topics: [
          {
            id: 'rme101',
            slug: 'god-creation-attributes-1',
            title: 'God, His Creation and Attributes',
            lessons: [
              { id: 'rme101-1', slug: 'concept-of-god', title: 'The concept of God in Christianity, Islam, and ATR', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'rme101-2', slug: 'god-as-creator', title: 'God as Creator and Sustainer of life', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'rme101-3', slug: 'attributes-of-god', title: 'Attributes of God (love, mercy, power, wisdom, holiness)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
            ],
          },
          {
            id: 'rme102',
            slug: 'family-community-nation-1',
            title: 'The Family, Community & Nation',
            lessons: [
              { id: 'rme102-1', slug: 'family-moral-upbringing', title: 'The role of the family in moral upbringing', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'rme102-2', slug: 'roles-responsibilities', title: 'Roles and responsibilities of children and parents', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'rme102-3', slug: 'respect-obedience-discipline', title: 'Respect, obedience, and discipline', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
            ],
          },
          {
            id: 'rme103',
            slug: 'religious-practices-worship-1',
            title: 'Religious Practices & Worship',
            lessons: [
              { id: 'rme103-1', slug: 'types-of-prayer', title: 'Types of prayer (Christian, Islamic, Traditional)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'rme103-2', slug: 'fasting', title: 'Fasting in Christianity and Islam', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'rme103-3', slug: 'atr-festivals', title: 'Festivals in ATR (Homowo, Aboakyir, Hogbetsotso, etc.)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
            ],
          },
          {
            id: 'rme104',
            slug: 'leaders-role-models-1',
            title: 'Leaders and Role Models',
            lessons: [
              { id: 'rme104-1', slug: 'jesus-early-life', title: 'Jesus Christ’s early life and ministry', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'rme104-2', slug: 'muhammad-early-life', title: 'Prophet Muhammad’s early life and call to prophethood', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'rme104-3', slug: 'atr-heroes', title: 'Heroes in African Traditional Religion (Okomfo Anokye, Yaa Asantewaa, etc.)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
            ],
          },
          {
            id: 'rme105',
            slug: 'moral-lessons-values-1',
            title: 'Moral Lessons & Values',
            lessons: [
              { id: 'rme105-1', slug: 'honesty-truthfulness-hard-work', title: 'Honesty, truthfulness, hard work', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'rme105-2', slug: 'respect-for-elders', title: 'Respect for elders and authority', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'rme105-3', slug: 'friendship-forgiveness', title: 'Friendship and forgiveness', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
            ],
          },
        ],
      },
      {
        level: 'JHS 2',
        topics: [
          {
            id: 'rme201',
            slug: 'god-creation-attributes-2',
            title: 'God, His Creation and Attributes',
            lessons: [
              { id: 'rme201-1', slug: 'god-humankind-relationship', title: 'God’s relationship with humankind', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'rme201-2', slug: 'stewardship-of-environment', title: 'Stewardship of the environment', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'rme201-3', slug: 'sin-consequences', title: 'Sin and its consequences (Christian, Islamic, ATR perspectives)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
            ],
          },
          {
            id: 'rme202',
            slug: 'family-community-nation-2',
            title: 'The Family, Community & Nation',
            lessons: [
              { id: 'rme202-1', slug: 'extended-family-system', title: 'Extended family system in Ghana', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'rme202-2', slug: 'communal-living', title: 'Communal living and responsibility', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'rme202-3', slug: 'respect-cultural-values', title: 'Respect for cultural values and traditions', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
            ],
          },
          {
            id: 'rme203',
            slug: 'religious-practices-worship-2',
            title: 'Religious Practices & Worship',
            lessons: [
              { id: 'rme203-1', slug: 'christian-worship', title: 'Worship in Christianity (church service, sacraments)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'rme203-2', slug: 'islamic-worship', title: 'Worship in Islam (Salat, Zakat, Sawm, Hajj)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'rme203-3', slug: 'atr-worship', title: 'Worship in ATR (libation, sacrifices, festivals)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
            ],
          },
          {
            id: 'rme204',
            slug: 'leaders-role-models-2',
            title: 'Leaders and Role Models',
            lessons: [
              { id: 'rme204-1', slug: 'jesus-parables-miracles', title: 'Parables and miracles of Jesus', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'rme204-2', slug: 'muhammad-teachings', title: 'Teachings of Prophet Muhammad (Hadith)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'rme204-3', slug: 'african-moral-teachers', title: 'African moral teachers and traditional leaders', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
            ],
          },
          {
            id: 'rme205',
            slug: 'moral-lessons-values-2',
            title: 'Moral Lessons & Values',
            lessons: [
              { id: 'rme205-1', slug: 'tolerance-peaceful-coexistence', title: 'Tolerance and peaceful coexistence', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'rme205-2', slug: 'patriotism-nation-building', title: 'Patriotism and nation building', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'rme205-3', slug: 'courage-humility-self-control', title: 'Courage, humility, self-control', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
            ],
          },
        ],
      },
      {
        level: 'JHS 3',
        topics: [
          {
            id: 'rme301',
            slug: 'god-creation-attributes-3',
            title: 'God, His Creation and Attributes',
            lessons: [
              { id: 'rme301-1', slug: 'sovereignty-of-god', title: 'The sovereignty of God', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'rme301-2', slug: 'god-judgment-reward', title: 'God’s judgment and reward (Christian, Islamic, ATR beliefs)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'rme301-3', slug: 'life-after-death', title: 'Life after death and resurrection', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
            ],
          },
          {
            id: 'rme302',
            slug: 'family-community-nation-3',
            title: 'The Family, Community & Nation',
            lessons: [
              { id: 'rme302-1', slug: 'marriage-family-life', title: 'Marriage and family life (Christian, Islamic, Traditional views)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'rme302-2', slug: 'social-vices', title: 'Social vices (corruption, greed, dishonesty, drug abuse, occultism)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'rme302-3', slug: 'conflict-resolution', title: 'Conflict resolution and reconciliation', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
            ],
          },
          {
            id: 'rme303',
            slug: 'religious-practices-worship-3',
            title: 'Religious Practices & Worship',
            lessons: [
              { id: 'rme303-1', slug: 'christian-sacraments', title: 'Christian sacraments and ordinances (baptism, communion, confirmation)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'rme303-2', slug: 'islamic-pillars', title: 'Islamic pillars in practice (detailed study of Hajj, Zakat, Sawm, Hajj)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'rme303-3', slug: 'atr-rites-of-passage', title: 'ATR rites of passage (naming, puberty, marriage, death)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
            ],
          },
          {
            id: 'rme304',
            slug: 'leaders-role-models-3',
            title: 'Leaders and Role Models',
            lessons: [
              { id: 'rme304-1', slug: 'jesus-death-resurrection', title: 'The death and resurrection of Jesus Christ', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'rme304-2', slug: 'muhammad-last-sermon', title: 'The last sermon of Prophet Muhammad', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'rme304-3', slug: 'atr-leaders-custodians', title: 'ATR leaders as custodians of morality and culture', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
            ],
          },
          {
            id: 'rme305',
            slug: 'moral-lessons-values-3',
            title: 'Moral Lessons & Values',
            lessons: [
              { id: 'rme305-1', slug: 'human-rights-responsibilities', title: 'Human rights and responsibilities', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'rme305-2', slug: 'justice-fairness', title: 'Justice and fairness in society', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'rme305-3', slug: 'leadership-service', title: 'Leadership and service to the community', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'rme305-4', slug: 'preparing-for-adult-life', title: 'Preparing for adult life (integrity, accountability)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: '6',
    slug: 'creative-arts-design',
    name: 'Creative Arts & Design',
    icon: Palette,
    description: 'Unleash your creativity through visual arts and design.',
    curriculum: [
      {
        level: 'JHS 1',
        topics: [
          {
            id: 'cad101',
            slug: 'visual-arts-1',
            title: 'Visual Arts',
            lessons: [
              { id: 'cad101-1', slug: 'intro-drawing', title: 'Introduction to drawing (lines, shapes, shading)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'cad101-2', slug: 'elements-design', title: 'Elements of design (colour, texture, balance, proportion, rhythm)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'cad101-3', slug: 'simple-painting', title: 'Simple painting (watercolour, poster colour)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'cad101-4', slug: 'basic-crafts', title: 'Basic crafts (weaving, collage, paper crafts)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
            ],
          },
          {
            id: 'cad102',
            slug: 'music-1',
            title: 'Music',
            lessons: [
              { id: 'cad102-1', slug: 'singing-folk-songs', title: 'Singing Ghanaian folk songs', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'cad102-2', slug: 'traditional-instruments', title: 'Introduction to traditional musical instruments (drums, flutes, rattles)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'cad102-3', slug: 'rhythm-pitch-tempo', title: 'Rhythm, pitch, and tempo basics', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'cad102-4', slug: 'call-response-singing', title: 'Call-and-response singing', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
            ],
          },
          {
            id: 'cad103',
            slug: 'dance-drama-1',
            title: 'Dance & Drama',
            lessons: [
                { id: 'cad103-1', slug: 'intro-traditional-dance', title: 'Introduction to traditional Ghanaian dances', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
                { id: 'cad103-2', slug: 'roleplay-storytelling', title: 'Roleplay and storytelling', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
                { id: 'cad103-3', slug: 'drama-games', title: 'Drama games and improvisation', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
                { id: 'cad103-4', slug: 'movement-expression', title: 'Movement and expression', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
            ],
          },
          {
            id: 'cad104',
            slug: 'cultural-creative-expression-1',
            title: 'Cultural & Creative Expression',
            lessons: [
                { id: 'cad104-1', slug: 'art-daily-life', title: 'Art in daily life (costumes, hairstyles, body adornment)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
                { id: 'cad104-2', slug: 'traditional-symbols', title: 'Traditional Ghanaian symbols (Adinkra symbols, kente patterns)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
                { id: 'cad104-3', slug: 'art-festivals', title: 'Art and festivals in Ghana', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
            ],
          },
          {
            id: 'cad105',
            slug: 'art-appreciation-criticism-1',
            title: 'Art Appreciation & Criticism',
            lessons: [
                { id: 'cad105-1', slug: 'observing-artworks', title: 'Observing and describing artworks', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
                { id: 'cad105-2', slug: 'talking-about-art', title: 'Talking about music and performances', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
                { id: 'cad105-3', slug: 'respecting-cultural-differences', title: 'Respecting cultural differences in art', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
            ],
          },
        ],
      },
      {
        level: 'JHS 2',
        topics: [
            {
                id: 'cad201',
                slug: 'visual-arts-2',
                title: 'Visual Arts',
                lessons: [
                    { id: 'cad201-1', slug: 'perspective-drawing', title: 'Perspective drawing (objects in 3D)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
                    { id: 'cad201-2', slug: 'intermediate-painting', title: 'Intermediate painting techniques (mixing colours, tones, backgrounds)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
                    { id: 'cad201-3', slug: 'sculpture-modelling', title: 'Sculpture and modelling (clay, papier-mâché, wood carving basics)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
                    { id: 'cad201-4', slug: 'textile-design', title: 'Textile design (tie-and-dye, batik, stamping)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
                ]
            },
            {
                id: 'cad202',
                slug: 'music-2',
                title: 'Music',
                lessons: [
                    { id: 'cad202-1', slug: 'singing-harmony', title: 'Singing in harmony', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
                    { id: 'cad202-2', slug: 'music-notation', title: 'Reading and writing basic music notation', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
                    { id: 'cad202-3', slug: 'song-composition', title: 'Composition of simple songs', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
                    { id: 'cad202-4', slug: 'instrument-ensembles', title: 'Playing traditional instruments in ensembles', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
                ]
            },
            {
                id: 'cad203',
                slug: 'dance-drama-2',
                title: 'Dance & Drama',
                lessons: [
                    { id: 'cad203-1', slug: 'choreography-basics', title: 'Choreography basics (group dance, timing, patterns)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
                    { id: 'cad203-2', slug: 'acting-techniques', title: 'Acting techniques (dialogues, stage performance)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
                    { id: 'cad203-3', slug: 'drama-for-education', title: 'Drama for education (roleplay on social issues like honesty, cleanliness)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
                ]
            },
            {
                id: 'cad204',
                slug: 'cultural-creative-expression-2',
                title: 'Cultural & Creative Expression',
                lessons: [
                    { id: 'cad204-1', slug: 'ghanaian-architecture', title: 'Ghanaian architecture (compounds, shrines, modern influences)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
                    { id: 'cad204-2', slug: 'art-in-ceremonies', title: 'The role of art in Ghanaian festivals and ceremonies', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
                    { id: 'cad204-3', slug: 'african-masks-costumes', title: 'African masks and costumes', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
                ]
            },
            {
                id: 'cad205',
                slug: 'art-appreciation-criticism-2',
                title: 'Art Appreciation & Criticism',
                lessons: [
                    { id: 'cad205-1', slug: 'comparing-artworks', title: 'Comparing artworks from different cultures', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
                    { id: 'cad205-2', slug: 'critiquing-performances', title: 'Critiquing performances positively', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
                    { id: 'cad205-3', slug: 'identifying-themes', title: 'Identifying themes in music, dance, and drama', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
                ]
            }
        ]
      },
      {
        level: 'JHS 3',
        topics: [
            {
                id: 'cad301',
                slug: 'visual-arts-3',
                title: 'Visual Arts',
                lessons: [
                    { id: 'cad301-1', slug: 'advanced-drawing', title: 'Advanced drawing (shading, texture, portraits)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
                    { id: 'cad301-2', slug: 'painting-compositions', title: 'Painting compositions (themes, abstract vs realistic)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
                    { id: 'cad301-3', slug: 'sculpture-advanced', title: 'Sculpture (carving, casting, assembling)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
                    { id: 'cad301-4', slug: 'design-projects', title: 'Design projects (posters, logos, textiles, crafts for business)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
                ]
            },
            {
                id: 'cad302',
                slug: 'music-3',
                title: 'Music',
                lessons: [
                    { id: 'cad302-1', slug: 'composing-meaningful-songs', title: 'Composing songs with meaning (social, moral, cultural themes)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
                    { id: 'cad302-2', slug: 'performance-instruments', title: 'Performance with traditional and modern instruments', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
                    { id: 'cad302-3', slug: 'music-for-ceremonies', title: 'Music for ceremonies (weddings, festivals, funerals)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
                    { id: 'cad302-4', slug: 'music-fusion', title: 'Fusion of Ghanaian and contemporary music', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
                ]
            },
            {
                id: 'cad303',
                slug: 'dance-drama-3',
                title: 'Dance & Drama',
                lessons: [
                    { id: 'cad303-1', slug: 'advanced-choreography', title: 'Advanced choreography (storytelling through dance)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
                    { id: 'cad303-2', slug: 'stagecraft', title: 'Stagecraft (props, costumes, lighting basics)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
                    { id: 'cad303-3', slug: 'dramatic-performance', title: 'Dramatic performance of Ghanaian folktales', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
                    { id: 'cad303-4', slug: 'theatre-for-social-change', title: 'Theatre for social change (drama about corruption, unity, or peace)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
                ]
            },
            {
                id: 'cad304',
                slug: 'cultural-creative-expression-3',
                title: 'Cultural & Creative Expression',
                lessons: [
                    { id: 'cad304-1', slug: 'ghanaian-art-global', title: 'Ghanaian art in global context', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
                    { id: 'cad304-2', slug: 'creative-industries', title: 'Creative industries (fashion, film, music, crafts, design)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
                    { id: 'cad304-3', slug: 'careers-in-arts', title: 'Careers in creative arts', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
                    { id: 'cad304-4', slug: 'business-of-art', title: 'The business of art (selling crafts, performances, and designs)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
                ]
            },
            {
                id: 'cad305',
                slug: 'art-appreciation-criticism-3',
                title: 'Art Appreciation & Criticism',
                lessons: [
                    { id: 'cad305-1', slug: 'analyzing-artworks', title: 'Analyzing Ghanaian and African artworks', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
                    { id: 'cad305-2', slug: 'art-national-identity', title: 'Art as a tool for national identity', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
                    { id: 'cad305-3', slug: 'judging-performances', title: 'Judging performances fairly (criteria, technique, creativity)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
                ]
            }
        ]
      },
    ],
  },
  {
    id: '7',
    slug: 'career-technology',
    name: 'Career Technology',
    icon: Briefcase,
    description: 'Gain practical skills in design, construction, and technology.',
    curriculum: [
      {
        level: 'JHS 1',
        topics: [
          {
            id: 'ct101',
            slug: 'home-economics-1',
            title: 'Home Economics',
            lessons: [
              { id: 'ct101-1', slug: 'intro-food-nutrition', title: 'Introduction to food and nutrition', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'ct101-2', slug: 'personal-hygiene-kitchen-safety', title: 'Personal hygiene and kitchen safety', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'ct101-3', slug: 'local-food-groups-balanced-diet', title: 'Local food groups & balanced diet', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'ct101-4', slug: 'simple-food-preparation', title: 'Simple food preparation (boiling, frying, steaming)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'ct101-5', slug: 'intro-clothing-textiles', title: 'Introduction to clothing and textiles', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
            ],
          },
          {
            id: 'ct102',
            slug: 'basic-agriculture-1',
            title: 'Basic Agriculture',
            lessons: [
              { id: 'ct102-1', slug: 'importance-of-agriculture', title: 'Importance of agriculture in Ghana', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'ct102-2', slug: 'types-of-crops', title: 'Types of crops (food vs cash crops)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'ct102-3', slug: 'preparing-land', title: 'Preparing land for planting', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'ct102-4', slug: 'tools-farm-implements', title: 'Tools and farm implements', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'ct102-5', slug: 'care-of-farm-animals', title: 'Care of farm animals (poultry basics)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
            ],
          },
          {
            id: 'ct103',
            slug: 'pre-technical-skills-1',
            title: 'Pre-Technical Skills',
            lessons: [
              { id: 'ct103-1', slug: 'safety-in-workshop', title: 'Safety in the workshop', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'ct103-2', slug: 'intro-to-tools', title: 'Introduction to tools and equipment', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'ct103-3', slug: 'drawing-simple-objects', title: 'Drawing simple objects', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'ct103-4', slug: 'simple-repairs', title: 'Simple repairs at home', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
            ],
          },
          {
            id: 'ct104',
            slug: 'entrepreneurship-1',
            title: 'Entrepreneurship & Career Guidance',
            lessons: [
              { id: 'ct104-1', slug: 'intro-to-work', title: 'Introduction to work and careers', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'ct104-2', slug: 'good-work-habits', title: 'Good work habits and time management', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'ct104-3', slug: 'savings-responsibility', title: 'Savings and personal responsibility', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
            ],
          },
        ],
      },
      {
        level: 'JHS 2',
        topics: [
          {
            id: 'ct201',
            slug: 'home-economics-2',
            title: 'Home Economics',
            lessons: [
              { id: 'ct201-1', slug: 'meal-planning', title: 'Meal planning for families', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'ct201-2', slug: 'food-preservation', title: 'Food preservation methods', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'ct201-3', slug: 'cooking-local-ingredients', title: 'Cooking with local ingredients', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'ct201-4', slug: 'clothing-textiles-2', title: 'Clothing and textiles (sewing, repairing)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'ct201-5', slug: 'home-management', title: 'Home management', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
            ],
          },
          {
            id: 'ct202',
            slug: 'basic-agriculture-2',
            title: 'Basic Agriculture',
            lessons: [
              { id: 'ct202-1', slug: 'soil-types-improvement', title: 'Soil types and soil improvement', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'ct202-2', slug: 'crop-production', title: 'Crop production', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'ct202-3', slug: 'pest-disease-control', title: 'Pest and disease control methods', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'ct202-4', slug: 'animal-farming', title: 'Animal farming', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'ct202-5', slug: 'irrigation-water-management', title: 'Importance of irrigation and water management', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
            ],
          },
          {
            id: 'ct203',
            slug: 'pre-technical-skills-2',
            title: 'Pre-Technical Skills',
            lessons: [
              { id: 'ct203-1', slug: 'technical-drawing-2', title: 'Technical drawing', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'ct203-2', slug: 'simple-joints-woodwork', title: 'Simple joints in woodwork', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'ct203-3', slug: 'basic-metalwork', title: 'Basic metalwork', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'ct203-4', slug: 'intro-simple-machines', title: 'Introduction to simple machines', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
            ],
          },
          {
            id: 'ct204',
            slug: 'entrepreneurship-2',
            title: 'Entrepreneurship & Career Guidance',
            lessons: [
              { id: 'ct204-1', slug: 'identifying-business-opportunities', title: 'Identifying business opportunities', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'ct204-2', slug: 'producing-selling-products', title: 'Producing and selling small products', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'ct204-3', slug: 'customer-service-honesty', title: 'Customer service and honesty in business', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
            ],
          },
        ],
      },
      {
        level: 'JHS 3',
        topics: [
          {
            id: 'ct301',
            slug: 'home-economics-3',
            title: 'Home Economics',
            lessons: [
              { id: 'ct301-1', slug: 'nutritional-needs', title: 'Nutritional needs of different age groups', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'ct301-2', slug: 'advanced-cooking-methods', title: 'Advanced cooking methods', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'ct301-3', slug: 'food-hygiene-safety', title: 'Food hygiene and safety regulations', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'ct301-4', slug: 'clothing-textiles-3', title: 'Clothing and textiles (pattern drafting)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'ct301-5', slug: 'entrepreneurship-home-economics', title: 'Entrepreneurship in Home Economics', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
            ],
          },
          {
            id: 'ct302',
            slug: 'basic-agriculture-3',
            title: 'Basic Agriculture',
            lessons: [
              { id: 'ct302-1', slug: 'mixed-farming-crop-rotation', title: 'Mixed farming and crop rotation', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'ct302-2', slug: 'livestock-farming', title: 'Livestock farming', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'ct302-3', slug: 'modern-farming-methods', title: 'Modern methods of farming', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'ct302-4', slug: 'harvesting-storage-processing', title: 'Harvesting, storage, and processing crops', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'ct302-5', slug: 'agribusiness', title: 'Agricultural marketing and agribusiness', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
            ],
          },
          {
            id: 'ct303',
            slug: 'pre-technical-skills-3',
            title: 'Pre-Technical Skills',
            lessons: [
              { id: 'ct303-1', slug: 'technical-drawing-3', title: 'Technical drawing (building plans, furniture)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'ct303-2', slug: 'woodwork-projects', title: 'Woodwork projects', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'ct303-3', slug: 'metalwork-projects', title: 'Metalwork projects', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'ct303-4', slug: 'application-simple-machines', title: 'Application of simple machines in real life', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
            ],
          },
          {
            id: 'ct304',
            slug: 'entrepreneurship-3',
            title: 'Entrepreneurship & Career Guidance',
            lessons: [
              { id: 'ct304-1', slug: 'starting-small-business', title: 'Starting a small business', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'ct304-2', slug: 'skills-for-self-employment', title: 'Skills for self-employment', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'ct304-3', slug: 'preparing-future-careers', title: 'Preparing for future careers', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'ct304-4', slug: 'integrity-lifelong-learning', title: 'Integrity, discipline, and lifelong learning', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: '8',
    slug: 'computing',
    name: 'Computing',
    icon: Computer,
    description: 'Learn the fundamentals of computers and ICT.',
    curriculum: [
      {
        level: 'JHS 1',
        topics: [
          {
            id: 'comp101',
            slug: 'introduction-to-ict-1',
            title: 'Introduction to ICT & Digital Literacy',
            lessons: [
              {
                id: 'comp101-1',
                slug: 'introduction-to-ict',
                title: 'Introduction to ICT',
                objectives: ['Define ICT and explain its importance in daily life.', 'Identify various ICT tools and devices.', 'Differentiate between hardware and software.'],
                introduction: 'Information and Communication Technology (ICT) has become an essential part of our modern world. In this lesson, we will explore what ICT is and why it is important.',
                keyConcepts: [
                    { title: 'What is ICT?', content: 'ICT refers to technologies that provide access to information through telecommunications. It includes the Internet, wireless networks, cell phones, and other communication mediums.' },
                    { title: 'Hardware vs. Software', content: 'Hardware refers to the physical components of a computer system, like the monitor and keyboard. Software is a set of instructions or programs that tells the hardware what to do.' },
                ],
                activities: { type: 'quiz', questions: [] },
                pastQuestions: [
                    { question: 'Which of the following is an example of hardware? a) Microsoft Word b) Mouse c) Internet', solution: 'The correct answer is b) Mouse, as it is a physical device you can touch.' },
                ],
                summary: 'We learned that ICT is the technology used to handle and communicate information, and we distinguished between the physical hardware and the instructional software of a computer system.'
              },
              { id: 'comp101-2', slug: 'types-of-ict-devices', title: 'Types of ICT devices', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'comp101-3', slug: 'hardware-vs-software', title: 'Differences between hardware and software', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
            ],
          },
          {
            id: 'comp102',
            slug: 'parts-functions-computer-1',
            title: 'Parts & Functions of a Computer',
            lessons: [
              { id: 'comp102-1', slug: 'input-output-processing-storage', title: 'Input, Output, Processing, and Storage devices', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'comp102-2', slug: 'setting-up-computer', title: 'Setting up a computer', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'comp102-3', slug: 'booting-shutting-down', title: 'Booting and shutting down safely', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
            ],
          },
          {
            id: 'comp103',
            slug: 'word-processing-1',
            title: 'Word Processing & Office Tools',
            lessons: [
              { id: 'comp103-1', slug: 'intro-typing', title: 'Introduction to typing', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'comp103-2', slug: 'formatting-text', title: 'Formatting text', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'comp103-3', slug: 'saving-opening-printing', title: 'Saving, opening, and printing documents', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
            ],
          },
          {
            id: 'comp104',
            slug: 'internet-communication-1',
            title: 'Internet & Communication',
            lessons: [
              { id: 'comp104-1', slug: 'intro-internet', title: 'Introduction to the Internet', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'comp104-2', slug: 'uses-of-internet', title: 'Uses of the Internet', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'comp104-3', slug: 'intro-email', title: 'Introduction to email', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
            ],
          },
          {
            id: 'comp105',
            slug: 'safety-ethics-1',
            title: 'Safety, Ethics & Emerging Technologies',
            lessons: [
              { id: 'comp105-1', slug: 'responsible-use-ict', title: 'Responsible use of ICT devices', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'comp105-2', slug: 'caring-for-computers', title: 'Caring for computers', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'comp105-3', slug: 'dangers-of-misuse', title: 'Dangers of misuse', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
            ],
          },
        ],
      },
      {
        level: 'JHS 2',
        topics: [
          {
            id: 'comp201',
            slug: 'computer-systems-os-2',
            title: 'Parts & Functions of a Computer',
            lessons: [
              { id: 'comp201-1', slug: 'components-computer-system', title: 'Components of a computer system', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'comp201-2', slug: 'functions-operating-system', title: 'Functions of the operating system', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'comp201-3', slug: 'file-management', title: 'File management', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
            ],
          },
          {
            id: 'comp202',
            slug: 'word-processing-spreadsheets-2',
            title: 'Word Processing & Office Tools',
            lessons: [
              { id: 'comp202-1', slug: 'advanced-word-processing', title: 'Advanced word processing (tables, lists, pictures)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'comp202-2', slug: 'intro-spreadsheets', title: 'Introduction to spreadsheets', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'comp202-3', slug: 'simple-formulas', title: 'Entering data and simple formulas', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
            ],
          },
          {
            id: 'comp203',
            slug: 'internet-communication-2',
            title: 'Internet & Communication',
            lessons: [
              { id: 'comp203-1', slug: 'web-browsers-search-engines', title: 'Web browsers and search engines', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'comp203-2', slug: 'safe-searching', title: 'Safe searching and evaluating websites', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'comp203-3', slug: 'social-media-platforms', title: 'Social media and communication platforms', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
            ],
          },
          {
            id: 'comp204',
            slug: 'presentation-software-2',
            title: 'Programming Basics & Problem Solving',
            lessons: [
              { id: 'comp204-1', slug: 'basics-slide-preparation', title: 'Basics of slide preparation', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'comp204-2', slug: 'adding-text-pictures-transitions', title: 'Adding text, pictures, and slide transitions', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'comp204-3', slug: 'simple-presentations', title: 'Simple class/group presentations', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
            ],
          },
          {
            id: 'comp205',
            slug: 'safety-ethics-cybersecurity-2',
            title: 'Safety, Ethics & Emerging Technologies',
            lessons: [
              { id: 'comp205-1', slug: 'cyber-threats', title: 'Cyber threats (viruses, malware, phishing)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'comp205-2', slug: 'cyber-safety-rules', title: 'Cyber safety rules', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'comp205-3', slug: 'digital-citizenship', title: 'Digital citizenship', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
            ],
          },
        ],
      },
      {
        level: 'JHS 3',
        topics: [
          {
            id: 'comp301',
            slug: 'advanced-office-tools-3',
            title: 'Word Processing & Office Tools',
            lessons: [
              { id: 'comp301-1', slug: 'mail-merge', title: 'Mail merge and document automation', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'comp301-2', slug: 'charts-graphs-spreadsheets', title: 'Charts and graphs in spreadsheets', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'comp301-3', slug: 'advanced-formulas', title: 'Applying advanced formulas', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
            ],
          },
          {
            id: 'comp302',
            slug: 'presentation-database-3',
            title: 'Internet & Communication',
            lessons: [
              { id: 'comp302-1', slug: 'advanced-slide-design', title: 'Advanced slide design', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'comp302-2', slug: 'intro-databases', title: 'Introduction to databases', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'comp302-3', slug: 'practical-database-examples', title: 'Practical examples of databases', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
            ],
          },
          {
            id: 'comp303',
            slug: 'programming-basics-3',
            title: 'Programming Basics & Problem Solving',
            lessons: [
              { id: 'comp303-1', slug: 'algorithms-flowcharts', title: 'Concept of algorithms and flowcharts', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'comp303-2', slug: 'intro-basic-coding', title: 'Introduction to basic coding', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'comp303-3', slug: 'writing-simple-programs', title: 'Writing simple programs', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
            ],
          },
          {
            id: 'comp304',
            slug: 'internet-elearning-3',
            title: 'Internet & Communication',
            lessons: [
              { id: 'comp304-1', slug: 'advanced-internet-use', title: 'Advanced use of the Internet', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'comp304-2', slug: 'creating-managing-email', title: 'Creating and managing email accounts', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'comp304-3', slug: 'elearning-platforms', title: 'E-learning platforms', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
            ],
          },
          {
            id: 'comp305',
            slug: 'ict-society-emerging-tech-3',
            title: 'Safety, Ethics & Emerging Technologies',
            lessons: [
              { id: 'comp305-1', slug: 'ict-in-society', title: 'ICT in banking, health, education, and governance', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'comp305-2', slug: 'emerging-technologies', title: 'Emerging technologies', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'comp305-3', slug: 'ict-careers', title: 'Preparing for ICT-related careers', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'comp305-4', slug: 'intellectual-property', title: 'Intellectual property and plagiarism', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'comp305-5', slug: 'data-privacy', title: 'Data privacy and protection laws in Ghana', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'comp305-6', slug: 'responsible-social-media-use', title: 'Responsible use of social media', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: '9',
    slug: 'ghanaian-language',
    name: 'Ghanaian Language',
    icon: Languages,
    description: 'Learn to read, write, and speak a Ghanaian language.',
    curriculum: [
      {
        level: 'JHS 1',
        topics: [
          {
            id: 'gl101',
            slug: 'oral-listening-1',
            title: 'Oral Literature & Listening Skills',
            lessons: [
              { id: 'gl101-1', slug: 'greetings-expressions', title: 'Greetings and common expressions', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'gl101-2', slug: 'listening-stories', title: 'Listening and responding to short stories or dialogues', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'gl101-3', slug: 'folktales-riddles', title: 'Folk tales and riddles', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
            ]
          },
          {
            id: 'gl102',
            slug: 'reading-comprehension-1',
            title: 'Reading & Comprehension',
            lessons: [
              { id: 'gl102-1', slug: 'reading-aloud', title: 'Reading short passages aloud with correct intonation', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'gl102-2', slug: 'comprehension-questions', title: 'Comprehension questions (main idea, vocabulary, moral lessons)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
            ]
          },
          {
            id: 'gl103',
            slug: 'writing-1',
            title: 'Writing',
            lessons: [
              { id: 'gl103-1', slug: 'sentence-building', title: 'Sentence building and paragraph writing', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'gl103-2', slug: 'personal-letters', title: 'Writing personal letters (to a friend/parent)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'gl103-3', slug: 'guided-composition', title: 'Guided composition (e.g., “My Family”, “Market Day”)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
            ]
          },
          {
            id: 'gl104',
            slug: 'grammar-1',
            title: 'Grammar & Structure',
            lessons: [
              { id: 'gl104-1', slug: 'parts-of-speech', title: 'Nouns, pronouns, verbs, adjectives', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'gl104-2', slug: 'sentence-types', title: 'Sentence types (simple, compound)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'gl104-3', slug: 'tenses', title: 'Tenses (present, past, future)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
            ]
          },
          {
            id: 'gl105',
            slug: 'literature-culture-1',
            title: 'Literature & Cultural Values',
            lessons: [
              { id: 'gl105-1', slug: 'folktales', title: 'Introduction to folktales (Ananse stories, moonlight stories)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'gl105-2', slug: 'proverbs', title: 'Simple proverbs and meanings', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'gl105-3', slug: 'songs-poems', title: 'Songs and traditional poems', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
            ]
          },
        ]
      },
      {
        level: 'JHS 2',
        topics: [
          {
            id: 'gl201',
            slug: 'oral-listening-2',
            title: 'Oral & Listening',
            lessons: [
              { id: 'gl201-1', slug: 'storytelling', title: 'Storytelling (retelling a folk story in your own words)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'gl201-2', slug: 'oral-poetry', title: 'Oral poetry and performance', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'gl201-3', slug: 'listening-comprehension', title: 'Listening comprehension (longer passages, questions)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
            ]
          },
          {
            id: 'gl202',
            slug: 'reading-comprehension-2',
            title: 'Reading & Comprehension',
            lessons: [
              { id: 'gl202-1', slug: 'reading-texts', title: 'Reading narrative and descriptive texts', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'gl202-2', slug: 'identifying-elements', title: 'Identifying main characters, themes, and settings', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'gl202-3', slug: 'critical-thinking', title: 'Critical thinking (compare two characters, predict endings)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
            ]
          },
          {
            id: 'gl203',
            slug: 'writing-2',
            title: 'Writing',
            lessons: [
              { id: 'gl203-1', slug: 'narrative-composition', title: 'Narrative composition (story writing, e.g., “A Visit to My Village”)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'gl203-2', slug: 'formal-letters', title: 'Formal letters (to Headmaster, local authority, etc.)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'gl203-3', slug: 'descriptive-writing', title: 'Descriptive writing (e.g., “My Favourite Festival”)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
            ]
          },
          {
            id: 'gl204',
            slug: 'grammar-2',
            title: 'Grammar & Structure',
            lessons: [
              { id: 'gl204-1', slug: 'subject-verb-agreement', title: 'Sentence agreement (subject-verb)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'gl204-2', slug: 'complex-sentences', title: 'Complex sentences (conjunctions, clauses)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'gl204-3', slug: 'reported-speech', title: 'Direct and reported speech', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
            ]
          },
          {
            id: 'gl205',
            slug: 'literature-culture-2',
            title: 'Literature & Proverbs',
            lessons: [
              { id: 'gl205-1', slug: 'folk-plays', title: 'Folk plays (drama)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'gl205-2', slug: 'poetry-intro', title: 'Introduction to selected poems', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'gl205-3', slug: 'proverbs-in-context', title: 'Proverbs in context (apply to real-life situations)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
            ]
          },
        ]
      },
      {
        level: 'JHS 3',
        topics: [
          {
            id: 'gl301',
            slug: 'oral-listening-3',
            title: 'Oral & Listening',
            lessons: [
              { id: 'gl301-1', slug: 'listening-speeches', title: 'Listening to speeches and summarizing', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'gl301-2', slug: 'oral-debate', title: 'Oral debate and discussions (expressing opinions clearly)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'gl301-3', slug: 'storytelling-morals', title: 'Storytelling with moral lessons', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
            ]
          },
          {
            id: 'gl302',
            slug: 'reading-comprehension-3',
            title: 'Reading & Comprehension',
            lessons: [
              { id: 'gl302-1', slug: 'advanced-comprehension', title: 'Advanced comprehension passages (narrative, expository, argumentative)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'gl302-2', slug: 'critical-analysis', title: 'Critical analysis (theme, mood, author’s intention)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'gl302-3', slug: 'translation', title: 'Translation (short passages from English to Ghanaian Language and vice versa)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
            ]
          },
          {
            id: 'gl303',
            slug: 'writing-3',
            title: 'Writing',
            lessons: [
              { id: 'gl303-1', slug: 'argumentative-essays', title: 'Argumentative essays (e.g., “Education is better than money”)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'gl303-2', slug: 'expository-essays', title: 'Expository essays (e.g., “The Importance of Clean Water”)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'gl303-3', slug: 'letter-writing', title: 'Letter writing (formal, informal, official applications)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
            ]
          },
          {
            id: 'gl304',
            slug: 'grammar-3',
            title: 'Grammar & Structure',
            lessons: [
              { id: 'gl304-1', slug: 'advanced-tenses', title: 'Advanced tenses and aspect', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'gl304-2', slug: 'idiomatic-expressions', title: 'Idiomatic expressions and figurative language', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'gl304-3', slug: 'error-detection', title: 'Error detection and correction in sentences', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
            ]
          },
          {
            id: 'gl305',
            slug: 'literature-culture-3',
            title: 'Literature & Proverbs',
            lessons: [
              { id: 'gl305-1', slug: 'prescribed-prose', title: 'Study of prescribed prose (novel or short story)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'gl305-2', slug: 'selected-drama', title: 'Study of selected drama (play excerpts)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'gl305-3', slug: 'poetry-analysis', title: 'Poetry analysis (themes, imagery, sound devices)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'gl305-4', slug: 'advanced-proverbs', title: 'Advanced use of proverbs in essays', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
            ]
          },
        ]
      },
    ]
  },
  {
    id: '10',
    slug: 'french',
    name: 'French',
    icon: BookOpen,
    description: 'Explore the French language and culture (Optional).',
    curriculum: [
      {
        level: 'JHS 1',
        topics: [
          {
            id: 'fr101',
            slug: 'oral-communication-1',
            title: 'Oral Communication',
            lessons: [
              { id: 'fr101-1', slug: 'alphabet-pronunciation', title: 'Alphabet & pronunciation', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'fr101-2', slug: 'greetings-introductions', title: 'Greetings, introductions, asking names & ages', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'fr101-3', slug: 'numbers-1-100', title: 'Numbers (1–100)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'fr101-4', slug: 'days-months-time', title: 'Days of the week, months, telling the time', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'fr101-5', slug: 'classroom-expressions', title: 'Classroom expressions', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
            ],
          },
          {
            id: 'fr102',
            slug: 'reading-comprehension-1',
            title: 'Reading Comprehension',
            lessons: [
              { id: 'fr102-1', slug: 'short-dialogues', title: 'Short dialogues and passages', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'fr102-2', slug: 'identifying-familiar-words', title: 'Identifying familiar words and phrases', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'fr102-3', slug: 'answering-simple-questions', title: 'Answering simple questions', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
            ],
          },
          {
            id: 'fr103',
            slug: 'writing-1',
            title: 'Writing',
            lessons: [
              { id: 'fr103-1', slug: 'writing-basic-sentences', title: 'Copying and writing basic sentences', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'fr103-2', slug: 'writing-about-self', title: 'Writing about self (name, age, nationality)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'fr103-3', slug: 'guided-writing-ma-famille', title: 'Guided writing (e.g., “Ma famille”)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
            ],
          },
          {
            id: 'fr104',
            slug: 'grammar-1',
            title: 'Grammar',
            lessons: [
              { id: 'fr104-1', slug: 'nouns-articles', title: 'Nouns & articles (le, la, les / un, une, des)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'fr104-2', slug: 'gender-of-nouns', title: 'Gender of nouns (masculine/feminine)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'fr104-3', slug: 'present-tense-common-verbs', title: 'Present tense of common verbs (être, avoir, aller, faire)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'fr104-4', slug: 'subject-pronouns', title: 'Subject pronouns', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
            ],
          },
          {
            id: 'fr105',
            slug: 'culture-1',
            title: 'Culture',
            lessons: [
              { id: 'fr105-1', slug: 'francophonie', title: 'French-speaking countries (La Francophonie)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'fr105-2', slug: 'simple-songs-rhymes', title: 'Simple songs and rhymes', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
            ],
          },
        ]
      },
      {
        level: 'JHS 2',
        topics: [
          {
            id: 'fr201',
            slug: 'oral-communication-2',
            title: 'Oral Communication',
            lessons: [
              { id: 'fr201-1', slug: 'daily-routines', title: 'Talking about daily routines', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'fr201-2', slug: 'asking-giving-directions', title: 'Asking & giving directions', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'fr201-3', slug: 'shopping-expressions', title: 'Shopping expressions', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'fr201-4', slug: 'expressing-likes-dislikes', title: 'Expressing likes/dislikes', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
            ],
          },
          {
            id: 'fr202',
            slug: 'reading-comprehension-2',
            title: 'Reading Comprehension',
            lessons: [
              { id: 'fr202-1', slug: 'short-stories-dialogues', title: 'Short stories and dialogues', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'fr202-2', slug: 'extracting-main-ideas', title: 'Extracting main ideas & vocabulary', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'fr202-3', slug: 'answering-questions-in-french', title: 'Answering comprehension questions in simple French', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
            ],
          },
          {
            id: 'fr203',
            slug: 'writing-2',
            title: 'Writing',
            lessons: [
              { id: 'fr203-1', slug: 'describing-people-places-objects', title: 'Describing people, places, and objects', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'fr203-2', slug: 'writing-simple-paragraphs', title: 'Writing simple paragraphs', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'fr203-3', slug: 'informal-letter-writing', title: 'Informal letter writing', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
            ],
          },
          {
            id: 'fr204',
            slug: 'grammar-2',
            title: 'Grammar',
            lessons: [
              { id: 'fr204-1', slug: 'regular-verbs-conjugation', title: 'Regular verbs (-er, -ir, -re conjugations)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'fr204-2', slug: 'negative-sentences', title: 'Negative sentences (ne … pas)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'fr204-3', slug: 'possessive-adjectives', title: 'Possessive adjectives', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'fr204-4', slug: 'prepositions', title: 'Prepositions', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
            ],
          },
          {
            id: 'fr205',
            slug: 'culture-2',
            title: 'Culture',
            lessons: [
              { id: 'fr205-1', slug: 'french-festivals-food', title: 'French festivals, food, and traditions', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'fr205-2', slug: 'short-french-poems-songs', title: 'Short French poems and songs', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
            ],
          },
        ],
      },
      {
        level: 'JHS 3',
        topics: [
          {
            id: 'fr301',
            slug: 'oral-communication-3',
            title: 'Oral Communication',
            lessons: [
              { id: 'fr301-1', slug: 'expressing-opinions', title: 'Expressing opinions', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'fr301-2', slug: 'talking-about-past-events', title: 'Talking about past events', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'fr301-3', slug: 'talking-about-future-plans', title: 'Talking about future plans', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'fr301-4', slug: 'holding-short-conversations', title: 'Holding short conversations', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
            ],
          },
          {
            id: 'fr302',
            slug: 'reading-comprehension-3',
            title: 'Reading Comprehension',
            lessons: [
              { id: 'fr302-1', slug: 'longer-texts', title: 'Longer texts (letters, stories, short articles)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'fr302-2', slug: 'translation-practice', title: 'Translation practice (French ↔ English)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'fr302-3', slug: 'summarizing-main-ideas', title: 'Summarizing main ideas', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
            ],
          },
          {
            id: 'fr303',
            slug: 'writing-3',
            title: 'Writing',
            lessons: [
              { id: 'fr303-1', slug: 'narrative-essays', title: 'Narrative essays', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'fr303-2', slug: 'formal-letter-writing', title: 'Formal letter writing', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'fr303-3', slug: 'guided-essay', title: 'Guided essay (30–60 words, as per BECE standard)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
            ],
          },
          {
            id: 'fr304',
            slug: 'grammar-3',
            title: 'Grammar',
            lessons: [
              { id: 'fr304-1', slug: 'past-tense-passe-compose', title: 'Past tense (passé composé with avoir/être)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'fr304-2', slug: 'future-tense-futur-proche', title: 'Future tense (futur proche: je vais + infinitive)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'fr304-3', slug: 'reflexive-verbs', title: 'Reflexive verbs', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'fr304-4', slug: 'relative-pronouns', title: 'Relative pronouns (qui, que)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
            ],
          },
          {
            id: 'fr305',
            slug: 'culture-3',
            title: 'Culture',
            lessons: [
              { id: 'fr305-1', slug: 'francophone-literature', title: 'Francophone literature (short excerpts)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'fr305-2', slug: 'proverbs-sayings-in-french', title: 'Proverbs and sayings in French', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'fr305-3', slug: 'role-of-french-in-ecowas', title: 'Role of French in ECOWAS & African integration', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
            ],
          },
        ]
      },
    ]
  },
  {
    id: '11',
    slug: 'arabic',
    name: 'Arabic',
    icon: BookOpen,
    description: 'Learn the Arabic language (Optional).',
    curriculum: [
      {
        level: 'JHS 1',
        topics: [
          {
            id: 'ar101',
            slug: 'alphabet-reading-1',
            title: 'The Arabic Alphabet',
            lessons: [
              { id: 'ar101-1', slug: 'arabic-alphabets-1', title: 'Arabic Alphabets and Pronounciations', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'ar101-2', slug: 'alphabet-reading-1', title: 'Arabic Alphabet Reading', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' }
            ]
          }
        ],
       },
       {
        level: 'JHS 2',
        topics: [
           {
            id: 'ar201',
            slug: 'reading-2',
            title: 'Reading of Common Words',
            lessons: [
              { id: 'ar201-1', slug: 'reading-quran', title: 'Reading of Quran and Sunnah', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'ar201-2', slug: 'simple-words', title: 'Reading of Simple Words', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' }
            ]
          }
        ],
       },
      {
        level: 'JHS 3',
        topics: [
          {
            id: 'ar301',
            slug: 'listening-speaking-3',
            title: 'Listening & Speaking',
            lessons: [
              { id: 'ar301-1', slug: 'expressing-opinions', title: 'Expressing opinions', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'ar301-2', slug: 'talking-about-past-events', title: 'Talking about past events', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'ar301-3', slug: 'talking-about-future-plans', title: 'Talking about future plans', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
            ],
          },
          {
            id: 'ar302',
            slug: 'reading-comprehension-3',
            title: 'Reading & Comprehension',
            lessons: [
              { id: 'ar302-1', slug: 'longer-passages', title: 'Longer passages (stories, articles, Qur’anic verses)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'ar302-2', slug: 'comprehension-summary', title: 'Comprehension and summary', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'ar302-3', slug: 'translation-practice', title: 'Translation practice Arabic ↔ English', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
            ],
          },
          {
            id: 'ar303',
            slug: 'writing-3',
            title: 'Writing',
            lessons: [
              { id: 'ar303-1', slug: 'narrative-essays', title: 'Narrative essays (e.g., “رحلة إلى المدينة” – A trip to town)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'ar303-2', slug: 'formal-letter-writing', title: 'Formal letter writing', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'ar303-3', slug: 'guided-essay', title: 'Guided essay (50–80 words, BECE standard)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
            ],
          },
          {
            id: 'ar304',
            slug: 'grammar-vocabulary-3',
            title: 'Grammar & Vocabulary',
            lessons: [
              { id: 'ar304-1', slug: 'tenses-past-present-future', title: 'Past, present, and future tense verbs', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'ar304-2', slug: 'relative-pronouns', title: 'Relative pronouns (الذي، التي)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'ar304-3', slug: 'complex-sentences', title: 'Complex sentences with conjunctions', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [] , summary: ''},
              { id: 'ar304-4', slug: 'reflexive-imperative-verbs', title: 'Reflexive & imperative verbs', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
            ],
          },
          {
            id: 'ar305',
            slug: 'islamic-culture-3',
            title: 'Islamic Culture',
            lessons: [
              { id: 'ar305-1', slug: 'quranic-themes', title: 'Selected Qur’anic themes (justice, honesty, kindness)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'ar305-2', slug: 'life-of-prophet-muhammad', title: 'Life of Prophet Muhammad (Seerah basics)', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
              { id: 'ar305-3', slug: 'islamic-proverbs', title: 'Islamic proverbs and sayings', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'quiz', questions: [] }, pastQuestions: [], summary: '' },
            ],
          },
        ]
      }
    ]
  }
];

export const getSubjectBySlug = (slug: string): Subject | undefined => {
  return subjects.find((subject) => subject.slug === slug);
};

export const getLesson = (subjectSlug: string, lessonSlug: string): { subject: Subject; topic: Topic; lesson: Lesson } | null => {
  const subject = getSubjectBySlug(subjectSlug);
  if (!subject) return null;

  for (const yearGroup of subject.curriculum) {
    for (const topic of yearGroup.topics) {
      const lesson = topic.lessons.find((l) => l.slug === lessonSlug);
      if (lesson) {
        return { subject, topic, lesson };
      }
    }
  }

  return null;
};

export const getTopicsForSubject = (subjectName: string): Topic[] => {
    const subject = subjects.find(s => s.name === subjectName);
    if (!subject) return [];
    
    return subject.curriculum.flatMap(year => year.topics);
}

    

    




