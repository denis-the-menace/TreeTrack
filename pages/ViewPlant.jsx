import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Dimensions, Modal } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from '../styles/Style';
import { getPlantNotesById } from '../services/plant_services';
import { formatDate } from '../services/helper';
import { useTranslation } from 'react-i18next';

const ViewPlant = ({ navigation, route }) => {
  const { t } = useTranslation();
  const { height, width } = Dimensions.get('window');
  const [plantNotes, setPlantNotes] = useState([]);
  const [imageIdx, setImageIdx] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [numberOfLines, setLines] = useState(3);

  const plant = route.params.plant;
  const garden = route.params.garden;
  const onUpdate = route.params.onUpdate;

  useEffect(() => {
    const fetchData = async () => {
      const notes = await getPlantNotesById(plant.id);
      setPlantNotes(notes);
    };
    fetchData();
  }, []);

  const plantImages = plantNotes.filter(note => note.image_url !== null);
  const plantNotesWithoutImage = plantNotes.filter(note => note.image_url === null);

  const plant_image = !plant.image_url ? 'https://cdn-icons-png.flaticon.com/512/3039/3039008.png' : plant.image_url;

  return (
    <LinearGradient colors={['#89C6A7', '#89C6A7']} style={{ height: '100%' }}>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 20, paddingBottom: 5 }}>
          <Text style={styles.text}>{plant.name}</Text>
          <TouchableOpacity
            style={{ alignSelf: 'center' }}
            onPress={() => { navigation.navigate('EditPlant', { plant, garden, onUpdate }); }}>
            <Image style={{ width: 25, height: 25 }} source={require('../images/icons/edit.png')} />
          </TouchableOpacity>
        </View>

        <Text style={{ fontSize: 16, marginBottom: 15, color: '#efefef', paddingHorizontal: 20 }}>
          <Text style={{ fontWeight: 'bold' }}>{t("plant_type_vp")} </Text>
          {!plant.plant_type || plant.plant_type === '' ? 'Undefined' : plant.plant_type}
        </Text>

        {plantNotes.length === 0 && (
          <Text style={{ color: '#efefef', fontSize: 16, textAlign: 'center' }}>
            {t("any_note_vp")}
          </Text>
        )}

        <ScrollView style={{ paddingHorizontal: 20 }} nestedScrollEnabled={true}>
          {/* plant notes with image */}
          {plantImages.length > 0 && (
            <View style={{ backgroundColor: '#ffffff20', paddingTop: 5, padding: 10 }}>
              {/* image slider */}
              <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                <TouchableOpacity onPress={() => { setImageIdx((imageIdx - 1 + plantImages.length) % plantImages.length); }} style={{ backgroundColor: '#2c3d4f', paddingTop: 15, paddingBottom: 18, borderRadius: 40, paddingHorizontal: 5, marginRight: 5 }}>
                  <Text style={{ color: '#fff', fontWeight: 'bold' }}>&lt;</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { setModalVisible(true); }} style={{}}>
                  <Image source={{ uri: plantImages[imageIdx].image_url }} style={{ width: 300, height: 250 }} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { setImageIdx((imageIdx + 1) % plantImages.length); }} style={{ backgroundColor: '#2c3d4f', paddingTop: 15, paddingBottom: 18, borderRadius: 40, paddingHorizontal: 5, marginLeft: 5 }}>
                  <Text style={{ color: '#fff', fontWeight: 'bold' }}>&gt;</Text>
                </TouchableOpacity>
              </View>
              {plantImages.length > 0 && (
                <TouchableOpacity onPress={() => { setLines(numberOfLines === 3 ? undefined : 3); }} key={plantImages[imageIdx].id} style={{ paddingHorizontal: 10, paddingVertical: 5, backgroundColor: '#2c3d4f15', borderRadius: 5, width: '90%', alignSelf: 'center' }}>
                  <Text style={{ color: 'white' }} numberOfLines={numberOfLines}>
                    <Text style={{ fontWeight: 'bold' }}>[{formatDate(plantImages[imageIdx].created_at)}]{' '}</Text>
                    {plantImages[imageIdx].note}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          )}

          {/* plant notes without image */}
          {plantNotesWithoutImage.length > 0 && (
            <View style={{ backgroundColor: '#ffffff20', marginTop: 10, marginBottom: 5, paddingHorizontal: 5 }}>
              <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', marginVertical: 8, alignSelf: 'center' }}>
                {plantImages.length > 0 ? "Other " : ""}{t("plantNotes_vp")}
              </Text>

              <ScrollView nestedScrollEnabled={true}>
                {plantNotesWithoutImage.map(note => (
                  <View key={note.id} style={{ padding: 10, backgroundColor: '#2c3d4f15', borderRadius: 5, marginBottom: 5 }}>
                    <Text style={{ color: 'white' }}>
                      <Text style={{ fontWeight: 'bold' }}>[{formatDate(note.created_at)}]{' '}</Text>
                      {note.note}
                    </Text>
                  </View>
                ))}
              </ScrollView>
            </View>
          )}

        </ScrollView>
         {/* Modal for Enlarged Image */}
         <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}>
                <Text style={styles.closeButtonText}>{t("close")}</Text>
              </TouchableOpacity>
              <Image source={{ uri: plantImages.length === 0 ? plant_image : plantImages[imageIdx].image_url }} 
                    style={{ width: '95%', aspectRatio: 0.8 }} />
            </View>
          </View>
        </Modal>

        <View style={{ flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap', alignItems: 'center', marginBottom: 110 }}>
          <TouchableOpacity onPress={() => { navigation.navigate('Galleries', { plant, showGarden: false }); }} style={{ ...styles.button_right, marginLeftt: 10 }}>
            <Text style={styles.bt1}>{t("viewInGallery_vg")} </Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

export default ViewPlant;
