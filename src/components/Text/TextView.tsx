import React from 'react';
import styled from 'styled-components';
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
  bigBoldLato = 'bigBoldLato',
  mediumBold = 'mediumBold',
  mediumBoldLato = 'mediumBoldLato',
  smallBold = 'smallBold',
  smallBoldLato = 'smallBoldLato',
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
  fontWeight: string;
};

export const textValues: StyledTextValue[] = [
  {
    color: theme.colors.primary,
    fontSize: '16px',
    lineHeight: '19px',
    type: TextType.small,
    variant: theme.fonts.robotoLight,
    fontWeight: 'normal',
  },
  {
    color: theme.colors.white,
    fontSize: '16px',
    lineHeight: '19px',
    type: TextType.smallWhite,
    variant: theme.fonts.robotoLight,
    fontWeight: 'normal',
  },
  {
    color: theme.colors.primary,
    fontSize: '18px',
    lineHeight: '25px',
    type: TextType.mediumColorPrimary,
    variant: theme.fonts.robotoLight,
    fontWeight: 'normal',
  },
  {
    color: theme.colors.white,
    fontSize: '18px',
    lineHeight: '25px',
    type: TextType.medium,
    variant: theme.fonts.robotoLight,
    fontWeight: 'normal',
  },
  {
    color: theme.colors.titleText,
    fontSize: '18px',
    lineHeight: '22px',
    type: TextType.mediumBoldLato,
    variant: theme.fonts.latoSemiBold,
    fontWeight: 'normal',
  },
  {
    color: theme.colors.white,
    fontSize: '23px',
    lineHeight: '28px',
    type: TextType.big,
    variant: theme.fonts.robotoLight,
    fontWeight: 'normal',
  },
  {
    color: theme.colors.primary,
    fontSize: '16px',
    lineHeight: '19px',
    type: TextType.smallBold,
    variant: theme.fonts.robotoBold,
    fontWeight: 'bold',
  },
  {
    color: theme.colors.primary,
    fontSize: '16px',
    lineHeight: '19px',
    type: TextType.smallBoldLato,
    variant: theme.fonts.latoSemiBold,
    fontWeight: 'bold',
  },
  {
    color: theme.colors.primary,
    fontSize: '14px',
    lineHeight: '19px',
    type: TextType.verySmallBold,
    variant: theme.fonts.robotoBold,
    fontWeight: 'bold',
  },
  {
    color: theme.colors.primary,
    fontSize: '18px',
    lineHeight: '25px',
    type: TextType.mediumBold,
    variant: theme.fonts.robotoBold,
    fontWeight: 'bold',
  },
  {
    color: theme.colors.titleText,
    fontSize: '23px',
    lineHeight: '25px',
    type: TextType.bigBoldLato,
    variant: theme.fonts.latoBold,
    fontWeight: 'bold',
  },
  {
    color: theme.colors.titleText,
    fontSize: '23px',
    lineHeight: '25px',
    type: TextType.bigBold,
    variant: theme.fonts.latoBold,
    fontWeight: 'bold',
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
  fontWeight?: string;
}>`
  color: ${({mode, colorText}) =>
    mode === TextMode.darkGray ? colors.titleText : colorText};
  width: ${theme.sizes.fullWidth};
  font-size: ${({values}) => values?.fontSize};
  letter-spacing: 0;
  font-weight: ${({values}) => values?.fontWeight};
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
