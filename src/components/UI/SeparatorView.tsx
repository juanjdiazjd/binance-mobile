import * as React from 'react';
import {View, ViewProps} from 'react-native';
import styled from 'styled-components';

interface SeparatorViewProps extends ViewProps {
  width: string;
  height: string;
}
const Wrap = styled(View)<{
  width: string;
  height: string;
}>`
  width: ${({width}) => width};
  height: ${({height}) => height};
`;

export const SeparatorView: React.FunctionComponent<SeparatorViewProps> = ({
  width,
  height,
}) => {
  return <Wrap width={width} height={height} />;
};
