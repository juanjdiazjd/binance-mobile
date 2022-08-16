import * as React from 'react';
import {Image, Text, TouchableOpacity, View, ViewProps} from 'react-native';
import styled from 'styled-components';

import Icon from 'react-native-vector-icons/MaterialIcons';
import {Feature} from './types/ListFeature';
import theme from 'core/theme';

const ComponentContainer = styled(TouchableOpacity)`
  flex-direction: row;
  justify-content: center;
  margin-bottom: 10px;
  height: 115px;
  width: auto;
`;

const ListContainer = styled(View)`
  background-color: ${theme.colors.charcoalGray};
  width: 320px;
  flex-direction: row;
  border-radius: 20px;
  shadow-opacity: 0.3;
  shadow-offset: 0px 4px;
  shadow-radius: 4px;
  elevation: 3;
  justify-content: space-between;
`;

const ColorBar = styled(View)<{
  color: string;
}>`
  width: 0px;
  border-top-start-radius: 20px;
  border-bottom-start-radius: 20px;
  padding: 4%;
  background-color: ${({color}) => color ?? theme.colors.primary};
`;

export const TextTitle = styled(Text)<{
  color?: string;
}>`
  color: ${({color}) => color ?? theme.colors.titleText};
  white-space: pre-line;
  max-width: 120px;
  font-size: 20px;
  align-self: center;
  font-weight: bold;
`;

const AvatarContainer = styled(View)<{
  backgroundColor: string;
}>`
  width: 90px;
  height: 90px;
  color: ${({backgroundColor}) => backgroundColor ?? theme.colors.background};
  border-radius: 80px;
  align-self: center;
`;

const Avatar = styled(Image)`
  width: 70px;
  height: 70px;
  top: 10%;
  resize-mode: contain;
  align-self: center;
`;
const CustomIcon = styled(Icon)`
  align-self: center;
  padding: 10px;
`;

interface ListFeatureItemViewProps extends ViewProps {
  item: Feature;
  onHandlePress: () => void;
}

export const ListFeatureItem: React.FunctionComponent<
  ListFeatureItemViewProps
> = ({item, onHandlePress}) => {
  return (
    <ComponentContainer onPress={onHandlePress}>
      {item && (
        <ListContainer>
          <ColorBar color={item.color} />
          <AvatarContainer backgroundColor={item.backgroundColor}>
            <Avatar
              source={{
                uri: `${item.image}`,
              }}
            />
          </AvatarContainer>
          <TextTitle color={theme.colors.white}>{item.title}</TextTitle>
          <CustomIcon
            name="arrow-forward-ios"
            size={30}
            color={theme.colors.white}
          />
        </ListContainer>
      )}
    </ComponentContainer>
  );
};

export default ListFeatureItem;
