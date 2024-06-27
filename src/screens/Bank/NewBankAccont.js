import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {contextsStore} from '../../contexts';
import FlotableInput from '../../components/FlotableInput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import database from '../../DB/index.native';

function NewBankAccount({navigation}) {
  const {setTabBarBottom} = useContext(contextsStore);
  const [bankName, setBankName] = useState('');
  const [discriptionOfBank, setDiscriptionOfBank] = useState('');
  const [btnOpacity, setBtnOpacity] = useState(true);
  const [errorDisplay, setErrorDisplay] = useState(false);
  const [warnStyle, setWarnStyle] = useState(true);
  const [currencyId, setCurrencyId] = useState(null);
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    fetchCurrencies();

    navigation.addListener('focus', () => {
      setTabBarBottom(false);
    });
  }, [navigation]);

  const fetchCurrencies = _ => {
    database
      .get('currencies')
      .query()
      .fetch()
      .then(currencyList => {
        setCurrencies(currencyList);
      });
  };

  const handleAddBankAccount = () => {
    if (!bankName) {
      setErrorDisplay(true);
      setWarnStyle(false);
      return;
    }
  };

  useEffect(() => {
    if (bankName.length !== 0) {
      setErrorDisplay(false);
      setWarnStyle(true);
      setBtnOpacity(false);
    } else {
      setBtnOpacity(true);
    }
  }, [bankName, discriptionOfBank]);

  const handleAddNewBookCash = async () => {
    if (!bankName) {
      setErrorDisplay(true);
      setWarnStyle(false);
      return;
    }
    AsyncStorage.getItem('userId').then(userId => {
      database
        .write(async () => {
          // if (!bankAccountId) {
          await database
            .get('bank_accounts')
            .create(bankAccount => {
              bankAccount._raw.name = bankName;
              bankAccount._raw.currency_id = currencyId ?? currencies[0].id;
              bankAccount._raw.description = discriptionOfBank;
              bankAccount._raw.user_id = userId;
            })
            .then(res => {
              navigation.navigate('BankIndex');
            });
          // }
          // else {
          //   const bookCash = await database.collections
          //     .get('book_cashes')
          //     .find(bookCashId);
          //   await bookCash
          //     .update(book => {
          //       book._raw.title = bookCashName;
          //       book._raw.currency_id = currencyId ?? currencies[0].id;
          //     })
          //     .then(res => {
          //       navigation.navigate('BankIndex');
          //     });
          // }
        })
        .catch(err => {});
    });
  };

  return (
    <View style={styles.container}>
      <View>
        <FlotableInput
          borderColor={warnStyle ? '' : '#E62929'}
          value={bankName}
          setValue={setBankName}
          inputPlaceholder={locales('titles.name')}
        />
        <Text
          style={{
            marginTop: 8,
            fontSize: 13,
            fontWeight: '400',
            color: '#E62929',
            display: errorDisplay ? 'flex' : 'none',
          }}>
          {locales('titles.nameIsRequired')}
        </Text>
        <FlotableInput
          value={discriptionOfBank}
          setValue={setDiscriptionOfBank}
          inputPlaceholder={locales('titles.discription')}
        />
      </View>

      <TouchableOpacity
        onPress={handleAddNewBookCash}
        style={{
          backgroundColor: btnOpacity ? 'rgba(1, 2, 13, 0.09)' : '#0B1596',
          paddingVertical: 16,
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
          borderRadius: 8,
          flexDirection: 'row',
        }}>
        <Text
          style={{
            color: btnOpacity ? '#9B9B9B' : '#fff',
            fontSize: 16,
            fontWeight: '600',
          }}>
          {locales('titles.submit')}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    height: '100%',
    paddingHorizontal: 24,
    paddingBottom: 24,
    justifyContent: 'space-between',
  },
});
export default NewBankAccount;
