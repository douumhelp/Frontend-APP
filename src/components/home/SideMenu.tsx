import React, { useEffect } from 'react';
import { View, Text, Pressable, TouchableOpacity, SafeAreaView } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

type MenuProps = {
  isVisible: boolean;
  onClose: () => void;
  fontRegular: string;
  fontBold: string;
};

export function Menu({ isVisible, onClose, fontRegular, fontBold }: MenuProps): JSX.Element | null {
  const router = useRouter();
  const CLOSED_OFFSET = -256;
  const OPEN_OFFSET = 0;
  const translateX = useSharedValue(CLOSED_OFFSET);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  useEffect(() => {
    translateX.value = withSpring(isVisible ? OPEN_OFFSET : CLOSED_OFFSET, {
      damping: 15,
      stiffness: 100,
    });
  }, [isVisible, translateX]);

  if (!isVisible) {
    return null;
  }

  return (
    <View className="absolute inset-0 z-50">
      {/* Overlay transparente para capturar toque */}
      <Pressable className="absolute inset-0 bg-transparent" onPress={onClose} />
      
      <Animated.View 
        className="w-64 h-full bg-white rounded-r-2xl shadow-2xl"
        style={animatedStyle}
      >
        <SafeAreaView>
          <View className="p-4">
            <View className="flex-row justify-between items-center mb-8 mt-2.5">
              <Text className="text-xl text-gray-800" style={{ fontFamily: fontBold }}>
                Menu
              </Text>
              <TouchableOpacity onPress={onClose} className="mt-2.5">
                <FontAwesome5 name="times" size={24} color="#4b5563" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              className="flex-row items-center py-3 px-4 bg-gray-100 rounded-lg"
              onPress={() => {
                router.push('settings');
                onClose();
              }}
            >
              <FontAwesome5 name="cog" size={20} color="#4b5563" style={{ marginRight: 16 }} />
              <Text className="text-lg text-gray-800" style={{ fontFamily: fontRegular }}>
                Configurações
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Animated.View>
    </View>
  );
}
