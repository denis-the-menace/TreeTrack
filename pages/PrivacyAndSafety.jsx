import React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import strings from '../strings/string';


const PrivacyAndSafety = ({ navigation }) => {
    const handleBack = () => {
        navigation.goBack(); // Geri butonuna basıldığında sayfayı kapatır
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
                        marginBottom: 20
                    }}>

                        <Text style={{ fontSize: 30, fontWeight: "bold", color: "#09A555" }}>
                        {strings.privacyAndSafety}
                        </Text>
                    </View>


                    <View
                        style={{
                            backgroundColor: 'grey',
                            height: 100,
                            width: 100,
                            borderRadius: 40, 
                            borderColor: '#FFFFFF',
                            borderWidth: 7,
                            position: 'absolute',
                            top: 60,
                            right: 25,
                            zIndex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Image
                            source={require("../images/privacy.png")}
                            style={{
                                height: '100%',
                                width: '100%',
                                borderRadius: 30,
                            }}
                        />

                    </View>

                    <View style={{
                        padding: 20,
                        flex: 1,
                        backgroundColor: "#89C6A7",
                        borderTopLeftRadius: 50,
                        borderTopRightRadius: 50
                    }}>
                        <Text style={{ color: "white", fontSize: 20, paddingLeft: 20, marginTop: 20 }}>{strings.privacyPolicy}</Text>
                        <View
                            style={{
                                backgroundColor: "white",
                                padding: 20,
                                paddingTop: 10,
                                paddingBottom: 10,
                                borderRadius: 10

                            }}>
                            <Text style={{ color: "black" }}>{strings.dataInformation}</Text>
                            <View style={{ height: 1, backgroundColor: "gray", marginTop: 5, marginBottom: 5 }}></View>
                            <Text style={{ color: "black" }}>{strings.text1}</Text>
                            <View style={{ marginTop: 5, marginBottom: 5 }}></View>
                            <Text style={{ color: "black" }}>{strings.dataSecurity}</Text>
                            <View style={{ height: 1, backgroundColor: "gray", marginTop: 5, marginBottom: 5 }}></View>
                            <Text style={{ color: "black" }}>{strings.text2}</Text>
                            <View style={{ marginTop: 5, marginBottom: 5 }}></View>
                            <Text style={{ color: "black" }}>{strings.usageInformation}:</Text>
                            <View style={{ height: 1, backgroundColor: "gray", marginTop: 5, marginBottom: 5 }}></View>
                            <Text style={{ color: "black" }}>{strings.text3}</Text>
                            <View style={{ marginTop: 5, marginBottom: 5 }}></View>
                            <Text style={{ color: "black" }}>{strings.cookies}</Text>
                            <View style={{ height: 1, backgroundColor: "gray", marginTop: 5, marginBottom: 5 }}></View>
                            <Text style={{ color: "black" }}>{strings.text4}</Text>

                        </View>
                        <Text style={{ color: "white", fontSize: 20, paddingLeft: 20, marginTop: 20 }}>{strings.safetyMeasures}</Text>
                        <View
                            style={{
                                backgroundColor: "white",
                                padding: 20,
                                paddingTop: 10,
                                paddingBottom: 10,
                                borderRadius: 10,
                                marginBottom:70
                            }}>
                            <Text style={{ color: "black" }}>{strings.userConduct}</Text>
                            <View style={{ height: 1, backgroundColor: "gray", marginTop: 5, marginBottom: 5 }}></View>
                            <Text style={{ color: "black" }}>{strings.text5}</Text>
                            <View style={{ marginTop: 5, marginBottom: 5 }}></View>
                            <Text style={{ color: "black" }}>{strings.securityAlerts}</Text>
                            <View style={{ height: 1, backgroundColor: "gray", marginTop: 5, marginBottom: 5 }}></View>
                            <Text style={{ color: "black" }}>{strings.text6}</Text>
                            <View style={{ marginTop: 5, marginBottom: 5 }}></View>
                            <Text style={{ color: "black" }}>{strings.updatesPolicy}</Text>
                            <View style={{ height: 1, backgroundColor: "gray", marginTop: 5, marginBottom: 5 }}></View>
                            <Text style={{ color: "black"}}>{strings.text7}</Text>
                            
                        </View>
                    </View>
                </View>
            </ScrollView>
        </LinearGradient>
    );
};

export default PrivacyAndSafety;
