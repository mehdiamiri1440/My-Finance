import {useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Phone from '../screens/Auth/Phone';
import VerifyCode from '../screens/Auth/VerifyCode';
import Home from '../screens/Home';
import Notifications from '../screens/Notifications/index';
import {HomeScreens} from './HomeScreens';
import {contextsStore} from '../contexts';
import HomeIcon from '../assets/svgs/HomeIcon';
import AmountIcon from '../assets/svgs/AmountIcon';
import VitrinIcon from '../assets/svgs/VitrinIcon';
import MoreIcon from '../assets/svgs/MoreIcon';
import BankIcon from '../assets/svgs/BankIcon';
import MyProfile from './../screens/MyProfile/index';
import MyProfileScreen from './MyProfileScreen';
import Bank from '../screens/Bank';
import BankScreen from './BankScreen';
import InvoiceIcon from '../assets/svgs/InvoiceIcon';
import Invoice from '../screens/Invoice';

const Tabs = createBottomTabNavigator();

export const BottomTabScreen = () => {
  const {tabBarBottom} = useContext(contextsStore);
  const screenOptions = {
    tabBarStyle: {
      display: tabBarBottom ? 'flex' : 'none',
      backgroundColor: '#fff',
      paddingTop: 8,
      height: 60,
    },
    tabBarLabelStyle: {
      marginBottom: 4,
      fontSize: 13,
      fontWeight: '700',
    },
    tabBarActiveTintColor: '#152F8C',
    tabBarItemStyle: {},
  };
  return (
    <Tabs.Navigator screenOptions={screenOptions}>
      <Tabs.Screen
        options={{
          title: locales('titles.home'),
          headerShown: false,
          headerTintColor: '#fafafa',
          tabBarIcon: ({focused, color}) => (
            <HomeIcon
              name="home"
              size={24}
              color={focused ? '#0B1596' : '#9B9B9B'}
            />
          ),
        }}
        name={'homeIndex'}
        component={HomeScreens}
      />
      <Tabs.Screen
        options={{
          headerShown: true,
          headerStyle: {backgroundColor: '#0B1596'},
          headerTintColor: '#fff',
          tabBarIcon: ({focused, color}) => (
            <InvoiceIcon
              name="invoice"
              size={24}
              color={focused ? '#0B1596' : '#9B9B9B'}
            />
          ),
        }}
        name={locales('titles.Invoice')}
        component={Invoice}
      />

      <Tabs.Screen
        options={{
          headerShown: false,
          headerStyle: {backgroundColor: '#0B1596'},
          headerTintColor: '#fff',
          tabBarIcon: ({focused, color}) => (
            <BankIcon name="Bank" color={focused ? '#0B1596' : '#9B9B9B'} />
          ),
        }}
        name={locales('titles.bank')}
        component={BankScreen}
      />
      <Tabs.Screen
        options={{
          headerStyle: {backgroundColor: '#0B1596'},
          headerTintColor: '#fff',
          headerShown: false,
          tabBarIcon: ({focused, color}) => (
            <MoreIcon
              name="My Profile"
              size={24}
              color={focused ? '#0B1596' : '#9B9B9B'}
            />
          ),
        }}
        name={locales('titles.myProfile')}
        component={MyProfileScreen}
      />
    </Tabs.Navigator>
  );
};
