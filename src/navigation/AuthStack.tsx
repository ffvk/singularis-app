import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../features/auth/LoginScreen";
import ResetYourPasswordScreen from "../features/auth/ForgotYourPassword";

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="ForgotPassword" component={ResetYourPasswordScreen} 
      />
    </Stack.Navigator>
  );
}
