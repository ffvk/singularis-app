import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DashboardScreen from "../features/dashboard/DashboardScreen";

const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{ title: "Dashboard" }}
      />
    </Stack.Navigator>
  );
}
