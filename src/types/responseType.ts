import {TextStyle, ViewStyle} from 'react-native';

export type RequestCreateTransaction = {
  mount: string;
  address: string;
  status: string;
};

type Balance = {
  balance: number;
};

export type RequestUpdateBalance = {
  balance: Balance;
};

export type ResponseGetBalance = {
  Balance: {
    id: string;
    balance: number;
  };
  ErrorMsg: string;
};

export type ResponseMessage = {
  Message: string;
};

export type Rates = {
  base: string;
  rates: {[key: string]: number};
  names: {[key: string]: {[key: string]: string}};
  variation: {[key: string]: string};
};

export enum FeeTypes {
  fastestFee = 'fastestFee',
  halfHourFee = 'halfHourFee',
  hourFee = 'hourFee',
}

export const Fees = [
  FeeTypes.fastestFee,
  FeeTypes.halfHourFee,
  FeeTypes.hourFee,
];

export type FeeNamesForCheckBox = {
  id: number;
  text: string;
  feeType: FeeTypes;
  textStyle: TextStyle;
  fillColor: string;
  unfillColor: string;
  style?: ViewStyle;
};

export type Fee = {
  fastestFee: number;
  halfHourFee: number;
  hourFee: number;
};

export enum TransactionStatus {
  completed = 'completed',
  failed = 'failed',
}
