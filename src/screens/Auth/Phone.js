import {View, Text, StyleSheet, Modal, ToastAndroid} from 'react-native';
import {Pressable} from 'react-native';
import {contextsStore} from '../../contexts';
import {useState, useContext, useEffect} from 'react';
import {TouchableWithoutFeedback, Image} from 'react-native';
import {Keyboard} from 'react-native';
import {styles} from './index.style';
import FlotableInput from '../../components/FlotableInput';
import SpainFlag from '../../assets/svgs/SpainFlag';
import database from '../../DB/index.native';
import EmptyInputIcon from '../../assets/svgs/EmptyInputIcon';
import CustomBtn from '../../components/Button/CustomBtn';
import NetInfo from '@react-native-community/netinfo';

const phoneNumberRegex = /^[0-9]+$/;

function Phone({navigation}) {
  const {
    setLogIn,
    logIn,
    phoneNumber,
    setphoneNumber,
    country,
    setCountry,
    countryItems,
  } = useContext(contextsStore);
  const [opacity, setOpacity] = useState(false);
  const [iconOpacity, setIconOpacity] = useState(false);
  const [open, setOpen] = useState(false);
  const [btnOpacity, setBtnOpacity] = useState(true);
  const [show, setShow] = useState(false);
  const [errorDisplay, setErrorDisplay] = useState(false);
  const [errorDisplay2, setErrorDisplay2] = useState(false);
  const [errorDisplay3, setErrorDisplay3] = useState(false);
  const [errorDisplay4, setErrorDisplay4] = useState(false);
  const [warnStyle, setWarnStyle] = useState(true);
  const [loadingStyle, setLoadingStyle] = useState(false);
  const [isOffline, setOfflineStatus] = useState(false);
  const [internetConnectionModal, setinternetConnectionModal] = useState(false);
  const [loadingDisplay, setLoadingDisplay] = useState(false);

  useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener(state => {
      const offline = !(state.isConnected && state.isInternetReachable);
      setOfflineStatus(offline);
      if (offline) {
        setinternetConnectionModal(true);
      }
    });

    return () => removeNetInfoSubscription();
  }, []);

  const retryTheConnection = () => {
    setLoadingDisplay(true);
    setTimeout(() => {
      NetInfo.fetch().then(state => {
        console.log(state);
        if (state.isConnected && state.isInternetReachable) {
          setinternetConnectionModal(false);
          setLoadingDisplay(false);
        } else {
          ToastAndroid.show('No internet connection.', ToastAndroid.SHORT);
          setLoadingDisplay(false);
        }
      });
    }, 500);
  };
  const internetConnection = () => (
    <Modal
      visible={internetConnectionModal}
      onDismiss={() => retryTheConnection}
      animationType="fade"
      onRequestClose={_ => retryTheConnection}>
      <View style={modalStyle.cnotainer}>
        <View style={{alignItems: 'center', display: 'flex', marginTop: '30%'}}>
          <Image source={require('../../assets/img/ConnectionLost.png')} />
          <Text style={modalStyle.notFound}>
            {locales('titles.NoInternetConnection')}
          </Text>
        </View>
        <CustomBtn
          style={{paddingHorizontal: 50, margin: 24}}
          title={locales('titles.retry')}
          onPress={retryTheConnection}
          btnStyle={true}
          loadingDisplay={loadingDisplay}
        />
      </View>
    </Modal>
  );

  const loginFunction = () => {
    setLoadingStyle(true);
    if (phoneNumber.length === 0) {
      setErrorDisplay(true);
      setWarnStyle(false);
      return;
    }
    if (phoneNumber.length > 10) {
      setErrorDisplay2(true);
      setWarnStyle(false);
      return;
    }
    if (phoneNumber.length < 10) {
      setErrorDisplay3(true);
      setWarnStyle(false);
      return;
    }
    if (phoneNumberRegex.test(phoneNumber)) {
    } else {
      setWarnStyle(false);
      setErrorDisplay4(true);
      return;
    }
    database.write(async () => {
      const newUser = await database.collections.get('user').create(user => {
        user.phone = countryItems.code
          ? countryItems.code + phoneNumber
          : '+1' + phoneNumber;

        setTimeout(() => {
          setLoadingStyle(false);
          navigation.navigate('VerifyPhone', {
            userId: user.id,
          });
        }, 200);
      });
    });
  };

  useEffect(() => {});

  useEffect(() => {
    if (
      phoneNumber.toString().length === 8 &&
      (phoneNumber.toString().charAt(0) === '6' ||
        phoneNumber.toString().charAt(0) === '9') &&
      phoneNumber.indexOf(' ') <= 0 &&
      phoneNumber.indexOf('-') <= 0 &&
      phoneNumber.indexOf('.') <= 0 &&
      phoneNumber.indexOf(',') <= 0
    ) {
      setOpacity(true);
    } else {
      setOpacity(false);
    }
  }, [phoneNumber]);
  useEffect(() => {
    if (
      phoneNumber.toString().charAt(0) === '6' ||
      phoneNumber.toString().charAt(0) === '9' ||
      phoneNumber.toString().length === 0
    ) {
      setIconOpacity(false);
    } else {
      setIconOpacity(true);
    }
  }, [phoneNumber]);
  // useEffect(() => {
  //   if (phoneNumber.indexOf(' ') < 0) {
  //     setIconOpacity(false);
  //   } else {
  //     setIconOpacity(true);
  //   }
  // }, [phoneNumber]);
  const onFocusHandler = () => {
    setCountry(true);
  };

  onBlurHandler = () => {
    setCountry(false);
  };

  useEffect(() => {
    if (phoneNumber.length !== 0) {
      setErrorDisplay(false);
      setWarnStyle(true);
      setErrorDisplay(false);
      setErrorDisplay2(false);
      setErrorDisplay3(false);
      setErrorDisplay4(false);
    } else {
      // setErrorDisplay(true);
      // setErrorDisplay2(true);
      // setErrorDisplay3(true);
    }
  }, [phoneNumber]);

  useEffect(() => {
    if (phoneNumber.length === 10) {
      setBtnOpacity(false);
      // setErrorDisplay(false);
      // setWarnStyle(true);
    } else {
      setBtnOpacity(true);
    }
  }, [phoneNumber]);

  return (
    <>
      {internetConnection()}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[styles.container, {height: '100%', paddingBottom: 24}]}>
          <View>
            <Text style={styles.headerText}>
              {locales('titles.phoneNumber')}
            </Text>

            <Text style={styles.subHeader}>
              {locales('titles.pleaseEnterYourMobilePhoneNumber')}
            </Text>

            <FlotableInput
              borderColor={warnStyle ? '' : '#E62929'}
              onFocus={onFocusHandler}
              onBlur={onBlurHandler}
              children={
                <Pressable
                  onPress={() => {
                    setphoneNumber('');
                  }}
                  style={{padding: 16}}>
                  <EmptyInputIcon fill={'#797F8D'} />
                </Pressable>
              }
              children2={
                <TouchableWithoutFeedback
                  onPress={() => {
                    navigation.navigate('CountriesModal');
                  }}>
                  <View
                    style={{
                      display: country ? 'flex' : 'none',
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginLeft: 16,
                    }}>
                    {countryItems.code ? (
                      <Image
                        style={{width: 23, height: 15}}
                        source={{
                          uri: countryItems.image,
                        }}
                      />
                    ) : (
                      <SpainFlag />
                    )}
                    <Text
                      style={{
                        color: '#0B1596',
                        fontSize: 14,
                        fontWeight: '400',
                        marginLeft: 8,
                      }}>
                      {countryItems.code ? countryItems.code : '+1'}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              }
              onPress={() => {
                navigation.navigate('CountriesModal');
              }}
              value={phoneNumber}
              setValue={setphoneNumber}
              inputPlaceholder={`${locales('titles.phoneNumber')}`}
              inputMode="numeric"
            />
            <Text
              style={{
                fontSize: 13,
                fontWeight: '400',
                color: '#E62929',
                display: errorDisplay ? 'flex' : 'none',
              }}>
              {locales('titles.phoneNumberIsRequired')}
            </Text>
            <Text
              style={{
                fontSize: 13,
                fontWeight: '400',
                color: '#E62929',
                display: errorDisplay2 ? 'flex' : 'none',
              }}>
              {locales('titles.phoneNumberMustBeLessThan8Characters')}
            </Text>
            <Text
              style={{
                fontSize: 13,
                fontWeight: '400',
                color: '#E62929',
                display: errorDisplay3 ? 'flex' : 'none',
              }}>
              {locales('titles.phoneNumberMustBe8Characters')}
            </Text>
            <Text
              style={{
                fontSize: 13,
                fontWeight: '400',
                color: '#E62929',
                display: errorDisplay4 ? 'flex' : 'none',
              }}>
              {locales('titles.invalidFormat')}
            </Text>
          </View>

          <CustomBtn
            title={locales('titles.submit')}
            btnStyle={!btnOpacity}
            loadingDisplay={loadingStyle}
            onPress={loginFunction}
          />
        </View>
      </TouchableWithoutFeedback>
    </>
  );
}

const modalStyle = StyleSheet.create({
  cnotainer: {
    backgroundColor: '#FFFFFF',
    height: '100%',
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  notFound: {
    textAlign: 'center',
    color: '#01020D',
    fontWeight: '500',
    fontSize: 14,
    marginTop: 50,
  },
});

export default Phone;
