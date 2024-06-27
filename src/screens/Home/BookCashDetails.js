import {Q} from '@nozbe/watermelondb';
import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  Pressable,
  TextInput,
  SafeAreaView,
  Modal,
  TouchableWithoutFeedback,
  StyleSheet,
  PermissionsAndroid,
  KeyboardAvoidingView,
} from 'react-native';
import database from '../../DB/index.native';
import moment, {unix} from 'moment';
import {FlatList} from 'react-native-gesture-handler';
import EditIcon from '../../assets/svgs/EditIcon';
import AddCustomer from '../../assets/svgs/AddBookCashIcon';
import SeperateIcon from '../../assets/svgs/SeperateIcon';
import ListEmptyIcon from '../../assets/svgs/ListEmptyIcon';
import FilterIcon from '../../assets/svgs/FilterIcon';
import FlotableInput from '../../components/FlotableInput';
import ContactIcon from '../../assets/svgs/ContactIcon';
import BackIcon from '../../assets/svgs/BackIcon';
import AllIcon from '../../assets/svgs/AllIcon';
import SeperabableIcon from '../../assets/svgs/SeperabableIcon';
import SearchIcon from '../../assets/svgs/SearchIcon';
import ArrowDownIcon from '../../assets/svgs/ArrowDownIcon';
import EditNameIcon from '../../assets/svgs/EditNameIcon';
import NotifIcon from '../../assets/svgs/NotifIcon';
import NotifPageIcon from '../../assets/svgs/NotifPageIcon';
import RBSheet from 'react-native-raw-bottom-sheet';
import CloseIcon from '../../assets/svgs/CloseIcon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Contacts from 'react-native-contacts';

let searchTimeout;
const filter = [
    {id: 1, name: 'Day'},
    {id: 2, name: 'Month'},
    {id: 3, name: 'Total'},
  ],
  transactionFilters = [
    {id: 1, title: 'All', filter: undefined},
    {id: 2, title: 'Demand', filter: 'gt'},
    {id: 3, title: 'Debt', filter: 'lt'},
    {id: 4, title: 'SettleMent', filter: 'eq'},
  ],
  sorts = [
    {id: 1, title: 'Newest', sort: 'updated_at', order: 'desc'},
    {id: 2, title: 'Alphabetic ABC', sort: 'name', order: 'asc'},
    {
      id: 3,
      title: 'Lower Price',
      sort: 'customer_total_transactions_amount',
      order: 'asc',
    },
    {
      id: 4,
      title: 'higher Price',
      sort: 'customer_total_transactions_amount',
      order: 'desc',
    },
  ];

const BookCashDetails = props => {
  const filterSheetRef = useRef(null);
  const {navigation = {}, route = {}} = props;

  const {params = {}} = route;

  const {bookCashId} = params;
  const [btnOpacity, setBtnOpacity] = useState(true);
  const [bookCashDetails, setBookCashDetails] = useState({});
  const [customers, setCustomers] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [currenciesList, setCurrenciesList] = useState([]);
  const [phone, setPhone] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [selectedSort, setSelectedSort] = useState({});
  const [selectedFilter, setSelectedFilter] = useState({});
  const [showSeperatable, setShowSeperatable] = useState(false);
  const [totalDebt, setTotalDebt] = useState(0);
  const [totalDemand, setTotalDemand] = useState(0);
  const [createCustomerError, setCreateCustomerError] = useState(false);
  const [addCustomerModalVisibility, setAddCustomerModalVisibility] =
    useState(false);
  const [phoneContactModal, setPhoneContactModal] = useState(false);
  const [filterType, setFilterType] = useState('' || 'Day');
  const [showFilterType, setShowFilterType] = useState(false);
  const [contacts, setContacts] = useState([]);
  const searchInputRef = useRef();
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <NotifPageIcon
          onPress={() => {
            navigation.navigate('Notifications');
          }}
          style={{marginRight: 16}}
        />
      ),
    });
    database.collections
      .get('currencies')
      .query()
      .fetch()
      .then(currencies => setCurrenciesList(currencies));
    const listener = navigation.addListener('focus', _ =>
      fetchBookCashDetails(),
    );
    return listener;
  }, []);

  const fetchBookCashDetails = async _ => {
    const customersList = (
      await database.collections
        .get('book_cash_customers')
        .query(Q.where('book_cash_id', bookCashId))
    ).map(item => item._raw);

    const bookCash = await database.collections
      .get('book_cashes')
      .find(bookCashId);
    database.write(async _ => {
      bookCash.update(book => {
        book._raw.total_transactions_amount = customersList.reduce(
          (acc, itm) => acc + itm.customer_total_transactions_amount,
          0,
        );
      });
    });
    setBookCashDetails({...bookCash._raw, customersList});
    setCustomers(customersList);
  };

  const keyExtractor = item => item.id.toString();

  const renderListEmptyComponent = _ => {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 8,
        }}>
        <ListEmptyIcon />
        <Text style={{color: '#9B9B9B', fontSize: 14, fontWeight: '400'}}>
          No Records Yet
        </Text>
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
            }}>
            Settelment
          </Text>
        );
    }
  };

  const renderHeaderTotalAmountText = amount => {
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
              backgroundColor: 'rgba(230, 41, 41, 0.09)',
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

  const renderItem = ({item, index}) => {
    return (
      <>
        <Pressable
          onPress={_ =>
            navigation.navigate('CustomerTransactions', {
              bookCashCustomerId: item.id,
              currencyId: bookCashDetails.currency_id,
              customerName: item.name,
              bookCashId,
            })
          }>
          <Text style={{color: '#9B9B9B', fontSize: 14, fontWeight: '400'}}>
            {item.name}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{color: '#0B1596', fontSize: 16, fontWeight: '500'}}
              onPress={_ =>
                navigation.navigate('CustomerTransactions', {
                  bookCashCustomerId: item.id,
                  currencyId: bookCashDetails.currency_id,
                })
              }>
              {currenciesList.find(
                currency => currency.id === bookCashDetails.currency_id,
              )?.title === 'EUR'
                ? '£'
                : '$'}
              {Math.abs(
                item.customer_total_transactions_amount,
              ).toLocaleString() ?? 0}
            </Text>
            <Text
              onPress={_ =>
                navigation.navigate('CustomerTransactions', {
                  bookCashCustomerId: item.id,
                  currencyId: bookCashDetails.currency_id,
                })
              }>
              {renderTotalAmountText(item.customer_total_transactions_amount)}
            </Text>
          </View>
        </Pressable>
        <View
          style={{
            display: index < customers.length - 1 ? 'flex' : 'none',
            marginVertical: 16,
            backgroundColor: '#D9D9D9',
            height: 1,
            width: '100%',
          }}></View>
      </>
    );
  };

  const onSearchTextChanged = text => {
    clearTimeout(searchTimeout);

    setSearchText(text);

    const args = [];

    if (
      Object.keys(selectedFilter).length &&
      selectedFilter.filter !== undefined
    ) {
      args.push(
        Q.where(
          'customer_total_transactions_amount',
          Q[selectedFilter.filter](0),
        ),
      );
    }

    if (Object.keys(selectedSort).length) {
      args.push(Q.sortBy(selectedSort.sort, Q[selectedSort.order]));
    }
    args.push(Q.where('book_cash_id', bookCashId));
    args.push(Q.where('name', Q.like(`%${text}%`)));

    searchTimeout = setTimeout(_ => {
      database.collections
        .get('book_cash_customers')
        .query(...args)
        .then(bookCashes => {
          setCustomers(bookCashes.map(item => item._raw));
        });
    }, 1000);
  };

  const renderListHeaderComponent = _ => {
    return (
      <View style={styles.searchPart}>
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
            placeholder={
              'Search the name' || `${locales('titles.searchTheName')}`
            }
          />
          <SearchIcon />
        </Pressable>
        <FilterIcon onPress={_ => filterSheetRef?.current?.open()} />
      </View>
    );
  };

  const onCustomerNameChanged = name => {
    setCreateCustomerError('');
    setCustomerName(name);
  };

  const submitNewCustomer = _ => {
    if (!customerName) return setCreateCustomerError('Name is required');
    database.write(async () => {
      await database
        .get('book_cash_customers')
        .create(bookCashcustomer => {
          bookCashcustomer._raw.name = customerName;
          bookCashcustomer._raw.phone = phone;
          bookCashcustomer._raw.customer_total_transactions_amount = 0;
          bookCashcustomer._raw.book_cash_id = bookCashId;
        })
        .then(res => {
          fetchBookCashDetails();
          setAddCustomerModalVisibility(false);
        })
        .catch(err => {});
    });

    setCustomerName('');
    setPhone('');
  };

  const onPhoneChanged = text => {
    setPhone(text);
  };

  const onEditButtonPressed = _ => {
    return navigation.navigate('NewBookCash', {
      bookCashId: bookCashDetails.id,
      title: bookCashDetails.title,
      currency: bookCashDetails.currency_id,
    });
  };

  useEffect(() => {
    if (customerName) {
      setBtnOpacity(false);
    } else {
      setBtnOpacity(true);
    }
  }, [customerName]);

  const onFilterPressed = async item => {
    let customerList = [];
    if (item.id !== 3) {
      const unixDate =
        moment()
          .clone()
          .subtract(1, item.id === 1 ? 'day' : 'month')
          .unix() * 1000;

      customerList = await database.collections
        .get('book_cash_customers')
        .query(
          Q.where('book_cash_id', bookCashId),
          Q.where('updated_at', Q.gte(unixDate)),
        )
        .fetch();
    } else {
      customerList = await database.collections
        .get('book_cash_customers')
        .query(Q.where('book_cash_id', bookCashId))
        .fetch();
    }

    setCustomers(customerList.map(itm => itm._raw));
    setShowFilterType(false);
    setFilterType(item.name);
  };

  const renderFilters = ({item}) => {
    return (
      <TouchableWithoutFeedback onPress={_ => onFilterPressed(item)}>
        <View style={{padding: 8}}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '400',
              color: item.name === filterType ? '#2E5BFF' : '#01020D',
            }}>
            {item.name}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  const onShowSeperatableChanged = async flag => {
    setShowSeperatable(flag);
    if (flag) {
      let debt = 0,
        demand = 0;
      const customerList = await database.collections
        .get('book_cash_customers')
        .query(Q.where('book_cash_id', bookCashId));
      customerList.forEach(item => {
        if (item._raw.customer_total_transactions_amount < 0)
          debt = debt + item._raw.customer_total_transactions_amount;
        else demand = demand + item._raw.customer_total_transactions_amount;
      });
      setTotalDebt(Math.abs(debt));
      setTotalDemand(demand);
    }
  };

  const onFilterSheetClosed = _ => {
    filterSheetRef?.current?.close();
  };

  const onTypeFilterChanged = transactionFilter => {
    setSelectedFilter(transactionFilter);
    const args = [];

    if (Object.keys(selectedSort).length) {
      args[0] = Q.where('book_cash_id', bookCashId);
      args[1] =
        transactionFilter.filter === undefined
          ? undefined
          : Q.where(
              'customer_total_transactions_amount',
              Q[transactionFilter.filter](0),
            );
      args[2] = Q.sortBy(selectedSort.sort, Q[selectedSort.order]);
    } else {
      args[0] = Q.where('book_cash_id', bookCashId);
      args[1] =
        transactionFilter.filter === undefined
          ? undefined
          : Q.where(
              'customer_total_transactions_amount',
              Q[transactionFilter.filter](0),
            );
    }
    if (args[1] === undefined) args.splice(1, 1);

    if (searchText) args.push(Q.where('name', Q.like(`%${searchText}%`)));

    database.collections
      .get('book_cash_customers')
      .query(...args)
      .fetch()
      .then(customerList => {
        setCustomers(customerList.map(item => item._raw));
      });
  };

  const onSortFilterChanged = sort => {
    setSelectedSort(sort);
    const args = [];

    if (Object.keys(selectedFilter).length) {
      args[0] = Q.where('book_cash_id', bookCashId);
      args[1] =
        selectedFilter.filter === undefined
          ? undefined
          : Q.where(
              'customer_total_transactions_amount',
              Q[selectedFilter.filter](0),
            );
      args[2] = Q.sortBy(sort.sort, Q[sort.order]);
    } else {
      args[0] = Q.where('book_cash_id', bookCashId);
      args[1] = Q.sortBy(sort.sort, Q[sort.order]);
    }

    if (args[1] === undefined) args.splice(1, 1);

    if (searchText) args.push(Q.where('name', Q.like(`%${searchText}%`)));

    database.collections
      .get('book_cash_customers')
      .query(...args)
      .fetch()
      .then(customerList => {
        setCustomers(customerList.map(item => item._raw));
      });
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
          {transactionFilters.map(transactionFilter => (
            <Text
              key={transactionFilter.id}
              style={{
                padding: 10,
                borderRadius: 20,
                textAlign: 'center',
                textAlignVertical: 'center',
                color:
                  selectedFilter.id === transactionFilter.id
                    ? 'white'
                    : '#0B1596',
                backgroundColor:
                  selectedFilter.id === transactionFilter.id
                    ? '#0B1596'
                    : '#0B159617',
                marginRight: 8,
              }}
              onPress={_ => onTypeFilterChanged(transactionFilter)}>
              {transactionFilter.title}
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
  const requestReadContacts = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Contacts.getAll().then(contacts => {
          setContacts(contacts);
        });
        setPhoneContactModal(true);
      } else {
      }
    } catch (err) {}
  };

  const handleBackButton = () => {
    setAddCustomerModalVisibility(false);
    setCustomerName('');
    setPhone('');
  };

  const renderContactList = ({item, index}) => (
    <View style={{marginTop: 16, backgroundColor: '#fff', elevation: 3}}>
      <TouchableWithoutFeedback
        key={item?.recordID}
        onPress={() => {
          setCustomerName(item?.givenName);
          setPhone(item?.phoneNumbers[0]?.number);
          setPhoneContactModal(false);
        }}>
        <View style={styles.contactCon}>
          <View style={styles.imgCon}>
            <View style={styles.placeholder}>
              <View style={styles.icon}>
                <Text style={styles.txt}>{item?.givenName[0]}</Text>
              </View>
            </View>
          </View>
          <View style={styles.contactDat}>
            <Text style={styles.name}>
              {item?.givenName} {item?.middleName && item.middleName + ' '}
              {item?.familyName}
            </Text>
            <Text style={styles.phoneNumber}>
              {item?.phoneNumbers[0]?.number}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <View
        style={{
          backgroundColor: '#D9D9D9',
          height: 1,
          width: '100%',
          display: index < contacts.length - 1 ? 'flex' : 'none',
        }}></View>
    </View>
  );

  return (
    <>
      {renderFilterSheet()}
      <Modal
        visible={addCustomerModalVisibility}
        onDismiss={_ => setAddCustomerModalVisibility(false)}
        animationType="fade"
        onRequestClose={_ => setAddCustomerModalVisibility(false)}>
        <View
          style={{
            backgroundColor: '#0B1596',
            padding: 16,
            flexDirection: 'row',
            gap: 16,
          }}>
          <BackIcon onPress={handleBackButton} />
          <Text style={{fontSize: 18, fontWeight: '600', color: '#fff'}}>
            New Customer
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: '#FFFFFF',
            paddingHorizontal: 24,
          }}>
          <FlotableInput
            value={customerName}
            setValue={onCustomerNameChanged}
            inputPlaceholder={'Name'}>
            <TouchableWithoutFeedback>
              <Pressable
                onPress={requestReadContacts}
                style={{
                  backgroundColor: 'rgba(11, 21, 150, 0.09)',
                  padding: 13,
                  alignSelf: 'flex-end',
                }}>
                <ContactIcon />
              </Pressable>
            </TouchableWithoutFeedback>
          </FlotableInput>
          {createCustomerError ? (
            <Text style={{color: 'red'}}>{createCustomerError}</Text>
          ) : null}

          <FlotableInput
            value={phone}
            setValue={onPhoneChanged}
            inputPlaceholder={'Phone (Optional)'}
            keyboardType={'numeric'}
          />
          {/* <TextInput
            placeholder="customer name"
            onChangeText={onCustomerNameChanged}
            value={customerName}
            style={{
              width: '100%',
              borderRadius: 8,
              borderWidth: 1,
            }}
          />

          <TextInput
            placeholder="customer phone"
            onChangeText={onPhoneChanged}
            value={phone}
            style={{
              width: '100%',
              borderRadius: 8,
              borderWidth: 1,
            }}
          /> */}
        </View>

        <Pressable
          onPress={submitNewCustomer}
          style={{
            backgroundColor: btnOpacity ? 'rgba(1, 2, 13, 0.09)' : '#0B1596',
            paddingVertical: 16,
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
            borderRadius: 8,
            flexDirection: 'row',
            margin: 24,
          }}>
          <Text
            style={{
              color: btnOpacity ? '#9B9B9B' : '#fff',
              fontSize: 16,
              fontWeight: '600',
            }}>
            Submit
          </Text>
        </Pressable>
      </Modal>
      <Modal
        visible={phoneContactModal}
        onDismiss={_ => setPhoneContactModal(false)}
        animationType="none"
        onRequestClose={_ => setPhoneContactModal(false)}>
        <View
          style={{
            backgroundColor: '#0B1596',
            padding: 16,
            flexDirection: 'row',
            gap: 16,
          }}>
          <BackIcon
            onPress={() => {
              setPhoneContactModal(false);
            }}
          />
          <Text style={{fontSize: 18, fontWeight: '600', color: '#fff'}}>
            {locales('titles.ChooseAContact')}
          </Text>
        </View>
        <FlatList
          style={styles.list}
          data={contacts}
          renderItem={renderContactList}
        />
      </Modal>

      <KeyboardAvoidingView>
        <View
          style={{
            backgroundColor: '#fff',
            height: '100%',
          }}>
          <View
            style={{
              elevation: 1,
              borderRadius: 8,
              backgroundColor: 'white',
              margin: 16,
              padding: 16,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 24,
              }}>
              <Text style={styles.bookCashName}>{bookCashDetails.title}</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                }}>
                <AddCustomer
                  onPress={_ => setAddCustomerModalVisibility(true)}
                />
                <EditNameIcon onPress={onEditButtonPressed} />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: '#0B1596',
                  fontSize: 13,
                  fontWeight: '400',
                  marginBottom: 8,
                }}>
                Balance
              </Text>
              <View style={{flexDirection: 'row', gap: 8}}>
                <Pressable
                  onPress={_ => onShowSeperatableChanged(false)}
                  style={{
                    backgroundColor: !showSeperatable
                      ? 'rgba(11, 21, 150, 0.09)'
                      : 'rgba(155, 155, 155, 0.09)',
                    borderRadius: 8,
                    padding: 8,
                  }}>
                  <AllIcon
                    fill={showSeperatable ? '#9b9b9b' : '#0B1596'}
                    onPress={_ => onShowSeperatableChanged(false)}
                  />
                </Pressable>
                <Pressable
                  onPress={_ => onShowSeperatableChanged(true)}
                  style={{
                    backgroundColor: showSeperatable
                      ? 'rgba(11, 21, 150, 0.09)'
                      : 'rgba(155, 155, 155, 0.09)',
                    borderRadius: 8,
                    padding: 8,
                  }}>
                  <SeperabableIcon
                    fill={!showSeperatable ? '#9B9B9B' : '#0B1596'}
                    onPress={_ => onShowSeperatableChanged(true)}
                  />
                </Pressable>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 16,
                justifyContent: 'space-between',
              }}>
              {showSeperatable ? (
                <>
                  <View style={{flexDirection: 'row'}}>
                    <Text
                      style={{
                        color: '#00CF82',
                        backgroundColor: 'rgba(0, 207, 130, 0.09)',
                        paddingVertical: 8,
                        paddingHorizontal: 12,
                        borderTopLeftRadius: 8,
                        borderBottomLeftRadius: 8,
                      }}>
                      {totalDemand.toLocaleString()} Demand
                    </Text>
                    <Text
                      style={{
                        color: '#E62929',
                        backgroundColor: 'rgba(230, 41, 41, 0.09)',
                        paddingVertical: 8,
                        paddingHorizontal: 12,
                        borderTopRightRadius: 8,
                        borderBottomRightRadius: 8,
                      }}>
                      {totalDebt.toLocaleString()} Debt
                    </Text>
                  </View>
                </>
              ) : (
                <View style={{flexDirection: 'row', gap: 8}}>
                  <Text
                    style={{fontWeight: '500', fontSize: 18, color: '#01020D'}}>
                    {currenciesList.find(
                      currency => currency.id === bookCashDetails.currency_id,
                    )?.title === 'EUR'
                      ? '£'
                      : '$'}
                    {Math.abs(
                      bookCashDetails.total_transactions_amount,
                    ).toLocaleString() ?? 0}
                  </Text>
                  {renderHeaderTotalAmountText(
                    bookCashDetails.total_transactions_amount,
                  )}
                </View>
              )}
              <Pressable
                onPress={() => {
                  setShowFilterType(!showFilterType);
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
              styles.filterTypeStyle,
              {
                display: showFilterType ? 'flex' : 'none',
              },
            ]}
            renderItem={renderFilters}
          />
          <SafeAreaView
            style={{
              maxHeight: '100%',
              elevation: 1,
              backgroundColor: '#fff',
              borderRadius: 8,
              marginHorizontal: 16,
              padding: 16,
              zIndex: 0,
              marginBottom: '71%',
            }}>
            {renderListHeaderComponent()}
            <FlatList
              showsVerticalScrollIndicator={false}
              style={{
                marginTop: 20,
              }}
              data={customers}
              renderItem={renderItem}
              keyExtractor={keyExtractor}
              ListEmptyComponent={renderListEmptyComponent}
            />
          </SafeAreaView>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  bookCashName: {
    color: '#01020D',
    fontSize: 18,
    fontWeight: '700',
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
  filterTypeStyle: {
    zIndex: 1,
    top: '26%',
    position: 'absolute',
    alignSelf: 'flex-end',
    backgroundColor: '#fff',
    width: '22%',
    elevation: 1,
    padding: 4,
    borderRadius: 8,
    right: 32,
  },
  filterBtn: {
    backgroundColor: '#F8F9F9',
    borderRadius: 8,
    padding: 8,
    flexDirection: 'row',
    gap: 8,
  },
  filterText: {
    color: '#9B9B9B',
    fontWeight: '400',
    fontSize: 14,
  },
  list: {
    backgroundColor: '#fff',
    flex: 1,
    paddingHorizontal: 16,
  },
  contactCon: {
    flexDirection: 'row',
    padding: 8,
    borderBottomColor: '#0B1596',
  },
  imgCon: {
    marginRight: 8,
  },
  icon: {
    width: 35,
    height: 35,
    borderRadius: 30,
    backgroundColor: '#0B1596',

    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholder: {
    width: 50,
    height: 50,
    borderRadius: 30,
    overflow: 'hidden',
    borderColor: '#0B1596',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactDat: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 5,
  },
  txt: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#01020D',
    marginBottom: 4,
  },
  phoneNumber: {
    color: '#9B9B9B',
    fontWeight: '400',
    fontSize: 14,
  },
});

export default BookCashDetails;
