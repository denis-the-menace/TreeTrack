import LinearGradient from 'react-native-linear-gradient';
import {View, Text, TouchableOpacity, Image} from 'react-native';

const Home = ({navigation}) => {
  return (
    <LinearGradient colors={['#FFFFFF', '#FFFFFF']} style={{height: '100%'}}>
      <View style={{flex: 1}}>
        <View
          style={{
            padding: 20,
            paddingTop: 100,
            flex: 10,
            alignItems: 'center',
          }}>
          <Image
            resizeMode="contain"
            style={{
              width: '100%',
            }}
            source={require('../images/tree_track.png')}></Image>

          <Image
            resizeMode="contain"
            style={{
              width: '75%',
              marginTop: 50,
            }}
            source={require('../images/human.png')}></Image>
        </View>
        <View
          style={{
            flex: 5,
          }}>
          <LinearGradient
            colors={['#BAE9D1', '#36861C']}
            style={{
              height: '100%',
              borderTopLeftRadius: 50,
              borderTopRightRadius: 50,
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('SignUp', {setIsSigned: false})
              }
              style={{
                justifyContent: 'center',
                backgroundColor: 'white',
                borderRadius: 50,
                marginTop: 50,
                marginLeft: 50,
                marginRight: 50,
                height: 50,
                width: '75%',
                elevation: 5,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  textAlign: 'center',
                  fontWeight: 'bold',
                  color: '#36861C',
                }}>
                SIGN UP
              </Text>
            </TouchableOpacity>

            <Text
              style={{
                color: 'white',
                marginTop: 10,
                marginLeft: 10,
              }}>
              Already have an account?
            </Text>

            <Text
              onPress={() =>
                navigation.navigate('SignIn', {setIsSigned: false})
              }
              style={{
                color: 'white',
                textDecorationLine: 'underline',
                marginLeft: 10,
              }}>
              Sign in
            </Text>
          </LinearGradient>
        </View>
      </View>
    </LinearGradient>
  );
};

export default Home;
