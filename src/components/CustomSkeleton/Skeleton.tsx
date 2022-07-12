import * as React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

interface CustomSkeletonProps {
  renderSkeleton: () => JSX.Element;
}

export const CustomSkeleton: React.FunctionComponent<CustomSkeletonProps> = ({
  renderSkeleton,
}) => {
  return <SkeletonPlaceholder>{renderSkeleton()}</SkeletonPlaceholder>;
};