import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, TextInput, ToastAndroid, Alert, TouchableWithoutFeedback } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import ImageCropPicker from 'react-native-image-crop-picker';
import styles from '../styles/Style';
const defaultProfileImage = require('../images/defaultUser.png');
const editIcon = require('../images/icons/plus3.png');
const editIconGreen = require('../images/icons/edit.png');
const checkIcon = require('../images/icons/update.png');
import { useTranslation } from 'react-i18next';

const Profile = ({ navigation, route }) => {
  const { t } = useTranslation();
  const currentUser = auth().currentUser;
  const [firstName, setFirstName] = useState('Name');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  // Saydamlik ozelligi icin baska bir cozum var mi?
  const [isModalVisible, setModalVisible] = useState(false);
  const [isEditingName, setEditingName] = useState(false);
  const [isEditingSurname, setEditingSurname] = useState(false);

  useEffect(() => {
    const ref = firestore().collection('users').doc(currentUser.uid);
    ref.onSnapshot(documentSnapshot => {
      const userData = documentSnapshot.data();
      setFirstName(userData.name);
      if (userData.lastName && userData.lastName.trim() !== '') {
        setLastName(userData.lastName);
      }

      setEmail(userData.email);
      setProfileImage(userData.profileImage);
    });
  }, []);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleChoosePhoto = () => {
    ImageCropPicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      cropperCircleOverlay: true,
      freeStyleCropEnabled: true,
    })
      .then(image => {
        const imageName = `${currentUser.uid}.jpg`;
        const reference = storage().ref(`profileImages/${imageName}`);

        reference.putFile(image.path)
          .then(() => {
            reference.getDownloadURL().then(url => {
              setProfileImage(url);

              firestore().collection('users').doc(currentUser.uid).update({
                profileImage: url,
              });
            });
          })
          .catch(error => {
            console.error('Firebase Storage Error:', error);
          });

        toggleModal();
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleTakePhoto = () => {
    ImageCropPicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      cropperCircleOverlay: true,
      freeStyleCropEnabled: true,
    })
      .then(image => {
        const imageName = `${currentUser.uid}.jpg`;
        const reference = storage().ref(`profileImages/${imageName}`);

        reference.putFile(image.path)
          .then(() => {
            reference.getDownloadURL().then(url => {
              setProfileImage(url);

              firestore().collection('users').doc(currentUser.uid).update({
                profileImage: url,
              });
            });
          })
          .catch(error => {
            console.error('Firebase Storage Error:', error);
          });

        toggleModal();
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleRemovePhoto = () => {
    if (profileImage) {
      Alert.alert(
        '',
        t("alert1_profile"),
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => {
              setProfileImage(null);

              firestore().collection('users').doc(currentUser.uid).update({
                profileImage: null,
              });

              toggleModal();
            },
          },
        ], { cancelable: false }
      );
    }
    else {
      ToastAndroid.show(
        t("toast1_profile"), ToastAndroid.SHORT
      );
    }
  };

  const handleUpdate = () => {
    setEditingName(!isEditingName)
    setEditingSurname(!isEditingSurname);

    if (isEditingName || isEditingSurname) {
      firestore().collection('users').doc(currentUser.uid).update({
        name: firstName,
        lastName: lastName,
      });
      ToastAndroid.show('Profile updated successfully', ToastAndroid.SHORT);
    }
  };

  return (
    <LinearGradient
      colors={['#FFFFFF', '#FFFFFF']}
      style={{ height: '100%' }}
    >
      <View style={{ flex: 1 }}>
        <View style={{
          padding: 20,
          flex: 1,
          backgroundColor: isModalVisible ? '#FFFFFF130' : '#FFFFFF',
        }}>
          <Text style={{ fontSize: 30, color: 'white', fontWeight: 'bold', color: isModalVisible ? '#09A55580' : '#09A555' }}>
            {t("profile")}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: 'grey',
            height: 100,
            width: 100,
            alignSelf: 'flex-end',
            borderRadius: 100,
            borderColor: '#FFFFFF',
            borderWidth: 7,
            position: 'absolute',
            top: 40,
            right: 25,
            zIndex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <TouchableOpacity onPress={toggleModal}>
            <Image
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                borderWidth: 7,
                borderColor: 'white',
              }}
              source={profileImage ? { uri: profileImage } : defaultProfileImage}
              resizeMode='cover'
            />
            <Image
              source={editIcon}
              style={{
                position: 'absolute',
                bottom: 5,
                right: 0,
                width: 30,
                height: 30,
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={{
          padding: 20,
          flex: 17,
          backgroundColor: isModalVisible ? '#89C6A780' : '#89C6A7',
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 75 }}>
            <Text style={{ color: 'white', fontSize: 20, paddingLeft: 20 }}>{t("gardenerInformation")}</Text>
            <TouchableOpacity onPress={() => handleUpdate()}>
              <Image
                source={isEditingSurname || isEditingName ? checkIcon : editIconGreen}
                style={{
                  width: 25,
                  height: 25,
                  marginBottom: 5,
                  marginLeft: 10,
                }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              backgroundColor: isModalVisible ? '#FFFFFF80' : '#FFFFFF',
              padding: 20,
              paddingTop: 10,
              paddingBottom: 10,
              borderRadius: 10
            }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {/*<Text style={{ color: 'black' }}>{t("name")} </Text>*/}
              {isEditingName ? (
                <TextInput
                  style={{ flex: 1, color: 'black' }}
                  value={firstName}
                  onChangeText={setFirstName}
                />
              ) : (
              <Text style={{ flex: 1, color: 'black' }}>{firstName}</Text>
              )}
            </View>
            <View style={{ height: 1, backgroundColor: 'gray', marginTop: 5, marginBottom: 5 }}></View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {/*<Text style={{ color: 'black' }}>{t("surname")} </Text>*/}
              {isEditingSurname ? (
                <TextInput
                  style={{ flex: 1, color: 'black' }}
                  value={lastName}
                  onChangeText={setLastName}
                />
              ) : (
                <Text style={{ flex: 1, color: 'black' }}>{lastName}</Text>
              )}
            </View>
            <View style={{ height: 1, backgroundColor: 'gray', marginTop: 5, marginBottom: 5 }}></View>
            <Text style={{ color: 'black' }}>{email}</Text>
            <View style={{ height: 1, backgroundColor: 'gray', marginTop: 5, marginBottom: 5 }}></View>
            <Text style={{ color: 'black' }}>{t("homeGarden")}</Text>
          </View>
          <Text style={{ color: 'white', fontSize: 20, paddingLeft: 20, marginTop: 20 }}>{t("social")}</Text>
          <View
            style={{
              backgroundColor: isModalVisible ? '#FFFFFF80' : '#FFFFFF',
              padding: 20,
              paddingTop: 10,
              paddingBottom: 10,
              borderRadius: 10
            }}>
            <Text style={{ color: 'black' }}>{t("shareProfile")}</Text>
            <View style={{ height: 1, backgroundColor: 'gray', marginTop: 5, marginBottom: 5 }}></View>
            <Text style={{ color: 'black' }}>{t("connectInstagram")}</Text>
            <View style={{ height: 1, backgroundColor: 'gray', marginTop: 5, marginBottom: 5 }}></View>
            <Text style={{ color: 'black' }}>{t("connectTwitter")}</Text>
            <View style={{ height: 1, backgroundColor: 'gray', marginTop: 5, marginBottom: 5 }}></View>
            <Text style={{ color: 'black' }}>{t("connectPinterest")}</Text>
          </View>
          <TouchableOpacity
          onPress={() => navigation.navigate('ChangePassword')}
          style={{
            height: 50,
            backgroundColor: 'white',
            borderRadius: 50,
            marginTop: 50,
            width: '100%',
            elevation: 5,
            justifyContent: 'center'
          }}
        >
          <Text style={{ fontSize: 16, textAlign: 'center', color: 'black', fontWeight: 'bold' }}>{t("changePassword")}</Text>
        </TouchableOpacity>
        </View>

      </View>
      <Modal
        animationType='slide'
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <TouchableWithoutFeedback onPress={toggleModal}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableWithoutFeedback onPress={() => {  }}>
              <View
                style={{
                  width: 300,
                  height: 400,
                  borderRadius: 20,
                  backgroundColor: 'rgba(0, 0, 0, 0.6)',
                  alignItems: 'center',
                }}
              >
                <Image
                  source={profileImage ? { uri: String(profileImage) } : defaultProfileImage}
                  style={{ width: '100%', height: '55%', borderRadius: 20 }}
                  resizeMode='cover'
                />
                <TouchableOpacity
                  onPress={handleTakePhoto}
                  style={[styles.button, { marginTop: 15 }]}
                >
                  <Text style={[styles.bt1, { fontWeight: 'bold' }]}>{t("takePhoto")}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={handleChoosePhoto}
                  style={styles.button}
                >
                  <Text style={[styles.bt1, { fontWeight: 'bold' }]}>{t("selectFromGallery")}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={handleRemovePhoto}
                  style={styles.button}
                >
                  <Text style={[styles.bt1, { fontWeight: 'bold' }]}>{t("removePhoto")}</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </LinearGradient>
  );
};
export default Profile;
