import * as React from 'react';
import {Text, TouchableOpacity, ViewProps} from 'react-native';
import styled from 'styled-components';
import theme from 'core/theme';
import {strings} from 'screens/Home/strings';
import {FeeContext, FeeContextType} from 'core/context/Fees';
import {useContext} from 'react';

const ContainerWrapperFee = styled(TouchableOpacity)`
  align-self: center;
  height: 40px;
  width: 90%;
  top: 10px;
  padding: 10px;
  border-radius: 5px;
  background-color: ${theme.colors.secondary};
`;

const TextFee = styled(Text)`
  align-self: flex-start;
  font-size: 16px;
`;

interface ShowFeeViewProps extends ViewProps {}

export const ShowFee: React.FunctionComponent<ShowFeeViewProps> = ({}) => {
  const {calculatedFee} = useContext(FeeContext) as FeeContextType;

  return (
    <ContainerWrapperFee>
      <TextFee>{`${strings.home.accumulateFee} $${calculatedFee}`}</TextFee>
    </ContainerWrapperFee>
  );
};

export default ShowFee;
