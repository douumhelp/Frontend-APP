import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { useFonts, Outfit_400Regular, Outfit_700Bold } from '@expo-google-fonts/outfit';

interface Address {
  id: number;
  rua: string;
  numero: string;
  bairro: string;
  cep: string;
  cidade: string;
  estado: string;
}

const initialFormState = {
  rua: '',
  numero: '',
  bairro: '',
  cep: '',
  cidade: '',
  estado: '',
};

export default function AddressScreen() {
  const [fontsLoaded] = useFonts({ Outfit_400Regular, Outfit_700Bold });
  const router = useRouter();
  // Endereço padrão para teste
  const [addresses, setAddresses] = useState<Address[]>([
    { id: 1, rua: 'Rua Bolsonaro', numero: '22', bairro: 'Centro', cep: '12345-678', cidade: 'Cidade Teste', estado: 'Teste' }
  ]);
  const [form, setForm] = useState(initialFormState);
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleSave = () => {
    const { rua, numero, bairro, cep, cidade, estado } = form;
    if (!rua || !numero || !bairro || !cep || !cidade || !estado) {
      Alert.alert('Atenção', 'Preencha todos os campos.');
      return;
    }
    if (editingId === null) {
      const newAddress: Address = { id: Date.now(), ...form };
      setAddresses(prev => [...prev, newAddress]);
    } else {
      setAddresses(prev =>
        prev.map(addr =>
          addr.id === editingId ? { ...addr, ...form } : addr
        )
      );
      setEditingId(null);
    }
    setForm(initialFormState);
  };

  const handleEdit = (address: Address) => {
    setEditingId(address.id);
    setForm({
      rua: address.rua,
      numero: address.numero,
      bairro: address.bairro,
      cep: address.cep,
      cidade: address.cidade,
      estado: address.estado,
    });
  };

  const handleDelete = (id: number) => {
    Alert.alert(
      'Confirmar Exclusão',
      'Tem certeza que deseja excluir este endereço?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            setAddresses(prev => prev.filter(addr => addr.id !== id));
            if (editingId === id) {
              setEditingId(null);
              setForm(initialFormState);
            }
          },
        },
      ]
    );
  };

  if (!fontsLoaded) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <Text style={{ fontFamily: 'Outfit_400Regular' }}>Carregando...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white p-4">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }} keyboardShouldPersistTaps="handled">
            <TouchableOpacity onPress={() => router.back()} style={{marginLeft: 1, marginBottom: 20, marginTop: 50}}>
              <FontAwesome name="arrow-left" size={30} color="#FFD700" />
            </TouchableOpacity>
            <Text className="text-2xl font-bold mb-4" style={{ fontFamily: 'Outfit_700Bold' }}>
              Meus Endereços
            </Text>
            <View className="mb-4">
              <TextInput
                className="border border-gray-300 rounded p-2 mb-2"
                placeholder="Rua"
                value={form.rua}
                onChangeText={text => setForm({ ...form, rua: text })}
                style={{ fontFamily: 'Outfit_400Regular' }}
              />
              <TextInput
                className="border border-gray-300 rounded p-2 mb-2"
                placeholder="Número"
                value={form.numero}
                onChangeText={text => setForm({ ...form, numero: text })}
                style={{ fontFamily: 'Outfit_400Regular' }}
              />
              <TextInput
                className="border border-gray-300 rounded p-2 mb-2"
                placeholder="Bairro"
                value={form.bairro}
                onChangeText={text => setForm({ ...form, bairro: text })}
                style={{ fontFamily: 'Outfit_400Regular' }}
              />
              <TextInput
                className="border border-gray-300 rounded p-2 mb-2"
                placeholder="CEP"
                value={form.cep}
                onChangeText={text => setForm({ ...form, cep: text })}
                style={{ fontFamily: 'Outfit_400Regular' }}
              />
              <TextInput
                className="border border-gray-300 rounded p-2 mb-2"
                placeholder="Cidade"
                value={form.cidade}
                onChangeText={text => setForm({ ...form, cidade: text })}
                style={{ fontFamily: 'Outfit_400Regular' }}
              />
              <TextInput
                className="border border-gray-300 rounded p-2 mb-2"
                placeholder="Estado"
                value={form.estado}
                onChangeText={text => setForm({ ...form, estado: text })}
                style={{ fontFamily: 'Outfit_400Regular' }}
              />
              <TouchableOpacity
                onPress={handleSave}
                className="bg-yellow-500 py-3 rounded-lg items-center"
              >
                <Text className="text-black font-bold text-lg">
                  {editingId ? 'Atualizar Endereço' : 'Salvar Endereço'}
                </Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={addresses}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View className="border border-gray-300 rounded p-3 mb-2">
                  <Text style={{ fontFamily: 'Outfit_700Bold' }}>
                    {item.rua}, {item.numero}
                  </Text>
                  <Text style={{ fontFamily: 'Outfit_400Regular' }}>
                    {item.bairro} - {item.cidade}/{item.estado}
                  </Text>
                  <Text style={{ fontFamily: 'Outfit_400Regular' }}>CEP: {item.cep}</Text>
                  <View className="flex-row mt-2">
                    <TouchableOpacity
                      onPress={() => handleEdit(item)}
                      className="bg-blue-500 py-2 px-4 rounded mr-2"
                    >
                      <Text style={{ fontFamily: 'Outfit_700Bold', color: 'white' }}>Editar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleDelete(item.id)}
                      className="bg-red-500 py-2 px-4 rounded"
                    >
                      <Text style={{ fontFamily: 'Outfit_700Bold', color: 'white' }}>Excluir</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              ListEmptyComponent={
                <Text className="text-gray-500" style={{ fontFamily: 'Outfit_400Regular' }}>
                  Nenhum endereço cadastrado.
                </Text>
              }
            />
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
