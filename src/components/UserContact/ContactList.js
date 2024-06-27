import React, {useContext, useEffect, useState} from 'react';
import {TouchableWithoutFeedback} from 'react-native';
import {FlatList, View, Text, StyleSheet, ScrollView} from 'react-native';
import Contacts from 'react-native-contacts';
import BackIcon from '../../assets/svgs/BackIcon';
import {contextsStore} from '../../contexts';
const ContactsList = ({navigation}) => {
  const {customerName, setCustomerName, setCustomerPhone, customerPhone} =
    useContext(contextsStore);
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    Contacts.getAll().then(contacts => {
      setContacts(contacts);
    });
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <BackIcon
          style={{margin: 16}}
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
    });
  }, [navigation]);

  return (
    <>
      <FlatList
        style={styles.list}
        data={contacts}
        initialNumToRender={50}
        renderItem={({item, index}) => (
          <View style={{marginTop: 16}}>
            <TouchableWithoutFeedback
              key={item?.recordID}
              onPress={() => {
                setCustomerName(item?.givenName);
                setCustomerPhone(item?.phoneNumbers[0]?.number);
                navigation.goBack();
              }}>
              <View style={styles.contactCon}>
                <View style={styles.imgCon}>
                  <View style={styles.placeholder}>
                    {/* <Text style={styles.txt}>{item?.givenName[0]}</Text> */}
                  </View>
                </View>
                <View style={styles.contactDat}>
                  <Text style={styles.name}>
                    {item?.givenName}{' '}
                    {item?.middleName && item.middleName + ' '}
                    {item?.familyName}
                  </Text>
                  <Text style={styles.phoneNumber}>
                    {item?.phoneNumbers[0]?.number}
                  </Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        )}
      />
    </>
  );
};
const styles = StyleSheet.create({
  list: {
    flex: 1,
    paddingHorizontal: 16,
  },
  contactCon: {
    flexDirection: 'row',
    padding: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: '#d9d9d9',
  },
  imgCon: {
    marginRight: 8,
  },
  placeholder: {
    width: 55,
    height: 55,
    borderRadius: 30,
    overflow: 'hidden',
    backgroundColor: '#d9d9d9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactDat: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 5,
  },
  txt: {
    fontSize: 18,
  },
  name: {
    fontSize: 16,
    color: '#212121',
    marginBottom: 4,
  },
  phoneNumber: {
    color: '#888D9A',
  },
});
export default ContactsList;
