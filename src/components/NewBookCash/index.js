import React, {useContext, useEffect, useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
} from 'react-native';
import database from '../../DB/index.native';
import {contextsStore} from './../../contexts/index';
import FlotableInput from '../FlotableInput';
import DropDownIcon from '../../assets/svgs/DropDownIcon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeleteIcon from '../../assets/svgs/DeleteIcon';
import NotifPageIcon from '../../assets/svgs/NotifPageIcon';
import DeleteImageIcon from '../../assets/svgs/DeleteImageIcon';
import RBSheet from 'react-native-raw-bottom-sheet';
import CloseIcon from '../../assets/svgs/CloseIcon';

const NewBookCash = ({navigation, route = {}}) => {
  const {params = {}} = route;
  const {title, currency, bookCashId} = params;
  const {setTabBarBottom} = useContext(contextsStore);
  const [btnOpacity, setBtnOpacity] = useState(false);
  const [bookCashName, setBookCashName] = useState('');
  const [errorDisplay, setErrorDisplay] = useState(false);
  const [showUnitList, setShowUnitList] = useState(false);
  const [currencies, setCurrencies] = useState([]);
  const [currencyId, setCurrencyId] = useState(null);
  const [warnStyle, setWarnStyle] = useState(true);
  const refDeleteSheet = useRef();

  useEffect(() => {
    fetchCurrencies();
    navigation.addListener('focus', () => {
      setTabBarBottom(false);
    });
    if (title) {
      navigation.setOptions({
        headerRight: () => (
          <Pressable
            onPress={() => {
              refDeleteSheet.current.open();
            }}
            style={{padding: 16}}>
            <DeleteImageIcon
              onPress={() => {
                refDeleteSheet.current.open();
              }}
              fill={'#fff'}
            />
          </Pressable>
        ),
        headerTitle: () => (
          <Text style={{color: '#fff', fontWeight: '600', fontSize: 20}}>
            {locales('titles.editBookCash')}
          </Text>
        ),
      });
    }
    if (title) setBookCashName(title);
    if (currency) setCurrencyId(currency);
  }, []);

  const fetchCurrencies = _ => {
    database
      .get('currencies')
      .query()
      .fetch()
      .then(currencyList => {
        setCurrencies(currencyList);
      });
  };

  const handleAddNewBookCash = async () => {
    if (bookCashName.length === 0) {
      setErrorDisplay(true);
      setWarnStyle(false);
      return;
    }
    AsyncStorage.getItem('userId').then(userId => {
      database
        .write(async () => {
          if (!bookCashId) {
            await database
              .get('book_cashes')
              .create(bookCash => {
                bookCash._raw.title = bookCashName;
                bookCash._raw.currency_id = currencyId ?? currencies[0].id;
                bookCash._raw.user_id = userId;
              })
              .then(res => {
                navigation.navigate('homeScreen');
              });
          } else {
            const bookCash = await database.collections
              .get('book_cashes')
              .find(bookCashId);
            await bookCash
              .update(book => {
                book._raw.title = bookCashName;
                book._raw.currency_id = currencyId ?? currencies[0].id;
              })
              .then(res => {
                navigation.navigate('homeScreen');
              });
          }
        })
        .catch(err => {});
    });
  };

  const renderCurrenciesList = ({item}) => {
    return (
      <TouchableWithoutFeedback onPress={_ => onCurrencyChanged(item)}>
        <View style={{padding: 8}}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '400',
              color: item.id === currencyId ? '#2E5BFF' : '#01020D',
            }}>
            {item.title}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };
  const keyExtractor = item => item.id.toString();

  const onNameChanged = text => {
    setBookCashName(text);
    if (text.length !== 0) {
      setBtnOpacity(true);
      setErrorDisplay(false);
      setWarnStyle(true);
    } else {
      setBtnOpacity(false);
    }
  };

  const onCurrencyChanged = item => {
    setCurrencyId(item.id);
    setShowUnitList(false);
  };

  const renderDeleteSheet = () => (
    <RBSheet
      height={190}
      animationType="none"
      ref={refDeleteSheet}
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
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 24,
          paddingVertical: 16,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text style={{color: '#01020D', fontSize: 18, fontWeight: '700'}}>
          {locales('titles.deleteTheBookCash')}
        </Text>
        <CloseIcon onPress={closeDeleteSheet} fill={'#9b9b9b'} />
      </View>
      <View
        style={{
          width: '100%',
          backgroundColor: '#D9D9D9',
          height: 1,
          marginBottom: 24,
        }}></View>

      <Text
        style={{
          fontSize: 14,
          fontWeight: '400',
          color: '#01020D',
          marginLeft: 24,
        }}>
        {locales('titles.areYouSureYouWantToDeleteTheBookCash')}
      </Text>

      <View style={styles.rowDir}>
        <Pressable onPress={handleDeleteBookCash} style={styles.yesBtn}>
          <Text style={styles.yesText}>{locales('titles.yes')}</Text>
        </Pressable>
        <Pressable onPress={closeDeleteSheet} style={styles.noBtn}>
          <Text style={styles.noText}>{locales('titles.no')}</Text>
        </Pressable>
      </View>
    </RBSheet>
  );
  const handleDeleteBookCash = async () => {
    const record = await database.collections
      .get('book_cashes')
      .find(bookCashId);
    database.write(async _ => {
      await record.destroyPermanently();
    });
    return navigation.navigate('homeScreen');
  };
  const closeDeleteSheet = () => {
    refDeleteSheet.current.close();
  };
  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            height: '100%',
            paddingTop: 16,
            paddingHorizontal: 24,
            backgroundColor: '#FFFFFF',
          }}>
          <View>
            <Text style={styles.header}>{locales('titles.newBookCash')}</Text>

            <FlotableInput
              autoFocus={true}
              borderColor={warnStyle ? '' : '#E62929'}
              value={bookCashName}
              setValue={onNameChanged}
              inputPlaceholder="Name"
            />
            <Text
              style={{
                fontSize: 13,
                fontWeight: '400',
                color: '#E62929',
                display: errorDisplay ? 'flex' : 'none',
              }}>
              {locales('titles.enterAName')}
            </Text>

            <FlotableInput
              autoFocus={false}
              onPress={_ => setShowUnitList(!showUnitList)}
              editable={false}
              value={
                currencyId
                  ? currencies.find(item => item.id === currencyId)?.title
                  : null
              }
              setValue={setCurrencyId}
              inputPlaceholder="Currency">
              <DropDownIcon style={{marginRight: 16}} />
            </FlotableInput>

            <FlatList
              data={currencies}
              style={{
                backgroundColor: '#fff',
                width: '100%',
                elevation: 1,
                padding: 4,
                marginTop: 16,
                borderRadius: 8,
                display: showUnitList ? 'flex' : 'none',
              }}
              keyExtractor={keyExtractor}
              renderItem={renderCurrenciesList}
            />
          </View>

          <TouchableOpacity
            onPress={handleAddNewBookCash}
            style={[
              styles.registerBtn,
              {
                backgroundColor: btnOpacity
                  ? '#0B1596'
                  : 'rgba(1, 2, 13, 0.09)',
              },
            ]}>
            <Text
              style={{
                color: btnOpacity ? '#fff' : '#9B9B9B',
                fontSize: 16,
                fontWeight: '600',
              }}>
              {locales('titles.submit')}
            </Text>
          </TouchableOpacity>
          {renderDeleteSheet()}
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#01020D',
  },
  registerBtn: {
    backgroundColor: '#0B1596',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  textInput: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#D9D9D9',
    marginTop: 24,
  },
  text: {
    fontSize: 14,
    fontWeight: '400',
    color: '#9B9B9B',
    position: 'absolute',
    backgroundColor: '#ffffff',
    display: 'flex',
    justifyContent: 'center',
    marginLeft: 16,
    bottom: 0,
  },
  line: {
    backgroundColor: '#D9D9D9',
    width: '100%',
    height: 1,
    marginVertical: 2,
  },
  noBtn: {
    padding: 16,
    backgroundColor: '#0B1596',
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
  noText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  yesText: {
    color: '#0B1596',
    fontWeight: '600',
    fontSize: 16,
  },
  yesBtn: {
    padding: 16,
    backgroundColor: 'transparent',
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },

  rowDir: {
    flexDirection: 'row',
    marginTop: 24,
    marginHorizontal: 24,
  },
});

export default NewBookCash;
