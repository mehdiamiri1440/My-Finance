import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Pressable,
  Text,
  FlatList,
  View,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import IncomeIcon from '../../assets/svgs/IncomeIcon';
import {deviceHeight, deviceWidth} from '../../utils';
import FlotableInput from '../../components/FlotableInput';
import CalenderIcon from '../../assets/svgs/CalenderIcon';
import ClockIcon from '../../assets/svgs/ClockIcon';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import database from '../../DB/index.native';
import {numberWithCommas} from '../../utils/formatter';
import DropDownIcon from '../../assets/svgs/DropDownIcon';

export default function Income() {
  const [incomesList, setIncomesList] = useState([]);
  const [recurringIncomesList, setRecurringIncomesList] = useState([]);
  const [incomeSourceModalVisibility, setIncomeSourceModalVisibility] =
    useState(false);
  const [incomeSource, setIncomeSource] = useState('');
  const [amount, setAmount] = useState(0);
  const [frequency, setFrequency] = useState('');
  const [date, setDate] = useState(moment().unix());
  const [time, setTime] = useState(moment().unix());
  const [calendarType, setCalendarType] = useState('date');
  const [incomeTypeId, setIncomeTypeId] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [incomeTypeDropDownVisibility, setIncomeTypeDropDownVisibility] =
    useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const incomeTypes = [
    {
      id: 0,
      title: 'Non-Recurring',
    },
    {
      id: 1,
      title: 'Recurring',
    },
  ];
  useEffect(() => {
    database
      .get('incomes')
      .query()
      .fetch()
      .then(res => {
        let tempIncome = [],
          tempRecurring = [];
        for (let ele of res) {
          if (ele.type == 0) tempIncome.push(ele);
          else tempRecurring.push(ele);
        }
        setIncomesList(tempIncome);
        setRecurringIncomesList(tempRecurring);
      });
  }, [incomesList.length, recurringIncomesList.length]);

  const renderListEmptyComponent = _ => {
    return (
      <View
        style={{
          height: deviceHeight * 0.8,
          width: deviceWidth,
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <IncomeIcon width="100" height="100" />
        <Text
          style={{
            marginTop: 10,
            fontWeight: 'bold',
            color: 'black',
            fontSize: 20,
          }}>
          No Source of Income Found
        </Text>
        <Pressable
          android_ripple={{
            color: '#ededed',
          }}
          onPress={onNewIncomeSourceButtonPressed}
          style={{
            backgroundColor: '#0B1596',
            padding: 16,
            borderRadius: 8,
            alignItems: 'center',
            alignSelf: 'center',
            justifyContent: 'center',
            width: '50%',
            height: 70,
            marginTop: 24,
          }}>
          <Text
            style={{
              textAlign: 'center',
              textAlignVertical: 'center',
              color: 'white',
            }}>
            New Source of Income
          </Text>
        </Pressable>
      </View>
    );
  };

  const renderItem = ({item, index}) => {
    return (
      <View
        style={{
          backgroundColor: index % 2 == 0 ? '#efefef' : 'white',
          marginVertical: 10,
          padding: 10,
          borderWidth: 1,
          borderColor: '#ededed',
          borderRadius: 8,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 18,
              color: 'black',
            }}>
            {item.source}
          </Text>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 14,
              color: '#bebebe',
            }}>
            {moment.unix(item.date).format('MM-DD-YYYY HH:mm')}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              marginTop: 10,
              fontWeight: 'bold',
              fontSize: 16,
              color: '#5CD598',
            }}>
            ${numberWithCommas(item.amount)}
          </Text>
          {item.type == 1 ? (
            <Text
              style={{
                marginTop: 10,
                fontWeight: 'bold',
                fontSize: 16,
                color: '#5CD598',
              }}>
              <Text style={{color: '#bebebe', fontSize: 14}}>
                Repeats every
              </Text>{' '}
              {item.frequency}
            </Text>
          ) : null}
        </View>
      </View>
    );
  };

  const onNewIncomeSourceButtonPressed = _ => {
    setIncomeSourceModalVisibility(true);
  };

  const keyExtractor = (_, index) => index.toString();

  const openCalendar = type => {
    setCalendarType(type);
    setDatePickerVisibility(true);
  };

  const handleConfirm = (cDate, type) => {
    if (type === 'date') setDate(moment(cDate).unix());
    else setTime(moment(cDate).unix());
    setDatePickerVisibility(false);
  };

  const onNewIncomeSubmitted = _ => {
    const datePart = moment.unix(date ?? moment()).format('YYYY-MM-DD');
    const timePart = moment.unix(time).format('HH:mm:ss');

    const newDate = moment(`${datePart} ${timePart}`, 'YYYY-MM-DD HH:mm:ss');
    database.write(async () => {
      const newIncome = await database.collections
        .get('incomes')
        .create(res => {
          res.source = incomeSource;
          if (incomeTypeId == 1) res.frequency = frequency;
          res.amount = parseFloat(amount);
          res._raw.date = newDate.unix();
          res.type = parseFloat(incomeTypeId);
        });
      database
        .get('incomes')
        .query()
        .fetch()
        .then(res => {
          setIncomesList(res);
        });
      setTime(moment().unix());
      setAmount('');
      setFrequency('');
      setIncomeSource('');
      setIncomeTypeId(0);
      setDate(moment().unix());
      setIncomeSourceModalVisibility(false);
    });
  };

  return (
    <View
      style={{
        backgroundColor: 'white',
        flex: 1,
      }}>
      <Modal
        animationType="fade"
        visible={incomeSourceModalVisibility}
        onRequestClose={_ => setIncomeSourceModalVisibility(false)}>
        <View
          style={{
            backgroundColor: 'white',
            height: deviceHeight,
            width: deviceWidth,
          }}>
          <View
            style={{
              width: '100%',
              marginTop: 20,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <View
              style={{
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <Pressable
                onPress={_ => setIncomeTypeId(0)}
                style={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 16,
                    marginHorizontal: 8,
                  }}>
                  Non-Recurring
                </Text>
                <Pressable
                  onPress={_ => setIncomeTypeId(0)}
                  style={{
                    borderRadius: 60,
                    borderWidth: 1,
                    borderColor: '#bebebe',
                    padding: 5,
                  }}>
                  <View
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 60,
                      backgroundColor: incomeTypeId == 0 ? '#5CD598' : 'white',
                    }}></View>
                </Pressable>
              </Pressable>

              <Pressable
                onPress={_ => setIncomeTypeId(1)}
                style={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginHorizontal: 8,
                }}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 16,
                    marginHorizontal: 8,
                  }}>
                  Recurring
                </Text>
                <Pressable
                  onPress={_ => setIncomeTypeId(1)}
                  style={{
                    borderRadius: 60,
                    borderWidth: 1,
                    borderColor: '#bebebe',
                    padding: 5,
                  }}>
                  <View
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 60,
                      backgroundColor: incomeTypeId == 1 ? '#5CD598' : 'white',
                    }}></View>
                </Pressable>
              </Pressable>
            </View>
          </View>
          <FlotableInput
            inputStyle={{width: '90%', alignSelf: 'center'}}
            value={incomeSource}
            setValue={setIncomeSource}
            inputPlaceholder="Source of Income"
          />
          <FlotableInput
            inputStyle={{width: '90%', alignSelf: 'center'}}
            inputPlaceholder="Amount"
            value={amount}
            setValue={setAmount}
            keyboardType={'numeric'}
          />
          {incomeTypeId == 0 ? (
            <>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  paddingHorizontal: 24,
                }}>
                <View style={{flex: 1, marginRight: 16}}>
                  <FlotableInput
                    onPress={() => {
                      openCalendar('date');
                    }}
                    value={`${moment.unix(date).format('MMM DD')}`}
                    setValue={setDate}
                    editable={false}
                    inputPlaceholder={locales('titles.calendar')}
                    children={<CalenderIcon style={{marginRight: 16}} />}
                  />
                </View>
                <View style={{flex: 1}}>
                  <FlotableInput
                    editable={false}
                    onPress={() => {
                      openCalendar('time');
                    }}
                    value={`${moment.unix(time).format('HH:mm')}`}
                    setValue={setTime}
                    inputPlaceholder={locales('titles.clock')}
                    children={<ClockIcon style={{marginRight: 16}} />}
                  />
                </View>
              </View>
              <DateTimePickerModal
                date={new Date()}
                mode={calendarType}
                isVisible={isDatePickerVisible}
                onConfirm={calendarDate =>
                  handleConfirm(calendarDate, calendarType)
                }
                onCancel={_ => setDatePickerVisibility(false)}
              />
            </>
          ) : (
            <FlotableInput
              inputStyle={{width: '90%', alignSelf: 'center'}}
              value={frequency}
              setValue={setFrequency}
              inputPlaceholder="Frequency: 2month..."
            />
          )}
          {/* <View>
            {timeDisplay ? (
              <DateTimePickerModal
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
              <DateTimePickerModal
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
          </View> */}
          <Pressable
            android_ripple={{
              color: '#ededed',
            }}
            onPress={onNewIncomeSubmitted}
            style={{
              backgroundColor: '#0B1596',
              padding: 16,
              borderRadius: 8,
              alignItems: 'center',
              alignSelf: 'center',
              justifyContent: 'center',
              width: '50%',
              height: 70,
              marginTop: 24,
            }}>
            <Text
              style={{
                textAlign: 'center',
                textAlignVertical: 'center',
                color: 'white',
              }}>
              Submit
            </Text>
          </Pressable>
        </View>
      </Modal>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          borderBottomWidth: 1,
          borderBottomColor: '#bebebe',
        }}>
        <Pressable
          android_ripple={{
            color: '#ededed',
          }}
          onPress={_ => setActiveTab(0)}
          style={{
            padding: 20,
            alignItems: 'center',
            alignSelf: 'center',
            justifyContent: 'center',
            width: '50%',
            backgroundColor: activeTab == 0 ? 'rgba(0,0,0,0.3)' : 'white',
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: activeTab == 0 ? 'white' : 'black',
              fontWeight: 'bold',
              fontSize: 16,
            }}>
            Non-Recurring
          </Text>
        </Pressable>
        <View
          style={{
            borderColor: '#bebebe',
            height: '100%',
            width: 1,
            backgroundColor: '#bebebe',
          }}></View>
        <Pressable
          android_ripple={{
            color: '#ededed',
          }}
          onPress={_ => setActiveTab(1)}
          style={{
            padding: 20,
            alignItems: 'center',
            alignSelf: 'center',
            justifyContent: 'center',
            width: '50%',
            backgroundColor: activeTab == 1 ? 'rgba(0,0,0,0.3)' : 'white',
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: activeTab == 1 ? 'white' : 'black',
              fontWeight: 'bold',
              fontSize: 16,
            }}>
            Recurring
          </Text>
        </Pressable>
      </View>
      <FlatList
        contentContainerStyle={{padding: 10}}
        keyExtractor={keyExtractor}
        data={activeTab == 0 ? incomesList : recurringIncomesList}
        renderItem={renderItem}
        ListEmptyComponent={renderListEmptyComponent}
      />

      {(incomesList.length && activeTab == 0) ||
      (recurringIncomesList.length && activeTab == 1) ? (
        <Pressable
          android_ripple={{
            color: '#ededed',
          }}
          onPress={onNewIncomeSourceButtonPressed}
          style={{
            backgroundColor: '#0B1596',
            padding: 16,
            alignItems: 'center',
            alignSelf: 'center',
            justifyContent: 'center',
            width: '100%',
            height: 70,
            marginTop: 24,
          }}>
          <Text
            style={{
              textAlign: 'center',
              textAlignVertical: 'center',
              color: 'white',
            }}>
            New Source of Income
          </Text>
        </Pressable>
      ) : null}
    </View>
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
  submitBtn: {
    marginBottom: 24,
    marginHorizontal: 24,
    backgroundColor: '#00CF82',
    paddingVertical: 16,
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    borderRadius: 8,
    flexDirection: 'row',
  },
  submitext: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  switchStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 24,
    marginTop: 24,
  },
  switchTextStyle: {
    color: '#01020D',
    fontWeight: '500',
    fontSize: 14,
  },
  viewBtnText: {
    fontWeight: '500',
    fontSize: 14,
    color: '#0B1596',
    marginLeft: 8,
  },
  depositeTypeStyle: {
    zIndex: 2,
    top: '45%',
    position: 'absolute',
    marginRight: 24,
    alignSelf: 'center',
    backgroundColor: '#fff',
    width: '90%',
    elevation: 1,
    padding: 4,
    marginTop: 16,
    borderRadius: 8,
  },
  calClockStyle: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 24,
  },
  chooseImgStyle: {
    marginHorizontal: 24,
    borderColor: 'rgba(11, 21, 150, 0.09)',
    borderStyle: 'dashed',
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    maxHeight: '25%',
  },
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
  imageModalView: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(1, 2, 13, 0.945)',
    justifyContent: 'space-between',
    paddingBottom: 30,
  },
  imageModalImageView: {
    display: 'flex',
    width: '100%',
    height: '80%',
    resizeMode: 'contain',
  },
  imageModalDeleteBtn: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  imageModaldeleteText: {
    fontWeight: '500',
    fontSize: 14,
    color: '#fff',
    marginLeft: 8,
  },
  imageModalCloseBtn: {
    padding: 16,
    alignSelf: 'flex-end',
  },
  calStyle: {
    marginTop: 24,
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: 'rgba(248, 248, 248, 1)',
    borderTopWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
