import React, {useState} from 'react';
import {FlatList, View, Text} from 'react-native';
import PageOne from './pageOne';
import PageTwo from './pageTwo';

const data = [{id: '1'}, {id: '2'}];

function Introdaction() {
  const [handlePages, setHandlePages] = useState(true);
  const renderItem = ({item, index}) => {
    if (handlePages) {
      return <PageOne />;
    } else {
      return <PageOne />;
    }
  };

  return (
    <View style={{width: '100%'}}>
      <FlatList
        data={data}
        renderItem={renderItem}
        horizontal={true}
        pagingEnabled={true}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

export default Introdaction;
