import React, {useContext, useState, useEffect} from 'react';
import {contextsStore} from '../../contexts';
import {
  TextInput,
  Button,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {styles} from './index.style';
import SupportIcon from '../../assets/svgs/SupportIcon';
import CountDown from './../../components/CountDown/index';
import ModalScreen from '../../components/Modal';
import database from '../../DB/index.native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomBtn from '../../components/Button/CustomBtn';

function VerifyCode({navigation, route}) {
  const {
    setLogIn,
    logIn,
    phoneNumber,
    setphoneNumber,
    sendCodeStyle,
    setSendCodeStyle,
  } = useContext(contextsStore);
  const [value, setValue] = useState('');
  const [confirmOpacity, setConfirmOpacity] = useState(false);
  const [totalDuration, setTotalDuration] = useState(120);
  const [onFinish, setOnFinish] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  const [btnOpacity, setBtnOpacity] = useState(true);
  const [errorDisplay, setErrorDisplay] = useState(false);
  const [errorDisplay2, setErrorDisplay2] = useState(false);
  const [errorDisplay3, setErrorDisplay3] = useState(false);
  const [borderColor, setBorderColor] = useState(false);
  const [loadingStyle, setLoadingStyle] = useState(false);

  const {userId} = route.params;

  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  useEffect(() => {
    async function loadInfo() {
      const userInfo = await database.get('user').find(userId);
      setUserInfo(userInfo);
    }
    loadInfo();
  }, [userId]);

  const loginFunction = () => {
    setLoadingStyle(true);
    if (value.length === 0) {
      setErrorDisplay3(true);
      setBorderColor(true);
      setLoadingStyle(false);

      return;
    }
    if (value.length < 4 && value.length > 0) {
      setErrorDisplay2(true);
      setBorderColor(true);
      setLoadingStyle(false);

      return;
    }
    if (value.toString() !== '1234') {
      setTimeout(() => {
        setErrorDisplay(true);
        setBorderColor(true);
        setLoadingStyle(false);
      }, 2000);
    } else {
      setTimeout(() => {
        AsyncStorage.setItem('Auth', 'true');
        AsyncStorage.setItem('userId', userId);
        setphoneNumber('');
        setLoadingStyle(false);
        navigation.navigate('Name', {userId});
      }, 200);
    }
  };

  useEffect(() => {
    setSendCodeStyle(false);
  }, []);
  999;
  useEffect(() => {
    if (value.length !== 0) {
      setBorderColor(false);
      setErrorDisplay3(false);
      setErrorDisplay2(false);
      setErrorDisplay(false);
    }
  }, [value]);

  useEffect(() => {
    if (value.length === 4) {
      setBtnOpacity(false);
    } else setBtnOpacity(true);
  }, [value]);

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View>
            <Text style={styles.headerText}>
              {locales('titles.verificationCode')}
            </Text>
            <Text style={styles.subHeader}>
              {locales('titles.theVerificationCodeSentTo')}{' '}
              <Text style={{color: '#0B1596', fontSize: 14, fontWeight: '600'}}>
                {userInfo.phone}
              </Text>
              {'\n'} {locales('titles.pleaseEnterItInTheFieldsBelow')}
            </Text>
            <CodeField
              rootStyle={styles1.codeFieldRoot}
              value={value}
              onChangeText={setValue}
              cellCount={4}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              renderCell={({index, symbol, isFocused}) => (
                <Text
                  key={index}
                  style={[
                    styles1.cell,
                    {
                      borderColor: borderColor ? '#E52929' : '#BFC5D2',
                    },
                    isFocused && {
                      borderColor: borderColor ? '#E52929' : '#0B1596',
                    },
                  ]}
                  onLayout={getCellOnLayoutHandler(index)}>
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              )}
            />
            <Text
              style={{
                fontSize: 14,
                fontWeight: '400',
                color: '#E62929',
                textAlign: 'center',
                marginTop: 16,
                display: errorDisplay ? 'flex' : 'none',
              }}>
              {locales('titles.invalidCodeNummber')}
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '400',
                color: '#E62929',
                textAlign: 'center',
                marginTop: 16,

                display: errorDisplay2 ? 'flex' : 'none',
              }}>
              {locales('titles.codeNumberMustbe4Characters')}
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '400',
                color: '#E62929',
                textAlign: 'center',
                marginTop: 16,

                display: errorDisplay3 ? 'flex' : 'none',
              }}>
              {locales('titles.codeNumberRequired')}
            </Text>
          </View>

          <View>
            <View
              style={{
                marginBottom: 30,
                display: 'flex',
                flexDirection: sendCodeStyle ? 'row' : 'column',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}>
              <TouchableWithoutFeedback
                onPress={() => {
                  navigation.goBack();
                }}>
                <Text
                  style={{
                    color: '#0B1596',
                    fontSize: 14,
                    fontWeight: '600',
                    alignSelf: 'center',
                    display: 'flex',
                    marginBottom: sendCodeStyle ? 0 : 6,
                  }}>
                  {locales('titles.changeNumber')}
                </Text>
              </TouchableWithoutFeedback>

              <View
                style={{
                  display: sendCodeStyle ? 'flex' : 'none',
                  height: 24,
                  backgroundColor: '#D9D9D9',
                  width: 1,
                }}></View>
              <CountDown />
            </View>

            <CustomBtn
              title={locales('titles.submit')}
              btnStyle={!btnOpacity}
              loadingDisplay={loadingStyle}
              onPress={loginFunction}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
      <ModalScreen />
    </>
  );
}
const styles1 = StyleSheet.create({
  codeFieldRoot: {
    marginTop: 24,
  },
  cell: {
    color: '#01020D',
    width: 60,
    height: 60,
    fontSize: 24,
    fontWeight: 'bold',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#BFC5D2',
    textAlign: 'center',
    padding: 14,
  },
  focusCell: {
    borderColor: '#0B1596',
  },
});
export default VerifyCode;
