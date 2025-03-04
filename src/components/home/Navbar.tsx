import React from 'react';
import { View, Text, Pressable, SafeAreaView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useNotification } from '../../context/NotificationContext';

type NavbarProps = {
  address: string;
  fontRegular?: string;
  fontBold?: string;
};

export function Navbar({ address, fontRegular, fontBold }: NavbarProps) {
  const router = useRouter();
  const { unreadCount } = useNotification();

  return (
    <>
      {/* SafeAreaView para garantir a área segura, com fundo branco */}
      <SafeAreaView className="bg-white">
        <StatusBar style="dark" translucent />
      </SafeAreaView>
      {/* Container principal da Navbar */}
      <View className="flex-row items-center justify-between px-4 py-2 bg-white shadow-md">
        <Pressable className="p-2">
          <FontAwesome5 name="bars" size={20} color="black" />
        </Pressable>

        <Text
          className="text-base text-black"
          style={fontBold ? { fontFamily: fontBold } : {}}
        >
          {address}
        </Text>

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

          <Pressable className="p-2">
            <FontAwesome5 name="user" size={20} color="black" />
          </Pressable>
        </View>
      </View>
    </>
  );
}
