import React from 'react';
import MyProfile from '../screens/MyProfile';
import {createStackNavigator} from '@react-navigation/stack';
import ArrowLeftIcon from '../assets/svgs/ArrowLeftIcon';
import Profile from '../screens/MyProfile/Profile';
import Password from '../screens/MyProfile/Password';
import Income from '../screens/MyProfile/Income';
import EditPassword from '../screens/MyProfile/EditPassword';
import EditLanguage from '../screens/MyProfile/EditLanguage';
import InviteFriend from '../screens/MyProfile/InviteFriend';
import FAQ from '../screens/MyProfile/FAQ';
import Purchase from '../screens/MyProfile/Purchase';
import LogOutModal from '../screens/MyProfile/LogOutModal';
import CreatePassword from '../screens/MyProfile/CreatePassword';
import Notifications from '../screens/Notifications';
import Expense from '../screens/MyProfile/Expense';

const Stack = createStackNavigator();

function MyProfileScreen() {
  return (
    <Stack.Navigator
      screenOptions={{animationEnabled: false}}
      initialRouteName="MyProfile">
      <Stack.Group
        screenOptions={{
          headerMode: 'screen',
        }}>
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: locales('titles.myProfile'),
            headerStyle: {backgroundColor: '#0B1596'},
            headerTintColor: '#fff',
            headerLeft: () => {},
          }}
          name="MyProfile"
          component={MyProfile}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: locales('titles.profile'),
            headerStyle: {backgroundColor: '#0B1596'},
            headerTintColor: '#fff',
          }}
          name="Profile"
          component={Profile}
        />

        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: locales('titles.income'),
            headerStyle: {backgroundColor: '#0B1596'},
            headerTintColor: '#fff',
          }}
          name="IncomePage"
          component={Income}
        />

        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: locales('titles.expense'),
            headerStyle: {backgroundColor: '#0B1596'},
            headerTintColor: '#fff',
          }}
          name="ExpensePage"
          component={Expense}
        />

        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: locales('titles.password'),
            headerStyle: {backgroundColor: '#0B1596'},
            headerTintColor: '#fff',
          }}
          name="PasswordPage"
          component={Password}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: locales('titles.editPassword'),
            headerStyle: {backgroundColor: '#0B1596'},
            headerTintColor: '#fff',
          }}
          name="EditPassword"
          component={EditPassword}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: locales('titles.editLanguage'),
            headerStyle: {backgroundColor: '#0B1596'},
            headerTintColor: '#fff',
          }}
          name="EditLanguage"
          component={EditLanguage}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: locales('titles.inviteFriends'),
            headerStyle: {backgroundColor: '#0B1596'},
            headerTintColor: '#fff',
          }}
          name="InviteFriend"
          component={InviteFriend}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: locales('titles.FAQ'),
            headerStyle: {backgroundColor: '#0B1596'},
            headerTintColor: '#fff',
          }}
          name="FAQ"
          component={FAQ}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: locales('titles.purchase'),
            headerStyle: {backgroundColor: '#0B1596'},
            headerTintColor: '#fff',
          }}
          name="Purchase"
          component={Purchase}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: locales('titles.createNewPassword'),
            headerStyle: {backgroundColor: '#0B1596'},
            headerTintColor: '#fff',
          }}
          name="CreatePassword"
          component={CreatePassword}
        />
        <Stack.Screen
          options={{
            headerTitle: locales('titles.notifications'),
            headerShown: true,
            headerStyle: {backgroundColor: '#0B1596'},
            headerTintColor: '#fff',
          }}
          name={'Notifications'}
          component={Notifications}
        />
      </Stack.Group>

      <Stack.Group
        screenOptions={{
          presentation: 'transparentModal',
          animationEnabled: false,
          animationTypeForReplace: 'pop',
        }}>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Logoutmodal"
          component={LogOutModal}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}

export default MyProfileScreen;
