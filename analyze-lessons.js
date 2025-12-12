const fs = require('fs');

// Read the file
const content = fs.readFileSync('src/lib/shs-lessons-data.ts', 'utf8');

// Find all SHS1 lessons (including those with underscores)
const lessonPattern = /\{\s*id:\s*'(cm[-_]shs1[-_][^']+)',\s*slug:\s*'([^']+)',\s*title:\s*'([^']+)',/g;
const lessons = [];

let match;
while ((match = lessonPattern.exec(content)) !== null) {
    const lessonId = match[1];
    const slug = match[2];
    const title = match[3];
    const startPos = match.index;
    
    // Find the end of this lesson - look for the next lesson or end of array
    const remainingContent = content.substring(startPos + 100);
    const nextLessonIdx = remainingContent.search(/\},\s*\n\s*(\/\/.*\n\s*)?\{/);
    
    const endPos = nextLessonIdx > 0 ? startPos + 100 + nextLessonIdx : Math.min(startPos + 10000, content.length);
    const lessonContent = content.substring(startPos, endPos);
    
    // Count keyConcepts - count opening braces after keyConcepts: [
    const keyConceptsMatch = lessonContent.match(/keyConcepts:\s*\[\s*([\s\S]*?)\s*\],\s*activities:/);
    let keyConceptsCount = 0;
    if (keyConceptsMatch) {
        keyConceptsCount = (keyConceptsMatch[1].match(/\{\s*title:/g) || []).length;
    }
    
    // Count activities questions - in the activities section
    const activitiesMatch = lessonContent.match(/activities:\s*\{[\s\S]*?questions:\s*\[([\s\S]*?)\s*\]\s*\}/);
    let activitiesCount = 0;
    if (activitiesMatch) {
        activitiesCount = (activitiesMatch[1].match(/\{\s*type:/g) || []).length;
    }
    
    // Count pastQuestions
    const pastQuestionsMatch = lessonContent.match(/pastQuestions:\s*\[([\s\S]*?)\s*\],\s*endOfLessonQuiz:/);
    let pastQuestionsCount = 0;
    if (pastQuestionsMatch) {
        pastQuestionsCount = (pastQuestionsMatch[1].match(/\{\s*question:/g) || []).length;
    }
    
    // Count endOfLessonQuiz
    const quizMatch = lessonContent.match(/endOfLessonQuiz:\s*\[([\s\S]*?)\s*\],\s*summary:/);
    let quizCount = 0;
    if (quizMatch) {
        quizCount = (quizMatch[1].match(/\{\s*type:/g) || []).length;
    }
    
    lessons.push({
        id: lessonId,
        title: title,
        keyConcepts: keyConceptsCount,
        activities: activitiesCount,
        pastQuestions: pastQuestionsCount,
        quizQuestions: quizCount
    });
}

// Print results in a table format
console.log('\nSHS Form 1 Core Mathematics Lessons Analysis');
console.log('='.repeat(110));
console.log('Lesson'.padEnd(50) + 'Key Concepts'.padEnd(15) + 'Activities'.padEnd(15) + 'Past Qs'.padEnd(15) + 'Quiz Qs');
console.log('='.repeat(110));

lessons.forEach((lesson, idx) => {
    const lessonNum = `${idx + 1}. ${lesson.title}`;
    console.log(
        lessonNum.padEnd(50) + 
        lesson.keyConcepts.toString().padEnd(15) + 
        lesson.activities.toString().padEnd(15) + 
        lesson.pastQuestions.toString().padEnd(15) + 
        lesson.quizQuestions.toString()
    );
});

console.log('='.repeat(110));
console.log(`Total Lessons: ${lessons.length}`);

// Calculate totals
const totals = {
    keyConcepts: lessons.reduce((sum, l) => sum + l.keyConcepts, 0),
    activities: lessons.reduce((sum, l) => sum + l.activities, 0),
    pastQuestions: lessons.reduce((sum, l) => sum + l.pastQuestions, 0),
    quizQuestions: lessons.reduce((sum, l) => sum + l.quizQuestions, 0)
};

console.log(`${'TOTALS:'.padEnd(50)}${totals.keyConcepts.toString().padEnd(15)}${totals.activities.toString().padEnd(15)}${totals.pastQuestions.toString().padEnd(15)}${totals.quizQuestions.toString()}`);
console.log('\n');

// Identify lessons that may need improvement
console.log('\nLessons Needing Improvement (< 4 past questions or < 5 quiz questions):');
console.log('-'.repeat(110));

lessons.forEach((lesson, idx) => {
    if (lesson.pastQuestions < 4 || lesson.quizQuestions < 5) {
        console.log(`${idx + 1}. ${lesson.title}`);
        if (lesson.pastQuestions < 4) console.log(`   - Past Questions: ${lesson.pastQuestions} (needs ${4 - lesson.pastQuestions} more)`);
        if (lesson.quizQuestions < 5) console.log(`   - Quiz Questions: ${lesson.quizQuestions} (needs ${5 - lesson.quizQuestions} more)`);
    }
});
