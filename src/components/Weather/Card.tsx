import * as React from "react";
import { Text, View } from "react-native";
import styled from "styled-components";
import theme from "../../theme";
import { TextType, TextView } from "../Text/TextView";
import { removeDecimals } from "./utils/index";
import { WeatherData } from "../../types/Home/weather";
import { generateSkeleton, WeatherIcon } from "./styledComponents";
import { FigureSize, SkeletonType } from "../CustomSkeleton/types";

interface CardProps extends WeatherData {
  isFetching?: boolean;
}

export const WeatherWrapper = styled(View)`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;
export const WeatherCard = styled(View)`
  margin: 10px 5px;
  border-radius: 20px;
  width: 270px;
  height: 270px;
  background-color: white;
  shadow-offset: 5px 10px;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  animation: appear 500ms ease-out forwards;
`;
const TextTemp = styled(Text)`
  font-size: 80px;
  color: ${theme.colors.darkGray};
  opacity: 0.5;
`;

export const Card: React.FunctionComponent<CardProps> = ({
  location,
  weather,
}) => {
  return (
    <WeatherWrapper>
      <WeatherCard>
        {weather.icon ? (
          <WeatherIcon
            source={{
              uri: `https://openweathermap.org/img/wn/${weather.icon}@4x.png`,
            }}
          />
        ) : (
          generateSkeleton(SkeletonType.image, FigureSize.small, {
            alignSelf: "flex-end",
          })
        )}
        <View>
          {weather.temp ? (
            <TextTemp>{removeDecimals(weather.temp)}°</TextTemp>
          ) : (
            generateSkeleton(SkeletonType.text, FigureSize.large)
          )}

          <TextView
            id={"weather_city"}
            text={location.city}
            type={TextType.big}
            colorText={theme.colors.darkGray}
            style={{ opacity: 0.5 }}
            textAlign={"left"}
          />
        </View>
      </WeatherCard>
    </WeatherWrapper>
  );
};
