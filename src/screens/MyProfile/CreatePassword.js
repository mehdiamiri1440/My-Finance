import React, {useEffect, useState, useContext} from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';

import FlotableInput from '../../components/FlotableInput';
import database from '../../DB/index.native';
import {contextsStore} from '../../contexts';

const newPasswordRegex = /^[0-9]+$/;

function CreatePassword({navigation, route}) {
  const {userPass, setUserPass} = useContext(contextsStore);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [btnOpacity, setBtnOpacity] = useState(true);
  const [invalidFormat, setInvalidFormat] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [passwordCharNumb, setPasswordCharNumb] = useState(false);
  const [warnStyle, setWarnStyle] = useState(true);
  const {userId} = route.params;
  const handleNewPassword = () => {
    if (
      !newPasswordRegex.test(newPassword) ||
      !newPasswordRegex.test(confirmPassword)
    ) {
      setInvalidFormat(true);
      setWarnStyle(false);
      setPasswordMismatch(false);
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
    if (newPassword.length > 0 || confirmPassword.length > 0) {
      setBtnOpacity(false);
      setInvalidFormat(false);
      setPasswordMismatch(false);
      setWarnStyle(true);
      setPasswordCharNumb(false);
    }else{
      setBtnOpacity(true);
    }
  }, [newPassword, confirmPassword]);

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
          borderColor={warnStyle ? '' : '#E62929'}
          keyboardType="numeric"
          value={newPassword}
          setValue={setNewPassword}
          inputPlaceholder={locales('titles.newPassword')}
        />
        <FlotableInput
          borderColor={warnStyle ? '' : '#E62929'}
          keyboardType="numeric"
          value={confirmPassword}
          setValue={setConfirmPassword}
          inputPlaceholder={locales('titles.confirmNewPassword')}
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

      <TouchableOpacity
        onPress={handleNewPassword}
        style={[
          styles.submitButton,
          {backgroundColor: btnOpacity ? 'rgba(1, 2, 13, 0.09)' : '#0B1596'},
        ]}>
        <Text
          style={[
            styles.submitButtonText,
            {color: btnOpacity ? '#9B9B9B' : '#fff'},
          ]}>
          {locales('titles.submit')}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '100%',
    paddingHorizontal: 24,
    paddingBottom: 24,
    justifyContent: 'space-between',
  },
  errorText: {
    color: '#E62929',
    fontSize: 13,
    fontWeight: '400',
    display: 'none',
    marginTop: 8,
  },
  submitButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(1, 2, 13, 0.09)',
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 16,
    marginTop: 24,
  },
  submitButtonText: {
    color: '#9B9B9B',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CreatePassword;
