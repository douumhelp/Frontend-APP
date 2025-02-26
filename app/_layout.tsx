import { Stack } from 'expo-router';
import '../src/styles/global.css';

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }} />
  );
}