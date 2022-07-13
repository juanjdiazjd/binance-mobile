import * as React from 'react';
import {StyleProp, Text, View, ViewProps, ViewStyle} from 'react-native';
import styled from 'styled-components';
import theme from '../../theme';
import BouncyCheckboxGroup, {
  ICheckboxButton,
} from 'react-native-bouncy-checkbox-group';
import {FeeNamesForCheckBox, FeeTypes} from '../../types/responseType';

const INITIAL_FEE_PER_DEFAULT = 3;
const FEES_DATA: FeeNamesForCheckBox[] = [
  {
    id: 1,
    text: 'Comision alta',
    feeType: FeeTypes.fastestFee,
    textStyle: {textDecorationLine: 'none'},
    fillColor: theme.colors.primary,
    unfillColor: '#afb5f5',
    style: {padding: 10},
  },
  {
    id: 2,
    text: 'Comision media',
    feeType: FeeTypes.halfHourFee,
    textStyle: {textDecorationLine: 'none'},
    fillColor: theme.colors.primary,
    unfillColor: '#afb5f5',
    style: {padding: 10},
  },
  {
    id: 3,
    text: 'Comision baja',
    feeType: FeeTypes.hourFee,
    textStyle: {textDecorationLine: 'none'},
    fillColor: theme.colors.primary,
    unfillColor: '#afb5f5',
    style: {padding: 10},
  },
];

const ComponentContainer = styled(View)`
  align-items: center;
`;

export const TextMount = styled(Text)`
  color: black;
  align-self: flex-end;
  font-size: 16px;
`;

export const TextCustom = styled(Text)`
  top: 10%;
  padding-left: 20px;
  font-size: 18px;
`;

export const Column = styled(View)`
  flex-direction: column;
`;

export const Row = styled(View)`
  flex-direction: row;
`;

interface CheckBoxViewProps extends ViewProps {
  onHandlePress: (item: ICheckboxButton) => void;
}

export const CheckBoxFee: React.FunctionComponent<CheckBoxViewProps> = ({
  onHandlePress,
}) => {
  return (
    <ComponentContainer>
      <TextCustom>Elegí la prioridad de tu envío:</TextCustom>
      <BouncyCheckboxGroup
        data={FEES_DATA}
        initial={INITIAL_FEE_PER_DEFAULT}
        style={stylesForCheckbox}
        onChange={onHandlePress}
      />
    </ComponentContainer>
  );
};
const stylesForCheckbox: StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>> = {
  flexDirection: 'column',
  paddingTop: 20,
};

export default CheckBoxFee;
