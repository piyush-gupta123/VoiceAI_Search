import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import React, { useEffect, useState } from "react";
import Features from "../components/features";
import { dummyMessages } from "../constants";
import Voice from '@react-native-voice/voice';

export default function HomeScreen() {
  const [messages, setMessages] = useState(dummyMessages);
  const [recording, setRecording] = useState(false);
  const [speaking, setSpeaking] = useState(true);
  const clear = () => {
    setMessages([]);
  };
  const stopSpeaking = () => {
    setSpeaking(false);
  };

  const SpeechStartHandler = e=>{
    console.log('Speech Started');
  }

  const SpeechEndHandler = e=>{
    setRecording(false);
    console.log('Speech ended');
  }

  const SpeechResultsHandler = e=>{
    console.log('Voice Event',e);
    const text = e.value[0];
    SpeechRecognitionResult(text)
  }

  const SpeechErrorHandler = e=>{
    console.log('Speech Error:',e);
  }

  const StartRecording = async()=>{
    setRecording(true);
    try{
      await Voice.start('en-GB')
    }
    catch(err){
      console.log(err);
    }
  }

  const StopRecording = async()=>{
    try{
      await Voice.stop()
      setRecording(false);
      //fetch response
    }
    catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    Voice.onSpeechStart = SpeechStartHandler;
    Voice.onSpeechEnd = SpeechEndHandler;
    Voice.onSpeechResults = SpeechResultsHandler;
    Voice.onSpeechError = SpeechErrorHandler;

    return ()=>{
        Voice.destroy().then(Voice.removeAllListeners)
    }
  },[])
  return (
    <View className="flex-1 bg-white">
      <SafeAreaView className="flex-1 flex mx-5">
        {/* Bot Icon */}
        <View className="flex-row justify-center mt-5">
          <Image
            source={require("../../assets/images/welcome.jpg")}
            style={{ height: hp(15), width: hp(15) }}
          />
        </View>
        {/* features or messages */}
        {messages.length > 0 ? (
          <View className="space-y-2 flex-1">
            <Text
              className="text-gray-700 font-semibold ml-1"
              style={{ fontSize: wp(5) }}
            >
              Assistant
            </Text>
            <View
              style={{ height: hp(58) }}
              className="bg-neutral-200 rounded-3xl p-4"
            >
              <ScrollView
                bounces={false}
                className="space-y-4"
                showsVerticalScrollIndicator={false}
              >
                {messages.map((message, index) => {
                  if (message.role === "assistant") {
                    if (message.content.includes("https")) {
                      //Its an Ai image
                      return (
                        <View key={index} className="flex-row justify-start">
                          <View className="p-2 bg-emerald-100 rounded-2xl flex rounded-tl-none">
                            <Image
                              source={{ uri: message.content }}
                              className="rounded-2xl"
                              resizeMode="contain"
                              style={{ height: wp(60), width: wp(60) }}
                            />
                          </View>
                        </View>
                      );
                    } else {
                      //Text response
                      return (
                        <View key={index} className="flex-row justify-start">
                          <View
                            key={index}
                            style={{ width: wp(70) }}
                            className="bg-emerald-100 rounded-xl p-2 rounded-tl-none"
                          >
                            <Text>{message.content}</Text>
                          </View>
                        </View>
                      );
                    }
                  } else {
                    //User input
                    return (
                      <View key={index} className="flex-row justify-end">
                        <View
                          style={{ width: wp(70) }}
                          className="bg-white rounded-xl p-2 rounded-tr-none"
                        >
                          <Text>{message.content}</Text>
                        </View>
                      </View>
                    );
                  }
                })}
              </ScrollView>
            </View>
          </View>
        ) : (
          <Features />
        )}
        {/* recording, stop, clear */}
        <View className="flex justify-center items-center">
          {recording ? (
            <TouchableOpacity onPress={StopRecording}>
                {/* recording stop */}
              <Image
                className="rounded-full"
                source={require("../../assets/images/voiceLoading.gif")}
                style={{ height: hp(10), width: hp(10) }}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={StartRecording}>
                {/* recording start */}
              <Image
                className="rounded-full"
                source={require("../../assets/images/recording.png")}
                style={{ height: hp(10), width: hp(10) }}
              />
            </TouchableOpacity>
          )}

          {messages.length > 0 && (
            <TouchableOpacity
              className="bg-neutral-400 rounded-3xl p-2 absolute right-10"
              onPress={clear}
            >
              <Text className="text-white font-semibold">Clear</Text>
            </TouchableOpacity>
          )}

          {speaking && (
            <TouchableOpacity
              className="bg-red-400 rounded-3xl p-2 absolute left-10"
              onPress={stopSpeaking}
            >
              <Text className="text-white font-semibold">Stop</Text>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
}
