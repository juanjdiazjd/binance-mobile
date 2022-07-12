import * as React from "react";
import { View, ViewProps } from "react-native";
import styled from "styled-components";

interface SeparatorViewProps extends ViewProps {
  width: string;
  height: string;
}
export const SeparatorView: React.FunctionComponent<SeparatorViewProps> = ({
  width,
  height,
}) => {
  const SeparatorView = styled(View)<{
    width: string;
    height: string;
  }>`
    width: ${({ width }) => width};
    height: ${({ height }) => height};
  `;
  return <SeparatorView width={width} height={height}></SeparatorView>;
};
