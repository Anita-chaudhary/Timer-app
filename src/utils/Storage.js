import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveToStorage = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error("Failed to save data", e);
  }
};

export const getFromStorage = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (e) {
    console.error("Failed to load data", e);
    return null;
  }
};

export const removeFromStorage = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.error("Failed to remove data", e);
  }
};
