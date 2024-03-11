/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomNavigation from './navigations/BottomNavigation';
import firestore from '@react-native-firebase/firestore';
import { firebase } from '@react-native-firebase/auth';
import { getFromStorage } from './services/storage';
import HomeNavigation from './navigations/HomeNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18next from './services/i18next';

const App = () => {
  const [isSignedIn, setIsSigned] = useState(false);

  useEffect(() => {
    // AsyncStorage'a kaydedilmis dili kullan
    const setInitialLanguage = async () => {
      const storedLanguage = await AsyncStorage.getItem('language');
      if (storedLanguage) {
        await i18next.changeLanguage(storedLanguage);
      }
    };

    // onAuthStateChanged() kullanmadik cunku zaten giris yapildiginda setIsSigned()
    // state i degisip buraya aktarilacak. Burada ise sadece AsyncStorage'dan
    // remember_auth token'ini alip ona gore giris yapilip yapilmadigini kontrol ediyoruz.
    const checkRememberAuth = async () => {
      try {
        const remember_auth = await getFromStorage('remember_auth');
        console.log('Remember auth: ', remember_auth);

        if (remember_auth === 'true') {
          const user = firebase.auth().currentUser;
          if (user) {
            const usersRef = firestore().collection('users');
            const firestoreDocument = await usersRef.doc(user.uid).get();
            const userData = firestoreDocument.data();
            if (userData) {
              console.log(
                'User already signed in: ' + JSON.stringify(userData),
              );
              setIsSigned(true);
            }
          }
        }
      } catch (error) {
        console.log('Getting remember auth error: ', error);
      }
    };

    setInitialLanguage();
    checkRememberAuth();
  }, []);

  const handle = () => {
    //navigatiorlar arasindaki gecislere animasyon eklenmeli
    return (
      <NavigationContainer>
        {isSignedIn ? (
          <BottomNavigation setIsSigned={setIsSigned} />
        ) : (
          <HomeNavigation setIsSigned={setIsSigned} />
        )}
      </NavigationContainer>
    );
  };

  // below code returns a blank page?
  // return <View>{handle()}</View>;

  return handle();
};

export default App;
