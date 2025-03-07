import React, { useState } from 'react';
import { View } from 'react-native';
import { FAB } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { Portal } from 'react-native-paper';
import { useFonts, Outfit_400Regular, Outfit_700Bold } from '@expo-google-fonts/outfit';

export function ButtonFab() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  let [fontsLoaded] = useFonts({
    Outfit_400Regular,
    Outfit_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View className="absolute bottom-6 right-6 z-50" pointerEvents="box-none">
      <Portal>
        <FAB.Group
          backdropColor="rgba(0, 0, 0, 0.8)"
          visible={true}
          open={open}
          icon={open ? 'close' : 'plus'}
          color="#000000" 
          fabStyle={{ backgroundColor: '#FFD700' }} 
          actions={[
            { 
              icon: 'chat', 
              label: 'Chat', 
              onPress: () => router.push('chat'),
              color: '#000', 
              labelStyle: { 
                fontFamily: 'Outfit_400Regular', 
                color: '#ffff'
              }
            },
            { 
              icon: 'tools', 
              label: 'Meus Serviços', 
              onPress: () => router.push('services'),
              color: '#000', 
              labelStyle: { 
                fontFamily: 'Outfit_400Regular', 
                color: '#ffff' 
              }
            },
          ]}
          onStateChange={({ open }) => setOpen(open)}
          onPress={() => setOpen(!open)}
          style={{ zIndex: 1000, elevation: 10,  }}
        />
      </Portal>
    </View>
  );
}