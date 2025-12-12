import re
import json

# Read the file
with open('src/lib/shs-lessons-data.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Find all SHS1 lessons
lesson_pattern = r"\{\s*id:\s*'(cm-shs1-[^']+)',\s*slug:\s*'([^']+)',\s*title:\s*'([^']+)',"
lessons = []

for match in re.finditer(lesson_pattern, content):
    lesson_id = match.group(1)
    slug = match.group(2)
    title = match.group(3)
    start_pos = match.start()
    
    # Find the end of this lesson (next lesson or end of array)
    next_lesson = re.search(r"\},\s*\{", content[start_pos+500:])
    if next_lesson:
        end_pos = start_pos + 500 + next_lesson.start()
    else:
        end_pos = len(content)
    
    lesson_content = content[start_pos:end_pos]
    
    # Count keyConcepts
    key_concepts_count = lesson_content.count('title:') - 1  # -1 for lesson title
    
    # Count activities questions
    activities_questions = lesson_content.count("type: 'mcq'") + lesson_content.count("type: 'truefalse'")
    
    # Count pastQuestions
    past_questions = lesson_content.count('question:') - activities_questions - 5  # approximate
    
    # Count endOfLessonQuiz
    quiz_start = lesson_content.find('endOfLessonQuiz: [')
    if quiz_start > 0:
        quiz_section = lesson_content[quiz_start:]
        quiz_end = quiz_section.find('],')
        quiz_content = quiz_section[:quiz_end] if quiz_end > 0 else quiz_section[:1000]
        quiz_questions = quiz_content.count("type: 'mcq'") + quiz_content.count("type: 'truefalse'")
    else:
        quiz_questions = 0
    
    lessons.append({
        'id': lesson_id,
        'title': title,
        'keyConcepts': key_concepts_count,
        'activities': activities_questions,
        'pastQuestions': past_questions,
        'quizQuestions': quiz_questions
    })

# Print results
print(f"{'Lesson':<50} {'Key Concepts':<15} {'Activities':<12} {'Past Qs':<12} {'Quiz Qs':<10}")
print("=" * 105)

for idx, lesson in enumerate(lessons, 1):
    print(f"{idx}. {lesson['title']:<47} {lesson['keyConcepts']:<15} {lesson['activities']:<12} {lesson['pastQuestions']:<12} {lesson['quizQuestions']:<10}")
