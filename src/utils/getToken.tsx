import AsyncStorage from "@react-native-async-storage/async-storage";
import * as React from 'react';

export const getFromAsyncStorage = async (key: string) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const data:any = await AsyncStorage.getItem(key);
  
      return JSON.parse(data);
    } catch (error) {
      throw error;
    }
  };

  export  const setAsyncStorage = async (keyName:string, value: object) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(keyName, jsonValue)

    } catch (e) {

    }
  }
  export  const removeItemFromAsyncStorge = async (keyName:string) => {
    try {
      await AsyncStorage.removeItem(keyName)

    } catch (e) {

    }
  }
