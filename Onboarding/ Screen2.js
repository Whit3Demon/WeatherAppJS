import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const Screen2 = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={require("../assets/images/scndOnboarding.jpg")} style={styles.image} />
      <Text style={styles.weatherText}>Найди свой город</Text>
      <Text style={styles.subText}>Когда и где хочешь</Text>
      <TouchableOpacity
       style={styles.continueButton}
       onPress={() => navigation.navigate('Screen3')}>
        <Text style={styles.buttonText}>Продолжить</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.skipButton}
      onPress={() => navigation.navigate('BottomTab')}>
        <Text style={styles.buttonText}>Пропустить</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  image: {
    width: 350,
    height: 250,
    marginBottom: 16,
  },
  weatherText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subText: {
    fontSize: 16,
    marginBottom: 16,
  },
  continueButton: {
    marginTop: 60,
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 2,
  },
  skipButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Screen2;