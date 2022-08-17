import LocalizedStrings from 'react-native-localization';

export const strings = new LocalizedStrings({
  es: {
    orderBook: {
      infoTitle: 'Órdenes',
      infoSubtitle: 'Listado de órdenes abiertas:',
      notFound: 'No hay ninguna orden abierta...',
    },
  },

  en: {
    orderBook: {
      infoTitle: 'Orders',
      infoSubtitle: 'List of open orders:',
      notFound: 'No open orders found',
    },
  },
});
