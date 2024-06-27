import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useContext} from 'react';
import {contextsStore} from '../../contexts';
import {useNavigation, useNavigationState} from '@react-navigation/native';

function DeleteImageModal({navigation, route}) {
  const {addListener, goBack, reset} = useNavigation();

  const {setTabBarBottom, setImageSrc} = useContext(contextsStore);
  const [pageName, setPageName] = useState('');
  const routesName = useNavigationState(state => state.routes[2].name);
  useEffect(() => {
    addListener('focus', () => {
      setTabBarBottom(false);
    });
  }, [navigation]);
  const handleYesBtn = () => {
    goBack();
    goBack();
    setImageSrc('');
  };
  const handleNoClick = () => {
    goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainView}>
        <Text style={styles.headerText}>
          {locales('titles.deleteThisImage')}
        </Text>
        <View style={styles.line}></View>
        <Text style={styles.message}>
          {locales('titles.areYouSureYouWantToDeleteThisImage')}
        </Text>
        <View style={styles.rowDir}>
          <TouchableOpacity onPress={handleYesBtn} style={styles.yesBtn}>
            <Text style={styles.yesText}>{locales('titles.yes')}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNoClick} style={styles.noBtn}>
            <Text style={styles.noText}>{locales('titles.no')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
  line: {
    backgroundColor: '#D9D9D9',
    height: 1,
    marginVertical: 16,
  },
  rowDir: {
    flexDirection: 'row',
  },
});
export default DeleteImageModal;
