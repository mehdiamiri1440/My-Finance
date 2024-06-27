import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import FlotableInput from '../../components/FlotableInput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import database from '../../DB/index.native';
import {contextsStore} from '../../contexts';
import DropDownIcon from '../../assets/svgs/DropDownIcon';
import {lan} from '../../../Register';

function EditLanguage(props) {
  const {
    userName,
    userPhone,
    userIban,
    setUserIban,
    setUserName,
    setUserPhone,
    setTabBarBottom,
    setLanguage,
  } = useContext(contextsStore);
  const [languages, setLanguages] = useState('');
  const [chosedItem, setChosedItem] = useState('');
  const [showUnitList, setShowUnitList] = useState(false);
  const [originalProps, setOriginalProps] = useState(props);
  const [originalState, setOriginalState] = useState({
    languages: languages,
    chosedItem: chosedItem,
  });
  const {userId} = props.route.params;

  useEffect(() => {
    database.collections
      .get('user')
      .find(userId)
      .then(user => {
        setLanguages(user.languages);
        if (user.languages) {
          setChosedItem(user.languages);
        } else {
          setLanguages('English');
          setChosedItem('English');
        }
      });
  }, []);

  const handleSaveLanguages = () => {
    if (chosedItem !== languages) {
      if (chosedItem === 'English') {
        AsyncStorage.setItem('language', 'English');
        setLanguage('en-us');
      } else if (chosedItem === 'Catalan') {
        AsyncStorage.setItem('language', 'Catalan');
        setLanguage('ca-sp');
      } else if (chosedItem === 'Spanish') {
        AsyncStorage.setItem('language', 'Spanish');
        setLanguage('es-sp');
      }
      database.write(async () => {
        const user = await database.get('user').find(userId);
        await user.update(user => {
          user.languages = chosedItem;
        });
      });
      props.navigation.goBack();
    } else {
    }
  };
  useEffect(() => {
    props.navigation.addListener('focus', () => {
      setTabBarBottom(false);
    });
  }, [props.navigation]);

  const CurrencyValue = [
    {name: 'English'},
    {name: 'Catalan'},
    {name: 'Spanish'},
  ];
  useEffect(() => {
    if (chosedItem === null) {
      setChosedItem('English');
    }
  }, []);
  return (
    <View style={styles.container}>
      <View>
        <FlotableInput
          autoFocus={false}
          onPress={() => {
            setShowUnitList(!showUnitList);
          }}
          editable={false}
          value={chosedItem}
          setValue={setLanguages}
          inputPlaceholder={locales('titles.language')}
          keyboardType="numeric">
          <DropDownIcon style={{marginRight: 16}} />
        </FlotableInput>

        <FlatList
          data={CurrencyValue}
          style={{
            backgroundColor: '#fff',
            width: '100%',
            elevation: 1,
            padding: 4,
            marginTop: 16,
            display: showUnitList ? 'flex' : 'none',
          }}
          renderItem={item => (
            <TouchableWithoutFeedback
              onPress={() => {
                setShowUnitList(false);
                setChosedItem(item.item.name);
              }}>
              <View style={{padding: 8}}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '400',
                    color: item.item.name === languages ? '#2E5BFF' : '#01020D',
                  }}>
                  {item.item.name}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          )}
        />
      </View>

      <View style={styles.btns}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.goBack();
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
          onPress={handleSaveLanguages}
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
});
export default EditLanguage;
