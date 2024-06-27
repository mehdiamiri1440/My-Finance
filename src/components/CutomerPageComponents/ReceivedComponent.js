import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  TouchableWithoutFeedback,
  Switch,
} from 'react-native';
import {contextsStore} from '../../contexts';
import BackIcon from '../../assets/svgs/BackIcon';
import {StyleSheet, Image} from 'react-native';
import CalenderIcon from '../../assets/svgs/CalenderIcon';
import ClockIcon from '../../assets/svgs/ClockIcon';
import {SheetManager} from 'react-native-actions-sheet';
import database from '../../DB/index.native';
import EuroIcon from './../../assets/svgs/EuroIcon';
import CalculatorIcon from './../../assets/svgs/CalculatorIcon';
import FlotableInput from '../FlotableInput';
import ImageIcon from './../../assets/svgs/ImageIcon';
import ViewIcon from './../../assets/svgs/ViewIcon';
import DeleteImageIcon from './../../assets/svgs/DeleteImageIcon';
import DateTimePicker from '@react-native-community/datetimepicker';

function ReceivedComponent({navigation, route}) {
  const {
    firstNumber,
    setFirstNumber,
    secondNumber,
    operation,
    desData,
    setDesData,
    result,
    setResult,
    expression,
    setExpression,
    imageSrc,
    setImageSrc,
  } = useContext(contextsStore);
  const [calenderDisplay, setCalenderDisplay] = useState(false);
  const [date, setDate] = useState(new Date());
  const [dateDisplay, setDateDisplay] = useState(false);
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState(new Date());
  const [timeDisplay, setTimeDisplay] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  const [timeOpen, setTimeOpen] = useState(false);
  const [euCal, setEuCal] = useState(false);
  const [description, setDescription] = useState('');

  const {customerID, customerName} = route.params;
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <BackIcon
          style={{marginHorizontal: 16}}
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
      headerTitle: () => (
        <>
          <View style={{display: 'flex', flexDirection: 'column'}}>
            <Text style={{color: '#fff', fontSize: 20}}>New amount</Text>
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
      const newCustomer = await database.collections
        .get('customerdebt')
        .create(res => {
          res.decription = description;
          res.amount = +result;
          res._raw.date_at = date;
          res.color = '#168b22';
          res.fillcolor = '#E2FCDF';
          res.is_debt = true;
          res._raw.is_debt = true;
          res._raw.customers_id = customerID;
        });
      setResult('');
      setExpression('');
      setDescription('');
      setDate(new Date());
      setImageSrc('');
      setDescription('');
    });
    navigation.goBack();
  };

  useEffect(() => {
    if (expression.length > 0) {
      setEuCal(true);
    } else {
      setEuCal(false);
    }
  }, [expression]);

  const requestImagePermission = async () => {
    SheetManager.show('choseImage');
  };

  return (
    <>
      <TouchableWithoutFeedback
        onPress={() => {
          setCalenderDisplay(false);
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
            backgroundColor: '#fff',
          }}>
          <View>
            <TouchableWithoutFeedback
              onPress={() => {
                SheetManager.show('calculator');
              }}>
              <View
                style={{
                  marginTop: 24,
                  paddingHorizontal: 24,
                  paddingVertical: 20.5,
                  backgroundColor: 'rgba(248, 248, 248, 1)',
                  borderTopWidth: 1,
                  borderTopColor: 'rgba(11, 21, 150, 1)',
                  borderBottomWidth: 1,
                  borderBottomColor: 'rgba(11, 21, 150, 1)',
                  marginBottom: 16,
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View>
                  <Text
                    style={{color: '#0B1596', fontSize: 13, fontWeight: '500'}}>
                    {expression}
                  </Text>
                  <Text
                    style={{color: '#01020D', fontSize: 18, fontWeight: '600'}}>
                    {result ? result : '0'}
                  </Text>
                </View>

                <EuroIcon style={{display: euCal ? 'flex' : 'none'}} />
                <CalculatorIcon style={{display: euCal ? 'none' : 'flex'}} />
              </View>
            </TouchableWithoutFeedback>
            <View style={styles.bar}>
              <Text style={{fontSize: 14, fontWeight: '400', color: '#01020D'}}>
                {locales('titles.yourBalanceAccount')}
              </Text>
              <Text style={{color: '#0B1596', fontSize: 14, fontWeight: '600'}}>
                {' '}
                987,667,876 €{' '}
              </Text>
            </View>

            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                paddingHorizontal: 24,
              }}>
              <View style={{flex: 1, marginRight: 16}}>
                <FlotableInput
                  editable={false}
                  onPress={() => {
                    setDateDisplay(true);
                  }}
                  value={`${date.getDate()} / ${
                    date.getMonth() + 1
                  } / ${date.getFullYear()}`}
                  setValue={setDate}
                  inputPlaceholder={locales('titles.calendar')}
                  children={<CalenderIcon style={{marginRight: 16}} />}
                />
              </View>
              <View style={{flex: 1}}>
                <FlotableInput
                  onPress={() => {
                    setTimeDisplay(true);
                  }}
                  editable={false}
                  value={`${time.getHours()} : ${time.getMinutes()}`}
                  setValue={setTime}
                  inputPlaceholder={locales('titles.clock')}
                  children={<ClockIcon style={{marginRight: 16}} />}
                />
              </View>
            </View>

            <View style={{marginHorizontal: 24}}>
              <FlotableInput
                inputMode="text"
                value={description}
                setValue={setDescription}
                inputPlaceholder={locales('titles.discription')}
                multiline={true}
              />
            </View>

            <TouchableWithoutFeedback onPress={requestImagePermission}>
              <View
                style={{
                  marginHorizontal: 24,
                  borderColor: 'rgba(11, 21, 150, 0.09)',
                  borderWidth: imageSrc.length > 0 ? 0 : 2,
                  borderStyle: 'dashed',
                  borderRadius: 8,
                  paddingVertical: imageSrc.length > 0 ? 0 : 16,
                  paddingHorizontal: imageSrc.length > 0 ? 0 : 8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 16,
                  maxHeight: '25%',
                }}>
                <View
                  style={{
                    display: imageSrc.length > 0 ? 'none' : 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <ImageIcon />
                  <Text
                    style={{
                      color: '#0B1596',
                      fontSize: 14,
                      fontWeight: '500',
                      marginTop: 16,
                    }}>
                    {locales('titles.uploadAImage')}
                  </Text>
                </View>

                <Image
                  style={{
                    display: imageSrc.length > 0 ? 'flex' : 'none',
                    width: '100%',
                    height: '100%',
                    borderRadius: 8,
                    resizeMode: 'cover',
                  }}
                  source={{
                    uri: imageSrc,
                  }}
                />
              </View>
            </TouchableWithoutFeedback>

            <View
              style={{
                marginHorizontal: 24,
                display: imageSrc.length > 0 ? 'flex' : 'none',
                flexDirection: 'row',
                marginTop: 8,
                justifyContent: 'space-between',
              }}>
              <TouchableWithoutFeedback
                onPress={() => {
                  navigation.navigate('ImagePage', {imageSrc, customerID});
                }}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <ViewIcon />
                  <Text
                    style={{
                      fontWeight: '500',
                      fontSize: 14,
                      color: '#0B1596',
                      marginLeft: 8,
                    }}>
                    {locales('titles.view')}
                  </Text>
                </View>
              </TouchableWithoutFeedback>

              <DeleteImageIcon
                fill="#E52929"
                onPress={() => {
                  setImageSrc('');
                }}
              />
            </View>

            <View>
              {timeDisplay ? (
                <DateTimePicker
                  display="default"
                  mode="time"
                  value={time}
                  onChange={(event, date) => {
                    setTimeDisplay(false);
                    setTime(date);
                  }}
                />
              ) : null}
              {dateDisplay ? (
                <DateTimePicker
                  display="default"
                  mode="date"
                  value={date}
                  onChange={(event, date) => {
                    setDateDisplay(false);
                    setDate(date);
                  }}
                  themeVariant="#fff"
                />
              ) : null}
            </View>
            <TouchableWithoutFeedback onPress={toggleSwitch}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginHorizontal: 24,
                  marginTop: 24,
                }}>
                <Text
                  style={{color: '#01020D', fontWeight: '500', fontSize: 14}}>
                  {locales('titles.notificationBySMS')}
                </Text>
                <Switch
                  trackColor={{false: '#D9D9D9', true: '#0B1596'}}
                  thumbColor={isEnabled ? '#FFFFFF' : '#FFFFFF'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>

          <TouchableOpacity
            onPress={handleCustomerData}
            style={{
              margin: 24,
              backgroundColor: '#00CF82',
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
              {locales('titles.submit')}
            </Text>
          </TouchableOpacity>
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
    borderTopColor: '#168b22',
    borderTopWidth: 5,
    alignSelf: 'center',
    marginTop: 16,
    paddingVertical: 12,
  },
  bar: {
    backgroundColor: ' rgba(11, 21, 150, 0.09)',
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 16,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    alignItems: 'center',
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
    backgroundColor: '#168b22',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    marginHorizontal: 16,
    borderRadius: 5,
    marginBottom: 12,
  },
});
export default ReceivedComponent;
