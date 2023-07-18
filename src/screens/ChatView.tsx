import React, { useState } from "react";
import { SafeAreaView, View, Text, TextInput, StyleSheet } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';


export default function ChatView() {
  const [text, onChangeText] = useState<string>('');

  return (
    <SafeAreaView>
      <View>
        <Text>Экран Чата</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
            placeholder="Введите сообщение..."
          />
        </View>
        <View style={styles.buttonContainer}>
          <Ionicons.Button
            style={styles.button}
            name='paper-plane-outline'
            size={20}
            color="#000000"
            backgroundColor={"white"}
            onPress={() => console.log(text)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'absolute',
    bottom: -622
  },
  inputContainer: {
    flex: 1,

  },
  buttonContainer: {
    marginLeft: 0,
  },
  button: {
    borderWidth: 2,
    height: 40
  },

  input: {

    height: 40,
    marginRight: 0,
    borderWidth: 2,
    padding: 10,
    backgroundColor: "white"
  },

});


 

 

