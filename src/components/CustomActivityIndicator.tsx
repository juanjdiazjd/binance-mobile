import * as React from 'react';
import {Modal, View, ViewProps} from 'react-native';
import {MaterialIndicator} from 'react-native-indicators';
import theme from '../theme';

interface CustomActivityIndicatorViewProps extends ViewProps {
  buttonRefresh?: () => JSX.Element;
}

export const CustomActivityIndicator: React.FunctionComponent<CustomActivityIndicatorViewProps> = ({
  buttonRefresh
}) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      onRequestClose={() => {
      }}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'space-around',
          backgroundColor: '#00000390',
        }}>
        <MaterialIndicator
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          color={theme.colors.primary}
        />
       
      </View>
      {buttonRefresh && buttonRefresh()}
    </Modal>
  );
};

export default CustomActivityIndicator;
