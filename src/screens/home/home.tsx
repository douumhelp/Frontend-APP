import React from 'react';
import { ScrollView, Text, ActivityIndicator, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts, Outfit_400Regular, Outfit_700Bold } from '@expo-google-fonts/outfit';
import { Navbar } from '../../components/home/Navbar';
import { Carrosel } from '../../components/home/Carrosel';
import { Categories } from '../../components/home/Categories';
import { RankingPrestador } from '../../components/home/Ranking';
import { ButtomHelp } from '../../components/home/ButtomHelp';
import { useHome } from '../../hooks/useHome';

export default function Home() {
  const [fontsLoaded] = useFonts({
    Outfit_400Regular,
    Outfit_700Bold,
  });

  const { address, categories, rankingPrestadores, campaignBanner } = useHome();
  const fontRegular = 'Outfit_400Regular';
  const fontBold = 'Outfit_700Bold';

  if (!fontsLoaded) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (   
    <SafeAreaView className="flex-1 bg-gray-100">
      <Navbar address={address} fontRegular={fontRegular} fontBold={fontBold} />
      <ScrollView>
        <Carrosel />
        <Categories data={categories} fontRegular={fontRegular} />
        <RankingPrestador
          data={rankingPrestadores}
          fontRegular={fontRegular}
          fontBold={fontBold}
        />
        <ButtomHelp
          onPress={() => console.log('Solicitar um HELP')}
          fontRegular={fontRegular}
          fontBold={fontBold}
        />
        <View className="mx-4 mt-6 p-4 bg-white rounded-lg items-center">
          <Text className="text-lg mb-2 text-black" style={{ fontFamily: fontBold }}>
            {campaignBanner.title}
          </Text>
          <Text className="text-yellow-500 text-xl" style={{ fontFamily: fontBold }}>
            {campaignBanner.coupon}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
