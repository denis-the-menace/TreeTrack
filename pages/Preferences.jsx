import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import i18next from '../services/i18next';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

/*sadece bu sayfada çeviri var bütün uygulamaya eklenmeli*/
const Preferences = ({ navigation }) => {
  const { t } = useTranslation();
  const [selectedOption, setSelectedOption] = useState(null);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleOptionSelect = (lng) => {
    i18next.changeLanguage(lng);
    AsyncStorage.setItem('language', lng);
    setSelectedOption(lng); // Seçilen dili güncelle
  };

  return (
    <LinearGradient
      colors={["#FFFFFF", "#FFFFFF"]}
      style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ flex: 1 }}>
          <View style={{
            padding: 20,
            flex: 1,
          }}>
            <Text style={{ fontSize: 30, fontWeight: "bold", color: "#09A555" }}>
              {t("preferences1")}
            </Text>
          </View>
          <View style={{
            padding: 20,
            flex: 30,
            backgroundColor: "#89C6A7",
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50
          }}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>{t("language")}</Text>
            <TouchableOpacity
              onPress={() => handleOptionSelect("tr")}
              style={{ flexDirection: "row", alignItems: "center", marginBottom: 15, marginTop: 15 }}>
              <View style={{
                height: 24,
                width: 24,
                borderRadius: 12,
                borderWidth: 2,
                borderColor: selectedOption === "tr" ? "#09A555" : "#000",
                justifyContent: "center",
                alignItems: "center",
                marginRight: 10
              }}>
                {selectedOption === "tr" && <View style={{
                  height: 12,
                  width: 12,
                  borderRadius: 6,
                  backgroundColor: "#09A555",
                }} />}
              </View>
              <Text>{t("turkish")}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleOptionSelect("en")}
              style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
              <View style={{
                height: 24,
                width: 24,
                borderRadius: 12,
                borderWidth: 2,
                borderColor: selectedOption === "en" ? "#09A555" : "#000",
                justifyContent: "center",
                alignItems: "center",
                marginRight: 10
              }}>
                {selectedOption === "en" && <View style={{
                  height: 12,
                  width: 12,
                  borderRadius: 6,
                  backgroundColor: "#09A555",
                }} />}
              </View>
              <Text>{t("english")}</Text>
            </TouchableOpacity>
            {/* Add more options as needed */}
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default Preferences;
