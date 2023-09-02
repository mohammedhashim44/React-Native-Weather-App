import { View, StyleSheet, TouchableOpacity } from "react-native";

import AppText from "./AppText";
import AppColors from "../theme/Colors";

interface IAppButton {
  text?: string;
  onClicked?: Function;
  children?: React.ReactNode;
  buttonStyle?: "default" | "bordered";
}

const AppButton = (props: IAppButton) => {
  const onPressed = () => {
    if (props.onClicked) {
      props.onClicked!();
    }
  };
  return (
    <TouchableOpacity onPress={onPressed}>
      <View
        style={
          props.buttonStyle === "bordered" ? styles.bordered : styles.default
        }
        className={
          "px-4 py-4 rounded-xl bg-primary " +
          (props.buttonStyle === "bordered" ? "border-4" : "")
        }
      >
        {props.children && props.children}
        {props.text && (
          <AppText className="font-bold" style={styles.text}>
            {props.text}
          </AppText>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  default: {
    backgroundColor: AppColors.backgroundColor2,
  },
  bordered: {
    borderColor: AppColors.backgroundColor2,
  },
  text: {
    color: AppColors.textColor,
  },
});
export default AppButton;
