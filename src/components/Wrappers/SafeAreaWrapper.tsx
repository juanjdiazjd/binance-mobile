import {
  View,
  ViewProps,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import styled from 'styled-components';
import theme from '../../core/theme';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

interface WrapperViewProps extends ViewProps {
  keyboardAvoidingView?: boolean;
}

const StyledlViewWrapper = styled(View)`
  height: ${theme.sizes.fullHeight};
  width: ${theme.sizes.fullWidth};
  background-color: ${theme.colors.background};
`;

const StyledlKeyboardAvoidingViewWrapper = styled(KeyboardAwareScrollView)`
  height: ${theme.sizes.fullHeight};
  width: ${theme.sizes.fullWidth};
  background-color: ${theme.colors.background};
`;

const WrapperView: React.FunctionComponent<WrapperViewProps> = ({
  keyboardAvoidingView = false,
  style,
  children,
}) => {
  return keyboardAvoidingView ? (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <StyledlKeyboardAvoidingViewWrapper style={style}>
        {children}
      </StyledlKeyboardAvoidingViewWrapper>
    </TouchableWithoutFeedback>
  ) : (
    <StyledlViewWrapper style={style}>{children}</StyledlViewWrapper>
  );
};

export {WrapperView};
