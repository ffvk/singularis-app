import { View, Text, Button } from "react-native";
import { useAuthContext } from "../../providers/AuthProvider";

export default function DashboardScreen() {
  const { logout, role } = useAuthContext();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Dashboard</Text>
      <Text>Role: {role}</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
}
