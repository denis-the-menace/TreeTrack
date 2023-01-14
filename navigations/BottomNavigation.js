import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { View, Image, Dimensions } from "react-native";
import AddPlantNote from '../pages/AddPlantNote';
import Map from "../pages/Map";
import Gardens from "../pages/Gardens";
import Profile from "../pages/Profile";
import Galleries from "../pages/Galleries";
import styles from "../styles/Style";
import CreateGarden from "../pages/CreateGarden"
import SelectPlant from "../pages/SelectPlant"
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DrawPolygon from "../pages/DrawPolygon";
import Settings from "../pages/Settings";


const { width, height } = Dimensions.get("window")
const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

const BottomNavigation = () => {

  return (

    <View style={{
      width,
      height,
    }}>

      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: styles.bottomNavigation,
          headerShown: false,
          tabBarHideOnKeyboard: true,

        }}>

        <Tab.Screen
          name="AddPlantNoteStack"
          component={AddPlantNoteStack}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Image
                  source={focused ? require("../images/icons/focused_camera.png") : require("../images/icons/camera.png")}
                  resizeMode="contain"
                  style={styles.bottomNavigationİcons}

                >

                </Image>
              </View>
            ),
          }}>

        </Tab.Screen>

        <Tab.Screen
          name="Map"
          component={Map}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Image
                  source={require("../images/icons/location.png")}
                  resizeMode="contain"
                  style={styles.bottomNavigationİcons}

                >

                </Image>
              </View>
            ),
          }}>

        </Tab.Screen>


        <Tab.Screen
          name="GardensStack"
          component={GardensStack}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Image
                  source={require("../images/icons/plant.png")}
                  resizeMode="contain"
                  style={styles.bottomNavigationİcons}

                >

                </Image>
              </View>
            ),
          }}>

        </Tab.Screen>

        <Tab.Screen
          name="Galleries"
          component={Galleries}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Image
                  source={require("../images/icons/image.png")}
                  resizeMode="contain"
                  style={styles.bottomNavigationİcons}

                >

                </Image>
              </View>
            ),
          }}>

        </Tab.Screen>

        <Tab.Screen
          name="SettingsStack"
          component={SettingsStack}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Image
                  source={require("../images/icons/ic_settings.png")}
                  resizeMode="contain"
                  style={styles.bottomNavigationİcons}

                >

                </Image>
              </View>
            ),
          }}>

        </Tab.Screen>
      </Tab.Navigator>
    </View>


  )
}
const GardensStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen
        name="Gardens"
        component={Gardens}
      />
      <Stack.Screen
        name="CreateGarden"
        component={CreateGarden} />

      <Stack.Screen
        name="DrawPolygon"
        component={DrawPolygon} />
    </Stack.Navigator>
  )
}

const AddPlantNoteStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name="AddPlantNote" component={AddPlantNote} />
            <Stack.Screen name="SelectPlant" component={SelectPlant} />
        </Stack.Navigator>
    );
}

const SettingsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
}


export default BottomNavigation
