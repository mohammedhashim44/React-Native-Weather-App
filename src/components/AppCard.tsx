import { View, StyleProp, ViewStyle, TouchableOpacity } from "react-native";

import AppColors from "../theme/Colors";

interface IAppCard {
  children: React.ReactNode;
  className?: string;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

export const AppCard = (props: IAppCard) => {
  const activeOpacity = props.onPress ? 0.7 : 1;

  return (
    <TouchableOpacity
      activeOpacity={activeOpacity}
      onPress={() => (props.onPress ? props.onPress() : null)}
    >
      <View
        style={[
          {
            backgroundColor: AppColors.cardBackgroundColor,
            borderColor: AppColors.cardBorderColor,
            borderWidth: AppColors.cardBorderWidth,
          },
          props.style ?? {},
        ]}
        className={`rounded-2xl  px-4 py-4 ${props.className ?? ""}`}
      >
        {props.children}
      </View>
    </TouchableOpacity>
  );
};

export default AppCard;
