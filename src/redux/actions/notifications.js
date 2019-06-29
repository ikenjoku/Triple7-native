import { Toast } from 'native-base';

export const toastError = (message) => {
  Toast.show({
    text: message,
    position: "bottom",
    type:'danger',
    textStyle: {
      // textAlign: "center",
    },
    duration:3000
  });
};

export const toastSuccess = (message) => {
  Toast.show({
    text: message,
    position: "bottom",
    type:'success',
    textStyle: {
      // textAlign: "center",
    },
    duration:3000
  });
};
