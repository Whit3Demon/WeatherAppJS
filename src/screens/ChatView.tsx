import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useHeaderHeight } from "@react-navigation/elements";

export default function ChatView() {
  const [text, onChangeText] = useState<string>("");
  const height = useHeaderHeight();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={height}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        enabled
        style={styles.container}
      >
        <View style={styles.content}>
          <Text>Контент экрана</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
            placeholder="Введите сообщение..."
          />
          <Ionicons.Button
            style={styles.button}
            name="paper-plane-outline"
            size={20}
            color="#000000"
            backgroundColor={"white"}
            onPress={() => console.log(text)}
          />
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    flexDirection: "row",
    backgroundColor: "#ccc",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  button: {
    borderWidth: 2,
    height: 40,
  },
});
