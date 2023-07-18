import React, { useEffect, useState } from 'react';
import OnboardingScr from '../../components/OnboardingScr';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface FirstScrOnboardingProps {
  navigation: any;
}

const FirstScrOnboarding: React.FC<FirstScrOnboardingProps> = ({ navigation }) => {

  const [firstLaunch, setFirstLaunch] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const firstLaunchDataFromStorage = JSON.parse(await AsyncStorage.getItem('keyForFirstLaunchOnboarding') || '');
        setFirstLaunch(firstLaunchDataFromStorage);
        if (firstLaunch === true) {
          navigation.navigate('BottomTab');
        }
      } catch (error) {
        console.log('Error fetching data from storage:', error);
      }
    };

    // Call the fetchData function
    fetchData();
  }, []);

  return (
    <OnboardingScr
      bigText="Погода"
      smallText="Все в одном удобном месте"
      image={require('../../../assets/images/firstOnboarding.jpg')}
      isStart={false}
      onNext={() => navigation.navigate('SecondOnboarding')}
      onSkip={() => navigation.navigate('BottomTab')}
    />
  )
}
export default FirstScrOnboarding;
