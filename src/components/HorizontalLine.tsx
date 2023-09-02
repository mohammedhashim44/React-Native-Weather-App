import { View } from "react-native";

interface IHorizontalLine {
  height?: number;
}
export const HorizontalLine = (props: IHorizontalLine) => {
  return (
    <View
      style={{
        height: 1,
        backgroundColor: "white",
      }}
      className="
      opacity-20
    "
    />
  );
};

export default HorizontalLine;
