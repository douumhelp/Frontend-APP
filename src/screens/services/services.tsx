// src/screens/ServicesScreen.tsx
import React from 'react';
import { SafeAreaView, Alert, Button, View, Text, FlatList } from 'react-native';
import { useServices, ServiceRequest } from '../../context/ServicesContext';
import { useFonts, Outfit_400Regular, Outfit_700Bold } from '@expo-google-fonts/outfit';

// Componente que renderiza cada item do serviço
const ServiceItem = ({ item }: { item: ServiceRequest }) => (
  <View className="border border-gray-300 rounded p-4 mb-3">
    <Text className="font-bold text-lg mb-1" style={{ fontFamily: 'Outfit_700Bold' }}>
      {item.serviceName}
    </Text>
    <Text style={{ fontFamily: 'Outfit_400Regular' }}>Data: {item.date}</Text>
    <Text style={{ fontFamily: 'Outfit_400Regular' }}>Hora: {item.time}</Text>
    <Text style={{ fontFamily: 'Outfit_400Regular' }}>Endereço: {item.address}</Text>
    <Text style={{ fontFamily: 'Outfit_400Regular' }}>Subcategoria ID: {item.subcategoryId}</Text>
    <Text style={{ fontFamily: 'Outfit_400Regular' }}>
      Valor: R$ {item.minValue} até R$ {item.maxValue}
    </Text>
    <Text style={{ fontFamily: 'Outfit_400Regular' }}>Status: {item.status}</Text>
    {/* Exibe botão para pagamento se o prestador aceitou */}
    {item.status === 'Prestador aceitou' && (
      <Button
        title="Ir para o pagamento"
        color="#FFD700"
        onPress={() => Alert.alert('Pagamento', 'Redirecionando para o pagamento...')}
      />
    )}
  </View>
);

export default function ServicesScreen() {
  const { requests } = useServices();
  const [fontsLoaded] = useFonts({ Outfit_400Regular, Outfit_700Bold });
  if (!fontsLoaded) return null;

  return (
    <SafeAreaView className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold mb-4" style={{ fontFamily: 'Outfit_700Bold' }}>
        Meus Serviços
      </Text>
      {requests.length === 0 ? (
        <Text style={{ fontFamily: 'Outfit_400Regular' }}>Nenhum serviço agendado.</Text>
      ) : (
        <FlatList
          data={requests}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <ServiceItem item={item} />}
        />
      )}
    </SafeAreaView>
  );
}
