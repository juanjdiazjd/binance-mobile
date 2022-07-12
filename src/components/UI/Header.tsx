import * as React from 'react';
import {TouchableOpacity, View, ViewProps} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components';
import theme from '../../theme';
import {MarginSize} from '../../types/sizes';
import {TextType, TextView} from '../Text/TextView';

const SeparatorView = styled(View)`
  width: 20px;
  height: 20px;
`;

const ContainerView = styled(View)`
  flex-direction: column;
  padding: 8px;
  margin-bottom: 10px;
  margin-left: ${MarginSize.smallPadding}px;
`;

interface HeaderViewProps extends ViewProps {
  title: string;
  subtitle: string;
  withMenuButton?: boolean;
  buttonBack: boolean;
  onPressButtonBack?: () => void;
  textTypeTitle?: TextType;
  textTypeSubtitle?: TextType;
  bottom?: number;
  goScreen?: string;
  exit?: boolean;
  secondaryComponent?: () => JSX.Element;
  functionAdditionalGoScreen?: () => void;
  customButtonBack?: () => void;
}

export const Header: React.FunctionComponent<HeaderViewProps> = ({
  title,
  subtitle,
  textTypeTitle,
  textTypeSubtitle,
  secondaryComponent,
  buttonBack,
  onPressButtonBack,
}) => {
  return (
    <ContainerView>
      {buttonBack && (
        <TouchableOpacity onPress={onPressButtonBack && onPressButtonBack}>
          <Icon name="arrow-back" size={30} color={theme.colors.primary} />
        </TouchableOpacity>
      )}
      <SeparatorView />
      {secondaryComponent && secondaryComponent()}
      <SeparatorView />
      <View>
        <TextView
          id={'id_title'}
          text={title}
          type={textTypeTitle ? textTypeTitle : TextType.big}
          textAlign={'left'}
          colorText={theme.colors.titleText}
        />
      </View>
      <View>
        <TextView
          id={'id_subtitle'}
          text={subtitle}
          type={textTypeSubtitle ? textTypeSubtitle : TextType.medium}
          textAlign={'left'}
          colorText={theme.colors.titleText}
        />
      </View>
    </ContainerView>
  );
};

export default Header;
