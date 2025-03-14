import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiUrl } from 'src/api/apiconfig';

// Definindo o tipo esperado da categoria retornada pelo backend
interface CategoryResponse {
  id: string;
  name: string;
}

export function Categories() {
  const router = useRouter();
  const [categories, setCategories] = useState<Array<{ id: string; name: string; icon: string }>>([]);
  const [loading, setLoading] = useState(true);
  const [expandedCategoryId, setExpandedCategoryId] = useState<string | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const icons = ["home", "code", "globe", "car", "paw", "user", "store", "ellipsis-h", "cog", "briefcase"];

  useEffect(() => {
    async function fetchCategories() {
      try {
        const token = await AsyncStorage.getItem('authToken');
        if (!token) throw new Error('Token not found');

        const response = await fetch(`${apiUrl}/categories`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data: CategoryResponse[] = await response.json();
        // Aqui informamos os tipos dos parâmetros 'cat' e 'index'
        const categoriesWithIcons = data.map((cat: CategoryResponse, index: number) => ({
          id: cat.id,
          name: cat.name,
          icon: icons[index % icons.length], // Ícones aleatórios
        }));

        setCategories(categoriesWithIcons);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  function toggleCategory(categoryId: string) {
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

  if (loading) {
    return <ActivityIndicator size="large" color="#FACC15" />;
  }

  return (
    <View style={{ marginTop: 16 }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingRight: 16 }}
      >
        {categories.map((cat) => (
          <View key={cat.id} style={{ marginRight: 8 }}>
            <Pressable
              style={{
                width: 80,
                height: 80,
                backgroundColor: 'white',
                borderColor: 'gray',
                borderWidth: 1,
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => toggleCategory(cat.id)}
            >
              <FontAwesome5 name={cat.icon} size={24} color="#FACC15" />
              <Text style={{ fontSize: 12, color: 'black', marginTop: 4, textAlign: 'center' }}>
                {cat.name}
              </Text>
            </Pressable>
          </View>
        ))}
      </ScrollView>
      {expandedCategoryId && (
        <Animatable.View
          animation={isClosing ? 'fadeOutDown' : 'fadeInUp'}
          easing="ease-in-out"
          duration={350}
          onAnimationEnd={handleAnimationEnd}
          style={{
            marginTop: 16,
            marginHorizontal: 16,
            backgroundColor: 'white',
            borderColor: 'gray',
            borderWidth: 1,
            borderRadius: 8,
            padding: 16,
          }}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <Pressable onPress={() => setIsClosing(true)}>
              <FontAwesome5 name="times" size={20} color="#FACC15" />
            </Pressable>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={{ fontSize: 12, color: 'gray', textAlign: 'center' }}>
              Nenhuma subcategoria disponível.
            </Text>
          </ScrollView>
        </Animatable.View>
      )}
    </View>
  );
}
