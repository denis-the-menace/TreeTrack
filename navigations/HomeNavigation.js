import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../pages/Home';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import ForgotPassword from '../pages/ForgotPassword';

const Stack = createNativeStackNavigator();

const HomeNavigation = ({setIsSigned}) => {
  console.log('HomeNavigation is called', setIsSigned);
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="SignIn">
        {props => <SignIn {...props} setIsSigned={setIsSigned} />}
      </Stack.Screen>
      <Stack.Screen name="SignUp">
        {props => <SignUp {...props} setIsSigned={setIsSigned} />}
      </Stack.Screen>
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    </Stack.Navigator>
  );
};

export default HomeNavigation;
