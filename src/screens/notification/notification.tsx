// src/screens/notification/notification.tsx
import React, { useCallback } from 'react';
import { View, Text, Button } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { useNotification, NotificationContent } from '../../context/NotificationContext';

export default function NotificationScreen() {
  const { notificationList, scheduleNotification, resetUnread, clearAll } = useNotification();

  // Ao entrar na tela, zera o contador de não lidas
  useFocusEffect(
    useCallback(() => {
      resetUnread();
    }, [resetUnread])
  );

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 18, marginBottom: 12 }}>Notificações</Text>
      {notificationList.map((notif: NotificationContent, i: number) => (
        <View key={i} style={{ marginBottom: 8 }}>
          <Text style={{ fontWeight: 'bold' }}>{notif.title}</Text>
          <Text>{notif.body}</Text>
        </View>
      ))}
      <Button title="Simular Notificação" onPress={scheduleNotification} />
      <Button title="Limpar Lista" onPress={clearAll} />
    </View>
  );
}
