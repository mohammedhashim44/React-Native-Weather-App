import React from "react";
import { View, Linking, TouchableOpacity, ImageBackground } from "react-native";

import AppText from "../../components/AppText";
import { getRandomeImage } from "../../data/BackgroundImages";
import AppColors from "../../theme/Colors";

const AboutScreen = () => {
  const onGithubClicked = () => {
    Linking.openURL("https://www.google.com").catch((err) =>
      console.error("Couldn't load page", err),
    );
  };

  return (
    <ImageBackground
      source={{ uri: getRandomeImage() }}
      imageStyle={{ objectFit: "cover" }}
      style={{ backgroundColor: AppColors.backgroundColor }}
      className="h-full"
    >
      <View
        className="flex flex-col items-center justify-evenly h-full"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <View className="flex flex-col items-center">
          <AppText>Developed By</AppText>
          <TouchableOpacity onPress={onGithubClicked}>
            <AppText className="text-2xl border-b-2 border-red-500 " isBold>
              Mohammed Hashim
            </AppText>
          </TouchableOpacity>
        </View>

        <View className="flex flex-col items-center">
          <AppText>Source Code</AppText>
          <TouchableOpacity onPress={onGithubClicked}>
            <AppText className="text-2xl border-b-2 border-red-500 " isBold>
              Github
            </AppText>
          </TouchableOpacity>
        </View>

        <View className="flex flex-col items-center">
          <AppText>My Portfolio</AppText>
          <TouchableOpacity onPress={onGithubClicked}>
            <AppText className="text-md border-b-2 border-red-500 " isBold>
              https://mohammed-hashim.com/
            </AppText>
          </TouchableOpacity>
        </View>

        <View className="h-4" />
      </View>
    </ImageBackground>
  );
};

export default AboutScreen;
