import React from "react";
import { View, ActivityIndicator } from "react-native";

interface LoadingSpinnerProps {
  size?: "small" | "large";
}

const LoadingComponent: React.FC<LoadingSpinnerProps> = ({
  size = "large",
}) => {
  return (
    <View className="flex flex-col flex-1 items-center justify-center ">
      <ActivityIndicator size={size} />
    </View>
  );
};

export default LoadingComponent;
