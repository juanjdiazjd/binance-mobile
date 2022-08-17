import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {FeeProvider} from 'core/context/Fees';
import {OrderProvider} from 'core/context/Orders';
import theme from 'core/theme';
import {TabList} from 'core/utils';
import React from 'react';
import {Platform, StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import OrderScreen from 'screens/Order';
import styled from 'styled-components';
import {TabButton} from './TabButton';

const GestureHandlerRootViewFlex = styled(GestureHandlerRootView)`
  flex: 1;
`;

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabStack = () => (
  <Tab.Navigator
    screenOptions={() => ({
      tabBarStyle: {
        backgroundColor: theme.colors.charcoalGray,
        ...styles.tabBar,
      },
      headerShown: false,
    })}>
    {TabList.map((item, index) => {
      return (
        <Tab.Screen
          key={index}
          name={item.route}
          component={item.component}
          options={{
            tabBarShowLabel: false,
            tabBarButton: props => <TabButton {...props} item={item} />,
          }}
        />
      );
    })}
  </Tab.Navigator>
);
export const RootStack = () => (
  <GestureHandlerRootViewFlex>
    <OrderProvider>
      <FeeProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="TabScreen" component={TabStack} />
            <Stack.Group screenOptions={{presentation: 'modal'}}>
              <Stack.Screen name="Order" component={OrderScreen} />
            </Stack.Group>
          </Stack.Navigator>
        </NavigationContainer>
      </FeeProvider>
    </OrderProvider>
  </GestureHandlerRootViewFlex>
);

const styles = StyleSheet.create({
  tabBar: {
    height: 60,
    position: 'absolute',
    bottom: Platform.OS === 'android' ? 16 : 36,
    right: 16,
    left: 16,
    borderRadius: 16,
  },
});
