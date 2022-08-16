import theme from 'core/theme';
import {BottomTabBarButtonProps} from '@react-navigation/bottom-tabs';
import React, {useRef, useEffect} from 'react';
import {Platform, TouchableOpacity, View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome';
import styled from 'styled-components';

//Styled Components

const ButtonBar = styled(View)`
  justify-content: center;
  align-items: center;
  top: ${Platform.OS === 'android' ? '0px' : '10px'};
`;
const CustomTouchable = styled(TouchableOpacity)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

//Types

export type TabItemContent = {
  route: string;
  label: string;
  icon: string;
  component: any;
};

export type TabItem = {
  item: TabItemContent;
};

export const TabButton = (props: TabItem & BottomTabBarButtonProps) => {
  const {item, onPress, accessibilityState} = props;
  const focused = accessibilityState?.selected;
  const viewRef = useRef() as React.RefObject<Animatable.View & View & any>;

  useEffect(() => {
    if (focused) {
      viewRef?.current?.animate({
        0: {scale: 0.5, rotate: '0deg'},
        1: {scale: 1.5, rotate: '360deg'},
      });
    } else {
      viewRef?.current?.animate({
        0: {scale: 1.5, rotate: '360deg'},
        1: {scale: 1, rotate: '0deg'},
      });
    }
  }, [focused]);

  return (
    <CustomTouchable onPress={onPress} activeOpacity={1}>
      <Animatable.View ref={viewRef} duration={1000}>
        <ButtonBar>
          <Icon
            name={item.icon}
            color={focused ? theme.colors.primary : theme.colors.white}
            size={28}
          />
        </ButtonBar>
      </Animatable.View>
    </CustomTouchable>
  );
};
