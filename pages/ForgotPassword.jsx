import LinearGradient from "react-native-linear-gradient";
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ToastAndroid } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useTranslation } from 'react-i18next';

const ForgotPassword = ({ navigation }) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');

  const handleForgotPassword = () => {
    if (email !== '') {
      auth()
        .sendPasswordResetEmail(email)
        .then(() => {
          ToastAndroid.show(t("password_email_message"), ToastAndroid.SHORT);
                })
        .catch((error) => {
          console.error(error);
          ToastAndroid.show(error.message, ToastAndroid.SHORT);
        });
    } else {
      ToastAndroid.show(t("enter_email_message"), ToastAndroid.SHORT);
    }
  };
  
  return (
    
    <View
      style={{
        paddingTop: '8%',
        paddingLeft: '5%',
        paddingRight: '5%',
        paddingBottom: '5%',
        alignItems: 'center',
        height: '100%',
        backgroundColor: '#efefef',
      }}>
      <Text 
        style={{ 
        fontSize: 30, 
        color: "white", 
        fontWeight: "bold", 
        color: "#09A555",
        alignSelf: 'flex-start',
        }}>
          {t("forgot_password")}
      </Text>

      <LinearGradient
        colors={['#BAE9D1', '#36861C']}
        style={{
          width: '100%',
          marginTop: 40,
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 50,
          padding: 20,
          paddingBottom: '20%'
        }}>
        <View>

          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              fontSize: 20,
              marginBottom: 10,
            }}>
            {t("enter_email_message")}
          </Text>

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
              color: 'black'
            }}
          />
        </View>
      </LinearGradient>

      <TouchableOpacity
        onPress={handleForgotPassword}
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
            {t("send_reset_email")}
        </Text>
      </TouchableOpacity>

      <Text
        onPress={() => navigation.navigate('SignIn')}
        style={{
          marginTop: 20,
          fontSize: 16,
          textDecorationLine: 'underline',
          fontWeight: 'bold',
          color: '#36861C',
        }}>
          {t("back_to_sign_in")}
      </Text>
    </View>
  );
};

export default ForgotPassword;