import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useHome } from '../../hooks/useHome';
import * as Animatable from 'react-native-animatable';

export function Categories() {
  const router = useRouter();
  const { categories, subcategories, categoryToSubIds } = useHome();
  const [expandedCategoryId, setExpandedCategoryId] = useState<number | null>(null);
  const [isClosing, setIsClosing] = useState(false);

  function toggleCategory(categoryId: number) {
    if (expandedCategoryId === categoryId) {
      setIsClosing(true);
    } else {
      setExpandedCategoryId(categoryId);
      setIsClosing(false);
    }
  }

  const handleAnimationEnd = () => {
    if (isClosing) {
      setExpandedCategoryId(null);
      setIsClosing(false);
    }
  };

  return (
    <View className="mt-4">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingRight: 16 }}
      >
        {categories.map(cat => (
          <View key={cat.id} className="mr-2">
            <Pressable
              className="w-20 h-20 bg-white border border-gray-400 rounded-lg items-center justify-center"
              onPress={() => toggleCategory(cat.id)}
            >
              <FontAwesome5 name={cat.icon} size={24} color="#FACC15" />
              <Text className="text-xs text-black mt-1 text-center" style={{ fontFamily: 'Outfit_400Regular' }}>
                {cat.name}
              </Text>
            </Pressable>
          </View>
        ))}
      </ScrollView>
      {expandedCategoryId && (
        <Animatable.View
          animation={isClosing ? "fadeOutDown" : "fadeInUp"}
          easing="ease-in-out"
          duration={350}
          onAnimationEnd={handleAnimationEnd}
          className="mt-4 mx-4 bg-white border border-gray-300 rounded-md shadow-md p-4"
        >
          <View className="flex-row justify-end">
            <Pressable onPress={() => setIsClosing(true)}>
              <FontAwesome5 name="times" size={20} color="#FACC15" />
            </Pressable>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            {categoryToSubIds[expandedCategoryId]?.length > 0 ? (
              categoryToSubIds[expandedCategoryId].map(subId => {
                const subcat = subcategories.find(s => s.id === subId);
                if (!subcat) return null;
                return (
                  <Pressable
                    key={subcat.id}
                    onPress={() =>
                      router.push(`requisicao?subcategory=${encodeURIComponent(JSON.stringify(subcat))}`)
                    }
                    style={({ pressed }) => ({
                      backgroundColor: pressed ? '#D1D5DB' : 'transparent'
                    })}
                    className="p-3 border-b border-gray-200 flex-row items-center justify-between"
                  >
                    <Text className="text-xs text-black text-center" style={{ fontFamily: 'Outfit_400Regular' }}>
                      {subcat.name}
                    </Text>
                    {subcat.icon && (
                      <FontAwesome5 name={subcat.icon} size={16} color="gray" />
                    )}
                  </Pressable>
                );
              })
            ) : (
              <Text className="text-gray-500 text-center" style={{ fontFamily: 'Outfit_400Regular', fontSize: 12 }}>
                Nenhuma subcategoria disponível.
              </Text>
            )}
          </ScrollView>
        </Animatable.View>
      )}
    </View>
  );
}
