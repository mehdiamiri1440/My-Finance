import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Linking,
  Alert,
  ScrollView,
} from 'react-native';
import SubscriptionIcon from '../../assets/svgs/SubscriptionIcon';
import ArrowForwardIcon from '../../assets/svgs/ArrowForwardIcon';
import BadgeIcon from '../../assets/svgs/BadgeIcon';
import PasswordIcon from '../../assets/svgs/PasswordIcon';
import ArrowRightBtn from '../../assets/svgs/ArrowRightBtn';
import LanguageIcon from '../../assets/svgs/LanguageIcon';
import FaqIcon from '../../assets/svgs/FaqIcon';
import BlogIcon from '../../assets/svgs/BlogIcon';
import PAndPicon from '../../assets/svgs/PAndPicon';
import InviteIcon from '../../assets/svgs/InviteIcon';
import UpdateIcon from '../../assets/svgs/UpdateIcon';
import LogOutIcon from '../../assets/svgs/LogOutIcon';
import {contextsStore} from '../../contexts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import database from '../../DB/index.native';
import NotifIcon from '../../assets/svgs/NotifIcon';
import MenuComponent from './../../components/MyProfile/menuComponent';
import NotifPageIcon from '../../assets/svgs/NotifPageIcon';
import EditIcon from '../../assets/svgs/EditIcon';
import IncomeIcon from '../../assets/svgs/IncomeIcon';
import {numberWithCommas} from '../../utils/formatter';
const PACKAGE_NAME = 'com.contebre.package';

function MyProfile({navigation}) {
  const {setTabBarBottom} = useContext(contextsStore);
  const [userInfo, setUserInfo] = useState([]);
  const [userId, setUserId] = useState('');
  const [actualBalance, setActualBalance] = useState(0);
  const [projectedBalance, setProjectedBalance] = useState(0);
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });
    return unsubscribe;
  }, [navigation]);
  const fetchData = async () => {
    const expenses = await database.get('expenses').query().fetch();
    const incomes = await database.get('incomes').query().fetch();
    const projectedIncomes = incomes.reduce((acc, item) => {
      if (item.type == 1) return acc + item.amount;
      else return acc + 0;
    }, 0);
    const projectedExpenses = expenses.reduce((acc, item) => {
      if (item.type == 1) return acc + item.amount;
      else return acc + 0;
    }, 0);
    const actualIncomes = incomes.reduce((acc, item) => acc + item.amount, 0);
    const actualExpenses = expenses.reduce((acc, item) => acc + item.amount, 0);
    const actualBalanceTemp = actualIncomes - actualExpenses;
    const projectedBalanceTemp = projectedIncomes - projectedExpenses;
    setActualBalance(actualBalanceTemp);
    setProjectedBalance(projectedBalanceTemp);
    return [actualBalanceTemp, projectedBalanceTemp];
  };

  useEffect(() => {
    AsyncStorage.getItem('userId').then(async userId => {
      setUserId(userId);
      const userInfo = await database.get('user').find(userId);
      setUserInfo(userInfo);
    });
  }, [navigation]);
  useEffect(() => {
    AsyncStorage.getItem('userId').then(async userId => {
      setUserId(userId);
      const userInfo = await database.get('user').find(userId);
      setUserInfo(userInfo);
    });
  }, []);

  useEffect(() => {
    navigation.addListener('focus', () => {
      setTabBarBottom(true);
    });
    navigation.setOptions({
      headerRight: () => (
        <NotifPageIcon
          style={{marginRight: 16}}
          onPress={() => {
            navigation.navigate('Notifications');
          }}
        />
      ),
    });
  }, [navigation]);

  const handleUpdateAppBtn = async () => {
    // try {
    //   const url = `https://play.google.com/store/apps/details?id=${PACKAGE_NAME}`;
    //   const canOpen = await Linking.canOpenURL(url);
    //   if (canOpen) {
    //     Linking.openURL(url);
    //   } else {
    //     Alert.alert('Error', 'Unable to open the Google Play Store.');
    //   }
    // } catch (error) {
    //   console.error('Error while checking for updates:', error);
    // }
  };
  return (
    <>
      <ScrollView style={{backgroundColor: '#fff', height: '100%'}}>
        {/* <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate('Purchase');
          }}>
          <View
            style={{
              backgroundColor: 'rgba(11, 159, 242, 0.1);',
              flexDirection: 'row',
              padding: 16,
              justifyContent: 'space-between',
            }}>
            <View style={{flexDirection: 'row'}}>
              <SubscriptionIcon />
              <View style={{marginLeft: 10}}>
                <Text style={styles.subsText}>
                  {locales('titles.yourAccountIsValid')}
                </Text>
                <Text style={styles.subsDay}>15 {locales('titles.days')}</Text>
              </View>
            </View>

            <View
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  style={{
                    color: '#0B9FF2',
                    fontSize: 14,
                    fontWeight: '600',
                    marginRight: 8,
                  }}>
                  {locales('titles.renew')}
                </Text>
                <ArrowForwardIcon />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback> */}

        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate('Profile', {userId});
          }}>
          <View style={styles.profile}>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.badgeIcon}>
                <BadgeIcon />
              </View>
              <View style={{marginLeft: 8}}>
                <Text style={styles.subsDay}>{userInfo.name}</Text>
                <Text style={styles.phone}>{userInfo.phone}</Text>
              </View>
            </View>

            <View style={{flexDirection: 'row', gap: 8}}>
              <EditIcon />
              <Text style={styles.editStyle}>Edit</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>

        <View style={styles.profile}>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 14,
                }}>
                Actual Balance:
              </Text>
              <Text
                style={{
                  color: 'blue',
                  fontSize: 16,
                  fontWeight: 'bold',
                  marginLeft: 4,
                }}>
                {numberWithCommas(actualBalance)}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 14,
                }}>
                Projected Balance:
              </Text>
              <Text
                style={{
                  color: 'blue',
                  fontSize: 16,
                  fontWeight: 'bold',
                  marginLeft: 4,
                }}>
                {numberWithCommas(projectedBalance)}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.menu}>
          <MenuComponent
            onPress={() => {
              navigation.navigate('IncomePage', {userId});
            }}
            name={locales('titles.income')}
            children={<IncomeIcon />}
          />
          <MenuComponent
            onPress={() => {
              navigation.navigate('ExpensePage', {userId});
            }}
            name={locales('titles.expense')}
            children={<IncomeIcon />}
          />

          <MenuComponent
            onPress={() => {
              navigation.navigate('PasswordPage', {userId});
            }}
            name={locales('titles.password')}
            children={<PasswordIcon />}
          />

          <MenuComponent
            onPress={() => {
              navigation.navigate('EditLanguage', {userId});
            }}
            name={locales('titles.language')}
            children={<LanguageIcon />}
          />

          <MenuComponent
            onPress={() => {
              navigation.navigate('FAQ');
            }}
            name={locales('titles.FAQ')}
            children={<FaqIcon />}
          />

          <MenuComponent
            name={locales('titles.blog')}
            children={<BlogIcon />}
          />
          <MenuComponent
            name={locales('titles.PrivacyAndPolicy')}
            children={<PAndPicon />}
          />
          <MenuComponent
            onPress={() => {
              navigation.navigate('InviteFriend');
            }}
            name={locales('titles.InviteYourFriends')}
            children={<InviteIcon />}
          />
          <MenuComponent
            onPress={handleUpdateAppBtn}
            name={locales('titles.update')}
            children={<UpdateIcon />}
          />

          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate('Logoutmodal');
            }}>
            <View
              style={{
                marginTop: 40,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text style={[styles.menuText, {marginLeft: 0}]}>
                {locales('titles.logOut')}
              </Text>
              <LogOutIcon />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  subsText: {
    color: '#01020D',
    fontWeight: '400',
    fontSize: 14,
  },
  subsDay: {
    color: '#01020D',
    fontWeight: '600',
    fontSize: 18,
  },
  align: {
    flexDirection: 'row',
  },
  profile: {
    padding: 24,
    backgroundColor: '#fff',
    margin: 16,
    elevation: 1,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  badgeIcon: {
    borderRadius: 50,
    backgroundColor: 'rgba(11, 21, 150, 0.09)',
    padding: 10,
  },
  phone: {
    color: '#9b9b9b',
    fontWeight: '500',
    fontSize: 16,
  },
  menu: {
    backgroundColor: '#fff',
    elevation: 1,
    padding: 24,
    marginHorizontal: 16,
    borderRadius: 8,
  },
  menuText: {
    color: '#01020D',
    fontWeight: '500',
    fontSize: 16,
    marginLeft: 8,
  },
  editStyle: {
    color: '#0B1596',
    fontWeight: '600',
    fontSize: 14,
  },
});

export default MyProfile;
