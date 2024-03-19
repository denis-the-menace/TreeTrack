import { View, Text, TouchableOpacity, Image, Alert } from "react-native"
import LinearGradient from "react-native-linear-gradient";
import styles from "../styles/Style";
import auth from '@react-native-firebase/auth';
import strings from '../strings/string';
import { deleteAccount } from '../services/helper'
import { useTranslation } from 'react-i18next';

const Settings = ({ navigation, route }) => {
  const { t } = useTranslation();

  const { setIsSigned } = route.params;

  const handleSignOut = () => {
    auth()
      .signOut()
      .then(async () => {
        setIsSigned(false);
        console.log('User signed out!');
      });
  };

  const handleDeleteAccount = async () => {
    try {
      const user = auth().currentUser;
      const userId = user ? user.uid : null;

      if (userId) {
        // Delete account from Firebase
        await user.delete();

        // Clear user-related information from AsyncStorage
        await deleteAccount(userId);

        // Sign out the user
        await auth().signOut();

        // Update the authentication state
        setIsSigned(false);

        // Alert and navigate to SignUp screen
        Alert.alert('Success', 'Account deleted successfully!');
        navigation.navigate('SignUp');
      } else {
        console.log('User not authenticated:', user);
      }
    } catch (error) {
      console.error('Error deleting user account:', error);
    }
  };

  return (

    <LinearGradient
      colors={["#FFFFFF", "#FFFFFF"]}
      style={{ height: "100%" }}
    >
      <View style={{ flex: 1 }}>

        <View style={{
          padding: 20,
          flex: 1,
        }}>
          <Text style={{ fontSize: 30, color: "white", fontWeight: "bold", color: "#09A555" }}>
            {strings.settings}
          </Text>

        </View>
        <View style={{
          padding: 20,
          flex: 15,
          backgroundColor: "#89C6A7",
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
        }}>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Profile", { setIsSigned: setIsSigned })
            }}
            style={{
              padding: 10,
              borderRadius: 50,
              backgroundColor: "#FFFFFF",
              marginBottom: 10
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between"
              }}
            >
              <Text style={{ color: "#25596E" }}> {strings.profile1} </Text>

              <Image
                style={{
                  marginEnd: 5
                }}
                source={require('../images/icons/ic_right_arrow.png')}
              >
              </Image>

            </View>
          </TouchableOpacity>

          <TouchableOpacity

            onPress={() => {
              navigation.navigate("Preferences");
            }}
            style={{
              padding: 10,
              borderRadius: 50,
              backgroundColor: "#FFFFFF",
              marginBottom: 10
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between"
              }}
            >
              <Text style={{ color: "#25596E" }}> {strings.preferences1} </Text>

              <Image
                style={{
                  marginEnd: 5
                }}
                source={require('../images/icons/ic_right_arrow.png')}
              >
              </Image>

            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("PrivacyAndSafety");
            }}
            style={{
              padding: 10,
              borderRadius: 50,
              backgroundColor: "#FFFFFF",
              marginBottom: 10
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between"
              }}
            >
              <Text style={{ color: "#25596E" }}> {strings.privacyAndSafety1} </Text>

              <Image
                style={{
                  marginEnd: 5
                }}
                source={require('../images/icons/ic_right_arrow.png')}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              padding: 10,
              borderRadius: 50,
              backgroundColor: "#FFFFFF",
              marginBottom: 10
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between"
              }}
            >
              <Text style={{ color: "#25596E" }}> {strings.notifications1} </Text>

              <Image
                style={{
                  marginEnd: 5
                }}
                source={require('../images/icons/ic_right_arrow.png')}
              >
              </Image>

            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Support");
            }}
            style={{
              padding: 10,
              borderRadius: 50,
              backgroundColor: "#FFFFFF",
              marginBottom: 10
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between"
              }}
            >
              <Text style={{ color: "#25596E" }}> {strings.support1} </Text>
              <Image
                style={{ marginEnd: 5 }}
                source={require('../images/icons/ic_right_arrow.png')}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleSignOut}
            style={{
              height: 50,
              backgroundColor: 'white',
              borderRadius: 50,
              marginTop: 15,
              width: '100%',
              elevation: 5,
              justifyContent: 'center'
            }}>
            <Text style={{ fontSize: 16, textAlign: 'center', color: 'black', fontWeight: 'bold' }}>{strings.logOut}</Text>
          </TouchableOpacity>

          {/* Delete Account butonu */}
          <TouchableOpacity
            onPress={() => {
              // Kullanıcıya silme işlemini onaylama mesajı göster
              Alert.alert(
                'Delete Account',
                'Are you sure you want to delete your account?',
                [
                  {
                    text: 'Cancel',
                    style: 'cancel',
                  },
                  {
                    text: 'Delete',
                    onPress: handleDeleteAccount,
                    style: 'destructive',
                  },
                ],
              );
            }}
            style={{
              height: 50,
              backgroundColor: 'white',
              borderRadius: 50,
              marginTop: 15,
              width: '100%',
              elevation: 5,
              justifyContent: 'center',
            }}>
            <Text style={{ fontSize: 16, textAlign: 'center', color: 'black', fontWeight: 'bold' }}>
              DELETE ACCOUNT
            </Text>
          </TouchableOpacity>


        </View>

      </View>

    </LinearGradient>

  )
}

export default Settings
