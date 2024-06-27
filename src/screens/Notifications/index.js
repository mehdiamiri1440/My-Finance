import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import RecivedIcon from '../../assets/svgs/RecivedIcon';
import PayedIcon from '../../assets/svgs/PayedIcon';
import ReportIcon from '../../assets/svgs/ReportIcon';
import NotifeReportIcon from '../../assets/svgs/NotifeReportIcon';
import ArrowForwardIcon from '../../assets/svgs/ArrowForwardIcon';
import GiftIcon from '../../assets/svgs/GiftIcon';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Notifications() {
  const [message, setMessage] = useState([]);

  useEffect(() => {
    fetchLastReceivedMessage();
  }, []);

  const fetchLastReceivedMessage = async () => {
    const message = await AsyncStorage.getItem('lastReceivedMessage');
    setMessage(JSON.parse(message));
  };

  console.log(message);
  return (
    <View style={styles.cnotainer}>
      <View
        style={{
          alignItems: 'center',
          display: message ? 'none' : 'flex',
          marginTop: '30%',
        }}>
        <Image source={require('../../assets/img/Notifications.png')} />
        <Text style={styles.nonNotice}>No Notice</Text>
      </View>

      <View style={{display: message ? 'flex' : 'none'}}>
        <View style={styles.card}>
          <View style={styles.date}>
            <Text style={styles.dateText}>Apr 12</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={styles.iconView}>
                <PayedIcon />
              </View>
              <Text style={styles.customerMessageText}>Nothing</Text>
            </View>

            <Text style={styles.clock}>23:59</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.date}>
            <Text style={styles.dateText}>Apr 11</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
              <NotifeReportIcon />
              <Text style={styles.customerMessageText}>
                Your monthly subscription has expired
              </Text>
            </View>

            <Text style={styles.clock}>23:59</Text>
          </View>
          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
            <Text
              style={{
                color: '#0B1596',
                fontSize: 14,
                fontWeight: '600',
                marginRight: 8,
              }}>
              Renew
            </Text>
            <ArrowForwardIcon fill={'#0B1596'} />
          </View>
          <View style={styles.line}></View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{flexDirection: 'row', gap: 8}}>
              <GiftIcon />
              <Text style={styles.customerMessageText}>
                Your gift subscription hast {'\n'} sterted for 14 days
              </Text>
            </View>

            <Text style={styles.clock}>23:59</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  cnotainer: {
    backgroundColor: '#FFFFFF',
    height: '100%',
    flex: 1,
    paddingHorizontal: 16,
  },
  nonNotice: {
    color: '#01020D',
    fontWeight: '500',
    fontSize: 14,
    marginTop: 50,
  },
  card: {
    elevation: 1,
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
  },
  iconView: {
    backgroundColor: 'rgba(230, 41, 41, 0.1);',
    borderRadius: 8,
    padding: 6,
    marginRight: 8,
  },
  customerMessageText: {
    color: '#01020D',
    fontWeight: '500',
    fontSize: 14,
  },
  clock: {
    fontWeight: '400',
    fontSize: 14,
    color: '#9B9B9B',
  },
  date: {
    backgroundColor: '#F8F9F9',
    padding: 8,
    marginBottom: 16,
  },
  dateText: {
    color: '#01020D',
    fontSize: 13,
    fontWeight: '600',
  },
  line: {
    height: 1,
    backgroundColor: '#D9D9D9',
    marginVertical: 16,
  },
});

export default Notifications;
