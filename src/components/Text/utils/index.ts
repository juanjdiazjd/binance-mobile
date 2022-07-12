import {TextType, textValues} from '../TextView';

export const findInValues = (type: TextType) => {
  return textValues.find(text => text.type === type);
};
