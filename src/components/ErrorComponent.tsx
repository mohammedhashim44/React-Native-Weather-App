import { MaterialIcons } from "@expo/vector-icons"; // Assuming you have access to Expo icons
import React from "react";
import { View, TouchableOpacity } from "react-native";

import AppText from "./AppText";
import AppColors from "../theme/Colors";

interface ErrorComponentProps {
  message: string;
  tryAgain?: () => void;
}

const ErrorComponent = (props: ErrorComponentProps) => {
  return (
    <View className="flex flex-1 items-center justify-center">
      <MaterialIcons name="error-outline" size={48} color="#e57373" />
      <AppText
        style={{
          color: AppColors.errorColor,
        }}
      >
        {props.message}
      </AppText>
      {props.tryAgain && (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={props.tryAgain}
          style={{
            backgroundColor: AppColors.buttonColor,
          }}
          className="px-4 py-2 rounded-lg my-6"
        >
          <AppText>Try Again</AppText>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ErrorComponent;
