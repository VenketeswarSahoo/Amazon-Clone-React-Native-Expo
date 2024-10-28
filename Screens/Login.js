import {
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  SafeAreaView,
  Alert
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Logo } from "../assets";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");

        if (token) {
          navigation.replace("Main");
        }
      } catch (error) {
        console.log("error message", error);
      }
    };
    checkLoginStatus();
  }, []);

  const handleLogin = () => {
    const user = {
      email: email,
      password: password
    };

    axios
      .post("http://192.168.29.91:8000/login", user)
      .then(response => {
        console.log(response);
        const token = response.data.token;
        AsyncStorage.setItem("authToken", token);
        navigation.replace("Main");
      })
      .catch(error => {
        Alert.alert("Login error", "Invalid Password");
        console.log(error);
      });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
  }, []);
  return (
    <SafeAreaView className="flex-1 text-center pt-20">
      <View className="flex-1 items-center">
        <Image className="w-56 h-16" source={Logo} />
        <Text className="text-lg mt-2">Login Into Your Account</Text>
        <View className="flex flex-row items-center bg-zinc-200 px-3 py-3 rounded-lg mt-28">
          <Entypo name="email" size={24} color="gray" />
          <TextInput
            value={email}
            onChangeText={text => setEmail(text)}
            className="ml-4 text-base min-w-[65vw]"
            placeholder="Enter Your Email Here"
          />
        </View>
        <View className="flex flex-row items-center bg-zinc-200 px-3 py-3 rounded-lg mt-4">
          <AntDesign name="lock" size={24} color="gray" />
          <TextInput
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry={true}
            className="ml-4 text-base min-w-[65vw]"
            placeholder="Enter Your Password Here"
          />
        </View>
        <View className="mt-4">
          <View className="flex flex-row gap-16">
            <Text className="text-zinc-600">Keep me logged in</Text>
            <Pressable>
              <Text className="text-blue-500">Foreget Password</Text>
            </Pressable>
          </View>
        </View>
        <Pressable onPress={handleLogin}>
          <Text className="bg-yellow-500 px-4 py-2 text-base font-medium rounded-md mt-6 text-white">
            Submit
          </Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate("Register")}>
          <Text className="mt-4 text-base text-zinc-500">
            Don't Have An Account ? Click Here
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Login;
