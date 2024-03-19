import LinearGradient from 'react-native-linear-gradient';
import React, {useState} from 'react';
import { useTranslation } from 'react-i18next';
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

const SignIn = ({setIsSigned, navigation}) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleLogin = async () => {
    if (email !== '' && password !== '') {
      try {
        const response = await auth().signInWithEmailAndPassword(
          email,
          password,
        );
        const uid = response.user.uid;
        const usersRef = firestore().collection('users').doc(uid);
        const firestoreDocument = await usersRef.get();

        if (!firestoreDocument.exists) {
          ToastAndroid.show(t("toast1_signIn"), ToastAndroid.SHORT);
        }

        setIsSigned(true);
        await saveUserId(uid, toggleCheckBox);
        console.log('inside handleLogin ', uid, toggleCheckBox);
        ToastAndroid.show(t("toast2_signIn"), ToastAndroid.SHORT);
      } catch (error) {
        console.error(error);
        if (error.message) {
          ToastAndroid.show(error.message.split('] ')[1], ToastAndroid.SHORT);
        }
      }
    } else if (email === '' || password === '') {
      ToastAndroid.show(
        t("toast3_signIn"),
        ToastAndroid.SHORT,
      );
    } else {
      ToastAndroid.show(
        t("toast4_signIn"),
        ToastAndroid.SHORT,
      );
    }
  };

  return (
    <View className="flex p-8 justify-center items-center bg-white h-full">
      <Image
        resizeMode="contain"
        className="w-5/6"
        source={require('../images/tree_track.png')}
      />

      <LinearGradient
        colors={['#BAE9D1', '#36861C']}
        className="w-full mt-10 p-8 rounded-[32px] rounded-bl-none flex items-center">
        <Text className="text-white text-xl mb-2 text-center">{t("welcome")}!</Text>

        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder={t("emailPlaceholder")}
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
            placeholder={t("passwordPlaceholder")}
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
              className="w-6 h-6"></Image>
          </TouchableOpacity>
        </View>

        <Text 
        onPress={() => navigation.navigate('ForgotPassword')}
        className="text-white text-sm underline mt-2 ml-2">
        {t("forgotPassword")}
        </Text>

        <View className="flex flex-row mt-2 justify-center items-center">
          <CheckBox
            disabled={false}
            value={toggleCheckBox}
            onValueChange={newValue => setToggleCheckBox(newValue)}
            tintColors={{true: 'white'}}
          />
          <Text className="text-white text-sm">{t("rememberMe")}</Text>
        </View>
      </LinearGradient>

      <TouchableOpacity
        onPress={handleLogin}
        className="justify-center bg-[#36861C] rounded-full mt-8 mx-8 h-14 w-3/4"
        style={{
          elevation: 5,
        }}>
        <Text className="text-lg text-center font-bold text-white">
        {t("signIn_B")}
        </Text>
      </TouchableOpacity>

      <Text className="text-black text-lg mt-4">
      {t("dontHaveAccount")}
      </Text>

      <Text
        onPress={() => navigation.navigate('SignUp', {setIsSigned: false})}
        className="text-lg underline font-bold text-[#36861C]">
        {'\t'}{t("signUp")}
      </Text>
    </View>
  );
};

export default SignIn;
