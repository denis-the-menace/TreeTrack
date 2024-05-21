import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ToastAndroid,
  Image,
  KeyboardAvoidingView
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from '../../styles/Style';
import PhotoPick from '../photo_picker/ImagePicker';
import { Picker } from '@react-native-picker/picker';
import { getSortedGardensByDistance } from '../../services/garden_services';
import Geolocation from '@react-native-community/geolocation';
import storage from '@react-native-firebase/storage';
import { useRoute } from '@react-navigation/native';
import { insertPlantNote } from '../../services/plant_services';
import DatePicker from 'react-native-date-picker';
import { useTranslation } from 'react-i18next';

const PlantNote = ({ navigation }) => {
  const { t } = useTranslation();
  const [gardenList, setGardenList] = useState([]);
  const [isSaveDisabled, setIsSaveDisabled] = useState(false);
  const [currentPosition, setPosition] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    Geolocation.getCurrentPosition(pos => {
      const crd = pos.coords;
      setPosition({
        latitude: crd.latitude,
        longitude: crd.longitude,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      });
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (currentPosition) {
        setGardenList(await getSortedGardensByDistance(currentPosition));
      }
    };
    fetchData();
  }, [currentPosition]);

  const route = useRoute();
  let selectedPlant = route.params && route.params.selectedPlant ? route.params.selectedPlant : null;
  let gardenNames = gardenList.map(garden => ({
    id: garden.id,
    gardenName: garden.name,
  }));

  const [selectedGarden, setSelectedGarden] = useState(gardenList[0]);
  const [gardenPickerValue, setGardenPickerValue] = useState(gardenNames[0]);
  const [plantNote, setPlantNote] = useState('');
  const [imagePath, setSelectedImage] = useState(null);
  const [isImageCleared, setIsImageCleared] = useState(false);

  const onSelectImage = image => {
    if (!image) {
      setSelectedImage(null);
    } else {
      setSelectedImage(image);
      setIsImageCleared(false);
    }
  };

  const uploadImage = async (imageUri, folderName) => {
    const imageRef = storage().ref(
      `${folderName}/${imageUri.split('/').pop()}`,
    );
    const response = await fetch(imageUri);
    const blob = await response.blob();
    await imageRef.put(blob);
  };

  const getImageUrl = async (folderName, imageName) => {
    const imageRef = storage().ref(`${folderName}/${imageName}`);
    return await imageRef.getDownloadURL();
  };

  const saveNote = async () => {
    if (!selectedPlant) {
      ToastAndroid.show(
        t("toast1_plantNote"),
        ToastAndroid.LONG,
      );
    } else {
      setIsSaveDisabled(true);
      let imageUrl = null;
      if (imagePath != null && imagePath.path != null) {
        const imageName = imagePath.path.split('/').pop();
        await uploadImage(imagePath.path, 'plants');
        imageUrl = await getImageUrl('plants', imageName);
      }
      const newPlantNote = {
        created_at: selectedDate,
        plant_id: selectedPlant.id,
        note: plantNote,
        image_url: imageUrl,
      };
      try {
        await insertPlantNote(newPlantNote);
        ToastAndroid.show(
          'Plant note for ' + selectedPlant.name + ' is saved.',
          ToastAndroid.LONG,
        );
        setIsImageCleared(true);
        setPlantNote('');
        setSelectedGarden(gardenList[0]);
        setGardenPickerValue(gardenNames[0]);
        navigation.setParams({ selectedPlant: null });
        setIsSaveDisabled(false);
      } catch (error) {
        console.log('Insert plant note error: ', error);
      }
    }
  };

  return (
    <LinearGradient colors={['#89C6A7', '#89C6A7']} style={{ height: '100%' }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ marginBottom: 90, paddingHorizontal: 10 }}>
          <Text style={styles.t4}>
            {t("add_photo_pn")}
          </Text>
          <PhotoPick
            onSelect={onSelectImage}
            isCleared={isImageCleared}
            setIsCleared={setIsImageCleared}
          />

          <Text style={styles.t4}>{t("selectGarden_gn")}</Text>
          <View style={styles.picker_view}>
            <Picker
              dropdownIconRippleColor={'rgba(202, 255, 222, 0.56)'}
              dropdownIconColor={'#21212110'}
              style={{ color: '#212121' }}
              selectedValue={gardenPickerValue}
              onValueChange={(itemValue) => {
                setGardenPickerValue(itemValue);
                setSelectedGarden(
                  gardenList.find((garden) => garden.id === itemValue)
                );
              }}
            >
              {gardenNames.map((garden) => (
                <Picker.Item
                  key={garden.id}
                  label={garden.gardenName}
                  value={garden.id}
                />
              ))}
            </Picker>
          </View>

          <Text style={styles.t4}>{t("selectDate_pn")}</Text>
          <DatePicker
            date={selectedDate}
            onDateChange={setSelectedDate}
            mode="date"
            locale="en"
          />

          <Text style={styles.t4}>{t("enterNotes_gn")}</Text>
          <KeyboardAvoidingView
            behavior="padding"
            keyboardVerticalOffset={10}
            style={{ flex: 1 }}
          >
            <ScrollView
              style={{ maxHeight: 130 }}
              contentContainerStyle={{ flexGrow: 1 }}
            >
              <TextInput
                value={plantNote}
                onChangeText={(text) => setPlantNote(text)}
                multiline
                numberOfLines={5}
                placeholder={t("plant_notes_n")}
                placeholderTextColor={'#21212160'}
                style={styles.text_area}
                scrollEnabled={false}
              />
            </ScrollView>

            <Text style={styles.t4}>{t("select_plant_pn")}</Text>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <TouchableOpacity
                style={{
                  ...styles.button_left,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                onPress={() => {
                  navigation.navigate('SelectPlant', { selectedGarden: selectedGarden });
                }}
              >
                <Image
                  source={{
                    uri: 'https://cdn-icons-png.flaticon.com/32/854/854901.png',
                  }}
                  style={{
                    width: 25,
                    height: 25,
                  }}
                ></Image>
                <Text style={{ ...styles.bt1, color: '#212121', marginLeft: 5 }}> {t("openMap_mm")} </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.button_right,
                  isSaveDisabled && styles.button_disabled
                ]}
                onPress={saveNote}
                disabled={isSaveDisabled}
              >
                <Text style={styles.bt1}> {t("save_button")} </Text>
              </TouchableOpacity>
            </View>

          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default PlantNote;
