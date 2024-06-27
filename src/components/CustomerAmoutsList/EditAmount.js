import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';
import {contextsStore} from '../../contexts';
import BackIcon from '../../assets/svgs/BackIcon';
import {StyleSheet} from 'react-native';
import ExclamitionIcon from '../../assets/svgs/ExclamitionIcon';
import Keypad from '../Calculator/index';
import DescriptionIcon from '../../assets/svgs/DescriptionIcon';
import CalenderIcon from '../../assets/svgs/CalenderIcon';
import ClockIcon from '../../assets/svgs/ClockIcon';
import CameraIcon from '../../assets/svgs/CameraIcon';
import {SheetManager} from 'react-native-actions-sheet';
import database from '../../DB/index.native';
import {field} from '@nozbe/watermelondb/decorators';
import {Q} from '@nozbe/watermelondb';

function EditAmount({navigation, route}) {
  const {
    customerName,
    firstNumber,
    setFirstNumber,
    secondNumber,
    operation,
    desData,
    setDesData,
  } = useContext(contextsStore);
  const [calenderDisplay, setCalenderDisplay] = useState(false);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState(new Date());
  const [timeOpen, setTimeOpen] = useState(false);
  const [amountInfo, setAmountInfo] = useState(null);
  const {amountId} = route.params;

  useEffect(() => {
    async function loadinfo() {
      const customer = await database.get('customerdebt').find(amountId);
      setFirstNumber(customer?.amount);
      setDesData(customer?.decription);
      setAmountInfo(customer);
    }
    loadinfo();
  }, [amountId]);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <BackIcon
          style={{marginRight: 32}}
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
      headerTitle: () => (
        <>
          <View style={{display: 'flex', flexDirection: 'column'}}>
            <Text style={{color: '#fff', fontSize: 20}}>Edit amount</Text>
            <Text style={{color: '#fff', fontSize: 10, marginTop: 4}}>
              {customerName}
            </Text>
          </View>
        </>
      ),
    });
  }, [navigation]);

  const handleCustomerData = () => {
    database.write(async () => {
      const customer = await database.get('customerdebt').find(amountId);
      await customer.update(amount => {
        amount.decription = desData;
        amount.amount = +firstNumber;
        amount.date_at = date.toUTCString().substr(0, 16);
      });
      setFirstNumber('');
      setDate('');
      setDate(new Date());
    });

    navigation.goBack();
  };

  const handleDeleteAmount = async () => {
    database.write(async () => {
      const amount = await database.collections
        .get('customerdebt')
        .find(amountId);
      amount.destroyPermanently();
    });
    navigation.goBack();
  };

  return (
    <>
      <TouchableWithoutFeedback
        onPress={() => {
          setCalenderDisplay(false);
        }}>
        <View style={{flex: 1, justifyContent: 'space-between'}}>
          <View>
            <TouchableWithoutFeedback
              onPress={() => {
                setCalenderDisplay(!calenderDisplay);
              }}>
              <View
                style={[
                  styles.amount,
                  {
                    borderTopColor: amountInfo?.color,
                  },
                ]}>
                <Text
                  style={{color: '#E13545', fontWeight: 'bold', fontSize: 18}}>
                  {firstNumber !== '' ? (
                    <>
                      <Text>{secondNumber}</Text>
                      <Text>{firstNumber}</Text>
                    </>
                  ) : (
                    <Text>0</Text>
                  )}
                </Text>
              </View>
            </TouchableWithoutFeedback>

            <Text style={{marginLeft: 16, fontSize: 12}}>
              {firstNumber?.length > 0 ? (
                <>
                  <Text>{secondNumber}</Text>
                  <Text>{operation}</Text>
                  <Text>{firstNumber}</Text>
                </>
              ) : (
                <Text>0</Text>
              )}
            </Text>

            <View style={styles.bar}>
              <ExclamitionIcon fill="#868C9C" />
              <Text style={{fontSize: 16, marginLeft: 16}}>
                your balance account is :{' '}
                <Text style={{color: '#E13545'}}> 32,225,334 </Text>
              </Text>
            </View>

            <View>
              <View style={{backgroundColor: '#fff'}}>
                <View style={styles.dcci}>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <DescriptionIcon />
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        marginLeft: 16,
                      }}>
                      <Text style={{color: '#212121'}}>Decription</Text>
                      <Text>{desData}</Text>
                    </View>
                  </View>
                  <TouchableWithoutFeedback
                    onPress={() => {
                      SheetManager.show('addingExplaintion', {
                        payload: {
                          value: 'Adding Description',
                          data: 'Description',
                        },
                      });
                    }}>
                    <Text style={styles.btn}>Add</Text>
                  </TouchableWithoutFeedback>
                </View>
                <View style={styles.line}></View>
              </View>

              <View style={{backgroundColor: '#fff'}}>
                <View style={styles.dcci}>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <CalenderIcon />
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        marginLeft: 16,
                      }}>
                      <Text style={{color: '#212121'}}>Calender</Text>
                      <Text>{date.toUTCString().substr(0, 16)}</Text>
                    </View>
                  </View>
                  <TouchableWithoutFeedback
                    onPress={() => {
                      setOpen(true);
                    }}>
                    <Text style={styles.btn}>Change</Text>
                  </TouchableWithoutFeedback>
                </View>
                <View style={styles.line}></View>
              </View>

              <View style={{backgroundColor: '#fff'}}>
                <View style={styles.dcci}>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <ClockIcon />
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        marginLeft: 16,
                      }}>
                      <Text style={{color: '#212121'}}>Clock</Text>
                      <Text>{time.toLocaleTimeString()}</Text>
                    </View>
                  </View>
                  <TouchableWithoutFeedback
                    onPress={() => {
                      setTimeOpen(true);
                    }}>
                    <Text style={styles.btn}>Change</Text>
                  </TouchableWithoutFeedback>
                </View>
                <View style={styles.line}></View>
              </View>

              <View style={{backgroundColor: '#fff'}}>
                <View style={styles.dcci}>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <CameraIcon />
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        marginLeft: 16,
                      }}>
                      <Text style={{color: '#212121'}}>Clock</Text>
                      <Text>sasa</Text>
                    </View>
                  </View>
                  <Text style={styles.btn}>Attach</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity onPress={handleDeleteAmount}>
              <View style={[styles.dcci, {marginTop: 24}]}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: 'bold',
                    color: '#E13545',
                    marginLeft: 40,
                  }}>
                  Delete amount
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={[styles.dcci, {marginTop: 24}]}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: 'bold',
                    color: '#152F8C',
                    marginLeft: 40,
                  }}>
                  Share
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={handleCustomerData}
            style={[styles.registerBtn, {backgroundColor: amountInfo?.color}]}>
            <Text style={{color: '#fff'}}>Save changes</Text>
          </TouchableOpacity>
          <View
            style={{
              display: calenderDisplay ? 'flex' : 'none',
              position: 'absolute',
              top: '72%',
            }}>
            <Keypad />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
}

const styles = StyleSheet.create({
  amount: {
    backgroundColor: '#fff',
    width: '92%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopColor: '#E13545',
    borderTopWidth: 5,
    alignSelf: 'center',
    marginTop: 16,
    paddingVertical: 12,
  },
  bar: {
    backgroundColor: '#D2D5DE',
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  dcci: {
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  line: {
    backgroundColor: '#b7b7b7',
    height: 1,
    width: '85%',
    alignSelf: 'flex-end',
  },
  btn: {
    color: '#152F8C',
    fontWeight: 'bold',
  },
  registerBtn: {
    backgroundColor: '#E13545',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    marginHorizontal: 16,
    borderRadius: 5,
    marginBottom: 12,
  },
});
export default EditAmount;
