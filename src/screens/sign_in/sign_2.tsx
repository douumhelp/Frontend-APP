import React, { useRef, useState } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TextInput,
  Pressable,
  Animated,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import { useFonts, Outfit_400Regular, Outfit_700Bold } from '@expo-google-fonts/outfit';
import { FontAwesome5 } from '@expo/vector-icons';
import axios from 'axios';
import { apiUrl } from 'src/api/apiconfig';

const cpfMask = (value: string): string =>
  value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');

const validateCPF = (cpf: string): boolean => {
  const cleanCPF = cpf.replace(/\D/g, '');
  if (cleanCPF.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(cleanCPF)) return false;
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (10 - i);
  }
  let firstCheck = 11 - (sum % 11);
  if (firstCheck >= 10) firstCheck = 0;
  if (firstCheck !== parseInt(cleanCPF.charAt(9))) return false;
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (11 - i);
  }
  let secondCheck = 11 - (sum % 11);
  if (secondCheck >= 10) secondCheck = 0;
  if (secondCheck !== parseInt(cleanCPF.charAt(10))) return false;
  return true;
};

export default function CadastroPart2() {
  const [fontsLoaded] = useFonts({
    Outfit_400Regular,
    Outfit_700Bold,
  });
  const router = useRouter();
  
  const params = useLocalSearchParams() as {
    name?: string;
    surname?: string;
    email?: string;
    password?: string;
    phone?: string;
  };
  
  const { name, surname, email, password, phone } = params;

  const [cpf, setCpf] = useState<string>('');
  const [accepted, setAccepted] = useState<boolean>(false);
  const [attemptedSubmit, setAttemptedSubmit] = useState<boolean>(false);

  const scaleAnimButton = useRef(new Animated.Value(1)).current;
  const handlePressIn = () => {
    Animated.spring(scaleAnimButton, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };
  const handlePressOut = () => {
    Animated.spring(scaleAnimButton, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const isCpfValid = validateCPF(cpf);
  const isFormValid = isCpfValid && accepted;

  const handleContinue = async () => {
    if (!isFormValid) {
      setAttemptedSubmit(true);
      return;
    }
    
    // Monta o objeto de registro utilizando os dados passados e o CPF digitado nesta etapa
    const registrationData = {
      firstName: name || '',      // valor vindo da tela SignIn
      lastName: surname || '',     // valor vindo da tela SignIn
      email: email || '',          // valor vindo da tela SignIn
      hashPassword: password || '',// valor vindo da tela SignIn
      telephone: phone || '',      // valor vindo da tela SignIn
      cpf: cpf.replace(/\D/g, ''),  // CPF sem máscara
    };

    try {
      const response = await axios.post(`${apiUrl}/auth/register/pf`, registrationData);
      
      // Exibe um pop-up informando que o cadastro foi realizado com sucesso
      Alert.alert("Sucesso", "Cadastro realizado com sucesso!", [
        { text: "OK", onPress: () => router.push('home') },
      ]);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível realizar o cadastro. Tente novamente.");
    }
  };

  if (!fontsLoaded) {
    return (
      <SafeAreaView className="flex-1 bg-white justify-center items-center">
        <Text className="text-lg text-black" style={{ fontFamily: 'Outfit_400Regular' }}>
          Carregando...
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView className="flex-1 bg-white px-4">
          <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
            <View className="flex-1 w-full justify-between">
              {/* Conteúdo da tela (CPF, Termos, etc.) */}
              <View className="mt-4">
                <View className="flex-row items-center">
                  <FontAwesome5
                    name="arrow-circle-right"
                    size={36}
                    color="#FACC15"
                    style={{ marginRight: 8 }}
                  />
                  <Text
                    className="text-5xl font-bold text-black"
                    style={{ fontFamily: 'Outfit_700Bold', textAlign: 'left' }}
                  >
                    Apenas mais um passo para terminar sua conta
                  </Text>
                </View>
              </View>

              <View className="flex-1 justify-center mt-6">
                <View className="mb-4">
                  <Text className="text-base text-black mb-2" style={{ fontFamily: 'Outfit_400Regular' }}>
                    CPF (Campo obrigatório)
                  </Text>
                  <View className="flex-row items-center area-texto rounded-lg px-3 py-1">
                    <TextInput
                      className="flex-1 text-base text-black"
                      style={{ fontFamily: 'Outfit_400Regular' }}
                      placeholder="Digite seu CPF"
                      keyboardType="numeric"
                      value={cpf}
                      onChangeText={(text: string) => {
                        const cleaned = text.replace(/\D/g, '');
                        const masked = cpfMask(cleaned);
                        setCpf(masked);
                        if (attemptedSubmit) setAttemptedSubmit(false);
                      }}
                    />
                  </View>
                  {attemptedSubmit && !isCpfValid && (
                    <Text className="text-red-500 text-sm mt-1" style={{ fontFamily: 'Outfit_400Regular' }}>
                      CPF inválido. Por favor, verifique.
                    </Text>
                  )}
                </View>

                <View className="mb-4 h-48 bg-gray-100 border border-gray-300 rounded-lg p-3">
                  <ScrollView showsVerticalScrollIndicator={true}>
                    <Text
                      className="text-lg font-bold text-black mb-2"
                      style={{ fontFamily: 'Times New Roman', fontWeight: 'bold' }}
                    >
                      Termos e Condições
                    </Text>
                    <Text className="text-base text-black leading-6" style={{ fontFamily: 'Times New Roman' }}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus
                      tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam.
                      Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy
                      molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat.
                    </Text>
                  </ScrollView>
                </View>

                <View className="mb-4">
                  <Pressable onPress={() => setAccepted(!accepted)} className="flex-row items-center">
                    {accepted ? (
                      <FontAwesome5 name="check-square" size={24} color="#FACC15" className="mr-2" />
                    ) : (
                      <FontAwesome5 name="square" size={24} color="#ccc" className="mr-2" />
                    )}
                    <Text className="text-base text-black" style={{ fontFamily: 'Outfit_400Regular' }}>
                      Estou Ciente e Aceito os Termos e Condições da Empresa
                    </Text>
                  </Pressable>
                </View>
              </View>

              <View className="mb-8 items-center">
                <Animated.View style={{ transform: [{ scale: scaleAnimButton }], width: '80%' }}>
                  <Pressable
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                    onPress={handleContinue}
                    style={{
                      backgroundColor: isFormValid ? '#FACC15' : '#ccc',
                      paddingVertical: 16,
                      borderRadius: 999,
                      alignItems: 'center',
                      shadowColor: '#000',
                      shadowOpacity: 0.4,
                      shadowOffset: { width: 0, height: 2 },
                      shadowRadius: 4,
                      elevation: 5,
                    }}
                  >
                    <Text className="text-xl text-black font-bold" style={{ fontFamily: 'Outfit_700Bold' }}>
                      Continuar
                    </Text>
                  </Pressable>
                </Animated.View>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
