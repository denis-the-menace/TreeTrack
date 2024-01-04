import {
  Dimensions,
  Image,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuProvider,
  MenuTrigger,
} from 'react-native-popup-menu';
import {deleteGarden} from '../services/garden_services';

const {height} = Dimensions.get('window');
// delete garden -> bu islemin digerleri gibi child componentlarda olması lazım
const handleDelete = async (gardenId, onUpdate) => {
  try {
    await deleteGarden(gardenId);
    ToastAndroid.show('Garden is deleted.', ToastAndroid.SHORT);
    onUpdate();
  } catch (error) {
    console.log('Delete garden error: ', error);
  }
};

const GardenCard = ({navigation, garden, onUpdate}) => {
  const garden_image = !garden.image_url
    ? 'https://cdn-icons-png.flaticon.com/512/3039/3039008.png'
    : garden.image_url;
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('ViewGarden', {garden, onUpdate});
      }}>
      <View className="flex flex-row justify-center mb-2">
        <View className="w-3/4 bg-white p-4 rounded-lg m-4">
          <Image
            className="w-full"
            style={{
              height: height * 0.25,
            }}
            source={{
              uri: garden_image,
            }}></Image>

          <View className="flex flex-row justify-between items-center">
            <Text className="text-[#212121] text-center">{garden.name}</Text>

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
                      navigation.navigate('EditGarden', {garden, onUpdate})
                    }>
                    <Text className="text-center text-[#212121]">Edit</Text>
                  </MenuOption>
                  <MenuOption
                    className="border-[#888888] border-b-2"
                    onSelect={() => alert(`Share`)}>
                    <Text className="text-center text-[#212121]">Share</Text>
                  </MenuOption>
                  <MenuOption
                    onSelect={() => handleDelete(garden.id, onUpdate)}>
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

export default GardenCard;
