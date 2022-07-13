import apiServices from '../api';
import useSWR from 'swr';
import {FeeTypes} from '../types/responseType';
import {useMemo, useState} from 'react';
import {balanceAvailable, mountToSatoshi} from '../screens/Home/utils';

const {feeServices: feeAPI} = apiServices;

const TRANSACTION_SIZE_MEDIARATE = 226;

type FeeCalculated = {
  mountWithFee: string;
  availableBalance: boolean;
};

const INITIAL_STATE = {
  mountWithFee: '0',
  availableBalance: true,
};

export const useMountWithFee = (
  myBalance: number,
  sendMount: number,
  feeType: FeeTypes,
): [FeeCalculated] => {
  const [feeCalculated, setFeeCalculated] =
    useState<FeeCalculated>(INITIAL_STATE);

  const {data} = useSWR('getFeed', feeAPI.getFee);

  useMemo(() => {
    if (data && sendMount !== 0) {
      const fee = mountToSatoshi(TRANSACTION_SIZE_MEDIARATE * data[feeType]);
      const mountCalculated = sendMount + parseFloat(fee);
      setFeeCalculated({
        mountWithFee: mountCalculated.toFixed(8),
        availableBalance: balanceAvailable(myBalance, mountCalculated),
      });
    }
    if (!sendMount) {
      setFeeCalculated(INITIAL_STATE);
    }
  }, [myBalance, data, feeType, sendMount]);

  return [feeCalculated];
};
