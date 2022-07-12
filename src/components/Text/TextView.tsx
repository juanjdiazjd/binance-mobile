import React from 'react';
import styled, {ThemeContext} from 'styled-components';
import {Text, TextProps} from 'react-native';
import theme from '../../theme';
import {Spacing} from '../../types/sizes';
import {getCSSMarginInPx} from '../../utils/styledUtils';
import colors from '../../theme/colors';

export interface TextViewProps extends TextProps {
  id: string;
  text?: string;
  margin?: Spacing;
  onPress?: () => void;
  textAlign?: 'left' | 'right' | 'center' | 'justify';
  type: TextType;
  isLoading?: boolean;
  mode?: TextMode;
  textTransform?: string;
  colorText: string;
}

export enum TextType {
  big = 'big',
  medium = 'medium',
  small = 'small',
  bigBold = 'bigBold',
  bigBoldMonserrat = 'bigBoldMonserrat',
  mediumBold = 'mediumBold',
  mediumBoldMonserrat = 'mediumBoldMonserrat',
  smallBold = 'smallBold',
  smallBoldMonserrat = 'smallBoldMonserrat',
  verySmallBold = 'verySmallBold',
  mediumColorPrimary = 'mediumColorPrimary',
  smallWhite = 'smallWhite',
}

export enum TextMode {
  dark = 'dark',
  light = 'light',
  darkGray = 'darkGray',
}

export type StyledTextValue = {
  type: TextType;
  fontSize: string;
  lineHeight: string;
  color: string;
  variant: string;
};

export const textValues: StyledTextValue[] = [
  {
    color: theme.colors.primary,
    fontSize: '16px',
    lineHeight: '19px',
    type: TextType.small,
    variant: theme.fonts.robotoLight,
  },
  {
    color: theme.colors.white,
    fontSize: '16px',
    lineHeight: '19px',
    type: TextType.smallWhite,
    variant: theme.fonts.robotoLight,
  },
  {
    color: theme.colors.primary,
    fontSize: '18px',
    lineHeight: '25px',
    type: TextType.mediumColorPrimary,
    variant: theme.fonts.robotoLight,
  },
  {
    color: theme.colors.white,
    fontSize: '18px',
    lineHeight: '25px',
    type: TextType.medium,
    variant: theme.fonts.robotoLight,
  },
  {
    color: theme.colors.darkGray,
    fontSize: '18px',
    lineHeight: '22px',
    type: TextType.mediumBoldMonserrat,
    variant: theme.fonts.montserratSemiBold,
  },
  {
    color: theme.colors.white,
    fontSize: '18px',
    lineHeight: '28px',
    type: TextType.bigBoldMonserrat,
    variant: theme.fonts.montserratSemiBold,
  },
  {
    color: theme.colors.white,
    fontSize: '23px',
    lineHeight: '28px',
    type: TextType.big,
    variant: theme.fonts.robotoLight,
  },
  {
    color: theme.colors.primary,
    fontSize: '16px',
    lineHeight: '19px',
    type: TextType.smallBold,
    variant: theme.fonts.robotoBold,
  },
  {
    color: theme.colors.primary,
    fontSize: '16px',
    lineHeight: '19px',
    type: TextType.smallBoldMonserrat,
    variant: theme.fonts.montserratSemiBold,
  },
  {
    color: theme.colors.primary,
    fontSize: '14px',
    lineHeight: '19px',
    type: TextType.verySmallBold,
    variant: theme.fonts.robotoBold,
  },
  {
    color: theme.colors.primary,
    fontSize: '18px',
    lineHeight: '25px',
    type: TextType.mediumBold,
    variant: theme.fonts.robotoBold,
  },
  {
    color: theme.colors.white,
    fontSize: '23px',
    lineHeight: '25px',
    type: TextType.bigBold,
    variant: theme.fonts.robotoBold,
  },
];
('./types');

const findInValues = (type: TextType) => {
  return textValues.find(text => text.type === type);
};

const StyledTextView = styled(Text)<{
  textAlign?: string;
  textTransform?: string;
  values?: StyledTextValue;
  mode: string;
  colorText: string;
  margin?: Spacing;
}>`
  color: ${({mode, colorText}) =>
    mode === TextMode.darkGray ? colors.darkGray : colorText};
  width: ${theme.sizes.fullWidth};
  font-size: ${({values}) => values?.fontSize};
  letter-spacing: 0;
  line-height: ${({values}) => values?.lineHeight};
  margin: ${({margin}) => getCSSMarginInPx(margin)};
  text-align: ${({textAlign}) => textAlign || 'left'};
  ${({textTransform}) => textTransform && 'text-transform:' + textTransform}
`;

const TextView: React.FunctionComponent<TextViewProps> = ({
  text,
  onPress,
  textAlign,
  type,
  colorText,
  style,
  mode = TextMode.light,
  ellipsizeMode,
  numberOfLines,
}) => {
  return (
    <StyledTextView
      style={style}
      onPress={onPress}
      values={findInValues(type)}
      colorText={colorText}
      textAlign={textAlign}
      mode={mode}
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}>
      {text}
    </StyledTextView>
  );
};

export {TextView};
