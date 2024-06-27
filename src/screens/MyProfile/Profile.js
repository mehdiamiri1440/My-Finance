import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Pressable,
  ToastAndroid,
} from 'react-native';
import UserProfileIcon from '../../assets/svgs/UserProfileIcon';
import CallIcon from '../../assets/svgs/CallIcon';
import UserCardIcon from '../../assets/svgs/UserCardIcon';
import {contextsStore} from '../../contexts';
import database from '../../DB/index.native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FlotableInput from '../../components/FlotableInput';
import BackIcon from '../../assets/svgs/BackIcon';

function Profile({navigation, route}) {
  const {setTabBarBottom} = useContext(contextsStore);
  const [userInfo, setUserInfo] = useState([]);
  const [editUserModalVisibility, setEditUserModalVisibility] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [creditCard, setCreditCard] = useState('');
  const [errorStyle, setErrorStyle] = useState(false);

  useEffect(() => {
    navigation.addListener('focus', () => {
      setTabBarBottom(false);
      fetchUserInfo();
    });
  }, []);

  const fetchUserInfo = async () => {
    const userId = await AsyncStorage.getItem('userId');
    const userDetails = await database.collections
      .get('user')
      .find(userId)
      .then(res => {
        setUserInfo(res._raw);
        setName(res._raw.name);
        setPhone(res._raw.phone);
        setCreditCard(res._raw.iban);
      });
  };

  const handleUpdateUser = () => {
    if (!name) {
      setErrorStyle(true);
      return;
    }

    database.write(async () => {
      const userId = await AsyncStorage.getItem('userId');
      const userAccount = await database.collections.get('user').find(userId);
      await userAccount
        .update(userDetails => {
          userDetails._raw.name = name;
          userDetails._raw.iban = +creditCard;
        })
        .then(res => {
          fetchUserInfo();
          setEditUserModalVisibility(false);
        });
    });
  };
  const editUserModal = () => (
    <Modal
      visible={editUserModalVisibility}
      onDismiss={_ => setEditUserModalVisibility(false)}
      animationType="fade"
      onRequestClose={_ => setEditUserModalVisibility(false)}>
      <View style={styles.container}>
        <View>
          <View
            style={{
              backgroundColor: '#0B1596',
              padding: 16,
              flexDirection: 'row',
              gap: 16,
            }}>
            <BackIcon
              onPress={() => {
                setEditUserModalVisibility(false);
              }}
            />
            <Text style={{fontSize: 18, fontWeight: '600', color: '#fff'}}>
              {locales('titles.editProfile')}
            </Text>
          </View>
          <View style={{paddingHorizontal: 24}}>
            <FlotableInput
              borderColor={!errorStyle ? '' : '#E62929'}
              value={name}
              setValue={setName}
              inputPlaceholder={locales('titles.name')}
            />
            <Text
              style={{
                display: errorStyle ? 'flex' : 'none',
                fontSize: 13,
                fontWeight: '400',
                color: '#E62929',
                alignItems: 'center',
              }}>
              {locales('titles.thisFieldCanNotBeEmpty')}
            </Text>
            <FlotableInput
              onPress={() => {
                ToastAndroid.show(
                  locales('titles.youCanNotEditYourPhoneNumber'),
                  ToastAndroid.SHORT,
                );
              }}
              inputStyle={{borderColor: '#dedede'}}
              editable={false}
              value={phone}
              setValue={setPhone}
              inputPlaceholder={locales('titles.phone')}
              keyboardType="numeric"
            />
            <FlotableInput
              autoFocus={false}
              value={creditCard
                ?.toString()
                .replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, '$1 $2 $3 $4')}
              setValue={setCreditCard}
              inputPlaceholder={locales('titles.creditCard')}
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={styles.btns}>
          <TouchableOpacity
            onPress={() => {
              setEditUserModalVisibility(false);
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
            onPress={handleUpdateUser}
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
    </Modal>
  );

  return (
    <>
      {editUserModal()}
      <View
        style={{
          backgroundColor: '#fff',
          height: '100%',
          padding: 16,
          justifyContent: 'space-between',
        }}>
        <View style={styles.mainView}>
          <View style={styles.name}>
            <View style={styles.iconView}>
              <UserProfileIcon />
            </View>
            <View>
              <Text style={styles.headerText}>{locales('titles.name')}</Text>
              <Text style={styles.subHeaderText}>{userInfo.name}</Text>
            </View>
          </View>
          <View style={styles.phone}>
            <View style={styles.iconView}>
              <CallIcon fill={'#0B1596'} />
            </View>
            <View>
              <Text style={styles.headerText}>{locales('titles.phone')}</Text>
              <Text
                style={[
                  styles.subHeaderText,
                  {color: 'rgba(155, 155, 155, 1)'},
                ]}>
                {userInfo.phone?.toString().substr(0, 3)}{' '}
                <Text style={styles.subHeaderText}>
                  {userInfo.phone?.toString().substr(3, 11)}
                </Text>
              </Text>
            </View>
          </View>
          <View style={styles.creditCard}>
            <View style={styles.iconView}>
              <UserCardIcon />
            </View>
            <View>
              <Text style={styles.headerText}>
                {' '}
                {locales('titles.creditCard')}
              </Text>
              <Text style={styles.subHeaderText}>
                {userInfo.iban
                  ?.toString()
                  .replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, '$1 $2 $3 $4')}
              </Text>
            </View>
          </View>
        </View>

        <Pressable
          onPress={() => {
            setEditUserModalVisibility(true);
          }}
          style={{
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
            {locales('titles.edit')}
          </Text>
        </Pressable>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  mainView: {
    padding: 16,
    elevation: 2,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  name: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  phone: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  creditCard: {
    flexDirection: 'row',
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
  iconView: {
    backgroundColor: 'rgba(11, 21, 150, 0.09);',
    padding: 10,
    borderRadius: 8,
    marginRight: 8,
  },
  container: {
    backgroundColor: '#fff',
    height: '100%',
    justifyContent: 'space-between',
    paddingBottom: 24,
  },
  btns: {
    flexDirection: 'row',
    gap: 16,
    marginHorizontal: 24,
  },
});
export default Profile;
