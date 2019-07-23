import { Linking, Alert } from 'react-native';

export default (phoneNumber) => {
  if (phoneNumber) {
    Linking.canOpenURL(`tel:${phoneNumber}`)
      .then(supported => {
        if (!supported) {
          Alert.alert(
            'Phone call is not supported'
          );
        } else {
          return Linking.openURL(`tel:${phoneNumber}`);
        }
      })
      .catch(err => console.error('An error occurred', err));
  } else {
    Alert.alert('Please provide a phone number');
  }
};
