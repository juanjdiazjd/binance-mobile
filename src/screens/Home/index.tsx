import * as React from 'react';
import {ScrollView, StatusBar} from 'react-native';
import Header from '../../components/Header';
import theme from '../../theme';
import {icons, RootStackParamList} from './utils';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {WrapperView} from '../../components/Wrappers/SafeAreaWrapper';
import {ContentView} from '../../components/Wrappers/ContentView';
import {TextType, TextView} from '../../components/Text/TextView';
import {useCallback} from 'react';
import {useShallowEqualSelector} from '../../utils/reduxUtils';
import {useActions} from '../../hooks';
import {HomeActions} from '../../actions/homeActions';
import {useFocusEffect} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Card} from '../../components/Weather/Card';
import {ForecastData, WeatherData} from '../../types/Home/weather';
import {CarouselCustom} from '../../components/Weather/Carousel';
import {OptionsState} from '../../types/responseType';

import {strings} from './strings';

const HomeScreen = ({
  route,
}: NativeStackScreenProps<RootStackParamList, 'Home'>) => {
  const {getCurrentWeather, getForecastWeather} = useActions({
    getCurrentWeather: HomeActions.getCurrentWeather,
    getForecastWeather: HomeActions.getForecastWeather,
  });
  const {
    weather: weather,
    location: location,
    isFetchingCurrentMethod: isFetchingCurrentMethod,
    isFetchingForecastMethod: isFetchingForecastMethod,
    forecast: forecast,
  }: WeatherData<OptionsState> & ForecastData = useShallowEqualSelector(
    state => state.weatherCurrentReducer,
  );

  useFocusEffect(
    useCallback(() => {
      getCurrentWeather();
      getForecastWeather();
    }, []),
  );
  return (
    <WrapperView>
      <ContentView fullWidth={true}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          keyboardShouldPersistTaps="handled">
          <StatusBar barStyle="light-content" />
          <Header
            title={strings.home.infoTitle}
            subtitle={strings.home.infoSubtitle}
            withoutBackButton={false}
            secondaryComponent={() => (
              <Icon
                name={icons[route.name]}
                color={theme.colors.primary}
                size={50}
              />
            )}
          />

          <Card
            weather={weather}
            location={location}
            isFetching={isFetchingCurrentMethod}
          />
          <TextView
            id="extended"
            type={TextType.medium}
            text={strings.home.infoExtended}
            textAlign={'left'}
            style={{left: 20, top: 10}}
            colorText={theme.colors.white}
          />
          <CarouselCustom
            isFetching={isFetchingForecastMethod}
            layout="stack"
            forecast={forecast}
          />
        </ScrollView>
      </ContentView>
    </WrapperView>
  );
};

export default HomeScreen;
