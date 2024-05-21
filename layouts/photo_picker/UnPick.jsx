import React, {useState} from 'react';
import strings from '../../strings/string';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import styles from '../../styles/Style';
import { useTranslation } from 'react-i18next';

const UnPick = ({openCamera, openGallery}) => {
  const { t } = useTranslation();
  return (
    <View style={{alignItems: 'center'}}>
      
        <TouchableOpacity
          onPress={openCamera}
          title="Take a Photo"
          style={styles.button}>
          <Text style={styles.bt1}> {t("takePhoto_up")}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={openGallery}
          title="Open Gallery"
          style={styles.button}>
          <Text style={styles.bt1}> {t("select_from_gallery_up")} </Text>
        </TouchableOpacity>
   
    </View>
  );
};

export default UnPick;