import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';

export interface NotificationContent {
  title: string;
  body: string;
}

interface NotificationContextProps {
  notificationList: NotificationContent[];
  unreadCount: number;
  scheduleNotification: () => Promise<void>;
  resetUnread: () => void;
  clearAll: () => Promise<void>;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notificationList, setNotificationList] = useState<NotificationContent[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const processedRef = useRef(new Set<string>());

  useEffect(() => {
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        sound: 'default',
      });
    }
  }, []);

  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(async (notification) => {
      const id = notification.request.identifier;
      if (processedRef.current.has(id)) return;
      processedRef.current.add(id);
      const content = notification.request.content as NotificationContent;
      setNotificationList(prev => [...prev, content]);
      setUnreadCount(prev => prev + 1);
      await Notifications.dismissNotificationAsync(id);
    });
    return () => subscription.remove();
  }, []);

  const scheduleNotification = useCallback(async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Essa é uma notificação Simulada',
        body: 'Equipe do DoumHelp',
      },
      trigger: {
        type: "timeInterval",
        seconds: 4,
        repeats: false,
      } as Notifications.TimeIntervalTriggerInput,
    });
  }, []);

  const resetUnread = useCallback(() => setUnreadCount(0), []);

  const clearAll = useCallback(async () => {
    setNotificationList([]);
    setUnreadCount(0);
    processedRef.current.clear();
    await Notifications.cancelAllScheduledNotificationsAsync();
  }, []);

  useEffect(() => {
    async function scheduleDaily() {
      const scheduled = await Notifications.getAllScheduledNotificationsAsync();
      const dailyNotificationAlreadyScheduled = scheduled.some(noti =>
        noti.content.title === 'Notificação Diária'
      );
      if (!dailyNotificationAlreadyScheduled) {
        const trigger = Platform.OS === 'android'
          ? ({ type: "daily", hour: 0, minute: 8 } as Notifications.DailyTriggerInput)
          : ({ type: "calendar", repeats: true, hour: 0, minute: 8, second: 1 } as Notifications.CalendarTriggerInput);
        await Notifications.scheduleNotificationAsync({
          content: {
            title: 'Notificação Diária',
            body: 'Esta é a notificação diária',
          },
          trigger,
        });
      }
    }
    scheduleDaily();
  }, []);

  return (
    <NotificationContext.Provider value={{ notificationList, unreadCount, scheduleNotification, resetUnread, clearAll }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) throw new Error('useNotification deve ser usado dentro de NotificationProvider');
  return context;
}
