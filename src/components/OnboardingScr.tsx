
import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

interface OnboardingScrProps {
  bigText: string;
  smallText: string;
  image: number;
  isStart: boolean;
  onNext: () => void;
  onSkip: () => void;
}

const OnboardingScr: React.FC<OnboardingScrProps> = ({ bigText, smallText, image, isStart, onNext, onSkip }) => {
  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} />
      <Text style={styles.weatherText}>{bigText}</Text>
      <Text style={styles.subText}>{smallText}</Text>
      <TouchableOpacity
        style={styles.continueButton}
        onPress={onNext}
      >
        <Text style={styles.buttonText}>
          {isStart ? 'Начать' : 'Продолжить'}
        </Text>
      </TouchableOpacity>
      {!isStart && (
        <TouchableOpacity
          style={styles.skipButton}
          onPress={onSkip}
        >
          <Text style={styles.buttonText}>Пропустить</Text>
        </TouchableOpacity>
      )}
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

export default OnboardingScr;
