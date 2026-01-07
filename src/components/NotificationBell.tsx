'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Bell, Check, Trash2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { useFirebase } from '@/firebase/provider';
import { collection } from 'firebase/firestore';
import { useCollection } from '@/firebase';
import type { WithId } from '@/firebase/use-collection';
import { showNotification } from '@/lib/notifications';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { useRouter } from 'next/navigation';

export default function NotificationBell() {
  const { firestore, user } = useFirebase();
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  type FirestoreNotification = {
    type: string;
    title: string;
    message: string;
    data?: any;
    actionUrl?: string;
    read: boolean;
    createdAt?: any;
  };

  const notifQuery = useMemo(() => {
    if (!firestore || !user) return null;
    return collection(firestore, 'users', user.uid, 'notifications');
  }, [firestore, user]);

  const { data: notifications } = useCollection<FirestoreNotification>(notifQuery as any);

  const prevIdsRef = useRef<string[]>([]);

  useEffect(() => {
    if (!notifications) {
      setUnreadCount(0);
      return;
    }

    const unread = notifications.filter(n => !n.read);
    setUnreadCount(unread.length);

    // Detect new notifications (by id) since last render
    const currentIds = notifications.map(n => (n as WithId<FirestoreNotification>).id);
    const prevIds = prevIdsRef.current;

    const newIds = currentIds.filter(id => !prevIds.includes(id));
    if (newIds.length > 0) {
      // For each new unread challenge_invite, fire a browser notification
      notifications.forEach(n => {
        const notif = n as WithId<FirestoreNotification>;
        if (
          newIds.includes(notif.id) &&
          !notif.read &&
          notif.type === 'challenge_invite'
        ) {
          // This will only show if user has granted permission & enabled notifications
          showNotification(notif.title, notif.message, 'quiz', {
            actionUrl: notif.actionUrl,
            challengeId: notif.data?.challengeId,
          }).catch(() => {
            // Best-effort only; ignore errors
          });
        }
      });
    }

    prevIdsRef.current = currentIds;
  }, [notifications]);

  const handleNotificationClick = (notification: WithId<FirestoreNotification>) => {
    setIsOpen(false);
    
    if (notification.actionUrl) {
      router.push(notification.actionUrl);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 h-2.5 w-2.5 rounded-full bg-red-600 border-2 border-background" />
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b">
          <h4 className="font-semibold">Notifications</h4>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs h-auto p-1"
              onClick={handleMarkAllRead}
            >
              Mark all read
            </Button>
          )}
        </div>
        <ScrollArea className="h-[300px]">
          {!notifications || notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center text-muted-foreground">
              <Bell className="h-8 w-8 mb-2 opacity-20" />
              <p className="text-sm">No notifications yet</p>
            </div>
          ) : (
            <div className="divide-y">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 hover:bg-muted/50 transition-colors cursor-pointer relative group ${
                    !notification.read ? 'bg-muted/20' : ''
                  }`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className="flex items-start gap-3">
                    <div className={`mt-1 h-2 w-2 rounded-full shrink-0 ${
                      !notification.read ? 'bg-blue-600' : 'bg-transparent'
                    }`} />
                    <div className="flex-1 space-y-1">
                      <p className={`text-sm leading-none ${!notification.read ? 'font-semibold' : ''}`}>
                        {notification.title}
                      </p>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {notification.message}
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity -mr-2 -mt-2"
                      onClick={(e) => handleDelete(notification.id, e)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
        <div className="p-2 border-t text-center">
          <Link 
            href="/notifications" 
            className="text-xs text-primary hover:underline"
            onClick={() => setIsOpen(false)}
          >
            View all notifications
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
}
