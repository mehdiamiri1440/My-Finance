import React, {useEffect, useState, useContext, useRef} from 'react';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  Pressable,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Linking,
  ToastAndroid,
} from 'react-native';
import database from '../../DB/index.native';
import {Q} from '@nozbe/watermelondb';
import moment from 'moment';
import ArrowDownIcon from '../../assets/svgs/ArrowDownIcon';
import ArrowUpIcon from '../../assets/svgs/ArrowUpIcon';
import PositiveIcon from '../../assets/svgs/PositiveIcon';
import NegetiveIcon from '../../assets/svgs/NegetiveIcon';
import RecivedIcon from '../../assets/svgs/RecivedIcon';
import PayedIcon from '../../assets/svgs/PayedIcon';
import ListEmptyIcon from '../../assets/svgs/ListEmptyIcon';
import SettingIcon from '../../assets/svgs/SettingIcon';
import ProfileIcon from '../../assets/svgs/ProfileIcon';
import MessageIcon from '../../assets/svgs/MessageIcon';
import NotifIcon from '../../assets/svgs/NotifIcon';
import NoteIcon from '../../assets/svgs/NoteIcon';
import ReportIcon from '../../assets/svgs/ReportIcon';
import CallIcon from '../../assets/svgs/CallIcon';
import MobileIcon from '../../assets/svgs/MobileIcon';
import ArrowRightIcon from '../../assets/svgs/ArrowRightIcon';
import {contextsStore} from '../../contexts';
import {SheetManager} from 'react-native-actions-sheet';
import RBSheet from 'react-native-raw-bottom-sheet';
import ViewShot from 'react-native-view-shot';
import CloseIcon from '../../assets/svgs/CloseIcon';
import Share from 'react-native-share';
import {permissions} from '../../utils';
import SaveNoteIcon from '../../assets/svgs/SaveNoteIcon';

const CustomerTransactions = props => {
  const {setTabBarBottom} = useContext(contextsStore);
  const {navigation = {}, route = {}} = props;
  const noticeFilterSheet = useRef(null);
  const ref = useRef();

  const {params = {}} = route;

  const {bookCashCustomerId, currencyId, customerName, bookCashId} = params;

  const [customerDetails, setCustomerDetails] = useState({});

  const [currenciesList, setCurrenciesList] = useState([]);

  const [transactions, setTransactions] = useState([]);

  const [menuModalVisibility, setMenuModalVisibility] = useState(false);

  const [imgUri, setImgUri] = useState('');

  const [date, setDate] = useState(new Date());

  useEffect(_ => {
    navigation.addListener('focus', () => {
      setTabBarBottom(true);
    });
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          onPress={() => {
            setMenuModalVisibility(true);
          }}
          style={{padding: 16}}>
          <SettingIcon />
        </Pressable>
      ),
      headerTitle: customerName,
    });

    const listener = navigation.addListener('focus', _ => {
      fetchCustomerDetails();
      database.collections
        .get('currencies')
        .query()
        .fetch()
        .then(currencies => setCurrenciesList(currencies));
    });
    return listener;
  }, []);

  const renderRows = ({item, index}) => {
    return (
      <Pressable
        style={{marginBottom: 16}}
        onPress={_ =>
          !item.is_note
            ? navigation.navigate('TransactionDetails', {
                isDebt: item.amount < 0,
                bookCashCustomerId,
                currencyId,
                transactionId: item.id,
              })
            : navigation.navigate('notePage', {
                customerName,
                note: item.description,
                noteId: item.id,
                customerId: bookCashCustomerId,
              })
        }>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          {!item.is_note ? (
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                gap: 8,
              }}>
              <View
                style={{
                  backgroundColor:
                    item.amount > 0
                      ? 'rgba(0, 207, 130, 0.1)'
                      : item.amount < 0
                      ? 'rgba(229, 41, 41, 0.1)'
                      : 'transparent',
                  padding: 6,
                  borderRadius: 8,
                }}>
                {item.amount > 0 ? (
                  <RecivedIcon />
                ) : item.amount < 0 ? (
                  <PayedIcon />
                ) : (
                  <Text>0</Text>
                )}
              </View>

              <Text
                style={{
                  fontSize: 14,
                  color: '#9b9b9b',
                  fontWeight: '400',
                }}>
                {item.amount > 0 ? '+' : item.amount < 0 ? '-' : '0'}
              </Text>

              <Text style={{fontSize: 14, fontWeight: '500', color: '#01020D'}}>
                {Math.abs(item.amount).toLocaleString()}{' '}
                {currenciesList.find(currency => currency.id === currencyId)
                  ?.title === 'EUR'
                  ? '£'
                  : '$'}
              </Text>
            </View>
          ) : (
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
              <SaveNoteIcon />
              <Text style={{fontWeight: '500', fontSize: 16, color: '#01020D'}}>
                {item.description}
              </Text>
            </View>
          )}
          <Text>{moment.unix(item.date).format('HH:mm')}</Text>
        </View>
        {/* {item.description ? <Text>{item.description}</Text> : null} */}
      </Pressable>
    );
  };

  const renderItem = ({item, index}) => {
    return (
      <FlatList
        style={{paddingBottom: 16}}
        ListHeaderComponent={_ => {
          return (
            <>
              <View
                style={{
                  display: index == 0 ? 'none' : 'flex',
                  backgroundColor: '#D9D9D9',
                  height: 1,
                  width: '100%',
                  marginBottom: 16,
                }}></View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 16,
                }}>
                <Text
                  style={{color: '#01020D', fontWeight: '600', fontSize: 13}}>
                  {item[0]}
                </Text>
                <Text
                  style={{color: '#9b9b9b', fontSize: 13, fontWeight: '400'}}>
                  {item[1].length} records
                </Text>
              </View>
            </>
          );
        }}
        data={item[1]}
        keyExtractor={ele => ele.id.toString()}
        renderItem={renderRows}
      />
    );
  };

  const keyExtractor = (_, index) => index.toString();

  const fetchCustomerDetails = async _ => {
    if (bookCashCustomerId) {
      const customer = await database.collections
        .get('book_cash_customers')
        .find(bookCashCustomerId);

      const transactionsList = (
        await database.collections
          .get('customer_transactions')
          .query(
            Q.where('book_cash_customer_id', bookCashCustomerId),
            Q.sortBy('date', Q.desc),
          )
      ).map(item => item._raw);
      database.write(async _ => {
        await customer
          .update(item => {
            item._raw.customer_total_transactions_amount =
              transactionsList.reduce((acc, itm) => acc + itm.amount, 0);
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
            setTransactions(groupedData);
            setCustomerDetails({
              ...customer._raw,
              transactions: groupedData,
            });
          });
      });
    }
  };

  const renderListEmptyComponent = _ => {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 8,
        }}>
        <ListEmptyIcon />
        <Text style={{fontWeight: '400', fontSize: 14, color: '#9B9B9B'}}>
          No Records Yet
        </Text>
      </View>
    );
  };

  const renderTotalAmountText = amount => {
    switch (true) {
      case amount > 0:
        return <Text>will be taken</Text>;
      case amount < 0:
        return <Text>will be given</Text>;
      default:
        return <Text>Settelment</Text>;
    }
  };

  const NoticeRbSheet = () => (
    <RBSheet
      animationType="none"
      openDuration={250}
      closeDuration={250}
      closeOnDragDown
      closeOnPressMask
      closeOnPressBack
      ref={noticeFilterSheet}
      height={420}
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
      <View style={{backgroundColor: '#fff'}}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '700',
              color: '#01020D',
              padding: 24,
            }}>
            Notice{' '}
          </Text>
          <CloseIcon
            style={{marginRight: 24}}
            onPress={() => {
              noticeFilterSheet.current.close();
            }}
            fill="#9B9B9B"
          />
        </View>
        <View
          style={{
            height: 1,
            width: '100%',
            backgroundColor: '#D9D9D9',
            marginBottom: 24,
          }}></View>

        <ViewShot
          ref={ref}
          options={{fileName: 'Notice-shot', format: 'png', quality: 1}}>
          <ImageBackground
            resizeMode="stretch"
            style={{padding: 24, borderRadius: 8}}
            source={require('./../../assets/img/Notice.png')}>
            <Text
              style={{
                color: '#0B1596',
                fontSize: 16,
                fontWeight: '600',
                marginLeft: 24,
                marginBottom: 8,
                marginTop: 8,
              }}>
              Payment Reminder
            </Text>

            <View
              style={{flexDirection: 'row', marginLeft: 24, marginBottom: 8}}>
              <Text
                style={{
                  color: '#01020D',
                  fontSize: 20,
                  fontWeight: '700',
                  marginRight: 16,
                }}>
                <Text
                  style={{color: '#01020D', fontWeight: '600', fontSize: 18}}>
                  {Math.abs(
                    customerDetails.customer_total_transactions_amount,
                  ) ?? 0}{' '}
                  {currenciesList.find(currency => currency.id === currencyId)
                    ?.title === 'EUR'
                    ? '£'
                    : '$'}
                </Text>
              </Text>
              <View
                style={{
                  backgroundColor:
                    customerDetails.customer_total_transactions_amount > 0
                      ? 'rgba(0, 207, 130, 0.1)'
                      : customerDetails.customer_total_transactions_amount < 0
                      ? 'rgba(229, 41, 41, 0.1)'
                      : 'transparent',
                  padding: 6,
                  borderRadius: 8,
                }}>
                <Text
                  style={{
                    color:
                      customerDetails.customer_total_transactions_amount > 0
                        ? '#00CF82'
                        : customerDetails.customer_total_transactions_amount < 0
                        ? '#E62929'
                        : '#9b9b9b',
                    fontWeight: '400',
                    fontSize: 13,
                  }}>
                  {customerDetails.customer_total_transactions_amount > 0
                    ? 'Demand'
                    : customerDetails.customer_total_transactions_amount < 0
                    ? 'Debt'
                    : 'Settlement'}
                </Text>
              </View>
            </View>
            <Text
              style={{
                color: '#01020D',
                fontSize: 14,
                fontWeight: '400',
                marginLeft: 24,
              }}>
              {moment.unix(date).format('MMM DD')}
            </Text>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                marginRight: 36,
                marginTop: 26,
              }}>
              <Text
                style={{
                  color: '#01020D',
                  fontSize: 14,
                  fontWeight: '400',
                  marginLeft: 24,
                }}>
                By
              </Text>
              <Text
                style={{
                  color: '#01020D',
                  fontSize: 14,
                  fontWeight: '600',
                  marginLeft: 8,
                }}>
                {customerDetails.name}
              </Text>
            </View>
            <Text
              style={{
                color: '#9B9B9B',
                fontWeight: '400',
                fontSize: 14,
                alignSelf: 'flex-end',
                marginRight: 24,
                marginTop: 8,
                marginBottom: 16,
              }}>
              {customerDetails.phone}
            </Text>
          </ImageBackground>
        </ViewShot>

        <TouchableOpacity
          onPress={handleShare}
          style={{
            margin: 24,
            backgroundColor: '#0B1596',
            paddingVertical: 16,
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
            borderRadius: 8,
            flexDirection: 'row',
          }}>
          <Text
            style={{
              color: '#fff',
              fontSize: 16,
              fontWeight: '600',
            }}>
            Share
          </Text>
        </TouchableOpacity>
      </View>
    </RBSheet>
  );

  const shareOptions = {
    title: 'Share via',
    message: '',
    url: imgUri,
    social: Share.Social.TELEGRAM,
    whatsAppNumber: '', // country code + phone number
    filename: 'Notice', // only for base64 file in Android
  };

  const handleShare = async () => {
    await ref?.current.capture().then(uri => {
      setImgUri(uri);
    });

    const isAllowed =
      await permissions.requestWriteToExternalStoragePermission();

    if (!isAllowed) return;

    Share.open(shareOptions)
      .then(res => {})
      .catch(err => {});
  };

  const handelOpenApp = index => {
    const smsUrl = `sms:${customerDetails.phone}`;
    const callUrl = `tel:${customerDetails.phone}`;

    if (!customerDetails.phone) {
      ToastAndroid.show(
        'You must enter the customer phone',
        ToastAndroid.SHORT,
      );
      return;
    }

    switch (index) {
      case 0:
        return Linking.openURL(callUrl)
          .then(() => console.log('Calling app opened'))
          .catch(err => {
            console.log(err);
          });
      case 1:
        return Linking.openURL(smsUrl)
          .then(() => console.log('massaging app opened'))
          .catch(err => {
            console.log(err);
          });
      default:
        break;
    }
  };

  return (
    <>
      <Modal
        transparent
        visible={menuModalVisibility}
        onDismiss={_ => setMenuModalVisibility(false)}
        animationType="fade"
        onRequestClose={_ => setMenuModalVisibility(false)}>
        <Pressable
          onPress={() => {
            setMenuModalVisibility(false);
          }}>
          <View
            style={{
              paddingRight: 16,
              paddingTop: 55,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(1, 2, 13, 0.2)',
              alignItems: 'flex-end',
            }}>
            <View
              style={{
                backgroundColor: '#fff',
                padding: 16,
                width: '45%',
                paddingBottom: 0,
                borderRadius: 8,
                elevation: 1,
              }}>
              <Pressable
                onPress={() => {
                  navigation.navigate('customerProfile', {
                    bookCashCustomerId,
                  });
                  setMenuModalVisibility(false);
                }}>
                <View
                  style={[
                    styles.faj,
                    {justifyContent: 'flex-start', alignItems: 'center'},
                  ]}>
                  <ProfileIcon />
                  <Text style={styles.menuText}>
                    {locales('titles.profile')}
                  </Text>
                </View>
              </Pressable>
              <View
                style={{
                  backgroundColor: '#d9d9d9',
                  height: 1,
                  marginBottom: 16,
                }}></View>

              <Pressable onPress={() => handelOpenApp(0)}>
                <View
                  style={[
                    styles.faj,
                    {justifyContent: 'flex-start', alignItems: 'center'},
                  ]}>
                  <CallIcon />
                  <Text style={styles.menuText}>{locales('titles.call')}</Text>
                </View>
              </Pressable>

              <Pressable onPress={() => handelOpenApp(1)}>
                <View
                  style={[
                    styles.faj,
                    {justifyContent: 'flex-start', alignItems: 'center'},
                  ]}>
                  <MessageIcon />
                  <Text style={styles.menuText}>
                    {locales('titles.message')}
                  </Text>
                </View>
              </Pressable>

              <Pressable
                onPress={() => {
                  setMenuModalVisibility(false);

                  noticeFilterSheet.current?.open();
                }}>
                <View
                  style={[
                    styles.faj,
                    {justifyContent: 'flex-start', alignItems: 'center'},
                  ]}>
                  <NotifIcon />
                  <Text style={styles.menuText}>
                    {locales('titles.notice')}
                  </Text>
                </View>
              </Pressable>

              <Pressable
                onPress={() => {
                  setMenuModalVisibility(false);

                  navigation.navigate('notePage', {
                    customerName,
                    customerId: bookCashCustomerId,
                  });
                }}>
                <View
                  style={[
                    styles.faj,
                    {justifyContent: 'flex-start', alignItems: 'center'},
                  ]}>
                  <NoteIcon />
                  <Text style={styles.menuText}>{locales('titles.note')}</Text>
                </View>
              </Pressable>
              {/* <Pressable
                onPress={() => {
                  setMenuModalVisibility(false);
                  navigation.navigate('Report');
                }}>
                <View
                  style={[
                    styles.faj,
                    {justifyContent: 'flex-start', alignItems: 'center'},
                  ]}>
                  <ReportIcon />
                  <Text style={styles.menuText}>
                    {locales('titles.report')}
                  </Text>
                </View>
              </Pressable> */}
            </View>
          </View>
        </Pressable>
      </Modal>

      <View style={{backgroundColor: '#fff', height: '100%'}}>
        <View
          style={{
            backgroundColor: 'rgba(230, 120, 41, 0.1)',
            padding: 16,
            display: customerDetails.phone ? 'none' : 'flex',
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
          // onPress={() => {
          //   navigation.navigate('EditProfile');
          // }}
          />
        </View>

        {NoticeRbSheet()}

        <View
          style={{
            backgroundColor: '#FFFFFF',
            elevation: 1,
            padding: 16,
            margin: 16,
            borderRadius: 8,
          }}>
          <Text
            style={{
              color: '#0B1596',
              fontSize: 13,
              fontWeight: '400',
              marginBottom: 16,
            }}>
            Account Balance
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 8,
              }}>
              <View
                style={{
                  backgroundColor:
                    customerDetails.customer_total_transactions_amount > 0
                      ? 'rgba(0, 207, 130, 0.1)'
                      : customerDetails.customer_total_transactions_amount < 0
                      ? 'rgba(229, 41, 41, 0.1)'
                      : 'transparent',
                  padding: 6,
                  borderRadius: 8,
                }}>
                {customerDetails.customer_total_transactions_amount > 0 ? (
                  <PositiveIcon />
                ) : customerDetails.customer_total_transactions_amount < 0 ? (
                  <NegetiveIcon />
                ) : null}
              </View>
              {/* <Text
              style={{
                backgroundColor:
                  customerDetails.customer_total_transactions_amount > 0
                    ? 'rgba(0, 207, 130, 0.1)'
                    : customerDetails.customer_total_transactions_amount < 0
                    ? 'rgba(229, 41, 41, 0.1)'
                    : 'transparent',
                width: 28,
                textAlign: 'center',
                textAlignVertical: 'center',
                height: 28,
                borderRadius: 8,
                fontSize: 18,
              }}>
              {customerDetails.customer_total_transactions_amount > 0
                ? '+'
                : customerDetails.customer_total_transactions_amount < 0
                ? '-'
                : '0'}
            </Text> */}
              <Text style={{color: '#01020D', fontWeight: '600', fontSize: 18}}>
                {Math.abs(
                  customerDetails.customer_total_transactions_amount,
                ).toLocaleString() ?? 0}{' '}
                {currenciesList.find(currency => currency.id === currencyId)
                  ?.title === 'EUR'
                  ? '£'
                  : '$'}
              </Text>
            </View>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '400',
                color:
                  customerDetails.customer_total_transactions_amount > 0
                    ? '#00CF82'
                    : customerDetails.customer_total_transactions_amount < 0
                    ? '#E52929'
                    : '#9b9b9b',
              }}>
              {renderTotalAmountText(
                customerDetails.customer_total_transactions_amount,
              )}
            </Text>
          </View>
        </View>

        <SafeAreaView
          style={{
            flex: 1,
            marginBottom: '3%',
          }}>
          <FlatList
            style={{
              elevation: 1,
              backgroundColor: '#fff',
              marginHorizontal: 16,
              padding: 16,
              borderRadius: 8,
              marginBottom: '12%',
            }}
            ListEmptyComponent={renderListEmptyComponent}
            data={transactions}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              margin: 16,
              position: 'absolute',
              top: '85%',
              gap: 16,
              backgroundColor: '#fff',
            }}>
            <Pressable
              onPress={_ =>
                navigation.navigate('TransactionDetails', {
                  isDebt: false,
                  bookCashCustomerId,
                  currencyId,
                  bookCashId,
                })
              }
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
              }}>
              <Text
                style={{
                  color: '#00CF82',
                  fontSize: 16,
                  fontWeight: '600',
                }}>
                {locales('titles.received')}
              </Text>
            </Pressable>

            <Pressable
              onPress={_ =>
                navigation.navigate('TransactionDetails', {
                  isDebt: true,
                  bookCashCustomerId,
                  currencyId,
                  bookCashId,
                })
              }
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
            </Pressable>
          </View>
        </SafeAreaView>
        {/* <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}>
        <Pressable
          onPress={_ =>
            navigation.navigate('TransactionDetails', {
              isDebt: false,
              bookCashCustomerId,
              currencyId,
            })
          }
          style={{
            width: '47%',
            borderRadius: 8,
            borderWidth: 1,
            height: 60,
            alignItems: 'center',
            justifyContent: 'center',
            borderColor: '#00CF82',
          }}>
          <Text
            style={{
              textAlign: 'center',
              textAlignVertical: 'center',
              color: '#00CF82',
              fontSize: 16,
              fontWeight: '400',
            }}>
            Received
          </Text>
        </Pressable>
        <Pressable
          onPress={_ =>
            navigation.navigate('TransactionDetails', {
              isDebt: true,
              bookCashCustomerId,
              currencyId,
            })
          }
          style={{
            width: '47%',
            height: 60,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 8,
            borderWidth: 1,
            borderColor: 'red',
          }}>
          <Text
            style={{
              textAlign: 'center',
              textAlignVertical: 'center',
              color: 'red',
              fontSize: 16,
              fontWeight: '400',
            }}>
            Has Given
          </Text>
        </Pressable>
      </View> */}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  menuText: {
    color: '#01020D',
    fontSize: 14,
    fontWeight: '400',
    marginLeft: 8,
  },
  faj: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
});

export default CustomerTransactions;
