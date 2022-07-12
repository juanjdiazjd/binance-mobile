import * as React from 'react';
import {Image, ScrollView, StatusBar} from 'react-native';
import {WrapperView} from '../../components/Wrappers/SafeAreaWrapper';
import {ContentView} from '../../components/Wrappers/ContentView';
import {TextType} from '../../components/Text/TextView';
import {strings} from './strings';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import styled from 'styled-components';
import {RootStackParamList} from '../../utils/constants';
import {Header} from '../../components/UI/Header';

const Logo = styled(Image)`
  width: 80px;
  height: 60px;
`;

const HomeScreen = ({}: NativeStackScreenProps<RootStackParamList, 'Home'>) => {
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
              <Logo source={require('../../assets/ripio-logo.png')} />
            )}
          />
        </ScrollView>
      </ContentView>
    </WrapperView>
  );
};
const styles = {
  scrollView: {flexGrow: 1},
};
export default HomeScreen;
