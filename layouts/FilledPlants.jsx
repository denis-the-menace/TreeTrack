import {View, Text, Image, RefreshControl, ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {TouchableOpacity} from 'react-native';
import PlantCard from './PlantCard';
import {useState, useCallback} from 'react';
import {MenuProvider} from 'react-native-popup-menu';
import {getPlantsOfGarden} from '../services/garden_services';
import { useTranslation } from 'react-i18next';

const FilledPlants = ({navigation, garden, plants, onUpdate}) => {
  const { t } = useTranslation();
  const [refreshing, setRefreshing] = useState(false);
  const [plantList, setPlantList] = useState(plants);
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    const data = await getPlantsOfGarden(garden.id, true);
    setRefreshing(false);
    setPlantList(data);
  }, []);
  const gardenName = garden.name;
  return (
    <LinearGradient colors={['#FFFFFF', '#FFFFFF']} className="h-full">
      <View className="flex">
        <View className="flex p-5 h-[13%]">
          <Text className="font-bold text-2xl text-[#3A7C5A] mb-2">
            {gardenName}
          </Text>
          <Text className="font-bold text-3xl text-[#09A555]">
            {t("my_plants_B")}
          </Text>
        </View>
        <View className="h-[90%]">
          <LinearGradient
            colors={['#89C6A7', '#89C6A7']}
            className="h-full p-5 rounded-t-[40px]">
            <ScrollView
              className="mb-20"
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }>
              {plantList.map(plant => (
                <PlantCard
                  navigation={navigation}
                  key={plant.name}
                  plant={plant}
                  garden={garden}
                  onUpdate={onUpdate}
                />
              ))}
            </ScrollView>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate(
                  'CreatePlant',
                  {garden: garden},
                  {onUpdate: onUpdate},
                );
              }}
              className="absolute p-2 rounded-full right-4 bottom-36">
              <Image
                source={require('../images/icons/plus3.png')}
                resizeMode="stretch"
                className="w-16 h-16"
              />
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    </LinearGradient>
  );
};

export default FilledPlants;
