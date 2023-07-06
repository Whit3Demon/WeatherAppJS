import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const Screen3 = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <Image source={require("../assets/images/thrdOnboarding.jpg")} style={styles.image} />
      <Text style={styles.weatherText}>Будь готов</Text>
      <Text style={styles.subText}>Устал от неожиданностей? </Text>
      <Text style={styles.subText}>Мы предупредим!</Text>
      <TouchableOpacity
       style={styles.continueButton}
       onPress={() => navigation.navigate('BottomTab')}>
        <Text style={styles.buttonText}>Начать</Text>
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

export default Screen3;