import * as React from 'react';
import {ListRenderItem, Text, View} from 'react-native';
import styled from 'styled-components';
import theme from '../../theme';
import {formatDate, removeDecimals} from './utils';
import {Forecast} from '../../types/Home/weather';
import Carousel from 'react-native-snap-carousel';
import {useRef, useState} from 'react';
import {generateSkeleton, WeatherIcon} from './styledComponents';
import {FigureSize, SkeletonType} from '../CustomSkeleton/types';
//Constants
const DEFAULT_FORECAST_DATA: Forecast[] = [
  {
    date: '',
    humidity: 0,
    icon_id: 0,
    temperature: 0,
    description: '',
    wind_speed: 0,
    icon: '',
    temp_max: 0,
    temp_min: 0,
  },
];
//Interfaces
interface CarouselCustomProps {
  forecast: Forecast[];
  isFetching?: boolean;
  layout?: 'default' | 'stack' | 'tinder' | undefined;
}

//Styled Components
const WeatherWrapper = styled(View)`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

const CarouselContainer = styled(View)`
  flex: 1;
  justify-content: space-between;
  background-color: white;
  border-radius: 5px;
  height: 120px;
  width: 270px;
  padding: 10px;
  margin-left: 20%;
`;

const CarouselBody = styled(View)`
  width: 160px;
  flex-directo
  justify-content: space-between;
`;

export const CarouselCustom: React.FunctionComponent<CarouselCustomProps> = ({
  forecast,
  layout,
  isFetching,
}) => {
  const _carousel = useRef<Carousel<Forecast> | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const renderItem: ListRenderItem<Forecast> = ({item}) => (
    <View style={{flex: 1}}>
      <CarouselContainer>
        <CarouselBody>
          <View style={{flexDirection: 'row'}}>
            {item.date ? (
              <Text>{formatDate(item.date)}</Text>
            ) : (
              generateSkeleton(SkeletonType.text, FigureSize.medium)
            )}
          </View>
          <View
            style={{flexDirection: 'column', justifyContent: 'space-between'}}>
            {item.temperature ? (
              <Text
                style={{
                  fontSize: 30,
                  color: theme.colors.darkGray,
                  opacity: 0.5,
                }}>
                {removeDecimals(item.temperature)}°
              </Text>
            ) : (
              generateSkeleton(SkeletonType.text, FigureSize.small)
            )}
            {item.description ? (
              <Text style={{color: theme.colors.black, opacity: 0.5}}>
                {item.description}
              </Text>
            ) : (
              generateSkeleton(SkeletonType.text, FigureSize.medium)
            )}
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              opacity: 0.5,
            }}>
            <View style={{flexDirection: 'column'}}>
              <Text style={{textAlign: 'center'}}>Min:</Text>
              {item.temp_min ? (
                <Text>{removeDecimals(item.temp_min).toString()}°</Text>
              ) : (
                generateSkeleton(SkeletonType.text, FigureSize.small)
              )}
            </View>
            <View style={{flexDirection: 'column'}}>
              <Text style={{textAlign: 'center'}}>Max:</Text>
              {item.temp_max ? (
                <Text>{removeDecimals(item.temp_max).toString()}°</Text>
              ) : (
                generateSkeleton(SkeletonType.text, FigureSize.small)
              )}
            </View>
            <View style={{flexDirection: 'column'}}>
              <Text style={{textAlign: 'center'}}>Humidity:</Text>
              {item.humidity ? (
                <Text>{`${removeDecimals(item.humidity).toString()}%`}</Text>
              ) : (
                generateSkeleton(SkeletonType.text, FigureSize.small)
              )}
            </View>
          </View>
        </CarouselBody>
        {item.icon ? (
          <WeatherIcon
            style={{bottom: 100}}
            source={{
              uri: `https://openweathermap.org/img/wn/${item.icon}@4x.png`,
            }}
          />
        ) : (
          generateSkeleton(SkeletonType.image, FigureSize.small, {
            alignSelf: 'flex-end',
          })
        )}
      </CarouselContainer>
    </View>
  );
  return (
    <WeatherWrapper>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <Carousel
          layout={layout}
          ref={c => {
            _carousel.current = c;
          }}
          data={forecast.length > 0 ? forecast : DEFAULT_FORECAST_DATA}
          onSnapToItem={index => setActiveSlide(index)}
          renderItem={renderItem}
          sliderWidth={300}
          itemWidth={300}
        />
      </View>
    </WeatherWrapper>
  );
};
