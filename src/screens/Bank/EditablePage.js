import React, {useContext, useEffect, useState} from 'react';
import {View, Pressable, Text} from 'react-native';
import {StyleSheet} from 'react-native';
import {contextsStore} from '../../contexts';
import FlotableInput from '../../components/FlotableInput';

function EditablePage({navigation}) {
  const {setTabBarBottom} = useContext(contextsStore);
  const [bankName, setBankName] = useState('');
  const [discriptionOfBank, setDiscriptionOfBank] = useState('');
  const [btnOpacity, setBtnOpacity] = useState(true);
  const [errorDisplay, setErrorDisplay] = useState(false);
  const [warnStyle, setWarnStyle] = useState(true);

  useEffect(() => {
    navigation.addListener('focus', () => {
      setTabBarBottom(false);
    });
  }, [navigation]);

  const handleAddBankAccount = () => {
    if (!bankName) {
      setErrorDisplay(true);
      setWarnStyle(false);
      return;
    }
  };

  useEffect(() => {
    if (bankName.length !== 0) {
      setErrorDisplay(false);
      setWarnStyle(true);
      setBtnOpacity(false);
    } else {
      setBtnOpacity(true);
    }
  }, [bankName, discriptionOfBank]);

  return (
    <View style={styles.container}>
      <View>
        <FlotableInput
          borderColor={warnStyle ? '' : '#E62929'}
          value={bankName}
          setValue={setBankName}
          inputPlaceholder={locales('titles.name')}
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
        <FlotableInput
          value={discriptionOfBank}
          setValue={setDiscriptionOfBank}
          inputPlaceholder={locales('titles.discription')}
        />
      </View>

      <View style={styles.rowDir}>
        <Pressable
          onPress={() => {
            navigate('DeleteModal');
          }}
          style={styles.cancelBtn}>
          <Text style={styles.cancelText}>{locales('titles.cancel')}</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            navigate('EditablePage');
          }}
          style={styles.saveBtn}>
          <Text style={styles.saveText}>{locales('titles.save')}</Text>
        </Pressable>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    height: '100%',
    paddingHorizontal: 24,
    paddingBottom: 24,
    justifyContent: 'space-between',
  },
  saveBtn: {
    padding: 16,
    backgroundColor: '#0B1596',
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
  saveText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  cancelText: {
    color: '#0B1596',
    fontWeight: '600',
    fontSize: 16,
  },
  cancelBtn: {
    padding: 16,
    backgroundColor: 'transparent',
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },

  rowDir: {
    flexDirection: 'row',
    marginTop: 40,
  },
});
export default EditablePage;
