import React from 'react';
import { View, Text, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';

type Prestador = {
  id: number;
  name: string;
  area: string;
  image: any; 
};

type RankingPrestadorProps = {
  data: Prestador[];
  fontRegular?: string;
  fontBold?: string;
};

const placeIcons = [
  { icon: 'trophy', color: '#FFD700' },  
  { icon: 'medal', color: '#C0C0C0' },   
  { icon: 'medal', color: '#CD7F32' },  
];

export function RankingPrestador({ data, fontRegular, fontBold }: RankingPrestadorProps) {
  return (
    <Animatable.View
      animation="fadeInUp"
      duration={700}
      className="mt-4 mx-4 bg-white rounded-lg p-4"
    >
      <View className="flex-row items-center mb-3">
        <FontAwesome5 name="trophy" size={20} color="#FFD700" className="mr-2" />
        <Text className="text-black text-lg" style={{ fontFamily: fontBold }}>
          Melhores Prestadores do Mês
        </Text>
      </View>

      <View className="flex-row justify-around">
        {data.map((prestador, index) => {
          const { icon, color } = placeIcons[index] || { icon: 'medal', color: '#888' };

          return (
            <View
              key={prestador.id}
              className="bg-white rounded-lg items-center p-2 shadow w-28 h-40"
            >
              <Image
                source={prestador.image}
                className="w-12 h-12 rounded-full mb-2"
              />

              <Text
                className="text-black text-center text-sm mb-1"
                style={{ fontFamily: fontBold }}
              >
                {prestador.name}
              </Text>
              <Text
                className="text-gray-600 text-center text-xs"
                style={{ fontFamily: fontRegular }}
              >
                {prestador.area}
              </Text>

              <View className="flex-row mt-1">
                <FontAwesome name="star" size={12} color="#FFD700" />
                <FontAwesome name="star" size={12} color="#FFD700" />
                <FontAwesome name="star" size={12} color="#FFD700" />
                <FontAwesome name="star-half" size={12} color="#FFD700" />
                <FontAwesome name="star-o" size={12} color="#FFD700" />
              </View>

              <View className="flex-row items-center mt-1">
                <FontAwesome5 name={icon} size={14} color={color} />
                <Text className="ml-1 text-xs text-black" style={{ fontFamily: fontBold }}>
                  {index === 0 ? '1°' : index === 1 ? '2°' : index === 2 ? '3°' : ''}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </Animatable.View>
  );
}
