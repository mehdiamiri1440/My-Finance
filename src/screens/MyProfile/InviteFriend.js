import React, {useContext, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import InviteFriendIcon from '../../assets/svgs/InviteFriendIcon';
import {contextsStore} from '../../contexts';
import Share from 'react-native-share';

function InviteFriend({navigation}) {
  const {setTabBarBottom} = useContext(contextsStore);

  useEffect(() => {
    navigation.addListener('focus', () => {
      setTabBarBottom(false);
    });
  }, [navigation]);

  const shareOptions = {
    title: 'Share via',
    message: '',
    url: '',
    social: Share.Social.TELEGRAM,
    whatsAppNumber: '',
    filename: 'Invite Friends',
  };

  const handleShare = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Share.open(shareOptions)
          .then(res => {})
          .catch(err => {});
      } else {
      }
    } catch (err) {
      console.warn(err);
    }
  };
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.invNameText}>My Budget</Text>
        <Text style={styles.invHeaderText}>
          {locales('titles.inviteYourFrinds')}
        </Text>
        <Text style={styles.invSubHeaderText}>
          {locales(
            'titles.youCanInviteYourFrindsWhoUseMyBudgetForTheirAccounting',
          )}
        </Text>
        <InviteFriendIcon style={{marginTop: 70}} />
      </View>

      <TouchableOpacity
        onPress={handleShare}
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
          {locales('titles.invite')}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '100%',
    padding: 24,
    justifyContent: 'space-between',
  },
  invHeaderText: {
    color: '#01020D',
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
    marginTop: 8,
  },
  invNameText: {
    color: '#01020D',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  invSubHeaderText: {
    color: '#9B9B9B',
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
    marginTop: 16,
  },
});
export default InviteFriend;
