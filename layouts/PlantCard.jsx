import {
  Dimensions,
  Image,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
  Share,
} from 'react-native';
import {deletePlant, getPlantNotesById} from '../services/plant_services';
import {useTranslation} from 'react-i18next';
import CustomModal from '../components/CustomModal';
import {useState, useEffect} from 'react';
import {formatDate} from '../services/helper';

const PlantCard = ({navigation, plant, garden, onUpdate}) => {
  const {t} = useTranslation();
  const plant_image = !plant.image_url
    ? 'https://cdn-icons-png.flaticon.com/512/1892/1892747.png'
    : plant.image_url;

  const [modalVisible, setModalVisible] = useState(false);
  const [plantNotes, setPlantNotes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const notes = await getPlantNotesById(plant.id);
      setPlantNotes(notes);
    };
    fetchData();
  }, []);

  const {height} = Dimensions.get('window');

  const handleDelete = async (plantId, onUpdate) => {
    try {
      await deletePlant(plantId);
      ToastAndroid.show(t('toast1_deletePlant'), ToastAndroid.SHORT);
      onUpdate(plant, 'delete');
    } catch (error) {
      console.log('Delete plant error: ', error);
    }
  };

  const sharePlant = async (plant, plantNotes, imageUri) => {
    try {
      let message = `Explore the ${plant.name} plant:\n\n`;

      // Bahçenin oluşturulduğu tarih
      message += `📅 Plant Created At: ${formatDate(plant.created_at)}\n\n`;

      // Bahçe notlarını ekleyin
      if (plantNotes && plantNotes.length > 0) {
        message += '📋 Plant Notes (from newest to oldest):\n';
        plantNotes.forEach(note => {
          if (note.note) {
            message += `- ${note.note} (${formatDate(note.created_at)})\n`;
          }
        });
      } else {
        message += '📋  No notes available\n\n';
      }

      if (imageUri) {
        message += `\n📷 Last Captured Image of the Plant:\n ${imageUri}\n\n`;
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
        navigation.navigate('ViewPlant', {plant, garden, onUpdate});
      }}>
      <View className="flex flex-row justify-center">
        <View className="w-3/4 bg-white p-4 rounded-lg m-4">
          <View className="flex flex-row justify-between items-center">
            <Text className="text-[#212121] text-center">{plant.name}</Text>
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
                  navigation.navigate('EditPlant', {
                    plant,
                    garden,
                    onUpdate,
                  })
                }>
                <Text className="text-black font-bold">{t('edit_pc')}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="items-center py-4 px-5 bg-[#FFF1DD] border-b-2 border-x-2 border-black"
                onPress={() => sharePlant(plant, plantNotes, [plant_image])}>
                <Text className="text-black font-bold">{t('share_pc')}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="items-center py-4 px-5 bg-[#FFF1DD] border-b-2 border-x-2 border-black"
                onPress={() => handleDelete(plant.id, onUpdate)}>
                <Text className="text-black font-bold">{t('delete_pc')}</Text>
              </TouchableOpacity>
            </CustomModal>
          </View>
          <Image
            className="w-full mb-2"
            style={{
              height: height * 0.25,
            }}
            source={{
              uri: plant_image,
            }}></Image>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PlantCard;
