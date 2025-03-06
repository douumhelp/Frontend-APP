import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  Image,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import Carrosel1 from '../../assets/Carrosel1.png';
import Carrosel2 from '../../assets/Carrosel2.png';
import Carrosel3 from '../../assets/Carrosel3.png';
import Carrosel4 from '../../assets/Carrosel4.png';

export function Carrosel() {
  const images = [Carrosel4,Carrosel1, Carrosel3,Carrosel2];
  const scrollRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { width } = Dimensions.get('window');
  const CAROUSEL_HEIGHT = 160;
  const carouselWidth = width - 32;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        let nextIndex = prevIndex + 1;
        if (nextIndex >= images.length) {
          nextIndex = 0;
        }
        scrollRef.current?.scrollTo({ x: nextIndex * carouselWidth, animated: true });
        return nextIndex;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length, carouselWidth]);

  const onScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = e.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / carouselWidth);
    setCurrentIndex(index);
  };

  return (
    <View
      className="mt-2 mx-4 rounded-lg overflow-hidden"
      style={{ width: carouselWidth, height: CAROUSEL_HEIGHT }}
    >
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        onMomentumScrollEnd={onScrollEnd}
        showsHorizontalScrollIndicator={false}
        style={{ width: carouselWidth, height: CAROUSEL_HEIGHT }}
      >
        {images.map((img, index) => (
          <View
            key={index}
            style={{
              width: carouselWidth,
              height: CAROUSEL_HEIGHT,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Image
              source={img}
              resizeMode="contain"
              style={{ width: '100%', height: '100%' }}
            />
          </View>
        ))}
      </ScrollView>
      <View className="absolute bottom-1 left-0 right-0 flex-row justify-center">
        {images.map((_, i) => (
          <View
            key={i}
            className={`mx-1 w-2.5 h-2.5 rounded-full ${
              i === currentIndex ? 'bg-black' : 'bg-gray-300'
            }`}
          />
        ))}
      </View>
    </View>
  );
}
