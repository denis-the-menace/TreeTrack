import {
  Dimensions,
  Image,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {deleteGarden} from '../services/garden_services';
import strings from '../strings/string';
import CustomModal from '../components/CustomModal';
import {useState} from 'react';

const {height} = Dimensions.get('window');
// delete garden -> bu islemin digerleri gibi child componentlarda olması lazım
const handleDelete = async (gardenId, onUpdate) => {
  try {
    await deleteGarden(gardenId);
    ToastAndroid.show(strings.toast1_gardenCard, ToastAndroid.SHORT);
    onUpdate();
  } catch (error) {
    console.log('Delete garden error: ', error);
  }
};

const GardenCard = ({navigation, garden, onUpdate}) => {
  const garden_image = !garden.image_url
    ? 'https://cdn-icons-png.flaticon.com/512/3039/3039008.png'
    : garden.image_url;

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('ViewGarden', {garden, onUpdate});
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
                  navigation.navigate('EditGarden', {garden, onUpdate})
                }>
                <Text className="text-black font-bold">{strings.edit_gc}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="items-center py-4 px-5 bg-[#FFF1DD] border-b-2 border-x-2 border-black"
                onPress={() => alert(`Share`)}>
                <Text className="text-black font-bold">{strings.share_gc}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="items-center py-4 px-5 bg-[#FFF1DD] border-b-2 border-x-2 border-black"
                onPress={() => handleDelete(garden.id, onUpdate)}>
                <Text className="text-black font-bold">
                  {strings.delete_gc}
                </Text>
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
