import React, {useState} from 'react';
import {View, StyleSheet, Text, Image, ToastAndroid} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import CustomBtn from '../Button/CustomBtn';

function InternetConnection({navigation}) {
  const [loadingDisplay, setLoadingDisplay] = useState(false);

  const retryTheConnection = () => {
    setLoadingDisplay(true);
    setTimeout(() => {
      NetInfo.fetch().then(state => {
        console.log(state);
        if (state.isConnected) {
          navigation.replace('Auth');
          setLoadingDisplay(false);
        } else {
          ToastAndroid.show('No internet connection.', ToastAndroid.SHORT);
          setLoadingDisplay(false);
        }
      });
    }, 500);
  };

  return (
    <View style={styles.cnotainer}>
      <View style={{alignItems: 'center', display: 'flex', marginTop: '30%'}}>
        <Image source={require('../../assets/img/ConnectionLost.png')} />
        <Text style={styles.notFound}>
          {locales('titles.NoInternetConnection')}
        </Text>
      </View>
      <CustomBtn
        style={{paddingHorizontal: 50, margin: 24}}
        title={locales('titles.retry')}
        onPress={retryTheConnection}
        btnStyle={true}
        loadingDisplay={loadingDisplay}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  cnotainer: {
    backgroundColor: '#FFFFFF',
    height: '100%',
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  notFound: {
    textAlign: 'center',
    color: '#01020D',
    fontWeight: '500',
    fontSize: 14,
    marginTop: 50,
  },
});
export default InternetConnection;
