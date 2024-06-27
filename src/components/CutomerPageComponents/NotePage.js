import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import CalenderIcon from './../../assets/svgs/CalenderIcon';
import DescriptionIcon from '../../assets/svgs/DescriptionIcon';
import {SheetManager} from 'react-native-actions-sheet';
import database from '../../DB/index.native';
import {contextsStore} from './../../contexts/index';
import {useContext} from 'react';
import FlotableInput from '../FlotableInput';
import ClockIcon from './../../assets/svgs/ClockIcon';
import DateTimePicker from '@react-native-community/datetimepicker';
import BackIcon from '../../assets/svgs/BackIcon';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {Q} from '@nozbe/watermelondb';

function NotePage({route = {}, navigation}) {
  const [note, setNote] = useState('');
  const [dateDisplay, setDateDisplay] = useState(false);
  const [date, setDate] = useState(moment().unix());
  const [time, setTime] = useState(moment().unix());

  const [timeDisplay, setTimeDisplay] = useState(false);
  const [calendarType, setCalendarType] = useState('date');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const {params = {}} = route;
  const {customerName, customerId, note: prevNote, noteId} = params;
  useEffect(() => {
    if (prevNote) setNote(prevNote);
    navigation.setOptions({
      headerLeft: () => (
        <BackIcon
          style={{marginLeft: 16}}
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
      headerTitle: customerName,
    });
  }, [navigation]);

  const handleAddCustomerdetail = async () => {
    if (!date) setDate(moment());

    const datePart = moment.unix(date ?? moment()).format('YYYY-MM-DD');
    const timePart = moment.unix(time).format('HH:mm:ss');

    const newDate = moment(`${datePart} ${timePart}`, 'YYYY-MM-DD HH:mm:ss');
    if (noteId) {
      const selectedNote = await database.collections
        .get('customer_transactions')
        .find(noteId);
      database.write(async _ => {
        selectedNote.update(item => {
          item._raw.is_note = true;
          item._raw.description = note;
          item._raw.amount = 0;
          item._raw.date = newDate.unix();
          item._raw.image = '';
        });
      });
    } else {
      database.write(async () => {
        await database.collections
          .get('customer_transactions')
          .create(customerTransaction => {
            customerTransaction._raw.book_cash_customer_id = customerId;
            customerTransaction._raw.description = note;
            customerTransaction._raw.is_note = true;
            customerTransaction._raw.amount = 0;
            customerTransaction._raw.date = newDate.unix();
            customerTransaction._raw.image = '';
          });
      });
    }
    navigation.goBack();
  };

  const handleConfirm = (cDate, type) => {
    const momentObj = moment(
      cDate,
      type === 'date' ? 'ddd MMM DD YYYY HH:mm' : 'HH:mm',
    );
    if (type === 'date') setDate(momentObj.unix());
    else setTime(momentObj.unix());
    setDatePickerVisibility(false);
  };

  const openCalendar = type => {
    setCalendarType(type);
    setDatePickerVisibility(true);
  };

  return (
    <>
      <View
        style={{
          height: '100%',
          backgroundColor: '#fff',
          paddingHorizontal: 24,
          justifyContent: 'space-between',
          paddingBottom: 24,
        }}>
        <View>
          <FlotableInput
            titleHeight={-42}
            height={85}
            inputMode="text"
            value={note}
            setValue={setNote}
            inputPlaceholder={locales('titles.yourNote')}
            multiline={true}
          />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
            }}>
            <TouchableWithoutFeedback>
              <View style={{flex: 1, marginRight: 16}}>
                <FlotableInput
                  editable={false}
                  onPress={() => {
                    openCalendar('date');
                  }}
                  value={`${moment.unix(date).format('MMM DD')}`}
                  setValue={setDate}
                  inputPlaceholder={locales('titles.calendar')}
                  children={<CalenderIcon style={{marginRight: 16}} />}
                />
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback>
              <View style={{flex: 1}}>
                <FlotableInput
                  onPress={() => {
                    openCalendar('time');
                  }}
                  editable={false}
                  value={`${moment.unix(time).format('HH:mm')}`}
                  setValue={setTime}
                  inputPlaceholder={locales('titles.clock')}
                  children={<ClockIcon style={{marginRight: 16}} />}
                />
              </View>
            </TouchableWithoutFeedback>

            <DateTimePickerModal
              mode={calendarType}
              isVisible={isDatePickerVisible}
              onConfirm={calendarDate =>
                handleConfirm(calendarDate, calendarType)
              }
              onCancel={_ => setDatePickerVisibility(false)}
            />
          </View>
        </View>

        <TouchableOpacity
          onPress={handleAddCustomerdetail}
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
            {locales('titles.submit')}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

export default NotePage;

const styles = StyleSheet.create({
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
  registerBtn: {
    backgroundColor: '#152F8C',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    marginHorizontal: 16,
    borderRadius: 5,
    marginBottom: 12,
  },
  btn: {
    color: '#152F8C',
    fontWeight: 'bold',
  },
});
