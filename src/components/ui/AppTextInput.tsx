import { StyleSheet, TextInput, TextInputProps } from "react-native";

export default function AppTextInput({ ...rest }: TextInputProps) {
  return <TextInput {...rest} style={[styles.textInput, rest.style]} />;
}

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "lightgrey",
    padding: 12,
    fontSize: 16,
  },
});
