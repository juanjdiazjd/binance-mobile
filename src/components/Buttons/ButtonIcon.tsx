import * as React from 'react';
import {TouchableOpacity, ViewProps} from 'react-native';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/MaterialIcons';
import theme from 'core/theme';

const CircleContainerButton = styled(TouchableOpacity)`
  width: 38px;
  height: 38px;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  background-color: ${theme.colors.charcoalGray};
`;

interface ButtonIconViewProps extends ViewProps {
  iconName: string;
  size: number;
  color: string;
  onHandlePress?: () => void;
  disabled?: boolean;
}

export const ButtonIcon: React.FunctionComponent<ButtonIconViewProps> = ({
  iconName,
  size,
  color,
  onHandlePress,
  disabled,
}) => {
  return (
    <CircleContainerButton disabled={disabled} onPress={onHandlePress}>
      <Icon name={iconName} size={size} color={color} />
    </CircleContainerButton>
  );
};

export default ButtonIcon;
