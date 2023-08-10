import React, { useEffect } from "react";
import OnboardingScr from "../../components/OnboardingScr";
import type { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from "@react-native-async-storage/async-storage";

type FirstScrOnboardingParams = {
  SecondOnboarding: undefined; // Define the route name and any potential params
  BottomTab: undefined; // Define the route name and any potential params
};

type FirstScrOnboardingNavigationProp = StackNavigationProp<
FirstScrOnboardingParams,
  "SecondOnboarding"
>;

interface FirstScrOnboardingProps {
  navigation: FirstScrOnboardingNavigationProp;
}

const FirstScrOnboarding: React.FC<FirstScrOnboardingProps> = ({
  navigation,
}) => {

  useEffect(() => {
    const fetchData = async () => {
      try {
        const firstLaunchDataFromStorage = await AsyncStorage.getItem("keyForFirstLaunchOnboarding");
        // Проверяем, что firstLaunchDataFromStorage не пустой
        if (firstLaunchDataFromStorage) {
          const parsedData = JSON.parse(firstLaunchDataFromStorage);
          const isFirstLaunch = parsedData;  
          if (isFirstLaunch === true) {
            navigation.navigate("BottomTab");
          }
          
        } 

      } catch (error) {null}
    };
  
    fetchData();
  }, []);
  
  
  
  

  return (
    <OnboardingScr
      bigText="Погода"
      smallText="Все в одном удобном месте"
      image={require("../../../assets/images/firstOnboarding.jpg")}
      isStart={false}
      onNext={() => navigation.navigate("SecondOnboarding")}
      onSkip={() => navigation.navigate("BottomTab")}
    />
  );
};
export default FirstScrOnboarding;
