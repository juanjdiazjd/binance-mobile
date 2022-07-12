export enum MarginSize {
    noSpacing = 0,
    basic = 5,
    smallPadding = 10,
    mediumPadding = 20,
    largePadding = 30,
    smallSpacing = 40,
    mediumSpacing = 50,
    largeSpacing = 60
  }
  
  export interface Spacing {
    margin?: MarginSize;
    marginRight?: MarginSize;
    marginLeft?: MarginSize;
    marginTop?: MarginSize;
    marginBottom?: MarginSize;
  }
  