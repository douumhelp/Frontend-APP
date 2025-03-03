import { Stack } from 'expo-router';
import '../../src/styles/global.css'; // tailwind css (não apagar)
import { NotificationProvider } from '../../src/context/NotificationContext';

export default function Layout() {
  return (
    <NotificationProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </NotificationProvider>
  );
}
