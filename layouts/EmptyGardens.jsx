import { View, Text, Image } from "react-native"
import LinearGradient from "react-native-linear-gradient";
import { TouchableOpacity } from "react-native";
import strings from '../strings/string';



const EmptyGardens = ({navigation}) => {
  return (
    <LinearGradient colors={['#D1A96DE5', '#DB966FE5']} className="h-full">
      <View className="p-5">
      <Text className="text-[#FFF1DD] text-3xl font-bold">{strings.my_gardens_B}</Text>
        <View className="flex justify-center items-center mt-20">
          <TouchableOpacity
            className="bg-[#FFF1DD] rounded-full p-5"
            onPress={() => {
              navigation.navigate('CreateGarden');
            }}>
            <Image
              source={require('../images/icons/plus.png')}
              resizeMode="stretch"
              className="w-6 h-6"
            />
          </TouchableOpacity>
          <Text className="text-[#FFF1DD] mt-2 text-3xl font-bold">
          {strings.addGarden_eg}
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
};

export default EmptyGardens;
