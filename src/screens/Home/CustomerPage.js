import React, {useEffect, useContext, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import CallIcon from '../../assets/svgs/CallIcon';
import SettingIcon from '../../assets/svgs/SettingIcon';
import BackIcon from './../../assets/svgs/BackIcon';
import {contextsStore} from './../../contexts/index';
import CustomerAmountList from '../../components/CustomerAmoutsList';
import database from '../../DB/index.native';
import {Q} from '@nozbe/watermelondb';
import MobileIcon from '../../assets/svgs/MobileIcon';
import ArrowRightIcon from '../../assets/svgs/ArrowRightIcon';
import ProfileIcon from '../../assets/svgs/ProfileIcon';
import MessageIcon from '../../assets/svgs/MessageIcon';
import NotifIcon from '../../assets/svgs/NotifIcon';
import NoteIcon from '../../assets/svgs/NoteIcon';
import ReportIcon from '../../assets/svgs/ReportIcon';
import {SheetManager} from 'react-native-actions-sheet';

function CustomerPage({navigation, route}) {
  const {
    setTabBarBottom,
    total,
    setBoxDisplay,
    setRecordStyle,
    setFilterDisplay,
    totalAmount,
    setTotalAmount,
  } = useContext(contextsStore);
  const {customerID, customerName, bookCashId} = route.params;
  const [customerInfo, setCustomerInfo] = useState(null);
  // const [totalAmount, setTotalAmount] = useState('');
  const [totalAmountColor, setTotalAmountColor] = useState(false);

  useEffect(() => {
    navigation.addListener('focus', () => {
      async function sum() {
        const Amounts = await database.collections
          .get('customerdebt')
          .query(Q.where('customers_id', customerID))
          .fetch();
        const filterFalseAmounts = Amounts.filter(
          res => res._raw.is_debt === false,
        );
        const totalIndebtednessAmount = filterFalseAmounts.reduce(
          (sum, amount) => sum + amount.amount,
          0,
        );

        const filterTrueAmounts = Amounts.filter(
          res => res._raw.is_debt === true,
        );
        const totalDebtAmount = filterTrueAmounts.reduce(
          (sum, amount) => sum + amount.amount,
          0,
        );
        // red - green
        const total = totalIndebtednessAmount - totalDebtAmount;
        const stTotal = total.toString();

        setTotalAmount(stTotal);

        database.write(async () => {
          const customer = await database.get('customers').find(customerID);
          await customer.update(customer => {
            customer.remain = stTotal;
          });
        });
      }
      sum();
    });
  }, [navigation]);

  useEffect(() => {
    if (totalAmount.charAt(0) === '-') {
      setTotalAmountColor(true);
    } else {
      setTotalAmountColor(false);
    }
  }, [totalAmount]);
  // useEffect(() => {
  //   if (totalAmount.charAt(0 === '-')) {
  //     const total = totalAmount.substring(1);
  //     setTotalAmount(total);
  //   }
  // }, [totalAmount]);

  useEffect(() => {
    async function loadinfo() {
      const customer = await database.get('customers').find(customerID);
      setCustomerInfo(customer);
    }
    loadinfo();
  }, [customerID]);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <BackIcon
          style={{marginLeft: 16}}
          onPress={() => {
            navigation.navigate('homeScreen', {
              customerID,
              bookCashId,
            });
            setRecordStyle(false);
            setFilterDisplay(true);
          }}
        />
      ),
    });
  }, [navigation]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <SettingIcon
          style={{marginRight: 24}}
          onPress={() => {
            navigation.navigate('Menu', {
              customerID: customerID,
              bookCashId,
            });
          }}
        />
      ),

      headerTitle: () => (
        <>
          <View style={{display: 'flex', flexDirection: 'column'}}>
            <Text style={{color: '#fff', fontSize: 20}}>{customerName}</Text>
          </View>
        </>
      ),
    });
    navigation.addListener('focus', () => {
      setTabBarBottom(false);
    });
    navigation.addListener('focus', () => {
      database.collections
        .get('customerdebt')
        .query()
        .then(result => {
          if (result.length > 0) {
            setBoxDisplay(false);
          } else {
            setBoxDisplay(true);
          }
        });
    });
  }, [navigation]);
  return (
    <>
      <View
        style={{
          display: 'flex',
          height: '100%',
        }}>
        <View
          style={{
            backgroundColor: 'rgba(230, 120, 41, 0.1)',
            padding: 16,
            display: customerInfo?.phone ? 'none' : 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <MobileIcon />
          <Text style={{color: '#01020D', fontSize: 14, fontWeight: '500'}}>
            {locales(
              'titles.YouCanReceiveMessagesFromUsWhenYouEnterYourPhoneNumber',
            )}
          </Text>
          <ArrowRightIcon
            onPress={() => {
              navigation.navigate('EditProfile', {
                customerID,
                name: customerInfo.name,
                phone: customerInfo.phone,
              });
            }}
          />
        </View>
        <View>
          <View style={styles.mainHeader}>
            <Text style={{color: '#0B1596', fontWeight: '400', fontSize: 13}}>
              {locales('titles.accountBalance')}
            </Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 16,
              }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '600',
                  color: '#01020D',
                }}>
                {totalAmount.charAt(0) === '-'
                  ? totalAmount.substring(1)
                  : totalAmount}
                €
              </Text>
              <Text
                style={{
                  fontWeight: '400',
                  fontSize: 14,
                  color:
                    totalAmount.charAt(0) === '0'
                      ? '#9B9B9B'
                      : totalAmount.charAt(0) === '-'
                      ? '#E52929'
                      : '#00CF82',
                }}>
                {totalAmount.charAt(0) === '0'
                  ? locales('titles.settlement')
                  : totalAmount.charAt(0) === '-'
                  ? locales('titles.willBePayed')
                  : locales('willBeGet')}
              </Text>
            </View>
          </View>

          <CustomerAmountList route={route} navigation={navigation} />
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            margin: 16,
            position: 'absolute',
            top: '86%',
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Received', {customerID, customerName});
            }}
            style={{
              flex: 1,
              paddingVertical: 16,
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'center',
              borderRadius: 8,
              flexDirection: 'row',
              borderColor: '#00CF82',
              borderWidth: 1,
              marginRight: 16,
            }}>
            <Text
              style={{
                color: '#00CF82',
                fontSize: 16,
                fontWeight: '600',
              }}>
              {locales('titles.received')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Given', {customerID, customerName});
            }}
            style={{
              paddingVertical: 16,
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'center',
              borderRadius: 8,
              flexDirection: 'row',
              borderColor: '#E52929',
              borderWidth: 1,
              flex: 1,
            }}>
            <Text
              style={{
                color: '#E52929',
                fontSize: 16,
                fontWeight: '600',
              }}>
              {locales('titles.haveGiven')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

export function Menu({navigation, route}) {
  const {customerID, customerName, bookCashId} = route.params;

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        navigation.goBack();
      }}>
      <View
        style={{
          paddingRight: 16,
          paddingTop: 50,
          width: '100%',
          height: '100%',
          backgroundColor: ' rgba(1, 2, 13, 0.2)',
          alignItems: 'flex-end',
        }}>
        <View
          style={{
            backgroundColor: '#fff',
            padding: 16,
            paddingBottom: 0,
            borderRadius: 8,
            elevation: 1,
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('customerProfile', {
                customerID: customerID,
                bookCashId,
              });
            }}>
            <View
              style={[
                styles.faj,
                {justifyContent: 'flex-start', alignItems: 'center'},
              ]}>
              <ProfileIcon />
              <Text style={styles.menuText}>{locales('titles.profile')}</Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              backgroundColor: '#d9d9d9',
              height: 1,
              marginBottom: 16,
            }}></View>

          <View
            style={[
              styles.faj,
              {justifyContent: 'flex-start', alignItems: 'center'},
            ]}>
            <CallIcon />
            <Text style={styles.menuText}>{locales('titles.call')}</Text>
          </View>
          <View
            style={[
              styles.faj,
              {justifyContent: 'flex-start', alignItems: 'center'},
            ]}>
            <MessageIcon />
            <Text style={styles.menuText}>{locales('titles.message')}</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
              SheetManager.show('notice', {payload: {data: customerID}});
            }}>
            <View
              style={[
                styles.faj,
                {justifyContent: 'flex-start', alignItems: 'center'},
              ]}>
              <NotifIcon />
              <Text style={styles.menuText}>{locales('titles.notice')}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('notePage', {customerID});
            }}>
            <View
              style={[
                styles.faj,
                {justifyContent: 'flex-start', alignItems: 'center'},
              ]}>
              <NoteIcon />
              <Text style={styles.menuText}>{locales('titles.note')}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Report');
            }}>
            <View
              style={[
                styles.faj,
                {justifyContent: 'flex-start', alignItems: 'center'},
              ]}>
              <ReportIcon />
              <Text style={styles.menuText}>{locales('titles.report')}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  topBar: {
    backgroundColor: '#FFFFFF',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 16,
    paddingTop: 8,
    height: '8%',
    marginBottom: 16,
  },
  text: {
    color: '#092C80',
  },
  topBarItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  ab: {
    backgroundColor: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    marginHorizontal: 16,
  },
  faj: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  mainHeader: {
    backgroundColor: '#fff',
    padding: 16,
    elevation: 1,
    borderRadius: 8,
    margin: 16,
  },
  menuText: {
    color: '#01020D',
    fontSize: 14,
    fontWeight: '400',
    marginLeft: 8,
  },
});

export default CustomerPage;
