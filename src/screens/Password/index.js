import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  ImageBackground,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import VisibleIcon from '../../assets/svgs/VisibleIcon';
import UnvisibleIcon from '../../assets/svgs/UnvisibleIcon';
import ArrowRight from '../../assets/svgs/ArrowRight';
import {contextsStore} from '../../contexts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import database from '../../DB/index.native';
import {setActiveLanguage} from '../../../locales';
import CustomBtn from '../../components/Button/CustomBtn';

function PasswordPage({navigation}) {
  const {userPass} = useContext(contextsStore);
  const [password, setPassword] = useState('');
  const [hidePass, setHidePass] = useState(false);
  const [btnStyle, setBtnStyle] = useState(false);
  const [errorDisplay, setErrorDisplay] = useState(false);
  const [errorDisplay2, setErrorDisplay2] = useState(false);
  const [inputBorder, setInputBorder] = useState(false);
  const [userId, setUserId] = useState('');
  const [userInfo, setUserInfo] = useState('');
  const [loadingDisplay, setLoadingDisplay] = useState(false);
  useEffect(() => {
    if (password.length > 0) {
      setBtnStyle(true);
      setErrorDisplay(false);
      setErrorDisplay2(false);
      setInputBorder(false);
    } else {
      setBtnStyle(false);
    }
  }, [password]);

  useEffect(() => {
    AsyncStorage.getItem('userId').then(async userId => {
      setUserId(userId);
      const userInfo = await database.get('user').find(userId);
      setUserInfo(userInfo);
    });
  }, []);

  const handlePassword = () => {
    setLoadingDisplay(true);
    if (password.length === 0) {
      setErrorDisplay2(true);
      setInputBorder(true);
      setLoadingDisplay(false);

      return;
    }

    if (userInfo.password.toString() !== password.toString()) {
      setErrorDisplay(true);
      setInputBorder(true);
      setLoadingDisplay(false);

      return;
    }

    setTimeout(() => {
      setLoadingDisplay(false);
      navigation.replace('Home');
    }, 300);
  };

  return (
    <>
      <ImageBackground
        resizeMode="cover"
        style={styles.imageBackground}
        source={require('./../../assets/img/Mask-group.png')}>
        <View style={styles.container}>
          <View>
            <Text style={styles.headerText}>Enter You Password</Text>
            <View
              style={[
                styles.input,
                {
                  borderColor: inputBorder ? '#E62929' : '#D9D9D9',
                },
              ]}>
              <View>
                <VisibleIcon fill={'transparent'} />
              </View>
              <TextInput
                autoFocus={true}
                keyboardType="numeric"
                secureTextEntry={hidePass ? true : false}
                style={styles.innerInput}
                value={password}
                letterSpacing={8}
                onChangeText={setPassword}
              />
              <TouchableOpacity
                onPress={() => {
                  setHidePass(!hidePass);
                }}
                style={{padding: 16}}>
                <VisibleIcon
                  onPress={() => {
                    setHidePass(!hidePass);
                  }}
                  style={{display: hidePass ? 'flex' : 'none'}}
                />
                <UnvisibleIcon
                  onPress={() => {
                    setHidePass(!hidePass);
                  }}
                  style={{display: hidePass ? 'none' : 'flex'}}
                />
              </TouchableOpacity>
            </View>
            <Text
              style={{
                marginTop: 8,
                fontSize: 13,
                fontWeight: '400',
                color: '#E62929',
                alignSelf: 'center',
                display: errorDisplay ? 'flex' : 'none',
              }}>
              {' '}
              Incorrect Password
            </Text>
            <Text
              style={{
                marginTop: 8,
                fontSize: 13,
                fontWeight: '400',
                color: '#E62929',
                alignSelf: 'center',
                display: errorDisplay2 ? 'flex' : 'none',
              }}>
              {' '}
              Password is required
            </Text>
          </View>
          <CustomBtn
            title={locales('titles.submit')}
            btnStyle={btnStyle}
            loadingDisplay={loadingDisplay}
            onPress={handlePassword}
          />
        </View>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'transparent',
    paddingVertical: 60,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
  headerText: {
    color: '#01020D',
    fontWeight: '700',
    fontSize: 18,
    alignSelf: 'center',
  },
  input: {
    width: '100%',
    borderColor: '#D9D9D9',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 8,
    paddingVertical: 4,
    paddingLeft: 16,
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  innerInput: {
    alignSelf: 'center',
    color: '#01020D',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    width: '50%',
  },
});
export default PasswordPage;
