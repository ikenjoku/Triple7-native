import {
  CHANGE_THEME
} from '../actionTypes';

const themeOptions = {
  'green': {
    pri50: '#e4f6eb',
    pri500: '#00b25c',
    pri700: '#009145',
    pri800: '#007f39',
    sec700: '#be2f79',
    sec900: '#802764',
  },
};

export const change_theme = (themeColor) => ({
  type: CHANGE_THEME,
  theme: themeOptions[themeColor],
});


