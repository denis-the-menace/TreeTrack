import {Dimensions} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const formatDate = date => {
  if (date) {
    date = String(date.toDate());
    if (date.split(' ').length > 3)
      return date.split(' ').slice(0, 4).join(' ');
  }
  return date;
};

export const sortNoteList = (noteList, sortOption, noteType) => {
  switch (sortOption) {
    case 1:
      noteList.sort((a, b) => b.created_at - a.created_at);
      break;
    case 2:
      noteList.sort((a, b) => a.created_at - b.created_at);
      break;
    case 3:
      if (noteType === 'garden')
        noteList.sort((a, b) => a.garden_name.localeCompare(b.garden_name));
      else noteList.sort((a, b) => a.plant_name.localeCompare(b.plant_name));
      break;
    default:
      break;
  }
  return noteList;
};

// bir bahçe haritada gösterileceği zaman haritanın initialPosition'ı bu alana göre hesaplanır
export const setMapPositionByGardenArea = polygon => {
  const {width, height} = Dimensions.get('window');
  const aspectRatio = width / height;

  const minLatitude = Math.min(...polygon.map(p => p.latitude));
  const maxLatitude = Math.max(...polygon.map(p => p.latitude));
  const minLongitude = Math.min(...polygon.map(p => p.longitude));
  const maxLongitude = Math.max(...polygon.map(p => p.longitude));

  const latitude = (minLatitude + maxLatitude) / 2;
  const longitude = (minLongitude + maxLongitude) / 2;
  const latitudeDelta = maxLatitude - minLatitude;
  const longitudeDelta = (maxLongitude - minLongitude) * aspectRatio;

  return {latitude, longitude, latitudeDelta, longitudeDelta};
};

// kullanıcının kendi hesabını siler
export const deleteAccount = async (userId) => {
  try {
    // Kullanıcı bilgilerini al
    const storedUserId = await getFromStorage('userId');

    // Kayıtlı kullanıcı kimliğiyle parametre olarak gelen userId karşılaştırılır
    if (storedUserId && storedUserId === userId.toString()) {
      // Kullanıcı kimliği eşleşiyorsa, bilgileri sil
      await AsyncStorage.removeItem('userId');
      await AsyncStorage.removeItem('remember_auth');
      console.log('User account deleted successfully!');
    } else {
      console.log('User account deletion failed. Invalid user ID.');
    }
  } catch (error) {
    console.log('Error deleting user account: ', error);
  }
};

export const getFromStorage = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (error) {
    console.log(`Error retrieving ${key}: ${error}`);
  }
};
