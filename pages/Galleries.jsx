import { View, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from '../styles/Style';
import GardenGallery from '../layouts/gallery/GardenGallery';
import PlantGallery from '../layouts/gallery/PlantGallery';
import React, { useState, useEffect } from 'react';
import strings from '../strings/string';

const Galleries = ({ route }) => {
  // TODO: view in gallery
  const garden =
    route.params && route.params.garden ? route.params.garden : null;
  const plant = route.params && route.params.plant ? route.params.plant : null;
  const isGardenShown =
    route.params && route.params.showGarden !== null
      ? route.params.showGarden
      : false;

  const [showGarden, setShowGarden] = useState(true); // display gardens by default

  return (
    <LinearGradient colors={['#FFFFFF', '#FFFFFF']} className="h-full">
      <View className="flex">
        <View className="flex h-1/6 p-5">
          <Text style={styles.text2}>
            {strings.gallery_title}
          </Text>

          <View className="flex flex-row justify-center">
            <View className="p-2 flex flex-row items-center justify-center rounded-m">
              <TouchableOpacity
                className="p-2 rounded-lg w-24"
                style={{
                  backgroundColor: showGarden ? '#25596E' : '#09A555',
                }}
                onPress={() => setShowGarden(true)}>
                <Text className="text-white text-center"> {strings.garden_button} </Text>
              </TouchableOpacity>

              <View className="bg-[#FFFFFF50] w-1 h-8 mx-2"></View>

              <TouchableOpacity
                className="p-2 rounded-lg w-24"
                style={{
                  backgroundColor: !showGarden ? '#25596E' : '#09A555',
                }}
                onPress={() => setShowGarden(false)}>
                <Text className="text-white text-center"> {strings.plant_button} </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View className="flex h-5/6 p-5 bg-[#89C6A7] rounded-t-[40px] items-center">
          {showGarden && (
            <GardenGallery selectedGarden={garden}></GardenGallery>
          )}
          {!showGarden && <PlantGallery></PlantGallery>}
        </View>
      </View>
    </LinearGradient>
  );
};

export default Galleries;
