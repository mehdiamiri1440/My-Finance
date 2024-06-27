import React, {useEffect, useState, useContext} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import FlotableInput from '../../components/FlotableInput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import database from '../../DB/index.native';
import {contextsStore} from '../../contexts';
const newPasswordRegex = /^[0-9]+$/;

function EditPassword({navigation, route}) {
  const {
    userName,
    userPhone,
    userIban,
    setUserIban,
    setUserName,
    setUserPhone,
    setUserPass,
    userPass,
  } = useContext(contextsStore);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [invalidFormat, setInvalidFormat] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [passwordCharNumb, setPasswordCharNumb] = useState(false);
  const [incorrectPassword, setIncorrectPassword] = useState(false);
  const [btnOpacity, setBtnOpacity] = useState(true);
  const [warnStyle, setWarnStyle] = useState(true);
  const {userId} = route.params;

  const handleUpdatePassword = () => {
    if (
      !newPasswordRegex.test(newPassword) ||
      !newPasswordRegex.test(confirmPassword) ||
      !newPasswordRegex.test(oldPassword)
    ) {
      setInvalidFormat(true);
      setWarnStyle(false);
      setPasswordMismatch(false);
      return;
    } else if (userPass.toString() !== oldPassword.toString()) {
      setIncorrectPassword(true);
      return;
    } else if (newPassword !== confirmPassword) {
      setPasswordMismatch(true);
      setInvalidFormat(false);
      setWarnStyle(false);

      return;
    } else if (newPassword.length < 4 && confirmPassword.length < 4) {
      setPasswordCharNumb(true);
      setWarnStyle(false);

      return;
    }

    database.write(async () => {
      const userUpdate = await database.get('user').find(userId);
      await userUpdate.update(user => {
        user.password = +newPassword;
      });
    });
    setNewPassword('');
    setConfirmPassword('');
    setUserPass(newPassword);
    navigation.goBack();
  };

  useEffect(() => {
    if (
      newPassword.length > 0 ||
      oldPassword.length > 0 ||
      confirmPassword.length > 0
    ) {
      setBtnOpacity(false);
      setInvalidFormat(false);
      setPasswordMismatch(false);
      setWarnStyle(true);
      setPasswordCharNumb(false);
      setIncorrectPassword(false);
    }
  }, [newPassword, confirmPassword, oldPassword]);

  useEffect(() => {
    setTimeout(() => {
      if (confirmPassword !== newPassword) {
        setPasswordMismatch(true);
      } else {
        setPasswordMismatch(false);
      }
    }, 1000);
  }, [confirmPassword]);
  useEffect(() => {
    setTimeout(() => {
      if (newPassword.length < 4) {
        setPasswordCharNumb(true);
      } else {
        setPasswordCharNumb(false);
      }
    }, 1000);
  }, [newPassword]);

  return (
    <View style={styles.container}>
      <View>
        <FlotableInput
          value={oldPassword}
          setValue={setOldPassword}
          inputPlaceholder={locales('titles.oldPassword')}
          keyboardType="numeric"
        />
        <Text
          style={[styles.errorText, incorrectPassword && {display: 'flex'}]}>
          Old Password is incorrect
        </Text>
        <FlotableInput
          value={newPassword}
          setValue={setNewPassword}
          inputPlaceholder={locales('titles.newPassword')}
          keyboardType="numeric"
        />
        <FlotableInput
          autoFocus={false}
          value={confirmPassword}
          setValue={setConfirmPassword}
          inputPlaceholder={locales('titles.confirmNewPassword')}
          keyboardType="numeric"
        />
        <Text style={[styles.errorText, invalidFormat && {display: 'flex'}]}>
          {locales('titles.invalidFormat')}
        </Text>
        <Text style={[styles.errorText, passwordMismatch && {display: 'flex'}]}>
          {locales('titles.passwordDoNotMatch')}
        </Text>
        <Text style={[styles.errorText, passwordCharNumb && {display: 'flex'}]}>
          {locales('titles.passwordMustBeAtLeast4Characters')}
        </Text>
      </View>

      <View style={styles.btns}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{
            backgroundColor: '#fff',
            paddingVertical: 16,
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
            borderRadius: 8,
            flexDirection: 'row',
            flex: 1,
          }}>
          <Text
            style={{
              color: '#0B1596',
              fontSize: 16,
              fontWeight: '600',
            }}>
            {locales('titles.cancel')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleUpdatePassword}
          style={{
            backgroundColor: '#0B1596',
            paddingVertical: 16,
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
            borderRadius: 8,
            flexDirection: 'row',
            flex: 1,
          }}>
          <Text
            style={{
              color: '#fff',
              fontSize: 16,
              fontWeight: '600',
            }}>
            {locales('titles.save')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '100%',
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    paddingBottom: 24,
  },
  btns: {
    flexDirection: 'row',
    gap: 16,
  },
  errorText: {
    color: '#E62929',
    fontSize: 13,
    fontWeight: '400',
    display: 'none',
    marginTop: 8,
  },
});
export default EditPassword;
