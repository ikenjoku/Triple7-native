import { Linking, Alert } from 'react-native';


export default (receiverEmail, subject, body) => {
  if (receiverEmail) {
    Linking.canOpenURL(`mailto:${receiverEmail}?subject=${subject}&body=${body}`)
      .then(supported => {
        if (!supported) {
          Alert.alert(
            'Please install an Email app (for example. Gmail, Yahoo) to send an email'
          );
        } else {
          return Linking.openURL(`mailto:${receiverEmail}?subject=${subject}&body=${body}`);
        }
      })
      .catch(err => console.error('An error occurred', err));
  } else {
    Alert.alert('Please provide a valid email address');
  }
};
