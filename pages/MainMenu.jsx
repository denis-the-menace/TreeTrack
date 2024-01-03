import React, { useState, useEffect, useRef } from 'react';
import { Animated, View, Image, Dimensions, TouchableOpacity, Text, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const MainMenu = ({ navigation }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const currentUser = auth().currentUser;
    const [firstName, setFirstName] = useState('Name');
    const [lastName, setLastName] = useState('');
    const images = [
        require('../images/mainloop1.jpg'),
        require('../images/mainloop2.jpg'),
        require('../images/mainloop3.jpg'),
        require('../images/mainloop4.jpg'),
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000); // Her fotoğrafın gösterilme süresi (5 saniye)

        return () => clearInterval(interval);
    }, []);

    const imageTranslateX = currentImageIndex * -Dimensions.get('window').width;


    useEffect(() => {
        const ref = firestore().collection('users').doc(currentUser.uid);
        ref.onSnapshot(documentSnapshot => {
            const userData = documentSnapshot.data();
            setFirstName(userData.name);
            if (userData.lastName && userData.lastName.trim() !== '') {
                setLastName(userData.lastName);
            }
        });
    }, []);

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <LinearGradient colors={['#89C6A7', '#89C6A7']} style={{ flex: 1 }}>
                {/* Logo */}
                <View style={{ padding: 15 }}>
                    <View style={{ backgroundColor: 'white', borderRadius: 10 }}>
                        <Image
                            source={require('../images/tree_track.png')}
                            style={{ height: 60 }}
                            resizeMode="contain"
                        />
                    </View>
                </View>
                {/* Image carousel */}
                <View style={{ flex: 1, overflow: 'hidden' }}>
                    <Animated.View
                        style={{
                            flexDirection: 'row',
                            width: Dimensions.get('window').width * images.length,
                            transform: [{ translateX: imageTranslateX }],
                        }}>
                        {images.map((image, index) => (
                            <Image
                                key={index}
                                source={image}
                                style={{ height: 200, width: Dimensions.get('window').width }}
                                resizeMode="contain"
                            />
                        ))}

                    </Animated.View>
                </View>
                <View
                    style={{
                        backgroundColor: "#FFFFFF",
                        padding: 20,
                        margin: 20,
                        borderRadius: 10,
                        paddingTop: 10,

                    }}>
                    <Text style={{ color: 'black', textAlign: "center" }}>Tree Track: Discover Nature, Protect Your Plants</Text>
                    <View style={{ height: 1, backgroundColor: 'gray', marginTop: 5, marginBottom: 5 }}></View>
                    <Text style={{ color: 'black' }}>Hello, {firstName} {lastName}</Text>
                    <Text style={{ color: 'black' }}>
                        Tree Track is the perfect app for anyone who wants to be in touch with nature and keep track of their plants. Determine the boundaries of your garden on the map and create your garden. Then, take photos of the plants in your garden, add notes and monitor their development.</Text>
                </View>
                {/* MainMenu içeriğini buraya ekle */}
                <View style={{
                    paddingRight: 20,
                    paddingLeft: 20,
                    paddingBottom: 20,
                    flex: 1,
                    backgroundColor: "#89C6A7",
                    borderTopLeftRadius: 50,
                    borderTopRightRadius: 50,

                }}>

                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("AddNote")
                        }}
                        style={{
                            padding: 10,
                            borderRadius: 50,
                            backgroundColor: "#FFFFFF",
                            marginBottom: 10
                        }}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between"
                            }}
                        >
                            <Text style={{ color: "#25596E" }}> Add Note </Text>

                            <Image
                                style={{
                                    marginEnd: 5
                                }}
                                source={require('../images/icons/ic_right_arrow.png')}
                            >
                            </Image>

                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("OpenMap");
                        }}
                        style={{
                            padding: 10,
                            borderRadius: 50,
                            backgroundColor: "#FFFFFF",
                            marginBottom: 10
                        }}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between"
                            }}
                        >
                            <Text style={{ color: "#25596E" }}> Open Map </Text>

                            <Image
                                style={{
                                    marginEnd: 5
                                }}
                                source={require('../images/icons/ic_right_arrow.png')}
                            >
                            </Image>

                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("MyGardens");
                        }}
                        style={{
                            padding: 10,
                            borderRadius: 50,
                            backgroundColor: "#FFFFFF",
                            marginBottom: 10
                        }}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between"
                            }}
                        >
                            <Text style={{ color: "#25596E" }}> My Gardens </Text>

                            <Image
                                style={{
                                    marginEnd: 5
                                }}
                                source={require('../images/icons/ic_right_arrow.png')}
                            />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("Gallery");
                        }}
                        style={{
                            padding: 10,
                            borderRadius: 50,
                            backgroundColor: "#FFFFFF",
                            marginBottom: 10
                        }}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between"
                            }}
                        >
                            <Text style={{ color: "#25596E" }}> Gallery </Text>

                            <Image
                                style={{
                                    marginEnd: 5
                                }}
                                source={require('../images/icons/ic_right_arrow.png')}
                            >
                            </Image>

                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("Settings");
                        }}
                        style={{
                            padding: 10,
                            borderRadius: 50,
                            backgroundColor: "#FFFFFF",
                            marginBottom: 70
                        }}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",

                            }}
                        >
                            <Text style={{ color: "#25596E" }}> Settings </Text>

                            <Image
                                style={{
                                    marginEnd: 5,
                                }}
                                source={require('../images/icons/ic_right_arrow.png')}
                            >
                            </Image>

                        </View>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </ScrollView>
    );
};

export default MainMenu;
