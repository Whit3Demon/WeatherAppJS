import React from "react";
import OnboardingScr from "../../components/OnboardingScr";
import type { StackNavigationProp } from "@react-navigation/stack";

type ThirdScrOnboardingParams = {
  ThirdOnboarding: undefined; // Define the route name and any potential params
  BottomTab: undefined; // Define the route name and any potential params
};

type ThirdScrOnboardingNavigationProp = StackNavigationProp<
  ThirdScrOnboardingParams,
  "ThirdOnboarding"
>;

interface ThirdScrOnboardingProps {
  navigation: ThirdScrOnboardingNavigationProp;
}

const ThirdScrOnboarding: React.FC<ThirdScrOnboardingProps> = ({
  navigation,
}) => {
  return (
    <OnboardingScr
      bigText="Будь готов"
      smallText="Устал от неожиданностей? Мы предупредим!"
      image={require("../../../assets/images/thrdOnboarding.jpg")}
      isStart={true}
      onNext={() => navigation.navigate("BottomTab")}
      onSkip={() => navigation.navigate("BottomTab")}
    />
  );
};

export default ThirdScrOnboarding;
