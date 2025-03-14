import { useState } from 'react';

export function useHome() {
  const [address] = useState('Rua Bolsonaro, 22');
  const [promoBanner] = useState({
    title: 'Desconto Especial em Manutenção e Instalação de Ar-Condicionado!',
    code: 'HELP25',
    discount: '15% OFF',
  });
  const [categories] = useState([
    { id: 1, name: 'Serviço Doméstico', icon: 'home', faIcon: 'home' },
    { id: 2, name: 'Serviços de Sofware', icon: 'code', faIcon: 'code' },
    { id: 3, name: 'Serviço online', icon: 'globe', faIcon: 'globe' },
    { id: 4, name: 'Serviço veicular', icon: 'car', faIcon: 'car' },
    { id: 5, name: 'Serviço de Pet', icon: 'paw', faIcon: 'paw' },
    { id: 6, name: 'Serviço humano', icon: 'user', faIcon: 'user' },
    { id: 7, name: 'Serviços Comercial', icon: 'store', faIcon: 'store' },
    { id: 8, name: 'Outros', icon: 'ellipsis-h', faIcon: 'ellipsis-h' },
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