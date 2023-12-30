import LinearGradient from 'react-native-linear-gradient';
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ToastAndroid,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import CheckBox from '@react-native-community/checkbox';
import {saveUserId} from '../services/storage';

const SignUp = ({setIsSigned, navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [rememberToggleCheckBox, setRememberToggleCheckBox] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const handleSignUp = async () => {
    if (toggleCheckBox && email !== '' && name !== '' && password !== '') {
      if (password !== confirmPassword) {
        ToastAndroid.show('Passwords do not match!', ToastAndroid.SHORT);
        return;
      }

      try {
        const response = await auth().createUserWithEmailAndPassword(
          email,
          password,
        );
        const {uid, email} = response.user;
        const ref = firestore().collection('users').doc(uid);

        await ref.set({
          user_uid: uid,
          name: name,
          email: email,
        });

        setIsSigned(true);
        await saveUserId(uid, toggleCheckBox);

        console.log('User signed up!');
        ToastAndroid.show('User signed up!', ToastAndroid.SHORT);
      } catch (error) {
        console.error(error);
        if (error.message) {
          ToastAndroid.show(error.message.split('] ')[1], ToastAndroid.SHORT);
        }
      }
    } else if (email === '' || password === '' || name === '') {
      ToastAndroid.show('Please fill the form correctly!', ToastAndroid.SHORT);
    } else {
      ToastAndroid.show(
        'Please, read and confirm the terms and conditions!',
        ToastAndroid.SHORT,
      );
    }
  };

  return (
    <View
      style={{
        padding: '5%',
        alignItems: 'center',
        backgroundColor: '#efefef',
        height: '100%',
      }}>
      <Image
        resizeMode="contain"
        style={{
          marginVertical: 10,
          marginHorizontal: '5%',
          alignItems: 'center',
          width: '75%',
        }}
        source={require('../images/tree_track.png')}></Image>

      <LinearGradient
        colors={['#BAE9D1', '#36861C']}
        style={{
          width: '100%',
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 50,
          paddingHorizontal: 20,
          paddingTop: '5%',
          paddingBottom: '10%',
        }}>
        <View>
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              fontSize: 20,
              marginBottom: '5%',
            }}>
            welcome :)
          </Text>

          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Name"
            placeholderTextColor={'#21212160'}
            style={{
              backgroundColor: 'white',
              borderRadius: 50,
              paddingLeft: 20,
              paddingRight: 20,
              marginTop: 10,
              elevation: 10,
              color: 'black',
            }}
          />

          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="E-mail"
            placeholderTextColor={'#21212160'}
            style={{
              backgroundColor: 'white',
              borderRadius: 50,
              paddingLeft: 20,
              paddingRight: 20,
              marginTop: 10,
              elevation: 10,
              color: 'black',
            }}
          />

          <View style={{position: 'relative'}}>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              placeholderTextColor={'#21212160'}
              secureTextEntry={!isPasswordVisible}
              style={{
                backgroundColor: 'white',
                borderRadius: 50,
                paddingLeft: 20,
                paddingRight: 20,
                marginTop: 10,
                elevation: 10,
                color: 'black',
              }}
            />
            <TouchableOpacity
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              disabled={!password}
              style={{
                position: 'absolute',
                right: 20,
                top: '50%',
                transform: [{translateY: -9}],
                opacity: password ? 1 : 0.5,
              }}>
              <Image
                source={
                  isPasswordVisible
                    ? require('../images/icons/eye_close.png')
                    : require('../images/icons/eye_icon.png')
                }
                style={{width: 24, height: 24}}></Image>
            </TouchableOpacity>
          </View>

          <View style={{position: 'relative'}}>
            <TextInput
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirm password"
              placeholderTextColor={'#21212160'}
              secureTextEntry={!isConfirmPasswordVisible}
              style={{
                backgroundColor: 'white',
                borderRadius: 50,
                paddingLeft: 20,
                paddingRight: 20,
                marginTop: 10,
                elevation: 10,
                color: 'black',
              }}
            />
            <TouchableOpacity
              onPress={() =>
                setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
              }
              disabled={!confirmPassword}
              style={{
                position: 'absolute',
                right: 20,
                top: '50%',
                transform: [{translateY: -9}],
                opacity: confirmPassword ? 1 : 0.5,
              }}>
              <Image
                source={
                  isConfirmPasswordVisible
                    ? require('../images/icons/eye_close.png')
                    : require('../images/icons/eye_icon.png')
                }
                style={{width: 24, height: 24}}></Image>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              alignItems: 'center',
            }}>
            <CheckBox
              disabled={false}
              value={toggleCheckBox}
              onValueChange={newValue => setToggleCheckBox(newValue)}
              tintColors={{true: 'white'}}
            />
            <Text
              style={{
                color: 'white',
              }}>
              I accept the
            </Text>

            <Text
              style={{
                color: 'white',
                textDecorationLine: 'underline',
              }}>
              {'\t'}terms and conditions
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <CheckBox
              disabled={false}
              value={rememberToggleCheckBox}
              onValueChange={newValue => setRememberToggleCheckBox(newValue)}
              tintColors={{true: 'white'}}
            />
            <Text
              style={{
                color: 'white',
              }}>
              Remember me
            </Text>
          </View>
        </View>
      </LinearGradient>

      <TouchableOpacity
        onPress={handleSignUp}
        style={{
          justifyContent: 'center',
          backgroundColor: '#36861C',
          borderRadius: 50,
          marginTop: 15,
          marginLeft: 50,
          marginRight: 50,
          height: 50,
          width: '75%',
          elevation: 5,
        }}>
        <Text style={{color: '#fff', fontSize: 16, textAlign: 'center'}}>
          SIGN UP
        </Text>
      </TouchableOpacity>

      <View
        style={{
          flexDirection: 'row',
          marginTop: 10,
        }}>
        <Text style={{color: 'black'}}>Already have an account?</Text>

        <Text
          onPress={() => navigation.navigate('SignIn', {setIsSigned: false})}
          style={{
            textDecorationLine: 'underline',
            fontWeight: 'bold',
            color: '#36861C',
          }}>
          {'\t'}Sign in
        </Text>
      </View>
    </View>
  );
};

export default SignUp;
