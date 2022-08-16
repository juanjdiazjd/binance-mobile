import React from 'react';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {IconProps} from 'react-native-vector-icons/Icon';

type IconAdittionalProp = {
  style: IconProps;
};
export const Icon = ({
  name,
  color,
  size = 40,
  style,
}: IconAdittionalProp & IconProps) => {
  return (
    <>
      {name && (
        <FontAwesomeIcon name={name} size={size} color={color} style={style} />
      )}
    </>
  );
};
