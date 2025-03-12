import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import * as Notifications from 'expo-notifications';
import { SchedulableTriggerInputTypes } from 'expo-notifications';

const NotificationContext = createContext(undefined);

export function NotificationProvider({ children }) {
  const [notificationList, setNotificationList] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const processedRef = useRef(new Set());

  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(async (notification) => {
      const id = notification.request.identifier;
      if (processedRef.current.has(id)) return;
      processedRef.current.add(id);

      const content = notification.request.content;
      setNotificationList((prev) => [...prev, content]);
      setUnreadCount((prev) => prev + 1);

      await Notifications.dismissNotificationAsync(id);
      await Notifications.cancelAllScheduledNotificationsAsync();
    });
    return () => subscription.remove();
  }, []);

  const scheduleNotification = useCallback(async () => {
    await Notifications.cancelAllScheduledNotificationsAsync();
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'O Profissional Chegou ao Local!',
        body: 'Entre e confira a localização.',
      },
      trigger: {
        type: SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: 4,
        repeats: false,
      },
    });
  }, []);

  const resetUnread = useCallback(() => {
    setUnreadCount(0);
  }, []);

  const clearAll = useCallback(async () => {
    setNotificationList([]);
    setUnreadCount(0);
    processedRef.current.clear();
    await Notifications.cancelAllScheduledNotificationsAsync();
  }, []);

  // Agendamento de notificação diária 
  useEffect(() => {
    async function scheduleDaily() {
      const scheduled = await Notifications.getAllScheduledNotificationsAsync();
      const dailyNotificationAlreadyScheduled = scheduled.some(noti =>
        noti.content.title === 'Notificação Diária'
      );
      if (!dailyNotificationAlreadyScheduled) {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: 'Notificação Diária',
            body: 'Esta é a notificação diária Agendada',
          },
          trigger: {
            hour: 2,
            minute: 43,
            repeats: true,
          },
        });
      }
    }
    scheduleDaily();
  }, []);

  return (
    <NotificationContext.Provider
      value={{ notificationList, unreadCount, scheduleNotification, resetUnread, clearAll }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification deve ser usado dentro de NotificationProvider');
  }
  return context;
}
