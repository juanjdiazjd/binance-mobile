import * as React from 'react';
import {Suspense} from 'react';
import {View, ViewProps} from 'react-native';
import {TextInput} from 'react-native-paper';
import styled from 'styled-components';
import {Text, Button} from 'react-native-paper';
import {TransactionStatus} from '../../types/responseType';
import {strings} from '../../screens/Home/strings';
import {SeparatorView} from '../UI/SeparatorView';
import Toast from 'react-native-toast-message';
import {useGetAddress} from './hooks/use-get-address';
import {URLS} from '../../api/services/config';
import axios from 'axios';
import {Config} from 'react-native-config';
const {transactions, balance} = URLS;

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
  const [address, setAddress] = useGetAddress();

  const onHandlePress = async () => {
    await axios.post(Config.URL_API_TRANSACTIONS + transactions.create, {
      mount: mountWithFee.toString(),
      address: address,
      status: status,
    });

    const response = await axios.post(
      Config.URL_API_TRANSACTIONS + balance.update,
      {
        balance: {
          balance: totalBalance - parseFloat(mountWithFee),
        },
      },
    );
    if (response.status === 200) {
      Toast.show({
        type: status === TransactionStatus.completed ? 'success' : 'error',
        text1:
          status === TransactionStatus.completed
            ? 'Transacción con éxito '
            : 'Transacción fallida',
        text2: 'Gracias!',
      });
      refetch();
    }
  };

  const useChangeAddress = (addressInput: string) => setAddress(addressInput);
  return (
    <Suspense fallback={<Text>loading...</Text>}>
      <ComponentContainer>
        <TextCustom>Vas a enviar: {mountWithFee}</TextCustom>
        <TextCustom>Ingresa la billetera de destino:</TextCustom>
        <SeparatorView width={'20px'} height={'20px'} />
        <CustomTextInput
          label="BTC Address"
          value={address}
          onChangeText={useChangeAddress}
        />
        <ContainerAddressButton>
          <CustomButton
            disabled={!address}
            icon={'send'}
            mode="contained"
            onPress={onHandlePress}>
            {strings.home.send}
          </CustomButton>
        </ContainerAddressButton>
      </ComponentContainer>
    </Suspense>
  );
};

export default Wallet;
