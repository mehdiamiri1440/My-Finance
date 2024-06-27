import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Phone from './../screens/Auth/Phone';
import VerifyCode from '../screens/Auth/VerifyCode';
import {createStackNavigator} from '@react-navigation/stack';
import Countries from '../components/CountriesModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../components/Loading';
import Name from '../screens/Auth/Name';
import NetInfo from '@react-native-community/netinfo';

const Stack = createStackNavigator();

export const Auth = ({navigation}) => {
  const [authShown, setAuthShown] = React.useState(false);

  React.useEffect(() => {
    AsyncStorage.getItem('Auth')
      .then(value => {
        setTimeout(() => {
          if (value === 'true') {
            navigation.replace('Password');
          } else {
            setAuthShown(true);
          }
        }, 2000);
      })
      .catch(error => {});
  }, []);
  return (
    <Stack.Navigator initialRouteName="GetPhone">
      {authShown ? (
        <>
          <Stack.Group>
            <Stack.Screen
              options={{
                headerShown: true,
                headerTitle: `${locales('titles.register')}`,
                headerStyle: {backgroundColor: '#0B1596'},
                headerTintColor: '#fff',
                headerBackVisible: false,
                headerLeft: () => {},
              }}
              name="GetPhone"
              component={Phone}
            />
            <Stack.Screen
              options={{
                headerShown: true,
                headerTitle: `${locales('titles.register')}`,
                headerStyle: {backgroundColor: '#0B1596'},
                headerTintColor: '#fafafa',
                headerBackVisible: false,
                headerLeft: () => {},
              }}
              name="VerifyPhone"
              component={VerifyCode}
            />
            <Stack.Screen
              options={{
                headerShown: true,
                headerTitle: `${locales('titles.name')}`,
                headerStyle: {backgroundColor: '#0B1596'},
                headerTintColor: '#fafafa',
                headerBackVisible: false,
                headerLeft: () => {},
              }}
              name="Name"
              component={Name}
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
              name="CountriesModal"
              component={Countries}
            />
          </Stack.Group>
        </>
      ) : (
        <Stack.Group>
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="Loading"
            component={Loading}
          />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};
