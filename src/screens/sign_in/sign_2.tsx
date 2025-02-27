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
} from 'react-native';
import { useRouter } from 'expo-router';
import { useFonts, Outfit_400Regular, Outfit_700Bold } from '@expo-google-fonts/outfit';
import { FontAwesome5 } from '@expo/vector-icons';

const cpfMask = (value: string): string => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
};

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

  const handleContinue = () => {
    if (!isFormValid) {
      setAttemptedSubmit(true);
      return;
    }
    router.push('/routes/home');
  };

  if (!fontsLoaded) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontFamily: 'Outfit_400Regular', fontSize: 18, color: '#000' }}>
          Carregando...
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', paddingHorizontal: 24 }}>
        <View style={{ flex: 1, maxWidth: 400, alignSelf: 'center', justifyContent: 'space-between' }}>
          <View style={{ marginTop: 16 }}>
            <Text
              style={{
                fontFamily: 'Outfit_700Bold',
                fontSize: 36,
                color: '#000',
                textAlign: 'left',
                width: '100%',
              }}
            >
              Cadastro - Parte 2
            </Text>
          </View>

          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ width: '100%', marginBottom: 16 }}>
              <Text style={{ fontFamily: 'Outfit_400Regular', fontSize: 16, color: '#000', marginBottom: 8 }}>
                CPF
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: '#ccc',
                  borderRadius: 8,
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                }}
              >
                <TextInput
                  style={{ flex: 1, fontFamily: 'Outfit_400Regular', fontSize: 16, color: '#000' }}
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
                <Text style={{ fontFamily: 'Outfit_400Regular', fontSize: 14, color: 'red', marginTop: 4 }}>
                  CPF inválido. Por favor, verifique.
                </Text>
              )}
            </View>

            <Pressable
              onPress={() => setAccepted(!accepted)}
              style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}
            >
              {accepted ? (
                <FontAwesome5 name="check-square" size={24} color="#FACC15" style={{ marginRight: 8 }} />
              ) : (
                <FontAwesome5 name="square" size={24} color="#ccc" style={{ marginRight: 8 }} />
              )}
              <Text style={{ fontFamily: 'Outfit_400Regular', fontSize: 16, color: '#000' }}>
                Aceito os{' '}
                <Text
                  style={{ color: '#FACC15', textDecorationLine: 'underline' }}
                  onPress={() => router.push('/routes/terms')}
                >
                  Termos e Condições
                </Text>
              </Text>
            </Pressable>
          </View>

          <View style={{ marginBottom: 32, alignItems: 'center' }}>
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
                <Text style={{ fontFamily: 'Outfit_700Bold', fontSize: 20, color: '#000' }}>
                  Continuar
                </Text>
              </Pressable>
            </Animated.View>
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
