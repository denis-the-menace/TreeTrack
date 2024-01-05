import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from '../../styles/Style';
import strings from '../../strings/string';

const Pick = ({ unPick, image }) => {
  return (
    <View style={{ alignItems: "center" }}>
      <Image
        source={{
          uri: image,
        }}
        style={{ width: 200, height: 200, marginBottom: 20, borderRadius: 20 }}
      >

      </Image>
      <TouchableOpacity onPress={unPick} style={styles.button}>
        <Text style={styles.bt1}> {strings.select_another_p} </Text>
      </TouchableOpacity>
    </View>


  );
};

export default Pick;