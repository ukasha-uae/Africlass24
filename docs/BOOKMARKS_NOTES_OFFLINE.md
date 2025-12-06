# Lesson Bookmarks, Notes & Offline Mode

## Overview
This feature set allows students to personalize their learning experience by bookmarking favorite lessons, taking personal notes, creating study checklists, and saving content for offline access.

## Features Implemented

### 1. **Lesson Bookmarks**
- **Bookmark Button**: Located in the lesson header with toggle functionality
- **Visual Indicators**: 📌 badge shows when a lesson is bookmarked
- **Quick Access**: Dedicated bookmarks page (`/bookmarks`) to view all saved lessons
- **Organization**: Bookmarks grouped by subject with stats (total, subjects, this week)
- **Management**: Easy remove functionality from both lesson page and bookmarks page

**How to use:**
1. Navigate to any lesson
2. Click the "Bookmark" button in the top-right corner
3. Access all bookmarks from the Profile page or directly at `/bookmarks`
4. Click "Continue Learning" to resume a bookmarked lesson

### 2. **Personal Notes**
- **Note Editor**: Collapsible textarea for adding personal study notes
- **Auto-save**: Notes are saved to localStorage per lesson
- **Persistent**: Notes reload when you revisit the lesson
- **Toggle View**: Show/hide notes panel to reduce clutter

**How to use:**
1. Open any lesson
2. Find the "My Notes" card in the sidebar
3. Click "Show" to expand the editor
4. Type your notes and click "Save Note"
5. Notes are automatically loaded when you return to the lesson

### 3. **Study Checklist**
- **Task Management**: Add custom checklist items for each lesson
- **Progress Tracking**: Visual counter shows X/Y completed items
- **Interactive**: Click checkbox to mark items complete (strikethrough effect)
- **Quick Delete**: Remove items with the × button
- **Persistence**: All items saved to localStorage per lesson

**How to use:**
1. Scroll to "Study Checklist" card in lesson sidebar
2. Type a task in the input field (e.g., "Review key concepts")
3. Press Enter or click "Add"
4. Check/uncheck boxes to track completion
5. Delete items you no longer need

### 4. **Offline Mode**
- **Save for Offline**: Download full lesson content to device
- **Visual Indicator**: 💾 badge shows offline-available lessons
- **Storage Management**: Track how much space you're using
- **Quiz Queue**: Automatically queues quiz attempts when offline (sync when online)
- **Manual Sync**: Sync button to upload queued data

**How to use:**
1. Click "Save Offline" button in lesson header
2. Lesson content is stored in browser localStorage
3. Access saved lessons even without internet
4. When back online, sync button appears to upload queued quizzes

## Technical Implementation

### Data Storage
All data is stored in browser **localStorage** for immediate access:

```javascript
// Storage keys
- lessonBookmarks: Array of bookmark objects
- lessonNotes: Array of note objects
- lessonHighlights: Array of highlight objects (future feature)
- studyChecklists: Array of checklist item objects
- offlineLessons: Array of saved lesson content
- offlineQuizAttempts: Array of queued quiz attempts
```

### Utility Libraries

**`src/lib/lesson-tools.ts`**
- Bookmark CRUD operations
- Notes management
- Highlights (prepared for future)
- Checklist management
- All functions include SSR checks (`typeof window === 'undefined'`)

**`src/lib/offline-storage.ts`**
- Offline lesson saving/loading
- Quiz attempt queuing
- Online status detection (`navigator.onLine`)
- Sync functionality (placeholder for Firestore integration)
- Storage size calculation

### UI Components

**Lesson Page (`[lessonSlug]/page.tsx`)**
- Bookmark/Offline buttons in header
- Status badges (📌 Bookmarked, 💾 Offline)
- Collapsible notes card with textarea
- Study checklist with add/toggle/delete actions
- Toast notifications for user feedback

**Bookmarks Page (`/bookmarks/page.tsx`)**
- Grid of bookmarked lessons grouped by subject
- Stats cards (total, subjects, this week)
- Quick navigation to lessons
- Remove bookmark functionality
- Empty state with browse subjects CTA

## Future Enhancements

### Planned Features
1. **Text Highlighting**: Select text in lessons to highlight in different colors
2. **Firestore Sync**: Sync bookmarks/notes across devices via Firebase
3. **Export Notes**: Download notes as PDF or text file
4. **Share Bookmarks**: Share favorite lessons with classmates
5. **Smart Notifications**: Reminders to review bookmarked lessons
6. **Search Notes**: Full-text search across all your notes

### Performance Optimizations
- Implement virtual scrolling for large bookmark lists
- Add IndexedDB for larger offline storage
- Compress lesson content before offline storage
- Add service worker for true PWA offline functionality

## Testing Checklist

- [x] Bookmark a lesson and verify it appears on bookmarks page
- [x] Remove bookmark from lesson page and bookmarks page
- [x] Add and save notes, reload page to verify persistence
- [x] Create checklist items, toggle completion, delete items
- [x] Save lesson offline and verify badge appears
- [x] Remove offline lesson and verify badge disappears
- [ ] Test offline quiz queue (requires network throttling)
- [ ] Test sync functionality when back online
- [ ] Verify localStorage limits (typically 5-10MB per domain)

## Browser Compatibility

**Supported:**
- Chrome 90+ ✅
- Firefox 88+ ✅
- Safari 14+ ✅
- Edge 90+ ✅

**Required APIs:**
- localStorage (universally supported)
- navigator.onLine (all modern browsers)
- navigator.clipboard (for copy linking code)

## Storage Limits

**localStorage quota:** ~5-10MB per domain (browser dependent)

**Estimated usage:**
- 1 bookmark: ~500 bytes
- 1 note: ~1-5KB (varies by length)
- 1 offline lesson: ~10-50KB (varies by content)
- 1 checklist item: ~200 bytes

**Recommendation:** Save 10-20 lessons offline comfortably within limits

## Troubleshooting

### Issue: Bookmarks not appearing
**Solution:** Check browser localStorage isn't disabled. Open DevTools → Application → Local Storage

### Issue: Notes not saving
**Solution:** Ensure lesson has loaded fully before typing. Check for console errors.

### Issue: Offline lesson not working without internet
**Solution:** Verify localStorage has the lesson data. May need to re-save if browser cache cleared.

### Issue: Storage quota exceeded
**Solution:** Remove old offline lessons or clear browser cache. Consider deleting unused bookmarks/notes.

## Code Examples

### Adding a bookmark programmatically
```typescript
import { addBookmark } from '@/lib/lesson-tools';

addBookmark({
  lessonId: 'lesson-123',
  lessonTitle: 'Introduction to Algebra',
  subject: 'Mathematics',
  topic: 'Basic Algebra',
  bookmarkedAt: new Date().toISOString(),
  href: '/subjects/mathematics/algebra/intro'
});
```

### Checking if lesson is bookmarked
```typescript
import { isBookmarked } from '@/lib/lesson-tools';

const bookmarked = isBookmarked('lesson-123'); // returns boolean
```

### Saving a lesson offline
```typescript
import { saveOfflineLesson } from '@/lib/offline-storage';

saveOfflineLesson({
  lessonId: 'lesson-123',
  lessonTitle: 'Introduction to Algebra',
  subject: 'Mathematics',
  topic: 'Basic Algebra',
  content: fullLessonObject // entire lesson data
});
```

## API Reference

See inline JSDoc comments in:
- `src/lib/lesson-tools.ts`
- `src/lib/offline-storage.ts`

## Contributing

When adding new features:
1. Update utility functions in lesson-tools.ts or offline-storage.ts
2. Add UI components to relevant pages
3. Include toast notifications for user feedback
4. Test localStorage persistence across page reloads
5. Update this documentation

---

**Last Updated:** 2025
**Version:** 1.0
**Author:** SmartJHS Development Team
