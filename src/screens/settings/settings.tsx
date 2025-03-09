import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function Settings() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-4 pt-4">
        <View className="flex-row items-center justify-between" style={{ marginTop: 30 }}>
          <Text className="text-2xl text-black" style={{ fontFamily: 'Outfit_700Bold' }}>
            Configurações
          </Text>
          <FontAwesome5 name="cog" size={32} color="black" />
        </View>

        <View className="mt-8">
          <TouchableOpacity
            onPress={() => router.push('credits')}
            className="flex-row items-center justify-between border-b border-gray-300 py-4"
          >
            <Text className="text-lg text-black" style={{ fontFamily: 'Outfit_400Regular' }}>
              Créditos
            </Text>
            <FontAwesome5 name="angle-right" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
