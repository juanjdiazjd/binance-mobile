import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TabBarLabel} from './src/helpers/generalStyledComponents';
import HistoryScreen from './src/screens/History';
import HomeScreen from './src/screens/Home';
import TransactionDetailScreen from './src/screens/TransactionDetail';
import theme from './src/theme';
import {icons} from './src/utils/constants';

const HistoryStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HistoryStackScreen = () => {
  return (
    <HistoryStack.Navigator
      screenOptions={({}) => ({
        headerShown: false,
      })}>
      <HistoryStack.Screen name="HistoryStack" component={HistoryScreen} />
      <HistoryStack.Screen
        name="TransactionDetail"
        component={TransactionDetailScreen}
      />
    </HistoryStack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarLabel: ({focused}) => (
            <TabBarLabel focused={focused}>{route.name}</TabBarLabel>
          ),
          tabBarIcon: ({focused, size}) => {
            return (
              <Icon
                name={icons[route.name]}
                color={focused ? theme.colors.primary : theme.colors.gray}
                size={size}
              />
            );
          },
          headerShown: false,
        })}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="History" component={HistoryStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
