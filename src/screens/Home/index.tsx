import * as React from 'react';
import {Dimensions, ScrollView, StatusBar, View} from 'react-native';
import {WrapperView} from '../../components/Wrappers/SafeAreaWrapper';
import {ContentView} from '../../components/Wrappers/ContentView';
import {TextType} from '../../components/Text/TextView';
import {strings} from './strings';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import styled from 'styled-components';
import {RootStackParamList} from '../../utils/constants';
import {Header} from '../../components/UI/Header';
import apiServices from '../../api';
import useSWR from 'swr';
import {Logo} from '../History';
import {feeTypeById, getBalanceInFiat} from './utils';
import CurrencyInput from 'react-native-currency-input';
import {useMountWithFee} from '../../hooks/use-mount-with-fee';
import {FeeTypes, TransactionStatus} from '../../types/responseType';
import theme from '../../theme';
import CheckBoxFee from '../../components/CheckBoxFee';
import {ICheckboxButton} from 'react-native-bouncy-checkbox-group';
import {SeparatorView} from '../../components/UI/SeparatorView';
import {TextCustom} from '../../components/ListItem/ListItem';
import {useState} from 'react';
import {Modal, Portal, Text, Button, Provider} from 'react-native-paper';
import {Wallet} from '../../components/Wallet';

const {balanceServices: balanceAPI, ripioServices: ratesAPI} = apiServices;

const MIN_VALUE = 0.0;
const PRECISION_VALUE = 8;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const ContainerBalance = styled(View)`
  align-self: center;
  height: 40px;
  width: 90%;
  padding: 5px;
  border-radius: 5px;
  background-color: ${theme.colors.secondary};
`;
const ContainerCurrencyInput = styled(View)`
  align-items: center;
  height: 40px;
  padding: 5px;
  border-radius: 5px;
  background-color: ${theme.colors.background};
`;

const ContainerButton = styled(View)`
  flex-direction: row;
  justify-content: center;
`;
const CustomButton = styled(Button)`
  justify-content: center;
  margin-top: 30px;
`;

const HomeScreen = ({}: NativeStackScreenProps<RootStackParamList, 'Home'>) => {
  const [value, setValue] = useState(0);
  const [feeType, setFeeType] = useState<FeeTypes>(FeeTypes.hourFee);
  const [isModalVisible, setModalVisible] = useState(false);

  const {data: balance, mutate: mutateGet} = useSWR(
    'getBalance',
    balanceAPI.getBalance,
  );
  const myBalance = balance?.Balance.balance ?? 0;
  const {data: rates} = useSWR('getRates', ratesAPI.getRates);
  const [{mountWithFee, availableBalance}] = useMountWithFee(
    myBalance,
    value,
    feeType,
  );

  const onChangeValue = (mount: number) => {
    setValue(mount);
  };

  const onHandleSelectedCheckBox = (item: ICheckboxButton) => {
    setFeeType(feeTypeById(item.id));
  };

  const toggleModal = (dismiss?: boolean) => {
    setModalVisible(!isModalVisible);
    if (dismiss) {
      mutateGet();
    }
  };
  return (
    <WrapperView>
      <ContentView fullWidth={true}>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          keyboardShouldPersistTaps="handled">
          <StatusBar barStyle="dark-content" />
          <Header
            title={strings.home.infoTitle}
            subtitle={strings.home.infoSubtitle}
            textTypeTitle={TextType.bigBoldLato}
            buttonBack={false}
            secondaryComponent={() => (
              <View>
                <Logo source={require('../../assets/ripio-logo.png')} />
                <ContainerBalance>
                  <Text>{`${strings.home.balanceInBtc}: ${myBalance}`}</Text>
                  <Text>
                    {rates?.rates.ARS_SELL &&
                      `${strings.home.ARS}: ${getBalanceInFiat(
                        myBalance,
                        rates?.rates.ARS_SELL,
                      )}`}
                  </Text>
                </ContainerBalance>
              </View>
            )}
          />
          <ContainerCurrencyInput>
            <CurrencyInput
              value={value}
              style={styles.currencyInput}
              onChangeValue={onChangeValue}
              placeholder={'0 BTC'}
              delimiter="."
              separator=","
              precision={PRECISION_VALUE}
              minValue={MIN_VALUE}
            />
            <TextCustom>
              {`${strings.home.mountTotal} ${mountWithFee}`}
            </TextCustom>
            {!availableBalance && (
              <TextCustom color={theme.colors.red}>
                {strings.home.notBalance}
              </TextCustom>
            )}
          </ContainerCurrencyInput>
          <SeparatorView width={'40px'} height={'40px'} />
          <CheckBoxFee onHandlePress={onHandleSelectedCheckBox} />
          <ContainerButton>
            <CustomButton
              disabled={!availableBalance || !value}
              icon={'send'}
              mode="contained"
              onPress={() => toggleModal(false)}>
              {strings.home.send}
            </CustomButton>
          </ContainerButton>
          <Provider>
            <Portal>
              <Modal
                visible={isModalVisible}
                onDismiss={() => toggleModal(true)}
                contentContainerStyle={styles.contentModalStyle}>
                <Wallet
                  totalBalance={myBalance}
                  mountWithFee={mountWithFee}
                  refetch={() => toggleModal(true)}
                  status={
                    value === 0.00000001
                      ? TransactionStatus.failed
                      : TransactionStatus.completed
                  }
                />
              </Modal>
            </Portal>
          </Provider>
        </ScrollView>
      </ContentView>
    </WrapperView>
  );
};
const styles = {
  scrollView: {flexGrow: 1},
  currencyInput: {fontSize: 30},
  contentModalStyle: {
    backgroundColor: theme.colors.background,
    width: windowWidth,
    height: windowHeight / 2,
  },
};
export default HomeScreen;
