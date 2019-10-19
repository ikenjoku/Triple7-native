import { Toast } from 'native-base';

export const toastError = (message, position = 'top') => {
  Toast.show({
    text: message,
    position: position,
    type:'danger',
    duration:3000
  });
};

export const toastSuccess = (message, position = 'top') => {
  Toast.show({
    text: message,
    position: position,
    type:'success',
    duration:3000
  });
};
