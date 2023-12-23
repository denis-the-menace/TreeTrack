import React, { useState } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import Pick from './Pick';
import UnPick from './UnPick';
import ImagePicker from 'react-native-image-crop-picker';
import styles from '../../styles/Style';

const PhotoPick = ({ onSelect, isCleared, setIsCleared }) => {
  const [imagePath, setImagePath] = useState(null);
  const [isImageSelected, setImageSelected] = useState(false);

  const handleUnPick = () => {
    setImagePath(null);
    setImageSelected(false);
    setIsCleared(true);
    onSelect(null);
  };

  const openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      freeStyleCropEnabled: true,
    })
      .then((image) => {
        setImagePath(image.path);
        setImageSelected(true);
        setIsCleared(false);
        onSelect(image);
      })
      .catch((error) => {
        onSelect(null);
        if (error.message === 'User cancelled image selection') {
          console.log(error.message + ' (camera)');
        } else {
          console.log('Other Error', error);
        }
      });
  };

  const openGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      freeStyleCropEnabled: true,
    })
      .then((image) => {
        setImagePath(image.path);
        setImageSelected(true);
        setIsCleared(false);
        onSelect(image);
      })
      .catch((error) => {
        onSelect(null);
        if (error.message === 'User cancelled image selection') {
          console.log(error.message + ' (gallery)');
        } else {
          console.log('Other Error', error);
        }
      });
  };


  return (
    <View style={{ alignItems: 'center' }}>
      {isImageSelected && !isCleared ? (
        <View>
          <TouchableOpacity onPress={handleUnPick} style={styles.deleteIcon}>
            {/* cross icon added */}
            <Image
              style={{ width: 15, height: 15 }}
              source={require('TreeTrack/images/icons/cross_icon.png')}
            />
          </TouchableOpacity>

          {/* TouchableOpacity has been removed */}
          <Image
            style={{ width: 175, height: 230, borderRadius: 10 }} //image size
            source={{ uri: imagePath }}
          />

        </View>
      ) : (
        <View>
          <UnPick openCamera={openCamera} openGallery={openGallery} />
        </View>
      )}
    </View>
  );
};

export default PhotoPick;