import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {contextsStore} from '../../contexts';
import database from '../../DB/index.native';
import NameIcon from '../../assets/svgs/NameIcon';
import PhoneIcon from '../../assets/svgs/PhoneIcon';
import MobileIcon from '../../assets/svgs/MobileIcon';
import ArrowRightIcon from '../../assets/svgs/ArrowRightIcon';
import BackIcon from '../../assets/svgs/BackIcon';
import FlotableInput from '../FlotableInput';

function CustomerProfile({navigation, route}) {
  const {customerName, customerPhone, routeName, setTabBarBottom} =
    useContext(contextsStore);
  const [customerInfo, setCustomerInfo] = useState([]);
  const [deleteCustomerModalVisibility, setDeleteCustomerModalVisibility] =
    useState(false);
  const [editCustomerModalVisibility, setEditCustomerModalVisibility] =
    useState(false);

  const [warnStyle, setWarnStyle] = useState(true);
  const [errorDisplay, setErrorDisplay] = useState(false);
  const [errorDisplay2, setErrorDisplay2] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [btnOpacity, setBtnOpacity] = useState(false);

  const {bookCashCustomerId} = route.params;
  useEffect(() => {
    navigation.addListener('focus', () => {
      setTabBarBottom(false);
    });
    navigation.setOptions({
      headerLeft: () => (
        <BackIcon
          style={{marginLeft: 16}}
          onPress={() => {
            navigation.goBack();
            navigation.goBack();
          }}
        />
      ),
    });
    fetchBookCashDetails();
  }, []);

  const fetchBookCashDetails = async _ => {
    const customersList = await database.collections
      .get('book_cash_customers')
      .find(bookCashCustomerId)
      .then(res => {
        setName(res.name);
        setPhone(res.phone);
        setCustomerInfo(res);
      });
  };

  const handleCustomerDelete = () => {
    // database.write(async () => {
    //   const customer = await database.collections
    //     .get('customers')
    //     .find(customerID);
    //   customer.destroyPermanently();
    // });
    // navigation.navigate('homeScreen', {bookCashId});
    setDeleteCustomerModalVisibility(true);
  };

  const handleCustomerEdit = () => {
    setEditCustomerModalVisibility(true);
  };

  const handleYesBtn = async () => {
    setDeleteCustomerModalVisibility(false);
    const record = await database.collections
      .get('book_cash_customers')
      .find(bookCashCustomerId);
    database.write(async _ => {
      await record.destroyPermanently();
    });
    return navigation.navigate('BookCashDetails');
  };

  const deleteCustomerModal = () => (
    <Modal
      transparent
      visible={deleteCustomerModalVisibility}
      onDismiss={_ => setDeleteCustomerModalVisibility(false)}
      animationType="fade"
      onRequestClose={_ => setDeleteCustomerModalVisibility(false)}>
      <Pressable
        onPress={() => {
          setDeleteCustomerModalVisibility(false);
        }}
        style={styles.modalContainer}>
        <View style={styles.mainView}>
          <Text style={styles.headerText}>
            {locales('titles.deleteTheUser')}
          </Text>
          <View style={styles.line}></View>
          <Text style={styles.message}>
            {locales('titles.areYouSureYouWantToDeleteThisUser')}
          </Text>
          <View style={styles.rowDir}>
            <Pressable onPress={handleYesBtn} style={styles.yesBtn}>
              <Text style={styles.yesText}>{locales('titles.yes')}</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                setDeleteCustomerModalVisibility(false);
              }}
              style={styles.noBtn}>
              <Text style={styles.noText}>{locales('titles.no')}</Text>
            </Pressable>
          </View>
        </View>
      </Pressable>
    </Modal>
  );

  const handleBackButton = () => {
    setEditCustomerModalVisibility(false);
  };
  const handleSubmitBtn = () => {
    if (name.length === 0) {
      setErrorDisplay(true);
      setWarnStyle(false);
      return;
    }
    database.write(async () => {
      const customer = await database.collections
        .get('book_cash_customers')
        .find(bookCashCustomerId);
      await customer
        .update(customerDetails => {
          customerDetails._raw.name = name;
          customerDetails._raw.phone = phone;
        })
        .then(res => {
          fetchBookCashDetails();
          setEditCustomerModalVisibility(false);
        });
    });
  };

  const onNameChanged = text => {
    setName(text);
    if (text.length !== 0) {
      setBtnOpacity(true);
      setErrorDisplay(false);
      setWarnStyle(true);
    } else {
      setBtnOpacity(false);
    }
  };

  useEffect(() => {
    if (name) {
      setErrorDisplay(false);
    } else {
      setBtnOpacity(false);
    }
  }, [name]);

  const EditCustomerModal = () => (
    <Modal
      visible={editCustomerModalVisibility}
      onDismiss={_ => setEditCustomerModalVisibility(false)}
      animationType="fade"
      onRequestClose={_ => setEditCustomerModalVisibility(false)}>
      <View
        style={{
          height: '100%',
          justifyContent: 'space-between',
          paddingBottom: 24,
        }}>
        <View>
          <View
            style={{
              backgroundColor: '#0B1596',
              padding: 16,
              flexDirection: 'row',
              gap: 16,
            }}>
            <BackIcon onPress={handleBackButton} />
            <Text style={{fontSize: 18, fontWeight: '600', color: '#fff'}}>
              Edit Customer
            </Text>
          </View>
          <View style={{paddingHorizontal: 24}}>
            <FlotableInput
              autoFocus={true}
              borderColor={warnStyle ? '' : '#E62929'}
              value={name}
              setValue={onNameChanged}
              inputPlaceholder={locales('titles.name')}></FlotableInput>
            <Text
              style={{
                fontSize: 13,
                fontWeight: '400',
                color: '#E62929',
                display: errorDisplay ? 'flex' : 'none',
              }}>
              {' '}
              Name is required
            </Text>

            <FlotableInput
              autoFocus={false}
              keyboardType="numeric"
              value={phone}
              setValue={setPhone}
              inputPlaceholder={locales('titles.phoneOptional')}
            />
          </View>
        </View>

        <Pressable
          onPress={handleSubmitBtn}
          style={[
            styles.btnStyle2,
            {backgroundColor: '#0B1596', marginHorizontal: 24},
          ]}>
          <Text style={[styles.btnTextStyle, {color: '#fff'}]}>
            {locales('titles.submit')}
          </Text>
        </Pressable>
      </View>
    </Modal>
  );
  return (
    <>
      <View style={styles.container}>
        <View>
          <View
            style={{
              backgroundColor: 'rgba(230, 120, 41, 0.1)',
              padding: 16,
              display: customerInfo.phone ? 'none' : 'flex',
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
          <View style={styles.card}>
            <View style={styles.name}>
              <View style={styles.viewIcon}>
                <NameIcon />
              </View>
              <Text style={styles.text}>{locales('titles.name')}</Text>
              <Text style={styles.mainText}>{customerInfo.name}</Text>
            </View>

            <View style={[styles.name, {marginTop: 24}]}>
              <View style={styles.viewIcon}>
                <PhoneIcon />
              </View>
              <Text style={styles.text}>{locales('titles.phoneNumber')}</Text>
              <Text style={styles.mainText}>{customerInfo.phone}</Text>
            </View>
          </View>
        </View>

        <View style={styles.delcus}>
          <Pressable onPress={handleCustomerDelete} style={styles.btnStyle}>
            <Text style={styles.btnTextStyle}>{locales('titles.delete')}</Text>
          </Pressable>
          <Pressable
            onPress={handleCustomerEdit}
            style={[styles.btnStyle, {backgroundColor: '#0B1596'}]}>
            <Text style={[styles.btnTextStyle, {color: '#fff'}]}>
              {locales('titles.edit')}
            </Text>
          </Pressable>
        </View>
      </View>

      {deleteCustomerModal()}
      {EditCustomerModal()}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    display: 'flex',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  name: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    elevation: 2,
    margin: 16,
  },
  delcus: {
    display: 'flex',
    flexDirection: 'row',
    margin: 16,
  },
  viewIcon: {
    backgroundColor: 'rgba(250, 180, 70, 0.17)',
    padding: 8,
    borderRadius: 8,
  },
  text: {
    color: '#01020D',
    fontSize: 13,
    fontWeight: '400',
    marginLeft: 8,
  },
  mainText: {
    color: '#01020D',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 20,
  },
  btnStyle: {
    backgroundColor: 'transparent',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    padding: 16,
    flex: 1,
  },
  btnStyle2: {
    backgroundColor: 'transparent',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    padding: 16,
  },
  btnTextStyle: {
    color: '#E52929',
    fontSize: 16,
    fontWeight: '600',
  },
  modalContainer: {
    paddingHorizontal: 37,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    backgroundColor: 'rgba(1, 2, 13, 0.2)',
  },
  mainView: {
    padding: 24,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 1,
  },
  headerText: {
    color: '#01020D',
    fontWeight: '700',
    fontSize: 18,
  },
  message: {
    color: '#17191C',
    fontWeight: '400',
    fontSize: 16,
    marginBottom: 16,
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
    color: '#E52929',
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
  line: {
    backgroundColor: '#D9D9D9',
    height: 1,
    marginVertical: 16,
  },
  rowDir: {
    flexDirection: 'row',
  },
});

export default CustomerProfile;
