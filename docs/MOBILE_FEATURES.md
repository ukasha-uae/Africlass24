# Mobile App Features Documentation

## Overview
SmartJHS now includes advanced mobile app features including push notifications, enhanced dark mode, and gesture navigation for an optimal mobile learning experience.

---

## 🔔 Push Notifications & Study Reminders

### Features
- **Browser-based notifications** using Web Notification API
- **Daily study reminders** at customizable times
- **Streak protection alerts** when you haven't studied
- **Achievement unlocked notifications** with XP rewards
- **Quiz reminders** to encourage practice
- **Lesson completion suggestions** for next steps

### Setup
1. Navigate to `/notifications` or click the bell icon in header
2. Click "Enable Notifications" button
3. Grant permission when browser prompts
4. Customize your notification preferences

### Notification Types
| Type | Default Time | Purpose |
|------|-------------|---------|
| Daily Study | 6:00 PM | Remind to study daily |
| Streak Alert | 8:00 PM | Prevent streak breaks |
| Achievement | Instant | Celebrate milestones |
| Quiz Reminder | Variable | Encourage practice |
| Lesson Complete | Instant | Suggest next lesson |

### Preferences
- **Master Switch**: Turn all notifications on/off
- **Sound**: Enable/disable notification sounds
- **Vibration**: Enable/disable vibration (mobile)
- **Per-type Controls**: Enable specific notification types

### Technical Implementation

**File:** `src/lib/notifications.ts` (320 lines)
```typescript
// Request permission
const permission = await requestNotificationPermission();

// Show notification
showNotification(
  'Study Time! 📚',
  'Complete a lesson to maintain your streak',
  'daily'
);

// Schedule reminder
addStudyReminder({
  type: 'daily',
  title: 'Study Reminder',
  message: 'Time to learn!',
  scheduledTime: new Date().toISOString(),
  enabled: true,
  recurrence: 'daily',
});
```

**Preferences Storage:** localStorage `notificationPreferences`
**Reminders Storage:** localStorage `studyReminders`

### Browser Support
- ✅ Chrome 42+
- ✅ Firefox 44+
- ✅ Safari 16+ (iOS 16.4+)
- ✅ Edge 79+
- ❌ IE (not supported)

### Service Worker
Service worker handles background notifications:
- **File:** `public/notification-sw.js`
- **Push Events**: Receive and display notifications
- **Click Handling**: Open app on notification click
- **Background Sync**: Sync offline quiz attempts

---

## 🌙 Enhanced Dark Mode

### Features
- **3 Theme Modes**: Light, Dark, System (auto)
- **Smooth Transitions**: 0.3s ease on all color changes
- **Improved Contrast**: Better readability in dark mode
- **Persistent Selection**: Saves preference to localStorage
- **System Integration**: Respects OS dark mode preference

### Color Scheme (Dark Mode)
```css
--background: 222 47% 11%     /* Deep blue-gray */
--foreground: 210 40% 98%     /* Bright white */
--primary: 217 91% 60%        /* Vibrant blue */
--card: 222 47% 14%           /* Slightly lighter than background */
--muted: 217 33% 17%          /* Subtle contrast */
```

### Theme Toggle
Located in header navigation:
- Sun icon = Light mode active
- Moon icon = Dark mode active
- Monitor icon = System preference

### How to Use
1. Click sun/moon icon in header
2. Select theme from dropdown:
   - **Light**: Always light theme
   - **Dark**: Always dark theme
   - **System**: Follow OS setting

### Code Implementation

**Component:** `src/components/ThemeToggle.tsx`
```typescript
const handleThemeChange = (newTheme: Theme) => {
  setTheme(newTheme);
  localStorage.setItem('theme', newTheme);
  applyTheme(newTheme);
};
```

**CSS Enhancements:** `src/app/globals.css`
- Smooth color transitions
- Dark mode scrollbar styling
- Image opacity adjustments
- Code block backgrounds

### Dark Mode Improvements
1. **Better Contrast**: 47% lightness background vs 10% before
2. **Vibrant Primary**: Blue accent (217° 91% 60%)
3. **Smooth Transitions**: All colors transition over 0.3s
4. **Typography**: Optimized for readability
5. **Images**: Subtle opacity (0.9) to reduce glare

---

## 👆 Gesture Navigation

### Features
- **Swipe to Navigate**: Navigate between lessons/questions
- **Pull to Refresh**: Swipe down from top to refresh
- **Visual Feedback**: Animated indicators show swipe progress
- **Touch Optimized**: 44px minimum tap targets
- **Momentum Detection**: Recognizes fast vs slow swipes

### Gesture Types

#### Horizontal Swipes
- **Swipe Left**: Next lesson/question
- **Swipe Right**: Previous lesson/question
- **Threshold**: 50px minimum distance

#### Vertical Swipes
- **Swipe Down** (top of page): Pull to refresh
- **Swipe Up**: (Reserved for future features)
- **Threshold**: 100px for refresh

### Components

#### SwipeableCard
Perfect for quiz questions and flashcards:
```tsx
<SwipeableCard
  onSwipeLeft={handleNext}
  onSwipeRight={handlePrevious}
  currentIndex={currentIndex}
  totalCount={totalQuestions}
>
  <QuestionContent />
</SwipeableCard>
```

**Features:**
- Progress dots indicator
- Navigation buttons (fallback)
- "Swipe to navigate" hint
- Animated transitions

#### GestureNavigationWrapper
Wraps entire pages for navigation:
```tsx
<GestureNavigationWrapper
  nextUrl="/subjects/math/algebra/lesson-2"
  previousUrl="/subjects/math/algebra/lesson-1"
  onRefresh={() => window.location.reload()}
>
  <LessonContent />
</GestureNavigationWrapper>
```

### Configuration
```typescript
useSwipeGesture(handlers, {
  minSwipeDistance: 50,      // Minimum pixels to trigger
  maxSwipeTime: 300,         // Maximum ms for valid swipe
  preventDefaultTouchmoveEvent: false
});
```

### Visual Indicators
- **Progress Dots**: Show position in carousel
- **Swipe Arrow**: Appears during swipe gesture
- **Fade Effect**: Opacity increases with swipe distance

### Code Files
- **Hook:** `src/hooks/use-swipe-gesture.tsx` (200+ lines)
- **Card:** `src/components/SwipeableCard.tsx` (178 lines)
- **Wrapper:** `src/components/GestureNavigationWrapper.tsx` (35 lines)

### Mobile Optimizations
```css
/* Touch target sizing */
.mobile-tap-target {
  min-height: 44px;
  min-width: 44px;
}

/* Safe area support */
.mobile-padding {
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
}

/* Touch feedback */
.gesture-active {
  @apply scale-95 transition-transform duration-150;
}
```

---

## 📱 PWA Enhancements

### Service Worker Updates
- **Offline Caching**: Lessons cached for offline access
- **Background Sync**: Queue quiz attempts when offline
- **Push Support**: Receive notifications even when app closed
- **Update Strategy**: Network-first for pages, cache-first for assets

### Installation
SmartJHS can be installed as a Progressive Web App:

**iOS (Safari):**
1. Tap Share button
2. Select "Add to Home Screen"
3. Confirm installation

**Android (Chrome):**
1. Tap menu (⋮)
2. Select "Install app" or "Add to Home Screen"
3. Confirm installation

### Manifest
```json
{
  "name": "SmartJHS",
  "short_name": "SmartJHS",
  "theme_color": "#3b82f6",
  "background_color": "#0f172a",
  "display": "standalone",
  "icons": [
    {
      "src": "/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ]
}
```

---

## 🎨 UI/UX Improvements

### Touch Optimizations
- **Tap Highlight**: Removed for cleaner experience
- **Touch Action**: `manipulation` prevents double-tap zoom
- **Active States**: Scale down on tap for tactile feedback
- **Safe Areas**: Respects notches and home indicators

### Performance
- **Hardware Acceleration**: Transform-based animations
- **Will-Change**: Optimized for frequently animated elements
- **Debouncing**: Touch events throttled for better performance
- **Lazy Loading**: Images and components load on demand

### Accessibility
- **Screen Reader Support**: All interactive elements labeled
- **Keyboard Navigation**: Full keyboard support
- **Focus Indicators**: Clear focus states
- **Color Contrast**: WCAG AA compliant in both themes

---

## 🧪 Testing Checklist

### Notifications
- [ ] Permission request shows correctly
- [ ] Notifications appear with correct content
- [ ] Sound/vibration respect preferences
- [ ] Test notification works
- [ ] Scheduled reminders fire at correct time
- [ ] Streak reminder shows when inactive

### Dark Mode
- [ ] Theme persists on page reload
- [ ] System theme auto-detection works
- [ ] Smooth transitions between themes
- [ ] All components readable in dark mode
- [ ] Images not too bright in dark mode
- [ ] Charts/graphs visible in dark mode

### Gestures
- [ ] Swipe left/right navigates correctly
- [ ] Swipe threshold feels natural
- [ ] Visual indicators show during swipe
- [ ] Pull to refresh works at top of page
- [ ] Navigation buttons work as fallback
- [ ] Doesn't interfere with normal scrolling

### Mobile
- [ ] Tap targets are 44px+
- [ ] No accidental zooming
- [ ] Safe areas respected on notched phones
- [ ] Landscape orientation works
- [ ] Keyboard doesn't break layout
- [ ] PWA installable

---

## 🐛 Troubleshooting

### Notifications Not Working
**Issue:** No permission prompt
**Solution:** Check browser supports notifications, clear site data, retry

**Issue:** Permission denied
**Solution:** Reset site permissions in browser settings

**Issue:** Scheduled reminders not firing
**Solution:** Keep browser tab open or install as PWA

### Dark Mode Issues
**Issue:** Theme not persisting
**Solution:** Check localStorage not disabled, clear browser cache

**Issue:** Flash of wrong theme on load
**Solution:** Normal behavior, theme applies after hydration

### Gesture Problems
**Issue:** Swipes not detected
**Solution:** Ensure minimum distance (50px) and time (<300ms)

**Issue:** Interfering with scrolling
**Solution:** Gestures detect scroll vs swipe automatically

**Issue:** Works on desktop
**Solution:** Touch events only fire on touch devices

---

## 📊 Usage Statistics

### Notification Engagement
Track with:
```typescript
const stats = getNotificationStats();
// Returns: { totalReminders, activeReminders, notificationsEnabled, permission }
```

### Theme Usage
```typescript
localStorage.getItem('theme'); // 'light', 'dark', or 'system'
```

### Gesture Analytics
Hook provides:
```typescript
const { swipeProgress, swipeDirection, isActive } = useSwipeNavigation();
```

---

## 🚀 Future Enhancements

### Planned Features
1. **Haptic Feedback API**: Richer vibration patterns
2. **Badge API**: Show unread notifications count on app icon
3. **Share Target**: Share content to SmartJHS from other apps
4. **Shortcuts API**: Quick actions from home screen
5. **Periodic Background Sync**: Auto-update content

### Experimental
- **Web Bluetooth**: Connect learning devices
- **WebRTC**: Video lessons and tutoring
- **WebAssembly**: Faster offline mode
- **Web Speech**: Voice commands

---

## 📚 API Reference

### Notifications
```typescript
// Permission
requestNotificationPermission(): Promise<NotificationPermission>
supportsNotifications(): boolean

// Display
showNotification(title, body, type, data): Promise<void>

// Reminders
addStudyReminder(reminder): StudyReminder
updateStudyReminder(id, updates): void
deleteStudyReminder(id): void
toggleStudyReminder(id): void

// Preferences
getNotificationPreferences(): NotificationPreferences
saveNotificationPreferences(prefs): void
```

### Theme
```typescript
// ThemeToggle component
<ThemeToggle />

// Manual control
applyTheme(theme: 'light' | 'dark' | 'system'): void
```

### Gestures
```typescript
// Hooks
useSwipeGesture(handlers, config): SwipeHandlers
useSwipeNavigation(options): NavigationState
useSwipeGestureRef(ref, handlers, config): void

// Components
<SwipeableCard {...props} />
<SwipeableCarousel {...props} />
<GestureNavigationWrapper {...props} />
```

---

**Last Updated:** December 6, 2025
**Version:** 2.0
**Compatibility:** iOS 16.4+, Android 5.0+, Modern browsers
