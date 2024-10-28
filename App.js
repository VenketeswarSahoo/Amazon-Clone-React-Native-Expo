import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home, Login, Register } from "./Screens";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import ProductsInfo from "./Screens/ProductsInfo";
import { Provider } from "react-redux";
import store from "./store";

export default function App() {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  const BottomTabs = () => {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: "Home",
            tabBarLabelStyle: { color: "#008E97" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused
                ? <Entypo name="home" size={24} color="#008E97" />
                : <AntDesign name="home" size={24} color="black" />
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Home}
          options={{
            tabBarLabel: "Profile",
            tabBarLabelStyle: { color: "#008E97" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused
                ? <Ionicons name="person" size={24} color="#008E97" />
                : <Ionicons name="person-outline" size={24} color="black" />
          }}
        />
        <Tab.Screen
          name="Cart"
          component={Home}
          options={{
            tabBarLabel: "Cart",
            tabBarLabelStyle: { color: "#008E97" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused
                ? <Entypo name="shopping-cart" size={24} color="#008E97" />
                : <AntDesign name="shoppingcart" size={24} color="black" />
          }}
        />
      </Tab.Navigator>
    );
  };

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen
            name="Main"
            component={BottomTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Info"
            component={ProductsInfo}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
