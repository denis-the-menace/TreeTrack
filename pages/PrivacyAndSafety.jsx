import React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import LinearGradient from "react-native-linear-gradient";



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
                            PRIVACY AND SAFETY
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
                        <Text style={{ color: "white", fontSize: 20, paddingLeft: 20, marginTop: 20 }}>Privacy Policy</Text>
                        <View
                            style={{
                                backgroundColor: "white",
                                padding: 20,
                                paddingTop: 10,
                                paddingBottom: 10,
                                borderRadius: 10

                            }}>
                            <Text style={{ color: "black" }}>Your Information:</Text>
                            <View style={{ height: 1, backgroundColor: "gray", marginTop: 5, marginBottom: 5 }}></View>
                            <Text style={{ color: "black" }}>We collect minimal personal information required to provide you with the best possible service. This may include your name, email address, location, and device information. Rest assured, we do not sell or share this information with third parties without your consent.</Text>
                            <View style={{ marginTop: 5, marginBottom: 5 }}></View>
                            <Text style={{ color: "black" }}>Data Security:</Text>
                            <View style={{ height: 1, backgroundColor: "gray", marginTop: 5, marginBottom: 5 }}></View>
                            <Text style={{ color: "black" }}>Safeguarding your data is our priority. We employ industry-standard security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.</Text>
                            <View style={{ marginTop: 5, marginBottom: 5 }}></View>
                            <Text style={{ color: "black" }}>Usage of Information:</Text>
                            <View style={{ height: 1, backgroundColor: "gray", marginTop: 5, marginBottom: 5 }}></View>
                            <Text style={{ color: "black" }}>The data we collect is utilized to enhance our services, personalize your experience, and improve our application. This includes providing tailored content, troubleshooting issues, and analyzing trends to offer a seamless user experience.</Text>
                            <View style={{ marginTop: 5, marginBottom: 5 }}></View>
                            <Text style={{ color: "black" }}>Cookies:</Text>
                            <View style={{ height: 1, backgroundColor: "gray", marginTop: 5, marginBottom: 5 }}></View>
                            <Text style={{ color: "black" }}>Our application may use cookies or similar technologies to improve functionality, personalize content, and understand user behavior. You have the option to manage cookie preferences within the app settings.</Text>

                        </View>
                        <Text style={{ color: "white", fontSize: 20, paddingLeft: 20, marginTop: 20 }}>Safety Measures</Text>
                        <View
                            style={{
                                backgroundColor: "white",
                                padding: 20,
                                paddingTop: 10,
                                paddingBottom: 10,
                                borderRadius: 10,
                                marginBottom:70
                            }}>
                            <Text style={{ color: "black" }}>User Conduct:</Text>
                            <View style={{ height: 1, backgroundColor: "gray", marginTop: 5, marginBottom: 5 }}></View>
                            <Text style={{ color: "black" }}>While using Tree Track, we encourage responsible and respectful behavior. Any misuse, abusive conduct, or violation of community guidelines may result in suspension or termination of your account.</Text>
                            <View style={{ marginTop: 5, marginBottom: 5 }}></View>
                            <Text style={{ color: "black" }}>Security Alerts:</Text>
                            <View style={{ height: 1, backgroundColor: "gray", marginTop: 5, marginBottom: 5 }}></View>
                            <Text style={{ color: "black" }}>In case of any security breaches or suspicious activities, we commit to promptly informing users about potential risks and taking necessary actions to mitigate them.</Text>
                            <View style={{ marginTop: 5, marginBottom: 5 }}></View>
                            <Text style={{ color: "black" }}>Updates to Policy:</Text>
                            <View style={{ height: 1, backgroundColor: "gray", marginTop: 5, marginBottom: 5 }}></View>
                            <Text style={{ color: "black"}}>We may periodically update our Privacy and Safety policies. It's advisable to review these policies to stay informed about how we handle your data.</Text>
                            
                        </View>
                    </View>
                </View>
            </ScrollView>
        </LinearGradient>
    );
};

export default PrivacyAndSafety;
