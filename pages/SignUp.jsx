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
import { useTranslation } from 'react-i18next';

const SignUp = ({setIsSigned, navigation}) => {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [rememberToggleCheckBox, setRememberToggleCheckBox] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

    const handleSignUp = () => {
      if (toggleCheckBox && email != '' && name != '' && password != '') {
        if (password !== confirmPassword) {
          ToastAndroid.show(t("toast1_signUp"), ToastAndroid.SHORT);
          return;
        }
        auth()
          .createUserWithEmailAndPassword(email, password)
          .then(async (response) => {
            const { uid, email } = response.user;
            const ref = firestore().collection('users').doc(uid)
            ref.set({
              "user_uid": uid,
              "name": name,
              "email": email,
            })
            setIsSigned(true);
            await saveUserId(uid, toggleCheckBox);
            console.log('User signed up!');
            ToastAndroid.show(t("toast2_signUp"), ToastAndroid.SHORT);
  
            })
          .catch((error) => {
            console.log(error);
            ToastAndroid.show(error.message.split('] ')[1], ToastAndroid.SHORT);
          });
      }
      else if (email == '' || password == '' || name == '') {
        ToastAndroid.show(t("toast3_signUp"), ToastAndroid.SHORT);
      }
      else {
        ToastAndroid.show('Please, read and confirm the terms and conditions!', ToastAndroid.SHORT);
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
        <Text className="text-white text-xl mb-2 text-center">{t("welcome")}</Text>

        <TextInput
          value={name}
          onChangeText={setName}
          placeholder={t("namePlaceholder")}
          placeholderTextColor={'#21212160'}
          className="bg-white rounded-full mt-2 pl-4 w-full text-black"
          style={{
            elevation: 10,
          }}
        />

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
              className="w-6 h-6"
            />
          </TouchableOpacity>
        </View>

        <View className="relative w-full">
          <TextInput
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder={t("confirmPasswordPlaceholder")}
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
          <Text className="text-white text-sm">{t("termsAndConditions")}</Text>

          <Text className="text-white text-sm underline">
            {'\t'}{t("termsAndConditions1")}
          </Text>
        </View>
        <View className="self-start flex flex-row mt-2 ml-2 justify-center items-center">
          <CheckBox
            disabled={false}
            value={rememberToggleCheckBox}
            onValueChange={newValue => setRememberToggleCheckBox(newValue)}
            tintColors={{true: 'white'}}
          />
          <Text className="text-white text-sm">{t("rememberMe")}</Text>
        </View>
      </LinearGradient>
      <TouchableOpacity
        onPress={handleSignUp}
        className="justify-center bg-[#36861C] rounded-full mt-8 mx-8 h-16 w-3/4"
        style={{
          elevation: 5,
        }}>
        <Text className="text-lg text-center font-bold text-white">
        {t("signUp_B")}
        </Text>
      </TouchableOpacity>
      <Text className="text-black text-lg mt-4">{t("alreadyAccount")}</Text>

      <Text
        onPress={() => navigation.navigate('SignIn', {setIsSigned: false})}
        className="text-lg underline font-bold text-[#36861C]">
        {'\t'}{t("signIn")}
      </Text>
    </View>
  );
};

export default SignUp;
