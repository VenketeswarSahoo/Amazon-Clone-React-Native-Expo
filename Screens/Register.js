import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  Pressable,
  Alert
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Logo } from "../assets";
import { Entypo, AntDesign, Ionicons } from "@expo/vector-icons";
import axios from "axios";

const Register = () => {
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
  }, []);

  const handleRegister = async () => {
    const user = {
      name: name,
      email: email,
      password: password
    };

    // send A post request to the backend API
    await axios
      .post("http://192.168.29.91:8000/register", user)
      .then(response => {
        console.log(response);
        Alert.alert(
          "Registeration Succesfull",
          "You have registered succesfully"
        );
        setname("");
        setEmail("");
        setPassword("");
      })
      .catch(error => {
        Alert.alert(
          "Registered Error",
          "An error occurred during registration"
        );
        console.log("registratin failed", error);
      });
  };
  return (
    <SafeAreaView className="flex-1 text-center pt-20">
      <View className="flex-1 items-center">
        <Image className="w-56 h-16" source={Logo} />
        <Text className="text-lg mt-2">Create A New Account</Text>
        <View className="flex flex-row items-center bg-zinc-200 px-3 py-3 rounded-lg mt-16">
          <Ionicons name="person" size={24} color="gray" />
          <TextInput
            value={name}
            onChangeText={text => setname(text)}
            className="ml-4 text-base min-w-[65vw]"
            placeholder="Enter Your Name Here"
          />
        </View>
        <View className="flex flex-row items-center bg-zinc-200 px-3 py-3 rounded-lg mt-4">
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
        <Pressable onPress={handleRegister}>
          <Text className="bg-yellow-500 px-4 py-2 text-base font-medium rounded-md mt-6 text-white">
            Register
          </Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate("Login")}>
          <Text className="mt-4 text-base text-zinc-500">
            Already Have An Account ? Click Here
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Register;
