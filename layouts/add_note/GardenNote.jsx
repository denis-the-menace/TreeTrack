import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ToastAndroid,
  KeyboardAvoidingView,
  Image,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import { Picker } from '@react-native-picker/picker';
import Geolocation from '@react-native-community/geolocation';
import storage from '@react-native-firebase/storage';
import styles from '../../styles/Style';
import PhotoPick from '../photo_picker/ImagePicker';
import {
  getSortedGardensByDistance,
  insertGardenNote,
} from '../../services/garden_services';
import strings from '../../strings/string';

const GardenNote = ({ navigation }) => {
  const [gardenList, setGardenList] = useState([]);
  const [currentPosition, setPosition] = useState(null);
  useEffect(() => {
    Geolocation.getCurrentPosition((pos) => {
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

  {/* TODO: kullanıcıya en yakın olan bahçelere göre bu liste sıralanmalı */}
  let gardenNames = gardenList.map((garden) => ({
    id: garden.id,
    gardenName: garden.name,
  }));

  const [selectedGarden, setSelectedGarden] = useState(gardenList[0]);
  const [gardenPickerValue, setGardenPickerValue] = useState(gardenNames[0]);
  const [gardenNote, setGardenNote] = useState('');
  const [image, setSelectedImage] = useState(null);
  const [isImageCleared, setIsImageCleared] = useState(false);

  const onSelectImage = (image) => {
    if (!image) {
      setSelectedImage(null);
    } else {
      setSelectedImage(image);
      setIsImageCleared(false);
    }
  };

  const uploadImage = async (imageUri, folderName) => {
    const imageRef = storage().ref(`${folderName}/${imageUri.split('/').pop()}`);
    const response = await fetch(imageUri);
    const blob = await response.blob();

    await imageRef.put(blob);
  };

  const getImageUrl = async (folderName, imageName) => {
    const imageRef = storage().ref(`${folderName}/${imageName}`);
    return await imageRef.getDownloadURL();
  };

  const saveNote = async () => {
    let imageUrl = null;
    if (image != null && image.path != null) {
      const imageName = image.path.split('/').pop();
      await uploadImage(image.path, 'gardens');
      imageUrl = await getImageUrl('gardens', imageName);
    }

    const newGardenNote = {
      created_at: new Date(),
      garden_id: selectedGarden.id,
      note: gardenNote,
      image_url: imageUrl,
    };

    try {
      await insertGardenNote(newGardenNote);
      ToastAndroid.show(
        'Garden note for ' + selectedGarden.name + ' is saved.',
        ToastAndroid.LONG
      );
      setIsImageCleared(true);
      setGardenNote('');
      setSelectedGarden(gardenList[0]);
      setGardenPickerValue(gardenNames[0]);
      navigation.navigate('AddNote');
    } catch (error) {
      console.log('Insert garden note error: ', error);
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
          {strings.gardenPhoto_gn}
          </Text>
          <PhotoPick
            onSelect={onSelectImage}
            isCleared={isImageCleared}
            setIsCleared={setIsImageCleared}
            
          />

          <Text style={styles.t4}>{strings.selectGarden_gn}</Text>
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

          <Text style={styles.t4}>{strings.enterNotes_gn}</Text>
          <KeyboardAvoidingView
            behavior="padding"
            keyboardVerticalOffset={10}
            style={{ flex: 1 }}
          >
            {/*Automatic growth of the text input field as you enter
            text has been prevented and a scrool has been added.*/}
            <ScrollView
              style={{ maxHeight: 130 }} // Max height of ScrollView
              contentContainerStyle={{ flexGrow: 1 }}
            >
              <TextInput
                value={gardenNote}
                onChangeText={(text) => setGardenNote(text)}
                multiline
                numberOfLines={5}
                placeholder="Garden notes..."
                placeholderTextColor={'#21212160'}
                style={styles.text_area}
                scrollEnabled={false}
              />
            </ScrollView>

            <TouchableOpacity
              style={styles.button_right}
              onPress={saveNote}
            >
              <Text style={styles.bt1}> {strings.save_button} </Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default GardenNote;