import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { useFonts } from "expo-font";

import StackNavigator from "./StackNavigator";
import { UserProvider } from "./hooks/UserProvider";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent",
  },
};

const App = () => {

  const [loaded] = useFonts({
    SansBold: require("./assets/fonts/OpenSans-Bold.ttf"),
    SansSemiBold: require("./assets/fonts/OpenSans-SemiBold.ttf"),
    SansMedium: require("./assets/fonts/OpenSans-Medium.ttf"),
    SansRegular: require("./assets/fonts/OpenSans-Regular.ttf"),
    SansLight: require("./assets/fonts/OpenSans-Light.ttf"),
    SansSemiBoldItalic: require("./assets/fonts/OpenSans-SemiBoldItalic.ttf")
  })

  if(!loaded) return null;

    return (
      <NavigationContainer theme={theme}>
        <UserProvider>
          <StackNavigator/>
        </UserProvider>
      </NavigationContainer>
    )
}

export default App