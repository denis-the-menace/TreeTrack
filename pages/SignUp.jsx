import LinearGradient from 'react-native-linear-gradient';
import React, {useState} from 'react';
import strings from '../strings/string';
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
        ToastAndroid.show(strings.toast1_signUp, ToastAndroid.SHORT);
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
        ToastAndroid.show(strings.toast2_signUp, ToastAndroid.SHORT);
      } catch (error) {
        console.error(error);
        if (error.message) {
          ToastAndroid.show(error.message.split('] ')[1], ToastAndroid.SHORT);
        }
      }
    } else if (email === '' || password === '' || name === '') {
      ToastAndroid.show(strings.toast3_signUp, ToastAndroid.SHORT);
    } else {
      ToastAndroid.show(
        strings.toast4_signIn,
        ToastAndroid.SHORT,
      );
    }
  };

  return (
    <View className="flex p-8 justify-center items-center bg-white h-full">
      <Image
        resizeMode="contain"
        className="w-5/6 items-center"
        source={require('../images/tree_track.png')}></Image>
      <LinearGradient
        className="w-full mt-2 p-8 rounded-[32px] rounded-bl-none flex items-center"
        colors={['#BAE9D1', '#36861C']}>
        <Text className="text-white text-xl mb-2 text-center">{strings.welcome}</Text>

        <TextInput
          value={name}
          onChangeText={setName}
          placeholder={strings.namePlaceholder}
          placeholderTextColor={'#21212160'}
          className="bg-white rounded-full mt-2 pl-4 w-full text-black"
          style={{
            elevation: 10,
          }}
        />

        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder={strings.emailPlaceholder}
          placeholderTextColor={'#21212160'}
          className="bg-white rounded-full mt-2 pl-4 w-full text-black"
          style={{
            elevation: 10,
          }}
        />

        <View className="relative w-full">
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder={strings.passwordPlaceholder}
            placeholderTextColor={'#21212160'}
            secureTextEntry={!isPasswordVisible}
            className="bg-white rounded-full mt-2 pl-4 w-full text-black"
            style={{
              elevation: 10,
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
              className="w-6 h-6"
            />
          </TouchableOpacity>
        </View>

        <View className="relative w-full">
          <TextInput
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder={strings.confirmPasswordPlaceholder}
            placeholderTextColor={'#21212160'}
            secureTextEntry={!isConfirmPasswordVisible}
            className="bg-white rounded-full mt-2 pl-4 w-full text-black"
            style={{
              elevation: 10,
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
              className="w-6 h-6"
            />
          </TouchableOpacity>
        </View>

        <View className="self-start flex flex-row mt-2 ml-2 justify-center items-center">
          <CheckBox
            disabled={false}
            value={toggleCheckBox}
            onValueChange={newValue => setToggleCheckBox(newValue)}
            tintColors={{true: 'white'}}
          />
          <Text className="text-white text-sm">{strings.termsAndConditions}</Text>

          <Text className="text-white text-sm underline">
            {'\t'}{strings.termsAndConditions1}
          </Text>
        </View>
        <View className="self-start flex flex-row mt-2 ml-2 justify-center items-center">
          <CheckBox
            disabled={false}
            value={rememberToggleCheckBox}
            onValueChange={newValue => setRememberToggleCheckBox(newValue)}
            tintColors={{true: 'white'}}
          />
          <Text className="text-white text-sm">{strings.rememberMe}</Text>
        </View>
      </LinearGradient>
      <TouchableOpacity
        onPress={handleSignUp}
        className="justify-center bg-[#36861C] rounded-full mt-8 mx-8 h-16 w-3/4"
        style={{
          elevation: 5,
        }}>
        <Text className="text-lg text-center font-bold text-white">
        {strings.signUp_B}
        </Text>
      </TouchableOpacity>
      <Text className="text-black text-lg mt-4">{strings.alreadyAccount}</Text>

      <Text
        onPress={() => navigation.navigate('SignIn', {setIsSigned: false})}
        className="text-lg underline font-bold text-[#36861C]">
        {'\t'}{strings.signIn}
      </Text>
    </View>
  );
};

export default SignUp;
