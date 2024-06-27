import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Phone from '../screens/Auth/Phone';
import VerifyCode from '../screens/Auth/VerifyCode';
import {createStackNavigator} from '@react-navigation/stack';
import Countries from '../components/CountriesModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../components/Loading';
import PasswordPage from '../screens/Password';

const Stack = createStackNavigator();

export const Password = ({navigation, route}) => {
  const [passwordShown, setPasswordShown] = React.useState(false);
  React.useEffect(() => {
    AsyncStorage.getItem('password')
      .then(value => {
        setTimeout(() => {
          if (value === 'true') {
            setPasswordShown(true);
          } else {
            navigation.replace('Home');
          }
        }, 2000);
      })
      .catch(error => {});
  }, []);
  return (
    <Stack.Navigator initialRouteName="PasswordPage">
      {passwordShown ? (
        <>
          <Stack.Group>
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="PasswordPage"
              component={PasswordPage}
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
