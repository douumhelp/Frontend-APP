import { ReactNode } from 'react';

export interface NotificationContent {
  title: string;
  body: string;
}

export interface NotificationContextProps {
  notificationList: NotificationContent[];
  unreadCount: number;
  scheduleNotification: () => Promise<void>;
  resetUnread: () => void;
  clearAll: () => Promise<void>;
}

export function NotificationProvider({ children }: { children: ReactNode }): JSX.Element;

export function useNotification(): NotificationContextProps;
