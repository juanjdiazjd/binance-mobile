import * as React from 'react';
import {Image, ScrollView, StatusBar, Text, View} from 'react-native';
import {WrapperView} from '../../components/Wrappers/SafeAreaWrapper';
import {ContentView} from '../../components/Wrappers/ContentView';
import {TextType} from '../../components/Text/TextView';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import styled from 'styled-components';
import {RootStackParamList} from '../../utils/constants';
import {Header} from '../../components/UI/Header';
import {strings} from './strings';
import {Status} from '../../types/Home/transaction';
import {colorByStatus, parseDate} from '../../components/UI/ListItem/utils';
import {Row} from '../../components/UI/ListItem/ListItem';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../../theme';

const Logo = styled(Image)`
  width: 80px;
  height: 60px;
`;

const Container = styled(View)`
  background-color: ${theme.colors.white};
  height: 350px;
  width: 350px;
  border-radius: 10px;
  align-self: center;
`;

const BigIcon = styled(Icon)<{
  status: Status;
}>`
  color: ${({status}) => colorByStatus(status)};
  padding: 30px;
  align-self: center;
`;
const CustomColumn = styled(View)`
  flex-direction: column;
  justify-content: space-evenly;
  align-self: center;
`;

const TextDetailCustom = styled(Text)`
  color: black;
  padding: 5px;
  font-size: 16px;
`;

const TextDetailBold = styled(Text)`
  font-weight: bold;
`;

const TransactionDetailScreen = ({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, 'TransactionDetail'>) => {
  const {transaction} = route.params;
  return (
    <WrapperView>
      <ContentView fullWidth={true}>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          keyboardShouldPersistTaps="handled">
          <StatusBar barStyle="dark-content" />
          <Header
            title={strings.transactionDetail.infoTitle}
            subtitle={strings.transactionDetail.infoSubtitle}
            textTypeTitle={TextType.bigBoldLato}
            buttonBack={true}
            onPressButtonBack={() => navigation.goBack()}
            secondaryComponent={() => (
              <Logo source={require('../../assets/ripio-logo.png')} />
            )}
          />
          <Container>
            <BigIcon
              status={transaction.status}
              name={
                transaction.status === Status.completed
                  ? 'check-circle'
                  : 'close-circle'
              }
              size={60}
              color={colorByStatus(transaction.status)}
            />
            <CustomColumn>
              <TextDetailCustom>
                {strings.transactionDetail.idInfo}:
                <TextDetailBold>{transaction.id}</TextDetailBold>
              </TextDetailCustom>
              <Row>
                <TextDetailCustom>
                  {strings.transactionDetail.currency}:
                </TextDetailCustom>
                <Icon name="bitcoin" size={30} color={theme.colors.secondary} />
              </Row>
              <TextDetailCustom>
                {strings.transactionDetail.transactionType}: Envío
              </TextDetailCustom>
              <TextDetailCustom>
                {strings.transactionDetail.mount}: {transaction.mount}
              </TextDetailCustom>
              <TextDetailCustom>
                {strings.transactionDetail.date}:{' '}
                {parseDate(transaction.date, true)}
              </TextDetailCustom>
            </CustomColumn>
          </Container>
        </ScrollView>
      </ContentView>
    </WrapperView>
  );
};
const styles = {
  scrollView: {flexGrow: 1},
};
export default TransactionDetailScreen;
