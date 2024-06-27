import 'react-native-gesture-handler';
import {useContext, useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import ContextsProvider, {AuthContext} from './src/contexts';
import {NavigationContainer} from '@react-navigation/native';
import {Auth} from './src/stacks/Auth';
import {contextsStore} from './src/contexts/index';
import {BottomTabScreen} from './src/stacks/BottomTabScreen';
import './src/components/ActionSheet/sheet.ts';
import {SheetProvider} from 'react-native-actions-sheet';
import PageOne from './src/components/Intro/pageOne';
import {Introdation} from './src/stacks/Intro';
import Introdaction from './src/components/Intro';
import {Password} from './src/stacks/Password';
import Notifications from './src/screens/Notifications/index';
import locales from './locales';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InternetConnection from './src/components/NotFound/InternetConnection';

const Stack = createNativeStackNavigator();
global.locales = locales.localize;
function App() {
  const {language, setLanguage} = useContext(contextsStore);

  useEffect(() => {
    AsyncStorage.getItem('language').then(res => {
      if (res === 'English') {
        setLanguage('en-us');
      } else if (res === 'Catalan') {
        setLanguage('ca-sp');
      } else if (res === 'Spanish') {
        setLanguage('es-sp');
      }
    });
  }, []);

  locales.setActiveLanguage(language || 'en-us');

  return (
    <NavigationContainer>
      <SheetProvider>
        <StatusBar backgroundColor="#0B1596" />
        <Stack.Navigator screenOptions={{animation: 'none'}}>
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="Introdation"
            component={Introdation}
          />

          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="Auth"
            component={Auth}
          />
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="Password"
            component={Password}
          />
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="Home"
            component={BottomTabScreen}
          />
      
        </Stack.Navigator>
      </SheetProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
