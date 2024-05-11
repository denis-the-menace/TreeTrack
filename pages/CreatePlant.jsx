import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  ToastAndroid,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from '../styles/Style';
import React, {useState, useEffect} from 'react';
import {insertNewPlant} from '../services/plant_services';
import AutocompleteInput from 'react-native-autocomplete-input';
import {getPlantTypes, searchPlantType} from '../services/plant_type_services';
import {useTranslation} from 'react-i18next';

const CreatePlant = ({route, navigation}) => {
  const {t} = useTranslation();
  const onUpdate =
    route.params && route.params.onUpdate ? route.params.onUpdate : () => {};
  const plantLocation =
    route.params && route.params.coordinates ? route.params.coordinates : [];
  const garden = route.params.garden;
  const [plantName, setPlantName] = useState(null);

  const [plantTypes, setPlantTypes] = useState([]);
  // get plant types
  useEffect(() => {
    const fetchData = async () => {
      setPlantTypes(await getPlantTypes());
    };
    fetchData();
  }, []);

  // add plant
  const addPlant = async () => {
    const plantData = {
      name: plantName,
      created_at: new Date(),
      garden_id: garden.id,
      location: plantLocation,
    };
    // TODO: bitki notunu da kaydet?
    try {
      // search plant type
      const searchPlantTypeResult = await searchPlantType(
        selectedPlantType,
        plantTypes,
      );
      plantData.plant_type = searchPlantTypeResult.plant_type;
      // if new type is inserted, update the list
      setPlantTypes(searchPlantTypeResult.plantTypes);
      await insertNewPlant(plantData);
      ToastAndroid.show(t('toast1_cp'), ToastAndroid.SHORT);
      // console.log(route.params.onUpdate);
      onUpdate(plantData);
      navigation.navigate('Plants', {garden});
    } catch (error) {
      console.log('Insert plant error: ', error);
    }
  };

  const [selectedPlantType, setSelectedPlantType] = useState('');
  const [isHidden, setShowAutoCompleteResult] = useState(true);
  const findPlantTypes = searchText => {
    if (searchText === '') {
      return [];
    }
    const filteredPlantTypes = plantTypes.filter(plantType =>
      plantType.toLowerCase().includes(searchText.toLowerCase()),
    );
    return filteredPlantTypes;
  };

  const handleSelection = item => {
    setSelectedPlantType(item);
    setShowAutoCompleteResult(true);
  };
  return (
    <LinearGradient colors={['#89C6A7', '#89C6A7']} style={{height: '100%'}}>
      <View style={{padding: 20, flex: 1, marginBottom: 110}}>
        <Text
          style={{
            fontSize: 20,
            color: 'white',
            fontWeight: 'bold',
            color: '#fff',
          }}>
          {' '}
          {'\u003E'}
          {garden.name}{' '}
        </Text>
        <Text style={styles.text}>{t('add_new_plant')}</Text>
        {/* add plant section */}
        <View>
          <Text style={styles.t4}>{t('give_name_to_plant')}</Text>
          <TextInput
            value={plantName}
            onChangeText={text => setPlantName(text)}
            placeholderTextColor={'#21212160'}
            placeholder="Plant Name"
            style={{
              width: '100%',
              height: 42,
              paddingStart: 10,
              paddingEnd: 10,
              backgroundColor: 'white',
              borderRadius: 10,
              borderWidth: 0,
              color: '#212121',
              textAlignVertical: 'top',
              elevation: 5,
              fontSize: 16,
            }}></TextInput>
          <Text style={styles.t4}>{t('select_plant_type')}</Text>
          <View
            style={{
              width: '100%',
              height: isHidden ? 42 : 150,
              borderWidth: 0,
              borderRadius: 5,
              marginBottom: isHidden ? 0 : 20,
            }}>
            <AutocompleteInput
              data={findPlantTypes(selectedPlantType)}
              defaultValue={selectedPlantType}
              onChangeText={text => {
                setSelectedPlantType(text);
                setShowAutoCompleteResult(false);
              }}
              hideResults={isHidden}
              style={{
                width: '100%',
                height: 42,
                paddingStart: 10,
                paddingEnd: 10,
                backgroundColor: 'white',
                borderRadius: 10,
                borderWidth: 0,
                color: '#212121',
                textAlignVertical: 'top',
                elevation: 5,
                fontSize: 16,
              }}
              placeholder={t('enter_plant_type')}
              placeholderTextColor={'#21212160'}
              flatListProps={{
                keyExtractor: (_, idx) => idx,
                renderItem: ({item}) => (
                  <TouchableOpacity
                    style={{
                      borderWidth: 0,
                      borderRadius: 5,
                    }}
                    onPress={() => handleSelection(item)}>
                    <Text
                      style={{
                        borderWidth: 0,
                        padding: 10,
                        color: '#212121',
                      }}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                ),
              }}
            />
          </View>
        </View>
        <View
          style={{
            padding: 10,
            width: '100%',
          }}>
          <Text style={styles.t4}>{t('add_location_plant')}</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              style={{
                ...styles.button_left,
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onPress={() => {
                navigation.navigate('AddPlantLocation', {
                  garden,
                  plantName,
                  onUpdate,
                });
              }}>
              <Image
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/32/854/854901.png',
                }}
                style={{
                  width: 25,
                  height: 25,
                }}></Image>
              <Text style={{...styles.bt1, color: '#212121', marginLeft: 5}}>
                {t('open_map')}{' '}
              </Text>
            </TouchableOpacity>
            {plantLocation.length > 2 && (
              <Image
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/32/8968/8968523.png',
                }}
                style={{
                  width: 38,
                  height: 38,
                }}></Image>
            )}
          </View>
        </View>

        <TouchableOpacity
          style={{...styles.button_right, width: 125}}
          onPress={addPlant}>
          <Text style={{...styles.bt1}}>{t('add_button')}</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default CreatePlant;
