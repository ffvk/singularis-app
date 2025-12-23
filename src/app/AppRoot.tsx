import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "../navigation/RootNavigator";
// import { RootState } from "../store";

export default function AppRoot() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}
