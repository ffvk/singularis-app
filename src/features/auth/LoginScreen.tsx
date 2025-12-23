import { View, StyleSheet, ActivityIndicator } from "react-native";
import { useState } from "react";
import LoginWithEmailForm from "./components/LoginWithEmailForm";
// import LoginWithMobileForm from "./components/LoginWithMobileForm";

export default function LoginScreen() {
  const [activeForm, setActiveForm] = useState<"email" | "mobile">("email");

  return (
    <View style={styles.container}>
      {activeForm === "email" && (
        <LoginWithEmailForm onSwitch={() => setActiveForm("mobile")} />
      )}
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
});
