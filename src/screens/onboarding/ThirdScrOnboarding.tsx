import React from 'react';
import OnboardingScr from '../../components/OnboardingScr';

interface ThirdScrOnboardingProps {
  navigation: any; 
}

const ThirdScrOnboarding: React.FC<ThirdScrOnboardingProps> = ({ navigation }) => {
  return (
    <OnboardingScr
      bigText="Будь готов"
      smallText="Устал от неожиданностей? Мы предупредим!"
      image={require('../../../assets/images/thrdOnboarding.jpg')}
      isStart={true}
      onNext={() => navigation.navigate('BottomTab')}
      onSkip={() => navigation.navigate('BottomTab')}
    />
  );
};

export default ThirdScrOnboarding;
