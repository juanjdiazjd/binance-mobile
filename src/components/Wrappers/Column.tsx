import React, { ReactNode } from 'react';
import styled from 'styled-components/native';
import { useWindowDimensions, ViewProps } from 'react-native';
import { HEADER_HEIGHT } from '../Header/header';

export const MAX_COLUMNS = 4;

interface ColumnProps extends ViewProps {
  column: 1 | 2 | 3 | 4;
  height?: string;
  orientation?: 'row' | 'column';
  children: ReactNode;
  matchParent?: boolean
}

const COLUMN_WIDTH = 25;

const StyledColumn = styled.View<{
  column: number;
  height?: string;
  orientation?: string;
}>`
  width: ${({ column }) => `${COLUMN_WIDTH * column}%`};
  justify-content: center;
  ${({ height }) => height && `height: ${height}`};
  flex-direction: ${({ orientation }) => orientation || 'column'};
  `;

const ColumnView: React.FunctionComponent<ColumnProps> = ({
  column,
  children,
  height,
  orientation,
  style,
  matchParent = false
}) => {

  const windowDimensions = useWindowDimensions();

  const matchParentHeight = Math.floor(100 - (HEADER_HEIGHT * 100 / windowDimensions.height));

  return (
    <StyledColumn
      style={style}
      column={column}
      height={matchParent ? `${matchParentHeight}%` : height}
      orientation={orientation}
    >
      {children}
    </StyledColumn>
  );
};

export { ColumnView };
