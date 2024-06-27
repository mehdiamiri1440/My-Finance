import {useContext} from 'react';
import Phone from './../screens/Auth/Phone';
import VerifyCode from '../screens/Auth/VerifyCode';
import Home from '../screens/Home';
import NewUser from '../screens/Home/newUser';
import ContactsList from '../components/UserContact';
import BackIcon from '../assets/svgs/BackIcon';
import {contextsStore} from '../contexts';
import CustomerPage, {Menu} from '../screens/Home/CustomerPage';
import SettingIcon from './../assets/svgs/SettingIcon';
import CustomerProfile from '../components/CutomerPageComponents/CustomerProfile';
import EditIcon from './../assets/svgs/EditIcon';
import EditUser from '../components/CutomerPageComponents/EditUser';
import ReceivedComponent from '../components/CutomerPageComponents/ReceivedComponent';
import {Text} from 'react-native';
import GivenComponent from '../components/CutomerPageComponents/GivenComponent';
import NotePage from '../components/CutomerPageComponents/NotePage';
import NewBookCash from '../components/NewBookCash';
import BookCashDetails from '../screens/Home/BookCashDetails';
import EditAmount from '../components/CustomerAmoutsList/EditAmount';
import {createStackNavigator} from '@react-navigation/stack';

import ImagePage from '../components/CutomerPageComponents/ImagePage';
import Report from '../components/CutomerPageComponents/Report';
import CustomerTransactions from '../screens/Home/CustomerTransactions';
import Notifications from '../screens/Notifications';
import PageNotFound404 from '../components/NotFound/404';
import DeleteImageModal from '../screens/Bank/DeleteImageModal';
import TransactionDetails from './../screens/Home/transactionDetails';
import SingleInvoice from '../screens/Home/singleInvoice';

const Stack = createStackNavigator();

export const HomeScreens = ({route}) => {
  const {customerName, routeName} = useContext(contextsStore);
  return (
    <Stack.Navigator
      screenOptions={{animationEnabled: true}}

      //initialRouteName="GetUserInfo"
    >
      <Stack.Group
        screenOptions={{
          headerMode: 'screen',
        }}>
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: `${locales('titles.bookCash')}`,
            headerStyle: {backgroundColor: '#0B1596'},
            headerTintColor: '#fafafa',
            headerLeft: () => {},
          }}
          name="homeScreen"
          component={Home}
        />
        <Stack.Screen
          options={{
            headerShown: false,
            headerTitle: `${locales('titles.newCustomer')}`,
            headerStyle: {backgroundColor: '#0B1596'},
            headerTintColor: '#fafafa',
            headerBackVisible: false,
            headerLeft: () => <BackIcon style={{marginRight: 32}} />,
          }}
          name="NewUserScreen"
          component={NewUser}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: `${locales('titles.ChooseAContact')}`,
            headerStyle: {backgroundColor: '#0B1596'},
            headerTintColor: '#fafafa',
            headerBackVisible: false,
            headerLeft: () => <BackIcon style={{marginRight: 32}} />,
          }}
          name="ContactList"
          component={ContactsList}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            headerStyle: {backgroundColor: '#0B1596'},
            headerTintColor: '#fff',
            headerBackVisible: true,
            // headerRight: () => <SettingIcon />,
            // headerLeft: () => <BackIcon style={{marginLeft: 16}} />,
          }}
          name={'CustomerTransactions'}
          component={CustomerTransactions}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            headerStyle: {backgroundColor: '#0B1596'},
            headerTintColor: '#fff',
            headerBackVisible: true,
            // headerRight: () => <SettingIcon />,
            // headerLeft: () => <BackIcon style={{marginLeft: 16}} />,
          }}
          name={'customerPage'}
          component={CustomerPage}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            headerStyle: {backgroundColor: '#0B1596'},
            headerTintColor: '#fafafa',
            headerBackVisible: true,
            headerTitle: `${({customerName}, locales('titles.profile'))}`,
          }}
          name={'customerProfile'}
          component={CustomerProfile}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: `${locales('titles.edit')}`,
            headerStyle: {backgroundColor: '#0B1596'},
            headerTintColor: '#fafafa',
            headerBackVisible: true,
          }}
          name="EditProfile"
          component={EditUser}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: `${locales('titles.newAmount')}`,
            headerStyle: {backgroundColor: '#00CF82'},
            headerTintColor: '#fff',
            headerBackVisible: false,
          }}
          name="Received"
          component={ReceivedComponent}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: `${locales('titles.newAmount')}`,
            headerStyle: {backgroundColor: '#E52929'},
            headerTintColor: '#fff',
            headerBackVisible: false,
          }}
          name="Given"
          component={GivenComponent}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: `${locales('titles.newAmount')}`,
            headerTintColor: '#fff',
            headerBackVisible: false,
          }}
          name="TransactionDetails"
          component={TransactionDetails}
        />
        <Stack.Screen
          options={{
            headerTitle: routeName,
            headerShown: true,
            headerStyle: {backgroundColor: '#0B1596'},
            headerTintColor: '#fafafa',
            headerBackVisible: true,
          }}
          name={'notePage'}
          component={NotePage}
        />
        <Stack.Screen
          options={{
            headerTitle: `${locales('titles.bookCash')}`,
            headerShown: true,
            headerStyle: {backgroundColor: '#0B1596'},
            headerTintColor: '#fafafa',
            headerBackVisible: true,
          }}
          name={'NewBookCash'}
          component={NewBookCash}
        />
        <Stack.Screen
          options={{
            headerTitle: 'Book Cash',
            headerShown: true,
            headerStyle: {backgroundColor: '#0B1596'},
            headerTintColor: '#fafafa',
            headerBackVisible: true,
          }}
          name={'BookCashDetails'}
          component={BookCashDetails}
        />
        <Stack.Screen
          options={{
            headerTitle: 'Watch and Edit amount',
            headerShown: true,
            headerStyle: {backgroundColor: '#0B1596'},
            headerTintColor: '#fafafa',
            headerBackVisible: false,
          }}
          name={'EditAmount'}
          component={EditAmount}
        />
        <Stack.Screen
          options={{
            headerTitle: `${locales('titles.report')}`,
            headerShown: true,
            headerStyle: {backgroundColor: '#0B1596'},
            headerTintColor: '#fff',
          }}
          name={'Report'}
          component={Report}
        />
        <Stack.Screen
          options={{
            headerTitle: `${locales('titles.invoice')}`,
            headerShown: true,
            headerStyle: {backgroundColor: '#0B1596'},
            headerTintColor: '#fff',
          }}
          name={'singleInvoice'}
          component={SingleInvoice}
        />
        <Stack.Screen
          options={{
            headerTitle: `${locales('titles.notifications')}`,
            headerShown: true,
            headerStyle: {backgroundColor: '#0B1596'},
            headerTintColor: '#fff',
          }}
          name={'Notifications'}
          component={Notifications}
        />
        <Stack.Screen
          options={{
            headerTitle: `${locales('titles.404')}`,
            headerShown: true,
            headerStyle: {backgroundColor: '#0B1596'},
            headerTintColor: '#fff',
          }}
          name={'404'}
          component={PageNotFound404}
        />
      </Stack.Group>

      <Stack.Group
        screenOptions={{
          presentation: 'transparentModal',
          animationEnabled: false,
          animationTypeForReplace: 'pop',
          detachPreviousScreen: false,
        }}>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Menu"
          component={Menu}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="ImagePage"
          component={ImagePage}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="DeleteImageModal"
          component={DeleteImageModal}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};
