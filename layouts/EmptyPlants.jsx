import { View, Text, Image } from "react-native"
import LinearGradient from "react-native-linear-gradient";
import { TouchableOpacity } from "react-native";
import strings from '../strings/string';

const EmptyPlants = ({navigation, garden}) => {
  const gardenName = garden.name;

  return (
    <LinearGradient colors={['#89C6A7', '#89C6A7']} className="h-full">
      <View className="p-5">
        <Text className="text-[#FFF1DD] text-2xl font-bold">{gardenName}</Text>
        <Text className="text-[#FFF1DD] text-3xl font-bold">{strings.my_plants_B}</Text>

        <View className="flex justify-center items-center mt-20">
          <TouchableOpacity
            className="bg-[#25596E] rounded-full p-5"
            onPress={() => {
              navigation.navigate('CreatePlant', {garden: garden});
            }}>
            <Image
              source={require('../images/icons/plus2.png')}
              resizeMode="stretch"
              className="w-6 h-6"
            />
          </TouchableOpacity>
          <Text className="text-[#FFF1DD] mt-2 text-3xl font-bold">
		  {strings.addPlant_vg}
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
};

export default EmptyPlants;
