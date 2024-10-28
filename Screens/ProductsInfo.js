import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  ImageBackground,
  Dimensions
} from "react-native";
import React, { useState } from "react";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/CartReducer";

const ProductsInfo = () => {
  const route = useRoute();
  const { width } = Dimensions.get("window");
  const navigation = useNavigation();
  const [addedToCart, setaddedToCart] = useState(false)
  const height = width * 100 / 100;
  const dispatch = useDispatch()
  const addItemToCart = (item) => {
    setaddedToCart(true)
    dispatch(addToCart(item))
    setTimeout(() => {
      setaddedToCart(false)
    }, 60000);
  }
  const cart = useSelector(state => state.cart.cart);
  console.log(cart);
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className="mt-10 flex-1 bg-white"
    >
      <View className="bg-[#00CED1] p-4 flex-row items-center">
        <Pressable className="flex-row items-center space-x-2 px-2 mx-4 bg-white rounded h-10 flex-1">
          <AntDesign name="search1" size={24} color="black" />
          <TextInput placeholder="Search Amazon.in" />
        </Pressable>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {route.params.carouselImages.map((item, index) => {
          return (
            <ImageBackground
              style={{ width, height, marginTop: 25, resizeMode: "contain" }}
              source={{ uri: item }}
              key={index}
            >
              <View className="p-5 flex-row items-center justify-between">
                <View className="w-10 h-10 rounded-full bg-[#C60C30] justify-center items-center flex-row">
                  <Text className="text-white text-center font-semibold text-xs">
                    20% off
                  </Text>
                </View>
                <View className="w-10 h-10 rounded-full bg-[#E0E0E0] justify-center items-center flex-row">
                  <MaterialCommunityIcons
                    name="share-variant"
                    size={24}
                    color="black"
                  />
                </View>
              </View>
              <View className="w-10 h-10 rounded-full bg-[#E0E0E0] justify-center items-center flex-row mt-auto ml-6 mb-5">
                <AntDesign name="hearto" size={24} color="black" />
              </View>
            </ImageBackground>
          );
        })}
      </ScrollView>
      <View className="p-3">
        <Text className="text-base font-medium text-zinc-500">
          {route.params.title}
        </Text>
        <Text className="text-lg font-semibold mt-2">
          ₹ {route.params.price}
        </Text>
      </View>
      <Text className="h-1 border-[#D0D0D0] border-2" />

      <View className="flex-row items-center p-2">
        <Text>Color:</Text>
        <Text className="text-sm font-bold">
          {route.params.color}
        </Text>
      </View>

      <View className="flex-row items-center p-2">
        <Text>Size:</Text>
        <Text className="text-sm font-bold">
          {route.params.size}
        </Text>
      </View>

      <Text className="h-1 border-[#D0D0D0] border-2" />

      <View className="p-2">
        <Text className="text-base font-bold my-1">
          Total : ₹ {route.params.price}
        </Text>
        <Text className="text-[#00CED1]">
          FREE delivery Tomorrow by 3PM. Order within 10hrs 30 mins
        </Text>
        <View className="flex-row my-1 items-center space-x-1">
          <Ionicons name="location" size={24} color="black" />
          <Text>Deliver To Venkatesh - Bhubaneswar 751031</Text>
        </View>
      </View>
      <Text className="text-green-600 font-medium mx-2">IN Stock</Text>

      <Pressable onPress={() => addItemToCart(route?.params?.item)} className="bg-[#FFC72C] p-2 rounded-2xl justify-center items-center m-2">
        {addedToCart ? (
        <Text>Added To Cart</Text>
        ) : (
        <Text>Add To Cart</Text>
        )}
        
      </Pressable>
      <Pressable className="bg-[#FFAC1C] p-2 rounded-2xl justify-center items-center m-2">
        <Text>Buy Now</Text>
      </Pressable>
    </ScrollView>
  );
};

export default ProductsInfo;
