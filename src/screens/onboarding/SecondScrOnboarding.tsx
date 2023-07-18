import React from 'react';
import OnboardingScr from '../../components/OnboardingScr';

interface SecondScrOnboardingProps {
  navigation: any;
}

const SecondScrOnboarding: React.FC<SecondScrOnboardingProps> = ({ navigation }) => {
  return (
    <OnboardingScr
      bigText="Найди свой город"
      smallText="Когда и где хочешь"
      image={require('../../../assets/images/scndOnboarding.jpg')}
      isStart={false}
      onNext={() => navigation.navigate('ThirdOnboarding')}
      onSkip={() => navigation.navigate('BottomTab')}
    />
  );
};

export default SecondScrOnboarding;
