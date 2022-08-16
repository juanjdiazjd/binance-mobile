import theme from 'core/theme';
import * as React from 'react';
import {Modal, StyleProp, View, ViewProps, ViewStyle} from 'react-native';
import {MaterialIndicator} from 'react-native-indicators';

interface CustomActivityIndicatorViewProps extends ViewProps {
  buttonRefresh?: () => JSX.Element;
}

export const CustomActivityIndicator: React.FunctionComponent<
  CustomActivityIndicatorViewProps
> = ({buttonRefresh}) => {
  return (
    <Modal transparent={true} animationType="fade" onRequestClose={() => {}}>
      <View style={container}>
        <MaterialIndicator
          style={styleIndicator}
          color={theme.colors.primary}
        />
      </View>
      {buttonRefresh && buttonRefresh()}
    </Modal>
  );
};

const container: StyleProp<ViewStyle> = {
  flex: 1,
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'space-around',
  backgroundColor: '#00000390',
};
const styleIndicator: StyleProp<ViewStyle> = {
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  alignItems: 'center',
  justifyContent: 'center',
};
export default CustomActivityIndicator;
