import * as React from 'react';
import {Text, TouchableOpacity, View, ViewProps} from 'react-native';
import styled from 'styled-components';
import theme from '../../../theme';
import {Status, Transaction} from '../../../types/Home/transaction';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colorByStatus, parseDate} from './utils';

const ListContainer = styled(TouchableOpacity)`
  background-color: ${theme.colors.white};
  height: auto;
  width: 350px;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 10px;
  flex-direction: row;
  justify-content: space-between;
`;

const ComponentContainer = styled(View)`
  flex-direction: row;
  justify-content: center;
  height: auto;
  width: auto;
`;

export const TextMount = styled(Text)`
  color: black;
  align-self: flex-end;
  font-size: 16px;
`;

export const TextCustom = styled(Text)`
  top: 10%;
  padding-left: 20px;
  font-size: 14px;
`;

export const TextDate = styled(Text)`
  top: 10%;
  color: ${theme.colors.gray};
  padding-left: 20px;
  font-size: 14px;
`;

export const Column = styled(View)`
  flex-direction: column;
`;

export const Row = styled(View)`
  flex-direction: row;
`;
const CustomIcon = styled(Icon)<{
  status: Status;
}>`
  position: absolute;
  bottom: -15px;
  right: -15px;
  color: ${({status}) => colorByStatus(status)};
  width: 30px;
  height: 30px;
  padding-left: 2px;
  margin-top: 10px;
`;

interface ListItemViewProps extends ViewProps {
  item: Transaction;
  onHandlePress: (item: Transaction) => void;
}

export const ListItem: React.FunctionComponent<ListItemViewProps> = ({
  item,
  onHandlePress,
}) => {
  return (
    <ComponentContainer>
      <ListContainer onPress={() => onHandlePress(item)}>
        <Row>
          <Column>
            <Icon name="bitcoin" size={40} color={theme.colors.secondary} />
            <CustomIcon
              status={item.status}
              name={
                item.status === Status.completed
                  ? 'check-circle'
                  : 'close-circle'
              }
              size={20}
              color={colorByStatus(item.status)}
            />
          </Column>
          <Column>
            <TextCustom>Envío</TextCustom>
            <TextDate>{parseDate(item.date, false)}</TextDate>
          </Column>
        </Row>
        <TextMount>$ {item.mount}</TextMount>
      </ListContainer>
    </ComponentContainer>
  );
};

export default ListItem;
