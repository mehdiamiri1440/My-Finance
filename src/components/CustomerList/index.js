import React, {useEffect, useState, useContext} from 'react';
import {FlatList, Text, TouchableWithoutFeedback, View} from 'react-native';
import {contextsStore} from '../../contexts';
import database from '../../DB/index.native';
import {Q} from '@nozbe/watermelondb';

function CustomrList({navigation, route, data}) {
  const {setRouteName, customerID, searchResults, setSearchResults} =
    useContext(contextsStore);
  const [customerLists, setCustomerLists] = useState([]);
  useEffect(() => {
    database
      .get('customers')
      .query(Q.where('bookCash_id', route.params?.bookCashId || customerID))
      .fetch()
      .then(res => {
        setCustomerLists(res);
      });
  }, [customerLists]);
  // useEffect(() => {
  //   database
  //     .get('customers')
  //     .query(Q.where('bookCash_id', route.params?.bookCashId || customerID))
  //     .observeWithColumns(['bookCash_id', 'bookCash_id'])
  //     .subscribe(res => {
  //       setCustomerLists(res);
  //     });
  // }, []);

  return (
    <>
      <FlatList
        data={customerLists}
        renderItem={({item, index}) => (
          <TouchableWithoutFeedback
            key={customerID}
            onPress={() => {
              setRouteName(item.name);
              setTimeout(() => {
                navigation.navigate('customerPage', {
                  customerID: item.id,
                  customerName: item.name,
                  bookCashId: route.params?.bookCashId,
                });
              }, 1);
            }}>
            <View
              style={{
                backgroundColor: '#fff',
                display: 'flex',
                flexDirection: 'column',
                padding: 16,
              }}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={{display: 'flex', flexDirection: 'column'}}>
                  <Text
                    style={{color: '#9b9b9b', fontSize: 14, fontWeight: '400'}}>
                    {item.name}
                  </Text>
                  <Text
                    style={{fontSize: 14, fontWeight: '400', color: '#0B1596'}}>
                    {item.remain?.charAt(0) === '-'
                      ? item.remain.substring(1)
                      : item.remain}
                    €
                  </Text>
                </View>

                <View style={{display: 'flex', justifyContent: 'flex-end'}}>
                  {item.remain === '0' ? (
                    <Text style={{color: '#0B1596'}}>Settlement</Text>
                  ) : item.remain?.charAt(0) === '-' ? (
                    <Text style={{color: '#00CF82'}}>Demand</Text>
                  ) : (
                    <Text style={{color: '#E62929'}}>Debt</Text>
                  )}
                </View>
              </View>
              {index < customerLists.length - 1 ? (
                <View
                  style={{
                    backgroundColor: '#D9D9D9',
                    height: 1,
                    width: '100%',
                    marginTop: 16,
                  }}></View>
              ) : null}
            </View>
          </TouchableWithoutFeedback>
        )}
      />
    </>
  );
}

export default CustomrList;
