import LinearGradient from 'react-native-linear-gradient';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import { useTranslation } from 'react-i18next';

const Home = ({navigation}) => {
  const { t } = useTranslation();
  return (
    <LinearGradient colors={['#FFFFFF', '#FFFFFF']} className="h-full">
      <View className="flex">
        <View className="h-2/3 p-8 pt-32 flex items-center">
          <Image
            resizeMode="contain"
            className="w-full"
            source={require('../images/tree_track.png')}></Image>

          <Image
            resizeMode="contain"
            className="w-3/4 mt-8"
            source={require('../images/human.png')}></Image>
        </View>
        <View className="flex h-1/3">
          <LinearGradient
            colors={['#9BC8B0', '#285D13']}
            className="h-full rounded-t-[40px] items-center">
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('SignUp', {setIsSigned: false})
              }
              className="justify-center bg-white rounded-full mt-12 mx-8 h-16 w-3/4 shadow-md">
              <Text className="text-lg text-center font-bold text-green-600">
              {t("signUp_B")}
              </Text>
            </TouchableOpacity>

            <Text className="text-white text-xl mt-4 ml-4">
            {t("alreadyAccount")}
            </Text>

            <Text
              onPress={() =>
                navigation.navigate('SignIn', {setIsSigned: false})
              }
              className="text-white text-xl underline ml-2">
              {t("signIn")}
            </Text>
          </LinearGradient>
        </View>
      </View>
    </LinearGradient>
  );
};

export default Home;
