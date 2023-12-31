import { createStackNavigator } from "react-navigation-stack";
import FirstScrOnboarding from "../onboarding/FirstScrOnboarding";
import SecondScrOnboarding from "../onboarding/SecondScrOnboarding";
import ThirdScrOnboarding from "../onboarding/ThirdScrOnboarding";
import BottomTab from "./BottomTab";

const AppNavigator = createStackNavigator(
  {
    FirstOnboarding: { screen: FirstScrOnboarding },
    SecondOnboarding: { screen: SecondScrOnboarding },
    ThirdOnboarding: { screen: ThirdScrOnboarding },
    BottomTab: { screen: BottomTab },
  },

  {
    initialRouteName: "FirstOnboarding",
    defaultNavigationOptions: {
      headerShown: false,
    },
  }
);

export default AppNavigator;
