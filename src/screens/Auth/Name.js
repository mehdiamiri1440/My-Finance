import React, {useState, useEffect} from 'react';
import FlotableInput from '../../components/FlotableInput';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import database from '../../DB/index.native';
import CustomBtn from '../../components/Button/CustomBtn';

function Name({route}) {
  const {userId} = route.params;
  const {navigate, replace} = useNavigation();
  const [name, setName] = useState('');
  const [btnOpacity, setBtnOpacity] = useState(true);
  const [errorDisplay, setErrorDisplay] = useState(false);
  const [warnStyle, setWarnStyle] = useState(true);
  const [loadingStyle, setLoadingStyle] = useState(false);
  useEffect(() => {
    if (name) {
      setErrorDisplay(false);
      setWarnStyle(true);
      setBtnOpacity(false);
    } else {
      setBtnOpacity(true);
    }
  });

  const handleAddUser = () => {
    setLoadingStyle(true);
    if (!name) {
      setErrorDisplay(true);
      setWarnStyle(false);
      setLoadingStyle(false);
      return;
    }

    database.write(async () => {
      const customer = await database.get('user').find(userId);
      await customer.update(user => {
        user.name = name;
      });
      setTimeout(() => {
        setLoadingStyle(false);
        replace('Home');
      }, 200);
    });
  };
  return (
    <>
      <View style={styles.continer}>
        <View>
          <FlotableInput
            borderColor={warnStyle ? '' : '#E62929'}
            value={name}
            setValue={setName}
            inputPlaceholder={locales('titles.yourName')}
          />
          <Text
            style={{
              marginTop: 8,
              fontSize: 13,
              fontWeight: '400',
              color: '#E62929',
              display: errorDisplay ? 'flex' : 'none',
            }}>
            {locales('titles.nameIsRequired')}
          </Text>
        </View>

        <CustomBtn
          title={locales('titles.submit')}
          btnStyle={!btnOpacity}
          loadingDisplay={loadingStyle}
          onPress={handleAddUser}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  continer: {
    backgroundColor: '#fff',
    height: '100%',
    paddingHorizontal: 24,
    paddingBottom: 24,
    justifyContent: 'space-between',
  },
});

export default Name;
