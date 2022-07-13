import * as React from 'react';
import {useEffect, useState} from 'react';
import {View, ViewProps} from 'react-native';
import {TextInput} from 'react-native-paper';
import styled from 'styled-components';
import {Text, Button} from 'react-native-paper';
import apiServices from '../../api/';
import useSWR from 'swr';
import {TransactionStatus} from '../../types/responseType';
import {strings} from '../../screens/Home/strings';
import {SeparatorView} from '../UI/SeparatorView';
import Toast from 'react-native-toast-message';

const {transactionServices: transactionsAPI, balanceServices: balanceAPI} =
  apiServices;

const ComponentContainer = styled(View)`
  flex-direction: column;
  justify-content: space-between;
`;
const ContainerAddressButton = styled(View)`
  flex-direction: row;
  justify-content: center;
`;

const CustomButton = styled(Button)`
  justify-content: center;
  margin-top: 30px;
`;

const TextCustom = styled(Text)`
  padding-left: 20px;
  font-size: 18px;
`;

const CustomTextInput = styled(TextInput)`
  align-self: center;
  width: 350px;
`;

interface WalletViewProps extends ViewProps {
  totalBalance: number;
  mountWithFee: string;
  status: TransactionStatus;
  refetch: () => void;
}

export const Wallet: React.FunctionComponent<WalletViewProps> = ({
  totalBalance,
  mountWithFee,
  refetch,
  status,
}) => {
  const [address, setAddress] = useState('');
  const [shouldFetchCreate, setShouldFetch] = useState(false);
  const [shouldUpdateBalance, setShouldUpdateBalance] = useState(false);

  const {} = useSWR(shouldFetchCreate ? 'createTransaction' : null, () =>
    transactionsAPI.createTransaction({
      mount: mountWithFee,
      address: address,
      status: status,
    }),
  );

  const {data: responseUpdateBalance} = useSWR(
    shouldUpdateBalance ? 'updateBalance' : null,
    () =>
      balanceAPI.updateBalance({
        balance: {
          balance: totalBalance - parseFloat(mountWithFee),
        },
      }),
  );
  useEffect(() => {
    if (responseUpdateBalance?.status === 200) {
      Toast.show({
        type: status === TransactionStatus.completed ? 'success' : 'error',
        text1:
          status === TransactionStatus.completed
            ? 'Transacción con éxito '
            : 'Transacción fallida',
        text2: 'Gracias!',
      });
    }
  }, [responseUpdateBalance, status]);

  const sendBTC = () => {
    setShouldFetch(true);
    setShouldUpdateBalance(true);
    refetch();
  };

  return (
    <ComponentContainer>
      <TextCustom>Vas a enviar: {mountWithFee}</TextCustom>
      <TextCustom>Ingresa la billetera de destino:</TextCustom>
      <SeparatorView width={'20px'} height={'20px'} />
      <CustomTextInput
        label="BTC Address"
        value={address}
        onChangeText={addressInput => setAddress(addressInput)}
      />
      <ContainerAddressButton>
        <CustomButton
          disabled={!address}
          icon={'send'}
          mode="contained"
          onPress={sendBTC}>
          {strings.home.send}
        </CustomButton>
      </ContainerAddressButton>
    </ComponentContainer>
  );
};

export default Wallet;
