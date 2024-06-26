import {View, Text, Image, RefreshControl, ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {TouchableOpacity} from 'react-native';
import GardenCard from './GardenCard';
import {useState, useCallback, useEffect} from 'react';
import {getUserGardens} from '../services/garden_services';
import { useTranslation } from 'react-i18next';

const FilledGardens = ({navigation, gardens, onUpdate}) => {
  const { t } = useTranslation();
  const [refreshing, setRefreshing] = useState(false);
  const [gardenList, setGardenList] = useState(gardens);

  useEffect(() => {
    setGardenList(gardens);
    // console.log("gardens useEffect");
  }, [gardens]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    const data = await getUserGardens(true);
    setRefreshing(false);
    setGardenList(data);
  }, []);

  return (
    <LinearGradient colors={['#FFFFFF', '#FFFFFF']} className="h-full">
      <View className="flex">
        <View className="flex p-5 h-[10%]">
          <Text className="font-bold text-3xl text-[#9E673D]">
            {t("my_gardens_B")}
          </Text>
        </View>
        <View className="h-[90%]">
          <LinearGradient
            colors={['#D1A96DE5', '#DB966FE5']}
            className="h-full p-5 rounded-t-[40px]">
            <ScrollView
              className="mb-20"
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }>
              {gardenList.map(garden => (
                // FIX: yeni garden'in garden id'si daha databasede yaratiliyor oldugu icin undefined oluyor
                // console.log("Key: " + garden.id),
                <GardenCard
                  key={garden.id}
                  navigation={navigation}
                  garden={garden}
                  onUpdate={onUpdate}
                />
              ))}
            </ScrollView>

            <TouchableOpacity
              className="absolute bg-[#FFF1DD] p-5 rounded-full right-5 bottom-24"
              onPress={() => {
                navigation.navigate('CreateGarden', {onUpdate: onUpdate});
              }}>
              <Image
                source={require('../images/icons/plus.png')}
                resizeMode="stretch"
                className="w-6 h-6"
              />
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    </LinearGradient>
  );
};

export default FilledGardens;
