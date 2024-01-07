import {
  Dimensions,
  Image,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {deletePlant} from '../services/plant_services';
import strings from '../strings/string';
import CustomModal from '../components/CustomModal';
import {useState} from 'react';

const {height} = Dimensions.get('window');
// delete garden -> bu islemin digerleri gibi child componentlarda olması lazım
const handleDelete = async (plantId, onUpdate) => {
  try {
    await deletePlant(plantId);
    ToastAndroid.show(strings.toast1_plantCard, ToastAndroid.SHORT);
    onUpdate();
  } catch (error) {
    console.log('Delete plant error: ', error);
  }
};

const PlantCard = ({navigation, plant, garden, onUpdate}) => {
  const plant_image = !plant.image_url
    ? 'https://cdn-icons-png.flaticon.com/512/1892/1892747.png'
    : plant.image_url;

  const [modalVisible, setModalVisible] = useState(false);

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
                <Text className="text-black font-bold">
                  {strings.edit_pc}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="items-center py-4 px-5 bg-[#FFF1DD] border-b-2 border-x-2 border-black"
                onPress={() => alert(`Share`)}>
                <Text className="text-black font-bold">
                  {strings.share_pc}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="items-center py-4 px-5 bg-[#FFF1DD] border-b-2 border-x-2 border-black"
                onPress={() => handleDelete(plant.id, onUpdate)}>
                <Text className="text-black font-bold">
                  {strings.delete_pc}
                </Text>
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
