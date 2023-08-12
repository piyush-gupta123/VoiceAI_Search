import { View, Text, Image } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function features() {
  return (
    <View style={{ height: hp(60) }} className="space-4-y">
      <Text
        style={{ fontSize: wp(5.5) }}
        className="font-semibold text-gray-700 mb-5"
      >
        Features
      </Text>
      {/* ChatGPT */}
      <View className="bg-emerald-200 p-4 rounded-xl space-y-2">
        <View className="flex-row items-center space-x-1">
          <Image
            source={require("../../assets/images/chatgptIcon.png")}
            style={{ height: hp(4), width: hp(4) }}
          />
          <Text
            className="font-semibold text-gray-700"
            style={{ fontSize: wp(4.8) }}
          >
            ChatGPT
          </Text>
        </View>
        <Text
          style={{ fontSize: wp(3.5) }}
          className="text-gray-700 font-medium"
        >
          ChatGPT can provide you with instant and knowledgeable responses,
          assist you with creative ideas on a wide range of topics.
        </Text>
      </View>
      {/* Dall-E */}
      <View className="bg-purple-200 p-4 rounded-xl space-y-2 mt-3">
        <View className="flex-row items-center space-x-1">
          <Image
            source={require("../../assets/images/Dalleicon.png")}
            style={{ height: hp(4), width: hp(4) }}
          />
          <Text
            className="font-semibold text-gray-700"
            style={{ fontSize: wp(4.8) }}
          >
            Dall-E
          </Text>
        </View>
        <Text
          style={{ fontSize: wp(3.5) }}
          className="text-gray-700 font-medium"
        >
          Dall-E can generate imaginative and diverse images from textual
          description, expanding the boundaries of visual creativity.
        </Text>
      </View>
      {/* Smart AI */}
      <View className="bg-cyan-200 p-4 rounded-xl space-y-2 mt-3">
        <View className="flex-row items-center space-x-1">
          <Image
            source={require("../../assets/images/smartaiicon.jpg")}
            style={{ height: hp(4), width: hp(4) }}
          />
          <Text
            className="font-semibold text-gray-700"
            style={{ fontSize: wp(4.8) }}
          >
            Smart AI
          </Text>
        </View>
        <Text
          style={{ fontSize: wp(3.5) }}
          className="text-gray-700 font-medium"
        >
          A powerful voice assistant with the abilities of ChatGPT and Dalle-E,
          providing you the best of both worlds.
        </Text>
      </View>
    </View>
  );
}
