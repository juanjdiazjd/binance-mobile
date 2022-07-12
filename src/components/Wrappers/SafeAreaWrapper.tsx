import {
  KeyboardAvoidingView,
  View,
  ViewProps,
  Keyboard,
  TouchableWithoutFeedback} from 'react-native';
import React from 'react';
import { IS_IOS } from '../../config/constants';
import styled, {  } from 'styled-components';

import theme from '../../theme';

interface WrapperViewProps extends ViewProps {
  keyboardAvoidingView?: boolean;}

const StyledlViewWrapper = styled(View)`
  height: ${theme.sizes.fullHeight};
  width: ${ theme.sizes.fullWidth};
  background-color: ${ theme.colors.background } ;
`;

const StyledlKeyboardAvoidingViewWrapper = styled(KeyboardAvoidingView)`
  height: ${theme.sizes.fullHeight};
  width: ${ theme.sizes.fullWidth};
  background-color: ${ theme.colors.background } ;
`;


const WrapperView: React.FunctionComponent<WrapperViewProps> = ({
  keyboardAvoidingView = false,
  style,
  children,
}) => {
  return keyboardAvoidingView ? (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <StyledlKeyboardAvoidingViewWrapper
        behavior={IS_IOS ? 'padding' : 'height'}
        style={style}
      >
        {children}
      </StyledlKeyboardAvoidingViewWrapper>
    </TouchableWithoutFeedback>
  ) : (
    <StyledlViewWrapper style={style}>{children}</StyledlViewWrapper>
  );
};

export { WrapperView };
