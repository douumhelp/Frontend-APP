import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Button,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useFonts, Outfit_400Regular, Outfit_700Bold } from '@expo-google-fonts/outfit';
import { FontAwesome } from '@expo/vector-icons';
import { useHome } from '../../hooks/useHome';
import { useServices } from '../../context/ServicesContext';
import { useSearchParams } from '../../hooks/UseCategories';

interface Address {
  id: number;
  rua: string;
  numero: string;
  bairro: string;
  cep: string;
  cidade: string;
  estado: string;
}

export default function SolicitacaoServicoScreen() {
  const [fontsLoaded] = useFonts({ Outfit_400Regular, Outfit_700Bold });
  const router = useRouter();
  const { subcategory } = useSearchParams();
  const { address: defaultAddress, subcategories } = useHome();
  const { createServiceRequest, requests } = useServices();

  const [subcategoryId, setSubcategoryId] = useState<number | null>(null);
  const [subcategoryName, setSubcategoryName] = useState('');
  const [serviceName, setServiceName] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState<'8:00' | '11:00' | '13:00' | '14:00' | '16:00' | '17:00' | null>(null);
  const [minValue, setMinValue] = useState('');
  const [maxValue, setMaxValue] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Endereço padrão para teste
  const [addresses, setAddresses] = useState<Address[]>([
    { id: 1, rua: 'Rua Bolsonaro', numero: '22', bairro: 'Centro', cep: '12345-678', cidade: 'Cidade Teste', estado: 'Teste' }
  ]);
  const [selectedAddressId, setSelectedAddressId] = useState<number | 'meus_enderecos' | null>(null);

  const times = ['8:00', '11:00', '13:00', '14:00', '16:00', '17:00'] as const;

  useEffect(() => {
    if (subcategory) {
      try {
        const parsedSub = JSON.parse(subcategory);
        if (parsedSub && parsedSub.id) {
          setSubcategoryId(parsedSub.id);
          setSubcategoryName(parsedSub.name);
        }
      } catch (error) {
        console.error('Erro na integração: subcategoria inválida.', error);
      }
    } else if (subcategories && subcategories.length > 0) {
      setSubcategoryId(subcategories[0].id);
      setSubcategoryName(subcategories[0].name);
    }
  }, [subcategory, subcategories]);

  const onChangeDate = (event: any, date?: Date) => {
    setShowDatePicker(false);
    if (date) setSelectedDate(date);
  };

  async function handleSubmit() {
    if (!subcategoryId || !serviceName || !selectedTime || !minValue || !maxValue) {
      Alert.alert('Atenção', 'Preencha todos os campos antes de agendar.');
      return;
    }

    let finalAddress = defaultAddress;
    if (addresses.length > 0 && selectedAddressId && selectedAddressId !== 'meus_enderecos') {
      const selected = addresses.find(a => a.id === selectedAddressId);
      if (selected) {
        finalAddress = `${selected.rua}, ${selected.numero} - ${selected.bairro}, ${selected.cidade} - ${selected.estado}, CEP: ${selected.cep}`;
      }
    }

    const newRequest = {
      address: finalAddress,
      subcategoryId,
      serviceName,
      date: selectedDate.toISOString().split('T')[0],
      time: selectedTime,
      minValue: Number(minValue),
      maxValue: Number(maxValue),
    };

    try {
      await createServiceRequest(newRequest);
      setSuccessMessage('Serviço agendado com sucesso!');
      setTimeout(() => router.push('home'), 2000);
    } catch (error: any) {
      Alert.alert('Erro', error.message);
    }
  }

  const isTimeUnavailable = (time: string) => {
    const formattedDate = selectedDate.toISOString().split('T')[0];
    return requests.some(req => req.date === formattedDate && req.time === time);
  };

  if (!fontsLoaded) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#FFD700" />
        <Text style={{ fontFamily: 'Outfit_400Regular' }}>Carregando...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white" style={{ paddingTop: 25 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
            keyboardShouldPersistTaps="handled"
          >
            <TouchableOpacity onPress={() => router.back()} style={{ marginLeft: 10, marginBottom: 10, marginTop: 30 }}>  
              <FontAwesome name="arrow-left" size={30} color="#FFD700" />
            </TouchableOpacity>
            <View className="p-4">
              {successMessage && (
                <Text className="text-green-600 font-bold mb-3" style={{ fontFamily: 'Outfit_700Bold' }}>
                  {successMessage}
                </Text>
              )}
              <Text className="font-bold mt-2" style={{ fontFamily: 'Outfit_700Bold' }}>Endereço</Text>
              <View className="border border-gray-300 rounded mb-2">
                <Picker
                  selectedValue={selectedAddressId}
                  onValueChange={(itemValue) => {
                    if (itemValue === 'meus_enderecos') {
                      router.push('adresses');
                    } else {
                      setSelectedAddressId(itemValue);
                    }
                  }}
                  style={{ fontFamily: 'Outfit_400Regular' }}
                >
                  {addresses.length > 0 ? (
                    addresses.map((addr) => (
                      <Picker.Item
                        key={addr.id}
                        label={`${addr.rua}, ${addr.numero} - ${addr.bairro}`}
                        value={addr.id}
                      />
                    ))
                  ) : (
                    <Picker.Item label="Nenhum endereço cadastrado" value={null} />
                  )}
                  <Picker.Item label="Meus Endereços" value="meus_enderecos" />
                </Picker>
              </View>
              {(!selectedAddressId || selectedAddressId === null) && addresses.length === 0 && (
                <Text className="mb-2" style={{ fontFamily: 'Outfit_400Regular' }}>
                  {defaultAddress}
                </Text>
              )}
              <Text className="font-bold mt-2" style={{ fontFamily: 'Outfit_700Bold' }}>Categoria</Text>
              <View className="border border-gray-300 rounded mb-2">
                <Picker
                  selectedValue={subcategoryId}
                  onValueChange={(itemValue) => {
                    setSubcategoryId(itemValue);
                    const selected = subcategories.find((sub) => sub.id === itemValue);
                    setSubcategoryName(selected?.name || '');
                  }}
                  style={{ fontFamily: 'Outfit_400Regular' }}
                >
                  {subcategories.map((subcat) => (
                    <Picker.Item key={subcat.id} label={subcat.name} value={subcat.id} />
                  ))}
                </Picker>
              </View>
              <Text className="font-bold mt-2" style={{ fontFamily: 'Outfit_700Bold' }}>Nome do Serviço</Text>
              <TextInput
                className="border border-gray-300 rounded-full p-2 mb-2"
                placeholder="Ex: Conserto de pia"
                value={serviceName}
                onChangeText={setServiceName}
                style={{ fontFamily: 'Outfit_400Regular' }}
              />
              <Text className="font-bold mt-2" style={{ fontFamily: 'Outfit_700Bold' }}>Data do Serviço</Text>
              <TouchableOpacity
                className="border border-gray-300 rounded-full p-2 mb-2"
                onPress={() => setShowDatePicker(true)}
              >
                <Text style={{ fontFamily: 'Outfit_400Regular' }}>
                  {selectedDate.toLocaleDateString()}
                </Text>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={selectedDate}
                  mode="date"
                  display="default"
                  onChange={onChangeDate}
                />
              )}
              <Text className="font-bold mt-2" style={{ fontFamily: 'Outfit_700Bold' }}>Hora do Serviço</Text>
              <View className="flex-row flex-wrap justify-between my-2">
                {times.map(time => {
                  const unavailable = isTimeUnavailable(time);
                  return (
                    <View key={time} className="w-1/3 p-1">
                      <Button
                        title={time}
                        onPress={() => !unavailable && setSelectedTime(time)}
                        disabled={unavailable}
                        color={unavailable ? 'red' : selectedTime === time ? '#FFD700' : 'gray'}
                      />
                    </View>
                  );
                })}
              </View>
              <Text className="font-bold mt-2" style={{ fontFamily: 'Outfit_700Bold' }}>Valor Mínimo</Text>
              <TextInput
                className="border border-gray-300 rounded-full p-2 mb-2"
                placeholder="R$ mínimo"
                keyboardType="numeric"
                value={minValue}
                onChangeText={setMinValue}
                style={{ fontFamily: 'Outfit_400Regular' }}
              />
              <Text className="font-bold mt-2" style={{ fontFamily: 'Outfit_700Bold' }}>Valor Máximo</Text>
              <TextInput
                className="border border-gray-300 rounded-full p-2 mb-2"
                placeholder="R$ máximo"
                keyboardType="numeric"
                value={maxValue}
                onChangeText={setMaxValue}
                style={{ fontFamily: 'Outfit_400Regular' }}
              />
              <TouchableOpacity
                onPress={handleSubmit}
                className="bg-yellow-500 py-3 rounded-lg items-center"
              >
                <Text className="text-black font-bold text-lg">Agendar Serviço</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
