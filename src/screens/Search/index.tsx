import * as React from "react";
import { ScrollView, StatusBar, Text, View } from "react-native";
import Header from "../../components/Header";
import theme from "../../theme";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { WrapperView } from "../../components/Wrappers/SafeAreaWrapper";
import { ContentView } from "../../components/Wrappers/ContentView";
import { useCallback, useEffect, useState } from "react";
import { useShallowEqualSelector } from "../../utils/reduxUtils";
import { useActions } from "../../hooks";
import { HomeActions } from "../../actions/homeActions";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ForecastData, WeatherData } from "../../types/Home/weather";
import { CarouselCustom } from "../../components/Weather/Carousel";
import { OptionsState } from "../../types/responseType";
import { strings } from "./strings";
import { icons, RootStackParamList } from "../Home/utils";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useLocationCity } from "./hooks/useLocationCity";
import { TextType, TextView } from "../../components/Text/TextView";
import Config from "react-native-config";
import styled from "styled-components";
import CustomActivityIndicator from "../../components/CustomActivityIndicator";

const GooglePlacesAutocompleteContainer = styled(View)`
  flex: 1;
  align-self: center;
  width: 90%;
`;

const SearchScreen = ({
  route,
}: NativeStackScreenProps<RootStackParamList, "Search">) => {
  const { getForecastWeather } = useActions({
    getForecastWeather: HomeActions.getForecastWeather,
  });
  const {
    isFetchingForecastMethod: isFetchingForecastMethod,
    forecastSearchData: forecastSearchData,
    forecast: forecast,
  }: WeatherData<OptionsState> & ForecastData = useShallowEqualSelector(
    (state) => state.weatherCurrentReducer
  );
  const [city, setCity] = useState<string>("");
  const [loading, setLoading] = useState<boolean | undefined>(undefined);

  const [latLong] = useLocationCity(city);

  const onChangeTextPress = useCallback(
    (search) => {
      setLoading(true);
      setCity(search);
    },
    [getForecastWeather]
  );
  useEffect(() => {
    getForecastWeather();
  }, []);

  useEffect(() => {
    if (latLong) {
      getForecastWeather(latLong);
    }
  }, [latLong]);

  useEffect(() => {
    if (isFetchingForecastMethod === false) {
      setLoading(false);
    }
  }, [isFetchingForecastMethod]);

  return (
    <WrapperView>
      <ContentView fullWidth={true}>
        <StatusBar barStyle="light-content" />
        <Header
          title={strings.search.infoTitle}
          subtitle={strings.search.infoSubtitle}
          withoutBackButton={false}
          secondaryComponent={() => (
            <Icon
              name={icons[route.name]}
              color={theme.colors.primary}
              size={50}
            />
          )}
        />
        <GooglePlacesAutocompleteContainer>
          <GooglePlacesAutocomplete
            placeholder="Buscar ciudad"
            onPress={(data) => {
              onChangeTextPress(data.description);
            }}
            query={{
              key: Config.API_KEY_GOOGLE_MAPS,
              language: "es",
            }}
          />
        </GooglePlacesAutocompleteContainer>
        <TextView
          id="extended"
          type={TextType.medium}
          text={city || "Ubicación actual"}
          textAlign={"left"}
          style={{ left: 20, top: 10, maxWidth: 200 }}
          colorText={theme.colors.white}
        />
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          {loading ? (
            <CustomActivityIndicator />
          ) : (
            <CarouselCustom layout="default" forecast={!city ? forecast : forecastSearchData} />
          )}
        </ScrollView>
      </ContentView>
    </WrapperView>
  );
};

export default SearchScreen;
