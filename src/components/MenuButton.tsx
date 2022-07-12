import {DrawerActions, useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {Text, TouchableOpacity, View, ViewProps} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../theme/colors';

interface MenuButtonViewProps extends ViewProps {
  darkMode?: boolean;
  transparent?:boolean;
}

export const MenuButton: React.FunctionComponent<MenuButtonViewProps> = ({
  darkMode,
  transparent
}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
      <View style={{padding: 20}}>
        <View
          style={!transparent ?{
            borderRadius: 50,
            height: 36,
            width: 36,
            backgroundColor: darkMode ? colors.darkGray : colors.primary,
          } : {borderRadius: 50,
            height: 36,
            width: 36,}}>
          <Icon
            style={{marginLeft: 2, marginTop: 2}}
            name="menu"
            size={30}
            color={darkMode ? colors.primary : colors.darkGray}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MenuButton;
