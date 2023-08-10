import React from "react";
import type { StackNavigationProp } from '@react-navigation/stack';
import OnboardingScr from "../../components/OnboardingScr";

type SecondScrOnboardingParams = {
  ThirdOnboarding: undefined; // Define the route name and any potential params
  BottomTab: undefined; // Define the route name and any potential params
};

type SecondScrOnboardingNavigationProp = StackNavigationProp<
  SecondScrOnboardingParams,
  "ThirdOnboarding"
>;

interface SecondScrOnboardingProps {
  navigation: SecondScrOnboardingNavigationProp;
}

const SecondScrOnboarding: React.FC<SecondScrOnboardingProps> = ({
  navigation,
}) => {
  return (
    <OnboardingScr
      bigText="Найди свой город"
      smallText="Когда и где хочешь"
      image={require("../../../assets/images/scndOnboarding.jpg")}
      isStart={false}
      onNext={() => navigation.navigate("ThirdOnboarding")}
      onSkip={() => navigation.navigate("BottomTab")}
    />
  );
};

export default SecondScrOnboarding;

