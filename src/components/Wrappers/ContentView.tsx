import React from 'react';
import { View, ViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components';


import { HAS_NOTCH } from '../../config/constants';
import theme from '../../theme';
import { MarginSize } from '../../types/sizes';

interface ContentViewProps extends ViewProps {
  fullWidth?: boolean;
  verticalAlign?: 'flex-start' | 'center' | 'flex-end';
  horizontalAlign?: 'flex-start' | 'center' | 'flex-end';
}

const ContentViewWithNotch = styled(SafeAreaView) <ContentViewProps>`
  height: ${theme.sizes.fullHeight};
  width: ${({  fullWidth }) =>
    fullWidth ? theme.sizes.fullWidth : theme.sizes.contentWidth};
  align-self: ${({ horizontalAlign }) => horizontalAlign || 'center'};
  justify-content: ${({ verticalAlign }) => verticalAlign || 'flex-start'};
`;

const ContentViewWithoutNotch = styled(View) <ContentViewProps>`
height: ${ '100%'};
width: ${({fullWidth }) =>
    fullWidth ? theme.sizes.fullWidth : theme.sizes.contentWidth};
align-self: ${({ horizontalAlign }) => horizontalAlign || 'center'};
justify-content: ${({ verticalAlign }) => verticalAlign || 'flex-start'};
padding-bottom: ${MarginSize.mediumPadding}px;
padding-top: ${MarginSize.mediumPadding}px;
`;

export const ContentView: React.FunctionComponent<ContentViewProps> = props => HAS_NOTCH ?
  <ContentViewWithNotch {...props}>
    {props.children}
  </ContentViewWithNotch> :
  <ContentViewWithoutNotch {...props}>
    {props.children}
  </ContentViewWithoutNotch>;