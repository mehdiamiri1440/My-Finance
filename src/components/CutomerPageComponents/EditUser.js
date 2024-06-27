import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Animated,
} from 'react-native';
import {Text, TouchableOpacity, PermissionsAndroid} from 'react-native';
import ContactIcon from '../../assets/svgs/ContactIcon';
import {StyleSheet} from 'react-native';
import InputFlotingLable from '../../components/FlotingLableInput';
import ContactsList from '../../components/UserContact';
import {contextsStore} from './../../contexts/index';
import BackIcon from '../../assets/svgs/BackIcon';
import database from '../../DB/index.native';
import FlotableInput from '../../components/FlotableInput';

function EditUser({navigation, route}) {
  const {
    customerName,
    setCustomerName,
    setCustomerPhone,
    setTabBarBottom,
    customerPhone,
    setRouteName,
    routeName,
    setCustomerID,
  } = useContext(contextsStore);
  const [btnOpacity, setBtnOpacity] = useState(true);
  const [errorDisplay, setErrorDisplay] = useState(false);
  const [warnStyle, setWarnStyle] = useState(true);
  const [customerInfo, setCustomerInfo] = useState([]);

  const {customerID, name, phone} = route.params;

  useEffect(() => {
    if (customerName?.length !== 0) {
      setBtnOpacity(false);
      setErrorDisplay(false);
      setWarnStyle(true);
    } else {
      setBtnOpacity(true);
    }
  }, [customerName]);

  // useEffect(() => {
  //   navigation.setOptions({
  //     headerLeft: () => (
  //       <BackIcon
  //         style={{marginRight: 32}}
  //         onPress={() => {
  //           navigation.goBack();
  //           setCustomerName('');
  //           setCustomerPhone('');
  //         }}
  //       />
  //     ),
  //   });
  // }, [navigation]);

  const requestWRITE_CONTACTSPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          title: 'Cool Read Contacts App Permission',
          message: 'App needs access to your CONTACTS ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        navigation.navigate('ContactList');
      } else {
      }
    } catch (err) {
      console.warn(err);
    }
  };
  useEffect(() => {
    setRouteName(customerName);
  }, []);

  useEffect(() => {
    setCustomerName(name);
    setCustomerPhone(phone);
  }, []);

  const handleUpdateCustomer = () => {
    database.write(async () => {
      const customer = await database.get('customers').find(customerID);
      await customer.update(customer => {
        (customer.name = customerName), (customer.phone = customerPhone);
      });
      setCustomerName('');
      setCustomerPhone('');
    });

    navigation.goBack();
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={{
            paddingVertical: 24,
            paddingHorizontal: 24,
            backgroundColor: '#fff',
            height: '100%',
            display: 'flex',
            justifyContent: 'space-between',
          }}>
          <View>
            <View>
              <FlotableInput
                autoFocus={true}
                borderColor={warnStyle ? '' : '#E62929'}
                value={customerName}
                setValue={setCustomerName}
                inputPlaceholder={locales('titles.name')}>
                <TouchableWithoutFeedback
                  onPress={requestWRITE_CONTACTSPermission}>
                  <View
                    style={{
                      backgroundColor: 'rgba(11, 21, 150, 0.09)',
                      padding: 13,
                      alignSelf: 'flex-end',
                    }}>
                    <ContactIcon />
                  </View>
                </TouchableWithoutFeedback>
              </FlotableInput>
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
            </View>

            <FlotableInput
              autoFocus={false}
              keyboardType="numeric"
              value={customerPhone}
              setValue={setCustomerPhone}
              inputPlaceholder={locales('titles.phoneOptional')}
            />
          </View>

          <TouchableOpacity
            onPress={handleUpdateCustomer}
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
      </TouchableWithoutFeedback>
    </>
  );
}

const styles = StyleSheet.create({});

export default EditUser;
