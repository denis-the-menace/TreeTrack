import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Image,
    ToastAndroid,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import React, { useState, useEffect } from 'react';
import styles from '../styles/Style';
import { useRoute } from '@react-navigation/native';
import { updateGarden, getGardensNoteById, updateGardenNote } from '../services/garden_services';
import { useTranslation } from 'react-i18next';
import PhotoPick from '../layouts/photo_picker/ImagePicker';
import storage from '@react-native-firebase/storage';

const EditGarden = ({ navigation }) => {
    const { t } = useTranslation();
    const route = useRoute();
    const garden = route.params.garden;
    const onUpdate = route.params.onUpdate;
    const newGardenArea = route.params && route.params.polygon ? route.params.polygon : [];
    
    const [gardenNotes, setGardenNotes] = useState([]);
    const [gardenName, setGardenName] = useState(garden.name);
    const [image, setSelectedImage] = useState(null);
    const [isImageCleared, setIsImageCleared] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const notes = await getGardensNoteById(garden.id);
            setGardenNotes(notes);
        };
        fetchData();
    }, []);

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

      const handleUpdateGarden = async () => {
        const updatedGarden = garden;
        if (newGardenArea.length > 2) {
            updatedGarden.polygon = newGardenArea;
        }
        if (gardenName.length > 0) {
            updatedGarden.name = gardenName;
        }
        try {
            await updateGarden(garden.id, updatedGarden);
            ToastAndroid.show(t("toast1_eg"), ToastAndroid.SHORT);
            navigation.navigate("Gardens");
        } catch (error) {
            console.log("Error garden update: ", error);
        }
    };

    const handleNoteUpdate = async (noteId, updatedNote) => {
        try {
            await updateGardenNote(noteId, updatedNote);
            ToastAndroid.show(t("toast2_eg"), ToastAndroid.SHORT); // Başarılı güncelleme mesajı
        } catch (error) {
            console.log("Error updating garden note: ", error); // Hata durumunda konsola hata yazdırma
        }
    };

    return (
        <LinearGradient colors={['#89C6A7', '#89C6A7']} style={{ height: '100%' }}>
            <View  
                style={{
                    padding: 20,
                    flex: 1,
                }}>
                <ScrollView>
                    <View style={{ marginBottom: 90 }}>
                        
                        <Text style={styles.subtext}> &gt; {garden.name}</Text>
                        <Text style={styles.text}>{t("edit_garden")}</Text>
                        <Text style={styles.t4}>{t("edit_garden_photo")}</Text>
                        <PhotoPick
            onSelect={onSelectImage}
            isCleared={isImageCleared}
            setIsCleared={setIsImageCleared}
            
          />
                        <Text style={styles.t4}>{t("edit_garden_name")}</Text>
                        <TextInput
                            value={gardenName}
                            onChangeText={text => setGardenName(text)}
                            placeholder={garden.name}
                            placeholderTextColor={'#21212160'}
                            style={styles.text_area}
                        />
                        <Text style={styles.t4}>{t("edit_area_garden")}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity
                                style={{
                                    ...styles.button_left,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}
                                onPress={() => {
                                    navigation.navigate('EditGardenPolygon', { garden, onUpdate });
                                }}>
                                <Image
                                    source={{
                                        uri: 'https://cdn-icons-png.flaticon.com/32/854/854901.png',
                                    }}
                                    style={{
                                        width: 25,
                                        height: 25,
                                    }}></Image>
                                <Text style={{ ...styles.bt1, color: '#212121', marginLeft: 5 }}>
                                {t("open_map")}
                                </Text>
                            </TouchableOpacity>
                            
                        </View>
       
                        <View style={{ marginTop: 20 }}>
                            <Text style={styles.t4}>{t("edit_garden_notes")}</Text>
                            <ScrollView style={{ maxHeight: 95 }}>
                                {gardenNotes.map(note => (
                                    <View key={note.id} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <TextInput
                                            value={note.note}
                                            onChangeText={text => {
                                                const updatedNotes = [...gardenNotes];
                                                const noteIndex = updatedNotes.findIndex(item => item.id === note.id);
                                                updatedNotes[noteIndex].note = text;
                                                setGardenNotes(updatedNotes);
                                            }}
                                            placeholder={t("edit_garden_notes")}
                                            placeholderTextColor={'#21212160'}
                                            style={styles.text_area}
                                        />
                                        <TouchableOpacity
                                            onPress={() => handleNoteUpdate(note.id, { note: note.note })}
                                            style={{ paddingHorizontal: 10 }}>
                                            <Text style={{ ...styles.bt1, color: '#212121' }}>{t("update")}</Text>
                                        </TouchableOpacity>
                                    </View>
                                ))}
                            </ScrollView>
                        </View>
                        
                        <TouchableOpacity style={styles.button_right} onPress={handleUpdateGarden}>
                            <Text style={styles.bt1}> {t("update")} </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>

        </LinearGradient>
    );
};

export default EditGarden;
