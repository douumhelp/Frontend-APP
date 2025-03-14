import React, { useState } from 'react';
import { View, Text, Pressable, SafeAreaView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useNotification } from '../../context/NotificationContext';
import { useHome } from '../../hooks/useHome';
import { Menu } from './SideMenu';

type NavbarProps = {
  fontRegular?: string;
  fontBold?: string;
};

export function Navbar({ fontRegular, fontBold }: NavbarProps) {
  const router = useRouter();
  const { unreadCount } = useNotification();
  const { address } = useHome();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <Menu
        isVisible={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        fontRegular={fontRegular || 'Outfit_400Regular'}
        fontBold={fontBold || 'Outfit_700Bold'}
      />

      <SafeAreaView className="bg-white">
        <StatusBar style="dark" translucent />
      </SafeAreaView>
      <View className="flex-row items-center justify-between px-4 py-2 bg-white shadow-md">
        <Pressable className="p-2" onPress={() => setIsMenuOpen(true)}>
          <FontAwesome5 name="bars" size={20} color="black" />
        </Pressable>

        <Pressable onPress={() => router.push('adresses')}>
          <Text
            className="text-base text-black"
            style={fontBold ? { fontFamily: fontBold } : {}}
          >
            {address}
          </Text>
        </Pressable>

        <View className="flex-row">
          <Pressable
            className="p-2 mr-2 relative"
            onPress={() => router.push('notification')}
          >
            <FontAwesome5 name="bell" size={20} color="black" />
            {unreadCount > 0 && (
              <View className="absolute top-[2px] right-[2px] bg-red-500 w-4 h-4 rounded-full justify-center items-center">
                <Text className="text-white text-[10px]">{unreadCount}</Text>
              </View>
            )}
          </Pressable>

          <Pressable className="p-2" onPress={() => router.push('perfil')}>
            <FontAwesome5 name="user" size={20} color="black" />
          </Pressable>
        </View>
      </View>
    </>
  );
}
