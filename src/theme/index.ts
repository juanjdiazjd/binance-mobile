
import baseStyled, { ThemedStyledInterface } from 'styled-components';
import colors from './colors';

const theme = {
  colors: {
    ...colors
  },
  sizes: {
    contentWidth: '90%',
    fullWidth: '100%',
    fullHeight: '100%'
  },
  fonts: {
    default: 'Montserrat-Light',
    robotoLight: 'Roboto-Light',
    robotoBold: 'Roboto-Bold',
    robotoMedium: 'Roboto-Medium',
    montserratSemiBold: 'Montserrat-SemiBold'
  }
};

export default theme;

export type Theme = typeof theme;
export const styled = baseStyled as ThemedStyledInterface<Theme>;
