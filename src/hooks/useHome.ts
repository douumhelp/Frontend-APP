import { useState } from 'react';

export function useHome() {
  const [address] = useState('Rua Bolsonaro, 22');
  const [promoBanner] = useState({
    title: 'Desconto Especial em Manutenção e Instalação de Ar-Condicionado!',
    code: 'HELP25',
    discount: '15% OFF',
  });

  // Ajuste aqui os ícones para nomes do Font Awesome
  const [categories] = useState([
    { id: 1, name: 'Elétrica', icon: 'bolt' },          // FontAwesome5: bolt
    { id: 2, name: 'Mecânica', icon: 'cogs' },          // FontAwesome5: cogs
    { id: 3, name: 'Serviço Geral', icon: 'tasks' },    // FontAwesome5: tasks
    { id: 4, name: 'Pinturas', icon: 'paint-brush' },   // FontAwesome5: paint-brush
    { id: 5, name: 'Hidráulica', icon: 'tint' },        // FontAwesome5: tint
    { id: 6, name: 'Montagem de Móveis', icon: 'hammer' }, // FontAwesome5: hammer
    { id: 7, name: 'Jardinagem', icon: 'leaf' },        // FontAwesome5: leaf
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
