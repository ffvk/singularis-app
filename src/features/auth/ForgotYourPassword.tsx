import { View } from "react-native";
import { useThemeCustom } from "../../theme/ThemeProviderCustom";
import ForgotYourPasswordForm from "./components/ForgotYourPasswordForm";

export default function ResetYourPasswordScreen() {
  const { theme } = useThemeCustom();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        backgroundColor: theme.colors.background,
      }}
    >
      <View
        style={{
          width: "100%",
          maxWidth: 420,
          padding: theme.spacing(2),
          borderRadius: theme.borderRadius.md, 
          backgroundColor: theme.colors.surface,
        }}
      >
        <ForgotYourPasswordForm />
      </View>
    </View>
  );
}
