import { Platform, StatusBar } from 'react-native';
import DeviceInfo from 'react-native-device-info';

export type VOID_FUNC = () => {};

export const SUPPORT_NOTCH =
  Platform.OS === 'ios' ||
  (Platform.OS === 'android' && Platform.Version >= 23);
export const IS_ANDROID = Platform.OS === 'android';
export const IS_IOS = Platform.OS === 'ios';

export const HAS_NOTCH = DeviceInfo.hasNotch();