import LinearGradient from "react-native-linear-gradient";
import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, ToastAndroid } from 'react-native';
import auth from '@react-native-firebase/auth';
import strings from "../strings/string";

const ChangePassword = ({ navigation }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [isVisible, setIsVisible] = useState({
    currentPassword: false,
    newPassword: false,
    confirmNewPassword: false,
  });

  const handleChangePassword = async () => {
    try {
      const user = auth().currentUser;

      if (!currentPassword) {
        ToastAndroid.show(strings.enter_current_password, ToastAndroid.SHORT);
        return;
      }
      const credential = auth.EmailAuthProvider.credential(user.email, currentPassword);

      await user.reauthenticateWithCredential(credential);
      if (newPassword.length < 6 || confirmNewPassword.length < 6) {
        ToastAndroid.show(strings.password_min_length, ToastAndroid.SHORT);
        return;
      }
      if (newPassword === confirmNewPassword) {
        await user.updatePassword(newPassword);
        ToastAndroid.show(strings.change_successfully, ToastAndroid.SHORT);
      } else {
        ToastAndroid.show(strings.password_not_match, ToastAndroid.SHORT);
      }
    } catch (error) {
      ToastAndroid.show(strings.password_error_message, ToastAndroid.SHORT);
    }
  };

  const renderPasswordInput = (type, placeholder, value, onChangeText, isVisible, setIsVisible) => (
    <View style={{ position: 'relative', width: '100%' }}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={!isVisible[type]}
        placeholderTextColor={'#21212160'}
        style={{ backgroundColor: 'white', borderRadius: 50, paddingLeft: 20, paddingRight: 20, marginTop: 20, elevation: 10, color: 'black' }}
      />
      <TouchableOpacity
        onPress={() => setIsVisible({ ...isVisible, [type]: !isVisible[type] })}
        disabled={!value}
        style={{
          position: 'absolute',
          right: 20,
          top: '50%',
          transform: [{ translateY: -5 }],
          opacity: value ? 1 : 0.5,
        }}>
        <Image
          source={isVisible[type] ? require('../images/icons/eye_close.png') : require('../images/icons/eye_icon.png')}
          className="w-6 h-6"
        />
      </TouchableOpacity>

    </View>
  );


  return (
    <LinearGradient
      colors={['#FFFFFF', '#FFFFFF']}
      style={{ height: '100%' }}
    >
      <View style={{ flex: 1 }}>
        <View style={{
          padding: 20,
          flex: 1,
          backgroundColor: '#FFFFFF',
        }}>
          <Text style={{ fontSize: 30, color: 'white', fontWeight: 'bold', color: '#09A555' }}>
            Change Password
          </Text>
        </View>
      </View>
      <View style={{
        padding: 20,
        flex: 8,
        backgroundColor: '#89C6A7',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50
      }}>
        <View>
          <Text style={{ color: 'white', textAlign: 'center', fontSize: 20, marginBottom: 10, marginTop: 40 }}>{strings.enter_password_information}</Text>

          {renderPasswordInput('currentPassword', 'Current Password', currentPassword, setCurrentPassword, isVisible, setIsVisible)}
          {renderPasswordInput('newPassword', 'New Password', newPassword, setNewPassword, isVisible, setIsVisible)}
          {renderPasswordInput('confirmNewPassword', 'Confirm New Password', confirmNewPassword, setConfirmNewPassword, isVisible, setIsVisible)}
        </View>

        <TouchableOpacity
          onPress={handleChangePassword}
          style={{
            justifyContent: 'center',
            backgroundColor: '#FFF',
            borderRadius: 50,
            marginTop: 40,
            marginLeft: 50,
            marginRight: 50,
            height: 50,
            width: '75%',
            elevation: 20,
          }}>
          <Text style={{ color: 'black', fontSize: 16, textAlign: 'center', fontWeight: 'bold' }}>
            {strings.update_button}
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};
export default ChangePassword;