import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";
import { useAuthContext } from "../providers/AuthProvider";

export default function RootNavigator() {
  const { token } = useAuthContext();

  return (
    <NavigationContainer key={token ? "app" : "auth"}>
      {token ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
