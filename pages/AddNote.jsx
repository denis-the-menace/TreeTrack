import {View, Text, TouchableOpacity, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from '../styles/Style';
import React, {useEffect, useState} from 'react';
import PlantNote from '../layouts/add_note/PlantNote';
import GardenNote from '../layouts/add_note/GardenNote';
import {isEmptyGarden} from '../services/garden_services';
import { useTranslation } from 'react-i18next';

const AddPlantNote = ({navigation}) => {
  const { t } = useTranslation();
  const [showGarden, setShowGarden] = useState(false); // display plant note page by default
  const [isEmpty, setIsEmptyGarden] = useState(-1);
  useEffect(() => {
    const fetchData = async () => {
      setIsEmptyGarden(await isEmptyGarden());
    };
    fetchData();
  }, []);
  
  return (
    <LinearGradient colors={['#89C6A7', '#89C6A7']} style={{height: '100%'}}>
      <View
        style={{
          padding: 20,
          flex: 1,
          marginBottom: 150,
        }}>
        <Text style={styles.text}>{t("add_note_B")}</Text>
        {isEmpty === true && (
          <View>
            <Text style={styles.t4}>
            {t("no_garden_message")}
            </Text>
            <TouchableOpacity
              style={{
                padding: 6,
                backgroundColor: '#09A555',
                alignSelf: 'center',
                width: 210,
                borderRadius: 10,
                elevation: 7,
                marginVertical: 20,
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
              }}
              onPress={() => {
                navigation.navigate('CreateGarden');
              }}>
              <Image
                source={require('../images/icons/plant_white.png')}
                style={{width: 25, height: 25, marginRight: 10}}></Image>
              <Text style={{...styles.t4, alignSelf: 'center'}}>
                {t("add_garden_button")}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {isEmpty !== true && (
          <View>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <View
                style={{
                  flexDirection: 'row',
                  padding: 5,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10,
                  backgroundColor: '#09A555',
                }}>
                <TouchableOpacity
                  style={{
                    width: 100,
                    padding: 5,
                    backgroundColor: !showGarden ? '#25596E' : '#09A555',
                    borderRadius: 5,
                  }}
                  onPress={() => setShowGarden(false)}>
                  <Text style={styles.bt1}>{t("plant")}</Text>
                </TouchableOpacity>

                <View
                  style={{
                    backgroundColor: '#FFFFFF50',
                    width: 2,
                    height: 25,
                    marginStart: 5,
                    marginEnd: 5,
                  }}></View>

                <TouchableOpacity
                  style={{
                    width: 100,
                    padding: 5,
                    backgroundColor: showGarden ? '#25596E' : '#09A555',
                    borderRadius: 5,
                  }}
                  onPress={() => setShowGarden(true)}>
                  <Text style={styles.bt1}> {t("garden")} </Text>
                </TouchableOpacity>
              </View>
            </View>

            {!showGarden && <PlantNote navigation={navigation}></PlantNote>}
            {showGarden && <GardenNote navigation={navigation}></GardenNote>}
          </View>
        )}
      </View>
    </LinearGradient>
  );
};

export default AddPlantNote;
