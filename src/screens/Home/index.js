import React, {useState, useRef, useEffect, useContext} from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  LogBox,
} from 'react-native';
import {Text, View, TextInput} from 'react-native';
import database from '../../DB/index.native';
import {deviceHeight} from '../../utils';
import {Q} from '@nozbe/watermelondb';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FilterIcon from '../../assets/svgs/FilterIcon';
import ArrowRight from '../../assets/svgs/ArrowRight';
import PersonIcon from '../../assets/svgs/PersonIcon';
import SearchIcon from '../../assets/svgs/SearchIcon';
import {contextsStore} from '../../contexts';
import RBSheet from 'react-native-raw-bottom-sheet';
import BookCashEmptyIcon from '../../assets/svgs/BookCashEmptyIcon';
import CloseIcon from '../../assets/svgs/CloseIcon';
import NotifIcon from '../../assets/svgs/NotifIcon';
import NotifPageIcon from '../../assets/svgs/NotifPageIcon';

let searchTimeout;

const filters = [
    {id: 1, title: 'All', filter: undefined},
    {id: 2, title: 'Demand', filter: 'gt'},
    {id: 3, title: 'Debt', filter: 'lt'},
    {id: 4, title: 'SettleMent', filter: 'eq'},
  ],
  sorts = [
    {id: 1, title: 'Newest', sort: 'updated_at', order: 'desc'},
    {id: 2, title: 'Alphabetic ABC', sort: 'title', order: 'asc'},
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

const Home = ({navigation}) => {
  const {setTabBarBottom} = useContext(contextsStore);
  const filterSheetRef = useRef(null);
  const [bookCashList, setBookCashList] = useState([]);
  const [currenciesList, setCurrenciesList] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedSort, setSelectedSort] = useState({});
  const [selectedFilter, setSelectedFilter] = useState({});
  const [shouldShowFilterSheet, setShouldShowFilterSheet] = useState(false);

  const searchInputRef = useRef();
  useEffect(() => {
    navigation.addListener('focus', () => {
      setTabBarBottom(true);
    });
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          onPress={() => {
            navigation.navigate('Notifications');
          }}
          style={{padding: 16}}>
          <NotifPageIcon />
        </Pressable>
      ),
    });
  }, []);

  useEffect(_ => {
    const listener = navigation.addListener('focus', _ => {
      fetchBookCashDetails();
      database.collections
        .get('currencies')
        .query()
        .fetch()
        .then(currencies => setCurrenciesList(currencies));
    });
    return listener;
  });

  const fetchBookCashDetails = async _ => {
    const userId = await AsyncStorage.getItem('userId');

    const userBookCashes = await database.collections
      .get('book_cashes')
      .query(Q.where('user_id', userId))
      .fetch();
    for (const bookCash of userBookCashes) {
      const customers = await database.collections
        .get('book_cash_customers')
        .query(Q.where('book_cash_id', bookCash._raw.id))
        .fetch();

      database.write(async _ => {
        await bookCash.update(row => {
          row._raw.total_transactions_amount = customers.reduce(
            (acc, itm) => acc + itm._raw.customer_total_transactions_amount,
            0,
          );
          database.collections
            .get('book_cash_customers')
            .query(Q.where('book_cash_id', bookCash._raw.id))
            .fetchCount()
            .then(count => (row._raw.customers_count = count));
        });
      });
    }
    setBookCashList(userBookCashes.map(item => item._raw));
  };

  const onBookCashItemClicked = item => {
    setSelectedFilter({});
    setSelectedSort({});
    return navigation.navigate('BookCashDetails', {bookCashId: item.id});
  };

  const onNewBookCashButtonPressed = _ => {
    return navigation.navigate('NewBookCash');
  };

  const keyExctractor = item => item.id.toString();

  const renderListEmptyComponent = _ => {
    return (
      <View
        style={{
          height: deviceHeight * 0.75,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <BookCashEmptyIcon />
        <Text
          style={{
            textAlign: 'center',
            color: '#01020D',
            width: '90%',
          }}>
          Did you know having a book cash is an initial point to manage your
          daily transactions?
        </Text>
        <Pressable
          android_ripple={{
            color: '#ededed',
          }}
          onPress={onNewBookCashButtonPressed}
          style={{
            backgroundColor: '#0B1596',
            padding: 16,
            borderRadius: 8,
            alignItems: 'center',
            alignSelf: 'center',
            justifyContent: 'center',
            width: 154,
            height: 51,
            marginTop: 24,
          }}>
          <Text
            style={{
              textAlign: 'center',
              textAlignVertical: 'center',
              color: 'white',
            }}>
            New Book Cash
          </Text>
        </Pressable>
      </View>
    );
  };

  const renderTotalAmountText = amount => {
    switch (true) {
      case amount > 0:
        return (
          <Text
            style={{
              color: '#00CF82',
              fontWeight: '400',
              fontSize: 13,
              backgroundColor: 'rgba(0, 207, 130, 0.09)',
              borderRadius: 8,
              padding: 6,
            }}>
            Demand
          </Text>
        );
      case amount < 0:
        return (
          <Text
            style={{
              color: '#E62929',
              fontWeight: '400',
              fontSize: 13,
              backgroundColor: 'rgba(229, 41, 41, 0.09)',
              borderRadius: 8,
              padding: 6,
            }}>
            Debt
          </Text>
        );
      default:
        return (
          <Text
            style={{
              color: '#9b9b9b',
              fontWeight: '400',
              fontSize: 13,
              backgroundColor: 'rgba(155, 155, 155, 0.09)',
              borderRadius: 8,
              padding: 6,
            }}>
            Settelment
          </Text>
        );
    }
  };

  const renderItem = ({item}) => {
    return (
      <>
        <Pressable
          android_ripple={{
            color: '#ededed',
          }}
          onPress={_ => onBookCashItemClicked(item)}
          style={{
            paddingVertical: 15,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 16,
          }}>
          <View>
            <Text
              style={{
                color: '#17191C',
                fontWeight: '600',
                fontSize: 16,
              }}>
              {item.title}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
                <PersonIcon />
                <Text
                  style={{
                    color: '#0B1596',
                    fontWeight: '400',
                    fontSize: 16,
                  }}>
                  {item.customers_count ?? 0}
                </Text>
              </View>

              <Text style={{marginHorizontal: 8}}>|</Text>
              <Text
                style={{
                  color: '#0B1596',
                  fontWeight: '500',
                  fontSize: 16,
                  marginRight: 8,
                }}>
                {currenciesList.find(
                  currency => currency.id === item.currency_id,
                )?.title === 'EUR'
                  ? '£'
                  : '$'}
                {Math.abs(item.total_transactions_amount).toLocaleString() ?? 0}
              </Text>
              {renderTotalAmountText(item.total_transactions_amount)}
            </View>
          </View>
          <ArrowRight />
        </Pressable>
      </>
    );
  };

  const onSearchTextChanged = async text => {
    clearTimeout(searchTimeout);

    setSearchText(text);

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
    args.push(Q.where('title', Q.like(`%${text}%`)));
    const userId = await AsyncStorage.getItem('userId');
    args.push(Q.where('user_id', userId));

    searchTimeout = setTimeout(_ => {
      database.collections
        .get('book_cashes')
        .query(...args)
        .then(bookCashes => {
          setBookCashList(bookCashes.map(item => item._raw));
        });
    }, 700);
  };

  const onFilterIconPressed = _ => {
    setShouldShowFilterSheet(true);
    filterSheetRef?.current?.open();
  };

  const renderListHeaderComponent = _ => {
    return (
      <>
        <View
          style={[
            styles.searchPart,
            {
              display:
                bookCashList.length === 0 &&
                Object.keys(selectedSort).length === 0 &&
                Object.keys(selectedFilter).length === 0
                  ? 'none'
                  : 'flex',
            },
          ]}>
          <Pressable
            onPress={() => {
              searchInputRef.current.focus();
            }}
            style={styles.searchInput}>
            <TextInput
              ref={searchInputRef}
              style={{
                color: '#01020D',
                width: '90%',
              }}
              placeholderTextColor="#9B9B9B"
              onChangeText={onSearchTextChanged}
              value={searchText}
              placeholder={`${locales('titles.searchTheName')}`}
            />
            <SearchIcon />
          </Pressable>
          <FilterIcon onPress={onFilterIconPressed} />
        </View>
      </>
    );
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

      if (searchText) args.push(Q.where('title', Q.like(`%${searchText}%`)));

      database.collections
        .get('book_cashes')
        .query(...args)
        .fetch()
        .then(bookCashes => {
          setBookCashList(bookCashes.map(item => item._raw));
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

      if (searchText) args.push(Q.where('title', Q.like(`%${searchText}%`)));

      database.collections
        .get('book_cashes')
        .query(...args)
        .fetch()
        .then(bookCashes => {
          setBookCashList(bookCashes.map(item => item._raw));
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
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
        height: '100%',
      }}>
      <View
        style={{
          elevation: bookCashList.length ? 1 : 0,
          backgroundColor: '#fff',
          borderRadius: 8,
          flex: 1,
        }}>
        {renderListHeaderComponent()}
        <ScrollView showsVerticalScrollIndicator={false}>
          <FlatList
            keyboardDismissMode="none"
            keyboardShouldPersistTaps="handled"
            data={bookCashList}
            ListEmptyComponent={renderListEmptyComponent}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
            keyExtractor={keyExctractor}
          />
          {bookCashList.length ? (
            <Pressable
              android_ripple={{
                color: '#ededed',
              }}
              onPress={onNewBookCashButtonPressed}
              style={{
                backgroundColor: '#0B1596',
                padding: 16,
                borderRadius: 8,
                marginVertical: 16,
                alignItems: 'center',
                alignSelf: 'center',
                justifyContent: 'center',
                width: '95%',
              }}>
              <Text
                style={{
                  fontWeight: '600',
                  fontSize: 16,
                  textAlign: 'center',
                  textAlignVertical: 'center',
                  color: '#fff',
                }}>
                {locales('titles.newBookCash')}
              </Text>
            </Pressable>
          ) : null}
        </ScrollView>
      </View>
      {shouldShowFilterSheet ? renderFilterSheet() : null}
    </View>
  );
};

const styles = StyleSheet.create({
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
    marginHorizontal: 16,
  },
});
export default Home;
