import { Spacing, MarginSize } from '../types/sizes';

export const getCSSMarginInPx = (margin?: Spacing) => {
  const defaultValue = MarginSize.noSpacing;

  if (!margin) return addPxUnit(defaultValue);

  if (margin.margin) {
    return addPxUnit(margin.margin);
  }

  return `${addPxUnit(margin.marginTop || defaultValue)} ${addPxUnit(margin.marginRight || defaultValue)} ${addPxUnit(margin.marginBottom || defaultValue)} ${addPxUnit(margin.marginLeft || defaultValue)}`;
};

const addPxUnit = (value: MarginSize) => {
  return `${value}px`;
};
