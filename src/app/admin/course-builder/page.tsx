'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { generateLessonCode, generateLessonSummary, validateLessonData } from '@/lib/code-generator';
import LessonEditor from '@/components/admin/LessonEditor';
import QuestionBuilder from '@/components/admin/QuestionBuilder';
import type { Lesson, Quiz, Topic } from '@/lib/types';
import { Copy, CheckCircle, AlertCircle, Code, FileText, Save, Eye, FolderOpen, RefreshCw, GraduationCap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { subjects } from '@/lib/jhs-data';
import { primarySubjects } from '@/lib/primary-data';
import { getSHSSubjectBySlug } from '@/lib/shs-data';

type EducationLevel = 'Primary' | 'JHS' | 'SHS';

export default function CourseBuilderPage() {
  const [activeTab, setActiveTab] = useState('editor');
  const [educationLevel, setEducationLevel] = useState<EducationLevel>('JHS');
  const [availableLessons, setAvailableLessons] = useState<Array<{id: string, title: string, subject: string, topic: string, level: EducationLevel}>>([]);
  const [selectedLessonId, setSelectedLessonId] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewMode, setPreviewMode] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<Record<string, string>>({});
  const [lesson, setLesson] = useState<Partial<Lesson>>({
    id: '',
    slug: '',
    title: '',
    objectives: [],
    introduction: '',
    keyConcepts: [],
    activities: {
      type: 'exercises',
      questions: []
    },
    pastQuestions: [],
    endOfLessonQuiz: [],
    summary: ''
  });
  const [generatedCode, setGeneratedCode] = useState('');
  const [summary, setSummary] = useState('');
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const { toast } = useToast();

  // Load available lessons based on education level
  useEffect(() => {
    const lessons: Array<{id: string, title: string, subject: string, topic: string, level: EducationLevel}> = [];
    
    if (educationLevel === 'Primary') {
      // Load Primary lessons
      primarySubjects.forEach(subject => {
        subject.topics.forEach((topic: any) => {
          topic.lessons.forEach((lesson: Lesson) => {
            lessons.push({
              id: lesson.id,
              title: lesson.title,
              subject: subject.name,
              topic: topic.title,
              level: 'Primary'
            });
          });
        });
      });
    } else if (educationLevel === 'SHS') {
      // SHS lessons would be loaded here once shs-data.ts has lesson structure
      // Currently SHS only has topic lists without detailed lessons
      // The UI alert explains this - no need for toast on page load
    } else {
      // Load JHS lessons (default)
      subjects.forEach(subject => {
        subject.curriculum.forEach(curriculumLevel => {
          curriculumLevel.topics.forEach((topic: Topic) => {
            topic.lessons.forEach((lesson: Lesson) => {
              lessons.push({
                id: lesson.id,
                title: lesson.title,
                subject: subject.name,
                topic: topic.title,
                level: 'JHS'
              });
            });
          });
        });
      });
    }
    
    setAvailableLessons(lessons);
    setSelectedLessonId(''); // Reset selection when level changes
  }, [educationLevel]);

  const updateActivitiesQuestions = (questions: Quiz[]) => {
    setLesson({
      ...lesson,
      activities: {
        type: 'exercises',
        questions
      }
    });
  };

  const updateEndQuizQuestions = (questions: Quiz[]) => {
    setLesson({
      ...lesson,
      endOfLessonQuiz: questions
    });
  };

  const handleGenerateCode = () => {
    // Validate first
    const validation = validateLessonData(lesson);
    setValidationErrors(validation.errors);

    if (!validation.valid) {
      toast({
        title: 'Validation Failed',
        description: `Found ${validation.errors.length} error(s)`,
        variant: 'destructive'
      });
      setActiveTab('export');
      return;
    }

    // Generate code
    const code = generateLessonCode(lesson);
    setGeneratedCode(code);

    // Generate summary
    const summaryText = generateLessonSummary(lesson);
    setSummary(summaryText);

    setActiveTab('export');
    toast({
      title: 'Code Generated Successfully',
      description: 'Your TypeScript code is ready to copy'
    });
  };

  const loadExistingLesson = (lessonId: string) => {
    if (!lessonId) return;

    let foundLesson: Lesson | null = null;
    
    if (educationLevel === 'Primary') {
      // Search in Primary subjects
      for (const subject of primarySubjects) {
        for (const topic of subject.topics) {
          const lesson = topic.lessons.find((l: Lesson) => l.id === lessonId);
          if (lesson) {
            foundLesson = lesson;
            break;
          }
        }
        if (foundLesson) break;
      }
    } else if (educationLevel === 'SHS') {
      // SHS lesson loading would be here once structure is added
      // Currently SHS doesn't have detailed lesson data
      toast({
        title: 'SHS Lessons Not Available',
        description: 'Please add lesson structure to shs-data.ts first',
        variant: 'destructive'
      });
      return;
    } else {
      // Search in JHS subjects
      for (const subject of subjects) {
        for (const curriculumLevel of subject.curriculum) {
          for (const topic of curriculumLevel.topics) {
            const lesson = topic.lessons.find((l: Lesson) => l.id === lessonId);
            if (lesson) {
              foundLesson = lesson;
              break;
            }
          }
          if (foundLesson) break;
        }
        if (foundLesson) break;
      }
    }

    if (foundLesson) {
      setLesson(foundLesson);
      setSelectedLessonId(lessonId);
      toast({
        title: 'Lesson Loaded',
        description: `Loaded: ${foundLesson.title}`
      });
    }
  };

  const loadSampleData = () => {
    setLesson({
      id: 'eng104-2',
      slug: 'test-lesson',
      title: 'Test Lesson - Sample',
      objectives: [
        'Understand the basic concepts',
        'Apply knowledge in practical scenarios',
        'Master the fundamental skills'
      ],
      introduction: 'This is a test lesson to demonstrate the code generator. It includes properly escaped text with "quotes" and other special characters.',
      keyConcepts: [
        {
          title: '1. First Concept',
          content: 'This is the content of the first concept. It can include:\n\n• Bullet points\n• Multiple paragraphs\n• Special characters like "quotes" and apostrophes\n\nExample: The student\'s work was excellent.'
        },
        {
          title: '2. Second Concept',
          content: 'More detailed information about the second concept goes here.'
        }
      ],
      activities: {
        type: 'exercises',
        questions: [
          {
            type: 'mcq',
            question: 'What is the capital of Ghana?',
            options: ['Accra', 'Kumasi', 'Tamale', 'Takoradi'],
            answer: 'Accra',
            explanation: 'Accra is the capital and largest city of Ghana.'
          },
          {
            type: 'fillblank',
            question: 'Fill in the blank',
            sentence: 'The _____ is the largest planet in our solar system.',
            answer: 'Jupiter',
            alternatives: ['jupiter'],
            explanation: 'Jupiter is indeed the largest planet.'
          },
          {
            type: 'matching',
            question: 'Match the items',
            pairs: [
              { left: 'Monday', right: 'First day' },
              { left: 'Friday', right: 'Last working day' }
            ],
            explanation: 'Match days with their descriptions.'
          }
        ]
      },
      pastQuestions: [
        {
          question: 'Sample BECE question here?',
          solution: 'This is the solution to the sample question.'
        }
      ],
      endOfLessonQuiz: [
        {
          type: 'mcq',
          question: 'Final assessment question?',
          options: ['Option A', 'Option B', 'Option C', 'Option D'],
          answer: 'Option B',
          explanation: 'Option B is correct because...'
        }
      ],
      summary: 'This is a comprehensive summary of everything covered in the lesson.'
    });
    toast({
      title: 'Sample Data Loaded',
      description: 'You can now edit and customize the sample lesson'
    });
  };

  const handleSaveToFile = async () => {
    if (!generatedCode) {
      toast({
        title: 'No Code Generated',
        description: 'Generate code first before saving',
        variant: 'destructive'
      });
      return;
    }

    try {
      const response = await fetch('/api/save-lesson', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          lessonCode: generatedCode,
          lessonId: lesson.id 
        })
      });

      if (response.ok) {
        toast({
          title: 'Saved!',
          description: 'Lesson saved to jhs-data.ts'
        });
      } else {
        throw new Error('Save failed');
      }
    } catch (error) {
      toast({
        title: 'Auto-save not available',
        description: 'Copy the code and paste manually into jhs-data.ts',
        variant: 'destructive'
      });
    }
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(generatedCode);
      toast({
        title: 'Copied!',
        description: 'Code copied to clipboard. Paste into jhs-data.ts at the lesson location.'
      });
    } catch (error) {
      toast({
        title: 'Failed to copy',
        description: 'Please copy manually',
        variant: 'destructive'
      });
    }
  };

  // Filter lessons based on search query
  const filteredLessons = availableLessons.filter(lesson => {
    const query = searchQuery.toLowerCase();
    return (
      lesson.title.toLowerCase().includes(query) ||
      lesson.subject.toLowerCase().includes(query) ||
      lesson.topic.toLowerCase().includes(query)
    );
  });

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">Course Builder</h1>
        <p className="text-muted-foreground">
          Create and edit lesson content for Primary, JHS, or SHS, then export to TypeScript code
        </p>
      </div>

      {/* Education Level Selector */}
      <Card className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            Select Education Level
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-3">
            <Button
              variant={educationLevel === 'Primary' ? 'default' : 'outline'}
              onClick={() => setEducationLevel('Primary')}
              className="flex-1"
            >
              Primary School
            </Button>
            <Button
              variant={educationLevel === 'JHS' ? 'default' : 'outline'}
              onClick={() => setEducationLevel('JHS')}
              className="flex-1"
            >
              JHS
            </Button>
            <Button
              variant={educationLevel === 'SHS' ? 'default' : 'outline'}
              onClick={() => setEducationLevel('SHS')}
              className="flex-1"
            >
              SHS
            </Button>
          </div>
          {educationLevel === 'SHS' && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-xs">
                <strong>Note:</strong> SHS lesson structure needs to be added to shs-data.ts. Currently, SHS only has topic lists. 
                You can create new lessons and the code generator will work, but loading existing SHS lessons is not yet available.
              </AlertDescription>
            </Alert>
          )}
          {educationLevel === 'Primary' && (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription className="text-xs">
                <strong>Primary School:</strong> Create lessons for Classes 1-6. Lessons will be saved to primary-data.ts.
              </AlertDescription>
            </Alert>
          )}
          {educationLevel === 'JHS' && (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription className="text-xs">
                <strong>JHS:</strong> Create lessons for Forms 1-3. Lessons will be saved to jhs-data.ts.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      <div className="mb-4 flex flex-wrap gap-2 items-center">
        <div className="flex-1 max-w-md">
          <Select value={selectedLessonId} onValueChange={loadExistingLesson}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={`Load existing ${educationLevel} lesson...`} />
            </SelectTrigger>
            <SelectContent className="max-h-[400px]">
              <div className="p-2 sticky top-0 bg-background border-b">
                <input
                  type="text"
                  placeholder="Search lessons..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
              {filteredLessons.length === 0 ? (
                <div className="p-4 text-sm text-muted-foreground text-center">
                  No {educationLevel} lessons found
                </div>
              ) : (
                filteredLessons.map(lesson => (
                  <SelectItem key={lesson.id} value={lesson.id}>
                    <div className="flex flex-col">
                      <span className="font-medium">{lesson.title}</span>
                      <span className="text-xs text-muted-foreground">
                        {lesson.subject} → {lesson.topic}
                      </span>
                    </div>
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={() => { setLesson({ id: '', slug: '', title: '', objectives: [], introduction: '', keyConcepts: [], activities: { type: 'exercises', questions: [] }, pastQuestions: [], endOfLessonQuiz: [], summary: '' }); setSelectedLessonId(''); }} variant="outline" size="sm">
          <RefreshCw className="mr-2 h-4 w-4" />
          New Lesson
        </Button>
        <Button onClick={loadSampleData} variant="outline" size="sm">
          <FileText className="mr-2 h-4 w-4" />
          Sample Data
        </Button>
        <Button onClick={handleGenerateCode} variant="default">
          <Code className="mr-2 h-4 w-4" />
          Generate Code
        </Button>
        <Button onClick={() => setPreviewMode(!previewMode)} variant="outline">
          <Eye className="mr-2 h-4 w-4" />
          {previewMode ? 'Edit Mode' : 'Preview'}
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="editor">Lesson Content</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
          <TabsTrigger value="activities">Activities</TabsTrigger>
          <TabsTrigger value="quiz">End Quiz</TabsTrigger>
          <TabsTrigger value="export">Export Code</TabsTrigger>
        </TabsList>

        <TabsContent value="editor" className="space-y-6 mt-6">
          {previewMode ? (
            <Card>
              <CardHeader>
                <CardTitle>📖 Lesson Preview</CardTitle>
                <CardDescription>This is how students will see the lesson</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold mb-4">{lesson.title || 'Untitled Lesson'}</h2>
                  
                  {lesson.objectives && lesson.objectives.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold mb-2">Learning Objectives</h3>
                      <ul className="list-disc list-inside space-y-1">
                        {lesson.objectives.map((obj, idx) => (
                          <li key={idx}>{obj}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {lesson.introduction && (
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold mb-2">Introduction</h3>
                      <p className="whitespace-pre-wrap">{lesson.introduction}</p>
                    </div>
                  )}

                  {lesson.keyConcepts && lesson.keyConcepts.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold mb-4">Key Concepts</h3>
                      {lesson.keyConcepts.map((concept, idx) => (
                        <div key={idx} className="mb-4 p-4 bg-muted rounded-lg">
                          <h4 className="font-semibold mb-2">{concept.title}</h4>
                          <p className="whitespace-pre-wrap">{concept.content}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {lesson.summary && (
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold mb-2">Summary</h3>
                      <p className="whitespace-pre-wrap">{lesson.summary}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <LessonEditor lesson={lesson} onChange={setLesson} />
          )}
        </TabsContent>

        <TabsContent value="media" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Image Upload */}
            <Card>
              <CardHeader>
                <CardTitle>📷 Image Upload</CardTitle>
                <CardDescription>Upload and manage lesson images</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block mb-2 text-sm font-medium">Upload Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (event) => {
                          const imageUrl = event.target?.result as string;
                          const imageName = file.name;
                          setUploadedImages({...uploadedImages, [imageName]: imageUrl});
                          toast({ title: 'Image uploaded', description: `${imageName} ready to use` });
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:opacity-80"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Supported formats: JPG, PNG, GIF, SVG
                  </p>
                </div>

                {Object.keys(uploadedImages).length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2">Uploaded Images</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(uploadedImages).map(([name, url]) => (
                        <div key={name} className="relative group">
                          <img src={url} alt={name} className="w-full h-32 object-cover rounded border" />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded flex items-center justify-center">
                            <Button
                              size="sm"
                              variant="secondary"
                              onClick={() => {
                                navigator.clipboard.writeText(url);
                                toast({ title: 'Copied!', description: 'Image URL copied to clipboard' });
                              }}
                            >
                              <Copy className="h-4 w-4 mr-1" />
                              Copy URL
                            </Button>
                          </div>
                          <p className="text-xs truncate mt-1">{name}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <Alert>
                  <AlertDescription className="text-xs">
                    <strong>How to use:</strong> Upload images here, copy the URL, then paste into lesson content using markdown: <code className="bg-muted px-1 rounded">[alt text](image-url)</code>
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            {/* Video Embedding */}
            <Card>
              <CardHeader>
                <CardTitle>🎥 Video Embedding</CardTitle>
                <CardDescription>Add YouTube or other video content</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block mb-2 text-sm font-medium">Video URL</label>
                  <input
                    type="text"
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                    onBlur={(e) => {
                      const url = e.target.value;
                      if (url) {
                        let embedUrl = url;
                        // Convert YouTube watch URL to embed URL
                        if (url.includes('youtube.com/watch')) {
                          const videoId = url.split('v=')[1]?.split('&')[0];
                          embedUrl = `https://www.youtube.com/embed/${videoId}`;
                        } else if (url.includes('youtu.be/')) {
                          const videoId = url.split('youtu.be/')[1]?.split('?')[0];
                          embedUrl = `https://www.youtube.com/embed/${videoId}`;
                        }
                        
                        navigator.clipboard.writeText(embedUrl);
                        toast({ 
                          title: 'Embed URL copied!',
                          description: 'Paste this in your lesson content'
                        });
                      }
                    }}
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Paste YouTube, Vimeo, or direct video URLs
                  </p>
                </div>

                <Alert>
                  <AlertDescription className="text-xs space-y-2">
                    <p><strong>YouTube embedding:</strong></p>
                    <ol className="list-decimal list-inside space-y-1">
                      <li>Paste YouTube URL above and blur the input</li>
                      <li>Embed URL will be copied automatically</li>
                      <li>In lesson content, add: <code className="bg-muted px-1 rounded">{'<iframe src="embed-url" width="100%" height="400"></iframe>'}</code></li>
                    </ol>
                  </AlertDescription>
                </Alert>

                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2 text-sm">Example Videos:</h4>
                  <div className="space-y-2 text-xs">
                    <p><strong>Math Tutorial:</strong><br/>
                    <code className="bg-background px-1 py-0.5 rounded">https://youtube.com/watch?v=abc123</code></p>
                    <p><strong>Science Experiment:</strong><br/>
                    <code className="bg-background px-1 py-0.5 rounded">https://youtu.be/xyz789</code></p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Interactive Diagrams Info */}
          <Card>
            <CardHeader>
              <CardTitle>📊 Interactive Diagrams</CardTitle>
              <CardDescription>Use the InteractiveDiagrams component for visual learning</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm">
                  SmartJHS includes an <code className="bg-muted px-1 py-0.5 rounded">InteractiveDiagrams</code> component for subjects like Science, Math, and Social Studies.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">🔬 Science</h4>
                    <ul className="text-xs space-y-1">
                      <li>• Plant cell diagrams</li>
                      <li>• Water cycle animations</li>
                      <li>• Solar system models</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">📐 Mathematics</h4>
                    <ul className="text-xs space-y-1">
                      <li>• Shape properties</li>
                      <li>• Fraction visualizations</li>
                      <li>• Graph plotting</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">🌍 Social Studies</h4>
                    <ul className="text-xs space-y-1">
                      <li>• Ghana map</li>
                      <li>• Regional info</li>
                      <li>• Historical timelines</li>
                    </ul>
                  </div>
                </div>

                <Alert>
                  <AlertDescription className="text-xs">
                    <p className="mb-2"><strong>To add diagrams to lessons:</strong></p>
                    <p>The <code className="bg-muted px-1 rounded">LessonVisual</code> component automatically shows relevant diagrams based on the lesson topic. No manual configuration needed!</p>
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activities" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Practice Activities</CardTitle>
              <CardDescription>
                Create interactive questions for students to practice
              </CardDescription>
            </CardHeader>
            <CardContent>
              <QuestionBuilder
                questions={(lesson.activities as any)?.questions || []}
                onChange={updateActivitiesQuestions}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quiz" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>End of Lesson Quiz</CardTitle>
              <CardDescription>
                Create assessment questions to test understanding
              </CardDescription>
            </CardHeader>
            <CardContent>
              <QuestionBuilder
                questions={lesson.endOfLessonQuiz || []}
                onChange={updateEndQuizQuestions}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="export" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: Summary */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5" />
                    Export Controls
                  </CardTitle>
                  <CardDescription>
                    Validate and export your lesson code
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button onClick={handleGenerateCode} className="w-full" size="lg">
                    <Code className="mr-2 h-4 w-4" />
                    Generate TypeScript Code
                  </Button>

                  {validationErrors.length > 0 && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        <strong>Validation Errors:</strong>
                        <ul className="mt-2 list-disc list-inside">
                          {validationErrors.map((error, idx) => (
                            <li key={idx}>{error}</li>
                          ))}
                        </ul>
                      </AlertDescription>
                    </Alert>
                  )}

                  {summary && (
                    <Card className="bg-muted">
                      <CardHeader>
                        <CardTitle className="text-sm flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          Lesson Summary
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <pre className="text-xs whitespace-pre-wrap font-mono">
                          {summary}
                        </pre>
                      </CardContent>
                    </Card>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right: Generated Code */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      Generated TypeScript Code
                    </span>
                    {generatedCode && (
                      <div className="flex gap-2">
                        <Button onClick={handleCopyCode} variant="outline" size="sm">
                          <Copy className="mr-2 h-4 w-4" />
                          Copy Code
                        </Button>
                      </div>
                    )}
                  </CardTitle>
                  <CardDescription>
                    Copy this code and paste it into {
                      educationLevel === 'Primary' ? 'primary-data.ts' :
                      educationLevel === 'SHS' ? 'shs-data.ts' : 
                      'jhs-data.ts'
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {!generatedCode ? (
                    <div className="text-center text-muted-foreground py-12">
                      <Code className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Click "Generate TypeScript Code" to see the output</p>
                    </div>
                  ) : (
                    <Textarea
                      value={generatedCode}
                      readOnly
                      className="font-mono text-xs min-h-[600px]"
                    />
                  )}
                </CardContent>
              </Card>

              {generatedCode && (
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>How to Update {
                      educationLevel === 'Primary' ? 'primary-data.ts' :
                      educationLevel === 'SHS' ? 'shs-data.ts' : 
                      'jhs-data.ts'
                    }:</strong>
                    <ol className="mt-2 list-decimal list-inside space-y-2 text-sm">
                      <li>Click <strong>"Copy Code"</strong> button above</li>
                      <li>Open <code className="bg-muted px-1 py-0.5 rounded text-xs">src/lib/{
                        educationLevel === 'Primary' ? 'primary-data.ts' :
                        educationLevel === 'SHS' ? 'shs-data.ts' : 
                        'jhs-data.ts'
                      }</code></li>
                      <li>
                        <strong>For NEW lessons:</strong> Navigate to the appropriate subject → {educationLevel === 'Primary' ? 'topic' : 'curriculum level → topic'}, 
                        and add the code to the <code className="bg-muted px-1 rounded text-xs">lessons: []</code> array
                      </li>
                      <li>
                        <strong>For EDITING:</strong> Use Ctrl+F to search for <code className="bg-muted px-1 rounded text-xs">id: '{lesson.id}'</code>, 
                        select the entire lesson object (from opening brace to closing brace + comma), and replace with the new code
                      </li>
                      <li>Save the file - changes will appear immediately (hot reload)</li>
                    </ol>
                    <p className="mt-3 text-xs text-muted-foreground">
                      💡 <strong>Tip:</strong> Each lesson object starts with <code className="bg-muted px-1 rounded">{'{'}</code> and ends with <code className="bg-muted px-1 rounded">{'},'}</code>
                    </p>
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
