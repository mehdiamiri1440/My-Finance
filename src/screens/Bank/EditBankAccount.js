import React, {useContext, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Pressable,
  Modal,
} from 'react-native';
import {contextsStore} from '../../contexts';
import BankNameIcon from '../../assets/svgs/BankNameIcon';
import BankDesIcon from '../../assets/svgs/BankDesIcon';
import NotifIcon from '../../assets/svgs/NotifIcon';
import NotifPageIcon from '../../assets/svgs/NotifPageIcon';
import database from '../../DB/index.native';
import BackIcon from '../../assets/svgs/BackIcon';
import FlotableInput from '../../components/FlotableInput';

function EditBankAccount({route, navigation}) {
  const {setTabBarBottom} = useContext(contextsStore);
  const {addListener, setOptions, navigate, goBack, replace} = useNavigation();
  const {bankAccountId} = route.params;
  const [bankAccountDetails, setbBankAccountDetails] = useState({});
  const [warnStyle, setWarnStyle] = useState(true);
  const [bankName, setBankName] = useState('');
  const [bankdescription, setBankdescription] = useState('');
  const [btnOpacity, setBtnOpacity] = useState(false);
  const [errorDisplay, setErrorDisplay] = useState(false);

  const [deleteBankModalVisibility, setDeleteBankModalVisibility] =
    useState(false);
  const [editBankModalVisibility, setEditBankModalVisibility] = useState(false);

  useEffect(() => {
    addListener('focus', () => {
      fetchBanlAccountDetail();
      setTabBarBottom(false);
    });
    setOptions({
      headerRight: () => (
        <Pressable style={{padding: 16}}>
          <NotifPageIcon
            onPress={() => {
              navigate('Notifications');
            }}
          />
        </Pressable>
      ),
      headerLeft: () => (
        <Pressable style={{padding: 16}}>
          <BackIcon
            onPress={() => {
              goBack();
              goBack();
            }}
          />
        </Pressable>
      ),
    });
  }, []);

  const fetchBanlAccountDetail = () => {
    database.collections
      .get('bank_accounts')
      .find(bankAccountId)
      .then(res => {
        setbBankAccountDetails(res._raw);
        setBankName(res._raw.name);
        setBankdescription(res._raw.description);
      });
  };

  const handleBackButton = () => {
    setEditBankModalVisibility(false);
  };
  const handleSubmitBtn = () => {
    if (bankName.length === 0) {
      setErrorDisplay(true);
      setWarnStyle(false);
      return;
    }
    database.write(async () => {
      const bankAccount = await database.collections
        .get('bank_accounts')
        .find(bankAccountId);
      await bankAccount
        .update(bankAccountDetails => {
          bankAccountDetails._raw.name = bankName;
          bankAccountDetails._raw.description = bankdescription;
        })
        .then(res => {
          fetchBanlAccountDetail();
          setEditBankModalVisibility(false);
        });
    });
  };

  const onNameChanged = text => {
    setBankName(text);
    if (text.length !== 0) {
      setBtnOpacity(true);
      setErrorDisplay(false);
      setWarnStyle(true);
    } else {
      setBtnOpacity(false);
    }
  };
  const EditBankModal = () => (
    <Modal
      visible={editBankModalVisibility}
      onDismiss={_ => setEditBankModalVisibility(false)}
      animationType="fade"
      onRequestClose={_ => setEditBankModalVisibility(false)}>
      <View
        style={{
          height: '100%',
          justifyContent: 'space-between',
          paddingBottom: 24,
        }}>
        <View>
          <View
            style={{
              backgroundColor: '#0B1596',
              padding: 16,
              flexDirection: 'row',
              gap: 16,
            }}>
            <BackIcon onPress={handleBackButton} />
            <Text style={{fontSize: 18, fontWeight: '600', color: '#fff'}}>
              {locales('titles.editBankAccount')}
            </Text>
          </View>
          <View style={{paddingHorizontal: 24}}>
            <FlotableInput
              autoFocus={true}
              borderColor={warnStyle ? '' : '#E62929'}
              value={bankName}
              setValue={onNameChanged}
              inputPlaceholder={locales('titles.name')}></FlotableInput>
            <Text
              style={{
                fontSize: 13,
                fontWeight: '400',
                color: '#E62929',
                display: errorDisplay ? 'flex' : 'none',
              }}>
              {' '}
              Name is required
            </Text>

            <FlotableInput
              autoFocus={false}
              keyboardType="numeric"
              value={bankdescription}
              setValue={setBankdescription}
              inputPlaceholder={locales('titles.description')}
            />
          </View>
        </View>

        <Pressable
          onPress={handleSubmitBtn}
          style={[
            styles.btnStyle2,
            {backgroundColor: '#0B1596', marginHorizontal: 24},
          ]}>
          <Text style={[styles.btnTextStyle, {color: '#fff'}]}>
            {locales('titles.submit')}
          </Text>
        </Pressable>
      </View>
    </Modal>
  );

  const handleYesBtn = async () => {
    setDeleteBankModalVisibility(false);
    const bankAccount = await database.collections
      .get('bank_accounts')
      .find(bankAccountId);
    database.write(async _ => {
      await bankAccount.destroyPermanently();
      goBack();
      goBack();
    });
    return;
  };
  const deleteBankModal = () => (
    <Modal
      transparent
      visible={deleteBankModalVisibility}
      onDismiss={_ => setDeleteBankModalVisibility(false)}
      animationType="fade"
      onRequestClose={_ => setDeleteBankModalVisibility(false)}>
      <Pressable
        onPress={() => {
          setDeleteBankModalVisibility(false);
        }}
        style={styles.modalContainer}>
        <View style={styles.mainView}>
          <Text style={styles.headerText}>
            {locales('titles.deleteTheUser')}
          </Text>
          <View style={styles.line}></View>
          <Text style={styles.message}>
            {locales('titles.areYouSureYouWantToDeleteThisUser')}
          </Text>
          <View style={styles.modalrowDir}>
            <Pressable onPress={handleYesBtn} style={styles.yesBtn}>
              <Text style={styles.yesText}>{locales('titles.yes')}</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                setDeleteBankModalVisibility(false);
              }}
              style={styles.noBtn}>
              <Text style={styles.noText}>{locales('titles.no')}</Text>
            </Pressable>
          </View>
        </View>
      </Pressable>
    </Modal>
  );

  return (
    <>
      {deleteBankModal()}
      {EditBankModal()}
      <View style={styles.continer}>
        <View style={styles.infoCard}>
          <View
            style={[
              styles.nameDes,
              {
                marginBottom: 24,
              },
            ]}>
            <View style={styles.iconView}>
              <BankNameIcon />
            </View>
            <View>
              <Text style={styles.titleText}>{locales('titles.name')}</Text>
              <Text style={styles.subTitleText}>{bankAccountDetails.name}</Text>
            </View>
          </View>
          <View style={styles.nameDes}>
            <View style={styles.iconView}>
              <BankDesIcon />
            </View>
            <View>
              <Text style={styles.titleText}>
                {locales('titles.discription')}
              </Text>
              <Text style={styles.subTitleText}>
                {bankAccountDetails.description}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.rowDir}>
          <Pressable
            onPress={() => {
              setDeleteBankModalVisibility(true);
            }}
            style={styles.yesBtn}>
            <Text style={styles.yesText}>{locales('titles.delete')}</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setEditBankModalVisibility(true);
            }}
            style={styles.noBtn}>
            <Text style={styles.noText}>{locales('titles.edit')}</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  continer: {
    backgroundColor: '#ffffff',
    height: '100%',
    padding: 16,
  },
  btnStyle2: {
    backgroundColor: 'transparent',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    padding: 16,
  },
  infoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    elevation: 2,
    padding: 16,
  },
  iconView: {
    borderRadius: 8,
    padding: 10,
    backgroundColor: 'rgba(250, 180, 70, 0.17)',
  },
  titleText: {
    color: '#9B9B9B',
    fontSize: 14,
    fontWeight: '400',
  },
  subTitleText: {
    color: '#01020D',
    fontSize: 18,
    fontWeight: '600',
  },
  nameDes: {
    flexDirection: 'row',
    gap: 8,
  },
  noBtn: {
    padding: 16,
    backgroundColor: '#0B1596',
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
  noText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  yesText: {
    color: '#E52929',
    fontWeight: '600',
    fontSize: 16,
  },
  yesBtn: {
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

  modalContainer: {
    paddingHorizontal: 37,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    backgroundColor: 'rgba(1, 2, 13, 0.2)',
  },
  mainView: {
    padding: 24,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 1,
  },
  headerText: {
    color: '#01020D',
    fontWeight: '700',
    fontSize: 18,
  },
  message: {
    color: '#17191C',
    fontWeight: '400',
    fontSize: 16,
    marginBottom: 16,
  },

  line: {
    backgroundColor: '#D9D9D9',
    height: 1,
    marginVertical: 16,
  },
  modalrowDir: {
    flexDirection: 'row',
  },
});

export default EditBankAccount;
