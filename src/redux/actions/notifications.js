import { Toast } from 'native-base';

export const toastError = (message) => {
  Toast.show({
    text: message,
    position: 'top',
    type:'danger',
    duration:3000
  });
};

export const toastSuccess = (message) => {
  Toast.show({
    text: message,
    position: 'top',
    type:'success',
    duration:3000
  });
};
