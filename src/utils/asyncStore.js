/**
 * @file CRUD methods for accessing AsyncStorage
 */

import AsyncStorage from '@react-native-community/async-storage';


/**
 * @description Retrieves data from AsyncStorage
 * @param {*} name key of the required data
 * @returns {*} value of passed in key
 */
export const getData = async (name) => {
  let dataValue;
  try {
    const data = await AsyncStorage.getItem(name);
    if (data) {
      dataValue = JSON.parse(data);
    } else {
      dataValue = null;
    }
  } catch (error) {
    throw new Error(error.message);
  }
  return dataValue;
};

/**
 * @description Stores data to AsyncStorage
 * @param { string } name key of the required data
 * @param {*} value value of stored data
 * @returns {*} returns the stored value
 */
export const storeData = async (name, value) => {
  let dataValue = JSON.stringify(value);
  try {
    await AsyncStorage.setItem(name, dataValue);
    return await getData(name);
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * @description Updates data in AsyncStorage
 * @param { string } name key of data to update
 * @param {*} value new value
 * @returns {*} return the new value
 */
export const updateData = async (name, value) => {
  try {
    const dataValue = await getData(name);
    if (dataValue) {
      await deleteData(name);
      const updatedData = await storeData(name, value);
      return updatedData;
    }
    return;
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * @description Deletes data from AsyncStorage
 * @param { string } name key of the data to delete
 */

export const deleteData = async (name) => {
  try {
    await AsyncStorage.removeItem(name);
  } catch (error) {
    throw new Error(error);
  }
};