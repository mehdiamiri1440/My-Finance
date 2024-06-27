import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import ActionSheet, {
  ActionSheetRef,
  SheetManager,
  SheetProps,
} from 'react-native-actions-sheet';
import ArrowLeft from '../../assets/svgs/ArrowLeft';
import PlusIcon from '../../assets/svgs/PlusIcon';
import ArrowRight from './../../assets/svgs/ArrowRight';
import {useNavigation, useRoute} from '@react-navigation/native';
import database from '../../DB/index.native';

interface Model {
  name: string;
  remain: string;
}

function BookCash({sheetId, payload}: SheetProps<{data: string}>) {
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const navigation = useNavigation();
  const [bookCashes, setBookCashes] = useState<any[]>([]);

  useEffect(() => {
    database
      .get('book_cashes')
      .query()
      .fetch()
      .then(res => {
        setBookCashes(res);
      });
  }, [bookCashes]);

  return (
    <ActionSheet
      closeAnimationConfig={{bounciness: 0.1}}
      id={sheetId}
      ref={actionSheetRef}
      containerStyle={{
        height: '27%',
      }}
      indicatorStyle={{
        display: 'none',
      }}
      gestureEnabled={true}>
      <View
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '700',
            color: '#01020D',
            padding: 24,
          }}>
          Book Cash List
        </Text>
        <View
          style={{height: 1, width: '100%', backgroundColor: '#D9D9D9'}}></View>
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{height: '55%', paddingHorizontal: 24}}
          data={bookCashes}
          renderItem={item => (
            <>
              <TouchableWithoutFeedback
                onPress={() => {
                  navigation.navigate('homeScreen', {bookCashId: item.item.id}),
                    actionSheetRef.current?.hide();
                }}>
                <View>
                  <View
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      marginTop: 16,
                    }}>
                    <View>
                      <Text
                        style={{
                          color: '#17191C',
                          fontSize: 14,
                          fontWeight: '600',
                        }}>
                        {item.item.title}
                      </Text>

                      <Text style={{fontSize: 10}}>{item.item.remain}</Text>
                    </View>
                    <ArrowRight />
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </>
          )}
        />

        {/* <TouchableOpacity onPress={() => {
                    actionSheetRef.current?.hide()
                    navigation.navigate('NewBookCash')
                }} style={{ backgroundColor: "#152F8C", paddingVertical: 16, alignItems: 'center', display: 'flex', justifyContent: 'center', borderRadius: 10, flexDirection: 'row' }}>
                    <Text style={{ color: '#fff' }}>Add a new book cash</Text>
                    <PlusIcon />
                </TouchableOpacity> */}
      </View>
    </ActionSheet>
  );
}

export default BookCash;
