import { useState } from 'react';

export function useHome() {
  const [address] = useState('Rua Bolsonaro, 22');
  const [promoBanner] = useState({
    title: 'Desconto Especial em Manutenção e Instalação de Ar-Condicionado!',
    code: 'HELP25',
    discount: '15% OFF',
  });
  const [categories] = useState([
    { id: 1, name: 'Elétrica', icon: 'bolt' },
    { id: 2, name: 'Mecânica', icon: 'build' },
    { id: 3, name: 'Serviço Geral', icon: 'handyman' },
    { id: 4, name: 'Pinturas', icon: 'format-paint' },
    { id: 5, name: 'Hidráulica', icon: 'water' },
    { id: 6, name: 'Montagem de Móveis', icon: 'home-repair-service' },
    { id: 7, name: 'Jardinagem', icon: 'yard' },
  ]);
  
  const [rankingPrestadores] = useState([
    {
      id: 1,
      name: 'Eduardo',
      area: 'Hidráulica',
      image: require('../assets/image.png'),
    },
    {
      id: 2,
      name: 'Nathan',
      area: 'profissional do Linux',
      image: require('../assets/image.png'),
    },
    {
      id: 3,
      name: 'Enzo',
      area: 'Eletricista',
      image: require('../assets/image.png'),
    },
  ]);
  
  const [campaignBanner] = useState({
    title: 'BANNER DE CAMPANHA',
    coupon: 'CUPOM',
  });

  return {
    address,
    promoBanner,
    categories,
    rankingPrestadores,
    campaignBanner,
  };
}
