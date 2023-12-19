import React from "react";
import { View, Text, Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";



const Support = ({ navigation }) => {
    const handleBack = () => {
        navigation.goBack(); // Geri butonuna basıldığında sayfayı kapatır
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
                        SUPPORT
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
                    <Text style={{ color: "white", fontSize: 20, paddingLeft: 20, marginTop: 20 }}>Contact Us</Text>
                    <View
                        style={{
                            backgroundColor: "white",
                            padding: 20,
                            paddingTop: 10,
                            paddingBottom: 10,
                            borderRadius: 10

                        }}>
                        <Text style={{ color: "black" }}>Thank you for choosing Tree Track! Your feedback and inquiries are valuable to us. We're dedicated to providing you with the best gardening experience possible.
                        </Text>
                        <Text style={{ color: "black" }}>Our customer support team is available to assist you with any questions, concerns, or feedback you may have. Please feel free to reach out to us via email or phone.
                        </Text>

                    </View>
                    <Text style={{ color: "white", fontSize: 20, paddingLeft: 20, marginTop: 20 }}>Contact Via</Text>
                    <View
                        style={{
                            backgroundColor: "white",
                            padding: 20,
                            paddingTop: 10,
                            paddingBottom: 10,
                            borderRadius: 10
                        }}>
                        <Text style={{ color: "black" }}>Email: treetrack_info@gmail.com</Text>
                        <View style={{ height: 1, backgroundColor: "gray", marginTop: 5, marginBottom: 5 }}></View>
                        <Text style={{ color: "black" }}>Phone: +1234567890</Text>
                        <View style={{ height: 1, backgroundColor: "gray", marginTop: 5, marginBottom: 5 }}></View>
                        <Text style={{ color: "black" }}>Address: Tree Track Company, 151. Street, No: 7840</Text>
                        <Text style={{ color: 'black' ,textAlign:'right',paddingRight:5}}>Ankara, Türkiye</Text>
                        
                     

                    </View>
                </View>

            </View>
        </LinearGradient>
    );
};

export default Support;
