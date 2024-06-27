import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  FlatList,
  SafeAreaView,
  Button,
  ActivityIndicator,
} from 'react-native';
import EditIcon from '../../assets/svgs/EditIcon';
import CheckBox from '@react-native-community/checkbox';
import DateTimePicker from '@react-native-community/datetimepicker';
import BackIcon from './../../assets/svgs/BackIcon';
import FilterIcon from '../../assets/svgs/FilterIcon';
import PayedIcon from '../../assets/svgs/PayedIcon';
import RecivedIcon from '../../assets/svgs/RecivedIcon';
import NotesIcon from '../../assets/svgs/NotesIcon';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

const data = [
  {
    date: '12 Apr',
    records: [
      {
        amount: 65,
        clock: '20:01',
      },
      {
        amount: 125,
        clock: '20:01',
      },
      {
        text: 'this is smple note ',
      },
    ],
  },
  {
    date: '12 Apr',
    records: [
      {
        text: 'I have to pay my bill',
      },
      {
        amount: -65,
        clock: '20:01',
      },

      {
        amount: -897,
        clock: '20:01',
      },
    ],
  },
  {
    date: '15 Apr',
    records: [
      {
        amount: -65,
        clock: '20:01',
      },
      {
        text: 'I have to pay my bill',
      },

      {
        amount: -897,
        clock: '20:01',
      },
    ],
  },
];
function Report({navigation}) {
  const [isSelected, setSelection] = useState(false);
  const [date, setDate] = useState(new Date());
  const [dateDisplay, setDateDisplay] = useState(false);
  const [loadingStyle, setLoadingStyle] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <BackIcon
          style={{marginLeft: 16}}
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
    });
  }, [navigation]);

  const renderItem = ({item, index}) => {
    recordsRender = ({item}) => (
      <View style={styles.amountView}>
        <View style={styles.PRview}>
          <View
            style={[
              styles.iconView,
              {
                backgroundColor: item.text
                  ? '#F8F9F9'
                  : item.amount.toString().charAt(0) === '-'
                  ? 'rgba(230, 41, 41, 0.1)'
                  : 'rgba(0, 207, 130, 0.1)',
              },
            ]}>
            {item.text ? (
              <NotesIcon />
            ) : item.amount.toString().charAt(0) === '-' ? (
              <PayedIcon />
            ) : (
              <RecivedIcon />
            )}
          </View>
          <Text style={styles.amountText2}>
            {' '}
            {item.text ? item.text : item.amount}
          </Text>
        </View>

        <Text style={styles.clockText}>{item.clock}</Text>
      </View>
    );
    return (
      <>
        <View>
          <View style={styles.dateRecord}>
            <Text style={styles.dateText}>{item.date}</Text>
            <Text style={styles.recordsText}>
              {item.records.length} Records
            </Text>
          </View>
          <FlatList data={item.records} renderItem={recordsRender} />
        </View>
        {index < data.length - 1 ? (
          <View style={styles.horizentalLine}></View>
        ) : null}
      </>
    );
  };

  // let options = {
  //   html: '<h1>PDF TEST</h1>',
  //   fileName: 'test',
  //   directory: 'Documents',
  // };

  // const makePdf = async () => {
  //   setLoadingStyle(true);
  //   let file = await RNHTMLtoPDF.convert(options);
  //   console.log(file.filePath);
  //   setLoadingStyle(false);
  // };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 8,
          }}>
          <Text style={styles.balance}>{locales('titles.balance')}</Text>

          {/* <Pressable onPress={makePdf} style={styles.filterView}>
            <ActivityIndicator
              size="small"
              style={{display: loadingStyle ? 'flex' : 'none'}}
              color="#fff"
            />
            <Text
              style={{
                display: loadingStyle ? 'none' : 'flex',
                fontSize: 16,
                fontWeight: '600',
                color: '#fff',
              }}>
              PDF
            </Text>
          </Pressable> */}

          <Pressable style={styles.filterView}>
            <FilterIcon />
          </Pressable>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={styles.totalAmount}>9,867 €</Text>
          <Text style={styles.expText}>{locales('titles.youHaveDebt')}</Text>
        </View>
        <View style={{flexDirection: 'row', marginTop: 16}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginRight: 40,
            }}>
            <Text style={[styles.demanDebt, {marginRight: 8}]}>Demand</Text>
            <Text
              style={[
                styles.demanDebt,
                {
                  color: '#00CF82',
                  padding: 6,
                  borderRadius: 8,
                  backgroundColor: 'rgba(0, 207, 130, 0.09);',
                },
              ]}>
              56€
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={[styles.demanDebt, {marginRight: 8}]}>Debt</Text>
            <Text
              style={[
                styles.demanDebt,
                {
                  backgroundColor: 'rgba(229, 41, 41, 0.09);',
                  padding: 6,
                  color: '#E52929',
                  borderRadius: 8,
                },
              ]}>
              30€
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#F8F9F9',
            borderRadius: 8,
            padding: 8,
            marginTop: 16,
          }}>
          <Text style={styles.spDay}>
            A Special day{' '}
            <Text style={{color: '#0B1596'}}>
              {date.getDate()}-{date.getMonth() + 1}-{date.getFullYear()}
            </Text>
          </Text>
          <EditIcon
            onPress={() => {
              setDateDisplay(true);
            }}
          />
        </View>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 16}}>
          <CheckBox
            style={{marginRight: 8}}
            value={isSelected}
            onValueChange={setSelection}
            tintColors={{true: '#0B1596', false: '#D9D9D9'}}
            boxType={'circle'}
          />
          <Text style={{color: '#01020D', fontSize: 14, fontWeight: '400'}}>
            {locales('titles.addNotes')}
          </Text>
        </View>
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

      <SafeAreaView
        style={{
          backgroundColor: '#fff',
          elevation: 2,
          marginTop: 16,
          borderRadius: 8,
          padding: 16,
          marginBottom: '65%',
        }}>
        <FlatList data={data} renderItem={renderItem} />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
    padding: 16,
  },
  container: {
    backgroundColor: '#fff',
    height: '100%',
    padding: 16,
  },
  balance: {
    color: '#0B1596',
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 16,
  },
  totalAmount: {
    color: '#01020D',
    fontSize: 18,
    fontWeight: '600',
  },
  expText: {
    color: '#9B9B9B',
    fontSize: 14,
    fontWeight: '400',
  },
  demanDebt: {
    color: '#01020D',
    fontSize: 14,
    fontWeight: '400',
  },
  iconView: {
    backgroundColor: 'rgba(230, 41, 41, 0.1) ',
    padding: 6,
    borderRadius: 8,
  },
  spDay: {
    color: '#01020D',
    fontSize: 14,
    fontWeight: '500',
  },
  filterView: {
    backgroundColor: 'rgba(11, 21, 150, 0.09)',
    borderRadius: 8,
    padding: 6,
  },
  dateRecord: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateText: {
    color: '#01020D',
    fontSize: 16,
    fontWeight: '600',
  },
  recordsText: {
    color: '#9B9B9B',
    fontSize: 13,
    fontWeight: '400',
  },
  horizentalLine: {
    width: '100%',
    height: 1,
    backgroundColor: '#D9D9D9',
    marginVertical: 16,
  },
  amountView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  PRview: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  amountText2: {
    color: '#01020D',
    fontSize: 14,
    fontWeight: '500',
  },
  clockText: {
    color: '#9B9B9B',
    fontSize: 14,
    fontWeight: '400',
  },
});

export default Report;
