import React, {useEffect, useContext, useState, useRef} from 'react';
import {
  Pressable,
  Text,
  Keyboard,
  View,
  KeyboardAvoidingView,
  FlatList,
  SafeAreaView,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import {StyleSheet} from 'react-native';
import ArrowDownIcon from '../../assets/svgs/ArrowDownIcon';
import PayedIcon from '../../assets/svgs/PayedIcon';
import RecivedIcon from '../../assets/svgs/RecivedIcon';
import {useNavigation} from '@react-navigation/native';
import NotifPageIcon from '../../assets/svgs/NotifPageIcon';
import EditIcon from '../../assets/svgs/EditIcon';
import EditBankIcon from '../../assets/svgs/EditBankIcon';
import TransactionsList from './TransactionsList';
import {contextsStore} from '../../contexts';
import SearchIcon from '../../assets/svgs/SearchIcon';
import FilterIcon from '../../assets/svgs/FilterIcon';
import {SheetManager} from 'react-native-actions-sheet';
import RBSheet from 'react-native-raw-bottom-sheet';
import BankfilterBtn from '../../components/Buttons/BankfilterBtn';
import BankRdadioButton from '../../components/RadioButton/BankRadioButton';
import CloseIcon from '../../assets/svgs/CloseIcon';
import BankFilter from '../../components/SheetManager/BankFilter';
import database from '../../DB/index.native';
import {Q} from '@nozbe/watermelondb';
import moment from 'moment';
import ListEmptyIcon from '../../assets/svgs/ListEmptyIcon';

const data = [
  {
    date: '12 Apr',
    records: [
      {
        amount: 65,
        clock: '20:01',
      },
      {
        amount: 125,
        clock: '20:01',
      },
    ],
  },
  {
    date: '12 Apr',
    records: [
      {
        amount: -65,
        clock: '20:01',
      },
      {
        amount: -897,
        clock: '20:01',
      },
    ],
  },
  {
    date: '12 Apr',
    records: [
      {
        amount: -55,
        clock: '20:01',
      },
    ],
  },
  {
    date: '12 Apr',
    records: [
      {
        amount: -55,
        clock: '20:01',
      },
      {
        amount: -55,
        clock: '20:01',
      },
    ],
  },
  {
    date: '12 Apr',
    records: [
      {
        amount: -55,
        clock: '20:01',
      },
      {
        amount: -55,
        clock: '20:01',
      },
    ],
  },
  {
    date: '12 Apr',
    records: [
      {
        amount: -55,
        clock: '20:01',
      },
      {
        amount: -55,
        clock: '20:01',
      },
    ],
  },
];

const filter = [
  {name: locales('titles.day')},
  {name: locales('titles.month')},
  {name: locales('titles.total')},
];

function BankAccountPage({route}) {
  const {setOptions, navigate, addListener} = useNavigation();
  const {bankAccountId, bankName, currenciesList} = route.params;
  const {setTabBarBottom} = useContext(contextsStore);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('' || locales('titles.day'));
  const [showUnitList, setShowUnitList] = useState(false);
  const [bankAccountDetails, setBankAccountDetails] = useState({});
  const [account, setAccount] = useState([]);
  const [deposit, setDeposit] = useState(null);
  const [withdrawal, setWithdrawal] = useState(null);
  const [totalTransactionAmount, setTotalTransactionAmount] = useState(null);
  const [keyboardDidShow, setKeyboardDidShow] = useState(false);

  const refRBSheet = useRef();

  useEffect(() => {
    addListener('focus', () => {
      fetchBankAccountDetails();
      setTabBarBottom(true);
    });
    setOptions({
      headerRight: () => (
        <View style={{flexDirection: 'row'}}>
          <Pressable style={{padding: 16}}>
            <EditBankIcon
              onPress={() => {
                navigate('EditBankAccount', {bankAccountId});
              }}
            />
          </Pressable>
          <Pressable style={{padding: 16}}>
            <NotifPageIcon
              onPress={() => {
                navigate('Notifications');
              }}
            />
          </Pressable>
        </View>
      ),
      headerTitle: bankName,
    });
  }, []);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardDidShow(false);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardDidShow(true);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const fetchBankAccountDetails = async () => {
    await database.collections
      .get('bank_accounts')
      .find(bankAccountId)
      .then(res => setBankAccountDetails(res._raw));
    const bankAccount = await database.collections
      .get('bank_accounts')
      .find(bankAccountId);

    const transactionsList = (
      await database.collections
        .get('account_transactions')
        .query(
          Q.where('bank_account_transactions_id', bankAccountId),
          Q.sortBy('date', Q.desc),
        )
    ).map(item => item._raw);

    database.write(async _ => {
      await bankAccount
        .update(item => {
          item._raw.total_transactions_amount = transactionsList.reduce(
            (acc, itm) => acc + itm.amount,
            0,
          );
          setTotalTransactionAmount(
            transactionsList.reduce((acc, itm) => acc + itm.amount, 0),
          );
        })
        .then(_ => {
          const groupedData = Object.entries(
            transactionsList.reduce((acc, obj) => {
              const key = moment.unix(obj.date).format('MMM DD');
              if (!acc[key]) {
                acc[key] = [];
              }
              acc[key].push(obj);
              return acc;
            }, {}),
          );
          setAccount(groupedData);
          // setCustomerDetails({
          //   ...customer._raw,
          //   transactions: groupedData,
          // });
        });

      const negativeNumber = transactionsList.filter(
        item => item.amount.toString().charAt(0) === '-',
      );
      const positiveNumber = transactionsList.filter(
        item => item.amount.toString().charAt(0) !== '-',
      );

      const nm = negativeNumber.reduce((acc, itm) => acc + itm.amount, 0);
      const pm = positiveNumber.reduce((acc, itm) => acc + itm.amount, 0);
      setDeposit(pm), setWithdrawal(nm);
    });

    // const accountList = (
    //   await database.collections
    //     .get('account_transactions')
    //     .query(Q.where('bank_account_transactions_id', bankAccountId))
    // ).map(item => item._raw);
    // setAccount(accountList);
  };

  const renderItem = ({item, index}) => {
    recordsRender = ({item}) => (
      <View style={styles.amountView}>
        <View style={styles.PRview}>
          <View
            style={[
              styles.iconView,
              {
                backgroundColor:
                  item.amount.toString().charAt(0) === '-'
                    ? 'rgba(230, 41, 41, 0.1)'
                    : 'rgba(0, 207, 130, 0.1)',
              },
            ]}>
            {item.amount.toString().charAt(0) === '-' ? (
              <PayedIcon />
            ) : (
              <RecivedIcon />
            )}
          </View>
          <Text style={styles.amountText2}>
            {currenciesList.find(
              currency => currency.id === bankAccountDetails.currency_id,
            )?.title === 'EUR'
              ? '£'
              : '$'}{' '}
            {item.amount.toLocaleString()}
          </Text>
        </View>

        <Text style={styles.clockText}>
          {moment.unix(item.date).format('HH:mm')}
        </Text>
      </View>
    );
    return (
      <>
        <View>
          <View style={styles.dateRecord}>
            <Text style={styles.dateText}>{item[0]}</Text>
            <Text style={styles.recordsText}>{item[1].length} Records</Text>
          </View>
          <FlatList data={item[1]} renderItem={recordsRender} />
        </View>
        <View style={styles.horizentalLine}></View>
      </>
    );
  };

  const renderListEmptyComponent = _ => {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 16,
        }}>
        <ListEmptyIcon />
        <Text style={{fontWeight: '400', fontSize: 14, color: '#9B9B9B'}}>
          No Records Yet...
        </Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView>
      <View style={styles.container}>
        <View style={styles.header}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems:'center'
            }}>
            <View>
              <Text style={styles.acText}>
                {locales('titles.accountBalance')}
              </Text>
              <View>
                <Text style={styles.amountText}>
                  {totalTransactionAmount ? totalTransactionAmount.toLocaleString() : '0'}
                  {currenciesList.find(
                    currency => currency.id === bankAccountDetails.currency_id,
                  )?.title === 'EUR'
                    ? '£'
                    : '$'}
                </Text>
              </View>
            </View>

            <View>
              <Pressable
                onPress={() => {
                  setShowUnitList(!showUnitList);
                }}
                style={styles.filterBtn}>
                <Text style={styles.filterText}>{filterType}</Text>
                <ArrowDownIcon />
              </Pressable>
            </View>
          </View>
          <FlatList
            data={filter}
            style={[
              styles.depositeTypeStyle,
              {
                display: showUnitList ? 'flex' : 'none',
              },
            ]}
            renderItem={item => (
              <TouchableWithoutFeedback
                onPress={() => {
                  setShowUnitList(false);
                  setFilterType(item.item.name);
                }}>
                <View style={{padding: 8}}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '400',
                      color:
                        item.item.name === filterType ? '#2E5BFF' : '#01020D',
                    }}>
                    {item.item.name}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            )}
          />

          <View style={styles.btnsStyle}>
            <Pressable
              onPress={() => {
                navigate('DepositPage', {
                  bankAccountId,
                  isDeposit: true,
                  totalTransactionAmount,
                  currenciesList,
                });
              }}
              style={[styles.btn]}>
              <Text style={[styles.btnText]}>{locales('titles.deposit')}</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                navigate('DepositPage', {
                  bankAccountId,
                  isDeposit: false,
                  totalTransactionAmount,
                  currenciesList,
                });
              }}
              style={[styles.btn, {borderColor: '#E52929'}]}>
              <Text style={[styles.btnText, {color: '#E52929'}]}>
                {locales('titles.withdrawal')}
              </Text>
            </Pressable>
          </View>
        </View>

        <SafeAreaView style={[styles.transactionsList]}>
          <Text style={[styles.acText, {marginBottom: 16}]}>
            {locales('titles.transactionsList')}
          </Text>

          {/* <View style={styles.searchPart}>
            <View style={styles.searchInput}>
              <TextInput
                style={{
                  color: '#01020D',
                  width: '90%',
                }}
                value={searchQuery}
                onChange={setSearchQuery}
                placeholderTextColor="#9B9B9B"
                placeholder={`${locales('titles.searchTheName')}`}
              />
              <SearchIcon />
            </View>
            <FilterIcon
              onPress={() => {
                refRBSheet.current.open();
              }}
            />
          </View> */}
          <FlatList
            ListEmptyComponent={renderListEmptyComponent}
            data={account}
            renderItem={renderItem}
          />
        </SafeAreaView>
        <RBSheet
          height={370}
          animationType="none"
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={true}
          draggableIcon
          customStyles={{
            container: {
              borderRadius: 8,
              backgroundColor: '#fff',
              elevation: 2,
            },
            wrapper: {
              backgroundColor: 'rgba(1, 2, 13, 0.2)',
            },
            draggableIcon: {
              display: 'none',
              backgroundColor: 'red',
            },
          }}>
          <BankFilter refRBSheet={refRBSheet} />
        </RBSheet>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    height: '100%',
    padding: 16,
  },
  filterBtn: {
    backgroundColor: '#F8F9F9',
    borderRadius: 8,
    padding: 8,
    flexDirection: 'row',
    gap: 8,
    alignSelf: 'center',
  },
  header: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    elevation: 2,
    padding: 16,
  },
  acText: {
    color: '#0B1596',
    fontWeight: '400',
    fontSize: 13,
  },
  withdrawal: {},
  withdrawalIconView: {
    backgroundColor: 'rgba(230, 41, 41, 0.1) ',
    padding: 6,
    borderRadius: 8,
  },
  withdrawalText: {
    color: '#E52929',
    fontSize: 14,
    fontWeight: '500',
  },
  amountText: {
    color: '#01020D',
    fontWeight: '600',
    fontSize: 18,
    marginTop: 8,
    marginBottom: 24,
  },
  withdrawal: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  btn: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#00CF82',
    borderStyle: 'solid',
    alignItems: 'center',
    flex: 1,
  },
  btnText: {
    color: '#00CF82',
    fontWeight: '600',
    fontSize: 14,
  },
  btnsStyle: {
    flexDirection: 'row',
    gap: 16,
  },
  filterText: {
    color: '#9B9B9B',
    fontWeight: '400',
    fontSize: 14,
  },
  dateRecord: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateText: {
    color: '#01020D',
    fontSize: 16,
    fontWeight: '600',
  },
  recordsText: {
    color: '#9B9B9B',
    fontSize: 13,
    fontWeight: '400',
  },
  iconView: {
    backgroundColor: 'rgba(230, 41, 41, 0.1) ',
    padding: 6,
    borderRadius: 8,
  },
  amountText2: {
    color: '#01020D',
    fontSize: 14,
    fontWeight: '500',
  },
  clockText: {
    color: '#9B9B9B',
    fontSize: 14,
    fontWeight: '400',
  },
  horizentalLine: {
    width: '100%',
    height: 1,
    backgroundColor: '#D9D9D9',
    marginVertical: 16,
  },
  amountView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  PRview: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  searchInput: {
    flex: 1,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginRight: 16,
  },
  searchPart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 16,
  },
  transactionsList: {
    backgroundColor: '#FFF',
    padding: 16,
    marginTop: 16,
    elevation: 2,
    borderRadius: 8,
    marginBottom: '60%',
  },
  depositeTypeStyle: {
    zIndex: 1,
    top: '28.5%',
    position: 'absolute',
    alignSelf: 'flex-end',
    backgroundColor: '#fff',
    width: '25%',
    elevation: 1,
    padding: 4,
    borderRadius: 8,
    right: 16,
  },
});

export default BankAccountPage;
