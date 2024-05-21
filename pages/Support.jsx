import React from "react";
import { View, Text, Image, TouchableOpacity, Linking } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useTranslation } from 'react-i18next';

const Support = ({ navigation }) => {
    const { t } = useTranslation();

    const handleBack = () => {
        navigation.goBack(); // Geri butonuna basıldığında sayfayı kapatır
    };

    const handleLinkPress = (url) => {
        Linking.openURL(url).catch(err => console.error("Failed to open URL:", err));
    };

    return (
        <LinearGradient
            colors={["#FFFFFF", "#FFFFFF"]}
            style={{ flex: 1, fontWeight: 30 }}>
            <View style={{ flex: 1 }}>
                <View style={{
                    padding: 20,
                    flex: 1,
                }}>
                    <Text style={{ fontSize: 30, color: "white", fontWeight: "bold", color: "#09A555" }}>
                        {t("supportTitle_B")}
                    </Text>
                </View>

                <View
                    style={{
                        backgroundColor: 'grey',
                        height: 100,
                        width: 100,
                        borderRadius: 40, // Half of the height and width makes it a circle
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
                    <Image
                        source={require("../images/support.png")}
                        style={{
                            height: '100%',
                            width: '100%',
                            borderRadius: 30,
                        }}
                    />
                </View>

                <View style={{
                    padding: 20,
                    flex: 17,
                    backgroundColor: "#89C6A7",
                    borderTopLeftRadius: 50,
                    borderTopRightRadius: 50
                }}>
                    <Text style={{ color: "white", fontSize: 20, paddingLeft: 20, marginTop: 20 }}>{t("contactUs")}</Text>
                    <View
                        style={{
                            backgroundColor: "white",
                            padding: 20,
                            paddingTop: 10,
                            paddingBottom: 10,
                            borderRadius: 10
                        }}>
                        <Text style={{ color: "black" }}>{t("thankYouMessage")}</Text>
                        <Text style={{ color: "black" }}>{t("customerSupport")}</Text>
                    </View>
                    
                    <Text style={{ color: "white", fontSize: 20, paddingLeft: 20, marginTop: 20 }}>{t("contactInformation")}</Text>
                    <View
                        style={{
                            backgroundColor: "white",
                            padding: 20,
                            paddingTop: 10,
                            paddingBottom: 10,
                            borderRadius: 10
                        }}>
                        <Text style={{ color: "black" }}>{t("email_support")}</Text>
                        <View style={{ height: 1, backgroundColor: "gray", marginTop: 5, marginBottom: 5 }}></View>
                        <Text style={{ color: "black" }}>{t("address_support")}</Text>
                        <Text style={{ color: 'black', textAlign: 'right', paddingRight: 5 }}>{t("ankara_turkey")}</Text>
                    </View>

                    <Text style={{ color: "white", fontSize: 20, paddingLeft: 20, marginTop: 20 }}>{t("social")}</Text>
                    <View
                        style={{
                            backgroundColor: "white",
                            padding: 20,
                            paddingTop: 10,
                            paddingBottom: 10,
                            borderRadius: 10
                        }}>
                        <TouchableOpacity onPress={() => handleLinkPress("https://www.instagram.com/ybuankara/")}>
                        <Text style={{ color: "#89C6A7", fontWeight: "bold", fontStyle: "italic" }}>{t("instagram")}</Text>
                        </TouchableOpacity>
                        <View style={{ height: 1, backgroundColor: "gray", marginTop: 5, marginBottom: 5 }}></View>
                        <TouchableOpacity onPress={() => handleLinkPress("https://www.aybu.edu.tr/")}>
                        <Text style={{ color: "#89C6A7", fontWeight: "bold", fontStyle: "italic" }}>{t("website")}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </LinearGradient>
    );
};

export default Support;
