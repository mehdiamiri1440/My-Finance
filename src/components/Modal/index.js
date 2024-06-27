import React, {useContext} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import CloseIcon from '../../assets/svgs/CloseIcon';
import {contextsStore} from '../../contexts';

function ModalScreen({onPress}) {
  const {modalDisplay, setModalDisplay} = useContext(contextsStore);
  return (
    <>
      <View
        style={[
          styles.container,
          {
            display: modalDisplay ? 'flex' : 'none',
          },
        ]}>
        <Text style={styles.text}>Invalid Code Number</Text>
        <CloseIcon
          onPress={() => {
            setModalDisplay(false);
          }}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    color: '#fafafa',
    fontSize: 16,
  },
  container: {
    backgroundColor: '#323232',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 60,
    alignItems: 'center',
    position: 'absolute',
    alignSelf: 'center',
    width: '95%',
    top: '89%',
    marginTop: -8,
  },
});
export default ModalScreen;
