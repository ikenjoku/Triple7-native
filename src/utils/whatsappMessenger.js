import { Linking, Alert } from 'react-native';


export default (phoneNumber, initialMessage) => {
  if (phoneNumber) {
    Linking.canOpenURL(`whatsapp://send?text=${initialMessage}&phone=${phoneNumber}`)
      .then(supported => {
        if (!supported) {
          Alert.alert(
            'Please install WhatsApp to send direct messages'
          );
        } else {
          return Linking.openURL(`whatsapp://send?text=${initialMessage}&phone=${phoneNumber}`);
        }
      })
      .catch(err => console.error('An error occurred', err));
  } else {
    Alert.alert('Please provide a phone number');
  }
};
