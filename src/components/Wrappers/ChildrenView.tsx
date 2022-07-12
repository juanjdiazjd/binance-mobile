import React from 'react';
import styled from 'styled-components/native';
import { View, ViewProps } from 'react-native';
import { MarginSize } from '../sizes';
import theme from '../../theme';

export const ChildrenView: React.FunctionComponent<ViewProps> = ({
  style,
  children
}) => (
  <View
    style={[style, { alignSelf: 'center', width: theme.sizes.contentWidth }]}
  >
    {children}
  </View>
);
