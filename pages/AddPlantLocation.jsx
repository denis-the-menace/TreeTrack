import { View, Text, TouchableOpacity, ToastAndroid, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from '../styles/Style';
import MapView, { PROVIDER_GOOGLE, Polygon, Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import React, { useState, useEffect } from 'react';
import {useRoute} from '@react-navigation/native';
import { getPlantsOfGarden, isInsidePolygon } from '../services/garden_services';
import { setMapPositionByGardenArea } from '../services/helper';
import { useTranslation } from 'react-i18next';

const AddPlantLocation = ({navigation}) => {
  const { t } = useTranslation();
  const [selectedMapType, setMapType] = useState("standard");
  const [selectedLocation, setSelectedLocation] = useState(null);
    // get current position
  const [currentPosition, setPosition] = useState({
    latitude: 10,
    longitude: 10,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });
  // current position updated when user moves
  useEffect(() => {
    Geolocation.getCurrentPosition(pos => {
      const crd = pos.coords;
      setPosition({
        latitude: crd.latitude,
        longitude: crd.longitude,
        latitudeDelta: 0.001, // zoom map
        longitudeDelta: 0.001,
      });
    });
  }, []);

  const route = useRoute();
  const garden = route.params.garden;
  const newPlantName = route.params.plantName;
  const onUpdate = route.params.onUpdate;
  const [plants, setPlantList] = useState([]);
  // get plants of selected garden
  useEffect(() => {
    const fetchData = async () => {
      setPlantList(await getPlantsOfGarden(garden.id));
    };
    fetchData();
  }, []);

  const handleMapPress = (e) => {
    e.persist();
    // if pressed point is outside of garden, do not show alert box to add garden
    const isInsideGarden = isInsidePolygon(e.nativeEvent.coordinate, polygon);
    if(isInsideGarden){
      setSelectedLocation(e.nativeEvent.coordinate)
      ToastAndroid.show(t("toast1_apl"), ToastAndroid.SHORT)
    }else{
      ToastAndroid.show(t("toast2_apl"), ToastAndroid.LONG)
    }
   
  };
  const handleCurrentLocationPress = () => {
    // check whether current location is inside of garden
    const isInsideGarden = isInsidePolygon(currentPosition, polygon)
    if(isInsideGarden){
      setSelectedLocation(currentPosition)
        ToastAndroid.show(t("toast1_apl"), ToastAndroid.SHORT)
    }else{
        ToastAndroid.show(t("toast3_apl"), ToastAndroid.LONG)
    }
  }

  const polygon = garden.polygon;
  let region = currentPosition;
  if (polygon.length > 2) {
    region = setMapPositionByGardenArea(polygon);
  }
  else{
    ToastAndroid.show(t("toast4_apl"), ToastAndroid.SHORT)
  }

  return (
    <LinearGradient colors={['#89C6A7', '#89C6A7']} style={{height: '100%'}}>
      <View style={styles.container}>
        <Text style={styles.text}>{t("select_plant_location")}</Text>

        <Text
          style={{
            fontSize: 16,
            color: '#efefef',
            marginBottom: 10,
          }}>
          {t("select_location_instructions")}
        </Text>

        <View style={{width: '100%', height: '50%'}}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={{width: '100%', height: '100%', marginBottom: 15}}
            showsUserLocation={true}
            initialRegion={region}
            onPress={handleMapPress}
            mapType={selectedMapType}>
            {polygon.length > 2 && (
              <Polygon
                coordinates={polygon}
                strokeWidth={2}
                fillColor="rgba(167, 255, 200, 0.31)"
              />
            )}
            {plants.map(plant => (
              <Marker
                key={plant.id}
                coordinate={{
                  latitude: plant.location.latitude,
                  longitude: plant.location.longitude,
                }}
                onPress={() => {
                  ToastAndroid.show(t("toast5_apl"), ToastAndroid.LONG)
                }}
                style={{alignItems: 'center', justifyContent: 'center'}}>
                <Text 
                  style={{ color: 'black', backgroundColor: '#efefef', opacity: 0.6}}>
                  {plant.name}
                </Text>
                <Image
                  source={{
                    uri: 'https://cdn-icons-png.flaticon.com/64/685/685025.png',
                  }}
                  resizeMode="stretch"
                  style={{
                    height: 25,
                    width: 25,
                    opacity: 0.4,
                    tintColor: "gray"
                  }}
                />
              </Marker>
            ))}
            {selectedLocation &&
             <Marker
                coordinate={{
                  latitude: selectedLocation.latitude,
                  longitude: selectedLocation.longitude,
                }}
                style={{alignItems: 'center', justifyContent: 'center'}}
                >
                <Text 
                  style={{ color: 'black', backgroundColor: '#efefef'}}>
                  {newPlantName}
                </Text>
                <Image
                  source={{
                    uri: 'https://cdn-icons-png.flaticon.com/64/685/685025.png',
                  }}
                  resizeMode="stretch"
                  style={{
                    height: 25,
                    width: 25,
                  }}
                />
              </Marker>}
          </MapView>
          <View
            style={{
              position: 'absolute',
              bottom: 10,
              right: 10,
              zIndex: 1,
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#fff',
                borderColor: '#21212130',
                borderStyle: 'solid',
                borderWidth: 1,
                borderRadius: 10,
                padding: 10,
              }}
              onPress={handleCurrentLocationPress}>
              <Text style={{color: '#212121', fontSize: 12, fontWeight: '500'}}>
               {t("current_location_selected")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
            backgroundColor: '#09A555',
            padding: 4,
            borderRadius: 8,
            marginTop: 5
          }}>
          <TouchableOpacity
            onPress={() => setMapType('standard')}
            style={{
              backgroundColor:
                selectedMapType == 'standard' ? '#25596E' : '#09A555',
              paddingHorizontal: 32,
              paddingVertical: 5,
              borderRadius: 5,
            }}>
            <Text style={{color: "white"}}>{t("standard")}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setMapType('hybrid')}
            style={{
              backgroundColor:
                selectedMapType == 'hybrid' ? '#25596E' : '#09A555',
              paddingHorizontal: 32,
              paddingVertical: 5,
              borderRadius: 5,
            }}>
            <Text style={{color: "white"}}>{t("hybrid")}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setMapType('satellite')}
            style={{
              backgroundColor:
                selectedMapType == 'satellite' ? '#25596E' : '#09A555',
              paddingHorizontal: 32,
              paddingVertical: 5,
              borderRadius: 5,
            }}>
            <Text style={{color: "white"}}>{t("satellite")}</Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity style={styles.button_right} 
        onPress={() => {
          navigation.navigate('CreatePlant', {"coordinates": selectedLocation, garden, onUpdate}); // go back to create page to save garden
        }}>
          <Text style={styles.bt1}> {t("save_location")} </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

export default AddPlantLocation;