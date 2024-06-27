import React, {useContext, useEffect, useState} from 'react';
import {View, TouchableWithoutFeedback, Keyboard, Alert} from 'react-native';
import {Text, TouchableOpacity, PermissionsAndroid} from 'react-native';
import ContactIcon from '../../assets/svgs/ContactIcon';
import {StyleSheet} from 'react-native';
import {contextsStore} from './../../contexts/index';
import database from '../../DB/index.native';
import FlotableInput from '../../components/FlotableInput';
import TopBar from '../../components/TopBar';
import ArrowLeftIcon from '../../assets/svgs/ArrowLeftIcon';
import {useFocusEffect} from '@react-navigation/native';

const phoneNumberRegex = /^[0-9]+$/;

function NewUser({navigation, route}) {
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
  const [errorDisplay2, setErrorDisplay2] = useState(false);
  const [warnStyle, setWarnStyle] = useState(true);
  const [warnStyle2, setWarnStyle2] = useState(true);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     const unsubscribe = navigation.addListener('beforeRemove', e => {
  //       // Prevent default behavior of leaving the screen
  //       e.preventDefault();

  //       // Prompt the user before leaving the screen
  //       // Alert.alert(
  //       //   'Discard changes?',
  //       //   'You have unsaved changes. Are you sure to discard them and leave the screen?',
  //       //   [
  //       //     {text: "Don't leave", style: 'cancel', onPress: () => {}},
  //       //     {
  //       //       text: 'Discard',
  //       //       style: 'destructive',
  //       //       // Navigate back to the screen when the user confirms
  //       //       onPress: () => navigation.dispatch(e.data.action),
  //       //     },
  //       //   ],
  //       // );
  //     });

  //     // Return the unsubscribe function to clean up the event listener
  //     return unsubscribe;
  //   }, [navigation]),
  // );

  useEffect(() => {
    if (customerName.length !== 0) {
      setBtnOpacity(false);
      setErrorDisplay(false);
      setWarnStyle(true);
      setErrorDisplay2(false);
      setWarnStyle2(true);
    } else {
      setBtnOpacity(true);
    }
  }, [customerName, customerPhone]);

  const requestWRITE_CONTACTSPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        navigation.navigate('ContactList');
      } else {
      }
    } catch (err) {}
  };
  useEffect(() => {
    setRouteName(customerName);
  }, []);

  const handleAddCustomer = () => {
    if (phoneNumberRegex.test(customerPhone)) {
    } else {
      setErrorDisplay2(true);
      setWarnStyle2(false);
      return;
    }

    if (customerName.length === 0) {
      setErrorDisplay(true);
      setWarnStyle(false);
      return;
    }
    setRouteName(customerName);
    database.write(async () => {
      const newCustomer = await database.collections
        .get('customers')
        .create(customer => {
          setCustomerID(customer.id);
          customer.name = customerName;
          customer.phone = customerPhone;
          customer._raw.bookCash_id = route.params?.customerID;

          navigation.navigate('customerPage', {
            customerID: customer.id,
            customerName,
            bookCashId: route.params?.customerID,
          });
        });
    });
    setCustomerPhone('');
    setCustomerName('');
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={{
            backgroundColor: '#fff',
            height: '100%',
            display: 'flex',
            justifyContent: 'space-between',
          }}>
          <View>
            <TopBar
              onPress={() => {
                navigation.goBack();
                setCustomerName('');
                setCustomerPhone('');
              }}
              text={locales('titles.newCustomer')}
              leftIcon={<ArrowLeftIcon />}
              backgroundColor="#0B1596"
            />

            <View
              style={{
                paddingHorizontal: 24,
              }}>
              <View>
                <FlotableInput
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
                  {locales('titles.nameIsRequired')}
                </Text>
              </View>

              <FlotableInput
                borderColor={warnStyle2 ? '' : '#E62929'}
                autoFocus={false}
                keyboardType="numeric"
                value={customerPhone}
                setValue={setCustomerPhone}
                inputPlaceholder={locales('titles.phoneOptional')}
              />
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: '400',
                  color: '#E62929',
                  display: errorDisplay2 ? 'flex' : 'none',
                }}>
                {locales('titles.invalidFormat')}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={handleAddCustomer}
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
              {locales('titles.submit')}
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
}

const styles = StyleSheet.create({});

export default NewUser;
