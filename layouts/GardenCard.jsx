import {
  Dimensions,
  Image,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
  Share,
} from 'react-native';
import { deleteGarden, getGardensNoteById } from '../services/garden_services';
import { useTranslation } from 'react-i18next';
import CustomModal from '../components/CustomModal';
import { useState, useEffect } from 'react';
import { formatDate } from '../services/helper';

const GardenCard = ({ navigation, garden, onUpdate }) => {
  const { t } = useTranslation();
  const garden_image = !garden.image_url
    ? 'https://cdn-icons-png.flaticon.com/512/3039/3039008.png'
    : garden.image_url;

  const [modalVisible, setModalVisible] = useState(false);
  const [gardenNotes, setGardenNotes] = useState([]);

  const { height } = Dimensions.get('window');

  useEffect(() => {
    const fetchData = async () => {
      const notes = await getGardensNoteById(garden.id);
      setGardenNotes(notes);
    };
    fetchData();
  }, []);

  const handleDelete = async (gardenId, onUpdate) => {
    try {
      await deleteGarden(gardenId);
      ToastAndroid.show(t('toast1_deleteGarden'), ToastAndroid.SHORT);
      onUpdate(garden, 'delete');
    } catch (error) {
      console.log('Delete garden error: ', error);
    }
  };

  const shareGarden = async (garden, gardenNotes, imageUri) => {
    try {
      let message = `Explore the ${garden.name} garden:\n\n`;

      // Bahçenin oluşturulduğu tarih
      message += `📅 Garden Created At: ${formatDate(garden.created_at)}\n\n`;

      // Bahçe notlarını ekleyin
      if (gardenNotes && gardenNotes.length > 0) {
        message += '📋 Garden Notes (from newest to oldest):\n';
        gardenNotes.forEach(note => {
          if (note.note) {
            message += `- ${note.note} (${formatDate(note.created_at)})\n`;
          }
        });
      } else {
        message += '📋  No notes available\n\n';
      }

      if (imageUri) {
        message += `\n📷 Last Captured Image of the Garden:\n ${imageUri}\n\n`;
      }
      const result = await Share.share({
        message: message,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Share with ', result.activityType);
        } else {
          console.log('Shared');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Dismissed');
      }
    } catch (error) {
      console.error('Error Sharing}', error.message);
    }
  };

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('ViewGarden', { garden, onUpdate });
      }}>
      <View className="flex flex-row justify-center">
        <View className="w-3/4 bg-white p-4 rounded-lg m-4">
          <View className="flex flex-row justify-between items-center">
            <Text className="text-[#212121] text-center">{garden.name}</Text>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Image
                className="w-6 h-6"
                source={require('../images/icons/ic_options.png')}></Image>
            </TouchableOpacity>
            <CustomModal
              animation="slide"
              visible={modalVisible}
              mode="overFullScreen"
              boxBackgroundColor="lightyellow"
              transparentContainer={true}
              bottomHalf={true}
              outsideClick={() => {
                setModalVisible(false);
              }}>
              <TouchableOpacity
                className="items-center py-4 px-5 bg-[#FFF1DD] rounded-t-3xl border-2 border-black"
                onPress={() =>
                  navigation.navigate('EditGarden', { garden, onUpdate })
                }>
                <Text className="text-black font-bold">{t('edit_gc')}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="items-center py-4 px-5 bg-[#FFF1DD] border-b-2 border-x-2 border-black"
                onPress={() =>
                  shareGarden(garden, gardenNotes, [garden_image])
                }>
                <Text className="text-black font-bold">{t('share_gc')}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="items-center py-4 px-5 bg-[#FFF1DD] border-b-2 border-x-2 border-black"
                onPress={() => handleDelete(garden.id)}>
                <Text className="text-black font-bold">{t('delete_gc')}</Text>
              </TouchableOpacity>
            </CustomModal>
          </View>
          <Image
            className="w-full"
            style={{
              height: height * 0.25,
            }}
            source={{
              uri: garden_image,
            }}></Image>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default GardenCard;
