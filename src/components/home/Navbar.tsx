// components/Navbar.tsx
import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

type NavbarProps = {
  address: string;
  fontRegular?: string;
  fontBold?: string;
};

export function Navbar({ address, fontRegular, fontBold }: NavbarProps) {
  return (
    <View className="flex-row items-center px-4 py-2 bg-white shadow justify-between">
      <Pressable className="p-2">
        <MaterialIcons name="menu" size={24} color="black" />
      </Pressable>
      <Text className="text-base text-black" style={{ fontFamily: fontBold }}>
        {address}
      </Text>
      <View className="flex-row">
        <Pressable className="p-2 mr-2">
          <MaterialIcons name="chat" size={24} color="black" />
        </Pressable>
        <Pressable className="p-2">
          <MaterialIcons name="person-outline" size={24} color="black" />
        </Pressable>
      </View>
    </View>
  );
}
