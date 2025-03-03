import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
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
    <View className="flex-row items-center px-4 py-2 bg-white shadow justify-between">
      <Pressable className="p-2">
        <FontAwesome5 name="bars" size={20} color="black" />
      </Pressable>

      <Text className="text-base text-black" style={{ fontFamily: fontBold }}>
        {address}
      </Text>

      <View className="flex-row">
        <Pressable className="p-2 mr-2" onPress={() => router.push('notification')}>
          <FontAwesome5 name="bell" size={20} color="black" />
          {unreadCount > 0 && (
            <View
              style={{
                position: 'absolute',
                top: 2,
                right: 2,
                backgroundColor: 'red',
                width: 16,
                height: 16,
                borderRadius: 8,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={{ color: 'white', fontSize: 10 }}>{unreadCount}</Text>
            </View>
          )}
        </Pressable>

        <Pressable className="p-2">
          <FontAwesome5 name="user" size={20} color="black" />
        </Pressable>
      </View>
    </View>
  );
}
