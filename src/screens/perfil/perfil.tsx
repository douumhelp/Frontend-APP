import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback, Animated } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import tw from 'twrnc';
import * as ImagePicker from 'expo-image-picker';
import MaskInput from 'react-native-mask-input';
import { useFonts, Outfit_400Regular, Outfit_700Bold } from '@expo-google-fonts/outfit';
import { FontAwesome } from '@expo/vector-icons';

export default function Perfil() {
  const [fontsLoaded] = useFonts({ Outfit_400Regular, Outfit_700Bold });
  const params = useLocalSearchParams<{ newPassword?: string }>();
  const [userData, setUserData] = useState({
    nome: 'João',
    sobrenome: 'Silva',
    telefone: '(11) 99999-8888',
    email: 'joao.silva@email.com',
    senha: 'senha123'
  });
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState('');
  const animatedSave = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (params.newPassword) {
      setUserData(prev => ({ ...prev, senha: params.newPassword! }));
      Alert.alert('Sucesso', 'Senha alterada com sucesso!');
    }
  }, [params.newPassword]);

  if (!fontsLoaded) return null;

  const handleSelectImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleSaveChanges = () => {
    setSuccessMessage('Alterações salvas com sucesso!');
    setTimeout(() => {
      setSuccessMessage('');
      router.push('home');
    }, 2000);
  };

  const onPressInSave = () => {
    Animated.spring(animatedSave, { toValue: 0.95, useNativeDriver: true }).start();
  };

  const onPressOutSave = () => {
    Animated.spring(animatedSave, { toValue: 1, friction: 3, tension: 40, useNativeDriver: true }).start();
    handleSaveChanges();
  };

  return (
    <KeyboardAvoidingView style={tw`flex-1 bg-white`} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={tw`flex-1 p-4`}>
          <TouchableOpacity onPress={handleSelectImage} style={tw`items-center mb-4 mt-15`}>
            <Image source={profileImage ? { uri: profileImage } : require('../../assets/placeholder.png')} style={{ width: 120, height: 120, borderRadius: 60, borderWidth: 2, borderColor: '#FBBF24' }} />
            <View style={tw`absolute bottom-0 right-0 bg-yellow-500 p-2 rounded-full`}>
              <FontAwesome name="pencil" size={16} color="white" />
            </View>
          </TouchableOpacity>
          <View style={tw`mb-4`}>
            <Text style={[tw`text-lg font-bold text-gray-800`, { fontFamily: 'Outfit_700Bold' }]}>Nome</Text>
            <TextInput
              style={[tw`border border-gray-300 rounded-full p-2 mb-2`, { fontFamily: 'Outfit_400Regular' }]}
              value={userData.nome}
              onChangeText={(text: string) => setUserData(prev => ({ ...prev, nome: text }))}
            />
            <Text style={[tw`text-lg font-bold text-gray-800`, { fontFamily: 'Outfit_700Bold' }]}>Sobrenome</Text>
            <TextInput
              style={[tw`border border-gray-300 rounded-full p-2 mb-2`, { fontFamily: 'Outfit_400Regular' }]}
              value={userData.sobrenome}
              onChangeText={(text: string) => setUserData(prev => ({ ...prev, sobrenome: text }))}
            />
            <Text style={[tw`text-lg font-bold text-gray-800`, { fontFamily: 'Outfit_700Bold' }]}>Telefone</Text>
            <MaskInput
              style={[tw`border border-gray-300 rounded-full p-2 mb-2`, { fontFamily: 'Outfit_400Regular' }]}
              value={userData.telefone}
              onChangeText={(masked: string) => setUserData(prev => ({ ...prev, telefone: masked }))}
              mask={['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
              keyboardType="phone-pad"
            />
            <Text style={[tw`text-lg font-bold text-gray-800`, { fontFamily: 'Outfit_700Bold' }]}>E-mail</Text>
            <TextInput
              style={[tw`border border-gray-300 rounded-full p-2 mb-2`, { fontFamily: 'Outfit_400Regular' }]}
              value={userData.email}
              onChangeText={(text: string) => setUserData(prev => ({ ...prev, email: text }))}
              keyboardType="email-address"
            />
            <Text style={[tw`text-lg font-bold text-gray-800`, { fontFamily: 'Outfit_700Bold' }]}>Senha</Text>
            <TouchableOpacity onPress={() => router.push(`senha?currentPassword=${userData.senha}`)}>
              <View style={[tw`border border-gray-300 rounded-full p-2 mb-2 flex-row items-center justify-between`]}>
                <Text style={{ fontFamily: 'Outfit_400Regular' }}>********</Text>
                <FontAwesome name="angle-right" size={20} color="gray" />
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity activeOpacity={1} onPressIn={onPressInSave} onPressOut={onPressOutSave}>
            <Animated.View style={[tw`bg-yellow-500 rounded-full p-3 items-center`, { transform: [{ scale: animatedSave }] }]}>
              <Text style={[tw`text-white text-lg`, { fontFamily: 'Outfit_700Bold' }]}>Salvar Alterações</Text>
            </Animated.View>
          </TouchableOpacity>
          {successMessage ? <Text style={tw`mt-4 text-green-500 text-center`}>{successMessage}</Text> : null}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
