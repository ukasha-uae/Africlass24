// Lesson bookmarks and notes functionality

export interface LessonNote {
  lessonId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface LessonBookmark {
  lessonId: string;
  lessonTitle: string;
  subject: string;
  topic: string;
  bookmarkedAt: string;
  href: string;
}

export interface LessonHighlight {
  lessonId: string;
  sectionId: string;
  text: string;
  color: string;
  createdAt: string;
}

export interface StudyChecklistItem {
  id: string;
  lessonId: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

// Bookmarks
export const getBookmarks = (): LessonBookmark[] => {
  if (typeof window === 'undefined') return [];
  const saved = localStorage.getItem('lessonBookmarks');
  return saved ? JSON.parse(saved) : [];
};

export const addBookmark = (bookmark: LessonBookmark) => {
  if (typeof window === 'undefined') return;
  const bookmarks = getBookmarks();
  const exists = bookmarks.find(b => b.lessonId === bookmark.lessonId);
  if (!exists) {
    bookmarks.push(bookmark);
    localStorage.setItem('lessonBookmarks', JSON.stringify(bookmarks));
  }
};

export const removeBookmark = (lessonId: string) => {
  if (typeof window === 'undefined') return;
  const bookmarks = getBookmarks().filter(b => b.lessonId !== lessonId);
  localStorage.setItem('lessonBookmarks', JSON.stringify(bookmarks));
};

export const isBookmarked = (lessonId: string): boolean => {
  return getBookmarks().some(b => b.lessonId === lessonId);
};

// Notes
export const getNotes = (): LessonNote[] => {
  if (typeof window === 'undefined') return [];
  const saved = localStorage.getItem('lessonNotes');
  return saved ? JSON.parse(saved) : [];
};

export const getLessonNote = (lessonId: string): LessonNote | undefined => {
  return getNotes().find(n => n.lessonId === lessonId);
};

export const saveNote = (note: LessonNote) => {
  if (typeof window === 'undefined') return;
  const notes = getNotes();
  const index = notes.findIndex(n => n.lessonId === note.lessonId);
  
  if (index >= 0) {
    notes[index] = { ...note, updatedAt: new Date().toISOString() };
  } else {
    notes.push({ ...note, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
  }
  
  localStorage.setItem('lessonNotes', JSON.stringify(notes));
};

export const deleteNote = (lessonId: string) => {
  if (typeof window === 'undefined') return;
  const notes = getNotes().filter(n => n.lessonId !== lessonId);
  localStorage.setItem('lessonNotes', JSON.stringify(notes));
};

// Highlights
export const getHighlights = (lessonId?: string): LessonHighlight[] => {
  if (typeof window === 'undefined') return [];
  const saved = localStorage.getItem('lessonHighlights');
  const all = saved ? JSON.parse(saved) : [];
  return lessonId ? all.filter((h: LessonHighlight) => h.lessonId === lessonId) : all;
};

export const addHighlight = (highlight: LessonHighlight) => {
  if (typeof window === 'undefined') return;
  const highlights = getHighlights();
  highlights.push({ ...highlight, createdAt: new Date().toISOString() });
  localStorage.setItem('lessonHighlights', JSON.stringify(highlights));
};

export const removeHighlight = (lessonId: string, sectionId: string) => {
  if (typeof window === 'undefined') return;
  const highlights = getHighlights().filter(
    h => !(h.lessonId === lessonId && h.sectionId === sectionId)
  );
  localStorage.setItem('lessonHighlights', JSON.stringify(highlights));
};

// Study Checklist
export const getChecklist = (lessonId?: string): StudyChecklistItem[] => {
  if (typeof window === 'undefined') return [];
  const saved = localStorage.getItem('studyChecklist');
  const all = saved ? JSON.parse(saved) : [];
  return lessonId ? all.filter((item: StudyChecklistItem) => item.lessonId === lessonId) : all;
};

export const addChecklistItem = (item: Omit<StudyChecklistItem, 'id' | 'createdAt'>) => {
  if (typeof window === 'undefined') return;
  const checklist = getChecklist();
  const newItem: StudyChecklistItem = {
    ...item,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  checklist.push(newItem);
  localStorage.setItem('studyChecklist', JSON.stringify(checklist));
  return newItem;
};

export const toggleChecklistItem = (id: string) => {
  if (typeof window === 'undefined') return;
  const checklist = getChecklist();
  const item = checklist.find(i => i.id === id);
  if (item) {
    item.completed = !item.completed;
    localStorage.setItem('studyChecklist', JSON.stringify(checklist));
  }
};

export const deleteChecklistItem = (id: string) => {
  if (typeof window === 'undefined') return;
  const checklist = getChecklist().filter(i => i.id !== id);
  localStorage.setItem('studyChecklist', JSON.stringify(checklist));
};
