import React, {useRef, useState} from 'react';
import {
  Text,
  TouchableWithoutFeedback,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  TextInput,
} from 'react-native';
import BankIcon from '../../assets/svgs/BankIcon';
import {View, Pressable} from 'react-native';
import ArrowRightIcon from '../../assets/svgs/ArrowRightIcon';
import {useNavigation} from '@react-navigation/native';
import ArrowRightBtn from '../../assets/svgs/ArrowRightBtn';
import BankArrowRight from '../../assets/svgs/BankArrowRight';
import {SheetManager} from 'react-native-actions-sheet';
import FilterIcon from '../../assets/svgs/FilterIcon';
import SearchIcon from '../../assets/svgs/SearchIcon';
import RBSheet from 'react-native-raw-bottom-sheet';
import BankListFilter from '../../components/SheetManager/BankListFilter';
import database from '../../DB/index.native';
import {Q} from '@nozbe/watermelondb';
import CloseIcon from '../../assets/svgs/CloseIcon';
import AsyncStorage from '@react-native-async-storage/async-storage';

const filters = [
    {id: 1, title: 'All', filter: undefined},
    {id: 2, title: 'Deposit', filter: 'gt'},
    {id: 3, title: 'Withdrawal', filter: 'lt'},
    {id: 4, title: 'SettleMent', filter: 'eq'},
  ],
  sorts = [
    {id: 1, title: 'Newest', sort: 'updated_at', order: 'desc'},
    {id: 2, title: 'Alphabetic ABC', sort: 'name', order: 'asc'},
    {
      id: 3,
      title: 'Lower Price',
      sort: 'total_transactions_amount',
      order: 'asc',
    },
    {
      id: 4,
      title: 'higher Price',
      sort: 'total_transactions_amount',
      order: 'desc',
    },
  ];

function BankAccounntList({
  bankAccountList,
  currenciesList,
  setBankAccountList,
}) {
  const {navigate} = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSort, setSelectedSort] = useState({});
  const [selectedFilter, setSelectedFilter] = useState({});

  const filterSheetRef = useRef();
  const inputRef = useRef();

  console.log(
    Object.keys(selectedSort).length === 0,
    Object.keys(selectedFilter).length === 0,
  );

  renderItem = ({item, index}) => (
    <Pressable
      onPress={() => {
        setSelectedFilter({});
        setSelectedSort({});
        navigate('BankAccountPage', {
          bankAccountId: item.id,
          bankName: item.name,
          currenciesList,
        });
      }}>
      <View style={styles.card}>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
          <BankIcon color={'#0B1596'} />
          <View style={styles.verticalLine}></View>
          <View>
            <Text style={styles.nameText}>{item.name}</Text>
            <Text
              style={{
                color: '#0B1596',
                fontWeight: '500',
                fontSize: 16,
                marginRight: 8,
              }}>
              {Math.abs(item.total_transactions_amount).toLocaleString() ?? 0}{' '}
              {currenciesList.find(currency => currency.id === item.currency_id)
                ?.title === 'EUR'
                ? '£'
                : '$'}
            </Text>
          </View>
        </View>

        <View style={{alignSelf: 'center'}}>
          <BankArrowRight />
        </View>
      </View>
    </Pressable>
  );

  ListEmptyComponent = () => (
    <>
      <View style={{marginTop: '50%'}}>
        <View style={{alignItems: 'center', display: 'flex'}}>
          <Image source={require('../../assets/img/Bank.png')} />
          <Text style={styles.notFound}>
            {locales('titles.thereIsNoBankAccount')}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigate('NewBankAccount');
          }}
          style={{
            backgroundColor: '#0B1596',
            paddingVertical: 16,
            paddingHorizontal: 16,
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
            borderRadius: 8,
            flexDirection: 'row',
            margin: 24,
          }}>
          <Text
            style={{
              color: '#fff',
              fontSize: 16,
              fontWeight: '600',
            }}>
            {locales('titles.newBankAccount')}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );

  const onSearchTextChanged = async text => {
    clearTimeout(searchTimeout);

    setSearchQuery(text);

    const args = [];

    if (
      Object.keys(selectedFilter).length &&
      selectedFilter.filter !== undefined
    ) {
      args.push(
        Q.where('total_transactions_amount', Q[selectedFilter.filter](0)),
      );
    }

    if (Object.keys(selectedSort).length) {
      args.push(Q.sortBy(selectedSort.sort, Q[selectedSort.order]));
    }
    args.push(Q.where('name', Q.like(`%${text}%`)));
    const userId = await AsyncStorage.getItem('userId');
    args.push(Q.where('user_id', userId));

    const searchTimeout = setTimeout(_ => {
      database.collections
        .get('bank_accounts')
        .query(...args)
        .then(bankAccounts => {
          setBankAccountList(bankAccounts.map(item => item._raw));
        });
    }, 700);
  };

  const onTypeFilterChanged = filter => {
    setSelectedFilter(filter);
    AsyncStorage.getItem('userId').then(userId => {
      const args = [];

      if (Object.keys(selectedSort).length) {
        args[0] = Q.where('user_id', userId);
        args[1] =
          filter.filter === undefined
            ? undefined
            : Q.where('total_transactions_amount', Q[filter.filter](0));
        args[2] = Q.sortBy(selectedSort.sort, Q[selectedSort.order]);
      } else {
        args[0] = Q.where('user_id', userId);
        args[1] =
          filter.filter === undefined
            ? undefined
            : Q.where('total_transactions_amount', Q[filter.filter](0));
      }
      if (args[1] === undefined) args.splice(1, 1);

      if (searchQuery) args.push(Q.where('name', Q.like(`%${searchQuery}%`)));

      database.collections
        .get('bank_accounts')
        .query(...args)
        .fetch()
        .then(bankAccounts => {
          setBankAccountList(bankAccounts.map(item => item._raw));
        });
    });
  };

  const onSortFilterChanged = sort => {
    setSelectedSort(sort);
    AsyncStorage.getItem('userId').then(userId => {
      const args = [];

      if (Object.keys(selectedFilter).length) {
        args[0] = Q.where('user_id', userId);
        args[1] =
          selectedFilter.filter === undefined
            ? undefined
            : Q.where('total_transactions_amount', Q[selectedFilter.filter](0));
        args[2] = Q.sortBy(sort.sort, Q[sort.order]);
      } else {
        args[0] = Q.where('user_id', userId);
        args[1] = Q.sortBy(sort.sort, Q[sort.order]);
      }

      if (args[1] === undefined) args.splice(1, 1);

      if (searchQuery) args.push(Q.where('name', Q.like(`%${searchQuery}%`)));

      database.collections
        .get('bank_accounts')
        .query(...args)
        .fetch()
        .then(bank_accounts => {
          setBankAccountList(bank_accounts.map(item => item._raw));
        });
    });
  };

  const onFilterSheetClosed = _ => {
    filterSheetRef?.current?.close();
  };

  const renderFilterSheet = _ => {
    return (
      <RBSheet
        animationType="none"
        openDuration={250}
        closeDuration={250}
        closeOnDragDown
        closeOnPressMask
        closeOnPressBack
        ref={filterSheetRef}
        height={300}
        customStyles={{
          container: {},
          wrapper: {
            backgroundColor: 'rgba(1, 2, 13, 0.2)',
          },
          draggableIcon: {
            backgroundColor: '#000',
            display: 'none',
          },
        }}>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            borderColor: '#D9D9D9',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 16,
          }}>
          <Text
            style={{
              color: '#01020D',
              fontSize: 18,
              fontWeight: '700',
            }}>
            Filter
          </Text>
          <CloseIcon fill={'#9B9B9B'} onPress={onFilterSheetClosed} />
        </View>

        <View
          style={{
            height: 1,
            width: '100%',
            backgroundColor: '#D9D9D9',
            marginBottom: 16,
          }}></View>
        <View
          style={{
            flexDirection: 'row',
            marginLeft: 24,
          }}>
          {filters.map(filter => (
            <Text
              key={filter.id}
              style={{
                padding: 10,
                borderRadius: 20,
                textAlign: 'center',
                textAlignVertical: 'center',
                color: selectedFilter.id === filter.id ? 'white' : '#0B1596',
                backgroundColor:
                  selectedFilter.id === filter.id ? '#0B1596' : '#0B159617',
                marginRight: 8,
              }}
              onPress={_ => onTypeFilterChanged(filter)}>
              {filter.title}
            </Text>
          ))}
        </View>

        <View
          style={{
            marginTop: 16,
            marginLeft: 24,
          }}>
          {sorts.map(sort => (
            <Pressable
              onPress={_ => onSortFilterChanged(sort)}
              style={{
                alignItems: 'center',
                justifyContent: 'flex-start',
                flexDirection: 'row',
              }}
              key={sort.id}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 20,
                  height: 20,
                  borderRadius: 100,
                  borderWidth: 1,
                  borderColor:
                    selectedSort.id === sort.id ? '#0B1596' : '#D9D9D9',
                }}>
                <View
                  style={{
                    alignSelf: 'center',
                    width: 12,
                    height: 12,
                    borderRadius: 100,
                    backgroundColor:
                      selectedSort.id === sort.id ? '#0B1596' : '#FFFFFF',
                  }}></View>
              </View>
              <Text
                style={{
                  marginHorizontal: 8,
                  color: '#01020D',
                  fontWeight: '600',
                  fontSize: 14,
                  marginVertical: 10,
                }}>
                {sort.title}
              </Text>
            </Pressable>
          ))}
        </View>
      </RBSheet>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <View
          style={[styles.box, {elevation: bankAccountList.length > 0 ? 2 : 0}]}>
          <View
            style={[
              styles.searchPart,
              {
                display:
                  bankAccountList.length === 0 &&
                  Object.keys(selectedSort).length === 0 &&
                  Object.keys(selectedFilter).length === 0
                    ? 'none'
                    : 'flex',
              },
            ]}>
            <Pressable
              onPress={() => {
                inputRef.current.focus();
              }}
              style={[styles.searchInput]}>
              <TextInput
                ref={inputRef}
                style={{
                  color: '#01020D',
                }}
                onChangeText={onSearchTextChanged}
                value={searchQuery}
                placeholderTextColor="#9B9B9B"
                placeholder={`${locales('titles.searchTheName')}`}
              />
              <SearchIcon />
            </Pressable>
            <FilterIcon
              onPress={() => {
                filterSheetRef.current.open();
              }}
            />
            {/* <RBSheet
              height={470}
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
              <BankListFilter refRBSheet={refRBSheet} />
            </RBSheet> */}
          </View>
          {renderFilterSheet()}

          <FlatList
            ListEmptyComponent={ListEmptyComponent}
            data={bankAccountList}
            renderItem={renderItem}
          />
        </View>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#FFF',
    padding: 16,
  },
  verticalLine: {
    width: 1,
    backgroundColor: '#D9D9D9',
    height: '100%',
  },
  card: {
    flexDirection: 'row',
    marginVertical: 16,
    justifyContent: 'space-between',
  },
  notFound: {
    textAlign: 'center',
    color: '#01020D',
    fontWeight: '500',
    fontSize: 14,
    marginTop: 50,
  },
  box: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    elevation: 2,
    marginTop: 16,
    marginBottom: 30,
  },
  bankaccountsStyle: {
    marginVertical: 16,
  },
  nameText: {
    color: '#17191C',
    fontSize: 16,
    fontWeight: '600',
  },
  amountText: {
    fontWeight: '500',
    fontSize: 16,
    color: '#0B1596',
    marginTop: 8,
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
  },
});
export default BankAccounntList;
