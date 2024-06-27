import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View, TouchableOpacity, Image, Text} from 'react-native';
import NotifPageIcon from '../../assets/svgs/NotifPageIcon';
import {contextsStore} from '../../contexts';
import BankAccounntList from './BankAccounntList';
import NewBookCashIcon from '../../assets/svgs/NewBookCashIcon';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import database from '../../DB/index.native';
import {Q} from '@nozbe/watermelondb';

function Bank({navigation}) {
  const {navigate, addListener, setOptions} = useNavigation();
  const {setTabBarBottom} = useContext(contextsStore);
  const [bankAccountList, setBankAccountList] = useState([]);
  const [currenciesList, setCurrenciesList] = useState([]);

  useEffect(_ => {
    const listener = navigation.addListener('focus', _ => {
      setTabBarBottom(true);
      fetchBankAccountDetails();
      database.collections
        .get('currencies')
        .query()
        .fetch()
        .then(currencies => setCurrenciesList(currencies));
    });
    return listener;
  });

  useEffect(() => {
    setOptions({
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

  const fetchBankAccountDetails = async _ => {
    const userId = await AsyncStorage.getItem('userId');
    const userBankAccounts = await database.collections
      .get('bank_accounts')
      .query(Q.where('user_id', userId))
      .fetch();
    for (const bankAccount of userBankAccounts) {
      const accounts = await database.collections
        .get('bank_account_transactions')
        .query(Q.where('bank_account_id', bankAccount._raw.id))
        .fetch();

      // database.write(async _ => {
      //   await bankAccount.update(row => {
      //     row._raw.total_transactions_amount = accounts.reduce(
      //       (acc, itm) => acc + itm._raw.customer_total_transactions_amount,
      //       0,
      //     );
      //     database.collections
      //       .get('bank_account_transactions')
      //       .query(Q.where('bank_account_id', bankAccount._raw.id))
      //       .fetchCount()
      //       .then(count => (row._raw.total_deposit_amount = count));
      //   });
      // });
    }
    setBankAccountList(userBankAccounts.map(item => item._raw));
  };

  return (
    <>
      <View style={styles.container}>
        <BankAccounntList
          setBankAccountList={setBankAccountList}
          bankAccountList={bankAccountList}
          currenciesList={currenciesList}
        />

        <TouchableOpacity
          onPress={() => {
            navigate('NewBankAccount');
          }}
          style={[
            styles.btn,
            {display: bankAccountList.length > 0 ? 'flex' : 'none'},
          ]}>
          <NewBookCashIcon />
          <Text
            style={{
              color: '#fff',
              marginLeft: 8,
              fontSize: 16,
              fontWeight: '600',
            }}>
            {locales('titles.newBankAccount')}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    height: '100%',
  },
  notFound: {
    textAlign: 'center',
    color: '#01020D',
    fontWeight: '500',
    fontSize: 14,
    marginTop: 50,
  },
  btn: {
    backgroundColor: '#0B1596',
    padding: 16,
    position: 'absolute',
    top: '87%',
    borderRadius: 29,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    alignSelf: 'center',
  },
});
export default Bank;
