import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { BackHandler } from 'react-native';


/**
 * @summary Custom Android back button Hook
 *
 * @description Hook for implement custom behavior on Android back button pressed.  
 *
 * @param func Returning true from *_func_* denotes that we have handled the event, and react-navigation's listener will not get called, thus not popping the screen. Returning false will cause the event to bubble up and react-navigation's listener will pop the screen.
 */
const useBackHandler = (func: () => boolean) => {
  
  useFocusEffect(
    useCallback(() => {
      const onBackPress = func;

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [func])
  );
  };

export default useBackHandler;
