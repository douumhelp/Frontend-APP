import React, { useRef, useState } from 'react';
import { Text, TextInput, View, Image, Animated, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useFonts, Outfit_700Bold } from '@expo-google-fonts/outfit';
import AppLoading from 'expo-app-loading';
import { useRouter } from 'expo-router';

export default function SignIn() {
  const [fontsLoaded] = useFonts({
    Outfit_700Bold,
  });
  const router = useRouter();
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [buttonPressed, setButtonPressed] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const handlePressIn = () => {
    setButtonPressed(true);
    Animated.spring(scaleAnim, {
      toValue: 0.90,
      useNativeDriver: true,
    }).start();
  };
  const handlePressOut = () => {
    setButtonPressed(false);
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="p-4">
        <View className="flex-1 justify-center items-center">
          <View className="flex items-center">
            <Image
              source={require('../../assets/logo.png')}
              style={{ width: 300, height: 150, marginBottom: 10, marginTop: 20}}
            />
            <Text 
              style={{ fontFamily: 'Outfit_700Bold' }}
              className="text-4xl font-bold text-black"
            >
              Crie sua conta
            </Text>
            <Text className="mt-2 text-lg text-gray-500">
              Insira seus dados para começar
            </Text>
          </View>
          <View className="mt-8 w-full px-8">
            <View className="area-texto rounded-full flex-row items-center p-1 border border-gray-300">
              <TextInput
                className="campo-texto flex-1"
                placeholder="Digite seu nome completo"
                placeholderTextColor="#6b7280"
              />
              <MaterialIcons name="account-circle" size={24} color="gray" />
            </View>
            <View className="area-texto rounded-full flex-row items-center p-1 border border-gray-300">
              <TextInput
                className="campo-texto flex-1"
                placeholder="Digite seu telefone"
                placeholderTextColor="#6b7280"
                keyboardType="phone-pad"
              />
              <MaterialIcons name="phone" size={24} color="gray" />
            </View>
            <View className="area-texto rounded-full flex-row items-center p-1 border border-gray-300">
              <TextInput
                className="campo-texto flex-1"
                placeholder="Digite seu e-mail"
                placeholderTextColor="#6b7280"
                keyboardType="email-address"
              />
              <MaterialIcons name="mail" size={24} color="gray" />
            </View>
            <View className="area-texto rounded-full flex-row items-center p-1 border border-gray-300">
              <TextInput
                className="campo-texto flex-1"
                placeholder="Digite sua senha"
                placeholderTextColor="#6b7280"
                secureTextEntry={!passwordVisible}
              />
              <Pressable onPress={() => setPasswordVisible(prev => !prev)}>
                <MaterialIcons 
                  name={passwordVisible ? "visibility" : "visibility-off"} 
                  size={24} 
                  color="gray" 
                />
              </Pressable>
            </View>
            <View className="area-texto rounded-full flex-row items-center p-1 mb-4 border border-gray-300">
              <TextInput
                className="campo-texto flex-1"
                placeholder="Confirme sua senha"
                placeholderTextColor="#6b7280"
                secureTextEntry={!confirmPasswordVisible}
              />
              <Pressable onPress={() => setConfirmPasswordVisible(prev => !prev)}>
                <MaterialIcons 
                  name={confirmPasswordVisible ? "visibility" : "visibility-off"} 
                  size={24} 
                  color="gray" 
                />
              </Pressable>
            </View>
          </View>
          <View className="mt-8 w-full px-8">
            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
              <Pressable
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                style={{
                  backgroundColor: buttonPressed ? '#FDE018' : '#FACC15',
                  paddingVertical: 16,
                  borderRadius: 999,
                  shadowColor: '#000',
                  shadowOpacity: 0.2,
                  shadowOffset: { width: 0, height: 2 },
                  shadowRadius: 4,
                  elevation: 5,
                }}
              >
                <Text className="text-center text-black text-xl font-bold">
                  Cadastrar
                </Text>
              </Pressable>
            </Animated.View>
          </View>
          <Text className="mt-6 text-center text-gray-500">
            Já possui uma conta?{' '}
            
            <Text className="text-yellow-500 font-bold"
            onPress={() => router.push('/routes/login')} >
              Faça login
            </Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
