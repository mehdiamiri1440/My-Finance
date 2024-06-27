import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Phone from './../screens/Auth/Phone';
import VerifyCode from '../screens/Auth/VerifyCode';
import PageOne from '../components/Intro/pageOne';
import PageTwo from '../components/Intro/pageTwo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../components/Loading';
import PageThree from '../components/Intro/pageThree';

const Stack = createNativeStackNavigator();

export const Introdation = ({navigation}) => {
  const [introShown, setIntroShown] = React.useState(false);

  React.useEffect(() => {
    AsyncStorage.getItem('introShown')
      .then(value => {
        setTimeout(() => {
          if (value === 'true') {
            navigation.replace('Auth');
          } else {
            AsyncStorage.setItem('introShown', 'true');
            setIntroShown(true);
          }
        }, 2000);
      })
      .catch(error => {});
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{animation: 'none'}}
      initialRouteName="pageOne">
      {introShown ? (
        <>
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="pageOne"
            component={PageOne}
          />
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="pageTwo"
            component={PageTwo}
          />
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="pageThree"
            component={PageThree}
          />
        </>
      ) : (
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Loading"
          component={Loading}
        />
      )}
    </Stack.Navigator>
  );
};
