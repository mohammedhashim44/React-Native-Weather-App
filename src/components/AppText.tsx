import { StyleProp, Text, TextStyle } from "react-native";

import { APP_FONT_FAMILY } from "../theme/Colors";

const defaultTextStyle: StyleProp<TextStyle> = {
  fontFamily: APP_FONT_FAMILY,
  fontSize: 18,
  color: "white",
};

interface IAppText {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
  className?: string;
  isBold?: boolean;
  isThin?: boolean;
}
const AppText = (props: IAppText) => {
  let fontFamily = defaultTextStyle.fontFamily!;
  if (props.isBold) {
    fontFamily += "_bold";
  } else if (props.isThin) {
    fontFamily += "_thin";
  }

  return (
    <Text
      className={props.className ?? ""}
      style={[defaultTextStyle, props.style, { fontFamily }]}
    >
      {props.children}
    </Text>
  );
};

export default AppText;
