import React from "react";
import { ThemeProviderCustom } from "./src/theme/ThemeProviderCustom";
import { AuthProvider } from "./src/providers/AuthProvider";
import RootNavigator from "./src/navigation/RootNavigator";
import QueryProvider from "./src/providers/QueryProvider";
import Toast from "react-native-toast-message";

export default function App() {
  return (
    <ThemeProviderCustom>
      <QueryProvider>
        <AuthProvider>
          <RootNavigator />
           <Toast />
        </AuthProvider>
      </QueryProvider>
    </ThemeProviderCustom>
  );
}

