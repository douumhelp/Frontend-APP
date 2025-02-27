import { Text, TextInput, View, Image, Animated, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { useRef, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useFonts, Outfit_400Regular, Outfit_700Bold } from '@expo-google-fonts/outfit';

// Função para aplicar máscara CPF: 000.000.000-00
const cpfMask = (value: string): string => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
};

// Função de validação do CPF (inclui verificação dos dígitos)
const validateCPF = (cpf: string): boolean => {
  const cleanCPF = cpf.replace(/\D/g, '');
  if (cleanCPF.length !== 11) return false;
  // CPF com todos os dígitos iguais são inválidos
  if (/^(\d)\1{10}$/.test(cleanCPF)) return false;
  // Valida o primeiro dígito verificador
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (10 - i);
  }
  let firstCheck = 11 - (sum % 11);
  if (firstCheck >= 10) firstCheck = 0;
  if (firstCheck !== parseInt(cleanCPF.charAt(9))) return false;
  // Valida o segundo dígito verificador
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (11 - i);
  }
  let secondCheck = 11 - (sum % 11);
  if (secondCheck >= 10) secondCheck = 0;
  if (secondCheck !== parseInt(cleanCPF.charAt(10))) return false;
  return true;
};

export default function Login() {
  const [fontsLoaded] = useFonts({
    Outfit_400Regular,
    Outfit_700Bold,
  });

  const router = useRouter();
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [buttonPressed, setButtonPressed] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  // Regex de validação de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // Validação que diferencia email ou CPF:
  const isEmailOrCpfValid = (() => {
    const trimmed = email.trim();
    if (trimmed === "") return false;
    if (/[a-zA-Z]/.test(trimmed)) {
      return emailRegex.test(trimmed);
    } else {
      // Trata como CPF: remove caracteres não numéricos e valida
      const digits = trimmed.replace(/\D/g, '');
      return validateCPF(digits);
    }
  })();

  const isPasswordValid = password.length > 0;
  const isFormValid = isEmailOrCpfValid && isPasswordValid;

  const handlePressIn = () => {
    setButtonPressed(true);
    Animated.spring(scaleAnim, {
      toValue: 0.9,
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

  const handleLogin = () => {
    if (!isFormValid) {
      setAttemptedSubmit(true);
      return;
    }
    router.push('/home');
  };

  if (!fontsLoaded) {
    return (
      <View className="flex-1 bg-white justify-center items-center">
        <Text className="text-xl text-gray-700" style={{ fontFamily: 'Outfit_400Regular' }}>
          Carregando...
        </Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={3}
      className="flex-1 bg-white"
    >
      <View className="flex-1 p-6 justify-center items-center">
        <View className="flex items-center">
          <Image
            source={require('../../assets/logo.png')}
            style={{ width: 300, height: 150, marginBottom: 30 }}
          />
          <Text
            className="text-4xl font-bold text-black"
            style={{ fontFamily: 'Outfit_700Bold' }}
          >
            Bem-vindo!
          </Text>
          <Text
            className="mt-2 text-base text-gray-700 text-center"
            style={{ fontFamily: 'Outfit_400Regular' }}
          >
            Acesse sua conta para continuar e aproveitar todas as funcionalidades.🛠️
          </Text>
        </View>
        <View className="mt-8 w-full px-8">
          <Text
            className="text-xl text-gray-700"
            style={{ fontFamily: 'Outfit_400Regular' }}
          >
            Email ou CPF
          </Text>
          <View className="area-texto mb-1">
            <TextInput
              className="campo-texto"
              placeholder="Digite seu email ou CPF"
              placeholderTextColor="#6b7280"
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={(text: string) => {
                if (/[a-zA-Z]/.test(text)) {
                  setEmail(text);
                } else {
                  const masked = cpfMask(text);
                  setEmail(masked);
                }
                if (attemptedSubmit) setAttemptedSubmit(false);
              }}
              value={email}
              style={{ fontFamily: 'Outfit_400Regular' }}
            />
            <MaterialIcons name="email" size={24} color="gray" />
          </View>
          {attemptedSubmit && !isEmailOrCpfValid && (
            <Text
              className="text-red-500 text-xs mb-3"
              style={{ fontFamily: 'Outfit_400Regular' }}
            >
              Preencha um email ou CPF válido
            </Text>
          )}

          <Text
            className="text-xl text-gray-700 mt-5"
            style={{ fontFamily: 'Outfit_400Regular' }}
          >
            Senha
          </Text>
          <View className="area-texto rounded-full flex-row items-center p-1 mb-1 border border-gray-300">
            <TextInput
              className="campo-texto flex-1"
              placeholder="Digite sua senha"
              placeholderTextColor="#6b7280"
              secureTextEntry={!passwordVisible}
              onChangeText={(text: string) => {
                setPassword(text);
                if (attemptedSubmit) setAttemptedSubmit(false);
              }}
              value={password}
              style={{ fontFamily: 'Outfit_400Regular' }}
            />
            <Pressable onPress={() => setPasswordVisible(prev => !prev)}>
              <MaterialIcons
                name={passwordVisible ? "visibility" : "visibility-off"}
                size={24}
                color="gray"
              />
            </Pressable>
          </View>
          {attemptedSubmit && !isPasswordValid && (
            <Text
              className="text-red-500 text-xs mb-3"
              style={{ fontFamily: 'Outfit_400Regular' }}
            >
              A senha é obrigatória
            </Text>
          )}
        </View>
        <View className="mt-8 w-full px-8">
          <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <Pressable
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onPress={handleLogin}
              style={{
                backgroundColor: isFormValid ? (buttonPressed ? '#FDE018' : '#FACC15') : '#ccc',
                paddingVertical: 16,
                borderRadius: 999,
                shadowColor: '#000',
                shadowOpacity: 0.2,
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
        <Text
          className="mt-4 text-center text-black-500"
          style={{ fontFamily: 'Outfit_400Regular' }}
          onPress={() => router.push('/routes/forgotPassword')}
        >
          Esqueceu a sua senha?
        </Text>
        <Text
          className="mt-6 text-center text-gray-500"
          style={{ fontFamily: 'Outfit_400Regular' }}
        >
          Não tem conta?{' '}
          <Text
            className="text-yellow-500 font-bold"
            onPress={() => router.push('/routes/signin')}
            style={{ fontFamily: 'Outfit_700Bold' }}
          >
            Crie agora!
          </Text>
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}
