import React from 'react';
import {Image, StyleProp, View, ViewStyle} from 'react-native';
import styled from 'styled-components';
import {filterFigures, JSToCSS, WeatherIconPropsStyle} from '../../CustomSkeleton/utils/Figures';
import {CustomSkeleton} from '../../CustomSkeleton/Skeleton';
import {FigureSize, FigureType, SkeletonType} from '../../CustomSkeleton/types';

export const WeatherIcon = styled(Image)`
  ${JSToCSS(WeatherIconPropsStyle)}
`;

export const generateSkeleton = (
  skeletonType: SkeletonType,
  size: FigureSize,
  customStyle?: StyleProp<ViewStyle>,
) => {
  switch (skeletonType) {
    case SkeletonType.text:
      return (
        <CustomSkeleton
          renderSkeleton={() => (
            <View
              style={[filterFigures(FigureType.rectangle, size), customStyle]}
            />
          )}
        />
      );
    case SkeletonType.image:
      return (
        <CustomSkeleton
          renderSkeleton={() => (
            <View
              style={[filterFigures(FigureType.circle, size), customStyle]}
            />
          )}
        />
      );
    default:
      <CustomSkeleton
        renderSkeleton={() => (
          <View
            style={[filterFigures(FigureType.rectangle, size), customStyle]}
          />
        )}
      />;
  }
};
