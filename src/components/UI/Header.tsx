import * as React from 'react';
import {ButtonIcon} from 'components/Buttons';
import {renderLogo} from 'screens/Home/utils';
import styled from 'styled-components';
import {Text, View, ViewProps} from 'react-native';

import theme from '../../core/theme';

const SeparatorView = styled(View)`
  width: 20px;
  height: 20px;
`;

const ContainerView = styled(View)`
  flex-direction: column;
  padding: 8px;
  margin-bottom: 10px;
`;

const ContainerLogo = styled(View)<{justifyContent: string}>`
  flex-direction: row;
  justify-content: ${({justifyContent}) => justifyContent};
`;

const TextTitle = styled(Text)`
  font-size: 20px;
  color: ${theme.colors.white};
`;

const TextSubtitle = styled(Text)`
  font-size: 18px;
  color: ${theme.colors.white};
`;

const Column = styled(View)`
  flex-direction: column;
  justify-content: space-between;
  height: auto;
  weight: 40px;
`;

const SeparatorLine = styled(View)`
  border-bottom-color: ${theme.colors.primary};
  border-bottom-width: 1px;
`;

interface HeaderViewProps extends ViewProps {
  title: string;
  subtitle: string;
  withMenuButton?: boolean;
  buttonBack?: boolean;
  onPressButtonBack?: () => void;
  secondaryButton?: () => JSX.Element;
  secondaryComponent?: () => JSX.Element;
  isVisibleLogo?: boolean;
  disabledButtonBack?: boolean;
}

export const Header: React.FunctionComponent<HeaderViewProps> = ({
  title,
  subtitle,
  secondaryComponent,
  buttonBack,
  secondaryButton,
  onPressButtonBack,
  isVisibleLogo = true,
  disabledButtonBack,
}) => {
  return (
    <ContainerView>
      <ContainerLogo
        justifyContent={secondaryButton ? 'space-between' : 'flex-start'}>
        {buttonBack && (
          <ButtonIcon
            onHandlePress={onPressButtonBack}
            iconName="arrow-back"
            size={30}
            color={theme.colors.white}
            disabled={disabledButtonBack}
          />
        )}
        {isVisibleLogo && renderLogo()}
        {secondaryButton && secondaryButton()}
      </ContainerLogo>
      {secondaryComponent && secondaryComponent()}
      <SeparatorView />
      <Column>
        <TextTitle>{title}</TextTitle>
        <SeparatorView />
        <SeparatorLine />
        <SeparatorView />
        <TextSubtitle>{subtitle}</TextSubtitle>
      </Column>
    </ContainerView>
  );
};

export default Header;
