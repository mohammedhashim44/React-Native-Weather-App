import { View, StyleSheet } from "react-native";

import AppText from "./AppText";
import AppColors from "../theme/Colors";

interface ITextWithBorder {
  text: string;
}

const TextWithBorder = (props: ITextWithBorder) => {
  return (
    <View style={styles.textWithBorder}>
      <AppText style={styles.textWithBorderText}>{props.text}</AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  textWithBorder: {
    padding: 12,
    borderWidth: 2,
    borderColor: "white",
  },
  textWithBorderText: {
    color: AppColors.textColor,
    fontSize: 24,
    // fontWeight: "bold",
  },
});

export default TextWithBorder;
