import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import withObservables from '@nozbe/with-observables';
import ArrowUpIcon from '../../assets/svgs/ArrowUpIcon';
import database from './../../DB/index.native';
import ArrowDownIcon from '../../assets/svgs/ArrowDownIcon';
import {Q} from '@nozbe/watermelondb';
import RecivedIcon from '../../assets/svgs/RecivedIcon';
import PayedIcon from '../../assets/svgs/PayedIcon';

function CustomerAmountList({route, navigation}) {
  const [customerAmountLists, setCustomerAmountLists] = useState([]);
  const [groupList, setGroupList] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const {customerID} = route.params;
  useEffect(() => {
    const customersRecord = database
      .get('customerdebt')
      .query(Q.where('customers_id', customerID))
      .fetch()
      .then(res => {
        setCustomerAmountLists(res);

        const sort = res.reduce((result, obj) => {
          const dateStr = obj?._raw.date_at?.toDateString();
          if (!result[dateStr]) {
            result[dateStr] = [dateStr];
          }
          result[dateStr].push(obj);
          return result;
        }, {});
        const arrayBayDate = Object.values(sort);
        setGroupList(arrayBayDate);
      });
  }, [customerAmountLists]);
  return (
    <>
      <View>
        <FlatList
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<Text>it's empty</Text>}
          style={{
            backgroundColor: '#fff',
            margin: 16,
            borderRadius: 8,
            elevation: 1,
            paddingHorizontal: 16,
            maxHeight: '80%',
          }}
          data={groupList}
          renderItem={(item, index) => {
            return (
              <View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginVertical: 16,
                  }}>
                  <Text
                    style={{
                      color: '#01020D',
                      fontSize: 13,
                      fontWeight: '600',
                    }}>
                    {item.item[0]}
                  </Text>
                  <Text
                    style={{
                      color: '#9B9B9B',
                      fontSize: 13,
                      fontWeight: '400',
                    }}>
                    {item.item.length - 1}
                  </Text>
                </View>

                <FlatList
                  data={item.item}
                  renderItem={({item, index}) => (
                    <View>
                      {index !== 0 ? (
                        <>
                          <TouchableWithoutFeedback
                            onPress={() => {
                              navigation.navigate('EditAmount', {
                                amountId: item.id,
                              });
                            }}>
                            <View
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginBottom: 16,
                              }}>
                              <View
                                style={{
                                  backgroundColor: item.is_debt
                                    ? ' rgba(0, 207, 130, 0.1)'
                                    : 'rgba(230, 41, 41, 0.1)',
                                  borderRadius: 8,
                                  padding: 6,
                                }}>
                                <RecivedIcon
                                  style={{
                                    display: item.is_debt ? 'flex' : 'none',
                                  }}
                                />
                                <PayedIcon
                                  style={{
                                    display: item.is_debt ? 'none' : 'flex',
                                  }}
                                />
                              </View>
                              <View
                                style={{
                                  display: 'flex',
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                }}>
                                <Text
                                  style={{
                                    fontSize: 14,
                                    fontWeight: '400',
                                    color: '#9b9b9b',
                                    marginHorizontal: 8,
                                  }}>
                                  {item.is_debt ? '-' : '+'}
                                </Text>
                                <Text
                                  style={{
                                    color: '#01020D',
                                    fontSize: 14,
                                    fontWeight: '500',
                                  }}>
                                  {item.amount} €
                                </Text>
                              </View>
                            </View>
                          </TouchableWithoutFeedback>
                        </>
                      ) : null}
                    </View>
                  )}
                />

                {item.index < groupList.length - 1 ? (
                  <View
                    style={{
                      backgroundColor: '#D9D9D9',
                      height: 1,
                      width: '100%',
                    }}></View>
                ) : null}
              </View>
            );
          }}
        />
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  faj: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default CustomerAmountList;
