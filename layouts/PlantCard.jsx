import {
  Dimensions,
  Image,
  Text,
  ToastAndroid,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuProvider,
  MenuTrigger,
} from 'react-native-popup-menu';
import {deletePlant} from '../services/plant_services';

const {height} = Dimensions.get('window');
// delete garden -> bu islemin digerleri gibi child componentlarda olması lazım
const handleDelete = async (plantId, onUpdate) => {
  try {
    await deletePlant(plantId);
    ToastAndroid.show('Plant is deleted.', ToastAndroid.SHORT);
    onUpdate();
  } catch (error) {
    console.log('Delete plant error: ', error);
  }
};

const PlantCard = ({navigation, plant, garden, onUpdate}) => {
  const plant_image = !plant.image_url
    ? 'https://cdn-icons-png.flaticon.com/512/1892/1892747.png'
    : plant.image_url;

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('ViewPlant', {plant, garden, onUpdate});
      }}>
      <View className="flex flex-row justify-center mb-2">
        <View className="w-3/4 bg-white p-4 rounded-lg m-4">
          <Image
            className="w-full mb-2"
            style={{
              height: height * 0.25,
            }}
            source={{
              uri: plant_image,
            }}></Image>
          <View className="flex flex-row justify-between items-center mt-4">
            <Text className="text-[#212121] text-center">{plant.name}</Text>

            <Menu>
              <MenuTrigger>
                <Image
                  className="w-6 h-6"
                  source={require('../images/icons/ic_options.png')}></Image>
              </MenuTrigger>
              <MenuOptions
                optionsContainerStyle={{
                  width: '30%',
                  backgroundColor: '#FFF1DD',
                  borderRadius: 24,
                }}>
                <View className="border-[#888888] border-4 rounded-3xl">
                  <MenuOption
                    className="border-[#888888] border-b-2"
                    onSelect={() =>
                      navigation.navigate('EditPlant', {
                        plant,
                        garden,
                        onUpdate,
                      })
                    }>
                    <Text className="text-center text-[#212121]">Edit</Text>
                  </MenuOption>
                  <MenuOption
                    className="border-[#888888] border-b-2"
                    onSelect={() => alert(`Share`)}>
                    <Text className="text-center text-[#212121]">Share</Text>
                  </MenuOption>
                  <MenuOption onSelect={() => handleDelete(plant.id, onUpdate)}>
                    <Text className="text-center text-[#C04444]">Delete</Text>
                  </MenuOption>
                </View>
              </MenuOptions>
            </Menu>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PlantCard;
