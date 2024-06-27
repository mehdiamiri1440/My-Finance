import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Bank from './../screens/Bank/index';
import Notifications from '../screens/Notifications';
import NewBankAccount from '../screens/Bank/NewBankAccont';
import BankAccountPage from '../screens/Bank/BankAccountPage';
import EditBankAccount from '../screens/Bank/EditBankAccount';
import EditablePage from '../screens/Bank/EditablePage';
import DeleteModal from '../screens/Bank/DeleteModal';
import DepositPage from '../screens/Bank/DepositePage';
import DeleteImageModal from '../screens/Bank/DeleteImageModal';
import ImagePage from '../components/CutomerPageComponents/ImagePage';
import Withdrawal from '../screens/Bank/WithdrawalPage';

const Stack = createStackNavigator();

function BankScreen() {
  return (
    <Stack.Navigator screenOptions={{animationEnabled: true}}>
      <Stack.Group
        screenOptions={{
          headerMode: 'screen',
        }}>
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: locales('titles.bank'),
            headerStyle: {backgroundColor: '#0B1596'},
            headerTintColor: '#fff',
            headerLeft: () => {},
          }}
          name="BankIndex"
          component={Bank}
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
        <Stack.Screen
          options={{
            headerTitle: locales('titles.newBankAccount'),
            headerShown: true,
            headerStyle: {backgroundColor: '#0B1596'},
            headerTintColor: '#fff',
          }}
          name={'NewBankAccount'}
          component={NewBankAccount}
        />
        <Stack.Screen
          options={{
            headerTitle: 'Bank Name',
            headerShown: true,
            headerStyle: {backgroundColor: '#0B1596'},
            headerTintColor: '#fff',
          }}
          name={'BankAccountPage'}
          component={BankAccountPage}
        />
        <Stack.Screen
          options={{
            headerTitle: locales('titles.editBankAccount'),
            headerShown: true,
            headerStyle: {backgroundColor: '#0B1596'},
            headerTintColor: '#fff',
          }}
          name={'EditBankAccount'}
          component={EditBankAccount}
        />
        <Stack.Screen
          options={{
            headerTitle: locales('titles.editBankAccount'),
            headerShown: true,
            headerStyle: {backgroundColor: '#0B1596'},
            headerTintColor: '#fff',
          }}
          name={'EditablePage'}
          component={EditablePage}
        />
        <Stack.Screen
          options={{
            headerTitle: locales('titles.deposit'),
            headerShown: true,
            headerStyle: {backgroundColor: '#00CF82'},
            headerTintColor: '#fff',
          }}
          name={'DepositPage'}
          component={DepositPage}
        />
        <Stack.Screen
          options={{
            headerTitle: locales('titles.withdrawal'),
            headerShown: true,
            headerStyle: {backgroundColor: '#E52929'},
            headerTintColor: '#fff',
          }}
          name="Withdrawal"
          component={Withdrawal}
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
          name="DeleteModal"
          component={DeleteModal}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="DeleteImageModal"
          component={DeleteImageModal}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="ImagePage"
          component={ImagePage}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}

export default BankScreen;
