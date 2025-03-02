import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

type Category = {
  id: number;
  name: string;
  icon: string;
};

type CategoriesProps = {
  data: Category[];
  fontRegular?: string;
};

export function Categories({ data, fontRegular }: CategoriesProps) {
  return (
    <View className="mt-4">
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {data.map((cat) => (
          <Pressable
            key={cat.id}
            className="w-20 h-20 m-1 bg-white border border-gray-300 rounded-lg items-center justify-center"
            onPress={() => console.log(`Clicou em ${cat.name}`)}
          >
            <MaterialIcons name={cat.icon as any} size={24} color="#FACC15" />
            <Text className="text-xs mt-1 text-center text-black" style={{ fontFamily: fontRegular }}>
              {cat.name}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}
