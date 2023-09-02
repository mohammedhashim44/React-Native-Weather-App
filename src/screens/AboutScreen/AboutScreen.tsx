import React from "react";
import { View, Linking, TouchableOpacity, ImageBackground } from "react-native";
import AppText from "../../components/AppText";
import { getRandomeImage } from "../../data/BackgroundImages";
import AppColors from "../../theme/Colors";

const AboutScreen = () => {
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
        <TextAndLink
          text="Developed By"
          linkText="Mohammed Hashim"
          link="https://www.linkedin.com/in/mohammed-hashim-25764b1b2/"
        />

        <TextAndLink
          text="Source Code"
          linkText="Github"
          link="https://github.com/mohammedhashim44/React-Native-Weather-App"
        />

        <TextAndLink
          text="My Portfolio"
          linkText="https://mohammed-hashim.com/"
          link="https://mohammed-hashim.com/"
          linkTextClass="text-lg"
        />

        <View className="h-4" />
      </View>
    </ImageBackground>
  );
};

const TextAndLink = (props: {
  text: string;
  link: string;
  linkText: string;
  linkTextClass?: string;
}) => {
  const onLinkClicked = () => {
    Linking.openURL(props.link).catch((err) =>
      console.error("Couldn't load page", err)
    );
  };

  return (
    <View className="flex flex-col items-center">
      <AppText>{props.text}</AppText>
      <TouchableOpacity onPress={onLinkClicked} activeOpacity={0.7}>
        <AppText
          className={
            `text-2xl border-b-2 border-red-500 ` + props.linkTextClass ?? ""
          }
          isBold
        >
          {props.linkText}
        </AppText>
      </TouchableOpacity>
    </View>
  );
};

export default AboutScreen;
