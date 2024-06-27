import React, { useEffect, useRef, useState, useContext } from 'react';
import {
  View,
  FlatList,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  PermissionsAndroid,
  Dimensions,
  StatusBar,
} from 'react-native';
import ActionSheet, {
  ActionSheetRef,
  SheetProps,
} from 'react-native-actions-sheet';
import ArrowLeft from '../../assets/svgs/ArrowLeft';
import ArrowRight from './../../assets/svgs/ArrowRight';
import { StyleSheet } from 'react-native';
import FilterBtn from '../Buttons/filterBtn';
import RadioButton from '../RadioButton';
import RadioButtonComponent from './../RadioButton/index';
import CloseIcon from '../../assets/svgs/CloseIcon';
import database from '../../DB/index.native';
import { contextsStore } from '../../contexts';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

function Notice({
  sheetId,
  payload,
}: SheetProps<{ data: string; customerID: string }>) {
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const [customerInfo, setCustomerInfo] = useState<any[]>([]);
  const [currenciesList, setCurrenciesList] = useState<any[]>([]);
  const navigation = useNavigation()
  const [imgUri, setImgUri] = useState('');
  const { totalAmount } = useContext(contextsStore);
  const [date, setDate] = useState(new Date());
  const ref = useRef();
  const { width, height } = Dimensions.get('screen');

  useEffect(() => {

    const listener = navigation.addListener('focus', () => {
      fetchCustomerDetails();
      database.collections
        .get('currencies')
        .query()
        .fetch()
        .then(currencies => setCurrenciesList(currencies));
    });
    return listener;
  }, [payload?.data]);


  const fetchCustomerDetails = async () => {
    const customer = await database.collections.get('book_cash_customers').find(payload?.data);
    setCustomerInfo(customer);
  }

  const shareOptions = {
    title: 'Share via',
    message: '',
    url: imgUri,
    social: Share.Social.TELEGRAM,
    whatsAppNumber: '', // country code + phone number
    filename: 'Notice', // only for base64 file in Android
  };

  const handleShare = async () => {
    ref?.current.capture().then(uri => {
      setImgUri(uri);
    });

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Share.open(shareOptions)
          .then(res => { })
          .catch(err => { });
      } else {
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <ActionSheet
      closeAnimationConfig={{ bounciness: 0.1 }}
      id={sheetId}
      ref={actionSheetRef}
      containerStyle={{
        height: (height + StatusBar.currentHeight + 40) / 2,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
      }}
      indicatorStyle={{
        display: 'none',
      }}
      gestureEnabled={true}>
      <View style={{ backgroundColor: '#fff' }}>
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
            style={{ marginRight: 24 }}
            onPress={() => {
              actionSheetRef.current?.hide();
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
          options={{ fileName: 'Notice-shot', format: 'png', quality: 1 }}>
          <ImageBackground
            resizeMode="stretch"
            style={{ padding: 24, borderRadius: 8 }}
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
              style={{ flexDirection: 'row', marginLeft: 24, marginBottom: 8 }}>
              <Text
                style={{
                  color: '#01020D',
                  fontSize: 20,
                  fontWeight: '700',
                  marginRight: 16,
                }}>
                <Text style={{ color: '#01020D', fontWeight: '600', fontSize: 18 }}>
                  {Math.abs(customerInfo.customer_total_transactions_amount) ??
                    0}{' '}
                  {currenciesList.find(currency => currency.id === currencyId)
                    ?.title === 'EUR'
                    ? '£'
                    : '$'}
                </Text>
              </Text>
              <View
                style={{
                  backgroundColor:
                    customerInfo.customer_total_transactions_amount > 0
                      ? 'rgba(0, 207, 130, 0.1)'
                      : customerInfo.customer_total_transactions_amount < 0
                        ? 'rgba(229, 41, 41, 0.1)'
                        : 'transparent',
                  padding: 6,
                  borderRadius: 8,
                }}>
                <Text
                  style={{
                    color:
                      totalAmount === '0'
                        ? '#9B9B9B'
                        : totalAmount.charAt(0) === '-'
                          ? '#00CF82'
                          : '#E62929',
                    fontWeight: '400',
                    fontSize: 13,
                  }}>
                  {totalAmount === '0'
                    ? 'Settlement'
                    : totalAmount.charAt(0) === '-'
                      ? 'Demand'
                      : 'Debt'}
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
              {date.toUTCString().substr(0, 16)}
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
                {customerInfo.name}
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
              {customerInfo.phone}
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
    </ActionSheet>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  header: {
    height: '15%',
    backgroundColor: '#EEEFF7',
    paddingHorizontal: 16,
    paddingVertical: 8,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default Notice;
