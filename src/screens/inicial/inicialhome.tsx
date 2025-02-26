import React from 'react';
import { Text, View, Image, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useFonts, Outfit_400Regular, Outfit_700Bold } from '@expo-google-fonts/outfit';

export default function inicialhome() {
  const [fontsLoaded] = useFonts({
    Outfit_400Regular,
    Outfit_700Bold,
  });
  const router = useRouter();

  if (!fontsLoaded) {
    return (
      <SafeAreaView className="flex-1 bg-white justify-center items-center">
        <Text style={{ fontFamily: 'Outfit_400Regular' }}>Carregando...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white p-6">
      <View className="flex-1 justify-center items-center">
        {/* Logo */}
        <Image
          source={require('../../assets/logo.png')}
          style={{ width: 300, height: 150 }}
        />
        <Text className="mt-4 text-3xl font-bold text-black" style={{ fontFamily: 'Outfit_700Bold' }}>
          DouumHelp
        </Text>

        {/* Slogans */}
        <View className="mt-6 w-full">
          <Text className="text-lg text-gray-700 text-center" style={{ fontFamily: 'Outfit_400Regular' }}>
            Precisa de ajuda? A gente dá um help!
          </Text>
          <Text className="mt-2 text-base text-gray-700 text-center" style={{ fontFamily: 'Outfit_400Regular' }}>
            Serviços rápidos, práticos e sem dor de cabeça.
          </Text>
          <Text className="mt-2 text-base text-gray-700 text-center" style={{ fontFamily: 'Outfit_400Regular' }}>
            Profissionais confiáveis para o que você precisar.
          </Text>
          <Text className="mt-2 text-base text-gray-700 text-center" style={{ fontFamily: 'Outfit_400Regular' }}>
            Seu problema resolvido com um clique.
          </Text>
          <Text className="mt-2 text-base text-gray-700 text-center" style={{ fontFamily: 'Outfit_400Regular' }}>
            Pequenos reparos, grandes soluções.
          </Text>
        </View>

        {/* Botões */}
        <View className="mt-10 flex-row space-x-4">
          <Pressable
            onPress={() => router.push('/routes/login')}
            className="bg-[#FACC15] py-4 px-6 rounded-full shadow"
          >
            <Text className="text-black text-xl font-bold text-center" style={{ fontFamily: 'Outfit_700Bold' }}>
              Entrar
            </Text>
          </Pressable>
          <Pressable
            onPress={() => router.push('/routes/signin')}
            className="bg-[#FDE018] py-4 px-6 rounded-full shadow"
          >
            <Text className="text-black text-xl font-bold text-center" style={{ fontFamily: 'Outfit_700Bold' }}>
              Cadastro
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
