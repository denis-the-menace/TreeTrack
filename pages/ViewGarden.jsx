import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  Modal,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from '../styles/Style';
import { getGardensNoteById } from '../services/garden_services';
import { formatDate } from '../services/helper';
import { useTranslation } from 'react-i18next';

const ViewGarden = ({ navigation, route }) => {
  const { t } = useTranslation();
  const { height, width } = Dimensions.get('window');
  const garden = route.params.garden;
  const onUpdate = route.params.onUpdate;
  const [gardenNotes, setGardenNotes] = useState([]);
  const [imageIdx, setImageIdx] = useState(0);
  const [isArrowPressed, setPressed] = useState(false);
  const [numberOfLines, setLines] = useState(3);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const notes = await getGardensNoteById(garden.id);
      setGardenNotes(notes);
    };
    fetchData();
  }, []);

  const gardenImages = gardenNotes.filter(note => note.image_url !== null);
  const gardenNotesWithoutImage = gardenNotes.filter(
    note => note.image_url === null,
  );

  const garden_image = !garden.image_url
    ? 'https://cdn-icons-png.flaticon.com/512/3039/3039008.png'
    : garden.image_url;

  return (
    <LinearGradient colors={['#89C6A7', '#89C6A7']} style={{ height: '100%' }}>
      <View
        style={{
          flex: 1,
        }}>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            paddingTop: 20,
            paddingBottom: 5,
          }}>
          <Text style={styles.text}>{garden.name}</Text>
          <TouchableOpacity
            style={{ alignSelf: 'center' }}
            onPress={() => {
              navigation.navigate('EditGarden', { garden, onUpdate });
            }}>
            <Image
              style={{ width: 25, height: 25 }}
              source={require('../images/icons/edit.png')}
            />
          </TouchableOpacity>
        </View>

        <Text
          style={{
            fontSize: 16,
            marginBottom: 15,
            color: '#efefef',
            paddingHorizontal: 20,
          }}>
          <Text style={{ fontWeight: 'bold' }}>{t('gardenType_vg')} </Text>
          {!garden.garden_type || garden.garden_type === ''
            ? 'Undefined'
            : garden.garden_type}
        </Text>

        {gardenNotes.length == 0 && (
          <Text style={{ color: '#efefef', fontSize: 16, textAlign: 'center' }}>
            {t('noGardenNote_vg')}
          </Text>
        )}
        <ScrollView style={{ paddingHorizontal: 20 }} nestedScrollEnabled={true}>
          {/* garden notes with image */}
          {gardenImages.length > 0 && (
            <View
              style={{
                backgroundColor: '#ffffff20',
                paddingTop: 5,
                padding: 10,
              }}>
              {/* image slider */}
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 10,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setPressed(true);
                    setImageIdx(
                      (imageIdx - 1 + gardenImages.length) %
                      gardenImages.length,
                    );
                  }}
                  style={{
                    backgroundColor: '#2c3d4f',
                    paddingTop: 15,
                    paddingBottom: 18,
                    borderRadius: 40,
                    paddingHorizontal: 5,
                    marginRight: 5,
                  }}>
                  <Text style={{ color: '#fff', fontWeight: 'bold' }}>&lt;</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(true);
                  }}>
                  <Image
                    source={{ uri: gardenImages[imageIdx].image_url }}
                    style={{ width: 300, height: 250 }}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setPressed(true);
                    setImageIdx((imageIdx + 1) % gardenImages.length);
                  }}
                  style={{
                    backgroundColor: '#2c3d4f',
                    paddingTop: 15,
                    paddingBottom: 18,
                    borderRadius: 40,
                    paddingHorizontal: 5,
                    marginLeft: 5,
                  }}>
                  <Text style={{ color: '#fff', fontWeight: 'bold' }}>&gt;</Text>
                </TouchableOpacity>
              </View>
              {gardenImages.length > 0 && (
                <TouchableOpacity
                  onPress={() => {
                    setLines(numberOfLines === 3 ? undefined : 3);
                    setPressed(true);
                  }}
                  key={gardenImages[imageIdx].id}
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    backgroundColor: '#2c3d4f15',
                    borderRadius: 5,
                    width: '90%',
                    alignSelf: 'center',
                  }}>
                  <Text style={{ color: 'white' }} numberOfLines={numberOfLines}>
                    <Text style={{ fontWeight: 'bold' }}>
                      [{formatDate(gardenImages[imageIdx].created_at)}]{' '}
                    </Text>
                    {gardenImages[imageIdx].note}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          )}

          {/* garden notes without image */}
          {gardenNotesWithoutImage.length > 0 && (
            <View
              style={{
                backgroundColor: '#ffffff20',
                marginTop: 10,
                marginBottom: 5,
                paddingHorizontal: 5,
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 16,
                  fontWeight: 'bold',
                  marginVertical: 8,
                  alignSelf: 'center',
                }}>
                {gardenImages.length > 0 ? 'Other ' : ''}
                {t('gardenNotes_vg')}
              </Text>

              <ScrollView nestedScrollEnabled={true}>
                {gardenNotesWithoutImage.map(note => (
                  <View
                    key={note.id}
                    style={{
                      padding: 10,
                      backgroundColor: '#2c3d4f15',
                      borderRadius: 5,
                      marginBottom: 5,
                    }}>
                    <Text style={{ color: 'white' }}>
                      <Text style={{ fontWeight: 'bold' }}>
                        [{formatDate(note.created_at)}]{' '}
                      </Text>
                      {note.note}
                    </Text>
                  </View>
                ))}
              </ScrollView>
            </View>
          )}
        </ScrollView>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            flexWrap: 'wrap',
            alignItems: 'center',
            marginBottom: 110,
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Plants', { garden: garden, onUpdate });
            }}
            style={{
              ...styles.button_right,
              marginTop: 5,
              marginBottom: 25,
              marginHorizontal: 10,
            }}>
            <Text style={styles.bt1}> {t('displayPlants_vg')} </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Map', { garden });
            }}
            style={{
              ...styles.button_right,
              marginTop: 5,
              marginBottom: 25,
              marginHorizontal: 10,
            }}>
            <Text style={styles.bt1}> {t('displayInMap_vg')} </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Galleries', { garden, showGarden: true });
            }}
            style={{
              ...styles.button_right,
              marginTop: 5,
              marginBottom: 80,
              marginHorizontal: 10,
            }}>
            <Text style={styles.bt1}> {t('viewInGallery_vg')} </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate(
                'CreatePlant',
                { garden: garden },
                { onUpdate: onUpdate },
              );
            }}
            style={{
              ...styles.button_right,
              marginTop: 10,
              marginBottom: 80,
              marginHorizontal: 10,
            }}>
            <Text style={styles.bt1}> {t('addPlant_vg')} </Text>
          </TouchableOpacity>
        </View>

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
                <Text style={styles.closeButtonText}>{t('close')}</Text>
              </TouchableOpacity>
              <Image
                source={{
                  uri:
                    gardenImages.length === 0
                      ? garden_image
                      : gardenImages[imageIdx].image_url,
                }}
                style={{ width: '95%', aspectRatio: 0.8 }}
              />
            </View>
          </View>
        </Modal>
      </View>
    </LinearGradient>
  );
};

export default ViewGarden;
