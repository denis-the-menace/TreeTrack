import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Image,
    ToastAndroid,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import React, { useState } from 'react';
import styles from '../styles/Style';
import { useRoute } from '@react-navigation/native';
import { updateGarden } from '../services/garden_services';
import strings from '../strings/string';

const EditGarden = ({ navigation }) => {
    const route = useRoute();
    const garden = route.params.garden;
    const onUpdate = route.params.onUpdate;
    const newGardenArea = route.params && route.params.polygon ? route.params.polygon : [];
    
    const [gardenNote, setTextInputValue] = useState('');
    const [gardenName, setGardenName] = useState(garden.name);

    const handleUpdateGarden = async () => {
        const updated_garden = garden
        if(newGardenArea.length > 2){
            updated_garden.polygon = newGardenArea
        }
        if(gardenName.length > 0){
            updated_garden.name = gardenName
        }
        try {
            await updateGarden(garden.id, updated_garden)
            ToastAndroid.show(strings.toast1_eg, ToastAndroid.SHORT)
            navigation.navigate("Gardens")
            // TODO: Navigate?
        } catch (error) {
            console.log("Error garden update: ", error)
        }
    };
    return (
        <LinearGradient colors={['#89C6A7', '#89C6A7']} style={{ height: '100%' }}>
            <View
                style={{
                    padding: 20,
                    flex: 1,
                    marginBottom: 150,
                }}>
                <ScrollView>
                    <View style={{ marginBottom: 90 }}>
                        <Text style={styles.subtext}> &gt; {garden.name}</Text>
                        <Text style={styles.text}>{strings.edit_garden}</Text>
                        <Text style={styles.t4}>{strings.edit_garden_name}</Text>
                        <TextInput
                            value={gardenName}
                            onChangeText={text => setGardenName(text)}
                            placeholder={garden.name}
                            placeholderTextColor={'#21212160'}
                            style={styles.text_area}
                        />
                        <Text style={styles.t4}>{strings.edit_area_garden}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity
                                style={{
                                    ...styles.button_left,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}
                                onPress={() => {
                                    navigation.navigate('EditGardenPolygon', { garden, onUpdate });
                                }}>
                                <Image
                                    source={{
                                        uri: 'https://cdn-icons-png.flaticon.com/32/854/854901.png',
                                    }}
                                    style={{
                                        width: 25,
                                        height: 25,
                                    }}></Image>
                                <Text style={{ ...styles.bt1, color: '#212121', marginLeft: 5 }}>
                                {strings.open_map}
                                </Text>
                            </TouchableOpacity>
                            
                        </View>
                        <TouchableOpacity style={styles.button_right} onPress={handleUpdateGarden}>
                            <Text style={styles.bt1}> {strings.update} </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>

        </LinearGradient>
    );
};

export default EditGarden;
