import NetInfo from '@react-native-community/netinfo';

import { IS_IOS } from '../config/constants';

const hasConnection = async () => {
  const { isConnected, isInternetReachable } = await NetInfo.fetch();

  return !!(isConnected && (IS_IOS || isInternetReachable));
};

export { hasConnection };
