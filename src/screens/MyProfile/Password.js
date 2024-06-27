import React, {useState, useContext, useEffect} from 'react';
import PasswordIcon from '../../assets/svgs/PasswordIcon';
import {
  StyleSheet,
  View,
  Text,
  Switch,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Pressable,
  ToastAndroid,
} from 'react-native';
import VisibleIcon from '../../assets/svgs/VisibleIcon';
import UnvisibleIcon from '../../assets/svgs/UnvisibleIcon';
import {contextsStore} from '../../contexts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ArrowRightIcon from '../../assets/svgs/ArrowRightIcon';
import KeyPassword from '../../assets/svgs/KeyPassword';
import database from '../../DB/index.native';

function Password({navigation, route}) {
  const {setTabBarBottom, userPass, setUserPass} = useContext(contextsStore);
  const [renderTime, setRenderTime] = useState(null);
  const {userId} = route.params;
  useEffect(() => {
    const startTime = Date.now();
    setRenderTime(null);

    requestAnimationFrame(() => {
      const endTime = Date.now();
      setRenderTime(endTime - startTime);
    });
  }, []);

  useEffect(() => {
    AsyncStorage.getItem('password')
      .then(value => {
        if (value === 'true') {
          setIsEnabled(true);
        } else {
          setIsEnabled(false);
        }
      })
      .catch(error => {});
  }, []);

  useEffect(() => {
    database.collections
      .get('user')
      .find(userId)
      .then(res => {
        setUserPass(res.password);
        res.password;
      });
  }, []);

  const [isEnabled, setIsEnabled] = useState(null);
  const [passwowrdVisible, setPasswowrdVisible] = useState(false);
  useEffect(() => {
    navigation.addListener('focus', () => {
      setTabBarBottom(false);
    });
  }, [navigation]);

  const handleChangePassword = () => {
    if (!userPass) {
      navigation.navigate('CreatePassword', {userId});
    } else {
      navigation.navigate('EditPassword', {userId});
    }
  };

  const handleSwitchToggle = () => {
    if (!userPass) {
      ToastAndroid.show(
        locales('titles.setYourPasswordFirst'),
        ToastAndroid.SHORT,
      );
      return;
    }
    setIsEnabled(!isEnabled);
    if (!isEnabled) {
      AsyncStorage.setItem('password', 'true');
    } else {
      AsyncStorage.removeItem('password');
    }
  };
  return (
    <>
      <View style={styles.container}>
        <View>
          <Pressable
            style={{display: userPass > 0 ? 'none' : 'flex'}}
            onPress={() => {
              navigation.navigate('CreatePassword', {userId});
            }}>
            <View style={styles.nonPassword}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View
                  style={[
                    styles.passwordView,
                    {backgroundColor: '#E52929', marginRight: 10},
                  ]}>
                  <KeyPassword />
                </View>
                <Text style={styles.nonPasswordText}>
                  {locales('titles.dontHaveAPassword')}
                </Text>
              </View>

              <View style={{flexDirection: 'row'}}>
                <Text style={styles.iconText}>{locales('titles.more')}</Text>
                <ArrowRightIcon fill={'#E52929'} />
              </View>
            </View>
          </Pressable>

          <View
            style={[
              styles.passwordView,
              {marginHorizontal: 16, marginTop: 16},
            ]}>
            <View style={styles.password}>
              <Pressable
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%',
                }}
                onPress={() => {
                  setPasswowrdVisible(!passwowrdVisible);
                }}>
                <View style={{flexDirection: 'row'}}>
                  <View style={styles.iconView}>
                    <PasswordIcon fill="#9B9B9B" />
                  </View>

                  <View>
                    <Text style={styles.headerText}>
                      {locales('titles.password')}
                    </Text>
                    <Text
                      style={[
                        styles.subHeaderText,
                        {display: passwowrdVisible ? 'flex' : 'none'},
                      ]}>
                      {userPass ? '******' : '-'}
                    </Text>
                    <Text
                      style={[
                        styles.subHeaderText,
                        {display: passwowrdVisible ? 'none' : 'flex'},
                      ]}>
                      {userPass ? userPass : '-'}
                    </Text>
                  </View>
                </View>

                <View style={{display: 'flex', justifyContent: 'flex-end'}}>
                  <VisibleIcon
                    fill={userPass ? null : '#D9D9D9'}
                    disabled={userPass ? false : true}
                    style={{display: passwowrdVisible ? 'flex' : 'none'}}
                    onPress={() => {
                      setPasswowrdVisible(!passwowrdVisible);
                    }}
                  />
                  <UnvisibleIcon
                    fill={userPass ? null : '#D9D9D9'}
                    disabled={userPass ? false : true}
                    style={{display: passwowrdVisible ? 'none' : 'flex'}}
                    onPress={() => {
                      setPasswowrdVisible(!passwowrdVisible);
                    }}
                  />
                </View>
              </Pressable>
            </View>
            <View
              style={{
                height: 1,
                backgroundColor: '#D9D9D9',
                marginVertical: 24,
              }}></View>
            <TouchableWithoutFeedback onPress={handleSwitchToggle}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{color: '#01020D', fontWeight: '500', fontSize: 14}}>
                  {locales('titles.activateTheAppLock')}
                </Text>
                <Switch
                  trackColor={{false: '#D9D9D9', true: '#0B1596'}}
                  thumbColor={isEnabled ? '#FFFFFF' : '#FFFFFF'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={handleSwitchToggle}
                  value={isEnabled}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>

        <TouchableOpacity
          onPress={handleChangePassword}
          style={{
            backgroundColor: '#0B1596',
            paddingVertical: 16,
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
            borderRadius: 8,
            flexDirection: 'row',
            margin: 16,
          }}>
          <Text
            style={{
              color: '#fff',
              fontSize: 16,
              fontWeight: '600',
            }}>
            {userPass > 0
              ? locales('titles.change')
              : locales('titles.SetANewPassword')}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  iconView: {
    backgroundColor: 'rgba(155, 155, 155, 0.09);',
    padding: 10,
    borderRadius: 8,
    marginRight: 8,
  },
  headerText: {
    color: '#01020D',
    fontSize: 13,
    fontWeight: '400',
  },
  subHeaderText: {
    color: '#01020D',
    fontSize: 18,
    fontWeight: '600',
  },
  password: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  passwordView: {
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
    padding: 16,
  },
  container: {
    backgroundColor: '#fff',
    height: '100%',
    justifyContent: 'space-between',
  },
  nonPassword: {
    backgroundColor: 'rgba(229, 41, 41, 0.1)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  nonPasswordText: {
    color: '#01020D',
    fontSize: 14,
    fontWeight: '400',
  },
  iconText: {
    color: '#E52929',
    fontSize: 14,
    fontWeight: '600',
    marginRight: 8,
  },
});

export default Password;
