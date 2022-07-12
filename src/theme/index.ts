import baseStyled, {ThemedStyledInterface} from 'styled-components';
import colors from './colors';

const theme = {
  colors: {
    ...colors,
  },
  sizes: {
    contentWidth: '90%',
    fullWidth: '100%',
    fullHeight: '100%',
  },
  fonts: {
    default: 'lato-Light',
    robotoLight: 'Roboto-Light',
    robotoBold: 'Roboto-Bold',
    robotoMedium: 'Roboto-Medium',
    latoSemiBold: 'lato-SemiBold',
    latoLight: 'lato-Light',
    latoBold: 'lato-Bold',
    latoMedium: 'lato-Medium',
  },
};

export default theme;

export type Theme = typeof theme;
export const styled = baseStyled as ThemedStyledInterface<Theme>;
