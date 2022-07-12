export interface FigureStyle {
  type: FigureType;
  size: FigureSize;
  width: number;
  height: number;
  borderRadius?: number;
}

export enum FigureSize {
  large = 'big',
  medium = 'medium',
  small = 'small',
}

export enum SkeletonType {
    text = 'text',
    image = 'image',
  }
export enum FigureType {
  circle = 'circle',
  rectangle = 'rectangle',
}
export const figureValues: FigureStyle[] = [
  {
    type: FigureType.circle,
    size: FigureSize.small,
    width: 30,
    height: 30,
    borderRadius: 100,
  },
  {
    type: FigureType.circle,
    size: FigureSize.medium,
    width: 60,
    height: 60,
    borderRadius: 100,
  },
  {
    type: FigureType.circle,
    size: FigureSize.large,
    width: 80,
    height: 80,
    borderRadius: 100,
  },
  {
    type: FigureType.rectangle,
    size: FigureSize.small,
    width: 30,
    height: 10,
  },
  {
    type: FigureType.rectangle,
    size: FigureSize.medium,
    width: 60,
    height: 10,
  },
  {
    type: FigureType.rectangle,
    size: FigureSize.large,
    width: 80,
    height: 10,
  },
];
