import theme from 'core/theme';
import {Text} from 'react-native';
import styled from 'styled-components';

export const TabBarLabel = styled(Text)<{
  focused: boolean;
}>`
  color: ${({focused}) => (focused ? theme.colors.primary : theme.colors.gray)};
`;
