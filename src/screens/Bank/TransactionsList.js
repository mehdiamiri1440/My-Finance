import React, {useState} from 'react';
import {
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
  View,
  Text,
  TextInput,
} from 'react-native';
import PayedIcon from '../../assets/svgs/PayedIcon';
import RecivedIcon from '../../assets/svgs/RecivedIcon';
import {SheetManager} from 'react-native-actions-sheet';
import FilterIcon from '../../assets/svgs/FilterIcon';
import SearchIcon from '../../assets/svgs/SearchIcon';

function TransactionsList() {
  const [searchQuery, setSearchQuery] = useState('');

  const data = [
    {
      date: '12 Apr',
      records: [
        {
          amount: 65,
          clock: '20:01',
        },
      ],
    },
    {
      date: '12 Apr',
      records: [
        {
          amount: -65,
          clock: '20:01',
        },
      ],
    },
    {
      date: '12 Apr',
      records: [
        {
          amount: -55,
          clock: '20:01',
        },
      ],
    },
    {
      date: '12 Apr',
      records: [
        {
          amount: -55,
          clock: '20:01',
        },
        {
          amount: -55,
          clock: '20:01',
        },
      ],
    },
  ];

  const renderItem = ({item, index}) => {
    recordsRender = ({item}) => (
      <View style={styles.amountView}>
        <View style={styles.PRview}>
          <View
            style={[
              styles.iconView,
              {
                backgroundColor:
                  item.amount.toString().charAt(0) === '-'
                    ? 'rgba(230, 41, 41, 0.1)'
                    : 'rgba(0, 207, 130, 0.1)',
              },
            ]}>
            {item.amount.toString().charAt(0) === '-' ? (
              <PayedIcon />
            ) : (
              <RecivedIcon />
            )}
          </View>
          <Text style={styles.amountText}>{item.amount}</Text>
        </View>

        <Text style={styles.clockText}>{item.clock}</Text>
      </View>
    );
    return (
      <>
        <View style={styles.transactions}>
          <View style={styles.dateRecord}>
            <Text style={styles.dateText}>{item.date}</Text>
            <Text style={styles.recordsText}>
              {item.records.length} Records
            </Text>
          </View>
          <FlatList data={item.records} renderItem={recordsRender} />
        </View>
        <View style={styles.horizentalLine}></View>
      </>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.searchPart}>
          <View style={styles.searchInput}>
            <TextInput
              style={{
                color: '#01020D',
              }}
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder={`${locales('titles.searchTheName')}`}
            />
            <SearchIcon />
          </View>
          <FilterIcon
            onPress={() => {
              SheetManager.show('bankFilter');
            }}
          />
        </View>
        <FlatList data={data} renderItem={renderItem} />
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    padding: 16,
    marginTop: 16,
    elevation: 2,
    borderRadius: 8,
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
  iconView: {
    backgroundColor: 'rgba(230, 41, 41, 0.1) ',
    padding: 6,
    borderRadius: 8,
  },
  amountText: {
    color: '#01020D',
    fontSize: 14,
    fontWeight: '500',
  },
  clockText: {
    color: '#9B9B9B',
    fontSize: 14,
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
  searchInput: {
    flex: 1,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginRight: 16,
  },
  searchPart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  transactions: {},
});
export default TransactionsList;
