import {KeyboardAvoidingView, View, ViewProps, Platform} from 'react-native';
import React from 'react';
import styled from 'styled-components';
import theme from '../../core/theme';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const IS_IOS = Platform.OS === 'ios';

interface WrapperViewProps extends ViewProps {
  keyboardAvoidingView?: boolean;
}

const StyledlViewWrapper = styled(View)`
  height: ${theme.sizes.fullHeight};
  width: ${theme.sizes.fullWidth};
  background-color: ${theme.colors.background};
`;

const StyledlKeyboardAvoidingViewWrapper = styled(KeyboardAvoidingView)`
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
    <KeyboardAwareScrollView>
      <StyledlKeyboardAvoidingViewWrapper
        behavior={IS_IOS ? 'padding' : 'height'}
        style={style}>
        {children}
      </StyledlKeyboardAvoidingViewWrapper>
    </KeyboardAwareScrollView>
  ) : (
    <StyledlViewWrapper style={style}>{children}</StyledlViewWrapper>
  );
};

export {WrapperView};
