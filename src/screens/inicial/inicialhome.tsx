import React, { useRef } from 'react';
import { Text, View, Image, Pressable, SafeAreaView, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { useFonts, Outfit_400Regular, Outfit_700Bold } from '@expo-google-fonts/outfit';
import { FontAwesome5 } from '@expo/vector-icons';

export default function Home() {
  const [fontsLoaded] = useFonts({
    Outfit_400Regular,
    Outfit_700Bold,
  });
  const router = useRouter();
  const scaleAnimEntrar = useRef(new Animated.Value(1)).current;
  const scaleAnimCadastro = useRef(new Animated.Value(1)).current;

  const handlePressIn = (scaleAnim: Animated.Value) => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };
  const handlePressOut = (scaleAnim: Animated.Value) => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  if (!fontsLoaded) {
    return (
      <SafeAreaView className="flex-1 bg-white justify-center items-center">
        <Text style={{ fontFamily: 'Outfit_400Regular' }} className="text-black text-lg">
          Carregando...
        </Text>
      </SafeAreaView>
    );
  }

  const slogans = [
    "Precisa de ajuda? A gente dá um help!",
    "Serviços rápidos, práticos e sem dor de cabeça.",
    "Profissionais confiáveis para o que você precisar.",
    "Seu problema resolvido com um clique.",
    "Pequenos reparos, grandes soluções."
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-center items-center">
        <View className="items-center">
          <Image
            source={require('../../assets/logoInicial.png')}
            style={{ width: 350, height: 340 }}
            className="rounded-md"
            resizeMode="contain"
          />
          <Text
            className="text-4xl font-bold text-black mt-0"
            style={{ fontFamily: 'Outfit_700Bold' }}
          >
            Bem-Vindo!
          </Text>
        </View>

        <View className="mt-8 w-full px-4">
          {slogans.map((slogan, index) => (
            <View key={index} className="flex-row items-center mt-2">
              <FontAwesome5
                name="check-circle"
                size={20}
                color="#FBBF24"
                className="mr-3"
              />
              <Text
                className="text-lg text-black"
                style={{ fontFamily: 'Outfit_400Regular' }}
              >
                {slogan}
              </Text>
            </View>
          ))}
        </View>

        <View className="mt-10 w-full px-16">
          <Animated.View style={{ transform: [{ scale: scaleAnimEntrar }] }}>
            <Pressable
              onPressIn={() => handlePressIn(scaleAnimEntrar)}
              onPressOut={() => handlePressOut(scaleAnimEntrar)}
              onPress={() => router.push('/routes/login')}
              style={{
                backgroundColor: '#FACC15',
                paddingVertical: 16,
                borderRadius: 999,
                shadowColor: '#000',
                shadowOpacity: 0.4,
                shadowOffset: { width: 0, height: 2 },
                shadowRadius: 4,
                elevation: 5,
              }}
            >
              <Text
                className="text-center text-black text-xl font-bold"
                style={{ fontFamily: 'Outfit_700Bold' }}
              >
                Entrar
              </Text>
            </Pressable>
          </Animated.View>
        </View>
        
        <View className="mt-5 mb-24 w-full px-16">
          <Animated.View style={{ transform: [{ scale: scaleAnimCadastro }] }}>
            <Pressable
              onPressIn={() => handlePressIn(scaleAnimCadastro)}
              onPressOut={() => handlePressOut(scaleAnimCadastro)}
              onPress={() => router.push('/routes/signin')}
              style={{
                backgroundColor: '#FDE018',
                paddingVertical: 16,
                borderRadius: 999,
                shadowColor: '#000',
                shadowOpacity: 0.4,
                shadowOffset: { width: 0, height: 2 },
                shadowRadius: 4,
                elevation: 5,
              }}
            >
              <Text
                className="text-center text-black text-xl font-bold"
                style={{ fontFamily: 'Outfit_700Bold' }}
              >
                Cadastro
              </Text>
            </Pressable>
          </Animated.View>
        </View>
      </View>
    </SafeAreaView>
  );
}
